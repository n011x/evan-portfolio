type Props = { kind: string };

/** Small line diagrams beside each capability row (R12). Decorative. */
export function MicroGlyph({ kind }: Props) {
  const stroke = "var(--rule-strong)";
  const common = {
    width: 44,
    height: 24,
    viewBox: "0 0 44 24",
    fill: "none",
    stroke,
    strokeWidth: 1,
    "aria-hidden": true as const,
  };

  switch (kind) {
    case "node":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="3" />
          <path d="M9 12h11" />
          <rect x="20" y="7" width="10" height="10" />
          <path d="M30 12h8" />
          <circle cx="40" cy="12" r="2" fill={stroke} />
        </svg>
      );
    case "cycle":
      return (
        <svg {...common}>
          <path d="M8 16a8 8 0 1 1 8 4" />
          <path d="M13 20l3-1 1 3" />
          <path d="M28 6v12M28 18h10" />
        </svg>
      );
    case "frame":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="24" height="16" />
          <path d="M2 9h24" />
          <path d="M31 9h11M31 13h8M31 17h11" />
        </svg>
      );
    case "screens":
      return (
        <svg {...common}>
          <rect x="2" y="3" width="10" height="18" />
          <rect x="16" y="3" width="10" height="18" />
          <rect x="30" y="3" width="10" height="18" />
          <path d="M12 12h4M26 12h4" />
        </svg>
      );
    case "raster":
      return (
        <svg {...common}>
          {Array.from({ length: 6 }).map((_, x) =>
            Array.from({ length: 3 }).map((__, y) => (
              <rect
                key={`${x}-${y}`}
                x={2 + x * 7}
                y={4 + y * 6}
                width={(x + y) % 3 === 0 ? 4 : 2}
                height={(x + y) % 3 === 0 ? 4 : 2}
                fill={stroke}
                stroke="none"
              />
            )),
          )}
        </svg>
      );
    default:
      return null;
  }
}
