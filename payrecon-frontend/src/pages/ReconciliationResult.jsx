import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  CalendarX2,
  CircleAlert,
  Search,
  FileText,
  Download,
  Send,
} from "lucide-react";

import { getReconciliationResults } from "../api/batchApi";

/* =========================================================
   HELPERS
========================================================= */

const formatAmount = (value) => {
  if (value === null || value === undefined) {
    return "—";
  }

  return `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (value) => {
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
};

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  let config;

  switch (status) {
    case "MATCHED":
      config = {
        label: "MATCHED",
        icon: CheckCircle2,
        className: "bg-green-500/15 text-green-400 border-green-500/20",
      };
      break;

    case "AMOUNT_MISMATCH":
      config = {
        label: "AMOUNT MISMATCH",
        icon: AlertTriangle,
        className: "bg-orange-500/15 text-orange-400 border-orange-500/20",
      };
      break;

    case "DATE_MISMATCH":
      config = {
        label: "DATE MISMATCH",
        icon: CalendarX2,
        className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
      };
      break;

    case "MISSING_IN_BANK":
      config = {
        label: "MISSING IN BANK",
        icon: CircleAlert,
        className: "bg-red-500/15 text-red-400 border-red-500/20",
      };
      break;

    case "MISSING_IN_LEDGER":
      config = {
        label: "MISSING IN LEDGER",
        icon: CircleAlert,
        className: "bg-red-500/15 text-red-400 border-red-500/20",
      };
      break;

    default:
      config = {
        label: status || "UNKNOWN",
        icon: CircleAlert,
        className: "bg-gray-500/15 text-gray-400 border-gray-500/20",
      };
  }

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold ${config.className}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
}

/* =========================================================
   KPI CARD
========================================================= */

function KpiCard({ title, value, percentage, type }) {
  const styles = {
    matched: {
      icon: CheckCircle2,
      iconClass: "bg-green-500 text-white",
      bar: "bg-green-500",
    },

    mismatch: {
      icon: AlertTriangle,
      iconClass: "bg-orange-500 text-white",
      bar: "bg-orange-500",
    },

    missing: {
      icon: CircleAlert,
      iconClass: "bg-red-500 text-white",
      bar: "bg-red-500",
    },

    exceptions: {
      icon: AlertTriangle,
      iconClass: "bg-yellow-500 text-white",
      bar: "bg-yellow-500",
    },
  };

  const config = styles[type] || styles.exceptions;
  const Icon = config.icon;

  return (
    <div className="rounded-xl border border-[#243041] bg-[#111925] p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-400">{title}</p>

          <div className="mt-1 flex items-end justify-between gap-2">
            <p className="text-2xl font-semibold text-white">{value}</p>

            <span className="text-xs text-gray-500">{percentage}%</span>
          </div>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#1D2938]">
        <div
          className={`h-full rounded-full ${config.bar}`}
          style={{
            width: `${Math.min(Number(percentage) || 0, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({ label, value, percentage, dot }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />

      <span className="flex-1 text-sm text-gray-400">{label}</span>

      <span className="w-8 text-right text-sm font-semibold text-white">
        {value}
      </span>

      <span className="w-12 text-right text-xs text-gray-500">
        {percentage}%
      </span>
    </div>
  );
}

/* =========================================================
   DISCREPANCY ROW
========================================================= */

function DiscrepancyRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-lg px-3 py-3 hover:bg-[#16202D]">
      <div className="text-gray-400">{icon}</div>

      <span className="flex-1 text-sm text-gray-400">{label}</span>

      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

/* =========================================================
   BUILD TABLE RESULTS FROM BACKEND DATA
========================================================= */

function buildResults(ledgerTransactions = [], bankTransactions = []) {
  const results = [];
  const usedBankIds = new Set();

  /* -----------------------------------------------
     LEDGER TRANSACTIONS
  ------------------------------------------------ */

  ledgerTransactions.forEach((ledger) => {
    const ledgerStatus =
      ledger.reconciliationStatus || ledger.status || "PENDING";

    let bank = null;

    /*
      If backend sends matchedBankTransaction,
      use it first.
    */
    if (ledger.matchedBankTransaction) {
      const matchedBankId =
        typeof ledger.matchedBankTransaction === "object"
          ? ledger.matchedBankTransaction._id
          : ledger.matchedBankTransaction;

      bank = bankTransactions.find(
        (item) => String(item._id) === String(matchedBankId),
      );
    }

    /*
      Fallback:
      find bank transaction by reference number.
    */
    if (!bank && ledger.referenceNumber) {
      bank = bankTransactions.find(
        (item) =>
          !usedBankIds.has(String(item._id)) &&
          item.referenceNumber === ledger.referenceNumber,
      );
    }

    if (bank) {
      usedBankIds.add(String(bank._id));
    }

    let details = "Exact match";

    if (ledgerStatus === "AMOUNT_MISMATCH") {
      const ledgerAmount = Number(ledger.amount || 0);

      const bankAmount = Number(bank?.amount || 0);

      const difference = Math.abs(ledgerAmount - bankAmount);

      details = `Amount difference: ${formatAmount(difference)}`;
    } else if (ledgerStatus === "DATE_MISMATCH") {
      details = "Transaction date differs";
    } else if (ledgerStatus === "MISSING_IN_BANK") {
      details = "Transaction not found in bank";
    } else if (ledgerStatus === "MATCHED") {
      details = "Exact match";
    }

    results.push({
      id: ledger._id,

      transactionId: ledger.transactionId || null,

      referenceNumber: ledger.referenceNumber || bank?.referenceNumber || "—",

      ledgerAmount: ledger.amount !== undefined ? ledger.amount : null,

      bankAmount: bank?.amount !== undefined ? bank.amount : null,

      ledgerDate: ledger.transactionDate || null,

      bankDate: bank?.transactionDate || null,

      status: ledgerStatus,

      details,
    });
  });

  /* -----------------------------------------------
     BANK TRANSACTIONS NOT USED BY LEDGER
  ------------------------------------------------ */

  bankTransactions.forEach((bank) => {
    const bankId = String(bank._id);

    if (usedBankIds.has(bankId)) {
      return;
    }

    /*
      If the bank reference does not exist
      in the ledger, it is missing in ledger.
    */
    const existsInLedger = ledgerTransactions.some(
      (ledger) => ledger.referenceNumber === bank.referenceNumber,
    );

    if (bank.reconciliationStatus === "MISSING_IN_LEDGER" || !existsInLedger) {
      results.push({
        id: bank._id,

        transactionId: null,

        referenceNumber: bank.referenceNumber || "—",

        ledgerAmount: null,

        bankAmount: bank.amount !== undefined ? bank.amount : null,

        ledgerDate: null,

        bankDate: bank.transactionDate || null,

        status: "MISSING_IN_LEDGER",

        details: "Transaction not found in ledger",
      });
    }
  });

  return results;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function ReconciliationResults() {
  const navigate = useNavigate();
  const { id } = useParams();

  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const [activeFilter, setActiveFilter] = useState("ALL");

  const [search, setSearch] = useState("");

  const [batch, setBatch] = useState(null);

  const [summary, setSummary] = useState(null);

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* -------------------------------------------------------
     LOAD BACKEND DATA
  ------------------------------------------------------- */

  useEffect(() => {
    let mounted = true;

    const fetchResults = async () => {
      if (!id) {
        if (mounted) {
          setError("Invalid batch ID.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getReconciliationResults(id);

        if (!response?.success) {
          throw new Error(
            response?.message || "Failed to load reconciliation results.",
          );
        }

        if (!mounted) {
          return;
        }

        const backendBatch = response.batch || {};

        const backendSummary = response.summary || {};

        const ledgerTransactions = response.ledgerTransactions || [];

        const bankTransactions = response.bankTransactions || [];

        const reconciliationResults = buildResults(
          ledgerTransactions,
          bankTransactions,
        );

        setBatch(backendBatch);
        setSummary(backendSummary);
        setResults(reconciliationResults);
      } catch (err) {
        console.error("Failed to load reconciliation results:", err);

        if (mounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load reconciliation results.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      mounted = false;
    };
  }, [id]);

  /* -------------------------------------------------------
     LOADING STATE
  ------------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#080E17] text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#243041] border-t-blue-500" />

          <p className="mt-3 text-sm text-gray-400">
            Loading reconciliation results...
          </p>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------
     ERROR STATE
  ------------------------------------------------------- */

  if (error) {
    return (
      <div className="min-h-[60vh] bg-[#080E17] px-5 py-8 text-white">
        <div className="mx-auto max-w-xl rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
          <CircleAlert size={28} className="mx-auto text-red-400" />

          <h2 className="mt-3 text-lg font-semibold">
            Failed to load reconciliation results
          </h2>

          <p className="mt-2 text-sm text-red-300">{error}</p>

          <button
            type="button"
            onClick={() => navigate(`/batches/${id}`)}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#2A3A50] bg-[#111925] px-4 py-2 text-sm text-gray-300 hover:bg-[#182231] hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Batch
          </button>
        </div>
      </div>
    );
  }

  if (!batch || !summary) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#080E17] text-gray-400">
        No reconciliation data found.
      </div>
    );
  }

  /* -------------------------------------------------------
     BACKEND SUMMARY COUNTS
  ------------------------------------------------------- */

  const matchedCount = Number(summary.matchedTransactions || 0);

  const amountMismatchCount = Number(summary.amountMismatchCount || 0);

  const dateMismatchCount = Number(summary.dateMismatchCount || 0);

  const missingInBankCount = Number(summary.missingInBankCount || 0);

  const missingInLedgerCount = Number(summary.missingInLedgerCount || 0);

  /*
    IMPORTANT:
    Use backend's totalExceptions when available.
  */
  const exceptionCount =
    summary.totalExceptions !== undefined
      ? Number(summary.totalExceptions)
      : amountMismatchCount +
        dateMismatchCount +
        missingInBankCount +
        missingInLedgerCount;

  const totalRecords =
    Number(summary.totalLedgerTransactions || 0) +
    Number(summary.missingInLedgerCount || 0);

  /*
    Backend already calculates this.
  */
  const backendMatchPercentage = Number(summary.matchPercentage || 0);

  const totalForPercentage = totalRecords || results.length;

  const matchedPercentage =
    backendMatchPercentage > 0 || matchedCount === 0
      ? backendMatchPercentage.toFixed(1)
      : ((matchedCount / totalForPercentage) * 100).toFixed(1);

  const mismatchPercentage =
    totalForPercentage > 0
      ? (
          ((amountMismatchCount + dateMismatchCount) / totalForPercentage) *
          100
        ).toFixed(1)
      : "0.0";

  const missingBankPercentage =
    totalForPercentage > 0
      ? ((missingInBankCount / totalForPercentage) * 100).toFixed(1)
      : "0.0";

  const exceptionPercentage =
    totalForPercentage > 0
      ? ((exceptionCount / totalForPercentage) * 100).toFixed(1)
      : "0.0";

  /* -------------------------------------------------------
     FILTER TABLE DATA
  ------------------------------------------------------- */

  let filteredResults = [...results];

  if (activeFilter !== "ALL") {
    filteredResults = filteredResults.filter(
      (item) => item.status === activeFilter,
    );
  }

  if (search.trim()) {
    const searchValue = search.toLowerCase().trim();

    filteredResults = filteredResults.filter((item) =>
      [
        item.transactionId,
        item.referenceNumber,
        item.status,
        item.details,
      ].some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(searchValue),
      ),
    );
  }

  /* -------------------------------------------------------
     DONUT
  ------------------------------------------------------- */

  const donutTotal =
    matchedCount +
    amountMismatchCount +
    dateMismatchCount +
    missingInBankCount +
    missingInLedgerCount;

  const safeDonutTotal = donutTotal || totalForPercentage;

  const matchedDegrees =
    safeDonutTotal > 0 ? (matchedCount / safeDonutTotal) * 360 : 0;

  const mismatchDegrees =
    safeDonutTotal > 0
      ? ((amountMismatchCount + dateMismatchCount) / safeDonutTotal) * 360
      : 0;

  const missingBankDegrees =
    safeDonutTotal > 0 ? (missingInBankCount / safeDonutTotal) * 360 : 0;

  const donutBackground =
    safeDonutTotal > 0
      ? `conic-gradient(
          #22c55e 0deg ${matchedDegrees}deg,
          #f97316 ${matchedDegrees}deg ${matchedDegrees + mismatchDegrees}deg,
          #ef4444 ${matchedDegrees + mismatchDegrees}deg ${
            matchedDegrees + mismatchDegrees + missingBankDegrees
          }deg,
          #eab308 ${
            matchedDegrees + mismatchDegrees + missingBankDegrees
          }deg 360deg
        )`
      : "#1D2938";

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <div className="min-h-full bg-[#080E17] px-5 py-5 text-white">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <span>Reconciliation</span>
            <span>›</span>
            <span className="text-white">Result</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Reconciliation Result
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Detailed view of matched and exception transactions for the selected
            batch.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/batches/${id}`)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#2A3A50] bg-[#111925] px-5 text-sm font-medium text-gray-300 transition hover:bg-[#182231] hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Batch
        </button>
      </div>

      {/* ===================================================
          BATCH HEADER
      =================================================== */}

      <div className="mb-4 rounded-xl border border-[#243041] bg-[#111925] p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{batch.batchId}</h2>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1.5 text-xs font-semibold text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              {batch.status}
            </span>
          </div>

          <div className="text-sm text-gray-400">{batch.batchName}</div>
        </div>
      </div>

      {/* ===================================================
          KPI CARDS
      =================================================== */}

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Matched"
          value={matchedCount}
          percentage={matchedPercentage}
          type="matched"
        />

        <KpiCard
          title="Amount / Date Mismatch"
          value={amountMismatchCount + dateMismatchCount}
          percentage={mismatchPercentage}
          type="mismatch"
        />

        <KpiCard
          title="Missing in Bank"
          value={missingInBankCount}
          percentage={missingBankPercentage}
          type="missing"
        />

        <KpiCard
          title="Total Exceptions"
          value={exceptionCount}
          percentage={exceptionPercentage}
          type="exceptions"
        />
      </div>

      <div className="rounded-xl border border-[#243041] bg-[#111925]">
        {/* FILTER TABS */}

        <div className="border-b border-[#243041] px-4 pt-3">
          <div className="flex gap-6 overflow-x-auto">
            {[
              {
                key: "ALL",
                label: "All Transactions",
              },
              {
                key: "MATCHED",
                label: "Matched",
              },
              {
                key: "AMOUNT_MISMATCH",
                label: "Amount Mismatch",
              },
              {
                key: "DATE_MISMATCH",
                label: "Date Mismatch",
              },
              {
                key: "MISSING_IN_BANK",
                label: "Missing in Bank",
              },
              {
                key: "MISSING_IN_LEDGER",
                label: "Missing in Ledger",
              },
            ].map((filter) => {
              const active = activeFilter === filter.key;

              const count =
                filter.key === "ALL"
                  ? results.length
                  : results.filter((item) => item.status === filter.key).length;

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`whitespace-nowrap border-b-2 pb-3 text-sm transition ${
                    active
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {filter.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* SEARCH */}

        <div className="flex flex-col gap-3 border-b border-[#243041] p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by ID, reference, status..."
              className="h-10 w-full rounded-lg border border-[#2A3A50] bg-[#0D1520] pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          <div className="text-xs text-gray-500">
            Showing {filteredResults.length} of {results.length} reconciliation
            records
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-[#243041] bg-[#0D1520] text-left">
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  #
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Transaction ID
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Reference
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Ledger Amount
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Bank Amount
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Ledger Date
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Bank Date
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Match Details
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredResults.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-[#243041] transition hover:bg-[#16202D]"
                >
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-white">
                    {item.transactionId || "—"}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-300">
                    {item.referenceNumber || "—"}
                  </td>

                  <td className="px-4 py-4 text-right text-sm text-gray-300">
                    {formatAmount(item.ledgerAmount)}
                  </td>

                  <td className="px-4 py-4 text-right text-sm text-gray-300">
                    {formatAmount(item.bankAmount)}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {formatDate(item.ledgerDate)}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {formatDate(item.bankDate)}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {item.details}
                  </td>
                </tr>
              ))}

              {filteredResults.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <CircleAlert size={24} className="mx-auto text-gray-600" />

                    <p className="mt-2 text-sm text-gray-400">
                      No transactions found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER */}

        <div className="flex items-center justify-between border-t border-[#243041] px-4 py-3">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="text-gray-300">{filteredResults.length}</span> of{" "}
            <span className="text-gray-300">{results.length}</span> transactions
          </p>
        </div>
      </div>

      {/* ===================================================
          ACTIONS
      =================================================== */}

      <div className="mt-4 rounded-xl border border-[#243041] bg-[#111925] p-4">
        <h2 className="mb-3 text-lg font-semibold">Actions</h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <button
            type="button"
            disabled
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white opacity-60"
          >
            <Download size={17} />
            Download Full Report
          </button>

          <button
            type="button"
            disabled
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#2A3A50] bg-[#0D1520] px-4 text-sm font-medium text-gray-300 opacity-60"
          >
            <FileText size={17} />
            Download Exceptions
          </button>

          <button
            type="button"
            onClick={() => navigate(`/batches/${id}`)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#2A3A50] bg-[#0D1520] px-4 text-sm font-medium text-gray-300 transition hover:bg-[#182231] hover:text-white"
          >
            <Send size={17} />
            Back to Batch
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReconciliationResults;
