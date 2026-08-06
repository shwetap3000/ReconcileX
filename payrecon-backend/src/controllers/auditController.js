import AuditLog from "../models/AuditLog.js";
import Batch from "../models/Batch.js";

// Get Audit Logs
export const getAuditLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      action,
      status,
      startDate,
      endDate,
      search,
    } = req.query;

    const query = {};

    // Role-based filtering
    if (req.user.role === "MAKER") {
      const batches = await Batch.find({
        createdBy: req.user._id,
      }).select("_id");

      query.$or = [
        { performedBy: req.user._id },
        { batchId: { $in: batches.map((b) => b._id) } },
      ];
    }

    if (req.user.role === "CHECKER") {
      const batches = await Batch.find({
        reviewedBy: req.user._id,
      }).select("_id");

      query.$or = [
        { performedBy: req.user._id },
        { batchId: { $in: batches.map((b) => b._id) } },
      ];
    }

    if (action) query.action = action;

    if (status) query.status = status;

    if (search) {
      query.description = {
        $regex: search,
        $options: "i",
      };
    }

    if (startDate || endDate) {
      query.createdAt = {};

      if (startDate) query.createdAt.$gte = new Date(startDate);

      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const total = await AuditLog.countDocuments(query);

    const logs = await AuditLog.find(query)
      .populate("performedBy", "name email role")
      .populate("batchId", "batchId batchName")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      logs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Audit Statistics
export const getAuditStats = async (req, res) => {
  try {
    const query = {};

    if (req.user.role === "MAKER") {
      const batches = await Batch.find({
        createdBy: req.user._id,
      }).select("_id");

      query.$or = [
        { performedBy: req.user._id },
        { batchId: { $in: batches.map((b) => b._id) } },
      ];
    }

    if (req.user.role === "CHECKER") {
      const batches = await Batch.find({
        reviewedBy: req.user._id,
      }).select("_id");

      query.$or = [
        { performedBy: req.user._id },
        { batchId: { $in: batches.map((b) => b._id) } },
      ];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [
      totalActivities,
      successfulActivities,
      failedActivities,
      todayActivities,
    ] = await Promise.all([
      AuditLog.countDocuments(query),

      AuditLog.countDocuments({
        ...query,
        status: "SUCCESS",
      }),

      AuditLog.countDocuments({
        ...query,
        status: "FAILED",
      }),

      AuditLog.countDocuments({
        ...query,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalActivities,
        successfulActivities,
        failedActivities,
        todayActivities,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Audit Log
export const getAuditLogById = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id)
      .populate("performedBy", "name email role")
      .populate("batchId", "batchId batchName");

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Audit log not found",
      });
    }

    return res.status(200).json({
      success: true,
      log,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
