import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import AssignGateRegistrationPage from "./AssignGateRegistrationPage";
import AssignGates from "./AssignGates";

export default function AssignGatesManagement() {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

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
            Create Gate
          </button>

          <button
            onClick={() => setActiveTab("list")}
            className={`px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === "list"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Gate List
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "create" && <AssignGateRegistrationPage />}

          {activeTab === "list" && <AssignGates />}
        </div>
      </div>
    </div>
  );
}
