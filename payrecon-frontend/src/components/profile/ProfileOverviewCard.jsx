import { Building2, Badge, CalendarDays, Camera } from "lucide-react";

import CreateUserCard from "../common/CreateuserCard";

const ProfileOverviewCard = () => {
  return (
    <CreateUserCard className="p-8">
      <div className="flex items-center justify-between">
        {/* Left Section */}

        <div className="flex items-center gap-8">
          {/* Avatar */}

          <div className="relative">
            <img
              src="https://i.pravatar.cc/200?img=32"
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-2 border-slate-700"
            />

            <button className="absolute bottom-1 right-1 rounded-full bg-blue-600 p-2 hover:bg-blue-500 transition">
              <Camera size={18} className="text-white" />
            </button>
          </div>

          {/* User Info */}

          <div>
            <h2 className="text-4xl font-semibold text-white">Ritika Sharma</h2>

            <span className="mt-3 inline-flex rounded-full bg-blue-600/20 px-4 py-1 text-blue-400">
              Admin
            </span>
          </div>
        </div>

        {/* Right Section */}

        <div className="flex gap-16">
          <div className="flex items-center gap-3">
            <Building2 className="text-slate-400" size={22} />

            <div>
              <p className="text-lg text-white">Finance & Accounts</p>

              <p className="text-slate-500">Department</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="text-slate-400" size={22} />

            <div>
              <p className="text-lg text-white">EMP10001</p>

              <p className="text-slate-500">Employee ID</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="text-slate-400" size={22} />

            <div>
              <p className="text-lg text-white">Jan 10, 2026</p>

              <p className="text-slate-500">Joined Date</p>
            </div>
          </div>
        </div>
      </div>
    </CreateUserCard>
  );
};

export default ProfileOverviewCard;
