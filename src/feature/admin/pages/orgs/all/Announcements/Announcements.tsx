import { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  Megaphone,
  Plus,
  Send,
  Trash2,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type Priority = "Important" | "Notice" | "General";

type Announcement = {
  id: number;
  title: string;
  message: string;
  priority: Priority;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
};

const priorityStyles: Record<
  Priority,
  {
    badge: string;
    icon: string;
  }
> = {
  Important: {
    badge: "bg-red-100 text-red-700 border-red-200",
    icon: "text-red-600",
  },
  Notice: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: "text-amber-600",
  },
  General: {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: "text-blue-600",
  },
};

const formatDate = (date: string | null) => {
  if (!date) return "No expiry";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<Priority>("Notice");
  const [expiresAt, setExpiresAt] = useState("");

  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ============================================================
  // FETCH ANNOUNCEMENTS
  // ============================================================

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API}/api/admin/announcements`, {
        withCredentials: true,
      });

      if (response.data?.success) {
        setAnnouncements(response.data.data || []);
      } else {
        setAnnouncements([]);
      }
    } catch (err: any) {
      console.error("Failed to fetch announcements:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load announcements."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ============================================================
  // RESET FORM
  // ============================================================

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setPriority("Notice");
    setExpiresAt("");
    setShowForm(false);
  };

  // ============================================================
  // PUBLISH ANNOUNCEMENT
  // ============================================================

  const handlePublish = async () => {
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Please enter an announcement title.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter an announcement message.");
      return;
    }

    try {
      setPublishing(true);

      const response = await axios.post(
        `${API}/api/admin/announcements`,
        {
          title: title.trim(),
          message: message.trim(),
          priority,
          expiresAt: expiresAt || null,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        const newAnnouncement = response.data.data;

        setAnnouncements((prev) => [
          newAnnouncement,
          ...prev,
        ]);

        resetForm();

        setSuccess("Announcement published successfully.");

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError(
          response.data?.message ||
            "Failed to publish announcement."
        );
      }
    } catch (err: any) {
      console.error("Publish announcement error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to publish announcement."
      );
    } finally {
      setPublishing(false);
    }
  };

  // ============================================================
  // DELETE ANNOUNCEMENT
  // ============================================================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await axios.delete(
        `${API}/api/admin/announcements/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setAnnouncements((prev) =>
          prev.filter((announcement) => announcement.id !== id)
        );

        setSuccess("Announcement deleted successfully.");

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError(
          response.data?.message ||
            "Failed to delete announcement."
        );
      }
    } catch (err: any) {
      console.error("Delete announcement error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to delete announcement."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
                <Megaphone className="h-5 w-5 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Announcements
                </h1>

                <p className="text-sm text-slate-500">
                  Share important updates with apartment members
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowForm(true);
              setError("");
              setSuccess("");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Create Announcement
          </button>
        </div>

        {/* ====================================================
            SUCCESS MESSAGE
        ==================================================== */}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* ====================================================
            ERROR MESSAGE
        ==================================================== */}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <X className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ====================================================
            CREATE FORM
        ==================================================== */}

        {showForm && (
          <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Create Announcement
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  This announcement will be shared with apartment
                  members.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5">
              {/* TITLE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Announcement Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  maxLength={255}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <div className="mt-1 text-right text-xs text-slate-400">
                  {title.length}/255
                </div>
              </div>

              {/* MESSAGE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write the announcement message..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <div className="mt-1 text-right text-xs text-slate-400">
                  {message.length} characters
                </div>
              </div>

              {/* PRIORITY + EXPIRY */}

              <div className="grid gap-5 md:grid-cols-2">
                {/* PRIORITY */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Priority
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        "Important",
                        "Notice",
                        "General",
                      ] as Priority[]
                    ).map((item) => {
                      const selected = priority === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setPriority(item)}
                          className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                            selected
                              ? priorityStyles[item].badge
                              : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* EXPIRY */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Expiry Date
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="date"
                      value={expiresAt}
                      onChange={(e) =>
                        setExpiresAt(e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Leave empty if the announcement has no expiry.
                  </p>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={publishing}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={publishing}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {publishing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Publish Announcement
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            ANNOUNCEMENT LIST HEADER
        ==================================================== */}

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Published Announcements
            </h2>

            <p className="text-sm text-slate-500">
              {announcements.length} announcement
              {announcements.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
            <Bell className="h-5 w-5 text-indigo-600" />
          </div>
        </div>

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 h-5 w-1/3 rounded bg-slate-200" />

                <div className="mb-2 h-4 w-full rounded bg-slate-100" />

                <div className="mb-4 h-4 w-4/5 rounded bg-slate-100" />

                <div className="h-3 w-1/4 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : announcements.length === 0 ? (
          /* ====================================================
             EMPTY STATE
          ==================================================== */

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
              <Megaphone className="h-7 w-7 text-indigo-500" />
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              No announcements yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Create an announcement to share updates,
              reminders, and important information with apartment
              members.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Create Announcement
            </button>
          </div>
        ) : (
          /* ====================================================
             ANNOUNCEMENTS
          ==================================================== */

          <div className="grid gap-4">
            {announcements.map((announcement) => {
              const styles =
                priorityStyles[announcement.priority] ||
                priorityStyles.Notice;

              return (
                <div
                  key={announcement.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
                >
                  {/* TOP ROW */}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 ${styles.icon}`}
                      >
                        <Megaphone className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="break-words text-base font-bold text-slate-900 md:text-lg">
                            {announcement.title}
                          </h3>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
                          >
                            {announcement.priority}
                          </span>
                        </div>

                        <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                          {announcement.message}
                        </p>
                      </div>
                    </div>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(announcement.id)
                      }
                      disabled={deletingId === announcement.id}
                      title="Delete announcement"
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center self-end rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:self-start"
                    >
                      {deletingId === announcement.id ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* FOOTER */}

                  <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />

                      <span>
                        Published{" "}
                        {formatDateTime(
                          announcement.created_at
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />

                      <span>
                        {announcement.expires_at
                          ? `Expires ${formatDate(
                              announcement.expires_at
                            )}`
                          : "No expiry"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;