import { useRef, useState } from "react";
import { uploadProfilePicture } from "../../api/profileApi";
import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

const ProfilePictureUpload = ({ user }) => {
  const { setUser } = useAuth();

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const profilePictureUrl = user?.profilePicture
    ? `${backendUrl}${user.profilePicture}`
    : null;

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Profile picture must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a profile picture.");
      return;
    }

    try {
      setUploading(true);

      const data = await uploadProfilePicture(selectedFile);

      setUser((currentUser) => ({
        ...currentUser,
        profilePicture: data.profilePicture,
      }));

      toast.success(data.message || "Profile picture updated successfully.");

      setSelectedFile(null);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:items-start">
      {/* Avatar */}
      {preview || profilePictureUrl ? (
        <img
          src={preview || profilePictureUrl}
          alt={`${user?.name || "User"} profile`}
          className="h-24 w-24 rounded-full object-cover ring-2 ring-slate-700"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-semibold text-white ring-2 ring-slate-700">
          {initial}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Select */}
      {!selectedFile && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Change Photo
        </button>
      )}

      {/* Upload / Cancel */}
      {selectedFile && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={uploading}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}

      <p className="text-xs text-slate-500">JPG, PNG or WEBP. Maximum 5 MB.</p>
    </div>
  );
};

export default ProfilePictureUpload;
