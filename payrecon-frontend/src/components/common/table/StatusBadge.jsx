function StatusBadge({ status }) {
  const colors = {
    Reconciled: "bg-green-500/20 text-green-400",
    Completed: "bg-green-500/20 text-green-400",
    Pending: "bg-yellow-500/20 text-yellow-400",
    Failed: "bg-red-500/20 text-red-400",
    Processing: "bg-blue-500/20 text-blue-400",
    "In Progress": "bg-blue-500/20 text-blue-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-medium ${
        colors[status]
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;