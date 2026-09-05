import { ArrowRight, CheckCircle2, Clock3, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { reconcileBatch } from "../../api/batchApi";

function ReconciliationSummaryCard({ batch, summary = {}, onRefresh }) {
  const navigate = useNavigate();

  /*
   * The backend reconciliation-summary API returns:
   *
   * totalLedgerTransactions
   * totalBankTransactions
   * matchedTransactions
   * amountMismatchCount
   * dateMismatchCount
   * missingInBankCount
   * missingInLedgerCount
   * totalExceptions
   * matchPercentage
   */

  const ledgerCount = Number(summary.totalLedgerTransactions ?? 0);

  const bankCount = Number(summary.totalBankTransactions ?? 0);

  const matchedCount = Number(summary.matchedTransactions ?? 0);

  const amountMismatchCount = Number(summary.amountMismatchCount ?? 0);

  const dateMismatchCount = Number(summary.dateMismatchCount ?? 0);

  const missingInBankCount = Number(summary.missingInBankCount ?? 0);

  const missingInLedgerCount = Number(summary.missingInLedgerCount ?? 0);

  /*
   * Prefer the backend value.
   * If it isn't available, calculate it locally.
   */
  const totalExceptions =
    summary.totalExceptions !== undefined
      ? Number(summary.totalExceptions)
      : amountMismatchCount +
        dateMismatchCount +
        missingInBankCount +
        missingInLedgerCount;

  const matchPercentage =
    summary.matchPercentage !== undefined
      ? Number(summary.matchPercentage)
      : ledgerCount > 0
        ? Number(((matchedCount / ledgerCount) * 100).toFixed(2))
        : 0;

  const isReconciled = batch?.status === "RECONCILED";

  const canStartReconciliation =
    batch?.status === "UPLOADED" && ledgerCount > 0 && bankCount > 0;

  const handleReconcile = async () => {
    if (!batch?._id) return;

    try {
      await reconcileBatch(batch._id);
      await onRefresh?.();
    } catch (error) {
      console.error("Failed to reconcile batch:", error);

      window.alert(
        error.response?.data?.message || "Failed to start reconciliation.",
      );
    }
  };

  const handleViewResults = () => {
    if (!batch?._id) return;

    navigate(`/batches/${batch._id}/reconciliation-results`);
  };

  return (
    <div className="h-full rounded-xl border border-[#243041] bg-[#141C28] p-4">
      <h2 className="mb-4 text-lg font-semibold text-white">
        3. Reconciliation Summary
      </h2>

      <div className="overflow-hidden rounded-lg border border-[#243041]">
        {/* STATUS */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Status</span>

          {isReconciled ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-400">
              <CheckCircle2 size={16} />
              Completed
            </span>
          ) : canStartReconciliation ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-blue-400">
              <Clock3 size={16} />
              Ready
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
              <Clock3 size={16} />
              Not Started
            </span>
          )}
        </div>

        {/* LEDGER TRANSACTIONS */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Ledger Transactions</span>

          <span className="text-sm font-semibold text-white">
            {ledgerCount.toLocaleString()}
          </span>
        </div>

        {/* BANK TRANSACTIONS */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Bank Transactions</span>

          <span className="text-sm font-semibold text-white">
            {bankCount.toLocaleString()}
          </span>
        </div>

        {/* MATCHED */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Matched</span>

          <span className="text-sm font-semibold text-green-400">
            {matchedCount.toLocaleString()}
          </span>
        </div>

        {/* AMOUNT MISMATCH */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Amount Mismatch</span>

          <span
            className={`text-sm font-semibold ${
              amountMismatchCount > 0 ? "text-red-400" : "text-gray-500"
            }`}
          >
            {amountMismatchCount.toLocaleString()}
          </span>
        </div>

        {/* DATE MISMATCH */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Date Mismatch</span>

          <span
            className={`text-sm font-semibold ${
              dateMismatchCount > 0 ? "text-red-400" : "text-gray-500"
            }`}
          >
            {dateMismatchCount.toLocaleString()}
          </span>
        </div>

        {/* MISSING IN BANK */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Missing in Bank</span>

          <span
            className={`text-sm font-semibold ${
              missingInBankCount > 0 ? "text-red-400" : "text-gray-500"
            }`}
          >
            {missingInBankCount.toLocaleString()}
          </span>
        </div>

        {/* MISSING IN LEDGER */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Missing in Ledger</span>

          <span
            className={`text-sm font-semibold ${
              missingInLedgerCount > 0 ? "text-red-400" : "text-gray-500"
            }`}
          >
            {missingInLedgerCount.toLocaleString()}
          </span>
        </div>

        {/* TOTAL EXCEPTIONS */}
        <div className="flex items-center justify-between border-b border-[#243041] px-4 py-3">
          <span className="text-sm text-gray-400">Total Exceptions</span>

          <span
            className={`text-sm font-semibold ${
              totalExceptions > 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {totalExceptions.toLocaleString()}
          </span>
        </div>

        {/* MATCH RATE */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-gray-400">Match Rate</span>

          <span
            className={`text-sm font-semibold ${
              matchPercentage === 100
                ? "text-green-400"
                : matchPercentage > 0
                  ? "text-yellow-400"
                  : "text-gray-500"
            }`}
          >
            {matchPercentage.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* START RECONCILIATION */}
      {canStartReconciliation && (
        <button
          type="button"
          onClick={handleReconcile}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#4F6BFF] text-sm font-medium text-white transition hover:bg-[#3F5AF5]"
        >
          <Play size={16} />
          Start Reconciliation
        </button>
      )}

      {/* VIEW RESULTS */}
      {isReconciled && (
        <button
          type="button"
          onClick={handleViewResults}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#4F6BFF] text-sm font-medium text-white transition hover:bg-[#3F5AF5]"
        >
          View Results
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

export default ReconciliationSummaryCard;
