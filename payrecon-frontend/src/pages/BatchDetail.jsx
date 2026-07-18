import BatchHeader from "../components/batchDetail/BatchHeader";
import BatchStats from "../components/batchDetail/BatchStats";
import ChartsSection from "../components/batchDetail/ChartsSection";
import TransactionTable from "../components/batchDetail/TransactionTable";
import Navbar from "../components/layout/Navbar";

function BatchDetail() {
  return (
    <div className="space-y-4">
      <Navbar
      title="May Reconciliation Batch 1"
      subtitle="Batch summary and reconciliation status."
      
       />
      <BatchHeader />
      <BatchStats />
      <ChartsSection />
      <TransactionTable />
    </div>
  );
}

export default BatchDetail;
