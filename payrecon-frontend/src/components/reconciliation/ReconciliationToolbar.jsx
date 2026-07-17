import { Search, Filter, Plus, ChevronDown } from "lucide-react";

function ReconciliationToolbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        {/* Search */}

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

      <div className="relative">
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
    </div>
  );
}

export default ReconciliationToolbar;
