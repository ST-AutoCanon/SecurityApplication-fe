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
  const [summary, setSummary] =
    useState<UserDashboardSummary | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            response.data?.message ||
              "Unable to load dashboard summary"
          );
        }
      } catch (err: unknown) {
        console.error("User Dashboard Summary Error:", err);

        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Unable to load dashboard summary"
          );
        } else {
          setError("Unable to load dashboard summary");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchUserSummary();
  }, []);

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

  const twoWheelers =
    summary?.vehicles?.twoWheelers ?? 0;

  const fourWheelers =
    summary?.vehicles?.fourWheelers ?? 0;

  const totalVehicles =
    twoWheelers + fourWheelers;

  const cards = [
    {
      title: "Flat Members",
      value: summary?.members ?? 0,
      description: "Family members",
      countLabel: "Members",
      icon: Users,
      iconWrapper: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-700",
    },
    {
      title: "My Pending Requests",
      value: summary?.pendingRequests ?? 0,
      description: "Awaiting approval",
      countLabel: "Requests",
      icon: FileText,
      iconWrapper: "bg-violet-100",
      iconColor: "text-violet-600",
      valueColor: "text-violet-700",
    },
  ];

  /*
   * ============================================================
   * LOADING STATE
   * ============================================================
   */
  if (loading) {
    return (
      <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex min-h-[170px] items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        ))}
      </div>
    );
  }

  /*
   * ============================================================
   * UI
   * ============================================================
   */
  return (
    <div className="w-full min-w-0">
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/*
       * Grid:
       * Mobile          -> 1 column
       * Small/tablet    -> 2 columns
       * Large desktop   -> 4 columns
       *
       * items-stretch ensures equal heights within each row.
       */}
      <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* ======================================================
            MY FLAT
            ====================================================== */}
        <div className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5">
          <div className="flex min-h-[140px] flex-1 items-center justify-between gap-3">
            {/* LEFT: TITLE, DESCRIPTION, ICON */}
            <div className="flex min-w-0 flex-1 flex-col self-stretch">
              <p className="text-sm font-semibold leading-5 text-slate-700">
                My Flat
              </p>

              <p
                className="mt-1 break-words text-xs leading-5 text-slate-400"
                title={`${tower} • ${floor}`}
              >
                {tower} <span aria-hidden="true">•</span> {floor}
              </p>

              <div className="mt-auto pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Home className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            {/* RIGHT: FLAT NUMBER */}
            <div className="flex min-w-0 max-w-[55%] flex-col items-end justify-center text-right">
              <h2
                className="max-w-full break-words text-2xl font-bold leading-tight text-blue-700 sm:text-3xl"
                title={flatNumber}
              >
                {flatNumber}
              </h2>

              <p className="mt-1 text-[11px] leading-4 text-slate-400">
                Flat number
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            TOTAL VEHICLES
            ====================================================== */}
        <div className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5">
          <div className="flex min-h-[140px] flex-1 flex-col">
            <p className="text-sm font-semibold leading-5 text-slate-700">
              Total Vehicles
            </p>

            {/* Soft-tinted vehicle panel */}
            <div className="mt-3 flex-1 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-50/80 p-2.5 sm:p-3">
              <div className="grid h-full grid-cols-2 gap-2">
                {/* TWO-WHEELERS */}
                <div className="flex min-w-0 flex-col justify-center gap-2 rounded-lg border border-emerald-100/80 bg-white/50 p-2 sm:flex-row sm:items-center sm:gap-2.5 sm:p-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full bg-emerald-100/80 sm:self-auto">
                    <Bike className="h-5 w-5 text-emerald-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="break-words text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                      2 Wheelers
                    </p>

                    <p className="mt-1 break-words text-xl font-bold leading-none text-emerald-700 sm:text-2xl">
                      {twoWheelers}
                    </p>
                  </div>
                </div>

                {/* FOUR-WHEELERS */}
                <div className="flex min-w-0 flex-col justify-center gap-2 rounded-lg border border-emerald-100/80 bg-white/50 p-2 sm:flex-row sm:items-center sm:gap-2.5 sm:p-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full bg-emerald-100/80 sm:self-auto">
                    <Car className="h-5 w-5 text-emerald-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="break-words text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                      4 Wheelers
                    </p>

                    <p className="mt-1 break-words text-xl font-bold leading-none text-emerald-700 sm:text-2xl">
                      {fourWheelers}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TOTAL FOOTER */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-1 border-t border-slate-100 pt-2.5">
              <p className="text-xs leading-5 text-slate-500">
                Total:{" "}
                <span className="font-bold text-emerald-700">
                  {totalVehicles}
                </span>{" "}
                {totalVehicles === 1 ? "vehicle" : "vehicles"}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            FLAT MEMBERS AND PENDING REQUESTS
            ====================================================== */}
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5"
            >
              <div className="flex min-h-[140px] flex-1 items-center justify-between gap-3">
                {/* LEFT: TITLE, DESCRIPTION, ICON */}
                <div className="flex min-w-0 flex-1 flex-col self-stretch">
                  <p className="break-words text-sm font-semibold leading-5 text-slate-700">
                    {card.title}
                  </p>

                  <p className="mt-1 break-words text-xs leading-5 text-slate-400">
                    {card.description}
                  </p>

                  <div className="mt-auto pt-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${card.iconWrapper}`}
                    >
                      <Icon
                        className={`h-5 w-5 ${card.iconColor}`}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT: COUNT */}
                <div className="flex min-w-0 max-w-[42%] flex-col items-end justify-center text-right">
                  <h2
                    className={`max-w-full break-words text-3xl font-bold leading-tight ${card.valueColor}`}
                  >
                    {card.value}
                  </h2>

                  <p className="mt-1 break-words text-[11px] leading-4 text-slate-400">
                    {card.countLabel}
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