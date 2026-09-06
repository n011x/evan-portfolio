import type { Metadata } from "next";
import Link from "next/link";
import { coreProjects, projects, webExamples } from "@/content/projects";
import { cases } from "@/content/cases";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";
import { WebExamples } from "@/components/work/WebExamples";
import { DistortionField } from "@/components/graphics/DistortionField";

const description =
  "Пять проектов: сервисы, агенты, интерфейсы и веб. Три открываются по ссылке.";

export const metadata: Metadata = {
  title: `WORK — ${profile.name}`,
  description,
  alternates: { canonical: "/work" },
  openGraph: { title: `WORK — ${profile.name}`, description, url: "/work" },
};

/**
 * The archive is one page: the three core systems as an editorial index, then the landing
 * work as a compact examples band. No filter UI — three cases do not need one, and
 * `type`/`tags` already live in the data model for the day the archive grows.
 */
export default function WorkPage() {
  const live = projects.filter((p) => p.links.some((l) => l.label === "LIVE")).length;

  return (
    <>
      <section className="band band--eager pt-6 lg:pt-10" data-field="low" aria-labelledby="work-index-title">
        <DistortionField variant="work" />
        <div className="wrap relative">
          <div className="grid12 rule-b pb-3">
            <span className="nano col-span-2 md:col-span-2 lg:col-span-3">
              {profile.year} · BUILD {profile.build}
            </span>
            <span className="nano col-span-2 md:col-span-2 lg:col-span-4">WORK / INDEX</span>
            <span className="nano col-span-4 md:col-span-2 lg:col-span-5 mt-2 md:mt-0 md:justify-self-end">
              {String(coreProjects.length).padStart(2, "0")} CORE · {String(webExamples.length).padStart(2, "0")} WEB · {String(live).padStart(2, "0")} LIVE LINKS
            </span>
          </div>

          <div className="grid12 pt-12 lg:pt-16 pb-10 lg:pb-16">
            <Reveal as="h1" className="display col-span-4 md:col-span-6 lg:col-span-9">
              <span id="work-index-title">WORK</span>
            </Reveal>
          </div>

          {/* index rows */}
          <ul>
            {coreProjects.map((project) => (
              <li key={project.slug}>
                <Reveal kind="rule" className="rule-t block" />
                <Link href={`/work/${project.slug}`} className="grid12 items-baseline py-6 lg:py-7 group">
                  <span className="nano col-span-1">({project.index})</span>
                  <span className="h3 col-span-3 md:col-span-3 lg:col-span-4">{project.name}</span>
                  <span className="nano col-span-2 md:col-span-1 lg:col-span-2 mt-3 md:mt-0">
                    {project.type}
                  </span>
                  <span className="nano col-span-2 md:col-span-1 lg:col-span-1 mt-3 md:mt-0">
                    {project.year}
                  </span>
                  <span className="nano col-span-4 md:col-span-1 lg:col-span-2 mt-3 md:mt-0">
                    {project.status}
                  </span>
                  <span className="micro micro-ink col-span-4 md:col-span-1 lg:col-span-2 mt-3 md:mt-0 md:justify-self-end">
                    {cases[project.slug] ? "VIEW CASE ↗" : "IN PREPARATION"}
                  </span>
                </Link>
                <div className="grid12 pb-6">
                  <p className="body col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-2">
                    {project.summary}
                  </p>
                  <p className="nano col-span-4 md:col-span-2 lg:col-span-3 lg:col-start-9 mt-3 lg:mt-0">
                    STACK · {project.stack.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rule-t" />
        </div>
      </section>

      <WebExamples id="02" />

      {/* the archive's way back — it used to live under the contact sheet */}
      <div className="wrap pb-20 lg:pb-28">
        <div className="grid12 rule-t pt-4">
          <Link
            href="/"
            className="micro link-arrow col-span-4 md:col-span-3 lg:col-span-3 lg:col-start-10 md:justify-self-end"
          >
            HOME <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </>
  );
}
