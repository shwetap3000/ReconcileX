import UploadCard from "../components/upload/UploadCard";
import BatchInformation from "../components/upload/BatchInformation";
import { useState } from "react";

const Upload = () => {
  const [ledgerFile, setLedgerFile] = useState(null);
  const [bankFile, setBankFile] = useState(null);

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-white">Upload Files</h1>

        <p className="text-[#8B9BB8] mt-1">
          Upload internal ledger and bank statement CSV files
        </p>
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UploadCard
          title="Internal Ledger CSV"
          type="ledger"
          file={ledgerFile}
          setFile={setLedgerFile}
        />

        <UploadCard
          title="Bank Statement CSV"
          type="bank"
          file={bankFile}
          setFile={setBankFile}
        />
      </div>

      {/* Batch Info */}
      <BatchInformation />
    </div>
  );
};

export default Upload;
