// // import React, { useState, useContext } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { LayoutDashboard, Building2, Menu, Building, Users,ClipboardEdit,   // for Form Builder
// //   Megaphone,MessageSquarePlus } from "lucide-react";
// // import { AuthContext } from "../../../context/AuthContext";
// // export default function Sidebar() {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // const { user } = useContext(AuthContext);
// //   const links = [
// //     {
// //       name: "Dashboard",
// //       path: "/admin/organisation/dashboard",
// //       icon: <LayoutDashboard size={22} />,
// //     },
// //     {
// //       // name: "Security",
// //       name:
// //         user?.org_type?.toUpperCase() === "EVENT" ? "Organiser" : "Security",
// //       path: "/admin/organisation/create_security",
// //       icon: <Building2 size={22} />,
// //     },
// //     {
// //       name: "Gates",
// //       path: "/admin/organisation/gates",
// //       icon: <Users size={22} />,
// //     },
// //     // {
// //     //   name: "Manage Tables",
// //     //   path: "/admin/organisation/manage_tables",
// //     //   icon: <LayoutDashboard size={22} />,
// //     // },
// //     // {
// //     //   name: "Update Tables",
// //     //   path: "/admin/organisation/update_tables",
// //     //   icon: <LayoutDashboard size={22} />,
// //     // },
// //     {
// //       name: "Manage Category",
// //       path: "/admin/organisation/manage_forms",
// //       icon: <LayoutDashboard size={22} />,
// //     },
// //     {
// //       name: "Buisness Data",
// //       path: "/admin/organisation/buisness_data",
// //       icon: <LayoutDashboard size={22} />,
// //     },
// //     {
// //       name: "Form Builder",
// //       path: "/admin/organisation/form_builder",
// //       icon: <ClipboardEdit size={22} />,
// //     },
// //     {
// //       name: "Campaign",
// //       path: "/admin/organisation/Campaign",
// //       icon: <Megaphone size={22} />,
// //     },
// //     {
// //       name: "Quick Request",
// //       path: "/admin/organisation/quick_request",
// //       icon: <MessageSquarePlus size={22} />,
// //     },
// //     // {
// //     //   name: "Apartment",
// //     //   path: "/admin/organisation/apartment/members",
// //     //   icon: <Building size={22} />,
// //     // },
// //     // Show Apartment only if org_type is NOT EVENT or HOSPITAL
// //     ...(!["EVENT", "HOSPITAL"].includes(user?.org_type?.toUpperCase() || "")
// //       ? [
// //           {
// //             name: "Apartment",
// //             path: "/admin/organisation/apartment/members",
// //             icon: <Building size={22} />,
// //           },
// //         ]
// //       : []),
// //   ];

// //   const isActive = (path: string) => {
// //     return path === "/super_admin"
// //       ? location.pathname === path
// //       : location.pathname.startsWith(path);
// //   };

// //   return (
// //     <>
// //       {/* ================= DESKTOP SIDEBAR ================= */}
// //       <aside
// //         onMouseEnter={() => setSidebarOpen(true)}
// //         onMouseLeave={() => setSidebarOpen(false)}
// //         className={`hidden md:flex flex-col bg-white border-r border-gray-200 shadow-md
// //         transition-all duration-300 ease-in-out
// //         ${sidebarOpen ? "w-64 p-6" : "w-20 p-3"}
// //       `}
// //       >
// //         {/* Logo / Title */}
// //         <div className="flex justify-center mb-8 transition-all duration-300">
// //           <h1
// //             className={`font-semibold text-gray-800 transition-all duration-300
// //             ${sidebarOpen ? "text-lg" : "text-sm"}
// //           `}
// //           >
// //             {sidebarOpen ? "Admin" : "Admin"}
// //           </h1>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="flex-1">
// //           <ul className="space-y-3">
// //             {links.map((link) => {
// //               const active = isActive(link.path);

// //               return (
// //                 <li key={link.name}>
// //                   <Link
// //                     to={link.path}
// //                     className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
// //                     ${
// //                       active
// //                         ? "bg-gradient-to-r from-[#020b3d] to-cyan-600 text-white shadow-lg"
// //                         : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
// //                     }
// //                   `}
// //                   >
// //                     {link.icon}
// //                     {sidebarOpen && <span>{link.name}</span>}
// //                   </Link>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         </nav>
// //       </aside>

// //       {/* ================= MOBILE BOTTOM BAR ================= */}
// //       <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-r border-gray-200 border-t shadow">
// //         <div className="flex justify-around items-center py-2">
// //           {links.map((link) => {
// //             const active = isActive(link.path);

// //             return (
// //               <button
// //                 key={link.name}
// //                 onClick={() => navigate(link.path)}
// //                 className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition
// //                 ${active ? "text-blue-600" : "text-gray-500"}
// //               `}
// //               >
// //                 {link.icon}
// //               </button>
// //             );
// //           })}

// //           {/* Hamburger */}
// //           <button
// //             onClick={() => setMobileMenuOpen(true)}
// //             className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-700"
// //           >
// //             <Menu size={24} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* ================= MOBILE SIDE DRAWER ================= */}
// //       {mobileMenuOpen && (
// //         <div className="fixed inset-0 z-50 flex">
// //           {/* Overlay */}
// //           <div
// //             className="fixed inset-0 bg-black/40"
// //             onClick={() => setMobileMenuOpen(false)}
// //           />

// //           {/* Drawer */}
// //           <aside className="relative w-64 bg-white border-r border-gray-200 shadow-lg p-6">
// //             <button
// //               className="absolute top-4 right-4 text-gray-600"
// //               onClick={() => setMobileMenuOpen(false)}
// //             >
// //               ×
// //             </button>

// //             <div className="flex justify-center mb-6">
// //               <h1 className="text-lg font-semibold">Admin</h1>
// //             </div>

// //             <nav>
// //               <ul className="space-y-4">
// //                 {links.map((link) => {
// //                   const active = isActive(link.path);

// //                   return (
// //                     <li key={link.name}>
// //                       <Link
// //                         to={link.path}
// //                         onClick={() => setMobileMenuOpen(false)}
// //                         className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
// //                         ${
// //                           active
// //                             ? "bg-gradient-to-r from-[#020b3d] to-cyan-600 text-white shadow-lg"
// //                             : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
// //                         }
// //                       `}
// //                       >
// //                         {link.icon}
// //                         <span>{link.name}</span>
// //                       </Link>
// //                     </li>
// //                   );
// //                 })}
// //               </ul>
// //             </nav>
// //           </aside>
// //         </div>
// //       )}
// //     </>
// //   );
// // }
// import React, { useState, useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { LayoutDashboard, Building2, Menu, Building, Users,ClipboardEdit,   // for Form Builder
//   Megaphone,MessageSquarePlus,Info,Store,ClipboardListIcon,DoorOpen} from "lucide-react";
// import { AuthContext } from "../../../context/AuthContext";

// export default function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const { user } = useContext(AuthContext);

//   const links = [
//     {
//       name: "Dashboard",
//       path: "/admin/organisation/dashboard",
//       icon: <LayoutDashboard size={22} />,
//     },
//     {
//       name:
//         user?.org_type?.toUpperCase() === "EVENT"
//           ? "Organiser"
//           : "Security",
//       path: "/admin/organisation/create_security",
//       icon: <Building2 size={22} />,
//     },
//     {
//       name: "Gates",
//       path: "/admin/organisation/gates",
//       icon: <DoorOpen size={22} />,
//     },
//     {
//       name: "Form Management",
//       path: "/admin/organisation/manage_forms",
//       icon: <ClipboardListIcon size={22} />,
//     },
//     {
//       name: "Buisness Data",
//       path: "/admin/organisation/buisness_data",
//       icon: <LayoutDashboard size={22} />,
//     },
//    {
//       name: "Form Builder",
//       path: "/admin/organisation/form_builder",
//       icon: <ClipboardEdit size={22} />,
//     },
//     {
//       name: "Campaign",
//       path: "/admin/organisation/Campaign",
//       icon: <Megaphone size={22} />,
//     },
//      {
//   name: "Quick Request",
//   path: "/admin/organisation/quick_request",
//   icon: <MessageSquarePlus size={22} />,
// },
// {
//   name: "Announcements",
//   path: "/admin/organisation/Announcements",
//   icon: <Megaphone  size={22} />,
// },
// {
//   name: "Important Information",
//   path: "/admin/organisation/ImportantInformation",
//   icon: <Info size={22} />,
// },
// // {
// //   name: "Vendors and Service Providers",
// //   path: "/admin/organisation/VendorsServiceProviders",
// //   icon: <Store size={22} />,
// // },
// {
//   name: "Vendors & Service Providers",
//   path: "/admin/organisation/VendorsServiceProviders",
//   icon: <Store size={22} strokeWidth={2} />,
// },


//     // {
//     //   name: "Apartment",
//     //   path: "/admin/organisation/apartment/members",
//     //   icon: <Building size={22} />,
//     // },
//     // Show Apartment only if org_type is NOT EVENT or HOSPITAL
//     ...(!["EVENT", "HOSPITAL"].includes(
//       user?.org_type?.toUpperCase() || ""
//     )
//       ? [
//           {
//             name: "Apartment",
//             path: "/admin/organisation/apartment/members",
//             icon: <Building size={22} />,
//           },
//         ]
//       : []),
//   ];

//   const isActive = (path: string) => {
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <>
//       {/* ================= DESKTOP SIDEBAR ================= */}
//       <aside
//         onMouseEnter={() => setSidebarOpen(true)}
//         onMouseLeave={() => setSidebarOpen(false)}
//         className={`
//           hidden md:flex
//           flex-col
//           self-stretch
//           shrink-0
//           bg-white
//           border-r
//           border-gray-200
//           shadow-md
//           transition-all
//           duration-300
//           ease-in-out
//           ${sidebarOpen ? "w-64 p-6" : "w-20 p-3"}
//         `}
//       >
//         {/* Logo / Title */}
//         <div className="flex justify-center mb-8 shrink-0">
//           <h1
//             className={`
//               font-semibold
//               text-gray-800
//               transition-all
//               duration-300
//               whitespace-nowrap
//               ${sidebarOpen ? "text-lg" : "text-sm"}
//             `}
//           >
//             {sidebarOpen ? "Admin" : "AD"}
//           </h1>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1">
//           <ul className="space-y-3">
//             {links.map((link) => {
//               const active = isActive(link.path);

//               return (
//                 <li key={link.name}>
//                   <Link
//                     to={link.path}
//                     className={`
//                       flex
//                       items-center
//                       gap-3
//                       px-3
//                       py-2
//                       rounded-lg
//                       transition-colors
//                       overflow-hidden
//                       ${
//                         active
//                           ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
//                           : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"
//                       }
//                     `}
//                   >
//                     {link.icon}

//                     {sidebarOpen && (
//                       <span className="whitespace-nowrap">
//                         {link.name}
//                       </span>
//                     )}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </aside>

//       {/* ================= MOBILE BOTTOM BAR ================= */}
//       <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t border-gray-200 shadow">
//         <div className="flex justify-around items-center py-2">
//           {links.map((link) => {
//             const active = isActive(link.path);

//             return (
//               <button
//                 key={link.name}
//                 onClick={() => navigate(link.path)}
//                 className={`
//                   flex
//                   flex-col
//                   items-center
//                   justify-center
//                   w-12
//                   h-12
//                   rounded-lg
//                   transition
//                   ${active ? "text-blue-600" : "text-gray-500"}
//                 `}
//               >
//                 {link.icon}
//               </button>
//             );
//           })}

//           {/* Hamburger */}
//           <button
//             onClick={() => setMobileMenuOpen(true)}
//             className="
//               flex
//               items-center
//               justify-center
//               w-12
//               h-12
//               rounded-lg
//               text-gray-700
//             "
//           >
//             <Menu size={24} />
//           </button>
//         </div>
//       </div>

//       {/* ================= MOBILE SIDE DRAWER ================= */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           {/* Overlay */}
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setMobileMenuOpen(false)}
//           />

//           {/* Drawer */}
//           <aside
//             className="
//               relative
//               z-10
//               w-64
//               h-full
//               bg-white
//               border-r
//               border-gray-200
//               shadow-lg
//               p-6
//             "
//           >
//             {/* Close Button */}
//             <button
//               type="button"
//               className="
//                 absolute
//                 top-4
//                 right-4
//                 text-gray-600
//                 text-xl
//               "
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               ×
//             </button>

//             {/* Logo / Title */}
//             <div className="flex justify-center mb-6">
//               <h1 className="text-lg font-semibold">
//                 Admin
//               </h1>
//             </div>

//             {/* Navigation */}
//             <nav>
//               <ul className="space-y-4">
//                 {links.map((link) => {
//                   const active = isActive(link.path);

//                   return (
//                     <li key={link.name}>
//                       <Link
//                         to={link.path}
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={`
//                           flex
//                           items-center
//                           gap-3
//                           px-3
//                           py-2
//                           rounded-lg
//                           transition
//                           ${
//                             active
//                               ? "bg-gradient-to-r from-[#020b3d] to-cyan-600 text-white shadow-lg"
//                               : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-700"
//                           }
//                         `}
//                       >
//                         {link.icon}

//                         <span>{link.name}</span>
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </nav>
//           </aside>
//         </div>
//       )}
//     </>
//   );
// }
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Menu,
  Building,
  Users,
  ClipboardEdit,
  Megaphone,
  MessageSquarePlus,
  Info,
  Store,
  ClipboardList,
  DoorOpen,
  X,
} from "lucide-react";

import { AuthContext } from "../../../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const orgType = user?.org_type?.toUpperCase() || "";

  const links = [
    {
      name: "Dashboard",
      path: "/admin/organisation/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      name: orgType === "EVENT" ? "Organiser" : "Security",
      path: "/admin/organisation/create_security",
      icon: <Building2 />,
    },
    {
      name: "Gates",
      path: "/admin/organisation/gates",
      icon: <DoorOpen />,
    },
    {
      name: "Form Management",
      path: "/admin/organisation/manage_forms",
      icon: <ClipboardList />,
    },
    {
      name: "Business Data",
      path: "/admin/organisation/buisness_data",
      icon: <LayoutDashboard />,
    },
    {
      name: "Form Builder",
      path: "/admin/organisation/form_builder",
      icon: <ClipboardEdit />,
    },
    {
      name: "Campaign",
      path: "/admin/organisation/Campaign",
      icon: <Megaphone />,
    },
    {
      name: "Quick Request",
      path: "/admin/organisation/quick_request",
      icon: <MessageSquarePlus />,
    },
    {
      name: "Announcements",
      path: "/admin/organisation/Announcements",
      icon: <Megaphone />,
    },
    {
      name: "Important Information",
      path: "/admin/organisation/ImportantInformation",
      icon: <Info />,
    },
    {
      name: "Vendors & ServiceProviders",
      path: "/admin/organisation/VendorsServiceProviders",
      icon: <Store />,
    },

    ...(!["EVENT", "HOSPITAL"].includes(orgType)
      ? [
          {
            name: "Apartment",
            path: "/admin/organisation/apartment/members",
            icon: <Building />,
          },
        ]
      : []),
  ];

  const normalizedPath = (path: string) =>
    path.toLowerCase().replace(/\/+$/, "") || "/";

  const isActive = (path: string) => {
    const currentPath = normalizedPath(location.pathname);
    const linkPath = normalizedPath(path);

    // Dashboard is an exact match so it doesn't stay active on every page.
    if (linkPath === "/admin/organisation/dashboard") {
      return currentPath === linkPath;
    }

    return (
      currentPath === linkPath ||
      currentPath.startsWith(`${linkPath}/`)
    );
  };

  const renderIcon = (icon: React.ReactElement) =>
    React.cloneElement(icon, {
      size: 22,
      strokeWidth: 2,
      className: "block shrink-0",
      "aria-hidden": true,
    } as React.SVGProps<SVGSVGElement>);

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`
          hidden md:flex
          h-full
          min-h-0
          shrink-0
          flex-col
          overflow-hidden
          border-r border-gray-200
          bg-white
          shadow-md
          transition-[width,padding]
          duration-300
          ease-in-out
          ${
            sidebarOpen
              ? "w-64 px-4 py-5"
              : "w-20 px-2 py-5"
          }
        `}
      >
        {/* Logo / Title */}
        <div className="mb-6 flex h-10 shrink-0 items-center justify-center">
          <h1
            className={`
              whitespace-nowrap
              font-semibold
              text-gray-800
              transition-all duration-200
              ${sidebarOpen ? "text-lg" : "text-sm"}
            `}
          >
            {sidebarOpen ? "Admin" : "AD"}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
          <ul className="space-y-2">
            {links.map((link) => {
              const active = isActive(link.path);

              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    title={!sidebarOpen ? link.name : undefined}
                    aria-current={active ? "page" : undefined}
                    className={`
                      flex
                      min-h-11
                      w-full
                      items-center
                      overflow-hidden
                      rounded-lg
                      transition-colors duration-200
                      ${
                        sidebarOpen
                          ? "justify-start gap-3 px-3"
                          : "justify-center px-0"
                      }
                      ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }
                    `}
                  >
                    {/* Fixed-size icon container */}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                      {renderIcon(link.icon)}
                    </span>

                    {/* Label */}
                    {sidebarOpen && (
                      <span className="min-w-0 flex-1 whitespace-nowrap text-sm font-medium">
                        {link.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-md md:hidden">
        <div className="flex items-center justify-around gap-1 px-1 py-2">
          {links.slice(0, 4).map((link) => {
            const active = isActive(link.path);

            return (
              <button
                key={link.path}
                type="button"
                title={link.name}
                aria-label={link.name}
                aria-current={active ? "page" : undefined}
                onClick={() => navigate(link.path)}
                className={`
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  rounded-lg transition-colors
                  ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
              >
                {renderIcon(link.icon)}
              </button>
            );
          })}

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-lg text-gray-700
              transition-colors hover:bg-blue-50
            "
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE SIDE DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <aside
            aria-label="Admin navigation"
            className="
              relative z-10
              flex h-full w-72 max-w-[85vw]
              flex-col
              overflow-hidden
              border-r border-gray-200
              bg-white
              p-4
              shadow-xl
            "
          >
            {/* Drawer Header */}
            <div className="mb-5 flex h-10 shrink-0 items-center justify-between px-2">
              <h1 className="text-lg font-semibold text-gray-800">
                Admin
              </h1>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg text-gray-600
                  transition-colors hover:bg-gray-100
                "
              >
                <X size={21} />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
              <ul className="space-y-2">
                {links.map((link) => {
                  const active = isActive(link.path);

                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`
                          flex
                          min-h-11
                          w-full
                          items-center
                          gap-3
                          overflow-hidden
                          rounded-lg
                          px-3 py-2
                          transition-colors duration-200
                          ${
                            active
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          }
                        `}
                      >
                        {/* Fixed-size icon container */}
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                          {renderIcon(link.icon)}
                        </span>

                        {/* Allow long labels to wrap neatly in the drawer */}
                        <span className="min-w-0 flex-1 text-sm font-medium leading-5">
                          {link.name}
                        </span>
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
