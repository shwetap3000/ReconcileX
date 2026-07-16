import { Search, Calendar, ChevronDown, SlidersHorizontal } from "lucide-react";

function AuditFilters() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6">
      <div className="grid grid-cols-5 gap-5">
        {/* Search */}

        <div className="col-span-2">
          <label className="text-sm text-gray-400 block mb-2">Search</label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              placeholder="Search by user, action, batch ID..."
              className="w-full h-12 rounded-xl bg-[#111827] border border-[#243041] pl-11 pr-4 outline-none"
            />
          </div>
        </div>

        {/* User */}

        <div>
          <label className="text-sm text-gray-400 block mb-2">User</label>

          <button className="w-full h-12 rounded-xl border border-[#243041] bg-[#111827] flex justify-between items-center px-4">
            All Users
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Action */}

        <div>
          <label className="text-sm text-gray-400 block mb-2">Action</label>

          <button className="w-full h-12 rounded-xl border border-[#243041] bg-[#111827] flex justify-between items-center px-4">
            All Actions
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Batch */}

        <div>
          <label className="text-sm text-gray-400 block mb-2">Batch</label>

          <button className="w-full h-12 rounded-xl border border-[#243041] bg-[#111827] flex justify-between items-center px-4">
            All Batches
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <button className="w-72 h-12 rounded-xl border border-[#243041] bg-[#111827] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            May 6, 2024 - May 12, 2024
          </div>

          <ChevronDown size={18} />
        </button>

        <button className="h-12 px-6 rounded-xl border border-[#243041] flex items-center gap-2 hover:bg-[#182233]">
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>
    </div>
  );
}

export default AuditFilters;
