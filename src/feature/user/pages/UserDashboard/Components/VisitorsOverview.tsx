import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Users,
  UserRound,
  Search,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Period = "daily" | "weekly" | "monthly";

type VisitorStats = {
  today: number;
  thisWeek: number;
  thisMonth: number;
  pendingApproval: number;
};

type Visitor = {
  id?: number;
  user_id?: number;
  full_name?: string;
  mobile_number?: string;
  table_name?: string;
  purpose?: string;
  visit_date?: string;
  time_in?: string;
  time_out?: string | null;
  punch_type?: string;
  status?: string;
};

interface VisitorsOverviewProps {
  className?: string;
}

const API = import.meta.env.VITE_BACKEND_URL;

const VisitorsOverview = ({
  className = "",
}: VisitorsOverviewProps) => {
  const [period, setPeriod] =
    useState<Period>("daily");

  const [visitors, setVisitors] =
    useState<Visitor[]>([]);

  const [stats, setStats] =
    useState<VisitorStats>({
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      pendingApproval: 0,
    });

  const [loading, setLoading] =
    useState(false);

  const [statsLoading, setStatsLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const ITEMS_PER_PAGE = 6;

  /*
  |--------------------------------------------------------------------------
  | Fetch Visitor Data
  |--------------------------------------------------------------------------
  */

  const fetchVisitors = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/user-dashboard/my-flat-visitors`,
        {
          params: {
            period,
            search,
          },
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        const data =
          response.data?.data;

        /*
         * Supports both:
         *
         * data: [...]
         *
         * and:
         *
         * data: {
         *   visitors: [...]
         * }
         */

        if (Array.isArray(data)) {
          setVisitors(data);
        } else {
          setVisitors(
            Array.isArray(data?.visitors)
              ? data.visitors
              : []
          );
        }
      } else {
        setVisitors([]);
      }
    } catch (error) {
      console.error(
        "Failed to fetch visitors:",
        error
      );

      setVisitors([]);
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch Visitor Summary
  |--------------------------------------------------------------------------
  */

  const fetchVisitorStats = async () => {
    try {
      setStatsLoading(true);

      const response = await axios.get(
        `${API}/api/user-dashboard/visitor-stats`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        const data =
          response.data?.data || {};

        setStats({
          today:
            Number(data.today) || 0,

          thisWeek:
            Number(data.thisWeek) ||
            Number(data.this_week) ||
            0,

          thisMonth:
            Number(data.thisMonth) ||
            Number(data.this_month) ||
            0,

          pendingApproval:
            Number(
              data.pendingApproval
            ) ||
            Number(
              data.pending_approval
            ) ||
            0,
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch visitor stats:",
        error
      );

      /*
       * Don't break the existing visitor
       * list if stats endpoint fails.
       */
      setStats({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        pendingApproval: 0,
      });
    } finally {
      setStatsLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchVisitorStats();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Period / Search Change
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setCurrentPage(1);

    fetchVisitors();
  }, [period, search]);

  /*
  |--------------------------------------------------------------------------
  | Client-side fallback filtering
  |--------------------------------------------------------------------------
  */

  const filteredVisitors = useMemo(() => {
    if (!search.trim()) {
      return visitors;
    }

    const value =
      search.trim().toLowerCase();

    return visitors.filter((visitor) => {
      return (
        visitor.full_name
          ?.toLowerCase()
          .includes(value) ||
        visitor.mobile_number
          ?.toLowerCase()
          .includes(value) ||
        visitor.table_name
          ?.toLowerCase()
          .includes(value) ||
        visitor.purpose
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [visitors, search]);

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredVisitors.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedVisitors =
    filteredVisitors.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE
    );

  useEffect(() => {
    if (
      currentPage >
      totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const formatPurpose = (
    value?: string
  ) => {
    if (!value) {
      return "Visitor";
    }

    return value
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  // const formatDate = (
  //   value?: string
  // ) => {
  //   if (!value) {
  //     return "-";
  //   }

  //   /*
  //    * If backend returns YYYY-MM-DD,
  //    * avoid UTC conversion.
  //    */
  //   if (
  //     /^\d{4}-\d{2}-\d{2}$/.test(
  //       value
  //     )
  //   ) {
  //     const [
  //       year,
  //       month,
  //       day,
  //     ] = value.split("-");

  //     return `${day}-${month}-${year}`;
  //   }

  //   const date =
  //     new Date(value);

  //   if (
  //     Number.isNaN(
  //       date.getTime()
  //     )
  //   ) {
  //     return value;
  //   }

  //   return date.toLocaleDateString(
  //     "en-IN",
  //     {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     }
  //   );
  // };
const formatDate = (value?: string) => {
  if (!value) {
    return "-";
  }

  /*
   * Backend may return:
   * 2026-09-16
   */
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] =
      value.split("-");

    return `${day}-${month}-${year}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
  const formatTime = (
  value?: string | null
) => {
  if (!value) {
    return null;
  }

  /*
   * PostgreSQL TIME value:
   * 10:30:00
   */
  if (
    /^\d{2}:\d{2}/.test(value)
  ) {
    const [
      hourString,
      minuteString,
    ] = value.split(":");

    let hour = Number(hourString);

    const minute = minuteString;

    const suffix =
      hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minute} ${suffix}`;
  }

  /*
   * PostgreSQL timestamptz:
   * 2026-09-16T10:30:00.000Z
   */
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
};
  // const formatTime = (
  //   value?: string | null
  // ) => {
  //   if (!value) {
  //     return null;
  //   }

  //   /*
  //    * Backend may return:
  //    * 10:30:00
  //    *
  //    * or:
  //    * 2026-09-15T10:30:00
  //    */

  //   if (
  //     /^\d{2}:\d{2}/.test(
  //       value
  //     )
  //   ) {
  //     const [
  //       hourString,
  //       minuteString,
  //     ] = value.split(":");

  //     let hour =
  //       Number(hourString);

  //     const minute =
  //       minuteString;

  //     const suffix =
  //       hour >= 12
  //         ? "PM"
  //         : "AM";

  //     hour =
  //       hour % 12 || 12;

  //     return `${hour}:${minute} ${suffix}`;
  //   }

  //   const date =
  //     new Date(value);

  //   if (
  //     Number.isNaN(
  //       date.getTime()
  //     )
  //   ) {
  //     return value;
  //   }

  //   return date.toLocaleTimeString(
  //     "en-IN",
  //     {
  //       hour: "numeric",
  //       minute: "2-digit",
  //       hour12: true,
  //     }
  //   );
  // };

  /*
  |--------------------------------------------------------------------------
  | Summary Cards
  |--------------------------------------------------------------------------
  */

  const summaryCards = [
    {
      label: "Today",
      value: stats.today,
      description: "Visitors today",
      icon: Users,
      wrapper:
        "bg-blue-50 border-blue-100",
      iconWrapper:
        "bg-blue-100 text-blue-600",
      valueColor:
        "text-blue-900",
    },

    {
      label: "This Week",
      value: stats.thisWeek,
      description:
        "Visitors this week",
      icon: CalendarDays,
      wrapper:
        "bg-emerald-50 border-emerald-100",
      iconWrapper:
        "bg-emerald-100 text-emerald-600",
      valueColor:
        "text-emerald-900",
    },

    {
      label: "This Month",
      value: stats.thisMonth,
      description:
        "Visitors this month",
      icon: UserRound,
      wrapper:
        "bg-purple-50 border-purple-100",
      iconWrapper:
        "bg-purple-100 text-purple-600",
      valueColor:
        "text-purple-900",
    },

    {
      label: "Pending Approval",
      value: stats.pendingApproval,
      description:
        "Awaiting approval",
      icon: Clock3,
      wrapper:
        "bg-orange-50 border-orange-100",
      iconWrapper:
        "bg-orange-100 text-orange-600",
      valueColor:
        "text-orange-900",
    },
  ];

  return (
    <section
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        ${className}
      `}
    >
      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="
          flex
          flex-col
          gap-3
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h2
            className="
              text-base
              font-bold
              text-slate-800
            "
          >
            Visitors Overview
          </h2>

          <p
            className="
              mt-0.5
              text-[11px]
              text-slate-500
            "
          >
            View visitors associated
            with your flat
          </p>
        </div>

        {/* Period buttons */}

        <div
          className="
            flex
            w-fit
            items-center
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            p-1
          "
        >
          {(
            [
              "daily",
              "weekly",
              "monthly",
            ] as Period[]
          ).map((item) => {
            const active =
              period === item;

            const label =
              item === "daily"
                ? "Today"
                : item === "weekly"
                ? "This Week"
                : "This Month";

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setPeriod(item)
                }
                className={`
                  rounded-md
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  transition-all
                  ${
                    active
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================
          SUMMARY CARDS
      ======================================================= */}

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-3
          xl:grid-cols-4
        "
      >
        {summaryCards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <div
                key={card.label}
                className={`
                  rounded-xl
                  border
                  p-3
                  ${card.wrapper}
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${card.iconWrapper}
                    `}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                    />
                  </div>

                  {statsLoading ? (
                    <div
                      className="
                        h-6
                        w-8
                        animate-pulse
                        rounded
                        bg-white/70
                      "
                    />
                  ) : (
                    <span
                      className={`
                        text-xl
                        font-bold
                        ${card.valueColor}
                      `}
                    >
                      {card.value}
                    </span>
                  )}
                </div>

                <p
                  className="
                    mt-2
                    text-[11px]
                    font-semibold
                    text-slate-700
                  "
                >
                  {card.label}
                </p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-slate-500
                  "
                >
                  {card.description}
                </p>
              </div>
            );
          }
        )}
      </div>

      {/* ======================================================
          SEARCH
      ======================================================= */}

      <div
        className="
          mt-4
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            relative
            w-full
            sm:max-w-xs
          "
        >
          <Search
            size={15}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search visitor..."
            className="
              h-9
              w-full
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              pl-9
              pr-3
              text-xs
              text-slate-700
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-blue-400
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        <p
          className="
            text-[10px]
            text-slate-400
          "
        >
          {filteredVisitors.length}{" "}
          visitor
          {filteredVisitors.length !== 1
            ? "s"
            : ""}
        </p>
      </div>

      {/* ======================================================
          VISITOR TABLE / LIST
      ======================================================= */}

      <div
        className="
          mt-3
          overflow-hidden
          rounded-xl
          border
          border-slate-200
        "
      >
        {/* Desktop Header */}

        <div
          className="
            hidden
            grid-cols-[2fr_1fr_1fr_1fr]
            gap-3
            bg-slate-50
            px-4
            py-2.5
            md:grid
          "
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Visitor
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Purpose
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Date
          </p>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Time
          </p>
        </div>

        {loading ? (
          <div className="divide-y divide-slate-100">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="
                    flex
                    animate-pulse
                    items-center
                    gap-3
                    px-4
                    py-3
                  "
                >
                  <div
                    className="
                      h-9
                      w-9
                      rounded-full
                      bg-slate-100
                    "
                  />

                  <div className="flex-1">
                    <div className="h-3 w-32 rounded bg-slate-100" />
                    <div className="mt-2 h-2 w-20 rounded bg-slate-100" />
                  </div>
                </div>
              )
            )}
          </div>
        ) : paginatedVisitors.length ===
          0 ? (
          <div
            className="
              flex
              min-h-[170px]
              flex-col
              items-center
              justify-center
              px-4
              text-center
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-slate-100
                text-slate-400
              "
            >
              <Users size={20} />
            </div>

            <p
              className="
                mt-3
                text-xs
                font-semibold
                text-slate-600
              "
            >
              No visitors found
            </p>

            <p
              className="
                mt-1
                text-[10px]
                text-slate-400
              "
            >
              No visitor records are
              available for this period.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {paginatedVisitors.map(
              (visitor, index) => {
                const visitorName =
                  visitor.full_name ||
                  "Unknown Visitor";

                const purpose =
                  formatPurpose(
                    visitor.purpose ||
                      visitor.table_name
                  );

                const timeIn =
                  formatTime(
                    visitor.time_in
                  );

                const timeOut =
                  formatTime(
                    visitor.time_out
                  );

                return (
                  <div
                    key={
                      visitor.id ??
                      `${visitor.user_id}-${visitor.visit_date}-${visitor.time_in}-${index}`
                    }
                    className="
                      px-4
                      py-3
                      transition
                      hover:bg-slate-50
                    "
                  >
                    {/* Desktop */}

                    <div
                      className="
                        hidden
                        grid-cols-[2fr_1fr_1fr_1fr]
                        items-center
                        gap-3
                        md:grid
                      "
                    >
                      {/* Visitor */}

                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-50
                            text-blue-600
                          "
                        >
                          <UserRound
                            size={17}
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-xs
                              font-semibold
                              text-slate-700
                            "
                          >
                            {visitorName}
                          </p>

                          {visitor.mobile_number && (
                            <p
                              className="
                                mt-0.5
                                truncate
                                text-[9px]
                                text-slate-400
                              "
                            >
                              {
                                visitor.mobile_number
                              }
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Purpose */}

                      <div>
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-slate-100
                            px-2
                            py-1
                            text-[9px]
                            font-medium
                            text-slate-600
                          "
                        >
                          {purpose}
                        </span>
                      </div>

                      {/* Date */}

                      <p
                        className="
                          text-[10px]
                          font-medium
                          text-slate-600
                        "
                      >
                        {formatDate(
                          visitor.visit_date
                        )}
                      </p>

                      {/* Time */}

                      <div className="text-[10px]">
                        <p className="font-medium text-slate-600">
                          In:{" "}
                          {timeIn || "-"}
                        </p>

                        <p className="mt-0.5 text-slate-400">
                          Out:{" "}
                          {timeOut ||
                            "Inside"}
                        </p>
                      </div>
                    </div>

                    {/* Mobile */}

                    <div className="md:hidden">
                      <div className="flex items-start gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-50
                            text-blue-600
                          "
                        >
                          <UserRound
                            size={17}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p
                                className="
                                  truncate
                                  text-xs
                                  font-semibold
                                  text-slate-700
                                "
                              >
                                {visitorName}
                              </p>

                              {visitor.mobile_number && (
                                <p className="mt-0.5 text-[9px] text-slate-400">
                                  {
                                    visitor.mobile_number
                                  }
                                </p>
                              )}
                            </div>

                            <span
                              className="
                                shrink-0
                                rounded-full
                                bg-slate-100
                                px-2
                                py-1
                                text-[8px]
                                font-medium
                                text-slate-600
                              "
                            >
                              {purpose}
                            </span>
                          </div>

                          <div
                            className="
                              mt-2
                              flex
                              flex-wrap
                              gap-x-4
                              gap-y-1
                              text-[9px]
                              text-slate-500
                            "
                          >
                            <span>
                              {formatDate(
                                visitor.visit_date
                              )}
                            </span>

                            <span>
                              In:{" "}
                              {timeIn ||
                                "-"}
                            </span>

                            <span>
                              Out:{" "}
                              {timeOut ||
                                "Inside"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* ======================================================
          PAGINATION
      ======================================================= */}

      {filteredVisitors.length >
        ITEMS_PER_PAGE && (
        <div
          className="
            mt-3
            flex
            items-center
            justify-between
          "
        >
          <p
            className="
              text-[10px]
              text-slate-400
            "
          >
            Page {currentPage} of{" "}
            {totalPages}
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(
                      1,
                      page - 1
                    )
                )
              }
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-md
                border
                border-slate-200
                bg-white
                text-slate-500
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronLeft
                size={14}
              />
            </button>

            <button
              type="button"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-md
                border
                border-slate-200
                bg-white
                text-slate-500
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <ChevronRight
                size={14}
              />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisitorsOverview;