import { profile } from "@/content/profile";
import { AsciiSculpture } from "@/components/graphics/AsciiSculpture";
import { DistortionField } from "@/components/graphics/DistortionField";
import { GlassPlate } from "@/components/ui/GlassPlate";
import { RegMarks } from "@/components/ui/RegMarks";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function Hero() {
  return (
    <section
      id="top"
      className="band band--eager flex flex-col"
      aria-labelledby="hero-name"
      data-field="high"
      style={{ minHeight: "calc(100svh - 3.5rem)" }}
    >
      <DistortionField variant="hero" />
      <div className="wrap relative flex flex-1 flex-col">
        {/* coded header strip */}
        <div className="grid12 rule-b py-2.5">
          <span className="nano col-span-2 md:col-span-2 lg:col-span-3">
            {profile.year} · BUILD {profile.build}
          </span>
          <span className="nano col-span-2 md:col-span-2 lg:col-span-3 justify-self-end md:justify-self-start">
            PORTFOLIO / INDEX
          </span>
          <span className="nano col-span-4 md:col-span-2 lg:col-span-6 mt-1 md:mt-0 md:justify-self-end">
            <span style={{ color: "var(--ink)" }}>/01</span> — HERO · IDENTITY
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
              {profile.proof.map((item) => (
                <div key={item.label} className="rule-t pt-3">
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="h3 num block">{item.value}</span>
                    <span className="nano mt-1 block max-w-[13ch]">{item.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <a href="#work" className="btn-solid mt-8 lg:mt-10 w-full md:w-auto">
              <span>VIEW WORK</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div
            className="col-span-4 md:col-span-3 lg:col-span-8 mt-10 md:mt-0 z-0 -ml-[var(--margin)] md:ml-0 relative"
            style={{ marginRight: "calc(var(--margin) * -1)" }}
          >
            <div className="relative overflow-hidden h-[34vh] min-h-[220px] md:h-[46vh] lg:h-[52vh] lg:min-h-[340px]">
              <RegMarks inset={6} size={9} />
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2">
                <AsciiSculpture />
              </div>
              <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2">
                <AsciiSculpture compact />
              </div>
              <span className="nano absolute left-0 bottom-0">FIELD 01 · COMPUTATIONAL</span>
            </div>
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
