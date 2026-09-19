import { useEffect, useState } from "react";
import axios from "axios";
import {
  Edit,
  Plus,
  Trash2,
  Power,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type Vendor = {
  id: number;
  category: string;
  name: string;
  description: string | null;
  services: string | null;
  rating: number;
  review_count: number;
  phone: string | null;
  created_at: string;
  is_active: boolean;
};

const VendorsServiceProviders = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [services, setServices] = useState("");
  const [rating, setRating] = useState("0");
  const [reviewCount, setReviewCount] =
    useState("0");
  const [phone, setPhone] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/admin/vendors-service-providers`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setVendors(response.data.data || []);
      }
    } catch (error) {
      console.error(
        "Failed to fetch vendors:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCategory("");
    setName("");
    setDescription("");
    setServices("");
    setRating("0");
    setReviewCount("0");
    setPhone("");
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (vendor: Vendor) => {
    setEditingId(vendor.id);
    setCategory(vendor.category);
    setName(vendor.name);
    setDescription(
      vendor.description || ""
    );
    setServices(vendor.services || "");
    setRating(String(vendor.rating || 0));
    setReviewCount(
      String(vendor.review_count || 0)
    );
    setPhone(vendor.phone || "");
    setShowModal(true);
  };

  const saveVendor = async () => {
    if (!category.trim() || !name.trim()) {
      alert("Category and name are required");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        category,
        name,
        description,
        services,
        rating: Number(rating),
        reviewCount: Number(reviewCount),
        phone,
      };

      if (editingId) {
        await axios.put(
          `${API}/api/admin/vendors-service-providers/${editingId}`,
          payload,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post(
          `${API}/api/admin/vendors-service-providers`,
          payload,
          {
            withCredentials: true,
          }
        );
      }

      setShowModal(false);
      resetForm();

      await fetchVendors();
    } catch (error) {
      console.error(
        "Failed to save vendor:",
        error
      );

      alert(
        "Failed to save vendor / service provider"
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleVendor = async (id: number) => {
    try {
      await axios.patch(
        `${API}/api/admin/vendors-service-providers/${id}/toggle`,
        {},
        {
          withCredentials: true,
        }
      );

      await fetchVendors();
    } catch (error) {
      console.error(
        "Failed to toggle vendor:",
        error
      );
    }
  };

  const deleteVendor = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vendor / service provider?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${API}/api/admin/vendors-service-providers/${id}`,
        {
          withCredentials: true,
        }
      );

      await fetchVendors();
    } catch (error) {
      console.error(
        "Failed to delete vendor:",
        error
      );
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Vendors & Service Providers
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage vendors and service providers
            available to apartment members.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Provider
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading...
          </div>
        ) : vendors.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No vendors or service providers added yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500">
                    Category
                  </th>

                  <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500">
                    Provider
                  </th>

                  <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500">
                    Services
                  </th>

                  <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500">
                    Rating
                  </th>

                  <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500">
                    Status
                  </th>

                  <th className="text-right px-5 py-4 text-xs font-semibold text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {vendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-700">
                        {vendor.category}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {vendor.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {vendor.phone || "No phone"}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">
                        {vendor.services || "-"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm">
                        ⭐ {vendor.rating}
                      </span>

                      <span className="text-xs text-slate-400 ml-1">
                        ({vendor.review_count})
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          vendor.is_active
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {vendor.is_active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            openEditModal(vendor)
                          }
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() =>
                            toggleVendor(vendor.id)
                          }
                          className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                        >
                          <Power size={16} />
                        </button>

                        <button
                          onClick={() =>
                            deleteVendor(vendor.id)
                          }
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl">
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {editingId
                    ? "Edit Provider"
                    : "Add Provider"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add vendor or service provider details.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Category
                </label>

                <input
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  placeholder="e.g. Housekeeping"
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Provider Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. ShineClean Services"
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={3}
                  placeholder="Describe the provider..."
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Services
                </label>

                <input
                  value={services}
                  onChange={(e) =>
                    setServices(e.target.value)
                  }
                  placeholder="Cleaning, Floor Care, Deep Cleaning"
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Rating
                </label>

                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(e) =>
                    setRating(e.target.value)
                  }
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Review Count
                </label>

                <input
                  type="number"
                  min="0"
                  value={reviewCount}
                  onChange={(e) =>
                    setReviewCount(e.target.value)
                  }
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Contact Number
                </label>

                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={saveVendor}
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Provider"
                  : "Add Provider"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorsServiceProviders;