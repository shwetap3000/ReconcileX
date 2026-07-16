import { useState } from "react";
import { ChevronDown } from "lucide-react";

const options = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "Last Month",
];

function DateRangeDropdown() {
  const [selected, setSelected] = useState("Last 7 Days");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border border-[#243041] rounded-xl bg-[#090D14] text-white"
      >
        {selected}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg bg-[#111827] border border-[#243041] shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-white hover:bg-[#1B2433]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DateRangeDropdown;
