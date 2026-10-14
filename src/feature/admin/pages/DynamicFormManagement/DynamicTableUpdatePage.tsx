// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Check,
//   ChevronDown,
//   FilePenLine,
//   ListChecks,
//   Loader2,
//   Save,
//   Settings2,
//   X,
// } from "lucide-react";
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
//   is_visible?: boolean;
// };

// type SelectedField = {
//   field_key: string;
//   is_required: boolean;
//   is_visible: boolean;
// };

// export default function DynamicTableUpdatePage() {
//   const { user } = useContext(AuthContext);

//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [fields, setFields] = useState<Field[]>([]);

//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

//   const [displayName, setDisplayName] = useState("");

//   const [selectedFields, setSelectedFields] = useState<SelectedField[]>([]);

//   const [loading, setLoading] = useState(false);

//   const [tableExists, setTableExists] = useState(false);

//   const [alertData, setAlertData] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   /* =========================================================
//      SHARED STYLES
//   ========================================================= */

//   const inputClass =
//     "w-full h-11 rounded-lg border border-gray-300 px-3 " +
//     "placeholder-gray-400 focus:outline-none focus:border-blue-500 " +
//     "focus:ring-0 transition-colors disabled:bg-gray-50 " +
//     "disabled:cursor-not-allowed";

//   /* =========================================================
//      LOAD TEMPLATES
//   ========================================================= */

//   useEffect(() => {
//     const loadTemplates = async () => {
//       try {
//         const res = await axios.get(`${API}/dynamic-tables/templates`, {
//           withCredentials: true,
//         });

//         setTemplates(res.data.data || []);
//       } catch (err: any) {
//         console.error("Load Templates Error:", err);

//         setAlertData({
//           type: "error",
//           message: err?.response?.data?.message || "Failed to load templates.",
//         });
//       }
//     };

//     loadTemplates();
//   }, []);

//   /* =========================================================
//      LOAD TEMPLATE + EXISTING CONFIGURATION
//   ========================================================= */

//   useEffect(() => {
//     if (!selectedTemplate || !user?.organisation_id) {
//       setFields([]);
//       setSelectedFields([]);
//       setDisplayName("");
//       setTableExists(false);
//       return;
//     }

//     const load = async () => {
//       try {
//         setLoading(true);

//         /* ---------------- GET TEMPLATE FIELDS ---------------- */

//         const fieldsRes = await axios.get(
//           `${API}/dynamic-tables/templates/${selectedTemplate}`,
//           {
//             withCredentials: true,
//           },
//         );

//         setFields(
//           Array.isArray(fieldsRes.data.data) ? fieldsRes.data.data : [],
//         );

//         /* ---------------- GET EXISTING CONFIGURATION ---------------- */

//         const configRes = await axios.get(
//           `${API}/dynamic-tables/configuration`,
//           {
//             params: {
//               organisationId: user.organisation_id,
//               templateId: selectedTemplate,
//             },
//             withCredentials: true,
//           },
//         );

//         /* ---------------- NO EXISTING TABLE ---------------- */

//         if (!configRes.data.exists) {
//           setTableExists(false);
//           setDisplayName("");
//           setSelectedFields([]);

//           setAlertData({
//             type: "error",
//             message: "No Dynamic Form found.",
//           });

//           return;
//         }

//         /* ---------------- EXISTING TABLE ---------------- */

//         setTableExists(true);

//         setDisplayName(configRes.data.displayName || "");

//         setSelectedFields(
//           Array.isArray(configRes.data.selectedFields)
//             ? configRes.data.selectedFields.map((field: SelectedField) => ({
//                 field_key: field.field_key,
//                 is_required: Boolean(field.is_required),
//               }))
//             : [],
//         );
//       } catch (err: any) {
//         console.error("Load Configuration Error:", err);

//         setTableExists(false);
//         setFields([]);
//         setSelectedFields([]);

//         setAlertData({
//           type: "error",
//           message:
//             err?.response?.data?.message ||
//             "Failed to load table configuration.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [selectedTemplate, user?.organisation_id]);

//   /* =========================================================
//      TOGGLE FIELD
//   ========================================================= */

//   const toggleField = (field: Field) => {
//     setSelectedFields((prev) => {
//       const exists = prev.some(
//         (selected) => selected.field_key === field.field_key,
//       );

//       /* REMOVE FIELD */

//       if (exists) {
//         return prev.filter(
//           (selected) => selected.field_key !== field.field_key,
//         );
//       }

//       /* ADD FIELD */

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
//     return selectedFields.some((field) => field.field_key === fieldKey);
//   };

//   /* =========================================================
//      GET SELECTED FIELD
//   ========================================================= */

//   const getSelectedField = (fieldKey: string) => {
//     return selectedFields.find((field) => field.field_key === fieldKey);
//   };

//   /* =========================================================
//      REMOVE SELECTED FIELD
//   ========================================================= */

//   const removeSelectedField = (fieldKey: string) => {
//     setSelectedFields((prev) =>
//       prev.filter((field) => field.field_key !== fieldKey),
//     );
//   };

//   /* =========================================================
//      UPDATE
//   ========================================================= */

//   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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
//         message: "Display Name is required.",
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

//       const response = await axios.put(
//         `${API}/dynamic-tables`,
//         {
//           organisationId: user?.organisation_id,
//           templateId: selectedTemplate,
//           displayName: displayName.trim(),

//           tableName: displayName.trim().toLowerCase().replace(/\s+/g, "_"),

//           fields: selectedFields,

//           updatedBy: user?.id,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       setAlertData({
//         type: "success",
//         message: response.data.message || "Dynamic form updated successfully.",
//       });
//     } catch (err: any) {
//       console.error("Update Dynamic Table Error:", err);

//       setAlertData({
//         type: "error",
//         message: err?.response?.data?.message || "Update Failed",
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
//       <div className="max-w-5xl mx-auto p-4 md:p-6">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           {/* =================================================
//               HEADER
//           ================================================= */}

//           <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
//             <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
//               <FilePenLine size={24} />
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Update Dynamic Form
//               </h1>

//               <p className="text-sm text-gray-500 mt-1">
//                 Select a template and update its display name and fields.
//               </p>
//             </div>
//           </div>

//           {/* =================================================
//               FORM
//           ================================================= */}

//           <form onSubmit={handleUpdate} className="p-6 md:p-8">
//             {/* =================================================
//                 BASIC INFORMATION
//             ================================================= */}

//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-5">
//                 <Settings2 size={19} className="text-blue-600" />

//                 <h2 className="text-base font-semibold text-gray-900">
//                   Basic Information
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* Template */}
//                 <div>
//                   <label
//                     htmlFor="template"
//                     className="block mb-2 text-sm font-medium text-gray-700"
//                   >
//                     Select Template
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>

//                   <div className="relative">
//                     <select
//                       id="template"
//                       className={`${inputClass} appearance-none pr-10`}
//                       value={selectedTemplate ?? ""}
//                       onChange={(e) => {
//                         const value = e.target.value;

//                         setSelectedTemplate(value ? Number(value) : null);
//                       }}
//                       disabled={loading}
//                     >
//                       <option value="">Select template</option>

//                       {templates.map((template) => (
//                         <option key={template.id} value={template.id}>
//                           {template.template_name}
//                         </option>
//                       ))}
//                     </select>

//                     <ChevronDown
//                       size={18}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                     />
//                   </div>
//                 </div>

//                 {/* Display Name */}
//                 <div>
//                   <label
//                     htmlFor="display-name"
//                     className="block mb-2 text-sm font-medium text-gray-700"
//                   >
//                     Display Name
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>

//                   <input
//                     id="display-name"
//                     type="text"
//                     className={inputClass}
//                     value={displayName}
//                     onChange={(e) => setDisplayName(e.target.value)}
//                     disabled={loading || !tableExists}
//                     placeholder="Enter display name"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* =================================================
//                 TABLE STATUS
//             ================================================= */}

//             {selectedTemplate && (
//               <div className="mb-8">
//                 <div
//                   className={`flex items-center gap-3 p-4 rounded-xl border ${
//                     tableExists
//                       ? "border-green-200 bg-green-50"
//                       : "border-yellow-200 bg-yellow-50"
//                   }`}
//                 >
//                   <div
//                     className={`flex items-center justify-center w-9 h-9 rounded-lg ${
//                       tableExists
//                         ? "bg-green-100 text-green-600"
//                         : "bg-yellow-100 text-yellow-600"
//                     }`}
//                   >
//                     {tableExists ? <Check size={19} /> : <X size={19} />}
//                   </div>

//                   <div>
//                     <p
//                       className={`text-sm font-semibold ${
//                         tableExists ? "text-green-800" : "text-yellow-800"
//                       }`}
//                     >
//                       {tableExists
//                         ? "Dynamic form found"
//                         : "No dynamic form found"}
//                     </p>

//                     <p
//                       className={`text-xs mt-0.5 ${
//                         tableExists ? "text-green-700" : "text-yellow-700"
//                       }`}
//                     >
//                       {tableExists
//                         ? "You can update the form configuration below."
//                         : "Select another template with an existing dynamic form."}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* =================================================
//                 FIELD SELECTION
//             ================================================= */}

//             {tableExists && (
//               <div className="mb-8">
//                 <div className="flex items-center justify-between gap-4 mb-4">
//                   <div className="flex items-center gap-2">
//                     <ListChecks size={19} className="text-blue-600" />

//                     <div>
//                       <h2 className="text-base font-semibold text-gray-900">
//                         Form Fields
//                       </h2>

//                       <p className="text-xs text-gray-500 mt-0.5">
//                         Select the fields and configure which ones are required.
//                       </p>
//                     </div>
//                   </div>

//                   {fields.length > 0 && (
//                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
//                       <Check size={14} />
//                       {selectedFields.length} selected
//                     </span>
//                   )}
//                 </div>

//                 {loading && fields.length === 0 ? (
//                   <div className="flex items-center justify-center py-12 border border-gray-200 rounded-xl bg-gray-50">
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Loader2
//                         size={18}
//                         className="animate-spin text-blue-600"
//                       />
//                       Loading template fields...
//                     </div>
//                   </div>
//                 ) : fields.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center py-12 border border-gray-200 rounded-xl bg-gray-50 text-center">
//                     <ListChecks size={30} className="text-gray-400 mb-3" />

//                     <p className="text-sm font-medium text-gray-700">
//                       No fields available
//                     </p>

//                     <p className="text-xs text-gray-500 mt-1">
//                       This template does not have any configurable fields.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     {fields.map((field) => {
//                       const selected = isFieldSelected(field.field_key);

//                       const selectedField = getSelectedField(field.field_key);

//                       return (
//                         <div
//                           key={field.field_key}
//                           className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border transition-all ${
//                             selected
//                               ? "border-blue-500 bg-blue-50/60"
//                               : "border-gray-200 bg-white hover:border-gray-300"
//                           }`}
//                         >
//                           {/* Field */}
//                           <label className="flex items-center gap-3 cursor-pointer min-w-0">
//                             <input
//                               type="checkbox"
//                               checked={selected}
//                               onChange={() => toggleField(field)}
//                               className="h-4 w-4 accent-blue-600 shrink-0 cursor-pointer"
//                             />

//                             <div className="min-w-0">
//                               <div
//                                 className={`font-medium truncate ${
//                                   selected ? "text-blue-700" : "text-gray-800"
//                                 }`}
//                               >
//                                 {field.field_label}
//                               </div>

//                               <div className="text-xs text-gray-500 mt-0.5">
//                                 {field.field_key}
//                               </div>
//                             </div>
//                           </label>

//                           {/* Required + Remove */}
//                           {selected && selectedField && (
//                             <div className="flex items-center gap-3 sm:shrink-0 pl-7 sm:pl-0">
//                               <label className="flex items-center gap-2 cursor-pointer">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedField.is_required}
//                                   onChange={() =>
//                                     toggleRequired(field.field_key)
//                                   }
//                                   className="h-4 w-4 accent-blue-600 cursor-pointer"
//                                 />

//                                 <span
//                                   className={`text-sm font-medium ${
//                                     selectedField.is_required
//                                       ? "text-blue-700"
//                                       : "text-gray-700"
//                                   }`}
//                                 >
//                                   Required
//                                 </span>
//                               </label>

//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   removeSelectedField(field.field_key)
//                                 }
//                                 title="Remove field"
//                                 aria-label={`Remove ${field.field_label}`}
//                                 className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
//                               >
//                                 <X size={16} />
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* =================================================
//                 SELECTED FIELD SUMMARY
//             ================================================= */}

//             {tableExists && selectedFields.length > 0 && (
//               <div className="mb-8 rounded-xl border border-gray-200 overflow-hidden">
//                 <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
//                   <div className="flex items-center gap-2">
//                     <ListChecks size={18} className="text-blue-600" />

//                     <h3 className="text-sm font-semibold text-gray-900">
//                       Selected Fields
//                     </h3>
//                   </div>

//                   <span className="text-xs text-gray-500">
//                     {selectedFields.length} field
//                     {selectedFields.length !== 1 ? "s" : ""}
//                   </span>
//                 </div>

//                 <div className="divide-y divide-gray-100">
//                   {selectedFields.map((field) => {
//                     const fieldInfo = fields.find(
//                       (f) => f.field_key === field.field_key,
//                     );

//                     return (
//                       <div
//                         key={field.field_key}
//                         className="flex items-center justify-between gap-4 px-4 py-3"
//                       >
//                         <div className="flex items-center gap-3 min-w-0">
//                           <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 shrink-0">
//                             <Check size={15} />
//                           </div>

//                           <span className="text-sm font-medium text-gray-700 truncate">
//                             {fieldInfo?.field_label || field.field_key}
//                           </span>
//                         </div>

//                         <span
//                           className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
//                             field.is_required
//                               ? "bg-red-50 text-red-600"
//                               : "bg-gray-100 text-gray-600"
//                           }`}
//                         >
//                           {field.is_required ? "Required" : "Optional"}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* =================================================
//                 ACTIONS
//             ================================================= */}

//             <div className="flex items-center justify-end gap-3 pt-2">
//               <button
//                 type="button"
//                 disabled={loading}
//                 onClick={() => {
//                   setSelectedTemplate(null);
//                   setDisplayName("");
//                   setSelectedFields([]);
//                   setFields([]);
//                   setTableExists(false);
//                 }}
//                 className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <X size={17} />
//                 <span>Reset</span>
//               </button>

//               <button
//                 type="submit"
//                 disabled={
//                   !tableExists ||
//                   loading ||
//                   !selectedTemplate ||
//                   !displayName.trim() ||
//                   selectedFields.length === 0
//                 }
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={18} className="animate-spin" />
//                     <span>Updating...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save size={18} />
//                     <span>Update Form</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
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


import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Check,
  ChevronDown,
  FilePenLine,
  ListChecks,
  Loader2,
  Save,
  Settings2,
  X,
  LockKeyhole,
} from "lucide-react";
import { AuthContext } from "../../../../context/AuthContext";
import Alert from "../../../../components/Aleartmessage";

const API = `${import.meta.env.VITE_BACKEND_URL}`;

// Replace these with the exact five field_key values from your database.
// Use the same keys as your DynamicTableCreatePage.
const FIXED_FIELD_KEYS = [
  "profile_photo",
  "face_descriptor",
  "status",
  "created_at",
  "updated_at",
] as const;


type Template = {
  id: number;
  template_name: string;
};

type Field = {
  field_key: string;
  field_label: string;
  is_required?: boolean;
  is_visible?: boolean;
};

type SelectedField = {
  field_key: string;
  is_required: boolean;
  is_visible: boolean;
};

const isFixedField = (fieldKey: string) =>
  (FIXED_FIELD_KEYS as readonly string[]).includes(fieldKey);

export default function DynamicTableUpdatePage() {
  const { user } = useContext(AuthContext);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(
    null,
  );
  const [displayName, setDisplayName] = useState("");
  const [selectedFields, setSelectedFields] = useState<SelectedField[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableExists, setTableExists] = useState(false);

  const [alertData, setAlertData] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 " +
    "placeholder-gray-400 focus:outline-none focus:border-blue-500 " +
    "focus:ring-0 transition-colors disabled:bg-gray-50 " +
    "disabled:cursor-not-allowed";

  /* =========================================================
     LOAD TEMPLATES
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadTemplates = async () => {
      try {
        const res = await axios.get(`${API}/dynamic-tables/templates`, {
          withCredentials: true,
        });

        if (!cancelled) {
          setTemplates(res.data.data || []);
        }
      } catch (err: any) {
        if (cancelled) return;

        console.error("Load Templates Error:", err);

        setAlertData({
          type: "error",
          message: err?.response?.data?.message || "Failed to load templates.",
        });
      }
    };

    loadTemplates();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     LOAD TEMPLATE FIELDS + EXISTING CONFIGURATION
  ========================================================= */

  useEffect(() => {
    if (!selectedTemplate || !user?.organisation_id) {
      setFields([]);
      setSelectedFields([]);
      setDisplayName("");
      setTableExists(false);
      return;
    }

    let cancelled = false;

    const loadConfiguration = async () => {
      setLoading(true);

      // Clear the previous template's data while loading.
      setFields([]);
      setSelectedFields([]);
      setDisplayName("");
      setTableExists(false);

      try {
        /* ---------------- GET TEMPLATE FIELDS ---------------- */

        const fieldsRes = await axios.get(
          `${API}/dynamic-tables/templates/${selectedTemplate}`,
          {
            withCredentials: true,
          },
        );

        if (cancelled) return;

        const templateFields: Field[] = Array.isArray(fieldsRes.data.data)
          ? fieldsRes.data.data
          : [];

        setFields(templateFields);

        /* ---------------- GET EXISTING CONFIGURATION ---------------- */

        const configRes = await axios.get(
          `${API}/dynamic-tables/configuration`,
          {
            params: {
              organisationId: user.organisation_id,
              templateId: selectedTemplate,
            },
            withCredentials: true,
          },
        );

        if (cancelled) return;

        /* ---------------- NO EXISTING TABLE ---------------- */

        if (!configRes.data.exists) {
          setTableExists(false);
          setDisplayName("");
          setSelectedFields([]);

          setAlertData({
            type: "error",
            message: "No Dynamic Form found.",
          });

          return;
        }

        /* ---------------- EXISTING TABLE ---------------- */

        setTableExists(true);
        setDisplayName(configRes.data.displayName || "");

        const existingFields: SelectedField[] = Array.isArray(
          configRes.data.selectedFields,
        )
          ? configRes.data.selectedFields.map((field: SelectedField) => ({
              field_key: field.field_key,
              is_required: Boolean(field.is_required),
              is_visible: field.is_visible ?? true,
            }))
          : [];

        // Automatically include all predefined fields that exist
        // in the current template. They are always required.
        const fixedFields: SelectedField[] = templateFields
          .filter((field) => isFixedField(field.field_key))
          .map((field) => ({
            field_key: field.field_key,
            is_required: true,
            is_visible: true,
          }));

        // Preserve existing non-predefined fields, but only if
        // they still exist in the selected template.
        const additionalFields = existingFields.filter(
          (field) =>
            !isFixedField(field.field_key) &&
            templateFields.some(
              (templateField) =>
                templateField.field_key === field.field_key,
            ),
        );

        setSelectedFields([...fixedFields, ...additionalFields]);
      } catch (err: any) {
        if (cancelled) return;

        console.error("Load Configuration Error:", err);

        setTableExists(false);
        setFields([]);
        setSelectedFields([]);
        setDisplayName("");

        setAlertData({
          type: "error",
          message:
            err?.response?.data?.message ||
            "Failed to load table configuration.",
        });
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadConfiguration();

    return () => {
      cancelled = true;
    };
  }, [selectedTemplate, user?.organisation_id]);

  /* =========================================================
     TOGGLE FIELD
     PREDEFINED FIELDS CANNOT BE REMOVED
  ========================================================= */

  const toggleField = (field: Field) => {
    if (isFixedField(field.field_key)) return;

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
          is_visible: field.is_visible ?? true,
        },
      ];
    });
  };

  /* =========================================================
     TOGGLE REQUIRED
     PREDEFINED FIELDS ALWAYS REMAIN REQUIRED
  ========================================================= */

  const toggleRequired = (fieldKey: string) => {
    if (isFixedField(fieldKey)) return;

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

  const isFieldSelected = (fieldKey: string) =>
    selectedFields.some((field) => field.field_key === fieldKey);

  /* =========================================================
     GET SELECTED FIELD
  ========================================================= */

  const getSelectedField = (fieldKey: string) =>
    selectedFields.find((field) => field.field_key === fieldKey);

  /* =========================================================
     REMOVE SELECTED FIELD
     PREDEFINED FIELDS CANNOT BE REMOVED
  ========================================================= */

  const removeSelectedField = (fieldKey: string) => {
    if (isFixedField(fieldKey)) return;

    setSelectedFields((prev) =>
      prev.filter((field) => field.field_key !== fieldKey),
    );
  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetForm = () => {
    setSelectedTemplate(null);
    setDisplayName("");
    setSelectedFields([]);
    setFields([]);
    setTableExists(false);
  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTemplate) {
      setAlertData({
        type: "error",
        message: "Please select a template.",
      });
      return;
    }

    if (!tableExists) {
      setAlertData({
        type: "error",
        message: "No existing dynamic form was found for this template.",
      });
      return;
    }

    if (!displayName.trim()) {
      setAlertData({
        type: "error",
        message: "Display Name is required.",
      });
      return;
    }

    // Always reconstruct the fixed fields from the template so they
    // cannot be omitted or changed through client-side interactions.
    const fixedFields: SelectedField[] = fields
      .filter((field) => isFixedField(field.field_key))
      .map((field) => ({
        field_key: field.field_key,
        is_required: true,
        is_visible: true,
      }));

    // Include selected additional fields that exist in the template.
    const additionalFields = selectedFields.filter(
      (field) =>
        !isFixedField(field.field_key) &&
        fields.some(
          (templateField) => templateField.field_key === field.field_key,
        ),
    );

    const finalFields = [...fixedFields, ...additionalFields];

    if (finalFields.length === 0) {
      setAlertData({
        type: "error",
        message: "Please select at least one available field.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `${API}/dynamic-tables`,
        {
          organisationId: user?.organisation_id,
          templateId: selectedTemplate,
          displayName: displayName.trim(),
          tableName: displayName
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "_"),
          fields: finalFields,
          updatedBy: user?.id,
        },
        {
          withCredentials: true,
        },
      );

      setAlertData({
        type: "success",
        message:
          response.data.message || "Dynamic form updated successfully.",
      });
    } catch (err: any) {
      console.error("Update Dynamic Table Error:", err);

      setAlertData({
        type: "error",
        message: err?.response?.data?.message || "Update Failed",
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
          {/* HEADER */}

          <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
              <FilePenLine size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Update Dynamic Form
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Update your dynamic form while keeping predefined fields
                required and locked.
              </p>
            </div>
          </div>

          {/* FORM */}

          <form onSubmit={handleUpdate} className="p-6 md:p-8">
            {/* BASIC INFORMATION */}

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <Settings2 size={19} className="text-blue-600" />

                <h2 className="text-base font-semibold text-gray-900">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    disabled={loading || !tableExists}
                    placeholder="Enter display name"
                  />
                </div>
              </div>
            </div>

            {/* TABLE STATUS */}

            {selectedTemplate && (
              <div className="mb-8">
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    tableExists
                      ? "border-green-200 bg-green-50"
                      : "border-yellow-200 bg-yellow-50"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                      tableExists
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {tableExists ? <Check size={19} /> : <X size={19} />}
                  </div>

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        tableExists ? "text-green-800" : "text-yellow-800"
                      }`}
                    >
                      {tableExists
                        ? "Dynamic form found"
                        : "No dynamic form found"}
                    </p>

                    <p
                      className={`text-xs mt-0.5 ${
                        tableExists ? "text-green-700" : "text-yellow-700"
                      }`}
                    >
                      {tableExists
                        ? "Predefined fields are locked. Other fields can be configured."
                        : "Select another template with an existing dynamic form."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FIELD SELECTION */}

            {tableExists && (
              <div className="mb-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ListChecks size={19} className="text-blue-600" />

                    <div>
                      <h2 className="text-base font-semibold text-gray-900">
                        Form Fields
                      </h2>

                      <p className="text-xs text-gray-500 mt-0.5">
                        Available predefined fields are automatically selected
                        and locked as required.
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
                      const fixed = isFixedField(field.field_key);
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
                          <label
                            className={`flex items-center gap-3 min-w-0 ${
                              fixed ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              disabled={fixed || loading}
                              onChange={() => toggleField(field)}
                              className="h-4 w-4 accent-blue-600 shrink-0 disabled:cursor-not-allowed"
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

                          {selected && selectedField && (
                            <div className="flex items-center gap-3 sm:shrink-0 pl-7 sm:pl-0">
                              <label
                                className={`flex items-center gap-2 ${
                                  fixed
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    fixed
                                      ? true
                                      : selectedField.is_required
                                  }
                                  disabled={fixed || loading}
                                  onChange={() =>
                                    toggleRequired(field.field_key)
                                  }
                                  className="h-4 w-4 accent-blue-600 disabled:cursor-not-allowed"
                                />

                                <span className="text-sm font-medium text-gray-700">
                                  Required
                                </span>
                              </label>

                              {fixed ? (
                                <span
                                  title="Predefined field is locked"
                                  className="p-2 rounded-lg text-gray-500 bg-gray-100"
                                >
                                  <LockKeyhole size={16} />
                                </span>
                              ) : (
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
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* SELECTED FIELD SUMMARY */}

            {tableExists && selectedFields.length > 0 && (
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
                  {selectedFields.map((field) => {
                    const fieldInfo = fields.find(
                      (item) => item.field_key === field.field_key,
                    );
                    const fixed = isFixedField(field.field_key);

                    return (
                      <div
                        key={field.field_key}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                            <Check size={15} />
                          </div>

                          <span className="text-sm font-medium text-gray-700 truncate">
                            {fieldInfo?.field_label || field.field_key}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                            field.is_required
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {fixed && <LockKeyhole size={12} />}
                          {field.is_required ? "Required" : "Optional"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ACTIONS */}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={resetForm}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={17} />
                <span>Reset</span>
              </button>

              <button
                type="submit"
                disabled={
                  !tableExists ||
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
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Update Form</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ALERT */}

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
