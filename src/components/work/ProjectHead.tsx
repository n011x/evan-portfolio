import type { Project } from "@/content/projects";
import { MaybeLink } from "@/components/ui/MaybeLink";

/** Oversized parenthetical index + project name. Shared identity, varied placement. */
export function ProjectIndex({ index }: { index: string }) {
  return (
    <span
      aria-hidden="true"
      className="display-2 block"
      style={{ color: "var(--paper-3)", fontWeight: 500, lineHeight: 0.8 }}
    >
      ({index})
    </span>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-3">
      {project.links.map((link) => (
        <li key={link.label}>
          <MaybeLink className="link-arrow" href={link.href}>
            <span className="micro micro-ink">{link.label}</span>
            <span className="nano" aria-hidden="true">
              ↗
            </span>
          </MaybeLink>
        </li>
      ))}
    </ul>
  );
}

export function StackLine({ stack }: { stack: string[] }) {
  return (
    <p className="nano">
      STACK · {stack.join(" · ")}
    </p>
  );
}

export function FactList({ facts }: { facts: string[] }) {
  if (facts.length === 0) return null;
  return (
    <ul className="mt-4">
      {facts.map((fact) => (
        <li key={fact} className="micro flex gap-2">
          <span aria-hidden="true">·</span>
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  );
}
