function CustomPieTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const { name, value, fill } = payload[0];

  return (
    <div className="rounded-xl border border-[#243041] bg-[#141C28] p-4 z-50 shadow-xl">
      <div className="flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: fill }}
        />

        <p className="text-sm text-gray-300">{name}</p>
      </div>

      <p className="mt-2 text-xl font-bold text-white">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default CustomPieTooltip;