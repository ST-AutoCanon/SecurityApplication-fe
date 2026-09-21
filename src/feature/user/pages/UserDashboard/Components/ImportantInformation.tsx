// // import {
// //   ChevronRight,
// //   Clock3,
// //   FileText,
// //   Info,
// //   Phone,
// //   Wrench,
// // } from "lucide-react";

// // type InformationItem = {
// //   id: number;
// //   title: string;
// //   description: string;
// //   type: "emergency" | "maintenance" | "hours" | "rules";
// // };

// // const informationItems: InformationItem[] = [
// //   {
// //     id: 1,
// //     title: "Emergency Contacts",
// //     description: "Security, Medical, Fire",
// //     type: "emergency",
// //   },
// //   {
// //     id: 2,
// //     title: "Maintenance Helpline",
// //     description: "+91 98765 43210",
// //     type: "maintenance",
// //   },
// //   {
// //     id: 3,
// //     title: "Office Hours",
// //     description: "9:00 AM – 6:00 PM (Mon - Sat)",
// //     type: "hours",
// //   },
// //   {
// //     id: 4,
// //     title: "Society Rules & Guidelines",
// //     description: "View community rules and policies",
// //     type: "rules",
// //   },
// // ];

// // const ImportantInformation = () => {
// //   // ==========================================================
// //   // ICON
// //   // ==========================================================

// //   const getIcon = (type: InformationItem["type"]) => {
// //     switch (type) {
// //       case "emergency":
// //         return Phone;

// //       case "maintenance":
// //         return Wrench;

// //       case "hours":
// //         return Clock3;

// //       case "rules":
// //         return FileText;

// //       default:
// //         return Info;
// //     }
// //   };

// //   // ==========================================================
// //   // ICON STYLE
// //   // ==========================================================

// //   const getIconStyle = (
// //     type: InformationItem["type"]
// //   ) => {
// //     switch (type) {
// //       case "emergency":
// //         return {
// //           background: "bg-red-500",
// //           text: "text-white",
// //         };

// //       case "maintenance":
// //         return {
// //           background: "bg-blue-500",
// //           text: "text-white",
// //         };

// //       case "hours":
// //         return {
// //           background: "bg-purple-500",
// //           text: "text-white",
// //         };

// //       case "rules":
// //         return {
// //           background: "bg-slate-500",
// //           text: "text-white",
// //         };

// //       default:
// //         return {
// //           background: "bg-blue-500",
// //           text: "text-white",
// //         };
// //     }
// //   };

// //   // ==========================================================
// //   // UI
// //   // ==========================================================

// //   return (
// //     <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm">
// //       {/* ======================================================
// //           HEADER
// //       ======================================================= */}

// //       <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
// //         <div className="flex items-center gap-2">
// //           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
// //             <Info
// //               size={17}
// //               className="text-blue-600"
// //             />
// //           </div>

// //           <h2 className="text-[15px] font-semibold text-slate-900">
// //             Important Information
// //           </h2>
// //         </div>

// //         <button
// //           type="button"
// //           className="text-[11px] font-medium text-blue-600 transition hover:text-blue-800"
// //         >
// //           View All
// //         </button>
// //       </div>

// //       {/* ======================================================
// //           INFORMATION LIST
// //       ======================================================= */}

// //       <div className="px-4">
// //         {informationItems.map(
// //           (item, index) => {
// //             const Icon = getIcon(item.type);

// //             const iconStyle =
// //               getIconStyle(item.type);

// //             return (
// //               <div
// //                 key={item.id}
// //                 className={`group flex items-center gap-3 py-4 ${
// //                   index !==
// //                   informationItems.length - 1
// //                     ? "border-b border-slate-100"
// //                     : ""
// //                 }`}
// //               >
// //                 {/* ==================================================
// //                     ICON
// //                 =================================================== */}

// //                 <div
// //                   className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${iconStyle.background}`}
// //                 >
// //                   <Icon
// //                     size={17}
// //                     className={iconStyle.text}
// //                   />
// //                 </div>

// //                 {/* ==================================================
// //                     TEXT
// //                 =================================================== */}

// //                 <div className="min-w-0 flex-1">
// //                   <h3 className="line-clamp-1 text-[12px] font-semibold text-slate-800">
// //                     {item.title}
// //                   </h3>

// //                   <p className="mt-1 line-clamp-1 text-[10px] text-slate-500">
// //                     {item.description}
// //                   </p>
// //                 </div>

// //                 {/* ==================================================
// //                     ARROW
// //                 =================================================== */}

// //                 <ChevronRight
// //                   size={15}
// //                   className="flex-shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600"
// //                 />
// //               </div>
// //             );
// //           }
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImportantInformation;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   AlertCircle,
//   Bell,
//   CalendarDays,
//   ChevronRight,
//   Info,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// type ImportantInformationItem = {
//   id: number;
//   title: string;
//   description: string;
//   priority: "Important" | "Notice" | "General" | string;
//   created_at: string;
//   expires_at: string | null;
// };

// const ImportantInformation = () => {
//   const [items, setItems] = useState<ImportantInformationItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchImportantInformation();
//   }, []);

//   const fetchImportantInformation = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.get(
//         `${API}/api/user-dashboard/important-information`,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data?.success) {
//         setItems(response.data.data || []);
//       } else {
//         setItems([]);
//       }
//     } catch (err) {
//       console.error(
//         "Failed to fetch important information:",
//         err
//       );

//       setError("Unable to load important information.");
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date: string) => {
//     if (!date) return "";

//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const getPriorityIcon = (priority: string) => {
//     switch (priority?.toLowerCase()) {
//       case "important":
//         return <AlertCircle size={18} />;

//       case "notice":
//         return <Bell size={18} />;

//       default:
//         return <Info size={18} />;
//     }
//   };

//   const getPriorityLabel = (priority: string) => {
//     if (!priority) return "Information";

//     return priority;
//   };

//   if (loading) {
//     return (
//       <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//         <div className="flex items-center justify-between mb-5">
//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
//               Important Information
//             </h2>

//             <p className="text-sm text-slate-500 mt-1">
//               Important updates from your apartment
//             </p>
//           </div>
//         </div>

//         <div className="space-y-3">
//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               className="animate-pulse rounded-xl bg-slate-100 h-20"
//             />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-5">
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
//             <Bell
//               size={20}
//               className="text-amber-600"
//             />
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
//               Important Information
//             </h2>

//             <p className="text-sm text-slate-500 mt-1">
//               Important updates from your apartment
//             </p>
//           </div>
//         </div>

//         {items.length > 0 && (
//           <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700">
//             {items.length}{" "}
//             {items.length === 1
//               ? "Information"
//               : "Information"}
//           </span>
//         )}
//       </div>

//       {/* ERROR */}
//       {error && (
//         <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
//           {error}
//         </div>
//       )}

//       {/* EMPTY */}
//       {!error && items.length === 0 && (
//         <div className="py-10 text-center">
//           <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
//             <Info
//               size={22}
//               className="text-slate-400"
//             />
//           </div>

//           <p className="text-sm font-medium text-slate-600">
//             No important information
//           </p>

//           <p className="text-xs text-slate-400 mt-1">
//             There are no current updates from your apartment.
//           </p>
//         </div>
//       )}

//       {/* LIST */}
//       {!error && items.length > 0 && (
//         <div className="space-y-3">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="group rounded-xl border border-slate-200 p-4 hover:border-amber-200 hover:bg-amber-50/30 transition"
//             >
//               <div className="flex gap-4">
//                 {/* ICON */}
//                 <div
//                   className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
//                     item.priority?.toLowerCase() ===
//                     "important"
//                       ? "bg-red-50 text-red-600"
//                       : item.priority?.toLowerCase() ===
//                         "notice"
//                       ? "bg-blue-50 text-blue-600"
//                       : "bg-slate-100 text-slate-600"
//                   }`}
//                 >
//                   {getPriorityIcon(item.priority)}
//                 </div>

//                 {/* CONTENT */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-start justify-between gap-3">
//                     <div>
//                       <h3 className="text-sm font-semibold text-slate-900">
//                         {item.title}
//                       </h3>

//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
//                           {getPriorityLabel(
//                             item.priority
//                           )}
//                         </span>

//                         <span className="text-xs text-slate-400">
//                           {formatDate(item.created_at)}
//                         </span>
//                       </div>
//                     </div>

//                     <ChevronRight
//                       size={18}
//                       className="text-slate-300 group-hover:text-amber-500 transition flex-shrink-0"
//                     />
//                   </div>

//                   <p className="text-sm text-slate-600 mt-3 leading-6">
//                     {item.description}
//                   </p>

//                   {item.expires_at && (
//                     <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
//                       <CalendarDays size={13} />

//                       <span>
//                         Valid until{" "}
//                         {formatDate(item.expires_at)}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default ImportantInformation;
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  ChevronRight,
  Info,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type ImportantInformationItem = {
  id: number;
  organisation_id: number;
  title: string;
  description: string;
  priority: string;
  created_by: number | null;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
};

const ImportantInformation = () => {
  const [items, setItems] = useState<ImportantInformationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected information for popup
  const [selectedInfo, setSelectedInfo] =
    useState<ImportantInformationItem | null>(null);

  useEffect(() => {
    fetchImportantInformation();
  }, []);

  const fetchImportantInformation = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API}/api/user-dashboard/important-information`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setItems(response.data.data || []);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(
        "Failed to fetch important information:",
        err
      );

      setError("Unable to load important information.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // DATE FORMAT
  // ============================================================

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ============================================================
  // PRIORITY ICON
  // ============================================================

  const getPriorityIcon = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "important":
        return <AlertCircle size={18} />;

      case "notice":
        return <Bell size={18} />;

      default:
        return <Info size={18} />;
    }
  };

  // ============================================================
  // PRIORITY STYLE
  // ============================================================

  const getPriorityStyle = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "important":
        return {
          icon: "bg-red-50 text-red-600",
          badge: "bg-red-50 text-red-600",
        };

      case "notice":
        return {
          icon: "bg-blue-50 text-blue-600",
          badge: "bg-blue-50 text-blue-600",
        };

      default:
        return {
          icon: "bg-slate-100 text-slate-600",
          badge: "bg-slate-100 text-slate-600",
        };
    }
  };

  // ============================================================
  // CLOSE MODAL
  // ============================================================

  const closeModal = () => {
    setSelectedInfo(null);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Bell
              size={20}
              className="text-amber-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Important Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Important updates from your apartment
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl bg-slate-100 h-20"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ========================================================
          IMPORTANT INFORMATION LIST
      ======================================================== */}

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Bell
                size={20}
                className="text-amber-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Important Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Important updates from your apartment
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700">
              {items.length}{" "}
              {items.length === 1
                ? "Information"
                : "Information"}
            </span>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!error && items.length === 0 && (
          <div className="py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Info
                size={22}
                className="text-slate-400"
              />
            </div>

            <p className="text-sm font-medium text-slate-600">
              No important information
            </p>

            <p className="text-xs text-slate-400 mt-1">
              There are no current updates from your apartment.
            </p>
          </div>
        )}

        {/* LIST */}
        {!error && items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => {
              const style = getPriorityStyle(
                item.priority
              );

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedInfo(item)}
                  className="group cursor-pointer rounded-xl border border-slate-200 p-4 hover:border-amber-200 hover:bg-amber-50/30 transition"
                >
                  <div className="flex gap-4">
                    {/* ICON */}
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${style.icon}`}
                    >
                      {getPriorityIcon(item.priority)}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </h3>

                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${style.badge}`}
                            >
                              {item.priority ||
                                "Information"}
                            </span>

                            <span className="text-xs text-slate-400">
                              {formatDate(
                                item.created_at
                              )}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          size={18}
                          className="text-slate-300 group-hover:text-amber-500 transition flex-shrink-0"
                        />
                      </div>

                      <p className="text-sm text-slate-600 mt-3 leading-6 line-clamp-2">
                        {item.description}
                      </p>

                      {item.expires_at && (
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
                          <CalendarDays size={13} />

                          <span>
                            Valid until{" "}
                            {formatDate(
                              item.expires_at
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================
          IMPORTANT INFORMATION POPUP
      ======================================================== */}

      {selectedInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200">
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${getPriorityStyle(
                    selectedInfo.priority
                  ).icon}`}
                >
                  {getPriorityIcon(
                    selectedInfo.priority
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {selectedInfo.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityStyle(
                        selectedInfo.priority
                      ).badge}`}
                    >
                      {selectedInfo.priority ||
                        "Information"}
                    </span>

                    <span className="text-xs text-slate-400">
                      {formatDate(
                        selectedInfo.created_at
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="px-6 py-6">
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-5">
                <p className="text-sm font-medium text-slate-500 mb-2">
                  Information
                </p>

                <p className="text-sm text-slate-700 leading-7 whitespace-pre-wrap">
                  {selectedInfo.description}
                </p>
              </div>

              {/* DATE INFORMATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <CalendarDays size={16} />

                    <span className="text-xs">
                      Published On
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {formatDate(
                      selectedInfo.created_at
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <CalendarDays size={16} />

                    <span className="text-xs">
                      Expires On
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {selectedInfo.expires_at
                      ? formatDate(
                          selectedInfo.expires_at
                        )
                      : "No expiry date"}
                  </p>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
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

export default ImportantInformation;