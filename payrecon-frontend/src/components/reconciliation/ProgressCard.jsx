const progress = {
  reconciled: 9856,
  pending: 2684,
  total: 12540,
};

const percentage = (
  (progress.reconciled / progress.total) *
  100
).toFixed(1);

const ProgressCard = () => {
  return (
    <div className="rounded-xl border border-slate-700 p-6 h-full">
      <div className="flex items-center justify-between mb-8">

        <h2 className="text-lg font-semibold">
          Reconciliation Progress
        </h2>

        <span className="text-2xl font-bold">
          {percentage}%
        </span>

      </div>

      <ProgressBar percentage={percentage} />

      <p className="text-sm text-gray-400 mt-4">
        {progress.reconciled.toLocaleString()} of{" "}
        {progress.total.toLocaleString()} transactions reconciled
      </p>

      <div className="border-t border-slate-700 mt-8 pt-6">

        <div className="grid grid-cols-3">

          <Stat
            label="Reconciled"
            value={progress.reconciled.toLocaleString()}
            valueClass="text-green-500"
          />

          <Stat
            label="Pending"
            value={progress.pending.toLocaleString()}
            valueClass="text-yellow-500"
          />

          <Stat
            label="Total"
            value={progress.total.toLocaleString()}
          />

        </div>

      </div>

    </div>
  );
};

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
      <div
        className="h-full rounded-full bg-green-500 transition-all duration-500"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};

const Stat = ({ label, value, valueClass = "" }) => {
  return (
    <div className="text-center">

      <p className="text-sm text-gray-400 mb-2">
        {label}
      </p>

      <p className={`text-2xl font-semibold ${valueClass}`}>
        {value}
      </p>

    </div>
  );
};

export default ProgressCard;