import { transactionColumns } from "./transactionColumns";
import { transaction } from "../../constants/transaction";

function TransactionTable() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      <table className="w-full">
        {/* Header */}

        <thead className="border-b border-[#243041] bg-[#161F2C]">
          <tr>
            {transactionColumns.map((column) => (
              <th
                key={column.accessor}
                className="text-left px-6 py-5 text-sm font-semibold text-gray-400"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}

        <tbody>
          {transaction.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[#243041] hover:bg-[#182233] transition"
            >
              {transactionColumns.map((column) => (
                <td key={column.accessor} className="px-6 py-5 text-gray-300">
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}

      <div className="flex items-center justify-between px-6 py-5">
        <p className="text-gray-400 text-sm">
          Showing 1 to 10 of 35,428 transactions
        </p>

        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#182233]">
            {"<"}
          </button>

          <button className="w-10 h-10 rounded-lg bg-[#4F6BFF] text-white">
            1
          </button>

          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#182233]">
            2
          </button>

          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#182233]">
            3
          </button>

          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#182233]">
            ...
          </button>

          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#182233]">
            3543
          </button>

          <button className="w-10 h-10 rounded-lg border border-[#243041] hover:bg-[#182233]">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
