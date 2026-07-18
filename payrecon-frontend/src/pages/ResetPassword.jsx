import { Lock, Eye, Shield } from "lucide-react";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-[#040B16] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-white">
          Reconcile<span className="text-blue-500">X</span>
        </h1>

        <p className="mt-2 text-gray-400">
          Payment Reconciliation & Audit Trail System
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-[#09111F]/80 backdrop-blur-md p-12">
        {/* Icon */}

        <div className="flex justify-center">
          <div className="h-32 w-32 rounded-full border border-blue-500 bg-blue-500/10 flex items-center justify-center">
            <Shield className="h-14 w-14 text-blue-400" />
          </div>
        </div>

        {/* Heading */}

        <h2 className="mt-8 text-center text-5xl font-bold text-white">
          Create New Password
        </h2>

        <p className="mt-3 text-center text-gray-400 text-lg">
          Choose a strong password to secure your account.
        </p>

        {/* New Password */}

        <div className="mt-10">
          <label className="text-white">New Password</label>

          <div className="relative mt-3">
            <Lock className="absolute left-4 top-4 text-gray-500" size={20} />

            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-xl border border-slate-700 bg-[#050C17] py-4 pl-12 pr-12 text-white outline-none"
            />

            <Eye className="absolute right-4 top-4 text-gray-500" size={20} />
          </div>
        </div>

        {/* Password Strength */}

        <div className="mt-6">
          <div className="flex gap-2">
            <div className="h-2 flex-1 rounded bg-blue-500"></div>
            <div className="h-2 flex-1 rounded bg-blue-500"></div>
            <div className="h-2 flex-1 rounded bg-blue-500"></div>
            <div className="h-2 flex-1 rounded bg-blue-500"></div>
            <div className="h-2 flex-1 rounded bg-slate-700"></div>
          </div>

          <p className="mt-2 text-right text-blue-400">Strong</p>
        </div>

        {/* Confirm Password */}

        <div className="mt-6">
          <label className="text-white">Confirm Password</label>

          <div className="relative mt-3">
            <Lock className="absolute left-4 top-4 text-gray-500" size={20} />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-xl border border-slate-700 bg-[#050C17] py-4 pl-12 pr-12 text-white outline-none"
            />

            <Eye className="absolute right-4 top-4 text-gray-500" size={20} />
          </div>
        </div>

        {/* Requirements */}

        <div className="mt-8 rounded-xl border border-slate-700 p-6">
          <h3 className="mb-4 text-lg text-white">Password Requirements</h3>

          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <div>✔ Minimum 8 characters</div>

            <div>✔ Uppercase letter</div>

            <div>✔ Lowercase letter</div>

            <div>✔ Number</div>

            <div>✔ Special character</div>
          </div>
        </div>

        {/* Button */}

        <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-xl font-semibold text-white hover:scale-[1.02] transition">
          Update Password
        </button>
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center gap-3 text-gray-400">
        <Shield size={18} />
        Your security is our priority
      </div>
    </div>
  );
};

export default ResetPassword;
