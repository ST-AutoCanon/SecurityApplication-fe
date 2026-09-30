import { useEffect, useState } from "react";
import axios from "axios";

import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
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

type AnnouncementBlock = {
  id?: string | number;
  block_type?: string;
  blockType?: string;
  type?: string;
  content?: any;

  // Direct block fields used by the admin announcement editor
  text?: string;
  imageUrl?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textAlign?: "left" | "center" | "right";
  fontFamily?: string;

  // Legacy/content-based fields
  url?: string;
  buttonText?: string;
  buttonLink?: string;
  align?: "left" | "center" | "right";
  sort_order?: number;
  sortOrder?: number;
};

const getAnnouncementBlocks = (
  message: string
): AnnouncementBlock[] | null => {
  if (!message) return null;

  try {
    const parsed = JSON.parse(message);

    // Direct array
    if (Array.isArray(parsed)) {
      return parsed;
    }

    // { blocks: [...] }
    if (Array.isArray(parsed?.blocks)) {
      return parsed.blocks;
    }

    // { content: [...] }
    if (Array.isArray(parsed?.content)) {
      return parsed.content;
    }

    // Single block
    if (
      parsed?.block_type ||
      parsed?.blockType ||
      parsed?.type
    ) {
      return [parsed];
    }

    return null;
  } catch {
    // Old announcements may contain normal text
    return null;
  }
};

const AnnouncementContent = ({
  message,
  preview = false,
}: {
  message: string;
  preview?: boolean;
}) => {
  const blocks = getAnnouncementBlocks(message);

  /*
   * Old announcement / plain text support
   */
  if (!blocks) {
    return (
      <div
        className={
          preview
            ? "text-sm leading-6 text-slate-600 line-clamp-2 whitespace-pre-wrap"
            : "text-sm leading-7 text-slate-700 whitespace-pre-wrap"
        }
      >
        {message}
      </div>
    );
  }

  const sortedBlocks = [...blocks].sort(
    (a, b) =>
      Number(a.sort_order ?? a.sortOrder ?? 0) -
      Number(b.sort_order ?? b.sortOrder ?? 0)
  );

  return (
    <div className="w-full">
      {sortedBlocks.map((block, index) => {
        const type =
          block.block_type ||
          block.blockType ||
          block.type;

        const content =
          block.content &&
          typeof block.content === "object"
            ? block.content
            : {};

        /*
         * TEXT
         */
        if (type === "text") {
          /*
           * The admin announcement editor stores text blocks directly:
           * {
           *   type: "text",
           *   text: "<span style=...>formatted text</span>",
           *   color: "...",
           *   fontSize: 18,
           *   ...
           * }
           *
           * Older announcements may instead use:
           * {
           *   type: "text",
           *   content: {
           *     text: "...",
           *     color: "...",
           *     fontSize: 18
           *   }
           * }
           *
           * Support BOTH formats so announcements created/edited from
           * the admin side render exactly the same on the user side.
           */
          const text =
            typeof content === "object" && content !== null
              ? content.text ?? block.text ?? ""
              : block.text ?? "";

          if (!text) return null;

          const color =
            (typeof content === "object" && content !== null
              ? content.color
              : undefined) ??
            (block as any).color ??
            "#334155";

          const backgroundColor =
            (typeof content === "object" && content !== null
              ? content.backgroundColor
              : undefined) ??
            (block as any).backgroundColor;

          const fontSize =
            (typeof content === "object" && content !== null
              ? content.fontSize
              : undefined) ??
            (block as any).fontSize ??
            14;

          const fontWeight =
            (typeof content === "object" && content !== null
              ? content.fontWeight
              : undefined) ??
            (block as any).fontWeight ??
            "normal";

          const fontStyle =
            (typeof content === "object" && content !== null
              ? content.fontStyle
              : undefined) ??
            (block as any).fontStyle ??
            "normal";

          const textAlign =
            (typeof content === "object" && content !== null
              ? content.textAlign
              : undefined) ??
            (block as any).textAlign ??
            "left";

          const fontFamily =
            (typeof content === "object" && content !== null
              ? content.fontFamily
              : undefined) ??
            (block as any).fontFamily ??
            "Arial";

          const hasBackground =
            backgroundColor &&
            backgroundColor !== "transparent";

          /*
           * The admin editor now saves inline formatting as HTML
           * (for example <span style="color:red">text</span>).
           * Rendering {text} would display the HTML as plain text and
           * lose the formatting. Render the saved HTML instead.
           */
          const containsHtml = /<([a-z][^>]*?)>/i.test(text);

          return (
            <div
              key={block.id ?? index}
              style={{
                color,
                backgroundColor: hasBackground
                  ? backgroundColor
                  : undefined,
                fontSize: `${fontSize}px`,
                fontWeight,
                fontStyle,
                textAlign,
                fontFamily,
                lineHeight: 1.6,
                whiteSpace: containsHtml ? "normal" : "pre-wrap",
                padding: hasBackground
                  ? "10px 12px"
                  : undefined,
                borderRadius: hasBackground ? 8 : undefined,
                marginBottom: 12,
                ...(preview
                  ? {
                      maxHeight: 70,
                      overflow: "hidden",
                    }
                  : {}),
              }}
            >
              {containsHtml ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                />
              ) : (
                text
              )}
            </div>
          );
        }

        /*
         * IMAGE / BANNER
         */
        if (
          type === "image" ||
          type === "logo"
        ) {
          /*
           * Admin image blocks are stored as:
           * {
           *   type: "image",
           *   imageUrl: "..."
           * }
           *
           * Older/content-based blocks may use content.url.
           * Support all known shapes.
           */
          const imageUrl =
            (typeof content === "object" && content !== null
              ? content.url || content.imageUrl
              : undefined) ||
            block.url ||
            (block as any).imageUrl ||
            "";

          if (!imageUrl) return null;

          return (
            <div
              key={block.id ?? index}
              style={{
                textAlign:
                  type === "logo"
                    ? "center"
                    : "left",
                marginBottom: 14,
              }}
            >
              <img
                src={imageUrl}
                alt={
                  type === "logo"
                    ? "Logo"
                    : "Announcement image"
                }
                style={{
                  maxWidth: "100%",
                  width:
                    type === "logo"
                      ? "auto"
                      : "100%",
                  maxHeight:
                    type === "logo"
                      ? 100
                      : 350,
                  objectFit:
                    type === "logo"
                      ? "contain"
                      : "cover",
                  borderRadius: 8,
                  display: "inline-block",
                }}
              />
            </div>
          );
        }

        /*
         * BUTTON
         */
        if (type === "button") {
          const buttonText =
            content.buttonText ||
            block.buttonText ||
            "View";

          const buttonLink =
            content.buttonLink ||
            block.buttonLink ||
            "#";

          const align =
            content.align ||
            block.align ||
            "center";

          return (
            <div
              key={block.id ?? index}
              style={{
                textAlign: align,
                margin: "16px 0",
              }}
            >
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background:
                    "#7c3aed",
                  color: "#fff",
                  padding:
                    "10px 20px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration:
                    "none",
                }}
              >
                {buttonText}
              </a>
            </div>
          );
        }

        /*
         * DIVIDER
         */
        if (type === "divider") {
          return (
            <hr
              key={block.id ?? index}
              style={{
                border: "none",
                borderTop:
                  "1px solid #e2e8f0",
                margin: "16px 0",
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

const API =
  import.meta.env.VITE_BACKEND_URL;

const ANNOUNCEMENT_API =
  `${API}/api/user-dashboard/announcements`;

const ITEMS_PER_PAGE = 2;

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
| COMPONENT
|--------------------------------------------------------------------------
*/

const Announcements = () => {
  const [
    announcements,
    setAnnouncements,
  ] = useState<Announcement[]>([]);
const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
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
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    announcements.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const paginatedAnnouncements =
    announcements.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
const handleRefresh = async () => {
  setLoading(true);

  try {
    await fetchAnnouncements();
    setLastUpdated(new Date());
  } finally {
    setLoading(false);
  }
};
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

          // Always start from page 1
          // after refresh/fetch
          setCurrentPage(1);
        } else {
          setAnnouncements([]);
          setCurrentPage(1);

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
        setCurrentPage(1);

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
  | KEEP PAGE VALID
  |--------------------------------------------------------------------------
  */

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

        <div className="space-y-3">
          {[1, 2].map(
            (item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse" />

                  <div className="flex-1">
                    <div className="h-5 w-1/3 bg-slate-200 rounded animate-pulse" />

                    <div className="h-3 w-2/3 bg-slate-100 rounded mt-3 animate-pulse" />

                    <div className="h-3 w-1/2 bg-slate-100 rounded mt-2 animate-pulse" />
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
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
            {lastUpdated && (
  <span className="text-xl font-bold text-slate-600">
    Updated just now
  </span>
)}
          </div>

          <button
            type="button"
              onClick={handleRefresh}

            // onClick={() =>
            //   fetchAnnouncements(true)
            // }
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
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!error &&
          announcements.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                <Megaphone
                  size={26}
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
          <div>
            <div className="space-y-3">
              {paginatedAnnouncements.map(
                (announcement) => {
                  const styles =
                    priorityStyles[
                      announcement.priority
                    ] ||
                    priorityStyles.Notice;

                  return (
                    <div
                      key={announcement.id}
                      className={`rounded-2xl border ${styles.border} ${styles.background} bg-white px-4 py-3.5 transition hover:shadow-md`}
                    >
                      <div className="flex items-start gap-3">
                        {/* ICON */}

                        <div
                          className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${styles.icon}`}
                        >
                          <Megaphone
                            size={19}
                          />
                        </div>

                        {/* CONTENT */}

                        <div className="flex-1 min-w-0">
                          {/* TITLE + VIEW */}

                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-[15px] font-semibold text-slate-800 truncate">
                              {
                                announcement.title
                              }
                            </h3>

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedAnnouncement(
                                  announcement
                                )
                              }
                              className="shrink-0 inline-flex items-center gap-0.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            >
                              View
                              <ChevronRight
                                size={15}
                              />
                            </button>
                          </div>

                          {/* PRIORITY + DATE */}

                          <div className="flex items-center gap-2 mt-1.5">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${styles.badge}`}
                            >
                              {
                                announcement.priority
                              }
                            </span>

                            <span className="text-[11px] text-slate-500 inline-flex items-center gap-1">
                              <CalendarDays
                                size={12}
                              />

                              {formatDate(
                                announcement.created_at
                              )}
                            </span>
                          </div>

                          {/* EXPIRY */}

                          {announcement.expires_at && (
                            <div className="mt-2 pt-2 border-t border-slate-200/70">
                              <span className="text-[11px] text-slate-500">
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

            {/* PAGINATION */}

            {totalPages > 1 && (
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
                      currentPage === page
                        ? "bg-indigo-600 text-white"
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
            )}

            {/* SMALL PAGE INDICATOR */}

            {totalPages > 1 && (
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Page {currentPage} of{" "}
                {totalPages}
              </p>
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

          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* HEADER */}

            <div className="flex items-start justify-between gap-4 p-5 border-b border-slate-200 shrink-0">
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

            <div className="p-6 overflow-y-auto">
              <AnnouncementContent
                message={
                  selectedAnnouncement.message
                }
              />

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