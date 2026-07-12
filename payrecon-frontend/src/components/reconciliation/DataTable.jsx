import StatusBadge from "./StatusBadge";

const transactions = [
  {
    id: "TXN-2024-001",
    ledgerRef: "LED-2024-001",
    bankRef: "BNK-2024-001",
    ledgerAmount: "₹25,000",
    bankAmount: "₹25,000",
    difference: "₹0",
    status: "Matched",
  },
  {
    id: "TXN-2024-002",
    ledgerRef: "LED-2024-002",
    bankRef: "-",
    ledgerAmount: "₹15,750",
    bankAmount: "-",
    difference: "₹15,750",
    status: "Unmatched",
  },
  {
    id: "TXN-2024-003",
    ledgerRef: "LED-2024-003",
    bankRef: "BNK-2024-098",
    ledgerAmount: "₹8,500",
    bankAmount: "₹8,500",
    difference: "₹0",
    status: "Matched",
  },
];

const DataTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-slate-700">
          <tr className="text-left text-sm text-gray-400">
            <th className="px-6 py-4">Transaction ID</th>
            <th className="px-6 py-4">Ledger Ref</th>
            <th className="px-6 py-4">Bank Ref</th>
            <th className="px-6 py-4">Ledger Amount</th>
            <th className="px-6 py-4">Bank Amount</th>
            <th className="px-6 py-4">Difference</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Review</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-slate-800 hover:bg-slate-900/40 transition-colors"
            >
              <td className="px-6 py-4 font-medium">
                {transaction.id}
              </td>

              <td className="px-6 py-4">
                {transaction.ledgerRef}
              </td>

              <td className="px-6 py-4">
                {transaction.bankRef}
              </td>

              <td className="px-6 py-4">
                {transaction.ledgerAmount}
              </td>

              <td className="px-6 py-4">
                {transaction.bankAmount}
              </td>

              <td
                className={`px-6 py-4 font-medium ${
                  transaction.difference === "₹0"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {transaction.difference}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={transaction.status} />
              </td>

              <td className="px-6 py-4 text-center">
                <button className="rounded-md border border-blue-500 px-3 py-1 text-sm text-blue-400 hover:bg-blue-500/10 transition">
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;