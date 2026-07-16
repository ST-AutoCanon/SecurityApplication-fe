import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const organisationId = params.get("organisation_id");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`,
        {
          email,
          organisation_id: organisationId,
        },
      );

      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020b3d] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#07174a]/95 backdrop-blur-xl border border-blue-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Gradient */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl">
              <ShieldCheck size={30} className="text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-3xl font-bold text-white text-center">
            Forgot Password
          </h2>

          <p className="mt-2 text-center text-gray-400 text-sm leading-6">
            Enter your registered email address to receive a secure password
            reset link.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0b235d] border border-blue-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
          </form>

          {/* Response Message */}
          {message && (
            <div
              className={`mt-6 rounded-xl px-4 py-3 text-sm text-center ${
                message.toLowerCase().includes("sent") ||
                message.toLowerCase().includes("success")
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {message}
            </div>
          )}

          {/* Divider */}
          <div className="my-8 border-t border-blue-900" />

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
          >
            <ArrowLeft size={18} />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}