import { Filter, Plus, ChevronDown } from "lucide-react";
import SearchBar from "../layout/SearchBar";
import { useState } from "react";

function BatchToolbar({
  statusFilter,
  onStatusChange,
  search,
  onSearchChange,
  refreshBatches,
  onCreateBatch,
}) {
  const [statusOpen, setStatusOpen] = useState(false);

  const statusOptions = [
    { value: "ALL", label: "All Status" },
    { value: "DRAFT", label: "Draft" },
    {
      value: "PARTIAL_UPLOAD",
      label: "Partial Upload",
    },
    { value: "UPLOADED", label: "Uploaded" },
    { value: "SUBMITTED", label: "Submitted" },
    {
      value: "UNDER_REVIEW",
      label: "Under Review",
    },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
    { value: "RECONCILED", label: "Reconciled" },
  ];

  const selectedStatus =
    statusOptions.find((option) => option.value === statusFilter)?.label ||
    "All Status";

  return (
    <div className="flex items-center gap-3 relative z-[100]">
      {/* Status Dropdown */}

      <div className="relative">
        <button
          type="button"
          onClick={() => setStatusOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          <Filter size={18} />

          <span>{selectedStatus}</span>

          <ChevronDown
            size={18}
            className={`transition-transform ${statusOpen ? "rotate-180" : ""}`}
          />
        </button>

        {statusOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-700 bg-slate-900 shadow-xl z-[100] overflow-hidden">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onStatusChange(option.value);
                  setStatusOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition ${
                  statusFilter === option.value
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-white hover:bg-slate-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Create Batch */}

      <button
        type="button"
        onClick={onCreateBatch}
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

      {/* Search */}

      <SearchBar value={search} onChange={onSearchChange} />
    </div>
  );
}

export default BatchToolbar;
