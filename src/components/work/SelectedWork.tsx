import { showcaseProjects } from "@/content/projects";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectDiagram } from "./ProjectDiagram";
import { ProjectMetrics } from "./ProjectMetrics";

export function SelectedWork() {
  const [p1, p2] = showcaseProjects;

  return (
    <section id="work" className="band pt-12 lg:pt-16" aria-labelledby="work-title">
      <SectionHeader id="02" name="CORE WORK" right={`0${showcaseProjects.length} SYSTEMS`} />
      <span id="work-title" className="sr-only">
        Основные работы
      </span>

      {p1 ? <ProjectDiagram project={p1} /> : null}
      {p2 ? <ProjectMetrics project={p2} /> : null}

      <div className="wrap pt-10 lg:pt-14 pb-4 lg:pb-6">
        <div className="grid12">
          <MaybeLink
            href="/work"
            className="col-span-4 md:col-span-6 lg:col-span-12 flex items-baseline justify-between gap-6 rule-b pb-4"
          >
            <span className="h2" style={{ fontWeight: 500 }}>
              ALL WORK
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
