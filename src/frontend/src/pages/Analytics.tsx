import { motion } from "motion/react";
import { useState } from "react";
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
import ChartCard from "../components/ChartCard";
import {
  AI_GENERATION_TREND,
  SOCIAL_ENGAGEMENT,
  USER_GROWTH,
} from "../mockData/analytics";
import { formatNumber } from "../utils/helpers";

const TIME_OPTIONS = ["7d", "30d", "90d", "1y"];

function TimeSelector({
  active,
  onChange,
  ocid,
}: { active: string; onChange: (v: string) => void; ocid: string }) {
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

export default function Analytics() {
  const [range1, setRange1] = useState("1y");
  const [range2, setRange2] = useState("7d");
  const [range3, setRange3] = useState("1y");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Generations",
            value: "326.4K",
            change: "+24.8%",
            color: "text-emerald-400",
          },
          {
            label: "Total Engagement",
            value: "2.1M",
            change: "+18.2%",
            color: "text-emerald-400",
          },
          {
            label: "User Growth Rate",
            value: "48.3%",
            change: "+12.1%",
            color: "text-emerald-400",
          },
          {
            label: "Avg. Posts/User",
            value: "7.2",
            change: "-2.4%",
            color: "text-red-400",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card rounded-xl border border-border p-4 shadow-card"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {s.label}
            </p>
            <p className="text-2xl font-bold font-display text-foreground">
              {s.value}
            </p>
            <p className={`text-xs font-medium mt-1 ${s.color}`}>
              {s.change} vs prev period
            </p>
          </motion.div>
        ))}
      </div>

      {/* AI Generation Trends */}
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
        <ResponsiveContainer width="100%" height={300}>
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
      </ChartCard>

      {/* Social Engagement */}
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SOCIAL_ENGAGEMENT}>
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
      </ChartCard>

      {/* User Growth */}
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
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={USER_GROWTH}>
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="newUserGradient" x1="0" y1="0" x2="0" y2="1">
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
              tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
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
      </ChartCard>
    </motion.div>
  );
}
