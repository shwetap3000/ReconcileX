import { FileSpreadsheet, Download, CheckCircle2 } from "lucide-react";

function FileCard({ title, fileName, transactions, size }) {
  return (
    <div className="border border-[#243041] rounded-xl p-5 bg-[#141C28]">
      <h3 className="font-semibold text-lg mb-5">{title}</h3>

      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
            <FileSpreadsheet size={28} className="text-green-400" />
          </div>

          <div>
            <p className="font-medium text-white">{fileName}</p>

            <p className="text-gray-400 text-sm mt-1">
              {transactions.toLocaleString()} transactions
            </p>

            <p className="text-gray-400 text-sm">{size}</p>
          </div>
        </div>

        <button
          className="
            w-10
            h-10
            rounded-lg
            border
            border-[#243041]
            flex
            items-center
            justify-center
            hover:bg-[#1B2535]
          "
        >
          <Download size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-6 text-green-400 font-medium">
        Validated
        <CheckCircle2 size={18} />
      </div>
    </div>
  );
}

export default FileCard;
