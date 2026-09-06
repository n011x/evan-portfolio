import Image from "next/image";
import { webExamples } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Landing work, shown as a range rather than as products. These are not case studies and
 * deliberately carry none of the case grammar — no ROLE, no RESULT, no system map, no
 * pagination. One preview, one line, one live link each.
 */
export function WebExamples({ id = "05" }: { id?: string }) {
  return (
    <section id="web" className="band pt-16 lg:pt-24" aria-labelledby="web-title">
      <SectionHeader id={id} name="WEB / LANDING" right={`0${webExamples.length} EXAMPLES`} />
      <span id="web-title" className="sr-only">
        Веб и лендинги
      </span>

      <div className="wrap">
        <p className="body col-span-4 mt-4 lg:mt-6" style={{ maxWidth: "52ch" }}>
          Собираю лендинги и небольшие веб-инструменты под задачу. Ниже — примеры
          исполнения, а не отдельные продукты.
        </p>

        <ul className="grid12 mt-10 lg:mt-14">
          {webExamples.map((project, i) => {
            const clean = project.visual.kind === "media" ? project.visual.clean : null;
            const live = project.links.find((l) => l.label === "LIVE");
            return (
              <Reveal
                as="li"
                key={project.slug}
                delay={i === 0 ? 1 : 2}
                className="web-example col-span-4 md:col-span-3 lg:col-span-6 mb-12 md:mb-0"
              >
                <div
                  className="rule-t web-preview relative overflow-hidden"
                  style={{ aspectRatio: "16 / 10", background: "var(--paper-2)" }}
                >
                  {clean ? (
                    <Image
                      src={`/media/${clean}.webp`}
                      alt={`Главный экран проекта ${project.name}`}
                      fill
                      sizes="(min-width: 1024px) 44vw, 92vw"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  ) : null}
                </div>

                <div className="grid12 mt-4">
                  <h3 className="h4 col-span-3 md:col-span-2 lg:col-span-4">{project.name}</h3>
                  <span className="nano col-span-1 md:col-span-1 lg:col-span-2 justify-self-end">
                    {project.type}
                  </span>
                </div>
                <p className="body mt-2" style={{ maxWidth: "44ch" }}>
                  {project.summary}
                </p>
                <p className="nano mt-3">{project.stack.join(" · ")}</p>

                {live ? (
                  <a
                    className="ctl mt-5"
                    href={live.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span>VIEW LIVE</span>
                    <span className="ctl__mark" aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
