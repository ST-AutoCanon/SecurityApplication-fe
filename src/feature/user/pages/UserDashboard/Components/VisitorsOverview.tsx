// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   ArrowRight,
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   Clock3,
//   Users,
//   UserRound,
// } from "lucide-react";

// type Period = "daily" | "weekly" | "monthly";

// type Category = {
//   key: string;
//   label: string;
//   count: number;
// };

// type Visitor = {
//   user_id: number;
//   full_name: string;
//   table_name: string;
//   visit_date: string;
//   time_in: string | null;
//   time_out: string | null;
// };

// type VisitorSummaryResponse = {
//   success: boolean;
//   data: {
//     period: Period;
//     total: number;
//     categories: Category[];
//   };
// };

// type VisitorRecordsResponse = {
//   success: boolean;
//   data: Visitor[];
//   pagination?: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// };

// const API = import.meta.env.VITE_BACKEND_URL;

// const LIMIT = 5;

// export default function VisitorsOverview() {
//   const [period, setPeriod] = useState<Period>("daily");

//   const [summary, setSummary] = useState<{
//     total: number;
//     categories: Category[];
//   }>({
//     total: 0,
//     categories: [],
//   });

//   const [visitors, setVisitors] = useState<Visitor[]>([]);

//   const [selectedCategory, setSelectedCategory] =
//     useState<string>("");

//   const [page, setPage] = useState(1);

//   const [totalPages, setTotalPages] = useState(1);

//   const [totalRecords, setTotalRecords] = useState(0);

//   const [loadingSummary, setLoadingSummary] =
//     useState(false);

//   const [loadingVisitors, setLoadingVisitors] =
//     useState(false);

//   /*
//    * =====================================================
//    * GET VISITOR SUMMARY
//    * =====================================================
//    */

//   useEffect(() => {
//     const fetchVisitorSummary = async () => {
//       try {
//         setLoadingSummary(true);

//         const response =
//           await axios.get<VisitorSummaryResponse>(
//             `${API}/api/user-dashboard/visitor-summary`,
//             {
//               params: {
//                 period,
//               },
//               withCredentials: true,
//             }
//           );

//         if (response.data.success) {
//           setSummary({
//             total: response.data.data?.total || 0,
//             categories:
//               response.data.data?.categories || [],
//           });
//         } else {
//           setSummary({
//             total: 0,
//             categories: [],
//           });
//         }
//       } catch (error) {
//         console.error(
//           "Error loading visitor summary:",
//           error
//         );

//         setSummary({
//           total: 0,
//           categories: [],
//         });
//       } finally {
//         setLoadingSummary(false);
//       }
//     };

//     fetchVisitorSummary();
//   }, [period]);

//   /*
//    * =====================================================
//    * GET VISITOR RECORDS
//    * =====================================================
//    */

//   useEffect(() => {
//     const fetchVisitorRecords = async () => {
//       try {
//         setLoadingVisitors(true);

//         const response =
//           await axios.get<VisitorRecordsResponse>(
//             `${API}/api/user-dashboard/visitor-records`,
//             {
//               params: {
//                 period,
//                 category:
//                   selectedCategory || undefined,
//                 page,
//                 limit: LIMIT,
//               },
//               withCredentials: true,
//             }
//           );

//         if (response.data.success) {
//           setVisitors(response.data.data || []);

//           setTotalRecords(
//             response.data.pagination?.total || 0
//           );

//           setTotalPages(
//             Math.max(
//               1,
//               response.data.pagination?.totalPages || 1
//             )
//           );
//         } else {
//           setVisitors([]);
//           setTotalRecords(0);
//           setTotalPages(1);
//         }
//       } catch (error) {
//         console.error(
//           "Error loading visitor records:",
//           error
//         );

//         setVisitors([]);
//         setTotalRecords(0);
//         setTotalPages(1);
//       } finally {
//         setLoadingVisitors(false);
//       }
//     };

//     fetchVisitorRecords();
//   }, [period, selectedCategory, page]);

//   /*
//    * =====================================================
//    * PERIOD CHANGE
//    * =====================================================
//    */

//   const handlePeriodChange = (value: Period) => {
//     setPeriod(value);
//     setSelectedCategory("");
//     setPage(1);
//   };

//   /*
//    * =====================================================
//    * CATEGORY CHANGE
//    * =====================================================
//    */

//   const handleCategoryClick = (categoryKey: string) => {
//     if (selectedCategory === categoryKey) {
//       setSelectedCategory("");
//     } else {
//       setSelectedCategory(categoryKey);
//     }

//     setPage(1);
//   };

//   /*
//    * =====================================================
//    * CATEGORY LABEL
//    * =====================================================
//    */

//   const getCategoryLabel = (key: string) => {
//     const category = summary.categories.find(
//       (item) => item.key === key
//     );

//     if (category) {
//       return category.label;
//     }

//     return key
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   /*
//    * =====================================================
//    * DATE FORMAT
//    * =====================================================
//    */

//   const formatDate = (value: string) => {
//     if (!value) {
//       return "-";
//     }

//     const date = new Date(value);

//     if (Number.isNaN(date.getTime())) {
//       return value;
//     }

//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   /*
//    * =====================================================
//    * TIME FORMAT
//    * =====================================================
//    */

//   const formatTime = (value: string | null) => {
//     if (!value) {
//       return "-";
//     }

//     const date = new Date(value);

//     if (Number.isNaN(date.getTime())) {
//       return value;
//     }

//     return date.toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   /*
//    * =====================================================
//    * DISPLAY CATEGORIES
//    *
//    * First card = Total
//    * Remaining cards = dynamic DB categories
//    * =====================================================
//    */

//   const visibleCategories = useMemo(() => {
//     return summary.categories
//       .filter((category) => category.count > 0)
//       .slice(0, 3);
//   }, [summary.categories]);

//   /*
//    * =====================================================
//    * PERIOD TITLE
//    * =====================================================
//    */

//   const periodTitle =
//     period === "daily"
//       ? "Today"
//       : period === "weekly"
//       ? "This Week"
//       : "This Month";

//   /*
//    * =====================================================
//    * CARD STYLES
//    * =====================================================
//    */

//   const categoryStyles = [
//     {
//       card: "border-emerald-100 bg-emerald-50/60",
//       icon: "bg-emerald-100 text-emerald-600",
//       arrow: "text-emerald-600",
//     },
//     {
//       card: "border-purple-100 bg-purple-50/60",
//       icon: "bg-purple-100 text-purple-600",
//       arrow: "text-purple-600",
//     },
//     {
//       card: "border-orange-100 bg-orange-50/60",
//       icon: "bg-orange-100 text-orange-600",
//       arrow: "text-orange-600",
//     },
//   ];

//   /*
//    * =====================================================
//    * START RECORD NUMBER
//    * =====================================================
//    */

//   const startRecord =
//     totalRecords === 0
//       ? 0
//       : (page - 1) * LIMIT + 1;

//   const endRecord =
//     totalRecords === 0
//       ? 0
//       : Math.min(page * LIMIT, totalRecords);

//   return (
//     <section className="mt-5 rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_2px_14px_rgba(15,23,42,0.04)] sm:p-5">
//       {/* ================================================= */}
//       {/* HEADER */}
//       {/* ================================================= */}

//       <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//             <Users
//               size={24}
//               strokeWidth={1.8}
//             />
//           </div>

//           <div>
//             <h2 className="text-lg font-bold text-[#071e59]">
//               Visitors Overview
//             </h2>

//             <p className="mt-0.5 text-xs text-slate-500">
//               View your visitors and visitor activity
//             </p>
//           </div>
//         </div>

//         {/* <button
//           type="button"
//           className="flex items-center gap-1 self-start text-xs font-semibold text-blue-600 transition hover:text-blue-800 sm:self-auto"
//         >
//           View All
//           <ArrowRight size={14} />
//         </button> */}
//       </div>

//       {/* ================================================= */}
//       {/* PERIOD FILTER */}
//       {/* ================================================= */}

//       <div className="mt-4 flex w-full overflow-x-auto rounded-xl bg-slate-50 p-1 sm:w-fit">
//         {(
//           [
//             ["daily", "Today"],
//             ["weekly", "This Week"],
//             ["monthly", "This Month"],
//           ] as [Period, string][]
//         ).map(([value, label]) => {
//           const active = period === value;

//           return (
//             <button
//               key={value}
//               type="button"
//               onClick={() =>
//                 handlePeriodChange(value)
//               }
//               className={`min-w-[105px] rounded-lg px-4 py-2 text-xs font-semibold transition ${
//                 active
//                   ? "bg-white text-blue-600 shadow-sm"
//                   : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               {label}
//             </button>
//           );
//         })}
//       </div>

//       {/* ================================================= */}
//       {/* SUMMARY CARDS */}
//       {/* ================================================= */}

//       <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         {/* TOTAL VISITORS */}

//         <button
//           type="button"
//           onClick={() => {
//             setSelectedCategory("");
//             setPage(1);
//           }}
//           className={`rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
//             selectedCategory === ""
//               ? "ring-2 ring-blue-400 ring-offset-1"
//               : ""
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
//               <UserRound size={20} />
//             </div>

//             <span className="text-[11px] font-medium text-blue-500">
//               {periodTitle}
//             </span>
//           </div>

//           <p className="mt-3 text-2xl font-bold text-[#071e59]">
//             {loadingSummary ? "..." : summary.total}
//           </p>

//           <p className="mt-1 text-xs text-slate-500">
//             Total Visitors
//           </p>
//         </button>

//         {/* DYNAMIC CATEGORY CARDS */}

//         {visibleCategories.map(
//           (category, index) => {
//             const style =
//               categoryStyles[index] ||
//               categoryStyles[0];

//             const selected =
//               selectedCategory === category.key;

//             return (
//               <button
//                 key={category.key}
//                 type="button"
//                 onClick={() =>
//                   handleCategoryClick(
//                     category.key
//                   )
//                 }
//                 className={`rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${style.card} ${
//                   selected
//                     ? "ring-2 ring-blue-400 ring-offset-1"
//                     : ""
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div
//                     className={`flex h-10 w-10 items-center justify-center rounded-full ${style.icon}`}
//                   >
//                     <Users size={19} />
//                   </div>

//                   <ChevronRight
//                     size={17}
//                     className={style.arrow}
//                   />
//                 </div>

//                 <p className="mt-3 text-2xl font-bold text-[#071e59]">
//                   {category.count}
//                 </p>

//                 <p className="mt-1 truncate text-xs text-slate-500">
//                   {category.label}
//                 </p>
//               </button>
//             );
//           }
//         )}
//       </div>

//       {/* ================================================= */}
//       {/* SELECTED CATEGORY */}
//       {/* ================================================= */}

//       {selectedCategory && (
//         <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2.5">
//           <div className="flex min-w-0 items-center gap-2">
//             <span className="shrink-0 text-xs text-slate-500">
//               Showing:
//             </span>

//             <span className="truncate text-xs font-semibold text-blue-700">
//               {getCategoryLabel(
//                 selectedCategory
//               )}
//             </span>
//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               setSelectedCategory("");
//               setPage(1);
//             }}
//             className="ml-3 shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-800"
//           >
//             Clear
//           </button>
//         </div>
//       )}

//       {/* ================================================= */}
//       {/* TABLE */}
//       {/* ================================================= */}

//       <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
//         <div className="overflow-x-auto">
//           <table className="min-w-[850px] w-full">
//             <thead>
//               <tr className="bg-slate-50">
//                 <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#173776]">
//                   Visitor Name
//                 </th>

//                 <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#173776]">
//                   Purpose
//                 </th>

//                 <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#173776]">
//                   Date
//                 </th>

//                 <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#173776]">
//                   Time In
//                 </th>

//                 <th className="px-4 py-3 text-left text-[11px] font-semibold text-[#173776]">
//                   Time Out
//                 </th>

//                 {/* <th className="px-4 py-3 text-center text-[11px] font-semibold text-[#173776]">
//                   Action
//                 </th> */}
//               </tr>
//             </thead>

//             <tbody>
//               {/* LOADING */}

//               {loadingVisitors ? (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-4 py-12 text-center"
//                   >
//                     <div className="flex flex-col items-center">
//                       <div className="h-7 w-7 animate-spin rounded-full border-2 border-blue-100 border-t-blue-600" />

//                       <p className="mt-3 text-xs text-slate-400">
//                         Loading visitors...
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : visitors.length === 0 ? (
//                 /* EMPTY */

//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-4 py-12 text-center"
//                   >
//                     <div className="flex flex-col items-center">
//                       <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
//                         <Users size={25} />
//                       </div>

//                       <p className="mt-3 text-sm font-medium text-slate-500">
//                         No visitors found
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         No visitor records are available
//                         for {periodTitle.toLowerCase()}.
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 /* DATA */

//                 visitors.map((visitor, index) => (
//                   <tr
//                     key={`${visitor.user_id}-${visitor.visit_date}-${visitor.time_in}-${index}`}
//                     className="border-t border-slate-100 transition hover:bg-blue-50/30"
//                   >
//                     {/* VISITOR NAME */}

//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
//                           <UserRound size={17} />
//                         </div>

//                         <div className="min-w-0">
//                           <p className="truncate text-xs font-semibold text-[#173776]">
//                             {visitor.full_name ||
//                               "Unknown Visitor"}
//                           </p>

//                           <p className="mt-0.5 text-[10px] text-slate-400">
//                             Visitor
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* PURPOSE */}

//                     <td className="px-4 py-3">
//                       <span className="inline-flex max-w-[150px] truncate rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-600">
//                         {getCategoryLabel(
//                           visitor.table_name
//                         )}
//                       </span>
//                     </td>

//                     {/* DATE */}

//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-500">
//                         <CalendarDays
//                           size={14}
//                           className="shrink-0"
//                         />

//                         {formatDate(
//                           visitor.visit_date
//                         )}
//                       </div>
//                     </td>

//                     {/* TIME IN */}

//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-600">
//                         <Clock3
//                           size={14}
//                           className="text-emerald-500"
//                         />

//                         {formatTime(
//                           visitor.time_in
//                         )}
//                       </div>
//                     </td>

//                     {/* TIME OUT */}

//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-600">
//                         <Clock3
//                           size={14}
//                           className="text-orange-500"
//                         />

//                         {formatTime(
//                           visitor.time_out
//                         )}
//                       </div>
//                     </td>

//                     {/* ACTION */}

//                     <td className="px-4 py-3 text-center">
//                       <button
//                         type="button"
//                         className="rounded-lg border border-blue-200 px-3 py-1.5 text-[10px] font-semibold text-blue-600 transition hover:bg-blue-50"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ================================================= */}
//         {/* PAGINATION */}
//         {/* ================================================= */}

//         <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
//           <p className="text-[11px] text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-700">
//               {startRecord}
//             </span>
//             {" - "}
//             <span className="font-semibold text-slate-700">
//               {endRecord}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-700">
//               {totalRecords}
//             </span>{" "}
//             visitors
//           </p>

//           <div className="flex items-center justify-center gap-2">
//             <button
//               type="button"
//               disabled={
//                 page <= 1 ||
//                 loadingVisitors
//               }
//               onClick={() =>
//                 setPage((current) =>
//                   Math.max(1, current - 1)
//                 )
//               }
//               className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-2.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               <ChevronLeft size={14} />
//               Previous
//             </button>

//             <div className="flex h-8 min-w-[70px] items-center justify-center rounded-lg bg-blue-50 px-3 text-[11px] font-semibold text-blue-600">
//               {page} / {totalPages}
//             </div>

//             <button
//               type="button"
//               disabled={
//                 page >= totalPages ||
//                 loadingVisitors
//               }
//               onClick={() =>
//                 setPage((current) =>
//                   Math.min(
//                     totalPages,
//                     current + 1
//                   )
//                 )
//               }
//               className="flex h-8 items-center gap-1 rounded-lg border border-blue-200 px-2.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               Next
//               <ChevronRight size={14} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* FOOTER */}
//       {/* ================================================= */}

//       <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400">
//         <ArrowRight size={12} />

//         <span>
//           Select a visitor category above to filter
//           the visitor list.
//         </span>
//       </div>
//     </section>
//   );
// }
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Users,
  UserRound,
  Search,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Period = "daily" | "weekly" | "monthly";

type VisitorStats = {
  today: number;
  thisWeek: number;
  thisMonth: number;
  pendingApproval: number;
};

type Visitor = {
  id?: number;
  user_id?: number;
  full_name?: string;
  mobile_number?: string;
  table_name?: string;
  purpose?: string;
  visit_date?: string;
  time_in?: string;
  time_out?: string | null;
  punch_type?: string;
  status?: string;
};

interface VisitorsOverviewProps {
  className?: string;
}

const API = import.meta.env.VITE_BACKEND_URL;

const VisitorsOverview = ({
  className = "",
}: VisitorsOverviewProps) => {
  const [period, setPeriod] =
    useState<Period>("daily");

  const [visitors, setVisitors] =
    useState<Visitor[]>([]);

  const [stats, setStats] =
    useState<VisitorStats>({
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      pendingApproval: 0,
    });

  const [loading, setLoading] =
    useState(false);

  const [statsLoading, setStatsLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const ITEMS_PER_PAGE = 6;

  /*
  |--------------------------------------------------------------------------
  | Fetch Visitor Data
  |--------------------------------------------------------------------------
  */

  const fetchVisitors = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/user-dashboard/my-flat-visitors`,
        {
          params: {
            period,
            search,
          },
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        const data =
          response.data?.data;

        /*
         * Supports both:
         *
         * data: [...]
         *
         * and:
         *
         * data: {
         *   visitors: [...]
         * }
         */

        if (Array.isArray(data)) {
          setVisitors(data);
        } else {
          setVisitors(
            Array.isArray(data?.visitors)
              ? data.visitors
              : []
          );
        }
      } else {
        setVisitors([]);
      }
    } catch (error) {
      console.error(
        "Failed to fetch visitors:",
        error
      );

      setVisitors([]);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch Visitor Summary
  |--------------------------------------------------------------------------
  */

  const fetchVisitorStats = async () => {
    try {
      setStatsLoading(true);

      const response = await axios.get(
        `${API}/api/user-dashboard/visitor-stats`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        const data =
          response.data?.data || {};

        setStats({
          today:
            Number(data.today) || 0,

          thisWeek:
            Number(data.thisWeek) ||
            Number(data.this_week) ||
            0,

          thisMonth:
            Number(data.thisMonth) ||
            Number(data.this_month) ||
            0,

          pendingApproval:
            Number(
              data.pendingApproval
            ) ||
            Number(
              data.pending_approval
            ) ||
            0,
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch visitor stats:",
        error
      );

      /*
       * Don't break the existing visitor
       * list if stats endpoint fails.
       */
      setStats({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        pendingApproval: 0,
      });
    } finally {
      setStatsLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchVisitorStats();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Period / Search Change
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setCurrentPage(1);

    fetchVisitors();
  }, [period, search]);

  /*
  |--------------------------------------------------------------------------
  | Client-side fallback filtering
  |--------------------------------------------------------------------------
  */

  const filteredVisitors = useMemo(() => {
    if (!search.trim()) {
      return visitors;
    }

    const value =
      search.trim().toLowerCase();

    return visitors.filter((visitor) => {
      return (
        visitor.full_name
          ?.toLowerCase()
          .includes(value) ||
        visitor.mobile_number
          ?.toLowerCase()
          .includes(value) ||
        visitor.table_name
          ?.toLowerCase()
          .includes(value) ||
        visitor.purpose
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [visitors, search]);

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredVisitors.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedVisitors =
    filteredVisitors.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE
    );

  useEffect(() => {
    if (
      currentPage >
      totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const formatPurpose = (
    value?: string
  ) => {
    if (!value) {
      return "Visitor";
    }

    return value
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  // const formatDate = (
  //   value?: string
  // ) => {
  //   if (!value) {
  //     return "-";
  //   }

  //   /*
  //    * If backend returns YYYY-MM-DD,
  //    * avoid UTC conversion.
  //    */
  //   if (
  //     /^\d{4}-\d{2}-\d{2}$/.test(
  //       value
  //     )
  //   ) {
  //     const [
  //       year,
  //       month,
  //       day,
  //     ] = value.split("-");

  //     return `${day}-${month}-${year}`;
  //   }

  //   const date =
  //     new Date(value);

  //   if (
  //     Number.isNaN(
  //       date.getTime()
  //     )
  //   ) {
  //     return value;
  //   }

  //   return date.toLocaleDateString(
  //     "en-IN",
  //     {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     }
  //   );
  // };
const formatDate = (value?: string) => {
  if (!value) {
    return "-";
  }

  /*
   * Backend may return:
   * 2026-09-16
   */
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] =
      value.split("-");

    return `${day}-${month}-${year}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
  const formatTime = (
  value?: string | null
) => {
  if (!value) {
    return null;
  }

  /*
   * PostgreSQL TIME value:
   * 10:30:00
   */
  if (
    /^\d{2}:\d{2}/.test(value)
  ) {
    const [
      hourString,
      minuteString,
    ] = value.split(":");

    let hour = Number(hourString);

    const minute = minuteString;

    const suffix =
      hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minute} ${suffix}`;
  }

  /*
   * PostgreSQL timestamptz:
   * 2026-09-16T10:30:00.000Z
   */
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
};
  // const formatTime = (
  //   value?: string | null
  // ) => {
  //   if (!value) {
  //     return null;
  //   }

  //   /*
  //    * Backend may return:
  //    * 10:30:00
  //    *
  //    * or:
  //    * 2026-09-15T10:30:00
  //    */

  //   if (
  //     /^\d{2}:\d{2}/.test(
  //       value
  //     )
  //   ) {
  //     const [
  //       hourString,
  //       minuteString,
  //     ] = value.split(":");

  //     let hour =
  //       Number(hourString);

  //     const minute =
  //       minuteString;

  //     const suffix =
  //       hour >= 12
  //         ? "PM"
  //         : "AM";

  //     hour =
  //       hour % 12 || 12;

  //     return `${hour}:${minute} ${suffix}`;
  //   }

  //   const date =
  //     new Date(value);

  //   if (
  //     Number.isNaN(
  //       date.getTime()
  //     )
  //   ) {
  //     return value;
  //   }

  //   return date.toLocaleTimeString(
  //     "en-IN",
  //     {
  //       hour: "numeric",
  //       minute: "2-digit",
  //       hour12: true,
  //     }
  //   );
  // };

  /*
  |--------------------------------------------------------------------------
  | Summary Cards
  |--------------------------------------------------------------------------
  */

  const summaryCards = [
    {
      label: "Today",
      value: stats.today,
      description: "Visitors today",
      icon: Users,
      wrapper:
        "bg-blue-50 border-blue-100",
      iconWrapper:
        "bg-blue-100 text-blue-600",
      valueColor:
        "text-blue-900",
    },

    {
      label: "This Week",
      value: stats.thisWeek,
      description:
        "Visitors this week",
      icon: CalendarDays,
      wrapper:
        "bg-emerald-50 border-emerald-100",
      iconWrapper:
        "bg-emerald-100 text-emerald-600",
      valueColor:
        "text-emerald-900",
    },

    {
      label: "This Month",
      value: stats.thisMonth,
      description:
        "Visitors this month",
      icon: UserRound,
      wrapper:
        "bg-purple-50 border-purple-100",
      iconWrapper:
        "bg-purple-100 text-purple-600",
      valueColor:
        "text-purple-900",
    },

    {
      label: "Pending Approval",
      value: stats.pendingApproval,
      description:
        "Awaiting approval",
      icon: Clock3,
      wrapper:
        "bg-orange-50 border-orange-100",
      iconWrapper:
        "bg-orange-100 text-orange-600",
      valueColor:
        "text-orange-900",
    },
  ];

  return (
    <section
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        ${className}
      `}
    >
      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="
          flex
          flex-col
          gap-3
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h2
            className="
              text-base
              font-bold
              text-slate-800
            "
          >
            Visitors Overview
          </h2>

          <p
            className="
              mt-0.5
              text-[11px]
              text-slate-500
            "
          >
            View visitors associated
            with your flat
          </p>
        </div>

        {/* Period buttons */}

        <div
          className="
            flex
            w-fit
            items-center
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            p-1
          "
        >
          {(
            [
              "daily",
              "weekly",
              "monthly",
            ] as Period[]
          ).map((item) => {
            const active =
              period === item;

            const label =
              item === "daily"
                ? "Today"
                : item === "weekly"
                ? "This Week"
                : "This Month";

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setPeriod(item)
                }
                className={`
                  rounded-md
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  transition-all
                  ${
                    active
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================
          SUMMARY CARDS
      ======================================================= */}

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-3
          xl:grid-cols-4
        "
      >
        {summaryCards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <div
                key={card.label}
                className={`
                  rounded-xl
                  border
                  p-3
                  ${card.wrapper}
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${card.iconWrapper}
                    `}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                    />
                  </div>

                  {statsLoading ? (
                    <div
                      className="
                        h-6
                        w-8
                        animate-pulse
                        rounded
                        bg-white/70
                      "
                    />
                  ) : (
                    <span
                      className={`
                        text-xl
                        font-bold
                        ${card.valueColor}
                      `}
                    >
                      {card.value}
                    </span>
                  )}
                </div>

                <p
                  className="
                    mt-2
                    text-[11px]
                    font-semibold
                    text-slate-700
                  "
                >
                  {card.label}
                </p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-slate-500
                  "
                >
                  {card.description}
                </p>
              </div>
            );
          }
        )}
      </div>

      {/* ======================================================
          SEARCH
      ======================================================= */}

      <div
        className="
          mt-4
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            relative
            w-full
            sm:max-w-xs
          "
        >
          <Search
            size={15}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search visitor..."
            className="
              h-9
              w-full
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              pl-9
              pr-3
              text-xs
              text-slate-700
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-blue-400
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        <p
          className="
            text-[10px]
            text-slate-400
          "
        >
          {filteredVisitors.length}{" "}
          visitor
          {filteredVisitors.length !== 1
            ? "s"
            : ""}
        </p>
      </div>

      {/* ======================================================
          VISITOR TABLE / LIST
      ======================================================= */}

      <div
        className="
          mt-3
          overflow-hidden
          rounded-xl
          border
          border-slate-200
        "
      >
        {/* Desktop Header */}

        <div
          className="
            hidden
            grid-cols-[2fr_1fr_1fr_1fr]
            gap-3
            bg-slate-50
            px-4
            py-2.5
            md:grid
          "
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Visitor
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Purpose
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Date
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Time
          </p>
        </div>

        {loading ? (
          <div className="divide-y divide-slate-100">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="
                    flex
                    animate-pulse
                    items-center
                    gap-3
                    px-4
                    py-3
                  "
                >
                  <div
                    className="
                      h-9
                      w-9
                      rounded-full
                      bg-slate-100
                    "
                  />

                  <div className="flex-1">
                    <div className="h-3 w-32 rounded bg-slate-100" />
                    <div className="mt-2 h-2 w-20 rounded bg-slate-100" />
                  </div>
                </div>
              )
            )}
          </div>
        ) : paginatedVisitors.length ===
          0 ? (
          <div
            className="
              flex
              min-h-[170px]
              flex-col
              items-center
              justify-center
              px-4
              text-center
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-slate-400
              "
            >
              <Users size={20} />
            </div>

            <p
              className="
                mt-3
                text-xs
                font-semibold
                text-slate-600
              "
            >
              No visitors found
            </p>

            <p
              className="
                mt-1
                text-[10px]
                text-slate-400
              "
            >
              No visitor records are
              available for this period.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {paginatedVisitors.map(
              (visitor, index) => {
                const visitorName =
                  visitor.full_name ||
                  "Unknown Visitor";

                const purpose =
                  formatPurpose(
                    visitor.purpose ||
                      visitor.table_name
                  );

                const timeIn =
                  formatTime(
                    visitor.time_in
                  );

                const timeOut =
                  formatTime(
                    visitor.time_out
                  );

                return (
                  <div
                    key={
                      visitor.id ??
                      `${visitor.user_id}-${visitor.visit_date}-${visitor.time_in}-${index}`
                    }
                    className="
                      px-4
                      py-3
                      transition
                      hover:bg-slate-50
                    "
                  >
                    {/* Desktop */}

                    <div
                      className="
                        hidden
                        grid-cols-[2fr_1fr_1fr_1fr]
                        items-center
                        gap-3
                        md:grid
                      "
                    >
                      {/* Visitor */}

                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-50
                            text-blue-600
                          "
                        >
                          <UserRound
                            size={17}
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-xs
                              font-semibold
                              text-slate-700
                            "
                          >
                            {visitorName}
                          </p>

                          {visitor.mobile_number && (
                            <p
                              className="
                                mt-0.5
                                truncate
                                text-[9px]
                                text-slate-400
                              "
                            >
                              {
                                visitor.mobile_number
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Purpose */}

                      <div>
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-slate-100
                            px-2
                            py-1
                            text-[9px]
                            font-medium
                            text-slate-600
                          "
                        >
                          {purpose}
                        </span>
                      </div>

                      {/* Date */}

                      <p
                        className="
                          text-[10px]
                          font-medium
                          text-slate-600
                        "
                      >
                        {formatDate(
                          visitor.visit_date
                        )}
                      </p>

                      {/* Time */}

                      <div className="text-[10px]">
                        <p className="font-medium text-slate-600">
                          In:{" "}
                          {timeIn || "-"}
                        </p>

                        <p className="mt-0.5 text-slate-400">
                          Out:{" "}
                          {timeOut ||
                            "Inside"}
                        </p>
                      </div>
                    </div>

                    {/* Mobile */}

                    <div className="md:hidden">
                      <div className="flex items-start gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-50
                            text-blue-600
                          "
                        >
                          <UserRound
                            size={17}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p
                                className="
                                  truncate
                                  text-xs
                                  font-semibold
                                  text-slate-700
                                "
                              >
                                {visitorName}
                              </p>

                              {visitor.mobile_number && (
                                <p className="mt-0.5 text-[9px] text-slate-400">
                                  {
                                    visitor.mobile_number
                                  }
                                </p>
                              )}
                            </div>

                            <span
                              className="
                                shrink-0
                                rounded-full
                                bg-slate-100
                                px-2
                                py-1
                                text-[8px]
                                font-medium
                                text-slate-600
                              "
                            >
                              {purpose}
                            </span>
                          </div>

                          <div
                            className="
                              mt-2
                              flex
                              flex-wrap
                              gap-x-4
                              gap-y-1
                              text-[9px]
                              text-slate-500
                            "
                          >
                            <span>
                              {formatDate(
                                visitor.visit_date
                              )}
                            </span>

                            <span>
                              In:{" "}
                              {timeIn ||
                                "-"}
                            </span>

                            <span>
                              Out:{" "}
                              {timeOut ||
                                "Inside"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* ======================================================
          PAGINATION
      ======================================================= */}

      {filteredVisitors.length >
        ITEMS_PER_PAGE && (
        <div
          className="
            mt-3
            flex
            items-center
            justify-between
          "
        >
          <p
            className="
              text-[10px]
              text-slate-400
            "
          >
            Page {currentPage} of{" "}
            {totalPages}
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(
                      1,
                      page - 1
                    )
                )
              }
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-md
                border
                border-slate-200
                bg-white
                text-slate-500
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronLeft
                size={14}
              />
            </button>

            <button
              type="button"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-md
                border
                border-slate-200
                bg-white
                text-slate-500
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronRight
                size={14}
              />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisitorsOverview;