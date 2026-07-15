import { CreditCard, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const stats = [
  {
    title: "Total Transactions",
    value: "12,654",
    icon: CreditCard,
    color: "bg-blue-500/15 text-blue-400",
  },
  {
    title: "Matched",
    value: "12,240",
    icon: CheckCircle2,
    color: "bg-green-500/15 text-green-400",
  },
  {
    title: "Unmatched",
    value: "318",
    icon: AlertTriangle,
    color: "bg-yellow-500/15 text-yellow-400",
  },
  {
    title: "Exceptions",
    value: "96",
    icon: XCircle,
    color: "bg-red-500/15 text-red-400",
  },
];

function BatchStats() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-[#141C28] border border-[#243041] rounded-2xl p-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>

                <h2 className="text-3xl font-bold mt-3">{item.value}</h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BatchStats;
