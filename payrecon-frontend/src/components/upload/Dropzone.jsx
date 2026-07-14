import { CloudUpload } from "lucide-react";

function Dropzone() {
  return (
    <div
      className="
      border-2
      border-dashed
      border-[#3A4A63]
      rounded-2xl
      bg-[#141C28]
      py-20
      flex
      flex-col
      items-center
      justify-center
      text-center
      transition
      hover:border-[#4F6BFF]
      "
    >
      <div className="w-20 h-20 rounded-full bg-[#1A2233] flex items-center justify-center">
        <CloudUpload size={40} className="text-blue-400" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">Drag & Drop Files Here</h2>

      <p className="text-gray-400 mt-3 max-w-md">
        Upload bank statements, payment gateway reports, settlement files and
        reconciliation documents.
      </p>

      <button
        className="
        mt-8
        px-6
        h-12
        rounded-xl
        bg-[#4F6BFF]
        hover:bg-[#3F5AF5]
        transition"
      >
        Browse Files
      </button>

      <p className="text-gray-500 text-sm mt-6">
        CSV • XLSX • JSON • Maximum file size 100 MB
      </p>
    </div>
  );
}

export default Dropzone;
