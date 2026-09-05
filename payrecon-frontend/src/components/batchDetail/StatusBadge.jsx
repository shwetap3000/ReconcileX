function StatusBadge({ status }) {
  const statusConfig = {
    DRAFT: {
      label: "Draft",
      className: "bg-gray-500/15 text-gray-300 border border-gray-500/20",
    },

    PARTIAL_UPLOAD: {
      label: "Partial Upload",
      className: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    },

    UPLOADED: {
      label: "Files Uploaded",
      className: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    },

    SUBMITTED: {
      label: "Submitted",
      className: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    },

    UNDER_REVIEW: {
      label: "Under Review",
      className: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
    },

    APPROVED: {
      label: "Approved",
      className: "bg-green-500/15 text-green-400 border border-green-500/20",
    },

    REJECTED: {
      label: "Rejected",
      className: "bg-red-500/15 text-red-400 border border-red-500/20",
    },

    RECONCILED: {
      label: "Reconciled",
      className:
        "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    },
  };

  const config = statusConfig[status] || {
    label: status || "Unknown",
    className: "bg-gray-500/15 text-gray-300 border border-gray-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${config.className}`}
    >
      <span className="w-2 h-2 rounded-full bg-current" />
      {config.label}
    </span>
  );
}

export default StatusBadge;
