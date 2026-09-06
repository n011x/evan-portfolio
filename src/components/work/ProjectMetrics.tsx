import type { Project } from "@/content/projects";
import { MediaSlot } from "@/components/graphics/MediaSlot";
import { ProjectMedia } from "@/components/graphics/ProjectMedia";
import { GlassPlate } from "@/components/ui/GlassPlate";
import { Reveal } from "@/components/motion/Reveal";
import { MetaTable } from "@/components/ui/MetaTable";
import { FactList, ProjectIndex, ProjectLinks, StackLine } from "./ProjectHead";

/**
 * ARCHETYPE B — RUNNING PRODUCT. The confirmed numbers build the composition;
 * they sit at three different scales in three different grid zones. The screenshot
 * is supporting evidence, not the subject.
 */
export function ProjectMetrics({ project }: { project: Project }) {
  const [first, second, third] = project.metrics ?? [];

  return (
    <article className="band pt-14 lg:pt-20" data-field="low" aria-labelledby={`project-${project.slug}`}>
      <div className="wrap">
        <div className="grid12 rule-t pt-3">
          <span className="nano col-span-1 lg:col-span-1">({project.index})</span>
          <span className="nano col-span-3 md:col-span-3 lg:col-span-5">
            {project.type} · {project.year}
          </span>
          <span className="nano col-span-4 md:col-span-2 lg:col-span-6 mt-2 md:mt-0 md:justify-self-end">
            {project.status}
          </span>
        </div>

        <div className="grid12 mt-6 lg:mt-8">
          <Reveal as="h3" className="h1 col-span-4 md:col-span-4 lg:col-span-6">
            <span id={`project-${project.slug}`}>{project.name}</span>
          </Reveal>
          <p className="body col-span-4 md:col-span-2 lg:col-span-4 lg:col-start-9 mt-5 lg:mt-2">
            {project.summary}
          </p>
        </div>

        {/* metric cluster */}
        <div className="grid12 mt-10 lg:mt-14 items-end">
          {first ? (
            <div className="col-span-4 md:col-span-4 lg:col-span-5">
              <span
                className="num block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "var(--fs-h2)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                {first.value}
              </span>
              <span className="nano rule-t mt-3 block pt-2">{first.label}</span>
            </div>
          ) : null}

          {second ? (
            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:col-start-7 mt-8 lg:mt-0 lg:pb-6">
              <span
                className="num block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "var(--fs-h3)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {second.value}
              </span>
              <span className="nano rule-t mt-3 block pt-2 max-w-[14ch]">{second.label}</span>
            </div>
          ) : null}

          {third ? (
            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:col-start-11 mt-8 lg:mt-0 lg:self-start">
              <span
                className="num block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "var(--fs-h4)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {third.value}
              </span>
              <span className="nano rule-t mt-3 block pt-2 max-w-[14ch]">{third.label}</span>
            </div>
          ) : null}
        </div>

        {/* supporting evidence */}
        <div className="grid12 mt-12 lg:mt-16 items-start">
          <div className="col-span-4 md:col-span-2 lg:col-span-4">
            <MetaTable
              dense
              rows={[
                { k: "ROLE", v: project.role },
                { k: "STATUS", v: project.status },
              ]}
            />
            <div className="mt-5">
              <StackLine stack={project.stack} />
              <FactList facts={project.result} />
            </div>
            <div className="mt-6">
              <ProjectLinks project={project} />
            </div>
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-7 lg:col-start-6 mt-10 md:mt-0 -mr-[var(--margin)] relative">
            {project.visual.kind === "media" && project.visual.processed ? (
              <>
                <ProjectMedia
                  processed={project.visual.processed}
                  clean={project.visual.clean}
                  alt={project.visual.alt ?? project.name}
                  ratio={project.visual.ratio}
                  index={project.index}
                  caption={project.visual.note}
                />
                {project.visual.clean ? (
                  <div className="absolute left-4 bottom-10 hidden lg:block w-[34%]">
                    <ProjectMedia
                      processed={project.visual.clean}
                      alt={`${project.name} — чистый фрагмент интерфейса`}
                      ratio="16 / 10"
                      index={project.index}
                      caption="CLEAN PROOF"
                    />
                  </div>
                ) : null}
                <GlassPlate
                  rows={[
                    { k: "PROJECT 02", v: "LIVE · 2026" },
                    { k: "SINCE", v: "06.2026" },
                  ]}
                  className="absolute right-[var(--margin)] top-5 hidden md:block w-[190px]"
                />
              </>
            ) : project.visual.kind === "media" ? (
              <MediaSlot
                ratio={project.visual.ratio}
                index={project.index}
                note={project.visual.note}
                status={project.visual.status === "ready" ? "capture" : project.visual.status}
              />
            ) : null}
          </div>
        </div>

        <div className="grid12 mt-10 hidden md:grid">
          <span className="col-span-4 md:col-span-6 lg:col-span-12 lg:justify-self-end">
            <ProjectIndex index={project.index} />
          </span>
        </div>
      </div>
    </article>
  );
}
