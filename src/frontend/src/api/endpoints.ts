const API_BASE_URL = "http://localhost:9000/admin";

function joinEndpoint(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ENDPOINT = {
  LOGIN: joinEndpoint("/login"),
  GET_USERS: joinEndpoint("/users"),
} as const;
