import { MoreHorizontal } from "lucide-react";

function RecentBatchRow({ batch }) {
  const statusStyles = {
    Completed: "bg-green-500/15 text-green-400 border border-green-500/20",
    Processing: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    Pending: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
  };

  return (
    <tr className="border-b border-[#243041] hover:bg-[#182233] transition-colors">
      {/* Batch ID */}
      <td className="px-6 py-5 text-gray-300 font-medium">{batch.id}</td>

      {/* Created Date */}
      <td className="px-6 py-5 text-gray-400">{batch.date}</td>

      {/* Transactions */}
      <td className="px-6 py-5 text-gray-300">{batch.transactions}</td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            statusStyles[batch.status]
          }`}
        >
          {batch.status}
        </span>
      </td>

      {/* Progress */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300 w-10">{batch.progress}%</span>

          <div className="w-28 h-2 bg-[#243041] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                batch.status === "Completed"
                  ? "bg-green-500"
                  : batch.status === "Processing"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
              }`}
              style={{ width: `${batch.progress}%` }}
            />
          </div>
        </div>
      </td>

      {/* Action */}
      <td className="px-6 py-5">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#243041] hover:bg-[#1B2535] transition">
          <MoreHorizontal size={18} className="text-gray-400" />
        </button>
      </td>
    </tr>
  );
}

export default RecentBatchRow;
