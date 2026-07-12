import BatchStatusBadge from "./BatchStatusBadge";

const batches = [
  {
    batchId: "BATCH-250519-001",
    uploadedBy: "Rudra",
    uploadedOn: "19 May 2025",
    ledger: 6250,
    bank: 6248,
    match: "92.18%",
    status: "APPROVED",
  },
  {
    batchId: "BATCH-250518-002",
    uploadedBy: "Rudra",
    uploadedOn: "18 May 2025",
    ledger: 4120,
    bank: 4115,
    match: "93.45%",
    status: "SUBMITTED",
  },
  {
    batchId: "BATCH-250517-001",
    uploadedBy: "Rudra",
    uploadedOn: "17 May 2025",
    ledger: 5630,
    bank: 5620,
    match: "90.21%",
    status: "REJECTED",
  },
];


const BatchTable = () => {
  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="text-slate-400 text-sm">

          <tr className="border-b border-[#232d45]">

            <th className="text-left px-6 py-4">
              Batch ID
            </th>

            <th className="text-left px-6 py-4">
              Uploaded By
            </th>

            <th className="text-left px-6 py-4">
              Uploaded On
            </th>

            <th className="text-left px-6 py-4">
              Ledger
            </th>

            <th className="text-left px-6 py-4">
              Bank
            </th>

            <th className="text-left px-6 py-4">
              Match %
            </th>

            <th className="text-left px-6 py-4">
              Status
            </th>

            <th className="text-left px-6 py-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>
  {batches.map((batch) => (
    <tr
      key={batch.batchId}
      className="border-b border-[#232d45] hover:bg-[#1a2338] transition"
    >
      <td className="px-6 py-4 text-blue-400">
        {batch.batchId}
      </td>

      <td className="px-6 py-4 text-white">
        {batch.uploadedBy}
      </td>

      <td className="px-6 py-4 text-slate-300">
        {batch.uploadedOn}
      </td>

      <td className="px-6 py-4 text-white">
        {batch.ledger.toLocaleString()}
      </td>

      <td className="px-6 py-4 text-white">
        {batch.bank.toLocaleString()}
      </td>

      <td className="px-6 py-4 text-green-400 font-medium">
        {batch.match}
      </td>

      <td className="px-6 py-4">
        <BatchStatusBadge status={batch.status} />
      </td>

      <td className="px-6 py-4">
        <button className="px-4 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition">
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

    </div>
  );
};

export default BatchTable;