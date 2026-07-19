import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Badge,
  Pencil,
} from "lucide-react";

import CreateUserCard from "../common/CreateuserCard";
import Button from "../common/Button";
import ProfileInfoItem from "./ProfileInfoItem";

const PersonalInformationCard = ({ user }) => {
  return (
    <CreateUserCard>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600/20 p-3">
            <User className="text-blue-400" size={22} />
          </div>

          <h2 className="text-2xl font-semibold text-white">
            Personal Information
          </h2>
        </div>

        <Button variant="secondary">
          <div className="flex items-center gap-2">
            <Pencil size={16} />
            Edit Profile
          </div>
        </Button>
      </div>

      {/* Body */}
      <div className="px-6">
        <ProfileInfoItem icon={User} label="Full Name" value={user?.name} />

        <ProfileInfoItem
          icon={Mail}
          label="Email Address"
          value={user?.email}
        />

        <ProfileInfoItem
          icon={Phone}
          label="Phone Number"
          value={user?.phone || "Not Available"}
        />

        <ProfileInfoItem
          icon={Building2}
          label="Department"
          value={user?.department || "Not Assigned"}
        />

        <ProfileInfoItem
          icon={Briefcase}
          label="Designation"
          value={user?.designation || "Not Assigned"}
        />

        <ProfileInfoItem
          icon={Badge}
          label="Employee ID"
          value={user?.employeeId || user?._id?.slice(-6).toUpperCase()}
        />
      </div>
    </CreateUserCard>
  );
};

export default PersonalInformationCard;
