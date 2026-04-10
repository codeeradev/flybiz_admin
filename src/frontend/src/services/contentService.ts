import { get } from "../api/client";
import { ENDPOINT } from "../api/endpoints";

export type AIContentType = "image" | "video";

export interface AIContentItem {
  id: string;
  type: AIContentType;
  prompt: string;
  userName: string;
  date: string;
  thumbnailColor: string;
  resolution?: string;
  duration?: string;
}

export interface AIContentResponse {
  message?: string;
  images: AIContentItem[];
  videos: AIContentItem[];
  totals: {
    images: number;
    videos: number;
    all: number;
  };
}

interface RawAIContentItem {
  id?: string | number;
  type?: unknown;
  prompt?: unknown;
  userName?: unknown;
  date?: unknown;
  thumbnailColor?: unknown;
  resolution?: unknown;
  duration?: unknown;
}

interface RawAIContentResponse {
  message?: string;
  images?: unknown[];
  videos?: unknown[];
  totals?: {
    images?: unknown;
    videos?: unknown;
    all?: unknown;
  };
}

function isAIContentType(value: unknown): value is AIContentType {
  return value === "image" || value === "video";
}

function normalizeText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : fallback;
}

function normalizeCount(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeItem(
  item: RawAIContentItem,
  index: number,
  fallbackType: AIContentType,
): AIContentItem {
  const type = isAIContentType(item.type) ? item.type : fallbackType;

  return {
    id: String(item.id ?? `${type}-${index + 1}`),
    type,
    prompt: normalizeText(item.prompt, "Untitled prompt"),
    userName: normalizeText(item.userName, "Unknown User"),
    date: normalizeText(item.date, "—"),
    thumbnailColor: normalizeText(
      item.thumbnailColor,
      type === "video"
        ? "from-slate-600 to-slate-900"
        : "from-blue-500 to-purple-600",
    ),
    resolution:
      typeof item.resolution === "string" && item.resolution.trim().length > 0
        ? item.resolution
        : undefined,
    duration:
      typeof item.duration === "string" && item.duration.trim().length > 0
        ? item.duration
        : undefined,
  };
}

function normalizeItems(items: unknown[] | undefined, type: AIContentType) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) =>
    normalizeItem((item ?? {}) as RawAIContentItem, index, type),
  );
}

function normalizeResponse(payload: RawAIContentResponse): AIContentResponse {
  const images = normalizeItems(payload.images, "image");
  const videos = normalizeItems(payload.videos, "video");

  return {
    message: payload.message,
    images,
    videos,
    totals: {
      images: normalizeCount(payload.totals?.images, images.length),
      videos: normalizeCount(payload.totals?.videos, videos.length),
      all: normalizeCount(payload.totals?.all, images.length + videos.length),
    },
  };
}

export async function getAIContent() {
  const response = await get<RawAIContentResponse>(ENDPOINT.GET_AI_CONTENT, {
    auth: true,
  });

  return normalizeResponse(response);
}

export const deleteContent = async (_contentId: number) => {
  // TODO: Replace with real API call
  // await fetch(`/api/content/${contentId}`, { method: 'DELETE' });
};

export const moderateContent = async (
  _contentId: number,
  _action: "approve" | "reject",
) => {
  // TODO: Replace with real API call
  // const res = await fetch(`/api/content/${contentId}/moderate`, {
  //   method: 'POST',
  //   body: JSON.stringify({ action }),
  // });
  // return res.json();
};
