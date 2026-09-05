/**
 * WHAT I BUILD answers "what can this person build", not "which methods does he use".
 * PROMPT ENGINEERING deliberately lives in APPROACH + STACK instead.
 * DIGITAL SYSTEMS is used as the umbrella term for the section, not as a sixth row:
 * as a row it only repeats 01/02/04.
 */
export const capabilities = [
  {
    index: "01",
    name: "AI PRODUCTS / AGENTS",
    line: "Агент в Telegram, который помнит контекст и работает по расписанию.",
    proof: ["01", "02"],
    glyph: "node",
  },
  {
    index: "02",
    name: "AUTOMATION",
    line: "Задачи по расписанию: дайджест утром, сводка в понедельник.",
    proof: ["01", "02"],
    glyph: "cycle",
  },
  {
    index: "03",
    name: "WEB / LANDINGS",
    line: "Одностраничные сайты с формой заявки: от структуры до рабочей ссылки.",
    proof: ["04", "05"],
    glyph: "frame",
  },
  {
    index: "04",
    name: "INTERFACES",
    line: "Проектирую экраны и переходы между ними до того, как появится код.",
    proof: ["03"],
    glyph: "screens",
  },
  {
    index: "05",
    name: "AI VISUAL",
    line: "Собираю изображения и видео, в том числе нодовыми пайплайнами.",
    proof: [],
    glyph: "raster",
  },
] as const;

export const capabilitiesUmbrella = "DIGITAL SYSTEMS";

export const approach = [
  { index: "01", label: "PROBLEM IN WORDS", line: "Формулирую проблему словами, а не списком фич." },
  { index: "02", label: "HOW A PERSON USES IT", line: "Описываю, как человек этим пользуется." },
  { index: "03", label: "BUILD THE WORKING VERSION", line: "Собираю рабочую версию в Claude Code / Codex." },
  { index: "04", label: "TEST ON MYSELF", line: "Проверяю в реальном использовании, на себе." },
  { index: "05", label: "FIX WHAT BROKE", line: "Правлю по тому, что сломалось." },
] as const;

export const stack = [
  {
    group: "AI / AGENTS",
    items: [
      { name: "Claude Code", daily: true },
      { name: "Codex", daily: true },
      { name: "Prompt engineering", daily: true },
      { name: "ChatGPT", daily: false },
      { name: "Claude (web)", daily: false },
      { name: "Cursor", daily: false },
      { name: "MCP servers", daily: false },
      { name: "Skills / subagents", daily: false },
      { name: "OpenAI SDK / OAuth", daily: false },
    ],
  },
  {
    group: "WEB",
    items: [
      { name: "React", daily: false },
      { name: "Vite", daily: false },
      { name: "Next.js", daily: false },
      { name: "TypeScript", daily: false },
      { name: "HTML / CSS", daily: false },
      { name: "JavaScript", daily: false },
      { name: "Vercel", daily: false },
    ],
  },
  {
    group: "AI VISUAL",
    items: [
      { name: "Midjourney", daily: false },
      { name: "Sora", daily: false },
      { name: "Kling", daily: false },
      { name: "Flux", daily: false },
      { name: "Nano Banana", daily: false },
      { name: "Higgsfield", daily: false },
      { name: "Weavy / Figma Weave", daily: false },
    ],
  },
  {
    group: "INFRASTRUCTURE",
    items: [
      { name: "Ubuntu VDS", daily: false },
      { name: "systemd", daily: false },
      { name: "cron", daily: false },
      { name: "SSH keys", daily: false },
      { name: "Python 3.11", daily: false },
      { name: "SQLite / WAL", daily: false },
      { name: "Telegram Bot API", daily: false },
      { name: "Google Sheets API", daily: false },
      { name: "bash", daily: false },
    ],
  },
] as const;

export const stackNote =
  "Сервер и деплой настроены через Codex по моим промтам и под моим контролем.";
