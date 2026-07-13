import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

// import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
// import Batches from "../pages/Batches/Batches";
// import Transactions from "../pages/Transactions/Transactions";
// import Reconciliation from "../pages/Reconciliation/Reconciliation";
// import Exceptions from "../pages/Exceptions/Exceptions";
// import Reports from "../pages/Reports/Reports";
// import AuditTrail from "../pages/AuditTrail/AuditTrail";
// import Settings from "../pages/Settings/Settings";
// import Integrations from "../pages/Integrations/Integrations";
// import Users from "../pages/Users/Users";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Auth Routes */}

        {/* <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route> */}

        {/* Dashboard Routes */}

        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          {/* <Route path="/batches" element={<Batches />} />

          <Route path="/transactions" element={<Transactions />} />

          <Route path="/reconciliation" element={<Reconciliation />} />

          <Route path="/exceptions" element={<Exceptions />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/audit-trail" element={<AuditTrail />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/integrations" element={<Integrations />} />

          <Route path="/users" element={<Users />} /> */}

        </Route>

      </Routes>

    </BrowserRouter>
  );
}