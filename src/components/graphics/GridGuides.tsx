/** Visible editorial structure: the 12 column rules, very low contrast. */
export function GridGuides() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{ paddingLeft: "var(--rail)", mixBlendMode: "multiply" }}
    >
      <div className="wrap h-full">
        <div className="grid12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={
                i < 4
                  ? "h-full"
                  : i < 6
                    ? "hidden md:block h-full"
                    : "hidden lg:block h-full"
              }
              style={{ borderLeft: "1px solid rgba(11,11,12,0.055)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
