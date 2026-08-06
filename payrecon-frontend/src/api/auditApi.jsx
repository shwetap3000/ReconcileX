import api from "./axios";

export const getAuditLogs = (params) => api.get("/audit", { params });

export const getAuditStats = () => api.get("/audit/stats");

export const getAuditLogById = (id) => api.get(`/audit/${id}`);
