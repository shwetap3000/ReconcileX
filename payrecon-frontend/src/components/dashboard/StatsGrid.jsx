import StatCard from "./StatCard";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-5 gap-4">

      <StatCard
        title="Total Transactions"
        value="12,540"
        change="+8.5%"
        changeColor="text-green-400"
      />

      <StatCard
        title="Matched Transactions"
        value="11,450"
        change="91.30%"
        changeColor="text-green-400"
      />

      <StatCard
        title="Unmatched Transactions"
        value="750"
        change="5.97%"
        changeColor="text-red-400"
      />

      <StatCard
        title="Duplicates"
        value="230"
        change="1.83%"
        changeColor="text-orange-400"
      />

      <StatCard
        title="Pending Approvals"
        value="45"
        change="0.90%"
        changeColor="text-violet-400"
      />

    </div>
  );
};

export default StatsGrid;