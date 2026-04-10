import { Heart, MessageCircle, Share2, Wifi, WifiOff } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import {
  PLATFORMS,
  POSTED_CONTENT,
  SCHEDULED_POSTS,
} from "../mockData/socialMedia";
import { formatNumber } from "../utils/helpers";

const PlatformIcon = ({
  platform,
  size = 16,
}: { platform: string; size?: number }) => {
  const props = { size, className: "flex-shrink-0" };
  switch (platform) {
    case "instagram":
      return <SiInstagram {...props} style={{ color: "#E1306C" }} />;
    case "facebook":
      return <SiFacebook {...props} style={{ color: "#1877F2" }} />;
    case "twitter":
      return <SiX {...props} style={{ color: "#1DA1F2" }} />;
    case "linkedin":
      return <FaLinkedinIn {...props} style={{ color: "#0077B5" }} />;
    default:
      return null;
  }
};

export default function SocialMedia() {
  const [tab, setTab] = useState<"scheduled" | "posted">("scheduled");
  const posts = tab === "scheduled" ? SCHEDULED_POSTS : POSTED_CONTENT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Platform Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORMS.map((p, idx) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="bg-card rounded-xl border border-border p-4 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <PlatformIcon platform={p.name.toLowerCase()} size={20} />
              <span
                className={`flex items-center gap-1 text-xs font-medium ${p.connected ? "text-emerald-400" : "text-muted-foreground"}`}
              >
                {p.connected ? (
                  <Wifi className="h-3 w-3" />
                ) : (
                  <WifiOff className="h-3 w-3" />
                )}
                {p.connected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <p className="font-display font-semibold text-foreground">
              {p.name}
            </p>
            {p.connected ? (
              <>
                <p className="text-xl font-bold text-foreground mt-1">
                  {formatNumber(p.followers)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  followers · {p.lastSync}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {p.handle}
                </p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Not connected
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-muted rounded-xl p-1 gap-1 w-fit">
        <button
          type="button"
          onClick={() => setTab("scheduled")}
          data-ocid="social.scheduled.tab"
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            tab === "scheduled"
              ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Scheduled Posts ({SCHEDULED_POSTS.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("posted")}
          data-ocid="social.posted.tab"
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            tab === "posted"
              ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Posted Content ({POSTED_CONTENT.length})
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="bg-card rounded-xl border border-border p-4 shadow-card hover:border-border/80 transition-all"
            data-ocid={`social.item.${idx + 1}`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${post.imageColor} flex-shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <PlatformIcon platform={post.platform} size={14} />
                  <span className="text-xs text-muted-foreground capitalize">
                    {post.platform}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {post.date}
                  </span>
                </div>
                <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                  {post.content}
                </p>
                {tab === "posted" && (
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="h-3 w-3 text-red-400" />
                      {formatNumber(post.likes)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Share2 className="h-3 w-3 text-blue-400" />
                      {formatNumber(post.shares)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageCircle className="h-3 w-3 text-purple-400" />
                      {formatNumber(post.comments)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
