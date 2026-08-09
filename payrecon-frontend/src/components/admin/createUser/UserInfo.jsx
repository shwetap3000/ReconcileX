import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  UserCog,
} from "lucide-react";

import { createUser } from "../../../api/userApi";

import CreateUserCard from "../../common/CreateuserCard";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import PasswordField from "../../common/PasswordField";
import Button from "../../common/Button";
import StatusToggle from "./StatusToggle";

const departments = ["Finance", "Operations", "Compliance", "IT"];

const roles = ["ADMIN", "MAKER", "CHECKER"];

const UserInfo = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    username: "",
    password: "",
    role: "",
    isActive: true,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-10);

    setFormData((prev) => ({
      ...prev,
      password,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createUser(formData);

      navigate("/users");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateUserCard>
      <div className="flex items-center gap-3 border-b border-slate-800 p-6">
        <div className="rounded-xl bg-blue-600/20 p-3">
          <User className="text-blue-400" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">User Information</h2>

          <p className="text-sm text-slate-400">
            Fill in the user details below.
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-5">
          <InputField
            label="Employee ID"
            icon={Badge}
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
          />

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

          <SelectField
            label="Role"
            icon={UserCog}
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roles}
          />
        </div>

        <PasswordField
          label="Temporary Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex justify-between items-center">
          <StatusToggle
            active={formData.isActive}
            setActive={(value) =>
              setFormData((prev) => ({
                ...prev,
                isActive: value,
              }))
            }
          />

          <Button variant="outline" type="button" onClick={generatePassword}>
            Generate Password
          </Button>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/users")}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </Button>
        </div>
      </div>
    </CreateUserCard>
  );
};

export default UserInfo;
