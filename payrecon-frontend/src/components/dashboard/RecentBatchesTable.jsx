import RecentBatchRow from "./RecentBatchRow";
import { recentBatches } from "../../constants/recentBatches";

function RecentBatchesTable() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#243041]">
        <div>
          <h2 className="text-xl font-semibold text-white">Recent Batches</h2>

          <p className="text-sm text-gray-400 mt-1">
            Latest reconciliation batches
          </p>
        </div>

        <button className="text-[#4F6BFF] hover:text-blue-400 text-sm font-medium">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#111827] border-b border-[#243041]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Batch ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Created Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Transactions
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Progress
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {recentBatches.map((batch) => (
              <RecentBatchRow key={batch.id} batch={batch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentBatchesTable;
