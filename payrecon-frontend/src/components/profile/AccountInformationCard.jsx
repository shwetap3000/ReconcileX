import ProfileInfoItem from "./ProfileInfoItem";

const AccountInformationCard = ({ user }) => {
  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const lastLogin = user?.lastLogin
    ? new Date(user.lastLogin).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No login recorded";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60">
      {/* Header */}
      <div className="border-b border-slate-800 px-5 py-4">
        <h3 className="font-semibold text-white">Account Information</h3>

        <p className="mt-1 text-xs text-slate-500">
          Account status and activity information.
        </p>
      </div>

      <div className="px-5">
        <ProfileInfoItem
          label="Account Status"
          value={user?.isActive ? "Active" : "Inactive"}
          valueClassName={
            user?.isActive ? "!text-emerald-400" : "!text-red-400"
          }
        />

        <ProfileInfoItem label="Last Login" value={lastLogin} />

        <ProfileInfoItem label="Created Date" value={createdDate} />

        <ProfileInfoItem
          label="Created By"
          value={user?.createdBy?.name || "System"}
        />
      </div>
    </div>
  );
};

export default AccountInformationCard;
