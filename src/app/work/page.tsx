import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/content/projects";
import { cases } from "@/content/cases";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";
import { DistortionField } from "@/components/graphics/DistortionField";
import { RegMarks } from "@/components/ui/RegMarks";

const description =
  "Пять проектов: сервисы, агенты, интерфейсы и веб. Три открываются по ссылке.";

export const metadata: Metadata = {
  title: `WORK — ${profile.name}`,
  description,
  alternates: { canonical: "/work" },
  openGraph: { title: `WORK — ${profile.name}`, description, url: "/work" },
};

/**
 * The archive in v1 is one page: an editorial index of every project plus a contact sheet
 * of processed thumbnails. No filter UI — five projects do not need one, and `type`/`tags`
 * already live in the data model for the day the archive grows.
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
              {String(projects.length).padStart(2, "0")} PROJECTS · {String(live).padStart(2, "0")} LIVE LINKS
            </span>
          </div>

          <div className="grid12 pt-12 lg:pt-16 pb-10 lg:pb-16">
            <Reveal as="h1" className="display col-span-4 md:col-span-6 lg:col-span-9">
              <span id="work-index-title">WORK</span>
            </Reveal>
          </div>

          {/* index rows */}
          <ul>
            {projects.map((project) => (
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

      {/* contact sheet */}
      <section className="band pt-16 lg:pt-24 pb-20 lg:pb-28" data-field="min" aria-labelledby="sheet-title">
        <div className="wrap">
          <div className="grid12 rule-t pt-3">
            <span className="nano col-span-1">/ CS</span>
            <h2 id="sheet-title" className="micro micro-ink col-span-3 md:col-span-3 lg:col-span-5">
              CONTACT SHEET
            </h2>
            <span className="nano col-span-4 md:col-span-2 lg:col-span-6 mt-2 md:mt-0 md:justify-self-end">
              PROCESSED · ORDERED DITHER
            </span>
          </div>

          <ul className="grid12 pt-8">
            {projects.map((project) => {
              const media = project.visual.kind === "media" ? project.visual : null;
              return (
                <li key={project.slug} className="col-span-2 md:col-span-2 lg:col-span-3 mb-8">
                  <Reveal>
                    <Link href={`/work/${project.slug}`} className="block">
                      <figure
                        className="relative"
                        style={{
                          aspectRatio: "16 / 10",
                          border: "1px solid var(--rule)",
                          background: "var(--paper-2)",
                        }}
                      >
                        {media?.processed ? (
                          <Image
                            src={`/media/${media.processed}.webp`}
                            alt={media.alt ?? project.name}
                            fill
                            sizes="(max-width: 767px) 50vw, 25vw"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <span className="nano absolute left-3 top-3">VISUAL PENDING</span>
                        )}
                        <RegMarks inset={6} size={8} />
                      </figure>
                      <span className="nano mt-2 block">
                        ({project.index}) {project.name}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          {/* calibration wedge — the archive's own system marker */}
          <div className="grid12 pt-6">
            <div className="col-span-4 md:col-span-3 lg:col-span-3">
              <div aria-hidden="true" className="flex h-4 w-full max-w-[200px]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1"
                    style={{ background: `rgba(11,11,12,${0.06 + i * 0.1})` }}
                  />
                ))}
              </div>
              <span className="nano mt-2 block">CALIBRATION</span>
            </div>
            <Link href="/" className="micro link-arrow col-span-4 md:col-span-3 lg:col-span-3 lg:col-start-10 mt-6 lg:mt-0 md:justify-self-end">
              HOME <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
