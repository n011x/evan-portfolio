import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { About } from "@/components/about/About";
import { WebExamples } from "@/components/work/WebExamples";
import { Contact } from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <WebExamples />
      <Contact />
    </>
  );
}
