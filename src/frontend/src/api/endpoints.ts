const API_BASE_URL = "https://flybizapi.bizyrotech.com";
// const API_BASE_URL = "http://localhost:9000/admin";
// const API_BASE_URL = "http://localhost:9000";

function joinEndpoint(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ENDPOINT = {
  LOGIN: joinEndpoint("/admin/login"),
  GET_USERS: joinEndpoint("/admin/users"),
  GET_AI_CONTENT: joinEndpoint("/admin/ai-content"),
  GET_ANALYTICS: joinEndpoint("/admin/analytics"),

  GOOGLE_CONNECT: joinEndpoint("/google/connect"),
  GOOGLE_LOCATIONS: joinEndpoint("/google/locations"),
  GOOGLE_LOCATION: joinEndpoint("/google/location"),
} as const;
