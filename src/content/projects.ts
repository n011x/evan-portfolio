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
 * TODO(stage-5): final factual review of every ROLE string against the real
 * contribution while the case studies are written. Do not add responsibilities.
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
  featured: boolean;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "lead-radar",
    name: "LEAD RADAR",
    type: "AI / AUTOMATION",
    tags: ["AI", "AUTOMATION", "SYSTEMS"],
    year: "2026",
    role: "PRODUCT · BUILD · REVIEW",
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
    featured: true,
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
      "Личный ассистент в Telegram: держит рабочий контекст, память и workspace, работает по расписанию и продолжает задачу на следующий день.",
    stack: ["Ubuntu VDS", "Telegram Gateway", "systemd", "Python 3.11", "skills"],
    result: ["20–30 вакансий в неделю"],
    metrics: [
      { value: "105", label: "ВАКАНСИЙ / МЕС" },
      { value: "2+", label: "МЕС БЕЗ ПЕРЕЗАПУСКА" },
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
    featured: true,
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
    featured: true,
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
      "Демо-лендинг онлайн-школы английского: программы, методика, тарифы и запись. Оплата не подключена.",
    stack: ["React", "Vite", "Vercel"],
    result: ["7 секций", "3 программы", "3 тарифа", "~3 часа"],
    links: [
      { label: "LIVE", href: "https://luma-english-ten.vercel.app" },
      { label: "VIEW CASE", href: "/work/luma-english" },
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
    featured: true,
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
      "Лендинг под одно действие: имя и телефон — и человек сразу получает PDF-подборку домов, без ожидания звонка. Цифры, фото и бренд помечены как плейсхолдеры на самой странице.",
    stack: ["React", "Vite", "Vercel"],
    result: ["6 блоков", "2 формы", "~3 часа"],
    links: [
      { label: "LIVE", href: "https://ysnohousereffwebsite.vercel.app" },
      { label: "VIEW CASE", href: "/work/yasno-house" },
    ],
    visual: { kind: "media", ratio: "16 / 10", status: "capture", note: "SITE CAPTURE · PENDING" },
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);

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
