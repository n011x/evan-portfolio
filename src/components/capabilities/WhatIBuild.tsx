import { capabilities, capabilitiesUmbrella } from "@/content/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MicroGlyph } from "./MicroGlyph";

export function WhatIBuild() {
  return (
    <section id="build" className="band pt-16 lg:pt-24" data-field="low" aria-labelledby="build-title">
      <SectionHeader
        id="03"
        name="WHAT I BUILD"
        right={capabilitiesUmbrella}
      />
      <span id="build-title" className="sr-only">
        Что я собираю
      </span>

      <div className="wrap">
        <ul>
          {capabilities.map((item) => (
            <li key={item.index} className="rule-t">
              <div className="grid12 items-baseline py-6 lg:py-8">
                <span className="nano col-span-1 lg:col-span-1">{item.index}</span>
                <h3 className="h4 col-span-3 md:col-span-2 lg:col-span-4">{item.name}</h3>
                <p className="body col-span-4 md:col-span-2 lg:col-span-4 mt-2 md:mt-0">
                  {item.line}
                </p>
                <span className="hidden lg:block lg:col-span-1 self-center">
                  <MicroGlyph kind={item.glyph} />
                </span>
                <span className="nano col-span-4 md:col-span-1 lg:col-span-2 mt-3 md:mt-0 md:justify-self-end">
                  {item.proof.length > 0 ? `→ ${item.proof.join(" · ")}` : ""}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="rule-t" />
      </div>
    </section>
  );
}
