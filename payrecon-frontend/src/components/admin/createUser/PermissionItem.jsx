import { Check, X } from "lucide-react";

const PermissionItem = ({ text, allowed }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#050C17] p-3">
      <span className="text-sm text-slate-300">{text}</span>

      {allowed ? (
        <div className="rounded-full bg-green-500/20 p-1">
          <Check size={16} className="text-green-400" />
        </div>
      ) : (
        <div className="rounded-full bg-red-500/20 p-1">
          <X size={16} className="text-red-400" />
        </div>
      )}
    </div>
  );
};

export default PermissionItem;