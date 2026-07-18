import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* Background decorations will go here */}

      <div className="relative z-10">
        <Outlet />
      </div>

    </div>
  );
};

export default AuthLayout;