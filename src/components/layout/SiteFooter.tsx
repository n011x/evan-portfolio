import { profile } from "@/content/profile";

/** Bottom edge of the single dark region. Final calibration graphics land in Stage 3. */
export function SiteFooter() {
  return (
    <footer className="band-dark" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="wrap">
        <div className="grid12 py-10">
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <p className="micro micro-ink" style={{ color: "var(--paper)" }}>
              {profile.wordmark}
            </p>

          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 mt-8 md:mt-0">
            <span className="nano block">ОБНОВЛЕНО</span>
            <span className="micro mt-1 block">{profile.updated}</span>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 mt-8 md:mt-0">
            <span className="nano block">YEAR</span>
            <span className="micro mt-1 block">{profile.year}</span>
          </div>

          <div className="col-span-4 md:col-span-6 lg:col-span-2 mt-8 lg:mt-0 lg:justify-self-end">
            <a
              href="#top"
              className="micro micro-ink inline-flex min-h-[24px] items-center"
              style={{ color: "var(--paper)" }}
            >
              BACK TO TOP ↑
            </a>
          </div>
        </div>

        <div className="grid12 py-4" style={{ borderTop: "1px solid var(--rule)" }}>
          <span className="nano col-span-2 md:col-span-3 lg:col-span-4">
            © {profile.year} {profile.wordmark}
          </span>
          <span className="nano col-span-2 md:col-span-3 lg:col-span-8 justify-self-end">
            {profile.workMode}
          </span>
        </div>
      </div>
    </footer>
  );
}
