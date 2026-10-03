import { useEffect, useState } from "react";
import axios from "axios";
import {
  Home,
  Car,
  Users,
  FileText,
  ChevronRight,
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
  vehicles: number;
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

  // ============================================================
  // FETCH USER DASHBOARD SUMMARY
  // ============================================================

  useEffect(() => {
    const fetchUserSummary = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get<ApiResponse>(
          `${API}/api/user-dashboard/user-summary`,
          {
            withCredentials: true,
          }
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
          err?.response?.data?.message ||
            "Unable to load dashboard summary"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserSummary();
  }, []);

  // ============================================================
  // HELPERS
  // ============================================================

  const flat = summary?.flat;

  const flatNumber = flat?.flatNumber || "--";

  const tower =
    flat?.blockTower && flat.blockTower.trim() !== ""
      ? flat.blockTower
      : "--";

  const floor =
    flat?.floorNumber !== null &&
    flat?.floorNumber !== undefined
      ? `Floor ${flat.floorNumber}`
      : "--";

  // ============================================================
  // LOADING CARD
  // ============================================================

  const LoadingCard = () => (
    <div className="flex min-h-[125px] items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
    </div>
  );

  // ============================================================
  // ERROR
  // ============================================================

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

  // ============================================================
  // CARD CONFIGURATION
  // ============================================================

  const cards = [
    {
      title: "My Flat",
      value: flatNumber,
      description: `${tower} • ${floor}`,
      icon: Home,
      iconWrapper: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
      arrowColor: "text-blue-500",
    },
    {
      title: "Total Vehicles",
      value: summary?.vehicles ?? 0,
      description: "Registered vehicles",
      icon: Car,
      iconWrapper: "bg-emerald-100",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-700",
      arrowColor: "text-emerald-500",
    },
    {
      title: "Flat Members",
      value: summary?.members ?? 0,
      description: "Family members",
      icon: Users,
      iconWrapper: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-700",
      arrowColor: "text-purple-500",
    },
    {
      title: "My Pending Requests",
      value: summary?.pendingRequests ?? 0,
      description: "Awaiting approval",
      icon: FileText,
      iconWrapper: "bg-violet-100",
      iconColor: "text-violet-600",
      valueColor: "text-violet-700",
      arrowColor: "text-violet-500",
    },
  ];

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="w-full">
      {/* ========================================================
          ERROR MESSAGE
      ======================================================== */}

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ========================================================
          SUMMARY CARDS
      ======================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                {/* LEFT */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h2
                    className={`mt-2 truncate text-2xl font-bold ${card.valueColor}`}
                  >
                    {card.value}
                  </h2>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {card.description}
                  </p>
                </div>

                {/* ICON */}
                <div
                  className={`ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${card.iconWrapper}`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
              </div>

              {/* ARROW */}
              <div
                className={`absolute bottom-4 right-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${card.arrowColor}`}
              >
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSummaryCards;