import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordField = ({ label, placeholder = "Enter password", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-700 bg-[#050C17]
          py-3 pl-11 pr-11
          text-white placeholder:text-slate-500
          outline-none focus:border-blue-500"
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
