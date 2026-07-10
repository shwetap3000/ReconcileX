import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Reconciliation from "./pages/Reconciliation";
import Transactions from "./pages/Transactions";
import Approvals from "./pages/Approvals";
import Reports from "./pages/Reports";
import AuditTrail from "./pages/AuditTrail";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/reconciliation" element={<Reconciliation />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/audit" element={<AuditTrail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;
