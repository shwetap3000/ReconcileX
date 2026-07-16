import { CheckCircle2, AlertTriangle, Info, ChevronRight } from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    Success: "bg-green-500/15 text-green-400 border border-green-500/20",
    Warning: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    Info: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const AuditColumns = [
  {
    header: "Time",
    accessor: "time",

    render: (row) => {
      const [date, time] = row.time.split("\n");

      return (
        <div>
          <p className="text-white">{date}</p>
          <p className="text-gray-400 text-sm mt-1">{time}</p>
        </div>
      );
    },
  },

  {
    header: "User",
    accessor: "user",

    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.user.avatar}
          alt={row.user.name}
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="text-white">{row.user.name}</p>

          <p className="text-gray-400 text-sm">{row.user.role}</p>
        </div>
      </div>
    ),
  },

  {
    header: "Action",
    accessor: "action",

    render: (row) => (
      <div>
        <p className="text-white">{row.action.title}</p>

        <p className="text-gray-400 text-sm mt-1">{row.action.description}</p>
      </div>
    ),
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
    header: "Status",
    accessor: "status",

    render: (row) => <StatusBadge status={row.status} />,
  },

  {
    header: "",

    accessor: "arrow",

    render: () => (
      <button className="flex justify-center w-full">
        <ChevronRight size={20} className="text-gray-500" />
      </button>
    ),
  },
];
