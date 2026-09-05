import { useEffect, useState } from "react";
import { getReconciliationStats } from "../../api/reconciliationApi";
import { reconciliationStatsConfig } from "../../constants/reconciliationStats";
import StatCard from "../dashboard/StatCard";

function ReconciliationStatsGrid() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getReconciliationStats();

        setStats(response.stats);
      } catch (error) {
        console.error("Failed to fetch reconciliation stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="grid grid-cols-4 gap-3 mb-3">
      {reconciliationStatsConfig.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={loading ? "--" : (stats[card.key] ?? 0)}
          change={card.change}
          icon={card.icon}
          iconBg={card.iconBg}
          changeColor={card.changeColor}
        />
      ))}
    </section>
  );
}

export default ReconciliationStatsGrid;
