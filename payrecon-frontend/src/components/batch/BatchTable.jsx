import BatchRow from "./BatchRow";
import BatchToolbar from "./BatchToolbar";
import { batchData } from "../../constants/batchData";

function BatchTable() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b border-[#243041]">
        <div>
          <h2 className="text-xl font-semibold">All Batches</h2>

          <p className="text-gray-400 text-sm mt-1">
            Manage and track reconciliation batches
          </p>
        </div>

        <BatchToolbar />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#111827] border-b border-[#243041]">
            <tr>
              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Batch ID
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Batch Name
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Created By
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Created Date
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Transactions
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs uppercase text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {batchData.map((batch) => (
              <BatchRow key={batch.batchId} batch={batch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BatchTable;
