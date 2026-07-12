import BatchInfoCard from "../components/reconciliation/BatchInfoCard";
import SummaryCard from "../components/reconciliation/SummaryCard";
import MetricsGrid from "../components/reconciliation/MetricsGrid";
import ProgressCard from "../components/reconciliation/ProgressCard";
import ExceptionAnalysis from "../components/reconciliation/ExceptionAnalysis";
import FilterSection from "../components/reconciliation/FilterSection";
import RecentActivity from "../components/reconciliation/RecentActivity";
import TransactionTable from "../components/reconciliation/TransactionTable";
import BottomActions from "../components/reconciliation/BottomActions";

const BatchReconciliation = () => {
  return (
    <div className="min-h-screen bg-[#0B1220] p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Batch Reconciliation
        </h1>

        <p className="mt-2 text-slate-400">
          Review and reconcile uploaded payment batches.
        </p>
      </div>

      {/* Top Row */}
      <div className="flex gap-6">

        {/* LEFT */}
        <div className="flex-1 space-y-6">

          <BatchInfoCard />

          <MetricsGrid />

          <ProgressCard />

          <FilterSection />

          <TransactionTable />

          <BottomActions />

        </div>

        {/* RIGHT */}
        <aside className="w-[340px] space-y-6">

          <SummaryCard />

          <ExceptionAnalysis />

          <RecentActivity />

        </aside>

      </div>

    </div>
  );
};

export default BatchReconciliation;