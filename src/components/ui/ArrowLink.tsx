import Link from "next/link";

type Props = {
  href: string;
  label: string;
  detail?: string;
  size?: "micro" | "h3" | "h1";
  className?: string;
};

export function ArrowLink({ href, label, detail, size = "micro", className = "" }: Props) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const glyph = href.startsWith("#") ? "↓" : "↗";
  const typeClass =
    size === "h1" ? "h1" : size === "h3" ? "h3" : "micro micro-ink";

  const inner = (
    <>
      <span className={typeClass}>{label}</span>
      <span className={size === "micro" ? "nano" : "micro"} aria-hidden="true">
        {glyph}
      </span>
      {detail ? <span className="nano ml-auto hidden md:inline">{detail}</span> : null}
    </>
  );

  const classes = `link-arrow ${className}`;

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {inner}
    </Link>
  );
}
