import { ArrowLeft, Download, MoreHorizontal } from "lucide-react";

function BatchDetailHeader() {
  return (
    <>
      {/* Top Header */}

      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <button
            className="
              w-12
              h-12
              rounded-xl
              border
              border-[#243041]
              bg-[#141C28]
              flex
              items-center
              justify-center
              hover:bg-[#1B2535]
              transition
            "
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-4xl font-bold">May Reconciliation Batch 1</h1>

            <p className="text-gray-400 mt-1">
              Batch information, files and workflow status.
            </p>

            <div className="flex items-center gap-4 mt-5">
              <span className="text-xl">
                <span className="text-gray-400">Batch ID:</span>{" "}
                BATCH-2026-0514-001
              </span>

              <span
                className="
                  px-6
                  py-2
                  rounded-xl
                  bg-green-500/15
                  border
                  border-green-500/20
                  text-green-400
                  font-semibold
                "
              >
                RECONCILED
              </span>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col items-end gap-4">
          <p className="text-gray-400">Created May 14, 2026 10:30 AM</p>

          <div className="flex gap-3">
            <button
              className="
                h-11
                px-5
                rounded-xl
                border
                border-[#243041]
                bg-[#141C28]
                flex
                items-center
                gap-2
                hover:bg-[#1B2535]
              "
            >
              <Download size={18} />
              Export
            </button>

            <button
              className="
                w-11
                h-11
                rounded-xl
                border
                border-[#243041]
                bg-[#141C28]
                flex
                items-center
                justify-center
                hover:bg-[#1B2535]
              "
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BatchDetailHeader;
