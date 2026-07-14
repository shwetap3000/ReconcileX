import { Search, Filter, Plus, ChevronDown } from "lucide-react";

function ReconciliationToolbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        {/* Search */}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search by batch ID or name..."
            className="
              w-[340px]
              h-12
              bg-[#141C28]
              border
              border-[#243041]
              rounded-xl
              pl-11
              pr-4
              outline-none
              focus:border-[#4F6BFF]
            "
          />
        </div>

        {/* Status */}

        <button
          className="
            h-12
            px-5
            rounded-xl
            bg-[#141C28]
            border
            border-[#243041]
            flex
            items-center
            gap-2
          "
        >
          <Filter size={17} />
          All Status
          <ChevronDown size={16} />
        </button>
      </div>

      {/* New Batch */}

      <button
        className="
          h-12
          px-6
          rounded-xl
          bg-[#4F6BFF]
          flex
          items-center
          gap-2
          hover:bg-[#3F5AF5]
        "
      >
        <Plus size={18} />
        New Batch
      </button>
    </div>
  );
}

export default ReconciliationToolbar;
