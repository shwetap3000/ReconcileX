function TableHeader({ columns }) {
  return (
    <thead className="border-b border-[#243041]">
      <tr>
        {columns.map((column) => (
          <th
            key={column.accessor}
            className="text-left px-6 py-5 text-sm font-medium text-gray-400"
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;