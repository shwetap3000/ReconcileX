import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Loader2,
} from "lucide-react";

import {
  getBatchDetails,
  getReconciliationResults,
  approveBatch,
  rejectBatch,
} from "../api/batchApi";

import StatusBadge from "../components/common/StatusBadge";

function BatchReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [batch, setBatch] = useState(null);
  const [summary, setSummary] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchReviewData();
  }, [id]);

  const fetchReviewData = async () => {
    try {
      setLoading(true);
      setError("");

      const [detailsResponse, resultsResponse] = await Promise.all([
        getBatchDetails(id),
        getReconciliationResults(id),
      ]);

      if (!detailsResponse?.success) {
        throw new Error(
          detailsResponse?.message || "Failed to load batch details.",
        );
      }

      if (!resultsResponse?.success) {
        throw new Error(
          resultsResponse?.message || "Failed to load reconciliation results.",
        );
      }

      // IMPORTANT:
      // getBatchDetails contains the complete batch information.
      const fullBatch = detailsResponse.batch || resultsResponse.batch;

      const resultSummary =
        resultsResponse.summary || detailsResponse.summary || {};

      const ledgerTransactions = resultsResponse.ledgerTransactions || [];

      const bankTransactions = resultsResponse.bankTransactions || [];

      /*
       * Convert ledger + bank transactions into a single
       * reconciliation table.
       *
       * The backend returns ledger and bank transactions
       * separately, so we merge them using their reconciliation
       * relationship/status.
       */

      const rows = buildReconciliationRows(
        ledgerTransactions,
        bankTransactions,
      );

      setBatch(fullBatch);
      setSummary(resultSummary);
      setTransactions(rows);
    } catch (err) {
      console.error("Failed to load checker review:", err);

      setError(
        err.response?.data?.message || err.message || "Failed to load review.",
      );
    } finally {
      setLoading(false);
    }
  };

  const buildReconciliationRows = (ledger, bank) => {
    const rows = [];
    const usedBankIds = new Set();

    ledger.forEach((ledgerTransaction) => {
      const matchedBank = bank.find(
        (bankTransaction) =>
          String(bankTransaction.matchedLedgerTransaction || "") ===
          String(ledgerTransaction._id),
      );

      if (matchedBank) {
        usedBankIds.add(String(matchedBank._id));
      }

      const status =
        ledgerTransaction.reconciliationStatus ||
        ledgerTransaction.status ||
        "PENDING";

      rows.push({
        id: ledgerTransaction._id,
        transactionId: ledgerTransaction.transactionId || "-",
        reference: ledgerTransaction.referenceNumber || "-",
        ledgerAmount:
          typeof ledgerTransaction.amount === "number"
            ? ledgerTransaction.amount
            : null,
        bankAmount:
          matchedBank && typeof matchedBank.amount === "number"
            ? matchedBank.amount
            : null,
        ledgerDate: ledgerTransaction.transactionDate,
        bankDate: matchedBank?.transactionDate || null,
        status,
        details: getMatchDetails(status, ledgerTransaction, matchedBank),
      });
    });

    // Add bank-only transactions
    bank.forEach((bankTransaction) => {
      if (usedBankIds.has(String(bankTransaction._id))) {
        return;
      }

      const matchedLedger = bankTransaction.matchedLedgerTransaction;

      if (matchedLedger) {
        return;
      }

      rows.push({
        id: bankTransaction._id,
        transactionId: "-",
        reference: bankTransaction.referenceNumber || "-",
        ledgerAmount: null,
        bankAmount:
          typeof bankTransaction.amount === "number"
            ? bankTransaction.amount
            : null,
        ledgerDate: null,
        bankDate: bankTransaction.transactionDate,
        status: bankTransaction.reconciliationStatus || "MISSING_IN_LEDGER",
        details: "Transaction not found in ledger",
      });
    });

    return rows;
  };

  const getMatchDetails = (status, ledgerTransaction, bankTransaction) => {
    switch (status) {
      case "MATCHED":
        return "Exact match";

      case "AMOUNT_MISMATCH": {
        if (
          typeof ledgerTransaction?.amount === "number" &&
          typeof bankTransaction?.amount === "number"
        ) {
          const difference = Math.abs(
            ledgerTransaction.amount - bankTransaction.amount,
          );

          return `Amount difference: ${formatCurrency(difference)}`;
        }

        return "Amount differs";
      }

      case "DATE_MISMATCH":
        return "Transaction date differs";

      case "MISSING_IN_BANK":
        return "Transaction not found in bank";

      case "MISSING_IN_LEDGER":
        return "Transaction not found in ledger";

      default:
        return "Requires review";
    }
  };

  const handleApprove = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this batch?",
    );

    if (!confirmed) return;

    try {
      setActionLoading("APPROVE");
      setError("");

      const response = await approveBatch(id);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to approve batch.");
      }

      // Return to review queue after successful approval.
      navigate(-1);
    } catch (err) {
      console.error("Failed to approve batch:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to approve batch.",
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async () => {
    const trimmedRemarks = remarks.trim();

    if (!trimmedRemarks) {
      setError("Please enter rejection remarks.");
      return;
    }

    try {
      setActionLoading("REJECT");
      setError("");

      const response = await rejectBatch(id, trimmedRemarks);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to reject batch.");
      }

      setShowRejectModal(false);
      setRemarks("");

      // Return to review queue after successful rejection.
      navigate(-1);
    } catch (err) {
      console.error("Failed to reject batch:", err);

      setError(
        err.response?.data?.message || err.message || "Failed to reject batch.",
      );
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 size={22} className="animate-spin" />
          Loading checker review...
        </div>
      </div>
    );
  }

  if (error && !batch) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#243041] px-4 py-2 text-sm text-gray-300 hover:bg-[#141C28]"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    );
  }

  const totalLedger =
    summary.totalLedgerTransactions ?? batch?.totalLedgerTransactions ?? 0;

  const totalBank =
    summary.totalBankTransactions ?? batch?.totalBankTransactions ?? 0;

  const matched =
    summary.matchedTransactions ?? batch?.matchedTransactions ?? 0;

  const amountMismatch =
    summary.amountMismatchCount ?? batch?.amountMismatchCount ?? 0;

  const dateMismatch =
    summary.dateMismatchCount ?? batch?.dateMismatchCount ?? 0;

  const missingInBank =
    summary.missingInBankCount ?? batch?.missingInBankCount ?? 0;

  const missingInLedger =
    summary.missingInLedgerCount ?? batch?.missingInLedgerCount ?? 0;

  const totalExceptions =
    summary.totalExceptions ??
    amountMismatch + dateMismatch + missingInBank + missingInLedger;

  const matchPercentage =
    summary.matchPercentage ??
    (totalLedger > 0 ? (matched / totalLedger) * 100 : 0);

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Reconciliation</span>
            <span>›</span>
            <span>Pending Review</span>
            <span>›</span>
            <span className="text-gray-300">Review</span>
          </div>

          <h1 className="text-2xl font-semibold text-white">Checker Review</h1>

          <p className="text-sm text-gray-500 mt-1">
            Review the reconciliation results before approving or rejecting this
            batch.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-[#243041] bg-[#111925] px-4 py-2.5 text-sm text-gray-300 hover:bg-[#182231]"
        >
          <ArrowLeft size={17} />
          Back to Review Queue
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Batch information */}
      <div className="rounded-xl border border-[#243041] bg-[#141C28] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-white">
                {batch?.batchId}
              </h2>

              <StatusBadge status={batch?.status} />
            </div>

            <p className="mt-2 text-sm text-gray-400">
              {batch?.batchName || "-"}
            </p>
          </div>

          <div className="text-right text-sm">
            <p className="text-gray-500">Submitted By</p>
            <p className="mt-1 text-white">{batch?.createdByName || "-"}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#243041] pt-4">
          <InfoItem label="Created Date" value={formatDate(batch?.createdAt)} />

          <InfoItem
            label="Submitted Date"
            value={formatDate(batch?.submittedAt)}
          />

          <InfoItem label="Ledger Transactions" value={totalLedger} />

          <InfoItem label="Bank Transactions" value={totalBank} />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <ReviewStat
          icon={<CheckCircle2 size={20} />}
          title="Matched"
          value={matched}
          description={`${Number(matchPercentage).toFixed(
            2,
          )}% of ledger transactions`}
          type="success"
        />

        <ReviewStat
          icon={<AlertTriangle size={20} />}
          title="Mismatches"
          value={amountMismatch + dateMismatch}
          description={`Amount: ${amountMismatch} · Date: ${dateMismatch}`}
          type="warning"
        />

        <ReviewStat
          icon={<XCircle size={20} />}
          title="Missing Transactions"
          value={missingInBank + missingInLedger}
          description={`Bank: ${missingInBank} · Ledger: ${missingInLedger}`}
          type="danger"
        />

        <ReviewStat
          icon={<AlertTriangle size={20} />}
          title="Total Exceptions"
          value={totalExceptions}
          description="Require Checker attention"
          type="exception"
        />
      </div>

      {/* Reconciliation results */}
      <div className="rounded-xl border border-[#243041] bg-[#141C28] overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#243041]">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Reconciliation Results
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Review individual transaction outcomes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/batch/${id}/reconciliation-results`)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#243041] px-4 py-2 text-sm text-gray-300 hover:bg-[#182231]"
          >
            <Eye size={16} />
            View Full Results
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#243041] bg-[#101823] text-gray-500">
                <th className="px-5 py-3 text-left font-medium">#</th>
                <th className="px-5 py-3 text-left font-medium">
                  TRANSACTION ID
                </th>
                <th className="px-5 py-3 text-left font-medium">REFERENCE</th>
                <th className="px-5 py-3 text-right font-medium">
                  LEDGER AMOUNT
                </th>
                <th className="px-5 py-3 text-right font-medium">
                  BANK AMOUNT
                </th>
                <th className="px-5 py-3 text-left font-medium">STATUS</th>
                <th className="px-5 py-3 text-left font-medium">
                  MATCH DETAILS
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No reconciliation results found.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr
                    key={transaction.id || index}
                    className="border-b border-[#243041] last:border-b-0"
                  >
                    <td className="px-5 py-4 text-gray-500">{index + 1}</td>

                    <td className="px-5 py-4 font-medium text-white">
                      {transaction.transactionId}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {transaction.reference}
                    </td>

                    <td className="px-5 py-4 text-right text-gray-300">
                      {formatCurrency(transaction.ledgerAmount)}
                    </td>

                    <td className="px-5 py-4 text-right text-gray-300">
                      {formatCurrency(transaction.bankAmount)}
                    </td>

                    <td className="px-5 py-4">
                      <ReviewStatus status={transaction.status} />
                    </td>

                    <td className="px-5 py-4 text-gray-400">
                      {transaction.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 text-xs text-gray-500">
          Showing {transactions.length} reconciliation records
        </div>
      </div>

      {/* Checker decision */}
      {batch?.status === "SUBMITTED" && (
        <div className="rounded-xl border border-[#243041] bg-[#141C28] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Checker Decision
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Review the reconciliation results before making a final
                decision.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowRejectModal(true)}
                disabled={actionLoading !== ""}
                className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/20 disabled:opacity-50"
              >
                {actionLoading === "REJECT" ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <XCircle size={17} />
                )}
                Reject
              </button>

              <button
                type="button"
                onClick={handleApprove}
                disabled={actionLoading !== ""}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-500 disabled:opacity-50"
              >
                {actionLoading === "APPROVE" ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={17} />
                )}
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-xl border border-[#243041] bg-[#141C28] shadow-2xl">
            <div className="border-b border-[#243041] px-5 py-4">
              <h3 className="text-lg font-semibold text-white">Reject Batch</h3>

              <p className="mt-1 text-sm text-gray-500">
                Please provide a reason for rejecting this batch. The Maker will
                be able to see these remarks.
              </p>
            </div>

            <div className="p-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rejection Remarks
              </label>

              <textarea
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                rows={5}
                placeholder="Enter reason for rejection..."
                className="w-full resize-none rounded-lg border border-[#243041] bg-[#0F1722] px-3 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500"
              />

              {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>

            <div className="flex justify-end gap-3 border-t border-[#243041] px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  setShowRejectModal(false);
                  setRemarks("");
                  setError("");
                }}
                disabled={actionLoading === "REJECT"}
                className="rounded-lg border border-[#243041] px-4 py-2.5 text-sm text-gray-300 hover:bg-[#182231]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReject}
                disabled={actionLoading === "REJECT" || !remarks.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
              >
                {actionLoading === "REJECT" && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------- */
/* Helper components */
/* -------------------------------------------------- */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>

      <p className="mt-1 text-sm text-white">{value}</p>
    </div>
  );
}

function ReviewStat({ icon, title, value, description, type }) {
  const styles = {
    success: {
      box: "bg-green-500/10 text-green-400",
    },
    warning: {
      box: "bg-orange-500/10 text-orange-400",
    },
    danger: {
      box: "bg-red-500/10 text-red-400",
    },
    exception: {
      box: "bg-yellow-500/10 text-yellow-400",
    },
  };

  return (
    <div className="rounded-xl border border-[#243041] bg-[#141C28] p-4">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles[type].box}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-gray-400">{title}</p>

          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function ReviewStatus({ status }) {
  const config = {
    MATCHED: {
      label: "MATCHED",
      className: "border-green-500/20 bg-green-500/10 text-green-400",
    },

    AMOUNT_MISMATCH: {
      label: "AMOUNT MISMATCH",
      className: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    },

    DATE_MISMATCH: {
      label: "DATE MISMATCH",
      className: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    },

    MISSING_IN_BANK: {
      label: "MISSING IN BANK",
      className: "border-red-500/20 bg-red-500/10 text-red-400",
    },

    MISSING_IN_LEDGER: {
      label: "MISSING IN LEDGER",
      className: "border-red-500/20 bg-red-500/10 text-red-400",
    },
  };

  const current = config[status] || {
    label: status || "PENDING",
    className: "border-gray-500/20 bg-gray-500/10 text-gray-400",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium ${current.className}`}
    >
      {current.label}
    </span>
  );
}

function formatCurrency(value) {
  if (typeof value !== "number") {
    return "—";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default BatchReview;
