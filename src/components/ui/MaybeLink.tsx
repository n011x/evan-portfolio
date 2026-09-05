import Link from "next/link";
import { caseRoutesEnabled, isInternalRoute } from "@/lib/routes";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

/** Renders a real link when its route exists, otherwise an inert element. */
export function MaybeLink({ href, className = "", children }: Props) {
  const internal = isInternalRoute(href);

  if (internal && !caseRoutesEnabled) {
    return (
      <span className={className} data-route-pending="true" aria-disabled="true">
        {children}
      </span>
    );
  }

  if (internal) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}
