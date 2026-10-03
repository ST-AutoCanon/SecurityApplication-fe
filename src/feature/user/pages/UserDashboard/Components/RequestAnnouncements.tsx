import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Bell,
  ChevronLeft,
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

const ITEMS_PER_PAGE = 2;

const RequestAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

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
        setCurrentPage(1);
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
      return "Broadcasted Message";
    }

    const firstLine = announcement
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0);

    if (!firstLine) {
      return "Broadcasted Message";
    }

    return (
      firstLine
        .replace(/^📢\s*/, "")
        .replace(/^Broadcasted Messages\s*[–-]\s*/i, "")
        .trim() || "Broadcasted Message"
    );
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

    return lines.slice(1).join(" ");
  };

  // ============================================================
  // STATUS STYLE
  // ============================================================

  const getStatusClass = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-600";

      case "rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-amber-50 text-amber-600";
    }
  };

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(announcements.length / ITEMS_PER_PAGE)
  );

  const visibleAnnouncements = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return announcements.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [announcements, currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1)
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Broadcasted Messages
            </h2>

            <p className="text-xs text-slate-500">
              Latest updates from your apartment
            </p>
          </div>
        </div>

        {/* SKELETON */}
        <div className="mt-5 space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl border border-slate-200 p-4"
            >
              <div className="flex gap-3">
                <div className="h-9 w-9 shrink-0 rounded-lg bg-slate-200" />

                <div className="flex-1">
                  <div className="h-4 w-36 rounded bg-slate-200" />

                  <div className="mt-2 h-3 w-24 rounded bg-slate-100" />

                  <div className="mt-3 h-3 w-full rounded bg-slate-100" />

                  <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
                </div>
              </div>
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
              Broadcasted Messages
            </h2>

            <p className="mt-1 text-xs text-red-500">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* HEADER */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <Megaphone className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Broadcasted Messages
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Latest updates from your apartment
            </p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {visibleAnnouncements.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
            <Bell className="mx-auto h-7 w-7 text-slate-300" />

            <p className="mt-2 text-sm font-medium text-slate-600">
              No Messages
            </p>

            <p className="mt-1 text-xs text-slate-400">
              There are no new messages at the moment.
            </p>
          </div>
        ) : (
          <>
            {/* ==================================================
                VERTICAL ANNOUNCEMENT LIST
            ================================================== */}

            <div className="mt-5 space-y-3">
              {visibleAnnouncements.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setSelectedAnnouncement(item)
                  }
                  className="group w-full rounded-xl border border-slate-200 bg-white p-3.5 text-left transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    {/* ICON */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <Megaphone className="h-4 w-4 text-blue-600" />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">
                      {/* TITLE + ARROW */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {getTitle(item.announcement)}
                        </h3>

                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-blue-500" />
                      </div>

                      {/* STATUS + DATE */}
                      <div className="mt-1.5 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusClass(
                            item.status
                          )}`}
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

                      {/* MESSAGE PREVIEW */}
                      <p className="mt-2 line-clamp-2 text-xs leading-4.5 text-slate-500">
                        {/* {getPreview(item.announcement)} */}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ==================================================
                PAGINATION
            ================================================== */}

            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                {/* PREVIOUS */}
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Previous
                </button>

                {/* PAGE NUMBERS */}
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs font-medium transition ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* NEXT */}
                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </>
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
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <Megaphone className="h-5 w-5 text-blue-600" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {getTitle(
                      selectedAnnouncement.announcement
                    )}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {/* STATUS */}
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${getStatusClass(
                        selectedAnnouncement.status
                      )}`}
                    >
                      {selectedAnnouncement.status}
                    </span>

                    {/* DATE */}
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {formatDate(
                        selectedAnnouncement.reviewed_at ||
                          selectedAnnouncement.submitted_at
                      )}
                    </span>

                    {/* TIME */}
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

              {/* CLOSE */}
              <button
                type="button"
                onClick={() =>
                  setSelectedAnnouncement(null)
                }
                className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
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
