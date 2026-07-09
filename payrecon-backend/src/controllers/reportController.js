import Batch from "../models/Batch.js";

export const getReconciliationSummary = async (req, res) => {
  try {
    const summary = await Batch.aggregate([
      {
        $group: {
          _id: null,

          totalBatches: {
            $sum: 1,
          },

          totalLedgerTransactions: {
            $sum: "$totalLedgerTransactions",
          },

          totalBankTransactions: {
            $sum: "$totalBankTransactions",
          },

          matchedTransactions: {
            $sum: "$matchedTransactions",
          },

          amountMismatchCount: {
            $sum: "$amountMismatchCount",
          },

          dateMismatchCount: {
            $sum: "$dateMismatchCount",
          },

          missingInBankCount: {
            $sum: "$missingInBankCount",
          },

          missingInLedgerCount: {
            $sum: "$missingInLedgerCount",
          },
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(200).json({
        success: true,
        report: {
          totalBatches: 0,
          totalLedgerTransactions: 0,
          totalBankTransactions: 0,
          matchedTransactions: 0,
          amountMismatchCount: 0,
          dateMismatchCount: 0,
          missingInBankCount: 0,
          missingInLedgerCount: 0,
          overallMatchPercentage: 0,
        },
      });
    }

    const report = summary[0];

    const totalReconciled =
      report.matchedTransactions +
      report.amountMismatchCount +
      report.dateMismatchCount +
      report.missingInBankCount +
      report.missingInLedgerCount;

    const overallMatchPercentage =
      totalReconciled === 0
        ? 0
        : Number(
            ((report.matchedTransactions / totalReconciled) * 100).toFixed(2),
          );

    return res.status(200).json({
      success: true,

      report: {
        totalBatches: report.totalBatches,

        totalLedgerTransactions: report.totalLedgerTransactions,

        totalBankTransactions: report.totalBankTransactions,

        matchedTransactions: report.matchedTransactions,

        amountMismatchCount: report.amountMismatchCount,

        dateMismatchCount: report.dateMismatchCount,

        missingInBankCount: report.missingInBankCount,

        missingInLedgerCount: report.missingInLedgerCount,

        totalReconciled,

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

export const getBatchReport = async (req, res) => {
  try {
    const batches = await Batch.find()
      .select(
        "batchId batchName status createdByName totalLedgerTransactions totalBankTransactions matchedTransactions amountMismatchCount dateMismatchCount missingInBankCount missingInLedgerCount createdAt"
      )
      .sort({ createdAt: -1 });

    const report = batches.map((batch) => {
      const totalReconciled =
        batch.matchedTransactions +
        batch.amountMismatchCount +
        batch.dateMismatchCount +
        batch.missingInBankCount +
        batch.missingInLedgerCount;

      const matchPercentage =
        totalReconciled === 0
          ? 0
          : Number(
              (
                (batch.matchedTransactions / totalReconciled) *
                100
              ).toFixed(2)
            );

      return {
        batchId: batch.batchId,
        batchName: batch.batchName,
        status: batch.status,
        createdBy: batch.createdByName,

        totalLedgerTransactions: batch.totalLedgerTransactions,
        totalBankTransactions: batch.totalBankTransactions,

        matchedTransactions: batch.matchedTransactions,
        amountMismatchCount: batch.amountMismatchCount,
        dateMismatchCount: batch.dateMismatchCount,
        missingInBankCount: batch.missingInBankCount,
        missingInLedgerCount: batch.missingInLedgerCount,

        totalReconciled,
        matchPercentage,

        createdAt: batch.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      totalBatches: report.length,
      batches: report,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
