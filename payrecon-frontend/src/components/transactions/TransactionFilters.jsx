import {
  Search,
  CalendarDays,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

function TransactionFilters() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-5">

      <div className="grid grid-cols-5 gap-5">

        {/* Search */}

        <div className="col-span-2">

          <label className="block text-sm text-gray-400 mb-2">
            Search
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search by transaction ID, reference..."
              className="
                w-full
                h-12
                rounded-xl
                bg-[#111827]
                border
                border-[#243041]
                pl-11
                pr-4
                outline-none
                focus:border-[#4F6BFF]
              "
            />

          </div>

        </div>

        {/* Status */}

        <div>

          <label className="block text-sm text-gray-400 mb-2">
            Status
          </label>

          <button className="w-full h-12 rounded-xl border border-[#243041] bg-[#111827] flex justify-between items-center px-4">

            All Status

            <ChevronDown size={18} />

          </button>

        </div>

        {/* Batch */}

        <div>

          <label className="block text-sm text-gray-400 mb-2">
            Batch
          </label>

          <button className="w-full h-12 rounded-xl border border-[#243041] bg-[#111827] flex justify-between items-center px-4">

            All Batches

            <ChevronDown size={18} />

          </button>

        </div>

        {/* Date */}

        <div>

          <label className="block text-sm text-gray-400 mb-2">
            Date Range
          </label>

          <button className="w-full h-12 rounded-xl border border-[#243041] bg-[#111827] flex justify-between items-center px-4">

            <div className="flex items-center gap-2">

              <CalendarDays size={17} />

              Last 30 Days

            </div>

            <ChevronDown size={18} />

          </button>

        </div>

      </div>

      {/* Bottom Row */}

      <div className="flex justify-end mt-5">

        <button className="h-11 px-5 rounded-xl border border-[#243041] hover:bg-[#182233] flex items-center gap-2">

          <SlidersHorizontal size={18} />

          Filters

        </button>

      </div>

    </div>
  );
}

export default TransactionFilters;