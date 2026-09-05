import React, { useEffect, useState } from "react";

import AuditTable from "../components/audit/AuditTable";
import TodayActions from "../components/audit/TodayActions";
import RecentActivity from "../components/audit/RecentActivity";

import CustomDateButton from "../components/common/CustomDateButton";
import DateRangeDropdown from "../components/common/DaysDropdown";
import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/layout/SearchBar";

import { getAuditLogs, getAuditStats } from "../api/auditApi";

const AuditTrail = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  const limit = 10;

  const fetchAuditData = async () => {
    try {
      setLoading(true);

      const [logsRes, statsRes] = await Promise.all([
        getAuditLogs({
          page,
          limit,
        }),
        getAuditStats(),
      ]);

      const logsData = logsRes.data;

      setLogs(logsData.logs || []);
      setTotalPages(logsData.totalPages || 1);
      setTotalLogs(logsData.total || 0);

      setStats(statsRes.data.stats);
    } catch (error) {
      console.error("Failed to fetch audit data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditData();
  }, [page]);

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
        <div className="col-span-9">
          <div className="mt-6">
            <AuditTable
              logs={logs}
              loading={loading}
              page={page}
              totalPages={totalPages}
              totalLogs={totalLogs}
              onPageChange={setPage}
            />
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <TodayActions stats={stats} loading={loading} />

          <RecentActivity logs={logs} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default AuditTrail;