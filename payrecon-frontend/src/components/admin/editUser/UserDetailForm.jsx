import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { User, Mail, Phone, Building2, Briefcase, UserCog } from "lucide-react";

import CreateUserCard from "../../common/CreateUserCard";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import StatusToggle from "../createUser/StatusToggle";
import Button from "../../common/Button";

import { updateUser } from "../../../api/userApi";

const departments = ["Finance & Accounts", "Operations", "Compliance", "IT"];

const roles = ["ADMIN", "MAKER", "CHECKER", "APPROVER", "AUDITOR"];

const UserDetailsForm = ({ user }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    username: "",
    role: "",
    isActive: true,
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      department: user.department || "",
      designation: user.designation || "",
      username: user.username || "",
      role: user.role || "",
      isActive: user.isActive,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      isActive: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await updateUser(user._id, formData);

      alert(response.message);

      navigate(`/users/${user._id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateUserCard>
      <div className="grid grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          icon={User}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputField
          label="Email Address"
          icon={Mail}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          label="Phone Number"
          icon={Phone}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <SelectField
          label="Department"
          icon={Building2}
          name="department"
          value={formData.department}
          onChange={handleChange}
          options={departments}
        />

        <InputField
          label="Designation"
          icon={Briefcase}
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />

        <InputField
          label="Username"
          icon={UserCog}
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <SelectField
          label="Role"
          icon={UserCog}
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={roles}
        />
      </div>

      <div className="mt-8">
        <StatusToggle
          active={formData.isActive}
          onChange={handleStatusChange}
        />
      </div>

      <div className="mt-10 border-t border-slate-800 pt-8">
        <div className="flex justify-end gap-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>

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
