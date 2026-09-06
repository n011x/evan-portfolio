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
  build: "0.1.0",
  /**
   * Three systems carry a case study; the landings are execution examples, not separate
   * products. No uptime claim: the start month is provable, a continuous window is not.
   */
  proof: [
    { value: "03", label: "CORE BUILDS" },
    { value: "02", label: "WEB EXAMPLES" },
    { value: "03", label: "LIVE LINKS" },
  ],
  /** Small facts for the hero glass plate — system metadata, not a badge. */
  systemPlate: [
    { k: "BUILD", v: "0.1.0 · 2026" },
    { k: "STATE", v: "OPEN TO WORK" },
  ],
  /** ABOUT — supplied verbatim, one entry per paragraph. */
  about: [
    "Иван. Работаю удалённо.",
    "Собираю AI-продукты: агентов в Telegram, автоматизации по расписанию, лендинги и небольшие веб-инструменты. Работаю от сценария — сначала формулирую проблему словами и описываю, как человек этим пользуется, потом собираю рабочую версию и проверяю её на себе в реальном использовании.",
    "До этого — девять лет в Москве и шесть лет за барной стойкой. Оттуда привычка держать несколько задач одновременно, читать человека за минуту и объяснять сложное простыми словами. Это оказалось полезнее, чем кажется: половина работы над продуктом — понять, что человеку на самом деле нужно.",
    "Шестой год пишу музыку — биты, сведение, Ableton. Отсюда усидчивость в мелочах и привычка слушать результат, а не смотреть на процесс.",
    "Русский — родной, английский — рабочий.",
  ],
  contacts: [
    { label: "TELEGRAM", handle: "@n011x", href: "https://t.me/n011x" },
    { label: "EMAIL", handle: "kostyuchenko.corp@gmail.com", href: "mailto:kostyuchenko.corp@gmail.com" },
    { label: "GITHUB", handle: "github.com/n011x", href: "https://github.com/n011x" },
  ],
} as const;

export type Contact = (typeof profile.contacts)[number];
