import { get } from "../api/client";
import { ENDPOINT } from "../api/endpoints";

export interface AnalyticsSummaryCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface AIGenerationTrendPoint {
  month: string;
  images: number;
  videos: number;
  total: number;
}

export interface SocialEngagementPoint {
  day: string;
  instagram: number;
  facebook: number;
  twitter: number;
  linkedin: number;
}

export interface UserGrowthPoint {
  month: string;
  users: number;
  newUsers: number;
}

export interface AnalyticsResponse {
  message?: string;
  summary: AnalyticsSummaryCard[];
  aiGenerationTrend: AIGenerationTrendPoint[];
  socialEngagement: SocialEngagementPoint[];
  userGrowth: UserGrowthPoint[];
}

interface RawAnalyticsSummaryCard {
  label?: unknown;
  value?: unknown;
  change?: unknown;
  trend?: unknown;
}

interface RawAIGenerationTrendPoint {
  month?: unknown;
  images?: unknown;
  videos?: unknown;
  total?: unknown;
}

interface RawSocialEngagementPoint {
  day?: unknown;
  instagram?: unknown;
  facebook?: unknown;
  twitter?: unknown;
  linkedin?: unknown;
}

interface RawUserGrowthPoint {
  month?: unknown;
  users?: unknown;
  newUsers?: unknown;
}

interface RawAnalyticsResponse {
  message?: string;
  summary?: unknown[];
  aiGenerationTrend?: unknown[];
  socialEngagement?: unknown[];
  userGrowth?: unknown[];
}

function normalizeText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : fallback;
}

function normalizeNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeSummaryCard(
  item: RawAnalyticsSummaryCard,
  index: number,
): AnalyticsSummaryCard {
  return {
    label: normalizeText(item.label, `Summary ${index + 1}`),
    value: normalizeText(item.value, "0"),
    change: normalizeText(item.change, "0%"),
    trend: item.trend === "down" ? "down" : "up",
  };
}

function normalizeSummary(items: unknown[] | undefined) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) =>
    normalizeSummaryCard((item ?? {}) as RawAnalyticsSummaryCard, index),
  );
}

function normalizeAIGenerationTrend(items: unknown[] | undefined) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) => {
    const point = (item ?? {}) as RawAIGenerationTrendPoint;

    return {
      month: normalizeText(point.month, `Item ${index + 1}`),
      images: normalizeNumber(point.images),
      videos: normalizeNumber(point.videos),
      total: normalizeNumber(point.total),
    };
  });
}

function normalizeSocialEngagement(items: unknown[] | undefined) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) => {
    const point = (item ?? {}) as RawSocialEngagementPoint;

    return {
      day: normalizeText(point.day, `Day ${index + 1}`),
      instagram: normalizeNumber(point.instagram),
      facebook: normalizeNumber(point.facebook),
      twitter: normalizeNumber(point.twitter),
      linkedin: normalizeNumber(point.linkedin),
    };
  });
}

function normalizeUserGrowth(items: unknown[] | undefined) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) => {
    const point = (item ?? {}) as RawUserGrowthPoint;

    return {
      month: normalizeText(point.month, `Item ${index + 1}`),
      users: normalizeNumber(point.users),
      newUsers: normalizeNumber(point.newUsers),
    };
  });
}

function normalizeAnalyticsResponse(
  payload: RawAnalyticsResponse,
): AnalyticsResponse {
  return {
    message: payload.message,
    summary: normalizeSummary(payload.summary),
    aiGenerationTrend: normalizeAIGenerationTrend(payload.aiGenerationTrend),
    socialEngagement: normalizeSocialEngagement(payload.socialEngagement),
    userGrowth: normalizeUserGrowth(payload.userGrowth),
  };
}

export async function getAnalytics() {
  const response = await get<RawAnalyticsResponse>(ENDPOINT.GET_ANALYTICS, {
    auth: true,
  });

  return normalizeAnalyticsResponse(response);
}

export const getDashboardStats = async () => {
  // TODO: Replace with real API call
  // const res = await fetch('/api/analytics/dashboard');
  // return res.json();
};

export const exportReport = async (_type: string, _dateRange: string) => {
  // TODO: Replace with real API call
  // const res = await fetch(`/api/analytics/export?type=${type}&range=${dateRange}`);
  // return res.blob();
};
