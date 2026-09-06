import { approach } from "@/content/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ApproachDiagram } from "./ApproachDiagram";

export function Approach() {
  return (
    <section id="approach" className="band pt-16 lg:pt-24" data-field="low" aria-labelledby="approach-title">
      <SectionHeader
        id="05"
        name="APPROACH"
        right="05 STEPS · LOOP"
      />
      <span id="approach-title" className="sr-only">
        Как я работаю
      </span>

      <div className="wrap pb-16 lg:pb-28">
        <ApproachDiagram steps={approach} />
      </div>
    </section>
  );
}
