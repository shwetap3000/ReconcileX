function StatusBadge({ status }) {
  const statusStyles = {
    Draft: "bg-gray-500/15 text-gray-300 border border-gray-500/20",

    "Files Uploaded": "bg-blue-500/15 text-blue-400 border border-blue-500/20",

    Submitted: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",

    "Under Review":
      "bg-orange-500/15 text-orange-400 border border-orange-500/20",

    Approved: "bg-green-500/15 text-green-400 border border-green-500/20",

    Rejected: "bg-red-500/15 text-red-400 border border-red-500/20",

    Reconciled:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${statusStyles[status]}`}
    >
      <span className="w-2 h-2 rounded-full bg-current"></span>

      {status}
    </span>
  );
}

export default StatusBadge;
