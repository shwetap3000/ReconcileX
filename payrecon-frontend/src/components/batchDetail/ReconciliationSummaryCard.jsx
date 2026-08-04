import { ArrowRight, CheckCircle2 } from "lucide-react";

function ReconciliationSummaryCard({ summary }) {
  const totalTransactions = summary?.totalLedgerTransactions || 0;

  const exceptions =
    (summary?.amountMismatch || 0) +
    (summary?.dateMismatch || 0) +
    (summary?.missingInBank || 0) +
    (summary?.missingInLedger || 0);

  const matchRate =
    totalTransactions > 0
      ? ((summary?.matched / totalTransactions) * 100).toFixed(1)
      : 0;

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6 h-full">
      <h2 className="text-3xl font-semibold mb-6">3. Reconciliation Summary</h2>

      <div className="border border-[#243041] rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#243041]">
          <span className="text-gray-400">Status</span>

          <span className="flex items-center gap-2 text-green-400 font-medium">
            <CheckCircle2 size={18} />
            Completed
          </span>
        </div>

        <div className="flex justify-between items-center px-6 py-5 border-b border-[#243041]">
          <span className="text-gray-400">Total Transactions</span>

          <span className="font-semibold">{totalTransactions}</span>
        </div>

        <div className="flex justify-between items-center px-6 py-5 border-b border-[#243041]">
          <span className="text-gray-400">Matched</span>

          <span className="text-green-400 font-semibold">
            {summary?.matched}
          </span>
        </div>

        <div className="flex justify-between items-center px-6 py-5 border-b border-[#243041]">
          <span className="text-gray-400">Exceptions</span>

          <span className="text-red-400 font-semibold">{exceptions}</span>
        </div>

        <div className="flex justify-between items-center px-6 py-5">
          <span className="text-gray-400">Match Rate</span>

          <span className="font-semibold text-green-400">{matchRate}%</span>
        </div>
      </div>

      <button
        className="
          mt-6
          w-full
          h-12
          rounded-xl
          bg-[#4F6BFF]
          hover:bg-[#3F5AF5]
          transition
          flex
          items-center
          justify-center
          gap-2
          font-medium
        "
      >
        View Reconciliation Results
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default ReconciliationSummaryCard;
