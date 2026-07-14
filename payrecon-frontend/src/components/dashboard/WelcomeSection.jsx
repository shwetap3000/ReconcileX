import { Upload, Plus, FileText } from "lucide-react";

function WelcomeSection() {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome back, Ritika 👋
        </h1>

        <p className="text-gray-400 mt-2">
          Here's what's happening with your reconciliations today.
        </p>
      </div>

      <div className="flex gap-4">

        <button className="flex items-center gap-2 px-6 h-12 rounded-xl border border-[#243041] hover:bg-[#1A2233] transition">
          <Upload size={18}/>
          Upload Files
        </button>

        <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
          <Plus size={18}/>
          New Batch
        </button>

        <button className="flex items-center gap-2 px-6 h-12 rounded-xl border border-[#243041] hover:bg-[#1A2233] transition">
          <FileText size={18}/>
          Generate Report
        </button>

      </div>

    </div>
  );
}

export default WelcomeSection;