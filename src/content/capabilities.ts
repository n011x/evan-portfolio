/**
 * WHAT I BUILD answers "what can this person build", not "which methods does he use".
 * PROMPT ENGINEERING deliberately lives in APPROACH + STACK instead.
 * DIGITAL SYSTEMS is used as the umbrella term for the section, not as a sixth row:
 * as a row it only repeats 01/02/04.
 *
 * `proof` points at the work that backs the row. Core systems are named by their index;
 * landing work is named `WEB`, because it is a capability example rather than a numbered
 * project in the same series — the numbering must not imply five peers.
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
    proof: ["WEB"],
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

