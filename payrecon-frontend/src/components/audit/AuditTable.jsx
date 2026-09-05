import { AuditColumns } from "./AuditColumns";
import AuditRow from "./AuditRow";

function AuditTable({
  logs,
  loading,
  page,
  totalPages,
  totalLogs,
  onPageChange,
}) {
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

  const start = (page - 1) * 10 + 1;
  const end = Math.min(start + logs.length - 1, totalLogs);

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
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

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#243041]">
        <p className="text-sm text-gray-400">
          Showing {start} to {end} of {totalLogs} audit logs
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="px-4 py-2 rounded-lg border border-[#243041] text-sm text-gray-300 hover:bg-[#1B2535] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          <span className="px-3 py-2 text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-4 py-2 rounded-lg border border-[#243041] text-sm text-gray-300 hover:bg-[#1B2535] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuditTable;
