import Logo from "./Logo";
import NavItem from "./NavItem";
import { navigation } from "../../constants/navigation";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch(error) {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="w-55 bg-[#0B1220] border-r border-[#1F2937] flex flex-col">
      {/* Logo */}
      <div
        className="h-20 mb-3 border-b
        border-[#243041]
       flex items-center px-4"
      >
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-3">
        {navigation.map((item) =>
          item.action === "logout" ? (
            <button
              key={item.name}
              onClick={handleLogout}
              className="w-full"
            >
              <NavItem
                icon={item.icon}
                title={item.name}
              />
            </button>
          ) : (
            <NavItem
              key={item.path}
              icon={item.icon}
              title={item.name}
              path={item.path}
            />
          )
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
