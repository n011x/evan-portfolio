type Step = { index: string; label: string; line: string };

/** 5 nodes + an honest loop-back edge from 05 to 01. Static in Stage 2. */
export function ApproachDiagram({ steps }: { steps: readonly Step[] }) {
  return (
    <div className="relative">
      {/* desktop: horizontal chain with a loop under it */}
      <div className="hidden lg:block relative pb-28 pt-6">
        <ol className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))`, columnGap: "var(--gutter)" }}>
          {steps.map((step, i) => (
            <li key={step.index} className="relative rule-t pt-4 pr-6">
              <div
                aria-hidden="true"
                className="absolute left-0 top-0"
                style={{ width: 9, height: 9, marginTop: -4.5, background: "var(--ink)" }}
              />
              {i < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute right-2 -top-[14px] nano"
                  style={{ color: "var(--graphite)" }}
                >
                  →
                </span>
              ) : null}
              <span className="h2 num block" style={{ fontWeight: 500, lineHeight: 1 }}>
                {step.index}
              </span>
              <p className="micro micro-ink mt-4">{step.label}</p>
              <p className="body mt-3 text-[0.9375rem]" style={{ maxWidth: "22ch" }}>
                {step.line}
              </p>
            </li>
          ))}
        </ol>
        <svg
          aria-hidden="true"
          className="absolute left-0 right-0"
          style={{ bottom: 0, height: 88, width: "100%" }}
          viewBox="0 0 1000 88"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 990 0 L 990 70 L 10 70 L 10 0"
            stroke="var(--rule-strong)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          className="nano absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 74 }}
        >
          LOOP → 01
        </span>
      </div>

      {/* tablet + mobile: vertical chain */}
      <ol className="lg:hidden relative pl-8 pt-2">
        <div
          aria-hidden="true"
          className="absolute left-1 top-3 bottom-14"
          style={{ width: 1, background: "var(--rule-strong)" }}
        />
        {steps.map((step) => (
          <li key={step.index} className="relative pb-7 last:pb-0">
            <div
              aria-hidden="true"
              className="absolute"
              style={{ left: -28, top: 10, width: 9, height: 9, background: "var(--ink)" }}
            />
            <div className="flex items-baseline gap-4">
              <span className="h3 num" style={{ fontWeight: 500 }}>
                {step.index}
              </span>
              <span className="micro micro-ink">{step.label}</span>
            </div>
            <p className="body mt-2 text-[0.9375rem]">{step.line}</p>
          </li>
        ))}
        <li className="relative pt-5">
          <span className="nano">↺ LOOP → 01</span>
        </li>
      </ol>
    </div>
  );
}
