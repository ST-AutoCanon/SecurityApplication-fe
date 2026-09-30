import { useEffect, useState } from "react";
import axios from "axios";
import {
  Edit,
  Plus,
  Trash2,
  Power,
  X,
  Eye,
  Phone,
  Wrench,
  Sparkles,
  ShieldCheck,
  Wifi,
  Car,
  Truck,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Utensils,
  Droplets,
  Zap,
  Hammer,
  Home,
  Dumbbell,
  GraduationCap,
  BriefcaseBusiness,
  HeartPulse,
  Paintbrush,
  Flower2,
  Bug,
  KeyRound,
  Camera,
  Music,
  Bike,
  Settings,
  Star,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type Vendor = {
  id: number;
  category: string;
  name: string;
  description: string | null;
  services: string | null;
  recommendation: string | null;
  phone: string | null;
  created_at: string;
  is_active: boolean;
  recommendation_by_admin?: string | null;
  icon?: string | null;
};

type AlertType = "success" | "warning" | "error";

interface AlertState {
  type: AlertType;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

type IconOption = {
  name: string;
  label: string;
  Icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
};

const ICON_OPTIONS: IconOption[] = [
  {
    name: "wrench",
    label: "Repair",
    Icon: Wrench,
  },
  {
    name: "sparkles",
    label: "Cleaning",
    Icon: Sparkles,
  },
  {
    name: "shield",
    label: "Security",
    Icon: ShieldCheck,
  },
  {
    name: "wifi",
    label: "Internet",
    Icon: Wifi,
  },
  {
    name: "car",
    label: "Car",
    Icon: Car,
  },
  {
    name: "truck",
    label: "Delivery",
    Icon: Truck,
  },
  {
    name: "scissors",
    label: "Salon",
    Icon: Scissors,
  },
  {
    name: "doctor",
    label: "Medical",
    Icon: Stethoscope,
  },
  {
    name: "shopping",
    label: "Shopping",
    Icon: ShoppingBag,
  },
  {
    name: "food",
    label: "Food",
    Icon: Utensils,
  },
  {
    name: "water",
    label: "Water",
    Icon: Droplets,
  },
  {
    name: "electric",
    label: "Electrical",
    Icon: Zap,
  },
  {
    name: "hammer",
    label: "Construction",
    Icon: Hammer,
  },
  {
    name: "home",
    label: "Home Services",
    Icon: Home,
  },
  {
    name: "fitness",
    label: "Fitness",
    Icon: Dumbbell,
  },
  {
    name: "education",
    label: "Education",
    Icon: GraduationCap,
  },
  {
    name: "business",
    label: "Professional",
    Icon: BriefcaseBusiness,
  },
  {
    name: "health",
    label: "Healthcare",
    Icon: HeartPulse,
  },
  {
    name: "painting",
    label: "Painting",
    Icon: Paintbrush,
  },
  {
    name: "gardening",
    label: "Gardening",
    Icon: Flower2,
  },
  {
    name: "pest",
    label: "Pest Control",
    Icon: Bug,
  },
  {
    name: "lock",
    label: "Locksmith",
    Icon: KeyRound,
  },
  {
    name: "camera",
    label: "Photography",
    Icon: Camera,
  },
  {
    name: "music",
    label: "Music",
    Icon: Music,
  },
  {
    name: "bike",
    label: "Bike",
    Icon: Bike,
  },
  {
    name: "settings",
    label: "Other Service",
    Icon: Settings,
  },
];

const getIconOption = (iconName?: string | null) => {
  return (
    ICON_OPTIONS.find((item) => item.name === iconName) ||
    ICON_OPTIONS[ICON_OPTIONS.length - 1]
  );
};

/* =========================================================
   ALERT MODAL
   Same design/behavior as Announcements.tsx
========================================================= */

const AlertModal = ({
  type,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onClose,
}: {
  type: AlertType;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}) => {
  const isConfirm = Boolean(onConfirm);

  useEffect(() => {
    if (type === "warning" && !isConfirm) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [type, isConfirm, onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();

        if (event.key === "Enter" && onConfirm) {
          onConfirm();
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onConfirm]);

  const config =
    type === "success"
      ? {
          borderColor: "#10b981",
          iconColor: "#10b981",
          buttonBg: "#10b981",
          title: "Success",
          Icon: CheckCircle,
        }
      : type === "warning"
      ? {
          borderColor: "#eab308",
          iconColor: "#eab308",
          buttonBg: "#eab308",
          title: "Warning",
          Icon: AlertTriangle,
        }
      : {
          borderColor: "#f43f5e",
          iconColor: "#f43f5e",
          buttonBg: "#f43f5e",
          title: "Error",
          Icon: XCircle,
        };

  const Icon = config.Icon;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(15, 23, 42, 0.45)",
      }}
    >
      <div
        style={{
          width: 380,
          maxWidth: "calc(100vw - 32px)",
          overflow: "hidden",
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
          borderLeft: `4px solid ${config.borderColor}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#020b3d",
            padding: "14px 20px",
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Icon size={24} color={config.iconColor} />

            <h2
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              {config.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: 4,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            padding: "22px 20px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#475569",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
            padding: "14px 20px",
          }}
        >
          {isConfirm && (
            <button
              type="button"
              onClick={onClose}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: 500,
                color: "#475569",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              {cancelText || "Cancel"}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (onConfirm) {
                onClose();
                setTimeout(onConfirm, 100);
              } else {
                onClose();
              }
            }}
            style={{
              border: "none",
              borderRadius: 8,
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 500,
              color: "#fff",
              background: config.buttonBg,
              cursor: "pointer",
            }}
          >
            {isConfirm ? confirmText || "Confirm" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

const VendorsServiceProviders = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedVendor, setSelectedVendor] =
    useState<Vendor | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [services, setServices] = useState("");
  const [recommendation, setRecommendation] =
    useState("");
  const [phone, setPhone] = useState("");
  const [selectedIcon, setSelectedIcon] =
    useState("settings");

  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState<{
    category?: string;
    name?: string;
    phone?: string;
  }>({});

  const [alert, setAlert] =
    useState<AlertState | null>(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  /* =========================================================
     ALERT HELPERS
  ========================================================== */

  const showAlert = (
    type: AlertType,
    message: string,
    options?: {
      confirmText?: string;
      cancelText?: string;
      onConfirm?: () => void;
    }
  ) => {
    setAlert({
      type,
      message,
      ...options,
    });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const getApiResponseMessage = (
    data: any,
    fallback: string
  ): string => {
    if (data === null || data === undefined) {
      return fallback;
    }

    if (typeof data === "string") {
      const trimmed = data.trim();
      return trimmed || fallback;
    }

    const candidates = [
      data?.message,
      data?.msg,
      data?.error,
      data?.detail,
      data?.data?.message,
      data?.data?.msg,
      data?.data?.error,
      data?.data?.detail,
    ];

    for (const candidate of candidates) {
      if (
        candidate === null ||
        candidate === undefined
      ) {
        continue;
      }

      if (typeof candidate === "string") {
        const trimmed = candidate.trim();

        if (trimmed) {
          return trimmed;
        }
      }

      if (typeof candidate === "object") {
        try {
          return JSON.stringify(candidate);
        } catch {
          // Continue to next candidate
        }
      }
    }

    if (
      Array.isArray(data?.errors) &&
      data.errors.length
    ) {
      return data.errors
        .map((item: any) =>
          typeof item === "string"
            ? item
            : item?.message ||
              item?.msg ||
              JSON.stringify(item)
        )
        .join("\n");
    }

    if (
      Array.isArray(data?.data?.errors) &&
      data.data.errors.length
    ) {
      return data.data.errors
        .map((item: any) =>
          typeof item === "string"
            ? item
            : item?.message ||
              item?.msg ||
              JSON.stringify(item)
        )
        .join("\n");
    }

    try {
      const serialized = JSON.stringify(
        data,
        null,
        2
      );

      return serialized && serialized !== "{}"
        ? serialized
        : fallback;
    } catch {
      return fallback;
    }
  };

  /* =========================================================
     FETCH
  ========================================================== */

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
      } else {
        showAlert(
          "error",
          getApiResponseMessage(
            response.data,
            "Unable to load vendors and service providers."
          )
        );
      }
    } catch (error: any) {
      console.error(
        "Failed to fetch vendors:",
        error
      );

      showAlert(
        "error",
        getApiResponseMessage(
          error?.response?.data,
          "Failed to load vendors and service providers."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FORM
  ========================================================== */

  const resetForm = () => {
    setCategory("");
    setName("");
    setDescription("");
    setServices("");
    setRecommendation("");
    setPhone("");
    setSelectedIcon("settings");
    setEditingId(null);
    setErrors({});
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (vendor: Vendor) => {
    setEditingId(vendor.id);

    setCategory(vendor.category || "");
    setName(vendor.name || "");
    setDescription(vendor.description || "");
    setServices(vendor.services || "");

    setRecommendation(
      vendor.recommendation ??
        vendor.recommendation_by_admin ??
        ""
    );

    setPhone(vendor.phone || "");

    setSelectedIcon(
      vendor.icon || "settings"
    );

    setErrors({});
    setShowModal(true);
  };

  const openViewModal = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowViewModal(true);
  };

  /* =========================================================
     VALIDATION
  ========================================================== */

  const validateForm = () => {
    const newErrors: {
      category?: string;
      name?: string;
      phone?: string;
    } = {};

    if (!category.trim()) {
      newErrors.category =
        "Category is required.";
    }

    if (!name.trim()) {
      newErrors.name =
        "Provider name is required.";
    }

    if (!phone.trim()) {
      newErrors.phone =
        "Contact number is required.";
    } else {
      const cleanPhone = phone.replace(
        /[\s-]/g,
        ""
      );

      const indianPhoneRegex =
        /^(?:\+91|91)?[6-9]\d{9}$/;

      if (!indianPhoneRegex.test(cleanPhone)) {
        newErrors.phone =
          "Enter a valid 10-digit Indian contact number.";
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handlePhoneChange = (
    value: string
  ) => {
    setPhone(value);

    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: undefined,
      }));
    }
  };

  /* =========================================================
     SAVE
  ========================================================== */

  const saveVendor = async () => {
    if (!validateForm()) {
      showAlert(
        "warning",
        "Please fill all mandatory fields correctly."
      );

      return;
    }

    const isEditing = editingId !== null;

    try {
      setSaving(true);

      const payload = {
        category: category.trim(),
        name: name.trim(),
        description: description.trim(),
        services: services.trim(),
        recommendation:
          recommendation.trim(),
        phone: phone.trim(),
        icon: selectedIcon,
      };

      let response;

      if (editingId !== null) {
        response = await axios.put(
          `${API}/api/admin/vendors-service-providers/${editingId}`,
          payload,
          {
            withCredentials: true,
          }
        );
      } else {
        response = await axios.post(
          `${API}/api/admin/vendors-service-providers`,
          payload,
          {
            withCredentials: true,
          }
        );
      }

      const apiMessage =
        getApiResponseMessage(
          response?.data,
          isEditing
            ? "Provider updated successfully."
            : "Provider added successfully."
        );

      setShowModal(false);
      resetForm();

      await fetchVendors();

      showAlert(
        "success",
        apiMessage
      );
    } catch (error: any) {
      console.error(
        "Failed to save vendor:",
        error
      );

      showAlert(
        "error",
        getApiResponseMessage(
          error?.response?.data,
          "Failed to save vendor / service provider."
        )
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     TOGGLE
  ========================================================== */

  const toggleVendor = async (id: number) => {
    try {
      const response = await axios.patch(
        `${API}/api/admin/vendors-service-providers/${id}/toggle`,
        {},
        {
          withCredentials: true,
        }
      );

      await fetchVendors();

      showAlert(
        "success",
        getApiResponseMessage(
          response?.data,
          "Provider status updated successfully."
        )
      );
    } catch (error: any) {
      console.error(
        "Failed to toggle vendor:",
        error
      );

      showAlert(
        "error",
        getApiResponseMessage(
          error?.response?.data,
          "Failed to update provider status."
        )
      );
    }
  };

  /* =========================================================
     DELETE
  ========================================================== */

  const deleteVendor = (id: number) => {
    const vendor = vendors.find(
      (item) => item.id === id
    );

    showAlert(
      "warning",
      `Are you sure you want to delete ${
        vendor?.name || "this provider"
      }? This action cannot be undone.`,
      {
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: async () => {
          try {
            const response =
              await axios.delete(
                `${API}/api/admin/vendors-service-providers/${id}`,
                {
                  withCredentials: true,
                }
              );

            await fetchVendors();

            showAlert(
              "success",
              getApiResponseMessage(
                response?.data,
                "Provider deleted successfully."
              )
            );
          } catch (error: any) {
            console.error(
              "Failed to delete vendor:",
              error
            );

            showAlert(
              "error",
              getApiResponseMessage(
                error?.response?.data,
                "Failed to delete vendor / service provider."
              )
            );
          }
        },
      }
    );
  };

  /* =========================================================
     ICON
  ========================================================== */

  const renderProviderIcon = (
    iconName?: string | null,
    size = 22
  ) => {
    const option =
      getIconOption(iconName);

    const IconComponent = option.Icon;

    return (
      <IconComponent
        size={size}
        strokeWidth={2}
      />
    );
  };

  const getRecommendationLabel = (
    value?: string | null
  ) => {
    if (!value) {
      return "Not specified";
    }

    return value;
  };

  /* =========================================================
     UI
  ========================================================== */

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Provider
        </button>
      </div>

      {/* PROVIDER CARDS */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
          Loading vendors and service providers...
        </div>
      ) : vendors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
            <BriefcaseBusiness size={26} />
          </div>

          <h3 className="text-base font-semibold text-slate-800">
            No Providers Added
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Add your first vendor or service
            provider to get started.
          </p>

          <button
            onClick={openAddModal}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            <Plus size={17} />
            Add Provider
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {vendors.map((vendor) => {
            return (
              <div
                key={vendor.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* CARD TOP */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        {renderProviderIcon(
                          vendor.icon,
                          23
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">
                          {vendor.name}
                        </h3>

                        <p className="text-xs text-slate-500 mt-0.5">
                          {vendor.category}
                        </p>
                      </div>
                    </div>

                    {/* <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                        vendor.is_active
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {vendor.is_active
                        ? "Active"
                        : "Inactive"}
                    </span> */}
                  </div>

                  {/* DESCRIPTION */}
                  {vendor.description && (
                    <p className="text-sm text-slate-600 mt-4 line-clamp-2">
                      {vendor.description}
                    </p>
                  )}

                  {/* SERVICES */}
                  {vendor.services && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                        Services
                      </p>

                      <p className="text-sm text-slate-700 line-clamp-2">
                        {vendor.services}
                      </p>
                    </div>
                  )}

                  {/* RECOMMENDATION */}
                  <div className="mt-4 flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Star
                        size={16}
                        fill="currentColor"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Admin Recommendation
                      </p>

                      <p className="text-sm text-slate-700 mt-0.5 line-clamp-2">
                        {getRecommendationLabel(
                          vendor.recommendation ??
                            vendor.recommendation_by_admin
                        )}
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <Phone
                      size={16}
                      className="text-slate-400"
                    />

                    <span>
                      {vendor.phone ||
                        "No contact number"}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() =>
                        openViewModal(vendor)
                      }
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-600 transition"
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          openEditModal(vendor)
                        }
                        title="Edit provider"
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      >
                        <Edit size={17} />
                      </button>

                      {/* <button
                        onClick={() =>
                          toggleVendor(
                            vendor.id
                          )
                        }
                        title={
                          vendor.is_active
                            ? "Deactivate provider"
                            : "Activate provider"
                        }
                        className={`p-2 rounded-lg transition ${
                          vendor.is_active
                            ? "text-green-600 hover:bg-green-50"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        <Power size={17} />
                      </button> */}

                      <button
                        onClick={() =>
                          deleteVendor(
                            vendor.id
                          )
                        }
                        title="Delete provider"
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
            {/* HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b bg-white rounded-t-2xl">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {editingId !== null
                    ? "Edit Provider"
                    : "Add Provider"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add vendor or service provider
                  details.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CATEGORY */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Category{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    value={category}
                    onChange={(e) => {
                      setCategory(
                        e.target.value
                      );

                      if (errors.category) {
                        setErrors((prev) => ({
                          ...prev,
                          category:
                            undefined,
                        }));
                      }
                    }}
                    placeholder="e.g. Housekeeping"
                    className={`mt-1 w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.category
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-300"
                    }`}
                  />

                  {errors.category && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* PROVIDER NAME */}
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Provider Name{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      if (errors.name) {
                        setErrors((prev) => ({
                          ...prev,
                          name: undefined,
                        }));
                      }
                    }}
                    placeholder="e.g. ShineClean Services"
                    className={`mt-1 w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-300"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* ICON SELECTOR */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Provider Icon
                </label>

                <p className="text-xs text-slate-500 mt-1 mb-3">
                  Select an icon that best represents
                  this vendor or service.
                </p>

                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {ICON_OPTIONS.map(
                    (option) => {
                      const IconComponent =
                        option.Icon;

                      const isSelected =
                        selectedIcon ===
                        option.name;

                      return (
                        <button
                          key={option.name}
                          type="button"
                          title={option.label}
                          onClick={() =>
                            setSelectedIcon(
                              option.name
                            )
                          }
                          className={`flex flex-col items-center justify-center gap-1.5 h-16 rounded-xl border transition ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-100"
                              : "border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50/50"
                          }`}
                        >
                          <IconComponent
                            size={20}
                            strokeWidth={2}
                          />

                          <span className="text-[10px] truncate max-w-full px-1">
                            {option.label}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Describe the provider..."
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* SERVICES */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Services
                </label>

                <input
                  value={services}
                  onChange={(e) =>
                    setServices(
                      e.target.value
                    )
                  }
                  placeholder="Cleaning, Floor Care, Deep Cleaning"
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* RECOMMENDATION */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Recommendation by Admin
                </label>

                <textarea
                  value={recommendation}
                  onChange={(e) =>
                    setRecommendation(
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="e.g. Reliable service provider recommended for regular housekeeping."
                  className="mt-1 w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <p className="text-xs text-slate-400 mt-1">
                  Add a short recommendation or
                  note for apartment members.
                </p>
              </div>

              {/* CONTACT */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Contact Number{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={phone}
                    onChange={(e) =>
                      handlePhoneChange(
                        e.target.value
                      )
                    }
                    placeholder="+91 98765 43210"
                    className={`mt-1 w-full pl-10 pr-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-300"
                    }`}
                  />
                </div>

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="sticky bottom-0 flex justify-end gap-3 px-6 py-4 border-t bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                disabled={saving}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-white disabled:opacity-50"
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
                  : editingId !== null
                  ? "Update Provider"
                  : "Add Provider"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW MODAL
      ====================================================== */}
      {showViewModal && selectedVendor && (
        <div className="fixed inset-0 z-[55] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Provider Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  View vendor or service provider
                  information.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedVendor(null);
                }}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* VIEW CONTENT */}
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {renderProviderIcon(
                    selectedVendor.icon,
                    30
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {selectedVendor.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedVendor.category}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {/* PHONE */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <Phone size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Contact Number
                    </p>

                    <p className="text-sm text-slate-700 mt-1">
                      {selectedVendor.phone ||
                        "Not provided"}
                    </p>
                  </div>
                </div>

                {/* SERVICES */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <Wrench size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Services
                    </p>

                    <p className="text-sm text-slate-700 mt-1">
                      {selectedVendor.services ||
                        "Not specified"}
                    </p>
                  </div>
                </div>

                {/* RECOMMENDATION */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                    <Star
                      size={17}
                      fill="currentColor"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Recommendation by Admin
                    </p>

                    <p className="text-sm text-slate-700 mt-1">
                      {getRecommendationLabel(
                        selectedVendor.recommendation ??
                          selectedVendor.recommendation_by_admin
                      )}
                    </p>
                  </div>
                </div>

                {/* DESCRIPTION */}
                {selectedVendor.description && (
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Description
                    </p>

                    <p className="text-sm text-slate-600 mt-1 leading-6">
                      {
                        selectedVendor.description
                      }
                    </p>
                  </div>
                )}

                {/* STATUS */}
                <div className="pt-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                      selectedVendor.is_active
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {selectedVendor.is_active ? (
                      <CheckCircle
                        size={14}
                      />
                    ) : (
                      <Power size={14} />
                    )}

                    {selectedVendor.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* VIEW FOOTER */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-slate-50">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(
                    selectedVendor
                  );
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                <Edit size={16} />
                Edit
              </button>

              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedVendor(null);
                }}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SAME ALERT MODAL USED IN ANNOUNCEMENTS
      ====================================================== */}
      {alert && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          confirmText={alert.confirmText}
          cancelText={alert.cancelText}
          onConfirm={alert.onConfirm}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default VendorsServiceProviders;

