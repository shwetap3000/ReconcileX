import BatchHeader from "../components/batchDetail/BatchHeader";
import BatchStats from "../components/batchDetail/BatchStats";
import ChartsSection from "../components/batchDetail/ChartsSection";
import TransactionTable from "../components/batchDetail/TransactionTable";

function BatchDetail() {
  return (
    <div className="space-y-6">
      <BatchHeader />
      <BatchStats />
      <ChartsSection />
      <TransactionTable />
    </div>
  );
}

export default BatchDetail;
