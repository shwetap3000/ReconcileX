import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";

function Navbar({
  title,
  subtitle,
  actions
}) {
  return (
    <header
      className="
        h-18
        px-8
        border-[#243041]
        bg-[#090D14]
        flex
        items-center
        justify-between
        mb-3
      "
    >
      <div>
        <h1 className="text-[22px] font-bold text-white">{title}</h1>

        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {actions}
        <NotificationButton />
        <ProfileMenu />
      </div>
    </header>
  );
}

export default Navbar;
