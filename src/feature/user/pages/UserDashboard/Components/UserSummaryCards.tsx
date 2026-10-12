// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import {
// // //   Home,
// // //   Car,
// // //   Users,
// // //   FileText,
// // //   ChevronRight,
// // //   Loader2,
// // // } from "lucide-react";

// // // const API = import.meta.env.VITE_BACKEND_URL;

// // // type UserDashboardSummary = {
// // //   flat: {
// // //     apartmentName: string | null;
// // //     blockTower: string | null;
// // //     floorNumber: number | string | null;
// // //     flatNumber: string | null;
// // //     ownershipType: string | null;
// // //   };
// // //   vehicles: number;
// // //   members: number;
// // //   pendingRequests: number;
// // // };

// // // type ApiResponse = {
// // //   success: boolean;
// // //   data: UserDashboardSummary;
// // //   message?: string;
// // // };

// // // const UserSummaryCards = () => {
// // //   const [summary, setSummary] = useState<UserDashboardSummary | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   // ============================================================
// // //   // FETCH USER DASHBOARD SUMMARY
// // //   // ============================================================

// // //   useEffect(() => {
// // //     const fetchUserSummary = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError("");

// // //         const response = await axios.get<ApiResponse>(
// // //           `${API}/api/user-dashboard/user-summary`,
// // //           {
// // //             withCredentials: true,
// // //           }
// // //         );

// // //         if (response.data?.success) {
// // //           setSummary(response.data.data);
// // //         } else {
// // //           setError(
// // //             response.data?.message || "Unable to load dashboard summary"
// // //           );
// // //         }
// // //       } catch (err: any) {
// // //         console.error("User Dashboard Summary Error:", err);

// // //         setError(
// // //           err?.response?.data?.message ||
// // //             "Unable to load dashboard summary"
// // //         );
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchUserSummary();
// // //   }, []);

// // //   // ============================================================
// // //   // HELPERS
// // //   // ============================================================

// // //   const flat = summary?.flat;

// // //   const flatNumber = flat?.flatNumber || "--";

// // //   const tower =
// // //     flat?.blockTower && flat.blockTower.trim() !== ""
// // //       ? flat.blockTower
// // //       : "--";

// // //   const floor =
// // //     flat?.floorNumber !== null &&
// // //     flat?.floorNumber !== undefined
// // //       ? `Floor ${flat.floorNumber}`
// // //       : "--";

// // //   // ============================================================
// // //   // LOADING CARD
// // //   // ============================================================

// // //   const LoadingCard = () => (
// // //     <div className="flex min-h-[125px] items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
// // //       <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
// // //     </div>
// // //   );

// // //   // ============================================================
// // //   // ERROR
// // //   // ============================================================

// // //   if (loading) {
// // //     return (
// // //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
// // //         <LoadingCard />
// // //         <LoadingCard />
// // //         <LoadingCard />
// // //         <LoadingCard />
// // //       </div>
// // //     );
// // //   }

// // //   // ============================================================
// // //   // CARD CONFIGURATION
// // //   // ============================================================

// // //   const cards = [
// // //     {
// // //       title: "My Flat",
// // //       value: flatNumber,
// // //       description: `${tower} • ${floor}`,
// // //       icon: Home,
// // //       iconWrapper: "bg-blue-100",
// // //       iconColor: "text-blue-600",
// // //       valueColor: "text-blue-700",
// // //       arrowColor: "text-blue-500",
// // //     },
// // //     {
// // //       title: "Total Vehicles",
// // //       value: summary?.vehicles ?? 0,
// // //       description: "Registered vehicles",
// // //       icon: Car,
// // //       iconWrapper: "bg-emerald-100",
// // //       iconColor: "text-emerald-600",
// // //       valueColor: "text-emerald-700",
// // //       arrowColor: "text-emerald-500",
// // //     },
// // //     {
// // //       title: "Flat Members",
// // //       value: summary?.members ?? 0,
// // //       description: "Family members",
// // //       icon: Users,
// // //       iconWrapper: "bg-purple-100",
// // //       iconColor: "text-purple-600",
// // //       valueColor: "text-purple-700",
// // //       arrowColor: "text-purple-500",
// // //     },
// // //     {
// // //       title: "My Pending Requests",
// // //       value: summary?.pendingRequests ?? 0,
// // //       description: "Awaiting approval",
// // //       icon: FileText,
// // //       iconWrapper: "bg-violet-100",
// // //       iconColor: "text-violet-600",
// // //       valueColor: "text-violet-700",
// // //       arrowColor: "text-violet-500",
// // //     },
// // //   ];

// // //   // ============================================================
// // //   // UI
// // //   // ============================================================

// // //   return (
// // //     <div className="w-full">
// // //       {/* ========================================================
// // //           ERROR MESSAGE
// // //       ======================================================== */}

// // //       {error && (
// // //         <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
// // //           {error}
// // //         </div>
// // //       )}

// // //       {/* ========================================================
// // //           SUMMARY CARDS
// // //       ======================================================== */}

// // //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
// // //         {cards.map((card) => {
// // //           const Icon = card.icon;

// // //           return (
// // //             <div
// // //               key={card.title}
// // //               className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
// // //             >
// // //               <div className="flex items-start justify-between">
// // //                 {/* LEFT */}
// // //                 <div className="min-w-0">
// // //                   <p className="text-sm font-medium text-slate-500">
// // //                     {card.title}
// // //                   </p>

// // //                   <h2
// // //                     className={`mt-2 truncate text-2xl font-bold ${card.valueColor}`}
// // //                   >
// // //                     {card.value}
// // //                   </h2>

// // //                   <p className="mt-1 truncate text-xs text-slate-400">
// // //                     {card.description}
// // //                   </p>
// // //                 </div>

// // //                 {/* ICON */}
// // //                 <div
// // //                   className={`ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${card.iconWrapper}`}
// // //                 >
// // //                   <Icon className={`h-5 w-5 ${card.iconColor}`} />
// // //                 </div>
// // //               </div>

// // //               {/* ARROW */}
// // //               <div
// // //                 className={`absolute bottom-4 right-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${card.arrowColor}`}
// // //               >
// // //                 <ChevronRight className="h-4 w-4" />
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserSummaryCards;
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   Home,
// //   Car,
// //   Bike,
// //   Users,
// //   FileText,
// //   ChevronRight,
// //   Loader2,
// // } from "lucide-react";

// // const API = import.meta.env.VITE_BACKEND_URL;

// // type UserDashboardSummary = {
// //   flat: {
// //     apartmentName: string | null;
// //     blockTower: string | null;
// //     floorNumber: number | string | null;
// //     flatNumber: string | null;
// //     ownershipType: string | null;
// //   };

// //   vehicles: {
// //     twoWheelers: number;
// //     fourWheelers: number;
// //   };

// //   members: number;
// //   pendingRequests: number;
// // };

// // type ApiResponse = {
// //   success: boolean;
// //   data: UserDashboardSummary;
// //   message?: string;
// // };

// // const UserSummaryCards = () => {
// //   const [summary, setSummary] = useState<UserDashboardSummary | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // ============================================================
// //   // FETCH USER DASHBOARD SUMMARY
// //   // ============================================================

// //   useEffect(() => {
// //     const fetchUserSummary = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         const response = await axios.get<ApiResponse>(
// //           `${API}/api/user-dashboard/user-summary`,
// //           {
// //             withCredentials: true,
// //           }
// //         );

// //         if (response.data?.success) {
// //           setSummary(response.data.data);
// //         } else {
// //           setError(
// //             response.data?.message || "Unable to load dashboard summary"
// //           );
// //         }
// //       } catch (err: any) {
// //         console.error("User Dashboard Summary Error:", err);

// //         setError(
// //           err?.response?.data?.message ||
// //             "Unable to load dashboard summary"
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserSummary();
// //   }, []);

// //   // ============================================================
// //   // HELPERS
// //   // ============================================================

// //   const flat = summary?.flat;

// //   const flatNumber = flat?.flatNumber || "--";

// //   const tower =
// //     flat?.blockTower && flat.blockTower.trim() !== ""
// //       ? flat.blockTower
// //       : "--";

// //   const floor =
// //     flat?.floorNumber !== null &&
// //     flat?.floorNumber !== undefined
// //       ? `Floor ${flat.floorNumber}`
// //       : "--";

// //   // ============================================================
// //   // VEHICLE COUNTS
// //   // ============================================================

// //   const twoWheelers = summary?.vehicles?.twoWheelers ?? 0;
// //   const fourWheelers = summary?.vehicles?.fourWheelers ?? 0;

// //   // ============================================================
// //   // LOADING CARD
// //   // ============================================================

// //   const LoadingCard = () => (
// //     <div className="flex min-h-[125px] items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
// //       <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
// //     </div>
// //   );

// //   // ============================================================
// //   // LOADING
// //   // ============================================================

// //   if (loading) {
// //     return (
// //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
// //         <LoadingCard />
// //         <LoadingCard />
// //         <LoadingCard />
// //         <LoadingCard />
// //       </div>
// //     );
// //   }

// //   // ============================================================
// //   // CARD CONFIGURATION
// //   // ============================================================

// //   const cards = [
// //     {
// //       title: "My Flat",
// //       value: flatNumber,
// //       description: `${tower} • ${floor}`,
// //       icon: Home,
// //       iconWrapper: "bg-blue-100",
// //       iconColor: "text-blue-600",
// //       valueColor: "text-blue-700",
// //       arrowColor: "text-blue-500",
// //     },

// //     {
// //       title: "Total Vehicles",
// //       icon: Car,
// //       iconWrapper: "bg-emerald-100",
// //       iconColor: "text-emerald-600",
// //       arrowColor: "text-emerald-500",
// //     },

// //     {
// //       title: "Flat Members",
// //       value: summary?.members ?? 0,
// //       description: "Family members",
// //       icon: Users,
// //       iconWrapper: "bg-purple-100",
// //       iconColor: "text-purple-600",
// //       valueColor: "text-purple-700",
// //       arrowColor: "text-purple-500",
// //     },

// //     {
// //       title: "My Pending Requests",
// //       value: summary?.pendingRequests ?? 0,
// //       description: "Awaiting approval",
// //       icon: FileText,
// //       iconWrapper: "bg-violet-100",
// //       iconColor: "text-violet-600",
// //       valueColor: "text-violet-700",
// //       arrowColor: "text-violet-500",
// //     },
// //   ];

// //   // ============================================================
// //   // UI
// //   // ============================================================

// //   return (
// //     <div className="w-full">
// //       {/* ========================================================
// //           ERROR MESSAGE
// //       ======================================================== */}

// //       {error && (
// //         <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
// //           {error}
// //         </div>
// //       )}

// //       {/* ========================================================
// //           SUMMARY CARDS
// //       ======================================================== */}

// //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
// //         {cards.map((card) => {
// //           const Icon = card.icon;

// //           return (
// //             <div
// //               key={card.title}
// //               className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
// //             >
// //               {/* ==================================================
// //                   TOTAL VEHICLES SPECIAL CARD
// //               ================================================== */}

// //               {card.title === "Total Vehicles" ? (
// //                 <>
// //                   {/* TITLE */}
// //                   <div className="flex items-center justify-between">
// //                     <p className="text-sm font-medium text-slate-500">
// //                       Total Vehicles
// //                     </p>

// //                     {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
// //                       <Car className="h-4 w-4 text-emerald-600" />
// //                     </div> */}
// //                   </div>

// //                   {/* VEHICLE SECTIONS */}
// //                   <div className="mt-4 grid grid-cols-2 divide-x divide-slate-200">
// //                     {/* 2 WHEELERS */}
// //                     <div className="flex items-center gap-3 pr-3">
// //                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50">
// //                         <Bike className="h-4 w-4 text-emerald-600" />
// //                       </div>

// //                       <div className="min-w-0">
// //                         <p className="text-[11px] font-medium text-slate-400">
// //                           2 Wheelers
// //                         </p>

// //                         <p className="mt-0.5 text-xl font-bold text-emerald-700">
// //                           {twoWheelers}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     {/* 4 WHEELERS */}
// //                     <div className="flex items-center gap-3 pl-3">
// //                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50">
// //                         <Car className="h-4 w-4 text-emerald-600" />
// //                       </div>

// //                       <div className="min-w-0">
// //                         <p className="text-[11px] font-medium text-slate-400">
// //                           4 Wheelers
// //                         </p>

// //                         <p className="mt-0.5 text-xl font-bold text-emerald-700">
// //                           {fourWheelers}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* TOTAL */}
// //                   <div className="mt-3 border-t border-slate-100 pt-2 text-xs text-slate-400">
// //                     Total:{" "}
// //                     <span className="font-semibold text-slate-600">
// //                       {twoWheelers + fourWheelers}
// //                     </span>{" "}
// //                     vehicles
// //                   </div>

// //                   {/* ARROW */}
// //                   <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-emerald-500">
// //                     <ChevronRight className="h-4 w-4" />
// //                   </div>
// //                 </>
// //               ) : (
// //                 <>
// //                   {/* ==================================================
// //                       NORMAL CARD
// //                   ================================================== */}

// //                   <div className="flex items-start justify-between">
// //                     {/* LEFT */}
// //                     <div className="min-w-0">
// //                       <p className="text-sm font-medium text-slate-500">
// //                         {card.title}
// //                       </p>

// //                       <h2
// //                         className={`mt-2 truncate text-2xl font-bold ${card.valueColor}`}
// //                       >
// //                         {card.value}
// //                       </h2>

// //                       <p className="mt-1 truncate text-xs text-slate-400">
// //                         {card.description}
// //                       </p>
// //                     </div>

// //                     {/* ICON */}
// //                     <div
// //                       className={`ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${card.iconWrapper}`}
// //                     >
// //                       <Icon className={`h-5 w-5 ${card.iconColor}`} />
// //                     </div>
// //                   </div>

// //                   {/* ARROW */}
// //                   <div
// //                     className={`absolute bottom-4 right-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${card.arrowColor}`}
// //                   >
// //                     <ChevronRight className="h-4 w-4" />
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserSummaryCards;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Home,
//   Car,
//   Bike,
//   Users,
//   FileText,
//   ChevronRight,
//   Loader2,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// type UserDashboardSummary = {
//   flat: {
//     apartmentName: string | null;
//     blockTower: string | null;
//     floorNumber: number | string | null;
//     flatNumber: string | null;
//     ownershipType: string | null;
//   };
//   vehicles: {
//     twoWheelers: number;
//     fourWheelers: number;
//   };
//   members: number;
//   pendingRequests: number;
// };

// type ApiResponse = {
//   success: boolean;
//   data: UserDashboardSummary;
//   message?: string;
// };

// const UserSummaryCards = () => {
//   const [summary, setSummary] = useState<UserDashboardSummary | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUserSummary = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await axios.get<ApiResponse>(
//           `${API}/api/user-dashboard/user-summary`,
//           { withCredentials: true }
//         );

//         if (response.data?.success) {
//           setSummary(response.data.data);
//         } else {
//           setError(
//             response.data?.message || "Unable to load dashboard summary"
//           );
//         }
//       } catch (err: any) {
//         console.error("User Dashboard Summary Error:", err);
//         setError(
//           err?.response?.data?.message || "Unable to load dashboard summary"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserSummary();
//   }, []);

//   const flat = summary?.flat;
//   const flatNumber = flat?.flatNumber || "--";
//   const tower =
//     flat?.blockTower && flat.blockTower.trim() !== ""
//       ? flat.blockTower
//       : "--";
//   const floor =
//     flat?.floorNumber !== null && flat?.floorNumber !== undefined
//       ? `Floor ${flat.floorNumber}`
//       : "--";

//   const twoWheelers = summary?.vehicles?.twoWheelers ?? 0;
//   const fourWheelers = summary?.vehicles?.fourWheelers ?? 0;
//   const totalVehicles = twoWheelers + fourWheelers;

//   const LoadingCard = () => (
//     <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
//       <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <LoadingCard />
//         <LoadingCard />
//         <LoadingCard />
//         <LoadingCard />
//       </div>
//     );
//   }

//   const cards = [
//     {
//       title: "My Flat",
//       value: flatNumber,
//       description: `${tower} • ${floor}`,
//       icon: Home,
//       iconWrapper: "bg-blue-100",
//       iconColor: "text-blue-600",
//       valueColor: "text-blue-700",
//       arrowColor: "text-blue-500",
//     },
//     {
//       title: "Total Vehicles",
//       icon: Car,
//       iconWrapper: "bg-emerald-100",
//       iconColor: "text-emerald-600",
//       arrowColor: "text-emerald-500",
//     },
//     {
//       title: "Flat Members",
//       value: summary?.members ?? 0,
//       description: "Family members",
//       icon: Users,
//       iconWrapper: "bg-purple-100",
//       iconColor: "text-purple-600",
//       valueColor: "text-purple-700",
//       arrowColor: "text-purple-500",
//     },
//     {
//       title: "My Pending Requests",
//       value: summary?.pendingRequests ?? 0,
//       description: "Awaiting approval",
//       icon: FileText,
//       iconWrapper: "bg-violet-100",
//       iconColor: "text-violet-600",
//       valueColor: "text-violet-700",
//       arrowColor: "text-violet-500",
//     },
//   ];

//   return (
//     <div className="w-full">
//       {error && (
//         <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {cards.map((card) => {
//           const Icon = card.icon;

//           return (
//             <div
//               key={card.title}
//               className={`group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
//                 card.title === "Total Vehicles" ? "min-h-[190px]" : ""
//               }`}
//             >
//               {card.title === "Total Vehicles" ? (
//                 <div className="h-full">
//                   {/* Title */}
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-semibold text-slate-700">
//                       Total Vehicles
//                     </p>
//                   </div>

//                   {/* Soft-tinted vehicle category panel */}
//                   <div className="mt-3 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-50/80 p-3">
//                     <div className="grid grid-cols-2 gap-2">
//                       {/* 2 Wheelers */}
//                       <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-emerald-100/80 bg-white/40 px-2.5 py-3">
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100/80">
//                           <Bike className="h-5 w-5 text-emerald-700" />
//                         </div>
//                         <div className="min-w-0">
//                           <p className="whitespace-nowrap text-[11px] font-medium text-slate-500">
//                             2 Wheelers
//                           </p>
//                           <p className="mt-0.5 text-2xl font-bold leading-none text-emerald-700">
//                             {twoWheelers}
//                           </p>
//                         </div>
//                       </div>

//                       {/* 4 Wheelers */}
//                       <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-emerald-100/80 bg-white/40 px-2.5 py-3">
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100/80">
//                           <Car className="h-5 w-5 text-emerald-700" />
//                         </div>
//                         <div className="min-w-0">
//                           <p className="whitespace-nowrap text-[11px] font-medium text-slate-500">
//                             4 Wheelers
//                           </p>
//                           <p className="mt-0.5 text-2xl font-bold leading-none text-emerald-700">
//                             {fourWheelers}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Total footer */}
//                   <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
//                     <p className="text-xs text-slate-500">
//                       Total:{" "}
//                       <span className="font-bold text-emerald-700">
//                         {totalVehicles}
//                       </span>{" "}
//                       {totalVehicles === 1 ? "vehicle" : "vehicles"}
//                     </p>
//                     {/* <ChevronRight className="h-4 w-4 text-emerald-500 transition-transform duration-200 group-hover:translate-x-0.5" /> */}
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex items-start justify-between">
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-slate-500">
//                         {card.title}
//                       </p>

//                       <h2
//                         className={`mt-2 truncate text-2xl font-bold ${card.valueColor}`}
//                       >
//                         {card.value}
//                       </h2>

//                       <p className="mt-1 truncate text-xs text-slate-400">
//                         {card.description}
//                       </p>
//                     </div>

//                     <div
//                       className={`ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${card.iconWrapper}`}
//                     >
//                       <Icon className={`h-5 w-5 ${card.iconColor}`} />
//                     </div>
//                   </div>

//                   {/* <div
//                     className={`absolute bottom-4 right-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${card.arrowColor}`}
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </div> */}
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default UserSummaryCards;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Home,
  Car,
  Bike,
  Users,
  FileText,
  Loader2,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type UserDashboardSummary = {
  flat: {
    apartmentName: string | null;
    blockTower: string | null;
    floorNumber: number | string | null;
    flatNumber: string | null;
    ownershipType: string | null;
  };
  vehicles: {
    twoWheelers: number;
    fourWheelers: number;
  };
  members: number;
  pendingRequests: number;
};

type ApiResponse = {
  success: boolean;
  data: UserDashboardSummary;
  message?: string;
};

const UserSummaryCards = () => {
  const [summary, setSummary] = useState<UserDashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserSummary = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get<ApiResponse>(
          `${API}/api/user-dashboard/user-summary`,
          { withCredentials: true }
        );

        if (response.data?.success) {
          setSummary(response.data.data);
        } else {
          setError(
            response.data?.message || "Unable to load dashboard summary"
          );
        }
      } catch (err: any) {
        console.error("User Dashboard Summary Error:", err);
        setError(
          err?.response?.data?.message || "Unable to load dashboard summary"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserSummary();
  }, []);

  const flat = summary?.flat;
  const flatNumber = flat?.flatNumber || "--";
  const tower =
    flat?.blockTower && flat.blockTower.trim() !== ""
      ? flat.blockTower
      : "--";
  const floor =
    flat?.floorNumber !== null && flat?.floorNumber !== undefined
      ? `Floor ${flat.floorNumber}`
      : "--";

  const twoWheelers = summary?.vehicles?.twoWheelers ?? 0;
  const fourWheelers = summary?.vehicles?.fourWheelers ?? 0;
  const totalVehicles = twoWheelers + fourWheelers;

  const LoadingCard = () => (
    <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  const cards = [
    {
      title: "My Flat",
      value: flatNumber,
      description: `${tower} • ${floor}`,
      icon: Home,
      iconWrapper: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
    },
    {
      title: "Flat Members",
      value: summary?.members ?? 0,
      description: "Family members",
      icon: Users,
      iconWrapper: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-700",
    },
    {
      title: "My Pending Requests",
      value: summary?.pendingRequests ?? 0,
      description: "Awaiting approval",
      icon: FileText,
      iconWrapper: "bg-violet-100",
      iconColor: "text-violet-600",
      valueColor: "text-violet-700",
    },
  ];

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* My Flat */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex min-h-[145px] items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col items-start">
              <p className="text-sm font-semibold text-slate-700">My Flat</p>
              <p className="mt-1 max-w-full truncate text-xs text-slate-400">
                {tower} • {floor}
              </p>
              <div className="mt-auto pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Home className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="shrink-0 pl-2 text-right">
              <h2 className="text-3xl font-bold leading-tight text-blue-700">
                {flatNumber}
              </h2>
              <p className="mt-1 text-[11px] text-slate-400">Flat number</p>
            </div>
          </div>
        </div>

        {/* Total Vehicles — soft-tinted design */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex min-h-[145px] flex-col">
            <p className="text-sm font-semibold text-slate-700">
              Total Vehicles
            </p>

            <div className="mt-3 flex-1 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-50/80 p-3">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex min-w-0 items-center gap-2 rounded-lg border border-emerald-100/80 bg-white/40 px-2 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100/80">
                    <Bike className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="whitespace-nowrap text-[11px] font-medium text-slate-500">
                      2 Wheelers
                    </p>
                    <p className="mt-0.5 text-2xl font-bold leading-none text-emerald-700">
                      {twoWheelers}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-2 rounded-lg border border-emerald-100/80 bg-white/40 px-2 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100/80">
                    <Car className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="whitespace-nowrap text-[11px] font-medium text-slate-500">
                      4 Wheelers
                    </p>
                    <p className="mt-0.5 text-2xl font-bold leading-none text-emerald-700">
                      {fourWheelers}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
              <p className="text-xs text-slate-500">
                Total:{" "}
                <span className="font-bold text-emerald-700">
                  {totalVehicles}
                </span>{" "}
                {totalVehicles === 1 ? "vehicle" : "vehicles"}
              </p>
            </div>
          </div>
        </div>

        {/* Other summary cards: title + subtitle + icon on left, count on right */}
        {cards.slice(1).map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex min-h-[105px] items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 flex-col items-start">.
                  <div className="mt-auto pt-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${card.iconWrapper}`}
                    >
                      <Icon className={`h-5 w-5 ${card.iconColor}`} />
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-700">
                    {card.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {card.description}
                  </p>
                  {/* <div className="mt-auto pt-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${card.iconWrapper}`}
                    >
                      <Icon className={`h-5 w-5 ${card.iconColor}`} />
                    </div>
                  </div> */}
                </div>

                <div className="shrink-0 pl-2 text-right">
                  <h2
                    className={`text-3xl font-bold leading-tight ${card.valueColor}`}
                  >
                    {card.value}
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {card.title === "Flat Members"
                      ? "Members"
                      : "Requests"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSummaryCards;
