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
            <span className="nano block">BUILD</span>
            <span className="micro mt-1 block">{profile.build}</span>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 mt-8 md:mt-0">
            <span className="nano block">YEAR</span>
            <span className="micro mt-1 block">{profile.year}</span>
          </div>

          <div className="col-span-4 md:col-span-1 lg:col-span-2 mt-8 md:mt-0">
            <span className="nano block">CALIBRATION</span>
            <div aria-hidden="true" className="mt-2 flex h-4 w-full max-w-[120px]">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="flex-1"
                  style={{ background: `rgba(242,241,238,${0.08 + i * 0.115})` }}
                />
              ))}
            </div>
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
