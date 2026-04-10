type BadgeVariant = "role" | "status" | "plan" | "platform" | "campaign";

interface BadgeProps {
  value: string;
  variant?: BadgeVariant;
}

const roleBadge: Record<string, string> = {
  admin: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  manager: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  moderator: "bg-pink-500/15 text-pink-400 border border-pink-500/30",
  user: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
};

const statusBadge: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  inactive: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
  suspended: "bg-red-500/15 text-red-400 border border-red-500/30",
  pending: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  blocked: "bg-red-500/15 text-red-400 border border-red-500/30",
  banned: "bg-red-500/15 text-red-400 border border-red-500/30",
  connected: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  disconnected: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
};

const planBadge: Record<string, string> = {
  free: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
  pro: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  enterprise:
    "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-purple-400 border border-purple-500/30",
};

const campaignBadge: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  paused: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  completed: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
};

export default function Badge({ value, variant = "status" }: BadgeProps) {
  const fallbackBadge =
    "bg-slate-500/15 text-slate-300 border border-slate-500/30";

  const getBadgeClass = () => {
    switch (variant) {
      case "role":
        return roleBadge[value] ?? fallbackBadge;
      case "status":
        return statusBadge[value] ?? fallbackBadge;
      case "plan":
        return planBadge[value] ?? fallbackBadge;
      case "campaign":
        return campaignBadge[value] ?? fallbackBadge;
      default:
        return statusBadge[value] ?? fallbackBadge;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getBadgeClass()}`}
    >
      {value}
    </span>
  );
}
