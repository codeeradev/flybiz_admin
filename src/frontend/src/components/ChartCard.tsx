import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export default function ChartCard({
  title,
  description,
  children,
  actions,
  className = "",
}: ChartCardProps) {
  return (
    <div
      className={`bg-card rounded-xl border border-border shadow-card ${className}`}
    >
      <div className="flex items-start justify-between p-5 pb-2">
        <div>
          <h3 className="font-display font-semibold text-foreground">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="p-5 pt-2">{children}</div>
    </div>
  );
}
