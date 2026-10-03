// import { useContext, useState } from "react";
// import { AuthContext } from "../../../../context/AuthContext";
// import AssignGateRegistrationPage from "./AssignGateRegistrationPage";
// import AssignGates from "./AssignGates";

// export default function AssignGatesManagement() {
//   const { user } = useContext(AuthContext);

//   const [activeTab, setActiveTab] = useState<"create" | "list">("create");

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="bg-white rounded-xl shadow">
//         {/* Tabs */}
//         <div className="flex border-b">
//           <button
//             onClick={() => setActiveTab("create")}
//             className={`px-6 py-4 font-semibold border-b-2 transition ${
//               activeTab === "create"
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-blue-600"
//             }`}
//           >
//             Create Gate
//           </button>

//           <button
//             onClick={() => setActiveTab("list")}
//             className={`px-6 py-4 font-semibold border-b-2 transition ${
//               activeTab === "list"
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-blue-600"
//             }`}
//           >
//             Gate List
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {activeTab === "create" && <AssignGateRegistrationPage />}

//           {activeTab === "list" && <AssignGates />}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { DoorOpen, FilePlus2, ListChecks, Settings2 } from "lucide-react";
import AssignGateRegistrationPage from "./AssignGateRegistrationPage";
import AssignGates from "./AssignGates";

export default function AssignGatesManagement() {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <Settings2 size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gate Management
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create and manage gates for your organisation.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 md:px-8 pt-4 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "create"
                  ? "border-blue-600 text-blue-600 bg-blue-50/60"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FilePlus2 size={18} />
              <span>Create Gate</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "list"
                  ? "border-blue-600 text-blue-600 bg-blue-50/60"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ListChecks size={18} />
              <span>Gate List</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 md:p-4">
          {activeTab === "create" && <AssignGateRegistrationPage />}

          {activeTab === "list" && <AssignGates />}
        </div>
      </div>
    </div>
  );
}