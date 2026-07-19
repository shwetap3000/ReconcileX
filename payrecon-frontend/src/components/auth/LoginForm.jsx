import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import toast from "react-hot-toast";

import { login } from "../../api/authApi";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(formData);

      toast.success(data.message);

      console.log(data.user);

      // replace this with AuthContext later
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[42%] px-20 py-16 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold">
            X
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">ReconcileX</h2>

            <p className="text-slate-400">
              Payment Reconciliation & Audit Trail System
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h1 className="text-6xl font-bold text-white">Welcome Back</h1>

          <p className="text-slate-400 mt-4 text-xl">
            Sign in to access the Payment Reconciliation System
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-14 rounded-2xl border border-slate-800 bg-[#081222] p-10"
        >
          <label className="text-white">Email Address</label>

          <div className="mt-3 relative">
            <User className="absolute left-4 top-4 text-slate-500" size={20} />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#020817] border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white outline-none"
              placeholder="Enter your email"
            />
          </div>

          <label className="text-white mt-8 block">Password</label>

          <div className="mt-3 relative">
            <Lock className="absolute left-4 top-4 text-slate-500" size={20} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#020817] border border-slate-700 rounded-xl pl-12 pr-12 py-4 text-white outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-4 text-slate-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>{" "}
          </div>

          <div className="flex justify-between items-center mt-8">
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" />
              Remember Me
            </label>

            <button className="text-blue-400">Forgot Password?</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>

      <p className="text-slate-500">© 2026 ReconcileX. All rights reserved.</p>
    </div>
  );
}
