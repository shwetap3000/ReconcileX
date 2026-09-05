import { useEffect, useState } from "react";
import BatchRow from "./BatchRow";
import BatchToolbar from "./BatchToolbar";
import { getBatches } from "../../api/batchApi";

function BatchTable() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const fetchBatches = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBatches(page, 10, statusFilter, search);

      if (response.success) {
        setBatches(response.batches);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      console.error("Error fetching batches:", err);

      setError(err.response?.data?.message || "Failed to load batches.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever page, status or search changes
  useEffect(() => {
    fetchBatches();
  }, [page, statusFilter, search]);

  // Status filter changed
  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  // Search changed
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-visible">
      {/* Header */}

      <div className="flex justify-between items-center px-6 py-4 border-b border-[#243041]">
        <div>
          <h2 className="text-xl font-semibold">All Batches</h2>

          <p className="text-gray-400 text-sm mt-1">
            Manage and track all batches
          </p>
        </div>

        <BatchToolbar
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
          search={search}
          onSearchChange={handleSearchChange}
          refreshBatches={fetchBatches}
        />
      </div>

      {/* Loading */}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400 text-lg">Loading batches...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto overflow-y-visible">
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
                {batches.length > 0 ? (
                  batches.map((batch) => (
                    <BatchRow key={batch._id} batch={batch} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400">
                      {search
                        ? `No batches found for "${search}".`
                        : "No batches found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-[#243041]">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-lg border border-[#243041] disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-gray-300">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-lg border border-[#243041] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BatchTable;
