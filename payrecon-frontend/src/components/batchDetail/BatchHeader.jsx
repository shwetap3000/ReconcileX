import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  XCircle,
  Download,
  ChevronDown,
} from "lucide-react";

function BatchHeader() {
  return (
    <div className="flex items-start justify-between">

      {/* Left */}
      <div>

        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6">
          <ArrowLeft size={18} />
          <span>Back to Reconciliation</span>
        </button>

        <h1 className="text-4xl font-bold text-white">
          May Reconciliation Batch 1
        </h1>

        <div className="flex items-center gap-4 mt-4">

          <p className="text-gray-400">
            Batch ID :
            <span className="text-gray-200 ml-2">
              BATCH-2024-0512-001
            </span>
          </p>

          <span className="px-3 py-1 rounded-lg bg-green-500/15 text-green-400 border border-green-500/20 text-sm">
            Completed
          </span>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2 text-gray-400 mr-6">
          <Calendar size={18} />
          <span>May 12, 2024 10:30 AM</span>
        </div>

        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl font-medium">
          <CheckCircle2 size={18} />
          Approve
        </button>

        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl font-medium">
          <XCircle size={18} />
          Reject
        </button>

        <button className="flex items-center gap-2 border border-[#243041] hover:bg-[#182233] transition px-5 py-3 rounded-xl">
          <Download size={18} />
          Export
          <ChevronDown size={18} />
        </button>

      </div>

    </div>
  );
}

export default BatchHeader;