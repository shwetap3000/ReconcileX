import Batch from "../models/Batch.js";
import AuditLog from "../models/AuditLog.js";
import {
  getAdminStats,
  getCheckerStats,
  getMakerStats,
} from "../services/dashboardService.js";

export const getDashboardStats = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let stats;

    switch (role) {
      case "ADMIN":
        stats = await getAdminStats();
        break;

      case "MAKER":
        stats = await getMakerStats(_id);
        break;

      case "CHECKER":
        stats = await getCheckerStats();
        break;

      default:
        return res.status(403).json({
          success: false,
          message: "Unauthorized role",
        });
    }

    return res.status(200).json({
      success: true,
      role,
      stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentBatches = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let query = {};

    switch (role) {
      case "ADMIN":
        // Admin can see all batches
        query = {};
        break;

      case "MAKER":
        // Maker sees only batches created by them
        query = {
          createdBy: _id,
        };
        break;

      case "CHECKER":
        // Checker sees batches pending/recently reviewed
        query = {
          status: {
            $in: ["SUBMITTED", "APPROVED", "REJECTED"],
          },
        };
        break;

      default:
        return res.status(403).json({
          success: false,
          message: "Unauthorized role",
        });
    }

    const recentBatches = await Batch.find(query)
      .select("batchId batchName status createdByName createdAt updatedAt")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      total: recentBatches.length,
      recentBatches,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let query = {};

    switch (role) {
      case "ADMIN":
        // Admin sees all activities
        query = {};
        break;

      case "MAKER":
        // Maker sees only their own activities
        query = {
          performedBy: _id,
        };
        break;

      case "CHECKER":
        // Checker sees only review-related activities
        query = {
          action: {
            $in: [
              "BATCH_SUBMITTED",
              "BATCH_APPROVED",
              "BATCH_REJECTED",
              "BATCH_RESUBMITTED",
            ],
          },
        };
        break;

      default:
        return res.status(403).json({
          success: false,
          message: "Unauthorized role",
        });
    }

    const activities = await AuditLog.find(query)
      .populate("performedBy", "name email")
      .populate("batchId", "batchId batchName")
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      total: activities.length,
      activities,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStatusDistribution = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let matchStage = {};

    switch (role) {
      case "ADMIN":
        matchStage = {};
        break;

      case "MAKER":
        matchStage = {
          createdBy: _id,
        };
        break;

      case "CHECKER":
        matchStage = {
          status: {
            $in: ["SUBMITTED", "APPROVED", "REJECTED"],
          },
        };
        break;

      default:
        return res.status(403).json({
          success: false,
          message: "Unauthorized role",
        });
    }

    const distribution = await Batch.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      distribution,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMonthlyTrend = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let matchStage = {};

    switch (role) {
      case "ADMIN":
        matchStage = {};
        break;

      case "MAKER":
        matchStage = {
          createdBy: _id,
        };
        break;

      case "CHECKER":
        matchStage = {
          status: {
            $in: ["SUBMITTED", "APPROVED", "REJECTED"],
          },
        };
        break;

      default:
        return res.status(403).json({
          success: false,
          message: "Unauthorized role",
        });
    }

    const trend = await Batch.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          totalBatches: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      trend,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
