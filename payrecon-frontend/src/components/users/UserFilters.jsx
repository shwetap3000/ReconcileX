import { Search, UserPlus } from "lucide-react";

function UserFilters() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              className="w-80 h-11 bg-[#182233] border border-[#243041] rounded-xl pl-11 pr-4 outline-none"
            />
          </div>

          <select className="h-11 bg-[#182233] border border-[#243041] rounded-xl px-4">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Maker</option>
            <option>Checker</option>
          </select>

          <select className="h-11 bg-[#182233] border border-[#243041] rounded-xl px-4">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button className="flex items-center gap-2 bg-[#4F6BFF] px-5 h-11 rounded-xl font-medium hover:bg-[#3D5AF1] transition">
          <UserPlus size={18} />
          Create User
        </button>
      </div>
    </div>
  );
}

export default UserFilters;
