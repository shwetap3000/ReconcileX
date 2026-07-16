import { AuditColumns } from "./AuditColumns";
import { auditData } from "../../constants/auditData";
import AuditRow from "./AuditRow";

function AuditTable() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#161F2C] border-b border-[#243041]">
          <tr>
            {AuditColumns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-5 text-left text-sm font-medium text-gray-400"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {auditData.map((row) => (
            <AuditRow key={row.id} row={row} columns={AuditColumns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditTable;
