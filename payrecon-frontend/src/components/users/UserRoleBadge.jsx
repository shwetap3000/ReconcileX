function UserRoleBadge({ role }) {
  const styles = {
    ADMIN: "bg-blue-500/15 text-blue-400 border border-blue-500/20",

    MAKER: "bg-green-500/15 text-green-400 border border-green-500/20",

    CHECKER: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-sm font-medium ${styles[role]}`}
    >
      {role.charAt(0) + role.slice(1).toLowerCase()}
    </span>
  );
}

export default UserRoleBadge;
