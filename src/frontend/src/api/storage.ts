export const AUTH_STORAGE_KEY = "flybiz_auth";

export interface StoredAuth {
  token: string;
  email: string;
  role: string;
  name: string;
  adminId?: string;
}

function isStoredAuth(value: unknown): value is StoredAuth {
  if (!value || typeof value !== "object") {
    return false;
  }

  const auth = value as Partial<StoredAuth>;
  return (
    typeof auth.token === "string" &&
    auth.token.length > 0 &&
    typeof auth.email === "string" &&
    auth.email.length > 0 &&
    typeof auth.role === "string" &&
    auth.role.length > 0 &&
    typeof auth.name === "string" &&
    auth.name.length > 0
  );
}

export function getStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as unknown;
    return isStoredAuth(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setStoredAuth(auth: StoredAuth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payload = ""] = token.split(".");
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function getDisplayNameFromEmail(email: string) {
  const [localPart = "Admin"] = email.split("@");

  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
