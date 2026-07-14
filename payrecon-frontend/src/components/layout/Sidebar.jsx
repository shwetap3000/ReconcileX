import Logo from "./Logo";
import NavItem from "./NavItem";
import { navigation } from "../../constants/navigation";
import { ArrowLeft } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 bg-[#0B1220] border-r border-[#1F2937] flex flex-col">
      {/* Logo */}
      <div className="h-24 flex items-center px-8">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2">
        {navigation.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            title={item.name}
            path={item.path}
          />
        ))}
      </div>

      {/* Collapse */}
      <div className="p-5">
        <button
          className="
          w-full
          h-12
          rounded-xl
          border
          border-[#243041]
          flex
          items-center
          justify-center
          gap-2
          text-gray-400
          hover:bg-[#111827]
          transition"
        >
          <ArrowLeft size={18} />
          Collapse
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
