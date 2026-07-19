const InputField = ({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  ...props
}) => {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
        )}

        <input
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-700 bg-[#050C17]
          py-3 ${Icon ? "pl-11" : "pl-4"} pr-4
          text-white placeholder:text-slate-500
          outline-none transition
          focus:border-blue-500`}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;