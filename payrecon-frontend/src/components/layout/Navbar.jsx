import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";

function Navbar() {
  return (
    <header
      className="
        h-18
        px-8
        border-b
        border-[#243041]
        bg-[#090D14]
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>

        <p className="text-gray-400 text-xs mt-1">
          Welcome back! Here's your reconciliation overview.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <SearchBar />
        <NotificationButton />
        <ProfileMenu />
      </div>
    </header>
  );
}

export default Navbar;
