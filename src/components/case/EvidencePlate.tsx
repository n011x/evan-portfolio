import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { RegMarks } from "@/components/ui/RegMarks";

export type EvidencePlateSpec = {
  /** echoes the system map: 05 QUALIFY produces 05.A, 07 DIGEST produces 07.A */
  id: string;
  title: string;
  /** file stem in /media */
  src: string;
  /** the capture's real pixel size. The window is built from this and nothing else. */
  width: number;
  height: number;
  alt: string;
  /** the interpretation layer — set in the site's own type, never over the capture */
  readoutLabel: string;
  readout: { k: string; v: string }[];
  /** the node this output comes out of, when the case draws a system map */
  from?: string;
  /** one Registration Red signal per band, on the plate whose node carries it in the map */
  signal?: boolean;
  /** shown under the readout — continuation markers, sanitisation notes */
  note?: string;
};

/**
 * A real interface fragment presented as a state of the system.
 *
 *   SANITIZE MAY CROP — once, upstream, on a real message boundary.
 *   LAYOUT MUST NOT CROP — nothing here takes a pixel off the capture.
 *
 * So the window is sized from the capture's own dimensions, the image is `contain`
 * inside a box of exactly that ratio, there is a safe inset between the capture and the
 * frame, and the width is capped at the source so it is never enlarged. What makes it
 * read as system output is the layer around it: the id that points back at the pipeline
 * node, the provenance line, the registration marks, and a readout set in the site's own
 * mono — an interpretation layer that never imitates the source interface.
 */
export function EvidencePlate({ plate }: { plate: EvidencePlateSpec }) {
  return (
    <Reveal as="li" className="col-span-4 md:col-span-6 lg:col-span-12 mb-14 lg:mb-20">
      <div className="rule-t flex items-baseline gap-4 pt-2">
        <span className="nano" style={plate.signal ? { color: "var(--accent)" } : undefined}>
          {plate.id}
        </span>
        <span className="micro micro-ink">{plate.title}</span>
        {plate.from ? <span className="nano ml-auto">← {plate.from}</span> : null}
      </div>

      <div className="grid12 mt-4 items-start">
        {/* the window: the capture's own geometry, a safe inset, nothing cropped */}
        <figure
          className="evidence-window relative col-span-4 md:col-span-4 lg:col-span-6"
          style={{ maxWidth: plate.width + 20 }}
          /* the real file size, so the boundary check can assert nothing enlarges it */
          data-source-width={plate.width}
          data-source-height={plate.height}
        >
          <div
            className="relative"
            style={{ aspectRatio: `${plate.width} / ${plate.height}` }}
          >
            <Image
              src={`/media/${plate.src}.webp`}
              alt={plate.alt}
              fill
              sizes={`(min-width: 1024px) ${plate.width}px, 92vw`}
              style={{ objectFit: "contain" }}
            />
          </div>
          <RegMarks inset={-4} size={9} />
        </figure>

        <div className="col-span-4 md:col-span-2 lg:col-span-4 lg:col-start-8 mt-6 lg:mt-0">
          <span className="nano micro-ink rule-b block pb-2">{plate.readoutLabel}</span>
          <dl>
            {plate.readout.map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between gap-4 py-1.5"
                style={{ borderBottom: "1px solid var(--rule-soft)" }}
              >
                <dt className="nano">{row.k}</dt>
                <dd className="nano" style={{ color: "var(--ink)" }}>
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
          {plate.note ? <p className="nano mt-3">{plate.note}</p> : null}
        </div>
      </div>
    </Reveal>
  );
}

/** The band that holds them: one plate per row, the case's own rhythm, not a gallery. */
export function EvidenceBand({
  id,
  title,
  note,
  plates,
}: {
  id: string;
  title: string;
  note?: string;
  plates: EvidencePlateSpec[];
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
            <p
              className="body col-span-4 md:col-span-4 lg:col-span-7 lg:col-start-5 mt-5 lg:mt-0"
              style={{ maxWidth: "52ch" }}
            >
              {note}
            </p>
          ) : null}
        </div>

        <ul className="grid12 mt-10 lg:mt-16">
          {plates.map((plate) => (
            <EvidencePlate key={plate.id} plate={plate} />
          ))}
        </ul>
      </div>
    </section>
  );
}
