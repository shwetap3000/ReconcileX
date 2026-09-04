import { Filter, Plus, ChevronDown } from "lucide-react";
import SearchBar from "../layout/SearchBar";

function BatchToolbar() {
  return (
    <div className="flex items-center gap-3">
      <button
        className="
          h-11
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

      <button
        className="
          h-11
          px-4
          rounded-xl
          bg-[#4F6BFF]
          hover:bg-[#3F5AF5]
          flex
          items-center
          gap-2
        "
      >
        <Plus size={18} />
        Create Batch
      </button>

      <SearchBar />
    </div>
  );
}

export default BatchToolbar;
