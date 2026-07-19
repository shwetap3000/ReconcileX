import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  UserCog,
  ArrowLeft,
  Lock,
  UserX,
} from "lucide-react";

import CreateUserCard from "../../common/CreateUserCard";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import StatusToggle from "../createUser/StatusToggle";
import Button from "../../common/Button";

const departments = ["Finance & Accounts", "Operations", "Compliance", "IT"];

const roles = ["Admin", "Maker", "Checker", "Approver", "Auditor"];

const UserDetailsForm = () => {
  return (
    <CreateUserCard className="p-8">
      <div className="grid grid-cols-2 gap-6">
        <InputField label="Full Name" placeholder="Rahul Mehta" icon={User} />

        <InputField
          label="Email Address"
          placeholder="rahul.mehta@reconcilex.com"
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
          placeholder="Senior Reconciliation Analyst"
          icon={Briefcase}
        />

        <InputField label="Username" placeholder="rahul.mehta" icon={UserCog} />
      </div>

      <div className="mt-6">
        <SelectField label="Role" icon={UserCog} options={roles} />
      </div>

      <div className="mt-8">
        <StatusToggle />
      </div>

      <div className="mt-10 border-t border-slate-800 pt-8">
        <div className="flex justify-end gap-4">
          <Button>Save Changes</Button>

          <Button variant="secondary">Reset Password</Button>

          <Button className="border border-red-500 text-red-400 hover:bg-red-500/10">
            Deactivate User
          </Button>
        </div>
      </div>
    </CreateUserCard>
  );
};

export default UserDetailsForm;
