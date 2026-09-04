import api from "./axios";

export const getBatchStats = async () => {
  const response = await api.get("/batches/batch-stats");
  return response.data;
};

export const getBatches = async (page = 1, limit = 10, status = "ALL") => {
  const { data } = await api.get("/batches", {
    params: {
      page,
      limit,
      status,
    },
  });

  return data;
};

export const createBatch = async (payload) => {
  const { data } = await api.post("/batches", payload);
  return data;
};

export const getBatchDetails = async (id) => {
  const { data } = await api.get(`/batches/${id}/details`);
  return data;
};

export const getReconciliationSummary = async (id) => {
  const { data } = await api.get(`/batches/${id}/reconciliation-summary`);
  return data;
};

export const reconcileBatch = async (id) => {
  const { data } = await api.post(`/batches/${id}/reconcile`);
  return data;
};

export const submitBatch = async (id) => {
  const { data } = await api.patch(`/batches/${id}/submit`);
  return data;
};
