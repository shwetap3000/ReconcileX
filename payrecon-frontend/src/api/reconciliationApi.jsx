import api from "./axios";

export const getReconciliationStats = async () => {
  const { data } = await api.get("/batches/reconciliation-stats");
  return data;
};
