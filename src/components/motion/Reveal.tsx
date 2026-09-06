import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  as?: ElementType;
  /** "block" fades and lifts, "rule" wipes a hairline open */
  kind?: "block" | "rule";
  className?: string;
  style?: CSSProperties;
};

/**
 * A marker, not a mechanism. The element is fully visible in the static composition;
 * the entry animation is attached in CSS by a scroll-driven timeline where the browser
 * supports one, and simply does not exist where it does not.
 *
 * There is no JavaScript here on purpose. The observer this used to run kept the
 * element at opacity 0 until it fired, so a script that never ran, an observer that
 * never fired, or a fast scroll past a section left real content invisible or
 * half-drawn. A scroll-driven timeline reads the element's own position instead of a
 * clock, so its state always matches where the page actually is.
 */
export function Reveal({ children, as, kind = "block", className = "", style }: Props) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={className} style={style} data-reveal={kind}>
      {children}
    </Tag>
  );
}
