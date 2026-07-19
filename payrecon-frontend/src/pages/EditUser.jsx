import Button from "../components/common/Button";
import PageHeader from "../components/admin/editUser/PageHeader"
import UserProfileCard from "../components/admin/editUser/UserProfileCard";
import UserDetailsForm from "../components/admin/editUser/UserDetailForm";

import { ArrowLeft } from "lucide-react";

const EditUser = () => {
  return (
    <div className="p-8">
      <PageHeader
        title="Edit User"
        description="Update user information and manage role permissions."
        action={
          <Button variant="secondary">
            <div className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Users
            </div>
          </Button>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <UserProfileCard />
        </div>

        <div className="col-span-8">
          <UserDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
