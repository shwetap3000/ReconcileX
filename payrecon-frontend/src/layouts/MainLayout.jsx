import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Sidebar />

      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;