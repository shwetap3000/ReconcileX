const ProfileInfoItem = ({ label, value, valueClassName = "" }) => {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-800/80 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="text-sm text-slate-400">{label}</span>

      <span
        className={`break-all text-sm font-medium text-slate-200 sm:text-right ${valueClassName}`}
      >
        {value || "Not provided"}
      </span>
    </div>
  );
};

export default ProfileInfoItem;
