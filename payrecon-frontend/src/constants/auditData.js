export const auditData = [
  {
    id: 1,
    time: "May 12, 2024\n10:30 AM",
    user: {
      name: "Ritika Sharma",
      role: "Admin",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    action: {
      title: "Approved Batch",
      description: "Batch approved successfully",
    },
    batch: "BATCH-2024-0512-001",
    status: "Success",
  },

  {
    id: 2,
    time: "May 12, 2024\n10:28 AM",
    user: {
      name: "Ritik Verma",
      role: "Analyst",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    action: {
      title: "Uploaded Files",
      description: "Ledger & Bank Statement uploaded",
    },
    batch: "BATCH-2024-0512-001",
    status: "Success",
  },

  {
    id: 3,
    time: "May 12, 2024\n09:15 AM",
    user: {
      name: "Anjali Mehta",
      role: "Reviewer",
      avatar: "https://i.pravatar.cc/100?img=24",
    },
    action: {
      title: "Added Comment",
      description: "Please verify unmatched transactions.",
    },
    batch: "BATCH-2024-0512-001",
    status: "Info",
  },

  {
    id: 4,
    time: "May 11, 2024\n06:45 PM",
    user: {
      name: "Neha Singh",
      role: "Admin",
      avatar: "https://i.pravatar.cc/100?img=48",
    },
    action: {
      title: "Rejected Batch",
      description: "Batch rejected",
    },
    batch: "BATCH-2024-0511-004",
    status: "Warning",
  },

  {
    id: 5,
    time: "May 10, 2024\n03:20 PM",
    user: {
      name: "Amit Shah",
      role: "Analyst",
      avatar: "https://i.pravatar.cc/100?img=58",
    },
    action: {
      title: "Exported Report",
      description: "Downloaded reconciliation report",
    },
    batch: "BATCH-2024-0510-002",
    status: "Info",
  },
];
