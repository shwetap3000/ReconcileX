import React from "react";
import {
  UserPlus,
  LogIn,
  FolderKanban,
  CheckCircle2,
  XCircle,
  KeyRound,
} from "lucide-react";

const iconMap = {
  CREATE_USER: <UserPlus size={18} className="text-green-400" />,
  LOGIN: <LogIn size={18} className="text-blue-400" />,
  CREATE_BATCH: <FolderKanban size={18} className="text-purple-400" />,
  APPROVE_BATCH: <CheckCircle2 size={18} className="text-green-400" />,
  REJECT_BATCH: <XCircle size={18} className="text-red-400" />,
  PASSWORD_CHANGE: <KeyRound size={18} className="text-yellow-400" />,
};

const UserRecentActivity = ({ activities = [] }) => {
  return (
    <div className="bg-[#141C2F] border border-gray-800 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No recent activity available.
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 border-b border-gray-800 pb-5 last:border-none"
            >
              <div className="mt-1">{iconMap[activity.type]}</div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-white font-semibold">
                      {activity.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {activity.description}
                    </p>
                  </div>

                  <span className="text-xs text-gray-500">{activity.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecentActivity;
