import { profile } from "@/content/profile";
import { DistortionField } from "@/components/graphics/DistortionField";
import { GlassPlate } from "@/components/ui/GlassPlate";

/** The single dark region of the homepage. A finish, not a sales form. */
export function Contact() {
  // Telegram is the action; email and GitHub are there for people who prefer them.
  const telegram = profile.contacts.find((c) => c.label === "TELEGRAM")!;
  const secondary = profile.contacts.filter((c) => c.label !== "TELEGRAM");

  return (
    <section
      id="contact"
      className="band band-dark pt-14 lg:pt-20"
      aria-labelledby="contact-title"
    >
      <DistortionField variant="contact" />
      <div className="wrap relative">
        <div className="grid12 rule-t pt-3 pb-10 lg:pb-14">
          <span
            className="pixel col-span-1 block text-[34px] leading-none md:text-[42px]"
            style={{ color: "var(--paper)" }}
          >
            /07
          </span>
          <h2
            id="contact-title"
            className="micro micro-ink col-span-3 md:col-span-3 lg:col-span-6"
          >
            CONTACT
          </h2>
          <span className="nano col-span-4 md:col-span-2 lg:col-span-5 mt-3 md:mt-0 md:justify-self-end">
            STATUS: {profile.status} · {profile.workMode}
          </span>
        </div>

        <div className="grid12 rule-t pt-8 lg:pt-10">
          <div className="col-span-4 md:col-span-4 lg:col-span-6">
            <p className="lead">
              Опишите задачу в двух-трёх предложениях — своими словами, без ТЗ.
            </p>
            <div className="mt-5">
              <p className="body">
                Отвечаю в течение дня. Если задача понятна, в ответ присылаю:
                что можно собрать, за какой срок и что нужно от вас.
              </p>
            </div>
          </div>

          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:col-start-8 mt-8 md:mt-0">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={telegram.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Написать мне в Telegram"
                className="btn-solid btn-solid--accent"
              >
                <span>Написать в Telegram</span>
                <span aria-hidden="true">↗</span>
              </a>
              <span className="micro">{telegram.handle}</span>
            </div>

            {/* second level: the same person, the slower channels */}
            <ul className="mt-8 flex flex-col gap-3">
              {secondary.map((contact) => (
                <li key={contact.label}>
                  <a
                    className="micro link-arrow"
                    href={contact.href}
                    target={
                      contact.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      contact.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {contact.label} — {contact.handle}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid12 rule-t mt-12 py-6 pb-24 lg:pb-40 items-end">
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
