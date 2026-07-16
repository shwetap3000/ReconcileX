import { Upload, CircleCheckBig, LoaderCircle, CircleX } from "lucide-react";
import { recentActivity } from "../../constants/recentActivity";
import { Link } from "react-router-dom";

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
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-3 pl-4 h-full">
      <h2 className="text-xl font-semibold mb-8">Recent Activity</h2>

      <div className="space-y-5">
        {recentActivity.map((item) => {
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

                  <p className="text-sm text-gray-400 mt-1">{item.batch}</p>
                </div>
              </div>

              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-10 ml-25">
        <Link
        to="/audit"
        className="w-full text-blue-400 hover:text-blue-300"
      >
        View all activity →
      </Link>
      </div>
    </div>
  );
}

export default RecentActivity;
