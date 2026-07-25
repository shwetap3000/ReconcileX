import ProfilePictureUpload from "./ProfilePictureUpload";

const ProfileOverviewCard = ({ user }) => {
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Profile Picture */}
        <div className="shrink-0">
          <ProfilePictureUpload user={user} />
        </div>

        {/* User Information */}
        <div className="min-w-0 flex-1">
          <div>
            <h2 className="truncate text-2xl font-semibold text-white">
              {user?.name || "User"}
            </h2>

            <span className="mt-2 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              {user?.role || "N/A"}
            </span>
          </div>

          {/* Metadata */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="border-slate-800 sm:border-r">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Employee ID
              </p>

              <p className="mt-1 text-sm font-medium text-slate-200">
                {user?.employeeId || "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Joined Date
              </p>

              <p className="mt-1 text-sm font-medium text-slate-200">
                {joinedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverviewCard;
