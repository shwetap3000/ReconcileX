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

const PersonalInformationCard = () => {
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
        <ProfileInfoItem icon={User} label="Full Name" value="Ritika Sharma" />

        <ProfileInfoItem
          icon={Mail}
          label="Email Address"
          value="ritika.sharma@reconcileix.com"
        />

        <ProfileInfoItem
          icon={Phone}
          label="Phone Number"
          value="+91 98765 43210"
        />

        <ProfileInfoItem
          icon={Building2}
          label="Department"
          value="Finance & Accounts"
        />

        <ProfileInfoItem
          icon={Briefcase}
          label="Designation"
          value="Senior Reconciliation Analyst"
        />

        <ProfileInfoItem icon={Badge} label="Employee ID" value="EMP10001" />
      </div>
    </CreateUserCard>
  );
};

export default PersonalInformationCard;
