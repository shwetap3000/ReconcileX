import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    title: "Total Actions",
    value: "28",
    change: "+12%",
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    icon: FileText,
  },
  {
    title: "Successful",
    value: "20",
    change: "71.43%",
    color: "text-green-400",
    bg: "bg-green-500/15",
    icon: CheckCircle2,
  },
  {
    title: "Warnings",
    value: "5",
    change: "17.86%",
    color: "text-yellow-400",
    bg: "bg-yellow-500/15",
    icon: AlertTriangle,
  },
  {
    title: "Info",
    value: "3",
    change: "10.71%",
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    icon: Info,
  },
  {
    title: "Failed",
    value: "0",
    change: "0%",
    color: "text-red-400",
    bg: "bg-red-500/15",
    icon: XCircle,
  },
];

function TodayActions() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Today's Actions</h2>

        <CalendarDays size={18} className="text-gray-400" />
      </div>

      <div className="space-y-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="border border-[#243041] rounded-xl p-4 flex gap-4"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg}`}
              >
                <Icon size={20} className={item.color} />
              </div>

              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>

                <h3 className="text-2xl font-semibold">{item.value}</h3>

                <p className={`text-sm ${item.color}`}>{item.change}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodayActions;
