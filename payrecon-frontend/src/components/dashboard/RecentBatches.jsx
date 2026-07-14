import Table from "../common/table/DataTable";
import { recentBatches } from "../../constants/recentBatches";

const columns = [
  {
    header: "Batch ID",
    accessor: "id",
  },
  {
    header: "Created Date",
    accessor: "date",
  },
  {
    header: "Transactions",
    accessor: "transactions",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Progress",
    accessor: "progress",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

function RecentBatches() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold text-white">
          Recent Batches
        </h2>

        <button className="text-blue-400 hover:text-blue-300">
          View All →
        </button>

      </div>

      <Table
        columns={columns}
        data={recentBatches}
      />

    </div>
  );
}

export default RecentBatches;