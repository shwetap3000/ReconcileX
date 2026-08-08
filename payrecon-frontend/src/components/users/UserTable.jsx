import { ChevronLeft, ChevronRight } from "lucide-react";

import { UserColumns } from "./UserColumns";
import UserRow from "./UserRow";

function UserTable({ users, loading, refreshUsers }) {
  return (
    <div className="bg-[#0F1723] rounded-2xl border border-[#243041] overflow-hidden">
      <div className="px-6 py-5 border-b border-[#243041]">
        <h2 className="text-xl font-semibold text-white">User Directory</h2>

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
          {loading ? (
            <tr>
              <td
                colSpan={UserColumns.length}
                className="py-10 text-center text-gray-400"
              >
                Loading users...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td
                colSpan={UserColumns.length}
                className="py-10 text-center text-gray-400"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                columns={UserColumns}
                refreshUsers={refreshUsers}
              />
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-5 border-t border-[#243041]">
        <p className="text-sm text-gray-400">
          Showing {users.length} user{users.length !== 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled
            className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center opacity-50 cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          <button className="w-10 h-10 rounded-lg bg-[#4F6BFF] text-white">
            1
          </button>

          <button
            disabled
            className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center opacity-50 cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
