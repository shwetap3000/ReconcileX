import {
  LayoutDashboard,
  Upload,
  GitCompareArrows,
  ArrowLeftRight,
  CheckCheck,
  FileBarChart2,
  History,
  Users,
  Settings,
  CircleHelp,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Upload Files",
    icon: Upload,
    path: "/upload",
  },
  {
    name: "Reconciliation",
    icon: GitCompareArrows,
    path: "/reconciliation",
  },
  {
    name: "Transactions",
    icon: ArrowLeftRight,
    path: "/transactions",
  },
  {
    name: "Approvals",
    icon: CheckCheck,
    path: "/approvals",
  },
  {
    name: "Reports",
    icon: FileBarChart2,
    path: "/reports",
  },
  {
    name: "Audit Trail",
    icon: History,
    path: "/audit",
  },
  {
    name: "Users",
    icon: Users,
    path: "/users",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    name: "Help",
    icon: CircleHelp,
    path: "/help",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-48 min-h-screen bg-[#111827] border-r border-slate-800 flex flex-col fixed top-0 left-0 h-screen z-50">
      {" "}
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-800 flex items-center justify-center font-bold text-lg">
            P
          </div>

          <div>
            <h1 className="text-[20px] font-bold text-white">PayRecon</h1>
          </div>
        </div>
        <p className="text-xs text-slate-400 py-2 pb-0">
          Payment Reconciliation &
          <br />
          Audit Trail System
        </p>
      </div>
      <nav className="px-2 flex-1 mt-4">
        {" "}
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-1.5 rounded-md mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-blue-400"
                }`
              }
            >
              <Icon size={18} />

              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 mb-2">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-blue-500/50">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center font-semibold text-white">
            S
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white">Shweta</h3>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
