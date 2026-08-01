import Batch from "../models/Batch.js";

export const getAdminStats = async () => {
  const batches = await Batch.find().lean();

  let totalTransactions = 0;
  let reconciled = 0;
  let exceptions = 0;
  let pending = 0;

  for (const batch of batches) {
    const batchExceptions =
      (batch.amountMismatchCount || 0) +
      (batch.dateMismatchCount || 0) +
      (batch.missingInBankCount || 0) +
      (batch.missingInLedgerCount || 0);

    const batchTransactions =
      (batch.matchedTransactions || 0) + batchExceptions;

    totalTransactions += batchTransactions;

    reconciled += batch.matchedTransactions || 0;

    exceptions += batchExceptions;

    if (
      [
        "DRAFT",
        "PARTIAL_UPLOAD",
        "UPLOADED",
        "SUBMITTED",
        "UNDER_REVIEW",
      ].includes(batch.status)
    ) {
      pending += batchTransactions;
    }
  }

  return {
    totalTransactions,
    reconciled,
    pending,
    exceptions,
  };
};

export const getMakerStats = async (makerId) => {
  const batches = await Batch.find({
    createdBy: makerId,
  }).lean();

  let myTransactions = 0;
  let reconciled = 0;
  let pendingReview = 0;
  let exceptions = 0;

  for (const batch of batches) {
    const batchExceptions =
      (batch.amountMismatchCount || 0) +
      (batch.dateMismatchCount || 0) +
      (batch.missingInBankCount || 0) +
      (batch.missingInLedgerCount || 0);

    const batchTransactions =
      (batch.matchedTransactions || 0) + batchExceptions;

    myTransactions += batchTransactions;

    reconciled += batch.matchedTransactions || 0;

    exceptions += batchExceptions;

    if (["SUBMITTED", "UNDER_REVIEW"].includes(batch.status)) {
      pendingReview += batchTransactions;
    }
  }

  return {
    myTransactions,
    reconciled,
    pendingReview,
    exceptions,
  };
};

export const getCheckerStats = async () => {
  const batches = await Batch.find({
    status: {
      $in: ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"],
    },
  })
    .select("status")
    .lean();

  let batchesToReview = 0;
  let underReview = 0;
  let approved = 0;
  let rejected = 0;

  for (const batch of batches) {
    switch (batch.status) {
      case "SUBMITTED":
        batchesToReview++;
        break;

      case "UNDER_REVIEW":
        underReview++;
        break;

      case "APPROVED":
        approved++;
        break;

      case "REJECTED":
        rejected++;
        break;
    }
  }

  return {
    batchesToReview,
    underReview,
    approved,
    rejected,
  };
};
