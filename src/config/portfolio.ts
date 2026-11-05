/* ------------------------------------------------------------------ */
/*  PORTFOLIO CONFIGURATION                                            */
/*                                                                     */
/*  This file is the single source of truth for the site. Profile      */
/*  fields can also be overridden at runtime from the settings drawer  */
/*  (persisted to localStorage). To permanently update content —       */
/*  projects, descriptions, links, skills — edit the data below.       */
/*                                                                     */
/*  Every project description, capability list and technology claim    */
/*  below is grounded in the actual repository README / docs of        */
/*  github.com/talhadev-pk.                                            */
/* ------------------------------------------------------------------ */

export interface Shot {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  hue: string;
  /** short card description */
  description: string;
  /** long-form overview (modal) */
  overview: string[];
  problem: string;
  capabilities: string[];
  stack: string[];
  architecture: string[];
  engineering: string[];
  repo: string;
  live?: string;
  /** undefined → not deployed/verified; shown honestly in the UI */
  liveNote?: string;
  screenshots: Shot[];
  artwork?: { src: string; note: string };
  stat: { value: string; label: string };
}

export interface Profile {
  displayName: string;
  role: string;
  tagline: string;
  email: string;
  whatsapp: string;
  github: string;
  githubUser: string;
  siteUrl: string;
}

/*  Real interface captures are served straight from each repository's    */
/*  own docs on the GitHub CDN, so the portfolio always mirrors the       */
/*  repos. To use repo-local copies instead, drop files into              */
/*  public/shots/<project-id>/ and change src to "shots/<id>/<name>.png". */
const REPO_RAW = "https://raw.githubusercontent.com/talhadev-pk";

export const DEFAULT_PROFILE: Profile = {
  displayName: "Talha",
  role: "Software Engineer",
  tagline: "Web Applications · Business Systems · Automation & AI Tooling",
  email: "talha.sagheer.work@gmail.com",
  whatsapp: "+92 307 7251905",
  github: "https://github.com/talhadev-pk",
  githubUser: "talhadev-pk",
  siteUrl: "https://talhadev-pk.github.io/",
};

export const PROJECTS: Project[] = [
  {
    id: "flowpilot",
    index: "01",
    name: "FlowPilot",
    tagline: "Automate the Work. Accelerate the Future.",
    category: "Automation",
    year: "2025",
    hue: "#5ea0ff",
    description:
      "Workflow-automation SaaS with a visual node-based builder, template library, analytics and execution history — with honestly-labelled simulated runs.",
    overview: [
      "FlowPilot is a premium, fully interactive SaaS front-end: a complete marketing website plus a working application with a visual workflow builder, six realistic templates, live-computed analytics, execution history, an integration directory and persistent settings.",
      "It is deliberately honest about what it is: executions are simulated step-by-step in the browser, integrations are visual demos without OAuth, and every sample statistic is labelled as such in the interface.",
    ],
    problem:
      "Teams repeat the same multi-step work across inboxes, sheets and chat tools. FlowPilot explores how a visual automation product can make that work understandable, testable and observable — without hiding the simulation behind fake realism.",
    capabilities: [
      "Visual workflow builder on React Flow — add, move, connect and delete nodes with an inspector, zoom, pan and minimap",
      "Step-by-step simulated execution with success/failure states, an optional forced failure, and a full execution log",
      "Six realistic templates (customer & employee onboarding, lead follow-up, invoice reminders, support routing, order processing) with one-click loading into the builder",
      "Analytics and per-workflow performance charts calculated live from one deterministic dataset",
      "Searchable, filterable execution history — builder runs persist locally and appear instantly",
      "Eight demo integration cards with honest local-only connect states",
      "Dark/light themes, global page search, toasts, loading skeletons and reduced-motion support",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "React Flow", "Recharts", "Framer Motion", "React Router"],
    architecture: [
      "Template → React Flow conversion module keeps templates declarative and the builder generic",
      "A single deterministic mock dataset feeds dashboard, analytics and history so every figure agrees",
      "Typed localStorage store with HashRouter and base './' — every deep link works on static GitHub Pages",
      "App routes are lazy-loaded to keep the marketing site fast",
    ],
    engineering: [
      "Honesty as a feature: simulated runs, sample data and demo integrations are explicitly labelled in the UI",
      "Playwright sweep of all 14 routes finished with zero console errors",
      "Interaction QA covered template → builder loading, node creation, save, and a full simulated run appearing in history",
    ],
    repo: "https://github.com/talhadev-pk/flowpilot",
    live: "https://talhadev-pk.github.io/flowpilot/",
    screenshots: [
      {
        src: `${REPO_RAW}/flowpilot/main/docs/screenshots/history-desktop.png`,
        alt: "FlowPilot execution history view on desktop",
        caption: "Execution history — searchable and filterable",
      },
      {
        src: `${REPO_RAW}/flowpilot/main/docs/screenshots/mobile-builder.png`,
        alt: "FlowPilot visual workflow builder on mobile",
        caption: "Visual workflow builder — mobile layout",
      },
      {
        src: `${REPO_RAW}/flowpilot/main/docs/screenshots/mobile-home.png`,
        alt: "FlowPilot marketing homepage on mobile",
        caption: "Marketing homepage — mobile",
      },
    ],
    stat: { value: "14", label: "QA'd routes, zero console errors" },
  },
  {
    id: "commerceos",
    index: "02",
    name: "CommerceOS",
    tagline: "Your Entire Commerce Business. One Intelligent Platform.",
    category: "Business Systems",
    year: "2025",
    hue: "#a78bfa",
    description:
      "E-commerce management & BI platform unifying products, inventory, orders, customers, suppliers, analytics, finance and reporting in one workspace.",
    overview: [
      "CommerceOS is an enterprise-grade e-commerce management and business-intelligence platform built as a complete, interactive SaaS-style application — plus a public marketing site whose hero dashboard is rendered live from the real app dataset.",
      "Every KPI, chart and report derives from one shared, deterministic dataset: edit an order and the whole platform recalculates. Orders store immutable price/cost snapshots, so historical reports never change when a product is edited later.",
    ],
    problem:
      "Small commerce operations scatter products, stock, orders and finance across spreadsheets that quietly disagree. CommerceOS models the alternative: one mathematically consistent workspace where every number can explain its own formula.",
    capabilities: [
      "Executive dashboard — 8 KPI cards with honest period-over-period deltas, revenue/profit charts, 7/30/90-day periods",
      "Products: 36 seeded items, grid + table views, bulk actions, validated CRUD forms, CSV export",
      "Inventory with validated stock adjustments that can never go negative, health bars and movement audit history",
      "150 simulated orders across 7 fulfilment states, with detail timelines and printable summaries",
      "Customer segments (New / Returning / Loyal / At Risk) computed from actual order history",
      "Transparent P&L — gross sales, discounts, net, COGS, refunds — each line documents its formula",
      "Six configurable report types with live preview and CSV export from real local data",
      "⌘K command palette across products, orders and customers",
    ],
    stack: ["React 19", "TypeScript (strict)", "Vite 8", "Tailwind CSS 4", "Zustand 5", "Recharts 3", "Framer Motion", "React Router 7"],
    architecture: [
      "Deterministic seeded PRNG dataset: 36 products, 150 orders, 24 customers, 8 suppliers, 36 stock movements — identical for every fresh visitor",
      "Zustand persist middleware → localStorage with schema validation and graceful fallback",
      "Immutable price/cost snapshots per order line keep historical reports stable forever",
      "15 lazy routes and transform/opacity-only animations; zero external image dependencies",
    ],
    engineering: [
      "A documented computeMetrics() engine defines every financial figure — cancelled orders excluded from sales, returns tracked as refunds",
      "24 automated Playwright browser tests cover all routes, CRUD flows, CSV export, themes and persistence",
      "“No dead buttons” rule: every control performs a real action with toast feedback",
    ],
    repo: "https://github.com/talhadev-pk/commerceos",
    live: "https://talhadev-pk.github.io/commerceos/",
    screenshots: [
      {
        src: `${REPO_RAW}/commerceos/main/docs/screenshots/dashboard.png`,
        alt: "CommerceOS executive dashboard with KPIs and revenue charts",
        caption: "Executive dashboard — KPIs with true deltas",
      },
      {
        src: `${REPO_RAW}/commerceos/main/docs/screenshots/marketing-hero.png`,
        alt: "CommerceOS marketing homepage hero",
        caption: "Marketing site — hero preview from live data",
      },
      {
        src: `${REPO_RAW}/commerceos/main/docs/screenshots/dashboard-mobile.png`,
        alt: "CommerceOS dashboard on mobile",
        caption: "Dashboard — mobile layout",
      },
    ],
    stat: { value: "24", label: "automated browser tests" },
  },
  {
    id: "proseq-ai",
    index: "03",
    name: "ProseQ AI",
    tagline: "The writing workspace that thinks with you.",
    category: "AI & Content",
    year: "2025",
    hue: "#f472b6",
    description:
      "AI-assisted writing & content productivity workspace — rich-text editor, ten transparent writing tools, brand voices, planner and version history.",
    overview: [
      "ProseQ AI is an editorial-tech writing workspace: warm ivory surfaces, deep ink typography (Fraunces + Inter) and restrained motion. Documents, brand voices, planner entries and preferences persist in IndexedDB/localStorage and survive refreshes.",
      "Its “AI” is honest AI: a transparent, rule-based demo engine (grammar rules, extractive summarization, tone lexicons). Every result is labelled simulated, previewed before applying and cancellable — and the AIProvider interface is the documented seam where a real model backend can be plugged in.",
    ],
    problem:
      "Most AI writing tools are opaque magic — text goes in, text comes out, no accountability. ProseQ explores the opposite: a calm, local-first workspace where every transformation is transparent, previewed and reversible.",
    capabilities: [
      "Tiptap rich-text editor with autosave indicator, live word/character/reading-time stats and debounced snapshots",
      "Ten writing tools — improve, grammar, tone ×7, summarize, expand, shorten, continue, ideas, outline, rewrite — each with Apply/Cancel preview",
      "Document library with rename, duplicate, favorite, search, filter, sort and grid/list views",
      "28 templates in 7 categories; “Use template” creates a real editable document",
      "Brand voice profiles (tone, audience, words to use/avoid) that the demo engine actually respects",
      "Content planner calendar with statuses, plus version history capped at 20 snapshots per document with restore",
      "Export to .txt / .md / .html / clipboard, validated JSON library import/export",
      "⌘K global search across documents, templates, voices and planner",
    ],
    stack: ["React 18", "TypeScript (strict)", "Tiptap 2", "Zustand 5", "Tailwind CSS 3", "Framer Motion 11", "React Hook Form + Zod", "Recharts 2"],
    architecture: [
      "AIProvider interface isolates the rule-based demo engine behind the same contract a real LLM backend would implement",
      "Centralized persistence layer over IndexedDB/localStorage; first-run seed never overwrites user edits",
      "Version snapshots trigger on meaningful word-count deltas or 10-minute gaps, capped per document",
      "Vendor chunking (react / motion / editor / charts) keeps the initial gzip payload near ~200 kB with fonts",
    ],
    engineering: [
      "Every AI output carries a “simulated” label and requires approval before touching the document",
      "70 Vitest unit/component tests, a 17-check Playwright smoke suite, and a 15-route × 3-width overflow sweep",
      "Settings include export / import / clear / reset with conflict warnings — user data is treated as sacred",
    ],
    repo: "https://github.com/talhadev-pk/proseq-ai",
    live: "https://talhadev-pk.github.io/proseq-ai/",
    screenshots: [
      {
        src: `${REPO_RAW}/proseq-ai/main/screenshots/writer.png`,
        alt: "ProseQ AI writer with rich-text editor and writing tools",
        caption: "AI Writer — Tiptap editor with live stats",
      },
      {
        src: `${REPO_RAW}/proseq-ai/main/screenshots/home.png`,
        alt: "ProseQ AI marketing homepage in light theme",
        caption: "Editorial marketing site — light",
      },
      {
        src: `${REPO_RAW}/proseq-ai/main/screenshots/app-overview.png`,
        alt: "ProseQ AI application overview dashboard",
        caption: "App overview — library stats and recent work",
      },
      {
        src: `${REPO_RAW}/proseq-ai/main/screenshots/home-dark.png`,
        alt: "ProseQ AI homepage in dark theme",
        caption: "Ink-dark theme — home",
      },
    ],
    stat: { value: "70+", label: "unit & component tests" },
  },
  {
    id: "tracksphere",
    index: "04",
    name: "TrackSphere",
    tagline: "Clarity for every project.",
    category: "Project Ops",
    year: "2026",
    hue: "#2dd4bf",
    description:
      "Project & team operations workspace — planning, tasks, real drag-and-drop Kanban, timeline and calendar views, workload, reports and CSV export.",
    overview: [
      "TrackSphere is a project-management and team-operations workspace combining projects, tasks, subtasks, comments, Kanban, timeline and calendar views, workload summaries, reports, activity, files and notes — all persisted in a single versioned workspace record.",
      "It ships without captured screenshots on purpose: the repository documents that generated artwork should never be presented as a real application capture. The preview shown here is portfolio artwork, labelled as such.",
    ],
    problem:
      "Project tools tend to force a choice between heavy server products and throwaway to-do lists. TrackSphere demonstrates a middle path: a serious operations workspace that runs entirely in the browser without pretending to have a backend.",
    capabilities: [
      "Projects: create, update, archive, delete, search, status filters, sorting and favorites",
      "Tasks with assignments, priorities, dates, estimated/logged effort, tags, subtasks, comments and duplication",
      "Real Kanban drag-and-drop — dropping a card changes and persists the underlying task status",
      "Timeline and calendar views reading the same task and milestone records",
      "Team directory CRUD with data-driven workload summaries",
      "Reports with date/project filters and CSV export from current stored data",
      "JSON workspace export/import with validation, demo-data restore, and a clear action that preserves your profile",
      "Small files embedded as data URLs with a 750 KB quota-safety limit",
    ],
    stack: ["React 18", "TypeScript 5", "Vite 6", "Tailwind CSS 3", "Zustand", "@dnd-kit", "Recharts", "Zod"],
    architecture: [
      "One versioned workspace record keeps projects, tasks, members, milestones, notes, files and preferences together for export/import",
      "Derived workload logic lives outside components: open assigned tasks in the window, summing max(estimated − logged, 0) hours",
      "First-run seeding only happens when no saved workspace exists — intentionally empty arrays are never overwritten",
      "GITHUB_ACTIONS env switches the Vite base to /tracksphere/ so local dev and Pages deploy share one config",
    ],
    engineering: [
      "Vitest suite covers profile persistence, record rehydration, deletion, reset semantics and the documented workload formula",
      "Every illustrated number is labelled illustrative; no invitations, emails or sync are faked",
      "README explicitly documents its seed/restore semantics so refresh behavior is predictable",
    ],
    repo: "https://github.com/talhadev-pk/tracksphere",
    live: "https://talhadev-pk.github.io/tracksphere/",
    screenshots: [],
    artwork: {
      src: "art/tracksphere.png",
      note: "Portfolio artwork — TrackSphere deliberately ships no screenshots so that generated images are never mistaken for real captures.",
    },
    stat: { value: "4", label: "view modes over one dataset" },
  },
  {
    id: "nexacore",
    index: "05",
    name: "NexaCore",
    tagline: "Turn Business Data Into Better Decisions.",
    category: "Data & BI",
    year: "2026",
    hue: "#34d399",
    description:
      "Local-first enterprise intelligence — data exploration, KPI targets with thresholds, saved reports, explainable insights, OLS forecasting and a dashboard builder.",
    overview: [
      "NexaCore is a local-first enterprise-intelligence application: data exploration, business intelligence, explainable local insights, KPI targets, saved reports, forecasting and a customizable dashboard builder — all computed from a deterministic fictional dataset.",
      "Its signature discipline is definition-first analytics: every metric in the README documents its exact formula, from profit = revenue − expenses to the KPI status thresholds (on track ≥ target, needs attention ≥ 0.8×, otherwise below).",
    ],
    problem:
      "Dashboards often show confident numbers with undocumented math. NexaCore is built on the opposite principle — every figure carries its definition, its scope and its assumptions, so analysis can actually be trusted.",
    capabilities: [
      "Executive overview with period filtering, dataset totals and regional/product breakdowns",
      "BI explorer: metric selection, region & period filters, grouping, area/line/bar/pie/donut charts, saved views",
      "Local “AI insights” from deterministic grouped arithmetic — with explanations and save/unsave",
      "Data Explorer over Sales, Customers, Products and Operations with full-text search and pagination",
      "Validated Sales CSV import — atomic rejection with explanation, never silent drops; CSV export everywhere",
      "KPI targets with annual/quarterly/monthly scopes and threshold-based status",
      "Forecasting via ordinary least squares with explicit assumptions and floor-at-zero extrapolation",
      "Dashboard builder: add/remove widgets, accessible up/down reordering, duplicate and rename",
    ],
    stack: ["React 19", "TypeScript", "Vite 6", "Tailwind CSS 4", "Zustand", "Recharts", "TanStack Table", "Zod"],
    architecture: [
      "Versioned, validated Zustand workspace with guarded writes and automatic recovery copies on storage failure",
      "144-record aggregated Sales dataset across 12 months; Operations is a documented projection of the same records",
      "CSV parser supports quoted commas, escaped quotes and multiline fields; 5 MB / 10,000-record import limits",
      "Native modal dialogs give focus containment and Escape dismissal without a dependency",
    ],
    engineering: [
      "Insights deliberately use grouped sums and counts only — no fake statistical confidence is claimed",
      "Growth metric compares record halves in stored order and says so, instead of pretending year-over-year data",
      "12 Vitest tests guard data, CSV, workspace validation and KPI threshold logic",
    ],
    repo: "https://github.com/talhadev-pk/nexacore",
    liveNote: "Prepared for GitHub Pages deployment — not published yet",
    screenshots: [],
    artwork: {
      src: "art/nexacore.png",
      note: "Portfolio artwork representing NexaCore’s data constellation identity — no product screenshots are published in the repository.",
    },
    stat: { value: "144", label: "record analytical dataset" },
  },
  {
    id: "restaurantos",
    index: "06",
    name: "RestaurantOS",
    tagline: "The dining room, kitchen and ledger — in one transaction-safe browser app.",
    category: "Simulation",
    year: "2026",
    hue: "#fbbf24",
    description:
      "Browser-native restaurant management & business simulation — POS, KDS, tables, recipes, inventory, purchasing, staff, finance, reports and a live simulation engine.",
    overview: [
      "RestaurantOS runs an entire restaurant in the browser. IndexedDB (via Dexie.js) holds 29 tables with indexes and multi-table transactions — no backend, no database server, no cloud. On first launch it seeds a complete demo restaurant: menu, recipes, inventory, staff and ~120 realistic historical orders.",
      "A tick engine drives virtual customers and a virtual kitchen in assisted, automatic or stress mode while the tab is open — closing the tab pauses everything safely.",
    ],
    problem:
      "Restaurant operations span the dining room, kitchen, stockroom and ledger — systems that must agree with each other to the cent and the gram. RestaurantOS models that whole loop with transactional integrity, entirely client-side.",
    capabilities: [
      "17 screens: dashboard, POS, KDS, tables, menu, recipes, inventory, purchasing, customers, employees, finance, reports (CSV), simulation, storage & backup, audit and settings",
      "Recipe-driven inventory — completing an order deducts ingredients, refunds restore them",
      "Simulation engine with virtual customers and kitchen (assisted / automatic / stress modes)",
      "Full JSON backup/restore with schema validation and confirmed clear-data",
      "Local sign-in with per-browser-profile database isolation",
      "Audit trail for sensitive overrides such as negative-stock allowance",
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS 4", "Dexie.js (IndexedDB)", "Framer Motion", "Recharts", "Vite", "Lucide"],
    architecture: [
      "29-table IndexedDB schema with indexes and Dexie transactions for atomic multi-table operations",
      "Business logic concentrated in a services layer; every UI “request” resolves through a local dispatcher against IndexedDB",
      "Order items snapshot name, price and tax so history survives any menu edit",
      "Hash-based routing and env-driven Vite base make static GitHub Pages deployment a push-button operation",
    ],
    engineering: [
      "Exactly-once inventory deduction at order completion via transaction + status check",
      "Exactly-once payment per completed order; negative stock blocked unless an audited override is enabled",
      "21 headless acceptance checks verify the business logic against an emulated IndexedDB (tsx smoke script)",
    ],
    repo: "https://github.com/talhadev-pk/restaurantos",
    liveNote: "Deployment-ready — publishes to GitHub Pages via included workflow",
    screenshots: [],
    artwork: {
      src: "art/restaurantos.png",
      note: "Portfolio artwork — the repository ships interface documentation rather than captured screenshots.",
    },
    stat: { value: "29", label: "table IndexedDB schema" },
  },
];

export const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

/* ------------------------------------------------------------------ */
/*  Skills — grounded in the six repositories above                    */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  title: string;
  blurb: string;
  icon: string; // lucide key handled in component
  skills: { name: string; from: string }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    blurb: "Interfaces that feel designed, not assembled.",
    icon: "layout",
    skills: [
      { name: "React 18 / 19", from: "all six projects" },
      { name: "TypeScript (strict)", from: "CommerceOS, ProseQ" },
      { name: "Tailwind CSS v3 & v4", from: "all six projects" },
      { name: "Framer Motion", from: "FlowPilot, ProseQ, TrackSphere…" },
      { name: "Recharts data-viz", from: "CommerceOS, NexaCore" },
      { name: "Tiptap rich text", from: "ProseQ AI" },
      { name: "React Flow canvas", from: "FlowPilot" },
      { name: "DnD Kit interactions", from: "TrackSphere" },
      { name: "Responsive & a11y", from: "focus rings, ARIA, reduced-motion" },
    ],
  },
  {
    title: "Architecture & State",
    blurb: "Client-side systems engineered like server-grade ones.",
    icon: "layers",
    skills: [
      { name: "Zustand + persist", from: "CommerceOS, TrackSphere, NexaCore" },
      { name: "IndexedDB / Dexie transactions", from: "RestaurantOS, ProseQ" },
      { name: "Deterministic seed data", from: "CommerceOS, NexaCore" },
      { name: "Versioned schema migration", from: "TrackSphere, NexaCore" },
      { name: "Route-level code splitting", from: "CommerceOS, FlowPilot" },
      { name: "HashRouter static deploys", from: "all six projects" },
      { name: "Immutable history snapshots", from: "CommerceOS, RestaurantOS" },
      { name: "Zod validation", from: "ProseQ, TrackSphere, NexaCore" },
    ],
  },
  {
    title: "Data & Business Systems",
    blurb: "Numbers that can explain their own math.",
    icon: "chart",
    skills: [
      { name: "KPI & metrics engines", from: "CommerceOS, NexaCore" },
      { name: "Financial P&L modelling", from: "CommerceOS" },
      { name: "CSV import / export", from: "CommerceOS, NexaCore, TrackSphere" },
      { name: "Reporting pipelines", from: "CommerceOS, RestaurantOS" },
      { name: "OLS forecasting", from: "NexaCore" },
      { name: "Inventory & order lifecycles", from: "RestaurantOS, CommerceOS" },
      { name: "Audit trails", from: "RestaurantOS" },
    ],
  },
  {
    title: "AI & Automation",
    blurb: "Intelligence with the label on the tin.",
    icon: "sparkles",
    skills: [
      { name: "Rule-based writing engine", from: "ProseQ AI" },
      { name: "Workflow automation UX", from: "FlowPilot" },
      { name: "Explainable local insights", from: "NexaCore" },
      { name: "Simulation engines", from: "RestaurantOS" },
      { name: "Provider-seam API design", from: "ProseQ AI" },
      { name: "Honest simulated-AI patterns", from: "ProseQ, FlowPilot" },
    ],
  },
  {
    title: "Testing & Delivery",
    blurb: "Nothing ships red.",
    icon: "shield",
    skills: [
      { name: "Vitest suites", from: "ProseQ (70), NexaCore (12), TrackSphere" },
      { name: "Playwright sweeps", from: "CommerceOS (24), FlowPilot, ProseQ" },
      { name: "Headless smoke checks", from: "RestaurantOS (21)" },
      { name: "Overflow & mobile QA", from: "ProseQ 15-route × 3-width sweep" },
      { name: "GitHub Actions → Pages", from: "all six projects" },
      { name: "ESLint + typecheck gates", from: "CI in every repo" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Engineering process                                                */
/* ------------------------------------------------------------------ */

export const PROCESS = [
  {
    n: "01",
    title: "Discover",
    text: "Understand the problem and the requirements before touching a keyboard — who uses this, what they repeat, where the current pain lives.",
  },
  {
    n: "02",
    title: "Architect",
    text: "Design the structure and technical approach: data model first, then state ownership, module seams and the persistence strategy.",
  },
  {
    n: "03",
    title: "Engineer",
    text: "Build the interface and the functionality together — design systems, typed stores, and components that survive real data.",
  },
  {
    n: "04",
    title: "Validate",
    text: "Test workflows, persistence and reliability with unit suites, browser sweeps and overflow checks — and keep the console at zero errors.",
  },
  {
    n: "05",
    title: "Refine",
    text: "Improve usability, performance and visual quality: motion that respects reduced-motion, honest labels, accessible focus, fast first paint.",
  },
  {
    n: "06",
    title: "Deploy",
    text: "Publish and maintain: static-first builds, Actions workflows, deep-link-safe routing, and READMEs that tell the truth.",
  },
];

/* ------------------------------------------------------------------ */
/*  Honest headline stats (derived from repo documentation)            */
/* ------------------------------------------------------------------ */

export const STATS = [
  { value: "06", label: "shipped projects" },
  { value: "04", label: "live deployments" },
  { value: "160+", label: "automated tests & browser checks" },
  { value: "00", label: "backends — fully static" },
];
