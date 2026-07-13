import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Reconciliation from "../pages/Reconciliation";
import UploadFiles from "../pages/UploadFiles";
import Reports from "../pages/Reports";
import AuditTrail from "../pages/AuditTrail";
import Approvals from "../pages/Approvals";
import BatchDetail from "../pages/BatchDetail";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
          <Route path="/upload" element={<UploadFiles />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/audit" element={<AuditTrail />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/batch/:id" element={<BatchDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;