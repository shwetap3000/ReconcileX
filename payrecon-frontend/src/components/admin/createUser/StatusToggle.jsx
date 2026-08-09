const StatusToggle = ({ active, setActive }) => {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-300">Status</p>

      <div className="flex w-fit rounded-full bg-[#050C17] border border-slate-700 p-1">
        <button
          type="button"
          onClick={() => setActive(true)}
          className={`rounded-full px-6 py-2 transition ${
            active
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Active
        </button>

        <button
          type="button"
          onClick={() => setActive(false)}
          className={`rounded-full px-6 py-2 transition ${
            !active
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Inactive
        </button>
      </div>
    </div>
  );
};

export default StatusToggle;
