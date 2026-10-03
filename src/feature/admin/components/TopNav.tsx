// import { useContext } from "react";
// import { AuthContext } from "../../../context/AuthContext";
// import { Menu } from "lucide-react";
// import avatarimage from "../../../assets/avatar.jpg";

// interface TopNavProps {
//   pageTitle: string;
//   onMenuClick?: () => void; // optional for mobile
// }

// export default function TopNav({ pageTitle, onMenuClick }: TopNavProps) {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     // <header className="w-full bg-gradient-to-r from-[#4b1b7a] to-[#2d2a8c] px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
//     <header className="w-full bg-gradient-to-r from-[#020b3d] via-[#0b1f66] to-cyan-700 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center shadow-md">
//       {/* LEFT - PAGE TITLE + MOBILE MENU */}
//       <div className="flex items-center gap-3">
//         {onMenuClick && (
//           <button
//             onClick={onMenuClick}
//             className="md:hidden text-white p-2 rounded hover:bg-white/20 transition"
//           >
//             <Menu size={22} />
//           </button>
//         )}
//         <h1 className="text-white text-lg sm:text-2xl font-semibold truncate">
          
//           {pageTitle}
//         </h1>
//       </div>

//       {/* RIGHT - USER BOX + LOGOUT */}
//       <div className="flex items-center gap-3 sm:gap-4">
//         {/* USER INFO */}
//         {user && (
//           <div className="flex items-center gap-2 sm:gap-3 border border-white/40 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white">
//             <img
//               src={avatarimage}
//               alt="avatar"
//               className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-white/50"
//             />
//             {/* Hide full name on extra small screens */}
//             <span className="hidden sm:block text-sm sm:text-base font-medium truncate max-w-[100px] sm:max-w-[150px]">
//               {user.first_name ?? "User"}
//             </span>
//           </div>
//         )}

//         {/* LOGOUT BUTTON */}
//         <button
//           onClick={logout}
//           className="border border-white/60 text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base hover:bg-white hover:text-blue-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }



















import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Menu, X, ShieldCheck } from "lucide-react";
import avatarimage from "../../../assets/avatar.jpg";

interface TopNavProps {
  pageTitle: string;
  onMenuClick?: () => void;
  mobileMenuOpen?: boolean;
}

export default function TopNav({
  pageTitle,
  onMenuClick,
  mobileMenuOpen = false,
}: TopNavProps) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="w-full shrink-0 bg-gradient-to-r from-[#020b3d] via-[#0b1f66] to-cyan-700 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">

          {/* ================================================= */}
          {/* LEFT - LOGO + PAGE TITLE */}
          {/* ================================================= */}
          <div className="flex items-center gap-3 min-w-0">

            {/* LOGO */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">

              <div
                className="
                  w-9 h-9
                  sm:w-10 sm:h-10
                  rounded-xl
                  bg-white
                  flex items-center justify-center
                  shadow-lg
                "
              >
                <ShieldCheck
                  size={23}
                  className="text-blue-600"
                />
              </div>

              {/* Logo Text */}
              <div className="hidden sm:block">
                <h1 className="text-white text-sm sm:text-base font-extrabold tracking-wide leading-tight">
                  SMART ENTRY
                </h1>

                <p className="hidden lg:block text-[10px] text-gray-300 leading-tight">
                  Secure. Verify. Enter.
                </p>
              </div>
            </div>


          </div>

          {/* ================================================= */}
          {/* RIGHT - USER + LOGOUT + MOBILE MENU */}
          {/* ================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* USER */}
            {user && (
              <div
                className="
                  h-10
                  flex items-center
                  gap-2
                  sm:gap-3
                  px-2
                  sm:px-4
                  rounded-full
                  border border-white/40
                  bg-white/5
                  text-white
                "
              >
                {/* Avatar */}
                <img
                  src={avatarimage}
                  alt="User avatar"
                  className="
                    h-8 w-8
                    rounded-full
                    object-cover
                    border border-white/50
                    shrink-0
                  "
                />

                {/* User Name */}
                <span
                  className="
                    hidden sm:block
                    text-sm
                    lg:text-base
                    font-medium
                    truncate
                    max-w-[100px]
                    lg:max-w-[160px]
                  "
                >
                  {user.first_name ?? "User"}
                </span>
              </div>
            )}

            {/* LOGOUT */}
            <button
              type="button"
              onClick={logout}
              className="
                h-10
                px-3
                sm:px-4
                rounded-full
                border border-white/60
                text-white
                text-sm
                sm:text-base
                font-medium
                hover:bg-white
                hover:text-blue-700
                active:scale-95
                transition
                whitespace-nowrap
              "
            >
              Logout
            </button>

            {/* ================================================= */}
            {/* MOBILE MENU BUTTON */}
            {/* ================================================= */}
            {onMenuClick && (
              <button
                type="button"
                onClick={onMenuClick}
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
                className="
                  md:hidden
                  flex
                  items-center
                  justify-center
                  h-10
                  w-10
                  rounded-lg
                  text-white
                  border border-white/30
                  hover:bg-white/20
                  active:bg-white/30
                  transition
                "
              >
                {mobileMenuOpen ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
