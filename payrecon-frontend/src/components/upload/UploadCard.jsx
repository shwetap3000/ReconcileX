import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";

const UploadCard = ({ title, type, file, setFile }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="bg-[#141c2f] border border-[#232d45] rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6 text-center">
        {title}
      </h3>

      <div className="border-2 border-dashed border-[#2b3855] rounded-lg h-60 flex flex-col items-center justify-center">
        <FileSpreadsheet size={58} className="text-[#3B82F6] mb-4" />

        <p className="text-[#9CA3AF] text-sm">Drag & Drop your CSV file here</p>

        <span className="text-[#6B7280] text-sm my-3">or</span>

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".csv"
          id={title}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Browse Button */}
        <label
          htmlFor={title}
          className="cursor-pointer px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
        >
          Browse Files
        </label>
      </div>

      {/* Selected File */}
      {file && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-[#263247] bg-[#0F172A] px-4 py-3">
          <div>
            <p className="text-white text-sm font-medium">{file.name}</p>

            <p className="text-xs text-[#8B9BB8]">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          <div className="text-green-500 text-xl font-bold">✓</div>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
