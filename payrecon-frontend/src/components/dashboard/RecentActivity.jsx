import { useEffect, useState } from "react";
import { Upload, CircleCheckBig, LoaderCircle, CircleX } from "lucide-react";
import { Link } from "react-router-dom";
import { getRecentActivities } from "../../api/dashboardApi";

const icons = {
  upload: Upload,
  success: CircleCheckBig,
  processing: LoaderCircle,
  failed: CircleX,
};

const colors = {
  upload: "bg-green-500/15 text-green-400",
  success: "bg-blue-500/15 text-blue-400",
  processing: "bg-yellow-500/15 text-yellow-400",
  failed: "bg-red-500/15 text-red-400",
};

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await getRecentActivities();

        console.log(response);

        const formattedActivities = response.activities.map((activity) => {
          let type = "processing";
          let title = activity.action;

          switch (activity.action) {
            case "BATCH_CREATED":
              type = "upload";
              title = "Batch Created";
              break;

            case "BATCH_SUBMITTED":
              type = "processing";
              title = "Batch Submitted";
              break;

            case "BATCH_RESUBMITTED":
              type = "processing";
              title = "Batch Resubmitted";
              break;

            case "BATCH_APPROVED":
              type = "success";
              title = "Batch Approved";
              break;

            case "BATCH_REJECTED":
              type = "failed";
              title = "Batch Rejected";
              break;

            case "FILE_UPLOADED":
              type = "upload";
              title = "File Uploaded";
              break;

            case "LOGIN":
              type = "processing";
              title = "Login";
              break;

            case "LOGOUT":
              type = "processing";
              title = "Logout";
              break;

            default:
              type = "processing";
          }

          return {
            id: activity._id,

            type,

            title,

            user: activity.performedBy?.name || "Unknown",

            role: activity.role || "",

            batch:
              activity.batchId?.batchId || activity.batchId?.batchName || null,

            description: activity.description || "",

            status: activity.status,

            time: new Date(activity.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setActivities(formattedActivities);
      } catch (error) {
        console.error("Failed to fetch recent activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivities();
  }, []);

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-3 pl-4 h-full">
      <h2 className="text-xl font-semibold mb-8">Recent Activity</h2>

      <div className="space-y-5">
        {loading ? (
          <p className="text-gray-400 text-center">Loading activities...</p>
        ) : (
          activities.map((item) => {
            const Icon = icons[item.type];

            return (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[item.type]}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-white">{item.title}</p>

                    <p className="text-sm text-gray-400 mt-1">
                      {item.user}
                      {item.role && ` • ${item.role}`}
                    </p>

                    {item.batch && (
                      <p className="text-xs text-gray-500 mt-1">{item.batch}</p>
                    )}
                  </div>
                </div>

                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-10 ml-25">
        <Link to="/audit" className="w-full text-blue-400 hover:text-blue-300">
          View all activity →
        </Link>
      </div>
    </div>
  );
}

export default RecentActivity;
