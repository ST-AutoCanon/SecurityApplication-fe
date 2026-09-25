// export default function DashboardHome() {
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">Welcome back, User 👋</h1>
//         <p className="text-gray-500 mt-1">
//           Here’s what’s happening with your account today.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-5 rounded-xl shadow-sm border">
//           <p className="text-sm text-gray-500">Total Tasks</p>
//           <h2 className="text-3xl font-bold mt-2">24</h2>
//           <p className="text-sm text-green-600 mt-1">+12% this month</p>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow-sm border">
//           <p className="text-sm text-gray-500">Completed</p>
//           <h2 className="text-3xl font-bold mt-2">18</h2>
//           <p className="text-sm text-green-600 mt-1">75% completion rate</p>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow-sm border">
//           <p className="text-sm text-gray-500">Pending</p>
//           <h2 className="text-3xl font-bold mt-2">6</h2>
//           <p className="text-sm text-orange-600 mt-1">Needs attention</p>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow-sm border">
//           <p className="text-sm text-gray-500">Notifications</p>
//           <h2 className="text-3xl font-bold mt-2">5</h2>
//           <p className="text-sm text-blue-600 mt-1">3 unread</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

//           <div className="space-y-4">
//             <div className="flex justify-between border-b pb-3">
//               <div>
//                 <p className="font-medium">Completed monthly report</p>
//                 <p className="text-sm text-gray-500">Today, 10:15 AM</p>
//               </div>
//               <span className="text-green-600 text-sm">Completed</span>
//             </div>

//             <div className="flex justify-between border-b pb-3">
//               <div>
//                 <p className="font-medium">Updated profile information</p>
//                 <p className="text-sm text-gray-500">Yesterday</p>
//               </div>
//               <span className="text-blue-600 text-sm">Updated</span>
//             </div>

//             <div className="flex justify-between">
//               <div>
//                 <p className="font-medium">New task assigned</p>
//                 <p className="text-sm text-gray-500">Aug 30, 2026</p>
//               </div>
//               <span className="text-orange-600 text-sm">Pending</span>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

//           <div className="grid grid-cols-2 gap-4">
//             <button className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-left">
//               <p className="font-semibold">My Profile</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 View and edit profile
//               </p>
//             </button>

//             <button className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-left">
//               <p className="font-semibold">My Tasks</p>
//               <p className="text-sm text-gray-500 mt-1">Check your tasks</p>
//             </button>

//             <button className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-left">
//               <p className="font-semibold">Notifications</p>
//               <p className="text-sm text-gray-500 mt-1">View notifications</p>
//             </button>

//             <button className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-left">
//               <p className="font-semibold">Settings</p>
//               <p className="text-sm text-gray-500 mt-1">Manage your account</p>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Today's Summary */}
//       <div className="bg-white rounded-xl shadow-sm border p-6">
//         <h2 className="text-xl font-semibold mb-4">Today’s Summary</h2>

//         <div className="flex flex-col sm:flex-row gap-6">
//           <div>
//             <p className="text-sm text-gray-500">Tasks completed today</p>
//             <p className="text-2xl font-bold">4</p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Hours worked</p>
//             <p className="text-2xl font-bold">6.5 hrs</p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Upcoming deadline</p>
//             <p className="text-2xl font-bold">Tomorrow</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import UserSidebar from "./Components/Sidebar";
// import DashboardHeader from "./Components/TopNavbar";

// import RequestStats from "./Components/RequestStats";
import VisitorsOverview from "../../user/pages/UserDashboard/Components/VisitorsOverview";

// import RaiseRequest from "./Components/RaiseRequest";
// import MyRequests from "./Components/MyRequests";
// import RequestTracking from "./Components/RequestTracking";
// import Announcements from "./Components/Announcements";
// import QuickLinks from "./Components/QuickLinks";


import UserSummaryCards from "../../user/pages/UserDashboard/Components/UserSummaryCards";
import UserAnnouncements from "../../user/pages/UserDashboard/Components/Announcements";
import VendorsServiceProviders from "../../user/pages/UserDashboard/Components/VendorsServiceProviders";
import ImportantInformation from "../../user/pages/UserDashboard/Components/ImportantInformation";
import RequestAnnouncements from "../../user/pages/UserDashboard/Components/RequestAnnouncements";

export default function DashboardHome() {
  return (
//     <div className="flex min-h-screen bg-[#f8faff] text-slate-800">

//         <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
//           <div className="mx-auto max-w-[1600px]">
//             {/* ================================================= */}
//             {/* REQUEST STATISTICS */}
//             {/* ================================================= */}

// <UserSummaryCards  />

//             {/* ================================================= */}
//             {/* VISITORS OVERVIEW */}
//             {/* ================================================= */}

//             <VisitorsOverview />

//             {/* ================================================= */}
//             {/* LOWER DASHBOARD CONTENT */}
//             {/* ================================================= */}

//             <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
//               {/* LEFT */}


//               {/* RIGHT */}

//               <div className="space-y-5">
//                  {/* <RequestTracking /> */}

//                 <UserAnnouncements /> 
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
<div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
  
  {/* LEFT SIDE */}
  <div className="min-w-0 space-y-4">
    
    {/* Your existing summary cards */}
    <UserSummaryCards />

    {/* Visitors */}
    <VisitorsOverview />

    {/* Vendors */}
    <VendorsServiceProviders />

  </div>

  {/* RIGHT SIDE */}
  <div className="space-y-4">

    <UserAnnouncements
      // onViewAll={() => {
      //   // navigate to announcements page
      // }}
    />

    {/* Your existing Important Information */}
    <ImportantInformation /> 
<RequestAnnouncements />
  </div>

</div>
  );
}
