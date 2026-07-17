import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div className="flex h-screen bg-[#090D14]">
      <Sidebar />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <main className="p-3 pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
