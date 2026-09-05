import { RegMarks } from "@/components/ui/RegMarks";

/**
 * Reserved area and composition weight for the hero's computational artwork.
 * Stage 3 replaces the interior with the real character field; the frame,
 * annotations and proportions are already the final ones.
 */
export function AsciiFieldSlot({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative ${className}`}
      style={{ border: "1px solid var(--rule)", background: "var(--paper-2)" }}
    >
      <div className="absolute inset-0 dotgrid opacity-70" />
      <div className="absolute inset-0 scanlines opacity-60" />
      <RegMarks inset={10} size={11} />

      <span className="nano absolute left-3 top-3">I.01</span>
      <span className="nano absolute right-3 top-3">FIELD</span>
      <span className="nano absolute left-3 bottom-3">RENDER 000%</span>
      <span className="nano absolute right-3 bottom-3">STAGE 03</span>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="nano" style={{ color: "var(--graphite)" }}>
          ASCII FIELD — COMPUTATIONAL COMPOSITION
        </span>
      </div>
    </div>
  );
}
