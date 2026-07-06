import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#020b3d] border-t border-blue-900 text-white">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        {/* <div className="text-center sm:text-left"> */}
        <div className="text-left">
          {/* <div className="flex items-center justify-center sm:justify-start gap-3 mb-4"> */}
          <div className="flex items-center justify-start gap-3 mb-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold">SMART ENTRY</h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Secure. Verify. Enter.
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm leading-6 sm:leading-7">
            Smart Entry is an enterprise-grade visitor management and
            authentication platform for Apartments, Hospitals and Events,
            providing secure QR verification, access control and real-time
            visitor tracking.
          </p>
        </div>

        {/* Solutions (HIDDEN ON MOBILE) */}
        <div className="hidden sm:block text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">
            Solutions
          </h3>

          <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm">
            {[
              ["Apartment Security", "/apartment"],
              ["Hospital Security", "/hospital"],
              ["Event Management", "/event"],
              ["Features", "/features"],
            ].map(([label, link]) => (
              <li key={label}>
                <a href={link} className="hover:text-cyan-400 transition">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company (HIDDEN ON MOBILE) */}
        <div className="hidden sm:block text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">
            Company
          </h3>

          <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm">
            {[
              ["Home", "/"],
              ["Pricing", "/pricing"],
              ["Contact", "/contact"],
              ["Resources", "/resources"],
            ].map(([label, link]) => (
              <li key={label}>
                <a href={link} className="hover:text-cyan-400 transition">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        {/* <div className="text-center sm:text-left"> */}
        <div className="text-left">
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">
            Contact
          </h3>

          <div className="space-y-3 sm:space-y-4 text-gray-400 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-cyan-400" />
              <span>Bengaluru, Karnataka</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-cyan-400" />
              <span className="break-all">support@smartentry.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-cyan-400" />
              <span>+91 95911 04481</span>
            </div>

            {/* Social */}
            <div className="flex justify-center sm:justify-start gap-5 pt-3 text-lg">
              <FaFacebookF className="cursor-pointer hover:text-cyan-400 transition" />
              <FaLinkedinIn className="cursor-pointer hover:text-cyan-400 transition" />
              <FaGithub className="cursor-pointer hover:text-cyan-400 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} Smart Entry. All Rights Reserved.
          </p>

          <p className="text-xs sm:text-sm text-gray-400">
            Designed & Developed by{" "}
            <a
              href="https://sukalpatechsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
            >
              Sukalpa Tech Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
