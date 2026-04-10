export interface Campaign {
  id: number;
  name: string;
  platforms: Array<"instagram" | "facebook" | "twitter" | "linkedin">;
  status: "active" | "paused" | "completed";
  scheduledDate: string;
  reach: number;
  clicks: number;
  conversions: number;
  budget: number;
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: "Summer Product Launch 2025",
    platforms: ["instagram", "facebook", "twitter"],
    status: "active",
    scheduledDate: "Jul 15, 2025",
    reach: 128400,
    clicks: 8920,
    conversions: 1240,
    budget: 5000,
  },
  {
    id: 2,
    name: "Brand Awareness Q3",
    platforms: ["linkedin", "facebook"],
    status: "active",
    scheduledDate: "Jul 20, 2025",
    reach: 84200,
    clicks: 5640,
    conversions: 890,
    budget: 3500,
  },
  {
    id: 3,
    name: "Holiday Sale Preview",
    platforms: ["instagram", "facebook", "twitter", "linkedin"],
    status: "paused",
    scheduledDate: "Aug 5, 2025",
    reach: 0,
    clicks: 0,
    conversions: 0,
    budget: 8000,
  },
  {
    id: 4,
    name: "Influencer Collab Series",
    platforms: ["instagram", "twitter"],
    status: "active",
    scheduledDate: "Jul 12, 2025",
    reach: 245000,
    clicks: 18400,
    conversions: 3120,
    budget: 12000,
  },
  {
    id: 5,
    name: "B2B Lead Generation",
    platforms: ["linkedin"],
    status: "completed",
    scheduledDate: "Jun 30, 2025",
    reach: 42800,
    clicks: 3890,
    conversions: 567,
    budget: 2500,
  },
  {
    id: 6,
    name: "Video Content Blitz",
    platforms: ["instagram", "facebook", "twitter"],
    status: "completed",
    scheduledDate: "Jun 15, 2025",
    reach: 189600,
    clicks: 14200,
    conversions: 2890,
    budget: 7500,
  },
  {
    id: 7,
    name: "User Testimonials Drive",
    platforms: ["facebook", "instagram"],
    status: "paused",
    scheduledDate: "Aug 12, 2025",
    reach: 0,
    clicks: 0,
    conversions: 0,
    budget: 4000,
  },
  {
    id: 8,
    name: "Platform Relaunch Teaser",
    platforms: ["twitter", "instagram", "linkedin"],
    status: "active",
    scheduledDate: "Jul 25, 2025",
    reach: 56200,
    clicks: 4120,
    conversions: 720,
    budget: 3000,
  },
];
