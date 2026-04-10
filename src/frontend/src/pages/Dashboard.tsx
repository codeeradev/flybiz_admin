import {
  Activity,
  ImageIcon,
  Megaphone,
  Share2,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
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
import ChartCard from "../components/ChartCard";
import { ChartSkeleton, StatCardSkeleton } from "../components/SkeletonLoader";
import StatCard from "../components/StatCard";
import { AI_GENERATION_TREND, SOCIAL_ENGAGEMENT } from "../mockData/analytics";
import { formatNumber } from "../utils/helpers";

const RECENT_ACTIVITY = [
  {
    id: 1,
    user: "Sophia Bennett",
    action: "Generated 12 AI images for Summer campaign",
    time: "2 min ago",
    color: "bg-blue-500",
  },
  {
    id: 2,
    user: "Marcus Chen",
    action: "Published social media post to Instagram",
    time: "8 min ago",
    color: "bg-purple-500",
  },
  {
    id: 3,
    user: "Elena Vasquez",
    action: "Created new campaign: Holiday Sale Preview",
    time: "15 min ago",
    color: "bg-pink-500",
  },
  {
    id: 4,
    user: "Noah Williams",
    action: "Uploaded 3 poster templates to library",
    time: "32 min ago",
    color: "bg-green-500",
  },
  {
    id: 5,
    user: "James Rivera",
    action: "Scheduled 5 posts across 3 platforms",
    time: "45 min ago",
    color: "bg-yellow-500",
  },
  {
    id: 6,
    user: "Isabella Moore",
    action: "Generated product showcase video reel",
    time: "1 hr ago",
    color: "bg-rose-500",
  },
  {
    id: 7,
    user: "Ethan Wilson",
    action: "Updated branding settings and logo",
    time: "2 hr ago",
    color: "bg-indigo-500",
  },
  {
    id: 8,
    user: "Mia Davis",
    action: "Exported analytics report for Q2 2025",
    time: "3 hr ago",
    color: "bg-teal-500",
  },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: "17,824",
      icon: <Users className="h-5 w-5 text-white" />,
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-700",
      trend: 12.4,
      delay: 0,
    },
    {
      title: "AI Images Generated",
      value: "284.1K",
      icon: <ImageIcon className="h-5 w-5 text-white" />,
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-700",
      trend: 24.8,
      delay: 0.05,
    },
    {
      title: "AI Videos Generated",
      value: "42.3K",
      icon: <Video className="h-5 w-5 text-white" />,
      iconBg: "bg-gradient-to-br from-pink-500 to-pink-700",
      trend: 18.2,
      delay: 0.1,
    },
    {
      title: "Social Posts",
      value: "128.5K",
      icon: <Share2 className="h-5 w-5 text-white" />,
      iconBg: "bg-gradient-to-br from-green-500 to-green-700",
      trend: 9.7,
      delay: 0.15,
    },
    {
      title: "Active Campaigns",
      value: "4",
      icon: <Megaphone className="h-5 w-5 text-white" />,
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-700",
      trend: -1,
      delay: 0.2,
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6" data-ocid="dashboard.loading_state">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {["sk1", "sk2", "sk3", "sk4", "sk5"].map((id) => (
            <StatCardSkeleton key={id} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <ChartSkeleton />
          </div>
          <div className="lg:col-span-2">
            <ChartSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            icon={s.icon}
            iconBg={s.iconBg}
            trend={s.trend}
            delay={s.delay}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <ChartCard
          title="AI Generation Trends"
          description="Monthly images & videos generated"
          className="lg:col-span-3"
        >
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={AI_GENERATION_TREND}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
                tickFormatter={(v) => formatNumber(v)}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(var(--popover))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: 8,
                  color: "oklch(var(--foreground))",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="images"
                stroke="#2563EB"
                strokeWidth={2}
                dot={false}
                name="Images"
              />
              <Line
                type="monotone"
                dataKey="videos"
                stroke="#9333EA"
                strokeWidth={2}
                dot={false}
                name="Videos"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Social Posts"
          description="Posts by platform today"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={SOCIAL_ENGAGEMENT.slice(0, 4)}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(var(--border))"
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(var(--popover))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: 8,
                  color: "oklch(var(--foreground))",
                }}
              />
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
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-display font-semibold text-foreground">
              Recent Activity
            </h3>
          </div>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.id * 0.05 }}
                className="flex items-start gap-3"
                data-ocid={`dashboard.activity.item.${item.id}`}
              >
                <div
                  className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}
                >
                  {item.user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{item.user}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <h3 className="font-display font-semibold text-foreground mb-4">
            Plan Distribution
          </h3>
          <div className="space-y-3">
            {[
              {
                plan: "Enterprise",
                count: 4820,
                pct: 27,
                color: "bg-gradient-to-r from-blue-500 to-purple-600",
              },
              {
                plan: "Pro",
                count: 8940,
                pct: 50,
                color: "bg-gradient-to-r from-purple-500 to-pink-500",
              },
              { plan: "Free", count: 4064, pct: 23, color: "bg-muted" },
            ].map((item) => (
              <div key={item.plan}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">
                    {item.plan}
                  </span>
                  <span className="text-muted-foreground">
                    {formatNumber(item.count)} ({item.pct}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">
              Top AI Users
            </p>
            {[
              "Marcus Chen — 2,105 gen.",
              "William Taylor — 1,876 gen.",
              "Sophia Bennett — 1,240 gen.",
            ].map((u, i) => (
              <div
                key={u}
                className="flex items-center gap-2 text-sm text-foreground py-1.5"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                  {i + 1}
                </div>
                <span className="text-xs">{u}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
