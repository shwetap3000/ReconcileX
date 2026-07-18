const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-[#040B16] relative overflow-hidden">
      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-white">
            Reconcile<span className="text-blue-500">X</span>
          </h1>

          <p className="mt-2 text-gray-400 text-lg">
            Payment Reconciliation & Audit Trail System
          </p>
        </div>

        {/* Card */}
        <div className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-[#09111F]/80 backdrop-blur-md p-12 shadow-2xl">
          <div className="flex justify-center">
            <div className="h-36 w-36 rounded-full bg-blue-600/20 border border-blue-500 flex items-center justify-center">
              🔒
            </div>
          </div>

          <h2 className="mt-10 text-center text-5xl font-bold text-white">
            Forgot Password?
          </h2>

          <p className="mt-5 text-center text-gray-400 text-lg leading-8">
            Enter your registered company email address and we'll send you a
            password reset link.
          </p>

          {/* Email */}
          <div className="mt-10">
            <label className="block text-white mb-3">Company Email</label>

            <input
              type="email"
              placeholder="Enter your company email address"
              className="w-full rounded-xl border border-slate-700 bg-[#050C17] px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}

          <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-xl font-semibold text-white transition hover:scale-[1.02]">
            Send Reset Link
          </button>

          <button className="mt-5 w-full rounded-xl border border-slate-700 py-4 text-xl text-white transition hover:bg-slate-800">
            ← Back to Login
          </button>
        </div>

        {/* Footer */}

        <p className="mt-10 text-gray-500">
          © 2026 ReconcileX. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
