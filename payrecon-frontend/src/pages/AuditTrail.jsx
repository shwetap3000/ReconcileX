import React from "react";
import AuditFilters from "../components/audit/AuditFilters";
import AuditTable from "../components/audit/AuditTable";
import TodayActions from "../components/audit/TodayActions";
import RecentActivity from "../components/audit/RecentActivity";
import CustomDateButton from "../components/common/CustomDateButton";
import DateRangeDropdown from "../components/common/DaysDropdown";
import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/layout/SearchBar";

const AuditTrail = () => {
  return (
    <>
      <Navbar
        title="Audit Trail"
        subtitle="System activity and user actions."
        actions={
          <>
            <DateRangeDropdown />
            <CustomDateButton />
            <SearchBar />
          </>
        }
      />
      <div className="grid grid-cols-12 gap-6">
        {/* Left Side */}
        <div className="col-span-9">
          <AuditFilters />

          <div className="mt-6">
            <AuditTable />
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-3 space-y-6">
          <TodayActions />

          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default AuditTrail;
