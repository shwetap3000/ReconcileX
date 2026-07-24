import { useState } from "react";
import toast from "react-hot-toast";

import { changePassword } from "../../api/authApi";

const SecurityCard = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    setIsChangingPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("All password fields are required.");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      setIsSaving(true);

      const data = await changePassword(formData);

      toast.success(data.message || "Password changed successfully.");

      resetForm();
      setIsChangingPassword(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to change password.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60">
      <div className="border-b border-slate-800 px-5 py-4">
        <h3 className="font-semibold text-white">Security</h3>

        <p className="mt-1 text-xs text-slate-500">
          Manage your account security.
        </p>
      </div>

      {!isChangingPassword ? (
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-200">Password</p>

            <p className="mt-1 text-xs text-slate-500">
              Keep your password strong and secure.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsChangingPassword(true)}
            className="shrink-0 rounded-lg border border-blue-500/40 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/10"
          >
            Change Password
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const PasswordInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-slate-400">
        {label}
      </label>

      <input
        id={name}
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
      />
    </div>
  );
};

export default SecurityCard;
