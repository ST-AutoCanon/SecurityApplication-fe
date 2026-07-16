import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import { useAuth } from "./feature/auth/hooks/useAuth";

import SuperAdminDashboard from "./feature/superadmin/pages/SuperAdminDashboard";
import AdminDashboard from "./feature/admin/pages/AdminDashboard";
import SecurityDashboard from "./feature/security/pages/SecurityDashboard";
import Apartment from "./pages/Apartment";
import Event from "./pages/Event";
import Hospital from "./pages/Hospital";
import HomePage from "./HomePages.tsx/HomePage";
import Navbar from "./components/Navbar";



import SetPasswordPage from "./pages/SetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Features from "./pages/Features";
import ComingSoon from "./pages/ComingSoon";
const RequireAuth = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: string[];
}) => {
  const { user, isInitializing } = useAuth();
  console.log("RequireAuth user:", user);
  console.log("RequireAuth role:", user?.role);
  if (isInitializing) {
    return <h3 style={{ padding: 20 }}>Restoring session...</h3>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/set-password" element={<SetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/apartment" element={<Apartment />} />
        <Route path="/event" element={<Event />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/comingSoon" element={<ComingSoon />} />
        {/* Apartment Super Admin */}
        <Route
          path="/super_admin/organisation/*"
          element={
            <RequireAuth roles={["super_admin"]}>
              <SuperAdminDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/organisation/*"
          element={
            <RequireAuth roles={["admin"]}>
              <AdminDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/security/organisation/*"
          element={
            <RequireAuth roles={["security"]}>
              <SecurityDashboard />
            </RequireAuth>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
