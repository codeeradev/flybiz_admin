import { Calendar, Search, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CardGridSkeleton } from "../components/SkeletonLoader";
import { AI_IMAGES, AI_VIDEOS } from "../mockData/aiContent";

export default function AIContent() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"images" | "videos">("images");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const items = tab === "images" ? AI_IMAGES : AI_VIDEOS;
  const filtered = items.filter(
    (i) =>
      !search ||
      i.prompt.toLowerCase().includes(search.toLowerCase()) ||
      i.userName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex bg-muted rounded-xl p-1 gap-1">
          <button
            type="button"
            onClick={() => setTab("images")}
            data-ocid="aicontent.images.tab"
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              tab === "images"
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Images ({AI_IMAGES.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("videos")}
            data-ocid="aicontent.videos.tab"
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              tab === "videos"
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Videos ({AI_VIDEOS.length})
          </button>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by prompt or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="aicontent.search.input"
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {loading ? (
        <CardGridSkeleton count={tab === "images" ? 12 : 8} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{
                y: -3,
                boxShadow: "0 12px 40px -8px rgba(0,0,0,0.3)",
              }}
              className="bg-card rounded-xl border border-border overflow-hidden shadow-card cursor-pointer"
              data-ocid={`aicontent.item.${idx + 1}`}
            >
              <div
                className={`aspect-video bg-gradient-to-br ${item.thumbnailColor} flex items-center justify-center relative`}
              >
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                {item.duration && (
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                    {item.duration}
                  </span>
                )}
                {item.resolution && (
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                    {item.resolution}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-foreground line-clamp-2 mb-2 leading-relaxed">
                  {item.prompt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {item.userName.split(" ")[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div
              className="col-span-full py-16 text-center text-muted-foreground"
              data-ocid="aicontent.empty_state"
            >
              No content found matching your search.
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
