import type { CategoryMeta } from "@/types";

/**
 * Category taxonomy. `icon` is a Lucide icon name resolved by `lib/icon-map`.
 */
export const categories: CategoryMeta[] = [
  {
    slug: "ai-chat",
    icon: "MessagesSquare",
    name: "AI Chat Interfaces",
    shortName: "AI Chat",
    description:
      "Self-hosted chat front-ends for large language models — bring your own keys or run local models with full data control.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "ai-assistants",
    icon: "Bot",
    name: "AI Assistants",
    shortName: "AI Assistants",
    description:
      "Personal AI copilots that search your knowledge, automate tasks, and run offline-first on your own hardware.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    slug: "ai-agents",
    icon: "BrainCircuit",
    name: "AI Agent Platforms",
    shortName: "AI Agents",
    description:
      "Visual builders for LLM apps, RAG pipelines, and autonomous agents — the open-source backbone for AI products.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    slug: "ai-coding",
    icon: "Terminal",
    name: "AI Coding Assistants",
    shortName: "AI Coding",
    description:
      "Open-source coding agents, AI editors, and autocomplete tools — self-hostable alternatives to Claude Code, Copilot, and Cursor.",
    gradient: "from-slate-500 to-blue-500",
  },
  {
    slug: "design",
    icon: "PenTool",
    name: "Design & Prototyping",
    shortName: "Design Tools",
    description:
      "Collaborative design, whiteboarding, and prototyping tools that keep your files open and exportable.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    slug: "notes",
    icon: "NotebookPen",
    name: "Notes & Knowledge",
    shortName: "Note-Taking",
    description:
      "Local-first note apps, wikis, and knowledge bases with linking, databases, and end-to-end encryption.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    slug: "productivity",
    icon: "CalendarCheck",
    name: "Productivity & Scheduling",
    shortName: "Productivity",
    description:
      "Scheduling, calendaring, file sync, and task tools that replace subscription productivity suites.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    slug: "project-management",
    icon: "FolderKanban",
    name: "Project Management",
    shortName: "Project Mgmt",
    description:
      "Issue trackers, kanban boards, and agile suites for teams that want to own their roadmap data.",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    slug: "communication",
    icon: "MessageCircle",
    name: "Communication",
    shortName: "Communication",
    description:
      "Team chat, video conferencing, and community platforms you can self-host for privacy and control.",
    gradient: "from-cyan-500 to-sky-500",
  },
  {
    slug: "no-code",
    icon: "Database",
    name: "No-Code & Databases",
    shortName: "No-Code",
    description:
      "Airtable-style databases and internal tool builders that turn data into apps without a backend team.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    slug: "automation",
    icon: "Workflow",
    name: "Workflow Automation",
    shortName: "Automation",
    description:
      "Node-based automation and integration platforms — connect apps and run workflows on your own terms.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    slug: "analytics",
    icon: "BarChart3",
    name: "Web Analytics",
    shortName: "Analytics",
    description:
      "Privacy-friendly, cookie-free analytics and product insight tools that keep visitor data yours.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    slug: "dev-tools",
    icon: "Terminal",
    name: "Developer Tools",
    shortName: "Dev Tools",
    description:
      "API clients, search engines, observability, and monitoring stacks built for developers, by developers.",
    gradient: "from-slate-500 to-zinc-500",
  },
  {
    slug: "hosting",
    icon: "Server",
    name: "Hosting & Deployment",
    shortName: "Hosting",
    description:
      "Self-hosted PaaS and deployment platforms — a Heroku-like experience on infrastructure you control.",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    slug: "cms-ecommerce",
    icon: "ShoppingBag",
    name: "CMS & E-commerce",
    shortName: "CMS & Commerce",
    description:
      "Headless CMS, publishing, and commerce platforms that decouple content from presentation.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    slug: "backend",
    icon: "Boxes",
    name: "Backend & BaaS",
    shortName: "Backend",
    description:
      "Open-source Firebase alternatives — auth, databases, storage, and APIs in a single self-hostable stack.",
    gradient: "from-teal-500 to-cyan-500",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): CategoryMeta | undefined {
  return categoryBySlug.get(slug);
}
