// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   Plus,
// // // //   Trash2,
// // // //   GripVertical,
// // // //   Eye,
// // // //   Save,
// // // //   ArrowUp,
// // // //   ArrowDown,
// // // //   Copy,
// // // //   Check,
// // // //   ExternalLink,
// // // // } from "lucide-react";

// // // // // ===================== TYPES =====================
// // // // type FieldType =
// // // //   | "text"
// // // //   | "textarea"
// // // //   | "email"
// // // //   | "number"
// // // //   | "select"
// // // //   | "radio"
// // // //   | "checkbox"
// // // //   | "date";

// // // // interface FormField {
// // // //   id: string;
// // // //   type: FieldType;
// // // //   label: string;
// // // //   required: boolean;
// // // //   options?: string[];
// // // // }

// // // // interface FormSchema {
// // // //   id: string;
// // // //   title: string;
// // // //   description?: string;
// // // //   fields: FormField[];
// // // //   createdAt: string;
// // // //   updatedAt: string;
// // // // }

// // // // // ===================== HELPERS =====================
// // // // const generateId = () => Math.random().toString(36).slice(2, 11);

// // // // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// // // //   { value: "text", label: "Text" },
// // // //   { value: "textarea", label: "Textarea" },
// // // //   { value: "email", label: "Email" },
// // // //   { value: "number", label: "Number" },
// // // //   { value: "select", label: "Select" },
// // // //   { value: "radio", label: "Radio" },
// // // //   { value: "checkbox", label: "Checkbox" },
// // // //   { value: "date", label: "Date" },
// // // // ];

// // // // // ===================== MAIN COMPONENT =====================
// // // // export default function FormBuilder() {
// // // //   const [forms, setForms] = useState<FormSchema[]>([]);
// // // //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// // // //   const [previewMode, setPreviewMode] = useState(false);
// // // //   const [savedMessage, setSavedMessage] = useState(false);
// // // //   const [copied, setCopied] = useState(false);

// // // //   // Load forms from localStorage
// // // //   useEffect(() => {
// // // //     const saved = localStorage.getItem("all_forms");
// // // //     if (saved) {
// // // //       const parsed: FormSchema[] = JSON.parse(saved);
// // // //       setForms(parsed);
// // // //       if (parsed.length > 0) setActiveFormId(parsed[0].id);
// // // //     }
// // // //   }, []);

// // // //   const activeForm = forms.find((f) => f.id === activeFormId) || null;

// // // //   const saveToStorage = (updatedForms: FormSchema[]) => {
// // // //     setForms(updatedForms);
// // // //     localStorage.setItem("all_forms", JSON.stringify(updatedForms));
// // // //   };

// // // //   // ========== FORM ACTIONS ==========
// // // //   const createNewForm = () => {
// // // //     const newForm: FormSchema = {
// // // //       id: generateId(),
// // // //       title: "Untitled Form",
// // // //       description: "",
// // // //       fields: [],
// // // //       createdAt: new Date().toISOString(),
// // // //       updatedAt: new Date().toISOString(),
// // // //     };
// // // //     const updated = [newForm, ...forms];
// // // //     saveToStorage(updated);
// // // //     setActiveFormId(newForm.id);
// // // //     setPreviewMode(false);
// // // //   };

// // // //   const deleteForm = (id: string) => {
// // // //     if (!confirm("Delete this form?")) return;
// // // //     const updated = forms.filter((f) => f.id !== id);
// // // //     saveToStorage(updated);
// // // //     if (activeFormId === id) {
// // // //       setActiveFormId(updated[0]?.id || null);
// // // //     }
// // // //   };

// // // //   const updateActiveForm = (updates: Partial<FormSchema>) => {
// // // //     if (!activeForm) return;
// // // //     const updated = forms.map((f) =>
// // // //       f.id === activeForm.id
// // // //         ? { ...f, ...updates, updatedAt: new Date().toISOString() }
// // // //         : f
// // // //     );
// // // //     saveToStorage(updated);
// // // //   };

// // // //   const saveForm = () => {
// // // //     setSavedMessage(true);
// // // //     setTimeout(() => setSavedMessage(false), 2000);
// // // //   };

// // // //   const copyLink = () => {
// // // //     if (!activeForm) return;
// // // //     const link = `${window.location.origin}/form/${activeForm.id}`;
// // // //     navigator.clipboard.writeText(link);
// // // //     setCopied(true);
// // // //     setTimeout(() => setCopied(false), 2000);
// // // //   };

// // // //   // ========== FIELD ACTIONS ==========
// // // //   const addField = (type: FieldType) => {
// // // //     if (!activeForm) return;
// // // //     const newField: FormField = {
// // // //       id: generateId(),
// // // //       type,
// // // //       label: `New ${type} field`,
// // // //       required: false,
// // // //       options: ["select", "radio", "checkbox"].includes(type)
// // // //         ? ["Option 1", "Option 2"]
// // // //         : undefined,
// // // //     };
// // // //     updateActiveForm({ fields: [...activeForm.fields, newField] });
// // // //   };

// // // //   const updateField = (fieldId: string, updates: Partial<FormField>) => {
// // // //     if (!activeForm) return;
// // // //     const updatedFields = activeForm.fields.map((f) =>
// // // //       f.id === fieldId ? { ...f, ...updates } : f
// // // //     );
// // // //     updateActiveForm({ fields: updatedFields });
// // // //   };

// // // //   const deleteField = (fieldId: string) => {
// // // //     if (!activeForm) return;
// // // //     updateActiveForm({
// // // //       fields: activeForm.fields.filter((f) => f.id !== fieldId),
// // // //     });
// // // //   };

// // // //   const moveField = (index: number, direction: "up" | "down") => {
// // // //     if (!activeForm) return;
// // // //     const newFields = [...activeForm.fields];
// // // //     const target = direction === "up" ? index - 1 : index + 1;
// // // //     if (target < 0 || target >= newFields.length) return;
// // // //     [newFields[index], newFields[target]] = [newFields[target], newFields[index]];
// // // //     updateActiveForm({ fields: newFields });
// // // //   };

// // // //   // ===================== RENDER =====================
// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
// // // //       <div className="max-w-6xl mx-auto">
// // // //         {/* ========== TOP BAR ========== */}
// // // //         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-gray-800">Form Builder</h1>
// // // //             <p className="text-gray-500 text-sm">
// // // //               Create forms and share the link with anyone
// // // //             </p>
// // // //           </div>

// // // //           <div className="flex flex-wrap gap-2">
// // // //             <button
// // // //               onClick={createNewForm}
// // // //               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition"
// // // //             >
// // // //               <Plus size={18} />
// // // //               New Form
// // // //             </button>

// // // //             {activeForm && (
// // // //               <>
// // // //                 <button
// // // //                   onClick={() => setPreviewMode(!previewMode)}
// // // //                   className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
// // // //                 >
// // // //                   <Eye size={18} />
// // // //                   {previewMode ? "Edit" : "Preview"}
// // // //                 </button>

// // // //                 <button
// // // //                   onClick={copyLink}
// // // //                   className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
// // // //                 >
// // // //                   {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
// // // //                   {copied ? "Copied!" : "Copy Link"}
// // // //                 </button>

// // // //                 <button
// // // //                   onClick={saveForm}
// // // //                   className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
// // // //                 >
// // // //                   <Save size={18} />
// // // //                   Save
// // // //                 </button>
// // // //               </>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {savedMessage && (
// // // //           <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
// // // //             Form saved successfully!
// // // //           </div>
// // // //         )}

// // // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // // //           {/* ========== LEFT: FORMS LIST ========== */}
// // // //           <div className="lg:col-span-1">
// // // //             <div className="bg-white rounded-xl border shadow-sm p-4 sticky top-4">
// // // //               <h3 className="font-semibold text-gray-800 mb-3">Your Forms</h3>

// // // //               {forms.length === 0 ? (
// // // //                 <p className="text-sm text-gray-400 py-6 text-center">
// // // //                   No forms yet
// // // //                 </p>
// // // //               ) : (
// // // //                 <div className="space-y-2 max-h-[70vh] overflow-y-auto">
// // // //                   {forms.map((form) => (
// // // //                     <div
// // // //                       key={form.id}
// // // //                       onClick={() => {
// // // //                         setActiveFormId(form.id);
// // // //                         setPreviewMode(false);
// // // //                       }}
// // // //                       className={`p-3 rounded-lg cursor-pointer transition border ${
// // // //                         activeFormId === form.id
// // // //                           ? "border-blue-500 bg-blue-50"
// // // //                           : "border-transparent hover:bg-gray-50"
// // // //                       }`}
// // // //                     >
// // // //                       <div className="flex items-start justify-between gap-2">
// // // //                         <div className="min-w-0">
// // // //                           <p className="font-medium text-sm truncate">
// // // //                             {form.title}
// // // //                           </p>
// // // //                           <p className="text-xs text-gray-400 mt-0.5">
// // // //                             {form.fields.length} fields
// // // //                           </p>
// // // //                         </div>
// // // //                         <button
// // // //                           onClick={(e) => {
// // // //                             e.stopPropagation();
// // // //                             deleteForm(form.id);
// // // //                           }}
// // // //                           className="text-gray-400 hover:text-red-500 p-1"
// // // //                         >
// // // //                           <Trash2 size={14} />
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* ========== RIGHT: EDITOR / PREVIEW ========== */}
// // // //           <div className="lg:col-span-3">
// // // //             {!activeForm ? (
// // // //               <div className="bg-white rounded-xl border shadow-sm p-16 text-center text-gray-400">
// // // //                 <p className="text-lg mb-2">No form selected</p>
// // // //                 <p className="text-sm">Create a new form to get started</p>
// // // //               </div>
// // // //             ) : previewMode ? (
// // // //               <FormPreview schema={activeForm} />
// // // //             ) : (
// // // //               <div className="space-y-6">
// // // //                 {/* Form Title & Description */}
// // // //                 <div className="bg-white rounded-xl shadow-sm border p-6">
// // // //                   <input
// // // //                     type="text"
// // // //                     value={activeForm.title}
// // // //                     onChange={(e) => updateActiveForm({ title: e.target.value })}
// // // //                     className="w-full text-xl font-semibold border-b border-transparent focus:border-blue-400 outline-none pb-2 mb-3"
// // // //                     placeholder="Form Title"
// // // //                   />
// // // //                   <textarea
// // // //                     value={activeForm.description || ""}
// // // //                     onChange={(e) =>
// // // //                       updateActiveForm({ description: e.target.value })
// // // //                     }
// // // //                     className="w-full text-gray-600 border-b border-transparent focus:border-blue-400 outline-none resize-none"
// // // //                     placeholder="Form description (optional)"
// // // //                     rows={2}
// // // //                   />

// // // //                   {/* Shareable Link */}
// // // //                   <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between gap-3">
// // // //                     <div className="min-w-0">
// // // //                       <p className="text-xs text-gray-500 mb-1">Public Link</p>
// // // //                       <p className="text-sm font-mono truncate text-blue-600">
// // // //                         {window.location.origin}/form/{activeForm.id}
// // // //                       </p>
// // // //                     </div>
// // // //                     <button
// // // //                       onClick={copyLink}
// // // //                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border text-sm hover:bg-gray-50"
// // // //                     >
// // // //                       {copied ? <Check size={14} /> : <Copy size={14} />}
// // // //                       {copied ? "Copied" : "Copy"}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Fields */}
// // // //                 <div className="space-y-4">
// // // //                   {activeForm.fields.map((field, index) => (
// // // //                     <div
// // // //                       key={field.id}
// // // //                       className="bg-white rounded-xl shadow-sm border p-5"
// // // //                     >
// // // //                       <div className="flex items-start gap-3">
// // // //                         <div className="pt-2 text-gray-400">
// // // //                           <GripVertical size={18} />
// // // //                         </div>

// // // //                         <div className="flex-1 space-y-3">
// // // //                           <div className="flex gap-3">
// // // //                             <input
// // // //                               type="text"
// // // //                               value={field.label}
// // // //                               onChange={(e) =>
// // // //                                 updateField(field.id, { label: e.target.value })
// // // //                               }
// // // //                               className="flex-1 font-medium border-b border-gray-200 focus:border-blue-400 outline-none pb-1"
// // // //                               placeholder="Field Label"
// // // //                             />
// // // //                             <select
// // // //                               value={field.type}
// // // //                               onChange={(e) =>
// // // //                                 updateField(field.id, {
// // // //                                   type: e.target.value as FieldType,
// // // //                                   options: ["select", "radio", "checkbox"].includes(
// // // //                                     e.target.value
// // // //                                   )
// // // //                                     ? field.options || ["Option 1", "Option 2"]
// // // //                                     : undefined,
// // // //                                 })
// // // //                               }
// // // //                               className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
// // // //                             >
// // // //                               {FIELD_TYPES.map((t) => (
// // // //                                 <option key={t.value} value={t.value}>
// // // //                                   {t.label}
// // // //                                 </option>
// // // //                               ))}
// // // //                             </select>
// // // //                           </div>

// // // //                           {field.options && (
// // // //                             <div className="space-y-2">
// // // //                               {field.options.map((opt, i) => (
// // // //                                 <div key={i} className="flex gap-2">
// // // //                                   <input
// // // //                                     type="text"
// // // //                                     value={opt}
// // // //                                     onChange={(e) => {
// // // //                                       const newOpts = [...field.options!];
// // // //                                       newOpts[i] = e.target.value;
// // // //                                       updateField(field.id, { options: newOpts });
// // // //                                     }}
// // // //                                     className="flex-1 border border-gray-200 rounded px-3 py-1 text-sm"
// // // //                                   />
// // // //                                   <button
// // // //                                     onClick={() => {
// // // //                                       const newOpts = field.options!.filter(
// // // //                                         (_, idx) => idx !== i
// // // //                                       );
// // // //                                       updateField(field.id, { options: newOpts });
// // // //                                     }}
// // // //                                     className="text-red-500 hover:text-red-700"
// // // //                                   >
// // // //                                     <Trash2 size={16} />
// // // //                                   </button>
// // // //                                 </div>
// // // //                               ))}
// // // //                               <button
// // // //                                 onClick={() =>
// // // //                                   updateField(field.id, {
// // // //                                     options: [
// // // //                                       ...(field.options || []),
// // // //                                       `Option ${(field.options?.length || 0) + 1}`,
// // // //                                     ],
// // // //                                   })
// // // //                                 }
// // // //                                 className="text-sm text-blue-600 hover:underline"
// // // //                               >
// // // //                                 + Add option
// // // //                               </button>
// // // //                             </div>
// // // //                           )}

// // // //                           <label className="flex items-center gap-2 text-sm cursor-pointer">
// // // //                             <input
// // // //                               type="checkbox"
// // // //                               checked={field.required}
// // // //                               onChange={(e) =>
// // // //                                 updateField(field.id, {
// // // //                                   required: e.target.checked,
// // // //                                 })
// // // //                               }
// // // //                               className="rounded"
// // // //                             />
// // // //                             Required
// // // //                           </label>
// // // //                         </div>

// // // //                         <div className="flex flex-col gap-1">
// // // //                           <button
// // // //                             onClick={() => moveField(index, "up")}
// // // //                             disabled={index === 0}
// // // //                             className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
// // // //                           >
// // // //                             <ArrowUp size={16} />
// // // //                           </button>
// // // //                           <button
// // // //                             onClick={() => moveField(index, "down")}
// // // //                             disabled={index === activeForm.fields.length - 1}
// // // //                             className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
// // // //                           >
// // // //                             <ArrowDown size={16} />
// // // //                           </button>
// // // //                           <button
// // // //                             onClick={() => deleteField(field.id)}
// // // //                             className="p-1.5 rounded text-red-500 hover:bg-red-50"
// // // //                           >
// // // //                             <Trash2 size={16} />
// // // //                           </button>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}

// // // //                   {activeForm.fields.length === 0 && (
// // // //                     <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-xl">
// // // //                       No fields yet. Add one from the panel below →
// // // //                     </div>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* Add Field Panel */}
// // // //                 <div className="bg-white rounded-xl shadow-sm border p-5">
// // // //                   <h3 className="font-semibold text-gray-800 mb-4">Add Field</h3>
// // // //                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
// // // //                     {FIELD_TYPES.map((type) => (
// // // //                       <button
// // // //                         key={type.value}
// // // //                         onClick={() => addField(type.value)}
// // // //                         className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition text-sm"
// // // //                       >
// // // //                         <Plus size={16} className="text-blue-500" />
// // // //                         {type.label}
// // // //                       </button>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ===================== PREVIEW COMPONENT =====================
// // // // function FormPreview({ schema }: { schema: FormSchema }) {
// // // //   const [values, setValues] = useState<Record<string, any>>({});
// // // //   const [submitted, setSubmitted] = useState(false);

// // // //   const handleSubmit = (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     localStorage.setItem(
// // // //       `form_response_${schema.id}_${Date.now()}`,
// // // //       JSON.stringify({
// // // //         formId: schema.id,
// // // //         formTitle: schema.title,
// // // //         values,
// // // //         submittedAt: new Date().toISOString(),
// // // //       })
// // // //     );
// // // //     setSubmitted(true);
// // // //   };

// // // //   if (submitted) {
// // // //     return (
// // // //       <div className="bg-white rounded-xl shadow-sm border p-10 text-center">
// // // //         <div className="text-4xl mb-4">✓</div>
// // // //         <h2 className="text-xl font-semibold text-gray-800">Thank you!</h2>
// // // //         <p className="text-gray-500 mt-2">Your response has been recorded.</p>
// // // //         <button
// // // //           onClick={() => {
// // // //             setSubmitted(false);
// // // //             setValues({});
// // // //           }}
// // // //           className="mt-6 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
// // // //         >
// // // //           Submit another response
// // // //         </button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
// // // //       <h2 className="text-2xl font-bold text-gray-800 mb-1">{schema.title}</h2>
// // // //       {schema.description && (
// // // //         <p className="text-gray-500 mb-6">{schema.description}</p>
// // // //       )}

// // // //       <form onSubmit={handleSubmit} className="space-y-5">
// // // //         {schema.fields.map((field) => (
// // // //           <div key={field.id}>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //               {field.label}
// // // //               {field.required && <span className="text-red-500 ml-1">*</span>}
// // // //             </label>

// // // //             {field.type === "textarea" ? (
// // // //               <textarea
// // // //                 required={field.required}
// // // //                 value={values[field.id] || ""}
// // // //                 onChange={(e) =>
// // // //                   setValues((prev) => ({ ...prev, [field.id]: e.target.value }))
// // // //                 }
// // // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
// // // //                 rows={4}
// // // //               />
// // // //             ) : field.type === "select" ? (
// // // //               <select
// // // //                 required={field.required}
// // // //                 value={values[field.id] || ""}
// // // //                 onChange={(e) =>
// // // //                   setValues((prev) => ({ ...prev, [field.id]: e.target.value }))
// // // //                 }
// // // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
// // // //               >
// // // //                 <option value="">Select an option</option>
// // // //                 {field.options?.map((opt) => (
// // // //                   <option key={opt} value={opt}>
// // // //                     {opt}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             ) : field.type === "radio" ? (
// // // //               <div className="space-y-2">
// // // //                 {field.options?.map((opt) => (
// // // //                   <label key={opt} className="flex items-center gap-2 cursor-pointer">
// // // //                     <input
// // // //                       type="radio"
// // // //                       name={field.id}
// // // //                       value={opt}
// // // //                       required={field.required}
// // // //                       checked={values[field.id] === opt}
// // // //                       onChange={() =>
// // // //                         setValues((prev) => ({ ...prev, [field.id]: opt }))
// // // //                       }
// // // //                     />
// // // //                     {opt}
// // // //                   </label>
// // // //                 ))}
// // // //               </div>
// // // //             ) : field.type === "checkbox" ? (
// // // //               <div className="space-y-2">
// // // //                 {field.options?.map((opt) => (
// // // //                   <label key={opt} className="flex items-center gap-2 cursor-pointer">
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       value={opt}
// // // //                       checked={(values[field.id] || []).includes(opt)}
// // // //                       onChange={(e) => {
// // // //                         const current: string[] = values[field.id] || [];
// // // //                         const next = e.target.checked
// // // //                           ? [...current, opt]
// // // //                           : current.filter((v) => v !== opt);
// // // //                         setValues((prev) => ({ ...prev, [field.id]: next }));
// // // //                       }}
// // // //                     />
// // // //                     {opt}
// // // //                   </label>
// // // //                 ))}
// // // //               </div>
// // // //             ) : (
// // // //               <input
// // // //                 type={field.type}
// // // //                 required={field.required}
// // // //                 value={values[field.id] || ""}
// // // //                 onChange={(e) =>
// // // //                   setValues((prev) => ({ ...prev, [field.id]: e.target.value }))
// // // //                 }
// // // //                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
// // // //               />
// // // //             )}
// // // //           </div>
// // // //         ))}

// // // //         <button
// // // //           type="submit"
// // // //           className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
// // // //         >
// // // //           Submit
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // "use client";
// // // // import React, { useState, useEffect } from "react";
// // // // import "./DynamicFormBuilder.css"; // your existing CSS
// // // // import { FiPlus, FiSave, FiEdit2, FiTrash2, FiEye, FiCopy, FiCheck } from "react-icons/fi";

// // // // // ===================== TYPES =====================
// // // // type FieldType =
// // // //   | "text"
// // // //   | "textarea"
// // // //   | "email"
// // // //   | "number"
// // // //   | "select"
// // // //   | "radio"
// // // //   | "checkbox"
// // // //   | "date";

// // // // interface FormField {
// // // //   id: string;
// // // //   type: FieldType;
// // // //   label: string;
// // // //   required: boolean;
// // // //   placeholder?: string;
// // // //   options?: string[];
// // // // }

// // // // interface FormSchema {
// // // //   id: string;
// // // //   title: string;
// // // //   description?: string;
// // // //   fields: FormField[];
// // // //   createdAt: string;
// // // //   updatedAt: string;
// // // // }

// // // // const generateId = () => Math.random().toString(36).slice(2, 11);

// // // // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// // // //   { value: "text", label: "📝 Text" },
// // // //   { value: "textarea", label: "📄 Textarea" },
// // // //   { value: "email", label: "📧 Email" },
// // // //   { value: "number", label: "🔢 Number" },
// // // //   { value: "select", label: "📋 Dropdown" },
// // // //   { value: "radio", label: "◉ Radio Buttons" },
// // // //   { value: "checkbox", label: "☑️ Checkbox Group" },
// // // //   { value: "date", label: "📅 Date" },
// // // // ];

// // // // // ===================== MAIN =====================
// // // // export default function FormBuilder() {
// // // //   const [forms, setForms] = useState<FormSchema[]>([]);
// // // //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// // // //   const [previewMode, setPreviewMode] = useState(false);
// // // //   const [copied, setCopied] = useState(false);
// // // //   const [savedMessage, setSavedMessage] = useState(false);

// // // //   // Field builder
// // // //   const [fieldType, setFieldType] = useState<FieldType>("text");
// // // //   const [fieldLabel, setFieldLabel] = useState("");
// // // //   const [fieldRequired, setFieldRequired] = useState(false);
// // // //   const [fieldPlaceholder, setFieldPlaceholder] = useState("");
// // // //   const [optionsInput, setOptionsInput] = useState("");
// // // //   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

// // // //   useEffect(() => {
// // // //     const saved = localStorage.getItem("all_forms");
// // // //     if (saved) {
// // // //       const parsed: FormSchema[] = JSON.parse(saved);
// // // //       setForms(parsed);
// // // //       if (parsed.length > 0) setActiveFormId(parsed[0].id);
// // // //     }
// // // //   }, []);

// // // //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// // // //   const showOptions = ["select", "radio", "checkbox"].includes(fieldType);

// // // //   const saveToStorage = (updated: FormSchema[]) => {
// // // //     setForms(updated);
// // // //     localStorage.setItem("all_forms", JSON.stringify(updated));
// // // //   };

// // // //   const createNewForm = () => {
// // // //     const newForm: FormSchema = {
// // // //       id: generateId(),
// // // //       title: "Untitled Form",
// // // //       description: "",
// // // //       fields: [],
// // // //       createdAt: new Date().toISOString(),
// // // //       updatedAt: new Date().toISOString(),
// // // //     };
// // // //     const updated = [newForm, ...forms];
// // // //     saveToStorage(updated);
// // // //     setActiveFormId(newForm.id);
// // // //     setPreviewMode(false);
// // // //     resetFieldBuilder();
// // // //   };

// // // //   const updateActiveForm = (updates: Partial<FormSchema>) => {
// // // //     if (!activeForm) return;
// // // //     const updated = forms.map((f) =>
// // // //       f.id === activeForm.id
// // // //         ? { ...f, ...updates, updatedAt: new Date().toISOString() }
// // // //         : f
// // // //     );
// // // //     saveToStorage(updated);
// // // //   };

// // // //   const deleteForm = (id: string) => {
// // // //     if (!confirm("Delete this form?")) return;
// // // //     const updated = forms.filter((f) => f.id !== id);
// // // //     saveToStorage(updated);
// // // //     if (activeFormId === id) setActiveFormId(updated[0]?.id || null);
// // // //   };

// // // //   const resetFieldBuilder = () => {
// // // //     setFieldType("text");
// // // //     setFieldLabel("");
// // // //     setFieldRequired(false);
// // // //     setFieldPlaceholder("");
// // // //     setOptionsInput("");
// // // //     setEditingFieldId(null);
// // // //   };

// // // //   const addOrUpdateField = () => {
// // // //     if (!activeForm) return;
// // // //     if (!fieldLabel.trim()) {
// // // //       alert("Field label is required");
// // // //       return;
// // // //     }

// // // //     let options: string[] | undefined;
// // // //     if (showOptions) {
// // // //       options = optionsInput
// // // //         .split(",")
// // // //         .map((o) => o.trim())
// // // //         .filter(Boolean);
// // // //       if (options.length === 0) {
// // // //         alert("Please provide at least one option");
// // // //         return;
// // // //       }
// // // //     }

// // // //     const newField: FormField = {
// // // //       id: editingFieldId || generateId(),
// // // //       type: fieldType,
// // // //       label: fieldLabel.trim(),
// // // //       required: fieldRequired,
// // // //       placeholder: fieldPlaceholder.trim() || undefined,
// // // //       options,
// // // //     };

// // // //     const updatedFields = editingFieldId
// // // //       ? activeForm.fields.map((f) => (f.id === editingFieldId ? newField : f))
// // // //       : [...activeForm.fields, newField];

// // // //     updateActiveForm({ fields: updatedFields });
// // // //     resetFieldBuilder();
// // // //   };

// // // //   const editField = (field: FormField) => {
// // // //     setEditingFieldId(field.id);
// // // //     setFieldType(field.type);
// // // //     setFieldLabel(field.label);
// // // //     setFieldRequired(field.required);
// // // //     setFieldPlaceholder(field.placeholder || "");
// // // //     setOptionsInput(field.options?.join(", ") || "");
// // // //   };

// // // //   const deleteField = (id: string) => {
// // // //     if (!activeForm) return;
// // // //     updateActiveForm({ fields: activeForm.fields.filter((f) => f.id !== id) });
// // // //     if (editingFieldId === id) resetFieldBuilder();
// // // //   };

// // // //   const copyLink = () => {
// // // //     if (!activeForm) return;
// // // //     navigator.clipboard.writeText(
// // // //       `${window.location.origin}/form/${activeForm.id}`
// // // //     );
// // // //     setCopied(true);
// // // //     setTimeout(() => setCopied(false), 2000);
// // // //   };

// // // //   const saveForm = () => {
// // // //     setSavedMessage(true);
// // // //     setTimeout(() => setSavedMessage(false), 2000);
// // // //   };

// // // //   return (
// // // //     <div className="df-container">
// // // //       {/* ========== HEADER ========== */}
// // // //       <div
// // // //         style={{
// // // //           display: "flex",
// // // //           justifyContent: "space-between",
// // // //           alignItems: "center",
// // // //           flexWrap: "wrap",
// // // //           gap: "12px",
// // // //           marginBottom: "24px",
// // // //         }}
// // // //       >
// // // //         <div>
// // // //           <h2 className="df-title" style={{ textAlign: "left", marginBottom: 4 }}>
// // // //             Form Builder
// // // //           </h2>
// // // //           <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
// // // //             Create forms and share them with a link
// // // //           </p>
// // // //         </div>

// // // //         <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
// // // //           <button onClick={createNewForm} className="df-add-btn" style={{ width: "auto" }}>
// // // //             <FiPlus size={16} style={{ marginRight: 6 }} />
// // // //             New Form
// // // //           </button>

// // // //           {activeForm && (
// // // //             <>
// // // //               <button
// // // //                 onClick={() => setPreviewMode(!previewMode)}
// // // //                 className="df-view-btn"
// // // //               >
// // // //                 <FiEye size={15} style={{ marginRight: 6 }} />
// // // //                 {previewMode ? "Back to Edit" : "Preview"}
// // // //               </button>
// // // //               <button onClick={copyLink} className="df-view-btn">
// // // //                 {copied ? (
// // // //                   <FiCheck size={15} style={{ marginRight: 6 }} />
// // // //                 ) : (
// // // //                   <FiCopy size={15} style={{ marginRight: 6 }} />
// // // //                 )}
// // // //                 {copied ? "Copied" : "Copy Link"}
// // // //               </button>
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {savedMessage && (
// // // //         <div
// // // //           style={{
// // // //             marginBottom: 16,
// // // //             padding: "12px 16px",
// // // //             background: "#f0fdf4",
// // // //             border: "1px solid #86efac",
// // // //             borderRadius: 10,
// // // //             color: "#166534",
// // // //             fontWeight: 500,
// // // //             fontSize: 14,
// // // //           }}
// // // //         >
// // // //           ✅ Form saved successfully
// // // //         </div>
// // // //       )}

// // // //       {/* ========== FORMS LIST (sidebar style) ========== */}
// // // //       <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24 }}>
// // // //         {/* Left: Forms list */}
// // // //         <div className="df-field-list-container" style={{ position: "sticky", top: 20, alignSelf: "start" }}>
// // // //           <h5 style={{ margin: "0 0 12px 0", color: "#333" }}>
// // // //             Your Forms ({forms.length})
// // // //           </h5>
// // // //           {forms.length === 0 ? (
// // // //             <p style={{ color: "#999", textAlign: "center", padding: "40px 10px" }}>
// // // //               No forms yet
// // // //             </p>
// // // //           ) : (
// // // //             <div className="df-field-list" style={{ maxHeight: "70vh" }}>
// // // //               {forms.map((form) => (
// // // //                 <div
// // // //                   key={form.id}
// // // //                   onClick={() => {
// // // //                     setActiveFormId(form.id);
// // // //                     setPreviewMode(false);
// // // //                     resetFieldBuilder();
// // // //                   }}
// // // //                   className="df-field-item"
// // // //                   style={{
// // // //                     cursor: "pointer",
// // // //                     borderColor:
// // // //                       activeFormId === form.id ? "#16a34a" : undefined,
// // // //                     background:
// // // //                       activeFormId === form.id ? "#f0fdf4" : undefined,
// // // //                   }}
// // // //                 >
// // // //                   <span>
// // // //                     <strong>{form.title || "Untitled Form"}</strong>
// // // //                     <span style={{ color: "#666", marginLeft: 8 }}>
// // // //                       ({form.fields.length} fields)
// // // //                     </span>
// // // //                   </span>
// // // //                   <button
// // // //                     onClick={(e) => {
// // // //                       e.stopPropagation();
// // // //                       deleteForm(form.id);
// // // //                     }}
// // // //                     className="df-delete-btn"
// // // //                     style={{ padding: "6px 10px" }}
// // // //                     title="Delete"
// // // //                   >
// // // //                     <FiTrash2 size={16} />
// // // //                   </button>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Right: Builder / Preview */}
// // // //         <div>
// // // //           {!activeForm ? (
// // // //             <div className="df-builder-card" style={{ textAlign: "center", padding: 60 }}>
// // // //               <p style={{ color: "#64748b", fontSize: 16 }}>No form selected</p>
// // // //               <button onClick={createNewForm} className="df-add-btn" style={{ width: "auto", marginTop: 16 }}>
// // // //                 <FiPlus size={16} style={{ marginRight: 6 }} />
// // // //                 Create Form
// // // //               </button>
// // // //             </div>
// // // //           ) : previewMode ? (
// // // //             <FormPreview schema={activeForm} onBack={() => setPreviewMode(false)} />
// // // //           ) : (
// // // //             <div className="df-builder-card">
// // // //               {/* ===== TOP CONFIG ===== */}
// // // //               <div className="df-top-config" style={{ gridTemplateColumns: "2fr 1.5fr" }}>
// // // //                 <div>
// // // //                   <label>Form Name</label>
// // // //                   <input
// // // //                     className="df-input"
// // // //                     value={activeForm.title}
// // // //                     onChange={(e) => updateActiveForm({ title: e.target.value })}
// // // //                     placeholder="e.g. Employee Survey"
// // // //                   />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label>Description (optional)</label>
// // // //                   <input
// // // //                     className="df-input"
// // // //                     value={activeForm.description || ""}
// // // //                     onChange={(e) =>
// // // //                       updateActiveForm({ description: e.target.value })
// // // //                     }
// // // //                     placeholder="Short description..."
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               {/* Shareable link */}
// // // //               <div
// // // //                 style={{
// // // //                   marginBottom: 24,
// // // //                   padding: "12px 16px",
// // // //                   background: "#f8fafc",
// // // //                   borderRadius: 10,
// // // //                   border: "1px solid #e2e8f0",
// // // //                   display: "flex",
// // // //                   justifyContent: "space-between",
// // // //                   alignItems: "center",
// // // //                   gap: 12,
// // // //                   flexWrap: "wrap",
// // // //                 }}
// // // //               >
// // // //                 <div>
// // // //                   <div style={{ fontSize: 12, color: "#64748b", marginBottom: 2 }}>
// // // //                     Shareable link
// // // //                   </div>
// // // //                   <div style={{ fontFamily: "monospace", fontSize: 13, color: "#16a34a" }}>
// // // //                     {typeof window !== "undefined"
// // // //                       ? `${window.location.origin}/form/${activeForm.id}`
// // // //                       : `/form/${activeForm.id}`}
// // // //                   </div>
// // // //                 </div>
// // // //                 <button onClick={copyLink} className="df-view-btn">
// // // //                   {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
// // // //                   {copied ? " Copied" : " Copy"}
// // // //                 </button>
// // // //               </div>

// // // //               {/* ===== BUILDER: Left + Right ===== */}
// // // //               <div className="df-builder">
// // // //                 {/* LEFT: Add Field */}
// // // //                 <div className="df-field-builder">
// // // //                   <h4 style={{ margin: "0 0 10px 0", color: "#0d6efd" }}>
// // // //                     Add Form Fields
// // // //                   </h4>
// // // //                   <p style={{ margin: "0 0 16px 0", color: "#666", fontSize: "0.9rem" }}>
// // // //                     Configure fields for your form
// // // //                   </p>

// // // //                   <label style={{ display: "block", marginBottom: 8, fontWeight: 500, fontSize: "0.9rem" }}>
// // // //                     Field Type
// // // //                   </label>
// // // //                   <select
// // // //                     className="df-input"
// // // //                     value={fieldType}
// // // //                     onChange={(e) => setFieldType(e.target.value as FieldType)}
// // // //                   >
// // // //                     {FIELD_TYPES.map((t) => (
// // // //                       <option key={t.value} value={t.value}>
// // // //                         {t.label}
// // // //                       </option>
// // // //                     ))}
// // // //                   </select>

// // // //                   <label style={{ display: "block", marginTop: 12, marginBottom: 8, fontWeight: 500, fontSize: "0.9rem" }}>
// // // //                     Field Label
// // // //                   </label>
// // // //                   <input
// // // //                     className="df-input"
// // // //                     placeholder="e.g. Your Name"
// // // //                     value={fieldLabel}
// // // //                     onChange={(e) => setFieldLabel(e.target.value)}
// // // //                   />

// // // //                   <label style={{ display: "block", marginTop: 12, marginBottom: 8, fontWeight: 500, fontSize: "0.9rem" }}>
// // // //                     Placeholder (optional)
// // // //                   </label>
// // // //                   <input
// // // //                     className="df-input"
// // // //                     placeholder="e.g. Enter your full name"
// // // //                     value={fieldPlaceholder}
// // // //                     onChange={(e) => setFieldPlaceholder(e.target.value)}
// // // //                   />

// // // //                   {showOptions && (
// // // //                     <div style={{ marginTop: 12 }}>
// // // //                       <label style={{ display: "block", marginBottom: 8, fontWeight: 500, fontSize: "0.9rem" }}>
// // // //                         Options (comma separated)
// // // //                       </label>
// // // //                       <input
// // // //                         className="df-input"
// // // //                         placeholder="Option 1, Option 2, Option 3"
// // // //                         value={optionsInput}
// // // //                         onChange={(e) => setOptionsInput(e.target.value)}
// // // //                       />
// // // //                     </div>
// // // //                   )}

// // // //                   <div style={{ marginTop: 12 }}>
// // // //                     <label style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
// // // //                       <input
// // // //                         type="checkbox"
// // // //                         checked={fieldRequired}
// // // //                         onChange={(e) => setFieldRequired(e.target.checked)}
// // // //                       />
// // // //                       Required Field
// // // //                     </label>
// // // //                   </div>

// // // //                   <button
// // // //                     onClick={addOrUpdateField}
// // // //                     className="df-add-btn"
// // // //                     style={{
// // // //                       marginTop: 16,
// // // //                       display: "flex",
// // // //                       alignItems: "center",
// // // //                       justifyContent: "center",
// // // //                       gap: 8,
// // // //                     }}
// // // //                   >
// // // //                     {editingFieldId ? (
// // // //                       <>
// // // //                         <FiEdit2 size={18} />
// // // //                         Update Field
// // // //                       </>
// // // //                     ) : (
// // // //                       <>
// // // //                         <FiPlus size={18} />
// // // //                         Add Field
// // // //                       </>
// // // //                     )}
// // // //                   </button>

// // // //                   {editingFieldId && (
// // // //                     <button
// // // //                       onClick={resetFieldBuilder}
// // // //                       style={{
// // // //                         marginTop: 10,
// // // //                         background: "transparent",
// // // //                         border: "none",
// // // //                         color: "#64748b",
// // // //                         cursor: "pointer",
// // // //                         fontSize: 13,
// // // //                         width: "100%",
// // // //                       }}
// // // //                     >
// // // //                       Cancel editing
// // // //                     </button>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* RIGHT: Added Fields */}
// // // //                 <div>
// // // //                   <div className="df-field-list-container">
// // // //                     <h5 style={{ margin: "0 0 12px 0", color: "#333" }}>
// // // //                       Added Fields ({activeForm.fields.length})
// // // //                     </h5>
// // // //                     <div className="df-field-list">
// // // //                       {activeForm.fields.length === 0 ? (
// // // //                         <p
// // // //                           style={{
// // // //                             color: "#999",
// // // //                             textAlign: "center",
// // // //                             padding: "50px 20px",
// // // //                           }}
// // // //                         >
// // // //                           No fields added yet
// // // //                         </p>
// // // //                       ) : (
// // // //                         activeForm.fields.map((f) => (
// // // //                           <div key={f.id} className="df-field-item">
// // // //                             <span>
// // // //                               <strong>{f.label}</strong>
// // // //                               <span style={{ color: "#666", marginLeft: 8 }}>
// // // //                                 ({f.type})
// // // //                               </span>
// // // //                               {f.required && (
// // // //                                 <span style={{ color: "#dc3545", marginLeft: 4 }}>
// // // //                                   *
// // // //                                 </span>
// // // //                               )}
// // // //                             </span>
// // // //                             <div style={{ display: "flex", gap: 8 }}>
// // // //                               <button
// // // //                                 onClick={() => editField(f)}
// // // //                                 className="df-edit-btn"
// // // //                                 style={{
// // // //                                   padding: "6px 10px",
// // // //                                   display: "flex",
// // // //                                   alignItems: "center",
// // // //                                   justifyContent: "center",
// // // //                                 }}
// // // //                                 title="Edit Field"
// // // //                               >
// // // //                                 <FiEdit2 size={18} />
// // // //                               </button>
// // // //                               <button
// // // //                                 onClick={() => deleteField(f.id)}
// // // //                                 className="df-delete-btn"
// // // //                                 style={{
// // // //                                   padding: "6px 10px",
// // // //                                   display: "flex",
// // // //                                   alignItems: "center",
// // // //                                   justifyContent: "center",
// // // //                                 }}
// // // //                                 title="Delete Field"
// // // //                               >
// // // //                                 <FiTrash2 size={18} />
// // // //                               </button>
// // // //                             </div>
// // // //                           </div>
// // // //                         ))
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Save button */}
// // // //               <button
// // // //                 onClick={saveForm}
// // // //                 className="df-submit-btn"
// // // //                 style={{
// // // //                   display: "inline-flex",
// // // //                   alignItems: "center",
// // // //                   justifyContent: "center",
// // // //                   gap: 10,
// // // //                 }}
// // // //               >
// // // //                 <FiSave size={20} />
// // // //                 Save Form
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ===================== PREVIEW =====================
// // // // function FormPreview({
// // // //   schema,
// // // //   onBack,
// // // // }: {
// // // //   schema: FormSchema;
// // // //   onBack: () => void;
// // // // }) {
// // // //   const [values, setValues] = useState<Record<string, any>>({});
// // // //   const [submitted, setSubmitted] = useState(false);

// // // //   const handleSubmit = (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     localStorage.setItem(
// // // //       `form_response_${schema.id}_${Date.now()}`,
// // // //       JSON.stringify({
// // // //         formId: schema.id,
// // // //         formTitle: schema.title,
// // // //         values,
// // // //         submittedAt: new Date().toISOString(),
// // // //       })
// // // //     );
// // // //     setSubmitted(true);
// // // //   };

// // // //   if (submitted) {
// // // //     return (
// // // //       <div className="df-fill-preview">
// // // //         <div style={{ textAlign: "center", padding: "40px 20px" }}>
// // // //           <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
// // // //           <h3 style={{ marginBottom: 8 }}>Thank you!</h3>
// // // //           <p style={{ color: "#64748b" }}>Your response has been recorded.</p>
// // // //           <button
// // // //             className="df-submit-btn"
// // // //             style={{ width: "auto", marginTop: 20 }}
// // // //             onClick={() => {
// // // //               setSubmitted(false);
// // // //               setValues({});
// // // //             }}
// // // //           >
// // // //             Submit another response
// // // //           </button>
// // // //         </div>
// // // //         <button className="df-back-btn" onClick={onBack}>
// // // //           Back
// // // //         </button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="df-fill-preview">
// // // //       <h3>{schema.title}</h3>
// // // //       {schema.description && (
// // // //         <p style={{ color: "#64748b", textAlign: "center", marginTop: -20, marginBottom: 24 }}>
// // // //           {schema.description}
// // // //         </p>
// // // //       )}

// // // //       <form className="df-form df-grid-layout df-grid-one" onSubmit={handleSubmit}>
// // // //         {schema.fields.map((field) => (
// // // //           <div key={field.id} className="df-form-group">
// // // //             <label>
// // // //               {field.label}
// // // //               {field.required && <span className="required"> *</span>}
// // // //             </label>

// // // //             {field.type === "textarea" ? (
// // // //               <textarea
// // // //                 className="df-input"
// // // //                 required={field.required}
// // // //                 value={values[field.id] || ""}
// // // //                 onChange={(e) =>
// // // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // // //                 }
// // // //                 placeholder={field.placeholder}
// // // //                 rows={4}
// // // //               />
// // // //             ) : field.type === "select" ? (
// // // //               <select
// // // //                 className="df-input"
// // // //                 required={field.required}
// // // //                 value={values[field.id] || ""}
// // // //                 onChange={(e) =>
// // // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // // //                 }
// // // //               >
// // // //                 <option value="">-- Select --</option>
// // // //                 {field.options?.map((opt) => (
// // // //                   <option key={opt} value={opt}>
// // // //                     {opt}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             ) : field.type === "radio" ? (
// // // //               <div className="df-radio-group">
// // // //                 {field.options?.map((opt) => (
// // // //                   <label key={opt} className="df-radio-label">
// // // //                     <input
// // // //                       type="radio"
// // // //                       name={field.id}
// // // //                       value={opt}
// // // //                       required={field.required}
// // // //                       checked={values[field.id] === opt}
// // // //                       onChange={() =>
// // // //                         setValues((p) => ({ ...p, [field.id]: opt }))
// // // //                       }
// // // //                     />
// // // //                     {opt}
// // // //                   </label>
// // // //                 ))}
// // // //               </div>
// // // //             ) : field.type === "checkbox" ? (
// // // //               <div className="df-checkbox-group">
// // // //                 {field.options?.map((opt) => (
// // // //                   <label key={opt} className="df-checkbox-label">
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       value={opt}
// // // //                       checked={(values[field.id] || []).includes(opt)}
// // // //                       onChange={(e) => {
// // // //                         const current: string[] = values[field.id] || [];
// // // //                         const next = e.target.checked
// // // //                           ? [...current, opt]
// // // //                           : current.filter((v) => v !== opt);
// // // //                         setValues((p) => ({ ...p, [field.id]: next }));
// // // //                       }}
// // // //                     />
// // // //                     {opt}
// // // //                   </label>
// // // //                 ))}
// // // //               </div>
// // // //             ) : (
// // // //               <input
// // // //                 type={field.type}
// // // //                 className="df-input"
// // // //                 required={field.required}
// // // //                 value={values[field.id] || ""}
// // // //                 onChange={(e) =>
// // // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // // //                 }
// // // //                 placeholder={field.placeholder}
// // // //               />
// // // //             )}
// // // //           </div>
// // // //         ))}

// // // //         <button type="submit" className="df-submit-btn">
// // // //           Submit
// // // //         </button>
// // // //       </form>

// // // //       <button className="df-back-btn" onClick={onBack}>
// // // //         Back
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";
// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Plus,
// // //   Save,
// // //   Edit2,
// // //   Trash2,
// // //   Eye,
// // //   Copy,
// // //   Check,
// // //   FileText,
// // //   GripVertical,
// // //   ArrowUp,
// // //   ArrowDown,
// // // } from "lucide-react";

// // // // ===================== TYPES =====================
// // // type FieldType =
// // //   | "text"
// // //   | "textarea"
// // //   | "email"
// // //   | "number"
// // //   | "select"
// // //   | "radio"
// // //   | "checkbox"
// // //   | "date";

// // // interface FormField {
// // //   id: string;
// // //   type: FieldType;
// // //   label: string;
// // //   required: boolean;
// // //   placeholder?: string;
// // //   options?: string[];
// // // }

// // // interface FormSchema {
// // //   id: string;
// // //   title: string;
// // //   description?: string;
// // //   fields: FormField[];
// // //   createdAt: string;
// // //   updatedAt: string;
// // // }

// // // const generateId = () => Math.random().toString(36).slice(2, 11);

// // // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// // //   { value: "text", label: "📝 Text" },
// // //   { value: "textarea", label: "📄 Textarea" },
// // //   { value: "email", label: "📧 Email" },
// // //   { value: "number", label: "🔢 Number" },
// // //   { value: "select", label: "📋 Dropdown" },
// // //   { value: "radio", label: "◉ Radio Buttons" },
// // //   { value: "checkbox", label: "☑️ Checkbox Group" },
// // //   { value: "date", label: "📅 Date" },
// // // ];

// // // // ===================== MAIN =====================
// // // export default function FormBuilder() {
// // //   const [forms, setForms] = useState<FormSchema[]>([]);
// // //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// // //   const [previewMode, setPreviewMode] = useState(false);
// // //   const [copied, setCopied] = useState(false);
// // //   const [savedMessage, setSavedMessage] = useState(false);

// // //   // Field builder state
// // //   const [fieldType, setFieldType] = useState<FieldType>("text");
// // //   const [fieldLabel, setFieldLabel] = useState("");
// // //   const [fieldRequired, setFieldRequired] = useState(false);
// // //   const [fieldPlaceholder, setFieldPlaceholder] = useState("");
// // //   const [optionsInput, setOptionsInput] = useState("");
// // //   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     const saved = localStorage.getItem("all_forms");
// // //     if (saved) {
// // //       const parsed: FormSchema[] = JSON.parse(saved);
// // //       setForms(parsed);
// // //       if (parsed.length > 0) setActiveFormId(parsed[0].id);
// // //     }
// // //   }, []);

// // //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// // //   const showOptions = ["select", "radio", "checkbox"].includes(fieldType);

// // //   const saveToStorage = (updated: FormSchema[]) => {
// // //     setForms(updated);
// // //     localStorage.setItem("all_forms", JSON.stringify(updated));
// // //   };

// // //   const createNewForm = () => {
// // //     const newForm: FormSchema = {
// // //       id: generateId(),
// // //       title: "Untitled Form",
// // //       description: "",
// // //       fields: [],
// // //       createdAt: new Date().toISOString(),
// // //       updatedAt: new Date().toISOString(),
// // //     };
// // //     const updated = [newForm, ...forms];
// // //     saveToStorage(updated);
// // //     setActiveFormId(newForm.id);
// // //     setPreviewMode(false);
// // //     resetFieldBuilder();
// // //   };

// // //   const updateActiveForm = (updates: Partial<FormSchema>) => {
// // //     if (!activeForm) return;
// // //     const updated = forms.map((f) =>
// // //       f.id === activeForm.id
// // //         ? { ...f, ...updates, updatedAt: new Date().toISOString() }
// // //         : f
// // //     );
// // //     saveToStorage(updated);
// // //   };

// // //   const deleteForm = (id: string) => {
// // //     if (!confirm("Delete this form?")) return;
// // //     const updated = forms.filter((f) => f.id !== id);
// // //     saveToStorage(updated);
// // //     if (activeFormId === id) setActiveFormId(updated[0]?.id || null);
// // //   };

// // //   const resetFieldBuilder = () => {
// // //     setFieldType("text");
// // //     setFieldLabel("");
// // //     setFieldRequired(false);
// // //     setFieldPlaceholder("");
// // //     setOptionsInput("");
// // //     setEditingFieldId(null);
// // //   };

// // //   const addOrUpdateField = () => {
// // //     if (!activeForm) return;
// // //     if (!fieldLabel.trim()) {
// // //       alert("Field label is required");
// // //       return;
// // //     }

// // //     let options: string[] | undefined;
// // //     if (showOptions) {
// // //       options = optionsInput
// // //         .split(",")
// // //         .map((o) => o.trim())
// // //         .filter(Boolean);
// // //       if (options.length === 0) {
// // //         alert("Please provide at least one option");
// // //         return;
// // //       }
// // //     }

// // //     const newField: FormField = {
// // //       id: editingFieldId || generateId(),
// // //       type: fieldType,
// // //       label: fieldLabel.trim(),
// // //       required: fieldRequired,
// // //       placeholder: fieldPlaceholder.trim() || undefined,
// // //       options,
// // //     };

// // //     const updatedFields = editingFieldId
// // //       ? activeForm.fields.map((f) => (f.id === editingFieldId ? newField : f))
// // //       : [...activeForm.fields, newField];

// // //     updateActiveForm({ fields: updatedFields });
// // //     resetFieldBuilder();
// // //   };

// // //   const editField = (field: FormField) => {
// // //     setEditingFieldId(field.id);
// // //     setFieldType(field.type);
// // //     setFieldLabel(field.label);
// // //     setFieldRequired(field.required);
// // //     setFieldPlaceholder(field.placeholder || "");
// // //     setOptionsInput(field.options?.join(", ") || "");
// // //   };

// // //   const deleteField = (id: string) => {
// // //     if (!activeForm) return;
// // //     updateActiveForm({ fields: activeForm.fields.filter((f) => f.id !== id) });
// // //     if (editingFieldId === id) resetFieldBuilder();
// // //   };

// // //   const moveField = (index: number, direction: "up" | "down") => {
// // //     if (!activeForm) return;
// // //     const newFields = [...activeForm.fields];
// // //     const target = direction === "up" ? index - 1 : index + 1;
// // //     if (target < 0 || target >= newFields.length) return;
// // //     [newFields[index], newFields[target]] = [newFields[target], newFields[index]];
// // //     updateActiveForm({ fields: newFields });
// // //   };

// // //   const copyLink = () => {
// // //     if (!activeForm) return;
// // //     navigator.clipboard.writeText(
// // //       `${window.location.origin}/form/${activeForm.id}`
// // //     );
// // //     setCopied(true);
// // //     setTimeout(() => setCopied(false), 2000);
// // //   };

// // //   const saveForm = () => {
// // //     setSavedMessage(true);
// // //     setTimeout(() => setSavedMessage(false), 2000);
// // //   };

// // //   // Shared input styles
// // //   const inputClass =
// // //     "w-full px-3.5 py-2.5 rounded-[10px] border-[1.5px] border-slate-200 bg-[#fafbff] text-[14.5px] text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-[3px] focus:ring-indigo-500/10";
// // //   const labelClass = "block text-[13.5px] font-semibold text-slate-600 mb-1.5";
// // //   const btnGreen =
// // //     "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#16a34a] text-white text-sm font-semibold shadow-sm hover:bg-[#15803d] hover:-translate-y-0.5 transition cursor-pointer border-0";
// // //   const btnOutline =
// // //     "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] border border-slate-200 bg-white text-slate-700 text-sm font-medium shadow-sm hover:bg-slate-50 transition cursor-pointer";

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 font-sans">
// // //       <div className="max-w-[1280px] mx-auto px-6 py-7">
// // //         {/* ========== HEADER ========== */}
// // //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
// // //           <div>
// // //             <h1 className="text-[29px] font-bold text-slate-900 tracking-tight">
// // //               Form Builder
// // //             </h1>
// // //             <p className="text-sm text-slate-500 mt-1">
// // //               Create forms and share them with a link
// // //             </p>
// // //           </div>

// // //           <div className="flex flex-wrap items-center gap-2.5">
// // //             <button onClick={createNewForm} className={btnGreen}>
// // //               <Plus size={16} />
// // //               New Form
// // //             </button>

// // //             {activeForm && (
// // //               <>
// // //                 <button
// // //                   onClick={() => setPreviewMode(!previewMode)}
// // //                   className={btnOutline}
// // //                 >
// // //                   <Eye size={15} />
// // //                   {previewMode ? "Back to Edit" : "Preview"}
// // //                 </button>
// // //                 <button onClick={copyLink} className={btnOutline}>
// // //                   {copied ? (
// // //                     <Check size={15} className="text-emerald-600" />
// // //                   ) : (
// // //                     <Copy size={15} />
// // //                   )}
// // //                   {copied ? "Copied" : "Copy Link"}
// // //                 </button>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {savedMessage && (
// // //           <div className="mb-5 flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[10px] text-sm font-medium">
// // //             <Check size={16} />
// // //             Form saved successfully
// // //           </div>
// // //         )}

// // //         <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
// // //           {/* ========== SIDEBAR: FORMS LIST ========== */}
// // //           <aside>
// // //             <div className="bg-[#f8fafc] rounded-[14px] border-[1.5px] border-slate-200 p-5 sticky top-6">
// // //               <h5 className="text-sm font-semibold text-slate-800 mb-3">
// // //                 Your Forms ({forms.length})
// // //               </h5>

// // //               {forms.length === 0 ? (
// // //                 <div className="py-10 text-center">
// // //                   <FileText size={28} className="mx-auto text-slate-300 mb-3" />
// // //                   <p className="text-sm text-slate-400">No forms yet</p>
// // //                   <button
// // //                     onClick={createNewForm}
// // //                     className="mt-3 text-sm font-medium text-[#16a34a] hover:underline"
// // //                   >
// // //                     Create your first form
// // //                   </button>
// // //                 </div>
// // //               ) : (
// // //                 <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
// // //                   {forms.map((form) => (
// // //                     <div
// // //                       key={form.id}
// // //                       onClick={() => {
// // //                         setActiveFormId(form.id);
// // //                         setPreviewMode(false);
// // //                         resetFieldBuilder();
// // //                       }}
// // //                       className={`flex items-center justify-between gap-2 p-3.5 rounded-[10px] border cursor-pointer transition ${
// // //                         activeFormId === form.id
// // //                           ? "bg-emerald-50 border-[#16a34a]"
// // //                           : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
// // //                       }`}
// // //                     >
// // //                       <div className="min-w-0">
// // //                         <p className="text-[13px] font-medium text-slate-800 truncate">
// // //                           {form.title || "Untitled Form"}
// // //                         </p>
// // //                         <p className="text-xs text-slate-400 mt-0.5">
// // //                           {form.fields.length} field
// // //                           {form.fields.length !== 1 ? "s" : ""}
// // //                         </p>
// // //                       </div>
// // //                       <button
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           deleteForm(form.id);
// // //                         }}
// // //                         className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition shrink-0"
// // //                       >
// // //                         <Trash2 size={14} />
// // //                       </button>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </aside>

// // //           {/* ========== MAIN CONTENT ========== */}
// // //           <main>
// // //             {!activeForm ? (
// // //               <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-20 text-center">
// // //                 <FileText size={40} className="mx-auto text-slate-300 mb-4" />
// // //                 <p className="text-base text-slate-500 mb-5">No form selected</p>
// // //                 <button onClick={createNewForm} className={btnGreen}>
// // //                   <Plus size={16} />
// // //                   Create Form
// // //                 </button>
// // //               </div>
// // //             ) : previewMode ? (
// // //               <FormPreview
// // //                 schema={activeForm}
// // //                 onBack={() => setPreviewMode(false)}
// // //               />
// // //             ) : (
// // //               <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-7">
// // //                 {/* ===== TOP CONFIG ===== */}
// // //                 <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr] gap-4 mb-6 items-end">
// // //                   <div>
// // //                     <label className={labelClass}>Form Name</label>
// // //                     <input
// // //                       type="text"
// // //                       value={activeForm.title}
// // //                       onChange={(e) =>
// // //                         updateActiveForm({ title: e.target.value })
// // //                       }
// // //                       className={inputClass}
// // //                       placeholder="e.g. Employee Survey"
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className={labelClass}>Description (optional)</label>
// // //                     <input
// // //                       type="text"
// // //                       value={activeForm.description || ""}
// // //                       onChange={(e) =>
// // //                         updateActiveForm({ description: e.target.value })
// // //                       }
// // //                       className={inputClass}
// // //                       placeholder="Short description..."
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 {/* Shareable link */}
// // //                 <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-[10px] border border-slate-200">
// // //                   <div className="min-w-0">
// // //                     <p className="text-xs font-medium text-slate-500 mb-0.5">
// // //                       Shareable link
// // //                     </p>
// // //                     <p className="text-sm font-mono text-[#16a34a] truncate">
// // //                       {typeof window !== "undefined"
// // //                         ? `${window.location.origin}/form/${activeForm.id}`
// // //                         : `/form/${activeForm.id}`}
// // //                     </p>
// // //                   </div>
// // //                   <button onClick={copyLink} className={btnOutline}>
// // //                     {copied ? (
// // //                       <Check size={14} className="text-emerald-600" />
// // //                     ) : (
// // //                       <Copy size={14} />
// // //                     )}
// // //                     {copied ? "Copied" : "Copy"}
// // //                   </button>
// // //                 </div>

// // //                 {/* ===== BUILDER: Left + Right ===== */}
// // //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //                   {/* LEFT: Add Field */}
// // //                   <div className="bg-black/[0.03] rounded-[14px] p-6">
// // //                     <h4 className="text-base font-semibold text-indigo-600 mb-1">
// // //                       Add Form Fields
// // //                     </h4>
// // //                     <p className="text-sm text-slate-500 mb-4">
// // //                       Configure fields for your form
// // //                     </p>

// // //                     <div className="space-y-3.5">
// // //                       <div>
// // //                         <label className={labelClass}>Field Type</label>
// // //                         <select
// // //                           value={fieldType}
// // //                           onChange={(e) =>
// // //                             setFieldType(e.target.value as FieldType)
// // //                           }
// // //                           className={inputClass}
// // //                         >
// // //                           {FIELD_TYPES.map((t) => (
// // //                             <option key={t.value} value={t.value}>
// // //                               {t.label}
// // //                             </option>
// // //                           ))}
// // //                         </select>
// // //                       </div>

// // //                       <div>
// // //                         <label className={labelClass}>Field Label</label>
// // //                         <input
// // //                           type="text"
// // //                           value={fieldLabel}
// // //                           onChange={(e) => setFieldLabel(e.target.value)}
// // //                           className={inputClass}
// // //                           placeholder="e.g. Your Name"
// // //                         />
// // //                       </div>

// // //                       <div>
// // //                         <label className={labelClass}>
// // //                           Placeholder (optional)
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={fieldPlaceholder}
// // //                           onChange={(e) => setFieldPlaceholder(e.target.value)}
// // //                           className={inputClass}
// // //                           placeholder="e.g. Enter your full name"
// // //                         />
// // //                       </div>

// // //                       {showOptions && (
// // //                         <div>
// // //                           <label className={labelClass}>
// // //                             Options (comma separated)
// // //                           </label>
// // //                           <input
// // //                             type="text"
// // //                             value={optionsInput}
// // //                             onChange={(e) => setOptionsInput(e.target.value)}
// // //                             className={inputClass}
// // //                             placeholder="Option 1, Option 2, Option 3"
// // //                           />
// // //                         </div>
// // //                       )}

// // //                       <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={fieldRequired}
// // //                           onChange={(e) => setFieldRequired(e.target.checked)}
// // //                           className="rounded border-slate-300 text-[#16a34a] focus:ring-emerald-400"
// // //                         />
// // //                         Required Field
// // //                       </label>

// // //                       <button
// // //                         onClick={addOrUpdateField}
// // //                         className={`${btnGreen} w-full mt-1`}
// // //                       >
// // //                         {editingFieldId ? (
// // //                           <>
// // //                             <Edit2 size={16} />
// // //                             Update Field
// // //                           </>
// // //                         ) : (
// // //                           <>
// // //                             <Plus size={16} />
// // //                             Add Field
// // //                           </>
// // //                         )}
// // //                       </button>

// // //                       {editingFieldId && (
// // //                         <button
// // //                           onClick={resetFieldBuilder}
// // //                           className="w-full text-sm text-slate-500 hover:text-slate-700 py-1"
// // //                         >
// // //                           Cancel editing
// // //                         </button>
// // //                       )}
// // //                     </div>
// // //                   </div>

// // //                   {/* RIGHT: Added Fields */}
// // //                   <div className="bg-[#f8fafc] rounded-[14px] border-[1.5px] border-slate-200 p-6">
// // //                     <h5 className="text-sm font-semibold text-slate-800 mb-3">
// // //                       Added Fields ({activeForm.fields.length})
// // //                     </h5>

// // //                     {activeForm.fields.length === 0 ? (
// // //                       <p className="text-sm text-slate-400 text-center py-14">
// // //                         No fields added yet
// // //                       </p>
// // //                     ) : (
// // //                       <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
// // //                         {activeForm.fields.map((field, index) => (
// // //                           <div
// // //                             key={field.id}
// // //                             className="flex items-center gap-3 p-3.5 bg-white rounded-[10px] border border-slate-200 hover:border-slate-300 hover:shadow-sm transition"
// // //                           >
// // //                             <div className="text-slate-300 shrink-0">
// // //                               <GripVertical size={16} />
// // //                             </div>

// // //                             <div className="min-w-0 flex-1">
// // //                               <div className="flex items-center gap-2 flex-wrap">
// // //                                 <span className="text-[13px] font-medium text-slate-800">
// // //                                   {field.label}
// // //                                 </span>
// // //                                 <span className="text-xs text-slate-400">
// // //                                   ({field.type})
// // //                                 </span>
// // //                                 {field.required && (
// // //                                   <span className="text-xs text-red-500 font-medium">
// // //                                     *
// // //                                   </span>
// // //                                 )}
// // //                               </div>
// // //                               {field.options && (
// // //                                 <p className="text-xs text-slate-400 mt-0.5 truncate">
// // //                                   {field.options.join(", ")}
// // //                                 </p>
// // //                               )}
// // //                             </div>

// // //                             <div className="flex items-center gap-1 shrink-0">
// // //                               <button
// // //                                 onClick={() => moveField(index, "up")}
// // //                                 disabled={index === 0}
// // //                                 className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition"
// // //                               >
// // //                                 <ArrowUp size={14} />
// // //                               </button>
// // //                               <button
// // //                                 onClick={() => moveField(index, "down")}
// // //                                 disabled={
// // //                                   index === activeForm.fields.length - 1
// // //                                 }
// // //                                 className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition"
// // //                               >
// // //                                 <ArrowDown size={14} />
// // //                               </button>
// // //                               <button
// // //                                 onClick={() => editField(field)}
// // //                                 className="p-1.5 rounded-lg bg-[#16a34a] text-white hover:bg-[#15803d] transition"
// // //                                 title="Edit"
// // //                               >
// // //                                 <Edit2 size={14} />
// // //                               </button>
// // //                               <button
// // //                                 onClick={() => deleteField(field.id)}
// // //                                 className="p-1.5 rounded-lg bg-[#16a34a] text-white hover:bg-[#15803d] transition"
// // //                                 title="Delete"
// // //                               >
// // //                                 <Trash2 size={14} />
// // //                               </button>
// // //                             </div>
// // //                           </div>
// // //                         ))}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* Save button */}
// // //                 <div className="mt-6 flex justify-end">
// // //                   <button onClick={saveForm} className={btnGreen}>
// // //                     <Save size={17} />
// // //                     Save Form
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </main>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ===================== PREVIEW =====================
// // // function FormPreview({
// // //   schema,
// // //   onBack,
// // // }: {
// // //   schema: FormSchema;
// // //   onBack: () => void;
// // // }) {
// // //   const [values, setValues] = useState<Record<string, any>>({});
// // //   const [submitted, setSubmitted] = useState(false);

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     localStorage.setItem(
// // //       `form_response_${schema.id}_${Date.now()}`,
// // //       JSON.stringify({
// // //         formId: schema.id,
// // //         formTitle: schema.title,
// // //         values,
// // //         submittedAt: new Date().toISOString(),
// // //       })
// // //     );
// // //     setSubmitted(true);
// // //   };

// // //   const inputClass =
// // //     "w-full px-4 py-3.5 rounded-[10px] border-2 border-slate-300 bg-white text-[15px] text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 box-border";

// // //   if (submitted) {
// // //     return (
// // //       <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-10 max-w-[900px] mx-auto">
// // //         <div className="text-center py-8">
// // //           <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// // //             <Check size={28} className="text-emerald-600" />
// // //           </div>
// // //           <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank you!</h2>
// // //           <p className="text-slate-500 text-sm">
// // //             Your response has been recorded.
// // //           </p>
// // //           <button
// // //             onClick={() => {
// // //               setSubmitted(false);
// // //               setValues({});
// // //             }}
// // //             className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-[#16a34a] text-white text-sm font-semibold hover:bg-[#15803d] transition shadow-[0_4px_15px_rgba(22,163,74,0.3)]"
// // //           >
// // //             Submit another response
// // //           </button>
// // //         </div>
// // //         <div className="text-center mt-4">
// // //           <button
// // //             onClick={onBack}
// // //             className="px-5 py-2.5 rounded-lg bg-slate-500 text-white text-sm font-medium hover:bg-slate-600 transition"
// // //           >
// // //             Back
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-10 sm:px-12 max-w-[900px] mx-auto">
// // //       <h2 className="text-[26px] font-bold text-slate-900 text-center mb-2">
// // //         {schema.title}
// // //       </h2>
// // //       {schema.description && (
// // //         <p className="text-slate-500 text-sm text-center mb-8">
// // //           {schema.description}
// // //         </p>
// // //       )}

// // //       <form onSubmit={handleSubmit} className="max-w-[820px] mx-auto space-y-7">
// // //         {schema.fields.map((field) => (
// // //           <div
// // //             key={field.id}
// // //             className="flex flex-col gap-2 bg-[#fafcff] p-[18px_20px] rounded-xl border-[1.5px] border-slate-200 transition hover:border-indigo-400 hover:bg-[#f8faff] hover:shadow-[0_2px_8px_rgba(99,102,241,0.08)]"
// // //           >
// // //             <label className="text-[15px] font-semibold text-slate-800 flex items-center gap-1.5">
// // //               {field.label}
// // //               {field.required && (
// // //                 <span className="text-red-500 text-base">*</span>
// // //               )}
// // //             </label>

// // //             {field.type === "textarea" ? (
// // //               <textarea
// // //                 required={field.required}
// // //                 value={values[field.id] || ""}
// // //                 onChange={(e) =>
// // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // //                 }
// // //                 placeholder={field.placeholder}
// // //                 className={`${inputClass} min-h-[110px] resize-y`}
// // //                 rows={4}
// // //               />
// // //             ) : field.type === "select" ? (
// // //               <select
// // //                 required={field.required}
// // //                 value={values[field.id] || ""}
// // //                 onChange={(e) =>
// // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // //                 }
// // //                 className={inputClass}
// // //               >
// // //                 <option value="">-- Select --</option>
// // //                 {field.options?.map((opt) => (
// // //                   <option key={opt} value={opt}>
// // //                     {opt}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             ) : field.type === "radio" ? (
// // //               <div className="flex flex-col gap-3 mt-1.5">
// // //                 {field.options?.map((opt) => (
// // //                   <label
// // //                     key={opt}
// // //                     className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer border border-transparent hover:bg-[#f0f4ff] hover:border-indigo-200 transition text-sm text-slate-700"
// // //                   >
// // //                     <input
// // //                       type="radio"
// // //                       name={field.id}
// // //                       value={opt}
// // //                       required={field.required}
// // //                       checked={values[field.id] === opt}
// // //                       onChange={() =>
// // //                         setValues((p) => ({ ...p, [field.id]: opt }))
// // //                       }
// // //                       className="w-[18px] h-[18px] accent-indigo-500"
// // //                     />
// // //                     {opt}
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             ) : field.type === "checkbox" ? (
// // //               <div className="flex flex-col gap-3 mt-1.5">
// // //                 {field.options?.map((opt) => (
// // //                   <label
// // //                     key={opt}
// // //                     className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer border border-transparent hover:bg-[#f0f4ff] hover:border-indigo-200 transition text-sm text-slate-700"
// // //                   >
// // //                     <input
// // //                       type="checkbox"
// // //                       value={opt}
// // //                       checked={(values[field.id] || []).includes(opt)}
// // //                       onChange={(e) => {
// // //                         const current: string[] = values[field.id] || [];
// // //                         const next = e.target.checked
// // //                           ? [...current, opt]
// // //                           : current.filter((v) => v !== opt);
// // //                         setValues((p) => ({ ...p, [field.id]: next }));
// // //                       }}
// // //                       className="w-[18px] h-[18px] rounded accent-indigo-500"
// // //                     />
// // //                     {opt}
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             ) : (
// // //               <input
// // //                 type={field.type}
// // //                 required={field.required}
// // //                 value={values[field.id] || ""}
// // //                 onChange={(e) =>
// // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // //                 }
// // //                 placeholder={field.placeholder}
// // //                 className={inputClass}
// // //               />
// // //             )}
// // //           </div>
// // //         ))}

// // //         <div className="flex flex-col items-center gap-4 pt-2">
// // //           <button
// // //             type="submit"
// // //             className="w-full max-w-xs py-3.5 rounded-[10px] bg-gradient-to-br from-[#16a34a] to-[#15803d] text-white text-base font-semibold shadow-[0_4px_15px_rgba(22,163,74,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(22,163,74,0.4)] transition"
// // //           >
// // //             Submmit
// // //           </button>
// // //           <button
// // //             type="button"
// // //             onClick={onBack}
// // //             className="px-5 py-2.5 rounded-lg bg-slate-500 text-white text-sm font-medium hover:bg-slate-600 transition"
// // //           >
// // //             Bacck
// // //           </button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // "use client";
// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Plus,
// // //   Save,
// // //   Edit2,
// // //   Trash2,
// // //   Eye,
// // //   Copy,
// // //   Check,
// // //   FileText,
// // //   GripVertical,
// // //   ArrowUp,
// // //   ArrowDown,
// // // } from "lucide-react";

// // // // ===================== TYPES =====================
// // // type FieldType =
// // //   | "text"
// // //   | "textarea"
// // //   | "email"
// // //   | "number"
// // //   | "select"
// // //   | "radio"
// // //   | "checkbox"
// // //   | "date";

// // // interface FormField {
// // //   id: string;
// // //   type: FieldType;
// // //   label: string;
// // //   required: boolean;
// // //   placeholder?: string;
// // //   options?: string[];
// // // }

// // // interface FormSchema {
// // //   id: string;
// // //   title: string;
// // //   description?: string;
// // //   fields: FormField[];
// // //   createdAt: string;
// // //   updatedAt: string;
// // // }

// // // // ===================== CONSTANTS =====================
// // // const generateId = () => Math.random().toString(36).slice(2, 11);

// // // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// // //   { value: "text", label: "📝 Text" },
// // //   { value: "textarea", label: "📄 Textarea" },
// // //   { value: "email", label: "📧 Email" },
// // //   { value: "number", label: "🔢 Number" },
// // //   { value: "select", label: "📋 Dropdown" },
// // //   { value: "radio", label: "◉ Radio Buttons" },
// // //   { value: "checkbox", label: "☑️ Checkbox Group" },
// // //   { value: "date", label: "📅 Date" },
// // // ];

// // // // ===================== MAIN COMPONENT =====================
// // // export default function FormBuilder() {
// // //   const [forms, setForms] = useState<FormSchema[]>([]);
// // //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// // //   const [previewMode, setPreviewMode] = useState(false);
// // //   const [copied, setCopied] = useState(false);
// // //   const [savedMessage, setSavedMessage] = useState(false);

// // //   // Field builder
// // //   const [fieldType, setFieldType] = useState<FieldType>("text");
// // //   const [fieldLabel, setFieldLabel] = useState("");
// // //   const [fieldRequired, setFieldRequired] = useState(false);
// // //   const [fieldPlaceholder, setFieldPlaceholder] = useState("");
// // //   const [optionsInput, setOptionsInput] = useState("");
// // //   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

// // //   // Load forms
// // //   useEffect(() => {
// // //     const saved = localStorage.getItem("all_forms");
// // //     if (saved) {
// // //       const parsed: FormSchema[] = JSON.parse(saved);
// // //       setForms(parsed);
// // //       if (parsed.length > 0) setActiveFormId(parsed[0].id);
// // //     }
// // //   }, []);

// // //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// // //   const showOptions = ["select", "radio", "checkbox"].includes(fieldType);

// // //   // ===================== HELPERS =====================
// // //   const saveToStorage = (updated: FormSchema[]) => {
// // //     setForms(updated);
// // //     localStorage.setItem("all_forms", JSON.stringify(updated));
// // //   };

// // //   const createNewForm = () => {
// // //     const newForm: FormSchema = {
// // //       id: generateId(),
// // //       title: "Untitled Form",
// // //       description: "",
// // //       fields: [],
// // //       createdAt: new Date().toISOString(),
// // //       updatedAt: new Date().toISOString(),
// // //     };
// // //     saveToStorage([newForm, ...forms]);
// // //     setActiveFormId(newForm.id);
// // //     setPreviewMode(false);
// // //     resetFieldBuilder();
// // //   };

// // //   const updateActiveForm = (updates: Partial<FormSchema>) => {
// // //     if (!activeForm) return;
// // //     const updated = forms.map((f) =>
// // //       f.id === activeForm.id
// // //         ? { ...f, ...updates, updatedAt: new Date().toISOString() }
// // //         : f
// // //     );
// // //     saveToStorage(updated);
// // //   };

// // //   const deleteForm = (id: string) => {
// // //     if (!confirm("Delete this form?")) return;
// // //     const updated = forms.filter((f) => f.id !== id);
// // //     saveToStorage(updated);
// // //     if (activeFormId === id) setActiveFormId(updated[0]?.id || null);
// // //   };

// // //   const resetFieldBuilder = () => {
// // //     setFieldType("text");
// // //     setFieldLabel("");
// // //     setFieldRequired(false);
// // //     setFieldPlaceholder("");
// // //     setOptionsInput("");
// // //     setEditingFieldId(null);
// // //   };

// // //   const addOrUpdateField = () => {
// // //     if (!activeForm || !fieldLabel.trim()) {
// // //       alert("Field label is required");
// // //       return;
// // //     }

// // //     let options: string[] | undefined;
// // //     if (showOptions) {
// // //       options = optionsInput
// // //         .split(",")
// // //         .map((o) => o.trim())
// // //         .filter(Boolean);
// // //       if (options.length === 0) {
// // //         alert("Please provide at least one option");
// // //         return;
// // //       }
// // //     }

// // //     const newField: FormField = {
// // //       id: editingFieldId || generateId(),
// // //       type: fieldType,
// // //       label: fieldLabel.trim(),
// // //       required: fieldRequired,
// // //       placeholder: fieldPlaceholder.trim() || undefined,
// // //       options,
// // //     };

// // //     const updatedFields = editingFieldId
// // //       ? activeForm.fields.map((f) => (f.id === editingFieldId ? newField : f))
// // //       : [...activeForm.fields, newField];

// // //     updateActiveForm({ fields: updatedFields });
// // //     resetFieldBuilder();
// // //   };

// // //   const editField = (field: FormField) => {
// // //     setEditingFieldId(field.id);
// // //     setFieldType(field.type);
// // //     setFieldLabel(field.label);
// // //     setFieldRequired(field.required);
// // //     setFieldPlaceholder(field.placeholder || "");
// // //     setOptionsInput(field.options?.join(", ") || "");
// // //   };

// // //   const deleteField = (id: string) => {
// // //     if (!activeForm) return;
// // //     updateActiveForm({ fields: activeForm.fields.filter((f) => f.id !== id) });
// // //     if (editingFieldId === id) resetFieldBuilder();
// // //   };

// // //   const moveField = (index: number, direction: "up" | "down") => {
// // //     if (!activeForm) return;
// // //     const newFields = [...activeForm.fields];
// // //     const target = direction === "up" ? index - 1 : index + 1;
// // //     if (target < 0 || target >= newFields.length) return;
// // //     [newFields[index], newFields[target]] = [
// // //       newFields[target],
// // //       newFields[index],
// // //     ];
// // //     updateActiveForm({ fields: newFields });
// // //   };

// // //   const copyLink = () => {
// // //     if (!activeForm) return;
// // //     navigator.clipboard.writeText(
// // //       `${window.location.origin}/form/${activeForm.id}`
// // //     );
// // //     setCopied(true);
// // //     setTimeout(() => setCopied(false), 2000);
// // //   };

// // //   const saveForm = () => {
// // //     setSavedMessage(true);
// // //     setTimeout(() => setSavedMessage(false), 2000);
// // //   };

// // //   // ===================== RENDER =====================
// // //   return (
// // //     <section className="min-h-screen bg-slate-50 py-10 sm:py-14">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
// // //           <div>
// // //             <span className="text-purple-600 font-semibold uppercase tracking-widest text-sm">
// // //               Form Management
// // //             </span>
// // //             <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
// // //               Form Builder
// // //             </h1>
// // //             <p className="mt-2 text-slate-600 text-base sm:text-lg">
// // //               Create forms and share them with a link
// // //             </p>
// // //           </div>

// // //           <div className="flex flex-wrap gap-3">
// // //             <button
// // //               onClick={createNewForm}
// // //               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// // //             >
// // //               <Plus size={16} />
// // //               New Form
// // //             </button>

// // //             {activeForm && (
// // //               <>
// // //                 <button
// // //                   onClick={() => setPreviewMode(!previewMode)}
// // //                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// // //                 >
// // //                   <Eye size={15} />
// // //                   {previewMode ? "Back to Edit" : "Preview"}
// // //                 </button>
// // //                 <button
// // //                   onClick={copyLink}
// // //                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// // //                 >
// // //                   {copied ? (
// // //                     <Check size={15} className="text-emerald-600" />
// // //                   ) : (
// // //                     <Copy size={15} />
// // //                   )}
// // //                   {copied ? "Copied" : "Copy Link"}
// // //                 </button>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Saved message */}
// // //         {savedMessage && (
// // //           <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
// // //             <Check size={16} />
// // //             Form saved successfully
// // //           </div>
// // //         )}

// // //         {/* Main grid */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
// // //           {/* Sidebar - Forms list */}
// // //           <aside className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 h-fit sticky top-6">
// // //             <h3 className="text-sm font-semibold text-slate-900 mb-4">
// // //               Your Forms ({forms.length})
// // //             </h3>

// // //             {forms.length === 0 ? (
// // //               <div className="py-10 text-center">
// // //                 <FileText size={28} className="mx-auto text-slate-300 mb-3" />
// // //                 <p className="text-sm text-slate-400">No forms yet</p>
// // //                 <button
// // //                   onClick={createNewForm}
// // //                   className="mt-3 text-sm font-medium text-purple-600 hover:underline"
// // //                 >
// // //                   Create your first form
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               <div className="space-y-2 max-h-[70vh] overflow-y-auto">
// // //                 {forms.map((form) => (
// // //                   <div
// // //                     key={form.id}
// // //                     onClick={() => {
// // //                       setActiveFormId(form.id);
// // //                       setPreviewMode(false);
// // //                       resetFieldBuilder();
// // //                     }}
// // //                     className={`flex items-center justify-between gap-2 p-3.5 rounded-xl cursor-pointer transition border ${
// // //                       activeFormId === form.id
// // //                         ? "bg-purple-50 border-purple-300"
// // //                         : "bg-slate-50 border-transparent hover:bg-slate-100"
// // //                     }`}
// // //                   >
// // //                     <div className="min-w-0">
// // //                       <p className="text-sm font-medium text-slate-900 truncate">
// // //                         {form.title || "Untitled Form"}
// // //                       </p>
// // //                       <p className="text-xs text-slate-400 mt-0.5">
// // //                         {form.fields.length} field
// // //                         {form.fields.length !== 1 ? "s" : ""}
// // //                       </p>
// // //                     </div>
// // //                     <button
// // //                       onClick={(e) => {
// // //                         e.stopPropagation();
// // //                         deleteForm(form.id);
// // //                       }}
// // //                       className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
// // //                     >
// // //                       <Trash2 size={14} />
// // //                     </button>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </aside>

// // //           {/* Main content */}
// // //           <div>
// // //             {!activeForm ? (
// // //               <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
// // //                 <FileText size={40} className="mx-auto text-slate-300 mb-4" />
// // //                 <p className="text-lg text-slate-500 mb-5">No form selected</p>
// // //                 <button
// // //                   onClick={createNewForm}
// // //                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// // //                 >
// // //                   <Plus size={16} />
// // //                   Create Form
// // //                 </button>
// // //               </div>
// // //             ) : previewMode ? (
// // //               <FormPreview
// // //                 schema={activeForm}
// // //                 onBack={() => setPreviewMode(false)}
// // //               />
// // //             ) : (
// // //               <div className="space-y-6">
// // //                 {/* Form config */}
// // //                 <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// // //                     <div>
// // //                       <label className="block text-sm font-semibold text-slate-700 mb-2">
// // //                         Form Name
// // //                       </label>
// // //                       <input
// // //                         type="text"
// // //                         value={activeForm.title}
// // //                         onChange={(e) =>
// // //                           updateActiveForm({ title: e.target.value })
// // //                         }
// // //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// // //                         placeholder="e.g. Employee Survey"
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-semibold text-slate-700 mb-2">
// // //                         Description (optional)
// // //                       </label>
// // //                       <input
// // //                         type="text"
// // //                         value={activeForm.description || ""}
// // //                         onChange={(e) =>
// // //                           updateActiveForm({ description: e.target.value })
// // //                         }
// // //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// // //                         placeholder="Short description..."
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Shareable link */}
// // //                   <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
// // //                     <div className="min-w-0">
// // //                       <p className="text-xs font-medium text-slate-500 mb-0.5">
// // //                         Shareable link
// // //                       </p>
// // //                       <p className="text-sm font-mono text-purple-600 truncate">
// // //                         {typeof window !== "undefined"
// // //                           ? `${window.location.origin}/form/${activeForm.id}`
// // //                           : `/form/${activeForm.id}`}
// // //                       </p>
// // //                     </div>
// // //                     <button
// // //                       onClick={copyLink}
// // //                       className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// // //                     >
// // //                       {copied ? (
// // //                         <Check size={14} className="text-emerald-600" />
// // //                       ) : (
// // //                         <Copy size={14} />
// // //                       )}
// // //                       {copied ? "Copied" : "Copy"}
// // //                     </button>
// // //                   </div>
// // //                 </div>

// // //                 {/* Builder */}
// // //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //                   {/* Add field */}
// // //                   <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
// // //                     <h3 className="text-lg font-bold text-slate-900 mb-1">
// // //                       Add Form Fields
// // //                     </h3>
// // //                     <p className="text-sm text-slate-500 mb-6">
// // //                       Configure fields for your form
// // //                     </p>

// // //                     <div className="space-y-4">
// // //                       <div>
// // //                         <label className="block text-sm font-semibold text-slate-700 mb-2">
// // //                           Field Type
// // //                         </label>
// // //                         <select
// // //                           value={fieldType}
// // //                           onChange={(e) =>
// // //                             setFieldType(e.target.value as FieldType)
// // //                           }
// // //                           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// // //                         >
// // //                           {FIELD_TYPES.map((t) => (
// // //                             <option key={t.value} value={t.value}>
// // //                               {t.label}
// // //                             </option>
// // //                           ))}
// // //                         </select>
// // //                       </div>

// // //                       <div>
// // //                         <label className="block text-sm font-semibold text-slate-700 mb-2">
// // //                           Field Label
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={fieldLabel}
// // //                           onChange={(e) => setFieldLabel(e.target.value)}
// // //                           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// // //                           placeholder="e.g. Your Name"
// // //                         />
// // //                       </div>

// // //                       <div>
// // //                         <label className="block text-sm font-semibold text-slate-700 mb-2">
// // //                           Placeholder (optional)
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={fieldPlaceholder}
// // //                           onChange={(e) => setFieldPlaceholder(e.target.value)}
// // //                           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// // //                           placeholder="e.g. Enter your full name"
// // //                         />
// // //                       </div>

// // //                       {showOptions && (
// // //                         <div>
// // //                           <label className="block text-sm font-semibold text-slate-700 mb-2">
// // //                             Options (comma separated)
// // //                           </label>
// // //                           <input
// // //                             type="text"
// // //                             value={optionsInput}
// // //                             onChange={(e) => setOptionsInput(e.target.value)}
// // //                             className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// // //                             placeholder="Option 1, Option 2, Option 3"
// // //                           />
// // //                         </div>
// // //                       )}

// // //                       <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={fieldRequired}
// // //                           onChange={(e) => setFieldRequired(e.target.checked)}
// // //                           className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
// // //                         />
// // //                         Required Field
// // //                       </label>

// // //                       <button
// // //                         onClick={addOrUpdateField}
// // //                         className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// // //                       >
// // //                         {editingFieldId ? (
// // //                           <>
// // //                             <Edit2 size={16} />
// // //                             Update Field
// // //                           </>
// // //                         ) : (
// // //                           <>
// // //                             <Plus size={16} />
// // //                             Add Field
// // //                           </>
// // //                         )}
// // //                       </button>

// // //                       {editingFieldId && (
// // //                         <button
// // //                           onClick={resetFieldBuilder}
// // //                           className="w-full text-sm text-slate-500 hover:text-slate-700"
// // //                         >
// // //                           Cancel editing
// // //                         </button>
// // //                       )}
// // //                     </div>
// // //                   </div>

// // //                   {/* Added fields */}
// // //                   <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
// // //                     <h3 className="text-lg font-bold text-slate-900 mb-4">
// // //                       Added Fields ({activeForm.fields.length})
// // //                     </h3>

// // //                     {activeForm.fields.length === 0 ? (
// // //                       <div className="py-14 text-center border-2 border-dashed border-slate-200 rounded-xl">
// // //                         <p className="text-sm text-slate-400">
// // //                           No fields added yet
// // //                         </p>
// // //                       </div>
// // //                     ) : (
// // //                       <div className="space-y-3 max-h-[420px] overflow-y-auto">
// // //                         {activeForm.fields.map((field, index) => (
// // //                           <div
// // //                             key={field.id}
// // //                             className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
// // //                           >
// // //                             <GripVertical
// // //                               size={16}
// // //                               className="text-slate-300 shrink-0"
// // //                             />

// // //                             <div className="min-w-0 flex-1">
// // //                               <div className="flex items-center gap-2 flex-wrap">
// // //                                 <span className="text-sm font-medium text-slate-900">
// // //                                   {field.label}
// // //                                 </span>
// // //                                 <span className="text-xs text-slate-400">
// // //                                   ({field.type})
// // //                                 </span>
// // //                                 {field.required && (
// // //                                   <span className="text-xs text-red-500 font-medium">
// // //                                     *
// // //                                   </span>
// // //                                 )}
// // //                               </div>
// // //                               {field.options && (
// // //                                 <p className="text-xs text-slate-400 mt-0.5 truncate">
// // //                                   {field.options.join(", ")}
// // //                                 </p>
// // //                               )}
// // //                             </div>

// // //                             <div className="flex items-center gap-1 shrink-0">
// // //                               <button
// // //                                 onClick={() => moveField(index, "up")}
// // //                                 disabled={index === 0}
// // //                                 className="p-1.5 rounded-lg text-slate-400 hover:bg-white disabled:opacity-30 transition"
// // //                               >
// // //                                 <ArrowUp size={14} />
// // //                               </button>
// // //                               <button
// // //                                 onClick={() => moveField(index, "down")}
// // //                                 disabled={
// // //                                   index === activeForm.fields.length - 1
// // //                                 }
// // //                                 className="p-1.5 rounded-lg text-slate-400 hover:bg-white disabled:opacity-30 transition"
// // //                               >
// // //                                 <ArrowDown size={14} />
// // //                               </button>
// // //                               <button
// // //                                 onClick={() => editField(field)}
// // //                                 className="p-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
// // //                               >
// // //                                 <Edit2 size={14} />
// // //                               </button>
// // //                               <button
// // //                                 onClick={() => deleteField(field.id)}
// // //                                 className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
// // //                               >
// // //                                 <Trash2 size={14} />
// // //                               </button>
// // //                             </div>
// // //                           </div>
// // //                         ))}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* Save */}
// // //                 <div className="flex justify-end">
// // //                   <button
// // //                     onClick={saveForm}
// // //                     className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition shadow-sm"
// // //                   >
// // //                     <Save size={17} />
// // //                     Save Form
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // // ===================== PREVIEW =====================
// // // function FormPreview({
// // //   schema,
// // //   onBack,
// // // }: {
// // //   schema: FormSchema;
// // //   onBack: () => void;
// // // }) {
// // //   const [values, setValues] = useState<Record<string, any>>({});
// // //   const [submitted, setSubmitted] = useState(false);

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     localStorage.setItem(
// // //       `form_response_${schema.id}_${Date.now()}`,
// // //       JSON.stringify({
// // //         formId: schema.id,
// // //         formTitle: schema.title,
// // //         values,
// // //         submittedAt: new Date().toISOString(),
// // //       })
// // //     );
// // //     setSubmitted(true);
// // //   };

// // //   if (submitted) {
// // //     return (
// // //       <div className="bg-white rounded-2xl border border-slate-200 p-10 sm:p-14 text-center">
// // //         <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// // //           <Check size={28} className="text-emerald-600" />
// // //         </div>
// // //         <h2 className="text-2xl font-bold text-slate-900">Thank you!</h2>
// // //         <p className="text-slate-500 mt-2 text-sm">
// // //           Your response has been recorded.
// // //         </p>
// // //         <button
// // //           onClick={() => {
// // //             setSubmitted(false);
// // //             setValues({});
// // //           }}
// // //           className="mt-7 inline-flex px-6 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// // //         >
// // //           Submit another response
// // //         </button>
// // //         <div className="mt-4">
// // //           <button
// // //             onClick={onBack}
// // //             className="text-sm text-slate-500 hover:text-slate-700"
// // //           >
// // //             Back to editor
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
// // //       {/* Header */}
// // //       <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-slate-100 text-center">
// // //         <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
// // //           {schema.title}
// // //         </h2>
// // //         {schema.description && (
// // //           <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
// // //             {schema.description}
// // //           </p>
// // //         )}
// // //       </div>

// // //       <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6 max-w-2xl mx-auto">
// // //         {schema.fields.map((field) => (
// // //           <div key={field.id}>
// // //             <label className="block text-sm font-semibold text-slate-800 mb-2">
// // //               {field.label}
// // //               {field.required && (
// // //                 <span className="text-red-500 ml-1">*</span>
// // //               )}
// // //             </label>

// // //             {field.type === "textarea" ? (
// // //               <textarea
// // //                 required={field.required}
// // //                 value={values[field.id] || ""}
// // //                 onChange={(e) =>
// // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // //                 }
// // //                 placeholder={field.placeholder}
// // //                 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-y"
// // //                 rows={4}
// // //               />
// // //             ) : field.type === "select" ? (
// // //               <select
// // //                 required={field.required}
// // //                 value={values[field.id] || ""}
// // //                 onChange={(e) =>
// // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // //                 }
// // //                 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// // //               >
// // //                 <option value="">-- Select --</option>
// // //                 {field.options?.map((opt) => (
// // //                   <option key={opt} value={opt}>
// // //                     {opt}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             ) : field.type === "radio" ? (
// // //               <div className="space-y-2.5">
// // //                 {field.options?.map((opt) => (
// // //                   <label
// // //                     key={opt}
// // //                     className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// // //                   >
// // //                     <input
// // //                       type="radio"
// // //                       name={field.id}
// // //                       value={opt}
// // //                       required={field.required}
// // //                       checked={values[field.id] === opt}
// // //                       onChange={() =>
// // //                         setValues((p) => ({ ...p, [field.id]: opt }))
// // //                       }
// // //                       className="accent-purple-600"
// // //                     />
// // //                     {opt}
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             ) : field.type === "checkbox" ? (
// // //               <div className="space-y-2.5">
// // //                 {field.options?.map((opt) => (
// // //                   <label
// // //                     key={opt}
// // //                     className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// // //                   >
// // //                     <input
// // //                       type="checkbox"
// // //                       value={opt}
// // //                       checked={(values[field.id] || []).includes(opt)}
// // //                       onChange={(e) => {
// // //                         const current: string[] = values[field.id] || [];
// // //                         const next = e.target.checked
// // //                           ? [...current, opt]
// // //                           : current.filter((v) => v !== opt);
// // //                         setValues((p) => ({ ...p, [field.id]: next }));
// // //                       }}
// // //                       className="rounded accent-purple-600"
// // //                     />
// // //                     {opt}
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             ) : (
// // //               <input
// // //                 type={field.type}
// // //                 required={field.required}
// // //                 value={values[field.id] || ""}
// // //                 onChange={(e) =>
// // //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// // //                 }
// // //                 placeholder={field.placeholder}
// // //                 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// // //               />
// // //             )}
// // //           </div>
// // //         ))}

// // //         <button
// // //           type="submit"
// // //           className="w-full py-3.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// // //         >
// // //           Submit
// // //         </button>
// // //       </form>

// // //       <div className="px-6 sm:px-10 pb-8 text-center">
// // //         <button
// // //           onClick={onBack}
// // //           className="text-sm text-slate-500 hover:text-slate-700"
// // //         >
// // //           ← Back to editor
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import {
// //   Plus,
// //   Save,
// //   Edit2,
// //   Trash2,
// //   Eye,
// //   Copy,
// //   Check,
// //   FileText,
// //   GripVertical,
// //   ArrowUp,
// //   ArrowDown,
// // } from "lucide-react";

// // // ===================== TYPES =====================
// // type FieldType =
// //   | "text"
// //   | "textarea"
// //   | "email"
// //   | "number"
// //   | "select"
// //   | "radio"
// //   | "checkbox"
// //   | "date";

// // interface FormField {
// //   id: string;
// //   type: FieldType;
// //   label: string;
// //   required: boolean;
// //   placeholder?: string;
// //   options?: string[];
// // }

// // interface FormSchema {
// //   id: string;
// //   title: string;
// //   description?: string;
// //   fields: FormField[];
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // // ===================== CONSTANTS =====================
// // const generateId = () => Math.random().toString(36).slice(2, 11);

// // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// //   { value: "text", label: "📝 Text" },
// //   { value: "textarea", label: "📄 Textarea" },
// //   { value: "email", label: "📧 Email" },
// //   { value: "number", label: "🔢 Number" },
// //   { value: "select", label: "📋 Dropdown" },
// //   { value: "radio", label: "◉ Radio Buttons" },
// //   { value: "checkbox", label: "☑️ Checkbox Group" },
// //   { value: "date", label: "📅 Date" },
// // ];

// // // ===================== MAIN COMPONENT =====================
// // export default function FormBuilder() {
// //   const [forms, setForms] = useState<FormSchema[]>([]);
// //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// //   const [previewMode, setPreviewMode] = useState(false);
// //   const [copied, setCopied] = useState(false);
// //   const [savedMessage, setSavedMessage] = useState(false);

// //   // Field builder
// //   const [fieldType, setFieldType] = useState<FieldType>("text");
// //   const [fieldLabel, setFieldLabel] = useState("");
// //   const [fieldRequired, setFieldRequired] = useState(false);
// //   const [fieldPlaceholder, setFieldPlaceholder] = useState("");
// //   const [optionsInput, setOptionsInput] = useState("");
// //   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

// //   // Load forms
// //   useEffect(() => {
// //     const saved = localStorage.getItem("all_forms");
// //     if (saved) {
// //       const parsed: FormSchema[] = JSON.parse(saved);
// //       setForms(parsed);
// //       if (parsed.length > 0) setActiveFormId(parsed[0].id);
// //     }
// //   }, []);

// //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// //   const showOptions = ["select", "radio", "checkbox"].includes(fieldType);

// //   // ===================== HELPERS =====================
// //   const saveToStorage = (updated: FormSchema[]) => {
// //     setForms(updated);
// //     localStorage.setItem("all_forms", JSON.stringify(updated));
// //   };

// //   const createNewForm = () => {
// //     const newForm: FormSchema = {
// //       id: generateId(),
// //       title: "Untitled Form",
// //       description: "",
// //       fields: [],
// //       createdAt: new Date().toISOString(),
// //       updatedAt: new Date().toISOString(),
// //     };
// //     saveToStorage([newForm, ...forms]);
// //     setActiveFormId(newForm.id);
// //     setPreviewMode(false);
// //     resetFieldBuilder();
// //   };

// //   const updateActiveForm = (updates: Partial<FormSchema>) => {
// //     if (!activeForm) return;
// //     const updated = forms.map((f) =>
// //       f.id === activeForm.id
// //         ? { ...f, ...updates, updatedAt: new Date().toISOString() }
// //         : f
// //     );
// //     saveToStorage(updated);
// //   };

// //   const deleteForm = (id: string) => {
// //     if (!confirm("Delete this form?")) return;
// //     const updated = forms.filter((f) => f.id !== id);
// //     saveToStorage(updated);
// //     if (activeFormId === id) setActiveFormId(updated[0]?.id || null);
// //   };

// //   const resetFieldBuilder = () => {
// //     setFieldType("text");
// //     setFieldLabel("");
// //     setFieldRequired(false);
// //     setFieldPlaceholder("");
// //     setOptionsInput("");
// //     setEditingFieldId(null);
// //   };

// //   const addOrUpdateField = () => {
// //     if (!activeForm || !fieldLabel.trim()) {
// //       alert("Field label is required");
// //       return;
// //     }

// //     let options: string[] | undefined;
// //     if (showOptions) {
// //       options = optionsInput
// //         .split(",")
// //         .map((o) => o.trim())
// //         .filter(Boolean);
// //       if (options.length === 0) {
// //         alert("Please provide at least one option");
// //         return;
// //       }
// //     }

// //     const newField: FormField = {
// //       id: editingFieldId || generateId(),
// //       type: fieldType,
// //       label: fieldLabel.trim(),
// //       required: fieldRequired,
// //       placeholder: fieldPlaceholder.trim() || undefined,
// //       options,
// //     };

// //     const updatedFields = editingFieldId
// //       ? activeForm.fields.map((f) => (f.id === editingFieldId ? newField : f))
// //       : [...activeForm.fields, newField];

// //     updateActiveForm({ fields: updatedFields });
// //     resetFieldBuilder();
// //   };

// //   const editField = (field: FormField) => {
// //     setEditingFieldId(field.id);
// //     setFieldType(field.type);
// //     setFieldLabel(field.label);
// //     setFieldRequired(field.required);
// //     setFieldPlaceholder(field.placeholder || "");
// //     setOptionsInput(field.options?.join(", ") || "");
// //   };

// //   const deleteField = (id: string) => {
// //     if (!activeForm) return;
// //     updateActiveForm({ fields: activeForm.fields.filter((f) => f.id !== id) });
// //     if (editingFieldId === id) resetFieldBuilder();
// //   };

// //   const moveField = (index: number, direction: "up" | "down") => {
// //     if (!activeForm) return;
// //     const newFields = [...activeForm.fields];
// //     const target = direction === "up" ? index - 1 : index + 1;
// //     if (target < 0 || target >= newFields.length) return;
// //     [newFields[index], newFields[target]] = [
// //       newFields[target],
// //       newFields[index],
// //     ];
// //     updateActiveForm({ fields: newFields });
// //   };

// //   const copyLink = () => {
// //     if (!activeForm) return;
// //     navigator.clipboard.writeText(
// //       `${window.location.origin}/form/${activeForm.id}`
// //     );
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const saveForm = () => {
// //     setSavedMessage(true);
// //     setTimeout(() => setSavedMessage(false), 2000);
// //   };

// //   // ===================== RENDER =====================
// //   return (
// //     <section className="min-h-screen bg-slate-50 py-10 sm:py-14">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
// //           <div>
// //             <span className="text-purple-600 font-semibold uppercase tracking-widest text-sm">
// //               Form Management
// //             </span>
// //             <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
// //               Form Builder
// //             </h1>
// //             <p className="mt-2 text-slate-600 text-base sm:text-lg">
// //               Create forms and share them with a link
// //             </p>
// //           </div>

// //           <div className="flex flex-wrap gap-3">
// //             <button
// //               onClick={createNewForm}
// //               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //             >
// //               <Plus size={16} />
// //               New Form
// //             </button>

// //             {activeForm && (
// //               <>
// //                 <button
// //                   onClick={() => setPreviewMode(!previewMode)}
// //                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                 >
// //                   <Eye size={15} />
// //                   {previewMode ? "Back to Edit" : "Preview"}
// //                 </button>
// //                 <button
// //                   onClick={copyLink}
// //                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                 >
// //                   {copied ? (
// //                     <Check size={15} className="text-emerald-600" />
// //                   ) : (
// //                     <Copy size={15} />
// //                   )}
// //                   {copied ? "Copied" : "Copy Link"}
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* Saved message */}
// //         {savedMessage && (
// //           <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
// //             <Check size={16} />
// //             Form saved successfully
// //           </div>
// //         )}

// //         {/* Main grid — forms list on the RIGHT */}
// //         <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 lg:gap-8">
// //           {/* Main content */}
// //           <div>
// //             {!activeForm ? (
// //               <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
// //                 <FileText size={40} className="mx-auto text-slate-300 mb-4" />
// //                 <p className="text-lg text-slate-500 mb-5">No form selected</p>
// //                 <button
// //                   onClick={createNewForm}
// //                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                 >
// //                   <Plus size={16} />
// //                   Create Form
// //                 </button>
// //               </div>
// //             ) : previewMode ? (
// //               <FormPreview
// //                 schema={activeForm}
// //                 onBack={() => setPreviewMode(false)}
// //               />
// //             ) : (
// //               <div className="space-y-6">
// //                 {/* Form config */}
// //                 <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //                     <div>
// //                       <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                         Form Name
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={activeForm.title}
// //                         onChange={(e) =>
// //                           updateActiveForm({ title: e.target.value })
// //                         }
// //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// //                         placeholder="e.g. Employee Survey"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                         Description (optional)
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={activeForm.description || ""}
// //                         onChange={(e) =>
// //                           updateActiveForm({ description: e.target.value })
// //                         }
// //                         className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// //                         placeholder="Short description..."
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Shareable link */}
// //                   <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
// //                     <div className="min-w-0">
// //                       <p className="text-xs font-medium text-slate-500 mb-0.5">
// //                         Shareable link
// //                       </p>
// //                       <p className="text-sm font-mono text-purple-600 truncate">
// //                         {typeof window !== "undefined"
// //                           ? `${window.location.origin}/form/${activeForm.id}`
// //                           : `/form/${activeForm.id}`}
// //                       </p>
// //                     </div>
// //                     <button
// //                       onClick={copyLink}
// //                       className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                     >
// //                       {copied ? (
// //                         <Check size={14} className="text-emerald-600" />
// //                       ) : (
// //                         <Copy size={14} />
// //                       )}
// //                       {copied ? "Copied" : "Copy"}
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Builder */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                   {/* Add field */}
// //                   <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
// //                     <h3 className="text-lg font-bold text-slate-900 mb-1">
// //                       Add Form Fields
// //                     </h3>
// //                     <p className="text-sm text-slate-500 mb-6">
// //                       Configure fields for your form
// //                     </p>

// //                     <div className="space-y-4">
// //                       <div>
// //                         <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                           Field Type
// //                         </label>
// //                         <select
// //                           value={fieldType}
// //                           onChange={(e) =>
// //                             setFieldType(e.target.value as FieldType)
// //                           }
// //                           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// //                         >
// //                           {FIELD_TYPES.map((t) => (
// //                             <option key={t.value} value={t.value}>
// //                               {t.label}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       <div>
// //                         <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                           Field Label
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={fieldLabel}
// //                           onChange={(e) => setFieldLabel(e.target.value)}
// //                           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// //                           placeholder="e.g. Your Name"
// //                         />
// //                       </div>

// //                       <div>
// //                         <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                           Placeholder (optional)
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={fieldPlaceholder}
// //                           onChange={(e) => setFieldPlaceholder(e.target.value)}
// //                           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// //                           placeholder="e.g. Enter your full name"
// //                         />
// //                       </div>

// //                       {showOptions && (
// //                         <div>
// //                           <label className="block text-sm font-semibold text-slate-700 mb-2">
// //                             Options (comma separated)
// //                           </label>
// //                           <input
// //                             type="text"
// //                             value={optionsInput}
// //                             onChange={(e) => setOptionsInput(e.target.value)}
// //                             className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// //                             placeholder="Option 1, Option 2, Option 3"
// //                           />
// //                         </div>
// //                       )}

// //                       <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
// //                         <input
// //                           type="checkbox"
// //                           checked={fieldRequired}
// //                           onChange={(e) => setFieldRequired(e.target.checked)}
// //                           className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
// //                         />
// //                         Required Field
// //                       </label>

// //                       <button
// //                         onClick={addOrUpdateField}
// //                         className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                       >
// //                         {editingFieldId ? (
// //                           <>
// //                             <Edit2 size={16} />
// //                             Update Field
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Plus size={16} />
// //                             Add Field
// //                           </>
// //                         )}
// //                       </button>

// //                       {editingFieldId && (
// //                         <button
// //                           onClick={resetFieldBuilder}
// //                           className="w-full text-sm text-slate-500 hover:text-slate-700"
// //                         >
// //                           Cancel editing
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Added fields */}
// //                   <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
// //                     <h3 className="text-lg font-bold text-slate-900 mb-4">
// //                       Added Fields ({activeForm.fields.length})
// //                     </h3>

// //                     {activeForm.fields.length === 0 ? (
// //                       <div className="py-14 text-center border-2 border-dashed border-slate-200 rounded-xl">
// //                         <p className="text-sm text-slate-400">
// //                           No fields added yet
// //                         </p>
// //                       </div>
// //                     ) : (
// //                       <div className="space-y-3 max-h-[420px] overflow-y-auto">
// //                         {activeForm.fields.map((field, index) => (
// //                           <div
// //                             key={field.id}
// //                             className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
// //                           >
// //                             <GripVertical
// //                               size={16}
// //                               className="text-slate-300 shrink-0"
// //                             />

// //                             <div className="min-w-0 flex-1">
// //                               <div className="flex items-center gap-2 flex-wrap">
// //                                 <span className="text-sm font-medium text-slate-900">
// //                                   {field.label}
// //                                 </span>
// //                                 <span className="text-xs text-slate-400">
// //                                   ({field.type})
// //                                 </span>
// //                                 {field.required && (
// //                                   <span className="text-xs text-red-500 font-medium">
// //                                     *
// //                                   </span>
// //                                 )}
// //                               </div>
// //                               {field.options && (
// //                                 <p className="text-xs text-slate-400 mt-0.5 truncate">
// //                                   {field.options.join(", ")}
// //                                 </p>
// //                               )}
// //                             </div>

// //                             <div className="flex items-center gap-1 shrink-0">
// //                               <button
// //                                 onClick={() => moveField(index, "up")}
// //                                 disabled={index === 0}
// //                                 className="p-1.5 rounded-lg text-slate-400 hover:bg-white disabled:opacity-30 transition"
// //                               >
// //                                 <ArrowUp size={14} />
// //                               </button>
// //                               <button
// //                                 onClick={() => moveField(index, "down")}
// //                                 disabled={
// //                                   index === activeForm.fields.length - 1
// //                                 }
// //                                 className="p-1.5 rounded-lg text-slate-400 hover:bg-white disabled:opacity-30 transition"
// //                               >
// //                                 <ArrowDown size={14} />
// //                               </button>
// //                               <button
// //                                 onClick={() => editField(field)}
// //                                 className="p-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
// //                               >
// //                                 <Edit2 size={14} />
// //                               </button>
// //                               <button
// //                                 onClick={() => deleteField(field.id)}
// //                                 className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
// //                               >
// //                                 <Trash2 size={14} />
// //                               </button>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Save */}
// //                 <div className="flex justify-end">
// //                   <button
// //                     onClick={saveForm}
// //                     className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition shadow-sm"
// //                   >
// //                     <Save size={17} />
// //                     Save Form
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Sidebar - Forms list (RIGHT side) */}
// //           <aside className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 h-fit sticky top-6">
// //             <h3 className="text-sm font-semibold text-slate-900 mb-4">
// //               Your Forms ({forms.length})
// //             </h3>

// //             {forms.length === 0 ? (
// //               <div className="py-10 text-center">
// //                 <FileText size={28} className="mx-auto text-slate-300 mb-3" />
// //                 <p className="text-sm text-slate-400">No forms yet</p>
// //                 <button
// //                   onClick={createNewForm}
// //                   className="mt-3 text-sm font-medium text-purple-600 hover:underline"
// //                 >
// //                   Create your first form
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="space-y-2 max-h-[70vh] overflow-y-auto">
// //                 {forms.map((form) => (
// //                   <div
// //                     key={form.id}
// //                     onClick={() => {
// //                       setActiveFormId(form.id);
// //                       setPreviewMode(false);
// //                       resetFieldBuilder();
// //                     }}
// //                     className={`flex items-center justify-between gap-2 p-3.5 rounded-xl cursor-pointer transition border ${
// //                       activeFormId === form.id
// //                         ? "bg-purple-50 border-purple-300"
// //                         : "bg-slate-50 border-transparent hover:bg-slate-100"
// //                     }`}
// //                   >
// //                     <div className="min-w-0">
// //                       <p className="text-sm font-medium text-slate-900 truncate">
// //                         {form.title || "Untitled Form"}
// //                       </p>
// //                       <p className="text-xs text-slate-400 mt-0.5">
// //                         {form.fields.length} field
// //                         {form.fields.length !== 1 ? "s" : ""}
// //                       </p>
// //                     </div>
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         deleteForm(form.id);
// //                       }}
// //                       className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
// //                     >
// //                       <Trash2 size={14} />
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </aside>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ===================== PREVIEW =====================
// // function FormPreview({
// //   schema,
// //   onBack,
// // }: {
// //   schema: FormSchema;
// //   onBack: () => void;
// // }) {
// //   const [values, setValues] = useState<Record<string, any>>({});
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     localStorage.setItem(
// //       `form_response_${schema.id}_${Date.now()}`,
// //       JSON.stringify({
// //         formId: schema.id,
// //         formTitle: schema.title,
// //         values,
// //         submittedAt: new Date().toISOString(),
// //       })
// //     );
// //     setSubmitted(true);
// //   };

// //   if (submitted) {
// //     return (
// //       <div className="bg-white rounded-2xl border border-slate-200 p-10 sm:p-14 text-center">
// //         <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// //           <Check size={28} className="text-emerald-600" />
// //         </div>
// //         <h2 className="text-2xl font-bold text-slate-900">Thank you!</h2>
// //         <p className="text-slate-500 mt-2 text-sm">
// //           Your response has been recorded.
// //         </p>
// //         <button
// //           onClick={() => {
// //             setSubmitted(false);
// //             setValues({});
// //           }}
// //           className="mt-7 inline-flex px-6 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //         >
// //           Submit another response
// //         </button>
// //         <div className="mt-4">
// //           <button
// //             onClick={onBack}
// //             className="text-sm text-slate-500 hover:text-slate-700"
// //           >
// //             Back to editor
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
// //       {/* Header */}
// //       <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-slate-100 text-center">
// //         <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
// //           {schema.title}
// //         </h2>
// //         {schema.description && (
// //           <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
// //             {schema.description}
// //           </p>
// //         )}
// //       </div>

// //       <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6 max-w-2xl mx-auto">
// //         {schema.fields.map((field) => (
// //           <div key={field.id}>
// //             <label className="block text-sm font-semibold text-slate-800 mb-2">
// //               {field.label}
// //               {field.required && (
// //                 <span className="text-red-500 ml-1">*</span>
// //               )}
// //             </label>

// //             {field.type === "textarea" ? (
// //               <textarea
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 placeholder={field.placeholder}
// //                 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-y"
// //                 rows={4}
// //               />
// //             ) : field.type === "select" ? (
// //               <select
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// //               >
// //                 <option value="">-- Select --</option>
// //                 {field.options?.map((opt) => (
// //                   <option key={opt} value={opt}>
// //                     {opt}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : field.type === "radio" ? (
// //               <div className="space-y-2.5">
// //                 {field.options?.map((opt) => (
// //                   <label
// //                     key={opt}
// //                     className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// //                   >
// //                     <input
// //                       type="radio"
// //                       name={field.id}
// //                       value={opt}
// //                       required={field.required}
// //                       checked={values[field.id] === opt}
// //                       onChange={() =>
// //                         setValues((p) => ({ ...p, [field.id]: opt }))
// //                       }
// //                       className="accent-purple-600"
// //                     />
// //                     {opt}
// //                   </label>
// //                 ))}
// //               </div>
// //             ) : field.type === "checkbox" ? (
// //               <div className="space-y-2.5">
// //                 {field.options?.map((opt) => (
// //                   <label
// //                     key={opt}
// //                     className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       value={opt}
// //                       checked={(values[field.id] || []).includes(opt)}
// //                       onChange={(e) => {
// //                         const current: string[] = values[field.id] || [];
// //                         const next = e.target.checked
// //                           ? [...current, opt]
// //                           : current.filter((v) => v !== opt);
// //                         setValues((p) => ({ ...p, [field.id]: next }));
// //                       }}
// //                       className="rounded accent-purple-600"
// //                     />
// //                     {opt}
// //                   </label>
// //                 ))}
// //               </div>
// //             ) : (
// //               <input
// //                 type={field.type}
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 placeholder={field.placeholder}
// //                 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
// //               />
// //             )}
// //           </div>
// //         ))}

// //         <button
// //           type="submit"
// //           className="w-full py-3.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //         >
// //           Submit
// //         </button>
// //       </form>

// //       <div className="px-6 sm:px-10 pb-8 text-center">
// //         <button
// //           onClick={onBack}
// //           className="text-sm text-slate-500 hover:text-slate-700"
// //         >
// //           ← Back to editor
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import {
// //   Plus,
// //   Save,
// //   Edit2,
// //   Trash2,
// //   Eye,
// //   Copy,
// //   Check,
// //   FileText,
// //   GripVertical,
// //   ArrowUp,
// //   ArrowDown,
// //   Link2,
// // } from "lucide-react";

// // // ===================== TYPES =====================
// // type FieldType =
// //   | "text"
// //   | "textarea"
// //   | "email"
// //   | "number"
// //   | "select"
// //   | "radio"
// //   | "checkbox"
// //   | "date";

// // interface FormField {
// //   id: string;
// //   type: FieldType;
// //   label: string;
// //   required: boolean;
// //   placeholder?: string;
// //   options?: string[];
// // }

// // interface FormSchema {
// //   id: string;
// //   title: string;
// //   description?: string;
// //   fields: FormField[];
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // // ===================== CONSTANTS =====================
// // const generateId = () => Math.random().toString(36).slice(2, 11);

// // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// //   { value: "text", label: "📝 Text" },
// //   { value: "textarea", label: "📄 Textarea" },
// //   { value: "email", label: "📧 Email" },
// //   { value: "number", label: "🔢 Number" },
// //   { value: "select", label: "📋 Dropdown" },
// //   { value: "radio", label: "◉ Radio Buttons" },
// //   { value: "checkbox", label: "☑️ Checkbox Group" },
// //   { value: "date", label: "📅 Date" },
// // ];

// // // ===================== MAIN COMPONENT =====================
// // export default function FormBuilder() {
// //   const [forms, setForms] = useState<FormSchema[]>([]);
// //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// //   const [previewMode, setPreviewMode] = useState(false);
// //   const [copied, setCopied] = useState(false);
// //   const [savedMessage, setSavedMessage] = useState(false);

// //   // Field builder
// //   const [fieldType, setFieldType] = useState<FieldType>("text");
// //   const [fieldLabel, setFieldLabel] = useState("");
// //   const [fieldRequired, setFieldRequired] = useState(false);
// //   const [fieldPlaceholder, setFieldPlaceholder] = useState("");
// //   const [optionsInput, setOptionsInput] = useState("");
// //   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

// //   // Load forms
// //   useEffect(() => {
// //     const saved = localStorage.getItem("all_forms");
// //     if (saved) {
// //       const parsed: FormSchema[] = JSON.parse(saved);
// //       setForms(parsed);
// //       if (parsed.length > 0) setActiveFormId(parsed[0].id);
// //     }
// //   }, []);

// //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// //   const showOptions = ["select", "radio", "checkbox"].includes(fieldType);

// //   // ===================== HELPERS =====================
// //   const saveToStorage = (updated: FormSchema[]) => {
// //     setForms(updated);
// //     localStorage.setItem("all_forms", JSON.stringify(updated));
// //   };

// //   const createNewForm = () => {
// //     const newForm: FormSchema = {
// //       id: generateId(),
// //       title: "Untitled Form",
// //       description: "",
// //       fields: [],
// //       createdAt: new Date().toISOString(),
// //       updatedAt: new Date().toISOString(),
// //     };
// //     saveToStorage([newForm, ...forms]);
// //     setActiveFormId(newForm.id);
// //     setPreviewMode(false);
// //     resetFieldBuilder();
// //   };

// //   const updateActiveForm = (updates: Partial<FormSchema>) => {
// //     if (!activeForm) return;
// //     const updated = forms.map((f) =>
// //       f.id === activeForm.id
// //         ? { ...f, ...updates, updatedAt: new Date().toISOString() }
// //         : f
// //     );
// //     saveToStorage(updated);
// //   };

// //   const deleteForm = (id: string) => {
// //     if (!confirm("Delete this form?")) return;
// //     const updated = forms.filter((f) => f.id !== id);
// //     saveToStorage(updated);
// //     if (activeFormId === id) setActiveFormId(updated[0]?.id || null);
// //   };

// //   const resetFieldBuilder = () => {
// //     setFieldType("text");
// //     setFieldLabel("");
// //     setFieldRequired(false);
// //     setFieldPlaceholder("");
// //     setOptionsInput("");
// //     setEditingFieldId(null);
// //   };

// //   const addOrUpdateField = () => {
// //     if (!activeForm || !fieldLabel.trim()) {
// //       alert("Field label is required");
// //       return;
// //     }

// //     let options: string[] | undefined;
// //     if (showOptions) {
// //       options = optionsInput
// //         .split(",")
// //         .map((o) => o.trim())
// //         .filter(Boolean);
// //       if (options.length === 0) {
// //         alert("Please provide at least one option");
// //         return;
// //       }
// //     }

// //     const newField: FormField = {
// //       id: editingFieldId || generateId(),
// //       type: fieldType,
// //       label: fieldLabel.trim(),
// //       required: fieldRequired,
// //       placeholder: fieldPlaceholder.trim() || undefined,
// //       options,
// //     };

// //     const updatedFields = editingFieldId
// //       ? activeForm.fields.map((f) => (f.id === editingFieldId ? newField : f))
// //       : [...activeForm.fields, newField];

// //     updateActiveForm({ fields: updatedFields });
// //     resetFieldBuilder();
// //   };

// //   const editField = (field: FormField) => {
// //     setEditingFieldId(field.id);
// //     setFieldType(field.type);
// //     setFieldLabel(field.label);
// //     setFieldRequired(field.required);
// //     setFieldPlaceholder(field.placeholder || "");
// //     setOptionsInput(field.options?.join(", ") || "");
// //   };

// //   const deleteField = (id: string) => {
// //     if (!activeForm) return;
// //     updateActiveForm({ fields: activeForm.fields.filter((f) => f.id !== id) });
// //     if (editingFieldId === id) resetFieldBuilder();
// //   };

// //   const moveField = (index: number, direction: "up" | "down") => {
// //     if (!activeForm) return;
// //     const newFields = [...activeForm.fields];
// //     const target = direction === "up" ? index - 1 : index + 1;
// //     if (target < 0 || target >= newFields.length) return;
// //     [newFields[index], newFields[target]] = [
// //       newFields[target],
// //       newFields[index],
// //     ];
// //     updateActiveForm({ fields: newFields });
// //   };

// //   const copyLink = () => {
// //     if (!activeForm) return;
// //     navigator.clipboard.writeText(
// //       `${window.location.origin}/form/${activeForm.id}`
// //     );
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const saveForm = () => {
// //     setSavedMessage(true);
// //     setTimeout(() => setSavedMessage(false), 2000);
// //   };

// //   // ===================== RENDER =====================
// //   return (
// //     <section className="min-h-screen bg-slate-50 py-6 sm:py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
// //           <div>
// //             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
// //               Form Management
// //             </span>
// //             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
// //               Form Builder
// //             </h1>
// //           </div>

// //           <div className="flex flex-wrap gap-2">
// //             <button
// //               onClick={createNewForm}
// //               className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //             >
// //               <Plus size={15} />
// //               New Form
// //             </button>

// //             {activeForm && (
// //               <>
// //                 <button
// //                   onClick={() => setPreviewMode(!previewMode)}
// //                   className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                 >
// //                   <Eye size={14} />
// //                   {previewMode ? "Edit" : "Preview"}
// //                 </button>
// //                 <button
// //                   onClick={copyLink}
// //                   className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                 >
// //                   {copied ? (
// //                     <Check size={14} className="text-emerald-600" />
// //                   ) : (
// //                     <Copy size={14} />
// //                   )}
// //                   {copied ? "Copied" : "Copy Link"}
// //                 </button>
// //                 {!previewMode && (
// //                   <button
// //                     onClick={saveForm}
// //                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                   >
// //                     <Save size={14} />
// //                     Save
// //                   </button>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* Saved message */}
// //         {savedMessage && (
// //           <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm font-medium">
// //             <Check size={15} />
// //             Form saved successfully
// //           </div>
// //         )}

// //         {/* Main grid — forms list on the RIGHT */}
// //         <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
// //           {/* Main content */}
// //           <div>
// //             {!activeForm ? (
// //               <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
// //                 <FileText size={36} className="mx-auto text-slate-300 mb-3" />
// //                 <p className="text-base text-slate-500 mb-4">No form selected</p>
// //                 <button
// //                   onClick={createNewForm}
// //                   className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                 >
// //                   <Plus size={15} />
// //                   Create Form
// //                 </button>
// //               </div>
// //             ) : previewMode ? (
// //               <FormPreview
// //                 schema={activeForm}
// //                 onBack={() => setPreviewMode(false)}
// //               />
// //             ) : (
// //               <div className="space-y-4">
// //                 {/* ── Compact Form Header (Name + Description + Link) ── */}
// //                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4">
// //                   <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
// //                     {/* Form Name */}
// //                     <div className="flex-1 min-w-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Form Name
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={activeForm.title}
// //                         onChange={(e) =>
// //                           updateActiveForm({ title: e.target.value })
// //                         }
// //                         className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         placeholder="e.g. Employee Survey"
// //                       />
// //                     </div>

// //                     {/* Description */}
// //                     <div className="flex-1 min-w-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Description
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={activeForm.description || ""}
// //                         onChange={(e) =>
// //                           updateActiveForm({ description: e.target.value })
// //                         }
// //                         className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         placeholder="Short description..."
// //                       />
// //                     </div>

// //                     {/* Shareable Link */}
// //                     <div className="sm:w-[220px] shrink-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Share Link
// //                       </label>
// //                       <div className="flex items-center gap-1.5">
// //                         <div className="flex-1 min-w-0 flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-purple-600 truncate">
// //                           <Link2 size={12} className="shrink-0 text-slate-400" />
// //                           <span className="truncate">
// //                             /form/{activeForm.id}
// //                           </span>
// //                         </div>
// //                         <button
// //                           onClick={copyLink}
// //                           title="Copy link"
// //                           className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition"
// //                         >
// //                           {copied ? (
// //                             <Check size={14} className="text-emerald-600" />
// //                           ) : (
// //                             <Copy size={14} />
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Builder */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //                   {/* Add field */}
// //                   <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
// //                     <h3 className="text-base font-bold text-slate-900 mb-0.5">
// //                       Add Form Fields
// //                     </h3>
// //                     <p className="text-xs text-slate-500 mb-4">
// //                       Configure fields for your form
// //                     </p>

// //                     <div className="space-y-3">
// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Field Type
// //                         </label>
// //                         <select
// //                           value={fieldType}
// //                           onChange={(e) =>
// //                             setFieldType(e.target.value as FieldType)
// //                           }
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         >
// //                           {FIELD_TYPES.map((t) => (
// //                             <option key={t.value} value={t.value}>
// //                               {t.label}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Field Label
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={fieldLabel}
// //                           onChange={(e) => setFieldLabel(e.target.value)}
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                           placeholder="e.g. Your Name"
// //                         />
// //                       </div>

// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Placeholder (optional)
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={fieldPlaceholder}
// //                           onChange={(e) => setFieldPlaceholder(e.target.value)}
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                           placeholder="e.g. Enter your full name"
// //                         />
// //                       </div>

// //                       {showOptions && (
// //                         <div>
// //                           <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                             Options (comma separated)
// //                           </label>
// //                           <input
// //                             type="text"
// //                             value={optionsInput}
// //                             onChange={(e) => setOptionsInput(e.target.value)}
// //                             className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                             placeholder="Option 1, Option 2, Option 3"
// //                           />
// //                         </div>
// //                       )}

// //                       <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
// //                         <input
// //                           type="checkbox"
// //                           checked={fieldRequired}
// //                           onChange={(e) => setFieldRequired(e.target.checked)}
// //                           className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
// //                         />
// //                         Required Field
// //                       </label>

// //                       <button
// //                         onClick={addOrUpdateField}
// //                         className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                       >
// //                         {editingFieldId ? (
// //                           <>
// //                             <Edit2 size={15} />
// //                             Update Field
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Plus size={15} />
// //                             Add Field
// //                           </>
// //                         )}
// //                       </button>

// //                       {editingFieldId && (
// //                         <button
// //                           onClick={resetFieldBuilder}
// //                           className="w-full text-xs text-slate-500 hover:text-slate-700"
// //                         >
// //                           Cancel editing
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Added fields */}
// //                   <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
// //                     <h3 className="text-base font-bold text-slate-900 mb-3">
// //                       Added Fields ({activeForm.fields.length})
// //                     </h3>

// //                     {activeForm.fields.length === 0 ? (
// //                       <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
// //                         <p className="text-xs text-slate-400">
// //                           No fields added yet
// //                         </p>
// //                       </div>
// //                     ) : (
// //                       <div className="space-y-2 max-h-[380px] overflow-y-auto">
// //                         {activeForm.fields.map((field, index) => (
// //                           <div
// //                             key={field.id}
// //                             className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
// //                           >
// //                             <GripVertical
// //                               size={14}
// //                               className="text-slate-300 shrink-0"
// //                             />

// //                             <div className="min-w-0 flex-1">
// //                               <div className="flex items-center gap-1.5 flex-wrap">
// //                                 <span className="text-sm font-medium text-slate-900">
// //                                   {field.label}
// //                                 </span>
// //                                 <span className="text-[11px] text-slate-400">
// //                                   ({field.type})
// //                                 </span>
// //                                 {field.required && (
// //                                   <span className="text-[11px] text-red-500 font-medium">
// //                                     *
// //                                   </span>
// //                                 )}
// //                               </div>
// //                               {field.options && (
// //                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
// //                                   {field.options.join(", ")}
// //                                 </p>
// //                               )}
// //                             </div>

// //                             <div className="flex items-center gap-0.5 shrink-0">
// //                               <button
// //                                 onClick={() => moveField(index, "up")}
// //                                 disabled={index === 0}
// //                                 className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
// //                               >
// //                                 <ArrowUp size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => moveField(index, "down")}
// //                                 disabled={
// //                                   index === activeForm.fields.length - 1
// //                                 }
// //                                 className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
// //                               >
// //                                 <ArrowDown size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => editField(field)}
// //                                 className="p-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
// //                               >
// //                                 <Edit2 size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => deleteField(field.id)}
// //                                 className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
// //                               >
// //                                 <Trash2 size={13} />
// //                               </button>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Sidebar - Forms list (RIGHT side) */}
// //           <aside className="bg-white rounded-xl border border-slate-200 p-4 h-fit sticky top-4">
// //             <h3 className="text-xs font-semibold text-slate-900 mb-3">
// //               Your Forms ({forms.length})
// //             </h3>

// //             {forms.length === 0 ? (
// //               <div className="py-8 text-center">
// //                 <FileText size={24} className="mx-auto text-slate-300 mb-2" />
// //                 <p className="text-xs text-slate-400">No forms yet</p>
// //                 <button
// //                   onClick={createNewForm}
// //                   className="mt-2 text-xs font-medium text-purple-600 hover:underline"
// //                 >
// //                   Create your first form
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
// //                 {forms.map((form) => (
// //                   <div
// //                     key={form.id}
// //                     onClick={() => {
// //                       setActiveFormId(form.id);
// //                       setPreviewMode(false);
// //                       resetFieldBuilder();
// //                     }}
// //                     className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
// //                       activeFormId === form.id
// //                         ? "bg-purple-50 border-purple-300"
// //                         : "bg-slate-50 border-transparent hover:bg-slate-100"
// //                     }`}
// //                   >
// //                     <div className="min-w-0">
// //                       <p className="text-sm font-medium text-slate-900 truncate">
// //                         {form.title || "Untitled Form"}
// //                       </p>
// //                       <p className="text-[11px] text-slate-400 mt-0.5">
// //                         {form.fields.length} field
// //                         {form.fields.length !== 1 ? "s" : ""}
// //                       </p>
// //                     </div>
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         deleteForm(form.id);
// //                       }}
// //                       className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
// //                     >
// //                       <Trash2 size={13} />
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </aside>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ===================== PREVIEW =====================
// // function FormPreview({
// //   schema,
// //   onBack,
// // }: {
// //   schema: FormSchema;
// //   onBack: () => void;
// // }) {
// //   const [values, setValues] = useState<Record<string, any>>({});
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     localStorage.setItem(
// //       `form_response_${schema.id}_${Date.now()}`,
// //       JSON.stringify({
// //         formId: schema.id,
// //         formTitle: schema.title,
// //         values,
// //         submittedAt: new Date().toISOString(),
// //       })
// //     );
// //     setSubmitted(true);
// //   };

// //   if (submitted) {
// //     return (
// //       <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">
// //         <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
// //           <Check size={24} className="text-emerald-600" />
// //         </div>
// //         <h2 className="text-xl font-bold text-slate-900">Thank you!</h2>
// //         <p className="text-slate-500 mt-1.5 text-sm">
// //           Your response has been recorded.
// //         </p>
// //         <button
// //           onClick={() => {
// //             setSubmitted(false);
// //             setValues({});
// //           }}
// //           className="mt-5 inline-flex px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //         >
// //           Submit another response
// //         </button>
// //         <div className="mt-3">
// //           <button
// //             onClick={onBack}
// //             className="text-xs text-slate-500 hover:text-slate-700"
// //           >
// //             Back to editor
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
// //       <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-slate-100 text-center">
// //         <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
// //           {schema.title}
// //         </h2>
// //         {schema.description && (
// //           <p className="text-slate-500 text-sm mt-1.5 max-w-xl mx-auto">
// //             {schema.description}
// //           </p>
// //         )}
// //       </div>

// //       <form
// //         onSubmit={handleSubmit}
// //         className="p-5 sm:p-8 space-y-5 max-w-2xl mx-auto"
// //       >
// //         {schema.fields.map((field) => (
// //           <div key={field.id}>
// //             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
// //               {field.label}
// //               {field.required && (
// //                 <span className="text-red-500 ml-1">*</span>
// //               )}
// //             </label>

// //             {field.type === "textarea" ? (
// //               <textarea
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 placeholder={field.placeholder}
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition resize-y"
// //                 rows={3}
// //               />
// //             ) : field.type === "select" ? (
// //               <select
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //               >
// //                 <option value="">-- Select --</option>
// //                 {field.options?.map((opt) => (
// //                   <option key={opt} value={opt}>
// //                     {opt}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : field.type === "radio" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt) => (
// //                   <label
// //                     key={opt}
// //                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// //                   >
// //                     <input
// //                       type="radio"
// //                       name={field.id}
// //                       value={opt}
// //                       required={field.required}
// //                       checked={values[field.id] === opt}
// //                       onChange={() =>
// //                         setValues((p) => ({ ...p, [field.id]: opt }))
// //                       }
// //                       className="accent-purple-600"
// //                     />
// //                     {opt}
// //                   </label>
// //                 ))}
// //               </div>
// //             ) : field.type === "checkbox" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt) => (
// //                   <label
// //                     key={opt}
// //                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       value={opt}
// //                       checked={(values[field.id] || []).includes(opt)}
// //                       onChange={(e) => {
// //                         const current: string[] = values[field.id] || [];
// //                         const next = e.target.checked
// //                           ? [...current, opt]
// //                           : current.filter((v) => v !== opt);
// //                         setValues((p) => ({ ...p, [field.id]: next }));
// //                       }}
// //                       className="rounded accent-purple-600"
// //                     />
// //                     {opt}
// //                   </label>
// //                 ))}
// //               </div>
// //             ) : (
// //               <input
// //                 type={field.type}
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 placeholder={field.placeholder}
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //               />
// //             )}
// //           </div>
// //         ))}

// //         <button
// //           type="submit"
// //           className="w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //         >
// //           Submit
// //         </button>
// //       </form>

// //       <div className="px-5 sm:px-8 pb-6 text-center">
// //         <button
// //           onClick={onBack}
// //           className="text-xs text-slate-500 hover:text-slate-700"
// //         >
// //           ← Back to editor
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import React, { useState, useEffect, useContext, useCallback } from "react";
// // import axios from "axios";
// // import { AuthContext } from "../../../../../../../src/context/AuthContext";
// // import {
// //   Plus,
// //   Save,
// //   Edit2,
// //   Trash2,
// //   Eye,
// //   Copy,
// //   Check,
// //   FileText,
// //   GripVertical,
// //   ArrowUp,
// //   ArrowDown,
// //   Link2,
// //   Loader2,
// // } from "lucide-react";

// // // ===================== API =====================
// // const API = `${import.meta.env.VITE_BACKEND_URL}`;

// // // ===================== TYPES =====================
// // type FieldType =
// //   | "text"
// //   | "textarea"
// //   | "email"
// //   | "number"
// //   | "select"
// //   | "radio"
// //   | "checkbox"
// //   | "date";

// // interface FormField {
// //   id: string;
// //   type: FieldType;
// //   label: string;
// //   required: boolean;
// //   placeholder?: string;
// //   options?: string[];
// // }

// // interface FormSchema {
// //   id: string;
// //   title: string;
// //   description?: string;
// //   fields: FormField[];
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // // ===================== CONSTANTS =====================
// // const generateId = () => Math.random().toString(36).slice(2, 11);

// // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// //   { value: "text", label: "📝 Text" },
// //   { value: "textarea", label: "📄 Textarea" },
// //   { value: "email", label: "📧 Email" },
// //   { value: "number", label: "🔢 Number" },
// //   { value: "select", label: "📋 Dropdown" },
// //   { value: "radio", label: "◉ Radio Buttons" },
// //   { value: "checkbox", label: "☑️ Checkbox Group" },
// //   { value: "date", label: "📅 Date" },
// // ];

// // // ===================== MAIN COMPONENT =====================
// // export default function FormBuilder() {
// //   const { user } = useContext(AuthContext);

// //   const [forms, setForms] = useState<FormSchema[]>([]);
// //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// //   const [previewMode, setPreviewMode] = useState(false);
// //   const [copied, setCopied] = useState(false);
// //   const [savedMessage, setSavedMessage] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   // Field builder
// //   const [fieldType, setFieldType] = useState<FieldType>("text");
// //   const [fieldLabel, setFieldLabel] = useState("");
// //   const [fieldRequired, setFieldRequired] = useState(false);
// //   const [fieldPlaceholder, setFieldPlaceholder] = useState("");
// //   const [optionsInput, setOptionsInput] = useState("");
// //   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

// //   // Local draft
// //   const [draftTitle, setDraftTitle] = useState("");
// //   const [draftDescription, setDraftDescription] = useState("");
// //   const [draftFields, setDraftFields] = useState<FormField[]>([]);

// //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// //   const showOptions = ["select", "radio", "checkbox"].includes(fieldType);

// //   /* ---------------- GET FORMS ---------------- */
// //   const loadForms = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const res = await axios.get(`${API}/api/forms`, {
// //         withCredentials: true,
// //       });

// //       const data: FormSchema[] = res.data.data || [];
// //       setForms(data);

// //       if (data.length > 0) {
// //         setActiveFormId((prev) => prev || data[0].id);
// //       }
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || "Failed to load forms");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     loadForms();
// //   }, [loadForms]);

// //   /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
// //   useEffect(() => {
// //     if (activeForm) {
// //       setDraftTitle(activeForm.title);
// //       setDraftDescription(activeForm.description || "");
// //       setDraftFields(activeForm.fields || []);
// //       resetFieldBuilder();
// //     }
// //   }, [activeFormId]);

// //   /* ---------------- HELPERS ---------------- */
// //   const resetFieldBuilder = () => {
// //     setFieldType("text");
// //     setFieldLabel("");
// //     setFieldRequired(false);
// //     setFieldPlaceholder("");
// //     setOptionsInput("");
// //     setEditingFieldId(null);
// //   };

// //   /* ---------------- CREATE FORM ---------------- */
// //   const createNewForm = async () => {
// //     try {
// //       setSaving(true);
// //       setError(null);

// //       const res = await axios.post(
// //         `${API}/api/forms`,
// //         {
// //           title: "Untitled Form",
// //           description: "",
// //           fields: [],
// //         },
// //         { withCredentials: true }
// //       );

// //       const created: FormSchema = res.data.data;
// //       setForms((prev) => [created, ...prev]);
// //       setActiveFormId(created.id);
// //       setPreviewMode(false);
// //       resetFieldBuilder();
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || "Failed to create form");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ---------------- SAVE / UPDATE FORM ---------------- */
// //   const saveForm = async () => {
// //     if (!activeFormId) return;

// //     try {
// //       setSaving(true);
// //       setError(null);

// //       const res = await axios.put(
// //         `${API}/api/forms/${activeFormId}`,
// //         {
// //           title: draftTitle.trim() || "Untitled Form",
// //           description: draftDescription,
// //           fields: draftFields,
// //         },
// //         { withCredentials: true }
// //       );

// //       const updated: FormSchema = res.data.data;
// //       setForms((prev) =>
// //         prev.map((f) => (f.id === activeFormId ? updated : f))
// //       );
// //       setSavedMessage(true);
// //       setTimeout(() => setSavedMessage(false), 2000);
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || "Failed to save form");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ---------------- DELETE FORM ---------------- */
// //   const deleteForm = async (id: string) => {
// //     if (!confirm("Delete this form?")) return;

// //     try {
// //       setError(null);

// //       await axios.delete(`${API}/api/forms/${id}`, {
// //         withCredentials: true,
// //       });

// //       const updated = forms.filter((f) => f.id !== id);
// //       setForms(updated);

// //       if (activeFormId === id) {
// //         setActiveFormId(updated[0]?.id || null);
// //       }
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || "Failed to delete form");
// //     }
// //   };

// //   /* ---------------- FIELD ACTIONS ---------------- */
// //   const addOrUpdateField = () => {
// //     if (!fieldLabel.trim()) {
// //       alert("Field label is required");
// //       return;
// //     }

// //     let options: string[] | undefined;
// //     if (showOptions) {
// //       options = optionsInput
// //         .split(",")
// //         .map((o) => o.trim())
// //         .filter(Boolean);
// //       if (options.length === 0) {
// //         alert("Please provide at least one option");
// //         return;
// //       }
// //     }

// //     const newField: FormField = {
// //       id: editingFieldId || generateId(),
// //       type: fieldType,
// //       label: fieldLabel.trim(),
// //       required: fieldRequired,
// //       placeholder: fieldPlaceholder.trim() || undefined,
// //       options,
// //     };

// //     if (editingFieldId) {
// //       setDraftFields((prev) =>
// //         prev.map((f) => (f.id === editingFieldId ? newField : f))
// //       );
// //     } else {
// //       setDraftFields((prev) => [...prev, newField]);
// //     }
// //     resetFieldBuilder();
// //   };

// //   const editField = (field: FormField) => {
// //     setEditingFieldId(field.id);
// //     setFieldType(field.type);
// //     setFieldLabel(field.label);
// //     setFieldRequired(field.required);
// //     setFieldPlaceholder(field.placeholder || "");
// //     setOptionsInput(field.options?.join(", ") || "");
// //   };

// //   const deleteField = (id: string) => {
// //     setDraftFields((prev) => prev.filter((f) => f.id !== id));
// //     if (editingFieldId === id) resetFieldBuilder();
// //   };

// //   const moveField = (index: number, direction: "up" | "down") => {
// //     const newFields = [...draftFields];
// //     const target = direction === "up" ? index - 1 : index + 1;
// //     if (target < 0 || target >= newFields.length) return;
// //     [newFields[index], newFields[target]] = [
// //       newFields[target],
// //       newFields[index],
// //     ];
// //     setDraftFields(newFields);
// //   };

// //   const copyLink = () => {
// //     if (!activeFormId) return;
// //    const url = `${window.location.origin}/form/${user.organisation_id}/${activeFormId}`;

// // navigator.clipboard.writeText(url);

// // console.log(url);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   /* ---------------- LOADING ---------------- */
// //   if (loading) {
// //     return (
// //       <section className="min-h-screen bg-slate-50 flex items-center justify-center">
// //         <div className="flex items-center gap-2 text-slate-500">
// //           <Loader2 size={20} className="animate-spin" />
// //           Loading forms...
// //         </div>
// //       </section>
// //     );
// //   }

// //   /* ---------------- RENDER ---------------- */
// //   return (
// //     <section className="min-h-screen bg-slate-50 py-6 sm:py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
// //           <div>
// //             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
// //               Form Management
// //             </span>
// //             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
// //               Form Builder
// //             </h1>
// //           </div>

// //           <div className="flex flex-wrap gap-2">
// //             <button
// //               onClick={createNewForm}
// //               disabled={saving}
// //               className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //             >
// //               {saving ? (
// //                 <Loader2 size={15} className="animate-spin" />
// //               ) : (
// //                 <Plus size={15} />
// //               )}
// //               New Form
// //             </button>

// //             {activeForm && (
// //               <>
// //                 <button
// //                   onClick={() => setPreviewMode(!previewMode)}
// //                   className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                 >
// //                   <Eye size={14} />
// //                   {previewMode ? "Edit" : "Preview"}
// //                 </button>
// //                 <button
// //                   onClick={copyLink}
// //                   className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                 >
// //                   {copied ? (
// //                     <Check size={14} className="text-emerald-600" />
// //                   ) : (
// //                     <Copy size={14} />
// //                   )}
// //                   {copied ? "Copied" : "Copy Link"}
// //                 </button>
// //                 {!previewMode && (
// //                   <button
// //                     onClick={saveForm}
// //                     disabled={saving}
// //                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //                   >
// //                     {saving ? (
// //                       <Loader2 size={14} className="animate-spin" />
// //                     ) : (
// //                       <Save size={14} />
// //                     )}
// //                     Save
// //                   </button>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* Messages */}
// //         {savedMessage && (
// //           <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm font-medium">
// //             <Check size={15} />
// //             Form saved successfully
// //           </div>
// //         )}
// //         {error && (
// //           <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm font-medium">
// //             {error}
// //             <button
// //               onClick={() => setError(null)}
// //               className="ml-auto text-red-600 hover:underline text-xs"
// //             >
// //               Dismiss
// //             </button>
// //           </div>
// //         )}

// //         {/* Main grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
// //           {/* Main content */}
// //           <div>
// //             {!activeForm ? (
// //               <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
// //                 <FileText size={36} className="mx-auto text-slate-300 mb-3" />
// //                 <p className="text-base text-slate-500 mb-4">No form selected</p>
// //                 <button
// //                   onClick={createNewForm}
// //                   disabled={saving}
// //                   className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                 >
// //                   <Plus size={15} />
// //                   Create Form
// //                 </button>
// //               </div>
// //             ) : previewMode ? (
// //               <FormPreview
// //                 schema={{
// //                   ...activeForm,
// //                   title: draftTitle,
// //                   description: draftDescription,
// //                   fields: draftFields,
// //                 }}
// //                 onBack={() => setPreviewMode(false)}
// //               />
// //             ) : (
// //               <div className="space-y-4">
// //                 {/* Form header */}
// //                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4">
// //                   <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
// //                     <div className="flex-1 min-w-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Form Name
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={draftTitle}
// //                         onChange={(e) => setDraftTitle(e.target.value)}
// //                         className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         placeholder="e.g. Employee Survey"
// //                       />
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Description
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={draftDescription}
// //                         onChange={(e) => setDraftDescription(e.target.value)}
// //                         className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         placeholder="Short description..."
// //                       />
// //                     </div>
// //                     <div className="sm:w-[220px] shrink-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Share Link
// //                       </label>
// //                       <div className="flex items-center gap-1.5">
// //                         <div className="flex-1 min-w-0 flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-purple-600 truncate">
// //                           <Link2 size={12} className="shrink-0 text-slate-400" />
// //                           <span className="truncate">/form/{user.organisation_id}/{activeFormId}</span>
// //                         </div>
// //                         <button
// //                           onClick={copyLink}
// //                           title="Copy link"
// //                           className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition"
// //                         >
// //                           {copied ? (
// //                             <Check size={14} className="text-emerald-600" />
// //                           ) : (
// //                             <Copy size={14} />
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Builder */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //                   {/* Add field */}
// //                   <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
// //                     <h3 className="text-base font-bold text-slate-900 mb-0.5">
// //                       Add Form Fields
// //                     </h3>
// //                     <p className="text-xs text-slate-500 mb-4">
// //                       Configure fields for your form
// //                     </p>

// //                     <div className="space-y-3">
// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Field Type
// //                         </label>
// //                         <select
// //                           value={fieldType}
// //                           onChange={(e) =>
// //                             setFieldType(e.target.value as FieldType)
// //                           }
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         >
// //                           {FIELD_TYPES.map((t) => (
// //                             <option key={t.value} value={t.value}>
// //                               {t.label}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Field Label
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={fieldLabel}
// //                           onChange={(e) => setFieldLabel(e.target.value)}
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                           placeholder="e.g. Your Name"
// //                         />
// //                       </div>

// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Placeholder (optional)
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={fieldPlaceholder}
// //                           onChange={(e) => setFieldPlaceholder(e.target.value)}
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                           placeholder="e.g. Enter your full name"
// //                         />
// //                       </div>

// //                       {showOptions && (
// //                         <div>
// //                           <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                             Options (comma separated)
// //                           </label>
// //                           <input
// //                             type="text"
// //                             value={optionsInput}
// //                             onChange={(e) => setOptionsInput(e.target.value)}
// //                             className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                             placeholder="Option 1, Option 2, Option 3"
// //                           />
// //                         </div>
// //                       )}

// //                       <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
// //                         <input
// //                           type="checkbox"
// //                           checked={fieldRequired}
// //                           onChange={(e) => setFieldRequired(e.target.checked)}
// //                           className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
// //                         />
// //                         Required Field
// //                       </label>

// //                       <button
// //                         onClick={addOrUpdateField}
// //                         className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                       >
// //                         {editingFieldId ? (
// //                           <>
// //                             <Edit2 size={15} />
// //                             Update Field
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Plus size={15} />
// //                             Add Field
// //                           </>
// //                         )}
// //                       </button>

// //                       {editingFieldId && (
// //                         <button
// //                           onClick={resetFieldBuilder}
// //                           className="w-full text-xs text-slate-500 hover:text-slate-700"
// //                         >
// //                           Cancel editing
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Added fields */}
// //                   <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
// //                     <h3 className="text-base font-bold text-slate-900 mb-3">
// //                       Added Fields ({draftFields.length})
// //                     </h3>

// //                     {draftFields.length === 0 ? (
// //                       <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
// //                         <p className="text-xs text-slate-400">
// //                           No fields added yet
// //                         </p>
// //                       </div>
// //                     ) : (
// //                       <div className="space-y-2 max-h-[380px] overflow-y-auto">
// //                         {draftFields.map((field, index) => (
// //                           <div
// //                             key={field.id}
// //                             className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
// //                           >
// //                             <GripVertical
// //                               size={14}
// //                               className="text-slate-300 shrink-0"
// //                             />
// //                             <div className="min-w-0 flex-1">
// //                               <div className="flex items-center gap-1.5 flex-wrap">
// //                                 <span className="text-sm font-medium text-slate-900">
// //                                   {field.label}
// //                                 </span>
// //                                 <span className="text-[11px] text-slate-400">
// //                                   ({field.type})
// //                                 </span>
// //                                 {field.required && (
// //                                   <span className="text-[11px] text-red-500 font-medium">
// //                                     *
// //                                   </span>
// //                                 )}
// //                               </div>
// //                               {field.options && (
// //                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
// //                                   {field.options.join(", ")}
// //                                 </p>
// //                               )}
// //                             </div>
// //                             <div className="flex items-center gap-0.5 shrink-0">
// //                               <button
// //                                 onClick={() => moveField(index, "up")}
// //                                 disabled={index === 0}
// //                                 className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
// //                               >
// //                                 <ArrowUp size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => moveField(index, "down")}
// //                                 disabled={index === draftFields.length - 1}
// //                                 className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
// //                               >
// //                                 <ArrowDown size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => editField(field)}
// //                                 className="p-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
// //                               >
// //                                 <Edit2 size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => deleteField(field.id)}
// //                                 className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
// //                               >
// //                                 <Trash2 size={13} />
// //                               </button>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Sidebar */}
// //           <aside className="bg-white rounded-xl border border-slate-200 p-4 h-fit sticky top-4">
// //             <h3 className="text-xs font-semibold text-slate-900 mb-3">
// //               Your Forms ({forms.length})
// //             </h3>

// //             {forms.length === 0 ? (
// //               <div className="py-8 text-center">
// //                 <FileText size={24} className="mx-auto text-slate-300 mb-2" />
// //                 <p className="text-xs text-slate-400">No forms yet</p>
// //                 <button
// //                   onClick={createNewForm}
// //                   className="mt-2 text-xs font-medium text-purple-600 hover:underline"
// //                 >
// //                   Create your first form
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
// //                 {forms.map((form) => (
// //                   <div
// //                     key={form.id}
// //                     onClick={() => {
// //                       setActiveFormId(form.id);
// //                       setPreviewMode(false);
// //                       resetFieldBuilder();
// //                     }}
// //                     className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
// //                       activeFormId === form.id
// //                         ? "bg-purple-50 border-purple-300"
// //                         : "bg-slate-50 border-transparent hover:bg-slate-100"
// //                     }`}
// //                   >
// //                     <div className="min-w-0">
// //                       <p className="text-sm font-medium text-slate-900 truncate">
// //                         {form.title || "Untitled Form"}
// //                       </p>
// //                       <p className="text-[11px] text-slate-400 mt-0.5">
// //                         {(form.fields || []).length} field
// //                         {(form.fields || []).length !== 1 ? "s" : ""}
// //                       </p>
// //                     </div>
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         deleteForm(form.id);
// //                       }}
// //                       className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
// //                     >
// //                       <Trash2 size={13} />
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </aside>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ===================== PREVIEW =====================
// // function FormPreview({
// //   schema,
// //   onBack,
// // }: {
// //   schema: FormSchema;
// //   onBack: () => void;
// // }) {
// //   const [values, setValues] = useState<Record<string, any>>({});
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // Wire to responses API later if needed
// //     setSubmitted(true);
// //   };

// //   if (submitted) {
// //     return (
// //       <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">
// //         <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
// //           <Check size={24} className="text-emerald-600" />
// //         </div>
// //         <h2 className="text-xl font-bold text-slate-900">Thank you!</h2>
// //         <p className="text-slate-500 mt-1.5 text-sm">
// //           Your response has been recorded.
// //         </p>
// //         <button
// //           onClick={() => {
// //             setSubmitted(false);
// //             setValues({});
// //           }}
// //           className="mt-5 inline-flex px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //         >
// //           Submit another response
// //         </button>
// //         <div className="mt-3">
// //           <button
// //             onClick={onBack}
// //             className="text-xs text-slate-500 hover:text-slate-700"
// //           >
// //             Back to editor
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
// //       <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-slate-100 text-center">
// //         <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
// //           {schema.title}
// //         </h2>
// //         {schema.description && (
// //           <p className="text-slate-500 text-sm mt-1.5 max-w-xl mx-auto">
// //             {schema.description}
// //           </p>
// //         )}
// //       </div>

// //       <form
// //         onSubmit={handleSubmit}
// //         className="p-5 sm:p-8 space-y-5 max-w-2xl mx-auto"
// //       >
// //         {(schema.fields || []).map((field) => (
// //           <div key={field.id}>
// //             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
// //               {field.label}
// //               {field.required && <span className="text-red-500 ml-1">*</span>}
// //             </label>

// //             {field.type === "textarea" ? (
// //               <textarea
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 placeholder={field.placeholder}
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition resize-y"
// //                 rows={3}
// //               />
// //             ) : field.type === "select" ? (
// //               <select
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //               >
// //                 <option value="">-- Select --</option>
// //                 {field.options?.map((opt) => (
// //                   <option key={opt} value={opt}>
// //                     {opt}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : field.type === "radio" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt) => (
// //                   <label
// //                     key={opt}
// //                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// //                   >
// //                     <input
// //                       type="radio"
// //                       name={field.id}
// //                       value={opt}
// //                       required={field.required}
// //                       checked={values[field.id] === opt}
// //                       onChange={() =>
// //                         setValues((p) => ({ ...p, [field.id]: opt }))
// //                       }
// //                       className="accent-purple-600"
// //                     />
// //                     {opt}
// //                   </label>
// //                 ))}
// //               </div>
// //             ) : field.type === "checkbox" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt) => (
// //                   <label
// //                     key={opt}
// //                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       value={opt}
// //                       checked={(values[field.id] || []).includes(opt)}
// //                       onChange={(e) => {
// //                         const current: string[] = values[field.id] || [];
// //                         const next = e.target.checked
// //                           ? [...current, opt]
// //                           : current.filter((v) => v !== opt);
// //                         setValues((p) => ({ ...p, [field.id]: next }));
// //                       }}
// //                       className="rounded accent-purple-600"
// //                     />
// //                     {opt}
// //                   </label>
// //                 ))}
// //               </div>
// //             ) : (
// //               <input
// //                 type={field.type}
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 placeholder={field.placeholder}
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //               />
// //             )}
// //           </div>
// //         ))}

// //         <button
// //           type="submit"
// //           className="w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //         >
// //           Submit
// //         </button>
// //       </form>

// //       <div className="px-5 sm:px-8 pb-6 text-center">
// //         <button
// //           onClick={onBack}
// //           className="text-xs text-slate-500 hover:text-slate-700"
// //         >
// //           ← Back to editor
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import React, { useState, useEffect, useContext, useCallback } from "react";
// // import axios from "axios";
// // import { AuthContext } from "../../../../../../../src/context/AuthContext";
// // import {
// //   Plus,
// //   Save,
// //   Edit2,
// //   Trash2,
// //   Eye,
// //   Copy,
// //   Check,
// //   FileText,
// //   GripVertical,
// //   ArrowUp,
// //   ArrowDown,
// //   Link2,
// //   Loader2,
// //   Mail,
// //   MessageCircle,
// // } from "lucide-react";

// // // ===================== API =====================
// // const API = `${import.meta.env.VITE_BACKEND_URL}`;

// // // ===================== TYPES =====================
// // type FieldType =
// //   | "text"
// //   | "textarea"
// //   | "email"
// //   | "number"
// //   | "select"
// //   | "radio"
// //   | "checkbox"
// //   | "date";

// // interface FormField {
// //   id: string;
// //   type: FieldType;
// //   label: string;
// //   required: boolean;
// //   placeholder?: string;
// //   options?: string[];
// // }

// // interface FormSchema {
// //   id: string;
// //   title: string;
// //   description?: string;
// //   fields: FormField[];
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // // ===================== CONSTANTS =====================
// // const generateId = () => Math.random().toString(36).slice(2, 11);

// // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// //   { value: "text", label: "📝 Text" },
// //   { value: "textarea", label: "📄 Textarea" },
// //   { value: "email", label: "📧 Email" },
// //   { value: "number", label: "🔢 Number" },
// //   { value: "select", label: "📋 Dropdown" },
// //   { value: "radio", label: "◉ Radio Buttons" },
// //   { value: "checkbox", label: "☑️ Checkbox Group" },
// //   { value: "date", label: "📅 Date" },
// // ];

// // // ===================== MAIN COMPONENT =====================
// // export default function FormBuilder() {
// //   const { user } = useContext(AuthContext);

// //   const [forms, setForms] = useState<FormSchema[]>([]);
// //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// //   const [previewMode, setPreviewMode] = useState(false);
// //   const [copied, setCopied] = useState(false);
// //   const [savedMessage, setSavedMessage] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   // Field builder
// //   const [fieldType, setFieldType] = useState<FieldType>("text");
// //   const [fieldLabel, setFieldLabel] = useState("");
// //   const [fieldRequired, setFieldRequired] = useState(false);
// //   const [fieldPlaceholder, setFieldPlaceholder] = useState("");
// //   const [optionsInput, setOptionsInput] = useState("");
// //   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

// //   // Local draft
// //   const [draftTitle, setDraftTitle] = useState("");
// //   const [draftDescription, setDraftDescription] = useState("");
// //   const [draftFields, setDraftFields] = useState<FormField[]>([]);

// //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// //   const showOptions = ["select", "radio", "checkbox"].includes(fieldType);

// //   /* ---------------- GET FORMS ---------------- */
// //   const loadForms = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const res = await axios.get(`${API}/api/forms`, {
// //         withCredentials: true,
// //       });

// //       const data: FormSchema[] = res.data.data || [];
// //       setForms(data);

// //       if (data.length > 0) {
// //         setActiveFormId((prev) => prev || data[0].id);
// //       }
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || "Failed to load forms");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     loadForms();
// //   }, [loadForms]);

// //   /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
// //   useEffect(() => {
// //     if (activeForm) {
// //       setDraftTitle(activeForm.title);
// //       setDraftDescription(activeForm.description || "");
// //       setDraftFields(activeForm.fields || []);
// //       resetFieldBuilder();
// //     }
// //   }, [activeFormId]);

// //   /* ---------------- HELPERS ---------------- */
// //   const resetFieldBuilder = () => {
// //     setFieldType("text");
// //     setFieldLabel("");
// //     setFieldRequired(false);
// //     setFieldPlaceholder("");
// //     setOptionsInput("");
// //     setEditingFieldId(null);
// //   };

// //   /* ---------------- CREATE FORM ---------------- */
// //   const createNewForm = async () => {
// //     try {
// //       setSaving(true);
// //       setError(null);

// //       const res = await axios.post(
// //         `${API}/api/forms`,
// //         {
// //           title: "Untitled Form",
// //           description: "",
// //           fields: [],
// //         },
// //         { withCredentials: true }
// //       );

// //       const created: FormSchema = res.data.data;
// //       setForms((prev) => [created, ...prev]);
// //       setActiveFormId(created.id);
// //       setPreviewMode(false);
// //       resetFieldBuilder();
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || "Failed to create form");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ---------------- SAVE / UPDATE FORM ---------------- */
// //   const saveForm = async () => {
// //     if (!activeFormId) return;

// //     try {
// //       setSaving(true);
// //       setError(null);

// //       const res = await axios.put(
// //         `${API}/api/forms/${activeFormId}`,
// //         {
// //           title: draftTitle.trim() || "Untitled Form",
// //           description: draftDescription,
// //           fields: draftFields,
// //         },
// //         { withCredentials: true }
// //       );

// //       const updated: FormSchema = res.data.data;
// //       setForms((prev) =>
// //         prev.map((f) => (f.id === activeFormId ? updated : f))
// //       );
// //       setSavedMessage(true);
// //       setTimeout(() => setSavedMessage(false), 2000);
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || "Failed to save form");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ---------------- DELETE FORM ---------------- */
// //   const deleteForm = async (id: string) => {
// //     if (!confirm("Delete this form?")) return;

// //     try {
// //       setError(null);

// //       await axios.delete(`${API}/api/forms/${id}`, {
// //         withCredentials: true,
// //       });

// //       const updated = forms.filter((f) => f.id !== id);
// //       setForms(updated);

// //       if (activeFormId === id) {
// //         setActiveFormId(updated[0]?.id || null);
// //       }
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || "Failed to delete form");
// //     }
// //   };

// //   /* ---------------- FIELD ACTIONS ---------------- */
// //   const addOrUpdateField = () => {
// //     if (!fieldLabel.trim()) {
// //       alert("Field label is required");
// //       return;
// //     }

// //     let options: string[] | undefined;
// //     if (showOptions) {
// //       options = optionsInput
// //         .split(",")
// //         .map((o) => o.trim())
// //         .filter(Boolean);
// //       if (options.length === 0) {
// //         alert("Please provide at least one option");
// //         return;
// //       }
// //     }

// //     const newField: FormField = {
// //       id: editingFieldId || generateId(),
// //       type: fieldType,
// //       label: fieldLabel.trim(),
// //       required: fieldRequired,
// //       placeholder: fieldPlaceholder.trim() || undefined,
// //       options,
// //     };

// //     if (editingFieldId) {
// //       setDraftFields((prev) =>
// //         prev.map((f) => (f.id === editingFieldId ? newField : f))
// //       );
// //     } else {
// //       setDraftFields((prev) => [...prev, newField]);
// //     }
// //     resetFieldBuilder();
// //   };

// //   const editField = (field: FormField) => {
// //     setEditingFieldId(field.id);
// //     setFieldType(field.type);
// //     setFieldLabel(field.label);
// //     setFieldRequired(field.required);
// //     setFieldPlaceholder(field.placeholder || "");
// //     setOptionsInput(field.options?.join(", ") || "");
// //   };

// //   const deleteField = (id: string) => {
// //     setDraftFields((prev) => prev.filter((f) => f.id !== id));
// //     if (editingFieldId === id) resetFieldBuilder();
// //   };

// //   const moveField = (index: number, direction: "up" | "down") => {
// //     const newFields = [...draftFields];
// //     const target = direction === "up" ? index - 1 : index + 1;
// //     if (target < 0 || target >= newFields.length) return;
// //     [newFields[index], newFields[target]] = [
// //       newFields[target],
// //       newFields[index],
// //     ];
// //     setDraftFields(newFields);
// //   };

// //   const getFormUrl = () => {
// //     if (!activeFormId || !user?.organisation_id) return "";
// //     return `${window.location.origin}/form/${user.organisation_id}/${activeFormId}`;
// //   };

// //   const copyLink = () => {
// //     if (!activeFormId) return;
// //     const url = getFormUrl();
// //     navigator.clipboard.writeText(url);
// //     console.log(url);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const shareViaGmail = () => {
// //     const url = getFormUrl();
// //     if (!url) return;

// //     const subject = encodeURIComponent(draftTitle || "Please fill this form");
// //     const body = encodeURIComponent(
// //       `Hi,\n\nPlease fill out this form:\n${url}\n\nThank you!`
// //     );

// //     window.open(
// //       `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
// //       "_blank"
// //     );
// //   };

// //   const shareViaWhatsApp = () => {
// //     const url = getFormUrl();
// //     if (!url) return;

// //     const text = encodeURIComponent(
// //       `Hi! Please fill out this form:\n${url}`
// //     );

// //     window.open(`https://wa.me/?text=${text}`, "_blank");
// //   };

// //   /* ---------------- LOADING ---------------- */
// //   if (loading) {
// //     return (
// //       <section className="min-h-screen bg-slate-50 flex items-center justify-center">
// //         <div className="flex items-center gap-2 text-slate-500">
// //           <Loader2 size={20} className="animate-spin" />
// //           Loading forms...
// //         </div>
// //       </section>
// //     );
// //   }

// //   /* ---------------- RENDER ---------------- */
// //   return (
// //     <section className="min-h-screen bg-slate-50 py-6 sm:py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
// //           <div>
// //             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
// //               Form Management
// //             </span>
// //             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
// //               Form Builder
// //             </h1>
// //           </div>

// //           <div className="flex flex-wrap gap-2">
// //             <button
// //               onClick={createNewForm}
// //               disabled={saving}
// //               className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //             >
// //               {saving ? (
// //                 <Loader2 size={15} className="animate-spin" />
// //               ) : (
// //                 <Plus size={15} />
// //               )}
// //               New Form
// //             </button>

// //             {activeForm && (
// //               <>
// //                 <button
// //                   onClick={() => setPreviewMode(!previewMode)}
// //                   className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                 >
// //                   <Eye size={14} />
// //                   {previewMode ? "Edit" : "Preview"}
// //                 </button>

// //                 <div className="flex items-center gap-1.5">
// //                   <button
// //                     onClick={copyLink}
// //                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //                   >
// //                     {copied ? (
// //                       <Check size={14} className="text-emerald-600" />
// //                     ) : (
// //                       <Copy size={14} />
// //                     )}
// //                     {copied ? "Copied" : "Copy Link"}
// //                   </button>

// //                   <button
// //                     onClick={shareViaGmail}
// //                     title="Share via Gmail"
// //                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
// //                   >
// //                     <Mail size={14} />
// //                     Gmail
// //                   </button>

// //                   <button
// //                     onClick={shareViaWhatsApp}
// //                     title="Share via WhatsApp"
// //                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition"
// //                   >
// //                     <MessageCircle size={14} />
// //                     WhatsApp
// //                   </button>
// //                 </div>

// //                 {!previewMode && (
// //                   <button
// //                     onClick={saveForm}
// //                     disabled={saving}
// //                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //                   >
// //                     {saving ? (
// //                       <Loader2 size={14} className="animate-spin" />
// //                     ) : (
// //                       <Save size={14} />
// //                     )}
// //                     Save
// //                   </button>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* Messages */}
// //         {savedMessage && (
// //           <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm font-medium">
// //             <Check size={15} />
// //             Form saved successfully
// //           </div>
// //         )}
// //         {error && (
// //           <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm font-medium">
// //             {error}
// //             <button
// //               onClick={() => setError(null)}
// //               className="ml-auto text-red-600 hover:underline text-xs"
// //             >
// //               Dismiss
// //             </button>
// //           </div>
// //         )}

// //         {/* Main grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
// //           {/* Main content */}
// //           <div>
// //             {!activeForm ? (
// //               <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
// //                 <FileText size={36} className="mx-auto text-slate-300 mb-3" />
// //                 <p className="text-base text-slate-500 mb-4">No form selected</p>
// //                 <button
// //                   onClick={createNewForm}
// //                   disabled={saving}
// //                   className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                 >
// //                   <Plus size={15} />
// //                   Create Form
// //                 </button>
// //               </div>
// //             ) : previewMode ? (
// //               <FormPreview
// //                 schema={{
// //                   ...activeForm,
// //                   title: draftTitle,
// //                   description: draftDescription,
// //                   fields: draftFields,
// //                 }}
// //                 onBack={() => setPreviewMode(false)}
// //               />
// //             ) : (
// //               <div className="space-y-4">
// //                 {/* Form header */}
// //                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4">
// //                   <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
// //                     <div className="flex-1 min-w-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Form Name
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={draftTitle}
// //                         onChange={(e) => setDraftTitle(e.target.value)}
// //                         className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         placeholder="e.g. Employee Survey"
// //                       />
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Description
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={draftDescription}
// //                         onChange={(e) => setDraftDescription(e.target.value)}
// //                         className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         placeholder="Short description..."
// //                       />
// //                     </div>
// //                     <div className="sm:w-[280px] shrink-0">
// //                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
// //                         Share Link
// //                       </label>
// //                       <div className="flex items-center gap-1.5">
// //                         <div className="flex-1 min-w-0 flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-purple-600 truncate">
// //                           <Link2 size={12} className="shrink-0 text-slate-400" />
// //                           <span className="truncate">
// //                             /form/{user.organisation_id}/{activeFormId}
// //                           </span>
// //                         </div>
// //                         <button
// //                           onClick={copyLink}
// //                           title="Copy link"
// //                           className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition"
// //                         >
// //                           {copied ? (
// //                             <Check size={14} className="text-emerald-600" />
// //                           ) : (
// //                             <Copy size={14} />
// //                           )}
// //                         </button>
// //                         <button
// //                           onClick={shareViaGmail}
// //                           title="Share via Gmail"
// //                           className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
// //                         >
// //                           <Mail size={14} />
// //                         </button>
// //                         <button
// //                           onClick={shareViaWhatsApp}
// //                           title="Share via WhatsApp"
// //                           className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition"
// //                         >
// //                           <MessageCircle size={14} />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Builder */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //                   {/* Add field */}
// //                   <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
// //                     <h3 className="text-base font-bold text-slate-900 mb-0.5">
// //                       Add Form Fields
// //                     </h3>
// //                     <p className="text-xs text-slate-500 mb-4">
// //                       Configure fields for your form
// //                     </p>

// //                     <div className="space-y-3">
// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Field Type
// //                         </label>
// //                         <select
// //                           value={fieldType}
// //                           onChange={(e) =>
// //                             setFieldType(e.target.value as FieldType)
// //                           }
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                         >
// //                           {FIELD_TYPES.map((t) => (
// //                             <option key={t.value} value={t.value}>
// //                               {t.label}
// //                             </option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Field Label
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={fieldLabel}
// //                           onChange={(e) => setFieldLabel(e.target.value)}
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                           placeholder="e.g. Your Name"
// //                         />
// //                       </div>

// //                       <div>
// //                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                           Placeholder (optional)
// //                         </label>
// //                         <input
// //                           type="text"
// //                           value={fieldPlaceholder}
// //                           onChange={(e) => setFieldPlaceholder(e.target.value)}
// //                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                           placeholder="e.g. Enter your full name"
// //                         />
// //                       </div>

// //                       {showOptions && (
// //                         <div>
// //                           <label className="block text-xs font-semibold text-slate-700 mb-1.5">
// //                             Options (comma separated)
// //                           </label>
// //                           <input
// //                             type="text"
// //                             value={optionsInput}
// //                             onChange={(e) => setOptionsInput(e.target.value)}
// //                             className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                             placeholder="Option 1, Option 2, Option 3"
// //                           />
// //                         </div>
// //                       )}

// //                       <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
// //                         <input
// //                           type="checkbox"
// //                           checked={fieldRequired}
// //                           onChange={(e) => setFieldRequired(e.target.checked)}
// //                           className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
// //                         />
// //                         Required Field
// //                       </label>

// //                       <button
// //                         onClick={addOrUpdateField}
// //                         className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //                       >
// //                         {editingFieldId ? (
// //                           <>
// //                             <Edit2 size={15} />
// //                             Update Field
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Plus size={15} />
// //                             Add Field
// //                           </>
// //                         )}
// //                       </button>

// //                       {editingFieldId && (
// //                         <button
// //                           onClick={resetFieldBuilder}
// //                           className="w-full text-xs text-slate-500 hover:text-slate-700"
// //                         >
// //                           Cancel editing
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Added fields */}
// //                   <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
// //                     <h3 className="text-base font-bold text-slate-900 mb-3">
// //                       Added Fields ({draftFields.length})
// //                     </h3>

// //                     {draftFields.length === 0 ? (
// //                       <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
// //                         <p className="text-xs text-slate-400">
// //                           No fields added yet
// //                         </p>
// //                       </div>
// //                     ) : (
// //                       <div className="space-y-2 max-h-[380px] overflow-y-auto">
// //                         {draftFields.map((field, index) => (
// //                           <div
// //                             key={field.id}
// //                             className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
// //                           >
// //                             <GripVertical
// //                               size={14}
// //                               className="text-slate-300 shrink-0"
// //                             />
// //                             <div className="min-w-0 flex-1">
// //                               <div className="flex items-center gap-1.5 flex-wrap">
// //                                 <span className="text-sm font-medium text-slate-900">
// //                                   {field.label}
// //                                 </span>
// //                                 <span className="text-[11px] text-slate-400">
// //                                   ({field.type})
// //                                 </span>
// //                                 {field.required && (
// //                                   <span className="text-[11px] text-red-500 font-medium">
// //                                     *
// //                                   </span>
// //                                 )}
// //                               </div>
// //                               {field.options && (
// //                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
// //                                   {field.options.join(", ")}
// //                                 </p>
// //                               )}
// //                             </div>
// //                             <div className="flex items-center gap-0.5 shrink-0">
// //                               <button
// //                                 onClick={() => moveField(index, "up")}
// //                                 disabled={index === 0}
// //                                 className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
// //                               >
// //                                 <ArrowUp size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => moveField(index, "down")}
// //                                 disabled={index === draftFields.length - 1}
// //                                 className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
// //                               >
// //                                 <ArrowDown size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => editField(field)}
// //                                 className="p-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
// //                               >
// //                                 <Edit2 size={13} />
// //                               </button>
// //                               <button
// //                                 onClick={() => deleteField(field.id)}
// //                                 className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
// //                               >
// //                                 <Trash2 size={13} />
// //                               </button>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Sidebar */}
// //           <aside className="bg-white rounded-xl border border-slate-200 p-4 h-fit sticky top-4">
// //             <h3 className="text-xs font-semibold text-slate-900 mb-3">
// //               Your Forms ({forms.length})
// //             </h3>

// //             {forms.length === 0 ? (
// //               <div className="py-8 text-center">
// //                 <FileText size={24} className="mx-auto text-slate-300 mb-2" />
// //                 <p className="text-xs text-slate-400">No forms yet</p>
// //                 <button
// //                   onClick={createNewForm}
// //                   className="mt-2 text-xs font-medium text-purple-600 hover:underline"
// //                 >
// //                   Create your first form
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
// //                 {forms.map((form) => (
// //                   <div
// //                     key={form.id}
// //                     onClick={() => {
// //                       setActiveFormId(form.id);
// //                       setPreviewMode(false);
// //                       resetFieldBuilder();
// //                     }}
// //                     className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
// //                       activeFormId === form.id
// //                         ? "bg-purple-50 border-purple-300"
// //                         : "bg-slate-50 border-transparent hover:bg-slate-100"
// //                     }`}
// //                   >
// //                     <div className="min-w-0">
// //                       <p className="text-sm font-medium text-slate-900 truncate">
// //                         {form.title || "Untitled Form"}
// //                       </p>
// //                       <p className="text-[11px] text-slate-400 mt-0.5">
// //                         {(form.fields || []).length} field
// //                         {(form.fields || []).length !== 1 ? "s" : ""}
// //                       </p>
// //                     </div>
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         deleteForm(form.id);
// //                       }}
// //                       className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
// //                     >
// //                       <Trash2 size={13} />
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </aside>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // // ===================== PREVIEW =====================
// // function FormPreview({
// //   schema,
// //   onBack,
// // }: {
// //   schema: FormSchema;
// //   onBack: () => void;
// // }) {
// //   const [values, setValues] = useState<Record<string, any>>({});
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // Wire to responses API later if needed
// //     setSubmitted(true);
// //   };

// //   if (submitted) {
// //     return (
// //       <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">
// //         <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
// //           <Check size={24} className="text-emerald-600" />
// //         </div>
// //         <h2 className="text-xl font-bold text-slate-900">Thank you!</h2>
// //         <p className="text-slate-500 mt-1.5 text-sm">
// //           Your response has been recorded.
// //         </p>
// //         <button
// //           onClick={() => {
// //             setSubmitted(false);
// //             setValues({});
// //           }}
// //           className="mt-5 inline-flex px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //         >
// //           Submit another response
// //         </button>
// //         <div className="mt-3">
// //           <button
// //             onClick={onBack}
// //             className="text-xs text-slate-500 hover:text-slate-700"
// //           >
// //             Back to editor
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
// //       <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-slate-100 text-center">
// //         <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
// //           {schema.title}
// //         </h2>
// //         {schema.description && (
// //           <p className="text-slate-500 text-sm mt-1.5 max-w-xl mx-auto">
// //             {schema.description}
// //           </p>
// //         )}
// //       </div>

// //       <form
// //         onSubmit={handleSubmit}
// //         className="p-5 sm:p-8 space-y-5 max-w-2xl mx-auto"
// //       >
// //         {(schema.fields || []).map((field) => (
// //           <div key={field.id}>
// //             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
// //               {field.label}
// //               {field.required && <span className="text-red-500 ml-1">*</span>}
// //             </label>

// //             {field.type === "textarea" ? (
// //               <textarea
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 placeholder={field.placeholder}
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition resize-y"
// //                 rows={3}
// //               />
// //             ) : field.type === "select" ? (
// //               <select
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //               >
// //                 <option value="">-- Select --</option>
// //                 {field.options?.map((opt) => (
// //                   <option key={opt} value={opt}>
// //                     {opt}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : field.type === "radio" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt) => (
// //                   <label
// //                     key={opt}
// //                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// //                   >
// //                     <input
// //                       type="radio"
// //                       name={field.id}
// //                       value={opt}
// //                       required={field.required}
// //                       checked={values[field.id] === opt}
// //                       onChange={() =>
// //                         setValues((p) => ({ ...p, [field.id]: opt }))
// //                       }
// //                       className="accent-purple-600"
// //                     />
// //                     {opt}
// //                   </label>
// //                 ))}
// //               </div>
// //             ) : field.type === "checkbox" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt) => (
// //                   <label
// //                     key={opt}
// //                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       value={opt}
// //                       checked={(values[field.id] || []).includes(opt)}
// //                       onChange={(e) => {
// //                         const current: string[] = values[field.id] || [];
// //                         const next = e.target.checked
// //                           ? [...current, opt]
// //                           : current.filter((v) => v !== opt);
// //                         setValues((p) => ({ ...p, [field.id]: next }));
// //                       }}
// //                       className="rounded accent-purple-600"
// //                     />
// //                     {opt}
// //                   </label>
// //                 ))}
// //               </div>
// //             ) : (
// //               <input
// //                 type={field.type}
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) =>
// //                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
// //                 }
// //                 placeholder={field.placeholder}
// //                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //               />
// //             )}
// //           </div>
// //         ))}

// //         <button
// //           type="submit"
// //           className="w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
// //         >
// //           Submit
// //         </button>
// //       </form>

// //       <div className="px-5 sm:px-8 pb-6 text-center">
// //         <button
// //           onClick={onBack}
// //           className="text-xs text-slate-500 hover:text-slate-700"
// //         >
// //           ← Back to editor
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import React, { useState, useEffect, useContext, useCallback } from "react";
// import axios from "axios";
// import { AuthContext } from "../../../../../../../src/context/AuthContext";
// import {
//   Plus,
//   Save,
//   Edit2,
//   Trash2,
//   Eye,
//   Copy,
//   Check,
//   FileText,
//   GripVertical,
//   ArrowUp,
//   ArrowDown,
//   Link2,
//   Loader2,
//   Mail,
//   MessageCircle,
//   Inbox,
// } from "lucide-react";

// // ===================== API =====================
// const API = `${import.meta.env.VITE_BACKEND_URL}`;

// // ===================== TYPES =====================
// type FieldType =
//   | "text"
//   | "textarea"
//   | "email"
//   | "number"
//   | "select"
//   | "radio"
//   | "checkbox"
//   | "date";

// interface FormField {
//   id: string;
//   type: FieldType;
//   label: string;
//   required: boolean;
//   placeholder?: string;
//   options?: string[];
// }

// interface FormSchema {
//   id: string;
//   title: string;
//   description?: string;
//   fields: FormField[];
//   createdAt: string;
//   updatedAt: string;
// }

// // interface FormResponse {
// //   id: string;
// //   formId: string;
// //   values: Record<string, any>;
// //   createdAt: string;
// // }

// // ===================== CONSTANTS =====================
// const generateId = () => Math.random().toString(36).slice(2, 11);

// const FIELD_TYPES: { value: FieldType; label: string }[] = [
//   { value: "text", label: "📝 Text" },
//   { value: "textarea", label: "📄 Textarea" },
//   { value: "email", label: "📧 Email" },
//   { value: "number", label: "🔢 Number" },
//   { value: "select", label: "📋 Dropdown" },
//   { value: "radio", label: "◉ Radio Buttons" },
//   { value: "checkbox", label: "☑️ Checkbox Group" },
//   { value: "date", label: "📅 Date" },
// ];

// // ===================== MAIN COMPONENT =====================
// export default function FormBuilder() {
//   const { user } = useContext(AuthContext);

//   const [forms, setForms] = useState<FormSchema[]>([]);
//   const [activeFormId, setActiveFormId] = useState<string | null>(null);
//   const [viewMode, setViewMode] = useState<"edit" | "preview" | "responses">(
//     "edit"
//   );
//   const [copied, setCopied] = useState(false);
//   const [savedMessage, setSavedMessage] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Responses
//   const [responses, setResponses] = useState<FormResponse[]>([]);
//   const [responsesLoading, setResponsesLoading] = useState(false);
//   const [responsesError, setResponsesError] = useState<string | null>(null);

//   // Field builder
//   const [fieldType, setFieldType] = useState<FieldType>("text");
//   const [fieldLabel, setFieldLabel] = useState("");
//   const [fieldRequired, setFieldRequired] = useState(false);
//   const [fieldPlaceholder, setFieldPlaceholder] = useState("");
//   const [optionsInput, setOptionsInput] = useState("");
//   const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

//   // Local draft
//   const [draftTitle, setDraftTitle] = useState("");
//   const [draftDescription, setDraftDescription] = useState("");
//   const [draftFields, setDraftFields] = useState<FormField[]>([]);

//   const activeForm = forms.find((f) => f.id === activeFormId) || null;
//   const showOptions = ["select", "radio", "checkbox"].includes(fieldType);

//   /* ---------------- GET FORMS ---------------- */
//   const loadForms = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await axios.get(`${API}/api/forms`, {
//         withCredentials: true,
//       });

//       const data: FormSchema[] = res.data.data || [];
//       setForms(data);

//       if (data.length > 0) {
//         setActiveFormId((prev) => prev || data[0].id);
//       }
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.response?.data?.message || "Failed to load forms");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadForms();
//   }, [loadForms]);

//   /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
//   useEffect(() => {
//     if (activeForm) {
//       setDraftTitle(activeForm.title);
//       setDraftDescription(activeForm.description || "");
//       setDraftFields(activeForm.fields || []);
//       resetFieldBuilder();
//     }
//   }, [activeFormId]);

//   /* ---------------- LOAD RESPONSES ---------------- */
//   const loadResponses = useCallback(async () => {
//     if (!activeFormId) return;

//     try {
//       setResponsesLoading(true);
//       setResponsesError(null);

//       const res = await axios.get(
//         `${API}/api/forms/${activeFormId}/responses`,
//         { withCredentials: true }
//       );

//       if (!res.data?.success) {
//         setResponsesError(res.data?.message || "Failed to load responses");
//         setResponses([]);
//         return;
//       }

//       setResponses(res.data.data?.responses || []);
//     } catch (err: any) {
//       console.error(err);
//       setResponsesError(
//         err?.response?.data?.message || "Failed to load responses"
//       );
//       setResponses([]);
//     } finally {
//       setResponsesLoading(false);
//     }
//   }, [activeFormId]);

//   useEffect(() => {
//     if (viewMode === "responses" && activeFormId) {
//       loadResponses();
//     }
//   }, [viewMode, activeFormId, loadResponses]);

//   /* ---------------- HELPERS ---------------- */
//   const resetFieldBuilder = () => {
//     setFieldType("text");
//     setFieldLabel("");
//     setFieldRequired(false);
//     setFieldPlaceholder("");
//     setOptionsInput("");
//     setEditingFieldId(null);
//   };

//   /* ---------------- CREATE FORM ---------------- */
//   const createNewForm = async () => {
//     try {
//       setSaving(true);
//       setError(null);

//       const res = await axios.post(
//         `${API}/api/forms`,
//         {
//           title: "Untitled Form",
//           description: "",
//           fields: [],
//         },
//         { withCredentials: true }
//       );

//       const created: FormSchema = res.data.data;
//       setForms((prev) => [created, ...prev]);
//       setActiveFormId(created.id);
//       setViewMode("edit");
//       resetFieldBuilder();
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.response?.data?.message || "Failed to create form");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ---------------- SAVE / UPDATE FORM ---------------- */
//   const saveForm = async () => {
//     if (!activeFormId) return;

//     try {
//       setSaving(true);
//       setError(null);

//       const res = await axios.put(
//         `${API}/api/forms/${activeFormId}`,
//         {
//           title: draftTitle.trim() || "Untitled Form",
//           description: draftDescription,
//           fields: draftFields,
//         },
//         { withCredentials: true }
//       );

//       const updated: FormSchema = res.data.data;
//       setForms((prev) =>
//         prev.map((f) => (f.id === activeFormId ? updated : f))
//       );
//       setSavedMessage(true);
//       setTimeout(() => setSavedMessage(false), 2000);
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.response?.data?.message || "Failed to save form");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ---------------- DELETE FORM ---------------- */
//   const deleteForm = async (id: string) => {
//     if (!confirm("Delete this form?")) return;

//     try {
//       setError(null);

//       await axios.delete(`${API}/api/forms/${id}`, {
//         withCredentials: true,
//       });

//       const updated = forms.filter((f) => f.id !== id);
//       setForms(updated);

//       if (activeFormId === id) {
//         setActiveFormId(updated[0]?.id || null);
//         setViewMode("edit");
//       }
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.response?.data?.message || "Failed to delete form");
//     }
//   };

//   /* ---------------- FIELD ACTIONS ---------------- */
//   const addOrUpdateField = () => {
//     if (!fieldLabel.trim()) {
//       alert("Field label is required");
//       return;
//     }

//     let options: string[] | undefined;
//     if (showOptions) {
//       options = optionsInput
//         .split(",")
//         .map((o) => o.trim())
//         .filter(Boolean);
//       if (options.length === 0) {
//         alert("Please provide at least one option");
//         return;
//       }
//     }

//     const newField: FormField = {
//       id: editingFieldId || generateId(),
//       type: fieldType,
//       label: fieldLabel.trim(),
//       required: fieldRequired,
//       placeholder: fieldPlaceholder.trim() || undefined,
//       options,
//     };

//     if (editingFieldId) {
//       setDraftFields((prev) =>
//         prev.map((f) => (f.id === editingFieldId ? newField : f))
//       );
//     } else {
//       setDraftFields((prev) => [...prev, newField]);
//     }
//     resetFieldBuilder();
//   };

//   const editField = (field: FormField) => {
//     setEditingFieldId(field.id);
//     setFieldType(field.type);
//     setFieldLabel(field.label);
//     setFieldRequired(field.required);
//     setFieldPlaceholder(field.placeholder || "");
//     setOptionsInput(field.options?.join(", ") || "");
//   };

//   const deleteField = (id: string) => {
//     setDraftFields((prev) => prev.filter((f) => f.id !== id));
//     if (editingFieldId === id) resetFieldBuilder();
//   };

//   const moveField = (index: number, direction: "up" | "down") => {
//     const newFields = [...draftFields];
//     const target = direction === "up" ? index - 1 : index + 1;
//     if (target < 0 || target >= newFields.length) return;
//     [newFields[index], newFields[target]] = [
//       newFields[target],
//       newFields[index],
//     ];
//     setDraftFields(newFields);
//   };

//   const getFormUrl = () => {
//     if (!activeFormId || !user?.organisation_id) return "";
//     return `${window.location.origin}/form/${user.organisation_id}/${activeFormId}`;
//   };

//   const copyLink = () => {
//     if (!activeFormId) return;
//     const url = getFormUrl();
//     navigator.clipboard.writeText(url);
//     console.log(url);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const shareViaGmail = () => {
//     const url = getFormUrl();
//     if (!url) return;

//     const subject = encodeURIComponent(draftTitle || "Please fill this form");
//     const body = encodeURIComponent(
//       `Hi,\n\nPlease fill out this form:\n${url}\n\nThank you!`
//     );

//     window.open(
//       `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
//       "_blank"
//     );
//   };

//   const shareViaWhatsApp = () => {
//     const url = getFormUrl();
//     if (!url) return;

//     const text = encodeURIComponent(
//       `Hi! Please fill out this form:\n${url}`
//     );

//     window.open(`https://wa.me/?text=${text}`, "_blank");
//   };

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <section className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="flex items-center gap-2 text-slate-500">
//           <Loader2 size={20} className="animate-spin" />
//           Loading forms...
//         </div>
//       </section>
//     );
//   }

//   /* ---------------- RENDER ---------------- */
//   return (
//     <section className="min-h-screen bg-slate-50 py-6 sm:py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
//           <div>
//             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
//               Form Management
//             </span>
//             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
//               Form Builder
//             </h1>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={createNewForm}
//               disabled={saving}
//               className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
//             >
//               {saving ? (
//                 <Loader2 size={15} className="animate-spin" />
//               ) : (
//                 <Plus size={15} />
//               )}
//               New Form
//             </button>

//             {activeForm && (
//               <>
//                 <button
//                   onClick={() =>
//                     setViewMode(viewMode === "preview" ? "edit" : "preview")
//                   }
//                   className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
//                     viewMode === "preview"
//                       ? "bg-purple-50 border-purple-300 text-purple-700"
//                       : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//                   }`}
//                 >
//                   <Eye size={14} />
//                   {viewMode === "preview" ? "Edit" : "Preview"}
//                 </button>

//                 <button
//                   onClick={() =>
//                     setViewMode(
//                       viewMode === "responses" ? "edit" : "responses"
//                     )
//                   }
//                   className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
//                     viewMode === "responses"
//                       ? "bg-purple-50 border-purple-300 text-purple-700"
//                       : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//                   }`}
//                 >
//                   <Inbox size={14} />
//                   Responses
//                 </button>

//                 <div className="flex items-center gap-1.5">
//                   <button
//                     onClick={copyLink}
//                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
//                   >
//                     {copied ? (
//                       <Check size={14} className="text-emerald-600" />
//                     ) : (
//                       <Copy size={14} />
//                     )}
//                     {copied ? "Copied" : "Copy Link"}
//                   </button>

//                   <button
//                     onClick={shareViaGmail}
//                     title="Share via Gmail"
//                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
//                   >
//                     <Mail size={14} />
//                     Gmail
//                   </button>

//                   <button
//                     onClick={shareViaWhatsApp}
//                     title="Share via WhatsApp"
//                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition"
//                   >
//                     <MessageCircle size={14} />
//                     WhatsApp
//                   </button>
//                 </div>

//                 {viewMode === "edit" && (
//                   <button
//                     onClick={saveForm}
//                     disabled={saving}
//                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
//                   >
//                     {saving ? (
//                       <Loader2 size={14} className="animate-spin" />
//                     ) : (
//                       <Save size={14} />
//                     )}
//                     Save
//                   </button>
//                 )}
//               </>
//             )}
//           </div>
//         </div>

//         {/* Messages */}
//         {savedMessage && (
//           <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm font-medium">
//             <Check size={15} />
//             Form saved successfully
//           </div>
//         )}
//         {error && (
//           <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm font-medium">
//             {error}
//             <button
//               onClick={() => setError(null)}
//               className="ml-auto text-red-600 hover:underline text-xs"
//             >
//               Dismiss
//             </button>
//           </div>
//         )}

//         {/* Main grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
//           {/* Main content */}
//           <div>
//             {!activeForm ? (
//               <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
//                 <FileText size={36} className="mx-auto text-slate-300 mb-3" />
//                 <p className="text-base text-slate-500 mb-4">No form selected</p>
//                 <button
//                   onClick={createNewForm}
//                   disabled={saving}
//                   className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
//                 >
//                   <Plus size={15} />
//                   Create Form
//                 </button>
//               </div>
//             ) : viewMode === "preview" ? (
//               <FormPreview
//                 schema={{
//                   ...activeForm,
//                   title: draftTitle,
//                   description: draftDescription,
//                   fields: draftFields,
//                 }}
//                 onBack={() => setViewMode("edit")}
//               />
//             ) : viewMode === "responses" ? (
//               <FormResponses
//                 formTitle={draftTitle || activeForm.title}
//                 fields={
//                   draftFields.length ? draftFields : activeForm.fields || []
//                 }
//                 responses={responses}
//                 loading={responsesLoading}
//                 error={responsesError}
//                 onRefresh={loadResponses}
//                 onBack={() => setViewMode("edit")}
//               />
//             ) : (
//               <div className="space-y-4">
//                 {/* Form header */}
//                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4">
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
//                     <div className="flex-1 min-w-0">
//                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
//                         Form Name
//                       </label>
//                       <input
//                         type="text"
//                         value={draftTitle}
//                         onChange={(e) => setDraftTitle(e.target.value)}
//                         className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                         placeholder="e.g. Employee Survey"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
//                         Description
//                       </label>
//                       <input
//                         type="text"
//                         value={draftDescription}
//                         onChange={(e) => setDraftDescription(e.target.value)}
//                         className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                         placeholder="Short description..."
//                       />
//                     </div>
//                     <div className="sm:w-[280px] shrink-0">
//                       <label className="block text-[11px] font-medium text-slate-500 mb-1">
//                         Share Link
//                       </label>
//                       <div className="flex items-center gap-1.5">
//                         <div className="flex-1 min-w-0 flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-purple-600 truncate">
//                           <Link2 size={12} className="shrink-0 text-slate-400" />
//                           <span className="truncate">
//                             /form/{user.organisation_id}/{activeFormId}
//                           </span>
//                         </div>
//                         <button
//                           onClick={copyLink}
//                           title="Copy link"
//                           className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition"
//                         >
//                           {copied ? (
//                             <Check size={14} className="text-emerald-600" />
//                           ) : (
//                             <Copy size={14} />
//                           )}
//                         </button>
//                         <button
//                           onClick={shareViaGmail}
//                           title="Share via Gmail"
//                           className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
//                         >
//                           <Mail size={14} />
//                         </button>
//                         <button
//                           onClick={shareViaWhatsApp}
//                           title="Share via WhatsApp"
//                           className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition"
//                         >
//                           <MessageCircle size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Builder */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                   {/* Add field */}
//                   <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
//                     <h3 className="text-base font-bold text-slate-900 mb-0.5">
//                       Add Form Fields
//                     </h3>
//                     <p className="text-xs text-slate-500 mb-4">
//                       Configure fields for your form
//                     </p>

//                     <div className="space-y-3">
//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                           Field Type
//                         </label>
//                         <select
//                           value={fieldType}
//                           onChange={(e) =>
//                             setFieldType(e.target.value as FieldType)
//                           }
//                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                         >
//                           {FIELD_TYPES.map((t) => (
//                             <option key={t.value} value={t.value}>
//                               {t.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                           Field Label
//                         </label>
//                         <input
//                           type="text"
//                           value={fieldLabel}
//                           onChange={(e) => setFieldLabel(e.target.value)}
//                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                           placeholder="e.g. Your Name"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                           Placeholder (optional)
//                         </label>
//                         <input
//                           type="text"
//                           value={fieldPlaceholder}
//                           onChange={(e) => setFieldPlaceholder(e.target.value)}
//                           className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                           placeholder="e.g. Enter your full name"
//                         />
//                       </div>

//                       {showOptions && (
//                         <div>
//                           <label className="block text-xs font-semibold text-slate-700 mb-1.5">
//                             Options (comma separated)
//                           </label>
//                           <input
//                             type="text"
//                             value={optionsInput}
//                             onChange={(e) => setOptionsInput(e.target.value)}
//                             className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                             placeholder="Option 1, Option 2, Option 3"
//                           />
//                         </div>
//                       )}

//                       <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={fieldRequired}
//                           onChange={(e) => setFieldRequired(e.target.checked)}
//                           className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
//                         />
//                         Required Field
//                       </label>

//                       <button
//                         onClick={addOrUpdateField}
//                         className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
//                       >
//                         {editingFieldId ? (
//                           <>
//                             <Edit2 size={15} />
//                             Update Field
//                           </>
//                         ) : (
//                           <>
//                             <Plus size={15} />
//                             Add Field
//                           </>
//                         )}
//                       </button>

//                       {editingFieldId && (
//                         <button
//                           onClick={resetFieldBuilder}
//                           className="w-full text-xs text-slate-500 hover:text-slate-700"
//                         >
//                           Cancel editing
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Added fields */}
//                   <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
//                     <h3 className="text-base font-bold text-slate-900 mb-3">
//                       Added Fields ({draftFields.length})
//                     </h3>

//                     {draftFields.length === 0 ? (
//                       <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
//                         <p className="text-xs text-slate-400">
//                           No fields added yet
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="space-y-2 max-h-[380px] overflow-y-auto">
//                         {draftFields.map((field, index) => (
//                           <div
//                             key={field.id}
//                             className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
//                           >
//                             <GripVertical
//                               size={14}
//                               className="text-slate-300 shrink-0"
//                             />
//                             <div className="min-w-0 flex-1">
//                               <div className="flex items-center gap-1.5 flex-wrap">
//                                 <span className="text-sm font-medium text-slate-900">
//                                   {field.label}
//                                 </span>
//                                 <span className="text-[11px] text-slate-400">
//                                   ({field.type})
//                                 </span>
//                                 {field.required && (
//                                   <span className="text-[11px] text-red-500 font-medium">
//                                     *
//                                   </span>
//                                 )}
//                               </div>
//                               {field.options && (
//                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
//                                   {field.options.join(", ")}
//                                 </p>
//                               )}
//                             </div>
//                             <div className="flex items-center gap-0.5 shrink-0">
//                               <button
//                                 onClick={() => moveField(index, "up")}
//                                 disabled={index === 0}
//                                 className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
//                               >
//                                 <ArrowUp size={13} />
//                               </button>
//                               <button
//                                 onClick={() => moveField(index, "down")}
//                                 disabled={index === draftFields.length - 1}
//                                 className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
//                               >
//                                 <ArrowDown size={13} />
//                               </button>
//                               <button
//                                 onClick={() => editField(field)}
//                                 className="p-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
//                               >
//                                 <Edit2 size={13} />
//                               </button>
//                               <button
//                                 onClick={() => deleteField(field.id)}
//                                 className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
//                               >
//                                 <Trash2 size={13} />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <aside className="bg-white rounded-xl border border-slate-200 p-4 h-fit sticky top-4">
//             <h3 className="text-xs font-semibold text-slate-900 mb-3">
//               Your Forms ({forms.length})
//             </h3>

//             {forms.length === 0 ? (
//               <div className="py-8 text-center">
//                 <FileText size={24} className="mx-auto text-slate-300 mb-2" />
//                 <p className="text-xs text-slate-400">No forms yet</p>
//                 <button
//                   onClick={createNewForm}
//                   className="mt-2 text-xs font-medium text-purple-600 hover:underline"
//                 >
//                   Create your first form
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
//                 {forms.map((form) => (
//                   <div
//                     key={form.id}
//                     onClick={() => {
//                       setActiveFormId(form.id);
//                       setViewMode("edit");
//                       resetFieldBuilder();
//                     }}
//                     className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
//                       activeFormId === form.id
//                         ? "bg-purple-50 border-purple-300"
//                         : "bg-slate-50 border-transparent hover:bg-slate-100"
//                     }`}
//                   >
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-slate-900 truncate">
//                         {form.title || "Untitled Form"}
//                       </p>
//                       <p className="text-[11px] text-slate-400 mt-0.5">
//                         {(form.fields || []).length} field
//                         {(form.fields || []).length !== 1 ? "s" : ""}
//                       </p>
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         deleteForm(form.id);
//                       }}
//                       className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
//                     >
//                       <Trash2 size={13} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </aside>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ===================== RESPONSES =====================
// // function FormResponses({
// //   formTitle,
// //   fields,
// //   responses,
// //   loading,
// //   error,
// //   onRefresh,
// //   onBack,
// // }: {
// //   formTitle: string;
// //   fields: FormField[];
// //   responses: FormResponse[];
// //   loading: boolean;
// //   error: string | null;
// //   onRefresh: () => void;
// //   onBack: () => void;
// // }) {
// //   const formatValue = (val: any) => {
// //     if (val == null || val === "") return "—";
// //     if (Array.isArray(val)) return val.length ? val.join(", ") : "—";
// //     return String(val);
// //   };

// //   const formatDate = (iso: string) => {
// //     try {
// //       return new Date(iso).toLocaleString();
// //     } catch {
// //       return iso;
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="bg-white rounded-xl border border-slate-200 py-16 flex items-center justify-center gap-2 text-slate-500">
// //         <Loader2 size={18} className="animate-spin" />
// //         Loading responses...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
// //       <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
// //         <div>
// //           <h2 className="text-lg font-bold text-slate-900">Responses</h2>
// //           <p className="text-xs text-slate-500 mt-0.5">
// //             {formTitle} · {responses.length} response
// //             {responses.length !== 1 ? "s" : ""}
// //           </p>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <button
// //             onClick={onRefresh}
// //             className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //           >
// //             Refresh
// //           </button>
// //           <button
// //             onClick={onBack}
// //             className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
// //           >
// //             ← Back to editor
// //           </button>
// //         </div>
// //       </div>

// //       {error && (
// //         <div className="mx-5 mt-4 px-3 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
// //           {error}
// //         </div>
// //       )}

// //       {responses.length === 0 ? (
// //         <div className="py-16 text-center">
// //           <Inbox size={32} className="mx-auto text-slate-300 mb-2" />
// //           <p className="text-sm text-slate-500">No responses yet</p>
// //           <p className="text-xs text-slate-400 mt-1">
// //             Share the form link to start collecting answers
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             {/* <thead>
// //               <tr className="bg-slate-50 border-b border-slate-100">
// //                 <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
// //                   #
// //                 </th>
// //                 <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
// //                   Submitted
// //                 </th>
// //                 {fields.map((f) => (
// //                   <th
// //                     key={f.id}
// //                     className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap max-w-[180px]"
// //                   >
// //                     {f.label}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead> */}
// //             {/* <tbody>
// //               {responses.map((r, idx) => (
// //                 <tr
// //                   key={r.id}
// //                   className="border-b border-slate-100 hover:bg-slate-50/80 transition"
// //                 >
// //                   <td className="px-4 py-3 text-slate-400 tabular-nums">
// //                     {responses.length - idx}
// //                   </td>
// //                   <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
// //                     {formatDate(r.createdAt)}
// //                   </td>
// //                   {fields.map((f) => (
// //                     <td
// //                       key={f.id}
// //                       className="px-4 py-3 text-slate-800 max-w-[220px] truncate"
// //                       title={formatValue(r.values?.[f.id])}
// //                     >
// //                       {formatValue(r.values?.[f.id])}
// //                     </td>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </tbody> */}
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// function FormResponses({
//   formTitle,
//   fields,
//   responses,
//   loading,
//   error,
//   onRefresh,
//   onBack,
// }: {
//   formTitle: string;
//   fields: FormField[];
//   responses: FormResponse[];
//   loading: boolean;
//   error: string | null;
//   onRefresh: () => void;
//   onBack: () => void;
// }) {
//   const formatValue = (val: any) => {
//     if (val == null || val === "") return "—";
//     if (Array.isArray(val)) return val.length ? val.join(", ") : "—";
//     if (typeof val === "object") return JSON.stringify(val);
//     return String(val);
//   };

//   // Build columns: prefer form fields; if empty, use keys from first response
//   const columns =
//     fields.length > 0
//       ? fields.map((f) => ({ key: f.id, label: f.label }))
//       : (() => {
//           const first = responses[0]?.values;
//           if (!first || typeof first !== "object") return [];
//           return Object.keys(first).map((key) => ({ key, label: key }));
//         })();

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl border border-slate-200 py-16 flex items-center justify-center gap-2 text-slate-500">
//         <Loader2 size={18} className="animate-spin" />
//         Loading responses...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//       <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//         <div>
//           <h2 className="text-lg font-bold text-slate-900">Responses</h2>
//           <p className="text-xs text-slate-500 mt-0.5">
//             {formTitle} · {responses.length} response
//             {responses.length !== 1 ? "s" : ""}
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={onRefresh}
//             className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
//           >
//             Refresh
//           </button>
//           <button
//             onClick={onBack}
//             className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
//           >
//             ← Back to editor
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="mx-5 mt-4 px-3 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
//           {error}
//         </div>
//       )}

//       {responses.length === 0 ? (
//         <div className="py-16 text-center">
//           <Inbox size={32} className="mx-auto text-slate-300 mb-2" />
//           <p className="text-sm text-slate-500">No responses yet</p>
//           <p className="text-xs text-slate-400 mt-1">
//             Share the form link to start collecting answers
//           </p>
//         </div>
//       ) : columns.length === 0 ? (
//         <div className="p-5 space-y-3">
//           <p className="text-xs text-slate-500 mb-2">
//             Could not map field labels — showing raw response data
//           </p>
//           {responses.map((r, idx) => (
//             <pre
//               key={r.id}
//               className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto"
//             >
//               #{responses.length - idx}
//               {"\n"}
//               {JSON.stringify(r.values, null, 2)}
//             </pre>
//           ))}
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-slate-50 border-b border-slate-100">
//                 <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
//                   #
//                 </th>
//                 {columns.map((col) => (
//                   <th
//                     key={col.key}
//                     className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap max-w-[180px]"
//                   >
//                     {col.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {responses.map((r, idx) => (
//                 <tr
//                   key={r.id}
//                   className="border-b border-slate-100 hover:bg-slate-50/80 transition"
//                 >
//                   <td className="px-4 py-3 text-slate-400 tabular-nums">
//                     {responses.length - idx}
//                   </td>
//                   {columns.map((col) => (
//                     <td
//                       key={col.key}
//                       className="px-4 py-3 text-slate-800 max-w-[220px] truncate"
//                       title={formatValue(r.values?.[col.key])}
//                     >
//                       {formatValue(r.values?.[col.key])}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// // ===================== PREVIEW =====================
// function FormPreview({
//   schema,
//   onBack,
// }: {
//   schema: FormSchema;
//   onBack: () => void;
// }) {
//   const [values, setValues] = useState<Record<string, any>>({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Preview only — real submissions go through the public form page
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">
//         <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
//           <Check size={24} className="text-emerald-600" />
//         </div>
//         <h2 className="text-xl font-bold text-slate-900">Thank you!</h2>
//         <p className="text-slate-500 mt-1.5 text-sm">
//           Your response has been recorded.
//         </p>
//         <button
//           onClick={() => {
//             setSubmitted(false);
//             setValues({});
//           }}
//           className="mt-5 inline-flex px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
//         >
//           Submit another response
//         </button>
//         <div className="mt-3">
//           <button
//             onClick={onBack}
//             className="text-xs text-slate-500 hover:text-slate-700"
//           >
//             Back to editor
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//       <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-slate-100 text-center">
//         <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
//           {schema.title}
//         </h2>
//         {schema.description && (
//           <p className="text-slate-500 text-sm mt-1.5 max-w-xl mx-auto">
//             {schema.description}
//           </p>
//         )}
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="p-5 sm:p-8 space-y-5 max-w-2xl mx-auto"
//       >
//         {(schema.fields || []).map((field) => (
//           <div key={field.id}>
//             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
//               {field.label}
//               {field.required && <span className="text-red-500 ml-1">*</span>}
//             </label>

//             {field.type === "textarea" ? (
//               <textarea
//                 required={field.required}
//                 value={values[field.id] || ""}
//                 onChange={(e) =>
//                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
//                 }
//                 placeholder={field.placeholder}
//                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition resize-y"
//                 rows={3}
//               />
//             ) : field.type === "select" ? (
//               <select
//                 required={field.required}
//                 value={values[field.id] || ""}
//                 onChange={(e) =>
//                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
//                 }
//                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//               >
//                 <option value="">-- Select --</option>
//                 {field.options?.map((opt) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             ) : field.type === "radio" ? (
//               <div className="space-y-2">
//                 {field.options?.map((opt) => (
//                   <label
//                     key={opt}
//                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
//                   >
//                     <input
//                       type="radio"
//                       name={field.id}
//                       value={opt}
//                       required={field.required}
//                       checked={values[field.id] === opt}
//                       onChange={() =>
//                         setValues((p) => ({ ...p, [field.id]: opt }))
//                       }
//                       className="accent-purple-600"
//                     />
//                     {opt}
//                   </label>
//                 ))}
//               </div>
//             ) : field.type === "checkbox" ? (
//               <div className="space-y-2">
//                 {field.options?.map((opt) => (
//                   <label
//                     key={opt}
//                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
//                   >
//                     <input
//                       type="checkbox"
//                       value={opt}
//                       checked={(values[field.id] || []).includes(opt)}
//                       onChange={(e) => {
//                         const current: string[] = values[field.id] || [];
//                         const next = e.target.checked
//                           ? [...current, opt]
//                           : current.filter((v) => v !== opt);
//                         setValues((p) => ({ ...p, [field.id]: next }));
//                       }}
//                       className="rounded accent-purple-600"
//                     />
//                     {opt}
//                   </label>
//                 ))}
//               </div>
//             ) : (
//               <input
//                 type={field.type}
//                 required={field.required}
//                 value={values[field.id] || ""}
//                 onChange={(e) =>
//                   setValues((p) => ({ ...p, [field.id]: e.target.value }))
//                 }
//                 placeholder={field.placeholder}
//                 className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//               />
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
//         >
//           Submit
//         </button>
//       </form>

//       <div className="px-5 sm:px-8 pb-6 text-center">
//         <button
//           onClick={onBack}
//           className="text-xs text-slate-500 hover:text-slate-700"
//         >
//           ← Back to editor
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../../../src/context/AuthContext";
import {
  Plus,
  Save,
  Edit2,
  Trash2,
  Eye,
  Copy,
  Check,
  FileText,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Link2,
  Loader2,
  Mail,
  MessageCircle,
  Inbox,
} from "lucide-react";

// ===================== API =====================
const API = `${import.meta.env.VITE_BACKEND_URL}`;

// ===================== TYPES =====================
type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "tel"
  | "number"
  | "date"
  | "daterange"
  | "select"
  | "radio"
  | "checkbox-group"
  | "checkbox"
  | "rating";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface FormSchema {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

interface FormResponse {
  id: string;
  formId: string;
  values: Record<string, any>;
  createdAt: string;
}

// ===================== CONSTANTS =====================
const generateId = () => Math.random().toString(36).slice(2, 11);

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "📝 Text" },
  { value: "email", label: "📧 Email" },
  { value: "tel", label: "📱 Mobile Number" },
  { value: "textarea", label: "📄 Textarea" },
  { value: "number", label: "🔢 Number" },
  { value: "date", label: "📅 Date" },
  { value: "daterange", label: "📆 Date Range" },
  { value: "select", label: "📋 Dropdown" },
  { value: "radio", label: "◉ Radio Buttons" },
  { value: "checkbox-group", label: "☑️ Checkbox Group" },
  { value: "checkbox", label: "☐ Single Checkbox" },
  { value: "rating", label: "⭐ Rating" },
];

// ===================== MAIN COMPONENT =====================
export default function FormBuilder() {
  const { user } = useContext(AuthContext);

  const [forms, setForms] = useState<FormSchema[]>([]);
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "responses">(
    "edit"
  );
  const [copied, setCopied] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Responses
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [responsesError, setResponsesError] = useState<string | null>(null);

  // Field builder
  const [fieldType, setFieldType] = useState<FieldType>("text");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldRequired, setFieldRequired] = useState(false);
  const [fieldPlaceholder, setFieldPlaceholder] = useState("");
  const [optionsInput, setOptionsInput] = useState("");
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  // Local draft
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftFields, setDraftFields] = useState<FormField[]>([]);

  // Email share
  const [shareEmails, setShareEmails] = useState<string[]>([""]);
  // const [shareEmail, setShareEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const activeForm = forms.find((f) => f.id === activeFormId) || null;
  const showOptions = ["select", "radio", "checkbox-group"].includes(fieldType);

  /* ---------------- GET FORMS ---------------- */
  const loadForms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API}/api/forms`, {
        withCredentials: true,
      });

      const data: FormSchema[] = res.data.data || [];
      setForms(data);

      if (data.length > 0) {
        setActiveFormId((prev) => prev || data[0].id);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to load forms");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadForms();
  }, [loadForms]);

  /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
  useEffect(() => {
    if (activeForm) {
      setDraftTitle(activeForm.title);
      setDraftDescription(activeForm.description || "");
      setDraftFields(activeForm.fields || []);
      resetFieldBuilder();
    }
  }, [activeFormId]);

  /* ---------------- LOAD RESPONSES ---------------- */
  const loadResponses = useCallback(async () => {
    if (!activeFormId) return;

    try {
      setResponsesLoading(true);
      setResponsesError(null);

      const res = await axios.get(
        `${API}/api/forms/${activeFormId}/responses`,
        { withCredentials: true }
      );

      if (!res.data?.success) {
        setResponsesError(res.data?.message || "Failed to load responses");
        setResponses([]);
        return;
      }

      setResponses(res.data.data?.responses || []);
    } catch (err: any) {
      console.error(err);
      setResponsesError(
        err?.response?.data?.message || "Failed to load responses"
      );
      setResponses([]);
    } finally {
      setResponsesLoading(false);
    }
  }, [activeFormId]);

  useEffect(() => {
    if (viewMode === "responses" && activeFormId) {
      loadResponses();
    }
  }, [viewMode, activeFormId, loadResponses]);

  /* ---------------- HELPERS ---------------- */
  const resetFieldBuilder = () => {
    setFieldType("text");
    setFieldLabel("");
    setFieldRequired(false);
    setFieldPlaceholder("");
    setOptionsInput("");
    setEditingFieldId(null);
  };

  /* ---------------- CREATE FORM ---------------- */
  const createNewForm = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await axios.post(
        `${API}/api/forms`,
        {
          title: "Untitled Form",
          description: "",
          fields: [],
        },
        { withCredentials: true }
      );

      const created: FormSchema = res.data.data;
      setForms((prev) => [created, ...prev]);
      setActiveFormId(created.id);
      setViewMode("edit");
      resetFieldBuilder();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create form");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- SAVE / UPDATE FORM ---------------- */
  const saveForm = async () => {
    if (!activeFormId) return;

    try {
      setSaving(true);
      setError(null);

      const res = await axios.put(
        `${API}/api/forms/${activeFormId}`,
        {
          title: draftTitle.trim() || "Untitled Form",
          description: draftDescription,
          fields: draftFields,
        },
        { withCredentials: true }
      );

      const updated: FormSchema = res.data.data;
      setForms((prev) =>
        prev.map((f) => (f.id === activeFormId ? updated : f))
      );
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 2000);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to save form");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- DELETE FORM ---------------- */
  const deleteForm = async (id: string) => {
    if (!confirm("Delete this form?")) return;

    try {
      setError(null);

      await axios.delete(`${API}/api/forms/${id}`, {
        withCredentials: true,
      });

      const updated = forms.filter((f) => f.id !== id);
      setForms(updated);

      if (activeFormId === id) {
        setActiveFormId(updated[0]?.id || null);
        setViewMode("edit");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to delete form");
    }
  };

  /* ---------------- FIELD ACTIONS ---------------- */
  const addOrUpdateField = () => {
    if (!fieldLabel.trim()) {
      alert("Field label is required");
      return;
    }

    let options: string[] | undefined;
    if (showOptions) {
      options = optionsInput
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
      if (options.length === 0) {
        alert("Please provide at least one option");
        return;
      }
    }

    const newField: FormField = {
      id: editingFieldId || generateId(),
      type: fieldType,
      label: fieldLabel.trim(),
      required: fieldRequired,
      placeholder: fieldPlaceholder.trim() || undefined,
      options,
    };

    if (editingFieldId) {
      setDraftFields((prev) =>
        prev.map((f) => (f.id === editingFieldId ? newField : f))
      );
    } else {
      setDraftFields((prev) => [...prev, newField]);
    }
    resetFieldBuilder();
  };

  const editField = (field: FormField) => {
    setEditingFieldId(field.id);
    setFieldType(field.type);
    setFieldLabel(field.label);
    setFieldRequired(field.required);
    setFieldPlaceholder(field.placeholder || "");
    setOptionsInput(field.options?.join(", ") || "");
  };

  const deleteField = (id: string) => {
    setDraftFields((prev) => prev.filter((f) => f.id !== id));
    if (editingFieldId === id) resetFieldBuilder();
  };

  const moveField = (index: number, direction: "up" | "down") => {
    const newFields = [...draftFields];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newFields.length) return;
    [newFields[index], newFields[target]] = [
      newFields[target],
      newFields[index],
    ];
    setDraftFields(newFields);
  };

  const getFormUrl = () => {
    if (!activeFormId || !user?.organisation_id) return "";
    return `${window.location.origin}/form/${user.organisation_id}/${activeFormId}`;
  };

  const copyLink = () => {
    if (!activeFormId) return;
    const url = getFormUrl();
    navigator.clipboard.writeText(url);
    console.log(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendFormEmail = async () => {
  if (!activeFormId) return;

  // Clean and filter valid emails
  const emails = shareEmails
    .map((e) => e.trim())
    .filter(Boolean);

  if (emails.length === 0) {
    alert("Please enter at least one email address");
    return;
  }

  // Validate emails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidEmails = emails.filter((e) => !emailRegex.test(e));

  if (invalidEmails.length > 0) {
    alert(`Invalid email(s):\n${invalidEmails.join("\n")}`);
    return;
  }

  try {
    setSendingEmail(true);
    setError(null);

    await axios.post(
      `${API}/api/forms/${activeFormId}/send-email`,
      {
        emails,
        formUrl: getFormUrl(),
        formTitle: draftTitle || "Untitled Form",
      },
      { withCredentials: true }
    );

    // Reset to one empty field
    setShareEmails([""]);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  } catch (err: any) {
    console.error(err);
    setError(err?.response?.data?.message || "Failed to send email");
  } finally {
    setSendingEmail(false);
  }
};

  const shareViaWhatsApp = () => {
    const url = getFormUrl();
    if (!url) return;

    const text = encodeURIComponent(
      `Hi! Please fill out this form:\n${url}`
    );

    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Loading forms...
        </div>
      </section>
    );
  }

  /* ---------------- RENDER ---------------- */
  return (
    <section className="min-h-screen bg-slate-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
          <div className="flex-1 min-w-0">
            <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
              Form Management
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Form Builder
            </h1>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex flex-wrap justify-end gap-2">
              <button
                onClick={createNewForm}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Plus size={15} />
                )}
                New Form
              </button>

              {activeForm && (
                <>
                  <button
                    onClick={() =>
                      setViewMode(viewMode === "preview" ? "edit" : "preview")
                    }
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
                      viewMode === "preview"
                        ? "bg-purple-50 border-purple-300 text-purple-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Eye size={14} />
                    {viewMode === "preview" ? "Edit" : "Preview"}
                  </button>

                  <button
                    onClick={() =>
                      setViewMode(
                        viewMode === "responses" ? "edit" : "responses"
                      )
                    }
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
                      viewMode === "responses"
                        ? "bg-purple-50 border-purple-300 text-purple-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Inbox size={14} />
                    Responses
                  </button>

                  {viewMode === "edit" && (
                    <button
                      onClick={saveForm}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
                    >
                      {saving ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Save size={14} />
                      )}
                      Save
                    </button>
                  )}
                </>
              )}
            </div>

            {activeForm && (
              <div className="flex flex-wrap items-start justify-end gap-2 w-full max-w-[720px]">
                {shareEmails.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 min-w-[220px] max-w-[280px] flex-1"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const updated = [...shareEmails];
                        updated[index] = e.target.value;
                        setShareEmails(updated);
                      }}
                      placeholder="recipient@email.com"
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                    />

                    {shareEmails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setShareEmails(shareEmails.filter((_, i) => i !== index));
                        }}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShareEmails([...shareEmails, ""])}
                    className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
                  >
                    <Plus size={13} />
                    Add another email
                  </button>

                  <button
                    onClick={sendFormEmail}
                    disabled={sendingEmail || shareEmails.every((e) => !e.trim())}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
                  >
                    {sendingEmail ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Mail size={14} />
                    )}
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        {savedMessage && (
          <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm font-medium">
            <Check size={15} />
            Form saved successfully
          </div>
        )}
        {error && (
          <div className="mb-4 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm font-medium">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:underline text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
          {/* Main content */}
          <div>
            {!activeForm ? (
              <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
                <FileText size={36} className="mx-auto text-slate-300 mb-3" />
                <p className="text-base text-slate-500 mb-4">No form selected</p>
                <button
                  onClick={createNewForm}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
                >
                  <Plus size={15} />
                  Create Form
                </button>
              </div>
            ) : viewMode === "preview" ? (
              <FormPreview
                schema={{
                  ...activeForm,
                  title: draftTitle,
                  description: draftDescription,
                  fields: draftFields,
                }}
                onBack={() => setViewMode("edit")}
              />
            ) : viewMode === "responses" ? (
              <FormResponses
                formTitle={draftTitle || activeForm.title}
                fields={
                  draftFields.length ? draftFields : activeForm.fields || []
                }
                responses={responses}
                loading={responsesLoading}
                error={responsesError}
                onRefresh={loadResponses}
                onBack={() => setViewMode("edit")}
              />
            ) : (
              <div className="space-y-4">
                {/* Form header */}
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Form Name
                      </label>
                      <input
                        type="text"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                        placeholder="e.g. Employee Survey"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={draftDescription}
                        onChange={(e) => setDraftDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                        placeholder="Short description..."
                      />
                    </div>
                    <div className="sm:w-[280px] shrink-0">
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Share Link
                      </label>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 min-w-0 flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-purple-600 truncate">
                          <Link2 size={12} className="shrink-0 text-slate-400" />
                          <span className="truncate">
                            /form/{user.organisation_id}/{activeFormId}
                          </span>
                        </div>
                        <button
                          onClick={copyLink}
                          title="Copy link"
                          className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition"
                        >
                          {copied ? (
                            <Check size={14} className="text-emerald-600" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                        <button
                          onClick={shareViaWhatsApp}
                          title="Share via WhatsApp"
                          className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition"
                        >
                          <MessageCircle size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Builder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Add field */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-0.5">
                      Add Form Fields
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Configure fields for your form
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Field Type
                        </label>
                        <select
                          value={fieldType}
                          onChange={(e) =>
                            setFieldType(e.target.value as FieldType)
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                        >
                          {FIELD_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Field Label
                        </label>
                        <input
                          type="text"
                          value={fieldLabel}
                          onChange={(e) => setFieldLabel(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                          placeholder="e.g. Your Name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Placeholder (optional)
                        </label>
                        <input
                          type="text"
                          value={fieldPlaceholder}
                          onChange={(e) => setFieldPlaceholder(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                          placeholder="e.g. Enter your full name"
                        />
                      </div>

                      {showOptions && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Options (comma separated)
                          </label>
                          <input
                            type="text"
                            value={optionsInput}
                            onChange={(e) => setOptionsInput(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                            placeholder="Option 1, Option 2, Option 3"
                          />
                        </div>
                      )}

                      <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={fieldRequired}
                          onChange={(e) => setFieldRequired(e.target.checked)}
                          className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                        />
                        Required Field
                      </label>

                      <button
                        onClick={addOrUpdateField}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
                      >
                        {editingFieldId ? (
                          <>
                            <Edit2 size={15} />
                            Update Field
                          </>
                        ) : (
                          <>
                            <Plus size={15} />
                            Add Field
                          </>
                        )}
                      </button>

                      {editingFieldId && (
                        <button
                          onClick={resetFieldBuilder}
                          className="w-full text-xs text-slate-500 hover:text-slate-700"
                        >
                          Cancel editing
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Added fields */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-3">
                      Added Fields ({draftFields.length})
                    </h3>

                    {draftFields.length === 0 ? (
                      <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
                        <p className="text-xs text-slate-400">
                          No fields added yet
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[380px] overflow-y-auto">
                        {draftFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
                          >
                            <GripVertical
                              size={14}
                              className="text-slate-300 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-sm font-medium text-slate-900">
                                  {field.label}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  ({field.type})
                                </span>
                                {field.required && (
                                  <span className="text-[11px] text-red-500 font-medium">
                                    *
                                  </span>
                                )}
                              </div>
                              {field.options && (
                                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                                  {field.options.join(", ")}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-0.5 shrink-0">
                              <button
                                onClick={() => moveField(index, "up")}
                                disabled={index === 0}
                                className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
                              >
                                <ArrowUp size={13} />
                              </button>
                              <button
                                onClick={() => moveField(index, "down")}
                                disabled={index === draftFields.length - 1}
                                className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
                              >
                                <ArrowDown size={13} />
                              </button>
                              <button
                                onClick={() => editField(field)}
                                className="p-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => deleteField(field.id)}
                                className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="bg-white rounded-xl border border-slate-200 p-4 h-fit sticky top-4">
            <h3 className="text-xs font-semibold text-slate-900 mb-3">
              Your Forms ({forms.length})
            </h3>

            {forms.length === 0 ? (
              <div className="py-8 text-center">
                <FileText size={24} className="mx-auto text-slate-300 mb-2" />
                <p className="text-xs text-slate-400">No forms yet</p>
                <button
                  onClick={createNewForm}
                  className="mt-2 text-xs font-medium text-purple-600 hover:underline"
                >
                  Create your first form
                </button>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
                {forms.map((form) => (
                  <div
                    key={form.id}
                    onClick={() => {
                      setActiveFormId(form.id);
                      setViewMode("edit");
                      resetFieldBuilder();
                    }}
                    className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
                      activeFormId === form.id
                        ? "bg-purple-50 border-purple-300"
                        : "bg-slate-50 border-transparent hover:bg-slate-100"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {form.title || "Untitled Form"}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {(form.fields || []).length} field
                        {(form.fields || []).length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteForm(form.id);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

// ===================== RESPONSES =====================
function FormResponses({
  formTitle,
  fields,
  responses,
  loading,
  error,
  onRefresh,
  onBack,
}: {
  formTitle: string;
  fields: FormField[];
  responses: FormResponse[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onBack: () => void;
}) {
  const formatValue = (val: any) => {
    if (val == null || val === "") return "—";
    if (Array.isArray(val)) return val.length ? val.join(", ") : "—";
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  };

  // Build columns: prefer form fields; if empty, use keys from first response
  const columns =
    fields.length > 0
      ? fields.map((f) => ({ key: f.id, label: f.label }))
      : (() => {
          const first = responses[0]?.values;
          if (!first || typeof first !== "object") return [];
          return Object.keys(first).map((key) => ({ key, label: key }));
        })();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 py-16 flex items-center justify-center gap-2 text-slate-500">
        <Loader2 size={18} className="animate-spin" />
        Loading responses...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Responses</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {formTitle} · {responses.length} response
            {responses.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Refresh
          </button>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            ← Back to editor
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-5 mt-4 px-3 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}

      {responses.length === 0 ? (
        <div className="py-16 text-center">
          <Inbox size={32} className="mx-auto text-slate-300 mb-2" />
          <p className="text-sm text-slate-500">No responses yet</p>
          <p className="text-xs text-slate-400 mt-1">
            Share the form link to start collecting answers
          </p>
        </div>
      ) : columns.length === 0 ? (
        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-500 mb-2">
            Could not map field labels — showing raw response data
          </p>
          {responses.map((r, idx) => (
            <pre
              key={r.id}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto"
            >
              #{responses.length - idx}
              {"\n"}
              {JSON.stringify(r.values, null, 2)}
            </pre>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
                  #
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap max-w-[180px]"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((r, idx) => (
                <tr
                  key={r.id}
                  className="border-b border-slate-100 hover:bg-slate-50/80 transition"
                >
                  <td className="px-4 py-3 text-slate-400 tabular-nums">
                    {responses.length - idx}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-slate-800 max-w-[220px] truncate"
                      title={formatValue(r.values?.[col.key])}
                    >
                      {formatValue(r.values?.[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ===================== PREVIEW =====================
function FormPreview({
  schema,
  onBack,
}: {
  schema: FormSchema;
  onBack: () => void;
}) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Preview only — real submissions go through the public form page
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
          <Check size={24} className="text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Thank you!</h2>
        <p className="text-slate-500 mt-1.5 text-sm">
          Your response has been recorded.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setValues({});
          }}
          className="mt-5 inline-flex px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
        >
          Submit another response
        </button>
        <div className="mt-3">
          <button
            onClick={onBack}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Back to editor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-slate-100 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {schema.title}
        </h2>
        {schema.description && (
          <p className="text-slate-500 text-sm mt-1.5 max-w-xl mx-auto">
            {schema.description}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-5 sm:p-8 space-y-5 max-w-2xl mx-auto"
      >
        {(schema.fields || []).map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                required={field.required}
                value={values[field.id] || ""}
                onChange={(e) =>
                  setValues((p) => ({ ...p, [field.id]: e.target.value }))
                }
                placeholder={field.placeholder}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition resize-y"
                rows={3}
              />
            ) : field.type === "select" ? (
              <select
                required={field.required}
                value={values[field.id] || ""}
                onChange={(e) =>
                  setValues((p) => ({ ...p, [field.id]: e.target.value }))
                }
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
              >
                <option value="">-- Select --</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === "radio" ? (
              <div className="space-y-2">
                {field.options?.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
                  >
                    <input
                      type="radio"
                      name={field.id}
                      value={opt}
                      required={field.required}
                      checked={values[field.id] === opt}
                      onChange={() =>
                        setValues((p) => ({ ...p, [field.id]: opt }))
                      }
                      className="accent-purple-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : field.type === "checkbox-group" ? (
              <div className="space-y-2">
                {field.options?.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      value={opt}
                      checked={(values[field.id] || []).includes(opt)}
                      onChange={(e) => {
                        const current: string[] = values[field.id] || [];
                        const next = e.target.checked
                          ? [...current, opt]
                          : current.filter((v) => v !== opt);
                        setValues((p) => ({ ...p, [field.id]: next }));
                      }}
                      className="rounded accent-purple-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : field.type === "checkbox" ? (
              <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={Boolean(values[field.id])}
                  required={field.required}
                  onChange={(e) =>
                    setValues((p) => ({ ...p, [field.id]: e.target.checked }))
                  }
                  className="rounded accent-purple-600"
                />
                {field.placeholder || "Yes"}
              </label>
            ) : field.type === "rating" ? (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setValues((p) => ({ ...p, [field.id]: star }))
                    }
                    className={`text-2xl transition ${
                      (values[field.id] || 0) >= star
                        ? "text-amber-400"
                        : "text-slate-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            ) : field.type === "daterange" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">
                    Start date
                  </label>
                  <input
                    type="date"
                    value={values[field.id]?.start || ""}
                    onChange={(e) => {
                      const current = values[field.id] || { start: "", end: "" };
                      setValues((p) => ({
                        ...p,
                        [field.id]: { ...current, start: e.target.value },
                      }));
                    }}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">
                    End date
                  </label>
                  <input
                    type="date"
                    value={values[field.id]?.end || ""}
                    onChange={(e) => {
                      const current = values[field.id] || { start: "", end: "" };
                      setValues((p) => ({
                        ...p,
                        [field.id]: { ...current, end: e.target.value },
                      }));
                    }}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                  />
                </div>
              </div>
            ) : (
              <input
                type={field.type === "email" ? "email" : field.type === "tel" ? "tel" : field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                required={field.required}
                value={values[field.id] || ""}
                onChange={(e) =>
                  setValues((p) => ({ ...p, [field.id]: e.target.value }))
                }
                placeholder={field.placeholder}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
        >
          Submit
        </button>
      </form>

      <div className="px-5 sm:px-8 pb-6 text-center">
        <button
          onClick={onBack}
          className="text-xs text-slate-500 hover:text-slate-700"
        >
          ← Back to editor
        </button>
      </div>
    </div>
  );
}