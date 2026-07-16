function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="min-w-[150px] rounded-xl border border-[#243041] bg-[#141C28] p-4 shadow-2xl">
      <p className="text-xs text-gray-400">{label}</p>

      <div className="mt-3 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#4F6BFF]" />

        <span className="text-sm text-gray-300">Reconciliations</span>
      </div>

      <p className="mt-2 text-2xl font-bold text-white">
        {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default CustomTooltip;
