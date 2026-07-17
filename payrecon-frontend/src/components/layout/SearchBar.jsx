import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-63">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search transactions, batches..."
        className="
          w-full
          h-9
          rounded-xl
          bg-[#141C28]
          border
          border-[#243041]
          pl-8
          pr-4
          text-white
          placeholder:text-gray-500
          outline-none
          focus:border-blue-500
        "
      />
    </div>
  );
}

export default SearchBar;
