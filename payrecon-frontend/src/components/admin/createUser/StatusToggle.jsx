const StatusToggle = ({ active = true }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        Status
      </label>

      <div className="flex w-fit rounded-full bg-[#050C17] border border-slate-700 p-1">
        <button
          className={`rounded-full px-6 py-2 transition ${
            active ? "bg-blue-600 text-white" : "text-slate-400"
          }`}
        >
          Active
        </button>

        <button
          className={`rounded-full px-6 py-2 transition ${
            !active ? "bg-blue-600 text-white" : "text-slate-400"
          }`}
        >
          Inactive
        </button>
      </div>
    </div>
  );
};

export default StatusToggle;
