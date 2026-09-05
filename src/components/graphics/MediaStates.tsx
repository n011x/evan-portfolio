"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  processed: string;
  clean: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

/**
 * One real asset, two renderings. Pointer devices wipe to the clean interface on hover or
 * focus; coarse pointers get the clean state on their own once the block has been seen —
 * art direction must not hide evidence, and no interaction is ever hidden behind a tap.
 *
 * The wipe is a clip-path with a hard editorial seam. The image is never scaled or
 * deformed: it is the same file underneath.
 */
export function MediaStates({ processed, clean, alt, sizes, priority = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [settleClean, setSettleClean] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const coarse = window.matchMedia("(hover: none)").matches;
    if (!coarse || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => setSettleClean(true), 420);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="media-states absolute inset-0"
      data-clean={settleClean ? "true" : undefined}
      tabIndex={0}
      role="img"
      aria-label={alt}
    >
      <Image
        src={`/media/${processed}.webp`}
        alt=""
        fill
        sizes={sizes}
        style={{ objectFit: "cover" }}
        priority={priority}
      />
      <div className="media-states__clean">
        <Image src={`/media/${clean}.webp`} alt="" fill sizes={sizes} style={{ objectFit: "cover" }} />
      </div>
      <span className="media-states__seam" aria-hidden="true" />
    </div>
  );
}
