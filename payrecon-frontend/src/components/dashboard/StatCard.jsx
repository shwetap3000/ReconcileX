const StatCard = ({ title, value, change, changeColor }) => {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-xl
        p-3
        hover:border-blue-500
        transition-all
        
      "
    >
      <p className="text-sm font-bold text-slate-400">{title}</p>

      <div className="flex items-end gap-3 mt-2">
        <h2 className="text-2xl font-bold text-white">{value}</h2>

        <span className={`text-sm font-semibold ${changeColor}`}>{change}</span>
      </div>

      <p className="text-xs text-slate-500 mt-3">from last week</p>
    </div>
  );
};

export default StatCard;
