import { ShieldCheck, Play } from "lucide-react";

function UploadFooter() {
  return (
    <div className="mt-8 flex justify-end gap-4">

      <button
        className="
        h-11
        px-8
        rounded-xl
        border
        border-[#243041]
        hover:bg-[#1A2332]
        transition"
      >
        Cancel
      </button>

      <button
        className="
        h-11
        px-8
        rounded-xl
        border
        border-[#4F6BFF]
        text-[#4F6BFF]
        flex
        items-center
        gap-2
        hover:bg-[#1A2332]
        transition"
      >
        <ShieldCheck size={18} />

        Validate Files
      </button>

      <button
        className="
        h-11
        px-8
        rounded-xl
        bg-[#4F6BFF]
        hover:bg-[#3E5AF0]
        flex
        items-center
        gap-2
        transition"
      >
        <Play size={18} />

        Start Reconciliation
      </button>

    </div>
  );
}

export default UploadFooter;