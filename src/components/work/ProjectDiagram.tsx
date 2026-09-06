import type { Project } from "@/content/projects";
import { leadRadarPipeline } from "@/content/projects";
import { SystemMap } from "@/components/graphics/SystemMap";
import { DistortionField } from "@/components/graphics/DistortionField";
import { MetaTable } from "@/components/ui/MetaTable";
import { GlassPlate } from "@/components/ui/GlassPlate";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectIndex, ProjectLinks, StackLine } from "./ProjectHead";

/**
 * ARCHETYPE A — SYSTEM. The map arrives before the name: the architecture is the
 * argument, the title only labels it.
 */
export function ProjectDiagram({ project }: { project: Project }) {
  return (
    <article
      className="band"
      data-field="medium"
      style={{ background: "var(--paper-2)", borderBlock: "1px solid var(--rule)" }}
      aria-labelledby={`project-${project.slug}`}
    >
      <DistortionField variant="work" />
      <div className="wrap relative pt-8 lg:pt-12">
        <div className="grid12 rule-b pb-3">
          <span className="nano col-span-1 lg:col-span-1">({project.index})</span>
          <span className="nano col-span-3 md:col-span-3 lg:col-span-5">
            {project.type} · {project.year}
          </span>
          <span className="nano col-span-4 md:col-span-2 lg:col-span-6 mt-2 md:mt-0 md:justify-self-end">
            SYSTEM MAP
          </span>
        </div>
      </div>

      {/*
        One grid, reordered per breakpoint. On desktop the map still comes first — the
        architecture is the argument. On a phone it used to mean eight numbered nodes
        before the reader learned whose they were, so there the name, the summary and
        the stack come first and the map follows them.
      */}
      <div className="wrap relative pb-8 lg:pb-12">
        <div className="grid12">
          <div className="order-3 col-span-4 md:order-1 md:col-span-6 lg:col-span-12 relative mt-8 md:mt-0">
            <SystemMap nodes={leadRadarPipeline} />
            <GlassPlate
              rows={[
                { k: "DIGEST WINDOW", v: "10:00 / 16:00" },
                { k: "PER WINDOW", v: "MAX 10 CARDS" },
              ]}
              className="absolute right-0 top-0 hidden lg:block w-[200px]"
            />
          </div>

          {/* the hairline belongs under the map, which only happens on desktop */}
          <div
            aria-hidden="true"
            className="order-2 col-span-4 hidden rule-t md:order-2 md:col-span-6 md:mb-6 md:block lg:col-span-12 lg:mb-8"
          />

          <Reveal className="order-1 col-span-4 rule-t pt-6 md:order-3 md:col-span-4 md:border-t-0 md:pt-0 lg:col-span-5">
            <h3 id={`project-${project.slug}`} className="h1">
              {project.name}
            </h3>
          </Reveal>

          <div className="order-2 col-span-4 mt-6 md:order-4 md:col-span-2 lg:col-span-4 lg:mt-1">
            <p className="body">{project.summary}</p>
            <div className="mt-5">
              <StackLine stack={project.stack} />
            </div>
          </div>

          <div className="order-4 col-span-4 mt-8 md:order-5 md:col-span-6 lg:col-span-3 lg:mt-0">
            <MetaTable
              dense
              rows={[
                { k: "ROLE", v: project.role },
                { k: "STATUS", v: project.status },
              ]}
            />
            <div className="mt-5">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap pb-8 lg:pb-10">
        <div className="grid12">
          <span className="col-span-4 md:col-span-6 lg:col-span-12">
            <ProjectIndex index={project.index} />
          </span>
        </div>
      </div>
    </article>
  );
}
