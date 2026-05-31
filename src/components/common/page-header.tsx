import { Breadcrumbs, type Crumb } from "@/components/common/breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
