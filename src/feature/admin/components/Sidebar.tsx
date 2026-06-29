import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, Menu } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const { user } = useContext(AuthContext);
  const links = [
    {
      name: "Dashboard",
      path: "/admin/organisation/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      // name: "Security",
      name:
        user?.org_type?.toUpperCase() === "EVENT" ? "Organiser" : "Security",
      path: "/admin/organisation/create_security",
      icon: <Building2 size={22} />,
    },
    {
      name: "Manage Tables",
      path: "/admin/organisation/manage_tables",
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: "Update Tables",
      path: "/admin/organisation/update_tables",
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: "Buisness Data",
      path: "/admin/organisation/buisness_data",
      icon: <LayoutDashboard size={22} />,
    },
  ];

  const isActive = (path: string) => {
    return path === "/super_admin"
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 shadow-md
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-64 p-6" : "w-20 p-3"}
      `}
      >
        {/* Logo / Title */}
        <div className="flex justify-center mb-8 transition-all duration-300">
          <h1
            className={`font-semibold text-gray-800 transition-all duration-300
            ${sidebarOpen ? "text-lg" : "text-sm"}
          `}
          >
            {sidebarOpen ? "Admin" : "Admin"}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {links.map((link) => {
              const active = isActive(link.path);

              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${
                      active
                        ? "bg-gradient-to-r from-[#020b3d] to-cyan-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
                    }
                  `}
                  >
                    {link.icon}
                    {sidebarOpen && <span>{link.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-r border-gray-200 border-t shadow">
        <div className="flex justify-around items-center py-2">
          {links.map((link) => {
            const active = isActive(link.path);

            return (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition
                ${active ? "text-blue-600" : "text-gray-500"}
              `}
              >
                {link.icon}
              </button>
            );
          })}

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-700"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE SIDE DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <aside className="relative w-64 bg-white border-r border-gray-200 shadow-lg p-6">
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              ×
            </button>

            <div className="flex justify-center mb-6">
              <h1 className="text-lg font-semibold">Admin</h1>
            </div>

            <nav>
              <ul className="space-y-4">
                {links.map((link) => {
                  const active = isActive(link.path);

                  return (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                        ${
                          active
                            ? "bg-gradient-to-r from-[#020b3d] to-cyan-600 text-white shadow-lg"
                            : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
                        }
                      `}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}