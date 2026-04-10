export interface PlatformStatus {
  name: string;
  connected: boolean;
  followers: number;
  lastSync: string;
  handle: string;
}

export interface SocialPost {
  id: number;
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  content: string;
  date: string;
  status: "scheduled" | "posted";
  likes: number;
  shares: number;
  comments: number;
  imageColor: string;
}

export const PLATFORMS: PlatformStatus[] = [
  {
    name: "Instagram",
    connected: true,
    followers: 48200,
    lastSync: "2 minutes ago",
    handle: "@flybiz.official",
  },
  {
    name: "Facebook",
    connected: true,
    followers: 32100,
    lastSync: "5 minutes ago",
    handle: "FlyBiz Inc",
  },
  {
    name: "Twitter",
    connected: true,
    followers: 19800,
    lastSync: "1 minute ago",
    handle: "@flybiz_io",
  },
  {
    name: "LinkedIn",
    connected: false,
    followers: 0,
    lastSync: "Not connected",
    handle: "—",
  },
];

export const SCHEDULED_POSTS: SocialPost[] = [
  {
    id: 1,
    platform: "instagram",
    content:
      "🚀 Exciting news! Our new AI video generation feature drops tomorrow. Create stunning product videos in seconds. Stay tuned! #AIContent #FlyBiz",
    date: "Jul 11, 2025 09:00 AM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    platform: "facebook",
    content:
      "We're revolutionizing how businesses create content. With FlyBiz AI, generate a week's worth of social media posts in minutes. Try it free today!",
    date: "Jul 11, 2025 11:00 AM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-indigo-500 to-blue-600",
  },
  {
    id: 3,
    platform: "twitter",
    content:
      "The future of content creation is here 🤖✨ FlyBiz just hit 50,000 AI-generated posts milestone! Thank you to our amazing community. #AIContent",
    date: "Jul 12, 2025 02:00 PM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-sky-500 to-cyan-600",
  },
  {
    id: 4,
    platform: "instagram",
    content:
      "Behind the scenes: how our team is building the next generation of AI content tools. Swipe to see the process! 🎨🔬",
    date: "Jul 13, 2025 06:00 PM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    platform: "linkedin",
    content:
      "Announcing our Series A funding round! We're thrilled to announce $12M raised to accelerate AI content innovation for enterprises worldwide.",
    date: "Jul 14, 2025 09:00 AM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-blue-600 to-indigo-700",
  },
  {
    id: 6,
    platform: "facebook",
    content:
      "🎉 Customer spotlight: How TechBrand increased their social engagement by 340% using FlyBiz AI content generator. Read the full case study!",
    date: "Jul 15, 2025 10:00 AM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-green-500 to-teal-600",
  },
  {
    id: 7,
    platform: "instagram",
    content:
      "New template drop! 50 premium poster templates now available for your summer campaigns. All AI-powered, all stunning. 🌞",
    date: "Jul 16, 2025 12:00 PM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-yellow-400 to-orange-500",
  },
  {
    id: 8,
    platform: "twitter",
    content:
      "Pro tip: Schedule your entire week of social content in under 10 minutes with FlyBiz. Our users save an average of 8 hours per week. 🕐",
    date: "Jul 17, 2025 03:00 PM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-slate-500 to-gray-600",
  },
  {
    id: 9,
    platform: "instagram",
    content:
      "Meet the AI that understands your brand voice. FlyBiz learns from your top-performing content to generate on-brand posts automatically. 🎯",
    date: "Jul 18, 2025 05:00 PM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-rose-500 to-pink-600",
  },
  {
    id: 10,
    platform: "facebook",
    content:
      "Webinar alert! Join us live on Jul 20 to see how FlyBiz AI creates a full month of content in real-time. Register link in bio!",
    date: "Jul 19, 2025 11:00 AM",
    status: "scheduled",
    likes: 0,
    shares: 0,
    comments: 0,
    imageColor: "from-violet-500 to-purple-600",
  },
];

export const POSTED_CONTENT: SocialPost[] = [
  {
    id: 11,
    platform: "instagram",
    content:
      "Level up your brand game! 🚀 FlyBiz AI just released 30 new industry-specific templates. Fashion, tech, food — we've got you covered. #BrandContent",
    date: "Jul 5, 2025",
    status: "posted",
    likes: 1842,
    shares: 234,
    comments: 89,
    imageColor: "from-purple-500 to-pink-600",
  },
  {
    id: 12,
    platform: "facebook",
    content:
      "We're incredibly proud to share that FlyBiz was named one of the 'Top 10 AI Tools for Marketers 2025' by TechReview. Thank you for your support!",
    date: "Jul 4, 2025",
    status: "posted",
    likes: 2341,
    shares: 567,
    comments: 143,
    imageColor: "from-blue-500 to-indigo-600",
  },
  {
    id: 13,
    platform: "twitter",
    content:
      "Hot take: Brands that use AI content tools grow 3x faster than those that don't. The data doesn't lie 📊 Full report in the comments!",
    date: "Jul 3, 2025",
    status: "posted",
    likes: 892,
    shares: 412,
    comments: 67,
    imageColor: "from-sky-400 to-blue-600",
  },
  {
    id: 14,
    platform: "instagram",
    content:
      "Your audience is waiting. Stop agonizing over captions and let AI do the heavy lifting while you focus on what matters most — growing your business 💡",
    date: "Jul 2, 2025",
    status: "posted",
    likes: 3210,
    shares: 891,
    comments: 204,
    imageColor: "from-amber-400 to-orange-500",
  },
  {
    id: 15,
    platform: "linkedin",
    content:
      "Sharing key findings from our latest research: AI-generated content now drives 28% higher engagement compared to manually crafted posts when optimized correctly.",
    date: "Jul 1, 2025",
    status: "posted",
    likes: 1456,
    shares: 312,
    comments: 98,
    imageColor: "from-blue-600 to-blue-800",
  },
  {
    id: 16,
    platform: "facebook",
    content:
      "June was our best month yet! Over 2 million AI-generated posts created by our community. 🎉 Here's to even bigger milestones ahead!",
    date: "Jun 30, 2025",
    status: "posted",
    likes: 4123,
    shares: 1234,
    comments: 387,
    imageColor: "from-green-500 to-emerald-600",
  },
  {
    id: 17,
    platform: "instagram",
    content:
      "Introducing FlyBiz Stories — AI-powered Instagram Story sequences that tell your brand's story automatically. Now in beta!",
    date: "Jun 28, 2025",
    status: "posted",
    likes: 2789,
    shares: 678,
    comments: 156,
    imageColor: "from-fuchsia-500 to-purple-600",
  },
  {
    id: 18,
    platform: "twitter",
    content:
      "We just crossed 10,000 active users! 🎊 To celebrate, we're giving everyone 50 bonus AI generation credits. Check your dashboard!",
    date: "Jun 25, 2025",
    status: "posted",
    likes: 1567,
    shares: 892,
    comments: 234,
    imageColor: "from-cyan-500 to-teal-600",
  },
  {
    id: 19,
    platform: "instagram",
    content:
      "Behind every great brand is a consistent visual story. FlyBiz AI helps you maintain brand consistency across every platform, every post, every day. 🎨",
    date: "Jun 22, 2025",
    status: "posted",
    likes: 2134,
    shares: 445,
    comments: 112,
    imageColor: "from-rose-400 to-red-500",
  },
  {
    id: 20,
    platform: "linkedin",
    content:
      "Excited to announce our new enterprise plan! Custom AI model training, dedicated support, and unlimited generations — built for teams that create at scale.",
    date: "Jun 20, 2025",
    status: "posted",
    likes: 987,
    shares: 234,
    comments: 67,
    imageColor: "from-indigo-600 to-violet-700",
  },
];
