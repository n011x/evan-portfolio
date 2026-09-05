type Props = { inset?: number; size?: number };

/** Print registration crosses. Decorative only. */
export function RegMarks({ inset = 8, size = 9 }: Props) {
  const positions = [
    { top: inset, left: inset },
    { top: inset, right: inset },
    { bottom: inset, left: inset },
    { bottom: inset, right: inset },
  ];
  return (
    <span aria-hidden="true">
      {positions.map((pos, i) => (
        <span
          key={i}
          style={{ position: "absolute", width: size, height: size, ...pos }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: (size - 1) / 2,
              width: size,
              height: 1,
              background: "var(--rule-strong)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: (size - 1) / 2,
              width: 1,
              height: size,
              background: "var(--rule-strong)",
            }}
          />
        </span>
      ))}
    </span>
  );
}
