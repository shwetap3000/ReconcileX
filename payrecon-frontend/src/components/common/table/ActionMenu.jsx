import { MoreHorizontal } from "lucide-react";

function ActionMenu() {
  return (
    <button
      className="
        w-9
        h-9
        rounded-lg
        border
        border-[#243041]
        flex
        items-center
        justify-center
        hover:bg-[#1C2637]
      "
    >
      <MoreHorizontal size={18} />
    </button>
  );
}

export default ActionMenu;