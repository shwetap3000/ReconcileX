import FileCard from "./FileCard";

function UploadedFilesCard() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6">
      <h2 className="text-3xl font-semibold mb-6">2. Uploaded Files</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FileCard
          title="Ledger File"
          fileName="ledger_may_2026.csv"
          transactions={6350}
          size="1.8 MB"
        />

        <FileCard
          title="Bank Statement"
          fileName="bank_may_2026.csv"
          transactions={6304}
          size="1.7 MB"
        />
      </div>
    </div>
  );
}

export default UploadedFilesCard;
