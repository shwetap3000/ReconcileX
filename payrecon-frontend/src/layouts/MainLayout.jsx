import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const MainLayout = () => {
  return (
    <div className="flex bg-slate-950 text-white">
      <Sidebar />

      <div className="ml-48 flex-1">
        <Navbar />

        <main className="pt-20 px-8 pb-8 min-h-screen bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
