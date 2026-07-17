import ReconciliationStats from "../components/reconciliation/ReconciliationStats";
import ReconciliationTable from "../components/reconciliation/ReconciliationTable";
import CustomDateButton from "../components/common/CustomDateButton";
import DateRangeDropdown from "../components/common/DaysDropdown";
import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/layout/SearchBar";

function Reconciliation() {
  return (
    <div className="space-y-6">
      <Navbar
        title="Reconciliation"
        subtitle="Reconciliation batches overview."
        actions={
          <>
            <DateRangeDropdown />
            <CustomDateButton />
            <SearchBar />
          </>
        }
      />

      <ReconciliationStats />

      <ReconciliationTable />
    </div>
  );
}

export default Reconciliation;
