import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Batches from "../pages/Batches/Batches";
import Transactions from "../pages/Transactions/Transactions";
import Reconciliation from "../pages/Reconciliation/Reconciliation";
import Reports from "../pages/Reports/Reports";
import AuditTrail from "../pages/AuditTrail/AuditTrail";
import Settings from "../pages/Settings/Settings";
import Users from "../pages/Users/Users";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/audit-trail" element={<AuditTrail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;