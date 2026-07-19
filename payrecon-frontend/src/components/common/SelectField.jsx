const SelectField = ({ label, icon: Icon, options = [], ...props }) => {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        )}

        <select
          className={`w-full rounded-xl border border-slate-700 bg-[#050C17]
          py-3 ${Icon ? "pl-11" : "pl-4"} pr-4
          text-white outline-none
          focus:border-blue-500 transition`}
          {...props}
        >
          <option value="">Select</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
