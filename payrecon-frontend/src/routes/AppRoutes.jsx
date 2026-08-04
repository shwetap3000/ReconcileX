import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";
import RoleProtectedRoute from "./RoleProtectedRoute";

import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Reconciliation from "../pages/Reconciliation";
import UploadFiles from "../pages/UploadFiles";
import Reports from "../pages/Reports";
import AuditTrail from "../pages/AuditTrail";
import Approvals from "../pages/Approvals";
import Batch from "../pages/Batch";
import BatchDetail from "../pages/BatchDetail";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";
import MyProfile from "../pages/Myprofile";
import Unauthorized from "../pages/Unauthorized";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import { ROLES } from "../constants/roles";
import ChangePassword from "../pages/ChangePassword";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/403" element={<Unauthorized />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reconciliation" element={<Reconciliation />} />
            <Route path="/upload" element={<UploadFiles />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit" element={<AuditTrail />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/batch/:id" element={<BatchDetail />} />
            <Route path="/batches" element={<Batch />} />
            {/* <Route path="/batche-detail" element={<BatchDetail />} /> */}
            <Route path="/my-profile" element={<MyProfile />} />

            <Route
              element={<RoleProtectedRoute allowedRoles={[ROLES.ADMIN]} />}
            >
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/edit-user" element={<EditUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
