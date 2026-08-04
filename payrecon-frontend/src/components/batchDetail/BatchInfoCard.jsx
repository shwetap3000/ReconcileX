import StatusBadge from "./StatusBadge";

function BatchInfoCard({ batch }) {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6">
      <h2 className="text-3xl font-semibold mb-6">1. Batch Information</h2>

      <div className="border border-[#243041] rounded-xl overflow-hidden">
        {/* Row 1 */}

        <div className="grid grid-cols-2 border-b border-[#243041]">
          <div className="grid grid-cols-2">
            <div className="px-6 py-5 border-r border-[#243041] text-gray-400">
              Batch Name
            </div>

            <div className="px-6 py-5">{batch.batchName}</div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-6 py-5 border-r border-l border-[#243041] text-gray-400">
              Created Date
            </div>

            <div className="px-6 py-5">
              {new Date(batch.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Row 2 */}

        <div className="grid grid-cols-2 border-b border-[#243041]">
          <div className="grid grid-cols-2">
            <div className="px-6 py-5 border-r border-[#243041] text-gray-400">
              Batch ID
            </div>

            <div className="px-6 py-5">{batch.batchId}</div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-6 py-5 border-r border-l border-[#243041] text-gray-400">
              Last Updated
            </div>

            <div className="px-6 py-5">
              {new Date(batch.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Row 3 */}

        <div className="grid grid-cols-2 border-b border-[#243041]">
          <div className="grid grid-cols-2">
            <div className="px-6 py-5 border-r border-[#243041] text-gray-400">
              Created By
            </div>

            <div className="px-6 py-5">{batch.createdByName}</div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-6 py-5 border-r border-l border-[#243041] text-gray-400">
              Status
            </div>

            <div className="px-6 py-5">
              <StatusBadge status={batch.status} />
            </div>
          </div>
        </div>

        {/* Description */}

        <div className="grid grid-cols-4">
          <div className="px-6 py-5 border-r border-[#243041] text-gray-400">
            Remarks
          </div>

          <div className="px-6 py-5 col-span-3">{batch.remarks || "-"}</div>
        </div>
      </div>
    </div>
  );
}

export default BatchInfoCard;
