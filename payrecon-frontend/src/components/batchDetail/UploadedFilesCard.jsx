import { useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  XCircle,
} from "lucide-react";

import FileCard from "./FileCard";
import {
  uploadBankFile,
  uploadLedgerFile,
} from "../../api/batchApi";

function UploadedFilesCard({
  batch,
  files = [],
  onRefresh,
}) {
  const ledgerInputRef = useRef(null);
  const bankInputRef = useRef(null);

  const [uploadingType, setUploadingType] = useState("");
  const [uploadError, setUploadError] = useState(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return "-";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Get the most recent file of a particular type.
  const getLatestFile = (type) => {
    const matchingFiles = files.filter(
      (file) => file.fileType === type,
    );

    if (matchingFiles.length === 0) {
      return null;
    }

    return [...matchingFiles].sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0),
    )[0];
  };

  const ledgerFile = getLatestFile("LEDGER");
  const bankFile = getLatestFile("BANK");

  const canUpload =
    batch?.status === "DRAFT" ||
    batch?.status === "PARTIAL_UPLOAD";

  const handleFileChange = async (event, type) => {
    const file = event.target.files?.[0];

    // Allows the same file to be selected again.
    event.target.value = "";

    if (!file || !batch?._id) {
      return;
    }

    try {
      setUploadError(null);
      setUploadingType(type);

      if (type === "LEDGER") {
        await uploadLedgerFile(batch._id, file);
      } else {
        await uploadBankFile(batch._id, file);
      }

      await onRefresh?.();
    } catch (error) {
      console.error(
        `Failed to upload ${type} file:`,
        error,
      );

      const response = error.response?.data;

      setUploadError({
        type,
        fileName: file.name,
        message:
          response?.message ||
          "File validation failed.",
        fileErrors: Array.isArray(response?.fileErrors)
          ? response.fileErrors
          : [],
        rowErrors: Array.isArray(response?.rowErrors)
          ? response.rowErrors
          : [],
        warnings: Array.isArray(response?.warnings)
          ? response.warnings
          : [],
      });

      // Refresh because backend creates a FAILED
      // BatchFile record when validation fails.
      await onRefresh?.();
    } finally {
      setUploadingType("");
    }
  };

  const renderError = () => {
    if (!uploadError) {
      return null;
    }

    const {
      type,
      fileName,
      message,
      fileErrors,
      rowErrors,
      warnings,
    } = uploadError;

    return (
      <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
        <div className="flex items-start gap-2">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0 text-red-400"
          />

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-red-300">
              {type === "BANK"
                ? "Bank file needs attention"
                : "Ledger file needs attention"}
            </p>

            <p className="mt-1 text-xs text-red-300/80">
              {fileName}
            </p>

            <p className="mt-2 text-sm text-red-200">
              {message}
            </p>

            {fileErrors.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-300">
                  File Issues
                </p>

                <div className="mt-1 space-y-1">
                  {fileErrors.map((item, index) => (
                    <p
                      key={`file-error-${index}`}
                      className="text-xs text-red-200"
                    >
                      •{" "}
                      {typeof item === "string"
                        ? item
                        : item?.message ||
                          "Invalid file"}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {rowErrors.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-300">
                  Row Issues
                </p>

                <div className="mt-1 max-h-32 space-y-1 overflow-y-auto pr-1">
                  {rowErrors
                    .slice(0, 20)
                    .map((item, index) => {
                      const row = item?.row;
                      const field = item?.field;
                      const itemMessage =
                        item?.message ||
                        "Invalid row";

                      return (
                        <p
                          key={`row-error-${index}`}
                          className="text-xs text-red-200"
                        >
                          •{" "}
                          {row !== null &&
                          row !== undefined
                            ? `Row ${row}`
                            : "File"}
                          {field
                            ? ` — ${field}`
                            : ""}
                          : {itemMessage}
                        </p>
                      );
                    })}
                </div>

                {rowErrors.length > 20 && (
                  <p className="mt-2 text-xs text-red-300/70">
                    Showing the first 20 issues out of{" "}
                    {rowErrors.length}.
                  </p>
                )}
              </div>
            )}

            {warnings.length > 0 && (
              <div className="mt-3 rounded-md border border-yellow-500/20 bg-yellow-500/5 p-2">
                <p className="text-xs font-semibold text-yellow-300">
                  Warnings
                </p>

                <div className="mt-1 space-y-1">
                  {warnings.map((warning, index) => (
                    <p
                      key={`warning-${index}`}
                      className="text-xs text-yellow-200"
                    >
                      •{" "}
                      {typeof warning === "string"
                        ? warning
                        : warning?.message ||
                          "Warning"}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-3 text-xs text-gray-400">
              Correct the issues in the file and
              upload it again.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="shrink-0 text-lg leading-none text-gray-500 hover:text-gray-300"
            aria-label="Close error"
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  const ledgerNeedsUpload =
    canUpload &&
    (!ledgerFile ||
      ledgerFile.uploadStatus === "FAILED");

  const bankNeedsUpload =
    canUpload &&
    (!bankFile ||
      bankFile.uploadStatus === "FAILED");

  return (
    <div className="rounded-xl border border-[#243041] bg-[#141C28] p-4">
      <h2 className="mb-4 text-lg font-semibold text-white">
        2. Uploaded Files
      </h2>

      {renderError()}

      {/* Ledger file input */}
      <input
        ref={ledgerInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(event) =>
          handleFileChange(event, "LEDGER")
        }
      />

      {/* Bank file input */}
      <input
        ref={bankInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(event) =>
          handleFileChange(event, "BANK")
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* LEDGER */}
        <FileCard
          title="Ledger File"
          fileName={
            ledgerFile?.originalFileName ||
            "No ledger file uploaded"
          }
          transactions={
            ledgerFile
              ? batch?.totalLedgerTransactions ?? 0
              : null
          }
          size={formatFileSize(
            ledgerFile?.fileSize,
          )}
          status={ledgerFile?.uploadStatus}
          missing={ledgerNeedsUpload}
          uploading={uploadingType === "LEDGER"}
          onUpload={() =>
            ledgerInputRef.current?.click()
          }
        />

        {/* BANK */}
        <FileCard
          title="Bank Statement"
          fileName={
            bankFile?.originalFileName ||
            "No bank file uploaded"
          }
          transactions={
            bankFile
              ? batch?.totalBankTransactions ?? 0
              : null
          }
          size={formatFileSize(
            bankFile?.fileSize,
          )}
          status={bankFile?.uploadStatus}
          missing={bankNeedsUpload}
          uploading={uploadingType === "BANK"}
          onUpload={() =>
            bankInputRef.current?.click()
          }
        />
      </div>

      {/* Failed upload information */}
      {canUpload &&
        (ledgerFile?.uploadStatus === "FAILED" ||
          bankFile?.uploadStatus === "FAILED") && (
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <XCircle
              size={14}
              className="shrink-0 text-red-400"
            />
            <span>
              The failed file can be corrected and
              uploaded again.
            </span>
          </div>
        )}

      {/* Both files successfully processed */}
      {ledgerFile?.uploadStatus === "PROCESSED" &&
        bankFile?.uploadStatus === "PROCESSED" && (
          <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
            <CheckCircle2
              size={14}
              className="shrink-0"
            />
            <span>
              Both files have been successfully
              validated.
            </span>
          </div>
        )}
    </div>
  );
}

export default UploadedFilesCard;