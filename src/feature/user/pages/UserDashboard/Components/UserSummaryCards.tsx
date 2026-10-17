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

  const twoWheelers = summary?.vehicles?.twoWheelers ?? 0;
  const fourWheelers = summary?.vehicles?.fourWheelers ?? 0;
  const totalVehicles = twoWheelers + fourWheelers;

  const cards = [
    {
      title: "Flat Members",
      value: summary?.members ?? 0,
      description: "Family members",
      countLabel: "Members",
      footer: "Your household",
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
      footer: "Request status",
      icon: FileText,
      iconWrapper: "bg-violet-100",
      iconColor: "text-violet-600",
      valueColor: "text-violet-700",
    },
  ];

  /*
   * Shared card layout:
   * - Cards stretch equally within each grid row.
   * - Footer stays at the bottom.
   * - Content can wrap without overflowing.
   */
  const cardClass =
    "flex h-full min-w-0 flex-col rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5";

  const iconClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full";

  /*
   * Responsive header:
   * The left content can shrink and wrap.
   * The right value retains its own space.
   */
  const headerClass =
    "grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-3";

  const titleClass =
    "break-words [overflow-wrap:anywhere] text-sm font-semibold leading-5 text-slate-700";

  const descriptionClass =
    "mt-1 break-words [overflow-wrap:anywhere] text-xs leading-5 text-slate-400";

  const countClass =
    "max-w-full break-words text-right text-2xl font-bold leading-tight tabular-nums sm:text-3xl";

  const footerClass =
    "mt-auto flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-2 pt-5";

  if (loading) {
    return (
      <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm"
          >
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/*
        Responsive grid:
        Small screens       -> 1 column
        Tablets/desktops    -> 2 columns
        Extra-large screens -> 4 columns

        Using 2xl for four columns prevents cards from
        becoming too narrow when a sidebar is present.
      */}
      <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 2xl:grid-cols-4">

        {/* MY FLAT */}
        <div className={`${cardClass} min-h-[220px]`}>
          <div className={headerClass}>
            <div className="min-w-0">
              <p className={titleClass}>My Flat</p>

              <p
                className={descriptionClass}
                title={`${tower} • ${floor}`}
              >
                {tower}
                <span className="mx-1" aria-hidden="true">
                  •
                </span>
                {floor}
              </p>
            </div>

            <div className="flex min-w-0 max-w-[120px] flex-col items-end text-right">
              <h2
                className={`${countClass} text-blue-700`}
                title={flatNumber}
              >
                {flatNumber}
              </h2>

              <p className="mt-1 break-words text-[11px] leading-4 text-slate-400">
                Flat number
              </p>
            </div>
          </div>

          <div className={footerClass}>
            <div className={`${iconClass} bg-blue-100`}>
              <Home className="h-5 w-5 text-blue-600" />
            </div>

            <span className="min-w-0 break-words text-right text-xs font-medium leading-5 text-slate-400">
              My residence
            </span>
          </div>
        </div>

        {/* TOTAL VEHICLES */}
        <div className={`${cardClass} min-h-[220px]`}>
          <div className={headerClass}>
            <div className="min-w-0">
              <p className={titleClass}>Total Vehicles</p>

              <p className={descriptionClass}>
                Registered vehicles
              </p>
            </div>

            <div className="flex min-w-0 flex-col items-end text-right">
              <h2 className={`${countClass} text-emerald-700`}>
                {totalVehicles}
              </h2>

              <p className="mt-1 text-[11px] leading-4 text-slate-400">
                {totalVehicles === 1 ? "Vehicle" : "Vehicles"}
              </p>
            </div>
          </div>

          {/* VEHICLE BREAKDOWN */}
          <div className="mt-4 grid min-w-0 flex-1 grid-cols-2 gap-2 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-50/80 p-2 sm:p-2.5">

            {/* TWO-WHEELERS */}
            <div className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-lg border border-emerald-100/80 bg-white/70 px-1.5 py-3 text-center">
              <div className={`${iconClass} h-9 w-9 bg-emerald-100/80`}>
                <Bike className="h-5 w-5 text-emerald-700" />
              </div>

              <p className="max-w-full break-words text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                2 Wheelers
              </p>

              <p className="max-w-full break-words text-xl font-bold leading-tight tabular-nums text-emerald-700">
                {twoWheelers}
              </p>
            </div>

            {/* FOUR-WHEELERS */}
            <div className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-lg border border-emerald-100/80 bg-white/70 px-1.5 py-3 text-center">
              <div className={`${iconClass} h-9 w-9 bg-emerald-100/80`}>
                <Car className="h-5 w-5 text-emerald-700" />
              </div>

              <p className="max-w-full break-words text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                4 Wheelers
              </p>

              <p className="max-w-full break-words text-xl font-bold leading-tight tabular-nums text-emerald-700">
                {fourWheelers}
              </p>
            </div>
          </div>
        </div>

        {/* FLAT MEMBERS & PENDING REQUESTS */}
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`${cardClass} min-h-[220px]`}
            >
              <div className={headerClass}>
                <div className="min-w-0">
                  <p className={titleClass}>{card.title}</p>

                  <p className={descriptionClass}>
                    {card.description}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col items-end text-right">
                  <h2
                    className={`${countClass} ${card.valueColor}`}
                  >
                    {card.value}
                  </h2>

                  <p className="mt-1 break-words text-[11px] leading-4 text-slate-400">
                    {card.countLabel}
                  </p>
                </div>
              </div>

              <div className={footerClass}>
                <div className={`${iconClass} ${card.iconWrapper}`}>
                  <Icon
                    className={`h-5 w-5 ${card.iconColor}`}
                  />
                </div>

                <span className="min-w-0 break-words text-right text-xs font-medium leading-5 text-slate-400">
                  {card.footer}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSummaryCards;