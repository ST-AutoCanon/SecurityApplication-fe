import { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

const ITEMS_PER_PAGE = 2;

type ImportantInformationItem = {
  id: number;
  organisation_id: number;
  title: string;
  description: string;
  priority: string;
  created_by: number | null;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
};

const ImportantInformation = () => {
  const [items, setItems] = useState<
    ImportantInformationItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Selected information for popup
  const [selectedInfo, setSelectedInfo] =
    useState<ImportantInformationItem | null>(
      null
    );

  // ============================================================
  // PAGINATION
  // ============================================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    items.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const paginatedItems = items.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // ============================================================
  // FETCH IMPORTANT INFORMATION
  // ============================================================

  useEffect(() => {
    fetchImportantInformation();
  }, []);

  const fetchImportantInformation =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API}/api/user-dashboard/important-information`,
          {
            withCredentials: true,
          }
        );

        if (response.data?.success) {
          setItems(
            response.data.data || []
          );

          // Always start from page 1
          setCurrentPage(1);
        } else {
          setItems([]);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error(
          "Failed to fetch important information:",
          err
        );

        setError(
          "Unable to load important information."
        );

        setItems([]);
        setCurrentPage(1);
      } finally {
        setLoading(false);
      }
    };

  // ============================================================
  // KEEP PAGE VALID
  // ============================================================

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    totalPages,
    currentPage,
  ]);

  // ============================================================
  // DATE FORMAT
  // ============================================================

  const formatDate = (
    date: string | null
  ) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ============================================================
  // PRIORITY ICON
  // ============================================================

  const getPriorityIcon = (
    priority: string
  ) => {
    switch (
      priority?.toLowerCase()
    ) {
      case "important":
        return (
          <AlertCircle size={18} />
        );

      case "notice":
        return <Bell size={18} />;

      default:
        return <Info size={18} />;
    }
  };

  // ============================================================
  // PRIORITY STYLE
  // ============================================================

  const getPriorityStyle = (
    priority: string
  ) => {
    switch (
      priority?.toLowerCase()
    ) {
      case "important":
        return {
          icon:
            "bg-red-50 text-red-600",
          badge:
            "bg-red-50 text-red-600",
          border:
            "border-red-200",
        };

      case "notice":
        return {
          icon:
            "bg-blue-50 text-blue-600",
          badge:
            "bg-blue-50 text-blue-600",
          border:
            "border-blue-200",
        };

      default:
        return {
          icon:
            "bg-slate-100 text-slate-600",
          badge:
            "bg-slate-100 text-slate-600",
          border:
            "border-slate-200",
        };
    }
  };

  // ============================================================
  // CLOSE MODAL
  // ============================================================

  const closeModal = () => {
    setSelectedInfo(null);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Bell
              size={20}
              className="text-amber-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Important Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Important updates from your apartment
            </p>
          </div>
        </div>

        {/* Only 2 skeleton cards */}
        <div className="space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl bg-slate-100 h-16"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ========================================================
          IMPORTANT INFORMATION
      ======================================================== */}

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Bell
                size={20}
                className="text-amber-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Important Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Important updates from your apartment
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <span className="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700">
              {items.length}{" "}
              {items.length === 1
                ? "Information"
                : "Information"}
            </span>
          )}
        </div>

        {/* ERROR */}

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!error &&
          items.length === 0 && (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Info
                  size={22}
                  className="text-slate-400"
                />
              </div>

              <p className="text-sm font-medium text-slate-600">
                No important information
              </p>

              <p className="text-xs text-slate-400 mt-1">
                There are no current updates
                from your apartment.
              </p>
            </div>
          )}

        {/* ======================================================
            LIST
        ====================================================== */}

        {!error &&
          items.length > 0 && (
            <div>
              {/* CARDS */}

              <div className="space-y-3">
                {paginatedItems.map(
                  (item) => {
                    const style =
                      getPriorityStyle(
                        item.priority
                      );

                    return (
                      <div
                        key={item.id}
                        onClick={() =>
                          setSelectedInfo(
                            item
                          )
                        }
                        className={`group cursor-pointer rounded-xl border ${style.border} bg-white px-4 py-3.5 hover:bg-amber-50/30 hover:shadow-sm transition`}
                      >
                        <div className="flex items-start gap-3">
                          {/* ICON */}

                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${style.icon}`}
                          >
                            {getPriorityIcon(
                              item.priority
                            )}
                          </div>

                          {/* CONTENT */}

                          <div className="flex-1 min-w-0">
                            {/* TITLE + ARROW */}

                            <div className="flex items-center justify-between gap-3">
                              <h3 className="text-[15px] font-semibold text-slate-900 truncate">
                                {item.title}
                              </h3>

                              <ChevronRight
                                size={16}
                                className="text-slate-300 group-hover:text-amber-500 transition flex-shrink-0"
                              />
                            </div>

                            {/* PRIORITY + DATE */}

                            <div className="flex items-center gap-2 mt-1.5">
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${style.badge}`}
                              >
                                {item.priority ||
                                  "Information"}
                              </span>

                              <span className="text-[11px] text-slate-400 inline-flex items-center gap-1">
                                <CalendarDays
                                  size={12}
                                />

                                {formatDate(
                                  item.created_at
                                )}
                              </span>
                            </div>

                            {/* EXPIRY */}

                            {item.expires_at && (
                              <div className="mt-2 pt-2 border-t border-slate-100">
                                <span className="text-[11px] text-slate-500">
                                  Valid until{" "}
                                  <span className="font-medium text-slate-700">
                                    {formatDate(
                                      item.expires_at
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

              {/* ==================================================
                  PAGINATION
              ================================================== */}

              {totalPages > 1 && (
                <>
                  <div className="flex items-center justify-center gap-1.5 mt-4">
                    {/* PREVIOUS */}

                    <button
                      type="button"
                      disabled={
                        currentPage === 1
                      }
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            Math.max(
                              prev - 1,
                              1
                            )
                        )
                      }
                      className="h-8 w-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      aria-label="Previous page"
                    >
                      <ChevronLeft
                        size={15}
                      />
                    </button>

                    {/* PAGE NUMBERS */}

                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) =>
                        index + 1
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() =>
                          setCurrentPage(
                            page
                          )
                        }
                        className={`h-8 min-w-8 px-2 rounded-lg text-xs font-medium transition ${
                          currentPage ===
                          page
                            ? "bg-amber-600 text-white"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* NEXT */}

                    <button
                      type="button"
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            Math.min(
                              prev + 1,
                              totalPages
                            )
                        )
                      }
                      className="h-8 w-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      aria-label="Next page"
                    >
                      <ChevronRight
                        size={15}
                      />
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Page {currentPage} of{" "}
                    {totalPages}
                  </p>
                </>
              )}
            </div>
          )}
      </section>

      {/* ========================================================
          IMPORTANT INFORMATION POPUP
      ======================================================== */}

      {selectedInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 shrink-0">
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${getPriorityStyle(
                    selectedInfo.priority
                  ).icon}`}
                >
                  {getPriorityIcon(
                    selectedInfo.priority
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {selectedInfo.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityStyle(
                        selectedInfo.priority
                      ).badge}`}
                    >
                      {selectedInfo.priority ||
                        "Information"}
                    </span>

                    <span className="text-xs text-slate-400">
                      {formatDate(
                        selectedInfo.created_at
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="px-6 py-6 overflow-y-auto">
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-5">
                <p className="text-sm font-medium text-slate-500 mb-2">
                  Information
                </p>

                {/* <p className="text-sm text-slate-700 leading-7 whitespace-pre-wrap">
                  {selectedInfo.description}
                </p> */}

                <div dangerouslySetInnerHTML={{
    __html: selectedInfo.description || "",
  }}
/>
              </div>

              {/* DATE INFORMATION */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <CalendarDays size={16} />

                    <span className="text-xs">
                      Published On
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {formatDate(
                      selectedInfo.created_at
                    )}
                  </p>
                </div>

                {/* <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <CalendarDays size={16} />

                    <span className="text-xs">
                      Expires On
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {selectedInfo.expires_at
                      ? formatDate(
                          selectedInfo.expires_at
                        )
                      : "No expiry date"}
                  </p>
                </div> */}
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
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

export default ImportantInformation;