import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

export const UserColumns = [
  {
    header: "User",
    accessor: "user",

    render: (user) => (
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-[#4F6BFF] flex items-center justify-center font-semibold text-white">
          {user.avatar}
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

    render: (user) => <UserStatusBadge status={user.status} />,
  },

  {
    header: "Last Login",
    accessor: "lastLogin",
  },

  {
    header: "Created On",
    accessor: "createdOn",
  },

  {
    header: "Created By",
    accessor: "createdBy",
  },

  {
    header: "Actions",
    accessor: "actions",

    render: (user) => <UserActions user={user} />,
  },
];
