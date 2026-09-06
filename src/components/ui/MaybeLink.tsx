import Link from "next/link";
import { caseRoutesEnabled, isInternalRoute } from "@/lib/routes";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
  /** WCAG 2.5.3 — whatever is passed must still contain the visible label text. */
  "aria-label"?: string;
};

/** Renders a real link when its route exists, otherwise an inert element. */
export function MaybeLink({ href, className = "", children, "aria-label": ariaLabel }: Props) {
  const internal = isInternalRoute(href);

  if (internal && !caseRoutesEnabled) {
    return (
      <span className={className} data-route-pending="true" aria-disabled="true" aria-label={ariaLabel}>
        {children}
      </span>
    );
  }

  if (internal) {
    return (
      <Link className={className} href={href} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer noopener" aria-label={ariaLabel}>
      {children}
    </a>
  );
}
