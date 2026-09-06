/**
 * What ABOUT offers and how it gets made. Both lists are deliberately name-only:
 * the descriptions that used to hang under them repeat the CONTEXT / PROBLEM /
 * APPROACH bands inside the cases, where they are backed by real work.
 *
 * Written lowercase on purpose — the section speaks in the first person, and the
 * uppercase mono labels elsewhere are system chrome, not speech.
 */
export const helpWith = [
  { index: "01", name: "ai-агенты под ваши задачи" },
  { index: "02", name: "сайты и веб-приложения" },
  { index: "03", name: "автоматизация бизнес-процессов" },
  { index: "04", name: "интеграции и ai-воркфлоу" },
  { index: "05", name: "mvp и прототипы" },
  { index: "06", name: "ai-визуал: изображения и видео" },
  { index: "07", name: "ai-инструменты для бизнеса и личной работы" },
] as const;

/** The loop, as one line. The last step returns to the first. */
export const flow = [
  "проблема словами",
  "сценарий использования",
  "рабочая версия",
  "проверка на себе",
  "правки",
] as const;
