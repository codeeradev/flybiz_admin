import { Calendar, Eye, MousePointer, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import Badge from "../components/Badge";
import { CAMPAIGNS } from "../mockData/campaigns";
import { formatNumber } from "../utils/helpers";

const platformIcon = (p: string) => {
  switch (p) {
    case "instagram":
      return <SiInstagram size={12} style={{ color: "#E1306C" }} />;
    case "facebook":
      return <SiFacebook size={12} style={{ color: "#1877F2" }} />;
    case "twitter":
      return <SiX size={12} style={{ color: "#1DA1F2" }} />;
    case "linkedin":
      return <FaLinkedinIn size={12} style={{ color: "#0077B5" }} />;
    default:
      return null;
  }
};

const TABS = ["all", "active", "paused", "completed"] as const;

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("all");

  const filtered = CAMPAIGNS.filter(
    (c) => activeTab === "all" || c.status === activeTab,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => setActiveTab(t)}
            data-ocid={`campaigns.${t}.tab`}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === t
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}{" "}
            {t !== "all" &&
              `(${CAMPAIGNS.filter((c) => c.status === t).length})`}
          </button>
        ))}
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((campaign, idx) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{
              y: -3,
              boxShadow: "0 12px 40px -8px rgba(0,0,0,0.25)",
            }}
            className="bg-card rounded-xl border border-border p-5 shadow-card cursor-pointer transition-all"
            data-ocid={`campaigns.item.${idx + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-display font-semibold text-foreground text-sm leading-snug flex-1 pr-2">
                {campaign.name}
              </h3>
              <Badge value={campaign.status} variant="campaign" />
            </div>

            <div className="flex items-center gap-1.5 mb-3">
              {campaign.platforms.map((p) => (
                <span
                  key={p}
                  className="w-5 h-5 rounded-full bg-muted flex items-center justify-center"
                >
                  {platformIcon(p)}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
              <Calendar className="h-3 w-3" />
              <span>{campaign.scheduledDate}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400 mb-0.5">
                  <Eye className="h-3 w-3" />
                  <span className="text-xs font-semibold">
                    {formatNumber(campaign.reach)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">Reach</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-purple-400 mb-0.5">
                  <MousePointer className="h-3 w-3" />
                  <span className="text-xs font-semibold">
                    {formatNumber(campaign.clicks)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">Clicks</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-pink-400 mb-0.5">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-semibold">
                    {formatNumber(campaign.conversions)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">Conv.</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
