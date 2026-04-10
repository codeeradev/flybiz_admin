import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBg: string;
  trend?: number;
  trendLabel?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  icon,
  iconBg,
  trend,
  trendLabel,
  delay = 0,
}: StatCardProps) {
  const trendPositive = (trend ?? 0) > 0;
  const trendNeutral = trend === 0 || trend === undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, boxShadow: "0 8px 32px -4px rgba(0,0,0,0.2)" }}
      className="bg-card rounded-xl border border-border p-5 shadow-card transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold font-display text-foreground mt-1">
            {value}
          </p>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 mt-2 text-xs font-medium ${
                trendNeutral
                  ? "text-muted-foreground"
                  : trendPositive
                    ? "text-emerald-500"
                    : "text-red-500"
              }`}
            >
              {trendNeutral ? (
                <Minus className="h-3 w-3" />
              ) : trendPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {trendPositive && "+"}
                {trend}% {trendLabel ?? "vs last month"}
              </span>
            </div>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
