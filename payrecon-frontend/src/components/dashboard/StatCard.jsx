function StatCard({ title, value, change, icon: Icon, iconBg, changeColor }) {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-3 hover:border-blue-500/40 transition-all">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}
        >
          <Icon className="text-white" size={22} />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm font-bold text-gray-400">{title}</p>

          <h2 className="text-2xl font-bold text-white mt-1">{value}</h2>

          <p className={`text-sm mt-2 ${changeColor}`}>{change}</p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;