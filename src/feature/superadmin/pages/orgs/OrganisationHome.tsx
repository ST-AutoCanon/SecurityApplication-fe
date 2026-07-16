import React, { useState } from "react";
import CreateOrganisation from "./CreateOrganisation";
import UpdateOrganisation from "./UpdateOrganisation";
import DeleteOrganisation from "./deleteOrganisation";
import OrganisationList from "./OrganisationList";
import OrganisationDetails from "./OrganisationDetails";
// comment test

const OrganisationHome: React.FC = () => {

  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  
  const [activeTab, setActiveTab] = useState<"create" | "update" | "delete" | "list" | "details">(
    "create",
  );

  return (
    <div className="w-full h-full bg-gradient-to-r from-[#4b1b7a] to-[#2d2a8c] text-white">
      {/* ================= TABS ================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 pt-5 md:pt-8 flex flex-wrap gap-4 sm:gap-4">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 sm:px-5 py-2 rounded-full font-medium transition-colors ${
            activeTab === "create"
              ? "bg-white text-purple-700"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Create Organisation
        </button>

        <button
          onClick={() => setActiveTab("update")}
          className={`px-4 sm:px-5 py-2 rounded-full font-medium transition-colors ${
            activeTab === "update"
              ? "bg-white text-purple-700"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Update Organisation
        </button>

        <button
          onClick={() => setActiveTab("delete")}
          className={`px-4 sm:px-5 py-2 rounded-full font-medium transition-colors ${
            activeTab === "delete"
              ? "bg-white text-purple-700"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Delete Organisation
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 sm:px-5 py-2 rounded-full font-medium transition-colors ${
            activeTab === "list"
              ? "bg-white text-purple-700"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          List Organisations
        </button>

        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 sm:px-5 py-2 rounded-full font-medium transition-colors ${
            activeTab === "details"
              ? "bg-white text-purple-700"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Organisation Details
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-3 sm:px-5 md:px-10 pt-4 md:pt-6 pb- md:pb-10">
        {activeTab === "create" && <CreateOrganisation />}
        {activeTab === "update" && <UpdateOrganisation />}
        {activeTab === "delete" && <DeleteOrganisation />}
        {/* {activeTab === "list" && <OrganisationList />}
        {activeTab === "details" && <OrganisationDetails />} */}

        {activeTab === "list" && (
          <OrganisationList
            onView={(id) => {
              console.log("Selected Org:", id);

              setSelectedOrgId(id);

              setActiveTab("details");
            }}
          />
        )}

        {activeTab === "details" && (
          <OrganisationDetails
            organisationId={selectedOrgId}
            onBack={() => setActiveTab("list")}
          />
        )}
      </div>
    </div>
  );
};

export default OrganisationHome;