type Row = { k: string; v: string };

export function MetaTable({ rows, dense = false }: { rows: Row[]; dense?: boolean }) {
  return (
    <dl className="w-full">
      {rows.map((row) => (
        <div
          key={row.k}
          className={`rule-t flex items-baseline justify-between gap-4 ${
            dense ? "py-1.5" : "py-2.5"
          }`}
        >
          <dt className="nano shrink-0">{row.k}</dt>
          <dd className="micro micro-ink text-right">{row.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Horizontal variant — used once, so project 04 does not repeat project 01/02. */
export function MetaRow({ rows }: { rows: Row[] }) {
  return (
    <dl className="rule-t rule-b grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {rows.map((row, i) => (
        <div
          key={row.k}
          className={`px-0 py-3 lg:px-4 ${
            i === 0 ? "lg:pl-0" : "lg:border-l lg:border-[var(--rule)]"
          }`}
        >
          <dt className="nano">{row.k}</dt>
          <dd className="micro micro-ink mt-1">{row.v}</dd>
        </div>
      ))}
    </dl>
  );
}
