import { FileSpreadsheet } from "lucide-react";

function UploadCard({ title, subtitle, buttonText = "Browse Files" }) {
  return (
    <div
      className="
        border
        border-dashed
        border-[#2B3648]
        rounded-2xl
        bg-[#111827]
        px-8
        py-10
        flex
        flex-col
        items-center
        justify-center
        text-center
        transition-all
        hover:border-[#4F6BFF]
      "
    >
      {/* Icon */}

      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
        <FileSpreadsheet size={42} className="text-green-500" />
      </div>

      {/* Title */}

      <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>

      {/* Subtitle */}

      <p className="mt-2 text-gray-400">{subtitle}</p>

      {/* Browse Button */}

      <button
        className="
          mt-8
          px-8
          h-11
          rounded-xl
          border
          border-[#243041]
          hover:border-[#4F6BFF]
          hover:bg-[#1A2332]
          transition
        "
      >
        {buttonText}
      </button>

      {/* Supported */}

      <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        Supported format: CSV (.csv)
      </div>
    </div>
  );
}

export default UploadCard;
