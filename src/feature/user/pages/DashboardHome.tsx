
// import VisitorsOverview from "../../user/pages/UserDashboard/Components/VisitorsOverview";
// import UserSummaryCards from "../../user/pages/UserDashboard/Components/UserSummaryCards";
// import UserAnnouncements from "../../user/pages/UserDashboard/Components/Announcements";
// import VendorsServiceProviders from "../../user/pages/UserDashboard/Components/VendorsServiceProviders";
// import ImportantInformation from "../../user/pages/UserDashboard/Components/ImportantInformation";
// import RequestAnnouncements from "../../user/pages/UserDashboard/Components/RequestAnnouncements";

// export default function DashboardHome() {
//   return (
//     <div className="w-full pt-5 sm:pt-6 lg:pt-8 pb-6">
//       {/* ============================================================
//           TOP DASHBOARD CONTENT
//       ============================================================ */}
//       <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        
//         {/* ==========================================================
//             LEFT SIDE
//         ========================================================== */}
//         <div className="min-w-0 space-y-4">
          
//           {/* Summary Cards */}
//           <UserSummaryCards />

//           {/* Visitors */}
//           <VisitorsOverview />
//                 <div className="mt-4">
//         <VendorsServiceProviders />
//       </div>

//         </div>

//         {/* ==========================================================
//             RIGHT SIDE
//         ========================================================== */}
//         <div className="min-w-0 space-y-4">
          
//           {/* Announcements */}
//           <UserAnnouncements />

//           {/* Important Information */}
//           <ImportantInformation />

//           {/* Request Announcements */}
//           <RequestAnnouncements />

//         </div>
//       </div>


//     </div>
//   );
// }
import VisitorsOverview from "../../user/pages/UserDashboard/Components/VisitorsOverview";
import UserSummaryCards from "../../user/pages/UserDashboard/Components/UserSummaryCards";
import UserAnnouncements from "../../user/pages/UserDashboard/Components/Announcements";
import VendorsServiceProviders from "../../user/pages/UserDashboard/Components/VendorsServiceProviders";
import ImportantInformation from "../../user/pages/UserDashboard/Components/ImportantInformation";
import RequestAnnouncements from "../../user/pages/UserDashboard/Components/RequestAnnouncements";

export default function DashboardHome() {
  return (
    <div className="w-full pt-5 sm:pt-6 lg:pt-8 pb-6">
      {/* ============================================================
          TOP DASHBOARD CONTENT
      ============================================================ */}
      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        
        {/* ==========================================================
            LEFT SIDE
        ========================================================== */}
        <div className="min-w-0 flex flex-col gap-4">
          
          {/* Summary Cards */}
          <UserSummaryCards />

          {/* Visitors */}
          <VisitorsOverview />

          {/* Vendors / Service Providers */}
          <VendorsServiceProviders />
                    <div className="shrink-0">
            <ImportantInformation />
          </div>


        </div>

        {/* ==========================================================
            RIGHT SIDE
        ========================================================== */}
        <div className="min-w-0 h-full flex flex-col gap-4">
          
          {/* Announcements */}
          <div className="shrink-0">
            <UserAnnouncements />
          </div>

          {/* Important Information */}
          {/* <div className="shrink-0">
            <ImportantInformation />
          </div> */}

          {/* Request Announcements */}
          <div className="shrink-0">
            <RequestAnnouncements />
          </div>

        </div>
      </div>
    </div>
  );
}
