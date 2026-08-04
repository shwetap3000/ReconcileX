import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBatchDetails } from "../api/batchApi";

import BatchDetailHeader from "../components/batchDetail/BatchDetailHeader";
import BatchInfoCard from "../components/batchDetail/BatchInfoCard";
import UploadedFilesCard from "../components/batchDetail/UploadedFilesCard";
import ReconciliationSummaryCard from "../components/batchDetail/ReconciliationSummaryCard";
// import ActivityTimeline from "../components/batchDetail/ActivityTimeline";

function BatchDetail() {
  const { id } = useParams();

  const [batchDetails, setBatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBatchDetails();
  }, [id]);

  const fetchBatchDetails = async () => {
    try {
      setLoading(true);

      const response = await getBatchDetails(id);

      setBatchDetails(response);
    } catch (error) {
      console.error("Failed to load batch details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!batchDetails) {
    return <div className="text-red-400">Failed to load batch.</div>;
  }

  return (
    <div className="space-y-6">
      <BatchDetailHeader batch={batchDetails.batch} />

      <BatchInfoCard batch={batchDetails.batch} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <UploadedFilesCard files={batchDetails.files} />

        <ReconciliationSummaryCard summary={batchDetails.summary} />
      </div>

      {/* <ActivityTimeline /> */}
    </div>
  );
}

export default BatchDetail;
