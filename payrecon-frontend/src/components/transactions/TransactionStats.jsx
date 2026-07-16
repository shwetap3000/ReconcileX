import { FileText, CheckCircle2, Clock3, XCircle } from "lucide-react";

const stats = [
  {
    title: "Total Transactions",
    value: "35,428",
    percentage: "100% of all transactions",
    icon: FileText,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    percentageColor: "text-gray-400",
  },
  {
    title: "Matched",
    value: "28,597",
    percentage: "80.67% of all transactions",
    icon: CheckCircle2,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    percentageColor: "text-green-400",
  },
  {
    title: "Pending",
    value: "4,569",
    percentage: "12.90% of all transactions",
    icon: Clock3,
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    percentageColor: "text-yellow-400",
  },
  {
    title: "Failed",
    value: "2,262",
    percentage: "6.43% of all transactions",
    icon: XCircle,
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
    percentageColor: "text-red-400",
  },
];

function TransactionStats() {
  return (
    <section className="grid grid-cols-4 gap-6">
      {stats.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-[#141C28] border border-[#243041] rounded-2xl p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.iconBg}`}
                >
                  <Icon size={28} className={card.iconColor} />
                </div>

                <div>
                  <p className="text-gray-400 text-sm">{card.title}</p>

                  <h2 className="text-4xl font-bold mt-1">{card.value}</h2>

                  <p className={`text-sm mt-2 ${card.percentageColor}`}>
                    {card.percentage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default TransactionStats;
