import BatchHeader from "../components/reconciliation/BatchHeader";
import BatchInfoCard from "../components/reconciliation/BatchInfoCard";
import SummaryCard from "../components/reconciliation/SummaryCard";
import ProgressCard from "../components/reconciliation/ProgressCard";
import TransactionOverview from "../components/reconciliation/TransactionOverview";
import TransactionTable from "../components/reconciliation/TransactionTable";

const BatchReconciliation = () => {
  return (
    <div className="w-full p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* <BatchHeader /> */}

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <BatchInfoCard />
          </div>

          <div className="col-span-5">
            <SummaryCard />
          </div>

          <div className="col-span-4">
            <ProgressCard />
          </div>
        </section>

        <TransactionOverview />

        <TransactionTable />

      </div>
    </div>
  );
};

export default BatchReconciliation;