import React from "react";
import UserDetails from "../components/users/UserDetails";

const dummyUser = {
  initials: "RA",
  fullName: "Rahul Awasthi",
  email: "rahul.awasthi@reconcilx.com",
  role: "Admin",
  status: "Active",
  userId: "USR-00024",
  activeSince: "28 Jun 2025",

  createdBy: "Shweta (Admin)",
  createdAt: "28 Jun 2025, 09:15 AM",
  lastLogin: "06 Aug 2025, 10:24 AM",
  mustChangePassword: false,

  totalBatches: 48,
  totalApprovals: 126,
  totalRejections: 4,

  lastActivity: "Approved Batch BATCH-2026-007",
  passwordChangedAt: "15 Jul 2025",

  activities: [],
};

const UserDetailsPage = () => {
  return <UserDetails user={dummyUser} />;
};

export default UserDetailsPage;