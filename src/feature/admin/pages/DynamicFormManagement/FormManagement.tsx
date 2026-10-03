// import { useState } from "react";
// import DynamicTableCreatePage from "./DynamicTableCreatePage";
// import DynamicTableUpdatePage from "./DynamicTableUpdatePage";

// export default function FormManagement() {
//   const [activeTab, setActiveTab] = useState<"create" | "update">("create");

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
//             Create Form
//           </button>

//           <button
//             onClick={() => setActiveTab("update")}
//             className={`px-6 py-4 font-semibold border-b-2 transition ${
//               activeTab === "update"
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-blue-600"
//             }`}
//           >
//             Update Form
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {activeTab === "create" && <DynamicTableCreatePage />}

//           {activeTab === "update" && <DynamicTableUpdatePage />}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { FilePlus2, FilePenLine, Settings2 } from "lucide-react";
import DynamicTableCreatePage from "./DynamicTableCreatePage";
import DynamicTableUpdatePage from "./DynamicTableUpdatePage";

export default function FormManagement() {
  const [activeTab, setActiveTab] = useState<"create" | "update">("create");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <Settings2 size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Form Management
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create new dynamic forms or update existing form configurations.
            </p>
          </div>
        </div>

        {/* =================================================
            TABS
        ================================================= */}

        <div className="px-6 md:px-8 pt-4 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            {/* Create Form */}
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

              <span>Create Form</span>
            </button>

            {/* Update Form */}
            <button
              type="button"
              onClick={() => setActiveTab("update")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "update"
                  ? "border-blue-600 text-blue-600 bg-blue-50/60"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FilePenLine size={18} />

              <span>Update Form</span>
            </button>
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="p-2 md:p-4">
          {activeTab === "create" && <DynamicTableCreatePage />}

          {activeTab === "update" && <DynamicTableUpdatePage />}
        </div>
      </div>
    </div>
  );
}