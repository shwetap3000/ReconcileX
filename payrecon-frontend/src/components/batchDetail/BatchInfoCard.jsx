import StatusBadge from "./StatusBadge";

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString();
}

function BatchInfoCard({ batch }) {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">1. Batch Information</h2>

      <div className="border border-[#243041] rounded-lg overflow-hidden text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#243041]">
          <div className="grid grid-cols-2">
            <div className="px-4 py-3 text-gray-400 border-r border-[#243041]">
              Batch Name
            </div>

            <div className="px-4 py-3 text-white">
              {batch?.batchName || "-"}
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-4 py-3 text-gray-400 border-r border-l border-[#243041]">
              Created Date
            </div>

            <div className="px-4 py-3">{formatDate(batch?.createdAt)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#243041]">
          <div className="grid grid-cols-2">
            <div className="px-4 py-3 text-gray-400 border-r border-[#243041]">
              Batch ID
            </div>

            <div className="px-4 py-3">{batch?.batchId || "-"}</div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-4 py-3 text-gray-400 border-r border-l border-[#243041]">
              Last Updated
            </div>

            <div className="px-4 py-3">{formatDate(batch?.updatedAt)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#243041]">
          <div className="grid grid-cols-2">
            <div className="px-4 py-3 text-gray-400 border-r border-[#243041]">
              Created By
            </div>

            <div className="px-4 py-3">{batch?.createdByName || "-"}</div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-4 py-3 text-gray-400 border-r border-l border-[#243041]">
              Status
            </div>

            <div className="px-4 py-3">
              <StatusBadge status={batch?.status} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-4 py-3 text-gray-400 border-r border-[#243041]">
            Remarks
          </div>

          <div className="px-4 py-3 md:col-span-3">{batch?.remarks || "-"}</div>
        </div>
      </div>
    </div>
  );
}

export default BatchInfoCard;
