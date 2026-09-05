import { useEffect, useState } from "react";
import { transactionColumns } from "./transactionColumns";
import { getTransactions } from "../../api/transactionApi";

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTransactions();

        if (response.success) {
          setTransactions(response.transactions || []);
        } else {
          setError(response.message || "Failed to load transactions.");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);

        setError(err.response?.data?.message || "Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400 text-lg">Loading transactions...</p>
        </div>
      ) : error ? (
        /* Error */
        <div className="flex justify-center items-center py-20">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              <thead className="border-b border-[#243041] bg-[#161F2C]">
                <tr>
                  {transactionColumns.map((column) => (
                    <th
                      key={column.accessor}
                      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400 whitespace-nowrap"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((row) => (
                    <tr
                      key={row.reconciliationId}
                      className="border-b border-[#243041] last:border-b-0 hover:bg-[#182233] transition"
                    >
                      {transactionColumns.map((column) => (
                        <td
                          key={column.accessor}
                          className="px-5 py-5 text-sm text-gray-300 whitespace-nowrap"
                        >
                          {column.render
                            ? column.render(row)
                            : (row[column.accessor] ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={transactionColumns.length}
                      className="text-center py-12 text-gray-400"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#243041]">
            <p className="text-gray-400 text-sm">
              Showing 1 to {transactions.length} of {transactions.length}{" "}
              transactions
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled
                className="w-10 h-10 rounded-lg border border-[#243041] text-gray-500 disabled:opacity-50"
              >
                {"<"}
              </button>

              <button
                type="button"
                className="w-10 h-10 rounded-lg bg-[#4F6BFF] text-white"
              >
                1
              </button>

              <button
                type="button"
                disabled
                className="w-10 h-10 rounded-lg border border-[#243041] text-gray-500 disabled:opacity-50"
              >
                {">"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionTable;
