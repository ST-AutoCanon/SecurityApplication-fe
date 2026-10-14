// // import { useEffect, useMemo, useState } from "react";
// // import axios from "axios";
// // import {
// //   AlertCircle,
// //   Bell,
// //   CalendarDays,
// //   ChevronLeft,
// //   ChevronRight,
// //   Clock,
// //   ExternalLink,
// //   Info,
// //   RefreshCw,
// //   X,
// // } from "lucide-react";

// // const API = import.meta.env.VITE_BACKEND_URL;

// // const ANNOUNCEMENT_API =
// //   `${API}/api/user-dashboard/announcements`;

// // const BATCH_SIZE = 3;
// // const ROTATION_INTERVAL = 4000;

// // /* =========================================================
// //    TYPES
// //    ========================================================= */

// // type Priority =
// //   | "Important"
// //   | "Notice"
// //   | "General";

// // type Announcement = {
// //   id: number;
// //   title: string;
// //   message: string;
// //   priority: Priority;

// //   created_at?: string | null;
// //   createdAt?: string | null;

// //   starts_at?: string | null;
// //   startsAt?: string | null;

// //   start_date?: string | null;
// //   startDate?: string | null;

// //   expires_at?: string | null;
// //   expiresAt?: string | null;

// //   expiry_date?: string | null;
// //   expiryDate?: string | null;

// //   is_active?: boolean;
// // };

// // // type AnnouncementBlock =
// // //   | {
// // //       type: "text";
// // //       content?: string;
// // //     }
// // //   | {
// // //       type: "image";
// // //       url?: string;
// // //       alt?: string;
// // //     }
// // //   | {
// // //       type: "logo";
// // //       url?: string;
// // //       alt?: string;
// // //     }
// // //   | {
// // //       type: "button";
// // //       text?: string;
// // //       url?: string;
// // //     }
// // //   | {
// // //       type: "divider";
// // //     };

// // type AnnouncementBlock =
// //   | {
// //     type: "text";
// //     text?: string;
// //     content?: string;
// //     color?: string;
// //     backgroundColor?: string;
// //     fontSize?: number;
// //     fontWeight?: "normal" | "bold";
// //     fontStyle?: "normal" | "italic";
// //     textAlign?: "left" | "center" | "right";
// //     fontFamily?: string;
// //   }
// //   | { type: "image"; url?: string; alt?: string }
// //   | { type: "logo"; url?: string; alt?: string }
// //   | { type: "button"; text?: string; url?: string }
// //   | { type: "divider" };
// // /* =========================================================
// //    PRIORITY STYLES
// //    ========================================================= */

// // const priorityStyles: Record<
// //   Priority,
// //   {
// //     badge: string;
// //     icon: string;
// //     border: string;
// //     bg: string;
// //   }
// // > = {
// //   Important: {
// //     badge:
// //       "bg-red-100 text-red-700",
// //     icon: "text-red-600",
// //     border:
// //       "border-red-200",
// //     bg: "bg-red-50",
// //   },

// //   Notice: {
// //     badge:
// //       "bg-blue-100 text-blue-700",
// //     icon: "text-blue-600",
// //     border:
// //       "border-blue-200",
// //     bg: "bg-blue-50",
// //   },

// //   General: {
// //     badge:
// //       "bg-slate-100 text-slate-700",
// //     icon: "text-slate-600",
// //     border:
// //       "border-slate-200",
// //     bg: "bg-slate-50",
// //   },
// // };

// // /* =========================================================
// //    DATE HELPERS
// //    ========================================================= */

// // /*
// //  * IMPORTANT:
// //  *
// //  * We extract YYYY-MM-DD directly from the value.
// //  *
// //  * We do NOT do:
// //  *
// //  * new Date(value).toISOString()
// //  *
// //  * because that can shift a date by one day depending
// //  * on timezone.
// //  */
// // const getDateOnly = (
// //   value?: string | null
// // ): string | null => {
// //   if (!value) {
// //     return null;
// //   }

// //   const valueString =
// //     String(value).trim();

// //   const match =
// //     valueString.match(
// //       /^(\d{4})-(\d{2})-(\d{2})/
// //     );

// //   if (match) {
// //     return `${match[1]}-${match[2]}-${match[3]}`;
// //   }

// //   /*
// //    * Handles values such as:
// //    *
// //    * 06/10/2026
// //    *
// //    * if they happen to come from an API.
// //    */
// //   const slashMatch =
// //     valueString.match(
// //       /^(\d{2})\/(\d{2})\/(\d{4})/
// //     );

// //   if (slashMatch) {
// //     return `${slashMatch[3]}-${slashMatch[2]}-${slashMatch[1]}`;
// //   }

// //   return null;
// // };


// // /* =========================================================
// //    TODAY
// //    ========================================================= */

// // const getTodayDateOnly = (): string => {
// //   const today = new Date();

// //   return [
// //     today.getFullYear(),
// //     String(
// //       today.getMonth() + 1
// //     ).padStart(2, "0"),
// //     String(
// //       today.getDate()
// //     ).padStart(2, "0"),
// //   ].join("-");
// // };


// // /* =========================================================
// //    START DATE
// //    ========================================================= */

// // const getStartDate = (
// //   announcement: Announcement
// // ): string | null => {
// //   /*
// //    * Backend currently returns starts_at.
// //    *
// //    * The other names are retained so this works even if
// //    * the API serializer returns camelCase.
// //    */
// //   return (
// //     announcement.starts_at ??
// //     announcement.startsAt ??
// //     announcement.start_date ??
// //     announcement.startDate ??
// //     null
// //   );
// // };


// // /* =========================================================
// //    EXPIRY DATE
// //    ========================================================= */

// // const getExpiryDate = (
// //   announcement: Announcement
// // ): string | null => {
// //   return (
// //     announcement.expires_at ??
// //     announcement.expiresAt ??
// //     announcement.expiry_date ??
// //     announcement.expiryDate ??
// //     null
// //   );
// // };


// // /* =========================================================
// //    USER VISIBILITY CHECK
// //    ========================================================= */

// // const isAnnouncementCurrentlyValid = (
// //   announcement: Announcement
// // ): boolean => {
// //   if (
// //     announcement.is_active === false
// //   ) {
// //     return false;
// //   }

// //   const today =
// //     getTodayDateOnly();

// //   const startDate =
// //     getDateOnly(
// //       getStartDate(announcement)
// //     );

// //   const expiryDate =
// //     getDateOnly(
// //       getExpiryDate(announcement)
// //     );

// //   /*
// //    * Future announcement:
// //    *
// //    * Start = 2026-10-07
// //    * Today = 2026-10-06
// //    *
// //    * 07 > 06 => HIDE
// //    */
// //   if (
// //     startDate &&
// //     startDate > today
// //   ) {
// //     return false;
// //   }

// //   /*
// //    * Expired announcement:
// //    *
// //    * Expiry = 2026-10-05
// //    * Today = 2026-10-06
// //    *
// //    * 05 < 06 => HIDE
// //    */
// //   if (
// //     expiryDate &&
// //     expiryDate < today
// //   ) {
// //     return false;
// //   }

// //   /*
// //    * Otherwise:
// //    *
// //    * start <= today
// //    *
// //    * and
// //    *
// //    * expiry >= today
// //    *
// //    * => SHOW
// //    */
// //   return true;
// // };


// // /* =========================================================
// //    FORMAT DATE
// //    ========================================================= */

// // const formatDate = (
// //   value?: string | null
// // ): string => {
// //   const dateOnly =
// //     getDateOnly(value);

// //   if (!dateOnly) {
// //     return "—";
// //   }

// //   const [
// //     year,
// //     month,
// //     day,
// //   ] = dateOnly
// //     .split("-")
// //     .map(Number);

// //   const date = new Date(
// //     year,
// //     month - 1,
// //     day
// //   );

// //   return date.toLocaleDateString(
// //     "en-IN",
// //     {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     }
// //   );
// // };


// // /* =========================================================
// //    MESSAGE BLOCK PARSER
// //    ========================================================= */

// // const getAnnouncementBlocks = (
// //   message: string
// // ): AnnouncementBlock[] | null => {
// //   if (!message) {
// //     return null;
// //   }

// //   try {
// //     const parsed =
// //       JSON.parse(message);

// //     if (
// //       Array.isArray(parsed) &&
// //       parsed.every(
// //         (item) =>
// //           item &&
// //           typeof item ===
// //           "object" &&
// //           typeof item.type ===
// //           "string"
// //       )
// //     ) {
// //       return parsed;
// //     }

// //     if (
// //       parsed &&
// //       typeof parsed ===
// //       "object" &&
// //       Array.isArray(
// //         parsed.blocks
// //       )
// //     ) {
// //       return parsed.blocks;
// //     }

// //     return null;
// //   } catch {
// //     return null;
// //   }
// // };


// // /* =========================================================
// //    ANNOUNCEMENT CONTENT
// //    ========================================================= */

// // const AnnouncementContent = ({
// //   message,
// // }: {
// //   message: string;
// // }) => {
// //   const blocks =
// //     getAnnouncementBlocks(
// //       message
// //     );

// //   if (!blocks) {
// //     return (
// //       <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
// //         {message}
// //       </p>
// //     );
// //   }

// //   return (
// //     <div className="space-y-3">
// //       {blocks.map(
// //         (block, index) => {
// //           // if (
// //           //   block.type ===
// //           //   "text"
// //           // ) {
// //           //   return (
// //           //     <p
// //           //       key={index}
// //           //       className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600"
// //           //     >
// //           //       {block.content ||
// //           //         ""}
// //           //     </p>
// //           //   );
// //           // }
// // if (block.type === "text") {
// //   const text =
// //     block.text ??
// //     block.content ??
// //     "";

// //   if (!text) {
// //     return null;
// //   }

// //   return (
// //     <div
// //       key={index}
// //       className="whitespace-pre-wrap break-words text-sm leading-6"
// //       style={{
// //         color: block.color || "#475569",
// //         backgroundColor:
// //           block.backgroundColor &&
// //           block.backgroundColor !== "transparent"
// //             ? block.backgroundColor
// //             : undefined,
// //         fontSize: block.fontSize
// //           ? `${block.fontSize}px`
// //           : undefined,
// //         fontWeight:
// //           block.fontWeight || "normal",
// //         fontStyle:
// //           block.fontStyle || "normal",
// //         textAlign:
// //           block.textAlign || "left",
// //         fontFamily:
// //           block.fontFamily || "Arial",
// //       }}
// //     >
// //       {/<[a-z][\s\S]*>/i.test(text) ? (
// //         <span
// //           dangerouslySetInnerHTML={{
// //             __html: text,
// //           }}
// //         />
// //       ) : (
// //         text
// //       )}
// //     </div>
// //   );
// // }
// //           if (
// //             block.type ===
// //             "image" ||
// //             block.type ===
// //             "logo"
// //           ) {
// //             return null;
// //           }

// //           if (
// //             block.type ===
// //             "divider"
// //           ) {
// //             return (
// //               <hr
// //                 key={index}
// //                 className="border-slate-200"
// //               />
// //             );
// //           }

// //           if (
// //             block.type ===
// //             "button"
// //           ) {
// //             if (
// //               !block.url
// //             ) {
// //               return null;
// //             }

// //             return (
// //               <a
// //                 key={index}
// //                 href={
// //                   block.url
// //                 }
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
// //               >
// //                 {block.text ||
// //                   "Open Link"}

// //                 <ExternalLink
// //                   size={14}
// //                 />
// //               </a>
// //             );
// //           }

// //           return null;
// //         }
// //       )}
// //     </div>
// //   );
// // };


// // /* =========================================================
// //    MAIN COMPONENT
// //    ========================================================= */

// // const Announcements =
// //   () => {
// //     const [
// //       announcements,
// //       setAnnouncements,
// //     ] = useState<
// //       Announcement[]
// //     >([]);

// //     const [
// //       loading,
// //       setLoading,
// //     ] = useState(true);

// //     const [
// //       refreshing,
// //       setRefreshing,
// //     ] = useState(false);

// //     const [
// //       error,
// //       setError,
// //     ] = useState("");

// //     const [
// //       selectedAnnouncement,
// //       setSelectedAnnouncement,
// //     ] =
// //       useState<Announcement | null>(
// //         null
// //       );

// //     const [
// //       currentBatchIndex,
// //       setCurrentBatchIndex,
// //     ] = useState(0);

// //     const [
// //       lastUpdated,
// //       setLastUpdated,
// //     ] =
// //       useState<Date | null>(
// //         null
// //       );

// //     const [
// //       isHovered,
// //       setIsHovered,
// //     ] = useState(false);


// //     /* =======================================================
// //        FETCH
// //        ======================================================= */

// //     const fetchAnnouncements =
// //       async (
// //         silent = false
// //       ) => {
// //         try {
// //           if (!silent) {
// //             setLoading(true);
// //           } else {
// //             setRefreshing(true);
// //           }

// //           const response =
// //             await axios.get(
// //               ANNOUNCEMENT_API,
// //               {
// //                 withCredentials:
// //                   true,
// //               }
// //             );

// //           const data =
// //             response.data?.data;

// //           const fetchedAnnouncements =
// //             Array.isArray(data)
// //               ? data
// //               : [];

// //           /*
// //            * ALWAYS apply the date filter here.
// //            *
// //            * This is the important fix.
// //            */
// //           const validAnnouncements =
// //             fetchedAnnouncements.filter(
// //               (
// //                 announcement
// //               ) =>
// //                 isAnnouncementCurrentlyValid(
// //                   announcement
// //                 )
// //             );

// //           setAnnouncements(
// //             validAnnouncements
// //           );

// //           /*
// //            * Whenever fresh data arrives,
// //            * restart from first batch.
// //            */
// //           setCurrentBatchIndex(
// //             0
// //           );

// //           setLastUpdated(
// //             new Date()
// //           );

// //           setError("");
// //         } catch (err) {
// //           console.error(
// //             "Failed to fetch announcements:",
// //             err
// //           );

// //           if (!silent) {
// //             setError(
// //               "Failed to load announcements"
// //             );
// //           }
// //         } finally {
// //           if (!silent) {
// //             setLoading(false);
// //           }

// //           setRefreshing(false);
// //         }
// //       };


// //     /* =======================================================
// //        INITIAL LOAD
// //        ======================================================= */

// //     useEffect(() => {
// //       fetchAnnouncements();
// //     }, []);


// //     /* =======================================================
// //        AUTOMATIC DATE REFRESH
       
// //        This is important for future announcements.
       
// //        Example:
       
// //        Oct 6:
// //        Start Oct 7 -> hidden
       
// //        Oct 7:
// //        automatic refresh -> fetched -> visible
// //        ======================================================= */

// //     useEffect(() => {
// //       const timer =
// //         window.setInterval(
// //           () => {
// //             fetchAnnouncements(
// //               true
// //             );
// //           },
// //           60 * 1000
// //         );

// //       return () => {
// //         window.clearInterval(
// //           timer
// //         );
// //       };
// //     }, []);


// //     /* =======================================================
// //        REFRESH WHEN USER RETURNS TO TAB
// //        ======================================================= */

// //     useEffect(() => {
// //       const handleVisibility =
// //         () => {
// //           if (
// //             document.visibilityState ===
// //             "visible"
// //           ) {
// //             fetchAnnouncements(
// //               true
// //             );
// //           }
// //         };

// //       document.addEventListener(
// //         "visibilitychange",
// //         handleVisibility
// //       );

// //       return () => {
// //         document.removeEventListener(
// //           "visibilitychange",
// //           handleVisibility
// //         );
// //       };
// //     }, []);


// //     /* =======================================================
// //        SECONDARY FRONTEND FILTER
// //        ======================================================= */

// //     const validAnnouncements =
// //       useMemo(() => {
// //         return announcements.filter(
// //           isAnnouncementCurrentlyValid
// //         );
// //       }, [announcements]);


// //     /* =======================================================
// //        BATCHES
// //        ======================================================= */

// //     const totalBatches =
// //       Math.ceil(
// //         validAnnouncements.length /
// //         BATCH_SIZE
// //       );

// //     const currentBatch =
// //       useMemo(() => {
// //         const start =
// //           currentBatchIndex *
// //           BATCH_SIZE;

// //         return validAnnouncements.slice(
// //           start,
// //           start + BATCH_SIZE
// //         );
// //       }, [
// //         validAnnouncements,
// //         currentBatchIndex,
// //       ]);


// //     /* =======================================================
// //        KEEP INDEX VALID
// //        ======================================================= */

// //     useEffect(() => {
// //       if (
// //         totalBatches === 0 ||
// //         currentBatchIndex >=
// //         totalBatches
// //       ) {
// //         setCurrentBatchIndex(
// //           0
// //         );
// //       }
// //     }, [
// //       totalBatches,
// //       currentBatchIndex,
// //     ]);


// //     /* =======================================================
// //        ROTATION
// //        ======================================================= */

// //     useEffect(() => {
// //       if (
// //         totalBatches <= 1 ||
// //         isHovered ||
// //         selectedAnnouncement
// //       ) {
// //         return;
// //       }

// //       const timer =
// //         window.setInterval(
// //           () => {
// //             setCurrentBatchIndex(
// //               (previous) =>
// //                 (previous + 1) %
// //                 totalBatches
// //             );
// //           },
// //           ROTATION_INTERVAL
// //         );

// //       return () => {
// //         window.clearInterval(
// //           timer
// //         );
// //       };
// //     }, [
// //       totalBatches,
// //       isHovered,
// //       selectedAnnouncement,
// //     ]);


// //     /* =======================================================
// //        NAVIGATION
// //        ======================================================= */

// //     const goToPreviousBatch =
// //       () => {
// //         if (
// //           totalBatches <= 1
// //         ) {
// //           return;
// //         }

// //         setCurrentBatchIndex(
// //           (previous) =>
// //             previous === 0
// //               ? totalBatches - 1
// //               : previous - 1
// //         );
// //       };


// //     const goToNextBatch =
// //       () => {
// //         if (
// //           totalBatches <= 1
// //         ) {
// //           return;
// //         }

// //         setCurrentBatchIndex(
// //           (previous) =>
// //             (previous + 1) %
// //             totalBatches
// //         );
// //       };


// //     /* =======================================================
// //        RANGE
// //        ======================================================= */

// //     const rangeStart =
// //       validAnnouncements.length ===
// //         0
// //         ? 0
// //         : currentBatchIndex *
// //         BATCH_SIZE +
// //         1;

// //     const rangeEnd =
// //       Math.min(
// //         (currentBatchIndex + 1) *
// //         BATCH_SIZE,
// //         validAnnouncements.length
// //       );


// //     /* =======================================================
// //        REFRESH
// //        ======================================================= */

// //     const handleRefresh =
// //       async () => {
// //         await fetchAnnouncements(
// //           true
// //         );
// //       };


// //     /* =======================================================
// //        LOADING
// //        ======================================================= */

// //     if (loading) {
// //       return (
// //         <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
// //           <div className="flex items-center gap-3">
// //             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
// //               <Bell
// //                 size={20}
// //                 className="text-blue-600"
// //               />
// //             </div>

// //             <div>
// //               <h2 className="text-lg font-semibold text-slate-800">
// //                 Announcements
// //               </h2>

// //               <p className="text-xs text-slate-400">
// //                 Loading latest announcements...
// //               </p>
// //             </div>
// //           </div>
// //         </section>
// //       );
// //     }


// //     /* =======================================================
// //        ERROR
// //        ======================================================= */

// //     if (error) {
// //       return (
// //         <section className="w-full rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
// //           <div className="flex items-start gap-3">
// //             <AlertCircle
// //               size={20}
// //               className="mt-1 text-red-600"
// //             />

// //             <div>
// //               <h2 className="text-lg font-semibold text-slate-800">
// //                 Announcements
// //               </h2>

// //               <p className="mt-1 text-sm text-red-600">
// //                 {error}
// //               </p>

// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   fetchAnnouncements()
// //                 }
// //                 className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
// //               >
// //                 Try Again
// //               </button>
// //             </div>
// //           </div>
// //         </section>
// //       );
// //     }


// //     /* =======================================================
// //        EMPTY
// //        ======================================================= */

// //     if (
// //       validAnnouncements.length ===
// //       0
// //     ) {
// //       return (
// //         <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
// //           <div className="flex items-center justify-between gap-3">
// //             <div className="flex items-center gap-3">
// //               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
// //                 <Bell
// //                   size={20}
// //                   className="text-blue-600"
// //                 />
// //               </div>

// //               <div>
// //                 <h2 className="text-lg font-semibold text-slate-800">
// //                   Announcements
// //                 </h2>

// //                 <p className="text-xs text-slate-400">
// //                   No current announcements
// //                 </p>
// //               </div>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={
// //                 handleRefresh
// //               }
// //               disabled={refreshing}
// //               className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
// //               title="Refresh announcements"
// //             >
// //               <RefreshCw
// //                 size={17}
// //                 className={
// //                   refreshing
// //                     ? "animate-spin"
// //                     : ""
// //                 }
// //               />
// //             </button>
// //           </div>

// //           {lastUpdated && (
// //             <div className="mt-3 text-right text-[11px] text-slate-400">
// //               Updated{" "}
// //               {lastUpdated.toLocaleTimeString(
// //                 "en-IN",
// //                 {
// //                   hour: "2-digit",
// //                   minute:
// //                     "2-digit",
// //                 }
// //               )}
// //             </div>
// //           )}
// //         </section>
// //       );
// //     }


// //     /* =======================================================
// //        MAIN UI
// //        ======================================================= */

// //     return (
// //       <>
// //         <section
// //           className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
// //           onMouseEnter={() =>
// //             setIsHovered(true)
// //           }
// //           onMouseLeave={() =>
// //             setIsHovered(false)
// //           }
// //         >
// //           {/* HEADER */}

// //           <div className="mb-4 flex items-center justify-between gap-3">
// //             <div className="flex min-w-0 items-center gap-3">
// //               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
// //                 <Bell
// //                   size={20}
// //                   className="text-blue-600"
// //                 />
// //               </div>

// //               <div className="min-w-0">
// //                 <h2 className="text-lg font-semibold text-slate-800">
// //                   Announcements
// //                 </h2>

// //                 <p className="text-xs text-slate-400">
// //                   Important information
// //                   and updates
// //                 </p>
// //               </div>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={
// //                 handleRefresh
// //               }
// //               disabled={refreshing}
// //               title="Refresh announcements"
// //               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
// //             >
// //               <RefreshCw
// //                 size={17}
// //                 className={
// //                   refreshing
// //                     ? "animate-spin"
// //                     : ""
// //                 }
// //               />
// //             </button>
// //           </div>


// //           {/* ANNOUNCEMENTS */}

// //           <div className="space-y-3">
// //             {currentBatch.map(
// //               (announcement) => {
// //                 const priority =
// //                   priorityStyles[
// //                   announcement.priority
// //                   ] ||
// //                   priorityStyles.General;

// //                 const startDate =
// //                   getStartDate(
// //                     announcement
// //                   );

// //                 const expiryDate =
// //                   getExpiryDate(
// //                     announcement
// //                   );

// //                 return (
// //                   <div
// //                     key={
// //                       announcement.id
// //                     }
// //                     className={`w-full rounded-xl border ${priority.border} ${priority.bg} p-4 transition hover:shadow-sm`}
// //                   >
// //                     <div className="flex items-start gap-3">

// //                       {/* ICON */}

// //                       <div
// //                         className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ${priority.icon}`}
// //                       >
// //                         {announcement.priority ===
// //                           "Important" ? (
// //                           <AlertCircle
// //                             size={18}
// //                           />
// //                         ) : announcement.priority ===
// //                           "Notice" ? (
// //                           <Info
// //                             size={18}
// //                           />
// //                         ) : (
// //                           <Bell
// //                             size={18}
// //                           />
// //                         )}
// //                       </div>


// //                       {/* CONTENT */}

// //                       <div className="min-w-0 flex-1">
// //                         <div className="flex flex-wrap items-start justify-between gap-2">
// //                           <h3 className="min-w-0 break-words text-sm font-semibold text-slate-800">
// //                             {
// //                               announcement.title
// //                             }
// //                           </h3>

// //                           <span
// //                             className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${priority.badge}`}
// //                           >
// //                             {
// //                               announcement.priority
// //                             }
// //                           </span>
// //                         </div>


// //                         {/* MESSAGE */}

// //                         {/* <div className="mt-2">
// //                           <AnnouncementContent
// //                             message={
// //                               announcement.message
// //                             }
// //                           />
// //                         </div> */}


// //                         {/* DATES */}

// //                         <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/70 pt-3">

// //                           {/* START */}

// //                           <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
// //                             <CalendarDays
// //                               size={13}
// //                               className="shrink-0 text-blue-500"
// //                             />

// //                             <span>
// //                               Start:{" "}
// //                               <span className="font-semibold text-slate-700">
// //                                 {startDate
// //                                   ? formatDate(
// //                                     startDate
// //                                   )
// //                                   : "Immediately"}
// //                               </span>
// //                             </span>
// //                           </div>


// //                           {/* EXPIRY */}

// //                           <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
// //                             <Clock
// //                               size={13}
// //                               className="shrink-0 text-slate-500"
// //                             />

// //                             <span>
// //                               Until:{" "}
// //                               <span className="font-semibold text-slate-700">
// //                                 {expiryDate
// //                                   ? formatDate(
// //                                     expiryDate
// //                                   )
// //                                   : "No expiry"}
// //                               </span>
// //                             </span>
// //                           </div>
// //                         </div>


// //                         {/* VIEW */}

// //                         <div className="mt-3">
// //                           <button
// //                             type="button"
// //                             onClick={() =>
// //                               setSelectedAnnouncement(
// //                                 announcement
// //                               )
// //                             }
// //                             className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
// //                           >
// //                             View Details
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               }
// //             )}
// //           </div>


// //           {/* FOOTER */}

// //           <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">

// //             <div className="shrink-0 text-xs text-slate-400">
// //               {rangeStart}–
// //               {rangeEnd} of{" "}
// //               {
// //                 validAnnouncements.length
// //               }
// //             </div>


// //             {totalBatches >
// //               1 && (
// //                 <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
// //                   {Array.from({
// //                     length:
// //                       totalBatches,
// //                   }).map(
// //                     (_, index) => (
// //                       <button
// //                         key={
// //                           index
// //                         }
// //                         type="button"
// //                         onClick={() =>
// //                           setCurrentBatchIndex(
// //                             index
// //                           )
// //                         }
// //                         className={`h-1.5 rounded-full transition-all ${index ===
// //                             currentBatchIndex
// //                             ? "w-5 bg-blue-600"
// //                             : "w-1.5 bg-slate-300"
// //                           }`}
// //                       />
// //                     )
// //                   )}
// //                 </div>
// //               )}


// //             {totalBatches >
// //               1 && (
// //                 <div className="flex shrink-0 gap-1">
// //                   <button
// //                     type="button"
// //                     onClick={
// //                       goToPreviousBatch
// //                     }
// //                     className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600"
// //                   >
// //                     <ChevronLeft
// //                       size={16}
// //                     />
// //                   </button>

// //                   <button
// //                     type="button"
// //                     onClick={
// //                       goToNextBatch
// //                     }
// //                     className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600"
// //                   >
// //                     <ChevronRight
// //                       size={16}
// //                     />
// //                   </button>
// //                 </div>
// //               )}
// //           </div>


// //           {lastUpdated && (
// //             <div className="mt-2 text-right text-[10px] text-slate-400">
// //               Last updated{" "}
// //               {lastUpdated.toLocaleTimeString(
// //                 "en-IN",
// //                 {
// //                   hour: "2-digit",
// //                   minute:
// //                     "2-digit",
// //                   second:
// //                     "2-digit",
// //                 }
// //               )}
// //             </div>
// //           )}
// //         </section>


// //         {/* =================================================
// //             VIEW DETAILS MODAL
// //            ================================================= */}

// //         {selectedAnnouncement && (
// //           <div
// //             className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
// //             onClick={() =>
// //               setSelectedAnnouncement(
// //                 null
// //               )
// //             }
// //           >
// //             <div
// //               className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
// //               onClick={(event) =>
// //                 event.stopPropagation()
// //               }
// //             >

// //               {/* HEADER */}

// //               <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
// //                 <div className="flex min-w-0 items-start gap-3">
// //                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
// //                     <Bell
// //                       size={20}
// //                       className="text-blue-600"
// //                     />
// //                   </div>

// //                   <div className="min-w-0">
// //                     <h2 className="break-words text-lg font-semibold text-slate-800">
// //                       {
// //                         selectedAnnouncement.title
// //                       }
// //                     </h2>

// //                     <span
// //                       className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${(
// //                           priorityStyles[
// //                           selectedAnnouncement
// //                             .priority
// //                           ] ||
// //                           priorityStyles.General
// //                         ).badge
// //                         }`}
// //                     >
// //                       {
// //                         selectedAnnouncement.priority
// //                       }
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <button
// //                   type="button"
// //                   onClick={() =>
// //                     setSelectedAnnouncement(
// //                       null
// //                     )
// //                   }
// //                   className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
// //                 >
// //                   <X size={18} />
// //                 </button>
// //               </div>


// //               {/* BODY */}

// //               <div className="p-5">
// //                 <AnnouncementContent
// //                   message={
// //                     selectedAnnouncement.message
// //                   }
// //                 />

// //                 <div className="mt-6 grid gap-3 sm:grid-cols-2">

// //                   {/* START */}

// //                   <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
// //                     <div className="flex items-center gap-2 text-xs text-slate-500">
// //                       <CalendarDays
// //                         size={15}
// //                       />

// //                       <span>
// //                         Start Date
// //                       </span>
// //                     </div>

// //                     <p className="mt-1 text-sm font-semibold text-slate-700">
// //                       {getStartDate(
// //                         selectedAnnouncement
// //                       )
// //                         ? formatDate(
// //                           getStartDate(
// //                             selectedAnnouncement
// //                           )
// //                         )
// //                         : "Immediately"}
// //                     </p>
// //                   </div>


// //                   {/* EXPIRY */}

// //                   <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
// //                     <div className="flex items-center gap-2 text-xs text-slate-500">
// //                       <Clock
// //                         size={15}
// //                       />

// //                       <span>
// //                         Expiry Date
// //                       </span>
// //                     </div>

// //                     <p className="mt-1 text-sm font-semibold text-slate-700">
// //                       {getExpiryDate(
// //                         selectedAnnouncement
// //                       )
// //                         ? formatDate(
// //                           getExpiryDate(
// //                             selectedAnnouncement
// //                           )
// //                         )
// //                         : "No expiry"}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>


// //               {/* FOOTER */}

// //               <div className="flex justify-end border-t border-slate-200 p-4">
// //                 <button
// //                   type="button"
// //                   onClick={() =>
// //                     setSelectedAnnouncement(
// //                       null
// //                     )
// //                   }
// //                   className="rounded-lg bg-slate-800 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg
// //  hover:bg-slate-900"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </>
// //     );
// //   };

// // export default Announcements;
// import { useEffect, useMemo, useRef, useState } from "react";
// import axios from "axios";
// import {
//   AlertCircle,
//   Bell,
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   ExternalLink,
//   Info,
//   RefreshCw,
//   X,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;
// const ANNOUNCEMENT_API = `${API}/api/user-dashboard/announcements`;

// const BATCH_SIZE = 3;
// const ROTATION_INTERVAL = 4000;
// const REFRESH_INTERVAL = 60 * 1000;
// const NEW_ANNOUNCEMENT_HIGHLIGHT_MS = 24 * 60 * 60 * 1000;

// /* =========================================================
//    TYPES
//    ========================================================= */

// type Priority = "Important" | "Notice" | "General";

// type Announcement = {
//   id: number;
//   title: string;
//   message: string;
//   priority: Priority | string;

//   created_at?: string | null;
//   createdAt?: string | null;

//   starts_at?: string | null;
//   startsAt?: string | null;

//   start_date?: string | null;
//   startDate?: string | null;

//   expires_at?: string | null;
//   expiresAt?: string | null;

//   expiry_date?: string | null;
//   expiryDate?: string | null;

//   is_active?: boolean;
// };

// type AnnouncementBlock =
//   | {
//       type: "text";
//       text?: string;
//       content?: string;
//       color?: string;
//       backgroundColor?: string;
//       fontSize?: number;
//       fontWeight?: "normal" | "bold";
//       fontStyle?: "normal" | "italic";
//       textAlign?: "left" | "center" | "right";
//       fontFamily?: string;
//     }
//   | { type: "image"; url?: string; alt?: string }
//   | { type: "logo"; url?: string; alt?: string }
//   | { type: "button"; text?: string; url?: string }
//   | { type: "divider" };

// /* =========================================================
//    PRIORITY STYLES
//    ========================================================= */

// const priorityStyles: Record<
//   "Important" | "Notice" | "General",
//   {
//     badge: string;
//     icon: string;
//     border: string;
//     bg: string;
//   }
// > = {
//   Important: {
//     badge: "bg-red-100 text-red-700",
//     icon: "text-red-600",
//     border: "border-red-200",
//     bg: "bg-red-50",
//   },
//   Notice: {
//     badge: "bg-blue-100 text-blue-700",
//     icon: "text-blue-600",
//     border: "border-blue-200",
//     bg: "bg-blue-50",
//   },
//   General: {
//     badge: "bg-slate-100 text-slate-700",
//     icon: "text-slate-600",
//     border: "border-slate-200",
//     bg: "bg-slate-50",
//   },
// };

// const getPriority = (
//   priority?: string | null
// ): "Important" | "Notice" | "General" => {
//   const normalized = (priority || "").trim().toLowerCase();

//   if (normalized === "important") return "Important";
//   if (normalized === "notice") return "Notice";

//   return "General";
// };

// /* =========================================================
//    DATE HELPERS
//    ========================================================= */

// const getDateOnly = (value?: string | null): string | null => {
//   if (!value) return null;

//   const valueString = String(value).trim();

//   const match = valueString.match(/^(\d{4})-(\d{2})-(\d{2})/);

//   if (match) {
//     return `${match[1]}-${match[2]}-${match[3]}`;
//   }

//   const slashMatch = valueString.match(
//     /^(\d{2})\/(\d{2})\/(\d{4})/
//   );

//   if (slashMatch) {
//     return `${slashMatch[3]}-${slashMatch[2]}-${slashMatch[1]}`;
//   }

//   return null;
// };

// const getTodayDateOnly = (): string => {
//   const today = new Date();

//   return [
//     today.getFullYear(),
//     String(today.getMonth() + 1).padStart(2, "0"),
//     String(today.getDate()).padStart(2, "0"),
//   ].join("-");
// };

// const getStartDate = (
//   announcement: Announcement
// ): string | null => {
//   return (
//     announcement.starts_at ??
//     announcement.startsAt ??
//     announcement.start_date ??
//     announcement.startDate ??
//     null
//   );
// };

// const getExpiryDate = (
//   announcement: Announcement
// ): string | null => {
//   return (
//     announcement.expires_at ??
//     announcement.expiresAt ??
//     announcement.expiry_date ??
//     announcement.expiryDate ??
//     null
//   );
// };

// const getCreatedDate = (
//   announcement: Announcement
// ): string | null => {
//   return announcement.created_at ?? announcement.createdAt ?? null;
// };

// /* =========================================================
//    USER VISIBILITY CHECK
//    ========================================================= */

// const isAnnouncementCurrentlyValid = (
//   announcement: Announcement
// ): boolean => {
//   if (announcement.is_active === false) {
//     return false;
//   }

//   const today = getTodayDateOnly();

//   const startDate = getDateOnly(getStartDate(announcement));
//   const expiryDate = getDateOnly(getExpiryDate(announcement));

//   if (startDate && startDate > today) {
//     return false;
//   }

//   if (expiryDate && expiryDate < today) {
//     return false;
//   }

//   return true;
// };

// /* =========================================================
//    FORMAT DATE
//    ========================================================= */

// const formatDate = (value?: string | null): string => {
//   const dateOnly = getDateOnly(value);

//   if (!dateOnly) return "—";

//   const [year, month, day] = dateOnly.split("-").map(Number);

//   const date = new Date(year, month - 1, day);

//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// /* =========================================================
//    MESSAGE BLOCK PARSER
//    ========================================================= */

// const getAnnouncementBlocks = (
//   message: string
// ): AnnouncementBlock[] | null => {
//   if (!message) return null;

//   try {
//     const parsed = JSON.parse(message);

//     if (
//       Array.isArray(parsed) &&
//       parsed.every(
//         (item) =>
//           item &&
//           typeof item === "object" &&
//           typeof item.type === "string"
//       )
//     ) {
//       return parsed;
//     }

//     if (
//       parsed &&
//       typeof parsed === "object" &&
//       Array.isArray(parsed.blocks)
//     ) {
//       return parsed.blocks;
//     }

//     return null;
//   } catch {
//     return null;
//   }
// };

// /* =========================================================
//    ANNOUNCEMENT CONTENT
//    ========================================================= */

// const AnnouncementContent = ({
//   message,
// }: {
//   message: string;
// }) => {
//   const blocks = getAnnouncementBlocks(message);

//   if (!blocks) {
//     return (
//       <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
//         {message}
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-3">
//       {blocks.map((block, index) => {
//         if (block.type === "text") {
//           const text = block.text ?? block.content ?? "";

//           if (!text) return null;

//           return (
//             <div
//               key={index}
//               className="whitespace-pre-wrap break-words text-sm leading-6"
//               style={{
//                 color: block.color || "#475569",
//                 backgroundColor:
//                   block.backgroundColor &&
//                   block.backgroundColor !== "transparent"
//                     ? block.backgroundColor
//                     : undefined,
//                 fontSize: block.fontSize
//                   ? `${block.fontSize}px`
//                   : undefined,
//                 fontWeight: block.fontWeight || "normal",
//                 fontStyle: block.fontStyle || "normal",
//                 textAlign: block.textAlign || "left",
//                 fontFamily: block.fontFamily || "Arial",
//               }}
//             >
//               {/<[a-z][\s\S]*>/i.test(text) ? (
//                 <span
//                   dangerouslySetInnerHTML={{
//                     __html: text,
//                   }}
//                 />
//               ) : (
//                 text
//               )}
//             </div>
//           );
//         }

//         if (block.type === "image" || block.type === "logo") {
//           if (!block.url) return null;

//           return (
//             <img
//               key={index}
//               src={block.url}
//               alt={block.alt || ""}
//               className="max-h-64 max-w-full rounded-lg object-contain"
//             />
//           );
//         }

//         if (block.type === "divider") {
//           return (
//             <hr key={index} className="border-slate-200" />
//           );
//         }

//         if (block.type === "button") {
//           if (!block.url) return null;

//           return (
//             <a
//               key={index}
//               href={block.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
//             >
//               {block.text || "Open Link"}
//               <ExternalLink size={14} />
//             </a>
//           );
//         }

//         return null;
//       })}
//     </div>
//   );
// };

// /* =========================================================
//    MAIN COMPONENT
//    ========================================================= */

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState("");

//   const [selectedAnnouncement, setSelectedAnnouncement] =
//     useState<Announcement | null>(null);

//   const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
//   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
//   const [isHovered, setIsHovered] = useState(false);

//   // null means the first successful fetch has not happened yet.
//   const previousAnnouncementIds = useRef<Set<number> | null>(null);

//   // IDs to highlight as newly published.
//   const [newAnnouncementIds, setNewAnnouncementIds] =
//     useState<Set<number>>(new Set());

//   /* =======================================================
//      FETCH ANNOUNCEMENTS
//      ======================================================= */

//   const fetchAnnouncements = async (silent = false) => {
//     try {
//       if (!silent) {
//         setLoading(true);
//       } else {
//         setRefreshing(true);
//       }

//       const response = await axios.get(ANNOUNCEMENT_API, {
//         withCredentials: true,
//       });

//       const data = response.data?.data;

//       const fetchedAnnouncements: Announcement[] = Array.isArray(data)
//         ? data
//         : [];

//       const validAnnouncements = fetchedAnnouncements.filter(
//         isAnnouncementCurrentlyValid
//       );

//       const currentIds = new Set(
//         validAnnouncements.map((announcement) => announcement.id)
//       );

//       const previousIds = previousAnnouncementIds.current;

//       if (previousIds !== null) {
//         // Highlight records that have appeared since the previous fetch.
//         const addedIds = validAnnouncements
//           .filter((announcement) => !previousIds.has(announcement.id))
//           .map((announcement) => announcement.id);

//         if (addedIds.length > 0) {
//           setNewAnnouncementIds((previous) => {
//             const updated = new Set(previous);

//             addedIds.forEach((id) => updated.add(id));

//             return updated;
//           });

//           // Bring new announcements into view.
//           setCurrentBatchIndex(0);
//         }
//       } else {
//         // First load: highlight announcements created within 24 hours.
//         const recentIds = validAnnouncements
//           .filter((announcement) => {
//             const createdAt = getCreatedDate(announcement);

//             if (!createdAt) return false;

//             const createdTime = new Date(createdAt).getTime();
//             const age = Date.now() - createdTime;

//             return (
//               Number.isFinite(createdTime) &&
//               age >= 0 &&
//               age <= NEW_ANNOUNCEMENT_HIGHLIGHT_MS
//             );
//           })
//           .map((announcement) => announcement.id);

//         setNewAnnouncementIds(new Set(recentIds));
//       }

//       previousAnnouncementIds.current = currentIds;

//       setAnnouncements(validAnnouncements);
//       setLastUpdated(new Date());
//       setError("");
//     } catch (err) {
//       console.error("Failed to fetch announcements:", err);

//       if (!silent) {
//         setError("Failed to load announcements");
//       }
//     } finally {
//       if (!silent) {
//         setLoading(false);
//       }

//       setRefreshing(false);
//     }
//   };

//   /* =======================================================
//      INITIAL LOAD
//      ======================================================= */

//   useEffect(() => {
//     void fetchAnnouncements();
//   }, []);

//   /* =======================================================
//      AUTOMATIC REFRESH
//      ======================================================= */

//   useEffect(() => {
//     const timer = window.setInterval(() => {
//       void fetchAnnouncements(true);
//     }, REFRESH_INTERVAL);

//     return () => {
//       window.clearInterval(timer);
//     };
//   }, []);

//   /* =======================================================
//      REFRESH WHEN USER RETURNS TO TAB
//      ======================================================= */

//   useEffect(() => {
//     const handleVisibility = () => {
//       if (document.visibilityState === "visible") {
//         void fetchAnnouncements(true);
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibility);

//     return () => {
//       document.removeEventListener(
//         "visibilitychange",
//         handleVisibility
//       );
//     };
//   }, []);

//   /* =======================================================
//      SECONDARY FRONTEND FILTER
//      ======================================================= */

//   const validAnnouncements = useMemo(() => {
//     return announcements.filter(isAnnouncementCurrentlyValid);
//   }, [announcements]);

//   /* =======================================================
//      BATCHES
//      ======================================================= */

//   const totalBatches = Math.ceil(
//     validAnnouncements.length / BATCH_SIZE
//   );

//   const currentBatch = useMemo(() => {
//     const start = currentBatchIndex * BATCH_SIZE;

//     return validAnnouncements.slice(start, start + BATCH_SIZE);
//   }, [validAnnouncements, currentBatchIndex]);

//   /* =======================================================
//      KEEP INDEX VALID
//      ======================================================= */

//   useEffect(() => {
//     if (
//       totalBatches === 0 ||
//       currentBatchIndex >= totalBatches
//     ) {
//       setCurrentBatchIndex(0);
//     }
//   }, [totalBatches, currentBatchIndex]);

//   /* =======================================================
//      AUTOMATIC ROTATION
//      ======================================================= */

//   useEffect(() => {
//     if (
//       totalBatches <= 1 ||
//       isHovered ||
//       selectedAnnouncement
//     ) {
//       return;
//     }

//     const timer = window.setInterval(() => {
//       setCurrentBatchIndex((previous) => (previous + 1) % totalBatches);
//     }, ROTATION_INTERVAL);

//     return () => {
//       window.clearInterval(timer);
//     };
//   }, [totalBatches, isHovered, selectedAnnouncement]);

//   /* =======================================================
//      NAVIGATION
//      ======================================================= */

//   const goToPreviousBatch = () => {
//     if (totalBatches <= 1) return;

//     setCurrentBatchIndex((previous) =>
//       previous === 0 ? totalBatches - 1 : previous - 1
//     );
//   };

//   const goToNextBatch = () => {
//     if (totalBatches <= 1) return;

//     setCurrentBatchIndex((previous) => (previous + 1) % totalBatches);
//   };

//   /* =======================================================
//      RANGE
//      ======================================================= */

//   const rangeStart =
//     validAnnouncements.length === 0
//       ? 0
//       : currentBatchIndex * BATCH_SIZE + 1;

//   const rangeEnd = Math.min(
//     (currentBatchIndex + 1) * BATCH_SIZE,
//     validAnnouncements.length
//   );

//   /* =======================================================
//      REFRESH BUTTON
//      ======================================================= */

//   const handleRefresh = async () => {
//     await fetchAnnouncements(true);
//   };

//   /* =======================================================
//      LAST UPDATED DISPLAY
//      ======================================================= */

//   const lastUpdatedText = lastUpdated
//     ? lastUpdated.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//       })
//     : "";

//   /* =======================================================
//      LOADING
//      ======================================================= */

//   if (loading) {
//     return (
//       <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
//             <Bell size={20} className="text-blue-600" />
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-slate-800">
//               Announcements
//             </h2>
//             <p className="text-xs text-slate-400">
//               Loading latest announcements...
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   /* =======================================================
//      ERROR
//      ======================================================= */

//   if (error) {
//     return (
//       <section className="w-full rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
//         <div className="flex items-start gap-3">
//           <AlertCircle size={20} className="mt-1 text-red-600" />

//           <div>
//             <h2 className="text-lg font-semibold text-slate-800">
//               Announcements
//             </h2>

//             <p className="mt-1 text-sm text-red-600">{error}</p>

//             <button
//               type="button"
//               onClick={() => void fetchAnnouncements()}
//               className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   /* =======================================================
//      EMPTY STATE
//      ======================================================= */

//   if (validAnnouncements.length === 0) {
//     return (
//       <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="flex items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
//               <Bell size={20} className="text-blue-600" />
//             </div>

//             <div>
//               <h2 className="text-lg font-semibold text-slate-800">
//                 Announcements
//               </h2>
//               <p className="text-xs text-slate-400">
//                 No current announcements
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleRefresh}
//             disabled={refreshing}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
//             title="Refresh announcements"
//           >
//             <RefreshCw
//               size={17}
//               className={refreshing ? "animate-spin" : ""}
//             />
//           </button>
//         </div>

//         {lastUpdated && (
//           <div className="mt-3 text-right text-[11px] text-slate-400">
//             Last updated {lastUpdatedText}
//           </div>
//         )}
//       </section>
//     );
//   }

//   /* =======================================================
//      MAIN UI
//      ======================================================= */

//   return (
//     <>
//       <section
//         className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* HEADER */}

//         <div className="mb-4 flex items-center justify-between gap-3">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
//               <Bell size={20} className="text-blue-600" />
//             </div>

//             <div className="min-w-0">
//               <h2 className="text-lg font-semibold text-slate-800">
//                 Announcements
//               </h2>
//               <p className="text-xs text-slate-400">
//                 Important information and updates
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleRefresh}
//             disabled={refreshing}
//             title="Refresh announcements"
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
//           >
//             <RefreshCw
//               size={17}
//               className={refreshing ? "animate-spin" : ""}
//             />
//           </button>
//         </div>

//         {/* ANNOUNCEMENT CARDS */}

//         <div className="space-y-3">
//           {currentBatch.map((announcement) => {
//             const priorityKey = getPriority(announcement.priority);
//             const priority = priorityStyles[priorityKey];

//             const startDate = getStartDate(announcement);
//             const expiryDate = getExpiryDate(announcement);
//             const isNew = newAnnouncementIds.has(announcement.id);

//             return (
//               <div
//                 key={announcement.id}
//                 className={`w-full rounded-xl border p-4 transition hover:shadow-sm ${
//                   isNew
//                     ? "border-amber-300 bg-amber-50/80 ring-1 ring-amber-200"
//                     : `${priority.border} ${priority.bg}`
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   {/* ICON */}

//                   <div
//                     className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ${priority.icon}`}
//                   >
//                     {priorityKey === "Important" ? (
//                       <AlertCircle size={18} />
//                     ) : priorityKey === "Notice" ? (
//                       <Info size={18} />
//                     ) : (
//                       <Bell size={18} />
//                     )}
//                   </div>

//                   {/* CONTENT */}

//                   <div className="min-w-0 flex-1">
//                     <div className="flex flex-wrap items-start justify-between gap-2">
//                       <h3 className="min-w-0 break-words text-sm font-semibold text-slate-800">
//                         {announcement.title}
//                       </h3>

//                       <div className="flex shrink-0 flex-wrap items-center gap-1.5">
//                         {isNew && (
//                           <span className="inline-flex items-center rounded-full bg-amber-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-900">
//                             New
//                           </span>
//                         )}

//                         <span
//                           className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${priority.badge}`}
//                         >
//                           {announcement.priority || "General"}
//                         </span>
//                       </div>
//                     </div>

//                     {/* MESSAGE: NOW VISIBLE IN THE CARD */}

//                     {/* <div
//                       className={`mt-2 rounded-lg border p-3 ${
//                         isNew
//                           ? "border-amber-200 bg-white/80"
//                           : "border-slate-200/70 bg-white/80"
//                       }`}
//                     >
//                       {isNew && (
//                         <p className="mb-1.5 text-[11px] font-semibold text-amber-800">
//                           <span className="mr-1">●</span>
//                           New announcement
//                         </p>
//                       )}

//                       <div className="line-clamp-4 break-words">
//                         <AnnouncementContent
//                           message={announcement.message || ""}
//                         />
//                       </div>
//                     </div> */}

//                     {/* DATES */}

//                     <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/70 pt-3">
//                       <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
//                         <CalendarDays
//                           size={13}
//                           className="shrink-0 text-blue-500"
//                         />

//                         <span>
//                           Start:{" "}
//                           <span className="font-semibold text-slate-700">
//                             {startDate
//                               ? formatDate(startDate)
//                               : "Immediately"}
//                           </span>
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
//                         <Clock
//                           size={13}
//                           className="shrink-0 text-slate-500"
//                         />

//                         <span>
//                           Until:{" "}
//                           <span className="font-semibold text-slate-700">
//                             {expiryDate
//                               ? formatDate(expiryDate)
//                               : "No expiry"}
//                           </span>
//                         </span>
//                       </div>
//                     </div>

//                     {/* VIEW DETAILS */}

//                     <div className="mt-3">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setSelectedAnnouncement(announcement)
//                         }
//                         className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* FOOTER / PAGINATION */}

//         <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
//           <div className="shrink-0 text-xs text-slate-400">
//             {rangeStart}–{rangeEnd} of {validAnnouncements.length}
//           </div>

//           {totalBatches > 1 && (
//             <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
//               {Array.from({ length: totalBatches }).map((_, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   onClick={() => setCurrentBatchIndex(index)}
//                   aria-label={`Go to announcement page ${index + 1}`}
//                   className={`h-1.5 rounded-full transition-all ${
//                     index === currentBatchIndex
//                       ? "w-5 bg-blue-600"
//                       : "w-1.5 bg-slate-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           )}

//           {totalBatches > 1 && (
//             <div className="flex shrink-0 gap-1">
//               <button
//                 type="button"
//                 onClick={goToPreviousBatch}
//                 aria-label="Previous announcements"
//                 className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600"
//               >
//                 <ChevronLeft size={16} />
//               </button>

//               <button
//                 type="button"
//                 onClick={goToNextBatch}
//                 aria-label="Next announcements"
//                 className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600"
//               >
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* LAST UPDATED */}

//         {lastUpdated && (
//           <div className="mt-2 flex items-center justify-end gap-1.5 text-right text-[10px] text-slate-400">
//             <Clock size={11} />
//             <span>Last updated {lastUpdatedText}</span>
//             {refreshing && (
//               <RefreshCw size={11} className="animate-spin" />
//             )}
//           </div>
//         )}
//       </section>

//       {/* =================================================
//           VIEW DETAILS MODAL
//          ================================================= */}

//       {selectedAnnouncement && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
//           onClick={() => setSelectedAnnouncement(null)}
//         >
//           <div
//             className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
//             onClick={(event) => event.stopPropagation()}
//           >
//             {/* MODAL HEADER */}

//             <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
//               <div className="flex min-w-0 items-start gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
//                   <Bell size={20} className="text-blue-600" />
//                 </div>

//                 <div className="min-w-0">
//                   <h2 className="break-words text-lg font-semibold text-slate-800">
//                     {selectedAnnouncement.title}
//                   </h2>

//                   <div className="mt-2 flex flex-wrap items-center gap-2">
//                     <span
//                       className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
//                         priorityStyles[
//                           getPriority(selectedAnnouncement.priority)
//                         ].badge
//                       }`}
//                     >
//                       {selectedAnnouncement.priority || "General"}
//                     </span>

//                     {newAnnouncementIds.has(selectedAnnouncement.id) && (
//                       <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-800">
//                         NEW ANNOUNCEMENT
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setSelectedAnnouncement(null)}
//                 aria-label="Close announcement details"
//                 className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* MODAL BODY */}

//             <div className="p-5">
//               <AnnouncementContent
//                 message={selectedAnnouncement.message || ""}
//               />

//               <div className="mt-6 grid gap-3 sm:grid-cols-2">
//                 <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
//                   <div className="flex items-center gap-2 text-xs text-slate-500">
//                     <CalendarDays size={15} />
//                     <span>Start Date</span>
//                   </div>

//                   <p className="mt-1 text-sm font-semibold text-slate-700">
//                     {getStartDate(selectedAnnouncement)
//                       ? formatDate(getStartDate(selectedAnnouncement))
//                       : "Immediately"}
//                   </p>
//                 </div>

//                 <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
//                   <div className="flex items-center gap-2 text-xs text-slate-500">
//                     <Clock size={15} />
//                     <span>Expiry Date</span>
//                   </div>

//                   <p className="mt-1 text-sm font-semibold text-slate-700">
//                     {getExpiryDate(selectedAnnouncement)
//                       ? formatDate(getExpiryDate(selectedAnnouncement))
//                       : "No expiry"}
//                   </p>
//                 </div>
//               </div>

//               {lastUpdated && (
//                 <p className="mt-4 text-right text-[10px] text-slate-400">
//                   Last updated {lastUpdatedText}
//                 </p>
//               )}
//             </div>

//             {/* MODAL FOOTER */}

//             <div className="flex justify-end border-t border-slate-200 p-4">
//               <button
//                 type="button"
//                 onClick={() => setSelectedAnnouncement(null)}
//                 className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2 text-sm font-medium text-white shadow-md transition hover:from-blue-700 hover:to-blue-600"
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

// export default Announcements;
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  RefreshCw,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;
const ANNOUNCEMENT_API = `${API}/api/user-dashboard/announcements`;

const BATCH_SIZE = 3;
const ROTATION_INTERVAL = 4000;
const REFRESH_INTERVAL = 60 * 1000;
const NEW_ANNOUNCEMENT_HIGHLIGHT_MS = 24 * 60 * 60 * 1000;

/* =========================================================
   TYPES
   ========================================================= */

type Announcement = {
  id: number;
  title: string;
  message: string;
  priority: string;

  created_at?: string | null;
  createdAt?: string | null;

  starts_at?: string | null;
  startsAt?: string | null;

  start_date?: string | null;
  startDate?: string | null;

  expires_at?: string | null;
  expiresAt?: string | null;

  expiry_date?: string | null;
  expiryDate?: string | null;

  is_active?: boolean;
};

type AnnouncementBlock =
  | {
      type: "text";
      text?: string;
      content?: string;
      color?: string;
      backgroundColor?: string;
      fontSize?: number;
      fontWeight?: "normal" | "bold";
      fontStyle?: "normal" | "italic";
      textAlign?: "left" | "center" | "right";
      fontFamily?: string;
    }
  | { type: "image"; url?: string; alt?: string }
  | { type: "logo"; url?: string; alt?: string }
  | { type: "button"; text?: string; url?: string }
  | { type: "divider" };

type PriorityKey = "Important" | "Notice" | "General";

/* =========================================================
   PRIORITY STYLES
   ========================================================= */

const priorityStyles: Record<
  PriorityKey,
  {
    badge: string;
    border: string;
    bg: string;
  }
> = {
  Important: {
    badge: "bg-red-100 text-red-700",
    border: "border-red-200",
    bg: "bg-red-50",
  },
  Notice: {
    badge: "bg-blue-100 text-blue-700",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  General: {
    badge: "bg-slate-100 text-slate-700",
    border: "border-slate-200",
    bg: "bg-slate-50",
  },
};

const getPriority = (priority?: string | null): PriorityKey => {
  const normalized = (priority || "").trim().toLowerCase();

  if (normalized === "important") return "Important";
  if (normalized === "notice") return "Notice";

  return "General";
};

/* =========================================================
   DATE HELPERS
   ========================================================= */

const getDateOnly = (value?: string | null): string | null => {
  if (!value) return null;

  const valueString = String(value).trim();
  const match = valueString.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  const slashMatch = valueString.match(
    /^(\d{2})\/(\d{2})\/(\d{4})/
  );

  if (slashMatch) {
    return `${slashMatch[3]}-${slashMatch[2]}-${slashMatch[1]}`;
  }

  return null;
};

const getTodayDateOnly = (): string => {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
};

const getStartDate = (
  announcement: Announcement
): string | null => {
  return (
    announcement.starts_at ??
    announcement.startsAt ??
    announcement.start_date ??
    announcement.startDate ??
    null
  );
};

const getExpiryDate = (
  announcement: Announcement
): string | null => {
  return (
    announcement.expires_at ??
    announcement.expiresAt ??
    announcement.expiry_date ??
    announcement.expiryDate ??
    null
  );
};

const getCreatedDate = (
  announcement: Announcement
): string | null => {
  return announcement.created_at ?? announcement.createdAt ?? null;
};

/* =========================================================
   USER VISIBILITY CHECK
   ========================================================= */

const isAnnouncementCurrentlyValid = (
  announcement: Announcement
): boolean => {
  if (announcement.is_active === false) {
    return false;
  }

  const today = getTodayDateOnly();
  const startDate = getDateOnly(getStartDate(announcement));
  const expiryDate = getDateOnly(getExpiryDate(announcement));

  if (startDate && startDate > today) {
    return false;
  }

  if (expiryDate && expiryDate < today) {
    return false;
  }

  return true;
};

/* =========================================================
   FORMAT DATE
   ========================================================= */

const formatDate = (value?: string | null): string => {
  const dateOnly = getDateOnly(value);

  if (!dateOnly) return "—";

  const [year, month, day] = dateOnly.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =========================================================
   MESSAGE BLOCK PARSER
   ========================================================= */

const getAnnouncementBlocks = (
  message: string
): AnnouncementBlock[] | null => {
  if (!message) return null;

  try {
    const parsed = JSON.parse(message);

    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item) =>
          item &&
          typeof item === "object" &&
          typeof item.type === "string"
      )
    ) {
      return parsed;
    }

    if (
      parsed &&
      typeof parsed === "object" &&
      Array.isArray(parsed.blocks)
    ) {
      return parsed.blocks;
    }

    return null;
  } catch {
    return null;
  }
};

/* =========================================================
   ANNOUNCEMENT CONTENT
   ========================================================= */

const AnnouncementContent = ({
  message,
}: {
  message: string;
}) => {
  const blocks = getAnnouncementBlocks(message);

  if (!blocks) {
    return (
      <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
        {message}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          const text = block.text ?? block.content ?? "";

          if (!text) return null;

          return (
            <div
              key={index}
              className="whitespace-pre-wrap break-words text-sm leading-6"
              style={{
                color: block.color || "#475569",
                backgroundColor:
                  block.backgroundColor &&
                  block.backgroundColor !== "transparent"
                    ? block.backgroundColor
                    : undefined,
                fontSize: block.fontSize
                  ? `${block.fontSize}px`
                  : undefined,
                fontWeight: block.fontWeight || "normal",
                fontStyle: block.fontStyle || "normal",
                textAlign: block.textAlign || "left",
                fontFamily: block.fontFamily || "Arial",
              }}
            >
              {/<[a-z][\s\S]*>/i.test(text) ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                />
              ) : (
                text
              )}
            </div>
          );
        }

        if (block.type === "image" || block.type === "logo") {
          if (!block.url) return null;

          return (
            <img
              key={index}
              src={block.url}
              alt={block.alt || ""}
              className="max-h-64 max-w-full rounded-lg object-contain"
            />
          );
        }

        if (block.type === "divider") {
          return (
            <hr key={index} className="border-slate-200" />
          );
        }

        if (block.type === "button") {
          if (!block.url) return null;

          return (
            <a
              key={index}
              href={block.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {block.text || "Open Link"}
              <ExternalLink size={14} />
            </a>
          );
        }

        return null;
      })}
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // null means that the first successful fetch has not happened yet.
  const previousAnnouncementIds = useRef<Set<number> | null>(null);

  const [newAnnouncementIds, setNewAnnouncementIds] =
    useState<Set<number>>(new Set());

  /* =======================================================
     FETCH ANNOUNCEMENTS
     ======================================================= */

  const fetchAnnouncements = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const response = await axios.get(ANNOUNCEMENT_API, {
        withCredentials: true,
      });

      const data = response.data?.data;

      const fetchedAnnouncements: Announcement[] = Array.isArray(data)
        ? data
        : [];

      const validFetchedAnnouncements =
        fetchedAnnouncements.filter(isAnnouncementCurrentlyValid);

      const currentIds = new Set(
        validFetchedAnnouncements.map((announcement) => announcement.id)
      );

      const previousIds = previousAnnouncementIds.current;

      if (previousIds !== null) {
        const addedIds = validFetchedAnnouncements
          .filter((announcement) => !previousIds.has(announcement.id))
          .map((announcement) => announcement.id);

        if (addedIds.length > 0) {
          setNewAnnouncementIds((previous) => {
            const updated = new Set(previous);

            addedIds.forEach((id) => updated.add(id));

            return updated;
          });

          // Show the newest announcements from the first page.
          setCurrentBatchIndex(0);
        }
      } else {
        // First load: highlight announcements created in the last 24 hours.
        const recentIds = validFetchedAnnouncements
          .filter((announcement) => {
            const createdAt = getCreatedDate(announcement);

            if (!createdAt) return false;

            const createdTime = new Date(createdAt).getTime();
            const age = Date.now() - createdTime;

            return (
              Number.isFinite(createdTime) &&
              age >= 0 &&
              age <= NEW_ANNOUNCEMENT_HIGHLIGHT_MS
            );
          })
          .map((announcement) => announcement.id);

        setNewAnnouncementIds(new Set(recentIds));
      }

      previousAnnouncementIds.current = currentIds;

      setAnnouncements(validFetchedAnnouncements);
      setLastUpdated(new Date());
      setError("");
    } catch (err) {
      console.error("Failed to fetch announcements:", err);

      if (!silent) {
        setError("Failed to load announcements");
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }

      setRefreshing(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {
    void fetchAnnouncements();
  }, []);

  /* =======================================================
     AUTOMATIC REFRESH
     ======================================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      void fetchAnnouncements(true);
    }, REFRESH_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* =======================================================
     REFRESH WHEN USER RETURNS TO TAB
     ======================================================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void fetchAnnouncements(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  /* =======================================================
     SECONDARY FRONTEND FILTER
     ======================================================= */

  const validAnnouncements = useMemo(() => {
    return announcements.filter(isAnnouncementCurrentlyValid);
  }, [announcements]);

  /* =======================================================
     BATCHES
     ======================================================= */

  const totalBatches = Math.ceil(
    validAnnouncements.length / BATCH_SIZE
  );

  const currentBatch = useMemo(() => {
    const start = currentBatchIndex * BATCH_SIZE;

    return validAnnouncements.slice(start, start + BATCH_SIZE);
  }, [validAnnouncements, currentBatchIndex]);

  /* =======================================================
     KEEP INDEX VALID
     ======================================================= */

  useEffect(() => {
    if (totalBatches === 0) {
      if (currentBatchIndex !== 0) {
        setCurrentBatchIndex(0);
      }

      return;
    }

    if (currentBatchIndex >= totalBatches) {
      setCurrentBatchIndex(totalBatches - 1);
    }
  }, [totalBatches, currentBatchIndex]);

  /* =======================================================
     AUTOMATIC ROTATION
     Move forward every 4 seconds.
     Stop at the last page; do not wrap to page one.
     ======================================================= */

  useEffect(() => {
    if (
      totalBatches <= 1 ||
      isHovered ||
      selectedAnnouncement ||
      currentBatchIndex >= totalBatches - 1
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentBatchIndex((previous) =>
        Math.min(previous + 1, totalBatches - 1)
      );
    }, ROTATION_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    totalBatches,
    isHovered,
    selectedAnnouncement,
    currentBatchIndex,
  ]);

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const goToPreviousBatch = () => {
    setCurrentBatchIndex((previous) =>
      Math.max(0, previous - 1)
    );
  };

  const goToNextBatch = () => {
    setCurrentBatchIndex((previous) =>
      Math.min(totalBatches - 1, previous + 1)
    );
  };

  /* =======================================================
     RANGE
     ======================================================= */

  const rangeStart =
    validAnnouncements.length === 0
      ? 0
      : currentBatchIndex * BATCH_SIZE + 1;

  const rangeEnd = Math.min(
    (currentBatchIndex + 1) * BATCH_SIZE,
    validAnnouncements.length
  );

  /* =======================================================
     REFRESH BUTTON
     ======================================================= */

  const handleRefresh = async () => {
    await fetchAnnouncements(true);
  };

  /* =======================================================
     LAST UPDATED DISPLAY
     ======================================================= */

  const lastUpdatedText = lastUpdated
    ? lastUpdated.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {
    return (
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Bell size={20} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Announcements
            </h2>
            <p className="text-xs text-slate-400">
              Loading latest announcements...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     ERROR
     ======================================================= */

  if (error) {
    return (
      <section className="w-full rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="mt-1 text-red-600" />

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Announcements
            </h2>

            <p className="mt-1 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => void fetchAnnouncements()}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     EMPTY STATE
     ======================================================= */

  if (validAnnouncements.length === 0) {
    return (
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Bell size={20} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Announcements
              </h2>
              <p className="text-xs text-slate-400">
                No current announcements
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
            title="Refresh announcements"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </div>

        {lastUpdated && (
          <div className="mt-3 text-right text-[11px] text-slate-400">
            Last updated {lastUpdatedText}
          </div>
        )}
      </section>
    );
  }

  /* =======================================================
     MAIN UI
     ======================================================= */

  return (
    <>
      <section
        className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* HEADER */}

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Bell size={20} className="text-blue-600" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-800">
                Announcements
              </h2>
              <p className="text-xs text-slate-400">
                Important information and updates
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh announcements"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* ANNOUNCEMENT CARDS — INDIVIDUAL ICONS REMOVED */}

        <div className="space-y-3">
          {currentBatch.map((announcement) => {
            const priorityKey = getPriority(announcement.priority);
            const priority = priorityStyles[priorityKey];

            const startDate = getStartDate(announcement);
            const expiryDate = getExpiryDate(announcement);
            const isNew = newAnnouncementIds.has(announcement.id);

            return (
              <div
                key={announcement.id}
                className={`w-full rounded-xl border p-4 transition hover:shadow-sm ${
                  isNew
                    ? "border-amber-300 bg-amber-50/80 ring-1 ring-amber-200"
                    : `${priority.border} ${priority.bg}`
                }`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="min-w-0 break-words text-sm font-semibold text-slate-800">
                      {announcement.title}
                    </h3>

                    <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                      {isNew && (
                        <span className="inline-flex items-center rounded-full bg-amber-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-900">
                          New
                        </span>
                      )}

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${priority.badge}`}
                      >
                        {announcement.priority || "General"}
                      </span>
                    </div>
                  </div>

                  {/* MESSAGE IS AVAILABLE IN VIEW DETAILS */}

                  {/* DATES */}

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/70 pt-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CalendarDays
                        size={13}
                        className="shrink-0 text-blue-500"
                      />

                      <span>
                        Start:{" "}
                        <span className="font-semibold text-slate-700">
                          {startDate
                            ? formatDate(startDate)
                            : "Immediately"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Clock
                        size={13}
                        className="shrink-0 text-slate-500"
                      />

                      <span>
                        Until:{" "}
                        <span className="font-semibold text-slate-700">
                          {expiryDate
                            ? formatDate(expiryDate)
                            : "No expiry"}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* VIEW DETAILS */}

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedAnnouncement(announcement)
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER / PAGINATION */}

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <div className="shrink-0 text-xs text-slate-400">
            {rangeStart}–{rangeEnd} of {validAnnouncements.length}
          </div>

          {totalBatches > 1 && (
            <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
              {Array.from({ length: totalBatches }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentBatchIndex(index)}
                  aria-label={`Go to announcement page ${index + 1}`}
                  aria-current={
                    index === currentBatchIndex ? "page" : undefined
                  }
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentBatchIndex
                      ? "w-5 bg-blue-600"
                      : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          )}

          {totalBatches > 1 && (
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={goToPreviousBatch}
                disabled={currentBatchIndex === 0}
                aria-label="Previous announcements"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={goToNextBatch}
                disabled={currentBatchIndex >= totalBatches - 1}
                aria-label="Next announcements"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* LAST UPDATED */}

        {lastUpdated && (
          <div className="mt-2 flex items-center justify-end gap-1.5 text-right text-[10px] text-slate-400">
            <Clock size={11} />
            <span>Last updated {lastUpdatedText}</span>
            {refreshing && (
              <RefreshCw size={11} className="animate-spin" />
            )}
          </div>
        )}
      </section>

      {/* VIEW DETAILS MODAL */}

      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <Bell size={20} className="text-blue-600" />
                </div>

                <div className="min-w-0">
                  <h2 className="break-words text-lg font-semibold text-slate-800">
                    {selectedAnnouncement.title}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        priorityStyles[
                          getPriority(selectedAnnouncement.priority)
                        ].badge
                      }`}
                    >
                      {selectedAnnouncement.priority || "General"}
                    </span>

                    {newAnnouncementIds.has(selectedAnnouncement.id) && (
                      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-800">
                        NEW ANNOUNCEMENT
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                aria-label="Close announcement details"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="p-5">
              <AnnouncementContent
                message={selectedAnnouncement.message || ""}
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={15} />
                    <span>Start Date</span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {getStartDate(selectedAnnouncement)
                      ? formatDate(getStartDate(selectedAnnouncement))
                      : "Immediately"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={15} />
                    <span>Expiry Date</span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {getExpiryDate(selectedAnnouncement)
                      ? formatDate(getExpiryDate(selectedAnnouncement))
                      : "No expiry"}
                  </p>
                </div>
              </div>

              {lastUpdated && (
                <p className="mt-4 text-right text-[10px] text-slate-400">
                  Last updated {lastUpdatedText}
                </p>
              )}
            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end border-t border-slate-200 p-4">
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2 text-sm font-medium text-white shadow-md transition hover:from-blue-700 hover:to-blue-600"
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

export default Announcements;
