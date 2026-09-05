import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function BatchDetailHeader({ batch }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            w-9 h-9 shrink-0
            rounded-lg
            border border-[#243041]
            bg-[#141C28]
            flex items-center justify-center
            hover:bg-[#1B2535]
            transition
          "
        >
          <ArrowLeft size={17} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold text-white truncate">
              {batch?.batchName || "Batch"}
            </h1>

            <StatusBadge status={batch?.status} />
          </div>

          <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
            <span>
              Batch ID:
              <span className="text-gray-200 ml-1">
                {batch?.batchId || "-"}
              </span>
            </span>

            <span className="text-gray-600">•</span>

            <span>
              Created{" "}
              {batch?.createdAt
                ? new Date(batch.createdAt).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          disabled
          className="
            h-9 px-3.5
            rounded-lg
            border border-[#243041]
            bg-[#141C28]
            text-sm
            text-gray-400
            opacity-50
            cursor-not-allowed
          "
        >
          Export
        </button>

        <button
          type="button"
          className="
            w-9 h-9
            rounded-lg
            border border-[#243041]
            bg-[#141C28]
            flex items-center justify-center
            hover:bg-[#1B2535]
            transition
          "
        >
          <MoreHorizontal size={17} />
        </button>
      </div>
    </div>
  );
}

export default BatchDetailHeader;
