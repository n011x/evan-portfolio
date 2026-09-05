import { archiveProjects, featuredProjects } from "@/content/projects";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectDiagram } from "./ProjectDiagram";
import { ProjectMetrics } from "./ProjectMetrics";
import { ProjectTypographic } from "./ProjectTypographic";
import { ProjectWide } from "./ProjectWide";

export function SelectedWork() {
  const [p1, p2, p3, p4] = featuredProjects;

  return (
    <section id="work" className="band pt-16 lg:pt-24" aria-labelledby="work-title">
      <SectionHeader
        id="02"
        name="SELECTED WORK"
        right="04 FEATURED · 05 TOTAL"
      />
      <span id="work-title" className="sr-only">
        Избранные работы
      </span>

      {p1 ? <ProjectDiagram project={p1} /> : null}
      {p2 ? <ProjectMetrics project={p2} /> : null}
      {p3 ? <ProjectTypographic project={p3} /> : null}
      {p4 ? <ProjectWide project={p4} /> : null}

      <div className="wrap pt-20 lg:pt-28 pb-24 lg:pb-40">
        <ul>
          {archiveProjects.map((project) => (
            <li key={project.slug} className="rule-t rule-b">
              <div className="grid12 items-baseline py-5">
                <span className="nano col-span-1 md:col-span-1 lg:col-span-1">
                  ({project.index})
                </span>
                <span className="h3 col-span-3 md:col-span-2 lg:col-span-3">{project.name}</span>
                <span className="nano col-span-2 md:col-span-1 lg:col-span-2 mt-3 md:mt-0">
                  {project.type} · {project.year}
                </span>
                <span className="nano col-span-2 md:col-span-1 lg:col-span-2 mt-3 md:mt-0">
                  {project.status}
                </span>
                <MaybeLink
                  href="/work"
                  className="micro link-arrow col-span-4 md:col-span-1 lg:col-span-4 mt-3 lg:mt-0 lg:justify-self-end"
                >
                  ARCHIVE <span aria-hidden="true">↗</span>
                </MaybeLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="grid12 mt-10 lg:mt-12">
          <MaybeLink
            href="/work"
            className="col-span-4 md:col-span-6 lg:col-span-12 flex items-baseline justify-between gap-6 rule-b pb-4"
          >
            <span className="h2" style={{ fontWeight: 500 }}>
              ALL WORK (05)
            </span>
            <span className="h3" aria-hidden="true">
              ↗
            </span>
          </MaybeLink>
        </div>
      </div>
    </section>
  );
}
