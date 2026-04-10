export interface Template {
  id: number;
  name: string;
  category: string;
  type: "poster" | "video";
  previewColor: string;
  downloads: number;
  isPremium: boolean;
}

export const POSTER_TEMPLATES: Template[] = [
  {
    id: 1,
    name: "Neon City Launch",
    category: "Product Launch",
    type: "poster",
    previewColor: "from-blue-600 via-purple-700 to-pink-600",
    downloads: 1240,
    isPremium: true,
  },
  {
    id: 2,
    name: "Summer Sale Burst",
    category: "Promotional",
    type: "poster",
    previewColor: "from-orange-400 via-rose-500 to-pink-600",
    downloads: 892,
    isPremium: false,
  },
  {
    id: 3,
    name: "Minimal Brand Story",
    category: "Branding",
    type: "poster",
    previewColor: "from-gray-800 via-gray-700 to-gray-600",
    downloads: 2341,
    isPremium: true,
  },
  {
    id: 4,
    name: "Tech Innovation Banner",
    category: "Technology",
    type: "poster",
    previewColor: "from-cyan-500 via-blue-600 to-indigo-700",
    downloads: 678,
    isPremium: false,
  },
  {
    id: 5,
    name: "Organic Wellness Grid",
    category: "Health & Wellness",
    type: "poster",
    previewColor: "from-green-500 via-teal-500 to-emerald-600",
    downloads: 1567,
    isPremium: false,
  },
  {
    id: 6,
    name: "Luxury Fashion Edit",
    category: "Fashion",
    type: "poster",
    previewColor: "from-slate-700 via-gray-800 to-zinc-900",
    downloads: 3421,
    isPremium: true,
  },
  {
    id: 7,
    name: "Bold Food Showcase",
    category: "Food & Beverage",
    type: "poster",
    previewColor: "from-yellow-400 via-orange-500 to-red-500",
    downloads: 989,
    isPremium: false,
  },
  {
    id: 8,
    name: "Event Countdown Hype",
    category: "Events",
    type: "poster",
    previewColor: "from-violet-600 via-purple-600 to-fuchsia-600",
    downloads: 445,
    isPremium: true,
  },
];

export const VIDEO_TEMPLATES: Template[] = [
  {
    id: 101,
    name: "Dynamic Logo Reveal",
    category: "Branding",
    type: "video",
    previewColor: "from-blue-700 via-indigo-700 to-purple-700",
    downloads: 2890,
    isPremium: true,
  },
  {
    id: 102,
    name: "Story Swipe Sequence",
    category: "Social Stories",
    type: "video",
    previewColor: "from-pink-500 via-rose-500 to-red-500",
    downloads: 1234,
    isPremium: false,
  },
  {
    id: 103,
    name: "Product 360 Showcase",
    category: "E-commerce",
    type: "video",
    previewColor: "from-slate-600 via-gray-700 to-slate-800",
    downloads: 987,
    isPremium: true,
  },
  {
    id: 104,
    name: "Energetic Reel Cut",
    category: "Entertainment",
    type: "video",
    previewColor: "from-yellow-500 via-orange-500 to-red-600",
    downloads: 3120,
    isPremium: false,
  },
  {
    id: 105,
    name: "Corporate Explainer",
    category: "Business",
    type: "video",
    previewColor: "from-blue-600 via-sky-600 to-cyan-600",
    downloads: 756,
    isPremium: true,
  },
  {
    id: 106,
    name: "Nature Transition Pack",
    category: "Lifestyle",
    type: "video",
    previewColor: "from-green-600 via-teal-600 to-cyan-600",
    downloads: 567,
    isPremium: false,
  },
];
