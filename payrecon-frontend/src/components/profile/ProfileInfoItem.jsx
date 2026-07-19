const ProfileInfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-5 last:border-none">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-slate-400" />

        <span className="text-slate-300">{label}</span>
      </div>

      <span className="font-medium text-white">{value}</span>
    </div>
  );
};

export default ProfileInfoItem;
