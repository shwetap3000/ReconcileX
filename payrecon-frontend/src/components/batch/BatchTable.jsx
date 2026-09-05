import { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";

import BatchRow from "./BatchRow";
import BatchToolbar from "./BatchToolbar";
import { getBatches, createBatch } from "../../api/batchApi";

function BatchTable({ refreshTrigger, onCreateBatch }) {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create batch modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

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
        setBatches(response.batches || []);
        setTotalPages(response.totalPages || 1);
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
  }, [page, statusFilter, search, refreshTrigger]);

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

  // Open create modal
  const handleOpenCreateModal = () => {
    setBatchName("");
    setCreateError("");
    setShowCreateModal(true);
  };

  // Close create modal
  const handleCloseCreateModal = () => {
    if (creating) return;

    setShowCreateModal(false);
    setBatchName("");
    setCreateError("");
  };

  // Create batch
  const handleCreateBatch = async (e) => {
    e.preventDefault();

    const trimmedName = batchName.trim();

    if (!trimmedName) {
      setCreateError("Batch name is required.");
      return;
    }

    try {
      setCreating(true);
      setCreateError("");

      const response = await createBatch({
        batchName: trimmedName,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to create batch.");
      }

      // Close modal
      setShowCreateModal(false);
      setBatchName("");

      // Go to first page so newly created batch is visible
      setPage(1);

      // Refresh table immediately
      await fetchBatches();
    } catch (err) {
      console.error("Create batch error:", err);

      setCreateError(
        err.response?.data?.message || err.message || "Failed to create batch.",
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
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
            onCreateBatch={onCreateBatch}
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
                      <td
                        colSpan={7}
                        className="text-center py-12 text-gray-400"
                      >
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

      {/* CREATE BATCH MODAL */}

      {showCreateModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseCreateModal();
            }
          }}
        >
          <div className="w-full max-w-md bg-[#141C28] border border-[#243041] rounded-2xl shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#243041]">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Create New Batch
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Enter a name for the reconciliation batch.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseCreateModal}
                disabled={creating}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1B2535] transition disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}

            <form onSubmit={handleCreateBatch}>
              <div className="px-6 py-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Batch Name
                </label>

                <input
                  type="text"
                  value={batchName}
                  onChange={(e) => {
                    setBatchName(e.target.value);
                    setCreateError("");
                  }}
                  placeholder="e.g. September Reconciliation"
                  autoFocus
                  disabled={creating}
                  className="w-full h-12 px-4 rounded-xl bg-[#0F1622] border border-[#243041] text-white placeholder-gray-500 outline-none focus:border-[#4F6BFF] transition"
                />

                {createError && (
                  <p className="mt-2 text-sm text-red-400">{createError}</p>
                )}
              </div>

              {/* Modal Footer */}

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#243041]">
                <button
                  type="button"
                  onClick={handleCloseCreateModal}
                  disabled={creating}
                  className="px-5 py-2.5 rounded-xl border border-[#243041] text-gray-300 hover:bg-[#1B2535] hover:text-white transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating || !batchName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#4F6BFF] hover:bg-[#3F5AF5] text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {creating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Create Batch
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BatchTable;
