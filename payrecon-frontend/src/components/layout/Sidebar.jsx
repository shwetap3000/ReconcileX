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
    <aside className="w-72 min-h-screen bg-[#111827] border-r border-slate-800 flex flex-col">
      {" "}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg">
            P
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">PayRecon</h1>

            <p className="text-xs text-slate-400">
              Payment Reconciliation &
              <br />
              Audit Trail System
            </p>
          </div>
        </div>
      </div>
      <nav className="px-4 flex-1 mt-4">
        {" "}
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/40"
                    : "text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-1"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition">
          <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center font-semibold">
            R
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white">Rudra</h3>

            <p className="text-xs text-slate-400">Maker</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
