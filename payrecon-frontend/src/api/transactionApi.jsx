import api from "./axios";

export const getTransactions = async () => {
  const { data } = await api.get("/transactions");
  return data;
};

export const getTransactionStats = async () => {
  const { data } = await api.get("/transactions/stats");
  return data;
};
