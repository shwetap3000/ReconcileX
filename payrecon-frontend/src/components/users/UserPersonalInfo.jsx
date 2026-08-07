import React from "react";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import { User, CalendarDays } from "lucide-react";

const UserPersonalInfo = ({ user }) => {
  const rows = [
    {
      label: "Full Name",
      value: user.fullName,
    },
    {
      label: "Email",
      value: user.email,
    },
    {
      label: "Role",
      value: <UserRoleBadge role={user.role} />,
    },
    {
      label: "Status",
      value: <UserStatusBadge status={user.status} />,
    },
    {
      label: "Created By",
      value: user.createdBy,
    },
    {
      label: "Created At",
      value: user.createdAt,
    },
    {
      label: "Last Login",
      value: user.lastLogin,
    },
    {
      label: "Must Change Password",
      value: (
        <span
          className={`font-medium ${
            user.mustChangePassword ? "text-red-400" : "text-green-400"
          }`}
        >
          {user.mustChangePassword ? "Yes" : "No"}
        </span>
      ),
    },
    {
      label: "Account ID",
      value: user.userId,
    },
  ];

  return (
    <div className="bg-[#141C2F] border border-gray-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-white">
          <User size={22} />
        </div>

        <h2 className="text-2xl font-semibold text-white">
          Personal Information
        </h2>
      </div>

      {/* Content */}

      <div>
        {rows.map((row, index) => (
          <div
            key={index}
            className={`grid grid-cols-[180px_1fr] items-center py-4 ${
              index !== rows.length - 1 ? "border-b border-gray-800" : ""
            }`}
          >
            <span className="text-gray-400">{row.label}</span>

            <div className="text-white">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPersonalInfo;
