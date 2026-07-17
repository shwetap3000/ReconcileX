import ReconciliationRow from "./ReconciliationRow";
import { reconciliationData } from "../../constants/reconciliationBatch";
import ReconciliationToolbar from "./ReconciliationToolbar";

function ReconciliationTable() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center px-6 py-5 border-b border-[#243041]">
        <div>
          <h2 className="text-xl font-semibold">Reconciliation Batches</h2>

          <p className="text-gray-400 text-sm mt-1">
            Manage all reconciliation batches
          </p>
        </div>

        <ReconciliationToolbar />
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
                Created
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Transactions
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Matched
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Exceptions
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
            {reconciliationData.map((batch) => (
              <ReconciliationRow key={batch.id} batch={batch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReconciliationTable;
