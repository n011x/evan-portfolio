import { Reveal } from "@/components/motion/Reveal";

/**
 * One idea per band: an index, a title, and a narrow measure. The case runs a slower
 * rhythm than the homepage — fewer oversized moments, more air.
 */
export function CaseBand({
  id,
  title,
  body,
  children,
  field,
}: {
  id: string;
  title: string;
  body?: string[];
  children?: React.ReactNode;
  field?: "low" | "min" | "none";
}) {
  return (
    <section className="band pt-16 lg:pt-24" data-field={field ?? "min"} aria-labelledby={`band-${id}`}>
      <div className="wrap">
        <Reveal kind="rule" className="rule-t block" />
        <div className="grid12 pt-3">
          <span className="nano col-span-1">{id}</span>
          <Reveal className="col-span-3 md:col-span-2 lg:col-span-3">
            <h2 id={`band-${id}`} className="micro micro-ink">
              {title}
            </h2>
          </Reveal>
          <div className="col-span-4 md:col-span-4 lg:col-span-7 lg:col-start-5 mt-5 lg:mt-0">
            {body?.map((paragraph) => (
              <Reveal key={paragraph} className="mb-6 last:mb-0">
                <p className="body" style={{ maxWidth: "52ch" }}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
