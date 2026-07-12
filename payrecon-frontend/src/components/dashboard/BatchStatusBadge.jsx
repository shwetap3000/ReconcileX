const statusStyles = {
  APPROVED: "bg-green-500/15 text-green-400",
  SUBMITTED: "bg-yellow-500/15 text-yellow-400",
  REJECTED: "bg-red-500/15 text-red-400",
  UPLOADED: "bg-blue-500/15 text-blue-400",
  PARTIAL_UPLOAD: "bg-orange-500/15 text-orange-400",
};

const BatchStatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        statusStyles[status] || "bg-slate-500/15 text-slate-300"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default BatchStatusBadge;