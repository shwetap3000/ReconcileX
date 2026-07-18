import { Search, Filter, Plus, ChevronDown } from "lucide-react";

function ReconciliationToolbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <button
          className="
            h-11
            mr-2
            px-3
            rounded-xl
            bg-[#141C28]
            border
            border-[#243041]
            flex
            items-center
            gap-2
          "
        >
          <Filter size={16} />
          All Status
          <ChevronDown size={16} />
        </button>
      </div>

      {/* New Batch */}

      <div className="relative">
        <button
          className="
          h-11
          px-3
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
