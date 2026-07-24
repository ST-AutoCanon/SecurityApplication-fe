import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Building2, X } from "lucide-react";

interface LoginPageProps {
  onSuccess?: () => void;
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState("");
  const [orgCodes, setOrgCodes] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchOrgCodes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/organisation/organisations`,
        );

        const data = await res.json();
        if (data.success) setOrgCodes(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrgCodes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(email, password || "", orgId);

      const token = result?.data?.token || result?.token;
      if (!token) throw new Error("Token not found");

      const user: any = jwtDecode(token);

      if (onSuccess) onSuccess();

      switch (user.role) {
        case "super_admin":
          navigate("/super_admin/organisation/dashboard");
          break;
        case "admin":
          navigate("/admin/organisation/dashboard");
          break;
        case "security":
          navigate("/security/organisation/dashboard");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "employee":
          navigate("/employee");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    // <div className="w-full max-w-md">
    //   {/* CARD */}
    //   <div className="relative bg-white/10 backdrop-blur-xl border rounded-3xl  p-6 text-white">
    //     {/* CLOSE BUTTON (for popup use) */}
    //     <button
    //       onClick={onSuccess}
    //       className="absolute top-4 right-4 text-gray-300 hover:text-white"
    //     >
    //       <X size={20} />
    //     </button>

    //     {/* HEADER */}
    //     <div className="text-center mb-6">
    //       <div className="flex justify-center mb-3">
    //         <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
    //           <ShieldCheck size={22} />
    //         </div>
    //       </div>



  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
    <div className="w-full max-w-md bg-[#020b3d] p-2 rounded-3xl relative">
      {/* Close */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 text-gray-300 hover:text-white z-10"
      >
        <X size={20} />
      </button>

      <div className="bg-white/10 backdrop-blur-xl border rounded-3xl p-6 text-white">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
          </div>


          <h2 className="text-xl font-bold">Smart Entry Login</h2>
          <p className="text-gray-300 text-xs mt-1">Secure Access Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ORGANIZATION */}
          <div>
            <label className="text-xs text-gray-300 flex items-center gap-1 mb-1">
              <Building2 size={12} /> Organization
            </label>

            <select
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="" className="text-black">Super Admin Login</option>

              {orgCodes.map((org: any) => (
                <option key={org.id} value={org.id} className="text-black">
                  {org.org_name}
                </option>
              ))}
            </select>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs text-gray-300">Email-Id</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs text-gray-300">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 pr-10 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={26} /> : <Eye size={26} />}
              </button>
            </div>

            {/* FORGOT */}
            {orgId && (
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  className="text-[11px] text-cyan-300 hover:underline"
                  onClick={() => {
                    onSuccess?.();
                    navigate(`/forgot-password?organisation_id=${orgId}`);
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-200 text-xs rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      </div>
      </div>
  );
}