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
  | "monthly";

export default function AdminDashboardHome() {

  /* =====================================================
     GLOBAL DASHBOARD PERIOD

     This will eventually control:
       - Score Cards
       - Category Trend
       - Inside / Outside
       - Peak Visitor Hours
       - Category Distribution
       - Recent Visitors

     For now we are ONLY connecting it to StatsCards.
  ===================================================== */

  const [period, setPeriod] =
    useState<Period>("daily");
const [orgType, setOrgType] =
  useState<string>("");

const API =
    import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {

    const fetchOrganisationType = async () => {

      try {

        const response = await fetch(
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

  return (

    // <div
    //   className="
    //     flex
    //     h-screen
    //     bg-gradient-to-br
    //     from-slate-50
    //     via-blue-50
    //     to-indigo-50
    //   "
    // >
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
          SIDEBAR
      ===================================================== */}

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

        {/* <main
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-5
            lg:p-6
          "
        > */}

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
>          {/* =================================================
              DASHBOARD HEADER
          ================================================= */}

          <div className="mb-4">

            <h1
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-black
              "
            >
              Dashboard
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Monitor visitor activity and security operations
            </p>

          </div>

          {/* =================================================
              DAILY / WEEKLY / MONTHLY
          ================================================= */}

          <div
            className="
              mb-5
              flex
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
                      border-blue-600
                      bg-blue-600
                      text-white
                      shadow-sm
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
                      border-blue-600
                      bg-blue-600
                      text-white
                      shadow-sm
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
                      border-blue-600
                      bg-blue-600
                      text-white
                      shadow-sm
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

          </div>

          {/* =================================================
              STATISTICS CARDS

              Currently controlled by period.
          ================================================= */}

          <section>
            <StatsCards
              period={period}
            />
            <div className="mt-5">
  <GateEntryOverview />





  



  </div>

      </section>

          {/* =================================================
              ROW 1
              Visitor Activity + Inside / Outside
              
              NOT CONNECTED TO PERIOD YET
          ================================================= */}

         <section
  className="
    grid
    grid-cols-1
    xl:grid-cols-12
    gap-4
    mt-6
  "
>
  <div className="xl:col-span-4 min-w-0">
    <EntriesOverview period={period} />
  </div>

  <div className="xl:col-span-3 min-w-0">
    <EntriesByCategory period={period} />
  </div>

  <div className="xl:col-span-5 min-w-0">
    <LoggedInSecurityGuards period={period} />
  </div>
</section>
          {/* =================================================
              ROW 2
              Category Distribution + Peak Visitor Hours
              
              NOT CONNECTED TO PERIOD YET
          ================================================= */}

         
          {/* =================================================
              ROW 3
              RECENT VISITORS
              
              NOT CONNECTED TO PERIOD YET
          ================================================= */}

          {/* =================================================
    ROW 3
    Visitor Details + Event Contributions
================================================= */}

<section
  className="
    grid
    grid-cols-1
    xl:grid-cols-12
    gap-4
    mt-6
  "
>
  {/* Visitor Details */}

  <div
    className={
      orgType.toLowerCase() === "event"
        ? "xl:col-span-8 min-w-0"
        : "xl:col-span-12 min-w-0"
    }
  >
    <RecentVisitors period={period} />
  </div>

  {/* Event Contributions */}

  {orgType.toLowerCase() === "event" && (
    <div className="xl:col-span-4 min-w-0">
      <EventContributions
        period={period}
      />
    </div>
  )}
</section>          {/* =================================================
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