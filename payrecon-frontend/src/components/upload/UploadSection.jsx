import UploadCard from "./UploadCard";

function UploadSection() {
  return (
    <div className="mt-8">

      <h2 className="text-2xl font-semibold text-white">
        Upload Files
      </h2>

      <p className="text-gray-400 mt-2 mb-8">
        Upload both files to proceed with reconciliation
      </p>

      <div className="grid grid-cols-2 gap-6">

        <UploadCard
          title="Ledger CSV"
          subtitle="Drag and drop your ledger file here"
        />

        <UploadCard
          title="Bank Statement CSV"
          subtitle="Drag and drop your bank statement file here"
        />

      </div>

      <div className="border-t border-[#243041] mt-10" />

    </div>
  );
}

export default UploadSection;