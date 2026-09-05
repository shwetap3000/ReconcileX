import { Eye, MoreVertical } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

const formatAmount = (amount) => {
  if (amount === null || amount === undefined) {
    return "—";
  }

  return `₹${Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const transactionColumns = [
  {
    header: "Reconciliation ID",
    accessor: "reconciliationId",
  },

  {
    header: "Ledger Ref",
    accessor: "ledgerRef",
  },

  {
    header: "Bank Ref",
    accessor: "bankRef",
  },

  {
    header: "Batch",
    accessor: "batch",

    render: (row) => (
      <span className="text-[#4F6BFF] cursor-pointer hover:underline">
        {row.batch || "—"}
      </span>
    ),
  },

  {
    header: "Ledger Amount",
    accessor: "ledgerAmount",

    render: (row) => formatAmount(row.ledgerAmount),
  },

  {
    header: "Bank Amount",
    accessor: "bankAmount",

    render: (row) => formatAmount(row.bankAmount),
  },

  {
    header: "Difference",
    accessor: "difference",

    render: (row) => formatAmount(row.difference),
  },

  {
    header: "Status",
    accessor: "status",

    render: (row) => <StatusBadge status={row.status} />,
  },

  {
    header: "Action",
    accessor: "action",

    render: () => (
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          className="w-9 h-9 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#182233] transition"
        >
          <Eye size={17} />
        </button>

        <button
          type="button"
          className="w-9 h-9 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#182233] transition"
        >
          <MoreVertical size={17} />
        </button>
      </div>
    ),
  },
];
