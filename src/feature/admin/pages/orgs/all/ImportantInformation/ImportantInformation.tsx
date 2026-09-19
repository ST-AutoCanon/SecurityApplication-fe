import { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  Edit,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  X,
} from "lucide-react";

type Information = {
  id: number;
  title: string;
  description: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
};

const API = import.meta.env.VITE_BACKEND_URL;

const ImportantInformation = () => {
  const [information, setInformation] = useState<
    Information[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [status, setStatus] = useState<
    "published" | "draft"
  >("published");

  /*
  |--------------------------------------------------------------------------
  | FETCH
  |--------------------------------------------------------------------------
  */

  const fetchInformation = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/admin/important-information`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setInformation(response.data.data || []);
      }
    } catch (error) {
      console.error(
        "Failed to fetch important information:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("published");
    setEditingId(null);
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN CREATE
  |--------------------------------------------------------------------------
  */

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN EDIT
  |--------------------------------------------------------------------------
  */

  const openEdit = (item: Information) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setStatus(item.status);
    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE
  |--------------------------------------------------------------------------
  */

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  };

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter title");
      return;
    }

    if (!description.trim()) {
      alert("Please enter description");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await axios.put(
          `${API}/api/admin/important-information/${editingId}`,
          {
            title,
            description,
            status,
          },
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post(
          `${API}/api/admin/important-information`,
          {
            title,
            description,
            status,
          },
          {
            withCredentials: true,
          }
        );
      }

      setShowModal(false);
      resetForm();

      await fetchInformation();
    } catch (error: any) {
      console.error(
        "Failed to save important information:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to save important information"
      );
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE
  |--------------------------------------------------------------------------
  */

  const toggleStatus = async (
    item: Information
  ) => {
    try {
      await axios.patch(
        `${API}/api/admin/important-information/${item.id}/toggle-status`,
        {},
        {
          withCredentials: true,
        }
      );

      await fetchInformation();
    } catch (error: any) {
      console.error(
        "Failed to change status:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to change status"
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this information?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${API}/api/admin/important-information/${id}`,
        {
          withCredentials: true,
        }
      );

      await fetchInformation();
    } catch (error: any) {
      console.error(
        "Failed to delete information:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete information"
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Important Information
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage important information visible to
              apartment members.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Information
          </button>
        </div>

        {/* LIST */}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Loading important information...
            </div>
          ) : information.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-center">
              <AlertCircle
                size={42}
                className="mb-4 text-slate-300"
              />

              <h3 className="text-lg font-semibold text-slate-700">
                No important information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add information that should be visible
                to apartment members.
              </p>

              <button
                onClick={openCreate}
                className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <Plus size={16} />
                Add Information
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {information.map((item) => (
                <div
                  key={item.id}
                  className="p-6 transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-slate-800">
                          {item.title}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status ===
                            "published"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.status ===
                          "published"
                            ? "Published"
                            : "Draft"}
                        </span>
                      </div>

                      <p className="max-w-4xl whitespace-pre-line text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>

                      <p className="mt-3 text-xs text-slate-400">
                        Created{" "}
                        {formatDate(
                          item.created_at
                        )}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() =>
                          toggleStatus(item)
                        }
                        title={
                          item.status ===
                          "published"
                            ? "Unpublish"
                            : "Publish"
                        }
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                      >
                        {item.status ===
                        "published" ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>

                      <button
                        onClick={() =>
                          openEdit(item)
                        }
                        title="Edit"
                        className="rounded-lg border border-slate-200 p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        title="Delete"
                        className="rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId
                    ? "Edit Important Information"
                    : "Add Important Information"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  This information will be visible to
                  members of your organisation.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter information title"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Enter important information..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as
                        | "published"
                        | "draft"
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="published">
                    Published
                  </option>

                  <option value="draft">
                    Draft
                  </option>
                </select>
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Information"
                    : "Add Information"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantInformation;