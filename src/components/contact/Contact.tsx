import { profile } from "@/content/profile";
import { DistortionField } from "@/components/graphics/DistortionField";
import { GlassPlate } from "@/components/ui/GlassPlate";

/** The single dark region of the homepage. A finish, not a sales form. */
export function Contact() {
  return (
    <section id="contact" className="band band-dark pt-14 lg:pt-20" aria-labelledby="contact-title">
      <DistortionField variant="contact" />
      <div className="wrap relative">
        <div className="grid12 rule-t pt-3 pb-16 lg:pb-24">
          <span
            className="pixel col-span-1 block text-[34px] leading-none md:text-[42px]"
            style={{ color: "var(--paper)" }}
          >
            /06
          </span>
          <h2 id="contact-title" className="micro micro-ink col-span-3 md:col-span-3 lg:col-span-6">
            CONTACT
          </h2>
          <span className="nano col-span-4 md:col-span-2 lg:col-span-5 mt-3 md:mt-0 md:justify-self-end">
            STATUS: {profile.status} · {profile.workMode}
          </span>
        </div>

        <ul>
          {profile.contacts.map((contact) => (
            <li key={contact.label} className="rule-t">
              <a
                className="grid12 items-baseline py-6 lg:py-7"
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer noopener" : undefined}
              >
                <span className="h1 col-span-3 md:col-span-4 lg:col-span-6" style={{ fontWeight: 500 }}>
                  {contact.label}
                </span>
                <span className="col-span-4 md:col-span-2 lg:col-span-6 mt-3 md:mt-0 md:justify-self-end flex items-baseline gap-3">
                  <span className="micro" style={{ overflowWrap: "anywhere" }}>
                    {contact.handle}
                  </span>
                  <span className="micro" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="grid12 rule-t mt-10 py-6 pb-24 lg:pb-40 items-end">
          <p className="nano col-span-4 md:col-span-3 lg:col-span-6 flex items-center gap-2">
            <span className="signal-dot" aria-hidden="true" />
            <span className="signal">STATUS: {profile.status}</span>
          </p>
          <GlassPlate
            rows={[
              { k: "BUILD", v: `${profile.build} · ${profile.year}` },
              { k: "CALIBRATION", v: profile.workMode },
            ]}
            className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9 mt-6 md:mt-0 w-full max-w-[240px] md:justify-self-end"
          />
        </div>
      </div>
    </section>
  );
}
