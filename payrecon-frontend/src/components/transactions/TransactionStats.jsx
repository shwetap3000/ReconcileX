import { useEffect, useState } from "react";
import { getTransactionStats } from "../../api/transactionApi";
import { transactionStatsConfig } from "../../constants/transactionStats";
import StatCard from "../dashboard/StatCard";

function TransactionStats() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getTransactionStats();

        setStats(response.stats);
      } catch (error) {
        console.error("Failed to fetch transaction stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="grid grid-cols-4 gap-3 mb-3">
      {transactionStatsConfig.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={loading ? "--" : (stats[card.key] ?? 0)}
          change={
            loading
              ? "--"
              : card.key === "totalTransactions"
                ? "100% of all transactions"
                : `${stats[`${card.key}Percentage`] ?? 0}% of all transactions`
          }
          icon={card.icon}
          iconBg={card.iconBg}
          changeColor={card.changeColor}
        />
      ))}
    </section>
  );
}

export default TransactionStats;
