const batchInfo = {
  batchId: "BATCH-2024-05-20-001",
  bankAccount: "HDFC Bank - 1234",
  statementDate: "20 May 2024",
  ledgerRange: "01 May 2024 - 20 May 2024",
  createdBy: "Admin User",
  createdAt: "20 May 2024, 09:15 AM",
};

const BatchInfoCard = () => {
  return (
    <div className="rounded-xl border border-slate-700 p-6">
      <h2 className="text-lg font-semibold mb-6">
        Batch Information
      </h2>

      <div className="space-y-5">

        <InfoRow
          label="Batch ID"
          value={batchInfo.batchId}
        />

        <InfoRow
          label="Bank Account"
          value={batchInfo.bankAccount}
        />

        <InfoRow
          label="Statement Date"
          value={batchInfo.statementDate}
        />

        <InfoRow
          label="Ledger Range"
          value={batchInfo.ledgerRange}
        />

        <InfoRow
          label="Created By"
          value={batchInfo.createdBy}
        />

        <InfoRow
          label="Created At"
          value={batchInfo.createdAt}
        />

      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span className="text-sm font-medium text-right">
        {value}
      </span>
    </div>
  );
};

export default BatchInfoCard;