/**
 * One place that knows where the site lives. Set NEXT_PUBLIC_SITE_URL at build time;
 * without it we fall back to localhost so a local production build still renders valid
 * absolute URLs instead of guessing a domain.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteName = "EVAN CARTEX";
