import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { coreProjects, showcaseProjects, projects, leadRadarPipeline } from "@/content/projects";
import { cases } from "@/content/cases";
import { profile } from "@/content/profile";
import { CaseBand } from "@/components/case/CaseBand";
import { CaseGallery } from "@/components/case/CaseGallery";
import { EvidenceBand } from "@/components/case/EvidencePlate";
import { SystemMap } from "@/components/graphics/SystemMap";
import { DistortionField } from "@/components/graphics/DistortionField";
import { MetaTable } from "@/components/ui/MetaTable";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectMedia } from "@/components/graphics/ProjectMedia";

export function generateStaticParams() {
  // only the three core systems have a case page; the landings are shown as examples
  return coreProjects.filter((p) => cases[p.slug]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const study = cases[slug];
  if (!project || !study) return {};
  const title = `${project.name} — ${profile.name}`;
  const url = `/work/${slug}`;
  return {
    title,
    description: study.deck,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description: study.deck, url },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const study = cases[slug];
  // the landings used to have case pages; their URLs now resolve to the examples band
  if (project?.tier === "web") redirect("/work#web");
  if (!project || !study) notFound();

  // the chain runs through the projects the homepage shows, so it never lands on a
  // case with nothing to look at. ROUTE sits outside it and points back in.
  const order = showcaseProjects.findIndex((p) => p.slug === slug);
  const next =
    order === -1
      ? showcaseProjects[0]!
      : showcaseProjects[(order + 1) % showcaseProjects.length]!;
  const media = project.visual.kind === "media" ? project.visual : null;
  /** the evidence band takes a number of its own, so everything after it moves up one */
  const bandId = (n: number) => String(study.evidence ? n + 1 : n).padStart(2, "0");

  return (
    <>
      {/* ---- head ---- */}
      <section className="band band--eager pt-6 lg:pt-10" data-field="low" aria-labelledby="case-name">
        <DistortionField variant="calm" />
        <div className="wrap relative">
          <div className="grid12 rule-b pb-3">
            <span className="nano col-span-1">({project.index})</span>
            <span className="nano col-span-3 md:col-span-3 lg:col-span-5">
              {project.type} · {project.year}
            </span>
            <span className="nano col-span-4 md:col-span-2 lg:col-span-6 mt-2 md:mt-0 md:justify-self-end">
              CASE STUDY · {`0${coreProjects.findIndex((p) => p.slug === slug) + 1}/0${coreProjects.length}`}
            </span>
          </div>

          <div className="grid12 pt-10 lg:pt-14">
            <Reveal as="h1" className="h1 col-span-4 md:col-span-6 lg:col-span-8">
              <span id="case-name">{project.name}</span>
            </Reveal>
            <Reveal delay={1} className="col-span-4 md:col-span-6 lg:col-span-6 mt-6 lg:mt-8">
              <p className="lead">{study.deck}</p>
            </Reveal>
            <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9 mt-8 lg:mt-8">
              <MetaTable
                dense
                rows={[
                  { k: "ROLE", v: project.role },
                  { k: "STACK", v: project.stack.join(" · ") },
                  { k: "STATUS", v: project.status },
                ]}
              />
              <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
                {project.links
                  .filter((l) => l.href.startsWith("http"))
                  .map((link) => (
                    <li key={link.label}>
                      <a
                        className="ctl"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span>{link.label}</span>
                        <span className="ctl__mark" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* hero visual: the system map for 01, real media where it exists */}
        {slug === "lead-radar" ? (
          <div className="wrap pt-10 lg:pt-14">
            <span className="nano">SYSTEM MAP · 08 NODES</span>
            <SystemMap nodes={leadRadarPipeline} />
          </div>
        ) : study.stageMap ? (
          <div className="wrap pt-10 lg:pt-14">
            <span className="nano">
              STAGE MAP · 0{study.stageMap.length} ЭТАПА · 05 ЭКРАНОВ
            </span>
            <SystemMap nodes={study.stageMap} />
          </div>
        ) : media && media.processed ? (
          <div className="wrap pt-10 lg:pt-14">
            <ProjectMedia
              processed={media.clean ?? media.processed}
              alt={media.alt ?? project.name}
              ratio={media.ratio}
              index={project.index}
              caption="CASE DEFAULT · CLEAN"
              showClean
              priority
            />
          </div>
        ) : null}
      </section>

      <CaseBand id="01" title="CONTEXT" body={study.context} />
      <CaseBand id="02" title="PROBLEM" body={study.problem} />
      <CaseBand id="03" title="APPROACH" body={study.approach} />

      {study.system ? (
        <CaseBand id="04" title="SYSTEM / ARCHITECTURE">
          <dl>
            {study.system.map((row) => (
              <Reveal key={row.k} className="rule-t py-4">
                <dt className="micro micro-ink">{row.k}</dt>
                <dd className="body mt-1" style={{ maxWidth: "52ch" }}>
                  {row.v}
                </dd>
              </Reveal>
            ))}
          </dl>
        </CaseBand>
      ) : null}

      {study.evidence ? (
        <EvidenceBand
          id={study.system ? "05" : "04"}
          title={study.evidence.title}
          note={study.evidence.note}
          plates={study.evidence.plates}
        />
      ) : null}

      <CaseBand id={bandId(study.system ? 5 : 4)} title="IMPLEMENTATION">
        <ul>
          {study.implementation.map((line) => (
            <Reveal
              key={line}
              as="li"
              className="body mb-4 flex gap-3 last:mb-0"
              style={{ maxWidth: "52ch" }}
            >
              <span aria-hidden="true" className="nano mt-1.5">
                ·
              </span>
              <span>{line}</span>
            </Reveal>
          ))}
        </ul>
        {study.technicalEvidence ? (
          <div className="rule-t mt-8 pt-3">
            <span className="nano block">TECHNICAL EVIDENCE</span>
            {study.technicalEvidence.map((line) => (
              <p key={line} className="nano mt-2 max-w-[62ch]">
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </CaseBand>

      {study.result ? (
        <CaseBand id={bandId(study.system ? 6 : 5)} title="RESULT">
          <ul>
            {study.result.map((line) => (
              <Reveal
                key={line}
                as="li"
                className="h3 mb-5 last:mb-0"
                style={{ fontWeight: 400, maxWidth: "24ch" }}
              >
                {line}
              </Reveal>
            ))}
          </ul>
        </CaseBand>
      ) : null}

      {study.gallery ? <CaseGallery items={study.gallery} /> : null}

      {study.pending || study.sourceNote ? (
        <div className="wrap pt-10">
          <div className="rule-t pt-3">
            {study.pending ? <p className="nano max-w-[70ch]">{study.pending}</p> : null}
            {study.sourceNote ? (
              <p className="nano mt-2 max-w-[70ch]">{study.sourceNote}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* ---- next project ---- */}
      <section className="band pt-20 lg:pt-28 pb-20 lg:pb-28" data-field="none">
        <div className="wrap">
          <div className="grid12 rule-t pt-4">
            <span className="nano col-span-2 md:col-span-2 lg:col-span-3">NEXT PROJECT</span>
            <Link
              href={`/work/${next.slug}`}
              className="col-span-4 md:col-span-6 lg:col-span-9 link-arrow mt-3 md:mt-0"
            >
              <span className="h2" style={{ fontWeight: 500 }}>
                {next.name}
              </span>
              <span className="micro" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
          <div className="grid12 mt-8">
            <Link href="/work" className="micro link-arrow col-span-4 md:col-span-3 lg:col-span-3">
              ALL WORK <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/" className="micro link-arrow col-span-4 md:col-span-3 lg:col-span-3 mt-3 md:mt-0">
              HOME <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
