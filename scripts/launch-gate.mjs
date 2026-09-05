/**
 * Launch gate — the checks that only mean something against a real deployment.
 *
 *   node scripts/launch-gate.mjs https://your-domain
 *
 * Verifies the production origin end to end: TLS, the HTTP→HTTPS redirect, every route,
 * the security headers on the real response, canonical/OG/sitemap/robots/JSON-LD absolute
 * URLs, and — the one that catches a mis-built image — that no localhost or example.com
 * has leaked into the rendered output.
 */
const target = process.argv[2];
if (!target) {
  console.error("usage: node scripts/launch-gate.mjs https://your-domain");
  process.exit(2);
}
const origin = target.replace(/\/$/, "");
const host = new URL(origin).host;
const ROUTES = ["/", "/work", "/work/lead-radar", "/work/hermes", "/work/route"];
const REDIRECTS = ["/work/luma-english", "/work/yasno-house"];
const HEADERS = [
  "content-security-policy", "strict-transport-security", "referrer-policy",
  "x-content-type-options", "x-frame-options", "cross-origin-opener-policy",
  "cross-origin-resource-policy", "permissions-policy",
];

const fail = [], pass = [];
const check = (ok, msg) => (ok ? pass : fail).push(msg);

// ---- TLS + the plain-HTTP redirect ----
try {
  const r = await fetch(`http://${host}/`, { redirect: "manual" });
  check([301, 302, 307, 308].includes(r.status) && (r.headers.get("location") ?? "").startsWith("https://"),
    `http://${host}/ → ${r.status} ${r.headers.get("location") ?? ""}`);
} catch (e) {
  fail.push(`plain HTTP did not answer: ${e.message}`);
}

// ---- routes, headers, and the leakage scan ----
for (const route of ROUTES) {
  const r = await fetch(origin + route);
  check(r.status === 200, `${route} → ${r.status}`);
  if (route === "/") {
    for (const h of HEADERS) check(r.headers.has(h), `header ${h}: ${r.headers.get(h) ? "present" : "MISSING"}`);
    check(!r.headers.has("x-powered-by"), `x-powered-by absent: ${!r.headers.has("x-powered-by")}`);
  }
  const html = await r.text();
  const leaks = [...html.matchAll(/https?:\/\/(localhost|127\.0\.0\.1|example\.com)[^"'\s<]*/g)].map((m) => m[0]);
  check(leaks.length === 0, `${route}: ${leaks.length ? "LEAKED " + [...new Set(leaks)].slice(0, 3).join(", ") : "no localhost/example.com"}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  check(canonical?.startsWith(origin), `${route} canonical: ${canonical ?? "MISSING"}`);
}

for (const route of REDIRECTS) {
  const r = await fetch(origin + route, { redirect: "manual" });
  check(r.status === 308, `${route} → ${r.status} (expected 308)`);
}

// ---- the generated endpoints ----
for (const [path, test, label] of [
  ["/sitemap.xml", (t) => t.includes(`<loc>${origin}`), "sitemap uses the production origin"],
  ["/robots.txt", (t) => t.includes(origin), "robots uses the production origin"],
]) {
  const r = await fetch(origin + path);
  const t = await r.text();
  check(r.ok && test(t), `${path}: ${r.status}, ${label}: ${test(t)}`);
}
const og = await fetch(origin + "/opengraph-image");
check(og.ok && (og.headers.get("content-type") ?? "").startsWith("image/"), `/opengraph-image: ${og.status} ${og.headers.get("content-type")}`);

const home = await (await fetch(origin)).text();
const ld = home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
try {
  const data = JSON.parse(ld ?? "null");
  check(data?.url?.startsWith(origin), `JSON-LD url: ${data?.url ?? "MISSING"}`);
} catch { fail.push("JSON-LD did not parse"); }

console.log("PASS");
for (const p of pass) console.log("  ✓ " + p);
if (fail.length) {
  console.log("\nFAIL");
  for (const f of fail) console.log("  ✗ " + f);
}
console.log(`\n${pass.length} passed, ${fail.length} failed`);
process.exit(fail.length ? 1 : 0);
