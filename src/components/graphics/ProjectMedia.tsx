import Image from "next/image";
import { RegMarks } from "@/components/ui/RegMarks";
import { MediaStates } from "./MediaStates";

type Props = {
  /** file base name in /public/media, without extension */
  processed: string;
  clean?: string;
  alt: string;
  ratio: string;
  index: string;
  caption: string;
  /** clean is the default state — used inside case studies */
  showClean?: boolean;
  className?: string;
  priority?: boolean;
};

/**
 * Real project media. Two derivatives exist for every asset: PROCESSED (ordered dither,
 * the homepage default) and CLEAN (the interface itself). Art direction must not hide
 * evidence — the clean state is always reachable, and it is what case studies show.
 */
export function ProjectMedia({
  processed,
  clean,
  alt,
  ratio,
  index,
  caption,
  showClean = false,
  className = "",
  priority = false,
}: Props) {
  const sizes = "(max-width: 767px) 100vw, 60vw";
  const interactive = Boolean(clean) && !showClean;
  return (
    <figure
      className={`relative ${className}`}
      style={{ aspectRatio: ratio, border: "1px solid var(--rule)", background: "var(--paper-2)" }}
    >
      {interactive && clean ? (
        <MediaStates
          processed={processed}
          clean={clean}
          alt={alt}
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <Image
          src={`/media/${showClean && clean ? clean : processed}.webp`}
          alt={alt}
          fill
          sizes={sizes}
          style={{ objectFit: "cover" }}
          priority={priority}
        />
      )}
      <RegMarks inset={7} />
      <figcaption className="absolute bottom-0 left-0 right-0 flex items-baseline justify-between px-3 py-2">
        <span className="nano" style={{ color: "var(--ink)" }}>
          MEDIA {index}
        </span>
        <span className="nano" style={{ color: "var(--ink)" }}>
          {interactive ? `${caption} · HOVER → CLEAN` : caption}
        </span>
      </figcaption>
    </figure>
  );
}
