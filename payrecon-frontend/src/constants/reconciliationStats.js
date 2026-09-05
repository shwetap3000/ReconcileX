import { Layers, Clock3, CheckCircle2, AlertCircle } from "lucide-react";

export const reconciliationStatsConfig = [
  {
    key: "batchesToReconcile",
    title: "Batches to Reconcile",
    icon: Layers,
    iconBg: "bg-blue-600",
    change: "Live Data",
    changeColor: "text-green-400",
  },
  {
    key: "underReview",
    title: "Under Review",
    icon: Clock3,
    iconBg: "bg-orange-500",
    change: "Live Data",
    changeColor: "text-orange-400",
  },
  {
    key: "reconciledBatches",
    title: "Reconciled Batches",
    icon: CheckCircle2,
    iconBg: "bg-green-600",
    change: "Live Data",
    changeColor: "text-green-400",
  },
  {
    key: "batchesWithExceptions",
    title: "Batches with Exceptions",
    icon: AlertCircle,
    iconBg: "bg-red-600",
    change: "Live Data",
    changeColor: "text-red-400",
  },
];
