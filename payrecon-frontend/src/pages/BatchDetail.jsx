import BatchDetailHeader from "../components/batchDetail/BatchDetailHeader";
import BatchInfoCard from "../components/batchDetail/BatchInfoCard";
import UploadedFilesCard from "../components/batchDetail/UploadedFilesCard";
import ReconciliationSummaryCard from "../components/batchDetail/ReconciliationSummaryCard";
// import ActivityTimeline from "../components/batchDetail/ActivityTimeline";

function BatchDetail() {
  return (
    <div className="space-y-6">
      <BatchDetailHeader />

      <BatchInfoCard />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <UploadedFilesCard />

        <ReconciliationSummaryCard />
      </div>

      {/* <ActivityTimeline /> */}
    </div>
  );
}

export default BatchDetail;
