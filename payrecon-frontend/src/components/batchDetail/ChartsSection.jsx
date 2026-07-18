import MatchingStatusChart from "./charts/MatchingStatusChart";
import MatchTrendChart from "./charts/MatchTrendChart";

function ChartsSection() {
  return (
    <section className="grid grid-cols-[35%_64%] gap-3">
      <MatchingStatusChart />
      <MatchTrendChart />
    </section>
  );
}

export default ChartsSection;
