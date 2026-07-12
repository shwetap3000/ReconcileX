import { Search, RotateCcw } from "lucide-react";

const tabs = [
  { label: "All", count: 12540 },
  { label: "Matched", count: 9856 },
  { label: "Unmatched", count: 1456 },
  { label: "Duplicate", count: 876 },
  { label: "Missing in Bank", count: 352 },
];

const FilterToolbar = () => {
  return (
    <div className="flex items-center justify-between p-5 border-b border-slate-700">

      {/* Left */}

      <div className="flex items-center gap-6">

        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`pb-2 text-sm transition-all ${
              index === 0
                ? "border-b-2 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}

            <span className="ml-1 text-xs">
              ({tab.count.toLocaleString()})
            </span>
          </button>
        ))}

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="w-64 rounded-lg border border-slate-700 bg-transparent py-2 pl-10 pr-4 outline-none"
          />

        </div>

        <select className="rounded-lg border border-slate-700 bg-transparent px-4 py-2">
          <option>All Status</option>
          <option>Matched</option>
          <option>Unmatched</option>
          <option>Duplicate</option>
          <option>Missing</option>
        </select>

        <select className="rounded-lg border border-slate-700 bg-transparent px-4 py-2">
          <option>All Differences</option>
          <option>Zero</option>
          <option>Non Zero</option>
        </select>

        <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800 transition">

          <RotateCcw size={16} />

          Reset

        </button>

      </div>

    </div>
  );
};

export default FilterToolbar;