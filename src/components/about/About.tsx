import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content/profile";
import { helpWith, flow } from "@/content/capabilities";

/**
 * Who made the work, what he can be asked for, and how it gets made — one section,
 * because separately they were three screens of scrolling for a minute of reading.
 * No photograph; there is no honest one.
 */
export function About() {
  return (
    <section id="about" className="band pt-16 lg:pt-24" data-field="low" aria-labelledby="about-title">
      <SectionHeader id="03" name="ABOUT" right="REMOTE · SOLO" />
      <span id="about-title" className="sr-only">
        Обо мне
      </span>

      <div className="wrap pb-16 lg:pb-24">
        <div className="grid12">
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <p className="micro micro-ink lowercase-label">обо мне</p>
          </Reveal>

          <div className="col-span-4 md:col-span-4 md:col-start-3 lg:col-span-7 lg:col-start-5 mt-4 md:mt-0">
            {profile.about.map((paragraph, i) => (
              <Reveal key={i} delay={i === 0 ? 0 : 1} className="mb-4 last:mb-0">
                <p className={i === 0 ? "lead" : "body"}>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* what I can be asked for */}
        <div className="grid12 mt-12 lg:mt-16">
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <h3 className="micro micro-ink lowercase-label">с чем помогу</h3>
          </Reveal>

          <ul className="col-span-4 md:col-span-4 md:col-start-3 lg:col-span-7 lg:col-start-5 mt-4 md:mt-0">
            {helpWith.map((item, i) => (
              <Reveal as="li" key={item.index} delay={i < 3 ? 1 : 2} className="flex gap-4 py-1.5">
                <span className="nano shrink-0 pt-1" style={{ width: "2ch" }}>
                  {item.index}
                </span>
                <span className="body lowercase-label" style={{ maxWidth: "none" }}>
                  {item.name}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* how it gets made — the loop returns to the first step */}
        <div className="grid12 mt-12 lg:mt-16">
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <h3 className="micro micro-ink lowercase-label">как работаю</h3>
          </Reveal>

          <Reveal
            delay={1}
            className="col-span-4 md:col-span-4 md:col-start-3 lg:col-span-7 lg:col-start-5 mt-4 md:mt-0"
          >
            <p className="body lowercase-label flow-chain" style={{ maxWidth: "none" }}>
              {flow.map((step, i) => (
                <span key={step}>
                  {i > 0 ? (
                    <span className="flow-chain__mark" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  {step}
                </span>
              ))}
              <span className="flow-chain__mark" aria-hidden="true">
                ↺
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
