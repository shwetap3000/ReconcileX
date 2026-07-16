import React from "react";
import AuditFilters from "../components/audit/AuditFilters";
import AuditTable from "../components/audit/AuditTable";
import TodayActions from "../components/audit/TodayActions";
import RecentActivity from "../components/audit/RecentActivity";

const AuditTrail = () => {
  return (
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
  );
};

export default AuditTrail;
