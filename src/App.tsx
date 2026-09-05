import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import { useAuth } from "./feature/auth/hooks/useAuth";

import SuperAdminDashboard from "./feature/superadmin/pages/SuperAdminDashboard";
import SecurityDashboard from "./feature/security/pages/SecurityDashboard";
import Apartment from "./pages/Apartment";
import Event from "./pages/Event";
import Hospital from "./pages/Hospital";
import HomePage from "./HomePages.tsx/HomePage";
import Navbar from "./components/Navbar";
import AdminDashboard from "./feature/admin/pages/AdminDashboard";

import SetPasswordPage from "./pages/SetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Features from "./pages/Features";
import ComingSoon from "./pages/ComingSoon";
import LoginPage from "./feature/auth/pages/Login";
import PublicForm from "./feature/admin/pages/orgs/all/Formify/PublicForm";
import UserDashboard from "./feature/user/pages/UserDashboard";

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


   console.log("========== RequireAuth ==========");
   console.log("user:", user);
   console.log("user role:", user?.role);
   console.log("required roles:", roles);
   console.log("role matches:", user ? roles.includes(user.role) : false);
   console.log("isInitializing:", isInitializing);
  console.log("=================================");
  
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
        <Route path="/form/:orgId/:formId" element={<PublicForm />} />
        <Route
          path="/login"
          element={
            <>
              <HomePage />
              <LoginPage />
            </>
          }
        />
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
                  <div className="flex-1 min-w-0 overflow-y-auto pb-0">

              <AdminDashboard />
              </div>
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

        {/* User */}
        <Route
          path="/user/organisation/*"
          element={
            <RequireAuth roles={["user"]}>
              <UserDashboard />
            </RequireAuth>
          }
        />
      </Routes>
        <div className="shrink-0 h-16">

      <Footer />
      </div>
    </BrowserRouter>
  );
}
