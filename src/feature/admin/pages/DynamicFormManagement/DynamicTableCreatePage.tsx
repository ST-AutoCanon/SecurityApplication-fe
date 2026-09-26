// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../../../context/AuthContext";
// import Alert from "../../../../components/Aleartmessage"; // adjust the path
// const API = `${import.meta.env.VITE_BACKEND_URL}`;

// type Template = {
//   id: number;
//   template_name: string;
// };

// type Field = {
//   field_key: string;
//   field_label: string;
// };

// export default function DynamicTableCreatePage() {
//   const { user } = useContext(AuthContext);

//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [fields, setFields] = useState<Field[]>([]);
//   const [tableExists, setTableExists] = useState(false);
  
//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
//   const [selectedFields, setSelectedFields] = useState<string[]>([]);
//   const [displayName, setDisplayName] = useState("");
//   const [loading, setLoading] = useState(false);
// const [alertData, setAlertData] = useState<{
//   type: "success" | "error";
//   message: string;
// } | null>(null);
//   /* ---------------- GET TEMPLATES ---------------- */
//   useEffect(() => {
//     axios
//       .get(`${API}/dynamic-tables/templates`)
//       .then((res) => setTemplates(res.data.data))
//       .catch((err) => console.error(err));
//   }, []);

//   /* ---------------- GET FIELDS ---------------- */
//   // useEffect(() => {
//   //   if (!selectedTemplate) return;

//   //   axios
//   //     .get(`${API}/dynamic-tables/templates/${selectedTemplate}`)
//   //     .then((res) => setFields(res.data.data))
//   //     .catch((err) => console.error(err));
//   // }, [selectedTemplate]);

//   /* ---------------- GET FIELDS + EXISTING CONFIG ---------------- */
//   useEffect(() => {
//     if (!selectedTemplate) return;

//     const loadData = async () => {
//       try {
//         // Load template fields
//         const fieldsRes = await axios.get(
//           `${API}/dynamic-tables/templates/${selectedTemplate}`,
//         );

//         setFields(fieldsRes.data.data);

//         // Load existing configuration
//         const configRes = await axios.get(
//           `${API}/dynamic-tables/configuration`,
//           {
//             params: {
//               organisationId: user?.organisation_id,
//               templateId: selectedTemplate,
//             },
//           },
//         );

//     if (configRes.data.exists) {
//       setTableExists(true);
//       setDisplayName(configRes.data.displayName);
//       setSelectedFields(configRes.data.selectedFields);
//     } else {
//       setTableExists(false);
//       setDisplayName("");
//       setSelectedFields([]);
//     }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     loadData();
//   }, [selectedTemplate, user?.organisation_id]);

  
//   /* ---------------- TOGGLE FIELD ---------------- */
//   const toggleField = (key: string) => {
//     setSelectedFields((prev) =>
//       prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
//     );
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

// if (!selectedTemplate) {
//   return setAlertData({
//     type: "error",
//     message: "Please select a template.",
//   });
// }

// if (!displayName.trim()) {
//   return setAlertData({
//     type: "error",
//     message: "Display name is required.",
//   });
// }

// if (selectedFields.length === 0) {
//   return setAlertData({
//     type: "error",
//     message: "Please select at least one field.",
//   });
// }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${API}/dynamic-tables`,
//         {
//           organisationId: user?.organisation_id,
//           templateId: selectedTemplate,
//           displayName,
//           tableName: displayName.toLowerCase().replace(/\s+/g, "_"),
//           createdBy: user?.id,
//           fields: selectedFields,
//         },
//         { withCredentials: true },
//       );

//     setAlertData({
//       type: "success",
//       message: res.data.message,
//     });

//       // reset
//       setSelectedTemplate(null);
//       setSelectedFields([]);
//       setDisplayName("");
//       setFields([]);
//     } catch (err: any) {
//       setAlertData({
//         type: "error",
//         message: err?.response?.data?.message || "Error creating Form",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-white shadow rounded-xl p-8">
//           <h1 className="text-3xl font-bold mb-6">Create Dynamic Form</h1>

//           {/* ---------------- TEMPLATE SELECT ---------------- */}
//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Select Template</label>

//             <select
//               className="w-full border rounded-lg p-3"
//               value={selectedTemplate || ""}
//               onChange={(e) => setSelectedTemplate(Number(e.target.value))}
//             >
//               <option value="">Select</option>
//               {templates.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.template_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ---------------- DISPLAY NAME ---------------- */}
//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Display Name</label>

//             <input
//               className="w-full border rounded-lg p-3"
//               value={displayName}
//               onChange={(e) => setDisplayName(e.target.value)}
//               placeholder="e.g. Maids / Visitors"
//             />
//           </div>

//           {/* ---------------- FIELD SELECT ---------------- */}
//           {fields.length > 0 && (
//             <div className="mb-6">
//               <label className="block mb-3 font-medium">Select Fields</label>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {fields.map((f) => (
//                   <label
//                     key={f.field_key}
//                     className="flex items-center gap-2 border p-3 rounded-lg"
//                   >
//                     {/* <input
//                     type="checkbox"
//                     onChange={() => toggleField(f.field_key)}
//                   /> */}
//                     <input
//                       type="checkbox"
//                       checked={selectedFields.includes(f.field_key)}
//                       onChange={() => toggleField(f.field_key)}
//                     />
//                     {f.field_label}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ---------------- SUBMIT ---------------- */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading || tableExists}
//             className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
//           >
//             {tableExists
//               ? "Table Already Exists"
//               : loading
//                 ? "Creating..."
//                 : "Create Table"}
//           </button>
//         </div>
//       </div>
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

  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(
    null,
  );

  const [selectedFields, setSelectedFields] = useState<SelectedField[]>([]);

  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const [alertData, setAlertData] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* =========================================================
     GET TEMPLATES
  ========================================================= */

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const res = await axios.get(`${API}/dynamic-tables/templates`);

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
     
     IMPORTANT:
     Create page does NOT load existing configuration.
     It starts with no selected fields.
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
            err?.response?.data?.message ||
            "Failed to load template fields.",
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

      // Remove field
      if (exists) {
        return prev.filter(
          (selected) => selected.field_key !== field.field_key,
        );
      }

      // Add field.
      // Template is_required determines the initial checkbox state.
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
    return selectedFields.some(
      (field) => field.field_key === fieldKey,
    );
  };

  /* =========================================================
     GET SELECTED FIELD
  ========================================================= */

  const getSelectedField = (fieldKey: string) => {
    return selectedFields.find(
      (field) => field.field_key === fieldKey,
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

      /* ---------------- CREATE DYNAMIC TABLE ---------------- */

      const payload = {
        organisationId: user?.organisation_id,
        templateId: selectedTemplate,
        displayName: displayName.trim(),
        tableName: displayName
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "_"),
        createdBy: user?.id,

        /*
          Example:

          fields: [
            {
              field_key: "full_name",
              is_required: true
            },
            {
              field_key: "email",
              is_required: false
            },
            {
              field_key: "address",
              is_required: true
            }
          ]
        */
        fields: selectedFields,
      };

      console.log("CREATE DYNAMIC TABLE PAYLOAD:", payload);

      const res = await axios.post(
        `${API}/dynamic-tables`,
        payload,
        {
          withCredentials: true,
        },
      );

      /* ---------------- SUCCESS ---------------- */

      setAlertData({
        type: "success",
        message: res.data.message || "Dynamic table created successfully.",
      });

      /* ---------------- RESET FORM ---------------- */

      setSelectedTemplate(null);
      setSelectedFields([]);
      setDisplayName("");
      setFields([]);
    } catch (err: any) {
      console.error("Create Dynamic Table Error:", err);

      setAlertData({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Error creating dynamic table.",
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
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow rounded-xl p-8">

          {/* =================================================
              TITLE
          ================================================= */}

          <h1 className="text-3xl font-bold mb-6">
            Create Dynamic Form
          </h1>

          {/* =================================================
              TEMPLATE SELECT
          ================================================= */}

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Select Template
            </label>

            <select
              className="w-full border rounded-lg p-3"
              value={selectedTemplate ?? ""}
              onChange={(e) => {
                const value = e.target.value;

                setSelectedTemplate(
                  value ? Number(value) : null,
                );
              }}
              disabled={loading}
            >
              <option value="">
                Select
              </option>

              {templates.map((template) => (
                <option
                  key={template.id}
                  value={template.id}
                >
                  {template.template_name}
                </option>
              ))}
            </select>
          </div>

          {/* =================================================
              DISPLAY NAME
          ================================================= */}

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Display Name
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3"
              value={displayName}
              onChange={(e) =>
                setDisplayName(e.target.value)
              }
              placeholder="e.g. Maids / Visitors"
              disabled={loading}
            />
          </div>

          {/* =================================================
              FIELD SELECT
          ================================================= */}

          {fields.length > 0 && (
            <div className="mb-6">

              <label className="block mb-3 font-medium">
                Select Fields
              </label>

              <div className="space-y-3">

                {fields.map((field) => {
                  const selected = isFieldSelected(
                    field.field_key,
                  );

                  const selectedField =
                    getSelectedField(field.field_key);

                  return (
                    <div
                      key={field.field_key}
                      className="flex items-center justify-between gap-4 border p-4 rounded-lg"
                    >

                      {/* =====================================
                          FIELD CHECKBOX
                      ===================================== */}

                      <label className="flex items-center gap-3 cursor-pointer min-w-0">

                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() =>
                            toggleField(field)
                          }
                          className="h-4 w-4 shrink-0"
                        />

                        <span className="font-medium">
                          {field.field_label}
                        </span>

                      </label>

                      {/* =====================================
                          REQUIRED CHECKBOX

                          IMPORTANT:
                          This appears for EVERY selected field.

                          is_required only controls whether
                          the checkbox is checked.
                      ===================================== */}

                      {selected && (
                        <div className="flex items-center gap-2 shrink-0">

                          <input
                            id={`required-${field.field_key}`}
                            type="checkbox"
                            checked={
                              selectedField?.is_required ??
                              false
                            }
                            onChange={() =>
                              toggleRequired(
                                field.field_key,
                              )
                            }
                            className="h-4 w-4"
                          />

                          <label
                            htmlFor={`required-${field.field_key}`}
                            className="cursor-pointer text-sm whitespace-nowrap"
                          >
                            Required
                          </label>

                        </div>
                      )}
                    </div>
                  );
                })}

              </div>
            </div>
          )}

          {/* =================================================
              SELECTED FIELD SUMMARY
          ================================================= */}

          {selectedFields.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border">

              <h3 className="font-semibold mb-3">
                Selected Fields
              </h3>

              <div className="space-y-2">

                {selectedFields.map((selectedField) => {
                  const fieldInfo = fields.find(
                    (field) =>
                      field.field_key ===
                      selectedField.field_key,
                  );

                  return (
                    <div
                      key={selectedField.field_key}
                      className="flex justify-between items-center text-sm"
                    >

                      <span>
                        {fieldInfo?.field_label ||
                          selectedField.field_key}
                      </span>

                      <span
                        className={
                          selectedField.is_required
                            ? "text-red-600 font-medium"
                            : "text-gray-500"
                        }
                      >
                        {selectedField.is_required
                          ? "Required"
                          : "Optional"}
                      </span>

                    </div>
                  );
                })}

              </div>
            </div>
          )}

          {/* =================================================
              SUBMIT
          ================================================= */}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              loading ||
              !selectedTemplate ||
              !displayName.trim() ||
              selectedFields.length === 0
            }
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Table"}
          </button>

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
