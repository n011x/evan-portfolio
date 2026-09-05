/**
 * Every value here is traceable to ../myresume/content.md + content.json.
 * Nothing is invented. Missing facts are absent, not filled in.
 */

export const profile = {
  name: "EVAN",
  wordmark: "EVAN CARTEX",
  /** Hero positioning — output first, tools second. */
  roleLines: ["AI AGENTS", "WEB", "AUTOMATION"],
  /** RU supporting statement. Meaning fixed, wording may flex with the composition. */
  statement:
    "Собираю системы, веб и автоматизации — от разбора контекста до работающего продукта.",
  /** Closing line, kept verbatim from the source. */
  tagline: ["Идея вечером —", "рабочая ссылка утром."],
  status: "OPEN TO WORK",
  workMode: "REMOTE",
  year: "2026",
  build: "0.1.0",
  proof: [
    { value: "05", label: "PROJECTS" },
    { value: "03", label: "LIVE LINKS" },
    { value: "2+", label: "MO · HERMES UPTIME" },
  ],
  /** Small facts for the hero glass plate — system metadata, not a badge. */
  systemPlate: [
    { k: "SYS", v: "FIELD 01" },
    { k: "BUILD", v: "0.1.0 · 2026" },
    { k: "STATE", v: "OPEN TO WORK" },
  ],
  about: {
    lead: "С декабря 2025 работаю с AI-визуалом. С июня 2026 собираю системы, автоматизации и веб.",
    body: [
      "Работаю один и удалённо: от постановки задачи до сборки, запуска и ревью. Проверяю в реальном использовании, на себе.",
    ],
    background: [
      { period: "с 2020 · ~6 лет", title: "HoReCa", note: "бармен, затем старший бармен" },
      { period: "~6 лет", title: "Музыка", note: "биты, инструменталы, саунд-дизайн · @casperdecartex" },
      { period: "с 12.2025", title: "AI visual", note: "изображения, видео, нодовые пайплайны" },
    ],
    facts: ["Бег", "Зал", "Бокс"],
  },
  contacts: [
    { label: "TELEGRAM", handle: "@n011x", href: "https://t.me/n011x" },
    { label: "EMAIL", handle: "kostyuchenko.corp@gmail.com", href: "mailto:kostyuchenko.corp@gmail.com" },
    { label: "GITHUB", handle: "github.com/n011x", href: "https://github.com/n011x" },
  ],
} as const;

export type Contact = (typeof profile.contacts)[number];
