export type ProjectVisual =
  | { kind: "diagram" }
  | {
      kind: "media";
      ratio: string;
      /** real assets in /public/media, both derivatives */
      processed?: string;
      clean?: string;
      alt?: string;
      status: "pending" | "capture" | "ready";
      note: string;
    }
  | { kind: "filmstrip"; frames: number; ratio: string; status: "pending"; note: string };

/**
 * ROLE values describe contribution, never method or technology.
 * Audited at Stage 6.1 against the case studies and the résumé source. Every term
 * below is backed by a statement of what was actually done; LEAD RADAR lost `BUILD`
 * because nothing supports code authorship — the code is written by the models.
 */
export type Project = {
  index: string;
  slug: string;
  name: string;
  /** Kept in the data model so /work can add filtering later without a migration. */
  type: string;
  tags: string[];
  year: string;
  role: string;
  status: string;
  summary: string;
  stack: string[];
  /** Only rendered when the fact is confirmed. */
  result: string[];
  /** Confirmed numbers, rendered as display numerals. */
  metrics?: { value: string; label: string }[];
  links: { label: string; href: string }[];
  visual: ProjectVisual;
  /**
   * `core` — a system or product with a full case study of its own.
   * `web`  — an execution example. It shows that a landing can be built to a working
   *          link; it is not a separate product achievement and never gets a case page.
   */
  tier: "core" | "web";
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "lead-radar",
    name: "LEAD RADAR",
    type: "AI / AUTOMATION",
    tags: ["AI", "AUTOMATION", "SYSTEMS"],
    year: "2026",
    role: "PRODUCT · SETUP · REVIEW",
    status: "IN PRODUCTION",
    summary:
      "Сервис поиска лидов в Telegram: следит за реестром источников, дедуплицирует сообщения, квалифицирует их моделью и присылает владельцу ограниченный дайджест два раза в день.",
    stack: ["Python", "SQLite/WAL", "Telegram", "Groq", "systemd", "Ubuntu VDS"],
    result: [],
    links: [
      { label: "SOURCE", href: "https://github.com/n011x/lead-radar" },
      { label: "VIEW CASE", href: "/work/lead-radar" },
    ],
    visual: { kind: "diagram" },
    tier: "core",
  },
  {
    index: "02",
    slug: "hermes",
    name: "HERMES",
    type: "AI AGENT",
    tags: ["AI", "AUTOMATION"],
    year: "2026",
    role: "PRODUCT · SETUP · REVIEW",
    status: "LIVE",
    summary:
      "Личный ассистент в Telegram: держит рабочий контекст и workspace, работает по расписанию, продолжает задачи и разбирает бытовые запросы — от статистики по сделкам до маршрута на вечер.",
    stack: ["Ubuntu VDS", "Telegram Gateway", "systemd", "Python 3.11", "skills"],
    result: ["20–30 вакансий в неделю"],
    metrics: [
      { value: "105", label: "ВАКАНСИЙ / МЕС · ОДИН ИЗ СЦЕНАРИЕВ" },
      { value: "SINCE 06.2026", label: "LIVE" },
      { value: "~5", label: "ЧАСОВ НА СБОРКУ" },
    ],
    links: [
      { label: "LIVE", href: "https://agent-hermes-tg-website.vercel.app" },
      { label: "VIEW CASE", href: "/work/hermes" },
    ],
    visual: {
      kind: "media",
      ratio: "16 / 10",
      processed: "hermes-processed",
      clean: "hermes-clean",
      alt: "Сайт-презентация агента Hermes, обработанный упорядоченным дизерингом",
      status: "ready",
      note: "PROCESSED · ORDERED DITHER",
    },
    tier: "core",
  },
  {
    index: "03",
    slug: "route",
    name: "ROUTE",
    type: "INTERFACE",
    tags: ["INTERFACE", "PRODUCT"],
    year: "2026",
    role: "PRODUCT · INTERFACE · REVIEW",
    status: "INTERFACE MOCKUP",
    summary:
      "Личный путеводитель к цели «найти удалённую AI-работу»: показывает этап пути, узкое место и задачи на сегодня.",
    stack: ["Codex"],
    result: ["5 экранов", "4 этапа пути"],
    links: [{ label: "VIEW CASE", href: "/work/route" }],
    visual: { kind: "filmstrip", frames: 5, ratio: "9 / 19.5", status: "pending", note: "VISUAL PENDING" },
    tier: "core",
  },
  {
    index: "04",
    slug: "luma-english",
    name: "LUMA ENGLISH",
    type: "WEB / LANDING",
    tags: ["WEB"],
    year: "2026",
    role: "STRUCTURE · COPY · REVIEW",
    status: "LIVE · DEMO",
    summary:
      "Демо-лендинг онлайн-школы: семь секций от программ до записи, собственная мобильная вёрстка. Оплата не подключена.",
    stack: ["React", "Vite", "Vercel"],
    result: ["7 секций", "3 программы", "3 тарифа", "~3 часа"],
    links: [
      { label: "LIVE", href: "https://luma-english-ten.vercel.app" },
    ],
    visual: {
      kind: "media",
      ratio: "21 / 9",
      processed: "luma-split",
      clean: "luma-clean",
      alt: "Лендинг LUMA English: слева обработанное состояние, справа чистый интерфейс",
      status: "ready",
      note: "PROCESSED → CLEAN",
    },
    tier: "web",
  },
  {
    index: "05",
    slug: "yasno-house",
    name: "ЯСНОДОМ",
    type: "WEB / LANDING",
    tags: ["WEB"],
    year: "2026",
    role: "STRUCTURE · COPY · REVIEW",
    status: "LIVE · DEMO",
    summary:
      "Лендинг под одно действие: заявка сразу отдаёт PDF-подборку, без ожидания звонка. Цифры и бренд помечены как плейсхолдеры на самой странице.",
    stack: ["React", "Vite", "Vercel"],
    result: ["6 блоков", "2 формы", "~3 часа"],
    links: [
      { label: "LIVE", href: "https://ysnohousereffwebsite.vercel.app" },
    ],
    visual: {
      kind: "media",
      ratio: "16 / 10",
      clean: "yasno-clean",
      processed: "yasno-clean",
      alt: "Главный экран лендинга ЯсноДом с формой заявки",
      status: "ready",
      note: "SITE CAPTURE · CLEAN",
    },
    tier: "web",
  },
];

/** The three systems that carry a full case study. */
export const coreProjects = projects.filter((p) => p.tier === "core");
/** Landing work, shown as a capability rather than as separate products. */
export const webExamples = projects.filter((p) => p.tier === "web");

/**
 * Real Lead Radar pipeline — the primary visual object of project 01.
 * `x` / `y` are percentages inside the map; the connector path is orthogonal so it
 * survives non-uniform scaling of the SVG.
 */
export const leadRadarPipeline = [
  { id: "01", label: "SOURCES", note: "реестр источников", x: 1, y: 30 },
  { id: "02", label: "INGEST", note: "нормализация, дедуп", x: 13.7, y: 68 },
  { id: "03", label: "LEDGER", note: "SQLite/WAL, провенанс", x: 26.4, y: 14 },
  { id: "04", label: "PRE-FILTER", note: "детерминированный отбор", x: 39.1, y: 58 },
  { id: "05", label: "QUALIFY", note: "ответ модели, схема", x: 51.8, y: 22 },
  { id: "06", label: "RANK", note: "ранжирование, дедуп показа", x: 64.5, y: 76 },
  { id: "07", label: "DIGEST", note: "два окна в день, до 10 карточек", x: 77.2, y: 34 },
  { id: "08", label: "OWNER", note: "решение владельца", x: 90, y: 84 },
];
