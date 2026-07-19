import {
  Building2,
  Badge,
  Clock3,
  CalendarDays,
  User,
  Pencil,
} from "lucide-react";

import CreateUserCard from "../../common/CreateuserCard";
import ProfileInfoRow from "../editUser/ProfileInfoRow";

const UserProfileCard = () => {
  return (
    <CreateUserCard className="p-8">
      {/* Profile Image */}

      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/200"
            alt="User"
            className="h-36 w-36 rounded-full object-cover"
          />

          <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-3 shadow-lg">
            <Pencil size={16} className="text-white" />
          </button>
        </div>

        <h2 className="mt-6 text-4xl font-semibold text-white">Rahul Mehta</h2>

        <div className="mt-2 flex items-center gap-3">
          <span className="rounded-lg bg-slate-800 px-3 py-1 text-slate-300">
            EMP10024
          </span>

          <button className="text-slate-400 hover:text-white">📋</button>
        </div>
      </div>

      {/* Badges */}

      <div className="mt-8 flex justify-center gap-4">
        <span className="rounded-full border border-blue-500 bg-blue-500/10 px-5 py-2 text-blue-400">
          Maker
        </span>

        <span className="rounded-full border border-green-500 bg-green-500/10 px-5 py-2 text-green-400">
          Active
        </span>
      </div>

      {/* Divider */}

      <div className="my-8 border-t border-slate-800"></div>

      {/* Information */}

      <div>
        <ProfileInfoRow
          icon={Building2}
          label="Department"
          value="Finance & Accounts"
        />

        <ProfileInfoRow icon={Badge} label="Employee ID" value="EMP10024" />

        <ProfileInfoRow icon={Clock3} label="Last Login" value="May 24, 2026" />

        <ProfileInfoRow
          icon={CalendarDays}
          label="Created On"
          value="Jan 10, 2026"
        />
      </div>
    </CreateUserCard>
  );
};

export default UserProfileCard;
