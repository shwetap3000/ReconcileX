function AuditRow({ row, columns }) {
  return (
    <tr className="border-b border-[#243041] hover:bg-[#182233] transition">
      {columns.map((column) => (
        <td key={column.accessor} className="px-6 py-5">
          {column.render ? column.render(row) : row[column.accessor]}
        </td>
      ))}
    </tr>
  );
}

export default AuditRow;
