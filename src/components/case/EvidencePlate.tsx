import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { RegMarks } from "@/components/ui/RegMarks";

export type EvidencePlateSpec = {
  /** echoes the system map: 05 QUALIFY produces 05.A, 07 DIGEST produces 07.A */
  id: string;
  title: string;
  /** file stem in /media; `srcMobile` is a separate crop, never a shrunk desktop one */
  src: string;
  srcMobile?: string;
  ratio: string;
  ratioMobile?: string;
  alt: string;
  /** mono metadata — what this frame proves. Never overlaid on the capture. */
  meta: { k: string; v: string }[];
  /** the node this output comes out of, when the case draws a system map */
  from?: string;
  /** marks the plate whose node carries the accent in the map */
  signal?: boolean;
  span?: "half" | "third" | "wide";
};

const SPAN = {
  third: "col-span-4 md:col-span-3 lg:col-span-4",
  half: "col-span-4 md:col-span-3 lg:col-span-5",
  wide: "col-span-4 md:col-span-6 lg:col-span-7",
} as const;

/**
 * A real interface fragment presented as a state of the system rather than as a
 * screenshot attached to a case. The capture itself is untouched — clean, unfiltered and
 * never enlarged past its source. Everything that makes it read as system output sits
 * around it: the grid, a hairline, registration marks, and the same mono metadata grammar
 * the rest of the case uses. The id ties it back to the node it comes out of.
 */
export function EvidencePlate({ plate }: { plate: EvidencePlateSpec }) {
  return (
    <Reveal as="li" className={`${SPAN[plate.span ?? "third"]} mb-12 lg:mb-0`}>
      <div className="rule-t flex items-baseline gap-3 pt-2" style={{ maxWidth: 320 }}>
        <span className="nano" style={plate.signal ? { color: "var(--accent)" } : undefined}>
          {plate.id}
        </span>
        <span className="micro micro-ink">{plate.title}</span>
        {plate.from ? <span className="nano ml-auto">← {plate.from}</span> : null}
      </div>

      {/* the capture: clean, at its own resolution, aligned to the column. A phone gets
          its own tighter crop of the same source rather than a shrunk desktop frame. */}
      {plate.srcMobile ? (
        <figure
          className="evidence-plate relative mt-3 md:hidden"
          style={{ aspectRatio: plate.ratioMobile ?? plate.ratio }}
        >
          <Image
            src={`/media/${plate.srcMobile}.webp`}
            alt={plate.alt}
            fill
            sizes="92vw"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
          <RegMarks inset={5} size={7} />
        </figure>
      ) : null}

      <figure
        className={`evidence-plate relative mt-3 ${plate.srcMobile ? "hidden md:block" : ""}`}
        style={{ aspectRatio: plate.ratio }}
      >
        <Image
          src={`/media/${plate.src}.webp`}
          alt={plate.alt}
          fill
          sizes="(min-width: 1024px) 28vw, 92vw"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
        <RegMarks inset={5} size={7} />
      </figure>

      <dl className="mt-3" style={{ maxWidth: 320 }}>
        {plate.meta.map((row) => (
          <div key={row.k} className="rule-t flex items-baseline justify-between gap-4 py-1.5">
            <dt className="nano">{row.k}</dt>
            <dd className="nano" style={{ color: "var(--ink)" }}>
              {row.v}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

/**
 * The band that holds them. One idea per band, same rhythm as CaseBand — the plates are
 * a sequence inside the case, not a gallery beside it.
 */
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

        <ul className="grid12 mt-10 lg:mt-14">
          {plates.map((plate) => (
            <EvidencePlate key={plate.id} plate={plate} />
          ))}
        </ul>
      </div>
    </section>
  );
}
