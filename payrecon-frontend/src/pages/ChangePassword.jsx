import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { changePassword } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function ChangePassword() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields.");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const data = await changePassword(formData);

      toast.success(data.message);

      setUser({
        ...user,
        mustChangePassword: false,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to change password.",
      );

      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-[#081222] p-10 shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center">
            <ShieldCheck size={36} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-center text-3xl font-bold text-white">
          Change Your Password
        </h1>

        <p className="mt-3 text-center text-slate-400 leading-relaxed">
          This is your first login.
          <br />
          Please change your temporary password before accessing the system.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* Current Password */}
          <div>
            <label className="text-white block mb-2">Current Password</label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input
                type={show.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-slate-700 bg-[#020817] py-4 pl-12 pr-12 text-white outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => togglePassword("current")}
                className="absolute right-4 top-4 text-slate-500"
              >
                {show.current ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-white block mb-2">New Password</label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input
                type={show.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-slate-700 bg-[#020817] py-4 pl-12 pr-12 text-white outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => togglePassword("new")}
                className="absolute right-4 top-4 text-slate-500"
              >
                {show.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-white block mb-2">Confirm Password</label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-700 bg-[#020817] py-4 pl-12 pr-12 text-white outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="absolute right-4 top-4 text-slate-500"
              >
                {show.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="rounded-xl border border-blue-900 bg-blue-950/30 p-4">
            <h3 className="text-blue-300 font-semibold mb-2">
              Password Requirements
            </h3>

            <ul className="text-sm text-slate-300 space-y-1">
              <li>• At least 8 characters</li>
              <li>• One uppercase letter</li>
              <li>• One lowercase letter</li>
              <li>• One number</li>
              <li>• One special character</li>
            </ul>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Updating Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
