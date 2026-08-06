function RecentActivity({ logs, loading }) {
  if (loading) {
    return (
      <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-5">
        <p className="text-center text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-5">
      <h2 className="text-lg font-semibold mb-5">Recent Activity</h2>

      <div className="space-y-4">
        {logs.slice(0, 5).map((log) => {
          const date = new Date(log.createdAt);

          return (
            <div key={log._id} className="flex justify-between items-start">
              <div>
                <p className="text-white text-sm font-medium">
                  {log.performedBy?.name}
                </p>

                <p className="text-gray-400 text-sm mt-1">{log.description}</p>
              </div>

              <span className="text-gray-500 text-xs whitespace-nowrap">
                {date.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-6 h-11 rounded-xl border border-[#4F6BFF] text-[#4F6BFF] hover:bg-[#4F6BFF]/10">
        View All Activity
      </button>
    </div>
  );
}

export default RecentActivity;
