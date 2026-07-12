import ReconciliationChart from "./ReconciliationChart";

const summary = {
  totalTransactions: 12540,
  matched: 9856,
  unmatched: 1456,
  duplicate: 876,
  missingInBank: 352,
};

const chartData = [
  {
    name: "Matched",
    value: 9856,
  },
  {
    name: "Unmatched",
    value: 1456,
  },
  {
    name: "Duplicate",
    value: 876,
  },
  {
    name: "Missing in Bank",
    value: 352,
  },
];

const SummaryCard = () => {
  return (
    <div className="rounded-xl border border-slate-700 p-6 h-full">
      <h2 className="text-lg font-semibold mb-6">
        Reconciliation Summary
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <ReconciliationChart
  data={chartData}
  total={12540}
/>

        {/* Legend */}
        <div className="flex flex-col justify-center space-y-4">

          <LegendItem
            color="bg-green-500"
            label="Matched"
            value={summary.matched}
            percentage="78.6%"
          />

          <LegendItem
            color="bg-yellow-500"
            label="Unmatched"
            value={summary.unmatched}
            percentage="11.6%"
          />

          <LegendItem
            color="bg-red-500"
            label="Duplicate"
            value={summary.duplicate}
            percentage="7.0%"
          />

          <LegendItem
            color="bg-purple-500"
            label="Missing in Bank"
            value={summary.missingInBank}
            percentage="2.8%"
          />

        </div>

      </div>

      <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">

        <span className="text-sm text-gray-400">
          Total Transactions
        </span>

        <span className="font-semibold text-lg">
          {summary.totalTransactions.toLocaleString()}
        </span>

      </div>
    </div>
  );
};

const LegendItem = ({ color, label, value, percentage }) => {
  return (
    <div className="flex justify-between items-center">

      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${color}`} />

        <span className="text-sm">
          {label}
        </span>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium">
          {value.toLocaleString()}
        </p>

        <p className="text-xs text-gray-400">
          {percentage}
        </p>
      </div>

    </div>
  );
};

export default SummaryCard;