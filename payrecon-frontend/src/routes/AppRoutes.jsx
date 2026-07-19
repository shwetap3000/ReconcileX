import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./protectedRoute";

import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Reconciliation from "../pages/Reconciliation";
import UploadFiles from "../pages/UploadFiles";
import Reports from "../pages/Reports";
import AuditTrail from "../pages/AuditTrail";
import Approvals from "../pages/Approvals";
import BatchDetail from "../pages/BatchDetail";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";
import MyProfile from "../pages/Myprofile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
          <Route path="/upload" element={<UploadFiles />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/audit" element={<AuditTrail />} />
          <Route path="/approvals" element={<Approvals />} />
          {/* <Route path="/batch/:id" element={<BatchDetail />} /> */}
          <Route path="/batches" element={<BatchDetail />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
