import { Bell, ChevronDown, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

// to display different title and subtitle for each page in the navbar
const pageInfo = {
  "/": {
    title: "Dashboard",
    subtitle: "Overview of your reconciliation activity",
  },
  "/upload": {
    title: "Upload Files",
    subtitle: "Upload internal ledger and bank statement CSV files",
  },
  "/reconciliation": {
    title: "Reconciliation",
    subtitle: "Match and verify payment records",
  },
  "/transactions": {
    title: "Transactions",
    subtitle: "View and manage all transactions",
  },
  "/approvals": {
    title: "Dashboard",
    subtitle: "Overview of your reconciliation activity",
  },
  "/reports": {
    title: "Reports",
    subtitle: "Generate and export reconciliation reports",
  },
  "/audit": {
    title: "Dashboard",
    subtitle: "Overview of your reconciliation activity",
  },
  "/users": {
    title: "Users",
    subtitle: "Manage users and permissions",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Configure your application preferences",
  },
  "/help": {
    title: "Dashboard",
    subtitle: "Overview of your reconciliation activity",
  },
};

const Navbar = () => {
  const location = useLocation();

  const currentPage = pageInfo[location.pathname] || {
    title: "Payment Reconciliation System",
    subtitle: "Manage payments and audit trails",
  };

  return (
    <header className="h-15 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-5">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          className="
            p-2
            rounded-lg
            text-slate-400
            hover:bg-slate-800
            hover:text-white
            transition
          "
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-xl font-semibold text-white">
            {currentPage.title}
          </h1>

          <p className="text-sm text-slate-400">{currentPage.subtitle} </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notification */}

        <button
          className="
            relative
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center
            text-slate-400
            hover:bg-slate-800
            hover:text-white
            transition
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              top-2
              right-2
              w-2
              h-2
              rounded-full
              bg-blue-500
            "
          />
        </button>

        {/* User */}

        <button
          className="
            flex
            items-center
            gap-3
            px-2
            py-1.5
            rounded-xl
            hover:bg-slate-800
            transition
          "
        >
          <div
            className="
              w-8
              h-8
              rounded-full
              bg-blue-600
              flex
              items-center
              justify-center
              font-semibold
              text-white
            "
          >
            S
          </div>

          <div className="text-left">
            <p className="text-sm font-medium text-white">Shweta</p>

            <p className="text-xs text-slate-400">Admin</p>
          </div>

          <ChevronDown size={16} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
