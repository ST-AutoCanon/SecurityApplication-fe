import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShieldCheck, ChevronDown, Globe, User, Menu, X } from "lucide-react";

import Login from "../feature/auth/pages/Login";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen || showLogin ? "hidden" : "auto";
  }, [isOpen, showLogin]);

  const navClass = ({ isActive }) =>
    isActive
      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg"
      : "text-white text-sm font-medium hover:text-blue-300 transition px-2 py-2";

  const closeMenus = () => {
    setIsOpen(false);
    setShowServices(false);
  };

  const services = [
    { name: "Apartment Security", path: "/apartment" },
    { name: "Event Management", path: "/event" },
    { name: "Hospital Security", path: "/hospital" },
  ];

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
              <h1 className="text-white text-lg sm:text-xl font-extrabold">
                SMART ENTRY
              </h1>
              <p className="hidden sm:block text-xs text-gray-300">
                Secure. Verify. Enter.
              </p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/features" className={navClass}>
              Features
            </NavLink>

            {/* SERVICES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <button className="text-white text-sm font-medium hover:text-blue-300 transition px-2 py-2 flex items-center gap-1">
                Services <ChevronDown size={14} />
              </button>

              {showServices && (
                <div className="absolute top-10 left-0 bg-[#021a4d] border border-blue-900 rounded-xl shadow-xl w-52 overflow-hidden">
                  {services.map((s) => (
                    <NavLink
                      key={s.name}
                      to={s.path}
                      onClick={() => setShowServices(false)}
                      className="block px-4 py-3 text-sm text-white hover:bg-blue-600/30 transition"
                    >
                      {s.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/comingSoon" className={navClass}>
              Pricing
            </NavLink>

            <NavLink to="/contactUs" className={navClass}>
              Contact
            </NavLink>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center gap-4">
            {/* <button className="flex items-center gap-2 text-white text-sm">
              <Globe size={18} />
              English
              <ChevronDown size={14} />
            </button> */}

            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 rounded-xl text-white font-medium"
            >
              <User size={18} />
              Login
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden fixed top-[70px] left-0 w-full bg-[#020b3d] border-t border-blue-900 z-40">
            <div className="flex flex-col px-6 py-6 space-y-3">
              <NavLink to="/" onClick={closeMenus} className="text-white py-2">
                Home
              </NavLink>

              <NavLink
                to="/features"
                onClick={closeMenus}
                className="text-white py-2"
              >
                Features
              </NavLink>

              {/* MOBILE SERVICES */}
              <div className="text-white font-medium">Services</div>

              {services.map((s) => (
                <NavLink
                  key={s.name}
                  to={s.path}
                  onClick={closeMenus}
                  className="text-gray-300 pl-4 py-1"
                >
                  {s.name}
                </NavLink>
              ))}

              <NavLink
                to="/comingSoon"
                onClick={closeMenus}
                className="text-white py-2"
              >
                Pricing
              </NavLink>

              <NavLink
                to="/contactUs"
                onClick={closeMenus}
                className="text-white py-2"
              >
                Contact
              </NavLink>

              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsOpen(false);
                }}
                className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl text-white font-medium"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="h-[70px] sm:h-[78px]" />

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
          <div className="w-full max-w-md bg-[#020b3d] p-2 rounded-3xl relative">
            {/* <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-white"
            >
              ✕
            </button> */}

            <Login onSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </>
  );
}