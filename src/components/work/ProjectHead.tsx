import type { Project } from "@/content/projects";
import { MaybeLink } from "@/components/ui/MaybeLink";

/** Oversized parenthetical index + project name. Shared identity, varied placement. */
export function ProjectIndex({ index }: { index: string }) {
  return (
    <span
      aria-hidden="true"
      className="display-2 block"
      style={{ color: "var(--ghost-index)", fontWeight: 500, lineHeight: 0.8 }}
    >
      ({index})
    </span>
  );
}

/**
 * Six controls on the homepage say VIEW CASE, VIEW LIVE, LIVE or SOURCE and nothing
 * else, so a screen reader announces the same link four times over. The label names
 * the destination — and keeps the visible words in front of it, because an accessible
 * name that drops the visible text fails WCAG 2.5.3 (Label in Name).
 */
export function describeLink(label: string, project: Project): string | undefined {
  switch (label) {
    case "VIEW CASE":
      return `VIEW CASE — открыть кейс ${project.name}`;
    case "VIEW LIVE":
      return `VIEW LIVE — открыть демоверсию лендинга ${project.name}`;
    case "LIVE":
      return `LIVE — открыть сайт-презентацию ${project.name}`;
    case "SOURCE":
      return `SOURCE — открыть исходный код ${project.name} на GitHub`;
    default:
      return undefined;
  }
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-3">
      {project.links.map((link) => (
        <li key={link.label}>
          <MaybeLink className="ctl" href={link.href} aria-label={describeLink(link.label, project)}>
            <span>{link.label}</span>
            <span className="ctl__mark" aria-hidden="true">
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
