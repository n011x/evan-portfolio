import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

export type EvidencePanel = {
  /** file stem in /media */
  src: string;
  ratio: string;
  alt: string;
  /** the label under the panel — what this frame proves */
  caption: string;
  /** narrow panels sit two-up; a wide one spans the measure */
  wide?: boolean;
};

/**
 * Real interface fragments, shown as evidence. They are CLEAN and untreated: the media
 * language applies to project imagery, not to proof — a screenshot the reader cannot
 * read proves nothing. Sanitized upstream by `scripts/sanitize-evidence.mjs`.
 */
export function EvidenceBand({
  id,
  title,
  note,
  panels,
}: {
  id: string;
  title: string;
  note?: string;
  panels: EvidencePanel[];
}) {
  return (
    <section className="band pt-16 lg:pt-24" data-field="min" aria-labelledby={`band-${id}`}>
      <div className="wrap">
        <Reveal kind="rule" className="rule-t block" />
        <div className="grid12 pt-3">
          <span className="nano col-span-1">{id}</span>
          <Reveal delay={1} className="col-span-3 md:col-span-2 lg:col-span-3">
            <h2 id={`band-${id}`} className="micro micro-ink">
              {title}
            </h2>
          </Reveal>
          {note ? (
            <p className="body col-span-4 md:col-span-4 lg:col-span-7 lg:col-start-5 mt-5 lg:mt-0" style={{ maxWidth: "52ch" }}>
              {note}
            </p>
          ) : null}
        </div>

        <ul className="grid12 mt-10 lg:mt-14">
          {panels.map((panel, i) => (
            <Reveal
              as="li"
              key={panel.src}
              delay={i === 0 ? 1 : 2}
              className={
                panel.wide
                  ? "col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-5 mb-10"
                  : "col-span-2 md:col-span-2 lg:col-span-3 mb-10"
              }
            >
              <figure
                className="relative"
                style={{
                  aspectRatio: panel.ratio,
                  border: "1px solid var(--rule)",
                  background: "var(--paper-2)",
                  /* a phone capture has a real pixel width; never upscale past it */
                  maxWidth: 320,
                }}
              >
                <Image
                  src={`/media/${panel.src}.webp`}
                  alt={panel.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              </figure>
              <figcaption className="nano mt-3 block">{panel.caption}</figcaption>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
