import StatsGrid from "../components/dashboard/StatsGrid";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentBatchesTable from "../components/dashboard/RecentBatchesTable";
import RecentActivity from "../components/dashboard/RecentActivity";
import Navbar from "../components/layout/Navbar";
import CustomDateButton from "../components/common/CustomDateButton";
import DateRangeDropdown from "../components/common/DaysDropdown";

function Dashboard() {
  return (
    <>
      <Navbar 
      title="Dashboard"
       subtitle="Reconciliation overview and key metrics." 
       actions={
        <>
        <DateRangeDropdown />
        <CustomDateButton />
        </>
       }/>
      <StatsGrid />

      <ChartsSection />

      <section className="grid grid-cols-[71%_28%] gap-3">
        <RecentBatchesTable />

        <div>
          <RecentActivity />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
