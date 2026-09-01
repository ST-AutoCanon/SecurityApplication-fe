import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import DashboardHome from "./DashboardHome";
import Profile from "./Profile";
import UserData from "./UserData";

export default function UserDashboard() {
  const { pathname } = useLocation();

  let pageTitle = "Dashboard";
  let pageContent = <DashboardHome />;

  if (pathname.includes("/profile")) {
    pageTitle = "Profile";
    pageContent = <Profile />;
  } else if (pathname.includes("/user-data")) {
    pageTitle = "User Data";
    pageContent = <UserData />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          {/* Top Navigation */}
          <TopNav pageTitle={pageTitle} />

          {/* Page Content */}
          <main className="flex-1 bg-gray-50 overflow-auto">{pageContent}</main>
        </div>
      </div>
    </div>
  );
}
