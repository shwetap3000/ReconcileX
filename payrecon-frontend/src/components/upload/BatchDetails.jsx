import { CalendarDays } from "lucide-react";

function BatchDetails() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-white mb-8">
        Batch Details
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {/* Batch Name */}

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Batch Name
          </label>

          <input
            type="text"
            placeholder="Enter batch name"
            className="
              w-full
              h-12
              rounded-xl
              bg-[#0F172A]
              border
              border-[#243041]
              px-4
              outline-none
              focus:border-[#4F6BFF]
            "
          />
        </div>

        {/* Description */}

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Description
            <span className="text-gray-500 ml-1">
              (Optional)
            </span>
          </label>

          <textarea
            rows={2}
            placeholder="Enter description"
            className="
              w-full
              rounded-xl
              bg-[#0F172A]
              border
              border-[#243041]
              px-4
              py-3
              resize-none
              outline-none
              focus:border-[#4F6BFF]
            "
          />
        </div>

        {/* Date */}

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Reconciliation Date
          </label>

          <div className="relative">

            <input
              type="text"
              value="May 14, 2025"
              readOnly
              className="
                w-full
                h-12
                rounded-xl
                bg-[#0F172A]
                border
                border-[#243041]
                px-4
                pr-12
              "
            />

            <CalendarDays
              size={18}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

          </div>

        </div>

      </div>

      {/* Divider */}

      <div className="border-t border-[#243041] mt-8" />
    </>
  );
}

export default BatchDetails;