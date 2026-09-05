import api from "./axios";

export const getReconciliationStats = async () => {
  const { data } = await api.get("/batches/reconciliation-stats");
  return data;
};

export const getReconciliationBatches = async (
  page = 1,
  limit = 10,
  status = "ALL",
  search = "",
) => {
  const { data } = await api.get("/batches", {
    params: {
      page,
      limit,
      status,
      search,
    },
  });

  return data;
};
