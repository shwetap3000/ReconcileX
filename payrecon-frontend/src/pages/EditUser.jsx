import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Button from "../components/common/Button";
import PageHeader from "../components/admin/editUser/PageHeader";
import UserProfileCard from "../components/admin/editUser/UserProfileCard";
import UserDetailsForm from "../components/admin/editUser/UserDetailForm";

import { getUserById } from "../api/userApi";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const response = await getUserById(id);

      if (response.success) {
        setUser(response.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-white">
        Loading user...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-red-400">
        User not found.
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit User"
        description="Update user information and manage role permissions."
        action={
          <Button variant="secondary" onClick={() => navigate(`/users/${id}`)}>
            <ArrowLeft size={18} />
            Back to User
          </Button>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <UserProfileCard user={user} />
        </div>

        <div className="col-span-8">
          <UserDetailsForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
