import { useEffect, useState } from "react";
import ReconciliationRow from "./ReconciliationRow";
import ReconciliationToolbar from "./ReconciliationToolbar";
import { getReconciliationBatches } from "../../api/reconciliationApi";
import BatchToolbar from "../batch/BatchToolbar";

function ReconciliationTable() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   // Filters
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getReconciliationBatches(1, 10, "ALL", "");

        if (response.success) {
          setBatches(response.batches || []);
        }
      } catch (error) {
        console.error("Failed to fetch reconciliation batches:", error);

        setError("Failed to load reconciliation batches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-[#243041]">
        <div>
          <h2 className="text-xl font-semibold">Reconciliation Batches</h2>

          <p className="text-gray-400 text-sm mt-1">
            Manage all reconciliation batches
          </p>
        </div>

        <ReconciliationToolbar />
        
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
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
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  Loading reconciliation batches...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-red-400">
                  {error}
                </td>
              </tr>
            ) : batches.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No reconciliation batches found.
                </td>
              </tr>
            ) : (
              batches.map((batch) => (
                <ReconciliationRow
                  key={batch._id || batch.batchId}
                  batch={batch}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReconciliationTable;
