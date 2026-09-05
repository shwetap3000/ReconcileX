import api from "./axios";

export const getBatchStats = async () => {
  const response = await api.get("/batches/batch-stats");
  return response.data;
};

export const getBatches = async (
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

export const getReconciliationResults = async (id) => {
  const { data } = await api.get(`/batches/${id}/reconciliation-results`);
  return data;
};

export const uploadLedgerFile = async (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post(`/batches/${id}/upload-ledger`, formData);

  return data;
};

export const uploadBankFile = async (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post(`/batches/${id}/upload-bank`, formData);

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

export const approveBatch = async (id) => {
  const { data } = await api.patch(`/batches/${id}/approve`);
  return data;
};

export const rejectBatch = async (id, remarks) => {
  const { data } = await api.patch(`/batches/${id}/reject`, {
    remarks,
  });

  return data;
};

export const resubmitBatch = async (id) => {
  const { data } = await api.patch(`/batches/${id}/resubmit`);
  return data;
};
