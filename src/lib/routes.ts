/**
 * /work and /work/[slug] exist from Stage 5, so the case links navigate for real.
 * The flag stays because it is the switch that kept those links inert while the routes
 * did not exist — flipping it never moves anything in the composition.
 */
export const caseRoutesEnabled = true;

export function isInternalRoute(href: string) {
  return href.startsWith("/");
}
