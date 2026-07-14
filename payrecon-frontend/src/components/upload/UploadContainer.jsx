import BatchDetails from "./BatchDetails";
import UploadFooter from "./UploadFooter";
import UploadProgress from "./UploadProgress";
import UploadSection from "./UploadSection";
import ValidationMessage from "./ValidationMessage";

function UploadContainer() {
  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div>
        <h1 className="text-4xl font-bold text-white">Upload Files</h1>

        <p className="text-gray-400 mt-2">
          Upload your ledger and bank statement files to create a reconciliation
          batch.
        </p>
      </div>

      {/* Main Card */}

      <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-8">
        <BatchDetails />
        <UploadSection />
        <UploadProgress />
        <ValidationMessage />
        <UploadFooter />
      </div>
    </div>
  );
}

export default UploadContainer;
