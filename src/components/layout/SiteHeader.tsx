import Link from "next/link";
import { profile } from "@/content/profile";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="wrap">
        <div className="grid12 h-14 items-center">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-baseline gap-2">
            <Link href="/" className="micro micro-ink inline-flex min-h-[44px] items-center">
              {profile.name}
            </Link>
            <span aria-hidden="true" className="nano">
              ▮
            </span>
          </div>

          <SiteNav />

          <div className="hidden md:flex md:col-span-1 lg:col-span-3 justify-end gap-4">
            <span className="nano">
              {/* a functional status, so it reads as a signal rather than as metadata */}
              STATUS: <span style={{ color: "var(--accent)" }}>{profile.status}</span>
            </span>
            <span className="nano hidden lg:inline">{profile.workMode}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
