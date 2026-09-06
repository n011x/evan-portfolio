import type { Project } from "@/content/projects";
import { MediaSlot } from "@/components/graphics/MediaSlot";
import { DistortionField } from "@/components/graphics/DistortionField";
import { ProjectIndex, ProjectLinks, StackLine } from "./ProjectHead";

const stages = ["ПОРТФОЛИО", "ОТКЛИКИ", "ИНТЕРВЬЮ", "ОФФЕР"];

/** ARCHETYPE C — oversized type clipped at the frame edge + screen filmstrip. */
export function ProjectTypographic({ project }: { project: Project }) {
  const frames =
    project.visual.kind === "filmstrip" ? project.visual.frames : 0;
  const ratio = project.visual.kind === "filmstrip" ? project.visual.ratio : "9 / 19.5";

  return (
    <article
      className="band pt-14 lg:pt-20"
      data-field="medium"
      aria-labelledby={`project-${project.slug}`}
      style={{ overflow: "clip" }}
    >
      <DistortionField variant="route" />
      <div className="wrap relative">
        <div className="grid12 items-end">
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <ProjectIndex index={project.index} />
          </div>
          <div className="col-span-2 md:col-span-4 lg:col-span-9 justify-self-end">
            <span
              className="nano inline-block px-2 py-1"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* the name is a graphic object: it leaves the container and clips at the viewport */}
      <h3
        id={`project-${project.slug}`}
        className="display mt-2 whitespace-nowrap"
        style={{
          marginLeft: "var(--margin)",
          fontSize: "clamp(5.5rem, 27vw, 22rem)",
          lineHeight: 0.78,
        }}
      >
        {project.name}
      </h3>

      <div className="wrap">
        <div className="grid12" style={{ marginTop: "clamp(0.5rem, 1.4vw, 1.75rem)" }}>
          <div className="col-span-4 md:col-span-2 lg:col-span-3 relative z-10">
            <ol className="rule-t pt-3">
              {stages.map((stage, i) => (
                <li key={stage} className="flex items-baseline gap-3 py-1">
                  <span className="nano">0{i + 1}</span>
                  <span className="micro micro-ink">{stage}</span>
                </li>
              ))}
            </ol>
            <p className="lead mt-6 text-[1rem] lg:text-[1.0625rem]">{project.summary}</p>
            <div className="mt-6">
              <StackLine stack={project.stack} />
            </div>
            <div className="mt-6">
              <ProjectLinks project={project} />
            </div>
            <p className="nano mt-6 flex items-center gap-2">
              <span className="signal-dot" aria-hidden="true" />
              <span className="signal">IN PROGRESS</span>
            </p>
          </div>

          <div
            className="col-span-4 md:col-span-4 lg:col-span-8 lg:col-start-5 mt-10 md:mt-6 lg:mt-0"
            style={{ marginRight: "calc(var(--margin) * -1)" }}
          >
            <div
              className="flex items-start gap-2 lg:gap-3 overflow-x-auto pb-2"
              tabIndex={0}
              role="group"
              aria-label="Экраны продукта — горизонтальная лента"
            >
              {Array.from({ length: frames }).map((_, i) => (
                <div key={i} className="shrink-0 w-[38%] md:w-[30%] lg:w-[19%]">
                  <MediaSlot
                    ratio={ratio}
                    index={`0${i + 1}`}
                    note={`SCREEN 0${i + 1}`}
                    status="pending"
                    compact
                  />
                </div>
              ))}
            </div>
            <p className="nano mt-3 pr-[var(--margin)] lg:pr-0">
              05 SCREENS · VISUAL PENDING
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
