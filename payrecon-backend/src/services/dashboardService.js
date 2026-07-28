import Batch from "../models/Batch.js";

export const getAdminStats = async () => {
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

  return {
    totalBatches: batches.length,
    draft,
    partialUpload,
    uploaded,
    submitted,
    approved,
    rejected,
    overallMatchPercentage:
      totalReconciled === 0
        ? 0
        : Number(((matchedTransactions / totalReconciled) * 100).toFixed(2)),
  };
};

export const getMakerStats = async (makerId) => {
  const batches = await Batch.find({
    createdBy: makerId,
  });

  let draft = 0;
  let awaitingReview = 0;
  let rejected = 0;

  for (const batch of batches) {
    switch (batch.status) {
      case "DRAFT":
        draft++;
        break;

      case "SUBMITTED":
      case "UNDER_REVIEW":
        awaitingReview++;
        break;

      case "REJECTED":
        rejected++;
        break;
    }
  }

  return {
    myBatches: batches.length,
    draft,
    awaitingReview,
    rejected,
  };
};

export const getCheckerStats = async () => {
  const batches = await Batch.find({
    status: {
      $in: ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"],
    },
  });

  let awaitingReview = 0;
  let approved = 0;
  let rejected = 0;
  let reviewedToday = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const batch of batches) {
    switch (batch.status) {
      case "SUBMITTED":
      case "UNDER_REVIEW":
        awaitingReview++;
        break;

      case "APPROVED":
        approved++;

        if (batch.updatedAt >= today) {
          reviewedToday++;
        }

        break;

      case "REJECTED":
        rejected++;

        if (batch.updatedAt >= today) {
          reviewedToday++;
        }

        break;
    }
  }

  return {
    awaitingReview,
    reviewedToday,
    approved,
    rejected,
  };
};
