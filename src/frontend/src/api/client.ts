import { getStoredAuth } from "./storage";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends Omit<RequestInit, "body" | "headers" | "method"> {
  auth?: boolean;
  body?: BodyInit | FormData | Record<string, unknown> | unknown[] | null;
  headers?: HeadersInit;
}

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

function isBodyInit(value: unknown): value is BodyInit {
  return (
    typeof value === "string" ||
    value instanceof Blob ||
    value instanceof URLSearchParams ||
    value instanceof ReadableStream ||
    value instanceof ArrayBuffer
  );
}

function extractErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message?: unknown }).message;
    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
  }

  if (typeof payload === "string" && payload.trim().length > 0) {
    return payload;
  }

  return fallback;
}

async function request<T>(
  method: string,
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { auth = false, body, headers: customHeaders, ...rest } = options;
  const headers = new Headers(customHeaders);

  if (auth) {
    const token = getStoredAuth()?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  let resolvedBody: BodyInit | null | undefined = body as BodyInit | null | undefined;

  if (body != null && !isFormData(body) && !isBodyInit(body)) {
    headers.set("Content-Type", "application/json");
    resolvedBody = JSON.stringify(body);
  }

  const response = await fetch(endpoint, {
    ...rest,
    method,
    headers,
    body: resolvedBody,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson
    ? await response.json().catch(() => null)
    : await response.text().catch(() => "");

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(payload, `Request failed with status ${response.status}`),
      response.status,
      payload,
    );
  }

  return payload as T;
}

export function get<T>(endpoint: string, options?: Omit<RequestOptions, "body">) {
  return request<T>("GET", endpoint, options);
}

export function post<T>(
  endpoint: string,
  body?: RequestOptions["body"],
  options?: Omit<RequestOptions, "body">,
) {
  return request<T>("POST", endpoint, { ...options, body });
}
