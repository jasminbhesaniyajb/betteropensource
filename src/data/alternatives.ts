import type { ProprietaryTool } from "@/types";

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

/**
 * Proprietary tools that open-source projects are positioned against.
 * Each powers an `/alternatives/[slug]` SEO hub page.
 */
export const proprietaryTools: ProprietaryTool[] = [
  // AI
  { slug: "chatgpt", name: "ChatGPT", description: "OpenAI's hosted conversational AI assistant.", logo: si("openai"), categorySlug: "ai-chat" },
  { slug: "claude", name: "Claude", description: "Anthropic's AI assistant for chat and analysis.", logo: si("anthropic"), categorySlug: "ai-chat" },
  { slug: "perplexity", name: "Perplexity", description: "AI answer engine with cited web search.", logo: si("perplexity"), categorySlug: "ai-chat" },
  { slug: "github-copilot", name: "GitHub Copilot", description: "AI pair programmer and chat assistant.", logo: si("githubcopilot"), categorySlug: "ai-assistants" },
  { slug: "openai-assistants", name: "OpenAI Assistants", description: "Hosted framework for building AI agents.", logo: si("openai"), categorySlug: "ai-agents" },
  { slug: "claude-code", name: "Claude Code", description: "Anthropic's agentic command-line coding assistant.", logo: si("claude"), categorySlug: "ai-coding" },
  { slug: "cursor", name: "Cursor", description: "AI-first code editor built on VS Code.", logo: si("cursor"), categorySlug: "ai-coding" },

  // Design
  { slug: "figma", name: "Figma", description: "Collaborative interface design and prototyping.", logo: si("figma"), categorySlug: "design" },
  { slug: "sketch", name: "Sketch", description: "Vector UI design app for macOS.", logo: si("sketch"), categorySlug: "design" },
  { slug: "miro", name: "Miro", description: "Online collaborative whiteboard platform.", logo: si("miro"), categorySlug: "design" },

  // Notes
  { slug: "notion", name: "Notion", description: "All-in-one docs, wikis, and databases workspace.", logo: si("notion"), categorySlug: "notes" },
  { slug: "evernote", name: "Evernote", description: "Note-taking and web clipping app.", logo: si("evernote"), categorySlug: "notes" },
  { slug: "confluence", name: "Confluence", description: "Atlassian's team wiki and knowledge base.", logo: si("confluence"), categorySlug: "notes" },
  { slug: "obsidian", name: "Obsidian", description: "Markdown knowledge base with linked notes.", logo: si("obsidian"), categorySlug: "notes" },

  // Productivity
  { slug: "calendly", name: "Calendly", description: "Automated meeting scheduling links.", logo: si("calendly"), categorySlug: "productivity" },
  { slug: "google-workspace", name: "Google Workspace", description: "Cloud office, mail, and file suite.", logo: si("google"), categorySlug: "productivity" },
  { slug: "dropbox", name: "Dropbox", description: "Cloud file storage and sync.", logo: si("dropbox"), categorySlug: "productivity" },

  // Project management
  { slug: "jira", name: "Jira", description: "Issue tracking and agile project management.", logo: si("jira"), categorySlug: "project-management" },
  { slug: "linear", name: "Linear", description: "Streamlined issue tracking for software teams.", logo: si("linear"), categorySlug: "project-management" },
  { slug: "trello", name: "Trello", description: "Kanban-style task boards.", logo: si("trello"), categorySlug: "project-management" },
  { slug: "asana", name: "Asana", description: "Work management and project tracking.", logo: si("asana"), categorySlug: "project-management" },

  // Communication
  { slug: "slack", name: "Slack", description: "Team messaging and channels.", logo: si("slack"), categorySlug: "communication" },
  { slug: "microsoft-teams", name: "Microsoft Teams", description: "Chat, meetings, and collaboration.", logo: si("microsoftteams"), categorySlug: "communication" },
  { slug: "discord", name: "Discord", description: "Community chat with voice and video.", logo: si("discord"), categorySlug: "communication" },
  { slug: "zoom", name: "Zoom", description: "Video meetings and webinars.", logo: si("zoom"), categorySlug: "communication" },

  // No-code
  { slug: "airtable", name: "Airtable", description: "Spreadsheet-database hybrid for teams.", logo: si("airtable"), categorySlug: "no-code" },
  { slug: "retool", name: "Retool", description: "Drag-and-drop internal tool builder.", logo: si("retool"), categorySlug: "no-code" },

  // Automation
  { slug: "zapier", name: "Zapier", description: "Connect apps and automate workflows.", logo: si("zapier"), categorySlug: "automation" },
  { slug: "ifttt", name: "IFTTT", description: "Simple conditional automation recipes.", logo: si("ifttt"), categorySlug: "automation" },

  // Analytics
  { slug: "google-analytics", name: "Google Analytics", description: "Web and product analytics platform.", logo: si("googleanalytics"), categorySlug: "analytics" },
  { slug: "mixpanel", name: "Mixpanel", description: "Event-based product analytics.", logo: si("mixpanel"), categorySlug: "analytics" },
  { slug: "amplitude", name: "Amplitude", description: "Digital analytics and experimentation.", logo: si("amplitude"), categorySlug: "analytics" },

  // Dev tools
  { slug: "postman", name: "Postman", description: "API design, testing, and collaboration.", logo: si("postman"), categorySlug: "dev-tools" },
  { slug: "datadog", name: "Datadog", description: "Cloud monitoring and observability.", logo: si("datadog"), categorySlug: "dev-tools" },
  { slug: "new-relic", name: "New Relic", description: "Application performance monitoring.", logo: si("newrelic"), categorySlug: "dev-tools" },
  { slug: "algolia", name: "Algolia", description: "Hosted search-as-a-service API.", logo: si("algolia"), categorySlug: "dev-tools" },

  // Hosting
  { slug: "heroku", name: "Heroku", description: "Managed platform-as-a-service.", logo: si("heroku"), categorySlug: "hosting" },
  { slug: "vercel", name: "Vercel", description: "Frontend cloud and deployment platform.", logo: si("vercel"), categorySlug: "hosting" },
  { slug: "netlify", name: "Netlify", description: "Web hosting and serverless platform.", logo: si("netlify"), categorySlug: "hosting" },

  // CMS & commerce
  { slug: "contentful", name: "Contentful", description: "Headless content management platform.", logo: si("contentful"), categorySlug: "cms-ecommerce" },
  { slug: "sanity", name: "Sanity", description: "Structured content platform with live editing.", logo: si("sanity"), categorySlug: "cms-ecommerce" },
  { slug: "medium", name: "Medium", description: "Hosted publishing and blogging platform.", logo: si("medium"), categorySlug: "cms-ecommerce" },
  { slug: "shopify", name: "Shopify", description: "Hosted e-commerce store platform.", logo: si("shopify"), categorySlug: "cms-ecommerce" },

  // Backend
  { slug: "firebase", name: "Firebase", description: "Google's backend-as-a-service suite.", logo: si("firebase"), categorySlug: "backend" },
  { slug: "auth0", name: "Auth0", description: "Hosted authentication and identity.", logo: si("auth0"), categorySlug: "backend" },
  { slug: "clerk", name: "Clerk", description: "Hosted authentication and complete user management with drop-in UI.", logo: si("clerk"), categorySlug: "backend" },
];

export const proprietaryBySlug = new Map(
  proprietaryTools.map((p) => [p.slug, p]),
);

export function getProprietary(slug: string): ProprietaryTool | undefined {
  return proprietaryBySlug.get(slug);
}
