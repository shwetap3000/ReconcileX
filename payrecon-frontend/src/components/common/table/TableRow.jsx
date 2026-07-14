import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";
import ActionMenu from "./ActionMenu";

function TableRow({ row, columns }) {
  return (
    <tr className="border-b border-[#243041] hover:bg-[#182233] transition">

      {columns.map((column) => {
        const value = row[column.accessor];

        if (column.accessor === "status") {
          return (
            <td key={column.accessor} className="px-6 py-5">
              <StatusBadge status={value} />
            </td>
          );
        }

        if (column.accessor === "progress") {
          return (
            <td key={column.accessor} className="px-6 py-5">
              <ProgressBar value={value} />
            </td>
          );
        }

        if (column.accessor === "action") {
          return (
            <td key={column.accessor} className="px-6 py-5">
              <ActionMenu />
            </td>
          );
        }

        return (
          <td
            key={column.accessor}
            className="px-6 py-5 text-gray-300"
          >
            {value}
          </td>
        );
      })}

    </tr>
  );
}

export default TableRow;