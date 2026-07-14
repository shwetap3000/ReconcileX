import {
  Activity,
  CircleCheckBig,
  Clock3,
  CircleX,
} from "lucide-react";

export const stats = [
  {
    id: 1,
    title: "Total Transactions",
    value: "128,654",
    change: "+12.5% vs last 7 days",
    icon: Activity,
    iconBg: "bg-blue-600",
    changeColor: "text-green-400",
  },
  {
    id: 2,
    title: "Reconciled",
    value: "98,765",
    change: "+15.8% vs last 7 days",
    icon: CircleCheckBig,
    iconBg: "bg-green-600",
    changeColor: "text-green-400",
  },
  {
    id: 3,
    title: "Pending",
    value: "21,456",
    change: "-8.3% vs last 7 days",
    icon: Clock3,
    iconBg: "bg-amber-500",
    changeColor: "text-amber-400",
  },
  {
    id: 4,
    title: "Failed",
    value: "2,433",
    change: "+4.7% vs last 7 days",
    icon: CircleX,
    iconBg: "bg-red-500",
    changeColor: "text-red-400",
  },
];