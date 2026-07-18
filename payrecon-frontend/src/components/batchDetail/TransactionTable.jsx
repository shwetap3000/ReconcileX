import { useState } from "react";
import { Search, Filter, Eye, MoreHorizontal } from "lucide-react";

import { transactionData } from "../../constants/transactionData";

function TransactionTable() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      {/* Header */}

      <div className="flex justify-between items-center px-6 py-1 border-b border-[#243041]">
        <div>
          <h2 className="text-xl font-semibold text-white">Transactions</h2>

          <p className="text-sm text-gray-400">
            View all reconciled transactions
          </p>
        </div>

         <div className="flex justify-between items-center px-6 py-4 gap-3 border-[#243041]">
        {/* Search */}

        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-70
              h-11
              rounded-xl
              bg-[#111827]
              border
              border-[#243041]
              pl-11
              pr-4
              outline-none
              focus:border-[#4F6BFF]
            "
          />
        </div>

        {/* Filter */}

        <button
          className="
            flex
            items-center
            gap-2
            border
            border-[#243041]
            bg-[#111827]
            rounded-xl
            px-5
            h-11
            hover:bg-[#1A2332]
          "
        >
          <Filter size={16} />
          Filter
        </button>
      </div>

      </div>

     
      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#111827] border-b border-[#243041]">
            <tr>
              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Transaction ID
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Ledger Amount
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Bank Amount
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Difference
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs uppercase text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {transactionData
              .filter((item) =>
                item.id.toLowerCase().includes(search.toLowerCase()),
              )
              .map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b border-[#243041] hover:bg-[#182233]"
                >
                  <td className="px-6 py-3 font-medium">{txn.id}</td>

                  <td className="px-6 py-3">{txn.ledger}</td>

                  <td className="px-6 py-3">{txn.bank}</td>

                  <td
                    className={`px-6 py-3 ${
                      txn.difference === "₹0"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {txn.difference}
                  </td>

                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        txn.status === "Matched"
                          ? "bg-green-500/15 text-green-400 border border-green-500/20"
                          : txn.status === "Review"
                            ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                            : "bg-red-500/15 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        className="
                          w-10
                          h-10
                          rounded-lg
                          border
                          border-[#243041]
                          hover:bg-[#1A2332]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="
                          w-10
                          h-10
                          rounded-lg
                          border
                          border-[#243041]
                          hover:bg-[#1A2332]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="flex justify-between items-center px-6 py-5 border-t border-[#243041]">
        <p className="text-gray-400 text-sm">Showing 1–4 of 4 transactions</p>

        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#1A2332]">
            1
          </button>

          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#1A2332]">
            2
          </button>

          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#1A2332]">
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
