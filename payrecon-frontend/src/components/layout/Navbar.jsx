import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";
import DateRangeDropdown from "../common/DaysDropdown";
import CustomDateButton from "../common/CustomDateButton";

function Navbar() {
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
      "
    >
      <div>
        <h1 className="text-[22px] font-bold text-white">Dashboard</h1>

        <p className="text-gray-400 text-sm">Reconciliation overview.</p>
      </div>

      <div className="flex items-center gap-3">
        <DateRangeDropdown />
        <CustomDateButton />
        <SearchBar />
        <NotificationButton />
        <ProfileMenu />
      </div>
    </header>
  );
}

export default Navbar;
