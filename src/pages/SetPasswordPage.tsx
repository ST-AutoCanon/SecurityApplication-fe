// import { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API = "http://localhost:5000/api/auth";

// export default function SetPasswordPage() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const token = searchParams.get("token");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async () => {
//     if (!password) {
//       return alert("Password is required");
//     }

//     if (password !== confirmPassword) {
//       return alert("Passwords do not match");
//     }

//     try {
//       const res = await axios.post(`${API}/set-password`, {
//         token,
//         password,
//       });

//       alert(res.data.message);

//       navigate("/");
//     } catch (err: any) {
//       alert(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">
//         <h2 className="text-2xl font-bold mb-6 text-center">Set Password</h2>

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border rounded-lg p-3 mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="w-full border rounded-lg p-3 mb-6"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg"
//         >
//           Create Password
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function SetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!token) {
      setSuccess(false);
      setMessage("Invalid password setup link.");
      return;
    }

    if (!password || !confirmPassword) {
      setSuccess(false);
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setSuccess(false);
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/set-password`,
        {
          token,
          password,
        },
      );

      setSuccess(true);
      setMessage(res.data.message || "Password created successfully.");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2500);
    } catch (err: any) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020b3d] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[130px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[130px]" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#07174a]/95 backdrop-blur-xl border border-blue-900 rounded-3xl shadow-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl">
              <ShieldCheck className="text-white" size={30} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-3xl font-bold text-white text-center">
            Create Password
          </h2>

          <p className="mt-2 text-center text-gray-400 text-sm">
            Set a secure password to activate your Smart Entry account.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#0b235d] border border-blue-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#0b235d] border border-blue-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`rounded-xl px-4 py-3 text-sm text-center ${
                  success
                    ? "bg-green-500/10 border border-green-500/30 text-green-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Creating Password..." : "Create Password"}
            </button>
          </form>

          <div className="my-8 border-t border-blue-900" />

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full text-cyan-400 hover:text-cyan-300 transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}