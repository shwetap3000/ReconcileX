import BatchStats from "../components/batch/BatchStats";
import BatchTable from "../components/batch/BatchTable";
import CustomDateButton from "../components/common/CustomDateButton";
import DateRangeDropdown from "../components/common/DaysDropdown";
import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/layout/SearchBar";

function Batches() {
  return (
    <div className="space-y-6">
      <Navbar
        title="Batches"
        subtitle="Manage and track reconciliation batches."
        actions={
          <>
            <DateRangeDropdown />
            <CustomDateButton />
            <SearchBar />
          </>
        }
      />

      <BatchStats />

      <BatchTable />
    </div>
  );
}

export default Batches;
