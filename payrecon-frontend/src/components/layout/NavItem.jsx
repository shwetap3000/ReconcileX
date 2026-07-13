import { NavLink } from "react-router-dom";

function NavItem({ icon: Icon, title, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-4 h-12 rounded-xl px-4 text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-blue-600/20 text-white border-l-4 border-blue-500"
            : "text-gray-400 hover:bg-[#131C2C] hover:text-white"
        }`
      }
    >
      <Icon size={20} />

      <span>{title}</span>
    </NavLink>
  );
}

export default NavItem;