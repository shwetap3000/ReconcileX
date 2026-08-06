import { UserColumns } from "./UserColumns";
import UserRow from "./UserRow";
import { usersData } from "../../constants/usersData";
import { ChevronLeft, ChevronRight } from "lucide-react";

function UserTable() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-[#243041]">
        <h2 className="text-xl font-semibold">User Directory</h2>

        <p className="text-gray-400 mt-1">View and manage all system users</p>
      </div>

      <table className="w-full">
        <thead className="bg-[#161F2C] border-b border-[#243041]">
          <tr>
            {UserColumns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-4 text-left text-sm font-medium text-gray-400"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {usersData.map((user) => (
            <UserRow key={user.id} user={user} columns={UserColumns} />
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-5 border-t border-[#243041]">
        <p className="text-sm text-gray-400">
          Showing 1 to {usersData.length} of {usersData.length} users
        </p>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>

          <button className="w-10 h-10 rounded-lg bg-[#4F6BFF] text-white">
            1
          </button>

          <button className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
