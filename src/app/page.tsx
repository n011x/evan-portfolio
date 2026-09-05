import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { StatementBand } from "@/components/ui/StatementBand";
import { WhatIBuild } from "@/components/capabilities/WhatIBuild";
import { Approach } from "@/components/approach/Approach";
import { Stack } from "@/components/capabilities/Stack";
import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <StatementBand />
      <WhatIBuild />
      <Approach />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
