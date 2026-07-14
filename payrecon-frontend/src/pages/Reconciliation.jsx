import ReconciliationHeader from "../components/reconciliation/ReconciliationHeader";
import ReconciliationToolbar from "../components/reconciliation/ReconciliationToolbar";
import ReconciliationStats from "../components/reconciliation/ReconciliationStats";
import ReconciliationTable from "../components/reconciliation/ReconciliationTable";

function Reconciliation() {
  return (
    <div className="space-y-6">
      <ReconciliationHeader />

      <ReconciliationToolbar />

      <ReconciliationStats />

      <ReconciliationTable />
    </div>
  );
}

export default Reconciliation;
