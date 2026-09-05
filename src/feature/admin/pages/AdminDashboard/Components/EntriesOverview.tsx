// // import { useEffect, useState } from "react";
// // import {
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   CartesianGrid,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// // } from "recharts";

// // type Period = "daily" | "weekly" | "monthly";

// // interface EntriesOverviewProps {
// //   period: Period;
// // }

// // interface EntryData {
// //   label: string;
// //   [key: string]: string | number;
// // }

// // const API = import.meta.env.VITE_BACKEND_URL;

// // // Only controls visual appearance.
// // // Categories themselves are NOT hardcoded.
// // const LINE_COLORS = [
// //   "#2563EB",
// //   "#7C3AED",
// //   "#16A34A",
// //   "#EA580C",
// //   "#DC2626",
// //   "#0891B2",
// //   "#CA8A04",
// //   "#DB2777",
// //   "#4F46E5",
// //   "#059669",
// // ];

// // export default function EntriesOverview({
// //   period,
// // }: EntriesOverviewProps) {
// //   const [data, setData] = useState<EntryData[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchEntriesOverview = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         const response = await fetch(
// //           `${API}/api/admin/dashboard/entries-overview?period=${period}`,
// //           {
// //             method: "GET",
// //             credentials: "include",
// //           }
// //         );

// //         const result = await response.json();

// //         if (!response.ok || !result.success) {
// //           throw new Error(
// //             result.message || "Failed to fetch entries overview"
// //           );
// //         }

// //         setData(result.data || []);
// //       } catch (err) {
// //         console.error("Entries Overview Error:", err);

// //         setError(
// //           err instanceof Error
// //             ? err.message
// //             : "Failed to load graph"
// //         );

// //         setData([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchEntriesOverview();
// //   }, [period]);

// //   /*
// //    * =====================================================
// //    * Get categories dynamically from backend data
// //    * =====================================================
// //    *
// //    * "label" belongs to the X-axis.
// //    *
// //    * Every other property is a category coming from
// //    * the database/backend.
// //    *
// //    * Example:
// //    *
// //    * {
// //    *   label: "10 AM",
// //    *   Visitor: 10,
// //    *   Vendor: 5,
// //    *   Maid: 3,
// //    *   Guest: 8
// //    * }
// //    *
// //    * Categories become:
// //    *
// //    * ["Visitor", "Vendor", "Maid", "Guest"]
// //    */

// //   const categories = Array.from(
// //     new Set(
// //       data.flatMap((item) =>
// //         Object.keys(item).filter(
// //           (key) => key !== "label"
// //         )
// //       )
// //     )
// //   );

// //   return (
// //     <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full">
// //       {/* Header */}
// //       <div className="px-5 pt-4">
// //         <h2 className="text-sm font-semibold text-slate-800">
// //           Entries Overview (
// //           {period === "daily"
// //             ? "Today"
// //             : period === "weekly"
// //             ? "This Week"
// //             : "This Month"}
// //           )
// //         </h2>
// //       </div>

// //       {/* Chart */}
// //       <div className="h-[300px] w-full px-3 pb-4 pt-2">
// //         {loading ? (
// //           <div className="flex h-full items-center justify-center text-sm text-slate-400">
// //             Loading entries...
// //           </div>
// //         ) : error ? (
// //           <div className="flex h-full items-center justify-center text-sm text-red-500">
// //             {error}
// //           </div>
// //         ) : data.length === 0 ? (
// //           <div className="flex h-full items-center justify-center text-sm text-slate-400">
// //             No entry data available
// //           </div>
// //         ) : categories.length === 0 ? (
// //           <div className="flex h-full items-center justify-center text-sm text-slate-400">
// //             No categories available
// //           </div>
// //         ) : (
// //           <ResponsiveContainer width="100%" height="100%">
// //             <LineChart
// //               data={data}
// //               margin={{
// //                 top: 15,
// //                 right: 20,
// //                 left: 0,
// //                 bottom: 5,
// //               }}
// //             >
// //               <CartesianGrid
// //                 strokeDasharray="3 3"
// //                 vertical={false}
// //                 stroke="#E5E7EB"
// //               />

// //               <XAxis
// //                 dataKey="label"
// //                 tick={{
// //                   fontSize: 11,
// //                   fill: "#475569",
// //                 }}
// //                 axisLine={false}
// //                 tickLine={false}
// //               />

// //               <YAxis
// //                 allowDecimals={false}
// //                 tick={{
// //                   fontSize: 11,
// //                   fill: "#475569",
// //                 }}
// //                 axisLine={false}
// //                 tickLine={false}
// //               />

// //               <Tooltip
// //                 contentStyle={{
// //                   backgroundColor: "#ffffff",
// //                   border: "1px solid #E2E8F0",
// //                   borderRadius: "8px",
// //                   fontSize: "12px",
// //                 }}
// //               />

// //               <Legend
// //                 wrapperStyle={{
// //                   fontSize: "11px",
// //                   paddingTop: "8px",
// //                 }}
// //               />

// //               {/* =========================================
// //                   DYNAMIC DATABASE CATEGORIES
// //                   ========================================= */}

// //               {categories.map((category, index) => {
// //                 const color =
// //                   LINE_COLORS[
// //                     index % LINE_COLORS.length
// //                   ];

// //                 return (
// //                   <Line
// //                     key={category}
// //                     type="monotone"
// //                     dataKey={category}
// //                     name={category}
// //                     stroke={color}
// //                     strokeWidth={2}
// //                     dot={{
// //                       r: 3,
// //                       strokeWidth: 2,
// //                       fill: color,
// //                     }}
// //                     activeDot={{
// //                       r: 5,
// //                     }}
// //                   />
// //                 );
// //               })}
// //             </LineChart>
// //           </ResponsiveContainer>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";

// type Period = "daily" | "weekly" | "monthly";

// interface EntriesOverviewProps {
//   period: Period;
// }

// interface EntryData {
//   label: string;
//   [key: string]: string | number;
// }

// const API = import.meta.env.VITE_BACKEND_URL;

// // Only controls visual appearance.
// // Categories themselves are NOT hardcoded.
// const BAR_COLORS = [
//   "#2563EB",
//   "#7C3AED",
//   "#16A34A",
//   "#EA580C",
//   "#DC2626",
//   "#0891B2",
//   "#CA8A04",
//   "#DB2777",
//   "#4F46E5",
//   "#059669",
// ];

// export default function EntriesOverview({
//   period,
// }: EntriesOverviewProps) {
//   const [data, setData] = useState<EntryData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEntriesOverview = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(
//           `${API}/api/admin/dashboard/entries-overview?period=${period}`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const result = await response.json();

//         if (!response.ok || !result.success) {
//           throw new Error(
//             result.message || "Failed to fetch entries overview"
//           );
//         }

//         console.log(
//           "Entries Overview Data:",
//           result.data
//         );

//         setData(result.data || []);
//       } catch (err) {
//         console.error(
//           "Entries Overview Error:",
//           err
//         );

//         setError(
//           err instanceof Error
//             ? err.message
//             : "Failed to load graph"
//         );

//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEntriesOverview();
//   }, [period]);

//   /*
//    * =====================================================
//    * GET CATEGORIES DYNAMICALLY
//    * =====================================================
//    *
//    * "label" is the X-axis.
//    *
//    * Everything else is treated as a category
//    * coming from the backend/database.
//    */

//   const categories = Array.from(
//     new Set(
//       data.flatMap((item) =>
//         Object.keys(item).filter(
//           (key) => key !== "label"
//         )
//       )
//     )
//   );

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="px-5 pt-4">

//         <h2 className="text-sm font-semibold text-slate-800">
//           Entries Overview (
//           {period === "daily"
//             ? "Today"
//             : period === "weekly"
//             ? "This Week"
//             : "This Month"}
//           )
//         </h2>

//       </div>

//       {/* =================================================
//           CHART
//       ================================================= */}

//       <div className="h-[300px] w-full px-3 pb-4 pt-2">

//         {loading ? (

//           <div className="flex h-full items-center justify-center text-sm text-slate-400">
//             Loading entries...
//           </div>

//         ) : error ? (

//           <div className="flex h-full items-center justify-center text-sm text-red-500">
//             {error}
//           </div>

//         ) : data.length === 0 ? (

//           <div className="flex h-full items-center justify-center text-sm text-slate-400">
//             No entry data available
//           </div>

//         ) : categories.length === 0 ? (

//           <div className="flex h-full items-center justify-center text-sm text-slate-400">
//             No categories available
//           </div>

//         ) : (

//           <ResponsiveContainer
//             width="100%"
//             height="100%"
//           >

//             <BarChart
//               data={data}
//               margin={{
//                 top: 15,
//                 right: 20,
//                 left: 0,
//                 bottom: 5,
//               }}
//             >

//               {/* GRID */}

//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="#E5E7EB"
//               />

//               {/* X AXIS */}

//               <XAxis
//                 dataKey="label"
//                 tick={{
//                   fontSize: 11,
//                   fill: "#475569",
//                 }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               {/* Y AXIS */}

//               <YAxis
//                 allowDecimals={false}
//                 tick={{
//                   fontSize: 11,
//                   fill: "#475569",
//                 }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               {/* TOOLTIP */}

//               {/* <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#ffffff",
//                   border: "1px solid #E2E8F0",
//                   borderRadius: "8px",
//                   fontSize: "12px",
//                   boxShadow:
//                     "0 4px 12px rgba(0,0,0,0.08)",
//                 }}
//                 cursor={{
//                   fill: "rgba(37, 99, 235, 0.05)",
//                 }}
//               /> */}
// <Tooltip
//   content={({ active, payload, label }) => {
//     if (!active || !payload || payload.length === 0) {
//       return null;
//     }

//     const visibleData = payload.filter(
//       (item) => Number(item.value) > 0
//     );

//     return (
//       <div
//         style={{
//           backgroundColor: "#ffffff",
//           border: "1px solid #d1d5db",
//           borderRadius: "10px",
//           padding: "12px 14px",
//           boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
//           minWidth: "180px",
//           color: "#1f2937",
//           zIndex: 9999,
//         }}
//       >
//         <div
//           style={{
//             fontWeight: 600,
//             fontSize: "14px",
//             marginBottom: "8px",
//             color: "#111827",
//           }}
//         >
//           {label}
//         </div>

//         {visibleData.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: "20px",
//               marginBottom: "5px",
//               fontSize: "13px",
//             }}
//           >
//             <span
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 color: item.color,
//                 fontWeight: 500,
//               }}
//             >
//               <span
//                 style={{
//                   width: "8px",
//                   height: "8px",
//                   borderRadius: "50%",
//                   backgroundColor: item.color,
//                 }}
//               />

//               {item.name}
//             </span>

//             <strong style={{ color: "#111827" }}>
//               {item.value}
//             </strong>
//           </div>
//         ))}
//       </div>
//     );
//   }}
// />

//               {/* LEGEND */}

//               <Legend
//                 wrapperStyle={{
//                   fontSize: "11px",
//                   paddingTop: "8px",
//                 }}
//               />

//               {/* =================================================
//                   DYNAMIC CATEGORY BARS
//                   ================================================= */}

//               {categories.map((category, index) => {

//                 const color =
//                   BAR_COLORS[
//                     index % BAR_COLORS.length
//                   ];

//                 return (
//                   <Bar
//                     key={category}
//                     dataKey={category}
//                     name={category}
//                     stackId="entries"
//                     fill={color}
//                     radius={
//                       index === categories.length - 1
//                         ? [4, 4, 0, 0]
//                         : [0, 0, 0, 0]
//                     }
//                   />
//                 );

//               })}

//             </BarChart>

//           </ResponsiveContainer>

//         )}

//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type Period = "daily" | "weekly" | "monthly";

interface EntriesOverviewProps {
  period: Period;
}

interface EntryData {
  label: string;
  [key: string]: string | number;
}

const API = import.meta.env.VITE_BACKEND_URL;

// Only controls visual appearance.
// Categories themselves are NOT hardcoded.
const BAR_COLORS = [
  "#2563EB",
  "#7C3AED",
  "#16A34A",
  "#EA580C",
  "#DC2626",
  "#0891B2",
  "#CA8A04",
  "#DB2777",
  "#4F46E5",
  "#059669",
];

export default function EntriesOverview({
  period,
}: EntriesOverviewProps) {
  const [data, setData] = useState<EntryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntriesOverview = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API}/api/admin/dashboard/entries-overview?period=${period}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch entries overview"
          );
        }

        console.log("Entries Overview Data:", result.data);

        setData(result.data || []);
      } catch (err) {
        console.error("Entries Overview Error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load graph"
        );

        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntriesOverview();
  }, [period]);

  /*
   * =====================================================
   * GET CATEGORIES DYNAMICALLY
   * =====================================================
   *
   * "label" is the X-axis.
   *
   * Everything else is treated as a category
   * coming from the backend/database.
   */

  const categories = Array.from(
    new Set(
      data.flatMap((item) =>
        Object.keys(item).filter(
          (key) => key !== "label"
        )
      )
    )
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="px-5 pt-4">
        <h2 className="text-sm font-semibold text-slate-800">
          Entries Overview (
          {period === "daily"
            ? "Today"
            : period === "weekly"
            ? "This Week"
            : "This Month"}
          )
        </h2>
      </div>

      {/* =================================================
          CHART
      ================================================= */}

      <div className="h-[300px] w-full px-3 pb-4 pt-2">

        {loading ? (

          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Loading entries...
          </div>

        ) : error ? (

          <div className="flex h-full items-center justify-center text-sm text-red-500">
            {error}
          </div>

        ) : data.length === 0 ? (

          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No entry data available
          </div>

        ) : categories.length === 0 ? (

          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No categories available
          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={data}
              margin={{
                top: 15,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >

              {/* =================================================
                  GRID
                  ================================================= */}

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              {/* =================================================
                  X AXIS
                  ================================================= */}

              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 11,
                  fill: "#475569",
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* =================================================
                  Y AXIS
                  ================================================= */}

              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 11,
                  fill: "#475569",
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* =================================================
                  CUSTOM TOOLTIP
                  ================================================= */}

              <Tooltip
                cursor={{
                  fill: "rgba(37, 99, 235, 0.06)",
                }}
                content={({ active, payload, label }) => {
                  if (
                    !active ||
                    !payload ||
                    payload.length === 0
                  ) {
                    return null;
                  }

                  /*
                   * Only show categories which have
                   * a value greater than 0.
                   */
                  const visibleData = payload.filter(
                    (item) => Number(item.value) > 0
                  );

                  /*
                   * If everything is 0, don't show
                   * an empty tooltip.
                   */
                  if (visibleData.length === 0) {
                    return null;
                  }

                  return (
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #CBD5E1",
                        borderRadius: "10px",
                        padding: "10px 12px",
                        minWidth: "215px",
                        maxWidth: "240px",

                        /*
                         * Important:
                         * Solid background prevents
                         * graph elements showing through.
                         */
                        opacity: 1,

                        /*
                         * Enough height for around
                         * 10 categories.
                         */
                        maxHeight: "265px",

                        /*
                         * If there are more categories,
                         * tooltip becomes scrollable.
                         */
                        overflowY: "auto",

                        /*
                         * Makes tooltip stay above bars.
                         */
                        position: "relative",
                        zIndex: 9999,

                        boxShadow:
                          "0 8px 24px rgba(15, 23, 42, 0.18)",

                        color: "#1E293B",
                      }}
                    >

                      {/* =================================================
                          TIME / LABEL
                          ================================================= */}

                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "#0F172A",
                          paddingBottom: "8px",
                          marginBottom: "6px",
                          borderBottom:
                            "1px solid #E2E8F0",
                        }}
                      >
                        {label}
                      </div>

                      {/* =================================================
                          CATEGORY VALUES
                          ================================================= */}

                      {visibleData.map(
                        (item, index) => (
                          <div
                            key={`${item.name}-${index}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "space-between",

                              /*
                               * Prevent long category
                               * names from breaking layout.
                               */
                              gap: "12px",

                              minHeight: "21px",
                              marginBottom: "3px",

                              fontSize: "12px",
                            }}
                          >

                            {/* CATEGORY NAME */}

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "7px",
                                minWidth: 0,
                                flex: 1,
                              }}
                            >

                              {/* COLOR DOT */}

                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  minWidth: "8px",
                                  borderRadius:
                                    "50%",
                                  backgroundColor:
                                    item.color ||
                                    "#64748B",
                                }}
                              />

                              {/* CATEGORY */}

                              <span
                                style={{
                                  color:
                                    item.color ||
                                    "#334155",

                                  fontWeight: 500,

                                  /*
                                   * Long category
                                   * names remain readable.
                                   */
                                  whiteSpace:
                                    "nowrap",
                                  overflow:
                                    "hidden",
                                  textOverflow:
                                    "ellipsis",
                                }}
                                title={String(
                                  item.name
                                )}
                              >
                                {item.name}
                              </span>
                            </div>

                            {/* VALUE */}

                            <span
                              style={{
                                fontWeight: 700,
                                color: "#0F172A",
                                minWidth: "20px",
                                textAlign: "right",
                              }}
                            >
                              {item.value}
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  );
                }}
              />

              {/* =================================================
                  LEGEND
                  ================================================= */}

              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  paddingTop: "8px",
                }}
              />

              {/* =================================================
                  DYNAMIC CATEGORY BARS
                  ================================================= */}

              {categories.map(
                (category, index) => {
                  const color =
                    BAR_COLORS[
                      index % BAR_COLORS.length
                    ];

                  return (
                    <Bar
                      key={category}
                      dataKey={category}
                      name={category}
                      stackId="entries"
                      fill={color}

                      /*
                       * Highlight the exact bar segment
                       * being hovered.
                       */
                      activeBar={{
                        stroke: "#0F172A",
                        strokeWidth: 2,
                      }}

                      radius={
                        index ===
                        categories.length - 1
                          ? [4, 4, 0, 0]
                          : [0, 0, 0, 0]
                      }
                    />
                  );
                }
              )}

            </BarChart>

          </ResponsiveContainer>

        )}

      </div>
    </div>
  );
}