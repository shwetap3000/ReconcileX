import { stats } from "../../constants/dashboard";
import StatCard from "./StatCard";

function StatsGrid() {
  return (
    <section className="grid grid-cols-4 gap-3 mb-4">
      {stats.map((item) => (
        <StatCard
          key={item.id}
          title={item.title}
          value={item.value}
          change={item.change}
          icon={item.icon}
          iconBg={item.iconBg}
          changeColor={item.changeColor}
        />
      ))}
    </section>
  );
}

export default StatsGrid;
