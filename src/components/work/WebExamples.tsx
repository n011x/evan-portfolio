import { webExamples } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Landing work, shown as a range rather than as products. These are not case studies and
 * deliberately carry none of the case grammar — no ROLE, no RESULT, no system map, no
 * pagination. A screenshot of a landing proves nothing a live link does not prove better,
 * so each one is a single row: name, type, one line, stack, the site itself.
 */
export function WebExamples({ id = "04" }: { id?: string }) {
  return (
    <section
      id="web"
      className="band pt-16 lg:pt-24"
      aria-labelledby="web-title"
    >
      <SectionHeader
        id={id}
        name="WEB / LANDING"
        right={`0${webExamples.length} EXAMPLES`}
      />
      <span id="web-title" className="sr-only">
        Веб и лендинги
      </span>

      <div className="wrap pb-16 lg:pb-24">
        <p className="body" style={{ maxWidth: "52ch" }}>
          Собираю лендинги и небольшие веб-инструменты под задачу. Ниже —
          примеры исполнения, а не отдельные продукты.
        </p>

        <ul className="mt-10 lg:mt-14">
          {webExamples.map((project, i) => {
            const live = project.links.find((l) => l.label === "LIVE");
            return (
              <Reveal
                as="li"
                key={project.slug}
                delay={i === 0 ? 1 : 2}
                className="rule-t grid12 py-6 lg:py-8"
              >
                <div className="col-span-4 md:col-span-3 lg:col-span-4">
                  <h3 className="h4">{project.name}</h3>
                  <span className="nano mt-2 block">{project.type}</span>
                </div>

                <div className="col-span-4 md:col-span-3 lg:col-span-5 mt-3 md:mt-0">
                  <p className="body">{project.summary}</p>
                  <p className="nano" style={{ marginTop: "0.75rem" }}>
                    {project.stack.join(" · ")}
                  </p>
                </div>

                {live ? (
                  <div className="col-span-4 md:col-span-6 lg:col-span-3 mt-4 lg:mt-0 md:justify-self-end">
                    <a
                      className="ctl"
                      href={live.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span>VIEW LIVE</span>
                      <span className="ctl__mark" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </div>
                ) : null}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
