import {
  X,
  FileText,
  Landmark,
  IndianRupee,
  Clock3,
  StickyNote,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ReviewDrawer = ({
  open,
  onClose,
  transaction,
}) => {
  if (!transaction) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-all duration-300 z-40 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed top-0 right-0 h-screen w-[460px] bg-[#020817] border-l border-slate-700 shadow-2xl z-50 transform transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">

          <div>

            <h2 className="text-xl font-semibold">
              Transaction Review
            </h2>

            <p className="text-sm text-slate-400">
              {transaction.id}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="overflow-y-auto h-[calc(100vh-160px)] p-6 space-y-8">

          <SectionTitle
            icon={<FileText size={18} />}
            title="General Information"
          />

          <InfoRow
            label="Transaction ID"
            value={transaction.id}
          />

          <InfoRow
            label="Ledger Ref"
            value={transaction.ledgerRef}
          />

          <InfoRow
            label="Bank Ref"
            value={transaction.bankRef}
          />

          <SectionTitle
            icon={<IndianRupee size={18} />}
            title="Financial Details"
          />

          <InfoRow
            label="Ledger Amount"
            value={transaction.ledgerAmount}
          />

          <InfoRow
            label="Bank Amount"
            value={transaction.bankAmount}
          />

          <InfoRow
            label="Difference"
            value={transaction.difference}
          />

          <SectionTitle
            icon={<Clock3 size={18} />}
            title="Timeline"
          />

          <TimelineItem title="Batch Uploaded" />
          <TimelineItem title="Auto Matched" />
          <TimelineItem title="Ready for Review" />

          <SectionTitle
            icon={<StickyNote size={18} />}
            title="Notes"
          />

          <textarea
            rows={5}
            placeholder="Write your notes..."
            className="w-full rounded-lg border border-slate-700 bg-transparent p-4 resize-none outline-none"
          />

        </div>

        {/* Footer */}

        <div className="border-t border-slate-700 p-5 flex gap-3">

          <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-red-500 py-3 text-red-400 hover:bg-red-500/10">

            <XCircle size={18} />

            Reject

          </button>

          <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 py-3 hover:bg-green-700">

            <CheckCircle2 size={18} />

            Approve

          </button>

        </div>

      </aside>
    </>
  );
};

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-2 text-lg font-semibold">
    {icon}
    {title}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-slate-800 py-3">
    <span className="text-slate-400">{label}</span>
    <span>{value}</span>
  </div>
);

const TimelineItem = ({ title }) => (
  <div className="flex gap-3">
    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-green-500" />
    <p>{title}</p>
  </div>
);

export default ReviewDrawer;