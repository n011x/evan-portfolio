import type { Project } from "@/content/projects";
import { MediaSlot } from "@/components/graphics/MediaSlot";
import { ProjectMedia } from "@/components/graphics/ProjectMedia";
import { DistortionField } from "@/components/graphics/DistortionField";
import { GlassPlate } from "@/components/ui/GlassPlate";
import { MetaRow } from "@/components/ui/MetaTable";
import { FactList, ProjectIndex, ProjectLinks } from "./ProjectHead";

/** ARCHETYPE D — one large interface fragment, name crossing its edge. */
export function ProjectWide({ project }: { project: Project }) {
  const media = project.visual.kind === "media" ? project.visual : null;
  const ratio = media ? media.ratio : "21 / 9";
  const note = media ? media.note : "";

  return (
    <article className="band pt-14 lg:pt-20" data-field="low" aria-labelledby={`project-${project.slug}`}>
      <DistortionField variant="media" />
      <div className="wrap relative">
        <div className="grid12 rule-t pt-3">
          <span className="nano col-span-2 md:col-span-2 lg:col-span-3">
            {project.type} · {project.year}
          </span>
          <span className="nano col-span-2 md:col-span-4 lg:col-span-9 justify-self-end">
            {project.status}
          </span>
        </div>
      </div>

      <div className="mt-6 relative" style={{ paddingInline: 0 }}>
        {media && media.processed ? (
          <ProjectMedia
            processed={media.processed}
            clean={media.clean}
            alt={media.alt ?? project.name}
            ratio={ratio}
            index={project.index}
            caption={note}
          />
        ) : (
          <MediaSlot ratio={ratio} index={project.index} note={note} status="capture" />
        )}
        <GlassPlate
          rows={[
            { k: "CROP", v: "HERO REGION" },
            { k: "STATE", v: "PROCESSED → CLEAN" },
          ]}
          className="absolute right-[var(--margin)] bottom-6 hidden md:block w-[200px]"
        />
      </div>

      <div className="wrap">
        <div className="grid12" style={{ marginTop: "clamp(-2.5rem, -2.4vw, -1rem)" }}>
          <div className="col-span-4 md:col-span-4 lg:col-span-7 relative z-10">
            <h3 id={`project-${project.slug}`} className="h1">
              {project.name}
            </h3>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-4 lg:col-start-9 mt-6 lg:mt-0 lg:self-end">
            <ProjectIndex index={project.index} />
          </div>
        </div>

        <div className="grid12 mt-8">
          <div className="col-span-4 md:col-span-3 lg:col-span-5">
            <p className="lead">{project.summary}</p>
            <FactList facts={project.result} />
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-6 lg:col-start-7 mt-8 md:mt-0">
            <MetaRow
              rows={[
                { k: "TYPE", v: project.type },
                { k: "YEAR", v: project.year },
                { k: "ROLE", v: project.role },
                { k: "STACK", v: project.stack.join(" · ") },
                { k: "STATUS", v: project.status },
              ]}
            />
            <div className="mt-6">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
