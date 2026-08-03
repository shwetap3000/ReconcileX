import { MoreHorizontal } from "lucide-react";

function BatchRow({ batch }) {
  const statusStyles = {
    Draft: "bg-gray-500/15 text-gray-300 border border-gray-500/20",

    "Files Uploaded": "bg-blue-500/15 text-blue-400 border border-blue-500/20",

    Submitted: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",

    "Under Review":
      "bg-orange-500/15 text-orange-400 border border-orange-500/20",

    Approved: "bg-green-500/15 text-green-400 border border-green-500/20",

    Rejected: "bg-red-500/15 text-red-400 border border-red-500/20",

    Reconciled:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  };

  return (
    <tr className="border-b border-[#243041] hover:bg-[#182233] transition">
      <td className="px-6 py-4 font-medium">{batch.batchId}</td>

      <td className="px-6 py-4">{batch.batchName}</td>

      {/* Created By */}
      <td className="px-6 py-4 text-gray-300">{batch.createdByName}</td>

      {/* Created Date */}
      <td className="px-6 py-4 text-gray-400">
        {batch.createdAt
          ? new Date(batch.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-"}
      </td>

      <td className="px-6 py-4">{batch.transactions.toLocaleString()}</td>

      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-lg text-sm font-medium ${statusStyles[batch.status]}`}
        >
          {batch.status}
        </span>
      </td>

      <td className="px-6 py-4 text-center">
        <button className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#1B2535]">
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}

export default BatchRow;
