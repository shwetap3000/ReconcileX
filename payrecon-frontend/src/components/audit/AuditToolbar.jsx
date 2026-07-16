import { Download, ChevronDown } from "lucide-react";

function AuditToolbar() {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Audit Trail</h1>

        <p className="text-gray-400 mt-2">
          Track all activities and changes across the system.
        </p>
      </div>

      <button
        className="
        h-12
        px-5
        rounded-xl
        border
        border-[#243041]
        bg-[#141C28]
        flex
        items-center
        gap-3
        hover:bg-[#182233]
      "
      >
        <Download size={18} />
        Export Logs
        <ChevronDown size={18} />
      </button>
    </div>
  );
}

export default AuditToolbar;
