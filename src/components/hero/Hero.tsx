import { profile } from "@/content/profile";
import { proof } from "@/content/projects";
import { DistortionField } from "@/components/graphics/DistortionField";
import { GlassPlate } from "@/components/ui/GlassPlate";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function Hero() {
  return (
    <section
      id="top"
      className="band band--eager flex flex-col"
      aria-labelledby="hero-name"
      data-field="high"
      style={{ minHeight: "calc(84svh - 3.5rem)" }}
    >
      <DistortionField variant="hero" />
      <div className="wrap relative flex flex-1 flex-col">
        {/* coded header strip — one line, and it is a signal */}
        <div className="grid12 rule-b py-2.5">
          <span className="nano col-span-4 md:col-span-6 lg:col-span-12">
            STATUS: <span style={{ color: "var(--accent)" }}>{profile.status}</span> ·{" "}
            {profile.workMode}
          </span>
        </div>

        {/* row 1 — name + positioning */}
        <div className="grid12 pt-6 md:pt-10 lg:pt-12">
          <h1
            id="hero-name"
            className="display col-span-4 md:col-span-4 lg:col-span-7 relative z-20"
            style={{ marginLeft: "-0.04em", fontSize: "clamp(5.75rem, 17vw, 16rem)" }}
          >
            {profile.name}
          </h1>

          <div className="col-span-4 md:col-span-2 lg:col-span-5 lg:self-end lg:pb-3 mt-2 md:mt-0">
            <ul>
              {profile.roleLines.map((line, i) => (
                <li
                  key={line}
                  className={i === 0 ? "" : "rule-t"}
                  style={{ paddingBlock: "0.1em" }}
                >
                  <span
                    className="display-2 block"
                    style={{
                      fontWeight: 400,
                      fontSize: "clamp(1.875rem, 5.2vw, 4.75rem)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* row 2 — supporting column + reserved computational field */}
        <div className="grid12">
          <div className="col-span-4 md:col-span-3 lg:col-span-4 relative z-20 pt-8 lg:pt-10">
            <p className="lead">{profile.statement}</p>

            <dl className="mt-8 lg:mt-10 grid grid-cols-3 gap-4 lg:gap-6">
              {proof.map((item) => (
                <div key={item.label} className="rule-t pt-3">
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="h3 num block">{item.value}</span>
                    <span className="nano mt-1 block max-w-[13ch]">{item.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* one CTA group: black for navigation, Registration Red for contact.
                The accent comes from colour, not from size — both buttons match. */}
            <div className="mt-8 lg:mt-10 flex gap-2">
              <a href="#work" className="btn-solid flex-1 sm:flex-none">
                <span>VIEW WORK</span>
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href={profile.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать мне в Telegram"
                className="btn-solid btn-solid--accent flex-1 sm:flex-none"
              >
                <span>WORK WITH ME</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="col-span-4 md:col-span-3 lg:col-span-8 mt-10 md:mt-0 relative">
            <GlassPlate
              rows={[...profile.systemPlate]}
              className="hidden lg:block absolute right-[var(--margin)] top-4 w-[200px]"
            />
          </div>
        </div>

        {/* row 3 — contact, deliberately subordinate */}
        <div className="grid12 rule-t mt-10 lg:mt-14 py-4 items-baseline lg:mt-auto">
          <span className="nano col-span-4 md:col-span-2 lg:col-span-4">
            SCROLL ↓ SELECTED WORK
          </span>
          <ul className="col-span-4 md:col-span-4 lg:col-span-8 mt-4 md:mt-0 flex flex-col gap-2 md:flex-row md:justify-end md:gap-8">
            {profile.contacts.map((contact) => (
              <li key={contact.label}>
                <ArrowLink href={contact.href} label={contact.label} detail={contact.handle} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
