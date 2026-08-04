import FileCard from "./FileCard";

function UploadedFilesCard({ files = [] }) {
  const ledgerFile = files.find((file) => file.fileType === "LEDGER");
  const bankFile = files.find((file) => file.fileType === "BANK");

  const formatFileSize = (bytes) => {
    if (!bytes) return "-";

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6">
      <h2 className="text-3xl font-semibold mb-6">2. Uploaded Files</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FileCard
          title="Ledger File"
          fileName={ledgerFile?.originalFileName || "-"}
          transactions="-"
          size={formatFileSize(ledgerFile?.fileSize)}
          status={ledgerFile?.uploadStatus}
        />

        <FileCard
          title="Bank Statement"
          fileName={bankFile?.originalFileName || "-"}
          transactions="-"
          size={formatFileSize(bankFile?.fileSize)}
          status={bankFile?.uploadStatus}
        />
      </div>
    </div>
  );
}

export default UploadedFilesCard;
