import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Save,
  Loader2,
  User,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
const API = import.meta.env.VITE_BACKEND_URL;

export default function BusinessDataEditPage() {
  const navigate = useNavigate();

const location = useLocation();

const parts = location.pathname.split("/");

console.log(parts);

const table = parts[4];
    const id = parts[5];
    
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Record<string, any>>({});

  const [error, setError] = useState("");

  // ----------------------------
  // Fetch Record
  // ----------------------------

  const loadRecord = async () => {
    try {
      setLoading(true);

   console.log("URL:", location.pathname);
   console.log("Parts:", parts);
   console.log("Table:", table);
   console.log("ID:", id);
      const res = await axios.get(
        `${API}/api/admin/business-data/${table}/${id}`,
        {
          withCredentials: true,
        },
      );

      setFormData(res.data.data || {});
    } catch (err: any) {
      console.error(err);

      setError(err.response?.data?.message || "Unable to load record.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecord();
  }, []);

  // ----------------------------
  // Input Change
  // ----------------------------

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ----------------------------
  // Save
  // ----------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axios.put(
        `${API}/api/admin/business-data/${table}/${id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      alert("Updated Successfully");

      navigate(-1);
    } catch (err: any) {
      console.error(err);

      alert(err.response?.data?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------
  // Helpers
  // ----------------------------

  const title = (text: string) =>
    text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const ignoredFields = ["id", "created_at", "updated_at", "face_descriptor"];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-white shadow hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Edit {title(table || "")}
            </h1>

            <p className="text-gray-500">Update record information</p>
          </div>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(formData)
            .filter(([key]) => !ignoredFields.includes(key))
            .map(([key, value]) => {
              const label = title(key);

              // -------------------------
              // Profile Photo Preview
              // -------------------------
              if (
                key === "profile_photo" &&
                typeof value === "string" &&
                value.startsWith("http")
              ) {
                return (
                  <div key={key} className="md:col-span-2">
                    <label className="block mb-2 font-semibold text-slate-700">
                      {label}
                    </label>

                    <div className="flex items-center gap-5">
                      <img
                        src={value}
                        alt="Profile"
                        className="w-28 h-28 rounded-xl object-cover border shadow"
                      />

                      <div className="text-gray-500 text-sm">
                        Image preview only
                      </div>
                    </div>
                  </div>
                );
              }

              // -------------------------
              // Status Dropdown
              // -------------------------
              if (key === "status") {
                return (
                  <div key={key}>
                    <label className="block mb-2 font-semibold text-slate-700">
                      {label}
                    </label>

                    <select
                      value={value ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                );
              }

              // -------------------------
              // Boolean
              // -------------------------
              if (typeof value === "boolean") {
                return (
                  <div key={key} className="flex items-center gap-3 mt-8">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleChange(key, e.target.checked)}
                      className="h-5 w-5"
                    />

                    <label className="font-medium text-slate-700">
                      {label}
                    </label>
                  </div>
                );
              }

              // -------------------------
              // Number
              // -------------------------
              if (typeof value === "number") {
                return (
                  <div key={key}>
                    <label className="block mb-2 font-semibold text-slate-700">
                      {label}
                    </label>

                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleChange(key, Number(e.target.value))
                      }
                      className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              }

              // -------------------------
              // Email
              // -------------------------
              if (key.toLowerCase().includes("email")) {
                return (
                  <div key={key}>
                    <label className="block mb-2 font-semibold text-slate-700">
                      {label}
                    </label>

                    <input
                      type="email"
                      value={value ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              }

              // -------------------------
              // Date
              // -------------------------
              if (key.includes("date") || key.includes("dob")) {
                return (
                  <div key={key}>
                    <label className="block mb-2 font-semibold text-slate-700">
                      {label}
                    </label>

                    <input
                      type="date"
                      value={value ? String(value).substring(0, 10) : ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              }

              // -------------------------
              // Long Text
              // -------------------------
              if (typeof value === "string" && value.length > 120) {
                return (
                  <div key={key} className="md:col-span-2">
                    <label className="block mb-2 font-semibold text-slate-700">
                      {label}
                    </label>

                    <textarea
                      rows={5}
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                );
              }

              // -------------------------
              // Default Text Input
              // -------------------------
              return (
                <div key={key}>
                  <label className="block mb-2 font-semibold text-slate-700">
                    {label}
                  </label>

                  <input
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            })}
        </div>

        {/* Footer Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>

      {/* Record Info */}
      <div className="mt-6 bg-white rounded-2xl shadow p-5">
        <div className="flex items-center gap-2 mb-3">
          <User className="text-blue-600" size={20} />
          <h3 className="font-semibold text-lg">Record Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {formData.id && (
            <div>
              <p className="text-gray-500">ID</p>
              <p className="font-semibold">{formData.id}</p>
            </div>
          )}

          {formData.created_at && (
            <div>
              <p className="text-gray-500">Created At</p>
              <p className="font-semibold">
                {new Date(formData.created_at).toLocaleString()}
              </p>
            </div>
          )}

          {formData.updated_at && (
            <div>
              <p className="text-gray-500">Updated At</p>
              <p className="font-semibold">
                {new Date(formData.updated_at).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}