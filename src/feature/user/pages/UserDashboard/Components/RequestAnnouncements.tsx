// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   Bell,
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   Clock3,
//   Megaphone,
//   X,
// } from "lucide-react";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// type Announcement = {
//   id: number;
//   request_type_id?: number | null;
//   org_id?: number | null;
//   requested_by?: number | null;
//   status?: string | null;
//   announcement: string;
//   submitted_at?: string | null;
//   reviewed_at?: string | null;
//   expires_at?: string | null;
//   expiresAt?: string | null;
//   is_active?: boolean;
// };

// const ITEMS_PER_BATCH = 3;
// const ROTATION_INTERVAL = 4000;
// const REFRESH_INTERVAL = 60000;

// const getDateOnly = (value?: string | null): string | null => {
//   if (!value) return null;

//   const datePart = value.substring(0, 10);

//   return /^\d{4}-\d{2}-\d{2}$/.test(datePart) ? datePart : null;
// };

// const getTodayDate = (): string => {
//   const today = new Date();

//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const day = String(today.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };

// const formatDate = (value?: string | null): string => {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "-";

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatTime = (value?: string | null): string => {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "-";

//   return date.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const getStatusClasses = (status?: string | null) => {
//   const normalized = status?.toLowerCase();

//   if (normalized === "approved") {
//     return "bg-emerald-50 text-emerald-700 border-emerald-200";
//   }

//   if (normalized === "rejected") {
//     return "bg-red-50 text-red-700 border-red-200";
//   }

//   if (normalized === "pending") {
//     return "bg-amber-50 text-amber-700 border-amber-200";
//   }

//   return "bg-blue-50 text-blue-700 border-blue-200";
// };

// const stripHtml = (html: string): string => {
//   if (!html) return "";

//   const temp = document.createElement("div");
//   temp.innerHTML = html;

//   return temp.textContent || temp.innerText || "";
// };

// const isAnnouncementCurrentlyValid = (
//   announcement: Announcement,
//   today: string
// ): boolean => {
//   // If explicitly inactive, do not display.
//   if (announcement.is_active === false) {
//     return false;
//   }

//   /*
//    * submitted_at is treated as the start date.
//    * If the announcement starts in the future, hide it.
//    */
//   const startDate = getDateOnly(announcement.submitted_at);

//   if (startDate && startDate > today) {
//     return false;
//   }

//   /*
//    * Expiry date is inclusive.
//    *
//    * Example:
//    * expiry = 07-Oct-2026
//    * today  = 07-Oct-2026
//    * => SHOW
//    *
//    * expiry = 07-Oct-2026
//    * today  = 08-Oct-2026
//    * => HIDE
//    */
//   const expiryDate = getDateOnly(
//     announcement.expires_at ?? announcement.expiresAt
//   );

//   if (expiryDate && expiryDate < today) {
//     return false;
//   }

//   return true;
// };

// const RequestAnnouncements = () => {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [currentBatch, setCurrentBatch] = useState(0);

//   const [selectedAnnouncement, setSelectedAnnouncement] =
//     useState<Announcement | null>(null);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const today = getTodayDate();

//   /*
//    * Filter announcements based on:
//    * - future start date
//    * - expiry date
//    * - inactive announcements
//    */
//   const validAnnouncements = useMemo(() => {
//     return announcements.filter((item) =>
//       isAnnouncementCurrentlyValid(item, today)
//     );
//   }, [announcements, today]);

//   const totalBatches = Math.ceil(
//     validAnnouncements.length / ITEMS_PER_BATCH
//   );

//   /*
//    * Keep current batch valid whenever announcements
//    * are refreshed or expired.
//    */
//   useEffect(() => {
//     if (totalBatches === 0) {
//       setCurrentBatch(0);
//       return;
//     }

//     setCurrentBatch((previous) =>
//       Math.min(previous, totalBatches - 1)
//     );
//   }, [totalBatches]);

//   /*
//    * Fetch announcements.
//    */
//   const fetchAnnouncements = async () => {
//     try {
//       const response = await axios.get(
//         `${BACKEND_URL}/api/user-dashboard/request-announcements`,
//         {
//           withCredentials: true,
//         }
//       );

//       const data = response.data;

//       const fetchedAnnouncements: Announcement[] =
//         Array.isArray(data?.announcements)
//           ? data.announcements
//           : [];

//       const currentDate = getTodayDate();

//       const filteredAnnouncements = fetchedAnnouncements.filter(
//         (item) =>
//           isAnnouncementCurrentlyValid(item, currentDate)
//       );

//       setAnnouncements(filteredAnnouncements);
//     } catch (error) {
//       console.error(
//         "Failed to fetch request announcements:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//    * Initial load.
//    */
//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   /*
//    * Refresh every 60 seconds.
//    *
//    * This also ensures:
//    * - expired announcements disappear
//    * - newly available announcements appear
//    * - future announcements become available
//    */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchAnnouncements();
//     }, REFRESH_INTERVAL);

//     return () => clearInterval(interval);
//   }, []);

//   /*
//    * Refresh when user comes back to the browser tab.
//    */
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible") {
//         fetchAnnouncements();
//       }
//     };

//     document.addEventListener(
//       "visibilitychange",
//       handleVisibilityChange
//     );

//     return () => {
//       document.removeEventListener(
//         "visibilitychange",
//         handleVisibilityChange
//       );
//     };
//   }, []);

//   /*
//    * Check validity every second so an announcement
//    * disappears immediately after its expiry date.
//    */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const currentDate = getTodayDate();

//       setAnnouncements((previous) =>
//         previous.filter((item) =>
//           isAnnouncementCurrentlyValid(item, currentDate)
//         )
//       );
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   /*
//    * Automatically move to the next batch every 4 seconds.
//    *
//    * Example:
//    *
//    * Batch 1 -> records 1,2,3
//    * Batch 2 -> records 4,5,6
//    * Batch 3 -> records 7,8,9
//    * Batch 1 -> records 1,2,3
//    */
//   useEffect(() => {
//     if (totalBatches <= 1) return;

//     const interval = setInterval(() => {
//       setCurrentBatch((previous) => {
//         if (previous >= totalBatches - 1) {
//           return 0;
//         }

//         return previous + 1;
//       });
//     }, ROTATION_INTERVAL);

//     return () => clearInterval(interval);
//   }, [totalBatches]);

//   /*
//    * Close modal if selected announcement
//    * is no longer valid.
//    */
//   useEffect(() => {
//     if (!selectedAnnouncement) return;

//     const stillValid = validAnnouncements.some(
//       (item) => item.id === selectedAnnouncement.id
//     );

//     if (!stillValid) {
//       setSelectedAnnouncement(null);
//       setIsModalOpen(false);
//     }
//   }, [validAnnouncements, selectedAnnouncement]);

//   /*
//    * Get only the 3 announcements for the current batch.
//    */
//   const visibleAnnouncements = useMemo(() => {
//     const startIndex = currentBatch * ITEMS_PER_BATCH;

//     return validAnnouncements.slice(
//       startIndex,
//       startIndex + ITEMS_PER_BATCH
//     );
//   }, [validAnnouncements, currentBatch]);

//   const openAnnouncement = (announcement: Announcement) => {
//     setSelectedAnnouncement(announcement);
//     setIsModalOpen(true);
//   };

//   const closeAnnouncement = () => {
//     setIsModalOpen(false);
//     setSelectedAnnouncement(null);
//   };

//   const goToPreviousBatch = () => {
//     if (totalBatches <= 1) return;

//     setCurrentBatch((previous) => {
//       if (previous <= 0) {
//         return totalBatches - 1;
//       }

//       return previous - 1;
//     });
//   };

//   const goToNextBatch = () => {
//     if (totalBatches <= 1) return;

//     setCurrentBatch((previous) => {
//       if (previous >= totalBatches - 1) {
//         return 0;
//       }

//       return previous + 1;
//     });
//   };

//   return (
//     <>
//       <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
//         {/* Header */}
//         <div className="mb-4 flex items-center justify-between">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
//               <Megaphone className="h-5 w-5 text-indigo-600" />
//             </div>

//             <div className="min-w-0">
//               <h2 className="truncate text-base font-semibold text-slate-800 sm:text-lg">
//                 Request Announcements
//               </h2>

//               <p className="text-xs text-slate-500 sm:text-sm">
//                 Latest updates and important information
//               </p>
//             </div>
//           </div>

//           {/* Navigation */}
//           {totalBatches > 1 && (
//             <div className="flex shrink-0 items-center gap-1">
//               <button
//                 type="button"
//                 onClick={goToPreviousBatch}
//                 className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
//                 aria-label="Previous announcements"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>

//               <button
//                 type="button"
//                 onClick={goToNextBatch}
//                 className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
//                 aria-label="Next announcements"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="flex flex-col gap-3">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="animate-pulse rounded-xl border border-slate-200 bg-slate-50 p-4"
//               >
//                 <div className="mb-3 h-4 w-28 rounded bg-slate-200" />

//                 <div className="mb-2 h-4 w-3/4 rounded bg-slate-200" />

//                 <div className="mb-4 h-3 w-full rounded bg-slate-200" />

//                 <div className="h-3 w-1/2 rounded bg-slate-200" />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty state */}
//         {!loading && validAnnouncements.length === 0 && (
//           <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 text-center">
//             <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
//               <Bell className="h-6 w-6 text-slate-400" />
//             </div>

//             <p className="text-sm font-medium text-slate-600">
//               No announcements available
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               New request announcements will appear here.
//             </p>
//           </div>
//         )}

//         {/* =====================================================
//             VERTICAL ANNOUNCEMENT LIST
//             Exactly 3 records per batch
//             ===================================================== */}
//         {!loading && visibleAnnouncements.length > 0 && (
//           <div className="flex flex-col gap-3">
//             {visibleAnnouncements.map((item) => {
//               const previewText = stripHtml(
//                 item.announcement || ""
//               );

//               const expiryDate =
//                 item.expires_at ?? item.expiresAt;

//               return (
//                 <div
//                   key={item.id}
//                   className="group w-full rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/20 hover:shadow-sm"
//                 >
//                   <div className="flex w-full items-start gap-3">
//                     {/* Icon */}
//                     {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
//                       <Bell className="h-5 w-5 text-indigo-600" />
//                     </div> */}

//                     {/* Content */}
//                     <div className="min-w-0 flex-1">
//                       {/* Top row */}
//                       <div className="flex flex-wrap items-center justify-between gap-2">
//                         <div className="flex min-w-0 items-center gap-2">
//                           <span
//                             className={`inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClasses(
//                               item.status
//                             )}`}
//                           >
//                             {item.status || "Announcement"}
//                           </span>
//                         </div>

//                         <button
//                           type="button"
//                           onClick={() =>
//                             openAnnouncement(item)
//                           }
//                           className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
//                         >
//                           View
//                         </button>
//                       </div>

//                       {/* Announcement text */}
//                       <p className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-slate-800">
//                         {previewText || "Announcement"}
//                       </p>

//                       {/* Bottom details */}
//                       <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
//                         <div className="flex items-center gap-1.5">
//                           <CalendarDays className="h-3.5 w-3.5 text-slate-400" />

//                           <span>
//                             {formatDate(
//                               item.submitted_at
//                             )}
//                           </span>
//                         </div>

//                         {item.submitted_at && (
//                           <div className="flex items-center gap-1.5">
//                             <Clock3 className="h-3.5 w-3.5 text-slate-400" />

//                             <span>
//                               {formatTime(
//                                 item.submitted_at
//                               )}
//                             </span>
//                           </div>
//                         )}

//                         {expiryDate && (
//                           <div className="flex items-center gap-1.5">
//                             <span className="font-medium text-slate-400">
//                               Valid until:
//                             </span>

//                             <span className="font-medium text-slate-600">
//                               {formatDate(expiryDate)}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Batch indicators */}
//         {!loading && totalBatches > 1 && (
//           <div className="mt-4 flex items-center justify-center gap-1.5">
//             {Array.from({ length: totalBatches }).map(
//               (_, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   onClick={() => setCurrentBatch(index)}
//                   aria-label={`Go to announcement group ${
//                     index + 1
//                   }`}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     currentBatch === index
//                       ? "w-6 bg-indigo-600"
//                       : "w-1.5 bg-slate-300 hover:bg-slate-400"
//                   }`}
//                 />
//               )
//             )}
//           </div>
//         )}
//       </section>

//       {/* =====================================================
//           ANNOUNCEMENT MODAL
//           ===================================================== */}
//       {isModalOpen && selectedAnnouncement && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
//           onClick={closeAnnouncement}
//         >
//           <div
//             className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >
//             {/* Modal Header */}
//             <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
//               <div className="flex min-w-0 items-center gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
//                   <Megaphone className="h-5 w-5 text-indigo-600" />
//                 </div>

//                 <div className="min-w-0">
//                   <h3 className="text-lg font-semibold text-slate-800">
//                     Request Announcement
//                   </h3>

//                   <p className="mt-0.5 text-xs text-slate-500">
//                     Announcement details
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeAnnouncement}
//                 className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
//                 aria-label="Close"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="max-h-[calc(90vh-130px)] overflow-y-auto px-5 py-5">
//               {/* Status */}
//               <div className="mb-4 flex flex-wrap items-center gap-2">
//                 <span
//                   className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusClasses(
//                     selectedAnnouncement.status
//                   )}`}
//                 >
//                   {selectedAnnouncement.status ||
//                     "Announcement"}
//                 </span>
//               </div>

//               {/* Announcement */}
//               <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
//                 <div className="mb-2 flex items-center gap-2">
//                   <Bell className="h-4 w-4 text-indigo-600" />

//                   <h4 className="text-sm font-semibold text-slate-700">
//                     Announcement
//                   </h4>
//                 </div>

//                 <div
//                   className="prose prose-sm max-w-none text-slate-700"
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       selectedAnnouncement.announcement ||
//                       "<p>No announcement available.</p>",
//                   }}
//                 />
//               </div>

//               {/* Dates */}
//               <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//                 <div className="rounded-xl border border-slate-200 bg-white p-3">
//                   <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
//                     <CalendarDays className="h-4 w-4 text-slate-400" />

//                     Submitted
//                   </div>

//                   <p className="mt-1 text-sm font-semibold text-slate-700">
//                     {formatDate(
//                       selectedAnnouncement.submitted_at
//                     )}
//                   </p>

//                   {selectedAnnouncement.submitted_at && (
//                     <p className="mt-0.5 text-xs text-slate-400">
//                       {formatTime(
//                         selectedAnnouncement.submitted_at
//                       )}
//                     </p>
//                   )}
//                 </div>

//                 {selectedAnnouncement.reviewed_at && (
//                   <div className="rounded-xl border border-slate-200 bg-white p-3">
//                     <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
//                       <Clock3 className="h-4 w-4 text-slate-400" />

//                       Reviewed
//                     </div>

//                     <p className="mt-1 text-sm font-semibold text-slate-700">
//                       {formatDate(
//                         selectedAnnouncement.reviewed_at
//                       )}
//                     </p>

//                     <p className="mt-0.5 text-xs text-slate-400">
//                       {formatTime(
//                         selectedAnnouncement.reviewed_at
//                       )}
//                     </p>
//                   </div>
//                 )}

//                 {(selectedAnnouncement.expires_at ||
//                   selectedAnnouncement.expiresAt) && (
//                   <div className="rounded-xl border border-slate-200 bg-white p-3 sm:col-span-2">
//                     <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
//                       <CalendarDays className="h-4 w-4 text-slate-400" />

//                       Valid Until
//                     </div>

//                     <p className="mt-1 text-sm font-semibold text-slate-700">
//                       {formatDate(
//                         selectedAnnouncement.expires_at ??
//                           selectedAnnouncement.expiresAt
//                       )}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-3">
//               <button
//                 type="button"
//                 onClick={closeAnnouncement}
//                 className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default RequestAnnouncements;
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Megaphone,
  X,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Announcement = {
  id: number;
  request_type_id?: number | null;
  org_id?: number | null;
  requested_by?: number | null;
  status?: string | null;
  announcement: string;

  /*
   * Start date controls when the announcement
   * becomes visible to the user.
   */
  start_date?: string | null;

  submitted_at?: string | null;
  reviewed_at?: string | null;

  /*
   * Expiry date controls when the announcement
   * stops being visible.
   */
  expires_at?: string | null;
  expiresAt?: string | null;

  is_active?: boolean;
};

const ITEMS_PER_BATCH = 3;
const ROTATION_INTERVAL = 4000;
const REFRESH_INTERVAL = 60000;

/*
 * ============================================================
 * GET DATE ONLY
 * ============================================================
 *
 * Converts:
 *
 * 2026-10-08
 * 2026-10-08T00:00:00.000Z
 * 2026-10-08T10:30:00
 *
 * into:
 *
 * 2026-10-08
 *
 * We intentionally use the date portion so that
 * timezone conversion does not shift the start/expiry date.
 */
const getDateOnly = (
  value?: string | null
): string | null => {
  if (!value) return null;

  const datePart = value.substring(0, 10);

  return /^\d{4}-\d{2}-\d{2}$/.test(datePart)
    ? datePart
    : null;
};

/*
 * ============================================================
 * GET TODAY DATE
 * ============================================================
 *
 * Uses the browser's local date.
 */
const getTodayDate = (): string => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/*
 * ============================================================
 * FORMAT DATE
 * ============================================================
 */
const formatDate = (
  value?: string | null
): string => {
  if (!value) return "-";

  /*
   * For DATE fields such as start_date and expires_at,
   * use only YYYY-MM-DD to prevent timezone shifts.
   */
  const dateOnly = getDateOnly(value);

  if (dateOnly) {
    const [year, month, day] =
      dateOnly.split("-").map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return "-";
};

/*
 * ============================================================
 * FORMAT TIME
 * ============================================================
 */
const formatTime = (
  value?: string | null
): string => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/*
 * ============================================================
 * STATUS COLORS
 * ============================================================
 */
const getStatusClasses = (
  status?: string | null
) => {
  const normalized = status?.toLowerCase();

  if (normalized === "approved") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (normalized === "rejected") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (normalized === "pending") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-blue-50 text-blue-700 border-blue-200";
};

/*
 * ============================================================
 * STRIP HTML
 * ============================================================
 *
 * Used only for the announcement preview.
 */
const stripHtml = (
  html: string
): string => {
  if (!html) return "";

  const temp = document.createElement("div");

  temp.innerHTML = html;

  return (
    temp.textContent ||
    temp.innerText ||
    ""
  );
};

/*
 * ============================================================
 * ANNOUNCEMENT VALIDITY
 * ============================================================
 *
 * Rules:
 *
 * 1. is_active === false
 *    -> hide
 *
 * 2. start_date > today
 *    -> hide
 *
 * 3. expires_at < today
 *    -> hide
 *
 * 4. Otherwise
 *    -> show
 *
 * Start date and expiry date are both inclusive.
 */
const isAnnouncementCurrentlyValid = (
  announcement: Announcement,
  today: string
): boolean => {
  /*
   * Explicitly inactive announcements
   * should never be displayed.
   */
  if (announcement.is_active === false) {
    return false;
  }

  /*
   * ==========================================================
   * START DATE
   * ==========================================================
   *
   * The announcement becomes visible ON the start date.
   *
   * Example:
   *
   * start_date = 08-Oct-2026
   * today      = 07-Oct-2026
   * -> HIDE
   *
   * start_date = 08-Oct-2026
   * today      = 08-Oct-2026
   * -> SHOW
   */
  const startDate = getDateOnly(
    announcement.start_date
  );

  if (
    startDate &&
    startDate > today
  ) {
    return false;
  }

  /*
   * ==========================================================
   * EXPIRY DATE
   * ==========================================================
   *
   * Expiry is inclusive.
   *
   * Example:
   *
   * expiry = 10-Oct-2026
   * today  = 10-Oct-2026
   * -> SHOW
   *
   * expiry = 10-Oct-2026
   * today  = 11-Oct-2026
   * -> HIDE
   */
  const expiryDate = getDateOnly(
    announcement.expires_at ??
      announcement.expiresAt
  );

  if (
    expiryDate &&
    expiryDate < today
  ) {
    return false;
  }

  return true;
};

/*
 * ============================================================
 * COMPONENT
 * ============================================================
 */
const RequestAnnouncements = () => {
  const [
    announcements,
    setAnnouncements,
  ] = useState<Announcement[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    currentBatch,
    setCurrentBatch,
  ] = useState(0);

  const [
    selectedAnnouncement,
    setSelectedAnnouncement,
  ] =
    useState<Announcement | null>(null);

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  /*
   * Get today's date.
   */
  const today = getTodayDate();

  /*
   * ==========================================================
   * VALID ANNOUNCEMENTS
   * ==========================================================
   *
   * Filter using:
   *
   * start_date
   * expires_at
   * is_active
   */
  const validAnnouncements =
    useMemo(() => {
      return announcements.filter(
        (item) =>
          isAnnouncementCurrentlyValid(
            item,
            today
          )
      );
    }, [announcements, today]);

  /*
   * ==========================================================
   * TOTAL BATCHES
   * ==========================================================
   *
   * 3 records per batch.
   */
  const totalBatches = Math.ceil(
    validAnnouncements.length /
      ITEMS_PER_BATCH
  );

  /*
   * ==========================================================
   * KEEP CURRENT BATCH VALID
   * ==========================================================
   */
  useEffect(() => {
    if (totalBatches === 0) {
      setCurrentBatch(0);
      return;
    }

    setCurrentBatch((previous) =>
      Math.min(
        previous,
        totalBatches - 1
      )
    );
  }, [totalBatches]);

  /*
   * ==========================================================
   * FETCH ANNOUNCEMENTS
   * ==========================================================
   */
  const fetchAnnouncements =
    async () => {
      try {
        const response =
          await axios.get(
            `${BACKEND_URL}/api/user-dashboard/request-announcements`,
            {
              withCredentials: true,
            }
          );

        const data =
          response.data;

        const fetchedAnnouncements: Announcement[] =
          Array.isArray(
            data?.announcements
          )
            ? data.announcements
            : [];

        const currentDate =
          getTodayDate();

        /*
         * Immediately filter future and
         * expired announcements.
         */
        const filteredAnnouncements =
          fetchedAnnouncements.filter(
            (item) =>
              isAnnouncementCurrentlyValid(
                item,
                currentDate
              )
          );

        setAnnouncements(
          filteredAnnouncements
        );
      } catch (error) {
        console.error(
          "Failed to fetch request announcements:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  /*
   * ==========================================================
   * INITIAL LOAD
   * ==========================================================
   */
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  /*
   * ==========================================================
   * AUTO REFRESH
   * ==========================================================
   *
   * Every 60 seconds.
   *
   * This ensures:
   *
   * - expired announcements disappear
   * - newly available announcements appear
   * - future announcements become available
   */
  useEffect(() => {
    const interval =
      setInterval(() => {
        fetchAnnouncements();
      }, REFRESH_INTERVAL);

    return () =>
      clearInterval(interval);
  }, []);

  /*
   * ==========================================================
   * REFRESH WHEN TAB BECOMES VISIBLE
   * ==========================================================
   */
  useEffect(() => {
    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          fetchAnnouncements();
        }
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  /*
   * ==========================================================
   * CHECK VALIDITY EVERY SECOND
   * ==========================================================
   *
   * This keeps the UI synchronized with
   * the current date.
   */
  useEffect(() => {
    const interval =
      setInterval(() => {
        const currentDate =
          getTodayDate();

        setAnnouncements(
          (previous) =>
            previous.filter(
              (item) =>
                isAnnouncementCurrentlyValid(
                  item,
                  currentDate
                )
            )
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  /*
   * ==========================================================
   * AUTOMATIC BATCH ROTATION
   * ==========================================================
   *
   * Every 4 seconds.
   */
  useEffect(() => {
    if (totalBatches <= 1) {
      return;
    }

    const interval =
      setInterval(() => {
        setCurrentBatch(
          (previous) => {
            if (
              previous >=
              totalBatches - 1
            ) {
              return 0;
            }

            return previous + 1;
          }
        );
      }, ROTATION_INTERVAL);

    return () =>
      clearInterval(interval);
  }, [totalBatches]);

  /*
   * ==========================================================
   * CLOSE MODAL IF ANNOUNCEMENT EXPIRES
   * ==========================================================
   */
  useEffect(() => {
    if (!selectedAnnouncement) {
      return;
    }

    const stillValid =
      validAnnouncements.some(
        (item) =>
          item.id ===
          selectedAnnouncement.id
      );

    if (!stillValid) {
      setSelectedAnnouncement(
        null
      );

      setIsModalOpen(false);
    }
  }, [
    validAnnouncements,
    selectedAnnouncement,
  ]);

  /*
   * ==========================================================
   * VISIBLE ANNOUNCEMENTS
   * ==========================================================
   *
   * Exactly 3 records per batch.
   */
  const visibleAnnouncements =
    useMemo(() => {
      const startIndex =
        currentBatch *
        ITEMS_PER_BATCH;

      return validAnnouncements.slice(
        startIndex,
        startIndex +
          ITEMS_PER_BATCH
      );
    }, [
      validAnnouncements,
      currentBatch,
    ]);

  /*
   * ==========================================================
   * OPEN MODAL
   * ==========================================================
   */
  const openAnnouncement = (
    announcement: Announcement
  ) => {
    setSelectedAnnouncement(
      announcement
    );

    setIsModalOpen(true);
  };

  /*
   * ==========================================================
   * CLOSE MODAL
   * ==========================================================
   */
  const closeAnnouncement = () => {
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
  };

  /*
   * ==========================================================
   * PREVIOUS BATCH
   * ==========================================================
   */
  const goToPreviousBatch = () => {
    if (totalBatches <= 1) {
      return;
    }

    setCurrentBatch(
      (previous) => {
        if (previous <= 0) {
          return totalBatches - 1;
        }

        return previous - 1;
      }
    );
  };

  /*
   * ==========================================================
   * NEXT BATCH
   * ==========================================================
   */
  const goToNextBatch = () => {
    if (totalBatches <= 1) {
      return;
    }

    setCurrentBatch(
      (previous) => {
        if (
          previous >=
          totalBatches - 1
        ) {
          return 0;
        }

        return previous + 1;
      }
    );
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */
  return (
    <>
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

        {/* =====================================================
            HEADER
            ===================================================== */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
              <Megaphone className="h-5 w-5 text-indigo-600" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-slate-800 sm:text-lg">
                Request Announcements
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                Latest updates and important information
              </p>
            </div>

          </div>

          {/* Navigation */}
          {totalBatches > 1 && (
            <div className="flex shrink-0 items-center gap-1">

              <button
                type="button"
                onClick={
                  goToPreviousBatch
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                aria-label="Previous announcements"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={
                  goToNextBatch
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                aria-label="Next announcements"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>
          )}
        </div>

        {/* =====================================================
            LOADING
            ===================================================== */}
        {loading && (
          <div className="flex flex-col gap-3">

            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-3 h-4 w-28 rounded bg-slate-200" />

                  <div className="mb-2 h-4 w-3/4 rounded bg-slate-200" />

                  <div className="mb-4 h-3 w-full rounded bg-slate-200" />

                  <div className="h-3 w-1/2 rounded bg-slate-200" />
                </div>
              )
            )}

          </div>
        )}

        {/* =====================================================
            EMPTY STATE
            ===================================================== */}
        {!loading &&
          validAnnouncements.length ===
            0 && (
            <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Bell className="h-6 w-6 text-slate-400" />
              </div>

              <p className="text-sm font-medium text-slate-600">
                No announcements available
              </p>

              <p className="mt-1 text-xs text-slate-400">
                New request announcements will appear here.
              </p>

            </div>
          )}

        {/* =====================================================
            VERTICAL ANNOUNCEMENT LIST
            ===================================================== */}
        {!loading &&
          visibleAnnouncements.length >
            0 && (
            <div className="flex flex-col gap-3">

              {visibleAnnouncements.map(
                (item) => {
                  const previewText =
                    stripHtml(
                      item.announcement ||
                        ""
                    );

                  const expiryDate =
                    item.expires_at ??
                    item.expiresAt;

                  return (
                    <div
                      key={item.id}
                      className="group w-full rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/20 hover:shadow-sm"
                    >
                      <div className="flex w-full items-start gap-3">

                        {/* =================================================
                            CONTENT
                            ================================================= */}
                        <div className="min-w-0 flex-1">

                          {/* Top row */}
                          <div className="flex flex-wrap items-center justify-between gap-2">

                            <div className="flex min-w-0 items-center gap-2">

                              <span
                                className={`inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClasses(
                                  item.status
                                )}`}
                              >
                                {item.status ||
                                  "Announcement"}
                              </span>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                openAnnouncement(
                                  item
                                )
                              }
                              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                            >
                              View
                            </button>

                          </div>

                          {/* Announcement text */}
                          <p className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-slate-800">
                            {previewText ||
                              "Announcement"}
                          </p>

                          {/* =================================================
                              DETAILS
                              ================================================= */}
                          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">

                            {/* Start Date */}
                            {item.start_date && (
                              <div className="flex items-center gap-1.5">

                                <CalendarDays className="h-3.5 w-3.5 text-slate-400" />

                                <span>
                                  Starts:{" "}
                                  {formatDate(
                                    item.start_date
                                  )}
                                </span>

                              </div>
                            )}

                            {/* Submitted Time */}
                            {item.submitted_at && (
                              <div className="flex items-center gap-1.5">

                                <Clock3 className="h-3.5 w-3.5 text-slate-400" />

                                <span>
                                  {formatTime(
                                    item.submitted_at
                                  )}
                                </span>

                              </div>
                            )}

                            {/* Expiry */}
                            {expiryDate && (
                              <div className="flex items-center gap-1.5">

                                <span className="font-medium text-slate-400">
                                  Valid until:
                                </span>

                                <span className="font-medium text-slate-600">
                                  {formatDate(
                                    expiryDate
                                  )}
                                </span>

                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}

            </div>
          )}

        {/* =====================================================
            BATCH INDICATORS
            ===================================================== */}
        {!loading &&
          totalBatches > 1 && (
            <div className="mt-4 flex items-center justify-center gap-1.5">

              {Array.from({
                length: totalBatches,
              }).map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setCurrentBatch(
                        index
                      )
                    }
                    aria-label={`Go to announcement group ${
                      index + 1
                    }`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentBatch ===
                      index
                        ? "w-6 bg-indigo-600"
                        : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                )
              )}

            </div>
          )}

      </section>

      {/* =====================================================
          ANNOUNCEMENT MODAL
          ===================================================== */}
      {isModalOpen &&
        selectedAnnouncement && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
            onClick={
              closeAnnouncement
            }
          >

            <div
              className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* =================================================
                  MODAL HEADER
                  ================================================= */}
              <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                    <Megaphone className="h-5 w-5 text-indigo-600" />
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-lg font-semibold text-slate-800">
                      Request Announcement
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Announcement details
                    </p>

                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    closeAnnouncement
                  }
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

              </div>

              {/* =================================================
                  MODAL BODY
                  ================================================= */}
              <div className="max-h-[calc(90vh-130px)] overflow-y-auto px-5 py-5">

                {/* Status */}
                <div className="mb-4 flex flex-wrap items-center gap-2">

                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusClasses(
                      selectedAnnouncement.status
                    )}`}
                  >
                    {selectedAnnouncement.status ||
                      "Announcement"}
                  </span>

                </div>

                {/* Announcement */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <div className="mb-2 flex items-center gap-2">

                    <Bell className="h-4 w-4 text-indigo-600" />

                    <h4 className="text-sm font-semibold text-slate-700">
                      Announcement
                    </h4>

                  </div>

                  <div
                    className="prose prose-sm max-w-none text-slate-700"
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedAnnouncement.announcement ||
                        "<p>No announcement available.</p>",
                    }}
                  />

                </div>

                {/* =================================================
                    DATES
                    ================================================= */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* Start Date */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3">

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

                      <CalendarDays className="h-4 w-4 text-slate-400" />

                      Start Date

                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {formatDate(
                        selectedAnnouncement.start_date
                      )}
                    </p>

                  </div>

                  {/* Submitted */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3">

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

                      <Clock3 className="h-4 w-4 text-slate-400" />

                      Submitted

                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {formatDate(
                        selectedAnnouncement.submitted_at
                      )}
                    </p>

                    {selectedAnnouncement.submitted_at && (
                      <p className="mt-0.5 text-xs text-slate-400">
                        {formatTime(
                          selectedAnnouncement.submitted_at
                        )}
                      </p>
                    )}

                  </div>

                  {/* Reviewed */}
                  {selectedAnnouncement.reviewed_at && (
                    <div className="rounded-xl border border-slate-200 bg-white p-3">

                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

                        <Clock3 className="h-4 w-4 text-slate-400" />

                        Reviewed

                      </div>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {formatDate(
                          selectedAnnouncement.reviewed_at
                        )}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {formatTime(
                          selectedAnnouncement.reviewed_at
                        )}
                      </p>

                    </div>
                  )}

                  {/* Expiry */}
                  {(selectedAnnouncement.expires_at ||
                    selectedAnnouncement.expiresAt) && (
                    <div className="rounded-xl border border-slate-200 bg-white p-3">

                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

                        <CalendarDays className="h-4 w-4 text-slate-400" />

                        Valid Until

                      </div>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {formatDate(
                          selectedAnnouncement.expires_at ??
                            selectedAnnouncement.expiresAt
                        )}
                      </p>

                    </div>
                  )}

                </div>

              </div>

              {/* =================================================
                  MODAL FOOTER
                  ================================================= */}
              <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-3">

                <button
                  type="button"
                  onClick={
                    closeAnnouncement
                  }
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Close
                </button>

              </div>

            </div>
          </div>
        )}
    </>
  );
};

export default RequestAnnouncements;