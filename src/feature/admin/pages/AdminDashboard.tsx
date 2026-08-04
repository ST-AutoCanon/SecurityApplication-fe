import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

import SecurityManagement from "./orgs/all/SecurityManagement";
import DynamicTableCreatePage from "./DynamicTableCreatePage";
import DynamicTableUpdatePage from "./DynamicTableUpdatePage";
import BusinessDataPage from "./BusinessDataPage";
import ApartmentMembers from "./apartment/pages/Members/ApartmentMembers";
import AddApartmentMember from "./apartment/pages/Members/AddApartmentMember";
import EditApartmentMember from "./apartment/pages/Members/EditApartmentMember";
import ApartmentMemberDetails from "./apartment/pages/Members/ApartmentMemberDetails";
import ImportMembers from "./apartment/pages/Members/ImportMembers";
import FormBuilder from "./orgs/all/Formify/FormBuilder"; // ← add this

export default function SuperAdminDashboard() {
  const { pathname } = useLocation();

  let activePage = "Dashboard";

  if (pathname.includes("create_security")) {
    activePage = "Create Security";
  } else if (pathname.includes("manage_organisation")) {
    activePage = "Manage Organisation";
  } else if (pathname.includes("manage_tables")) {
    activePage = "Manage Tables";
  } else if (pathname.includes("update_tables")) {
    activePage = "Update Tables";
    } else if (pathname.includes("form_builder") || pathname.includes("forms")) {
    activePage = "Form Builder";
  } else if (pathname.includes("buisness_data")) {
    activePage = "Business Data";
    
  
  } else if (pathname.includes("apartment/members/add")) {

  /**
   * Apartment Module
   */
    activePage = "Add Apartment Member";
  } else if (pathname.includes("apartment/members/import")) {
    activePage = "Import Apartment Members";
  } else if (pathname.includes("apartment/members/edit")) {
    activePage = "Edit Apartment Member";
  } else if (
    pathname.match(/\/admin\/organisation\/apartment\/members\/\d+$/)
  ) {
    activePage = "Apartment Member Details";
  } else if (pathname.includes("apartment/members")) {
    activePage = "Apartment Members";
  }

const pageComponents: Record<string, React.ReactElement> = {    Dashboard: (

      <div className="w-full h-full bg-gradient-to-r from-[#4b1b7a] to-[#2d2a8c] text-white min-h-[80vh]">
        <div className="w-full px-4 sm:px-6 md:px-10 pt-5 md:pt-8 flex flex-wrap gap-4">
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Welcome to Admin Dashboard
            </h2>

            <p className="text-gray-700">
              Use the sidebar to navigate to different sections.
            </p>
          </div>
        </div>
      </div>
    ),

    "Create Security": <SecurityManagement />,

    "Manage Tables": <DynamicTableCreatePage />,

    "Update Tables": <DynamicTableUpdatePage />,

    "Business Data": <BusinessDataPage />,
    "Form Builder": <FormBuilder />,

    /**
     * Apartment Module
     */
    "Apartment Members": <ApartmentMembers />,

    "Add Apartment Member": <AddApartmentMember />,

    "Edit Apartment Member": <EditApartmentMember />,

    "Apartment Member Details": <ApartmentMemberDetails />,

    "Import Apartment Members": <ImportMembers />,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col w-full">
          <TopNav pageTitle={activePage} />

          <main className="flex-1 bg-gray-50 overflow-auto">
            {pageComponents[activePage]}
          </main>
        </div>
      </div>
    </div>
  );
}