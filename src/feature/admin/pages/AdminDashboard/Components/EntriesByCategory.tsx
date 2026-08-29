import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

type Period = "daily" | "weekly" | "monthly";

interface EntriesByCategoryProps {
  period: Period;
}

interface CategoryData {
  category: string;
  count: number;
}

const API = import.meta.env.VITE_BACKEND_URL;

const COLORS = [
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

export default function EntriesByCategory({
  period,
}: EntriesByCategoryProps) {
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntriesByCategory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API}/api/admin/dashboard/entries-by-category?period=${period}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch entries by category"
          );
        }

        setData(result.data || []);
      } catch (err) {
        console.error("Entries By Category Error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load category graph"
        );

        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntriesByCategory();
  }, [period]);

  const totalEntries = data.reduce(
    (total, item) => total + Number(item.count || 0),
    0
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full">
      {/* Header */}
      <div className="px-5 pt-4">
        <h2 className="text-sm font-semibold text-slate-800">
          Entries by Category (
          {period === "daily"
            ? "Today"
            : period === "weekly"
            ? "This Week"
            : "This Month"}
          )
        </h2>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full px-3 pb-4 pt-2">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Loading category data...
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-sm text-red-500">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No category data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  Number(value),
                  String(name),
                ]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: "11px",
                }}
              />

              {/* Center total */}
              <text
                x="50%"
                y="43%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-800"
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {totalEntries}
              </text>

              <text
                x="50%"
                y="51%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-400"
                style={{
                  fontSize: "10px",
                }}
              >
                Total Entries
              </text>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}