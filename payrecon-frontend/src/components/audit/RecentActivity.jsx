const activities = [
  {
    user: "Ritika Sharma",
    action: "Approved batch",
    time: "10:30 AM",
  },
  {
    user: "Ritik Verma",
    action: "Uploaded files",
    time: "10:28 AM",
  },
  {
    user: "Anjali Mehta",
    action: "Added comment",
    time: "09:15 AM",
  },
  {
    user: "Karan Patel",
    action: "Started reconciliation",
    time: "09:10 AM",
  },
  {
    user: "Neha Singh",
    action: "Rejected batch",
    time: "06:45 PM",
  },
];

function RecentActivity() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-5">
      <h2 className="text-lg font-semibold mb-5">Recent Activity</h2>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div>
              <p className="text-white text-sm">{item.user}</p>

              <p className="text-gray-400 text-sm mt-1">{item.action}</p>
            </div>

            <span className="text-gray-500 text-xs">{item.time}</span>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 h-11 rounded-xl border border-[#4F6BFF] text-[#4F6BFF] hover:bg-[#4F6BFF]/10">
        View All Activity
      </button>
    </div>
  );
}

export default RecentActivity;
