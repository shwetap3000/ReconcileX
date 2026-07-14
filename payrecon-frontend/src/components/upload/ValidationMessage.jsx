import { ShieldCheck } from "lucide-react";

function ValidationMessage() {
  return (
    <div className="mt-8">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-[#1A2332] flex items-center justify-center">
          <ShieldCheck size={18} className="text-gray-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">Validation Message</h3>

          <p className="text-gray-400 mt-2">
            Upload and validate files to see validation results.
          </p>
        </div>
      </div>

      <div className="border-t border-[#243041] mt-8" />
    </div>
  );
}

export default ValidationMessage;
