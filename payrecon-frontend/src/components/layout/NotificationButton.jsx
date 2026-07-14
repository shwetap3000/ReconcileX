import { Bell } from "lucide-react";

function NotificationButton() {
  return (
    <button
      className="
        relative
        w-9
        h-9
        rounded-xl
        bg-[#141C28]
        border
        border-[#243041]
        flex
        items-center
        justify-center
        hover:bg-[#1C2637]
      "
    >
      <Bell size={16} className="text-gray-300" />

      <span
        className="
          absolute
          top-2
          right-2
          w-2
          h-2
          rounded-full
          bg-red-500
        "
      />
    </button>
  );
}

export default NotificationButton;
