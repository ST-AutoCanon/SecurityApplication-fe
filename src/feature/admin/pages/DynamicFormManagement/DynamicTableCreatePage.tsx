// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../../../context/AuthContext";
// import Alert from "../../../../components/Aleartmessage";

// const API = `${import.meta.env.VITE_BACKEND_URL}`;

// type Template = {
//   id: number;
//   template_name: string;
// };

// type Field = {
//   field_key: string;
//   field_label: string;
//   is_required?: boolean;
// };

// type SelectedField = {
//   field_key: string;
//   is_required: boolean;
// };

// export default function DynamicTableCreatePage() {
//   const { user } = useContext(AuthContext);

//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [fields, setFields] = useState<Field[]>([]);

//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(
//     null,
//   );

//   const [selectedFields, setSelectedFields] = useState<SelectedField[]>([]);

//   const [displayName, setDisplayName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [alertData, setAlertData] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   /* =========================================================
//      GET TEMPLATES
//   ========================================================= */

//   useEffect(() => {
//     const getTemplates = async () => {
//       try {
//         const res = await axios.get(`${API}/dynamic-tables/templates`);

//         setTemplates(res.data.data || []);
//       } catch (err) {
//         console.error("Get Templates Error:", err);

//         setAlertData({
//           type: "error",
//           message: "Failed to load templates.",
//         });
//       }
//     };

//     getTemplates();
//   }, []);

//   /* =========================================================
//      GET TEMPLATE FIELDS

//      IMPORTANT:
//      Create page does NOT load existing configuration.
//      It starts with no selected fields.
//   ========================================================= */

//   useEffect(() => {
//     if (!selectedTemplate) {
//       setFields([]);
//       setSelectedFields([]);
//       setDisplayName("");
//       return;
//     }

//     const loadFields = async () => {
//       try {
//         setLoading(true);

//         const res = await axios.get(
//           `${API}/dynamic-tables/templates/${selectedTemplate}`,
//         );

//         const templateFields: Field[] = Array.isArray(res.data.data)
//           ? res.data.data
//           : [];

//         setFields(templateFields);

//         // New dynamic table starts with no fields selected.
//         setSelectedFields([]);

//         setDisplayName("");
//       } catch (err: any) {
//         console.error("Get Template Fields Error:", err);

//         setFields([]);
//         setSelectedFields([]);

//         setAlertData({
//           type: "error",
//           message:
//             err?.response?.data?.message ||
//             "Failed to load template fields.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFields();
//   }, [selectedTemplate]);

//   /* =========================================================
//      TOGGLE FIELD
//   ========================================================= */

//   const toggleField = (field: Field) => {
//     setSelectedFields((prev) => {
//       const exists = prev.some(
//         (selected) => selected.field_key === field.field_key,
//       );

//       // Remove field
//       if (exists) {
//         return prev.filter(
//           (selected) => selected.field_key !== field.field_key,
//         );
//       }

//       // Add field.
//       // Template is_required determines the initial checkbox state.
//       return [
//         ...prev,
//         {
//           field_key: field.field_key,
//           is_required: Boolean(field.is_required),
//         },
//       ];
//     });
//   };

//   /* =========================================================
//      TOGGLE REQUIRED
//   ========================================================= */

//   const toggleRequired = (fieldKey: string) => {
//     setSelectedFields((prev) =>
//       prev.map((field) =>
//         field.field_key === fieldKey
//           ? {
//               ...field,
//               is_required: !field.is_required,
//             }
//           : field,
//       ),
//     );
//   };

//   /* =========================================================
//      CHECK FIELD SELECTED
//   ========================================================= */

//   const isFieldSelected = (fieldKey: string) => {
//     return selectedFields.some(
//       (field) => field.field_key === fieldKey,
//     );
//   };

//   /* =========================================================
//      GET SELECTED FIELD
//   ========================================================= */

//   const getSelectedField = (fieldKey: string) => {
//     return selectedFields.find(
//       (field) => field.field_key === fieldKey,
//     );
//   };

//   /* =========================================================
//      SUBMIT
//   ========================================================= */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     /* ---------------- VALIDATION ---------------- */

//     if (!selectedTemplate) {
//       setAlertData({
//         type: "error",
//         message: "Please select a template.",
//       });
//       return;
//     }

//     if (!displayName.trim()) {
//       setAlertData({
//         type: "error",
//         message: "Display name is required.",
//       });
//       return;
//     }

//     if (selectedFields.length === 0) {
//       setAlertData({
//         type: "error",
//         message: "Please select at least one field.",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       /* ---------------- CREATE DYNAMIC TABLE ---------------- */

//       const payload = {
//         organisationId: user?.organisation_id,
//         templateId: selectedTemplate,
//         displayName: displayName.trim(),
//         tableName: displayName
//           .trim()
//           .toLowerCase()
//           .replace(/\s+/g, "_"),
//         createdBy: user?.id,

//         /*
//           Example:

//           fields: [
//             {
//               field_key: "full_name",
//               is_required: true
//             },
//             {
//               field_key: "email",
//               is_required: false
//             },
//             {
//               field_key: "address",
//               is_required: true
//             }
//           ]
//         */
//         fields: selectedFields,
//       };

//       console.log("CREATE DYNAMIC TABLE PAYLOAD:", payload);

//       const res = await axios.post(
//         `${API}/dynamic-tables`,
//         payload,
//         {
//           withCredentials: true,
//         },
//       );

//       /* ---------------- SUCCESS ---------------- */

//       setAlertData({
//         type: "success",
//         message: res.data.message || "Dynamic table created successfully.",
//       });

//       /* ---------------- RESET FORM ---------------- */

//       setSelectedTemplate(null);
//       setSelectedFields([]);
//       setDisplayName("");
//       setFields([]);
//     } catch (err: any) {
//       console.error("Create Dynamic Table Error:", err);

//       setAlertData({
//         type: "error",
//         message:
//           err?.response?.data?.message ||
//           "Error creating dynamic table.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white shadow rounded-xl p-8">
//           {/* =================================================
//               TITLE
//           ================================================= */}

//           <h1 className="text-3xl font-bold mb-6">Create Dynamic Form</h1>

//           {/* =================================================
//               TEMPLATE SELECT
//           ================================================= */}

//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Select Template</label>

//             <select
//               // className="w-full border rounded-lg p-3"
//               className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
//               value={selectedTemplate ?? ""}
//               onChange={(e) => {
//                 const value = e.target.value;

//                 setSelectedTemplate(value ? Number(value) : null);
//               }}
//               disabled={loading}
//             >
//               <option value="">Select</option>

//               {templates.map((template) => (
//                 <option key={template.id} value={template.id}>
//                   {template.template_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* =================================================
//               DISPLAY NAME
//           ================================================= */}

//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Display Name</label>

//             <input
//               type="text"
//               // className="w-full border rounded-lg p-3"
//               className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
//               value={displayName}
//               onChange={(e) => setDisplayName(e.target.value)}
//               placeholder="e.g. Maids / Visitors"
//               disabled={loading}
//             />
//           </div>

//           {/* =================================================
//               FIELD SELECT
//           ================================================= */}

//           {fields.length > 0 && (
//             <div className="mb-6">
//               <label className="block mb-3 font-medium">Select Fields</label>

//               <div className="space-y-3">
//                 {fields.map((field) => {
//                   const selected = isFieldSelected(field.field_key);

//                   const selectedField = getSelectedField(field.field_key);

//                   return (
//                     // <div
//                     //   key={field.field_key}
//                     //   className="flex items-center justify-between gap-4 border p-4 rounded-lg"
//                     // >
//                     <div
//                       key={field.field_key}
//                       className={`flex items-center justify-between gap-4 border p-4 rounded-lg transition-colors ${
//                         selected
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-300 bg-white"
//                       }`}
//                     >
//                       {/* =====================================
//                           FIELD CHECKBOX
//                       ===================================== */}

//                       <label className="flex items-center gap-3 cursor-pointer min-w-0">
//                         <input
//                           type="checkbox"
//                           checked={selected}
//                           onChange={() => toggleField(field)}
//                           className="h-4 w-4 shrink-0"
//                         />

//                         {/* <span className="font-medium">{field.field_label}</span> */}
//                         <span
//                           className={`font-medium ${
//                             selected ? "text-blue-700" : "text-gray-700"
//                           }`}
//                         >
//                           {field.field_label}
//                         </span>
//                       </label>

//                       {/* =====================================
//                           REQUIRED CHECKBOX

//                           IMPORTANT:
//                           This appears for EVERY selected field.

//                           is_required only controls whether
//                           the checkbox is checked.
//                       ===================================== */}

//                       {selected && (
//                         <div className="flex items-center gap-2 shrink-0">
//                           <input
//                             id={`required-${field.field_key}`}
//                             type="checkbox"
//                             checked={selectedField?.is_required ?? false}
//                             onChange={() => toggleRequired(field.field_key)}
//                             className="h-4 w-4"
//                           />

//                           <label
//                             htmlFor={`required-${field.field_key}`}
//                             className="cursor-pointer text-sm whitespace-nowrap"
//                           >
//                             Required
//                           </label>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* =================================================
//               SELECTED FIELD SUMMARY
//           ================================================= */}

//           {selectedFields.length > 0 && (
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
//               <h3 className="font-semibold mb-3">Selected Fields</h3>

//               <div className="space-y-2">
//                 {selectedFields.map((selectedField) => {
//                   const fieldInfo = fields.find(
//                     (field) => field.field_key === selectedField.field_key,
//                   );

//                   return (
//                     <div
//                       key={selectedField.field_key}
//                       className="flex justify-between items-center text-sm"
//                     >
//                       <span>
//                         {fieldInfo?.field_label || selectedField.field_key}
//                       </span>

//                       <span
//                         className={
//                           selectedField.is_required
//                             ? "text-red-600 font-medium"
//                             : "text-gray-500"
//                         }
//                       >
//                         {selectedField.is_required ? "Required" : "Optional"}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* =================================================
//               SUBMIT
//           ================================================= */}

//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={
//               loading ||
//               !selectedTemplate ||
//               !displayName.trim() ||
//               selectedFields.length === 0
//             }
//             className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 rounded-xl text-white font-medium"
//           >
//             {loading ? "Creating..." : "Create Table"}
//           </button>
//         </div>
//       </div>

//       {/* =====================================================
//           ALERT
//       ===================================================== */}

//       {alertData && (
//         <Alert
//           type={alertData.type}
//           message={alertData.message}
//           onClose={() => setAlertData(null)}
//         />
//       )}
//     </>
//   );
// }

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Check,
  ChevronDown,
  FilePlus2,
  ListChecks,
  Loader2,
  Plus,
  Settings2,
  X,
} from "lucide-react";
import { AuthContext } from "../../../../context/AuthContext";
import Alert from "../../../../components/Aleartmessage";

const API = `${import.meta.env.VITE_BACKEND_URL}`;

type Template = {
  id: number;
  template_name: string;
};

type Field = {
  field_key: string;
  field_label: string;
  is_required?: boolean;
};

type SelectedField = {
  field_key: string;
  is_required: boolean;
};

export default function DynamicTableCreatePage() {
  const { user } = useContext(AuthContext);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const [selectedFields, setSelectedFields] = useState<SelectedField[]>([]);

  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const [alertData, setAlertData] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* =========================================================
     SHARED STYLES
  ========================================================= */

  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 " +
    "placeholder-gray-400 focus:outline-none focus:border-blue-500 " +
    "focus:ring-0 transition-colors disabled:bg-gray-50 " +
    "disabled:cursor-not-allowed";

  /* =========================================================
     GET TEMPLATES
  ========================================================= */

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const res = await axios.get(`${API}/dynamic-tables/templates`, {
          withCredentials: true,
        });

        setTemplates(res.data.data || []);
      } catch (err) {
        console.error("Get Templates Error:", err);

        setAlertData({
          type: "error",
          message: "Failed to load templates.",
        });
      }
    };

    getTemplates();
  }, []);

  /* =========================================================
     GET TEMPLATE FIELDS
  ========================================================= */

  useEffect(() => {
    if (!selectedTemplate) {
      setFields([]);
      setSelectedFields([]);
      setDisplayName("");
      return;
    }

    const loadFields = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API}/dynamic-tables/templates/${selectedTemplate}`,
          {
            withCredentials: true,
          },
        );

        const templateFields: Field[] = Array.isArray(res.data.data)
          ? res.data.data
          : [];

        setFields(templateFields);

        // New dynamic table starts with no fields selected.
        setSelectedFields([]);

        setDisplayName("");
      } catch (err: any) {
        console.error("Get Template Fields Error:", err);

        setFields([]);
        setSelectedFields([]);

        setAlertData({
          type: "error",
          message:
            err?.response?.data?.message || "Failed to load template fields.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadFields();
  }, [selectedTemplate]);

  /* =========================================================
     TOGGLE FIELD
  ========================================================= */

  const toggleField = (field: Field) => {
    setSelectedFields((prev) => {
      const exists = prev.some(
        (selected) => selected.field_key === field.field_key,
      );

      if (exists) {
        return prev.filter(
          (selected) => selected.field_key !== field.field_key,
        );
      }

      return [
        ...prev,
        {
          field_key: field.field_key,
          is_required: Boolean(field.is_required),
        },
      ];
    });
  };

  /* =========================================================
     TOGGLE REQUIRED
  ========================================================= */

  const toggleRequired = (fieldKey: string) => {
    setSelectedFields((prev) =>
      prev.map((field) =>
        field.field_key === fieldKey
          ? {
              ...field,
              is_required: !field.is_required,
            }
          : field,
      ),
    );
  };

  /* =========================================================
     CHECK FIELD SELECTED
  ========================================================= */

  const isFieldSelected = (fieldKey: string) => {
    return selectedFields.some((field) => field.field_key === fieldKey);
  };

  /* =========================================================
     GET SELECTED FIELD
  ========================================================= */

  const getSelectedField = (fieldKey: string) => {
    return selectedFields.find((field) => field.field_key === fieldKey);
  };

  /* =========================================================
     REMOVE SELECTED FIELD
  ========================================================= */

  const removeSelectedField = (fieldKey: string) => {
    setSelectedFields((prev) =>
      prev.filter((field) => field.field_key !== fieldKey),
    );
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* ---------------- VALIDATION ---------------- */

    if (!selectedTemplate) {
      setAlertData({
        type: "error",
        message: "Please select a template.",
      });
      return;
    }

    if (!displayName.trim()) {
      setAlertData({
        type: "error",
        message: "Display name is required.",
      });
      return;
    }

    if (selectedFields.length === 0) {
      setAlertData({
        type: "error",
        message: "Please select at least one field.",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        organisationId: user?.organisation_id,
        templateId: selectedTemplate,
        displayName: displayName.trim(),
        tableName: displayName.trim().toLowerCase().replace(/\s+/g, "_"),
        createdBy: user?.id,
        fields: selectedFields,
      };

      console.log("CREATE DYNAMIC TABLE PAYLOAD:", payload);

      const res = await axios.post(`${API}/dynamic-tables`, payload, {
        withCredentials: true,
      });

      setAlertData({
        type: "success",
        message: res.data.message || "Dynamic table created successfully.",
      });

      setSelectedTemplate(null);
      setSelectedFields([]);
      setDisplayName("");
      setFields([]);
    } catch (err: any) {
      console.error("Create Dynamic Table Error:", err);

      setAlertData({
        type: "error",
        message:
          err?.response?.data?.message || "Error creating dynamic table.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
              <FilePlus2 size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create Dynamic Form
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Create a custom form by selecting a template and configuring its
                fields.
              </p>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <Settings2 size={19} className="text-blue-600" />

                <h2 className="text-base font-semibold text-gray-900">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Template */}
                <div>
                  <label
                    htmlFor="template"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Select Template
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">
                    <select
                      id="template"
                      className={`${inputClass} appearance-none pr-10`}
                      value={selectedTemplate ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;

                        setSelectedTemplate(value ? Number(value) : null);
                      }}
                      disabled={loading}
                    >
                      <option value="">Select template</option>

                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.template_name}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Display Name */}
                <div>
                  <label
                    htmlFor="display-name"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Display Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    id="display-name"
                    type="text"
                    className={inputClass}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Maids / Visitors"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                FIELD SELECTION
            ================================================= */}

            {selectedTemplate && (
              <div className="mb-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ListChecks size={19} className="text-blue-600" />

                    <div>
                      <h2 className="text-base font-semibold text-gray-900">
                        Select Fields
                      </h2>

                      <p className="text-xs text-gray-500 mt-0.5">
                        Choose the fields you want to include in this form.
                      </p>
                    </div>
                  </div>

                  {fields.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      <Check size={14} />
                      {selectedFields.length} selected
                    </span>
                  )}
                </div>

                {loading && fields.length === 0 ? (
                  <div className="flex items-center justify-center py-12 border border-gray-200 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Loader2
                        size={18}
                        className="animate-spin text-blue-600"
                      />
                      Loading template fields...
                    </div>
                  </div>
                ) : fields.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 border border-gray-200 rounded-xl bg-gray-50 text-center">
                    <ListChecks size={30} className="text-gray-400 mb-3" />

                    <p className="text-sm font-medium text-gray-700">
                      No fields available
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      This template does not have any configurable fields.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {fields.map((field) => {
                      const selected = isFieldSelected(field.field_key);
                      const selectedField = getSelectedField(field.field_key);

                      return (
                        <div
                          key={field.field_key}
                          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border transition-all ${
                            selected
                              ? "border-blue-500 bg-blue-50/60"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          {/* Field */}
                          <label className="flex items-center gap-3 cursor-pointer min-w-0">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleField(field)}
                              className="h-4 w-4 accent-blue-600 shrink-0 cursor-pointer"
                            />

                            <div className="min-w-0">
                              <div
                                className={`font-medium truncate ${
                                  selected ? "text-blue-700" : "text-gray-800"
                                }`}
                              >
                                {field.field_label}
                              </div>

                              <div className="text-xs text-gray-500 mt-0.5">
                                {field.field_key}
                              </div>
                            </div>
                          </label>

                          {/* Required */}
                          {selected && (
                            <div className="flex items-center gap-3 sm:shrink-0 pl-7 sm:pl-0">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  id={`required-${field.field_key}`}
                                  type="checkbox"
                                  checked={selectedField?.is_required ?? false}
                                  onChange={() =>
                                    toggleRequired(field.field_key)
                                  }
                                  className="h-4 w-4 accent-blue-600 cursor-pointer"
                                />

                                <span className="text-sm font-medium text-gray-700">
                                  Required
                                </span>
                              </label>

                              <button
                                type="button"
                                onClick={() =>
                                  removeSelectedField(field.field_key)
                                }
                                title="Remove field"
                                aria-label={`Remove ${field.field_label}`}
                                className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                SELECTED FIELD SUMMARY
            ================================================= */}

            {selectedFields.length > 0 && (
              <div className="mb-8 rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <ListChecks size={18} className="text-blue-600" />

                    <h3 className="text-sm font-semibold text-gray-900">
                      Selected Fields
                    </h3>
                  </div>

                  <span className="text-xs text-gray-500">
                    {selectedFields.length} field
                    {selectedFields.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {selectedFields.map((selectedField) => {
                    const fieldInfo = fields.find(
                      (field) => field.field_key === selectedField.field_key,
                    );

                    return (
                      <div
                        key={selectedField.field_key}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                            <Check size={15} />
                          </div>

                          <span className="text-sm font-medium text-gray-700 truncate">
                            {fieldInfo?.field_label || selectedField.field_key}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                            selectedField.is_required
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {selectedField.is_required ? "Required" : "Optional"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =================================================
                FORM ACTIONS
            ================================================= */}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setSelectedTemplate(null);
                  setSelectedFields([]);
                  setDisplayName("");
                  setFields([]);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={17} />
                <span>Reset</span>
              </button>

              <button
                type="submit"
                disabled={
                  loading ||
                  !selectedTemplate ||
                  !displayName.trim() ||
                  selectedFields.length === 0
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Create Table</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =====================================================
          ALERT
      ===================================================== */}

      {alertData && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData(null)}
        />
      )}
    </>
  );
}