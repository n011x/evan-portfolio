import { profile } from "@/content/profile";

/** VOID IS PART OF THE COMPOSITION. One line, one caption, nothing else. */
export function StatementBand() {
  return (
    <section className="band pt-16 lg:pt-24" data-field="none" aria-label="Statement">
      <div className="wrap">
        <div className="grid12 rule-t pt-3">
          <span className="nano col-span-2 lg:col-span-3">/ STATEMENT</span>
          <span className="nano col-span-2 md:col-span-4 lg:col-span-9 justify-self-end">
            {profile.year}
          </span>
        </div>

        <div className="grid12 statement-void items-center">
          <p className="col-span-4 md:col-span-5 md:col-start-2 lg:col-span-7 lg:col-start-4">
            <span className="h2 block" style={{ fontWeight: 400 }}>
              {profile.tagline[0]}
            </span>
            <span className="h2 block" style={{ fontWeight: 400, marginLeft: "12%" }}>
              {profile.tagline[1]}
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
