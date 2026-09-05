import { coreProjects } from "@/content/projects";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectDiagram } from "./ProjectDiagram";
import { ProjectMetrics } from "./ProjectMetrics";
import { ProjectTypographic } from "./ProjectTypographic";

export function SelectedWork() {
  const [p1, p2, p3] = coreProjects;

  return (
    <section id="work" className="band pt-16 lg:pt-24" aria-labelledby="work-title">
      <SectionHeader id="02" name="CORE WORK" right={`0${coreProjects.length} SYSTEMS`} />
      <span id="work-title" className="sr-only">
        Основные работы
      </span>

      {p1 ? <ProjectDiagram project={p1} /> : null}
      {p2 ? <ProjectMetrics project={p2} /> : null}
      {p3 ? <ProjectTypographic project={p3} /> : null}

      <div className="wrap pt-20 lg:pt-28 pb-16 lg:pb-24">
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
