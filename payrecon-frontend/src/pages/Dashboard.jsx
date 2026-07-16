import StatsGrid from "../components/dashboard/StatsGrid";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentBatchesTable from "../components/dashboard/RecentBatchesTable";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {
  return (
    <>
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
