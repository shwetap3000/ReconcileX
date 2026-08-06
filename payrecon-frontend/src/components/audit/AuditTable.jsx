import { AuditColumns } from "./AuditColumns";
import AuditRow from "./AuditRow";

function AuditTable({ logs, loading }) {
  if (loading) {
    return (
      <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-10 text-center text-gray-400">
        Loading audit logs...
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-10 text-center text-gray-400">
        No audit logs found.
      </div>
    );
  }

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#161F2C] border-b border-[#243041]">
          <tr>
            {AuditColumns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-5 text-left text-sm font-medium text-gray-400"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {logs.map((row) => (
            <AuditRow key={row._id} row={row} columns={AuditColumns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditTable;
