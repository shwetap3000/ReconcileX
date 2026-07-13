import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#090D14] text-white">
      {/* Sidebar */}

      {/* Navbar */}

      {/* Main Content */}

      <main>
        <Outlet />
      </main>
    </div>
  );
}