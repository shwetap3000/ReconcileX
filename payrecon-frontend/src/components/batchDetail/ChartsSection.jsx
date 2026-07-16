import MatchingStatusChart from "./charts/MatchingStatusChart";
import MatchTrendChart from "./charts/MatchTrendChart";

function ChartsSection() {
  return (
    <section className="grid grid-cols-2 gap-6">
      <MatchingStatusChart />
      <MatchTrendChart />
    </section>
  );
}

export default ChartsSection;
