import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUserStatus } from "../../api/userApi";

function UserActions({ user, refreshUsers }) {
  const navigate = useNavigate();

  const handleStatusToggle = async (e) => {
    e.stopPropagation();

    try {
      await updateUserStatus(user._id, !user.isActive);

      if (refreshUsers) {
        refreshUsers();
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const handleView = (e) => {
    e.stopPropagation();
    navigate(`/users/${user._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();

    // We'll connect this when we integrate the Edit User page
    navigate(`/users/edit/${user._id}`);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleView}
        className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#182233] transition"
      >
        <Eye size={18} />
      </button>

      <button
        onClick={handleEdit}
        className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#182233] transition"
      >
        <Pencil size={18} />
      </button>

      <label
        className="relative inline-flex items-center cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={user.isActive}
          onChange={handleStatusToggle}
          className="sr-only peer"
        />

        <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-[#4F6BFF] transition"></div>

        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
}

export default UserActions;
