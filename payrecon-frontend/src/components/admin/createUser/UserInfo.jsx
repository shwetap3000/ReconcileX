import {
  Badge,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  UserCog,
} from "lucide-react";

import CreateUserCard from "../../common/CreateuserCard";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PasswordField from "../../common/PasswordField";
import Button from "../../common/Button";
import StatusToggle from "./StatusToggle";

const departments = [
  "Finance",
  "Operations",
  "Compliance",
  "IT",
];

const roles = [
  "Admin",
  "Maker",
  "Checker",
  "Approver",
  "Auditor",
];

const UserInfo = () => {
  return (
    <CreateUserCard>

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 p-6">

        <div className="rounded-xl bg-blue-600/20 p-3">
          <User className="text-blue-400" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            User Information
          </h2>

          <p className="text-sm text-slate-400">
            Fill in the user details below.
          </p>
        </div>

      </div>

      {/* Body */}

      <div className="space-y-6 p-6">

        <div className="grid grid-cols-2 gap-5">

          <InputField
            label="Employee ID"
            placeholder="EMP001"
            icon={Badge}
          />

          <InputField
            label="Full Name"
            placeholder="John Doe"
            icon={User}
          />

          <InputField
            label="Email Address"
            placeholder="john@example.com"
            icon={Mail}
          />

          <InputField
            label="Phone Number"
            placeholder="+91 9876543210"
            icon={Phone}
          />

          <SelectField
            label="Department"
            icon={Building2}
            options={departments}
          />

          <InputField
            label="Designation"
            placeholder="Manager"
            icon={Briefcase}
          />

          <InputField
            label="Username"
            placeholder="john.doe"
            icon={UserCog}
          />

          <SelectField
            label="Role"
            icon={UserCog}
            options={roles}
          />

        </div>

        <PasswordField
          label="Temporary Password"
        />

        <div className="flex justify-between items-center">

          <StatusToggle />

          <Button variant="outline">
            Generate Password
          </Button>

        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">

          <Button variant="secondary">
            Cancel
          </Button>

          <Button>
            Create User
          </Button>

        </div>

      </div>

    </CreateUserCard>
  );
};

export default UserInfo;