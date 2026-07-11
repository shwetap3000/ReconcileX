import {
  Bell,
  Menu,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 bg-[#111827] border-b border-slate-800 px-8 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-5">

        <button className="p-2 rounded-lg hover:bg-slate-800 transition">
          <Menu size={22} className="text-slate-300" />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Dashboard
          </h1>

          <p className="text-sm text-slate-400">
            Overview of reconciliation activities
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-slate-800 transition">

          <Bell size={22} className="text-slate-300" />

          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-xs flex items-center justify-center font-semibold">
            3
          </span>

        </button>

        {/* User */}
        <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition">

          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-semibold text-white">
            R
          </div>

          <div className="text-left">

            <p className="text-white text-sm font-medium">
              Rudra
            </p>

            <p className="text-xs text-slate-400">
              Maker
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />

        </button>

      </div>

    </header>
  );
};

export default Navbar;