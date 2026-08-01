// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import TopNav from "../components/TopNav";
// import SecurityRegistration from "./punch";
// // import DynamicRegisterPage from "./DynamicRegisterPage";
// import DynamicRegisterPage from "./VoiceAssistantPage";

// export default function SecurityDashboard() {
//   const { pathname } = useLocation();

//   // Map paths to page names

//   let activePage = "Dashboard";

//   if (pathname.includes("create_security")) {
//     activePage = "Security";
//   } else if (pathname.includes("manage_organisation")) {
//     activePage = "Manage Organisation";
//   } else if (pathname.includes("manage_registration")) {
//     activePage = "Manage Registration";
//   }

//   const pageComponents: Record<string, JSX.Element> = {
//     Dashboard: (
//       <div className="w-full h-full bg-gradient-to-r from-[#4b1b7a] to-[#2d2a8c] text-white min-h-[80vh]">
//         <div className="w-full px-4 sm:px-6 md:px-10 pt-5 md:pt-8 flex flex-wrap gap-4 sm:gap-4">
//           <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8 w-full">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               Welcome to Security Dashboard
//             </h2>
//             <p className="text-gray-700">
//               Use the sidebar to navigate to different sections.
//             </p>
//           </div>
//         </div>
//       </div>
//     ),
//     "Security": <SecurityRegistration />,
//     "Manage Registration": <DynamicRegisterPage/>,
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Layout Wrapper */}
//       <div className="flex flex-col md:flex-row min-h-screen">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content Area */}
//         <div className="flex-1 flex flex-col w-full">
//           {/* Top Navigation */}
//           <TopNav pageTitle={activePage} />

//           {/* Main Content */}
//           <main className="flex-1 bg-gray-50 overflow-auto">
//             {pageComponents[activePage]}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useLocation } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import SecurityRegistration from "./punch";
import DynamicRegisterPage from "./VoiceAssistantPage";
import { AuthContext } from "../../../context/AuthContext";

export default function SecurityDashboard() {
  const { pathname } = useLocation();

  const { user } = useContext(AuthContext);

  const roleName =
    user?.org_type?.toUpperCase() === "EVENT" ? "Organiser" : "Security";

  // Map paths to page names
  let activePage = "Dashboard";

  if (pathname.includes("create_security")) {
    activePage = roleName;
  } else if (pathname.includes("manage_organisation")) {
    activePage = "Manage Organisation";
  } else if (pathname.includes("manage_registration")) {
    activePage = "Manage Registration";
  }

  const pageComponents: Record<string, JSX.Element> = {
    Dashboard: (
      <div className="w-full h-full bg-gradient-to-r from-[#4b1b7a] to-[#2d2a8c] text-white min-h-[80vh]">
        <div className="w-full px-4 sm:px-6 md:px-10 pt-5 md:pt-8 flex flex-wrap gap-4 sm:gap-4">
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Welcome to {roleName} Dashboard
            </h2>

            <p className="text-gray-700">
              Use the sidebar to navigate to different sections.
            </p>
          </div>
        </div>
      </div>
    ),

    [roleName]: <SecurityRegistration />,

    "Manage Registration": <DynamicRegisterPage />,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          {/* Top Navigation */}
          <TopNav pageTitle={activePage} />

          {/* Content */}
          <main className="flex-1 bg-gray-50 overflow-auto">
            {pageComponents[activePage]}
          </main>
        </div>
      </div>
    </div>
  );
}