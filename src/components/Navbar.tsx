import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShieldCheck, ChevronDown, Globe, User, Menu, X } from "lucide-react";
import Login from "../feature/auth/pages/Login";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Lock scroll when menu or login is open
  useEffect(() => {
    document.body.style.overflow = isOpen || showLogin ? "hidden" : "auto";
  }, [isOpen, showLogin]);

  const navClass = ({ isActive }) =>
    isActive
      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg"
      : "text-white text-sm font-medium hover:text-blue-300 transition px-2 py-2";

  const closeMenus = () => setIsOpen(false);

  return (
    <>
      {/* HEADER */}
      <header className="w-full bg-[#020b3d] fixed top-0 left-0 z-50 shadow-lg">
        <nav className="max-w-[1400px] mx-auto h-[70px] sm:h-[78px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white flex items-center justify-center shadow-lg">
              <ShieldCheck size={24} className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-extrabold leading-none">
                SMART ENTRY
              </h1>

              <p className="hidden sm:block text-[11px] sm:text-xs text-gray-300">
                Secure. Verify. Enter.
              </p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {[
              ["Home", "/"],
              ["Features", "/features"],
              ["Solutions", "/solutions"],
              ["Resources", "/resources"],
              ["Pricing", "/pricing"],
              ["Contact", "/contact"],
            ].map(([label, link]) => (
              <NavLink key={label} to={link} className={navClass}>
                <span className="flex items-center gap-1">
                  {label}
                  {(label === "Solutions" || label === "Resources") && (
                    <ChevronDown size={14} />
                  )}
                </span>
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <button className="flex items-center gap-2 text-white text-sm font-medium">
              <Globe size={18} />
              English
              <ChevronDown size={14} />
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-5 xl:px-7 py-2.5 rounded-xl text-white font-medium shadow-lg hover:opacity-90 transition"
            >
              <User size={18} />
              Login
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden fixed top-[70px] sm:top-[78px] left-0 w-full bg-[#020b3d] border-t border-blue-900 z-40">
            <div className="flex flex-col px-6 py-6 space-y-4">
              {[
                ["Home", "/"],
                ["Features", "/features"],
                ["Solutions", "/solutions"],
                ["Resources", "/resources"],
                ["Pricing", "/pricing"],
                ["Contact", "/contact"],
              ].map(([label, link]) => (
                <NavLink
                  key={label}
                  to={link}
                  onClick={closeMenus}
                  className="text-white text-base hover:text-blue-300 transition py-2"
                >
                  {label}
                </NavLink>
              ))}

              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsOpen(false);
                }}
                className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl text-white font-medium shadow-lg"
              >
                <User size={18} />
                Login
              </button>
            </div>
          </div>
        )}
      </header>

      {/* SPACER */}
      <div className="h-[70px] sm:h-[78px]" />

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="w-full max-w-md relative">
            <div className="bg-[#020b3d] border border-blue-900 rounded-3xl shadow-2xl p-4 sm:p-6">
              {/* CLOSE */}
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>

              <Login onSuccess={() => setShowLogin(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
