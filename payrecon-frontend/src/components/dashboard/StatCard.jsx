function StatCard({ title, value, change, icon: Icon, iconBg, changeColor }) {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6 hover:border-blue-500/40 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{title}</p>

          <h2 className="text-4xl font-bold mt-3 text-white">{value}</h2>

          <p className={`text-sm mt-5 ${changeColor}`}>{change}</p>
        </div>

        <div
          className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center`}
        >
          <Icon className="text-white" size={26} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
