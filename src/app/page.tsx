import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { WhatIBuild } from "@/components/capabilities/WhatIBuild";
import { Approach } from "@/components/approach/Approach";
import { WebExamples } from "@/components/work/WebExamples";
import { Contact } from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <WhatIBuild />
      <Approach />
      <WebExamples />
      <Contact />
    </>
  );
}
