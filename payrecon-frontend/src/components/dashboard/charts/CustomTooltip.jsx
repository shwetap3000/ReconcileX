function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#1B2535] border border-[#243041] rounded-xl p-4 shadow-lg">
      <p className="text-gray-400 mb-3">{label}</p>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-[#4F6BFF]" />
        <span className="text-gray-300">Batches</span>
      </div>

      <p className="text-white text-3xl font-bold">
        {payload[0].value}
      </p>
    </div>
  );
}

export default CustomTooltip;