import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  Info,
  Phone,
  Users,
  X,
  ChevronRight,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type InformationType = "emergency" | "community";

type Contact = {
  designation: string;
  name: string;
  contactNo: string;
};

type ParsedInformation = {
  informationType: InformationType;
  contacts: Contact[];
  isLegacy: boolean;
};

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

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<InformationType | null>(null);

  // ============================================================
  // FETCH IMPORTANT INFORMATION
  // ============================================================

  useEffect(() => {
    fetchImportantInformation();
  }, []);

  const fetchImportantInformation = async () => {
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
        setItems(response.data.data || []);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(
        "Failed to fetch important contact information:",
        err
      );

      setError(
        "Unable to load Contact information."
      );

      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // PARSE DESCRIPTION
  // ============================================================

  const parseDescription = (
    description: string
  ): ParsedInformation => {
    if (!description) {
      return {
        informationType: "community",
        contacts: [],
        isLegacy: true,
      };
    }

    try {
      const parsed = JSON.parse(description);

      if (
        parsed &&
        (parsed.informationType === "emergency" ||
          parsed.informationType === "community")
      ) {
        const contacts = Array.isArray(
          parsed.contacts
        )
          ? parsed.contacts
              .map((contact: any) => ({
                designation:
                  String(
                    contact?.designation || ""
                  ).trim(),
                name: String(
                  contact?.name || ""
                ).trim(),
                contactNo: String(
                  contact?.contactNo || ""
                ).trim(),
              }))
              .filter(
                (contact: Contact) =>
                  contact.designation ||
                  contact.name ||
                  contact.contactNo
              )
          : [];

        return {
          informationType:
            parsed.informationType,
          contacts,
          isLegacy: false,
        };
      }
    } catch {
      // Legacy HTML/text content
    }

    return {
      informationType: "community",
      contacts: [],
      isLegacy: true,
    };
  };

  // ============================================================
  // PREPARE CATEGORY DATA
  // ============================================================

  const categoryData = useMemo(() => {
    const emergencyItems: ImportantInformationItem[] =
      [];

    const communityItems: ImportantInformationItem[] =
      [];

    items.forEach((item) => {
      const parsed = parseDescription(
        item.description
      );

      if (
        parsed.informationType === "emergency"
      ) {
        emergencyItems.push(item);
      } else {
        communityItems.push(item);
      }
    });

    return {
      emergency: emergencyItems,
      community: communityItems,
    };
  }, [items]);

  // ============================================================
  // GET ALL CONTACTS FOR SELECTED CATEGORY
  // ============================================================

  const selectedCategoryData = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }

    const categoryItems =
      selectedCategory === "emergency"
        ? categoryData.emergency
        : categoryData.community;

    return categoryItems.flatMap((item) => {
      const parsed = parseDescription(
        item.description
      );

      return parsed.contacts.map((contact) => ({
        ...contact,
        informationId: item.id,
        informationTitle: item.title,
        createdAt: item.created_at,
      }));
    });
  }, [
    selectedCategory,
    categoryData,
  ]);

  // ============================================================
  // CATEGORY HELPERS
  // ============================================================

  const getCategoryItems = (
    type: InformationType
  ) => {
    return type === "emergency"
      ? categoryData.emergency
      : categoryData.community;
  };

  const getCategoryContacts = (
    type: InformationType
  ) => {
    return getCategoryItems(type).flatMap(
      (item) => {
        const parsed = parseDescription(
          item.description
        );

        return parsed.contacts;
      }
    );
  };

  const getCategoryCount = (
    type: InformationType
  ) => {
    return getCategoryContacts(type).length;
  };

  // ============================================================
  // DATE FORMAT
  // ============================================================

  const formatDate = (
    date: string | null
  ) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
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
  // CATEGORY CONFIG
  // ============================================================

  const getCategoryConfig = (
    type: InformationType
  ) => {
    if (type === "emergency") {
      return {
        title: "Emergency Contacts",
        description:
          "Important emergency contact numbers",
        icon: AlertCircle,
        iconWrapper:
          "bg-red-50 text-red-600",
        border:
          "border-red-200",
        hoverBorder:
          "hover:border-red-300",
        hoverBg:
          "hover:bg-red-50/40",
        countBg:
          "bg-red-50 text-red-700",
        accent:
          "bg-red-500",
      };
    }

    return {
      title: "Other Contacts",
      description:
        "Community members and other useful contacts",
      icon: Users,
      iconWrapper:
        "bg-blue-50 text-blue-600",
      border:
        "border-blue-200",
      hoverBorder:
        "hover:border-blue-300",
      hoverBg:
        "hover:bg-blue-50/40",
      countBg:
        "bg-blue-50 text-blue-700",
      accent:
        "bg-blue-500",
    };
  };

  // ============================================================
  // OPEN / CLOSE CATEGORY POPUP
  // ============================================================

  const openCategory = (
    type: InformationType
  ) => {
    setSelectedCategory(type);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 overflow-hidden">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Bell
              size={20}
              className="text-amber-600"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900">
              Important Contact Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Important contacts from your apartment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 h-32"
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

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 overflow-hidden">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Bell
                size={20}
                className="text-amber-600"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-900">
                Important Contact Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Important contacts from your apartment
              </p>
            </div>
          </div>

          {/* {items.length > 0 && (
            <span className="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700">
              {items.length}{" "}
              {items.length === 1
                ? "Category"
                : "Categories"}
            </span>
          )} */}
        </div>

        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ======================================================
            EMPTY
        ====================================================== */}

        {!error && items.length === 0 && (
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
              There are no current contact
              details from your apartment.
            </p>
          </div>
        )}

        {/* ======================================================
            CATEGORY CARDS
        ====================================================== */}

        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ==================================================
                EMERGENCY CONTACTS
            ================================================== */}

            {(
              [
                "emergency",
                "community",
              ] as InformationType[]
            ).map((type) => {
              const config =
                getCategoryConfig(type);

              const Icon =
                config.icon;

              const count =
                getCategoryCount(type);

              const categoryItems =
                getCategoryItems(type);

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    openCategory(type)
                  }
                  className={`group relative w-full text-left rounded-2xl border ${config.border} ${config.hoverBorder} ${config.hoverBg} bg-white p-5 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    type === "emergency"
                      ? "focus:ring-red-300"
                      : "focus:ring-blue-300"
                  }`}
                >
                  {/* TOP ACCENT */}

                  <div
                    className={`absolute left-0 top-5 bottom-5 w-1 rounded-r-full ${config.accent}`}
                  />

                  <div className="flex items-start justify-between gap-4 pl-2">
                    {/* ICON */}

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${config.iconWrapper}`}
                    >
                      <Icon size={23} />
                    </div>

                    {/* COUNT */}

                    <div
                      className={`min-w-[42px] h-8 px-2.5 rounded-full flex items-center justify-center text-xs font-semibold ${config.countBg}`}
                    >
                      {count}
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="mt-4 pl-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-900">
                        {config.title}
                      </h3>

                      <ChevronRight
                        size={18}
                        className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      {config.description}
                    </p>

                    <div className="flex items-center gap-2 mt-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.countBg}`}
                      >
                        {count === 1
                          ? "1 Contact"
                          : `${count} Contacts`}
                      </span>

                      {categoryItems.length >
                        0 && (
                        <span className="text-[11px] text-slate-400">
                          Click to view
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================
          CONTACTS POPUP
      ======================================================== */}

      {selectedCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            {(() => {
              const config =
                getCategoryConfig(
                  selectedCategory
                );

              const Icon =
                config.icon;

              const count =
                selectedCategoryData.length;

              return (
                <>
                  <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-5 border-b border-slate-200 shrink-0">
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${config.iconWrapper}`}
                      >
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                          {config.title}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          {count === 1
                            ? "1 contact available"
                            : `${count} contacts available`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* ==================================================
                      MODAL BODY
                  ================================================== */}

                  <div className="px-5 sm:px-6 py-5 overflow-y-auto">
                    {selectedCategoryData.length ===
                    0 ? (
                      <div className="py-10 text-center">
                        <div
                          className={`w-14 h-14 rounded-full ${config.iconWrapper} flex items-center justify-center mx-auto mb-4`}
                        >
                          <Icon size={24} />
                        </div>

                        <p className="text-sm font-medium text-slate-700">
                          No contacts available
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          No contacts have been
                          added to this category yet.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedCategoryData.map(
                          (contact, index) => (
                            <div
                              key={`${contact.informationId}-${index}`}
                              className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-sm transition"
                            >
                              <div className="flex items-start gap-3">
                                {/* NUMBER */}

                                <div
                                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-semibold ${config.iconWrapper}`}
                                >
                                  {index + 1}
                                </div>

                                {/* CONTACT DETAILS */}

                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <div className="min-w-0">
                                      <h3 className="text-sm font-semibold text-slate-900 break-words">
                                        {contact.name ||
                                          "Unnamed Contact"}
                                      </h3>

                                      {contact.designation && (
                                        <p className="text-xs text-slate-500 mt-0.5 break-words">
                                          {
                                            contact.designation
                                          }
                                        </p>
                                      )}
                                    </div>

                                    {contact.contactNo && (
                                      <a
                                        href={`tel:${contact.contactNo}`}
                                        onClick={(e) =>
                                          e.stopPropagation()
                                        }
                                        className={`inline-flex items-center gap-1.5 shrink-0 text-sm font-medium ${
                                          selectedCategory ===
                                          "emergency"
                                            ? "text-red-600 hover:text-red-700"
                                            : "text-blue-600 hover:text-blue-700"
                                        }`}
                                      >
                                        <Phone
                                          size={15}
                                        />

                                        <span>
                                          {
                                            contact.contactNo
                                          }
                                        </span>
                                      </a>
                                    )}
                                  </div>

                                  {/* SOURCE INFORMATION */}

                                  {contact.informationTitle && (
                                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                      <span className="text-[11px] text-slate-400">
                                        {
                                          contact.informationTitle
                                        }
                                      </span>

                                      {contact.createdAt && (
                                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                                          <CalendarDays
                                            size={11}
                                          />

                                          {formatDate(
                                            contact.createdAt
                                          )}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* ==================================================
                      MODAL FOOTER
                  ================================================== */}

                  <div className="flex justify-end px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
                    >
                      Close
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
};

export default ImportantInformation;