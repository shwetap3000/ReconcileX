import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatsGrid from "../components/dashboard/StatsGrid";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentBatchesTable from "../components/dashboard/RecentBatchesTable";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {
  return (
    <>
      {/* <WelcomeSection /> */}

      <StatsGrid />

      <ChartsSection />

      <section className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <RecentBatchesTable />
        </div>

        <div>
          <RecentActivity />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
