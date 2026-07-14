import LineChartCard from "./charts/LineChartCard";
import DonutChartCard from "./charts/DonutChartCard";

function ChartsSection() {
  return (
    <section className="grid grid-cols-3 gap-6 mb-8">
      <div className="col-span-2">
        <LineChartCard />
      </div>

      <div>
        <DonutChartCard />
      </div>
    </section>
  );
}

export default ChartsSection;
