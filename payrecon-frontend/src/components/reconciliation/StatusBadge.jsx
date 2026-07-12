const styles = {
  Matched:
    "bg-green-500/15 text-green-400",
  Unmatched:
    "bg-yellow-500/15 text-yellow-400",
  Duplicate:
    "bg-red-500/15 text-red-400",
  "Missing in Bank":
    "bg-purple-500/15 text-purple-400",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;