import { siteConfig } from "@/constants/site";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export const mainNav: NavItem[] = [
  { title: "Tools", href: "/tools", description: "Browse every open-source tool" },
  {
    title: "Alternatives",
    href: "/alternatives",
    description: "Find replacements for proprietary apps",
  },
  {
    title: "Categories",
    href: "/categories",
    description: "Explore tools by category",
  },
  { title: "Compare", href: "/compare", description: "Compare tools side by side" },
  { title: "Trending", href: "/trending", description: "What the community loves now" },
  { title: "Blog", href: "/blog", description: "Guides & migration playbooks" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Browse",
    items: [
      { title: "All Tools", href: "/tools" },
      { title: "Alternatives", href: "/alternatives" },
      { title: "Categories", href: "/categories" },
      { title: "Compare", href: "/compare" },
    ],
  },
  {
    title: "Discover",
    items: [
      { title: "Trending", href: "/trending" },
      { title: "New Tools", href: "/new" },
      { title: "Bookmarks", href: "/bookmarks" },
      { title: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
];

export const socialLinks = [
  { title: "GitHub", href: siteConfig.links.github, icon: "Github" },
  { title: "X / Twitter", href: siteConfig.links.twitter, icon: "Twitter" },
  { title: "LinkedIn", href: siteConfig.links.linkedin, icon: "Linkedin" },
];
