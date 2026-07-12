import FilterToolbar from "./FilterToolbar";
import DataTable from "./DataTable";
import Pagination from "./Pagination";

const TransactionTable = () => {
  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">

      <FilterToolbar />

      <DataTable />

      <Pagination />

    </div>
  );
};

export default TransactionTable;