import {
  FiHome,
  FiLayers,
  FiRepeat,
  FiAlertCircle,
  FiFileText,
  FiClock,
  FiUpload,
  FiSettings,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

export const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: FiHome,
  },
  {
    name: "Batches",
    path: "/batches",
    icon: FiLayers,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: FiRepeat,
  },
  {
    name: "Reconciliation",
    path: "/reconciliation",
    icon: FiLayers,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FiFileText,
  },
  {
    name: "Audit Trail",
    path: "/audit",
    icon: FiClock,
  },
  {
    name: "Upload Files",
    path: "/upload",
    icon: FiUpload,
  },
  {
    name: "Users & Roles",
    path: "/users",
    icon: FiUsers,
  },
  {
    name: "Logout",
    icon: FiLogOut,
    action: "logout",
  },
];
