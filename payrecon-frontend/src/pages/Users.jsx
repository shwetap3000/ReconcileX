import Navbar from "../components/layout/Navbar";

import SearchBar from "../components/layout/SearchBar";
import DateRangeDropdown from "../components/common/DaysDropdown";
import CustomDateButton from "../components/common/CustomDateButton";

import UserStats from "../components/users/UserStats";
import UserFilters from "../components/users/UserFilters";
import UserTable from "../components/users/UserTable";

function Users() {
  return (
    <>
      <Navbar
        title="Users & Roles"
        subtitle="Manage system users and their access."
        actions={
          <>
            <DateRangeDropdown />

            <CustomDateButton />

            <SearchBar />
          </>
        }
      />

      <UserStats />

      <UserFilters />

      <UserTable />
    </>
  );
}

export default Users;
