type Row = { k: string; v: string };

/**
 * A small piece of optical material laid on the page — a calibration/metadata plate.
 * Never a card: flat, matte, 1px edge, no shadow. 1–3 per page.
 */
export function GlassPlate({
  rows,
  className = "",
  accentEdge = false,
}: {
  rows: Row[];
  className?: string;
  accentEdge?: boolean;
}) {
  return (
    <div
      className={`glass ${className}`}
      style={accentEdge ? { borderColor: "var(--accent)" } : undefined}
    >
      <dl>
        {rows.map((row) => (
          <div key={row.k} className="mb-2 last:mb-0">
            <dt className="nano">{row.k}</dt>
            <dd className="micro micro-ink mt-0.5">{row.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
