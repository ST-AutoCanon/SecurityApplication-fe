import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Bell,
  ChevronRight,
  X,
  CalendarDays,
  Clock3,
  Megaphone,
} from "lucide-react";

type Announcement = {
  id: number;
  request_type_id: number;
  org_id: number;
  requested_by: number;
  status: string;
  announcement: string;
  submitted_at: string;
  reviewed_at: string | null;
};

const RequestAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ============================================================
  // FETCH ANNOUNCEMENTS
  // ============================================================

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${BACKEND_URL}/api/user-dashboard/request-announcements`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setAnnouncements(response.data.announcements || []);
      } else {
        setAnnouncements([]);
      }
    } catch (err: any) {
      console.error(
        "Failed to fetch request announcements:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load announcements"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ============================================================
  // HELPERS
  // ============================================================

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "--";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "--";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString?: string | null) => {
    if (!dateString) return "--";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "--";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ============================================================
  // EXTRACT TITLE
  // ============================================================

  const getTitle = (announcement: string) => {
    if (!announcement) {
      return "Announcement";
    }

    const firstLine = announcement
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0);

    if (!firstLine) {
      return "Announcement";
    }

    return firstLine
      .replace(/^📢\s*/, "")
      .replace(/^Announcement\s*[–-]\s*/i, "")
      .trim() || "Announcement";
  };

  // ============================================================
  // EXTRACT PREVIEW
  // ============================================================

  const getPreview = (announcement: string) => {
    if (!announcement) {
      return "";
    }

    const lines = announcement
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length <= 1) {
      return announcement;
    }

    return lines[1];
  };

  // ============================================================
  // DISPLAY LIMIT
  // ============================================================

  const visibleAnnouncements = useMemo(() => {
    return announcements.slice(0, 4);
  }, [announcements]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Announcements
            </h2>

            <p className="text-xs text-slate-500">
              Latest updates from your apartment
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl border border-slate-200 p-4"
            >
              <div className="h-4 w-32 rounded bg-slate-200" />

              <div className="mt-3 h-3 w-full rounded bg-slate-100" />

              <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Announcements
            </h2>

            <p className="text-xs text-red-500">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Megaphone className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Announcements
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Latest updates from your apartment
              </p>
            </div>
          </div>

          {announcements.length > 4 && (
            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
              onClick={() => {
                // Can be connected to a View All page later.
              }}
            >
              View All
            </button>
          )}
        </div>

        {/* EMPTY */}
        {visibleAnnouncements.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
            <Bell className="mx-auto h-7 w-7 text-slate-300" />

            <p className="mt-2 text-sm font-medium text-slate-600">
              No announcements
            </p>

            <p className="mt-1 text-xs text-slate-400">
              There are no new announcements at the moment.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {visibleAnnouncements.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setSelectedAnnouncement(item)
                }
                className="group w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/30"
              >
                <div className="flex items-start gap-3">
                  {/* ICON */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Megaphone className="h-4 w-4 text-blue-600" />
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {getTitle(item.announcement)}
                      </h3>

                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-blue-500" />
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          item.status?.toLowerCase() ===
                          "approved"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status?.toLowerCase() ===
                              "rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="text-[10px] text-slate-400">
                        {formatDate(
                          item.reviewed_at ||
                            item.submitted_at
                        )}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                      {getPreview(item.announcement)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================
          ANNOUNCEMENT MODAL
      ======================================================== */}

      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Megaphone className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {getTitle(
                      selectedAnnouncement.announcement
                    )}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        selectedAnnouncement.status?.toLowerCase() ===
                        "approved"
                          ? "bg-emerald-50 text-emerald-600"
                          : selectedAnnouncement.status?.toLowerCase() ===
                            "rejected"
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {selectedAnnouncement.status}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {formatDate(
                        selectedAnnouncement.reviewed_at ||
                          selectedAnnouncement.submitted_at
                      )}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock3 className="h-3.5 w-3.5" />

                      {formatTime(
                        selectedAnnouncement.reviewed_at ||
                          selectedAnnouncement.submitted_at
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedAnnouncement(null)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="max-h-[65vh] overflow-y-auto px-6 py-6">
              <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-5">
                <div className="whitespace-pre-line text-sm leading-7 text-slate-700">
                  {selectedAnnouncement.announcement}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setSelectedAnnouncement(null)
                }
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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

export default RequestAnnouncements;