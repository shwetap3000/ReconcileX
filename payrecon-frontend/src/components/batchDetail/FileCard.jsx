import {
  FileSpreadsheet,
  CheckCircle2,
  Clock3,
  XCircle,
  Upload,
} from "lucide-react";

function FileCard({
  title,
  fileName,
  transactions,
  size,
  status,
  missing,
  onUpload,
  uploading,
}) {
  const getStatus = () => {
    if (missing) {
      return (
        <button
          type="button"
          onClick={onUpload}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium hover:text-blue-300 disabled:opacity-50"
        >
          <Upload size={15} />
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      );
    }

    if (status === "FAILED") {
      return (
        <div className="flex items-center gap-1.5 text-red-400 text-sm font-medium">
          <XCircle size={15} />
          Upload Failed
        </div>
      );
    }

    if (status === "PROCESSING") {
      return (
        <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-medium">
          <Clock3 size={15} />
          Processing
        </div>
      );
    }

    if (status === "PROCESSED") {
      return (
        <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
          <CheckCircle2 size={15} />
          Validated
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
        <Clock3 size={15} />
        Pending
      </div>
    );
  };

  return (
    <div className="border border-[#243041] rounded-lg p-4 bg-[#111925]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-green-500/10 flex items-center justify-center">
          <FileSpreadsheet size={21} className="text-green-400" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-400">{title}</p>

            {getStatus()}
          </div>

          <p className="font-medium text-white text-sm mt-1 truncate">
            {fileName || "No file uploaded"}
          </p>

          {!missing && (
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              {typeof transactions === "number" && (
                <span>{transactions.toLocaleString()} transactions</span>
              )}

              <span>{size || "-"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileCard;
