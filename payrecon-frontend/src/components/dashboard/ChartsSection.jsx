import LineChartCard from "./charts/LineChartCard";
import DonutChartCard from "./charts/DonutChartCard";

function ChartsSection() {
  return (
    <section className="grid grid-cols-[60%_39%] gap-3 mb-4">
      <LineChartCard />

      <DonutChartCard />
    </section>
  );
}

export default ChartsSection;
