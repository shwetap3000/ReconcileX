import {
  Landmark,
  Building2,
  ArrowLeftRight,
  Receipt,
  AlertTriangle,
} from "lucide-react";

const overview = [
  {
    label: "Ledger Total",
    value: "₹12,54,320.00",
    icon: Landmark,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    label: "Bank Total",
    value: "₹12,53,180.00",
    icon: Building2,
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
  },
  {
    label: "Net Difference",
    value: "₹1,140.00",
    icon: ArrowLeftRight,
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-400",
  },
  {
    label: "Average Transaction",
    value: "₹1,004.32",
    icon: Receipt,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
  },
  {
    label: "Largest Difference",
    value: "₹580.00",
    icon: AlertTriangle,
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
  },
];

const TransactionOverview = () => {
  return (
    <div className="rounded-xl border border-slate-700 p-6">
      <h2 className="text-lg font-semibold mb-6">
        Transaction Overview
      </h2>

      <div className="grid grid-cols-5 gap-4">
        {overview.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};

const MetricCard = ({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="rounded-lg border border-slate-700 p-5 hover:border-slate-500 transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center ${iconBg}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-1">
        {value}
      </h3>

      <p className="text-sm text-gray-400">
        {label}
      </p>
    </div>
  );
};

export default TransactionOverview;