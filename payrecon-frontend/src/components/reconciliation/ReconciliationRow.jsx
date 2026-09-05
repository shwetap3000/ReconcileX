import { MoreHorizontal } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

function ReconciliationRow({ batch }) {
  const exceptions =
    (batch.amountMismatchCount || 0) +
    (batch.dateMismatchCount || 0) +
    (batch.missingInBankCount || 0) +
    (batch.missingInLedgerCount || 0);

  const transactions = batch.totalLedgerTransactions || 0;
  const matched = batch.matchedTransactions || 0;

  return (
    <tr className="border-b border-[#243041] hover:bg-[#182233] transition">
      {/* Batch ID */}
      <td className="px-6 py-4 font-medium whitespace-nowrap">
        {batch.batchId}
      </td>

      {/* Batch Name */}
      <td className="px-6 py-4 whitespace-nowrap">{batch.batchName}</td>

      {/* Created */}
      <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
        {batch.createdAt
          ? new Date(batch.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—"}
      </td>

      {/* Transactions */}
      <td className="px-6 py-4 whitespace-nowrap">
        {transactions.toLocaleString("en-IN")}
      </td>

      {/* Matched */}
      <td className="px-6 py-4 text-green-400 whitespace-nowrap">
        {matched.toLocaleString("en-IN")}
      </td>

      {/* Exceptions */}
      <td className="px-6 py-4 text-red-400 whitespace-nowrap">
        {exceptions.toLocaleString("en-IN")}
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={batch.status} />
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-center">
        <button
          type="button"
          className="w-10 h-10 rounded-lg border border-[#243041] flex items-center justify-center text-gray-400 hover:bg-[#1B2535] hover:text-white transition"
        >
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}

export default ReconciliationRow;
