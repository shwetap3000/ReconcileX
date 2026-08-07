import React from "react";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Mail,
  Power,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

const UserHeader = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Back */}
      <button
        onClick={() => navigate("/users")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-3"
      >
        <ArrowLeft size={18} />
        <span>Users</span>
      </button>

      {/* Title */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white">User Details</h1>
          <p className="text-gray-400 mt-1">
            View and manage user information.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white font-medium transition">
            <Pencil size={18} />
            Edit User
          </button>

          <button className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 px-5 py-3 rounded-xl text-white transition">
            <Power size={18} />
            Deactivate User
          </button>
        </div>
      </div>

      {/* User Card */}
      <div className="bg-[#141C2F] rounded-2xl border border-gray-800 p-8">
        <div className="flex justify-between items-center">
          {/* Left */}
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white text-4xl font-bold">
              {user.initials}
            </div>

            {/* User Info */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-3xl font-bold text-white">
                  {user.fullName}
                </h2>

                <UserRoleBadge role={user.role} />

                <UserStatusBadge status={user.status} />
              </div>

              <div className="flex items-center gap-3 mt-4 text-gray-400">
                <Mail size={18} />

                <span>{user.email}</span>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="border-l border-gray-700 pl-10">
            <div className="flex items-start gap-3 mb-5">
              <Calendar size={18} className="text-gray-400 mt-1" />

              <div>
                <p className="text-sm text-gray-400">User ID</p>

                <p className="text-white font-semibold">{user.userId}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-gray-400 mt-1" />

              <div>
                <p className="text-sm text-gray-400">Account Status</p>

                <p className="text-green-400">
                  Active since {user.activeSince}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
