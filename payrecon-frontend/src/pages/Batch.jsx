import { useState } from "react";
import { X, Plus } from "lucide-react";

import BatchStats from "../components/batch/BatchStats";
import BatchTable from "../components/batch/BatchTable";
import CustomDateButton from "../components/common/CustomDateButton";
import DateRangeDropdown from "../components/common/DaysDropdown";
import Navbar from "../components/layout/Navbar";

import { createBatch } from "../api/batchApi";

function Batches() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [batchName, setBatchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Tells BatchTable to refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateBatch = async (e) => {
    e.preventDefault();

    const trimmedName = batchName.trim();

    if (!trimmedName) {
      setError("Batch name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await createBatch({
        batchName: trimmedName,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to create batch");
      }

      // Close modal
      setShowCreateModal(false);

      // Clear form
      setBatchName("");
      setError("");

      // Tell BatchTable to fetch fresh data
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Create batch error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create batch",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (loading) return;

    setShowCreateModal(false);
    setBatchName("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <Navbar
        title="Batches"
        subtitle="Manage and track reconciliation batches."
        actions={
          <>
            <DateRangeDropdown />
            <CustomDateButton />
          </>
        }
      />

      <BatchStats />

      <BatchTable
        refreshTrigger={refreshTrigger}
        onCreateBatch={() => setShowCreateModal(true)}
      />

      {/* CREATE BATCH MODAL */}

      {showCreateModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#243041] bg-[#141C28] shadow-2xl">
            {/* Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#243041]">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Create New Batch
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Create a batch before uploading files.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={loading}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1B2535] transition disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

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
                    setError("");
                  }}
                  placeholder="e.g. September Reconciliation"
                  disabled={loading}
                  autoFocus
                  className="w-full h-12 px-4 rounded-xl border border-[#243041] bg-[#0F1622] text-white placeholder-gray-500 outline-none focus:border-[#4F6BFF] transition"
                />

                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
              </div>

              {/* Footer */}

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#243041]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl border border-[#243041] text-gray-300 hover:bg-[#1B2535] hover:text-white transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !batchName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#4F6BFF] hover:bg-[#3F5AF5] text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
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
    </div>
  );
}

export default Batches;
