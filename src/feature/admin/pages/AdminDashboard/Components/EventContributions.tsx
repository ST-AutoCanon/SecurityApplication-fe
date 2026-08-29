// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_BACKEND_URL;

// type Period = "daily" | "weekly" | "monthly";

// type EventContribution = {
//   id: number;
//   full_name: string;
//   role: string;
//   mobile_number: string | null;
//   working_time: string | null;
//   status: string | null;
// };

// type Props = {
//   period: Period;
// };

// export default function EventContributions({
//   period,
// }: Props) {
//   const [contributions, setContributions] = useState<
//     EventContribution[]
//   >([]);

//   const [loading, setLoading] = useState(true);

//   // ============================================================
//   // PERIOD TITLE
//   // ============================================================

//   const getPeriodTitle = () => {
//     switch (period) {
//       case "weekly":
//         return "This Week";

//       case "monthly":
//         return "This Month";

//       case "daily":
//       default:
//         return "Today";
//     }
//   };

//   // ============================================================
//   // FETCH EVENT CONTRIBUTIONS
//   // ============================================================

//   const loadContributions = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `${API}/api/dashboard/event-contributions`,
//         {
//           params: {
//             period,
//           },
//           withCredentials: true,
//         }
//       );

//       setContributions(response.data?.data || []);
//     } catch (error) {
//       console.error(
//         "Failed to load event contributions:",
//         error
//       );

//       setContributions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // LOAD WHEN PERIOD CHANGES
//   // ============================================================

//   useEffect(() => {
//     loadContributions();
//   }, [period]);

//   // ============================================================
//   // FORMAT TIME
//   // ============================================================

//   const formatTime = (time: string | null) => {
//     if (!time) {
//       return "--";
//     }

//     const date = new Date(time);

//     if (Number.isNaN(date.getTime())) {
//       return "--";
//     }

//     return date.toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   // ============================================================
//   // FORMAT ROLE
//   // ============================================================

//   const formatRole = (role: string) => {
//     if (!role) {
//       return "--";
//     }

//     return role
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   // ============================================================
//   // STATUS
//   // ============================================================

//   const isOnDuty = (status: string | null) => {
//     return (
//       status?.toLowerCase() === "on duty" ||
//       status?.toLowerCase() === "on_duty"
//     );
//   };

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div
//       className="
//         bg-white
//         rounded-xl
//         border
//         border-slate-200
//         shadow-sm
//         h-full
//         overflow-hidden
//       "
//     >
//       {/* ======================================================
//           HEADER
//       ======================================================= */}

//       <div
//         className="
//           flex
//           items-center
//           justify-between
//           px-4
//           py-4
//           border-b
//           border-slate-100
//         "
//       >
//         <div>
//           <h2
//             className="
//               text-sm
//               font-semibold
//               text-slate-800
//             "
//           >
//             Event Contributions ({getPeriodTitle()})
//           </h2>
//         </div>
//       </div>

//       {/* ======================================================
//           TABLE
//       ======================================================= */}

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[520px]">
//           {/* ==================================================
//               TABLE HEADER
//           =================================================== */}

//           <thead>
//             <tr
//               className="
//                 bg-slate-50
//                 border-b
//                 border-slate-200
//               "
//             >
//               {/* # */}

//               <th
//                 className="
//                   text-left
//                   px-3
//                   py-2.5
//                   text-[10px]
//                   font-semibold
//                   text-slate-600
//                   whitespace-nowrap
//                 "
//               >
//                 #
//               </th>

//               {/* CONTRIBUTION NAME */}

//               <th
//                 className="
//                   text-left
//                   px-3
//                   py-2.5
//                   text-[10px]
//                   font-semibold
//                   text-slate-600
//                   whitespace-nowrap
//                 "
//               >
//                 Contribution Name
//               </th>

//               {/* ROLE */}

//               <th
//                 className="
//                   text-left
//                   px-3
//                   py-2.5
//                   text-[10px]
//                   font-semibold
//                   text-slate-600
//                   whitespace-nowrap
//                 "
//               >
//                 Role
//               </th>

//               {/* CONTACT */}

//               <th
//                 className="
//                   text-left
//                   px-3
//                   py-2.5
//                   text-[10px]
//                   font-semibold
//                   text-slate-600
//                   whitespace-nowrap
//                 "
//               >
//                 Contact
//               </th>

//               {/* WORKING TIME */}

//               <th
//                 className="
//                   text-left
//                   px-3
//                   py-2.5
//                   text-[10px]
//                   font-semibold
//                   text-slate-600
//                   whitespace-nowrap
//                 "
//               >
//                 In Time
//               </th>

//               {/* STATUS */}

//               <th
//                 className="
//                   text-left
//                   px-3
//                   py-2.5
//                   text-[10px]
//                   font-semibold
//                   text-slate-600
//                   whitespace-nowrap
//                 "
//               >
//                 Status
//               </th>
//             </tr>
//           </thead>

//           {/* ==================================================
//               TABLE BODY
//           =================================================== */}

//           <tbody>
//             {/* LOADING */}

//             {loading ? (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="
//                     text-center
//                     py-8
//                     text-xs
//                     text-slate-500
//                   "
//                 >
//                   Loading event contributions...
//                 </td>
//               </tr>
//             ) : contributions.length === 0 ? (
//               /* EMPTY */

//               <tr>
//                 <td
//                   colSpan={6}
//                   className="
//                     text-center
//                     py-8
//                     text-xs
//                     text-slate-500
//                   "
//                 >
//                   No event contributions found
//                 </td>
//               </tr>
//             ) : (
//               /* DATA */

//               contributions.map(
//                 (contribution, index) => (
//                   <tr
//                     key={`${contribution.id}-${index}`}
//                     className="
//                       border-b
//                       border-slate-100
//                       hover:bg-slate-50
//                       transition
//                     "
//                   >
//                     {/* ======================================
//                         NUMBER
//                     ======================================= */}

//                     <td
//                       className="
//                         px-3
//                         py-3
//                         text-[10px]
//                         text-slate-500
//                         whitespace-nowrap
//                       "
//                     >
//                       {index + 1}
//                     </td>

//                     {/* ======================================
//                         CONTRIBUTION NAME
//                     ======================================= */}

//                     <td
//                       className="
//                         px-3
//                         py-3
//                         whitespace-nowrap
//                       "
//                     >
//                       <div
//                         className="
//                           flex
//                           items-center
//                           gap-2
//                         "
//                       >
//                         {/* Avatar */}

//                         <div
//                           className="
//                             w-7
//                             h-7
//                             rounded-full
//                             bg-blue-100
//                             text-blue-700
//                             flex
//                             items-center
//                             justify-center
//                             text-[10px]
//                             font-semibold
//                             uppercase
//                             flex-shrink-0
//                           "
//                         >
//                           {contribution.full_name
//                             ? contribution.full_name
//                                 .charAt(0)
//                                 .toUpperCase()
//                             : "?"}
//                         </div>

//                         {/* Name */}

//                         <span
//                           className="
//                             text-[10px]
//                             font-medium
//                             text-slate-800
//                           "
//                         >
//                           {contribution.full_name ||
//                             "--"}
//                         </span>
//                       </div>
//                     </td>

//                     {/* ======================================
//                         ROLE
//                     ======================================= */}

//                     <td
//                       className="
//                         px-3
//                         py-3
//                         text-[10px]
//                         text-slate-600
//                         whitespace-nowrap
//                       "
//                     >
//                       {formatRole(
//                         contribution.role
//                       )}
//                     </td>

//                     {/* ======================================
//                         CONTACT
//                     ======================================= */}

//                     <td
//                       className="
//                         px-3
//                         py-3
//                         text-[10px]
//                         text-slate-600
//                         whitespace-nowrap
//                       "
//                     >
//                       {contribution.mobile_number ||
//                         "--"}
//                     </td>

//                     {/* ======================================
//                         WORKING TIME
//                     ======================================= */}

//                     <td
//                       className="
//                         px-3
//                         py-3
//                         text-[10px]
//                         text-slate-600
//                         whitespace-nowrap
//                       "
//                     >
//                       {formatTime(
//                         contribution.working_time
//                       )}
//                     </td>

//                     {/* ======================================
//                         STATUS
//                     ======================================= */}

//                     <td
//                       className="
//                         px-3
//                         py-3
//                         whitespace-nowrap
//                       "
//                     >
//                       {isOnDuty(
//                         contribution.status
//                       ) ? (
//                         <span
//                           className="
//                             inline-flex
//                             items-center
//                             px-2
//                             py-1
//                             rounded-md
//                             bg-green-100
//                             text-green-700
//                             text-[9px]
//                             font-medium
//                           "
//                         >
//                           On Duty
//                         </span>
//                       ) : (
//                         <span
//                           className="
//                             inline-flex
//                             items-center
//                             px-2
//                             py-1
//                             rounded-md
//                             bg-slate-100
//                             text-slate-600
//                             text-[9px]
//                             font-medium
//                           "
//                         >
//                           Off Duty
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 )
//               )
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ======================================================
//           FOOTER
//       ======================================================= */}

//       {!loading && contributions.length > 0 && (
//         <div
//           className="
//             flex
//             items-center
//             justify-between
//             px-4
//             py-3
//             border-t
//             border-slate-100
//           "
//         >
//           <span
//             className="
//               text-[10px]
//               text-slate-500
//             "
//           >
//             Showing 1 to {contributions.length} of{" "}
//             {contributions.length} entries
//           </span>

//           <button
//             type="button"
//             onClick={loadContributions}
//             className="
//               text-[10px]
//               font-medium
//               text-blue-600
//               hover:text-blue-700
//             "
//           >
//             Refresh
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

type Period = "daily" | "weekly" | "monthly";

type EventContribution = {
  id: number;
  full_name: string;
  role: string;
  mobile_number: string | null;
  working_time: string | null;
  status: string | null;
};

type Props = {
  period: Period;
};

const RECORDS_PER_PAGE = 5;

export default function EventContributions({
  period,
}: Props) {
  const [contributions, setContributions] = useState<
    EventContribution[]
  >([]);

  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // ============================================================
  // PERIOD TITLE
  // ============================================================

  const getPeriodTitle = () => {
    switch (period) {
      case "weekly":
        return "This Week";

      case "monthly":
        return "This Month";

      case "daily":
      default:
        return "Today";
    }
  };

  // ============================================================
  // FETCH EVENT CONTRIBUTIONS
  // ============================================================

  const loadContributions = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/admin/dashboard/event-contributions`,
        {
          params: {
            period,
          },
          withCredentials: true,
        }
      );

      setContributions(response.data?.data || []);

      // Always start from page 1 after loading new period
      setCurrentPage(1);
    } catch (error) {
      console.error(
        "Failed to load event contributions:",
        error
      );

      setContributions([]);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOAD WHEN PERIOD CHANGES
  // ============================================================

  useEffect(() => {
    loadContributions();
  }, [period]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalRecords = contributions.length;

  const totalPages = Math.ceil(
    totalRecords / RECORDS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * RECORDS_PER_PAGE;

  const endIndex =
    startIndex + RECORDS_PER_PAGE;

  const currentContributions =
    contributions.slice(startIndex, endIndex);

  // ============================================================
  // PAGE HANDLERS
  // ============================================================

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ============================================================
  // FORMAT TIME
  // ============================================================

  const formatTime = (time: string | null) => {
    if (!time) {
      return "--";
    }

    const date = new Date(time);

    if (Number.isNaN(date.getTime())) {
      return "--";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ============================================================
  // FORMAT ROLE
  // ============================================================

  const formatRole = (role: string) => {
    if (!role) {
      return "--";
    }

    return role
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  // ============================================================
  // STATUS
  // ============================================================

  const isOnDuty = (status: string | null) => {
    return (
      status?.toLowerCase() === "on duty" ||
      status?.toLowerCase() === "on_duty"
    );
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        border-slate-200
        shadow-sm
        h-full
        overflow-hidden
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          px-4
          py-4
          border-b
          border-slate-100
        "
      >
        <div>
          <h2
            className="
              text-sm
              font-semibold
              text-slate-800
            "
          >
            Event Contributions ({getPeriodTitle()})
          </h2>
        </div>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">

          {/* TABLE HEADER */}

          <thead>
            <tr
              className="
                bg-slate-50
                border-b
                border-slate-200
              "
            >
              <th
                className="
                  text-left
                  px-3
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-slate-600
                  whitespace-nowrap
                "
              >
                #
              </th>

              <th
                className="
                  text-left
                  px-3
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-slate-600
                  whitespace-nowrap
                "
              >
                Contribution Name
              </th>

              <th
                className="
                  text-left
                  px-3
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-slate-600
                  whitespace-nowrap
                "
              >
                Role
              </th>

              <th
                className="
                  text-left
                  px-3
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-slate-600
                  whitespace-nowrap
                "
              >
                Contact
              </th>

              <th
                className="
                  text-left
                  px-3
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-slate-600
                  whitespace-nowrap
                "
              >
                In Time
              </th>

              <th
                className="
                  text-left
                  px-3
                  py-2.5
                  text-[10px]
                  font-semibold
                  text-slate-600
                  whitespace-nowrap
                "
              >
                Status
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    text-center
                    py-8
                    text-xs
                    text-slate-500
                  "
                >
                  Loading event contributions...
                </td>
              </tr>
            ) : contributions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    text-center
                    py-8
                    text-xs
                    text-slate-500
                  "
                >
                  No event contributions found
                </td>
              </tr>
            ) : (
              currentContributions.map(
                (contribution, index) => {
                  const rowNumber =
                    startIndex + index + 1;

                  return (
                    <tr
                      key={`${contribution.id}-${index}`}
                      className="
                        border-b
                        border-slate-100
                        hover:bg-slate-50
                        transition
                      "
                    >
                      {/* NUMBER */}

                      <td
                        className="
                          px-3
                          py-3
                          text-[10px]
                          text-slate-500
                          whitespace-nowrap
                        "
                      >
                        {rowNumber}
                      </td>

                      {/* CONTRIBUTION NAME */}

                      <td
                        className="
                          px-3
                          py-3
                          whitespace-nowrap
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <div
                            className="
                              w-7
                              h-7
                              rounded-full
                              bg-blue-100
                              text-blue-700
                              flex
                              items-center
                              justify-center
                              text-[10px]
                              font-semibold
                              uppercase
                              flex-shrink-0
                            "
                          >
                            {contribution.full_name
                              ? contribution.full_name
                                  .charAt(0)
                                  .toUpperCase()
                              : "?"}
                          </div>

                          <span
                            className="
                              text-[10px]
                              font-medium
                              text-slate-800
                            "
                          >
                            {contribution.full_name ||
                              "--"}
                          </span>
                        </div>
                      </td>

                      {/* ROLE */}

                      <td
                        className="
                          px-3
                          py-3
                          text-[10px]
                          text-slate-600
                          whitespace-nowrap
                        "
                      >
                        {formatRole(
                          contribution.role
                        )}
                      </td>

                      {/* CONTACT */}

                      <td
                        className="
                          px-3
                          py-3
                          text-[10px]
                          text-slate-600
                          whitespace-nowrap
                        "
                      >
                        {contribution.mobile_number ||
                          "--"}
                      </td>

                      {/* WORKING TIME */}

                      <td
                        className="
                          px-3
                          py-3
                          text-[10px]
                          text-slate-600
                          whitespace-nowrap
                        "
                      >
                        {formatTime(
                          contribution.working_time
                        )}
                      </td>

                      {/* STATUS */}

                      <td
                        className="
                          px-3
                          py-3
                          whitespace-nowrap
                        "
                      >
                        {isOnDuty(
                          contribution.status
                        ) ? (
                          <span
                            className="
                              inline-flex
                              items-center
                              px-2
                              py-1
                              rounded-md
                              bg-green-100
                              text-green-700
                              text-[9px]
                              font-medium
                            "
                          >
                            On Duty
                          </span>
                        ) : (
                          <span
                            className="
                              inline-flex
                              items-center
                              px-2
                              py-1
                              rounded-md
                              bg-slate-100
                              text-slate-600
                              text-[9px]
                              font-medium
                            "
                          >
                            Off Duty
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}

      {!loading && contributions.length > 0 && (
        <div
          className="
            flex
            items-center
            justify-between
            px-4
            py-3
            border-t
            border-slate-100
          "
        >
          {/* RECORD COUNT */}

          <span
            className="
              text-[10px]
              text-slate-500
            "
          >
            Showing {startIndex + 1} to{" "}
            {Math.min(
              endIndex,
              totalRecords
            )}{" "}
            of {totalRecords} entries
          </span>

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="
                  px-2.5
                  py-1.5
                  rounded-md
                  border
                  border-slate-200
                  text-[10px]
                  font-medium
                  text-slate-600
                  hover:bg-slate-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                Previous
              </button>

              <span
                className="
                  px-2
                  text-[10px]
                  font-medium
                  text-slate-600
                "
              >
                Page {currentPage} of{" "}
                {totalPages}
              </span>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={
                  currentPage === totalPages
                }
                className="
                  px-2.5
                  py-1.5
                  rounded-md
                  border
                  border-slate-200
                  text-[10px]
                  font-medium
                  text-slate-600
                  hover:bg-slate-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                Next
              </button>

            </div>
          )}

          {/* REFRESH */}

          {totalPages <= 1 && (
            <button
              type="button"
              onClick={loadContributions}
              className="
                text-[10px]
                font-medium
                text-blue-600
                hover:text-blue-700
              "
            >
              Refresh
            </button>
          )}
        </div>
      )}
    </div>
  );
}