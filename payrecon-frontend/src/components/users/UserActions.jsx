import { Eye, Pencil } from "lucide-react";

function UserActions({ user }) {
  return (
    <div className="flex items-center justify-end gap-3">
      <button className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#182233] transition">
        <Eye size={18} />
      </button>

      <button className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#182233] transition">
        <Pencil size={18} />
      </button>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={user.status === "ACTIVE"}
          readOnly
          className="sr-only peer"
        />

        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-[#4F6BFF] transition"></div>

        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
}

export default UserActions;
