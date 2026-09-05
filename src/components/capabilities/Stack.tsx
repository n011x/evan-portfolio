import { stack, stackNote } from "@/content/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";

const total = stack.reduce((sum, group) => sum + group.items.length, 0);

/** Dense technical index against a void. No logo wall, no pills. */
export function Stack() {
  return (
    <section id="stack" className="band pt-16 lg:pt-24" data-field="min" aria-labelledby="stack-title">
      <SectionHeader id="05" name="CAPABILITIES / STACK" right={`${total} ENTRIES`} />
      <span id="stack-title" className="sr-only">
        Стек и инструменты
      </span>

      <div className="wrap pb-12 lg:pb-20">
        <div className="grid12">
          {/* the void */}
          <div className="hidden lg:block lg:col-span-2">
            <span className="nano block">INDEX</span>
            <span className="nano mt-2 block max-w-[16ch]">● — КАЖДЫЙ ДЕНЬ</span>
          </div>

          <div className="col-span-4 md:col-span-6 lg:col-span-10">
            <div
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
              style={{ columnGap: "var(--gutter)", rowGap: "2.5rem" }}
            >
              {stack.map((group) => (
                <div
                  key={group.group}
                  className="pt-3 pb-2"
                  style={{ borderTop: "1px solid var(--rule-strong)" }}
                >
                  <h3 className="micro micro-ink" style={{ fontWeight: 500 }}>
                    {group.group}
                  </h3>
                  <ul className="mt-4">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="micro flex gap-2 py-[5px]"
                        style={{ color: item.daily ? "var(--ink)" : "var(--graphite)" }}
                      >
                        <span
                          aria-hidden="true"
                          className="text-[7px] leading-[1.9]"
                          style={{ color: item.daily ? "var(--ink)" : "transparent" }}
                        >
                          ●
                        </span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="nano rule-t mt-10 pt-3 max-w-[52ch]">{stackNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
