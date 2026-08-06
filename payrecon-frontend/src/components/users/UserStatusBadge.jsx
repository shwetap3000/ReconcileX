function UserStatusBadge({ status }) {
  const styles = {
    ACTIVE: "bg-green-500/15 text-green-400 border border-green-500/20",

    INACTIVE: "bg-red-500/15 text-red-400 border border-red-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-sm font-medium ${styles[status]}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

export default UserStatusBadge;
