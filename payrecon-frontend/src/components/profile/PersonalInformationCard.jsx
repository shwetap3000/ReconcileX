import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/profileApi";
import ProfileInfoItem from "./ProfileInfoItem";

const PersonalInformationCard = ({ user }) => {
  const { setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
    });

    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setIsSaving(true);

      const data = await updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
      });

      setUser((previousUser) => ({
        ...previousUser,
        ...data.user,
      }));

      setIsEditing(false);

      toast.success(data.message || "Profile updated successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h3 className="font-semibold text-white">Personal Information</h3>

          <p className="mt-1 text-xs text-slate-500">
            Your personal and contact details.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm text-slate-400"
            >
              Full Name
            </label>

            <input
              id="profile-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="profile-email"
              className="mb-2 block text-sm text-slate-400"
            >
              Email Address
            </label>

            <input
              id="profile-email"
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-500"
            />

            <p className="mt-1.5 text-xs text-slate-600">
              Email address cannot be changed from your profile.
            </p>
          </div>

          <div>
            <label
              htmlFor="profile-phone"
              className="mb-2 block text-sm text-slate-400"
            >
              Phone Number
            </label>

            <input
              id="profile-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <div className="px-5">
          <ProfileInfoItem label="Full Name" value={user?.name} />

          <ProfileInfoItem label="Email Address" value={user?.email} />

          <ProfileInfoItem label="Phone Number" value={user?.phone} />

          <ProfileInfoItem label="Role" value={user?.role} />
        </div>
      )}
    </div>
  );
};

export default PersonalInformationCard;
