import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { cases } from "@/content/cases";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const caseUrls = projects
    .filter((p) => cases[p.slug])
    .map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...caseUrls,
  ];
}
