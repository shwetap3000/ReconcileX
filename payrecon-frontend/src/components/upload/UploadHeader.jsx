import { Upload } from "lucide-react";

function UploadHeader() {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Upload Files
        </h1>

        <p className="text-gray-400 mt-2">
          Upload bank statements and payment gateway reports for reconciliation.
        </p>

      </div>

      <button
        className="
        h-11
        px-5
        rounded-xl
        bg-[#4F6BFF]
        hover:bg-[#3f5af5]
        flex
        items-center
        gap-2
        transition"
      >
        <Upload size={18} />

        Upload History

      </button>

    </div>
  );
}

export default UploadHeader;