// Analytics service — replace with real API calls when backend is ready

export const getAnalytics = async (_dateRange?: string) => {
  // TODO: Replace with real API call
  // const res = await fetch(`/api/analytics?range=${dateRange ?? '30d'}`);
  // return res.json();
};

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
