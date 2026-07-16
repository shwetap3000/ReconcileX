import LineChartCard from "./charts/LineChartCard";
import DonutChartCard from "./charts/DonutChartCard";

function ChartsSection() {
  return (
    <section className="grid grid-cols-[55%_44%] gap-3 mb-3">
      <LineChartCard />

      <DonutChartCard />
    </section>
  );
}

export default ChartsSection;
