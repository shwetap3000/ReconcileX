import { useEffect, useState } from "react";
import { getBatchStats } from "../../api/batchApi";
import { batchStatsConfig } from "../../constants/batchStats";
import StatCard from "../dashboard/StatCard";

function BatchStatsGrid() {
  const [stats, setStats] = useState({});
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getBatchStats();

        setStats(response.stats);
        setRole(response.role);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = batchStatsConfig[role] || [];

  return (
    <section className="grid grid-cols-4 gap-3 mb-3">
      {cards.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={loading ? "--" : stats[card.key] ?? 0}
          change={card.change}
          icon={card.icon}
          iconBg={card.iconBg}
          changeColor={card.changeColor}
        />
      ))}
    </section>
  );
}

export default BatchStatsGrid;