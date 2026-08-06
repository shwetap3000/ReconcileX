import AuditLog from "../models/AuditLog.js";

export const createAuditLog = async ({
  action,
  description,
  performedBy,
  role,
  batch = null,
  status = "SUCCESS",
  metadata = {},
  req,
}) => {
  try {
    await AuditLog.create({
      action,
      description,
      performedBy,
      role,
      batch,
      status,
      metadata,
      ipAddress:
        req.headers["x-forwarded-for"] ||
        req.socket?.remoteAddress ||
        req.ip ||
        "",
      userAgent: req.headers["user-agent"] || "",
    });
  } catch (error) {
    console.error("Audit Log Error:", error.message);
  }
};
