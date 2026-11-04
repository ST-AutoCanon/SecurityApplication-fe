import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

import SecurityManagement from "./orgs/all/SecurityManagement";
import FormManagement from "./DynamicFormManagement/FormManagement";
import BusinessDataPage from "./BusinessDataPage";
import BusinessDataEditPage from "./BusinessDataEditPage";
import ApartmentMembers from "./apartment/pages/Members/ApartmentMembers";
import AddApartmentMember from "./apartment/pages/Members/AddApartmentMember";
import EditApartmentMember from "./apartment/pages/Members/EditApartmentMember";
import ApartmentMemberDetails from "./apartment/pages/Members/ApartmentMemberDetails";
import ImportMembers from "./apartment/pages/Members/ImportMembers";
import FormBuilder from "./orgs/all/Formify/FormBuilder";
import Campaign from "./orgs/all/Comapaign/Compaign";
import QuickRequest from "./orgs/all/QuickRequest/QuickRequest";
import Announcements from "./orgs/all/Announcements/Announcements";
import AssignGatesManagement from "./gates/AssignGatesManagement";
import Dashboard from "./AdminDashboard/AdminDashboardHome";
import ImportantInformation from "./orgs/all/ImportantInformation/ImportantInformation";
import VendorsServiceProviders from "./orgs/all/VendorsServiceProviders/VendorsServiceProviders";
import ApartmentMaintenance from "./apartment/pages/Maintainance/ApartmentMaintenance";
export default function AdminDashboard() {
  const { pathname } = useLocation();

  let activePage = "Dashboard";

  if (pathname.includes("create_security")) {
    activePage = "Create Security";
  } else if (pathname.includes("gates")) {
    activePage = "Gates";
  } else if (pathname.includes("manage_organisation")) {
    activePage = "Manage Organisation";
  } else if (pathname.toLowerCase().includes("dashboard")) {
    activePage = "Dashboard";
  } else if (
    pathname.includes("manage_forms") ||
    pathname.includes("update_forms") ||
    pathname.includes("create_forms")
  ) {
    activePage = "Form Management";
  } else if (
    pathname.includes("form_builder") ||
    pathname.includes("forms")
  ) {
    activePage = "Form Builder";
  } else if (pathname.toLowerCase().includes("campaign")) {
    activePage = "Campaign";
  } else if (pathname.includes("quick_request")) {
    activePage = "Quick Request";
  } else if (pathname.includes("Announcements")) {
    activePage = "Announcements";
  } else if (pathname.includes("ImportantInformation")) {
    activePage = "Important Information";
  } else if (pathname.includes("VendorsServiceProviders")) {
    activePage = "Vendors and Service Providers";
  } else if (
    pathname.includes("/business-data/") &&
    pathname.includes("/edit")
  ) {
    activePage = "Business Data Edit";
  } else if (pathname.includes("buisness_data")) {
    activePage = "Business Data";
  }else if (pathname.includes("apartment/maintenance")) {
  activePage = "Apartment Maintenance"; 
  }  else if (pathname.includes("apartment/members/add")) {
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

  const pageComponents: Record<string, React.ReactElement> = {
    "Create Security": <SecurityManagement />,
    Dashboard: <Dashboard />,
    Gates: <AssignGatesManagement />,
    "Form Management": <FormManagement />,
    "Business Data": <BusinessDataPage />,
    "Business Data Edit": <BusinessDataEditPage />,
    "Form Builder": <FormBuilder />,
    Campaign: <Campaign />,
    "Quick Request": <QuickRequest />,
    Announcements: <Announcements />,
    "Important Information": <ImportantInformation />,
    "Vendors and Service Providers": <VendorsServiceProviders />,
    "Apartment Maintenance": <ApartmentMaintenance />,
    "Apartment Members": <ApartmentMembers />,
    "Add Apartment Member": <AddApartmentMember />,
    "Edit Apartment Member": <EditApartmentMember />,
    "Apartment Member Details": <ApartmentMemberDetails />,
    "Import Apartment Members": <ImportMembers />,
  };

  // return (
  //   // Constrain the application to the viewport. The content area below
  //   // the top navigation becomes the only scrollable region.
  //   <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
  //     <TopNav pageTitle={activePage} />

  //     <div className="flex min-h-0 flex-1 overflow-hidden">
  //       <Sidebar />

  //       <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 overscroll-y-contain">
  //         <div className="min-h-0 w-full">
  //           {pageComponents[activePage]}
  //         </div>
  //       </main>
  //     </div>
  //   </div>
  // );
return (
  <div className="min-h-screen bg-gray-100">
    {/* Top Navigation */}
    <TopNav pageTitle={activePage} />

    {/* Sidebar + Main Content */}
    <div className="flex min-h-screen items-stretch">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 bg-gray-50">
        <div className="w-full">
          {pageComponents[activePage]}
        </div>
      </main>
    </div>
  </div>
);

}
