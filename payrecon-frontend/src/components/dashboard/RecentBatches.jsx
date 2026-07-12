import BatchTable from "./BatchTable";

const RecentBatches = () => {
  return (
    <div className="mt-5 bg-[#141c2f] border border-[#232d45] rounded-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#232d45]">
        <h2 className="text-white text-lg font-semibold">
          Recent Reconciliation Batches
        </h2>

        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm text-white">
          View All
        </button>
      </div>

      {/* Table */}
      <BatchTable />

    </div>
  );
};

export default RecentBatches;