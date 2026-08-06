// import AuditLog from "../models/AuditLog.js";

// const createAuditLog = async ({
//   action,
//   description,
//   user,
//   batchId = null,
//   req,
// }) => {
//   try {
//     await AuditLog.create({
//       action,
//       description,
//       performedBy: user._id,
//       role: user.role,
//       batchId,
//       ipAddress: req.ip,
//       userAgent: req.headers["user-agent"],
//     });
//   } catch (error) {
//     console.error("Audit Log Error:", error.message);
//   }
// };

// export default createAuditLog;
