import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RefreshCw,
  Eye,
  Clock3,
  FileCheck2,
  AlertCircle,
} from "lucide-react";

import { getPendingReviewBatches } from "../api/batchApi";

function PendingReview() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchPendingBatches = useCallback(async () => {
    try {
      setError("");

      const response = await getPendingReviewBatches();

      if (!response?.success) {
        throw new Error(response?.message || "Failed to load pending batches.");
      }

      const data = response.batches || response.data || [];

      setBatches(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load pending review batches:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load pending review batches.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingBatches();
  }, [fetchPendingBatches]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPendingBatches();
  };

  const filteredBatches = batches.filter((batch) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    return (
      batch.batchId?.toLowerCase().includes(searchText) ||
      batch.batchName?.toLowerCase().includes(searchText) ||
      batch.createdByName?.toLowerCase().includes(searchText)
    );
  });

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleReview = (batch) => {
    if (!batch?._id) return;

    navigate(`/batch/${batch._id}/review`);
  };

  return (
    <div className="min-h-full bg-[#080F19] text-white">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Reconciliation</span>
              <span>›</span>
              <span className="text-gray-300">Pending Review</span>
            </div>

            <h1 className="text-2xl font-semibold">Pending Review</h1>

            <p className="text-sm text-gray-500 mt-1">
              Review reconciliation batches submitted by Makers.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#26364A] bg-[#111925] px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-[#172130] disabled:opacity-50"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#243041] bg-[#141C28] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <Clock3 size={20} className="text-yellow-400" />
              </div>

              <div>
                <p className="text-sm text-gray-400">Pending Reviews</p>
                <p className="mt-1 text-2xl font-semibold">{batches.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#243041] bg-[#141C28] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <FileCheck2 size={20} className="text-blue-400" />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Ready for Checker Review
                </p>
                <p className="mt-1 text-2xl font-semibold">{batches.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-xl border border-[#243041] bg-[#141C28] overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-[#243041] p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Batches Awaiting Review</h2>

              <p className="text-sm text-gray-500 mt-1">
                These batches have been submitted by Makers.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search batch..."
                className="w-full rounded-lg border border-[#2A3A4E] bg-[#0F1722] py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="m-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle size={17} />
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-16 text-sm text-gray-500">
              Loading pending batches...
            </div>
          ) : filteredBatches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <FileCheck2 size={23} className="text-green-400" />
              </div>

              <p className="mt-4 text-sm font-medium text-gray-300">
                No batches pending review
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Submitted batches will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-[#243041] bg-[#101823]">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Batch ID
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Batch Name
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Submitted By
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Submitted Date
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                      Transactions
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBatches.map((batch) => (
                    <tr
                      key={batch._id}
                      className="border-b border-[#243041] last:border-b-0 hover:bg-[#18212D] transition"
                    >
                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-white">
                          {batch.batchId || "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-200">
                          {batch.batchName || "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-400">
                          {batch.createdByName || "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-400">
                          {formatDate(batch.submittedAt || batch.updatedAt)}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-medium text-white">
                          {batch.totalLedgerTransactions ??
                            batch.totalTransactions ??
                            0}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          SUBMITTED
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleReview(batch)}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#304157] bg-[#111925] px-3 py-2 text-sm font-medium text-gray-200 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
                        >
                          <Eye size={16} />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredBatches.length > 0 && (
            <div className="border-t border-[#243041] px-4 py-3 text-xs text-gray-500">
              Showing {filteredBatches.length} of {batches.length} pending
              batches
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingReview;
