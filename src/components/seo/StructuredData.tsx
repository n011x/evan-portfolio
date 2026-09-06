import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { cases } from "@/content/cases";
import { siteUrl } from "@/lib/site";

/**
 * Person + the work as CreativeWork. Only facts that are already visible on the page —
 * no invented ratings, no fake organisation.
 */
export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Evan",
    alternateName: "n011x",
    url: siteUrl,
    jobTitle: "AI Product Developer",
    description: "Собираю AI-агентов, автоматизации и веб-инструменты",
    knowsAbout: ["AI agents", "Automation", "Python", "Telegram bots", "Web development"],
    sameAs: profile.contacts.filter((c) => c.href.startsWith("http")).map((c) => c.href),
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.name,
      description: project.summary,
      dateCreated: project.year,
      genre: project.type,
      url:
        project.tier === "core" && cases[project.slug]
          ? `${siteUrl}/work/${project.slug}`
          : project.links.find((l) => l.label === "LIVE")?.href,
      sameAs: project.links.filter((l) => l.href.startsWith("http")).map((l) => l.href),
    })),
  };

  return (
    <script
      type="application/ld+json"
      // one static, self-generated JSON-LD blob — no user input reaches this
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}
