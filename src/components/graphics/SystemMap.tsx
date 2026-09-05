type Node = {
  id: string;
  label: string;
  note: string;
  x: number;
  y: number;
};

/**
 * The primary visual object of project 01: the real processing flow drawn as a map.
 * Connectors are orthogonal, so the SVG can stretch to any width without distorting
 * the geometry (only `vector-effect` keeps the hairline at 1px).
 */
export function SystemMap({ nodes }: { nodes: Node[] }) {
  const path = nodes
    .map((node, i) => {
      if (i === 0) return `M ${node.x} ${node.y}`;
      const prev = nodes[i - 1]!;
      const midX = (prev.x + node.x) / 2;
      return `H ${midX} V ${node.y} H ${node.x}`;
    })
    .join(" ");

  return (
    <div>
      {/* desktop map */}
      <div
        className="relative hidden lg:block"
        style={{ height: "clamp(360px, 42vh, 520px)" }}
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d={path}
            stroke="var(--rule-strong)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol>
          {nodes.map((node, i) => {
            const anchorRight = node.x > 88;
            const above = i % 2 === 1;
            const isSignal = node.id === "05";
            return (
              <li
                key={node.id}
                className="absolute"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    width: 9,
                    height: 9,
                    marginLeft: -4.5,
                    marginTop: -4.5,
                    background: isSignal ? "var(--accent)" : "var(--ink)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: 0,
                    ...(above ? { bottom: 4 } : { top: 4 }),
                    width: 1,
                    height: 20,
                    background: "var(--rule-strong)",
                  }}
                />
                <span
                  className="absolute block w-[11.5ch]"
                  style={{
                    ...(anchorRight ? { right: 0 } : { left: 0 }),
                    ...(above ? { bottom: 28 } : { top: 28 }),
                    textAlign: anchorRight ? "right" : "left",
                  }}
                >
                  <span className="nano block">{node.id}</span>
                  <span
                    className="micro block"
                    style={{ color: isSignal ? "var(--accent)" : "var(--ink)" }}
                  >
                    {node.label}
                  </span>
                  <span className="nano block leading-snug">{node.note}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* tablet + mobile: the same flow as a vertical spine */}
      <ol className="lg:hidden relative pl-8 py-4">
        <div
          aria-hidden="true"
          className="absolute left-1 top-6 bottom-6"
          style={{ width: 1, background: "var(--rule-strong)" }}
        />
        {nodes.map((node) => (
          <li key={node.id} className="relative pb-5 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute"
              style={{ left: -27, top: 6, width: 7, height: 7, background: "var(--ink)" }}
            />
            <div className="flex items-baseline gap-3">
              <span className="nano">{node.id}</span>
              <span className="micro micro-ink">{node.label}</span>
            </div>
            <span className="nano block">{node.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
