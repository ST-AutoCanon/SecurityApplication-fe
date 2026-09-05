// import { useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
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
// const LINE_COLORS = [
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

//         setData(result.data || []);
//       } catch (err) {
//         console.error("Entries Overview Error:", err);

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
//    * Get categories dynamically from backend data
//    * =====================================================
//    *
//    * "label" belongs to the X-axis.
//    *
//    * Every other property is a category coming from
//    * the database/backend.
//    *
//    * Example:
//    *
//    * {
//    *   label: "10 AM",
//    *   Visitor: 10,
//    *   Vendor: 5,
//    *   Maid: 3,
//    *   Guest: 8
//    * }
//    *
//    * Categories become:
//    *
//    * ["Visitor", "Vendor", "Maid", "Guest"]
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
//       {/* Header */}
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

//       {/* Chart */}
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
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               data={data}
//               margin={{
//                 top: 15,
//                 right: 20,
//                 left: 0,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="#E5E7EB"
//               />

//               <XAxis
//                 dataKey="label"
//                 tick={{
//                   fontSize: 11,
//                   fill: "#475569",
//                 }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <YAxis
//                 allowDecimals={false}
//                 tick={{
//                   fontSize: 11,
//                   fill: "#475569",
//                 }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#ffffff",
//                   border: "1px solid #E2E8F0",
//                   borderRadius: "8px",
//                   fontSize: "12px",
//                 }}
//               />

//               <Legend
//                 wrapperStyle={{
//                   fontSize: "11px",
//                   paddingTop: "8px",
//                 }}
//               />

//               {/* =========================================
//                   DYNAMIC DATABASE CATEGORIES
//                   ========================================= */}

//               {categories.map((category, index) => {
//                 const color =
//                   LINE_COLORS[
//                     index % LINE_COLORS.length
//                   ];

//                 return (
//                   <Line
//                     key={category}
//                     type="monotone"
//                     dataKey={category}
//                     name={category}
//                     stroke={color}
//                     strokeWidth={2}
//                     dot={{
//                       r: 3,
//                       strokeWidth: 2,
//                       fill: color,
//                     }}
//                     activeDot={{
//                       r: 5,
//                     }}
//                   />
//                 );
//               })}
//             </LineChart>
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

        console.log(
          "Entries Overview Data:",
          result.data
        );

        setData(result.data || []);
      } catch (err) {
        console.error(
          "Entries Overview Error:",
          err
        );

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

              {/* GRID */}

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              {/* X AXIS */}

              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 11,
                  fill: "#475569",
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y AXIS */}

              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 11,
                  fill: "#475569",
                }}
                axisLine={false}
                tickLine={false}
              />

              {/* TOOLTIP */}

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",
                }}
                cursor={{
                  fill: "rgba(37, 99, 235, 0.05)",
                }}
              />

              {/* LEGEND */}

              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  paddingTop: "8px",
                }}
              />

              {/* =================================================
                  DYNAMIC CATEGORY BARS
                  ================================================= */}

              {categories.map((category, index) => {

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
                    radius={
                      index === categories.length - 1
                        ? [4, 4, 0, 0]
                        : [0, 0, 0, 0]
                    }
                  />
                );

              })}

            </BarChart>

          </ResponsiveContainer>

        )}

      </div>
    </div>
  );
}