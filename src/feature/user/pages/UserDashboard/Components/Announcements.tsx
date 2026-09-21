import { useEffect, useState } from "react";
import axios from "axios";

import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  Megaphone,
  RefreshCw,
  X,
} from "lucide-react";

type Priority =
  | "Important"
  | "Notice"
  | "General";

type Announcement = {
  id: number;
  title: string;
  message: string;
  priority: Priority;
  created_at: string;
  expires_at: string | null;
};

const API =
  import.meta.env.VITE_BACKEND_URL;

const ANNOUNCEMENT_API =
  `${API}/api/user-dashboard/announcements`;

const priorityStyles: Record<
  Priority,
  {
    badge: string;
    icon: string;
    border: string;
    background: string;
  }
> = {
  Important: {
    badge:
      "bg-red-100 text-red-700",
    icon:
      "bg-red-100 text-red-600",
    border:
      "border-red-200",
    background:
      "bg-red-50/40",
  },

  Notice: {
    badge:
      "bg-blue-100 text-blue-700",
    icon:
      "bg-blue-100 text-blue-600",
    border:
      "border-blue-200",
    background:
      "bg-blue-50/40",
  },

  General: {
    badge:
      "bg-emerald-100 text-emerald-700",
    icon:
      "bg-emerald-100 text-emerald-600",
    border:
      "border-emerald-200",
    background:
      "bg-emerald-50/40",
  },
};

/*
|--------------------------------------------------------------------------
| DATE FORMAT
|--------------------------------------------------------------------------
*/

const formatDate = (
  dateString: string
) => {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

/*
|--------------------------------------------------------------------------
| TIME FORMAT
|--------------------------------------------------------------------------
*/

const formatTime = (
  dateString: string
) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
};

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/

const Announcements = () => {
  const [
    announcements,
    setAnnouncements,
  ] = useState<Announcement[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    selectedAnnouncement,
    setSelectedAnnouncement,
  ] =
    useState<Announcement | null>(null);

  /*
  |--------------------------------------------------------------------------
  | FETCH ANNOUNCEMENTS
  |--------------------------------------------------------------------------
  */

  const fetchAnnouncements =
    async (
      showRefreshLoader = false
    ) => {
      try {
        setError("");

        if (showRefreshLoader) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response =
          await axios.get(
            ANNOUNCEMENT_API,
            {
              withCredentials: true,
            }
          );

        if (
          response.data?.success
        ) {
          setAnnouncements(
            response.data.data || []
          );
        } else {
          setAnnouncements([]);
          setError(
            response.data?.message ||
              "Failed to load announcements"
          );
        }
      } catch (err: any) {
        console.error(
          "USER ANNOUNCEMENTS ERROR:",
          err
        );

        setAnnouncements([]);

        setError(
          err?.response?.data?.message ||
            "Unable to load announcements"
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <section className="w-full">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="h-6 w-44 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-slate-100 rounded mt-2 animate-pulse" />
          </div>

          <div className="h-9 w-24 bg-slate-200 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-200 animate-pulse" />

                  <div className="flex-1">
                    <div className="h-5 w-1/3 bg-slate-200 rounded animate-pulse" />

                    <div className="h-4 w-full bg-slate-100 rounded mt-3 animate-pulse" />

                    <div className="h-4 w-3/4 bg-slate-100 rounded mt-2 animate-pulse" />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <section className="w-full">
        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-100">
                <Bell
                  size={20}
                  className="text-indigo-600"
                />
              </div>

              <h2 className="text-xl font-bold text-slate-800">
                Announcements
              </h2>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              Latest updates from your apartment
              administration
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              fetchAnnouncements(true)
            }
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!error &&
          announcements.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                <Megaphone
                  size={28}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                No announcements
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                There are no active announcements
                at the moment.
              </p>
            </div>
          )}

        {/* ANNOUNCEMENT LIST */}

        {announcements.length > 0 && (
          <div className="space-y-4">
            {announcements.map(
              (announcement) => {
                const styles =
                  priorityStyles[
                    announcement.priority
                  ] ||
                  priorityStyles.Notice;

                return (
                  <div
                    key={announcement.id}
                    className={`rounded-2xl border ${styles.border} ${styles.background} bg-white p-5 transition hover:shadow-md`}
                  >
                    <div className="flex items-start gap-4">
                      {/* ICON */}

                      <div
                        className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${styles.icon}`}
                      >
                        <Megaphone
                          size={21}
                        />
                      </div>

                      {/* CONTENT */}

                      <div className="flex-1 min-w-0">
                        {/* TITLE ROW */}

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                              {
                                announcement.title
                              }
                            </h3>

                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles.badge}`}
                              >
                                {
                                  announcement.priority
                                }
                              </span>

                              <span className="text-xs text-slate-500 inline-flex items-center gap-1">
                                <CalendarDays
                                  size={13}
                                />

                                {
                                  formatDate(
                                    announcement.created_at
                                  )
                                }
                              </span>

                              <span className="text-xs text-slate-500 inline-flex items-center gap-1">
                                <Clock3
                                  size={13}
                                />

                                {
                                  formatTime(
                                    announcement.created_at
                                  )
                                }
                              </span>
                            </div>
                          </div>

                          {/* VIEW BUTTON */}

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAnnouncement(
                                announcement
                              )
                            }
                            className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                          >
                            View
                            <ChevronRight
                              size={16}
                            />
                          </button>
                        </div>

                        {/* MESSAGE */}

                        <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-2">
                          {
                            announcement.message
                          }
                        </p>

                        {/* EXPIRY */}

                        {announcement.expires_at && (
                          <div className="mt-4 pt-3 border-t border-slate-200/70">
                            <span className="text-xs text-slate-500">
                              Valid until{" "}
                              <span className="font-medium text-slate-700">
                                {formatDate(
                                  announcement.expires_at
                                )}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      {/* DETAILS MODAL */}

      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close announcement"
            onClick={() =>
              setSelectedAnnouncement(
                null
              )
            }
            className="absolute inset-0 bg-black/40"
          />

          {/* MODAL */}

          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* HEADER */}

            <div className="flex items-start justify-between gap-4 p-5 border-b border-slate-200">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-indigo-100">
                  <Megaphone
                    size={22}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {
                      selectedAnnouncement.title
                    }
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        priorityStyles[
                          selectedAnnouncement
                            .priority
                        ]?.badge ||
                        priorityStyles.Notice
                          .badge
                      }`}
                    >
                      {
                        selectedAnnouncement.priority
                      }
                    </span>

                    <span className="text-xs text-slate-500">
                      {formatDate(
                        selectedAnnouncement.created_at
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedAnnouncement(
                    null
                  )
                }
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* MESSAGE */}

            <div className="p-6">
              <p className="text-sm leading-7 text-slate-700 whitespace-pre-wrap">
                {
                  selectedAnnouncement.message
                }
              </p>

              {selectedAnnouncement.expires_at && (
                <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500">
                    Announcement valid until
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {formatDate(
                      selectedAnnouncement.expires_at
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcements;