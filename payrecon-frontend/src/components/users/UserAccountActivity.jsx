import React from "react";
import {
  Activity,
  FolderKanban,
  CheckCircle2,
  XCircle,
  Clock,
  KeyRound,
} from "lucide-react";

const UserAccountActivity = ({ user }) => {
  const activities = [
    {
      icon: <FolderKanban size={18} className="text-blue-400" />,
      label: "Total Batches",
      value: user.totalBatches,
    },
    {
      icon: <CheckCircle2 size={18} className="text-green-400" />,
      label: "Total Approvals",
      value: user.totalApprovals,
    },
    {
      icon: <XCircle size={18} className="text-red-400" />,
      label: "Total Rejections",
      value: user.totalRejections,
    },
    {
      icon: <Activity size={18} className="text-purple-400" />,
      label: "Last Activity",
      value: user.lastActivity,
    },
    {
      icon: <KeyRound size={18} className="text-yellow-400" />,
      label: "Password Changed",
      value: user.passwordChangedAt,
    },
    {
      icon: <Clock size={18} className="text-cyan-400" />,
      label: "Recent Login",
      value: user.lastLogin,
    },
  ];

  return (
    <div className="bg-[#141C2F] border border-gray-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-white" size={22} />
        <h2 className="text-2xl font-semibold text-white">Account Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-800 pb-4 last:border-none"
          >
            <div className="flex items-center gap-3">
              {item.icon}

              <div>
                <p className="text-sm text-gray-400">{item.label}</p>

                <p className="text-white font-medium">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAccountActivity;
