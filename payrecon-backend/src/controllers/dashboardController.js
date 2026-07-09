import Batch from "../models/Batch.js";
import AuditLog from "../models/AuditLog.js";

export const getDashboardStats = async (req, res) => {
  try {
    const batches = await Batch.find();

    let draft = 0;
    let partialUpload = 0;
    let uploaded = 0;
    let submitted = 0;
    let approved = 0;
    let rejected = 0;

    let matchedTransactions = 0;
    let totalReconciled = 0;

    for (const batch of batches) {
      switch (batch.status) {
        case "DRAFT":
          draft++;
          break;

        case "PARTIAL_UPLOAD":
          partialUpload++;
          break;

        case "UPLOADED":
          uploaded++;
          break;

        case "SUBMITTED":
          submitted++;
          break;

        case "APPROVED":
          approved++;
          break;

        case "REJECTED":
          rejected++;
          break;
      }

      matchedTransactions += batch.matchedTransactions;

      totalReconciled +=
        batch.matchedTransactions +
        batch.amountMismatchCount +
        batch.dateMismatchCount +
        batch.missingInBankCount +
        batch.missingInLedgerCount;
    }

    const overallMatchPercentage =
      totalReconciled === 0
        ? 0
        : Number(((matchedTransactions / totalReconciled) * 100).toFixed(2));

    return res.status(200).json({
      success: true,
      stats: {
        totalBatches: batches.length,
        draft,
        partialUpload,
        uploaded,
        submitted,
        approved,
        rejected,
        overallMatchPercentage,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentBatches = async (req, res) => {
  try {
    const recentBatches = await Batch.find()
      .select("batchId batchName status createdByName createdAt")
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
    const activities = await AuditLog.find()
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
    const distribution = await Batch.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
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
    const trend = await Batch.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
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
