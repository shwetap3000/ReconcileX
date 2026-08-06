import { ChevronRight } from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    SUCCESS: "bg-green-500/15 text-green-400 border border-green-500/20",
    FAILED: "bg-red-500/15 text-red-400 border border-red-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-sm font-medium ${
        styles[status] ||
        "bg-gray-500/15 text-gray-300 border border-gray-500/20"
      }`}
    >
      {status}
    </span>
  );
};

const actionLabels = {
  LOGIN: "Login",
  LOGOUT: "Logout",

  USER_CREATED: "User Created",
  USER_UPDATED: "User Updated",
  USER_ACTIVATED: "User Activated",
  USER_DEACTIVATED: "User Deactivated",
  USER_ROLE_UPDATED: "User Role Updated",

  BATCH_CREATED: "Batch Created",
  BATCH_UPDATED: "Batch Updated",
  BATCH_DELETED: "Batch Deleted",
  BATCH_SUBMITTED: "Batch Submitted",
  BATCH_APPROVED: "Batch Approved",
  BATCH_REJECTED: "Batch Rejected",
  BATCH_RESUBMITTED: "Batch Resubmitted",

  LEDGER_UPLOADED: "Ledger Uploaded",
  BANK_UPLOADED: "Bank Uploaded",
  LEDGER_REPLACED: "Ledger Replaced",
  BANK_REPLACED: "Bank Replaced",

  REVIEW_COMMENT_ADDED: "Review Comment Added",

  PROFILE_UPDATED: "Profile Updated",
  PASSWORD_CHANGED: "Password Changed",

  REPORT_DOWNLOADED: "Report Downloaded",

  RECONCILIATION_STARTED: "Reconciliation Started",
  RECONCILIATION_COMPLETED: "Reconciliation Completed",
  RECONCILIATION_FAILED: "Reconciliation Failed",
};

export const AuditColumns = [
  {
  header: "Time",
  accessor: "createdAt",

  render: (row) => {
    const date = new Date(row.createdAt);

    return (
      <div>
        <p className="text-white">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p className="text-gray-400 text-sm mt-1">
          {date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>
    );
  },
},
  {
    header: "User",
    accessor: "performedBy",

    render: (row) => (
      <div>
        <p className="text-white font-medium">{row.performedBy?.name || "-"}</p>

        <p className="text-gray-400 text-sm">{row.role}</p>
      </div>
    ),
  },

  {
    header: "Action",
    accessor: "action",

    render: (row) => (
      <div>
        <p className="text-white font-medium">
          {actionLabels[row.action] || row.action}
        </p>

        <p className="text-gray-400 text-sm mt-1">{row.description}</p>
      </div>
    ),
  },

  {
    header: "Batch",
    accessor: "batchId",

    render: (row) => (
      <span className="text-[#4F6BFF] hover:underline cursor-pointer">
        {row.batchId?.batchId || "-"}
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
        <ChevronRight
          size={20}
          className="text-gray-500 hover:text-white transition"
        />
      </button>
    ),
  },
];
