function UploadProgress() {
  return (
    <div className="mt-8">

      <h3 className="text-xl font-semibold text-white">
        Upload Progress
      </h3>

      <div className="flex items-center gap-6 mt-4">

        <p className="text-gray-400 whitespace-nowrap">
          No files uploaded yet
        </p>

        <div className="flex-1 h-3 bg-[#1A2332] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4F6BFF]"
            style={{ width: "0%" }}
          />
        </div>

        <span className="text-gray-400 font-medium">
          0%
        </span>

      </div>

      <div className="border-t border-[#243041] mt-8" />

    </div>
  );
}

export default UploadProgress;