import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table({ columns, data }) {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl overflow-hidden">
      <table className="w-full">
        <TableHeader columns={columns} />

        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;