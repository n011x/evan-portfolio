import { asciiSculpture, asciiSculptureCompact } from "@/content/ascii";

/**
 * The hero's computational artwork: a metaball volume lit by its own gradient, rendered
 * at build time into a single <pre>. Reads as form at distance, as characters up close.
 */
export function AsciiSculpture({ compact = false }: { compact?: boolean }) {
  return (
    <pre
      aria-hidden="true"
      className={compact ? "ascii ascii--compact" : "ascii"}
      data-role="ascii-sculpture"
    >
      {compact ? asciiSculptureCompact : asciiSculpture}
    </pre>
  );
}
