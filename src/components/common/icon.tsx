import {
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  CalendarCheck,
  Database,
  FolderKanban,
  MessageCircle,
  MessagesSquare,
  NotebookPen,
  PenTool,
  Server,
  ShoppingBag,
  Terminal,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";
import { GithubIcon, LinkedinIcon, XIcon } from "./brand-icons";

/**
 * Explicit name → icon map (keeps the bundle lean vs importing the whole set).
 * Used to render icons referenced by string in data/constants.
 */
const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  MessagesSquare,
  Bot,
  BrainCircuit,
  PenTool,
  NotebookPen,
  CalendarCheck,
  FolderKanban,
  MessageCircle,
  Database,
  Workflow,
  BarChart3,
  Terminal,
  Server,
  ShoppingBag,
  Boxes,
  // social
  Github: GithubIcon,
  Twitter: XIcon,
  Linkedin: LinkedinIcon,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICONS[name] ?? Boxes;
  return <Cmp className={className} />;
}
