import { FileText, CheckCircle2, Clock3, XCircle } from "lucide-react";

export const transactionStatsConfig = [
  {
    key: "totalTransactions",
    title: "Total Transactions",
    icon: FileText,
    iconBg: "bg-blue-600",
    changeColor: "text-gray-400",
  },
  {
    key: "matched",
    title: "Matched",
    icon: CheckCircle2,
    iconBg: "bg-green-600",
    changeColor: "text-green-400",
  },
  {
    key: "pending",
    title: "Pending",
    icon: Clock3,
    iconBg: "bg-orange-500",
    changeColor: "text-orange-400",
  },
  {
    key: "exceptions",
    title: "Exceptions",
    icon: XCircle,
    iconBg: "bg-red-600",
    changeColor: "text-red-400",
  },
];
