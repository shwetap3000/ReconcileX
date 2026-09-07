import { useState } from "react";
import {
  CheckCircle2,
  Play,
  Send,
  AlertTriangle,
  RotateCcw,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  reconcileBatch,
  submitBatch,
  resubmitBatch,
  getReconciliationResults,
} from "../../api/batchApi";

function ReconciliationSummaryCard({ batch, summary = {}, onRefresh }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  if (!batch) return null;

  const {
    totalLedgerTransactions = 0,
    totalBankTransactions = 0,
    matchedTransactions = 0,
    amountMismatchCount = 0,
    dateMismatchCount = 0,
    missingInBankCount = 0,
    missingInLedgerCount = 0,
    totalExceptions = 0,
    matchPercentage = 0,
  } = summary;

  // ==========================================
  // START RECONCILIATION
  // ==========================================

  const handleReconcile = async () => {
    try {
      setError("");
      setLoading("reconcile");

      await reconcileBatch(batch._id);

      await onRefresh?.();
    } catch (err) {
      console.error("Reconciliation failed:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to reconcile batch.",
      );
    } finally {
      setLoading("");
    }
  };

  // ==========================================
  // SUBMIT FOR CHECKER REVIEW
  // ==========================================

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading("submit");

      await submitBatch(batch._id);

      await onRefresh?.();
    } catch (err) {
      console.error("Batch submission failed:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit batch for review.",
      );
    } finally {
      setLoading("");
    }
  };

  // ==========================================
  // RESUBMIT REJECTED BATCH
  // ==========================================

  const handleResubmit = async () => {
    try {
      setError("");
      setLoading("resubmit");

      await resubmitBatch(batch._id);

      await onRefresh?.();
    } catch (err) {
      console.error("Batch resubmission failed:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to resubmit batch.",
      );
    } finally {
      setLoading("");
    }
  };

  // ==========================================
  // VIEW RECONCILIATION RESULTS
  // ==========================================

  const handleViewResults = async () => {
    try {
      setError("");
      setLoading("results");

      await getReconciliationResults(batch._id);

      navigate(`/batch/${batch._id}/reconciliation-results`);
    } catch (err) {
      console.error("Failed to load reconciliation results:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load reconciliation results.",
      );
    } finally {
      setLoading("");
    }
  };

  // ==========================================
  // STATUS HELPERS
  // ==========================================

  const isUploading =
    batch.status === "DRAFT" || batch.status === "PARTIAL_UPLOAD";

  const isUploaded = batch.status === "UPLOADED";

  const isReconciled = batch.status === "RECONCILED";

  const isSubmitted =
    batch.status === "SUBMITTED" || batch.status === "UNDER_REVIEW";

  const isRejected = batch.status === "REJECTED";

  const isApproved = batch.status === "APPROVED";

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-xl p-4">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">
          3. Reconciliation Summary
        </h2>

        {isRejected && (
          <div className="flex items-center gap-1.5 text-red-400 text-sm font-medium">
            <AlertTriangle size={16} />
            Rejected
          </div>
        )}

        {isSubmitted && (
          <div className="flex items-center gap-1.5 text-blue-400 text-sm font-medium">
            <Send size={16} />
            Submitted for Review
          </div>
        )}

        {isApproved && (
          <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
            <CheckCircle2 size={16} />
            Approved
          </div>
        )}

        {isReconciled && (
          <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
            <CheckCircle2 size={16} />
            Completed
          </div>
        )}
      </div>

      {/* ==========================================
          ERROR
      ========================================== */}

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* ==========================================
          SUMMARY TABLE
      ========================================== */}

      <div className="border border-[#243041] rounded-lg overflow-hidden">
        <SummaryRow
          label="Ledger Transactions"
          value={totalLedgerTransactions}
        />

        <SummaryRow label="Bank Transactions" value={totalBankTransactions} />

        <SummaryRow
          label="Matched"
          value={matchedTransactions}
          valueClass="text-green-400"
        />

        <SummaryRow label="Amount Mismatch" value={amountMismatchCount} />

        <SummaryRow label="Date Mismatch" value={dateMismatchCount} />

        <SummaryRow label="Missing in Bank" value={missingInBankCount} />

        <SummaryRow label="Missing in Ledger" value={missingInLedgerCount} />

        <SummaryRow
          label="Total Exceptions"
          value={totalExceptions}
          valueClass={totalExceptions > 0 ? "text-green-400" : "text-gray-300"}
        />

        <SummaryRow
          label="Match Rate"
          value={`${Number(matchPercentage).toFixed(2)}%`}
          valueClass="text-yellow-400"
          last
        />
      </div>

      {/* ==========================================
          DRAFT / PARTIAL UPLOAD
      ========================================== */}

      {isUploading && (
        <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-blue-400">
          Upload both ledger and bank files to continue reconciliation.
        </div>
      )}

      {/* ==========================================
          UPLOADED
      ========================================== */}

      {isUploaded && (
        <button
          type="button"
          onClick={handleReconcile}
          disabled={loading !== ""}
          className="mt-4 w-full h-10 rounded-lg bg-[#506CF5] hover:bg-[#405BE0] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={16} />

          {loading === "reconcile" ? "Reconciling..." : "Start Reconciliation"}
        </button>
      )}

      {/* ==========================================
          RECONCILED
      ========================================== */}

      {isReconciled && (
        <div className="mt-4 space-y-2">
          {/* View Results */}

          <button
            type="button"
            onClick={handleViewResults}
            disabled={loading !== ""}
            className="w-full h-10 rounded-lg bg-[#506CF5] hover:bg-[#405BE0] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye size={16} />

            {loading === "results"
              ? "Loading Results..."
              : "View Reconciliation Results"}
          </button>

          {/* Submit */}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading !== ""}
            className="w-full h-10 rounded-lg border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />

            {loading === "submit"
              ? "Submitting..."
              : "Submit for Checker Review"}
          </button>
        </div>
      )}

      {/* ==========================================
          SUBMITTED / UNDER REVIEW
      ========================================== */}

      {isSubmitted && (
        <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-center text-sm text-blue-400">
          This batch has been submitted and is waiting for Checker review.
        </div>
      )}

      {/* ==========================================
          REJECTED
      ========================================== */}

      {isRejected && (
        <div className="mt-4 space-y-3">
          {/* Rejection Message */}

          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
            <div className="flex items-start gap-2">
              <AlertTriangle
                size={17}
                className="text-red-400 mt-0.5 shrink-0"
              />

              <div>
                <p className="text-sm font-medium text-red-300">
                  This batch was rejected by the Checker.
                </p>

                <p className="text-xs text-red-400/80 mt-1">
                  Review the rejection remarks above before resubmitting.
                </p>
              </div>
            </div>
          </div>

          {/* Rejected Batch Actions */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* View Results */}

            <button
              type="button"
              onClick={handleViewResults}
              disabled={loading !== ""}
              className="h-10 rounded-lg bg-[#506CF5] hover:bg-[#405BE0] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye size={16} />

              {loading === "results" ? "Loading..." : "View Results"}
            </button>

            {/* Resubmit */}

            <button
              type="button"
              onClick={handleResubmit}
              disabled={loading !== ""}
              className="h-10 rounded-lg border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw size={16} />

              {loading === "resubmit"
                ? "Resubmitting..."
                : "Resubmit for Review"}
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          APPROVED
      ========================================== */}

      {isApproved && (
        <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-sm text-green-400">
          This batch has been approved by the Checker.
        </div>
      )}
    </div>
  );
}

/* ==========================================
   SUMMARY ROW
========================================== */

function SummaryRow({
  label,
  value,
  valueClass = "text-gray-300",
  last = false,
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        !last ? "border-b border-[#243041]" : ""
      }`}
    >
      <span className="text-sm text-gray-400">{label}</span>

      <span className={`text-sm font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

export default ReconciliationSummaryCard;
