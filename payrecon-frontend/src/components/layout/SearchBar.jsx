import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search transactions, batches..."
        className="
          h-11
          w-72
          pl-10
          pr-4
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          text-white
          placeholder:text-slate-500
          outline-none
          focus:border-blue-500
          transition
        "
      />
    </div>
  );
}

export default SearchBar;
