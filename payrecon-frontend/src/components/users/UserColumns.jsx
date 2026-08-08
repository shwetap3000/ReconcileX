import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

const formatDate = (date) => {
  if (!date) return "--";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const UserColumns = [
  {
    header: "User",
    accessor: "user",

    render: (user) => (
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-[#4F6BFF] flex items-center justify-center font-semibold text-white">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-medium text-white">{user.name}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
    ),
  },

  {
    header: "Role",
    accessor: "role",

    render: (user) => <UserRoleBadge role={user.role} />,
  },

  {
    header: "Status",
    accessor: "status",

    render: (user) => (
      <UserStatusBadge status={user.isActive ? "ACTIVE" : "INACTIVE"} />
    ),
  },

  {
    header: "Last Login",
    accessor: "lastLogin",

    render: (user) => formatDate(user.lastLogin),
  },

  {
    header: "Created On",
    accessor: "createdOn",

    render: (user) => formatDate(user.createdAt),
  },

  {
    header: "Created By",
    accessor: "createdBy",

    render: (user) => user.createdBy || "--",
  },

  {
    header: "Actions",
    accessor: "actions",

    render: (user, refreshUsers) => (
      <UserActions user={user} refreshUsers={refreshUsers} />
    ),
  },
];
