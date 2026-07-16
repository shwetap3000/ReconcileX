import { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

function CustomDateButton() {
  const [date, setDate] = useState(null);

  return (
    <DatePicker
      selected={date}
      onChange={(d) => setDate(d)}
      dateFormat="dd MMM yyyy"
      customInput={
        <button className="flex items-center gap-2 px-4 py-2 border border-[#243041] rounded-xl bg-[#090D14] text-white">
          {date ? date.toLocaleDateString() : "Custom Date"}
          <Calendar size={16} />
        </button>
      }
    />
  );
}

export default CustomDateButton;
