import { useState } from "react";
import { CheckCircle2, Play, Send, ArrowRight, Loader2 } from "lucide-react";
import { reconcileBatch, submitBatch } from "../../api/batchApi";
import { useNavigate } from "react-router-dom";

function ReconciliationSummaryCard({ batch, summary = {}, onRefresh }) {
  const navigate = useNavigate();

  const [reconciling, setReconciling] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const status = batch?.status;

  const totalLedger = Number(summary.totalLedgerTransactions ?? 0);
  const totalBank = Number(summary.totalBankTransactions ?? 0);
  const matched = Number(summary.matchedTransactions ?? 0);
  const amountMismatch = Number(summary.amountMismatchCount ?? 0);
  const dateMismatch = Number(summary.dateMismatchCount ?? 0);
  const missingInBank = Number(summary.missingInBankCount ?? 0);
  const missingInLedger = Number(summary.missingInLedgerCount ?? 0);

  const totalExceptions =
    amountMismatch + dateMismatch + missingInBank + missingInLedger;

  const matchPercentage =
    totalLedger > 0 ? ((matched / totalLedger) * 100).toFixed(2) : "0.00";

  const handleReconcile = async () => {
    if (!batch?._id) return;

    try {
      setError("");
      setReconciling(true);

      const response = await reconcileBatch(batch._id);

      if (!response?.success) {
        throw new Error(response?.message || "Reconciliation failed.");
      }

      await onRefresh?.();
    } catch (error) {
      console.error("Reconciliation failed:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to reconcile batch.",
      );
    } finally {
      setReconciling(false);
    }
  };

  const handleSubmit = async () => {
    if (!batch?._id) return;

    try {
      setError("");
      setSubmitting(true);

      const response = await submitBatch(batch._id);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to submit batch.");
      }

      await onRefresh?.();
    } catch (error) {
      console.error("Submit batch failed:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit batch for review.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewResults = () => {
    if (!batch?._id) return;

    navigate(`/batch/${batch._id}/reconciliation-results`);
  };

  const isComplete =
    status === "RECONCILED" ||
    status === "SUBMITTED" ||
    status === "UNDER_REVIEW" ||
    status === "APPROVED" ||
    status === "REJECTED";

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">
          3. Reconciliation Summary
        </h2>

        {status === "RECONCILED" && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-400">
            <CheckCircle2 size={16} />
            Completed
          </span>
        )}

        {status === "SUBMITTED" && (
          <span className="text-sm font-medium text-blue-400">
            Submitted for Review
          </span>
        )}

        {status === "UNDER_REVIEW" && (
          <span className="text-sm font-medium text-yellow-400">
            Under Review
          </span>
        )}

        {!isComplete &&
          status !== "RECONCILED" &&
          status !== "SUBMITTED" &&
          status !== "UNDER_REVIEW" && (
            <span className="text-sm text-gray-500">Not Started</span>
          )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="border border-[#243041] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#243041]">
          <span className="text-sm text-gray-400">Ledger Transactions</span>
          <span className="text-sm font-semibold text-white">
            {totalLedger}
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[#243041]">
          <span className="text-sm text-gray-400">Bank Transactions</span>
          <span className="text-sm font-semibold text-white">{totalBank}</span>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[#243041]">
          <span className="text-sm text-gray-400">Matched</span>
          <span className="text-sm font-semibold text-green-400">
            {matched}
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[#243041]">
          <span className="text-sm text-gray-400">Amount Mismatch</span>
          <span className="text-sm font-semibold text-gray-400">
            {amountMismatch}
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[#243041]">
          <span className="text-sm text-gray-400">Date Mismatch</span>
          <span className="text-sm font-semibold text-gray-400">
            {dateMismatch}
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[#243041]">
          <span className="text-sm text-gray-400">Missing in Bank</span>
          <span className="text-sm font-semibold text-gray-400">
            {missingInBank}
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[#243041]">
          <span className="text-sm text-gray-400">Missing in Ledger</span>
          <span className="text-sm font-semibold text-gray-400">
            {missingInLedger}
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[#243041]">
          <span className="text-sm text-gray-400">Total Exceptions</span>
          <span className="text-sm font-semibold text-green-400">
            {totalExceptions}
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-gray-400">Match Rate</span>
          <span className="text-sm font-semibold text-yellow-400">
            {matchPercentage}%
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {status === "UPLOADED" && (
          <button
            type="button"
            onClick={handleReconcile}
            disabled={reconciling}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#536DFE] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4358e8] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {reconciling ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Reconciling...
              </>
            ) : (
              <>
                <Play size={17} />
                Start Reconciliation
              </>
            )}
          </button>
        )}

        {/* View Results - available after reconciliation */}
        {[
          "RECONCILED",
          "SUBMITTED",
          "UNDER_REVIEW",
          "APPROVED",
          "REJECTED",
        ].includes(status) && (
          <button
            type="button"
            onClick={handleViewResults}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#536DFE] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4358e8]"
          >
            View Results
            <ArrowRight size={17} />
          </button>
        )}

        {/* Submit only when reconciliation is completed */}
        {status === "RECONCILED" && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#2d4058] bg-[#111925] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#182231] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={17} />
                Submit for Review
              </>
            )}
          </button>
        )}

        {/* Submitted state */}
        {status === "SUBMITTED" && (
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-center text-sm text-blue-400">
            This batch has been submitted and is waiting for Checker review.
          </div>
        )}

        {/* Under review state */}

        {status === "UNDER_REVIEW" && (
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-center text-sm text-yellow-400">
            This batch is currently under review.
          </div>
        )}
      </div>
    </div>
  );
}

export default ReconciliationSummaryCard;
