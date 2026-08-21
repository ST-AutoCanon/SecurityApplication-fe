import { useState } from "react";
import DynamicTableCreatePage from "./DynamicTableCreatePage";
import DynamicTableUpdatePage from "./DynamicTableUpdatePage";

export default function FormManagement() {
  const [activeTab, setActiveTab] = useState<"create" | "update">("create");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === "create"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Create Form
          </button>

          <button
            onClick={() => setActiveTab("update")}
            className={`px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === "update"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Update Form
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "create" && <DynamicTableCreatePage />}

          {activeTab === "update" && <DynamicTableUpdatePage />}
        </div>
      </div>
    </div>
  );
}
