import { profile } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DistortionField } from "@/components/graphics/DistortionField";

export function About() {
  return (
    <section id="about" className="band pt-16 lg:pt-24" data-field="min" aria-labelledby="about-title">
      <SectionHeader id="06" name="ABOUT" right="REMOTE · SOLO" />
      <span id="about-title" className="sr-only">
        Обо мне
      </span>

      <DistortionField variant="calm" />
      <div className="wrap relative pb-20 lg:pb-32">
        <div className="grid12">
          <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-2">
            <p className="h3" style={{ fontWeight: 400, fontSize: "clamp(1.25rem, 1.7vw, 1.625rem)" }}>
              {profile.about.lead}
            </p>
            {profile.about.body.map((paragraph) => (
              <p key={paragraph} className="body mt-8">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="col-span-4 md:col-span-2 lg:col-span-4 lg:col-start-9 mt-10 md:mt-0">
            <span className="nano">BACKGROUND</span>
            <dl className="mt-3">
              {profile.about.background.map((row) => (
                <div key={row.title} className="rule-t py-3">
                  <dt className="micro micro-ink">{row.title}</dt>
                  <dd className="nano mt-1">
                    {row.period} · {row.note}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="nano rule-t pt-3">{profile.about.facts.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
