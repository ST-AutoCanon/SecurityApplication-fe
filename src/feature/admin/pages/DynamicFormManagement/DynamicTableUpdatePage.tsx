// import React, { useContext, useEffect, useState } from "react";
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
// };

// export default function DynamicTableUpdatePage() {
//   const { user } = useContext(AuthContext);

//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [fields, setFields] = useState<Field[]>([]);

//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

//   const [displayName, setDisplayName] = useState("");

//   const [selectedFields, setSelectedFields] = useState<string[]>([]);

//   const [loading, setLoading] = useState(false);

//   const [tableExists, setTableExists] = useState(false);

//   const [alertData, setAlertData] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   /* ---------------------------------------------
//       Load Templates
//   ---------------------------------------------- */

//   useEffect(() => {
//     axios
//       .get(`${API}/dynamic-tables/templates`)
//       .then((res) => {
//         setTemplates(res.data.data);
//       })
//       .catch((err: any) => {
//         console.error(err);

//         setAlertData({
//           type: "error",
//           message: err?.response?.data?.message || "Failed to load templates.",
//         });
//       });
//   }, []);

//   /* ---------------------------------------------
//       Load Template + Existing Configuration
//   ---------------------------------------------- */

//   useEffect(() => {
//     if (!selectedTemplate) return;

//     const load = async () => {
//       try {
//         setLoading(true);

//         const fieldsRes = await axios.get(
//           `${API}/dynamic-tables/templates/${selectedTemplate}`,
//         );

//         setFields(fieldsRes.data.data);

//         const configRes = await axios.get(
//           `${API}/dynamic-tables/configuration`,
//           {
//             params: {
//               organisationId: user?.organisation_id,
//               templateId: selectedTemplate,
//             },
//           },
//         );

//         if (!configRes.data.exists) {
//           setAlertData({
//             type: "error",
//             message: "No Dynamic Form found.",
//           });

//           setTableExists(false);

//           setDisplayName("");

//           setSelectedFields([]);

//           return;
//         }

//         setTableExists(true);

//         setDisplayName(configRes.data.displayName);

//         setSelectedFields(configRes.data.selectedFields);
//       } catch (err: any) {
//         console.error(err);

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
//   }, [selectedTemplate]);

//   /* ---------------------------------------------
//       Toggle Fields
//   ---------------------------------------------- */

//   const toggleField = (key: string) => {
//     setSelectedFields((prev) =>
//       prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key],
//     );
//   };

//   /* ---------------------------------------------
//       Update
//   ---------------------------------------------- */

//   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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
//     message: "Display Name is required.",
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

//       const response = await axios.put(
//         `${API}/dynamic-tables`,
//         {
//           organisationId: user?.organisation_id,
//           templateId: selectedTemplate,
//           displayName,
//           tableName: displayName.toLowerCase().replace(/\s+/g, "_"),
//           fields: selectedFields,
//           updatedBy: user?.id,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//     setAlertData({
//       type: "success",
//       message: response.data.message,
//     });
//     } catch (err: any) {
//       console.error(err);

//       setAlertData({
//         type: "error",
//         message: err?.response?.data?.message || "Update Failed",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="max-w-5xl mx-auto p-6">
//         <div className="bg-white shadow-lg rounded-xl p-8">
//           <h1 className="text-3xl font-bold mb-8">Update Dynamic Form</h1>

//           <form onSubmit={handleUpdate}>
//             {/* Template */}

//             <div className="mb-6">
//               <label className="block font-medium mb-2">Select Template</label>

//               <select
//                 className="w-full border rounded-lg p-3"
//                 value={selectedTemplate ?? ""}
//                 onChange={(e) => setSelectedTemplate(Number(e.target.value))}
//               >
//                 <option value="">Select Template</option>

//                 {templates.map((template) => (
//                   <option key={template.id} value={template.id}>
//                     {template.template_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Display Name */}

//             <div className="mb-6">
//               <label className="block font-medium mb-2">Display Name</label>

//               <input
//                 className="w-full border rounded-lg p-3"
//                 value={displayName}
//                 onChange={(e) => setDisplayName(e.target.value)}
//               />
//             </div>

//             {/* Fields */}

//             {fields.length > 0 && (
//               <div className="mb-8">
//                 <label className="block font-medium mb-3">Fields</label>

//                 <div className="grid grid-cols-2 gap-3">
//                   {fields.map((field) => (
//                     <label
//                       key={field.field_key}
//                       className="border rounded-lg p-3 flex gap-3 items-center"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedFields.includes(field.field_key)}
//                         onChange={() => toggleField(field.field_key)}
//                       />

//                       {field.field_label}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               disabled={!tableExists || loading}
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg"
//             >
//               {loading ? "Updating..." : "Update Form"}
//             </button>
//           </form>
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

import React, { useContext, useEffect, useState } from "react";
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

export default function DynamicTableUpdatePage() {
  const { user } = useContext(AuthContext);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const [displayName, setDisplayName] = useState("");

  const [selectedFields, setSelectedFields] = useState<SelectedField[]>([]);

  const [loading, setLoading] = useState(false);

  const [tableExists, setTableExists] = useState(false);

  const [alertData, setAlertData] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* ---------------------------------------------
      Load Templates
  --------------------------------------------- */

  useEffect(() => {
    axios
      .get(`${API}/dynamic-tables/templates`)
      .then((res) => {
        setTemplates(res.data.data);
      })
      .catch((err: any) => {
        console.error(err);

        setAlertData({
          type: "error",
          message: err?.response?.data?.message || "Failed to load templates.",
        });
      });
  }, []);

  /* ---------------------------------------------
      Load Template + Existing Configuration
  --------------------------------------------- */

  useEffect(() => {
    if (!selectedTemplate || !user?.organisation_id) return;

    const load = async () => {
      try {
        setLoading(true);

        /* ---------------- GET TEMPLATE FIELDS ---------------- */

        const fieldsRes = await axios.get(
          `${API}/dynamic-tables/templates/${selectedTemplate}`,
        );

        setFields(fieldsRes.data.data);

        /* ---------------- GET EXISTING CONFIGURATION ---------------- */

        const configRes = await axios.get(
          `${API}/dynamic-tables/configuration`,
          {
            params: {
              organisationId: user.organisation_id,
              templateId: selectedTemplate,
            },
          },
        );

        /* ---------------- NO EXISTING TABLE ---------------- */

        if (!configRes.data.exists) {
          setAlertData({
            type: "error",
            message: "No Dynamic Form found.",
          });

          setTableExists(false);
          setDisplayName("");
          setSelectedFields([]);

          return;
        }

        /* ---------------- EXISTING TABLE ---------------- */

        setTableExists(true);

        setDisplayName(configRes.data.displayName || "");

        /*
         * Backend returns:
         *
         * selectedFields: [
         *   {
         *     field_key: "name",
         *     is_required: true
         *   },
         *   {
         *     field_key: "email",
         *     is_required: false
         *   }
         * ]
         */

        setSelectedFields(
          Array.isArray(configRes.data.selectedFields)
            ? configRes.data.selectedFields.map((field: SelectedField) => ({
                field_key: field.field_key,
                is_required: Boolean(field.is_required),
              }))
            : [],
        );
      } catch (err: any) {
        console.error(err);

        setAlertData({
          type: "error",
          message:
            err?.response?.data?.message ||
            "Failed to load table configuration.",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedTemplate, user?.organisation_id]);

  /* ---------------------------------------------
      Toggle Fields
  --------------------------------------------- */

  const toggleField = (field: Field) => {
    setSelectedFields((prev) => {
      const exists = prev.some(
        (selected) => selected.field_key === field.field_key,
      );

      /*
       * If already selected,
       * remove the field.
       */
      if (exists) {
        return prev.filter(
          (selected) => selected.field_key !== field.field_key,
        );
      }

      /*
       * If newly selected,
       * use the template default is_required.
       */
      return [
        ...prev,
        {
          field_key: field.field_key,
          is_required: Boolean(field.is_required),
        },
      ];
    });
  };

  /* ---------------------------------------------
      Toggle Required
  --------------------------------------------- */

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

  /* ---------------------------------------------
      Check Field Selected
  --------------------------------------------- */

  const isFieldSelected = (fieldKey: string) => {
    return selectedFields.some((field) => field.field_key === fieldKey);
  };

  /* ---------------------------------------------
      Get Selected Field
  --------------------------------------------- */

  const getSelectedField = (fieldKey: string) => {
    return selectedFields.find((field) => field.field_key === fieldKey);
  };

  /* ---------------------------------------------
      Update
  --------------------------------------------- */

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* ---------------- VALIDATION ---------------- */

    if (!selectedTemplate) {
      return setAlertData({
        type: "error",
        message: "Please select a template.",
      });
    }

    if (!displayName.trim()) {
      return setAlertData({
        type: "error",
        message: "Display Name is required.",
      });
    }

    if (selectedFields.length === 0) {
      return setAlertData({
        type: "error",
        message: "Please select at least one field.",
      });
    }

    try {
      setLoading(true);

      /* ---------------- UPDATE DYNAMIC TABLE ---------------- */

      const response = await axios.put(
        `${API}/dynamic-tables`,
        {
          organisationId: user?.organisation_id,
          templateId: selectedTemplate,
          displayName,

          tableName: displayName.toLowerCase().replace(/\s+/g, "_"),

          /*
           * Backend expects:
           *
           * fields: [
           *   {
           *     field_key: "name",
           *     is_required: true
           *   },
           *   {
           *     field_key: "email",
           *     is_required: false
           *   }
           * ]
           */
          fields: selectedFields,

          updatedBy: user?.id,
        },
        {
          withCredentials: true,
        },
      );

      /* ---------------- SUCCESS ---------------- */

      setAlertData({
        type: "success",
        message: response.data.message,
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

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-8">Update Dynamic Form</h1>

          <form onSubmit={handleUpdate}>
            {/* ---------------------------------------------
                Template
            --------------------------------------------- */}

            <div className="mb-6">
              <label className="block font-medium mb-2">Select Template</label>

              <select
                className="w-full border rounded-lg p-3"
                value={selectedTemplate ?? ""}
                onChange={(e) => {
                  const value = e.target.value;

                  setSelectedTemplate(value ? Number(value) : null);
                }}
              >
                <option value="">Select Template</option>

                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.template_name}
                  </option>
                ))}
              </select>
            </div>

            {/* ---------------------------------------------
                Display Name
            --------------------------------------------- */}

            <div className="mb-6">
              <label className="block font-medium mb-2">Display Name</label>

              <input
                className="w-full border rounded-lg p-3"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            {/* ---------------------------------------------
                Fields
            --------------------------------------------- */}

            {fields.length > 0 && (
              <div className="mb-8">
                <label className="block font-medium mb-3">Fields</label>

                <div className="space-y-3">
                  {fields.map((field) => {
                    const selected = isFieldSelected(field.field_key);

                    const selectedField = getSelectedField(field.field_key);

                    return (
                      <div
                        key={field.field_key}
                        className="border rounded-lg p-4 flex items-center justify-between"
                      >
                        {/* ---------------- FIELD CHECKBOX ---------------- */}

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleField(field)}
                            className="h-4 w-4"
                          />

                          <span className="font-medium">
                            {field.field_label}
                          </span>
                        </label>

                        {/* ---------------- REQUIRED CHECKBOX ---------------- */}

                        {selected && selectedField && (
                          <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                              type="checkbox"
                              checked={selectedField.is_required}
                              onChange={() => toggleRequired(field.field_key)}
                              className="h-4 w-4"
                            />

                            <span>Required</span>
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------------------------------------
                Selected Fields Summary
            --------------------------------------------- */}

            {selectedFields.length > 0 && (
              <div className="mb-8 p-4 bg-gray-50 border rounded-lg">
                <h3 className="font-semibold mb-3">Selected Fields</h3>

                <div className="space-y-2">
                  {selectedFields.map((field) => {
                    const fieldInfo = fields.find(
                      (f) => f.field_key === field.field_key,
                    );

                    return (
                      <div
                        key={field.field_key}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{fieldInfo?.field_label || field.field_key}</span>

                        <span
                          className={
                            field.is_required
                              ? "text-red-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {field.is_required ? "Required" : "Optional"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------------------------------------
                Update Button
            --------------------------------------------- */}

            <button
              disabled={!tableExists || loading}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg"
            >
              {loading ? "Updating..." : "Update Form"}
            </button>
          </form>
        </div>
      </div>

      {/* ---------------------------------------------
          Alert
      --------------------------------------------- */}

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