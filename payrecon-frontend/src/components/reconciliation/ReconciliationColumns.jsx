import StatusBadge from "../common/StatusBadge";
import ProgressBar from "../common/ProgressBar";
import { CalendarDays, MoreHorizontal } from "lucide-react";

export const ReconciliationColumns = [
  {
    key: "id",
    header: "Batch ID",
  },

  {
    key: "batchName",
    header: "Batch Name",
  },

  {
    key: "date",
    header: "Created",

    render: (row) => (
      <div className="flex items-center gap-2">
        <CalendarDays size={16} className="text-gray-500" />

        {row.date}
      </div>
    ),
  },

  {
    key: "transactions",
    header: "Transactions",

    render: (row) => row.transactions.toLocaleString(),
  },

  {
    key: "status",
    header: "Status",

    render: (row) => <StatusBadge status={row.status} />,
  },

  {
    key: "progress",
    header: "Progress",

    render: (row) => <ProgressBar value={row.progress} />,
  },

  {
    key: "action",
    header: "",

    cellClassName: "text-center",

    render: () => (
      <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#243041] text-gray-400 hover:bg-[#1B2535] hover:text-white transition">
        <MoreHorizontal size={18} />
      </button>
    ),
  },
];
