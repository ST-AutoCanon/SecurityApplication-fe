// import { useEffect, useState } from "react";

// import StatsCards from "./Components/StatsCards";
// import RecentVisitors from "./Components/RecentVisitors";
// import GateEntryOverview from "./Components/GateEntryOverview";
// import EntriesOverview from "./Components/EntriesOverview";
// import EntriesByCategory from "./Components/EntriesByCategory";
// import LoggedInSecurityGuards from "./Components/LoggedInSecurityGuards";
// import EventContributions from "./Components/EventContributions";

// type Period =
//   | "daily"
//   | "weekly"
//   | "monthly";

// export default function AdminDashboardHome() {
//   /* =====================================================
//      GLOBAL DASHBOARD PERIOD

//      This controls:
//        - Score Cards
//        - Category Trend
//        - Inside / Outside
//        - Peak Visitor Hours
//        - Category Distribution
//        - Recent Visitors
//   ===================================================== */

//   const [period, setPeriod] =
//     useState<Period>("daily");

//   const [orgType, setOrgType] =
//     useState<string>("");

//   const API =
//     import.meta.env.VITE_BACKEND_URL;

//   /* =====================================================
//      FETCH ORGANISATION TYPE
//   ===================================================== */

//   useEffect(() => {
//     const fetchOrganisationType =
//       async () => {
//         try {
//           const response =
//             await fetch(
//               `${API}/api/admin/dashboard`,
//               {
//                 credentials: "include",
//               }
//             );

//           const result =
//             await response.json();

//           if (!response.ok) {
//             throw new Error(
//               result.message ||
//                 "Failed to fetch dashboard"
//             );
//           }

//           const type =
//             result.org_type ||
//             result.data?.org_type ||
//             result.data?.organisation?.org_type ||
//             "";

//           setOrgType(type);

//           console.log(
//             "Organisation Type:",
//             type
//           );
//         } catch (error) {
//           console.error(
//             "Failed to fetch organisation type:",
//             error
//           );
//         }
//       };

//     fetchOrganisationType();
//   }, [API]);

//   /* =====================================================
//      LOGGED-IN SECURITY GUARDS VISIBILITY

//      IMPORTANT:

//      Keep the condition here if you have a specific
//      organisation type / role / setting where the
//      LoggedInSecurityGuards section should not be shown.

//      Currently it is enabled by default.

//      Example if later you want to hide it for EVENT:
     
//        const showLoggedInSecurityGuards =
//          orgType.toLowerCase() !== "event";

//      For now, keeping it visible preserves the
//      existing behaviour.
//   ===================================================== */

//   const showLoggedInSecurityGuards =
//     true;

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-gradient-to-br
//         from-slate-50
//         via-blue-50
//         to-indigo-50
//       "
//     >
//       {/* =====================================================
//           MAIN CONTENT
//       ===================================================== */}

//       <div
//         className="
//           flex-1
//           min-w-0
//           flex
//           flex-col
//         "
//       >
//         <main
//           className="
//             min-h-screen
//             p-4
//             pb-24
//             sm:p-5
//             sm:pb-24
//             lg:p-6
//             lg:pb-24
//           "
//         >
//           {/* =================================================
//               DAILY / WEEKLY / MONTHLY
//           ================================================= */}

//           <div
//             className="
//               mb-5
//               flex
//               items-center
//               gap-2
//             "
//           >
//             {/* DAILY */}

//             <button
//               type="button"
//               onClick={() =>
//                 setPeriod("daily")
//               }
//               className={`
//                 rounded-lg
//                 border
//                 px-5
//                 py-2.5
//                 text-sm
//                 font-semibold
//                 transition-all
//                 duration-200
//                 ${
//                   period === "daily"
//                     ? `
//                       border-blue-600
//                       bg-blue-600
//                       text-white
//                       shadow-sm
//                     `
//                     : `
//                       border-slate-200
//                       bg-white
//                       text-slate-600
//                       hover:border-blue-300
//                       hover:bg-blue-50
//                     `
//                 }
//               `}
//             >
//               Daily
//             </button>

//             {/* WEEKLY */}

//             <button
//               type="button"
//               onClick={() =>
//                 setPeriod("weekly")
//               }
//               className={`
//                 rounded-lg
//                 border
//                 px-5
//                 py-2.5
//                 text-sm
//                 font-semibold
//                 transition-all
//                 duration-200
//                 ${
//                   period === "weekly"
//                     ? `
//                       border-blue-600
//                       bg-blue-600
//                       text-white
//                       shadow-sm
//                     `
//                     : `
//                       border-slate-200
//                       bg-white
//                       text-slate-600
//                       hover:border-blue-300
//                       hover:bg-blue-50
//                     `
//                 }
//               `}
//             >
//               Weekly
//             </button>

//             {/* MONTHLY */}

//             <button
//               type="button"
//               onClick={() =>
//                 setPeriod("monthly")
//               }
//               className={`
//                 rounded-lg
//                 border
//                 px-5
//                 py-2.5
//                 text-sm
//                 font-semibold
//                 transition-all
//                 duration-200
//                 ${
//                   period === "monthly"
//                     ? `
//                       border-blue-600
//                       bg-blue-600
//                       text-white
//                       shadow-sm
//                     `
//                     : `
//                       border-slate-200
//                       bg-white
//                       text-slate-600
//                       hover:border-blue-300
//                       hover:bg-blue-50
//                     `
//                 }
//               `}
//             >
//               Monthly
//             </button>
//           </div>

//           {/* =================================================
//               STATISTICS CARDS
//           ================================================= */}

//           <section>
//             <StatsCards
//               period={period}
//             />

//             <div className="mt-5">
//               <GateEntryOverview
//                 period={period}
//               />
//             </div>
//           </section>

//           {/* =================================================
//               ENTRIES OVERVIEW
//           ================================================= */}

//           <div className="mt-5">
//             <div className="w-full min-w-0">
//               <EntriesOverview
//                 period={period}
//               />
//             </div>
//           </div>

//           {/* =================================================
//               ENTRIES BY CATEGORY
//               +
//               LOGGED-IN SECURITY GUARDS

//               Both components share ONE ROW.

//               When guards are visible:

//                 EntriesByCategory  = 6 columns
//                 Security Guards    = 6 columns

//               When guards are hidden:

//                 EntriesByCategory  = 12 columns

//               This prevents empty space and keeps the
//               dashboard visually balanced.
//           ================================================= */}

//           <section
//             className="
//               grid
//               grid-cols-1
//               xl:grid-cols-12
//               gap-4
//               mt-6
//               items-stretch
//             "
//           >
//             {/* =================================================
//                 ENTRIES BY CATEGORY
//             ================================================= */}

//             <div
//               className={`
//                 min-w-0
//                 ${
//                   showLoggedInSecurityGuards
//                     ? "xl:col-span-6"
//                     : "xl:col-span-12"
//                 }
//               `}
//             >
//               <div className="h-full">
//                 <EntriesByCategory
//                   period={period}
//                 />
//               </div>
//             </div>

//             {/* =================================================
//                 LOGGED-IN SECURITY GUARDS

//                 Only render this block when it should be
//                 visible.

//                 Because the condition is on the parent grid
//                 item, EntriesByCategory automatically expands
//                 to the full row when this section is hidden.
//             ================================================= */}

//             {showLoggedInSecurityGuards && (
//               <div
//                 className="
//                   xl:col-span-6
//                   min-w-0
//                 "
//               >
//                 <div className="h-full">
//                   <LoggedInSecurityGuards
//                     period={period}
//                   />
//                 </div>
//               </div>
//             )}
//           </section>

//           {/* =================================================
//               RECENT VISITORS + EVENT CONTRIBUTIONS
//           ================================================= */}

//           <section
//             className="
//               grid
//               grid-cols-1
//               xl:grid-cols-12
//               gap-4
//               mt-6
//               items-stretch
//             "
//           >
//             {/* =================================================
//                 VISITOR DETAILS
//             ================================================= */}

//             <div
//               className={
//                 orgType.toLowerCase() ===
//                 "event"
//                   ? "xl:col-span-8 min-w-0"
//                   : "xl:col-span-12 min-w-0"
//               }
//             >
//               <div className="h-full">
//                 <RecentVisitors
//                   period={period}
//                 />
//               </div>
//             </div>

//             {/* =================================================
//                 EVENT CONTRIBUTIONS
//             ================================================= */}

//             {orgType.toLowerCase() ===
//               "event" && (
//               <div
//                 className="
//                   xl:col-span-4
//                   min-w-0
//                 "
//               >
//                 <div className="h-full">
//                   <EventContributions
//                     period={period}
//                   />
//                 </div>
//               </div>
//             )}
//           </section>

//           {/* =================================================
//               FUTURE DASHBOARD SECTIONS
//           ================================================= */}

//           {/*
//             Later:

//             <VehicleSummary />
//             <DeliverySummary />
//             <AttendanceCard />
//             <EmergencyCard />
//             <Notifications />
//             <WeatherCard />
//             <GuardProfile />
//             <CCTVFeeds />
//           */}
//         </main>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

import StatsCards from "./Components/StatsCards";
import RecentVisitors from "./Components/RecentVisitors";
import GateEntryOverview from "./Components/GateEntryOverview";
import EntriesOverview from "./Components/EntriesOverview";
import EntriesByCategory from "./Components/EntriesByCategory";
import LoggedInSecurityGuards from "./Components/LoggedInSecurityGuards";
import EventContributions from "./Components/EventContributions";

type Period =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export default function AdminDashboardHome() {
  /* =====================================================
     GLOBAL DASHBOARD PERIOD

     This controls:
       - Score Cards
       - Gate / Entry Point Overview
       - Entries Overview
       - Entries By Category
       - Security Guards
       - Recent Visitors
       - Event Contributions
  ===================================================== */

  const [period, setPeriod] =
    useState<Period>("daily");

  const [orgType, setOrgType] =
    useState<string>("");

  const API =
    import.meta.env.VITE_BACKEND_URL;

  /* =====================================================
     FETCH ORGANISATION TYPE
  ===================================================== */

  useEffect(() => {
    const fetchOrganisationType =
      async () => {
        try {
          const response =
            await fetch(
              `${API}/api/admin/dashboard`,
              {
                credentials: "include",
              }
            );

          const result =
            await response.json();

          if (!response.ok) {
            throw new Error(
              result.message ||
                "Failed to fetch dashboard"
            );
          }

          const type =
            result.org_type ||
            result.data?.org_type ||
            result.data?.organisation?.org_type ||
            "";

          setOrgType(type);

          console.log(
            "Organisation Type:",
            type
          );
        } catch (error) {
          console.error(
            "Failed to fetch organisation type:",
            error
          );
        }
      };

    fetchOrganisationType();
  }, [API]);

  /* =====================================================
     LOGGED-IN SECURITY GUARDS VISIBILITY
  ===================================================== */

  const showLoggedInSecurityGuards =
    true;

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-blue-50
        to-indigo-50
      "
    >
      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          flex-1
          min-w-0
          flex
          flex-col
        "
      >
        <main
          className="
            min-h-screen
            p-4
            pb-24
            sm:p-5
            sm:pb-24
            lg:p-6
            lg:pb-24
          "
        >
          {/* =================================================
              PERIOD FILTER
          ================================================= */}

          <div
            className="
              mb-5
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            {/* DAILY */}

            <button
              type="button"
              onClick={() =>
                setPeriod("daily")
              }
              className={`
                rounded-lg
                border
                px-5
                py-2.5
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  period === "daily"
                    ? `
bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-600
                      hover:border-blue-300
                      hover:bg-blue-50
                    `
                }
              `}
            >
              Daily
            </button>

            {/* WEEKLY */}

            <button
              type="button"
              onClick={() =>
                setPeriod("weekly")
              }
              className={`
                rounded-lg
                border
                px-5
                py-2.5
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  period === "weekly"
                    ? `
bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-600
                      hover:border-blue-300
                      hover:bg-blue-50
                    `
                }
              `}
            >
              Weekly
            </button>

            {/* MONTHLY */}

            <button
              type="button"
              onClick={() =>
                setPeriod("monthly")
              }
              className={`
                rounded-lg
                border
                px-5
                py-2.5
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  period === "monthly"
                    ? `
                      bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg

                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-600
                      hover:border-blue-300
                      hover:bg-blue-50
                    `
                }
              `}
            >
              Monthly
            </button>

            {/* YEARLY */}

            <button
              type="button"
              onClick={() =>
                setPeriod("yearly")
              }
              className={`
                rounded-lg
                border
                px-5
                py-2.5
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  period === "yearly"
                    ? `
                      bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg

                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-600
                      hover:border-blue-300
                      hover:bg-blue-50
                    `
                }
              `}
            >
              Yearly
            </button>
          </div>

          {/* =================================================
              STATISTICS CARDS
          ================================================= */}

          <section>
            <StatsCards
              period={period}
            />

            <div className="mt-5">
              <GateEntryOverview
                period={period}
              />
            </div>
          </section>

          {/* =================================================
              ENTRIES OVERVIEW
          ================================================= */}

          <div className="mt-5">
            <div className="w-full min-w-0">
              <EntriesOverview
                period={period}
              />
            </div>
          </div>

          {/* =================================================
              ENTRIES BY CATEGORY
              +
              LOGGED-IN SECURITY GUARDS
          ================================================= */}

          <section
            className="
              grid
              grid-cols-1
              xl:grid-cols-12
              gap-4
              mt-6
              items-stretch
            "
          >
            {/* =================================================
                ENTRIES BY CATEGORY
            ================================================= */}

            <div
              className={`
                min-w-0
                ${
                  showLoggedInSecurityGuards
                    ? "xl:col-span-6"
                    : "xl:col-span-12"
                }
              `}
            >
              <div className="h-full">
                <EntriesByCategory
                  period={period}
                />
              </div>
            </div>

            {/* =================================================
                LOGGED-IN SECURITY GUARDS
            ================================================= */}

            {showLoggedInSecurityGuards && (
              <div
                className="
                  xl:col-span-6
                  min-w-0
                "
              >
                <div className="h-full">
                  <LoggedInSecurityGuards
                    period={period}
                  />
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              RECENT VISITORS + EVENT CONTRIBUTIONS
          ================================================= */}

          <section
            className="
              grid
              grid-cols-1
              xl:grid-cols-12
              gap-4
              mt-6
              items-stretch
            "
          >
            {/* =================================================
                VISITOR DETAILS
            ================================================= */}

            <div
              className={
                orgType.toLowerCase() ===
                "event"
                  ? "xl:col-span-8 min-w-0"
                  : "xl:col-span-12 min-w-0"
              }
            >
              <div className="h-full">
                <RecentVisitors
                  period={period}
                />
              </div>
            </div>

            {/* =================================================
                EVENT CONTRIBUTIONS
            ================================================= */}

            {orgType.toLowerCase() ===
              "event" && (
              <div
                className="
                  xl:col-span-4
                  min-w-0
                "
              >
                <div className="h-full">
                  <EventContributions
                    period={period}
                  />
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              FUTURE DASHBOARD SECTIONS
          ================================================= */}

          {/*
            Later:

            <VehicleSummary />
            <DeliverySummary />
            <AttendanceCard />
            <EmergencyCard />
            <Notifications />
            <WeatherCard />
            <GuardProfile />
            <CCTVFeeds />
          */}
        </main>
      </div>
    </div>
  );
}
