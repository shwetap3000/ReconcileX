import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBatchDetails, getReconciliationSummary } from "../api/batchApi";

import BatchDetailHeader from "../components/batchDetail/BatchDetailHeader";
import BatchInfoCard from "../components/batchDetail/BatchInfoCard";
import UploadedFilesCard from "../components/batchDetail/UploadedFilesCard";
import ReconciliationSummaryCard from "../components/batchDetail/ReconciliationSummaryCard";

function BatchDetail() {
  const { id } = useParams();

  const [batchDetails, setBatchDetails] = useState(null);
  const [reconciliationSummary, setReconciliationSummary] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBatchDetails = useCallback(async () => {
    if (!id) {
      setError("Invalid batch ID.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      /*
       * 1. Get batch + files.
       */
      const batchResponse = await getBatchDetails(id);

      if (!batchResponse?.success) {
        throw new Error(
          batchResponse?.message || "Failed to load batch details.",
        );
      }

      setBatchDetails(batchResponse);

      /*
       * 2. Get the dedicated reconciliation summary.
       *
       * IMPORTANT:
       * Do NOT use batchResponse.summary here.
       *
       * The dedicated endpoint returns:
       * matchedTransactions
       * amountMismatchCount
       * dateMismatchCount
       * missingInBankCount
       * missingInLedgerCount
       * totalExceptions
       * matchPercentage
       */
      const summaryResponse = await getReconciliationSummary(id);

      if (summaryResponse?.success) {
        setReconciliationSummary(summaryResponse.summary || {});
      } else {
        setReconciliationSummary({});
      }
    } catch (error) {
      console.error("Failed to load batch details:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load batch details.",
      );

      setBatchDetails(null);
      setReconciliationSummary(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBatchDetails();
  }, [fetchBatchDetails]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-sm text-gray-400">Loading batch details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
        {error}
      </div>
    );
  }

  if (!batchDetails?.batch) {
    return (
      <div className="rounded-xl border border-[#243041] bg-[#141C28] p-4 text-sm text-gray-400">
        Batch not found.
      </div>
    );
  }

  const { batch, files = [] } = batchDetails;

  return (
    <div className="space-y-4">
      {/* Batch Header */}
      <div className="mt-3">
        <BatchDetailHeader batch={batch} onRefresh={fetchBatchDetails} />
      </div>

      {/* Batch Information */}
      <BatchInfoCard batch={batch} />

      {/* Uploaded Files + Reconciliation Summary */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <UploadedFilesCard
          batch={batch}
          files={files}
          onRefresh={fetchBatchDetails}
        />

        <ReconciliationSummaryCard
          batch={batch}
          summary={reconciliationSummary || {}}
          onRefresh={fetchBatchDetails}
        />
      </div>
    </div>
  );
}

export default BatchDetail;
