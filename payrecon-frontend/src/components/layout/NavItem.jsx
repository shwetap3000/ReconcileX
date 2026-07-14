import { NavLink } from "react-router-dom";

function NavItem({ icon: Icon, title, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-2 h-11 rounded-l-xl rounded-r-xl px-2 text-[14px] font-medium transition-all duration-200
        ${
          isActive
            ? "bg-blue-600/20 text-white border-l-3 border-blue-500"
            : "text-gray-400 hover:bg-[#131C2C] hover:text-white"
        }`
      }
    >
      <Icon size={17} />

      <span>{title}</span>
    </NavLink>
  );
}

export default NavItem;
