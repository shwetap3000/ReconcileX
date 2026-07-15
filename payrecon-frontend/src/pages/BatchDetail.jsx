import BatchHeader from "../components/batchDetail/BatchHeader";
import BatchStats from "../components/batchDetail/BatchStats";
import MatchingCharts from "../components/batchDetail/MatchingCharts";
import TransactionTable from "../components/batchDetail/TransactionTable";

function BatchDetail() {
  return (
    <div className="space-y-6">
      <BatchHeader />
      <BatchStats />
      <MatchingCharts />
      <TransactionTable />
    </div>
  );
}

export default BatchDetail;
