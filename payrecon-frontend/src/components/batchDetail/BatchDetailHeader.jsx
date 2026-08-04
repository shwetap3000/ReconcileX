import { ArrowLeft, Download, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BatchDetailHeader({ batch }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between">
      {/* Left */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="
            w-12
            h-12
            rounded-xl
            border
            border-[#243041]
            bg-[#141C28]
            flex
            items-center
            justify-center
            hover:bg-[#1B2535]
            transition
          "
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-4xl font-bold">{batch?.batchName}</h1>

          <p className="text-gray-400 mt-1">
            Batch information, files and workflow status.
          </p>

          <div className="flex items-center gap-4 mt-5">
            <span className="text-xl">
              <span className="text-gray-400">Batch ID:</span> {batch?.batchId}
            </span>

            <span
              className={`
                px-6
                py-2
                rounded-xl
                border
                font-semibold
                ${
                  batch?.status === "APPROVED" || batch?.status === "RECONCILED"
                    ? "bg-green-500/15 border-green-500/20 text-green-400"
                    : batch?.status === "SUBMITTED"
                      ? "bg-yellow-500/15 border-yellow-500/20 text-yellow-400"
                      : batch?.status === "REJECTED"
                        ? "bg-red-500/15 border-red-500/20 text-red-400"
                        : "bg-blue-500/15 border-blue-500/20 text-blue-400"
                }
              `}
            >
              {batch?.status}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-4">
        <p className="text-gray-400">
          Created{" "}
          {batch?.createdAt ? new Date(batch.createdAt).toLocaleString() : "-"}
        </p>

        <div className="flex gap-3">
          <button
            className="
              h-11
              px-5
              rounded-xl
              border
              border-[#243041]
              bg-[#141C28]
              flex
              items-center
              gap-2
              hover:bg-[#1B2535]
            "
          >
            <Download size={18} />
            Export
          </button>

          <button
            className="
              w-11
              h-11
              rounded-xl
              border
              border-[#243041]
              bg-[#141C28]
              flex
              items-center
              justify-center
              hover:bg-[#1B2535]
            "
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BatchDetailHeader;
