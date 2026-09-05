import { RegMarks } from "@/components/ui/RegMarks";

type Props = {
  /** CSS aspect-ratio value, e.g. "16 / 10" */
  ratio: string;
  index: string;
  note: string;
  status: "pending" | "capture";
  compact?: boolean;
  className?: string;
};

/**
 * Structural stand-in for a real asset. Stage 2 has no screenshots yet, and a missing
 * asset must stay visibly missing — never a fabricated interface.
 */
export function MediaSlot({ ratio, index, note, status, compact = false, className = "" }: Props) {
  return (
    <figure
      className={`relative dotgrid ${className}`}
      style={{ aspectRatio: ratio, border: "1px solid var(--rule)", background: "var(--paper-2)" }}
    >
      <RegMarks inset={7} />
      {compact ? null : (
        <div className="absolute left-0 top-0 flex items-center gap-3 px-3 py-2">
          <span className="nano">MEDIA {index}</span>
          <span className="nano" style={{ color: "var(--graphite)" }}>
            {status === "pending" ? "VISUAL PENDING" : "TO CAPTURE"}
          </span>
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2"
        style={{ width: 26, height: 1, background: "var(--rule-strong)", transform: "translate(-50%,-50%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2"
        style={{ width: 1, height: 26, background: "var(--rule-strong)", transform: "translate(-50%,-50%)" }}
      />
      <figcaption
        className={`absolute px-3 py-2 ${compact ? "left-0 top-0" : "bottom-0 right-0 text-right"}`}
      >
        <span className="nano">{note}</span>
      </figcaption>
    </figure>
  );
}
