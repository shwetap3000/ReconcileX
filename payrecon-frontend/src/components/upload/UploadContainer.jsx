import BatchDetails from "./BatchDetails";
import UploadFooter from "./UploadFooter";
import UploadProgress from "./UploadProgress";
import UploadSection from "./UploadSection";
import ValidationMessage from "./ValidationMessage";
import Navbar from "../layout/Navbar";
import CreateBatchBtn from "../common/CreateBatchBtn";
import { Plus } from "lucide-react";

function UploadContainer() {
  return (
    <div className="space-y-6">
      <Navbar
        title="Upload Files"
        subtitle="Create a reconciliation batch."
        actions={
          <>
            <CreateBatchBtn />
          </>
        }
      />

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
