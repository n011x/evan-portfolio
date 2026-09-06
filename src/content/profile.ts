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
  status: "OPEN TO WORK",
  /** the direct contact CTA on the hero */
  telegram: "https://t.me/n011x",
  workMode: "REMOTE",
  year: "2026",
  /** last meaningful change to the site, shown instead of a version number */
  updated: "09.2026",
  /** Small facts for the hero glass plate — system metadata, not a badge. */
  systemPlate: [
    { k: "ОБНОВЛЕНО", v: "09.2026" },
    { k: "STATE", v: "OPEN TO WORK" },
  ],
  /** ABOUT — supplied verbatim, one entry per paragraph. */
  about: [
    "Иван, работаю удалённо.",
    "Помогаю бизнесу и специалистам внедрять AI в работу: собираю агентов, приложения, сайты и автоматизации, которые экономят время, снимают рутину и ускоряют запуск новых продуктов.",
    "До этого — девять лет в Москве и шесть лет за барной стойкой. Оттуда привычка держать несколько задач одновременно, читать человека за минуту и объяснять сложное простыми словами.",
    "Шестой год пишу музыку — биты, сведение, Ableton. Отсюда усидчивость в мелочах и привычка слушать результат, а не смотреть на процесс.",
    "Русский — родной, английский — рабочий.",
  ],
  contacts: [
    { label: "TELEGRAM", handle: "@n011x", href: "https://t.me/n011x" },
    { label: "GITHUB", handle: "github.com/n011x", href: "https://github.com/n011x" },
  ],
} as const;

export type Contact = (typeof profile.contacts)[number];
