"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  as?: ElementType;
  /** "block" fades and lifts, "rule" wipes a hairline open */
  kind?: "block" | "rule";
  delay?: 0 | 1 | 2 | 3;
  className?: string;
  style?: CSSProperties;
};

/**
 * Entry reveal driven by one IntersectionObserver per node — no scroll listener, no
 * per-frame work. Geometry after the reveal is identical to the static composition:
 * only opacity, a 14px translate, or a clip wipe are animated.
 */
export function Reveal({ children, as, kind = "block", delay = 0, className = "", style }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // no observer (very old engines): show on the next tick rather than staying hidden
      const id = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      data-reveal={kind}
      data-reveal-delay={delay || undefined}
      data-revealed={shown ? "true" : undefined}
    >
      {children}
    </Tag>
  );
}
