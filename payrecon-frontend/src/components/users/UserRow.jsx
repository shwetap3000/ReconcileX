import { useNavigate } from "react-router-dom";

function UserRow({ user, columns, refreshUsers }) {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/users/${user._id}`)}
      className="border-b border-[#243041] hover:bg-[#182233] transition cursor-pointer"
    >
      {columns.map((column) => (
        <td
          key={column.accessor}
          className="px-6 py-5"
          onClick={(e) => {
            if (column.accessor === "actions") {
              e.stopPropagation();
            }
          }}
        >
          {column.render
            ? column.render(user, refreshUsers)
            : user[column.accessor]}
        </td>
      ))}
    </tr>
  );
}

export default UserRow;
