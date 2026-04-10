// Authentication service — replace with real API calls when backend is ready

export const loginUser = async (_email: string, _password: string) => {
  // TODO: Replace with real API call
  // const res = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // });
  // return res.json();
};

export const logoutUser = async () => {
  // TODO: Replace with real API call
  // await fetch('/api/auth/logout', { method: 'POST' });
};

export const refreshToken = async () => {
  // TODO: Implement token refresh
  // const res = await fetch('/api/auth/refresh', { method: 'POST' });
  // return res.json();
};
