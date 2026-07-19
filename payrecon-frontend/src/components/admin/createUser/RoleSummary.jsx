import { Shield, Info } from "lucide-react";

import Card from "../../common/Card";
import PermissionItem from "./PermissionItem";

const permissions = [
  { text: "Upload Files", allowed: true },
  { text: "Create Batch", allowed: true },
  { text: "View Reports", allowed: true },
  { text: "Approve Transactions", allowed: false },
  { text: "Manage Users", allowed: false },
];

const RoleSummaryCard = () => {
  return (
    <Card>

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 p-6">

        <div className="rounded-xl bg-blue-600/20 p-3">
          <Shield className="text-blue-400" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Role Summary
          </h2>

          <p className="text-sm text-slate-400">
            Preview permissions for the selected role.
          </p>
        </div>

      </div>

      {/* Selected Role */}
      <div className="p-6">

        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
          <p className="text-sm text-slate-400">
            Selected Role
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            Maker
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Can upload files, create reconciliation batches,
            and review transactions.
          </p>
        </div>

        {/* Permissions */}
        <div className="mt-6 space-y-3">

          <h4 className="text-white font-medium">
            Permissions
          </h4>

          {permissions.map((permission) => (
            <PermissionItem
              key={permission.text}
              text={permission.text}
              allowed={permission.allowed}
            />
          ))}

        </div>

        {/* Info Box */}
        <div className="mt-6 flex gap-3 rounded-xl border border-sky-500/20 bg-sky-500/10 p-4">

          <Info className="mt-1 text-sky-400" size={18} />

          <p className="text-sm leading-6 text-slate-300">
            Permissions shown here are a preview. They will update
            automatically once role-based access control is connected
            to the backend.
          </p>

        </div>

      </div>

    </Card>
  );
};

export default RoleSummaryCard;