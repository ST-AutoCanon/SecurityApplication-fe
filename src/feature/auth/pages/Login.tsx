// import { useState, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, ShieldCheck, Building2, X } from "lucide-react";

// interface LoginPageProps {
//   onSuccess?: () => void;
// }

// export default function LoginPage({ onSuccess }: LoginPageProps) {
//   const { login, error, loading } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [orgId, setOrgId] = useState("");
//   const [orgCodes, setOrgCodes] = useState<any[]>([]);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     const fetchOrgCodes = async () => {
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/organisation/organisations`,
//         );

//         const data = await res.json();
//         if (data.success) setOrgCodes(data.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchOrgCodes();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const result = await login(email, password || "", orgId);

//       const token = result?.data?.token || result?.token;
//       if (!token) throw new Error("Token not found");

//       const user: any = jwtDecode(token);

//       if (onSuccess) onSuccess();

//       switch (user.role) {
//         case "super_admin":
//           navigate("/super_admin/organisation/dashboard");
//           break;
//         case "admin":
//           navigate("/admin/organisation/dashboard");
//           break;
//         case "security":
//           navigate("/security/organisation/dashboard");
//           break;
//         case "manager":
//           navigate("/manager");
//           break;
//         case "user":
//           navigate("/user/organisation/dashboard");
//           break;
//         default:
//           navigate("/dashboard");
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//     }
//   };

//   return (
//     // <div className="w-full max-w-md">
//     //   {/* CARD */}
//     //   <div className="relative bg-white/10 backdrop-blur-xl border rounded-3xl  p-6 text-white">
//     //     {/* CLOSE BUTTON (for popup use) */}
//     //     <button
//     //       onClick={onSuccess}
//     //       className="absolute top-4 right-4 text-gray-300 hover:text-white"
//     //     >
//     //       <X size={20} />
//     //     </button>

//     //     {/* HEADER */}
//     //     <div className="text-center mb-6">
//     //       <div className="flex justify-center mb-3">
//     //         <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
//     //           <ShieldCheck size={22} />
//     //         </div>
//     //       </div>

//   <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
//     <div className="w-full max-w-md bg-[#020b3d] p-2 rounded-3xl relative">
//       {/* Close */}
//       <button
//         onClick={() => navigate("/")}
//         className="absolute top-4 right-4 text-gray-300 hover:text-white z-10"
//       >
//         <X size={20} />
//       </button>

//       <div className="bg-white/10 backdrop-blur-xl border rounded-3xl p-6 text-white">
//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <div className="flex justify-center mb-3">
//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
//               <ShieldCheck size={22} />
//             </div>
//           </div>

//           <h2 className="text-xl font-bold">Smart Entry Login</h2>
//           <p className="text-gray-300 text-xs mt-1">Secure Access Portal</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* ORGANIZATION */}
//           <div>
//             <label className="text-xs text-gray-300 flex items-center gap-1 mb-1">
//               <Building2 size={12} /> Organization
//             </label>

//             <select
//               value={orgId}
//               onChange={(e) => setOrgId(e.target.value)}
//               className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-cyan-400"
//             >
//               <option value="" className="text-black">Super Admin Login</option>

//               {orgCodes.map((org: any) => (
//                 <option key={org.id} value={org.id} className="text-black">
//                   {org.org_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="text-xs text-gray-300">Email-Id</label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
//               required
//             />
//           </div>

//           {/* PASSWORD */}
//           <div>
//             <label className="text-xs text-gray-300">Password</label>

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full px-3 py-2.5 pr-10 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
//                 required
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={26} /> : <Eye size={26} />}
//               </button>
//             </div>

//             {/* FORGOT */}
//             {orgId && (
//               <div className="flex justify-end mt-1">
//                 <button
//                   type="button"
//                   className="text-[11px] text-cyan-300 hover:underline"
//                   onClick={() => {
//                     onSuccess?.();
//                     navigate(`/forgot-password?organisation_id=${orgId}`);
//                   }}
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* ERROR */}
//           {error && (
//             <div className="bg-red-500/20 border border-red-400 text-red-200 text-xs rounded-lg px-3 py-2">
//               {error}
//             </div>
//           )}

//           {/* SUBMIT */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//       </div>
//       </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Building2, DoorOpen, X } from "lucide-react";

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

  // Gates
  const [gates, setGates] = useState<any[]>([]);
  const [gateId, setGateId] = useState("");

  // Gate popup
  const [showGatePopup, setShowGatePopup] = useState(false);
  const [gateLoading, setGateLoading] = useState(false);
  const [gateError, setGateError] = useState("");

  // Store logged-in user temporarily until gate is selected
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const [showPassword, setShowPassword] = useState(false);

  /*
   * Fetch Organisations
   *
   * KEPT AS-IS
   */
  useEffect(() => {
    const fetchOrgCodes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/organisation/organisations`,
        );

        const data = await res.json();

        if (data.success) {
          setOrgCodes(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch organisations:", err);
      }
    };

    fetchOrgCodes();
  }, []);

  /*
   * Fetch Gates AFTER successful login
   */
  // const fetchGates = async (token: string, organisationId: string | number) => {
  //   setGateLoading(true);
  //   setGateError("");

  //   try {
  //     console.log("Fetching gates for organisation:", organisationId);

  //     const res = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/gates`,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const data = res.data;

  //     console.log("Get gates response:", data);

  //     if (!data.success) {
  //       throw new Error(data?.message || "Failed to fetch gates");
  //     }

  //     const gateList = Array.isArray(data.data) ? data.data : [];

  //     setGates(gateList);

  //     if (gateList.length === 0) {
  //       setGateError("No gates are available for this organization.");

  //       return false;
  //     }

  //     if (gateList.length === 1) {
  //       setGateId(String(gateList[0].id));
  //     } else {
  //       setGateId("");
  //     }

  //     return true;
  //   } catch (err: any) {
  //     console.error("Failed to fetch gates:", err);

  //     setGates([]);
  //     setGateId("");

  //     setGateError(
  //       err?.response?.data?.message || err?.message || "Failed to load gates.",
  //     );

  //     return false;
  //   } finally {
  //     setGateLoading(false);
  //   }
  // };

  const fetchGates = async (token: string, organisationId: string | number) => {
    setGateLoading(true);
    setGateError("");

    try {
      console.log("Fetching gates for organisation:", organisationId);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/gates`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data;

      console.log("Get gates response:", data);

      if (!data.success) {
        throw new Error(data?.message || "Failed to fetch gates");
      }

      const gateList = Array.isArray(data.data) ? data.data : [];

      // Update React state
      setGates(gateList);

      // No gates
      if (gateList.length === 0) {
        setGateError("No gates are available for this organization.");

        return {
          success: true,
          gates: [],
        };
      }

      // One gate → preselect it
      if (gateList.length === 1) {
        setGateId(String(gateList[0].id));
      } else {
        // Multiple gates → user must select
        setGateId("");
      }

      return {
        success: true,
        gates: gateList,
      };
    } catch (err: any) {
      console.error("Failed to fetch gates:", err);

      setGates([]);
      setGateId("");

      setGateError(
        err?.response?.data?.message || err?.message || "Failed to load gates.",
      );

      return {
        success: false,
        gates: [],
      };
    } finally {
      setGateLoading(false);
    }
  };

  /*
   * QUICK URL LOGIN
   *
   * Example:
   * /login?email=security1%40yopmail.com&password=123&organisation_id=43
   */
  useEffect(() => {
    const handleUrlLogin = async () => {
      const params = new URLSearchParams(window.location.search);

      const urlEmail = params.get("email");
      const urlPassword = params.get("password");
      const urlOrganisationId = params.get("organisation_id");

      // No URL login parameters → normal login page
      if (!urlEmail || !urlPassword || !urlOrganisationId) {
        return;
      }

      try {
        console.log("=================================");
        console.log("QUICK URL LOGIN");
        console.log("Email:", urlEmail);
        console.log("Organisation ID:", urlOrganisationId);
        console.log("=================================");

        /*
         * Use your EXISTING login function.
         * This calls the same backend /login endpoint
         * used by the normal form.
         */
        const result = await login(urlEmail, urlPassword, urlOrganisationId);

        const token = result?.data?.token || result?.token;

        if (!token) {
          throw new Error("Token not found");
        }

        console.log("URL login successful");

        /*
         * Remove email/password/token parameters
         * from browser URL immediately.
         */
        window.history.replaceState({}, document.title, "/login");

        /*
         * Decode the SAME JWT returned by normal login.
         */
        const user: any = jwtDecode(token);

        console.log("URL logged-in user:", user);

        /*
         * Store logged-in user temporarily.
         */
        setLoggedInUser(user);

        /*
         * IMPORTANT:
         * Get organisation from JWT.
         * This should be 54 in your example.
         */
        const organisationId =
          user.organisation_id ?? user.organization_id ?? urlOrganisationId;

        console.log("Authenticated organisation:", organisationId);

        /*
         * SECURITY USER
         * Same gate flow as normal login.
         */
        if (user.role === "security") {
          const gateResult = await fetchGates(token, organisationId);

          console.log("URL login gate result:", gateResult);

          if (!gateResult.success) {
            console.log("Failed to load gates");
            return;
          }

          /*
           * No gates → direct dashboard
           */
          if (gateResult.gates.length === 0) {
            console.log("No gates → direct security dashboard");

            onSuccess?.();

            navigate("/security/organisation/dashboard");

            return;
          }

          /*
           * Gates exist → show same gate popup
           */
          console.log("Gates found → showing gate popup");

          setShowGatePopup(true);

          return;
        }

        /*
         * ALL OTHER ROLES
         */
        onSuccess?.();

        switch (user.role) {
          case "super_admin":
            navigate("/super_admin/organisation/dashboard");
            break;

          case "admin":
            navigate("/admin/organisation/dashboard");
            break;

          case "manager":
            navigate("/manager");
            break;

          case "user":
            navigate("/user/organisation/dashboard");
            break;

          default:
            navigate("/dashboard");
        }
      } catch (err: any) {
        console.error("Quick URL login failed:", err);

        /*
         * Remove credentials even when login fails.
         */
        window.history.replaceState({}, document.title, "/login");
      }
    };

    handleUrlLogin();
  }, [login, navigate, onSuccess]);
  /*
   * Login
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      /*
       * YOUR EXISTING LOGIN CALL IS KEPT AS-IS
       */
      const result = await login(email, password || "", orgId);

      const token = result?.data?.token || result?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const user: any = jwtDecode(token);

      /*
       * Store logged-in user temporarily.
       */
      setLoggedInUser(user);

      /*
       * Get organization from authenticated JWT.
       *
       * Supports both spellings.
       */
      const organisationId =
        user.organisation_id ?? user.organization_id ?? orgId;

      /*
       * =====================================================
       * SECURITY ONLY
       * =====================================================
       *
       * Gate selection popup is ONLY required for security.
       *
       * Admin, super_admin, manager and user will NOT:
       * - fetch gates
       * - show gate popup
       * - select a gate
       */
      if (user.role === "security") {
        const gateResult = await fetchGates(token, organisationId);

        console.log("Gate result:", gateResult);

        // Gate API failed
        if (!gateResult.success) {
          console.log("Failed to load gates");
          return;
        }

        // No gates → direct login
        if (gateResult.gates.length === 0) {
          console.log("No gates found → direct security login");

          if (onSuccess) {
            onSuccess();
          }

          navigate("/security/organisation/dashboard");
          return;
        }

        // Gates exist → show popup
        console.log("Gates found → showing gate popup");

        setShowGatePopup(true);
        return;
      }

      /*
       * =====================================================
       * ALL OTHER ROLES
       * =====================================================
       *
       * Existing role-based navigation.
       * No gate popup.
       * No gate API call.
       */
      if (onSuccess) {
        onSuccess();
      }

      switch (user.role) {
        case "super_admin":
          navigate("/super_admin/organisation/dashboard");
          break;

        case "admin":
          navigate("/admin/organisation/dashboard");
          break;

        case "manager":
          navigate("/manager");
          break;

        case "user":
          navigate("/user/organisation/dashboard");
          break;

        default:
          navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  /*
   * Gate selection
   *
   * This is only reached for SECURITY users.
   */
  const handleGateContinue = () => {
    setGateError("");

    if (!gateId) {
      setGateError("Please select a gate.");
      return;
    }

    const selectedGate = gates.find(
      (gate) => String(gate.id) === String(gateId),
    );

    if (!selectedGate) {
      setGateError("Selected gate was not found.");
      return;
    }

    /*
     * Store complete gate object
     */
    sessionStorage.setItem("selectedGate", JSON.stringify(selectedGate));

    /*
     * Also store gate ID separately
     */
    sessionStorage.setItem("selectedGateId", String(selectedGate.id));

    /*
     * Close popup
     */
    setShowGatePopup(false);

    /*
     * Existing role-based navigation
     *
     * Since this popup is only shown to security,
     * this will normally navigate to security dashboard.
     */
    if (onSuccess) {
      onSuccess();
    }

    switch (loggedInUser?.role) {
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

      case "user":
        navigate("/user/organisation/dashboard");
        break;

      default:
        navigate("/dashboard");
    }
  };

  /*
   * Close Gate Popup
   */
  const handleCloseGatePopup = () => {
    setShowGatePopup(false);
    setGateId("");
    setGates([]);
    setGateError("");

    /*
     * Do not continue to dashboard without selecting a gate.
     */
    navigate("/");
  };

  return (
    <>
      {/* =====================================================
          LOGIN POPUP
      ====================================================== */}

      {!showGatePopup && (
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

                <p className="text-gray-300 text-xs mt-1">
                  Secure Access Portal
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ORGANIZATION */}
                <div>
                  <label className="text-xs text-gray-300 flex items-center gap-1 mb-1">
                    <Building2 size={12} />
                    Organization
                  </label>

                  <select
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="" className="text-black">
                      Super Admin Login
                    </option>

                    {orgCodes.map((org: any) => (
                      <option
                        key={org.id}
                        value={org.id}
                        className="text-black"
                      >
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
      )}

      {/* =====================================================
          GATE SELECTION POPUP
      ====================================================== */}

      {showGatePopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200]">
          <div className="w-full max-w-md bg-[#020b3d] p-2 rounded-3xl relative">
            {/* Close */}
            <button
              onClick={handleCloseGatePopup}
              className="absolute top-4 right-4 text-gray-300 hover:text-white z-10"
              type="button"
            >
              <X size={20} />
            </button>

            <div className="bg-white/10 backdrop-blur-xl border rounded-3xl p-6 text-white">
              {/* HEADER */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                    <DoorOpen size={22} />
                  </div>
                </div>

                <h2 className="text-xl font-bold">Select Gate</h2>

                <p className="text-gray-300 text-xs mt-1">
                  Select the gate you want to access
                </p>
              </div>

              {/* GATE */}
              <div>
                <label className="text-xs text-gray-300 flex items-center gap-1 mb-1">
                  <DoorOpen size={12} />
                  Gate
                </label>

                {gateLoading ? (
                  <div className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-300 text-sm text-center">
                    Loading gates...
                  </div>
                ) : (
                  <select
                    value={gateId}
                    onChange={(e) => {
                      setGateId(e.target.value);
                      setGateError("");
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="" className="text-black">
                      Select Gate
                    </option>

                    {gates.map((gate: any) => (
                      <option
                        key={gate.id}
                        value={gate.id}
                        className="text-black"
                      >
                        {gate.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* GATE ERROR */}
              {gateError && (
                <div className="mt-3 bg-red-500/20 border border-red-400 text-red-200 text-xs rounded-lg px-3 py-2">
                  {gateError}
                </div>
              )}

              {/* CONTINUE */}
              <button
                type="button"
                onClick={handleGateContinue}
                disabled={gateLoading || gates.length === 0 || !gateId}
                className="w-full mt-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}