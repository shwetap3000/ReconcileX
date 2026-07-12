import ReconciliationChart from "./ReconciliationChart";
import TransactionTrendChart from "./TransactionTrendChart";

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-[4fr_6fr] gap-2 mt-3">
      <ReconciliationChart />
      <TransactionTrendChart />
    </div>
  );
};

export default ChartsSection;
