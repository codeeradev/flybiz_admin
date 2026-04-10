import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ApiError } from "../api/client";
import ChartCard from "../components/ChartCard";
import { ChartSkeleton, StatCardSkeleton } from "../components/SkeletonLoader";
import { useAuth } from "../hooks/useAuth";
import { getAnalytics } from "../services/analyticsService";
import { formatNumber } from "../utils/helpers";

const TIME_OPTIONS = ["7d", "30d", "90d", "1y"] as const;
const SUMMARY_SKELETON_KEYS = ["s1", "s2", "s3", "s4"];
type RangeOption = (typeof TIME_OPTIONS)[number];

const MONTH_RANGE_POINTS: Record<RangeOption, number> = {
  "7d": 1,
  "30d": 1,
  "90d": 3,
  "1y": 12,
};

const DAY_RANGE_POINTS: Record<RangeOption, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  "1y": 365,
};

function takeLastPoints<T>(items: T[], count: number) {
  return count >= items.length ? items : items.slice(-count);
}

function TimeSelector({
  active,
  onChange,
  ocid,
}: { active: RangeOption; onChange: (v: RangeOption) => void; ocid: string }) {
  return (
    <div className="flex bg-muted rounded-lg p-0.5 gap-0.5">
      {TIME_OPTIONS.map((o) => (
        <button
          type="button"
          key={o}
          onClick={() => onChange(o)}
          data-ocid={`${ocid}.${o}`}
          className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
            active === o
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

const tooltipStyle = {
  contentStyle: {
    background: "oklch(var(--popover))",
    border: "1px solid oklch(var(--border))",
    borderRadius: 8,
    color: "oklch(var(--foreground))",
    fontSize: 12,
  },
};

function EmptyChartState({ message }: { message: string }) {
  return (
    <div className="h-[300px] flex items-center justify-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}

export default function Analytics() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [range1, setRange1] = useState<RangeOption>("1y");
  const [range2, setRange2] = useState<RangeOption>("7d");
  const [range3, setRange3] = useState<RangeOption>("1y");

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getAnalytics,
  });

  useEffect(() => {
    if (error instanceof ApiError && [401, 403].includes(error.status)) {
      logout();
      navigate({ to: "/login" });
    }
  }, [error, logout, navigate]);

  const summary = data?.summary ?? [];
  const aiGenerationTrend = data?.aiGenerationTrend ?? [];
  const socialEngagement = data?.socialEngagement ?? [];
  const userGrowth = data?.userGrowth ?? [];
  const filteredAIGenerationTrend = useMemo(
    () => takeLastPoints(aiGenerationTrend, MONTH_RANGE_POINTS[range1]),
    [aiGenerationTrend, range1],
  );
  const filteredSocialEngagement = useMemo(
    () => takeLastPoints(socialEngagement, DAY_RANGE_POINTS[range2]),
    [socialEngagement, range2],
  );
  const filteredUserGrowth = useMemo(
    () => takeLastPoints(userGrowth, MONTH_RANGE_POINTS[range3]),
    [userGrowth, range3],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SUMMARY_SKELETON_KEYS.map((key) => (
              <StatCardSkeleton key={key} />
            ))}
          </div>
          <ChartSkeleton />
          <ChartSkeleton />
          <ChartSkeleton />
        </>
      ) : error ? (
        <div className="px-4 py-12 flex flex-col items-center justify-center text-center bg-card rounded-xl border border-border shadow-card">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
            <AlertCircle className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-foreground">
            Unable to load analytics
          </p>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading analytics."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {summary.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="bg-card rounded-xl border border-border p-4 shadow-card"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-2xl font-bold font-display text-foreground">
                  {item.value}
                </p>
                <p
                  className={`text-xs font-medium mt-1 ${
                    item.trend === "down" ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {item.change} vs prev period
                </p>
              </motion.div>
            ))}
          </div>

          <ChartCard
            title="AI Generation Trends"
            description="Monthly images and videos generated across the platform"
            actions={
              <TimeSelector
                active={range1}
                onChange={setRange1}
                ocid="analytics.chart1.button"
              />
            }
          >
            {filteredAIGenerationTrend.length === 0 ? (
              <EmptyChartState message="No AI generation analytics available yet." />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredAIGenerationTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    interval="preserveStartEnd"
                    minTickGap={24}
                    tick={{
                      fontSize: 11,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                  />
                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    tickFormatter={formatNumber}
                  />
                  <Tooltip
                    {...tooltipStyle}
                    formatter={(v: number) => [formatNumber(v), ""]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="images"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={false}
                    name="Images"
                  />
                  <Line
                    type="monotone"
                    dataKey="videos"
                    stroke="#9333EA"
                    strokeWidth={2.5}
                    dot={false}
                    name="Videos"
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#EC4899"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="4 4"
                    name="Total"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard
            title="Social Media Engagement"
            description="Daily engagement across connected platforms"
            actions={
              <TimeSelector
                active={range2}
                onChange={setRange2}
                ocid="analytics.chart2.button"
              />
            }
          >
            {filteredSocialEngagement.length === 0 ? (
              <EmptyChartState message="No social engagement data available yet." />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredSocialEngagement}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis
                    dataKey="day"
                    interval="preserveStartEnd"
                    minTickGap={20}
                    tick={{
                      fontSize: 11,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                  />
                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    tickFormatter={formatNumber}
                  />
                  <Tooltip
                    {...tooltipStyle}
                    formatter={(v: number) => [formatNumber(v), ""]}
                  />
                  <Legend />
                  <Bar
                    dataKey="instagram"
                    fill="#E1306C"
                    radius={[4, 4, 0, 0]}
                    name="Instagram"
                  />
                  <Bar
                    dataKey="facebook"
                    fill="#1877F2"
                    radius={[4, 4, 0, 0]}
                    name="Facebook"
                  />
                  <Bar
                    dataKey="twitter"
                    fill="#1DA1F2"
                    radius={[4, 4, 0, 0]}
                    name="Twitter"
                  />
                  <Bar
                    dataKey="linkedin"
                    fill="#0077B5"
                    radius={[4, 4, 0, 0]}
                    name="LinkedIn"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard
            title="User Growth"
            description="Cumulative user acquisition over time"
            actions={
              <TimeSelector
                active={range3}
                onChange={setRange3}
                ocid="analytics.chart3.button"
              />
            }
          >
            {filteredUserGrowth.length === 0 ? (
              <EmptyChartState message="No user growth data available yet." />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={filteredUserGrowth}>
                  <defs>
                    <linearGradient
                      id="userGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="newUserGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    interval="preserveStartEnd"
                    minTickGap={24}
                    tick={{
                      fontSize: 11,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                  />
                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    tickFormatter={formatNumber}
                  />
                  <Tooltip
                    {...tooltipStyle}
                    formatter={(v: number) => [formatNumber(v), ""]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fill="url(#userGradient)"
                    name="Total Users"
                  />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    stroke="#9333EA"
                    strokeWidth={2}
                    fill="url(#newUserGradient)"
                    name="New Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </>
      )}
    </motion.div>
  );
}
