import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BatchRow({ batch }) {
  const navigate = useNavigate();

  const handleOpenBatch = () => {
    if (!batch?._id) {
      return;
    }

    navigate(`/batch/${batch._id}`);
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusLabel = (status) => {
    if (!status) {
      return "-";
    }

    return status.replace(/_/g, " ");
  };

  return (
    <tr
      onClick={handleOpenBatch}
      className="
        border-b
        border-[#243041]
        cursor-pointer
        hover:bg-[#1A2332]
        transition-colors
      "
    >
      {/* Batch ID */}
      <td className="px-6 py-5">
        <span className="font-semibold text-white">
          {batch?.batchId || "-"}
        </span>
      </td>

      {/* Batch Name */}
      <td className="px-6 py-5">
        <span className="text-white">{batch?.batchName || "-"}</span>
      </td>

      {/* Created By */}
      <td className="px-6 py-5">
        <span className="text-gray-300">{batch?.createdByName || "N/A"}</span>
      </td>

      {/* Created Date */}
      <td className="px-6 py-5">
        <span className="text-gray-400">{formatDate(batch?.createdAt)}</span>
      </td>

      {/* Transactions */}
      <td className="px-6 py-5">
        <span className="text-white">
          {Number(batch?.transactions || 0).toLocaleString()}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`
            inline-flex
            items-center
            rounded-md
            px-0
            py-1
            text-sm
            font-semibold
            ${
              batch?.status === "RECONCILED" || batch?.status === "APPROVED"
                ? "text-green-400"
                : batch?.status === "REJECTED"
                  ? "text-red-400"
                  : batch?.status === "SUBMITTED" ||
                      batch?.status === "UNDER_REVIEW"
                    ? "text-yellow-400"
                    : batch?.status === "UPLOADED"
                      ? "text-blue-400"
                      : "text-gray-300"
            }
          `}
        >
          {getStatusLabel(batch?.status)}
        </span>
      </td>

      {/* Action */}
      <td
        className="px-6 py-5 text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleOpenBatch}
          className="
            inline-flex
            h-11
            w-11
            items-center
            justify-center
            rounded-lg
            border
            border-[#243041]
            bg-[#141C28]
            text-gray-300
            transition
            hover:bg-[#1B2535]
            hover:text-white
          "
          title="Open batch"
        >
          <MoreHorizontal size={20} />
        </button>
      </td>
    </tr>
  );
}

export default BatchRow;
