import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#090D14]">
      <Outlet />
    </div>
  );
}