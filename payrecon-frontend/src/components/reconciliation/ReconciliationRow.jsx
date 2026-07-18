import { MoreHorizontal } from "lucide-react";

function ReconciliationRow({ batch }) {
  const statusStyles = {
    Completed: "bg-green-500/15 text-green-400 border border-green-500/20",

    Processing: "bg-blue-500/15 text-blue-400 border border-blue-500/20",

    Pending: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",

    Failed: "bg-red-500/15 text-red-400 border border-red-500/20",
  };

  return (
    <tr className="border-b border-[#243041] hover:bg-[#182233] transition">
      <td className="px-6 py-2 font">{batch.id}</td>

      <td className="px-6 py-2">{batch.name}</td>

      <td className="px-6 py-2 text-gray-400">{batch.created}</td>

      <td className="px-6 py-2">{batch.transactions.toLocaleString()}</td>

      <td className="px-6 py-2 text-green-400">
        {batch.matched.toLocaleString()}
      </td>

      <td className="px-6 py-2 text-red-400">{batch.exceptions}</td>

      <td className="px-6 py-2">
        <span
          className={`px-3 py-1 rounded-lg text-sm font-medium ${statusStyles[batch.status]}`}
        >
          {batch.status}
        </span>
      </td>

      <td className="px-6 py-2 text-center">
        <button className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center hover:bg-[#1B2535]">
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}

export default ReconciliationRow;
