"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { label: "WORK", href: "/work", section: null },
  { label: "ABOUT", href: "/#about", section: "about" },
  { label: "CONTACT", href: "/#contact", section: "contact" },
];

/**
 * The nav marks where the reader is. /work owns itself and its cases; the homepage
 * sections claim the mark while they hold the upper half of the viewport, so the
 * highlight changes once per section rather than flickering on every band boundary.
 */
export function SiteNav() {
  const pathname = usePathname();
  const onWork = pathname.startsWith("/work");
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (onWork) return;
    const targets = nav
      .map((item) => item.section && document.getElementById(item.section))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // in document order, so a section entering below never steals the mark
        const current = nav.find((item) => item.section && visible.has(item.section));
        setSection(current?.section ?? null);
      },
      { rootMargin: "-56px 0px -50% 0px" },
    );
    for (const el of targets) io.observe(el);
    return () => io.disconnect();
  }, [onWork, pathname]);

  return (
    <nav
      aria-label="Основная навигация"
      className="col-span-3 md:col-span-3 lg:col-span-6 flex flex-nowrap justify-end gap-2 md:justify-start md:gap-3 lg:gap-4"
    >
      {nav.map((item) => {
        const active = item.section ? section === item.section : onWork;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="nav-link ctl"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
