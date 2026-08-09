import { Building2, Badge, Clock3, CalendarDays, Pencil } from "lucide-react";

import CreateUserCard from "../../common/CreateuserCard";
import ProfileInfoRow from "./ProfileInfoRow";

const formatDate = (date) => {
  if (!date) return "--";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const UserProfileCard = ({ user }) => {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <CreateUserCard>
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="h-36 w-36 rounded-full object-cover"
            />
          ) : (
            <div className="h-36 w-36 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-5xl font-bold text-white">
              {initials}
            </div>
          )}

          <button
            type="button"
            className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-3 shadow-lg"
          >
            <Pencil size={16} className="text-white" />
          </button>
        </div>

        <h2 className="mt-6 text-3xl font-semibold text-white">{user.name}</h2>

        <div className="mt-2 flex items-center gap-3">
          <span className="rounded-lg bg-slate-800 px-3 py-1 text-slate-300">
            {user.employeeId || "--"}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-8 flex justify-center gap-4">
        <span className="rounded-full border border-blue-500 bg-blue-500/10 px-5 py-2 text-blue-400">
          {user.role}
        </span>

        <span
          className={`rounded-full px-5 py-2 ${
            user.isActive
              ? "border border-green-500 bg-green-500/10 text-green-400"
              : "border border-red-500 bg-red-500/10 text-red-400"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-slate-800"></div>

      {/* Information */}
      <div>
        <ProfileInfoRow
          icon={Building2}
          label="Department"
          value={user.department || "--"}
        />

        <ProfileInfoRow
          icon={Badge}
          label="Employee ID"
          value={user.employeeId || "--"}
        />

        <ProfileInfoRow
          icon={Clock3}
          label="Last Login"
          value={formatDate(user.lastLogin)}
        />

        <ProfileInfoRow
          icon={CalendarDays}
          label="Created On"
          value={formatDate(user.createdAt)}
        />
      </div>
    </CreateUserCard>
  );
};

export default UserProfileCard;
