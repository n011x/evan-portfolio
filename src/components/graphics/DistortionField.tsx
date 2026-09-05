type Variant = "hero" | "work" | "route" | "media" | "calm" | "contact";

type Spec = {
  tone: number;
  light: number;
  blur: number;
  /** where the mass sits inside the band */
  pos: React.CSSProperties;
  /** drift preset — slow, 24–40s, transform + opacity only */
  drift: "a" | "b" | "c";
};

/**
 * The one background material. Two mass nodes per band carry different mask shapes and
 * cross-fade on a long cycle, so the silhouette morphs without animating an expensive
 * property. Position and scale drift on transform; nothing here reflows or repaints text.
 *
 * Placement rule: the mass never sits under a headline or a body column at full strength —
 * word first, material second.
 */
const MASS: Record<Variant, Spec> = {
  hero:    { tone: 0.20, light: 0.92, blur: 110, drift: "a", pos: { top: "-14%", right: "-12%", width: "70%", height: "112%" } },
  work:    { tone: 0.11, light: 0.40, blur: 100, drift: "b", pos: { top: "2%", right: "-16%", width: "54%", height: "72%" } },
  route:   { tone: 0.13, light: 0.34, blur: 90,  drift: "c", pos: { bottom: "-26%", right: "-14%", width: "56%", height: "70%" } },
  media:   { tone: 0.09, light: 0.30, blur: 90,  drift: "b", pos: { top: "4%", left: "-18%", width: "42%", height: "72%" } },
  calm:    { tone: 0.07, light: 0.36, blur: 100, drift: "c", pos: { top: "6%", right: "-8%", width: "40%", height: "74%" } },
  contact: { tone: 0.09, light: 0.05, blur: 120, drift: "a", pos: { bottom: "-32%", left: "-10%", width: "118%", height: "88%" } },
};

const MASK_A =
  "radial-gradient(closest-side at 42% 46%, #000 64%, transparent 100%)," +
  "radial-gradient(closest-side at 70% 34%, #000 56%, transparent 100%)";
const MASK_B =
  "radial-gradient(closest-side at 34% 58%, #000 60%, transparent 100%)," +
  "radial-gradient(closest-side at 64% 40%, #000 66%, transparent 100%)," +
  "radial-gradient(closest-side at 78% 66%, #000 48%, transparent 100%)";

export function DistortionField({ variant }: { variant: Variant }) {
  const m = MASS[variant];
  const tone = `rgba(58, 59, 62, ${m.tone})`;
  const light = `rgba(255, 255, 255, ${m.light})`;
  const body =
    `radial-gradient(closest-side at 38% 42%, ${tone}, transparent 72%),` +
    `radial-gradient(closest-side at 66% 30%, ${tone}, transparent 70%),` +
    `radial-gradient(closest-side at 52% 68%, ${tone}, transparent 76%),` +
    `radial-gradient(closest-side at 78% 62%, ${tone}, transparent 66%)`;

  return (
    <div className="field" aria-hidden="true" data-variant={variant}>
      <div
        className={`field__mass field__drift--${m.drift}`}
        style={{
          ...m.pos,
          filter: `blur(${m.blur}px)`,
          background: body,
          WebkitMaskImage: MASK_A,
          maskImage: MASK_A,
        }}
      />
      {/* second silhouette — cross-fades with the first, which is what makes the mass morph */}
      <div
        className={`field__mass field__morph field__drift--${m.drift}`}
        style={{
          ...m.pos,
          filter: `blur(${Math.round(m.blur * 1.1)}px)`,
          background: body,
          WebkitMaskImage: MASK_B,
          maskImage: MASK_B,
        }}
      />
      {m.light > 0.2 ? (
        <div
          className={`field__mass field__light field__drift--${m.drift === "a" ? "b" : "a"}`}
          style={{
            ...m.pos,
            filter: `blur(${Math.round(m.blur * 0.62)}px)`,
            background:
              `radial-gradient(closest-side at 44% 48%, ${light}, transparent 72%),` +
              `radial-gradient(closest-side at 68% 38%, ${light}, transparent 68%)`,
          }}
        />
      ) : null}
    </div>
  );
}
