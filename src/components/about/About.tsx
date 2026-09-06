import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content/profile";

/**
 * Who made the work. It sits directly after CORE WORK: the systems speak first,
 * then the person behind them. No photograph — none exists that belongs here.
 */
export function About() {
  return (
    <section id="about" className="band pt-16 lg:pt-24" data-field="low" aria-labelledby="about-title">
      <SectionHeader id="03" name="ABOUT" right="REMOTE · SOLO" />
      <span id="about-title" className="sr-only">
        Обо мне
      </span>

      <div className="wrap pb-16 lg:pb-28">
        <div className="grid12">
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <p className="micro micro-ink">Обо мне</p>
          </Reveal>

          <div className="col-span-4 md:col-span-4 md:col-start-3 lg:col-span-7 lg:col-start-5 mt-4 md:mt-0">
            {profile.about.map((paragraph, i) => (
              <Reveal key={i} delay={i === 0 ? 0 : 1} className="mb-5 last:mb-0">
                <p className={i === 0 ? "lead" : "body"}>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
