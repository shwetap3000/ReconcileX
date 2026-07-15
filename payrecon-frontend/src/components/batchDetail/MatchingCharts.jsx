import LineChartCard from "../dashboard/charts/LineChartCard";
import DonutChartCard from "../dashboard/charts/DonutChartCard";

function MatchingCharts() {
  return (
    <section className="grid grid-cols-3 gap-6">

      <div className="col-span-2">
        <LineChartCard />
      </div>

      <div>
        <DonutChartCard />
      </div>

    </section>
  );
}

export default MatchingCharts;