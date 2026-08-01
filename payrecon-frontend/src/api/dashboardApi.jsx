import api from "./axios";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const getMonthlyTrend = async () => {
  const response = await api.get("/dashboard/monthly-trend");
  return response.data;
};

export const getStatusDistribution = async () => {
  const response = await api.get("/dashboard/status-distribution");
  return response.data;
};

export const getRecentBatches = async () => {
  const response = await api.get("/dashboard/recent-batches");
  return response.data;
};

export const getRecentActivities = async () => {
  const response = await api.get("/dashboard/recent-activities");
  return response.data;
};
