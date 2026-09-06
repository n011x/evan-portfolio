import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content/profile";
import { helpWith, flow } from "@/content/capabilities";

/**
 * Who made the work, what he can be asked for, and how it gets made — one section,
 * because separately they were three screens of scrolling for a minute of reading.
 * The text and the list share the top row, so the section fills the grid instead of
 * running down its left half. No photograph; there is no honest one.
 */
export function About() {
  return (
    <section id="about" className="band pt-12 lg:pt-16" data-field="low" aria-labelledby="about-title">
      <SectionHeader id="03" name="ABOUT" right="REMOTE · SOLO" />
      <span id="about-title" className="sr-only">
        Обо мне
      </span>

      <div className="wrap pb-10 lg:pb-14">
        <div className="grid12 items-start">
          <div className="col-span-4 md:col-span-3 lg:col-span-6">
            <Reveal>
              <h3 className="block-label">обо мне</h3>
            </Reveal>
            <div className="mt-4 lg:mt-5">
              {profile.about.map((paragraph, i) => (
                <Reveal key={i} className="mb-4 last:mb-0">
                  <p className={i === 0 ? "h3" : "body"}>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="col-span-4 md:col-span-3 lg:col-span-6 mt-10 md:mt-0">
            <Reveal>
              <h3 className="block-label">с чем помогу</h3>
            </Reveal>
            <ul className="mt-4 lg:mt-5">
              {helpWith.map((item) => (
                <Reveal as="li" key={item.index} className="flex gap-4 py-1.5">
                  <span className="nano shrink-0 pt-1" style={{ width: "2ch" }}>
                    {item.index}
                  </span>
                  <span className="body" style={{ maxWidth: "none" }}>
                    {item.name}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* how it gets made — the loop returns to the first step */}
        <div className="grid12 mt-10 lg:mt-14">
          <div className="col-span-4 md:col-span-6 lg:col-span-12">
            <Reveal>
              <h3 className="block-label">как работаю</h3>
            </Reveal>
            <Reveal className="mt-4 lg:mt-5">
              <p className="body flow-chain" style={{ maxWidth: "none" }}>
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
      </div>
    </section>
  );
}
