import {
  Activity,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ClipboardCheck,
  Eye,
  ShieldCheck,
  XCircle,
} from "lucide-react";

export const batchStatsConfig = {
  ADMIN: [
    {
      key: "totalBatches",
      title: "Total Batches",
      icon: Activity,
      iconBg: "bg-blue-600",
      change: "Live Data",
      changeColor: "text-green-400",
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
      key: "pendingBatches",
      title: "Pending Batches",
      icon: Clock3,
      iconBg: "bg-orange-500",
      change: "Live Data",
      changeColor: "text-orange-400",
    },

    {
      key: "batchesWithIssues",
      title: "Batches with Issues",
      icon: AlertCircle,
      iconBg: "bg-red-600",
      change: "Live Data",
      changeColor: "text-red-400",
    },
  ],

  MAKER: [
    {
      key: "myBatches",
      title: "My Batches",
      icon: Activity,
      iconBg: "bg-blue-600",
      change: "Live Data",
      changeColor: "text-green-400",
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
      key: "pendingBatches",
      title: "Pending Batches",
      icon: Clock3,
      iconBg: "bg-orange-500",
      change: "Live Data",
      changeColor: "text-orange-400",
    },

    {
      key: "batchesWithIssues",
      title: "Batches with Issues",
      icon: AlertCircle,
      iconBg: "bg-red-600",
      change: "Live Data",
      changeColor: "text-red-400",
    },
  ],

  CHECKER: [
    {
      key: "batchesToReview",
      title: "Batches to Review",
      icon: ClipboardCheck,
      iconBg: "bg-blue-600",
      change: "Live Data",
      changeColor: "text-green-400",
    },

    {
      key: "underReview",
      title: "Under Review",
      icon: Eye,
      iconBg: "bg-orange-500",
      change: "Live Data",
      changeColor: "text-orange-400",
    },

    {
      key: "approvedBatches",
      title: "Approved Batches",
      icon: ShieldCheck,
      iconBg: "bg-green-600",
      change: "Live Data",
      changeColor: "text-green-400",
    },

    {
      key: "rejectedBatches",
      title: "Rejected Batches",
      icon: XCircle,
      iconBg: "bg-red-600",
      change: "Live Data",
      changeColor: "text-red-400",
    },
  ],
};
