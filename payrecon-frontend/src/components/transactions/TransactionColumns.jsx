import { Eye, MoreVertical } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export const transactionColumns = [
  {
    header: "Transaction ID",
    accessor: "id",
  },

  {
    header: "Reference Number",
    accessor: "reference",
  },

  {
    header: "Batch",
    accessor: "batch",

    render: (row) => (
      <span className="text-[#4F6BFF] cursor-pointer hover:underline">
        {row.batch}
      </span>
    ),
  },

  {
    header: "Amount",
    accessor: "amount",
  },

  {
    header: "Date",
    accessor: "date",
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
        <button className="w-9 h-9 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#182233]">
          <Eye size={17} />
        </button>

        <button className="w-9 h-9 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#182233]">
          <MoreVertical size={17} />
        </button>
      </div>
    ),
  },
];
