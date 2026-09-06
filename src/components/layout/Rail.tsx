import { profile } from "@/content/profile";

/** Left edge of the page frame. Present from 1024px up. */
export function Rail() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:block"
      style={{ borderRight: "1px solid var(--rule)" }}
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-between py-4">
        <span className="nano rail-signal">EC</span>
        <span className="vertical-text nano rail-signal" style={{ letterSpacing: "0.22em" }}>
          {/* the rail carries the same classification as the hero — one source, no drift */}
          {profile.wordmark} — {profile.roleLines.join(" · ")}
        </span>
        <span className="nano rail-signal">{profile.year}</span>
      </div>
    </div>
  );
}
