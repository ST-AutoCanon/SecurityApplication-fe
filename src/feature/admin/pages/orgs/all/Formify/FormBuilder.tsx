

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
// //   Inbox,
// // } from "lucide-react";

// // // ===================== API =====================
// // const API = `${import.meta.env.VITE_BACKEND_URL}`;

// // // ===================== TYPES =====================
// // type FieldType =
// //   | "text"
// //   | "textarea"
// //   | "email"
// //   | "tel"
// //   | "number"
// //   | "date"
// //   | "daterange"
// //   | "select"
// //   | "radio"
// //   | "checkbox-group"
// //   | "checkbox"
// //   | "rating"
// //   | "image"
// //   | "reference-image";

// // interface FormField {
// //   id: string;
// //   type: FieldType;
// //   label: string;
// //   required: boolean;
// //   placeholder?: string;
// //   options?: string[];
// //   referenceUrl?: string;
// // }

// // interface FormSchema {
// //   id: string;
// //   title: string;
// //   description?: string;
// //   fields: FormField[];
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // interface FormResponse {
// //   id: string;
// //   formId: string;
// //   values: Record<string, any>;
// //   createdAt: string;
// // }

// // // ===================== CONSTANTS =====================
// // const generateId = () => Math.random().toString(36).slice(2, 11);

// // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// //   { value: "text", label: "📝 Text" },
// //   { value: "email", label: "📧 Email" },
// //   { value: "tel", label: "📱 Mobile Number" },
// //   { value: "textarea", label: "📄 Textarea" },
// //   { value: "number", label: "🔢 Number" },
// //   { value: "date", label: "📅 Date" },
// //   { value: "daterange", label: "📆 Date Range" },
// //   { value: "select", label: "📋 Dropdown" },
// //   { value: "radio", label: "◉ Radio Buttons" },
// //   { value: "checkbox-group", label: "☑️ Checkbox Group" },
// //   { value: "checkbox", label: "☐ Single Checkbox" },
// //   { value: "rating", label: "⭐ Rating" },
// //   { value: "image", label: "🖼️ Image Upload" },
// // ];

// // // ===================== MAIN COMPONENT =====================
// // export default function FormBuilder() {
// //   const { user } = useContext(AuthContext);

// //   const [forms, setForms] = useState<FormSchema[]>([]);
// //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// //   const [viewMode, setViewMode] = useState<"edit" | "preview" | "responses">(
// //     "edit"
// //   );
// //   const [copied, setCopied] = useState(false);
// //   const [savedMessage, setSavedMessage] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   // Responses
// //   const [responses, setResponses] = useState<FormResponse[]>([]);
// //   const [responsesLoading, setResponsesLoading] = useState(false);
// //   const [responsesError, setResponsesError] = useState<string | null>(null);

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
// //   const [fieldReferenceImageUrl, setFieldReferenceImageUrl] = useState("");

// //   // Email share
// //   const [shareEmails, setShareEmails] = useState<string[]>([""]);
// //   // const [shareEmail, setShareEmail] = useState("");
// //   const [sendingEmail, setSendingEmail] = useState(false);

// //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// //   const showOptions = ["select", "radio", "checkbox-group"].includes(fieldType);

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

// //   const getVisibleFields = (fields: FormField[] = []) =>
// //     fields.filter((field) => field.type !== "reference-image");

// //   /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
// //   useEffect(() => {
// //     if (activeForm) {
// //       const formFields = getVisibleFields(activeForm.fields || []);
// //       setDraftTitle(activeForm.title);
// //       setDraftDescription(activeForm.description || "");
// //       setDraftFields(formFields);
// //       resetFieldBuilder();
// //     }
// //   }, [activeFormId]);

// //   /* ---------------- LOAD RESPONSES ---------------- */
// //   const loadResponses = useCallback(async () => {
// //     if (!activeFormId) return;

// //     try {
// //       setResponsesLoading(true);
// //       setResponsesError(null);

// //       const res = await axios.get(
// //         `${API}/api/forms/${activeFormId}/responses`,
// //         { withCredentials: true }
// //       );

// //       if (!res.data?.success) {
// //         setResponsesError(res.data?.message || "Failed to load responses");
// //         setResponses([]);
// //         return;
// //       }

// //       setResponses(res.data.data?.responses || []);
// //     } catch (err: any) {
// //       console.error(err);
// //       setResponsesError(
// //         err?.response?.data?.message || "Failed to load responses"
// //       );
// //       setResponses([]);
// //     } finally {
// //       setResponsesLoading(false);
// //     }
// //   }, [activeFormId]);

// //   useEffect(() => {
// //     if (viewMode === "responses" && activeFormId) {
// //       loadResponses();
// //     }
// //   }, [viewMode, activeFormId, loadResponses]);

// //   /* ---------------- HELPERS ---------------- */
// //   const resetFieldBuilder = () => {
// //     setFieldType("text");
// //     setFieldLabel("");
// //     setFieldRequired(false);
// //     setFieldPlaceholder("");
// //     setOptionsInput("");
// //     setFieldReferenceImageUrl("");
// //     setEditingFieldId(null);
// //   };

// //   /* ---------------- CREATE FORM ---------------- */
// //   // const createNewForm = async () => {
// //   //   try {
// //   //     setSaving(true);
// //   //     setError(null);

// //   //     const res = await axios.post(
// //   //       `${API}/api/forms`,
// //   //       {
// //   //         title: "",
// //   //         description: "",
// //   //         fields: [],
// //   //       },
// //   //       { withCredentials: true }
// //   //     );

// //   //     const created: FormSchema = res.data.data;
// //   //     setForms((prev) => [created, ...prev]);
// //   //     setActiveFormId(created.id);
// //   //     setViewMode("edit");
// //   //     resetFieldBuilder();
// //   //   } catch (err: any) {
// //   //     console.error(err);
// //   //     setError(err?.response?.data?.message || "Failed to create form");
// //   //   } finally {
// //   //     setSaving(false);
// //   //   }
// //   // };
// // const createNewForm = async () => {
// //   try {
// //     setSaving(true);
// //     setError(null);

// //     const res = await axios.post(
// //       `${API}/api/forms`,
// //       {
// //         title: "New Form",   // temporary – only to satisfy backend
// //         description: "",
// //         fields: [],
// //       },
// //       { withCredentials: true }
// //     );

// //     const created: FormSchema = res.data.data;
// //     setForms((prev) => [created, ...prev]);
// //     setActiveFormId(created.id);
// //     setViewMode("edit");

// //     // Force empty title in the UI so user has to enter a real name
// //     setDraftTitle("");
// //     setDraftDescription("");
// //     setDraftFields([]);
// //     resetFieldBuilder();
// //   } catch (err: any) {
// //     console.error(err);
// //     setError(err?.response?.data?.message || "Failed to create form");
// //   } finally {
// //     setSaving(false);
// //   }
// // };
// //   /* ---------------- SAVE / UPDATE FORM ---------------- */
// // //   const saveForm = async () => {
// // //     if (!activeFormId) return;

// // //     try {
// // //       setSaving(true);
// // //       setError(null);

// // //       const res = await axios.put(
// // //   `${API}/api/forms/${activeFormId}`,
// // //   {
// // //     title: draftTitle.trim(),   // was draftTitle.trim() || "Untitled Form"
// // //     description: draftDescription,
// // //     fields: draftFields,
// // //   },
// // //   { withCredentials: true }
// // // );

// // //       const updated: FormSchema = res.data.data;
// // //       setForms((prev) =>
// // //         prev.map((f) => (f.id === activeFormId ? updated : f))
// // //       );
// // //       setSavedMessage(true);
// // //       setTimeout(() => setSavedMessage(false), 2000);
// // //     } catch (err: any) {
// // //       console.error(err);
// // //       setError(err?.response?.data?.message || "Failed to save form");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };
// // const saveForm = async () => {
// //   if (!activeFormId) return;

// //   if (!draftTitle.trim()) {
// //     setError("Title is required");
// //     return;
// //   }

// //   try {
// //     setSaving(true);
// //     setError(null);

// //     const res = await axios.put(
// //       `${API}/api/forms/${activeFormId}`,
// //       {
// //         title: draftTitle.trim(),
// //         description: draftDescription,
// //         fields: draftFields,
// //       },
// //       { withCredentials: true }
// //     );

// //     const updated: FormSchema = res.data.data;
// //     setForms((prev) =>
// //       prev.map((f) => (f.id === activeFormId ? updated : f))
// //     );
// //     setSavedMessage(true);
// //     setTimeout(() => setSavedMessage(false), 2000);
// //   } catch (err: any) {
// //     console.error(err);
// //     setError(err?.response?.data?.message || "Failed to save form");
// //   } finally {
// //     setSaving(false);
// //   }
// // };
// //   const uploadFieldReferenceImage = async (file: File) => {
// //     const formData = new FormData();
// //     formData.append("image", file);

// //     try {
// //       setError(null);
// //       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
// //         withCredentials: true,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       const url = res.data?.url;
// //       if (!url) {
// //         throw new Error("Reference image upload did not return a URL");
// //       }

// //       setFieldReferenceImageUrl(url);
// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err?.response?.data?.message || err?.message || "Reference image upload failed");
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
// //         setViewMode("edit");
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
// //       referenceUrl: fieldReferenceImageUrl || undefined,
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
// //     setFieldReferenceImageUrl(field.referenceUrl || "");
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

// //   const sendFormEmail = async () => {
// //   if (!activeFormId) return;

// //   // Clean and filter valid emails
// //   const emails = shareEmails
// //     .map((e) => e.trim())
// //     .filter(Boolean);

// //   if (emails.length === 0) {
// //     alert("Please enter at least one email address");
// //     return;
// //   }

// //   // Validate emails
// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   const invalidEmails = emails.filter((e) => !emailRegex.test(e));

// //   if (invalidEmails.length > 0) {
// //     alert(`Invalid email(s):\n${invalidEmails.join("\n")}`);
// //     return;
// //   }

// //   try {
// //     setSendingEmail(true);
// //     setError(null);

// //     await axios.post(
// //       `${API}/api/forms/${activeFormId}/send-email`,
// //       {
// //         emails,
// //         formUrl: getFormUrl(),
// //         formTitle: draftTitle || "Untitled Form",
// //         fields: draftFields.length ? draftFields : activeForm?.fields || [],
// //       },
// //       { withCredentials: true }
// //     );

// //     // Reset to one empty field
// //     setShareEmails([""]);
// //     setSavedMessage(true);
// //     setTimeout(() => setSavedMessage(false), 3000);
// //   } catch (err: any) {
// //     console.error(err);
// //     setError(err?.response?.data?.message || "Failed to send email");
// //   } finally {
// //     setSendingEmail(false);
// //   }
// // };

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
// //         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
// //           <div className="flex-1 min-w-0">
// //             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
// //               Form Management
// //             </span>
// //             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
// //               Form Builder
// //             </h1>
// //           </div>

// //           <div className="flex flex-col items-end gap-2 shrink-0">
// //             <div className="flex flex-wrap justify-end gap-2">
// //               <button
// //                 onClick={createNewForm}
// //                 disabled={saving}
// //                 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //               >
// //                 {saving ? (
// //                   <Loader2 size={15} className="animate-spin" />
// //                 ) : (
// //                   <Plus size={15} />
// //                 )}
// //                 New Form
// //               </button>

// //               {activeForm && (
// //                 <>
// //                   <button
// //                     onClick={() =>
// //                       setViewMode(viewMode === "preview" ? "edit" : "preview")
// //                     }
// //                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
// //                       viewMode === "preview"
// //                         ? "bg-purple-50 border-purple-300 text-purple-700"
// //                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
// //                     }`}
// //                   >
// //                     <Eye size={14} />
// //                     {viewMode === "preview" ? "Edit" : "Preview"}
// //                   </button>

// //                   <button
// //                     onClick={() =>
// //                       setViewMode(
// //                         viewMode === "responses" ? "edit" : "responses"
// //                       )
// //                     }
// //                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
// //                       viewMode === "responses"
// //                         ? "bg-purple-50 border-purple-300 text-purple-700"
// //                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
// //                     }`}
// //                   >
// //                     <Inbox size={14} />
// //                     Responses
// //                   </button>

// //                   {viewMode === "edit" && (
// //                     <button
// //                       onClick={saveForm}
// //                       disabled={saving}
// //                       className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //                     >
// //                       {saving ? (
// //                         <Loader2 size={14} className="animate-spin" />
// //                       ) : (
// //                         <Save size={14} />
// //                       )}
// //                       Save
// //                     </button>
// //                   )}
// //                 </>
// //               )}
// //             </div>

// //             {activeForm && (
// //               <div className="flex flex-wrap items-start justify-end gap-2 w-full max-w-[720px]">
// //                 {shareEmails.map((email, index) => (
// //                   <div
// //                     key={index}
// //                     className="flex items-center gap-1.5 min-w-[220px] max-w-[280px] flex-1"
// //                   >
// //                     <input
// //                       type="email"
// //                       value={email}
// //                       onChange={(e) => {
// //                         const updated = [...shareEmails];
// //                         updated[index] = e.target.value;
// //                         setShareEmails(updated);
// //                       }}
// //                       placeholder="recipient@email.com"
// //                       className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
// //                     />

// //                     {shareEmails.length > 1 && (
// //                       <button
// //                         type="button"
// //                         onClick={() => {
// //                           setShareEmails(shareEmails.filter((_, i) => i !== index));
// //                         }}
// //                         className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition shrink-0"
// //                       >
// //                         <Trash2 size={14} />
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}

// //                 <div className="flex items-center gap-2 shrink-0">
// //                   <button
// //                     type="button"
// //                     onClick={() => setShareEmails([...shareEmails, ""])}
// //                     className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
// //                   >
// //                     <Plus size={13} />
// //                     Add another email
// //                   </button>

// //                   <button
// //                     onClick={sendFormEmail}
// //                     disabled={sendingEmail || shareEmails.every((e) => !e.trim())}
// //                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
// //                   >
// //                     {sendingEmail ? (
// //                       <Loader2 size={14} className="animate-spin" />
// //                     ) : (
// //                       <Mail size={14} />
// //                     )}
// //                     Send
// //                   </button>
// //                 </div>
// //               </div>
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
// //             ) : viewMode === "preview" ? (
// //               <FormPreview
// //                 schema={{
// //                   ...activeForm,
// //                   title: draftTitle,
// //                   description: draftDescription,
// //                   fields: draftFields,
// //                 }}
// //                 onBack={() => setViewMode("edit")}
// //               />
// //             ) : viewMode === "responses" ? (
// //               <FormResponses
// //                 formTitle={draftTitle || activeForm.title}
// //                 fields={
// //                   draftFields.length ? draftFields : activeForm.fields || []
// //                 }
// //                 responses={responses}
// //                 loading={responsesLoading}
// //                 error={responsesError}
// //                 onRefresh={loadResponses}
// //                 onBack={() => setViewMode("edit")}
// //               />
// //             ) : (
// //               <div className="space-y-4">
// //                 {/* Form header */}
// //                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 space-y-4">
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
// //                             /form/{user?.organisation_id ?? "org"}/{activeFormId}
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

// //                       <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 p-3">
// //                         <div className="flex items-center justify-between gap-3 mb-2">
// //                           <div>
// //                             <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple-700">
// //                               Field reference image
// //                             </p>
// //                             <p className="text-[10px] text-slate-500 mt-0.5">
// //                               Optional image shown under this field
// //                             </p>
// //                           </div>
// //                           {fieldReferenceImageUrl && (
// //                             <button
// //                               type="button"
// //                               onClick={() => setFieldReferenceImageUrl("")}
// //                               className="text-[10px] text-red-600 hover:text-red-700 font-medium"
// //                             >
// //                               Remove
// //                             </button>
// //                           )}
// //                         </div>

// //                         <input
// //                           type="file"
// //                           accept="image/*"
// //                           onChange={(e) => {
// //                             const file = e.target.files?.[0];
// //                             if (file) uploadFieldReferenceImage(file);
// //                           }}
// //                           className="block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-purple-600 file:px-2 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-purple-700"
// //                         />

// //                         {fieldReferenceImageUrl && (
// //                           <div className="mt-3 overflow-hidden rounded-lg border border-purple-200 bg-white">
// //                             <img
// //                               src={fieldReferenceImageUrl}
// //                               alt="Field reference"
// //                               className="h-28 w-full object-cover"
// //                             />
// //                           </div>
// //                         )}
// //                       </div>

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
// //                               {field.type === "image" ? (
// //                                 <div className="mt-2 flex items-center gap-2">
// //                                   <div className="flex h-10 w-14 items-center justify-center rounded-md border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-white to-pink-100 text-[8px] font-semibold text-purple-600">
// //                                     IMG
// //                                   </div>
// //                                   <p className="text-[11px] text-slate-500">
// //                                     Image upload field
// //                                   </p>
// //                                 </div>
// //                               ) : field.options ? (
// //                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
// //                                   {field.options.join(", ")}
// //                                 </p>
// //                               ) : null}
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
// //                       setViewMode("edit");
// //                       resetFieldBuilder();
// //                     }}
// //                     className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
// //                       activeFormId === form.id
// //                         ? "bg-purple-50 border-purple-300"
// //                         : "bg-slate-50 border-transparent hover:bg-slate-100"
// //                     }`}
// //                   >
// //                     <div className="min-w-0">
// //                      <p className="text-sm font-medium text-slate-900 truncate">
// //   {form.title || "No title"}   {/* or just {form.title} */}
// // </p>
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

// // // ===================== RESPONSES =====================
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
// //     if (typeof val === "object") return JSON.stringify(val);
// //     return String(val);
// //   };

// //   // Build columns: prefer form fields; if empty, use keys from first response
// // const visibleFields = fields.filter((f) => f.type !== "reference-image");
// //     const columns =
// //     visibleFields.length > 0
// //       ? visibleFields.map((f) => ({ key: f.id, label: f.label }))
// //       : (() => {
// //           const first = responses[0]?.values;
// //           if (!first || typeof first !== "object") return [];
// //           return Object.keys(first).map((key) => ({ key, label: key }));
// //         })();

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
// //       ) : columns.length === 0 ? (
// //         <div className="p-5 space-y-3">
// //           <p className="text-xs text-slate-500 mb-2">
// //             Could not map field labels — showing raw response data
// //           </p>
// //           {responses.map((r, idx) => (
// //             <pre
// //               key={r.id}
// //               className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto"
// //             >
// //               #{responses.length - idx}
// //               {"\n"}
// //               {JSON.stringify(r.values, null, 2)}
// //             </pre>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="bg-slate-50 border-b border-slate-100">
// //                 <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
// //                   #
// //                 </th>
// //                 {columns.map((col) => (
// //                   <th
// //                     key={col.key}
// //                     className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap max-w-[180px]"
// //                   >
// //                     {col.label}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {responses.map((r, idx) => (
// //                 <tr
// //                   key={r.id}
// //                   className="border-b border-slate-100 hover:bg-slate-50/80 transition"
// //                 >
// //                   <td className="px-4 py-3 text-slate-400 tabular-nums">
// //                     {responses.length - idx}
// //                   </td>
// //                   {columns.map((col) => {
// //                     const value = r.values?.[col.key];
// //                     const isImageField =
// //                       visibleFields.find((f) => f.id === col.key)?.type === "image";

// //                     return (
// //                       <td
// //                         key={col.key}
// //                         className="px-4 py-3 text-slate-800 max-w-[260px] align-top"
// //                         title={typeof value === "object" ? JSON.stringify(value) : formatValue(value)}
// //                       >
// //                         {isImageField && value ? (
// //                           <div className="flex flex-col gap-2">
// //                             <img
// //                               src={
// //                                 typeof value === "string"
// //                                   ? value
// //                                   : value.url || ""
// //                               }
// //                               alt={typeof value === "string" ? "Uploaded image" : value.name || "Uploaded image"}
// //                               className="h-20 w-20 object-cover rounded-lg border border-slate-200 bg-slate-50"
// //                             />
// //                             <div className="flex items-center gap-3">
// //                               <a
// //                                 href={
// //                                   typeof value === "string"
// //                                     ? value
// //                                     : value.url || ""
// //                                 }
// //                                 target="_blank"
// //                                 rel="noreferrer"
// //                                 className="inline-flex text-xs text-purple-600 hover:text-purple-700 underline"
// //                               >
// //                                 View
// //                               </a>
// //                               <a
// //                                 href={
// //                                   typeof value === "string"
// //                                     ? value
// //                                     : value.url || ""
// //                                 }
// //                                 target="_blank"
// //                                 rel="noreferrer"
// //                                 className="inline-flex text-xs text-slate-600 hover:text-slate-800 underline"
// //                                 download
// //                               >
// //                                 Download
// //                               </a>
// //                             </div>
// //                           </div>
// //                         ) : (
// //                           <div className="truncate max-w-[220px]">
// //                             {formatValue(value)}
// //                           </div>
// //                         )}
// //                       </td>
// //                     );
// //                   })}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
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
// //   const [uploadingFieldId, setUploadingFieldId] = useState<string | null>(null);
// //   const [uploadError, setUploadError] = useState<string | null>(null);

// //   const visibleFields = (schema.fields || []).filter((field: any) => field.type !== "reference-image");

// //   const uploadImageFile = async (fieldId: string, file: File) => {
// //     const formData = new FormData();
// //     formData.append("image", file);

// //     try {
// //       setUploadingFieldId(fieldId);
// //       setUploadError(null);

// //       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
// //         withCredentials: true,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       const url = res.data?.url;
// //       if (!url) {
// //         throw new Error("Image upload did not return a URL");
// //       }

// //       setValues((prev) => ({
// //         ...prev,
// //         [fieldId]: {
// //           url,
// //           name: file.name,
// //           size: file.size,
// //         },
// //       }));
// //     } catch (err: any) {
// //       console.error(err);
// //       setUploadError(err?.response?.data?.message || "Image upload failed");
// //     } finally {
// //       setUploadingFieldId(null);
// //     }
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // Preview only — real submissions go through the public form page
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
// //         {uploadError && (
// //           <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
// //             {uploadError}
// //           </div>
// //         )}

// //         {visibleFields.map((field: any) => (
// //           <div key={field.id}>
// //             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
// //               {field.label}
// //               {field.required && <span className="text-red-500 ml-1">*</span>}
// //             </label>

// //             {field.referenceUrl && (
// //               <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
// //                 <img
// //                   src={field.referenceUrl}
// //                   alt={field.label}
// //                   className="max-h-64 w-full object-cover"
// //                 />
// //               </div>
// //             )}

// //             {field.type === "image" ? (
// //               <div className="space-y-3">
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={(e) => {
// //                     const file = e.target.files?.[0];
// //                     if (file) {
// //                       uploadImageFile(field.id, file);
// //                     }
// //                   }}
// //                   className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-700"
// //                 />

// //                 {uploadingFieldId === field.id && (
// //                   <div className="inline-flex items-center gap-2 text-xs text-slate-500">
// //                     <Loader2 size={14} className="animate-spin" />
// //                     Uploading image...
// //                   </div>
// //                 )}

// //                 {values[field.id] && (
// //                   <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
// //                     <img
// //                       src={values[field.id]?.url}
// //                       alt={values[field.id]?.name || field.label}
// //                       className="h-32 w-full rounded-md object-cover border border-slate-200"
// //                     />
// //                     <div className="flex items-center justify-between gap-3">
// //                       <span className="text-xs text-slate-600 truncate">
// //                         {values[field.id]?.name || "Uploaded image"}
// //                       </span>
// //                       <div className="flex items-center gap-3">
// //                         <a
// //                           href={values[field.id]?.url}
// //                           target="_blank"
// //                           rel="noreferrer"
// //                           className="text-xs text-purple-600 hover:text-purple-700 underline"
// //                         >
// //                           View
// //                         </a>
// //                         <a
// //                           href={values[field.id]?.url}
// //                           target="_blank"
// //                           rel="noreferrer"
// //                           download
// //                           className="text-xs text-slate-600 hover:text-slate-800 underline"
// //                         >
// //                           Download
// //                         </a>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : field.type === "textarea" ? (
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
// //                 {field.options?.map((opt: string) => (
// //                   <option key={opt} value={opt}>
// //                     {opt}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : field.type === "radio" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt: string) => (
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
// //             ) : field.type === "checkbox-group" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt: string) => (
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
// //             ) : field.type === "checkbox" ? (
// //               <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">
// //                 <input
// //                   type="checkbox"
// //                   checked={Boolean(values[field.id])}
// //                   required={field.required}
// //                   onChange={(e) =>
// //                     setValues((p) => ({ ...p, [field.id]: e.target.checked }))
// //                   }
// //                   className="rounded accent-purple-600"
// //                 />
// //                 {field.placeholder || "Yes"}
// //               </label>
// //             ) : field.type === "rating" ? (
// //               <div className="flex items-center gap-2">
// //                 {[1, 2, 3, 4, 5].map((star) => (
// //                   <button
// //                     key={star}
// //                     type="button"
// //                     onClick={() =>
// //                       setValues((p) => ({ ...p, [field.id]: star }))
// //                     }
// //                     className={`text-2xl transition ${
// //                       (values[field.id] || 0) >= star
// //                         ? "text-amber-400"
// //                         : "text-slate-300"
// //                     }`}
// //                   >
// //                     ★
// //                   </button>
// //                 ))}
// //               </div>
// //             ) : field.type === "daterange" ? (
// //               <div className="grid gap-3 sm:grid-cols-2">
// //                 <div>
// //                   <label className="mb-1 block text-xs font-medium text-slate-500">
// //                     Start date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={values[field.id]?.start || ""}
// //                     onChange={(e) => {
// //                       const current = values[field.id] || { start: "", end: "" };
// //                       setValues((p) => ({
// //                         ...p,
// //                         [field.id]: { ...current, start: e.target.value },
// //                       }));
// //                     }}
// //                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="mb-1 block text-xs font-medium text-slate-500">
// //                     End date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={values[field.id]?.end || ""}
// //                     onChange={(e) => {
// //                       const current = values[field.id] || { start: "", end: "" };
// //                       setValues((p) => ({
// //                         ...p,
// //                         [field.id]: { ...current, end: e.target.value },
// //                       }));
// //                     }}
// //                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                   />
// //                 </div>
// //               </div>
// //             ) : (
// //               <input
// //                 type={field.type === "email" ? "email" : field.type === "tel" ? "tel" : field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
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
// //   Inbox,
// // } from "lucide-react";
// // import Alert from "../../../../../../components/Aleartmessage";

// // // ===================== API =====================
// // const API = `${import.meta.env.VITE_BACKEND_URL}`;

// // // ===================== TYPES =====================
// // type FieldType =
// //   | "text"
// //   | "textarea"
// //   | "email"
// //   | "tel"
// //   | "number"
// //   | "date"
// //   | "daterange"
// //   | "select"
// //   | "radio"
// //   | "checkbox-group"
// //   | "checkbox"
// //   | "rating"
// //   | "image"
// //   | "reference-image";

// // interface FormField {
// //   id: string;
// //   type: FieldType;
// //   label: string;
// //   required: boolean;
// //   placeholder?: string;
// //   options?: string[];
// //   referenceUrl?: string;
// // }

// // interface FormSchema {
// //   id: string;
// //   title: string;
// //   description?: string;
// //   fields: FormField[];
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // interface FormResponse {
// //   id: string;
// //   formId: string;
// //   values: Record<string, any>;
// //   createdAt: string;
// // }

// // // ===================== CONSTANTS =====================
// // const generateId = () => Math.random().toString(36).slice(2, 11);

// // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// //   { value: "text", label: "📝 Text" },
// //   { value: "email", label: "📧 Email" },
// //   { value: "tel", label: "📱 Mobile Number" },
// //   { value: "textarea", label: "📄 Textarea" },
// //   { value: "number", label: "🔢 Number" },
// //   { value: "date", label: "📅 Date" },
// //   { value: "daterange", label: "📆 Date Range" },
// //   { value: "select", label: "📋 Dropdown" },
// //   { value: "radio", label: "◉ Radio Buttons" },
// //   { value: "checkbox-group", label: "☑️ Checkbox Group" },
// //   { value: "checkbox", label: "☐ Single Checkbox" },
// //   { value: "rating", label: "⭐ Rating" },
// //   { value: "image", label: "🖼️ Image Upload" },
// // ];

// // // ===================== MAIN COMPONENT =====================
// // export default function FormBuilder() {
// //   const { user } = useContext(AuthContext);

// //   const [forms, setForms] = useState<FormSchema[]>([]);
// //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// //   const [viewMode, setViewMode] = useState<"edit" | "preview" | "responses">(
// //     "edit"
// //   );
// //   const [copied, setCopied] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   // Custom Alert
// //   const [alert, setAlert] = useState<{
// //     type: "success" | "warning" | "error";
// //     message: string;
// //   } | null>(null);

// //   // Responses
// //   const [responses, setResponses] = useState<FormResponse[]>([]);
// //   const [responsesLoading, setResponsesLoading] = useState(false);
// //   const [responsesError, setResponsesError] = useState<string | null>(null);

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
// //   const [fieldReferenceImageUrl, setFieldReferenceImageUrl] = useState("");

// //   // Email share
// //   const [shareEmails, setShareEmails] = useState<string[]>([""]);
// //   const [sendingEmail, setSendingEmail] = useState(false);

// //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// //   const showOptions = ["select", "radio", "checkbox-group"].includes(fieldType);
// // const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
// //   /* ---------------- GET FORMS ---------------- */
// //   const loadForms = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setAlert(null);

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
// //       setAlert({
// //         type: "error",
// //         message: err?.response?.data?.message || "Failed to load forms",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     loadForms();
// //   }, [loadForms]);

// //   const getVisibleFields = (fields: FormField[] = []) =>
// //     fields.filter((field) => field.type !== "reference-image");

// //   /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
// //   useEffect(() => {
// //     if (activeForm) {
// //       const formFields = getVisibleFields(activeForm.fields || []);
// //       setDraftTitle(activeForm.title);
// //       setDraftDescription(activeForm.description || "");
// //       setDraftFields(formFields);
// //       resetFieldBuilder();
// //     }
// //   }, [activeFormId]);


  
// //   /* ---------------- LOAD RESPONSES ---------------- */
// //   const loadResponses = useCallback(async () => {
// //     if (!activeFormId) return;

// //     try {
// //       setResponsesLoading(true);
// //       setResponsesError(null);

// //       const res = await axios.get(
// //         `${API}/api/forms/${activeFormId}/responses`,
// //         { withCredentials: true }
// //       );

// //       if (!res.data?.success) {
// //         setResponsesError(res.data?.message || "Failed to load responses");
// //         setResponses([]);
// //         return;
// //       }

// //       setResponses(res.data.data?.responses || []);
// //     } catch (err: any) {
// //       console.error(err);
// //       setResponsesError(
// //         err?.response?.data?.message || "Failed to load responses"
// //       );
// //       setResponses([]);
// //     } finally {
// //       setResponsesLoading(false);
// //     }
// //   }, [activeFormId]);

// //   useEffect(() => {
// //     if (viewMode === "responses" && activeFormId) {
// //       loadResponses();
// //     }
// //   }, [viewMode, activeFormId, loadResponses]);

// //   /* ---------------- HELPERS ---------------- */
// //   const resetFieldBuilder = () => {
// //     setFieldType("text");
// //     setFieldLabel("");
// //     setFieldRequired(false);
// //     setFieldPlaceholder("");
// //     setOptionsInput("");
// //     setFieldReferenceImageUrl("");
// //     setEditingFieldId(null);
// //   };

// //   /* ---------------- CREATE FORM ---------------- */
// //   const createNewForm = async () => {
// //     try {
// //       setSaving(true);
// //       setAlert(null);

// //       const res = await axios.post(
// //         `${API}/api/forms`,
// //         {
// //           title: "New Form", // temporary – backend requires a non-empty title
// //           description: "",
// //           fields: [],
// //         },
// //         { withCredentials: true }
// //       );

// //       // Override title locally so the UI starts empty
// //       const created: FormSchema = {
// //         ...res.data.data,
// //         title: "",
// //       };

// //       setForms((prev) => [created, ...prev]);
// //       setActiveFormId(created.id);
// //       setViewMode("edit");

// //       setDraftTitle("");
// //       setDraftDescription("");
// //       setDraftFields([]);
// //       resetFieldBuilder();
// //     } catch (err: any) {
// //       console.error(err);
// //       setAlert({
// //         type: "error",
// //         message: err?.response?.data?.message || "Failed to create form",
// //       });
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ---------------- SAVE / UPDATE FORM ---------------- */
// //   const saveForm = async () => {
// //     if (!activeFormId) return;

// //     if (!draftTitle.trim()) {
// //       setAlert({ type: "error", message: "Title is required" });
// //       return;
// //     }

// //     try {
// //       setSaving(true);
// //       setAlert(null);

// //       const res = await axios.put(
// //         `${API}/api/forms/${activeFormId}`,
// //         {
// //           title: draftTitle.trim(),
// //           description: draftDescription,
// //           fields: draftFields,
// //         },
// //         { withCredentials: true }
// //       );

// //       const updated: FormSchema = res.data.data;
// //       setForms((prev) =>
// //         prev.map((f) => (f.id === activeFormId ? updated : f))
// //       );

// //       // No success popup / banner on purpose
// //     } catch (err: any) {
// //       console.error(err);
// //       setAlert({
// //         type: "error",
// //         message: err?.response?.data?.message || "Failed to save form",
// //       });
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const uploadFieldReferenceImage = async (file: File) => {
// //     const formData = new FormData();
// //     formData.append("image", file);

// //     try {
// //       setAlert(null);
// //       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
// //         withCredentials: true,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       const url = res.data?.url;
// //       if (!url) {
// //         throw new Error("Reference image upload did not return a URL");
// //       }

// //       setFieldReferenceImageUrl(url);
// //     } catch (err: any) {
// //       console.error(err);
// //       setAlert({
// //         type: "error",
// //         message:
// //           err?.response?.data?.message ||
// //           err?.message ||
// //           "Reference image upload failed",
// //       });
// //     }
// //   };

// //   /* ---------------- DELETE FORM ---------------- */
// // /* ---------------- DELETE FORM ---------------- */
// // const deleteForm = (id: string) => {
// //   setPendingDeleteId(id);
// //   setAlert({
// //     type: "warning",
// //     message: "Are you sure you want to delete this form? This action cannot be undone.",
// //   });
// // };

// // const confirmDelete = async () => {
// //   if (!pendingDeleteId) return;

// //   try {
// //     setAlert(null);
// //     setPendingDeleteId(null);

// //     await axios.delete(`${API}/api/forms/${pendingDeleteId}`, {
// //       withCredentials: true,
// //     });

// //     const updated = forms.filter((f) => f.id !== pendingDeleteId);
// //     setForms(updated);

// //     if (activeFormId === pendingDeleteId) {
// //       setActiveFormId(updated[0]?.id || null);
// //       setViewMode("edit");
// //     }
// //   } catch (err: any) {
// //     console.error(err);
// //   }
// // };



// //   /* ---------------- FIELD ACTIONS ---------------- */
// //   const addOrUpdateField = () => {
// //     if (!fieldLabel.trim()) {
// //       setAlert({ type: "error", message: "Field label is required" });
// //       return;
// //     }

// //     let options: string[] | undefined;
// //     if (showOptions) {
// //       options = optionsInput
// //         .split(",")
// //         .map((o) => o.trim())
// //         .filter(Boolean);
// //       if (options.length === 0) {
// //         setAlert({
// //           type: "error",
// //           message: "Please provide at least one option",
// //         });
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
// //       referenceUrl: fieldReferenceImageUrl || undefined,
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
// //     setFieldReferenceImageUrl(field.referenceUrl || "");
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
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const sendFormEmail = async () => {
// //     if (!activeFormId) return;

// //     const emails = shareEmails.map((e) => e.trim()).filter(Boolean);

// //     if (emails.length === 0) {
// //       setAlert({
// //         type: "error",
// //         message: "Please enter at least one email address",
// //       });
// //       return;
// //     }

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     const invalidEmails = emails.filter((e) => !emailRegex.test(e));

// //     if (invalidEmails.length > 0) {
// //       setAlert({
// //         type: "error",
// //         message: `Invalid email(s):\n${invalidEmails.join("\n")}`,
// //       });
// //       return;
// //     }

// //     try {
// //       setSendingEmail(true);
// //       setAlert(null);

// //       await axios.post(
// //         `${API}/api/forms/${activeFormId}/send-email`,
// //         {
// //           emails,
// //           formUrl: getFormUrl(),
// //           formTitle: draftTitle.trim() || "Form",
// //           fields: draftFields.length ? draftFields : activeForm?.fields || [],
// //         },
// //         { withCredentials: true }
// //       );

// //       setShareEmails([""]);
// //       // Optional: you can show a success alert here if you want
// //       // setAlert({ type: "success", message: "Email sent successfully" });
// //     } catch (err: any) {
// //       console.error(err);
// //       setAlert({
// //         type: "error",
// //         message: err?.response?.data?.message || "Failed to send email",
// //       });
// //     } finally {
// //       setSendingEmail(false);
// //     }
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
// //       {/* Custom Alert Modal */}
// //     {alert && (
// //   <Alert
// //     type={alert.type}
// //     message={alert.message}
// //     onClose={() => {
// //       setAlert(null);
// //       setPendingDeleteId(null);   // clear pending delete when closed
// //     }}
// //     confirm={!!pendingDeleteId}   // show Yes/No only when deleting
// //     onConfirm={confirmDelete}
// //     confirmText="Yes, Delete"
// //     cancelText="Cancel"
// //   />
// // )}

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
// //           <div className="flex-1 min-w-0">
// //             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
// //               Form Management
// //             </span>
// //             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
// //               Form Builder
// //             </h1>
// //           </div>

// //           <div className="flex flex-col items-end gap-2 shrink-0">
// //             <div className="flex flex-wrap justify-end gap-2">
// //               <button
// //                 onClick={createNewForm}
// //                 disabled={saving}
// //                 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //               >
// //                 {saving ? (
// //                   <Loader2 size={15} className="animate-spin" />
// //                 ) : (
// //                   <Plus size={15} />
// //                 )}
// //                 New Form
// //               </button>

// //               {activeForm && (
// //                 <>
// //                   <button
// //                     onClick={() =>
// //                       setViewMode(viewMode === "preview" ? "edit" : "preview")
// //                     }
// //                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
// //                       viewMode === "preview"
// //                         ? "bg-purple-50 border-purple-300 text-purple-700"
// //                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
// //                     }`}
// //                   >
// //                     <Eye size={14} />
// //                     {viewMode === "preview" ? "Edit" : "Preview"}
// //                   </button>

// //                   <button
// //                     onClick={() =>
// //                       setViewMode(
// //                         viewMode === "responses" ? "edit" : "responses"
// //                       )
// //                     }
// //                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
// //                       viewMode === "responses"
// //                         ? "bg-purple-50 border-purple-300 text-purple-700"
// //                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
// //                     }`}
// //                   >
// //                     <Inbox size={14} />
// //                     Responses
// //                   </button>

// //                   {viewMode === "edit" && (
// //                     <button
// //                       onClick={saveForm}
// //                       disabled={saving}
// //                       className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //                     >
// //                       {saving ? (
// //                         <Loader2 size={14} className="animate-spin" />
// //                       ) : (
// //                         <Save size={14} />
// //                       )}
// //                       Save
// //                     </button>
// //                   )}
// //                 </>
// //               )}
// //             </div>

// //             {activeForm && (
// //               <div className="flex flex-wrap items-start justify-end gap-2 w-full max-w-[720px]">
// //                 {shareEmails.map((email, index) => (
// //                   <div
// //                     key={index}
// //                     className="flex items-center gap-1.5 min-w-[220px] max-w-[280px] flex-1"
// //                   >
// //                     <input
// //                       type="email"
// //                       value={email}
// //                       onChange={(e) => {
// //                         const updated = [...shareEmails];
// //                         updated[index] = e.target.value;
// //                         setShareEmails(updated);
// //                       }}
// //                       placeholder="recipient@email.com"
// //                       className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
// //                     />

// //                     {shareEmails.length > 1 && (
// //                       <button
// //                         type="button"
// //                         onClick={() => {
// //                           setShareEmails(
// //                             shareEmails.filter((_, i) => i !== index)
// //                           );
// //                         }}
// //                         className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition shrink-0"
// //                       >
// //                         <Trash2 size={14} />
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}

// //                 <div className="flex items-center gap-2 shrink-0">
// //                   <button
// //                     type="button"
// //                     onClick={() => setShareEmails([...shareEmails, ""])}
// //                     className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
// //                   >
// //                     <Plus size={13} />
// //                     Add another email
// //                   </button>

// //                   <button
// //                     onClick={sendFormEmail}
// //                     disabled={
// //                       sendingEmail || shareEmails.every((e) => !e.trim())
// //                     }
// //                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
// //                   >
// //                     {sendingEmail ? (
// //                       <Loader2 size={14} className="animate-spin" />
// //                     ) : (
// //                       <Mail size={14} />
// //                     )}
// //                     Send
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

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
// //             ) : viewMode === "preview" ? (
// //               <FormPreview
// //                 schema={{
// //                   ...activeForm,
// //                   title: draftTitle,
// //                   description: draftDescription,
// //                   fields: draftFields,
// //                 }}
// //                 onBack={() => setViewMode("edit")}
// //               />
// //             ) : viewMode === "responses" ? (
// //               <FormResponses
// //                 formTitle={draftTitle || activeForm.title}
// //                 fields={
// //                   draftFields.length ? draftFields : activeForm.fields || []
// //                 }
// //                 responses={responses}
// //                 loading={responsesLoading}
// //                 error={responsesError}
// //                 onRefresh={loadResponses}
// //                 onBack={() => setViewMode("edit")}
// //               />
// //             ) : (
// //               <div className="space-y-4">
// //                 {/* Form header */}
// //                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 space-y-4">
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
// //                           <Link2
// //                             size={12}
// //                             className="shrink-0 text-slate-400"
// //                           />
// //                           <span className="truncate">
// //                             /form/{user?.organisation_id ?? "org"}/
// //                             {activeFormId}
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

// //                       <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 p-3">
// //                         <div className="flex items-center justify-between gap-3 mb-2">
// //                           <div>
// //                             <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple-700">
// //                               Field reference image
// //                             </p>
// //                             <p className="text-[10px] text-slate-500 mt-0.5">
// //                               Optional image shown under this field
// //                             </p>
// //                           </div>
// //                           {fieldReferenceImageUrl && (
// //                             <button
// //                               type="button"
// //                               onClick={() => setFieldReferenceImageUrl("")}
// //                               className="text-[10px] text-red-600 hover:text-red-700 font-medium"
// //                             >
// //                               Remove
// //                             </button>
// //                           )}
// //                         </div>

// //                         <input
// //                           type="file"
// //                           accept="image/*"
// //                           onChange={(e) => {
// //                             const file = e.target.files?.[0];
// //                             if (file) uploadFieldReferenceImage(file);
// //                           }}
// //                           className="block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-purple-600 file:px-2 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-purple-700"
// //                         />

// //                         {fieldReferenceImageUrl && (
// //                           <div className="mt-3 overflow-hidden rounded-lg border border-purple-200 bg-white">
// //                             <img
// //                               src={fieldReferenceImageUrl}
// //                               alt="Field reference"
// //                               className="h-28 w-full object-cover"
// //                             />
// //                           </div>
// //                         )}
// //                       </div>

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
// //                               {field.type === "image" ? (
// //                                 <div className="mt-2 flex items-center gap-2">
// //                                   <div className="flex h-10 w-14 items-center justify-center rounded-md border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-white to-pink-100 text-[8px] font-semibold text-purple-600">
// //                                     IMG
// //                                   </div>
// //                                   <p className="text-[11px] text-slate-500">
// //                                     Image upload field
// //                                   </p>
// //                                 </div>
// //                               ) : field.options ? (
// //                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
// //                                   {field.options.join(", ")}
// //                                 </p>
// //                               ) : null}
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
// //                       setViewMode("edit");
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
// //                         {form.title || "No title"}
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

// // // ===================== RESPONSES =====================
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
// //     if (typeof val === "object") return JSON.stringify(val);
// //     return String(val);
// //   };

// //   const visibleFields = fields.filter((f) => f.type !== "reference-image");
// //   const columns =
// //     visibleFields.length > 0
// //       ? visibleFields.map((f) => ({ key: f.id, label: f.label }))
// //       : (() => {
// //           const first = responses[0]?.values;
// //           if (!first || typeof first !== "object") return [];
// //           return Object.keys(first).map((key) => ({ key, label: key }));
// //         })();

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
// //       ) : columns.length === 0 ? (
// //         <div className="p-5 space-y-3">
// //           <p className="text-xs text-slate-500 mb-2">
// //             Could not map field labels — showing raw response data
// //           </p>
// //           {responses.map((r, idx) => (
// //             <pre
// //               key={r.id}
// //               className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto"
// //             >
// //               #{responses.length - idx}
// //               {"\n"}
// //               {JSON.stringify(r.values, null, 2)}
// //             </pre>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="bg-slate-50 border-b border-slate-100">
// //                 <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
// //                   #
// //                 </th>
// //                 {columns.map((col) => (
// //                   <th
// //                     key={col.key}
// //                     className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap max-w-[180px]"
// //                   >
// //                     {col.label}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {responses.map((r, idx) => (
// //                 <tr
// //                   key={r.id}
// //                   className="border-b border-slate-100 hover:bg-slate-50/80 transition"
// //                 >
// //                   <td className="px-4 py-3 text-slate-400 tabular-nums">
// //                     {responses.length - idx}
// //                   </td>
// //                   {columns.map((col) => {
// //                     const value = r.values?.[col.key];
// //                     const isImageField =
// //                       visibleFields.find((f) => f.id === col.key)?.type ===
// //                       "image";

// //                     return (
// //                       <td
// //                         key={col.key}
// //                         className="px-4 py-3 text-slate-800 max-w-[260px] align-top"
// //                         title={
// //                           typeof value === "object"
// //                             ? JSON.stringify(value)
// //                             : formatValue(value)
// //                         }
// //                       >
// //                         {isImageField && value ? (
// //                           <div className="flex flex-col gap-2">
// //                             <img
// //                               src={
// //                                 typeof value === "string"
// //                                   ? value
// //                                   : value.url || ""
// //                               }
// //                               alt={
// //                                 typeof value === "string"
// //                                   ? "Uploaded image"
// //                                   : value.name || "Uploaded image"
// //                               }
// //                               className="h-20 w-20 object-cover rounded-lg border border-slate-200 bg-slate-50"
// //                             />
// //                             <div className="flex items-center gap-3">
// //                               <a
// //                                 href={
// //                                   typeof value === "string"
// //                                     ? value
// //                                     : value.url || ""
// //                                 }
// //                                 target="_blank"
// //                                 rel="noreferrer"
// //                                 className="inline-flex text-xs text-purple-600 hover:text-purple-700 underline"
// //                               >
// //                                 View
// //                               </a>
// //                               <a
// //                                 href={
// //                                   typeof value === "string"
// //                                     ? value
// //                                     : value.url || ""
// //                                 }
// //                                 target="_blank"
// //                                 rel="noreferrer"
// //                                 className="inline-flex text-xs text-slate-600 hover:text-slate-800 underline"
// //                                 download
// //                               >
// //                                 Download
// //                               </a>
// //                             </div>
// //                           </div>
// //                         ) : (
// //                           <div className="truncate max-w-[220px]">
// //                             {formatValue(value)}
// //                           </div>
// //                         )}
// //                       </td>
// //                     );
// //                   })}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
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
// //   const [uploadingFieldId, setUploadingFieldId] = useState<string | null>(null);
// //   const [uploadError, setUploadError] = useState<string | null>(null);

// //   const visibleFields = (schema.fields || []).filter(
// //     (field: any) => field.type !== "reference-image"
// //   );

// //   const uploadImageFile = async (fieldId: string, file: File) => {
// //     const formData = new FormData();
// //     formData.append("image", file);

// //     try {
// //       setUploadingFieldId(fieldId);
// //       setUploadError(null);

// //       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
// //         withCredentials: true,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       const url = res.data?.url;
// //       if (!url) {
// //         throw new Error("Image upload did not return a URL");
// //       }

// //       setValues((prev) => ({
// //         ...prev,
// //         [fieldId]: {
// //           url,
// //           name: file.name,
// //           size: file.size,
// //         },
// //       }));
// //     } catch (err: any) {
// //       console.error(err);
// //       setUploadError(err?.response?.data?.message || "Image upload failed");
// //     } finally {
// //       setUploadingFieldId(null);
// //     }
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
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
// //         {uploadError && (
// //           <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
// //             {uploadError}
// //           </div>
// //         )}

// //         {visibleFields.map((field: any) => (
// //           <div key={field.id}>
// //             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
// //               {field.label}
// //               {field.required && <span className="text-red-500 ml-1">*</span>}
// //             </label>

// //             {field.referenceUrl && (
// //               <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
// //                 <img
// //                   src={field.referenceUrl}
// //                   alt={field.label}
// //                   className="max-h-64 w-full object-cover"
// //                 />
// //               </div>
// //             )}

// //             {field.type === "image" ? (
// //               <div className="space-y-3">
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={(e) => {
// //                     const file = e.target.files?.[0];
// //                     if (file) {
// //                       uploadImageFile(field.id, file);
// //                     }
// //                   }}
// //                   className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-700"
// //                 />

// //                 {uploadingFieldId === field.id && (
// //                   <div className="inline-flex items-center gap-2 text-xs text-slate-500">
// //                     <Loader2 size={14} className="animate-spin" />
// //                     Uploading image...
// //                   </div>
// //                 )}

// //                 {values[field.id] && (
// //                   <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
// //                     <img
// //                       src={values[field.id]?.url}
// //                       alt={values[field.id]?.name || field.label}
// //                       className="h-32 w-full rounded-md object-cover border border-slate-200"
// //                     />
// //                     <div className="flex items-center justify-between gap-3">
// //                       <span className="text-xs text-slate-600 truncate">
// //                         {values[field.id]?.name || "Uploaded image"}
// //                       </span>
// //                       <div className="flex items-center gap-3">
// //                         <a
// //                           href={values[field.id]?.url}
// //                           target="_blank"
// //                           rel="noreferrer"
// //                           className="text-xs text-purple-600 hover:text-purple-700 underline"
// //                         >
// //                           View
// //                         </a>
// //                         <a
// //                           href={values[field.id]?.url}
// //                           target="_blank"
// //                           rel="noreferrer"
// //                           download
// //                           className="text-xs text-slate-600 hover:text-slate-800 underline"
// //                         >
// //                           Download
// //                         </a>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : field.type === "textarea" ? (
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
// //                 {field.options?.map((opt: string) => (
// //                   <option key={opt} value={opt}>
// //                     {opt}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : field.type === "radio" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt: string) => (
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
// //             ) : field.type === "checkbox-group" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt: string) => (
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
// //             ) : field.type === "checkbox" ? (
// //               <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">
// //                 <input
// //                   type="checkbox"
// //                   checked={Boolean(values[field.id])}
// //                   required={field.required}
// //                   onChange={(e) =>
// //                     setValues((p) => ({ ...p, [field.id]: e.target.checked }))
// //                   }
// //                   className="rounded accent-purple-600"
// //                 />
// //                 {field.placeholder || "Yes"}
// //               </label>
// //             ) : field.type === "rating" ? (
// //               <div className="flex items-center gap-2">
// //                 {[1, 2, 3, 4, 5].map((star) => (
// //                   <button
// //                     key={star}
// //                     type="button"
// //                     onClick={() =>
// //                       setValues((p) => ({ ...p, [field.id]: star }))
// //                     }
// //                     className={`text-2xl transition ${
// //                       (values[field.id] || 0) >= star
// //                         ? "text-amber-400"
// //                         : "text-slate-300"
// //                     }`}
// //                   >
// //                     ★
// //                   </button>
// //                 ))}
// //               </div>
// //             ) : field.type === "daterange" ? (
// //               <div className="grid gap-3 sm:grid-cols-2">
// //                 <div>
// //                   <label className="mb-1 block text-xs font-medium text-slate-500">
// //                     Start date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={values[field.id]?.start || ""}
// //                     onChange={(e) => {
// //                       const current = values[field.id] || {
// //                         start: "",
// //                         end: "",
// //                       };
// //                       setValues((p) => ({
// //                         ...p,
// //                         [field.id]: { ...current, start: e.target.value },
// //                       }));
// //                     }}
// //                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="mb-1 block text-xs font-medium text-slate-500">
// //                     End date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={values[field.id]?.end || ""}
// //                     onChange={(e) => {
// //                       const current = values[field.id] || {
// //                         start: "",
// //                         end: "",
// //                       };
// //                       setValues((p) => ({
// //                         ...p,
// //                         [field.id]: { ...current, end: e.target.value },
// //                       }));
// //                     }}
// //                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                   />
// //                 </div>
// //               </div>
// //             ) : (
// //               <input
// //                 type={
// //                   field.type === "email"
// //                     ? "email"
// //                     : field.type === "tel"
// //                       ? "tel"
// //                       : field.type === "number"
// //                         ? "number"
// //                         : field.type === "date"
// //                           ? "date"
// //                           : "text"
// //                 }
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
// //   Inbox,
// // } from "lucide-react";
// // import Alert from "../../../../../../components/Aleartmessage";

// // // ===================== API =====================
// // const API = `${import.meta.env.VITE_BACKEND_URL}`;

// // // ===================== TYPES =====================
// // type FieldType =
// //   | "text"
// //   | "textarea"
// //   | "email"
// //   | "tel"
// //   | "number"
// //   | "date"
// //   | "daterange"
// //   | "select"
// //   | "radio"
// //   | "checkbox-group"
// //   | "checkbox"
// //   | "rating"
// //   | "image"
// //   | "reference-image";

// // interface FormField {
// //   id: string;
// //   type: FieldType;
// //   label: string;
// //   required: boolean;
// //   placeholder?: string;
// //   options?: string[];
// //   referenceUrl?: string;
// // }

// // interface FormSchema {
// //   id: string;
// //   title: string;
// //   description?: string;
// //   fields: FormField[];
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // interface FormResponse {
// //   id: string;
// //   formId: string;
// //   values: Record<string, any>;
// //   createdAt: string;
// // }

// // // ===================== CONSTANTS =====================
// // const generateId = () => Math.random().toString(36).slice(2, 11);

// // const FIELD_TYPES: { value: FieldType; label: string }[] = [
// //   { value: "text", label: "📝 Text" },
// //   { value: "email", label: "📧 Email" },
// //   { value: "tel", label: "📱 Mobile Number" },
// //   { value: "textarea", label: "📄 Textarea" },
// //   { value: "number", label: "🔢 Number" },
// //   { value: "date", label: "📅 Date" },
// //   { value: "daterange", label: "📆 Date Range" },
// //   { value: "select", label: "📋 Dropdown" },
// //   { value: "radio", label: "◉ Radio Buttons" },
// //   { value: "checkbox-group", label: "☑️ Checkbox Group" },
// //   { value: "checkbox", label: "☐ Single Checkbox" },
// //   { value: "rating", label: "⭐ Rating" },
// //   { value: "image", label: "🖼️ Image Upload" },
// // ];

// // // ===================== MAIN COMPONENT =====================
// // export default function FormBuilder() {
// //   const { user } = useContext(AuthContext);

// //   const [forms, setForms] = useState<FormSchema[]>([]);
// //   const [activeFormId, setActiveFormId] = useState<string | null>(null);
// //   const [viewMode, setViewMode] = useState<"edit" | "preview" | "responses">("edit");
// //   const [copied, setCopied] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   // Custom Alert
// //   const [alert, setAlert] = useState<{
// //     type: "success" | "warning" | "error";
// //     message: string;
// //   } | null>(null);

// //   const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

// //   // Responses
// //   const [responses, setResponses] = useState<FormResponse[]>([]);
// //   const [responsesLoading, setResponsesLoading] = useState(false);
// //   const [responsesError, setResponsesError] = useState<string | null>(null);

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
// //   const [fieldReferenceImageUrl, setFieldReferenceImageUrl] = useState("");

// //   // Email share
// //   const [shareEmails, setShareEmails] = useState<string[]>([""]);
// //   const [sendingEmail, setSendingEmail] = useState(false);

// //   const activeForm = forms.find((f) => f.id === activeFormId) || null;
// //   const showOptions = ["select", "radio", "checkbox-group"].includes(fieldType);

// //   /* ---------------- GET FORMS ---------------- */
// //   const loadForms = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setAlert(null);

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
// //       setAlert({
// //         type: "error",
// //         message: err?.response?.data?.message || "Failed to load forms",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     loadForms();
// //   }, [loadForms]);

// //   const getVisibleFields = (fields: FormField[] = []) =>
// //     fields.filter((field) => field.type !== "reference-image");

// //   /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
// //   useEffect(() => {
// //     if (activeForm) {
// //       const formFields = getVisibleFields(activeForm.fields || []);
// //       setDraftTitle(activeForm.title);
// //       setDraftDescription(activeForm.description || "");
// //       setDraftFields(formFields);
// //       resetFieldBuilder();
// //     }
// //   }, [activeFormId]);

// //   /* ---------------- LOAD RESPONSES ---------------- */
// //   const loadResponses = useCallback(async () => {
// //     if (!activeFormId) return;

// //     try {
// //       setResponsesLoading(true);
// //       setResponsesError(null);

// //       const res = await axios.get(
// //         `${API}/api/forms/${activeFormId}/responses`,
// //         { withCredentials: true }
// //       );

// //       if (!res.data?.success) {
// //         setResponsesError(res.data?.message || "Failed to load responses");
// //         setResponses([]);
// //         return;
// //       }

// //       setResponses(res.data.data?.responses || []);
// //     } catch (err: any) {
// //       console.error(err);
// //       setResponsesError(
// //         err?.response?.data?.message || "Failed to load responses"
// //       );
// //       setResponses([]);
// //     } finally {
// //       setResponsesLoading(false);
// //     }
// //   }, [activeFormId]);

// //   useEffect(() => {
// //     if (viewMode === "responses" && activeFormId) {
// //       loadResponses();
// //     }
// //   }, [viewMode, activeFormId, loadResponses]);

// //   /* ---------------- HELPERS ---------------- */
// //   const resetFieldBuilder = () => {
// //     setFieldType("text");
// //     setFieldLabel("");
// //     setFieldRequired(false);
// //     setFieldPlaceholder("");
// //     setOptionsInput("");
// //     setFieldReferenceImageUrl("");
// //     setEditingFieldId(null);
// //   };
// // const hasUnsavedChanges = () => {
// //   if (!activeForm) return false;

// //   const currentFields = getVisibleFields(activeForm.fields || []);

// //   return (
// //     draftTitle !== (activeForm.title || "") ||
// //     draftDescription !== (activeForm.description || "") ||
// //     JSON.stringify(draftFields) !== JSON.stringify(currentFields)
// //   );
// // };
// //   /* ---------------- CREATE FORM ---------------- */
// //   const createNewForm = async () => {
// //     try {
// //       setSaving(true);
// //       setAlert(null);

// //       const res = await axios.post(
// //         `${API}/api/forms`,
// //         {
// //           title: "New Form",
// //           description: "",
// //           fields: [],
// //         },
// //         { withCredentials: true }
// //       );

// //       const created: FormSchema = {
// //         ...res.data.data,
// //         title: "",
// //       };

// //       setForms((prev) => [created, ...prev]);
// //       setActiveFormId(created.id);
// //       setViewMode("edit");

// //       setDraftTitle("");
// //       setDraftDescription("");
// //       setDraftFields([]);
// //       resetFieldBuilder();
// //     } catch (err: any) {
// //       console.error(err);
// //       // No custom Alert for create (as requested)
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ---------------- SAVE / UPDATE FORM ---------------- */
// // //   const saveForm = async () => {
// // //     if (!activeFormId) return;

// // //     if (!draftTitle.trim()) {
// // //       setAlert({ type: "error", message: "Title is required" });
// // //       return;
// // //     }

// // //     try {
// // //       setSaving(true);
// // //       setAlert(null);

// // //       const res = await axios.put(
// // //         `${API}/api/forms/${activeFormId}`,
// // //         {
// // //           title: draftTitle.trim(),
// // //           description: draftDescription,
// // //           fields: draftFields,
// // //         },
// // //         { withCredentials: true }
// // //       );

// // //      const updated: FormSchema = res.data.data;

// // // setForms((prev) =>
// // //   prev.map((f) => (f.id === activeFormId ? updated : f))
// // // );

// // // setAlert({
// // //   type: "success",
// // //   message: "Form successfully created",
// // // });
// // //       // No success popup
// // //     } catch (err: any) {
// // //       console.error(err);
// // //       setAlert({
// // //         type: "error",
// // //         message: err?.response?.data?.message || "Failed to save form",
// // //       });
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };
// // const saveForm = async (): Promise<boolean> => {
// //   if (!activeFormId) return false;

// //   if (!draftTitle.trim()) {
// //     setAlert({
// //       type: "error",
// //       message: "Title is required",
// //     });
// //     return false;
// //   }

// //   try {
// //     setSaving(true);
// //     setAlert(null);

// //     const res = await axios.put(
// //       `${API}/api/forms/${activeFormId}`,
// //       {
// //         title: draftTitle.trim(),
// //         description: draftDescription,
// //         fields: draftFields,
// //       },
// //       { withCredentials: true }
// //     );

// //     const updated: FormSchema = res.data.data;

// //     setForms((prev) =>
// //       prev.map((f) =>
// //         f.id === activeFormId ? updated : f
// //       )
// //     );

// //     setAlert({
// //       type: "success",
// //       message: "Form saved successfully",
// //     });

// //     return true;
// //   } catch (err: any) {
// //     console.error(err);

// //     setAlert({
// //       type: "error",
// //       message:
// //         err?.response?.data?.message ||
// //         "Failed to save form",
// //     });

// //     return false;
// //   } finally {
// //     setSaving(false);
// //   }
// // };
// //   const uploadFieldReferenceImage = async (file: File) => {
// //     const formData = new FormData();
// //     formData.append("image", file);

// //     try {
// //       setAlert(null);
// //       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
// //         withCredentials: true,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       const url = res.data?.url;
// //       if (!url) throw new Error("Reference image upload did not return a URL");

// //       setFieldReferenceImageUrl(url);
// //     } catch (err: any) {
// //       console.error(err);
// //       setAlert({
// //         type: "error",
// //         message:
// //           err?.response?.data?.message ||
// //           err?.message ||
// //           "Reference image upload failed",
// //       });
// //     }
// //   };

// //   /* ---------------- DELETE FORM ---------------- */
// //   const deleteForm = (id: string) => {
// //     setPendingDeleteId(id);
// //     setAlert({
// //       type: "warning",
// //       message:
// //         "Are you sure you want to delete this form? This action cannot be undone.",
// //     });
// //   };

// //   const confirmDelete = async () => {
// //     if (!pendingDeleteId) return;

// //     try {
// //       setAlert(null);
// //       setPendingDeleteId(null);

// //       await axios.delete(`${API}/api/forms/${pendingDeleteId}`, {
// //         withCredentials: true,
// //       });

// //       const updated = forms.filter((f) => f.id !== pendingDeleteId);
// //       setForms(updated);

// //       if (activeFormId === pendingDeleteId) {
// //         setActiveFormId(updated[0]?.id || null);
// //         setViewMode("edit");
// //       }
// //     } catch (err: any) {
// //       console.error(err);
// //       // No Alert for delete errors
// //     }
// //   };

// //   /* ---------------- FIELD ACTIONS ---------------- */
// //   const addOrUpdateField = () => {
// //     if (!fieldLabel.trim()) {
// //       setAlert({ type: "error", message: "Field label is required" });
// //       return;
// //     }

// //     let options: string[] | undefined;
// //     if (showOptions) {
// //       options = optionsInput
// //         .split(",")
// //         .map((o) => o.trim())
// //         .filter(Boolean);
// //       if (options.length === 0) {
// //         setAlert({
// //           type: "error",
// //           message: "Please provide at least one option",
// //         });
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
// //       referenceUrl: fieldReferenceImageUrl || undefined,
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
// //     setFieldReferenceImageUrl(field.referenceUrl || "");
// //   };

// //   const deleteField = (id: string) => {
// //     setDraftFields((prev) => prev.filter((f) => f.id !== id));
// //     if (editingFieldId === id) resetFieldBuilder();
// //   };

// //   const moveField = (index: number, direction: "up" | "down") => {
// //     const newFields = [...draftFields];
// //     const target = direction === "up" ? index - 1 : index + 1;
// //     if (target < 0 || target >= newFields.length) return;
// //     [newFields[index], newFields[target]] = [newFields[target], newFields[index]];
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
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const sendFormEmail = async () => {
// //     if (!activeFormId) return;

// //     const emails = shareEmails.map((e) => e.trim()).filter(Boolean);

// //     if (emails.length === 0) {
// //       setAlert({
// //         type: "error",
// //         message: "Please enter at least one email address",
// //       });
// //       return;
// //     }

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     const invalidEmails = emails.filter((e) => !emailRegex.test(e));

// //     if (invalidEmails.length > 0) {
// //       setAlert({
// //         type: "error",
// //         message: `Invalid email(s):\n${invalidEmails.join("\n")}`,
// //       });
// //       return;
// //     }

// //     try {
// //       setSendingEmail(true);
// //       setAlert(null);

// //       await axios.post(
// //         `${API}/api/forms/${activeFormId}/send-email`,
// //         {
// //           emails,
// //           formUrl: getFormUrl(),
// //           formTitle: draftTitle.trim() || "Form",
// //           fields: draftFields.length ? draftFields : activeForm?.fields || [],
// //         },
// //         { withCredentials: true }
// //       );

// //       setShareEmails([""]);
// //     } catch (err: any) {
// //       console.error(err);
// //       setAlert({
// //         type: "error",
// //         message: err?.response?.data?.message || "Failed to send email",
// //       });
// //     } finally {
// //       setSendingEmail(false);
// //     }
// //   };

// //   const shareViaWhatsApp = () => {
// //     const url = getFormUrl();
// //     if (!url) return;

// //     const text = encodeURIComponent(`Hi! Please fill out this form:\n${url}`);
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
// //       {/* Custom Alert Modal */}
// //       {alert && (
// //         <Alert
// //           type={alert.type}
// //           message={alert.message}
// //           onClose={() => {
// //             setAlert(null);
// //             setPendingDeleteId(null);
// //           }}
// //           confirm={!!pendingDeleteId}
// //           onConfirm={confirmDelete}
// //           confirmText="Yes, Delete"
// //           cancelText="Cancel"
// //         />
// //       )}

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
// //           <div className="flex-1 min-w-0">
// //             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
// //               Form Management
// //             </span>
// //             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
// //               Form Builder
// //             </h1>
// //           </div>

// //           <div className="flex flex-col items-end gap-2 shrink-0">
// //             <div className="flex flex-wrap justify-end gap-2">
// //               <button
// //                 onClick={createNewForm}
// //                 disabled={saving}
// //                 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //               >
// //                 {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
// //                 New Form
// //               </button>

// //               {activeForm && (
// //                 <>
// //                   <button
// //                     onClick={() =>
// //                       setViewMode(viewMode === "preview" ? "edit" : "preview")
// //                     }
// //                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
// //                       viewMode === "preview"
// //                         ? "bg-purple-50 border-purple-300 text-purple-700"
// //                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
// //                     }`}
// //                   >
// //                     <Eye size={14} />
// //                     {viewMode === "preview" ? "Edit" : "Preview"}
// //                   </button>

// //                   <button
// //                     onClick={() =>
// //                       setViewMode(viewMode === "responses" ? "edit" : "responses")
// //                     }
// //                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
// //                       viewMode === "responses"
// //                         ? "bg-purple-50 border-purple-300 text-purple-700"
// //                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
// //                     }`}
// //                   >
// //                     <Inbox size={14} />
// //                     Responses
// //                   </button>

// //                   {viewMode === "edit" && (
// //                     <button
// //                       onClick={saveForm}
// //                       disabled={saving}
// //                       className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
// //                     >
// //                       {saving ? (
// //                         <Loader2 size={14} className="animate-spin" />
// //                       ) : (
// //                         <Save size={14} />
// //                       )}
// //                       Save
// //                     </button>
// //                   )}
// //                 </>
// //               )}
// //             </div>

// //             {activeForm && (
// //               <div className="flex flex-wrap items-start justify-end gap-2 w-full max-w-[720px]">
// //                 {shareEmails.map((email, index) => (
// //                   <div
// //                     key={index}
// //                     className="flex items-center gap-1.5 min-w-[220px] max-w-[280px] flex-1"
// //                   >
// //                     <input
// //                       type="email"
// //                       value={email}
// //                       onChange={(e) => {
// //                         const updated = [...shareEmails];
// //                         updated[index] = e.target.value;
// //                         setShareEmails(updated);
// //                       }}
// //                       placeholder="recipient@email.com"
// //                       className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
// //                     />
// //                     {shareEmails.length > 1 && (
// //                       <button
// //                         type="button"
// //                         onClick={() =>
// //                           setShareEmails(shareEmails.filter((_, i) => i !== index))
// //                         }
// //                         className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition shrink-0"
// //                       >
// //                         <Trash2 size={14} />
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}

// //                 <div className="flex items-center gap-2 shrink-0">
// //                   <button
// //                     type="button"
// //                     onClick={() => setShareEmails([...shareEmails, ""])}
// //                     className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
// //                   >
// //                     <Plus size={13} />
// //                     Add another email
// //                   </button>

// //                   <button
// //                     onClick={sendFormEmail}
// //                     disabled={sendingEmail || shareEmails.every((e) => !e.trim())}
// //                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
// //                   >
// //                     {sendingEmail ? (
// //                       <Loader2 size={14} className="animate-spin" />
// //                     ) : (
// //                       <Mail size={14} />
// //                     )}
// //                     Send
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Main grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
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
// //             ) : viewMode === "preview" ? (
// //               <FormPreview
// //                 schema={{
// //                   ...activeForm,
// //                   title: draftTitle,
// //                   description: draftDescription,
// //                   fields: draftFields,
// //                 }}
// //                 onBack={() => setViewMode("edit")}
// //               />
// //             ) : viewMode === "responses" ? (
// //               <FormResponses
// //                 formTitle={draftTitle || activeForm.title}
// //                 fields={draftFields.length ? draftFields : activeForm.fields || []}
// //                 responses={responses}
// //                 loading={responsesLoading}
// //                 error={responsesError}
// //                 onRefresh={loadResponses}
// //                 onBack={() => setViewMode("edit")}
// //               />
// //             ) : (
// //               <div className="space-y-4">
// //                 {/* Form header */}
// //                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 space-y-4">
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
// //                             /form/{user?.organisation_id ?? "org"}/{activeFormId}
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
// //                           onChange={(e) => setFieldType(e.target.value as FieldType)}
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

// //                       <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 p-3">
// //                         <div className="flex items-center justify-between gap-3 mb-2">
// //                           <div>
// //                             <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple-700">
// //                               Field reference image
// //                             </p>
// //                             <p className="text-[10px] text-slate-500 mt-0.5">
// //                               Optional image shown under this field
// //                             </p>
// //                           </div>
// //                           {fieldReferenceImageUrl && (
// //                             <button
// //                               type="button"
// //                               onClick={() => setFieldReferenceImageUrl("")}
// //                               className="text-[10px] text-red-600 hover:text-red-700 font-medium"
// //                             >
// //                               Remove
// //                             </button>
// //                           )}
// //                         </div>

// //                         <input
// //                           type="file"
// //                           accept="image/*"
// //                           onChange={(e) => {
// //                             const file = e.target.files?.[0];
// //                             if (file) uploadFieldReferenceImage(file);
// //                           }}
// //                           className="block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-purple-600 file:px-2 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-purple-700"
// //                         />

// //                         {fieldReferenceImageUrl && (
// //                           <div className="mt-3 overflow-hidden rounded-lg border border-purple-200 bg-white">
// //                             <img
// //                               src={fieldReferenceImageUrl}
// //                               alt="Field reference"
// //                               className="h-28 w-full object-cover"
// //                             />
// //                           </div>
// //                         )}
// //                       </div>

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
// //                         <p className="text-xs text-slate-400">No fields added yet</p>
// //                       </div>
// //                     ) : (
// //                       <div className="space-y-2 max-h-[380px] overflow-y-auto">
// //                         {draftFields.map((field, index) => (
// //                           <div
// //                             key={field.id}
// //                             className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
// //                           >
// //                             <GripVertical size={14} className="text-slate-300 shrink-0" />
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
// //                               {field.type === "image" ? (
// //                                 <div className="mt-2 flex items-center gap-2">
// //                                   <div className="flex h-10 w-14 items-center justify-center rounded-md border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-white to-pink-100 text-[8px] font-semibold text-purple-600">
// //                                     IMG
// //                                   </div>
// //                                   <p className="text-[11px] text-slate-500">
// //                                     Image upload field
// //                                   </p>
// //                                 </div>
// //                               ) : field.options ? (
// //                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
// //                                   {field.options.join(", ")}
// //                                 </p>
// //                               ) : null}
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
// //                       setViewMode("edit");
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
// //                         {form.title || "No title"}
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

// // // ===================== RESPONSES =====================
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
// //     if (typeof val === "object") return JSON.stringify(val);
// //     return String(val);
// //   };

// //   const visibleFields = fields.filter((f) => f.type !== "reference-image");
// //   const columns =
// //     visibleFields.length > 0
// //       ? visibleFields.map((f) => ({ key: f.id, label: f.label }))
// //       : (() => {
// //           const first = responses[0]?.values;
// //           if (!first || typeof first !== "object") return [];
// //           return Object.keys(first).map((key) => ({ key, label: key }));
// //         })();

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
// //       ) : columns.length === 0 ? (
// //         <div className="p-5 space-y-3">
// //           <p className="text-xs text-slate-500 mb-2">
// //             Could not map field labels — showing raw response data
// //           </p>
// //           {responses.map((r, idx) => (
// //             <pre
// //               key={r.id}
// //               className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto"
// //             >
// //               #{responses.length - idx}
// //               {"\n"}
// //               {JSON.stringify(r.values, null, 2)}
// //             </pre>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="bg-slate-50 border-b border-slate-100">
// //                 <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
// //                   #
// //                 </th>
// //                 {columns.map((col) => (
// //                   <th
// //                     key={col.key}
// //                     className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap max-w-[180px]"
// //                   >
// //                     {col.label}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {responses.map((r, idx) => (
// //                 <tr
// //                   key={r.id}
// //                   className="border-b border-slate-100 hover:bg-slate-50/80 transition"
// //                 >
// //                   <td className="px-4 py-3 text-slate-400 tabular-nums">
// //                     {responses.length - idx}
// //                   </td>
// //                   {columns.map((col) => {
// //                     const value = r.values?.[col.key];
// //                     const isImageField =
// //                       visibleFields.find((f) => f.id === col.key)?.type === "image";

// //                     return (
// //                       <td
// //                         key={col.key}
// //                         className="px-4 py-3 text-slate-800 max-w-[260px] align-top"
// //                         title={
// //                           typeof value === "object"
// //                             ? JSON.stringify(value)
// //                             : formatValue(value)
// //                         }
// //                       >
// //                         {isImageField && value ? (
// //                           <div className="flex flex-col gap-2">
// //                             <img
// //                               src={
// //                                 typeof value === "string" ? value : value.url || ""
// //                               }
// //                               alt={
// //                                 typeof value === "string"
// //                                   ? "Uploaded image"
// //                                   : value.name || "Uploaded image"
// //                               }
// //                               className="h-20 w-20 object-cover rounded-lg border border-slate-200 bg-slate-50"
// //                             />
// //                             <div className="flex items-center gap-3">
// //                               <a
// //                                 href={
// //                                   typeof value === "string" ? value : value.url || ""
// //                                 }
// //                                 target="_blank"
// //                                 rel="noreferrer"
// //                                 className="inline-flex text-xs text-purple-600 hover:text-purple-700 underline"
// //                               >
// //                                 View
// //                               </a>
// //                               <a
// //                                 href={
// //                                   typeof value === "string" ? value : value.url || ""
// //                                 }
// //                                 target="_blank"
// //                                 rel="noreferrer"
// //                                 className="inline-flex text-xs text-slate-600 hover:text-slate-800 underline"
// //                                 download
// //                               >
// //                                 Download
// //                               </a>
// //                             </div>
// //                           </div>
// //                         ) : (
// //                           <div className="truncate max-w-[220px]">
// //                             {formatValue(value)}
// //                           </div>
// //                         )}
// //                       </td>
// //                     );
// //                   })}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
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
// //   const [uploadingFieldId, setUploadingFieldId] = useState<string | null>(null);
// //   const [uploadError, setUploadError] = useState<string | null>(null);

// //   const visibleFields = (schema.fields || []).filter(
// //     (field: any) => field.type !== "reference-image"
// //   );

// //   const uploadImageFile = async (fieldId: string, file: File) => {
// //     const formData = new FormData();
// //     formData.append("image", file);

// //     try {
// //       setUploadingFieldId(fieldId);
// //       setUploadError(null);

// //       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
// //         withCredentials: true,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       const url = res.data?.url;
// //       if (!url) throw new Error("Image upload did not return a URL");

// //       setValues((prev) => ({
// //         ...prev,
// //         [fieldId]: {
// //           url,
// //           name: file.name,
// //           size: file.size,
// //         },
// //       }));
// //     } catch (err: any) {
// //       console.error(err);
// //       setUploadError(err?.response?.data?.message || "Image upload failed");
// //     } finally {
// //       setUploadingFieldId(null);
// //     }
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
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
// //         {uploadError && (
// //           <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
// //             {uploadError}
// //           </div>
// //         )}

// //         {visibleFields.map((field: any) => (
// //           <div key={field.id}>
// //             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
// //               {field.label}
// //               {field.required && <span className="text-red-500 ml-1">*</span>}
// //             </label>

// //             {field.referenceUrl && (
// //               <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
// //                 <img
// //                   src={field.referenceUrl}
// //                   alt={field.label}
// //                   className="max-h-64 w-full object-cover"
// //                 />
// //               </div>
// //             )}

// //             {field.type === "image" ? (
// //               <div className="space-y-3">
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={(e) => {
// //                     const file = e.target.files?.[0];
// //                     if (file) uploadImageFile(field.id, file);
// //                   }}
// //                   className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-700"
// //                 />

// //                 {uploadingFieldId === field.id && (
// //                   <div className="inline-flex items-center gap-2 text-xs text-slate-500">
// //                     <Loader2 size={14} className="animate-spin" />
// //                     Uploading image...
// //                   </div>
// //                 )}

// //                 {values[field.id] && (
// //                   <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
// //                     <img
// //                       src={values[field.id]?.url}
// //                       alt={values[field.id]?.name || field.label}
// //                       className="h-32 w-full rounded-md object-cover border border-slate-200"
// //                     />
// //                     <div className="flex items-center justify-between gap-3">
// //                       <span className="text-xs text-slate-600 truncate">
// //                         {values[field.id]?.name || "Uploaded image"}
// //                       </span>
// //                       <div className="flex items-center gap-3">
// //                         <a
// //                           href={values[field.id]?.url}
// //                           target="_blank"
// //                           rel="noreferrer"
// //                           className="text-xs text-purple-600 hover:text-purple-700 underline"
// //                         >
// //                           View
// //                         </a>
// //                         <a
// //                           href={values[field.id]?.url}
// //                           target="_blank"
// //                           rel="noreferrer"
// //                           download
// //                           className="text-xs text-slate-600 hover:text-slate-800 underline"
// //                         >
// //                           Download
// //                         </a>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : field.type === "textarea" ? (
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
// //                 {field.options?.map((opt: string) => (
// //                   <option key={opt} value={opt}>
// //                     {opt}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : field.type === "radio" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt: string) => (
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
// //             ) : field.type === "checkbox-group" ? (
// //               <div className="space-y-2">
// //                 {field.options?.map((opt: string) => (
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
// //             ) : field.type === "checkbox" ? (
// //               <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">
// //                 <input
// //                   type="checkbox"
// //                   checked={Boolean(values[field.id])}
// //                   required={field.required}
// //                   onChange={(e) =>
// //                     setValues((p) => ({ ...p, [field.id]: e.target.checked }))
// //                   }
// //                   className="rounded accent-purple-600"
// //                 />
// //                 {field.placeholder || "Yes"}
// //               </label>
// //             ) : field.type === "rating" ? (
// //               <div className="flex items-center gap-3">
// //                 <div className="flex items-center gap-1">
// //                   {[1, 2, 3, 4, 5].map((star) => (
// //                     <button
// //                       key={star}
// //                       type="button"
// //                       onClick={() => {
// //                         // Click same star again → clear
// //                         setValues((p) => ({
// //                           ...p,
// //                           [field.id]: p[field.id] === star ? undefined : star,
// //                         }));
// //                       }}
// //                       className={`text-2xl transition ${
// //                         (values[field.id] || 0) >= star
// //                           ? "text-amber-400"
// //                           : "text-slate-300"
// //                       }`}
// //                     >
// //                       ★
// //                     </button>
// //                   ))}
// //                 </div>

// //                 {values[field.id] && (
// //                   <button
// //                     type="button"
// //                     onClick={() =>
// //                       setValues((p) => {
// //                         const next = { ...p };
// //                         delete next[field.id];
// //                         return next;
// //                       })
// //                     }
// //                     className="text-xs text-slate-500 hover:text-red-500 underline"
// //                   >
// //                     Clear
// //                   </button>
// //                 )}
// //               </div>
// //             ) : field.type === "daterange" ? (
// //               <div className="grid gap-3 sm:grid-cols-2">
// //                 <div>
// //                   <label className="mb-1 block text-xs font-medium text-slate-500">
// //                     Start date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={values[field.id]?.start || ""}
// //                     onChange={(e) => {
// //                       const current = values[field.id] || { start: "", end: "" };
// //                       setValues((p) => ({
// //                         ...p,
// //                         [field.id]: { ...current, start: e.target.value },
// //                       }));
// //                     }}
// //                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="mb-1 block text-xs font-medium text-slate-500">
// //                     End date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={values[field.id]?.end || ""}
// //                     onChange={(e) => {
// //                       const current = values[field.id] || { start: "", end: "" };
// //                       setValues((p) => ({
// //                         ...p,
// //                         [field.id]: { ...current, end: e.target.value },
// //                       }));
// //                     }}
// //                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
// //                   />
// //                 </div>
// //               </div>
// //             ) : (
// //               <input
// //                 type={
// //                   field.type === "email"
// //                     ? "email"
// //                     : field.type === "tel"
// //                       ? "tel"
// //                       : field.type === "number"
// //                         ? "number"
// //                         : field.type === "date"
// //                           ? "date"
// //                           : "text"
// //                 }
// //                 inputMode={field.type === "tel" ? "numeric" : undefined}
// //                 pattern={field.type === "tel" ? "[0-9]*" : undefined}
// //                 required={field.required}
// //                 value={values[field.id] || ""}
// //                 onChange={(e) => {
// //                   let value = e.target.value;

// //                   // Mobile Number → only digits
// //                   if (field.type === "tel") {
// //                     value = value.replace(/\D/g, "");
// //                   }

// //                   setValues((p) => ({ ...p, [field.id]: value }));
// //                 }}
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
// import Alert from "../../../../../../components/Aleartmessage";

// // ===================== API =====================
// const API = `${import.meta.env.VITE_BACKEND_URL}`;

// // ===================== TYPES =====================
// type FieldType =
//   | "text"
//   | "textarea"
//   | "email"
//   | "tel"
//   | "number"
//   | "date"
//   | "daterange"
//   | "select"
//   | "radio"
//   | "checkbox-group"
//   | "checkbox"
//   | "rating"
//   | "image"
//   | "reference-image";

// interface FormField {
//   id: string;
//   type: FieldType;
//   label: string;
//   required: boolean;
//   placeholder?: string;
//   options?: string[];
//   referenceUrl?: string;
// }

// interface FormSchema {
//   id: string;
//   title: string;
//   description?: string;
//   fields: FormField[];
//   createdAt: string;
//   updatedAt: string;
// }

// interface FormResponse {
//   id: string;
//   formId: string;
//   values: Record<string, any>;
//   createdAt: string;
// }

// // ===================== CONSTANTS =====================
// const generateId = () => Math.random().toString(36).slice(2, 11);

// const FIELD_TYPES: { value: FieldType; label: string }[] = [
//   { value: "text", label: "📝 Text" },
//   { value: "email", label: "📧 Email" },
//   { value: "tel", label: "📱 Mobile Number" },
//   { value: "textarea", label: "📄 Textarea" },
//   { value: "number", label: "🔢 Number" },
//   { value: "date", label: "📅 Date" },
//   { value: "daterange", label: "📆 Date Range" },
//   { value: "select", label: "📋 Dropdown" },
//   { value: "radio", label: "◉ Radio Buttons" },
//   { value: "checkbox-group", label: "☑️ Checkbox Group" },
//   { value: "checkbox", label: "☐ Single Checkbox" },
//   { value: "rating", label: "⭐ Rating" },
//   { value: "image", label: "🖼️ Image Upload" },
// ];

// // ===================== MAIN COMPONENT =====================
// export default function FormBuilder() {
//   const { user } = useContext(AuthContext);

//   const [forms, setForms] = useState<FormSchema[]>([]);
//   const [activeFormId, setActiveFormId] = useState<string | null>(null);
//   const [viewMode, setViewMode] = useState<"edit" | "preview" | "responses">("edit");
//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Custom Alert
//   const [alert, setAlert] = useState<{
//     type: "success" | "warning" | "error";
//     message: string;
//   } | null>(null);

//   const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

//   // Pending navigation when user has unsaved changes
//   const [pendingAction, setPendingAction] = useState<
//     null | { type: "create" } | { type: "switch"; formId: string }
//   >(null);

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
//   const [fieldReferenceImageUrl, setFieldReferenceImageUrl] = useState("");

//   // Email share
//   const [shareEmails, setShareEmails] = useState<string[]>([""]);
//   const [sendingEmail, setSendingEmail] = useState(false);

//   const activeForm = forms.find((f) => f.id === activeFormId) || null;
//   const showOptions = ["select", "radio", "checkbox-group"].includes(fieldType);

//   /* ---------------- GET FORMS ---------------- */
//   const loadForms = useCallback(async () => {
//     try {
//       setLoading(true);
//       setAlert(null);

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
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to load forms",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadForms();
//   }, [loadForms]);

//   const getVisibleFields = (fields: FormField[] = []) =>
//     fields.filter((field) => field.type !== "reference-image");

//   /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
//   useEffect(() => {
//     if (activeForm) {
//       const formFields = getVisibleFields(activeForm.fields || []);
//       setDraftTitle(activeForm.title);
//       setDraftDescription(activeForm.description || "");
//       setDraftFields(formFields);
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
//     setFieldReferenceImageUrl("");
//     setEditingFieldId(null);
//   };
// const hasUnsavedChanges = () => {
//     if (!activeForm) return false;

//     const currentFields = getVisibleFields(activeForm.fields || []);

//     return (
//       draftTitle !== (activeForm.title || "") ||
//       draftDescription !== (activeForm.description || "") ||
//       JSON.stringify(draftFields) !== JSON.stringify(currentFields)
//     );
//   };

//   /* ---------------- NAVIGATION WITH UNSAVED GUARD ---------------- */
//   const doCreateNewForm = async () => {
//     try {
//       setSaving(true);
//       setAlert(null);
//       setPendingAction(null);

//       const res = await axios.post(
//         `${API}/api/forms`,
//         {
//           title: "New Form",
//           description: "",
//           fields: [],
//         },
//         { withCredentials: true }
//       );

//       const created: FormSchema = {
//         ...res.data.data,
//         title: "",
//       };

//       setForms((prev) => [created, ...prev]);
//       setActiveFormId(created.id);
//       setViewMode("edit");

//       setDraftTitle("");
//       setDraftDescription("");
//       setDraftFields([]);
//       resetFieldBuilder();
//     } catch (err: any) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const doSwitchForm = (formId: string) => {
//     setPendingAction(null);
//     setActiveFormId(formId);
//     setViewMode("edit");
//     resetFieldBuilder();
//   };

//   const requestCreateNewForm = () => {
//     if (hasUnsavedChanges()) {
//       setPendingAction({ type: "create" });
//       setAlert({
//         type: "warning",
//         message:
//           "You have unsaved changes. Save them before creating a new form, or discard to continue without saving.",
//       });
//       return;
//     }
//     doCreateNewForm();
//   };

//   const requestSwitchForm = (formId: string) => {
//     if (formId === activeFormId) return;
//     if (hasUnsavedChanges()) {
//       setPendingAction({ type: "switch", formId });
//       setAlert({
//         type: "warning",
//         message:
//           "You have unsaved changes. Save them before switching forms, or discard to continue without saving.",
//       });
//       return;
//     }
//     doSwitchForm(formId);
//   };

//   const handleUnsavedConfirm = async () => {
//     // User chose "Save & Continue"
//     const ok = await saveForm();
//     if (!ok) {
//       // Save failed (e.g. title required) — stay on current form
//       setPendingAction(null);
//       return;
//     }
//     if (pendingAction?.type === "create") {
//       await doCreateNewForm();
//     } else if (pendingAction?.type === "switch") {
//       doSwitchForm(pendingAction.formId);
//     }
//   };

//   const handleUnsavedDiscard = () => {
//     // User chose Discard — proceed without saving
//     if (pendingAction?.type === "create") {
//       doCreateNewForm();
//     } else if (pendingAction?.type === "switch") {
//       doSwitchForm(pendingAction.formId);
//     } else {
//       setPendingAction(null);
//       setAlert(null);
//     }
//   };

//   /* ---------------- CREATE FORM (guarded) ---------------- */
//   const createNewForm = requestCreateNewForm;

//   /* ---------------- SAVE / UPDATE FORM ---------------- */
// //   const saveForm = async () => {
// //     if (!activeFormId) return;

// //     if (!draftTitle.trim()) {
// //       setAlert({ type: "error", message: "Title is required" });
// //       return;
// //     }

// //     try {
// //       setSaving(true);
// //       setAlert(null);

// //       const res = await axios.put(
// //         `${API}/api/forms/${activeFormId}`,
// //         {
// //           title: draftTitle.trim(),
// //           description: draftDescription,
// //           fields: draftFields,
// //         },
// //         { withCredentials: true }
// //       );

// //      const updated: FormSchema = res.data.data;

// // setForms((prev) =>
// //   prev.map((f) => (f.id === activeFormId ? updated : f))
// // );

// // setAlert({
// //   type: "success",
// //   message: "Form successfully created",
// // });
// //       // No success popup
// //     } catch (err: any) {
// //       console.error(err);
// //       setAlert({
// //         type: "error",
// //         message: err?.response?.data?.message || "Failed to save form",
// //       });
// //     } finally {
// //       setSaving(false);
// //     }
// //   };
// const saveForm = async (): Promise<boolean> => {
//   if (!activeFormId) return false;

//   if (!draftTitle.trim()) {
//     setAlert({
//       type: "error",
//       message: "Title is required",
//     });
//     return false;
//   }

//   try {
//     setSaving(true);
//     setAlert(null);

//     const res = await axios.put(
//       `${API}/api/forms/${activeFormId}`,
//       {
//         title: draftTitle.trim(),
//         description: draftDescription,
//         fields: draftFields,
//       },
//       { withCredentials: true }
//     );

//     const updated: FormSchema = res.data.data;

//     setForms((prev) =>
//       prev.map((f) =>
//         f.id === activeFormId ? updated : f
//       )
//     );

//     setAlert({
//       type: "success",
//       message: "Form saved successfully",
//     });

//     return true;
//   } catch (err: any) {
//     console.error(err);

//     setAlert({
//       type: "error",
//       message:
//         err?.response?.data?.message ||
//         "Failed to save form",
//     });

//     return false;
//   } finally {
//     setSaving(false);
//   }
// };
//   const uploadFieldReferenceImage = async (file: File) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setAlert(null);
//       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const url = res.data?.url;
//       if (!url) throw new Error("Reference image upload did not return a URL");

//       setFieldReferenceImageUrl(url);
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message:
//           err?.response?.data?.message ||
//           err?.message ||
//           "Reference image upload failed",
//       });
//     }
//   };

//   /* ---------------- DELETE FORM ---------------- */
//   const deleteForm = (id: string) => {
//     setPendingDeleteId(id);
//     setAlert({
//       type: "warning",
//       message:
//         "Are you sure you want to delete this form? This action cannot be undone.",
//     });
//   };

//   const confirmDelete = async () => {
//     if (!pendingDeleteId) return;

//     try {
//       setAlert(null);
//       setPendingDeleteId(null);

//       await axios.delete(`${API}/api/forms/${pendingDeleteId}`, {
//         withCredentials: true,
//       });

//       const updated = forms.filter((f) => f.id !== pendingDeleteId);
//       setForms(updated);

//       if (activeFormId === pendingDeleteId) {
//         setActiveFormId(updated[0]?.id || null);
//         setViewMode("edit");
//       }
//     } catch (err: any) {
//       console.error(err);
//       // No Alert for delete errors
//     }
//   };

//   /* ---------------- FIELD ACTIONS ---------------- */
//   const addOrUpdateField = () => {
//     if (!fieldLabel.trim()) {
//       setAlert({ type: "error", message: "Field label is required" });
//       return;
//     }

//     let options: string[] | undefined;
//     if (showOptions) {
//       options = optionsInput
//         .split(",")
//         .map((o) => o.trim())
//         .filter(Boolean);
//       if (options.length === 0) {
//         setAlert({
//           type: "error",
//           message: "Please provide at least one option",
//         });
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
//       referenceUrl: fieldReferenceImageUrl || undefined,
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
//     setFieldReferenceImageUrl(field.referenceUrl || "");
//   };

//   const deleteField = (id: string) => {
//     setDraftFields((prev) => prev.filter((f) => f.id !== id));
//     if (editingFieldId === id) resetFieldBuilder();
//   };

//   const moveField = (index: number, direction: "up" | "down") => {
//     const newFields = [...draftFields];
//     const target = direction === "up" ? index - 1 : index + 1;
//     if (target < 0 || target >= newFields.length) return;
//     [newFields[index], newFields[target]] = [newFields[target], newFields[index]];
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
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const sendFormEmail = async () => {
//     if (!activeFormId) return;

//     const emails = shareEmails.map((e) => e.trim()).filter(Boolean);

//     if (emails.length === 0) {
//       setAlert({
//         type: "error",
//         message: "Please enter at least one email address",
//       });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const invalidEmails = emails.filter((e) => !emailRegex.test(e));

//     if (invalidEmails.length > 0) {
//       setAlert({
//         type: "error",
//         message: `Invalid email(s):\n${invalidEmails.join("\n")}`,
//       });
//       return;
//     }

//     try {
//       setSendingEmail(true);
//       setAlert(null);

//       await axios.post(
//         `${API}/api/forms/${activeFormId}/send-email`,
//         {
//           emails,
//           formUrl: getFormUrl(),
//           formTitle: draftTitle.trim() || "Form",
//           fields: draftFields.length ? draftFields : activeForm?.fields || [],
//         },
//         { withCredentials: true }
//       );

//       setShareEmails([""]);
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to send email",
//       });
//     } finally {
//       setSendingEmail(false);
//     }
//   };

//   const shareViaWhatsApp = () => {
//     const url = getFormUrl();
//     if (!url) return;

//     const text = encodeURIComponent(`Hi! Please fill out this form:\n${url}`);
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
//       {/* Custom Alert Modal */}
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => {
//             // Cancel / close:
//             // - If unsaved prompt → treat as Discard & continue
//             // - If delete prompt → just cancel the delete
//             if (pendingAction) {
//               handleUnsavedDiscard();
//             } else {
//               setAlert(null);
//               setPendingDeleteId(null);
//             }
//           }}
//           confirm={!!pendingDeleteId || !!pendingAction}
//           onConfirm={
//             pendingAction
//               ? handleUnsavedConfirm
//               : confirmDelete
//           }
//           confirmText={
//             pendingAction ? "Save & Continue" : "Yes, Delete"
//           }
//           cancelText={pendingAction ? "Discard" : "Cancel"}
//         />
//       )}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
//           <div className="flex-1 min-w-0">
//             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
//               Form Management
//             </span>
//             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
//               Form Builder
//             </h1>
//           </div>

//           <div className="flex flex-col items-end gap-2 shrink-0">
//             <div className="flex flex-wrap justify-end gap-2">
//               <button
//                 onClick={createNewForm}
//                 disabled={saving}
//                 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
//               >
//                 {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
//                 New Form
//               </button>

//               {activeForm && (
//                 <>
//                   <button
//                     onClick={() =>
//                       setViewMode(viewMode === "preview" ? "edit" : "preview")
//                     }
//                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
//                       viewMode === "preview"
//                         ? "bg-purple-50 border-purple-300 text-purple-700"
//                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//                     }`}
//                   >
//                     <Eye size={14} />
//                     {viewMode === "preview" ? "Edit" : "Preview"}
//                   </button>

//                   <button
//                     onClick={() =>
//                       setViewMode(viewMode === "responses" ? "edit" : "responses")
//                     }
//                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
//                       viewMode === "responses"
//                         ? "bg-purple-50 border-purple-300 text-purple-700"
//                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//                     }`}
//                   >
//                     <Inbox size={14} />
//                     Responses
//                   </button>

//                   {viewMode === "edit" && (
//                     <button
//                       onClick={saveForm}
//                       disabled={saving}
//                       className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
//                     >
//                       {saving ? (
//                         <Loader2 size={14} className="animate-spin" />
//                       ) : (
//                         <Save size={14} />
//                       )}
//                       Save
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>

//             {activeForm && (
//               <div className="flex flex-wrap items-start justify-end gap-2 w-full max-w-[720px]">
//                 {shareEmails.map((email, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-1.5 min-w-[220px] max-w-[280px] flex-1"
//                   >
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => {
//                         const updated = [...shareEmails];
//                         updated[index] = e.target.value;
//                         setShareEmails(updated);
//                       }}
//                       placeholder="recipient@email.com"
//                       className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
//                     />
//                     {shareEmails.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShareEmails(shareEmails.filter((_, i) => i !== index))
//                         }
//                         className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition shrink-0"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     )}
//                   </div>
//                 ))}

//                 <div className="flex items-center gap-2 shrink-0">
//                   <button
//                     type="button"
//                     onClick={() => setShareEmails([...shareEmails, ""])}
//                     className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
//                   >
//                     <Plus size={13} />
//                     Add another email
//                   </button>

//                   <button
//                     onClick={sendFormEmail}
//                     disabled={sendingEmail || shareEmails.every((e) => !e.trim())}
//                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
//                   >
//                     {sendingEmail ? (
//                       <Loader2 size={14} className="animate-spin" />
//                     ) : (
//                       <Mail size={14} />
//                     )}
//                     Send
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
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
//                 fields={draftFields.length ? draftFields : activeForm.fields || []}
//                 responses={responses}
//                 loading={responsesLoading}
//                 error={responsesError}
//                 onRefresh={loadResponses}
//                 onBack={() => setViewMode("edit")}
//               />
//             ) : (
//               <div className="space-y-4">
//                 {/* Form header */}
//                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 space-y-4">
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
//                             /form/{user?.organisation_id ?? "org"}/{activeFormId}
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
//                           onChange={(e) => setFieldType(e.target.value as FieldType)}
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

//                       <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 p-3">
//                         <div className="flex items-center justify-between gap-3 mb-2">
//                           <div>
//                             <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple-700">
//                               Field reference image
//                             </p>
//                             <p className="text-[10px] text-slate-500 mt-0.5">
//                               Optional image shown under this field
//                             </p>
//                           </div>
//                           {fieldReferenceImageUrl && (
//                             <button
//                               type="button"
//                               onClick={() => setFieldReferenceImageUrl("")}
//                               className="text-[10px] text-red-600 hover:text-red-700 font-medium"
//                             >
//                               Remove
//                             </button>
//                           )}
//                         </div>

//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) uploadFieldReferenceImage(file);
//                           }}
//                           className="block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-purple-600 file:px-2 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-purple-700"
//                         />

//                         {fieldReferenceImageUrl && (
//                           <div className="mt-3 overflow-hidden rounded-lg border border-purple-200 bg-white">
//                             <img
//                               src={fieldReferenceImageUrl}
//                               alt="Field reference"
//                               className="h-28 w-full object-cover"
//                             />
//                           </div>
//                         )}
//                       </div>

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
//                         <p className="text-xs text-slate-400">No fields added yet</p>
//                       </div>
//                     ) : (
//                       <div className="space-y-2 max-h-[380px] overflow-y-auto">
//                         {draftFields.map((field, index) => (
//                           <div
//                             key={field.id}
//                             className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
//                           >
//                             <GripVertical size={14} className="text-slate-300 shrink-0" />
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
//                               {field.type === "image" ? (
//                                 <div className="mt-2 flex items-center gap-2">
//                                   <div className="flex h-10 w-14 items-center justify-center rounded-md border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-white to-pink-100 text-[8px] font-semibold text-purple-600">
//                                     IMG
//                                   </div>
//                                   <p className="text-[11px] text-slate-500">
//                                     Image upload field
//                                   </p>
//                                 </div>
//                               ) : field.options ? (
//                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
//                                   {field.options.join(", ")}
//                                 </p>
//                               ) : null}
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
//                     onClick={() => requestSwitchForm(form.id)}
//                     className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
//                       activeFormId === form.id
//                         ? "bg-purple-50 border-purple-300"
//                         : "bg-slate-50 border-transparent hover:bg-slate-100"
//                     }`}
//                   >
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-slate-900 truncate">
//                         {form.title || "No title"}
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

//   const visibleFields = fields.filter((f) => f.type !== "reference-image");
//   const columns =
//     visibleFields.length > 0
//       ? visibleFields.map((f) => ({ key: f.id, label: f.label }))
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
//                   {columns.map((col) => {
//                     const value = r.values?.[col.key];
//                     const isImageField =
//                       visibleFields.find((f) => f.id === col.key)?.type === "image";

//                     return (
//                       <td
//                         key={col.key}
//                         className="px-4 py-3 text-slate-800 max-w-[260px] align-top"
//                         title={
//                           typeof value === "object"
//                             ? JSON.stringify(value)
//                             : formatValue(value)
//                         }
//                       >
//                         {isImageField && value ? (
//                           <div className="flex flex-col gap-2">
//                             <img
//                               src={
//                                 typeof value === "string" ? value : value.url || ""
//                               }
//                               alt={
//                                 typeof value === "string"
//                                   ? "Uploaded image"
//                                   : value.name || "Uploaded image"
//                               }
//                               className="h-20 w-20 object-cover rounded-lg border border-slate-200 bg-slate-50"
//                             />
//                             <div className="flex items-center gap-3">
//                               <a
//                                 href={
//                                   typeof value === "string" ? value : value.url || ""
//                                 }
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="inline-flex text-xs text-purple-600 hover:text-purple-700 underline"
//                               >
//                                 View
//                               </a>
//                               <a
//                                 href={
//                                   typeof value === "string" ? value : value.url || ""
//                                 }
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="inline-flex text-xs text-slate-600 hover:text-slate-800 underline"
//                                 download
//                               >
//                                 Download
//                               </a>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="truncate max-w-[220px]">
//                             {formatValue(value)}
//                           </div>
//                         )}
//                       </td>
//                     );
//                   })}
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
//   const [uploadingFieldId, setUploadingFieldId] = useState<string | null>(null);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   const visibleFields = (schema.fields || []).filter(
//     (field: any) => field.type !== "reference-image"
//   );

//   const uploadImageFile = async (fieldId: string, file: File) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploadingFieldId(fieldId);
//       setUploadError(null);

//       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const url = res.data?.url;
//       if (!url) throw new Error("Image upload did not return a URL");

//       setValues((prev) => ({
//         ...prev,
//         [fieldId]: {
//           url,
//           name: file.name,
//           size: file.size,
//         },
//       }));
//     } catch (err: any) {
//       console.error(err);
//       setUploadError(err?.response?.data?.message || "Image upload failed");
//     } finally {
//       setUploadingFieldId(null);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
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
//         {uploadError && (
//           <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//             {uploadError}
//           </div>
//         )}

//         {visibleFields.map((field: any) => (
//           <div key={field.id}>
//             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
//               {field.label}
//               {field.required && <span className="text-red-500 ml-1">*</span>}
//             </label>

//             {field.referenceUrl && (
//               <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
//                 <img
//                   src={field.referenceUrl}
//                   alt={field.label}
//                   className="max-h-64 w-full object-cover"
//                 />
//               </div>
//             )}

//             {field.type === "image" ? (
//               <div className="space-y-3">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) uploadImageFile(field.id, file);
//                   }}
//                   className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-700"
//                 />

//                 {uploadingFieldId === field.id && (
//                   <div className="inline-flex items-center gap-2 text-xs text-slate-500">
//                     <Loader2 size={14} className="animate-spin" />
//                     Uploading image...
//                   </div>
//                 )}

//                 {values[field.id] && (
//                   <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
//                     <img
//                       src={values[field.id]?.url}
//                       alt={values[field.id]?.name || field.label}
//                       className="h-32 w-full rounded-md object-cover border border-slate-200"
//                     />
//                     <div className="flex items-center justify-between gap-3">
//                       <span className="text-xs text-slate-600 truncate">
//                         {values[field.id]?.name || "Uploaded image"}
//                       </span>
//                       <div className="flex items-center gap-3">
//                         <a
//                           href={values[field.id]?.url}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-xs text-purple-600 hover:text-purple-700 underline"
//                         >
//                           View
//                         </a>
//                         <a
//                           href={values[field.id]?.url}
//                           target="_blank"
//                           rel="noreferrer"
//                           download
//                           className="text-xs text-slate-600 hover:text-slate-800 underline"
//                         >
//                           Download
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : field.type === "textarea" ? (
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
//                 {field.options?.map((opt: string) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             ) : field.type === "radio" ? (
//               <div className="space-y-2">
//                 {field.options?.map((opt: string) => (
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
//             ) : field.type === "checkbox-group" ? (
//               <div className="space-y-2">
//                 {field.options?.map((opt: string) => (
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
//             ) : field.type === "checkbox" ? (
//               <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">
//                 <input
//                   type="checkbox"
//                   checked={Boolean(values[field.id])}
//                   required={field.required}
//                   onChange={(e) =>
//                     setValues((p) => ({ ...p, [field.id]: e.target.checked }))
//                   }
//                   className="rounded accent-purple-600"
//                 />
//                 {field.placeholder || "Yes"}
//               </label>
//             ) : field.type === "rating" ? (
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={() => {
//                         // Click same star again → clear
//                         setValues((p) => ({
//                           ...p,
//                           [field.id]: p[field.id] === star ? undefined : star,
//                         }));
//                       }}
//                       className={`text-2xl transition ${
//                         (values[field.id] || 0) >= star
//                           ? "text-amber-400"
//                           : "text-slate-300"
//                       }`}
//                     >
//                       ★
//                     </button>
//                   ))}
//                 </div>

//                 {values[field.id] && (
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setValues((p) => {
//                         const next = { ...p };
//                         delete next[field.id];
//                         return next;
//                       })
//                     }
//                     className="text-xs text-slate-500 hover:text-red-500 underline"
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
//             ) : field.type === "daterange" ? (
//               <div className="grid gap-3 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-1 block text-xs font-medium text-slate-500">
//                     Start date
//                   </label>
//                   <input
//                     type="date"
//                     value={values[field.id]?.start || ""}
//                     onChange={(e) => {
//                       const current = values[field.id] || { start: "", end: "" };
//                       setValues((p) => ({
//                         ...p,
//                         [field.id]: { ...current, start: e.target.value },
//                       }));
//                     }}
//                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1 block text-xs font-medium text-slate-500">
//                     End date
//                   </label>
//                   <input
//                     type="date"
//                     value={values[field.id]?.end || ""}
//                     onChange={(e) => {
//                       const current = values[field.id] || { start: "", end: "" };
//                       setValues((p) => ({
//                         ...p,
//                         [field.id]: { ...current, end: e.target.value },
//                       }));
//                     }}
//                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <input
//                 type={
//                   field.type === "email"
//                     ? "email"
//                     : field.type === "tel"
//                       ? "tel"
//                       : field.type === "number"
//                         ? "number"
//                         : field.type === "date"
//                           ? "date"
//                           : "text"
//                 }
//                 inputMode={field.type === "tel" ? "numeric" : undefined}
//                 pattern={field.type === "tel" ? "[0-9]*" : undefined}
//                 required={field.required}
//                 value={values[field.id] || ""}
//                 onChange={(e) => {
//                   let value = e.target.value;

//                   // Mobile Number → only digits
//                   if (field.type === "tel") {
//                     value = value.replace(/\D/g, "");
//                   }

//                   setValues((p) => ({ ...p, [field.id]: value }));
//                 }}
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
// import Alert from "../../../../../../components/Aleartmessage";

// // ===================== API =====================
// const API = `${import.meta.env.VITE_BACKEND_URL}`;

// // ===================== TYPES =====================
// type FieldType =
//   | "text"
//   | "textarea"
//   | "email"
//   | "tel"
//   | "number"
//   | "date"
//   | "daterange"
//   | "select"
//   | "radio"
//   | "checkbox-group"
//   | "checkbox"
//   | "rating"
//   | "image"
//   | "reference-image";

// interface FormField {
//   id: string;
//   type: FieldType;
//   label: string;
//   required: boolean;
//   placeholder?: string;
//   options?: string[];
//   referenceUrl?: string;
// }

// interface FormSchema {
//   id: string;
//   title: string;
//   description?: string;
//   fields: FormField[];
//   createdAt: string;
//   updatedAt: string;
// }

// interface FormResponse {
//   id: string;
//   formId: string;
//   values: Record<string, any>;
//   createdAt: string;
// }

// // ===================== CONSTANTS =====================
// const generateId = () => Math.random().toString(36).slice(2, 11);

// const FIELD_TYPES: { value: FieldType; label: string }[] = [
//   { value: "text", label: "📝 Text" },
//   { value: "email", label: "📧 Email" },
//   { value: "tel", label: "📱 Mobile Number" },
//   { value: "textarea", label: "📄 Textarea" },
//   { value: "number", label: "🔢 Number" },
//   { value: "date", label: "📅 Date" },
//   { value: "daterange", label: "📆 Date Range" },
//   { value: "select", label: "📋 Dropdown" },
//   { value: "radio", label: "◉ Radio Buttons" },
//   { value: "checkbox-group", label: "☑️ Checkbox Group" },
//   { value: "checkbox", label: "☐ Single Checkbox" },
//   { value: "rating", label: "⭐ Rating" },
//   { value: "image", label: "🖼️ Image Upload" },
// ];

// // ===================== MAIN COMPONENT =====================
// export default function FormBuilder() {
//   const { user } = useContext(AuthContext);

//   const [forms, setForms] = useState<FormSchema[]>([]);
//   const [activeFormId, setActiveFormId] = useState<string | null>(null);
//   const [viewMode, setViewMode] = useState<"edit" | "preview" | "responses">("edit");
//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Custom Alert
//   const [alert, setAlert] = useState<{
//     type: "success" | "warning" | "error";
//     message: string;
//   } | null>(null);

//   const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

//   // Pending navigation when user has unsaved changes
//   const [pendingAction, setPendingAction] = useState<
//     null | { type: "create" } | { type: "switch"; formId: string }
//   >(null);

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
//   const [fieldReferenceImageUrl, setFieldReferenceImageUrl] = useState("");

//   // Email share
//   const [shareEmails, setShareEmails] = useState<string[]>([""]);
//   const [sendingEmail, setSendingEmail] = useState(false);

//   const activeForm = forms.find((f) => f.id === activeFormId) || null;
//   const showOptions = ["select", "radio", "checkbox-group"].includes(fieldType);

//   /* ---------------- GET FORMS ---------------- */
//   const loadForms = useCallback(async () => {
//     try {
//       setLoading(true);
//       setAlert(null);

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
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to load forms",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadForms();
//   }, [loadForms]);

//   const getVisibleFields = (fields: FormField[] = []) =>
//     fields.filter((field) => field.type !== "reference-image");

//   /* ---------------- SYNC DRAFT WHEN FORM CHANGES ---------------- */
//   useEffect(() => {
//     if (activeForm) {
//       const formFields = getVisibleFields(activeForm.fields || []);
//       setDraftTitle(activeForm.title);
//       setDraftDescription(activeForm.description || "");
//       setDraftFields(formFields);
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
//     setFieldReferenceImageUrl("");
//     setEditingFieldId(null);
//   };
// const hasUnsavedChanges = () => {
//     if (!activeForm) return false;

//     const currentFields = getVisibleFields(activeForm.fields || []);

//     return (
//       draftTitle !== (activeForm.title || "") ||
//       draftDescription !== (activeForm.description || "") ||
//       JSON.stringify(draftFields) !== JSON.stringify(currentFields)
//     );
//   };

//   /* ---------------- NAVIGATION WITH UNSAVED GUARD ---------------- */
//   const doCreateNewForm = async () => {
//     try {
//       setSaving(true);
//       setAlert(null);
//       setPendingAction(null);

//       const res = await axios.post(
//         `${API}/api/forms`,
//         {
//           title: "New Form",
//           description: "",
//           fields: [],
//         },
//         { withCredentials: true }
//       );

//       const created: FormSchema = {
//         ...res.data.data,
//         title: "",
//       };

//       setForms((prev) => [created, ...prev]);
//       setActiveFormId(created.id);
//       setViewMode("edit");

//       setDraftTitle("");
//       setDraftDescription("");
//       setDraftFields([]);
//       resetFieldBuilder();
//     } catch (err: any) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const doSwitchForm = (formId: string) => {
//     setPendingAction(null);
//     setActiveFormId(formId);
//     setViewMode("edit");
//     resetFieldBuilder();
//   };

//   const requestCreateNewForm = () => {
//     if (hasUnsavedChanges()) {
//       setPendingAction({ type: "create" });
//       setAlert({
//         type: "warning",
//         message:
//           "You have unsaved changes. Save them before creating a new form, or discard to continue without saving.",
//       });
//       return;
//     }
//     doCreateNewForm();
//   };

//   const requestSwitchForm = (formId: string) => {
//     if (formId === activeFormId) return;
//     if (hasUnsavedChanges()) {
//       setPendingAction({ type: "switch", formId });
//       setAlert({
//         type: "warning",
//         message:
//           "You have unsaved changes. Save them before switching forms, or discard to continue without saving.",
//       });
//       return;
//     }
//     doSwitchForm(formId);
//   };

//   const handleUnsavedConfirm = async () => {
//     // User chose "Save & Continue"
//     const ok = await saveForm();
//     if (!ok) {
//       // Save failed (e.g. title required) — stay on current form
//       setPendingAction(null);
//       return;
//     }
//     if (pendingAction?.type === "create") {
//       await doCreateNewForm();
//     } else if (pendingAction?.type === "switch") {
//       doSwitchForm(pendingAction.formId);
//     }
//   };

//   const handleUnsavedDiscard = () => {
//     // User chose Discard — proceed without saving
//     if (pendingAction?.type === "create") {
//       doCreateNewForm();
//     } else if (pendingAction?.type === "switch") {
//       doSwitchForm(pendingAction.formId);
//     } else {
//       setPendingAction(null);
//       setAlert(null);
//     }
//   };

//   /* ---------------- CREATE FORM (guarded) ---------------- */
//   const createNewForm = requestCreateNewForm;

//   /* ---------------- SAVE / UPDATE FORM ---------------- */
// //   const saveForm = async () => {
// //     if (!activeFormId) return;

// //     if (!draftTitle.trim()) {
// //       setAlert({ type: "error", message: "Title is required" });
// //       return;
// //     }

// //     try {
// //       setSaving(true);
// //       setAlert(null);

// //       const res = await axios.put(
// //         `${API}/api/forms/${activeFormId}`,
// //         {
// //           title: draftTitle.trim(),
// //           description: draftDescription,
// //           fields: draftFields,
// //         },
// //         { withCredentials: true }
// //       );

// //      const updated: FormSchema = res.data.data;

// // setForms((prev) =>
// //   prev.map((f) => (f.id === activeFormId ? updated : f))
// // );

// // setAlert({
// //   type: "success",
// //   message: "Form successfully created",
// // });
// //       // No success popup
// //     } catch (err: any) {
// //       console.error(err);
// //       setAlert({
// //         type: "error",
// //         message: err?.response?.data?.message || "Failed to save form",
// //       });
// //     } finally {
// //       setSaving(false);
// //     }
// //   };
// const saveForm = async (): Promise<boolean> => {
//   if (!activeFormId) return false;

//   if (!draftTitle.trim()) {
//     setAlert({
//       type: "error",
//       message: "Title is required",
//     });
//     return false;
//   }

//   try {
//     setSaving(true);
//     setAlert(null);

//     const res = await axios.put(
//       `${API}/api/forms/${activeFormId}`,
//       {
//         title: draftTitle.trim(),
//         description: draftDescription,
//         fields: draftFields,
//       },
//       { withCredentials: true }
//     );

//     const updated: FormSchema = res.data.data;

//     setForms((prev) =>
//       prev.map((f) =>
//         f.id === activeFormId ? updated : f
//       )
//     );

//     setAlert({
//       type: "success",
//       message: "Form saved successfully",
//     });

//     return true;
//   } catch (err: any) {
//     console.error(err);

//     setAlert({
//       type: "error",
//       message:
//         err?.response?.data?.message ||
//         "Failed to save form",
//     });

//     return false;
//   } finally {
//     setSaving(false);
//   }
// };
//   const uploadFieldReferenceImage = async (file: File) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setAlert(null);
//       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const url = res.data?.url;
//       if (!url) throw new Error("Reference image upload did not return a URL");

//       setFieldReferenceImageUrl(url);
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message:
//           err?.response?.data?.message ||
//           err?.message ||
//           "Reference image upload failed",
//       });
//     }
//   };

//   /* ---------------- DELETE FORM ---------------- */
//   const deleteForm = (id: string) => {
//     setPendingDeleteId(id);
//     setAlert({
//       type: "warning",
//       message:
//         "Are you sure you want to delete this form? This action cannot be undone.",
//     });
//   };

//   const confirmDelete = async () => {
//     if (!pendingDeleteId) return;

//     try {
//       setAlert(null);
//       setPendingDeleteId(null);

//       await axios.delete(`${API}/api/forms/${pendingDeleteId}`, {
//         withCredentials: true,
//       });

//       const updated = forms.filter((f) => f.id !== pendingDeleteId);
//       setForms(updated);

//       if (activeFormId === pendingDeleteId) {
//         setActiveFormId(updated[0]?.id || null);
//         setViewMode("edit");
//       }
//     } catch (err: any) {
//       console.error(err);
//       // No Alert for delete errors
//     }
//   };

//   /* ---------------- FIELD ACTIONS ---------------- */
//   const addOrUpdateField = () => {
//     if (!fieldLabel.trim()) {
//       setAlert({ type: "error", message: "Field label is required" });
//       return;
//     }

//     let options: string[] | undefined;
//     if (showOptions) {
//       options = optionsInput
//         .split(",")
//         .map((o) => o.trim())
//         .filter(Boolean);
//       if (options.length === 0) {
//         setAlert({
//           type: "error",
//           message: "Please provide at least one option",
//         });
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
//       referenceUrl: fieldReferenceImageUrl || undefined,
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
//     setFieldReferenceImageUrl(field.referenceUrl || "");
//   };

//   const deleteField = (id: string) => {
//     setDraftFields((prev) => prev.filter((f) => f.id !== id));
//     if (editingFieldId === id) resetFieldBuilder();
//   };

//   const moveField = (index: number, direction: "up" | "down") => {
//     const newFields = [...draftFields];
//     const target = direction === "up" ? index - 1 : index + 1;
//     if (target < 0 || target >= newFields.length) return;
//     [newFields[index], newFields[target]] = [newFields[target], newFields[index]];
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
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const sendFormEmail = async () => {
//     if (!activeFormId) return;

//     const emails = shareEmails.map((e) => e.trim()).filter(Boolean);

//     if (emails.length === 0) {
//       setAlert({
//         type: "error",
//         message: "Please enter at least one email address",
//       });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const invalidEmails = emails.filter((e) => !emailRegex.test(e));

//     if (invalidEmails.length > 0) {
//       setAlert({
//         type: "error",
//         message: `Invalid email(s):\n${invalidEmails.join("\n")}`,
//       });
//       return;
//     }

//     try {
//       setSendingEmail(true);
//       setAlert(null);

//       await axios.post(
//         `${API}/api/forms/${activeFormId}/send-email`,
//         {
//           emails,
//           formUrl: getFormUrl(),
//           formTitle: draftTitle.trim() || "Form",
//           fields: draftFields.length ? draftFields : activeForm?.fields || [],
//         },
//         { withCredentials: true }
//       );

//       setShareEmails([""]);
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to send email",
//       });
//     } finally {
//       setSendingEmail(false);
//     }
//   };

//   const shareViaWhatsApp = () => {
//     const url = getFormUrl();
//     if (!url) return;

//     const text = encodeURIComponent(`Hi! Please fill out this form:\n${url}`);
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
//       {/* Custom Alert Modal */}
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => {
//             // Cancel / close:
//             // - If unsaved prompt → treat as Discard & continue
//             // - If delete prompt → just cancel the delete
//             if (pendingAction) {
//               handleUnsavedDiscard();
//             } else {
//               setAlert(null);
//               setPendingDeleteId(null);
//             }
//           }}
//           confirm={!!pendingDeleteId || !!pendingAction}
//           onConfirm={
//             pendingAction
//               ? handleUnsavedConfirm
//               : confirmDelete
//           }
//           confirmText={
//             pendingAction ? "Save & Continue" : "Yes, Delete"
//           }
//           cancelText={pendingAction ? "Discard" : "Cancel"}
//         />
//       )}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
//           <div className="flex-1 min-w-0">
//             <span className="text-purple-600 font-semibold uppercase tracking-widest text-xs">
//               Form Management
//             </span>
//             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
//               Form Builder
//             </h1>
//           </div>

//           <div className="flex flex-col items-end gap-2 shrink-0">
//             <div className="flex flex-wrap justify-end gap-2">
//               <button
//                 onClick={createNewForm}
//                 disabled={saving}
//                 className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
//               >
//                 {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
//                 New Form
//               </button>

//               {activeForm && (
//                 <>
//                   <button
//                     onClick={() =>
//                       setViewMode(viewMode === "preview" ? "edit" : "preview")
//                     }
//                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
//                       viewMode === "preview"
//                         ? "bg-purple-50 border-purple-300 text-purple-700"
//                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//                     }`}
//                   >
//                     <Eye size={14} />
//                     {viewMode === "preview" ? "Edit" : "Preview"}
//                   </button>

//                   <button
//                     onClick={() =>
//                       setViewMode(viewMode === "responses" ? "edit" : "responses")
//                     }
//                     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
//                       viewMode === "responses"
//                         ? "bg-purple-50 border-purple-300 text-purple-700"
//                         : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//                     }`}
//                   >
//                     <Inbox size={14} />
//                     Responses
//                   </button>

//                   {viewMode === "edit" && (
//                     <button
//                       onClick={saveForm}
//                       disabled={saving}
//                       className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
//                     >
//                       {saving ? (
//                         <Loader2 size={14} className="animate-spin" />
//                       ) : (
//                         <Save size={14} />
//                       )}
//                       Save
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>

//             {activeForm && (
//               <div className="flex flex-wrap items-start justify-end gap-2 w-full max-w-[720px]">
//                 {shareEmails.map((email, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-1.5 min-w-[220px] max-w-[280px] flex-1"
//                   >
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => {
//                         const updated = [...shareEmails];
//                         updated[index] = e.target.value;
//                         setShareEmails(updated);
//                       }}
//                       placeholder="recipient@email.com"
//                       className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
//                     />
//                     {shareEmails.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShareEmails(shareEmails.filter((_, i) => i !== index))
//                         }
//                         className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition shrink-0"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     )}
//                   </div>
//                 ))}

//                 <div className="flex items-center gap-2 shrink-0">
//                   <button
//                     type="button"
//                     onClick={() => setShareEmails([...shareEmails, ""])}
//                     className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
//                   >
//                     <Plus size={13} />
//                     Add another email
//                   </button>

//                   <button
//                     onClick={sendFormEmail}
//                     disabled={sendingEmail || shareEmails.every((e) => !e.trim())}
//                     className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
//                   >
//                     {sendingEmail ? (
//                       <Loader2 size={14} className="animate-spin" />
//                     ) : (
//                       <Mail size={14} />
//                     )}
//                     Send
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
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
//                 fields={draftFields.length ? draftFields : activeForm.fields || []}
//                 responses={responses}
//                 loading={responsesLoading}
//                 error={responsesError}
//                 onRefresh={loadResponses}
//                 onBack={() => setViewMode("edit")}
//               />
//             ) : (
//               <div className="space-y-4">
//                 {/* Form header */}
//                 <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 space-y-4">
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
//                             /form/{user?.organisation_id ?? "org"}/{activeFormId}
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
//                           onChange={(e) => setFieldType(e.target.value as FieldType)}
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

//                       <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 p-3">
//                         <div className="flex items-center justify-between gap-3 mb-2">
//                           <div>
//                             <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple-700">
//                               Field reference image
//                             </p>
//                             <p className="text-[10px] text-slate-500 mt-0.5">
//                               Optional image shown under this field
//                             </p>
//                           </div>
//                           {fieldReferenceImageUrl && (
//                             <button
//                               type="button"
//                               onClick={() => setFieldReferenceImageUrl("")}
//                               className="text-[10px] text-red-600 hover:text-red-700 font-medium"
//                             >
//                               Remove
//                             </button>
//                           )}
//                         </div>

//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) uploadFieldReferenceImage(file);
//                           }}
//                           className="block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-purple-600 file:px-2 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-purple-700"
//                         />

//                         {fieldReferenceImageUrl && (
//                           <div className="mt-3 overflow-hidden rounded-lg border border-purple-200 bg-white">
//                             <img
//                               src={fieldReferenceImageUrl}
//                               alt="Field reference"
//                               className="h-28 w-full object-cover"
//                             />
//                           </div>
//                         )}
//                       </div>

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
//                         <p className="text-xs text-slate-400">No fields added yet</p>
//                       </div>
//                     ) : (
//                       <div className="space-y-2 max-h-[380px] overflow-y-auto">
//                         {draftFields.map((field, index) => (
//                           <div
//                             key={field.id}
//                             className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
//                           >
//                             <GripVertical size={14} className="text-slate-300 shrink-0" />
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
//                               {field.type === "image" ? (
//                                 <div className="mt-2 flex items-center gap-2">
//                                   <div className="flex h-10 w-14 items-center justify-center rounded-md border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-white to-pink-100 text-[8px] font-semibold text-purple-600">
//                                     IMG
//                                   </div>
//                                   <p className="text-[11px] text-slate-500">
//                                     Image upload field
//                                   </p>
//                                 </div>
//                               ) : field.options ? (
//                                 <p className="text-[11px] text-slate-400 mt-0.5 truncate">
//                                   {field.options.join(", ")}
//                                 </p>
//                               ) : null}
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
//                     onClick={() => requestSwitchForm(form.id)}
//                     className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
//                       activeFormId === form.id
//                         ? "bg-purple-50 border-purple-300"
//                         : "bg-slate-50 border-transparent hover:bg-slate-100"
//                     }`}
//                   >
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-slate-900 truncate">
//                         {form.title || "No title"}
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
//  const formatValue = (val: any) => {
//   if (val == null || val === "") return "—";

//   if (Array.isArray(val)) {
//     return val.length ? val.join(", ") : "—";
//   }

//   // Date Range
//   if (
//     typeof val === "object" &&
//     ("start" in val || "end" in val)
//   ) {
//     const start = val.start || "—";
//     const end = val.end || "—";

//     return `Start Date: ${start} | End Date: ${end}`;
//   }

//   if (typeof val === "object") {
//     return JSON.stringify(val);
//   }

//   return String(val);
// };

//   const visibleFields = fields.filter((f) => f.type !== "reference-image");
//   const columns =
//     visibleFields.length > 0
//       ? visibleFields.map((f) => ({ key: f.id, label: f.label }))
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
//   //      <div className="w-full max-w-full overflow-x-auto">
//   // <table className="min-w-max w-full text-sm">
//   //           <thead>
//   //             <tr className="bg-slate-50 border-b border-slate-100">
//   //               <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
//   //                 #
//   //               </th>
//   //               {columns.map((col) => (
//   //                 <th
//   //                   key={col.key}
//   //                   className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap max-w-[180px]"
//   //                 >
//   //                   {col.label}
//   //                 </th>
//   //               ))}
//   //             </tr>
//   //           </thead>
//   //           <tbody>
//   //             {responses.map((r, idx) => (
//   //               <tr
//   //                 key={r.id}
//   //                 className="border-b border-slate-100 hover:bg-slate-50/80 transition"
//   //               >
//   //                 <td className="px-4 py-3 text-slate-400 tabular-nums">
//   //                   {responses.length - idx}
//   //                 </td>
//   //                 {columns.map((col) => {
//   //                   const value = r.values?.[col.key];
//   //                   const isImageField =
//   //                     visibleFields.find((f) => f.id === col.key)?.type === "image";

//   //                   return (
//   //                     <td
//   //                       key={col.key}
//   //                       className="px-4 py-3 text-slate-800 max-w-[260px] align-top"
//   //                       title={
//   //                         typeof value === "object"
//   //                           ? JSON.stringify(value)
//   //                           : formatValue(value)
//   //                       }
//   //                     >
//   //                       {isImageField && value ? (
//   //                         <div className="flex flex-col gap-2">
//   //                           <img
//   //                             src={
//   //                               typeof value === "string" ? value : value.url || ""
//   //                             }
//   //                             alt={
//   //                               typeof value === "string"
//   //                                 ? "Uploaded image"
//   //                                 : value.name || "Uploaded image"
//   //                             }
//   //                             className="h-20 w-20 object-cover rounded-lg border border-slate-200 bg-slate-50"
//   //                           />
//   //                           <div className="flex items-center gap-3">
//   //                             <a
//   //                               href={
//   //                                 typeof value === "string" ? value : value.url || ""
//   //                               }
//   //                               target="_blank"
//   //                               rel="noreferrer"
//   //                               className="inline-flex text-xs text-purple-600 hover:text-purple-700 underline"
//   //                             >
//   //                               View
//   //                             </a>
//   //                             <a
//   //                               href={
//   //                                 typeof value === "string" ? value : value.url || ""
//   //                               }
//   //                               target="_blank"
//   //                               rel="noreferrer"
//   //                               className="inline-flex text-xs text-slate-600 hover:text-slate-800 underline"
//   //                               download
//   //                             >
//   //                               Download
//   //                             </a>
//   //                           </div>
//   //                         </div>
//   //                       ) : (
//   //                         <div className="truncate max-w-[220px]">
//   //                           {formatValue(value)}
//   //                         </div>
//   //                       )}
//   //                     </td>
//   //                   );
//   //                 })}
//   //               </tr>
//   //             ))}
//   //           </tbody>
//   //         </table>
//   //       </div>
//   <div className="w-full max-w-full overflow-x-auto overflow-y-auto max-h-[70vh]">
//   <table className="min-w-max w-full text-sm">
//     <thead>
//       <tr className="bg-slate-50 border-b border-slate-100">
//         <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">
//           #
//         </th>

//         {columns.map((col) => (
//           <th
//             key={col.key}
//             className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap"
//           >
//             {col.label}
//           </th>
//         ))}
//       </tr>
//     </thead>

//     <tbody>
//       {responses.map((r, idx) => (
//         <tr
//           key={r.id}
//           className="border-b border-slate-100 hover:bg-slate-50/80 transition"
//         >
//           <td className="px-4 py-3 text-slate-400 tabular-nums align-top">
//             {responses.length - idx}
//           </td>

//           {columns.map((col) => {
//             const value = r.values?.[col.key];

//             const isImageField =
//               visibleFields.find((f) => f.id === col.key)?.type === "image";

//             return (
//               <td
//                 key={col.key}
//                 className="px-4 py-3 text-slate-800 max-w-[320px] align-top whitespace-normal break-words"
//                 title={
//                   typeof value === "object"
//                     ? JSON.stringify(value)
//                     : formatValue(value)
//                 }
//               >
//                 {isImageField && value ? (
//                   <div className="flex flex-col gap-2">
//                     <img
//                       src={
//                         typeof value === "string"
//                           ? value
//                           : value.url || ""
//                       }
//                       alt={
//                         typeof value === "string"
//                           ? "Uploaded image"
//                           : value.name || "Uploaded image"
//                       }
//                       className="h-20 w-20 object-cover rounded-lg border border-slate-200 bg-slate-50"
//                     />

//                     <div className="flex items-center gap-3">
//                       <a
//                         href={
//                           typeof value === "string"
//                             ? value
//                             : value.url || ""
//                         }
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex text-xs text-purple-600 hover:text-purple-700 underline"
//                       >
//                         View
//                       </a>

//                       <a
//                         href={
//                           typeof value === "string"
//                             ? value
//                             : value.url || ""
//                         }
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex text-xs text-slate-600 hover:text-slate-800 underline"
//                         download
//                       >
//                         Download
//                       </a>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="max-w-[320px] whitespace-normal break-words">
//                     {formatValue(value)}
//                   </div>
//                 )}
//               </td>
//             );
//           })}
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
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
//   const [uploadingFieldId, setUploadingFieldId] = useState<string | null>(null);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   const visibleFields = (schema.fields || []).filter(
//     (field: any) => field.type !== "reference-image"
//   );

//   const uploadImageFile = async (fieldId: string, file: File) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploadingFieldId(fieldId);
//       setUploadError(null);

//       const res = await axios.post(`${API}/api/forms/upload-image`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const url = res.data?.url;
//       if (!url) throw new Error("Image upload did not return a URL");

//       setValues((prev) => ({
//         ...prev,
//         [fieldId]: {
//           url,
//           name: file.name,
//           size: file.size,
//         },
//       }));
//     } catch (err: any) {
//       console.error(err);
//       setUploadError(err?.response?.data?.message || "Image upload failed");
//     } finally {
//       setUploadingFieldId(null);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
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
// <div className="bg-white rounded-xl border border-slate-200 overflow-hidden w-full max-w-full">      <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-slate-100 text-center">
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
//         {uploadError && (
//           <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//             {uploadError}
//           </div>
//         )}

//         {visibleFields.map((field: any) => (
//           <div key={field.id}>
//             <label className="block text-sm font-semibold text-slate-800 mb-1.5">
//               {field.label}
//               {field.required && <span className="text-red-500 ml-1">*</span>}
//             </label>

//             {field.referenceUrl && (
//               <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
//                 <img
//                   src={field.referenceUrl}
//                   alt={field.label}
//                   className="max-h-64 w-full object-cover"
//                 />
//               </div>
//             )}

//             {field.type === "image" ? (
//               <div className="space-y-3">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) uploadImageFile(field.id, file);
//                   }}
//                   className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-700"
//                 />

//                 {uploadingFieldId === field.id && (
//                   <div className="inline-flex items-center gap-2 text-xs text-slate-500">
//                     <Loader2 size={14} className="animate-spin" />
//                     Uploading image...
//                   </div>
//                 )}

//                 {values[field.id] && (
//                   <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
//                     <img
//                       src={values[field.id]?.url}
//                       alt={values[field.id]?.name || field.label}
//                       className="h-32 w-full rounded-md object-cover border border-slate-200"
//                     />
//                     <div className="flex items-center justify-between gap-3">
//                       <span className="text-xs text-slate-600 truncate">
//                         {values[field.id]?.name || "Uploaded image"}
//                       </span>
//                       <div className="flex items-center gap-3">
//                         <a
//                           href={values[field.id]?.url}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-xs text-purple-600 hover:text-purple-700 underline"
//                         >
//                           View
//                         </a>
//                         <a
//                           href={values[field.id]?.url}
//                           target="_blank"
//                           rel="noreferrer"
//                           download
//                           className="text-xs text-slate-600 hover:text-slate-800 underline"
//                         >
//                           Download
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : field.type === "textarea" ? (
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
//                 {field.options?.map((opt: string) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             ) : field.type === "radio" ? (
//               <div className="space-y-2">
//                 {field.options?.map((opt: string) => (
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
//             ) : field.type === "checkbox-group" ? (
//               <div className="space-y-2">
//                 {field.options?.map((opt: string) => (
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
//             ) : field.type === "checkbox" ? (
//               <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">
//                 <input
//                   type="checkbox"
//                   checked={Boolean(values[field.id])}
//                   required={field.required}
//                   onChange={(e) =>
//                     setValues((p) => ({ ...p, [field.id]: e.target.checked }))
//                   }
//                   className="rounded accent-purple-600"
//                 />
//                 {field.placeholder || "Yes"}
//               </label>
//             ) : field.type === "rating" ? (
//               <div className="flex flex-wrap items-center gap-3">
//                 <div className="flex items-center gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={() => {
//                         // Click same star again → clear
//                         setValues((p) => ({
//                           ...p,
//                           [field.id]: p[field.id] === star ? undefined : star,
//                         }));
//                       }}
//                       className={`text-2xl leading-none transition hover:scale-110 ${
//                         (values[field.id] || 0) >= star
//                           ? "text-amber-400"
//                           : "text-slate-300 hover:text-amber-200"
//                       }`}
//                       aria-label={`${star} star${star > 1 ? "s" : ""}`}
//                     >
//                       ★
//                     </button>
//                   ))}
//                 </div>

//                 {values[field.id] ? (
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs font-medium text-slate-600">
//                       {values[field.id]} / 5
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setValues((p) => {
//                           const next = { ...p };
//                           delete next[field.id];
//                           return next;
//                         })
//                       }
//                       className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition"
//                     >
//                       Clear
//                     </button>
//                   </div>
//                 ) : (
//                   <span className="text-xs text-slate-400">
//                     Click a star to rate · click again to clear
//                   </span>
//                 )}
//               </div>
//             ) : field.type === "daterange" ? (
//               <div className="grid gap-3 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-1 block text-xs font-medium text-slate-500">
//                     Start date
//                   </label>
//                   <input
//                     type="date"
//                     value={values[field.id]?.start || ""}
//                     onChange={(e) => {
//                       const current = values[field.id] || { start: "", end: "" };
//                       setValues((p) => ({
//                         ...p,
//                         [field.id]: { ...current, start: e.target.value },
//                       }));
//                     }}
//                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1 block text-xs font-medium text-slate-500">
//                     End date
//                   </label>
//                   <input
//                     type="date"
//                     value={values[field.id]?.end || ""}
//                     onChange={(e) => {
//                       const current = values[field.id] || { start: "", end: "" };
//                       setValues((p) => ({
//                         ...p,
//                         [field.id]: { ...current, end: e.target.value },
//                       }));
//                     }}
//                     className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <input
//                 type={
//                   field.type === "email"
//                     ? "email"
//                     : field.type === "tel"
//                       ? "tel"
//                       : field.type === "number"
//                         ? "number"
//                         : field.type === "date"
//                           ? "date"
//                           : "text"
//                 }
//                 inputMode={field.type === "tel" ? "numeric" : undefined}
//                 pattern={field.type === "tel" ? "[0-9]{10,15}" : undefined}
//                 maxLength={field.type === "tel" ? 15 : undefined}
//                 required={field.required}
//                 value={values[field.id] || ""}
//                 onChange={(e) => {
//                   let value = e.target.value;

//                   // Mobile Number → only digits, no letters/symbols
//                   if (field.type === "tel") {
//                     value = value.replace(/\D/g, "").slice(0, 15);
//                   }

//                   setValues((p) => ({ ...p, [field.id]: value }));
//                 }}
//                 onKeyDown={
//                   field.type === "tel"
//                     ? (e) => {
//                         // Block letters and common non-digit keys (allow navigation/edit keys)
//                         const allowed = [
//                           "Backspace",
//                           "Delete",
//                           "Tab",
//                           "Escape",
//                           "Enter",
//                           "ArrowLeft",
//                           "ArrowRight",
//                           "ArrowUp",
//                           "ArrowDown",
//                           "Home",
//                           "End",
//                         ];
//                         if (allowed.includes(e.key)) return;
//                         if (e.ctrlKey || e.metaKey) return; // allow Ctrl/Cmd+A/C/V/X
//                         if (!/^\d$/.test(e.key)) {
//                           e.preventDefault();
//                         }
//                       }
//                     : undefined
//                 }
//                 onPaste={
//                   field.type === "tel"
//                     ? (e) => {
//                         e.preventDefault();
//                         const pasted = (
//                           e.clipboardData?.getData("text") || ""
//                         ).replace(/\D/g, "").slice(0, 15);
//                         setValues((p) => ({ ...p, [field.id]: pasted }));
//                       }
//                     : undefined
//                 }
//                 placeholder={
//                   field.placeholder ||
//                   (field.type === "tel" ? "e.g. 9876543210" : undefined)
//                 }
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

import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
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

import Alert from "../../../../../../components/Aleartmessage";

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
  | "rating"
  | "image"
  | "reference-image";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  referenceUrl?: string;
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

const generateId = () =>
  Math.random().toString(36).slice(2, 11);

const FIELD_TYPES: {
  value: FieldType;
  label: string;
}[] = [
  { value: "text", label: "📝 Text" },
  { value: "email", label: "📧 Email" },
  { value: "tel", label: "📱 Mobile Number" },
  { value: "textarea", label: "📄 Textarea" },
  { value: "number", label: "🔢 Number" },
  { value: "date", label: "📅 Date" },
  { value: "daterange", label: "📆 Date Range" },
  { value: "select", label: "📋 Dropdown" },
  { value: "radio", label: "◉ Radio Buttons" },
  {
    value: "checkbox-group",
    label: "☑️ Checkbox Group",
  },
  { value: "checkbox", label: "☐ Single Checkbox" },
  { value: "rating", label: "⭐ Rating" },
  { value: "image", label: "🖼️ Image Upload" },
];

// ===================== MAIN COMPONENT =====================

export default function FormBuilder() {
  const { user } = useContext(AuthContext);

  const [forms, setForms] = useState<FormSchema[]>([]);
  const [activeFormId, setActiveFormId] =
    useState<string | null>(null);

  const [viewMode, setViewMode] = useState<
    "edit" | "preview" | "responses"
  >("edit");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ===================== ALERT =====================

  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
  } | null>(null);

  const [pendingDeleteId, setPendingDeleteId] =
    useState<string | null>(null);

  // ===================== UNSAVED ACTION =====================

  const [pendingAction, setPendingAction] = useState<
    null | { type: "create" }
    | { type: "switch"; formId: string }
  >(null);

  // ===================== RESPONSES =====================

  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [responsesLoading, setResponsesLoading] =
    useState(false);

  const [responsesError, setResponsesError] =
    useState<string | null>(null);

  // ===================== FIELD BUILDER =====================

  const [fieldType, setFieldType] =
    useState<FieldType>("text");

  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldRequired, setFieldRequired] =
    useState(false);

  const [fieldPlaceholder, setFieldPlaceholder] =
    useState("");

  const [optionsInput, setOptionsInput] =
    useState("");

  const [editingFieldId, setEditingFieldId] =
    useState<string | null>(null);

  // ===================== DRAFT =====================

  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] =
    useState("");

  const [draftFields, setDraftFields] =
    useState<FormField[]>([]);

  const [fieldReferenceImageUrl, setFieldReferenceImageUrl] =
    useState("");

  // ===================== EMAIL =====================

  const [shareEmails, setShareEmails] =
    useState<string[]>([""]);

  const [sendingEmail, setSendingEmail] =
    useState(false);

  // ===================== ACTIVE FORM =====================

  const activeForm =
    forms.find((f) => f.id === activeFormId) || null;

  const showOptions = [
    "select",
    "radio",
    "checkbox-group",
  ].includes(fieldType);

  // ===================== GET FORMS =====================

  const loadForms = useCallback(async () => {
    try {
      setLoading(true);
      setAlert(null);

      const res = await axios.get(
        `${API}/api/forms`,
        {
          withCredentials: true,
        }
      );

      const data: FormSchema[] =
        res.data.data || [];

      setForms(data);

      if (data.length > 0) {
        setActiveFormId(
          (prev) => prev || data[0].id
        );
      }
    } catch (err: any) {
      console.error(err);

      setAlert({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to load forms",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadForms();
  }, [loadForms]);

  // ===================== VISIBLE FIELDS =====================

  const getVisibleFields = (
    fields: FormField[] = []
  ) =>
    fields.filter(
      (field) => field.type !== "reference-image"
    );

  // ===================== SYNC DRAFT =====================

  useEffect(() => {
    if (activeForm) {
      const formFields = getVisibleFields(
        activeForm.fields || []
      );

      setDraftTitle(activeForm.title);
      setDraftDescription(
        activeForm.description || ""
      );

      setDraftFields(formFields);

      resetFieldBuilder();
    }
  }, [activeFormId]);

  // ===================== LOAD RESPONSES =====================

  const loadResponses = useCallback(async () => {
    if (!activeFormId) return;

    try {
      setResponsesLoading(true);
      setResponsesError(null);

      const res = await axios.get(
        `${API}/api/forms/${activeFormId}/responses`,
        {
          withCredentials: true,
        }
      );

      if (!res.data?.success) {
        setResponsesError(
          res.data?.message ||
            "Failed to load responses"
        );

        setResponses([]);
        return;
      }

      setResponses(
        res.data.data?.responses || []
      );
    } catch (err: any) {
      console.error(err);

      setResponsesError(
        err?.response?.data?.message ||
          "Failed to load responses"
      );

      setResponses([]);
    } finally {
      setResponsesLoading(false);
    }
  }, [activeFormId]);

  useEffect(() => {
    if (
      viewMode === "responses" &&
      activeFormId
    ) {
      loadResponses();
    }
  }, [
    viewMode,
    activeFormId,
    loadResponses,
  ]);

  // ===================== RESET FIELD =====================

  const resetFieldBuilder = () => {
    setFieldType("text");
    setFieldLabel("");
    setFieldRequired(false);
    setFieldPlaceholder("");
    setOptionsInput("");
    setFieldReferenceImageUrl("");
    setEditingFieldId(null);
  };

  // ===================== UNSAVED =====================

  const hasUnsavedChanges = () => {
    if (!activeForm) return false;

    const currentFields = getVisibleFields(
      activeForm.fields || []
    );

    return (
      draftTitle !==
        (activeForm.title || "") ||
      draftDescription !==
        (activeForm.description || "") ||
      JSON.stringify(draftFields) !==
        JSON.stringify(currentFields)
    );
  };

  // ===================== CREATE FORM =====================

  const doCreateNewForm = async () => {
    try {
      setSaving(true);
      setAlert(null);
      setPendingAction(null);

      const res = await axios.post(
        `${API}/api/forms`,
        {
          title: "New Form",
          description: "",
          fields: [],
        },
        {
          withCredentials: true,
        }
      );

      const created: FormSchema = {
        ...res.data.data,
        title: "",
      };

      setForms((prev) => [
        created,
        ...prev,
      ]);

      setActiveFormId(created.id);
      setViewMode("edit");

      setDraftTitle("");
      setDraftDescription("");
      setDraftFields([]);

      resetFieldBuilder();
    } catch (err: any) {
      console.error(err);

      setAlert({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to create form",
      });
    } finally {
      setSaving(false);
    }
  };

  // ===================== SWITCH FORM =====================

  const doSwitchForm = (formId: string) => {
    setPendingAction(null);
    setActiveFormId(formId);
    setViewMode("edit");
    resetFieldBuilder();
  };

  // ===================== REQUEST CREATE =====================

  const requestCreateNewForm = () => {
    if (hasUnsavedChanges()) {
      setPendingAction({
        type: "create",
      });

      setAlert({
        type: "warning",
        message:
          "You have unsaved changes. Save them before creating a new form, or discard to continue without saving.",
      });

      return;
    }

    doCreateNewForm();
  };

  // ===================== REQUEST SWITCH =====================

  const requestSwitchForm = (
    formId: string
  ) => {
    if (formId === activeFormId) return;

    if (hasUnsavedChanges()) {
      setPendingAction({
        type: "switch",
        formId,
      });

      setAlert({
        type: "warning",
        message:
          "You have unsaved changes. Save them before switching forms, or discard to continue without saving.",
      });

      return;
    }

    doSwitchForm(formId);
  };

  // ===================== SAVE & CONTINUE =====================

  const handleUnsavedConfirm = async () => {
    const ok = await saveForm();

    if (!ok) {
      setPendingAction(null);
      return;
    }

    if (
      pendingAction?.type === "create"
    ) {
      await doCreateNewForm();
    } else if (
      pendingAction?.type === "switch"
    ) {
      doSwitchForm(
        pendingAction.formId
      );
    }
  };

  // ===================== DISCARD =====================

  const handleUnsavedDiscard = () => {
    if (
      pendingAction?.type === "create"
    ) {
      doCreateNewForm();
    } else if (
      pendingAction?.type === "switch"
    ) {
      doSwitchForm(
        pendingAction.formId
      );
    } else {
      setPendingAction(null);
      setAlert(null);
    }
  };

  // ===================== CREATE =====================

  const createNewForm =
    requestCreateNewForm;

  // ===================== SAVE FORM =====================

  const saveForm = async (): Promise<boolean> => {
    if (!activeFormId) return false;

    if (!draftTitle.trim()) {
      setAlert({
        type: "error",
        message: "Title is required",
      });

      return false;
    }

    try {
      setSaving(true);
      setAlert(null);

      const res = await axios.put(
        `${API}/api/forms/${activeFormId}`,
        {
          title: draftTitle.trim(),
          description: draftDescription,
          fields: draftFields,
        },
        {
          withCredentials: true,
        }
      );

      const updated: FormSchema =
        res.data.data;

      setForms((prev) =>
        prev.map((f) =>
          f.id === activeFormId
            ? updated
            : f
        )
      );

      setAlert({
        type: "success",
        message:
          "Form saved successfully",
      });

      return true;
    } catch (err: any) {
      console.error(err);

      setAlert({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to save form",
      });

      return false;
    } finally {
      setSaving(false);
    }
  };

  // ===================== REFERENCE IMAGE =====================

  const uploadFieldReferenceImage =
    async (file: File) => {
      const formData = new FormData();

      formData.append("image", file);

      try {
        setAlert(null);

        const res = await axios.post(
          `${API}/api/forms/upload-image`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        const url = res.data?.url;

        if (!url) {
          throw new Error(
            "Reference image upload did not return a URL"
          );
        }

        setFieldReferenceImageUrl(url);
      } catch (err: any) {
        console.error(err);

        setAlert({
          type: "error",
          message:
            err?.response?.data?.message ||
            err?.message ||
            "Reference image upload failed",
        });
      }
    };

  // ===================== DELETE FORM =====================

  const deleteForm = (id: string) => {
    setPendingDeleteId(id);

    setAlert({
      type: "warning",
      message:
        "Are you sure you want to delete this form? This action cannot be undone.",
    });
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      const deletingId =
        pendingDeleteId;

      setAlert(null);
      setPendingDeleteId(null);

      await axios.delete(
        `${API}/api/forms/${deletingId}`,
        {
          withCredentials: true,
        }
      );

      const updated = forms.filter(
        (f) => f.id !== deletingId
      );

      setForms(updated);

      if (
        activeFormId === deletingId
      ) {
        setActiveFormId(
          updated[0]?.id || null
        );

        setViewMode("edit");
      }
    } catch (err: any) {
      console.error(err);

      setAlert({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to delete form",
      });
    }
  };

  // ===================== FIELD ACTIONS =====================

  const addOrUpdateField = () => {
    if (!fieldLabel.trim()) {
      setAlert({
        type: "error",
        message:
          "Field label is required",
      });

      return;
    }

    let options:
      | string[]
      | undefined;

    if (showOptions) {
      options = optionsInput
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);

      if (options.length === 0) {
        setAlert({
          type: "error",
          message:
            "Please provide at least one option",
        });

        return;
      }
    }

    const newField: FormField = {
      id:
        editingFieldId ||
        generateId(),

      type: fieldType,

      label:
        fieldLabel.trim(),

      required:
        fieldRequired,

      placeholder:
        fieldPlaceholder.trim() ||
        undefined,

      options,

      referenceUrl:
        fieldReferenceImageUrl ||
        undefined,
    };

    if (editingFieldId) {
      setDraftFields((prev) =>
        prev.map((f) =>
          f.id === editingFieldId
            ? newField
            : f
        )
      );
    } else {
      setDraftFields((prev) => [
        ...prev,
        newField,
      ]);
    }

    resetFieldBuilder();
  };

  const editField = (
    field: FormField
  ) => {
    setEditingFieldId(field.id);
    setFieldType(field.type);
    setFieldLabel(field.label);
    setFieldRequired(field.required);

    setFieldPlaceholder(
      field.placeholder || ""
    );

    setOptionsInput(
      field.options?.join(", ") || ""
    );

    setFieldReferenceImageUrl(
      field.referenceUrl || ""
    );
  };

  const deleteField = (
    id: string
  ) => {
    setDraftFields((prev) =>
      prev.filter(
        (f) => f.id !== id
      )
    );

    if (editingFieldId === id) {
      resetFieldBuilder();
    }
  };

  const moveField = (
    index: number,
    direction: "up" | "down"
  ) => {
    const newFields = [
      ...draftFields,
    ];

    const target =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      target < 0 ||
      target >= newFields.length
    ) {
      return;
    }

    [
      newFields[index],
      newFields[target],
    ] = [
      newFields[target],
      newFields[index],
    ];

    setDraftFields(newFields);
  };

  // ===================== SHARE =====================

  const getFormUrl = () => {
    if (
      !activeFormId ||
      !user?.organisation_id
    ) {
      return "";
    }

    return `${window.location.origin}/form/${user.organisation_id}/${activeFormId}`;
  };

  const copyLink = () => {
    if (!activeFormId) return;

    const url = getFormUrl();

    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(
      () => setCopied(false),
      2000
    );
  };

  // ===================== EMAIL =====================

  const sendFormEmail = async () => {
    if (!activeFormId) return;

    const emails = shareEmails
      .map((e) => e.trim())
      .filter(Boolean);

    if (emails.length === 0) {
      setAlert({
        type: "error",
        message:
          "Please enter at least one email address",
      });

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const invalidEmails =
      emails.filter(
        (e) => !emailRegex.test(e)
      );

    if (invalidEmails.length > 0) {
      setAlert({
        type: "error",
        message: `Invalid email(s):\n${invalidEmails.join(
          "\n"
        )}`,
      });

      return;
    }

    try {
      setSendingEmail(true);
      setAlert(null);

      await axios.post(
        `${API}/api/forms/${activeFormId}/send-email`,
        {
          emails,
          formUrl: getFormUrl(),
          formTitle:
            draftTitle.trim() ||
            "Form",

          fields:
            draftFields.length
              ? draftFields
              : activeForm?.fields || [],
        },
        {
          withCredentials: true,
        }
      );

      setShareEmails([""]);

      setAlert({
        type: "success",
        message:
          "Form email sent successfully",
      });
    } catch (err: any) {
      console.error(err);

      setAlert({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to send email",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  // ===================== WHATSAPP =====================

  const shareViaWhatsApp = () => {
    const url = getFormUrl();

    if (!url) return;

    const text = encodeURIComponent(
      `Hi! Please fill out this form:\n${url}`
    );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank"
    );
  };

  // ===================== LOADING =====================

  if (loading) {
    return (
      <section className="h-screen bg-slate-50 flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading forms...
        </div>
      </section>
    );
  }

  // ===================== RENDER =====================

  return (
    <section className="h-screen bg-slate-50 overflow-hidden py-4 sm:py-6">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col min-h-0">

        {/* ===================== ALERT ===================== */}

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => {
              if (pendingAction) {
                handleUnsavedDiscard();
              } else {
                setAlert(null);
                setPendingDeleteId(null);
              }
            }}
            confirm={
              !!pendingDeleteId ||
              !!pendingAction
            }
            onConfirm={
              pendingAction
                ? handleUnsavedConfirm
                : confirmDelete
            }
            confirmText={
              pendingAction
                ? "Save & Continue"
                : "Yes, Delete"
            }
            cancelText={
              pendingAction
                ? "Discard"
                : "Cancel"
            }
          />
        )}

        {/* ===================== HEADER ===================== */}

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 shrink-0">

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

              {/* NEW FORM */}

              <button
                onClick={createNewForm}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
              >
                {saving ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <Plus size={15} />
                )}

                New Form
              </button>

              {activeForm && (
                <>
                  {/* PREVIEW */}

                  <button
                    onClick={() =>
                      setViewMode(
                        viewMode ===
                          "preview"
                          ? "edit"
                          : "preview"
                      )
                    }
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
                      viewMode ===
                      "preview"
                        ? "bg-purple-50 border-purple-300 text-purple-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Eye size={14} />

                    {viewMode ===
                    "preview"
                      ? "Edit"
                      : "Preview"}
                  </button>

                  {/* RESPONSES */}

                  <button
                    onClick={() =>
                      setViewMode(
                        viewMode ===
                          "responses"
                          ? "edit"
                          : "responses"
                      )
                    }
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
                      viewMode ===
                      "responses"
                        ? "bg-purple-50 border-purple-300 text-purple-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Inbox size={14} />

                    Responses
                  </button>

                  {/* SAVE */}

                  {viewMode === "edit" && (
                    <button
                      onClick={saveForm}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
                    >
                      {saving ? (
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Save size={14} />
                      )}

                      Save
                    </button>
                  )}
                </>
              )}

            </div>

            {/* EMAIL SHARE */}

            {activeForm && (
              <div className="flex flex-wrap items-start justify-end gap-2 w-full max-w-[720px]">

                {shareEmails.map(
                  (email, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 min-w-[220px] max-w-[280px] flex-1"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          const updated = [
                            ...shareEmails,
                          ];

                          updated[index] =
                            e.target.value;

                          setShareEmails(
                            updated
                          );
                        }}
                        placeholder="recipient@email.com"
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                      />

                      {shareEmails.length >
                        1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setShareEmails(
                              shareEmails.filter(
                                (_, i) =>
                                  i !==
                                  index
                              )
                            )
                          }
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition shrink-0"
                        >
                          <Trash2
                            size={14}
                          />
                        </button>
                      )}
                    </div>
                  )
                )}

                <div className="flex items-center gap-2 shrink-0">

                  <button
                    type="button"
                    onClick={() =>
                      setShareEmails([
                        ...shareEmails,
                        "",
                      ])
                    }
                    className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
                  >
                    <Plus size={13} />
                    Add another email
                  </button>

                  <button
                    onClick={
                      sendFormEmail
                    }
                    disabled={
                      sendingEmail ||
                      shareEmails.every(
                        (e) =>
                          !e.trim()
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition disabled:opacity-60"
                  >
                    {sendingEmail ? (
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                    ) : (
                      <Mail
                        size={14}
                      />
                    )}

                    Send
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>

        {/* ===================== MAIN GRID ===================== */}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-5 flex-1 min-h-0 overflow-hidden">

          {/* ===================== LEFT CONTENT ===================== */}

          <div className="min-w-0 min-h-0 overflow-hidden">

            {!activeForm ? (

              <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">

                <FileText
                  size={36}
                  className="mx-auto text-slate-300 mb-3"
                />

                <p className="text-base text-slate-500 mb-4">
                  No form selected
                </p>

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

              <div className="h-full min-h-0 overflow-y-auto">
                <FormPreview
                  schema={{
                    ...activeForm,
                    title: draftTitle,
                    description:
                      draftDescription,
                    fields: draftFields,
                  }}
                  onBack={() =>
                    setViewMode("edit")
                  }
                />
              </div>

            ) : viewMode === "responses" ? (

              /*
               * IMPORTANT:
               *
               * FormResponses itself owns the scroll.
               * The parent does NOT scroll.
               */

              <div className="h-full min-h-0 overflow-hidden">
                <FormResponses
                  formTitle={
                    draftTitle ||
                    activeForm.title
                  }
                  fields={
                    draftFields.length
                      ? draftFields
                      : activeForm.fields ||
                        []
                  }
                  responses={responses}
                  loading={
                    responsesLoading
                  }
                  error={
                    responsesError
                  }
                  onRefresh={
                    loadResponses
                  }
                  onBack={() =>
                    setViewMode("edit")
                  }
                />
              </div>

            ) : (

              <div className="h-full min-h-0 overflow-y-auto pr-1">

                <div className="space-y-4">

                  {/* ================= FORM HEADER ================= */}

                  <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 space-y-4">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">

                      <div className="flex-1 min-w-0">

                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          Form Name
                        </label>

                        <input
                          type="text"
                          value={
                            draftTitle
                          }
                          onChange={(e) =>
                            setDraftTitle(
                              e.target
                                .value
                            )
                          }
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
                          value={
                            draftDescription
                          }
                          onChange={(e) =>
                            setDraftDescription(
                              e.target
                                .value
                            )
                          }
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

                            <Link2
                              size={12}
                              className="shrink-0 text-slate-400"
                            />

                            <span className="truncate">
                              /form/
                              {user?.organisation_id ??
                                "org"}
                              /
                              {
                                activeFormId
                              }
                            </span>

                          </div>

                          <button
                            onClick={
                              copyLink
                            }
                            title="Copy link"
                            className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition"
                          >
                            {copied ? (
                              <Check
                                size={
                                  14
                                }
                                className="text-emerald-600"
                              />
                            ) : (
                              <Copy
                                size={
                                  14
                                }
                              />
                            )}
                          </button>

                          <button
                            onClick={
                              shareViaWhatsApp
                            }
                            title="Share via WhatsApp"
                            className="shrink-0 p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition"
                          >
                            <MessageCircle
                              size={
                                14
                              }
                            />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* ================= BUILDER ================= */}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {/* ================= ADD FIELD ================= */}

                    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">

                      <h3 className="text-base font-bold text-slate-900 mb-0.5">
                        Add Form Fields
                      </h3>

                      <p className="text-xs text-slate-500 mb-4">
                        Configure fields for your form
                      </p>

                      <div className="space-y-3">

                        {/* FIELD TYPE */}

                        <div>

                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Field Type
                          </label>

                          <select
                            value={
                              fieldType
                            }
                            onChange={(e) =>
                              setFieldType(
                                e.target
                                  .value as FieldType
                              )
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                          >
                            {FIELD_TYPES.map(
                              (t) => (
                                <option
                                  key={
                                    t.value
                                  }
                                  value={
                                    t.value
                                  }
                                >
                                  {t.label}
                                </option>
                              )
                            )}
                          </select>

                        </div>

                        {/* FIELD LABEL */}

                        <div>

                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Field Label
                          </label>

                          <input
                            type="text"
                            value={
                              fieldLabel
                            }
                            onChange={(e) =>
                              setFieldLabel(
                                e.target
                                  .value
                              )
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                            placeholder="e.g. Your Name"
                          />

                        </div>

                        {/* PLACEHOLDER */}

                        <div>

                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Placeholder (optional)
                          </label>

                          <input
                            type="text"
                            value={
                              fieldPlaceholder
                            }
                            onChange={(e) =>
                              setFieldPlaceholder(
                                e.target
                                  .value
                              )
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                            placeholder="e.g. Enter your full name"
                          />

                        </div>

                        {/* OPTIONS */}

                        {showOptions && (
                          <div>

                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Options (comma separated)
                            </label>

                            <input
                              type="text"
                              value={
                                optionsInput
                              }
                              onChange={(e) =>
                                setOptionsInput(
                                  e.target
                                    .value
                                )
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                              placeholder="Option 1, Option 2, Option 3"
                            />

                          </div>
                        )}

                        {/* REFERENCE IMAGE */}

                        <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 p-3">

                          <div className="flex items-center justify-between gap-3 mb-2">

                            <div>

                              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-purple-700">
                                Field reference image
                              </p>

                              <p className="text-[10px] text-slate-500 mt-0.5">
                                Optional image shown under this field
                              </p>

                            </div>

                            {fieldReferenceImageUrl && (
                              <button
                                type="button"
                                onClick={() =>
                                  setFieldReferenceImageUrl(
                                    ""
                                  )
                                }
                                className="text-[10px] text-red-600 hover:text-red-700 font-medium"
                              >
                                Remove
                              </button>
                            )}

                          </div>

                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file =
                                e.target.files?.[0];

                              if (file) {
                                uploadFieldReferenceImage(
                                  file
                                );
                              }
                            }}
                            className="block w-full text-[11px] text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-purple-600 file:px-2 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-purple-700"
                          />

                          {fieldReferenceImageUrl && (
                            <div className="mt-3 overflow-hidden rounded-lg border border-purple-200 bg-white">

                              <img
                                src={
                                  fieldReferenceImageUrl
                                }
                                alt="Field reference"
                                className="h-28 w-full object-cover"
                              />

                            </div>
                          )}

                        </div>

                        {/* REQUIRED */}

                        <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">

                          <input
                            type="checkbox"
                            checked={
                              fieldRequired
                            }
                            onChange={(e) =>
                              setFieldRequired(
                                e.target
                                  .checked
                              )
                            }
                            className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                          />

                          Required Field

                        </label>

                        {/* ADD */}

                        <button
                          onClick={
                            addOrUpdateField
                          }
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
                        >
                          {editingFieldId ? (
                            <>
                              <Edit2
                                size={
                                  15
                                }
                              />
                              Update Field
                            </>
                          ) : (
                            <>
                              <Plus
                                size={
                                  15
                                }
                              />
                              Add Field
                            </>
                          )}
                        </button>

                        {editingFieldId && (
                          <button
                            onClick={
                              resetFieldBuilder
                            }
                            className="w-full text-xs text-slate-500 hover:text-slate-700"
                          >
                            Cancel editing
                          </button>
                        )}

                      </div>

                    </div>

                    {/* ================= ADDED FIELDS ================= */}

                    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5">

                      <h3 className="text-base font-bold text-slate-900 mb-3">
                        Added Fields (
                        {
                          draftFields.length
                        }
                        )
                      </h3>

                      {draftFields.length ===
                      0 ? (

                        <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">

                          <p className="text-xs text-slate-400">
                            No fields added yet
                          </p>

                        </div>

                      ) : (

                        <div className="space-y-2 max-h-[380px] overflow-y-auto">

                          {draftFields.map(
                            (
                              field,
                              index
                            ) => (

                              <div
                                key={
                                  field.id
                                }
                                className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition"
                              >

                                <GripVertical
                                  size={
                                    14
                                  }
                                  className="text-slate-300 shrink-0"
                                />

                                <div className="min-w-0 flex-1">

                                  <div className="flex items-center gap-1.5 flex-wrap">

                                    <span className="text-sm font-medium text-slate-900">
                                      {
                                        field.label
                                      }
                                    </span>

                                    <span className="text-[11px] text-slate-400">
                                      (
                                      {
                                        field.type
                                      }
                                      )
                                    </span>

                                    {field.required && (
                                      <span className="text-[11px] text-red-500 font-medium">
                                        *
                                      </span>
                                    )}

                                  </div>

                                  {field.type ===
                                  "image" ? (

                                    <div className="mt-2 flex items-center gap-2">

                                      <div className="flex h-10 w-14 items-center justify-center rounded-md border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-white to-pink-100 text-[8px] font-semibold text-purple-600">
                                        IMG
                                      </div>

                                      <p className="text-[11px] text-slate-500">
                                        Image upload field
                                      </p>

                                    </div>

                                  ) : field.options ? (

                                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                                      {
                                        field.options.join(
                                          ", "
                                        )
                                      }
                                    </p>

                                  ) : null}

                                </div>

                                <div className="flex items-center gap-0.5 shrink-0">

                                  <button
                                    onClick={() =>
                                      moveField(
                                        index,
                                        "up"
                                      )
                                    }
                                    disabled={
                                      index ===
                                      0
                                    }
                                    className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
                                  >
                                    <ArrowUp
                                      size={
                                        13
                                      }
                                    />
                                  </button>

                                  <button
                                    onClick={() =>
                                      moveField(
                                        index,
                                        "down"
                                      )
                                    }
                                    disabled={
                                      index ===
                                      draftFields.length -
                                        1
                                    }
                                    className="p-1.5 rounded-md text-slate-400 hover:bg-white disabled:opacity-30 transition"
                                  >
                                    <ArrowDown
                                      size={
                                        13
                                      }
                                    />
                                  </button>

                                  <button
                                    onClick={() =>
                                      editField(
                                        field
                                      )
                                    }
                                    className="p-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                                  >
                                    <Edit2
                                      size={
                                        13
                                      }
                                    />
                                  </button>

                                  <button
                                    onClick={() =>
                                      deleteField(
                                        field.id
                                      )
                                    }
                                    className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                                  >
                                    <Trash2
                                      size={
                                        13
                                      }
                                    />
                                  </button>

                                </div>

                              </div>

                            )
                          )}

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* ===================== SIDEBAR ===================== */}

          <aside className="bg-white rounded-xl border border-slate-200 p-4 h-fit max-h-full overflow-hidden">

            <h3 className="text-xs font-semibold text-slate-900 mb-3">
              Your Forms ({forms.length})
            </h3>

            {forms.length === 0 ? (

              <div className="py-8 text-center">

                <FileText
                  size={24}
                  className="mx-auto text-slate-300 mb-2"
                />

                <p className="text-xs text-slate-400">
                  No forms yet
                </p>

                <button
                  onClick={
                    createNewForm
                  }
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
                    onClick={() =>
                      requestSwitchForm(
                        form.id
                      )
                    }
                    className={`flex items-center justify-between gap-2 p-2.5 rounded-lg cursor-pointer transition border ${
                      activeFormId ===
                      form.id
                        ? "bg-purple-50 border-purple-300"
                        : "bg-slate-50 border-transparent hover:bg-slate-100"
                    }`}
                  >

                    <div className="min-w-0">

                      <p className="text-sm font-medium text-slate-900 truncate">
                        {form.title ||
                          "No title"}
                      </p>

                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {
                          (
                            form.fields ||
                            []
                          ).length
                        }{" "}
                        field
                        {(
                          form.fields ||
                          []
                        ).length !==
                        1
                          ? "s"
                          : ""}
                      </p>

                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteForm(
                          form.id
                        );
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2
                        size={13}
                      />
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

// ======================================================
// RESPONSES
// ======================================================

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
    if (
      val == null ||
      val === ""
    ) {
      return "—";
    }

    if (Array.isArray(val)) {
      return val.length
        ? val.join(", ")
        : "—";
    }

    if (
      typeof val === "object" &&
      ("start" in val ||
        "end" in val)
    ) {
      const start =
        val.start || "—";

      const end =
        val.end || "—";

      return `Start Date: ${start} | End Date: ${end}`;
    }

    if (
      typeof val === "object"
    ) {
      return JSON.stringify(val);
    }

    return String(val);
  };

  const visibleFields =
    fields.filter(
      (f) =>
        f.type !==
        "reference-image"
    );

  const columns =
    visibleFields.length > 0
      ? visibleFields.map(
          (f) => ({
            key: f.id,
            label: f.label,
          })
        )
      : (() => {
          const first =
            responses[0]?.values;

          if (
            !first ||
            typeof first !==
              "object"
          ) {
            return [];
          }

          return Object.keys(
            first
          ).map((key) => ({
            key,
            label: key,
          }));
        })();

  // ===================== LOADING =====================

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 h-full flex items-center justify-center gap-2 text-slate-500">
        <Loader2
          size={18}
          className="animate-spin"
        />

        Loading responses...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-full min-h-0 flex flex-col">

      {/* ================= HEADER ================= */}

      <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">

        <div className="min-w-0">

          <h2 className="text-lg font-bold text-slate-900">
            Responses
          </h2>

          <p className="text-xs text-slate-500 mt-0.5 truncate">
            {formTitle} ·{" "}
            {responses.length}{" "}
            response
            {responses.length !==
            1
              ? "s"
              : ""}
          </p>

        </div>

        <div className="flex items-center gap-2 shrink-0">

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

      {/* ================= ERROR ================= */}

      {error && (
        <div className="mx-5 mt-4 px-3 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm shrink-0">
          {error}
        </div>
      )}

      {/* ================= NO RESPONSES ================= */}

      {responses.length === 0 ? (

        <div className="flex-1 flex flex-col items-center justify-center text-center min-h-0">

          <Inbox
            size={32}
            className="mx-auto text-slate-300 mb-2"
          />

          <p className="text-sm text-slate-500">
            No responses yet
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Share the form link to
            start collecting answers
          </p>

        </div>

      ) : columns.length === 0 ? (

        /* ================= RAW DATA ================= */

        <div className="flex-1 min-h-0 overflow-auto p-5 space-y-3">

          <p className="text-xs text-slate-500 mb-2">
            Could not map field labels
            — showing raw response
            data
          </p>

          {responses.map(
            (r, idx) => (
              <pre
                key={r.id}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-x-auto"
              >
                #{responses.length -
                  idx}
                {"\n"}
                {JSON.stringify(
                  r.values,
                  null,
                  2
                )}
              </pre>
            )
          )}

        </div>

      ) : (

        /* ==================================================
           IMPORTANT:
           ONLY THIS DIV SCROLLS
           ================================================== */

        <div
          className="
            flex-1
            min-h-0
            min-w-0
            overflow-auto
            overscroll-contain
          "
        >

          <table className="min-w-max w-full text-sm border-collapse">

            {/* ================= TABLE HEADER ================= */}

            <thead className="sticky top-0 z-20">

              <tr className="bg-slate-50 border-b border-slate-200">

                {/* NUMBER COLUMN */}

                <th
                  className="
                    sticky
                    left-0
                    top-0
                    z-30
                    bg-slate-50
                    text-left
                    px-4
                    py-3
                    font-semibold
                    text-slate-600
                    whitespace-nowrap
                    border-r
                    border-slate-100
                  "
                >
                  #
                </th>

                {/* DYNAMIC COLUMNS */}

                {columns.map(
                  (col) => (
                    <th
                      key={
                        col.key
                      }
                      className="
                        text-left
                        px-4
                        py-3
                        font-semibold
                        text-slate-600
                        whitespace-nowrap
                        min-w-[180px]
                        max-w-[320px]
                      "
                    >
                      {
                        col.label
                      }
                    </th>
                  )
                )}

              </tr>

            </thead>

            {/* ================= TABLE BODY ================= */}

            <tbody>

              {responses.map(
                (r, idx) => (

                  <tr
                    key={r.id}
                    className="
                      border-b
                      border-slate-100
                      hover:bg-slate-50/80
                      transition
                    "
                  >

                    {/* NUMBER */}

                    <td
                      className="
                        sticky
                        left-0
                        z-10
                        bg-white
                        px-4
                        py-3
                        text-slate-400
                        tabular-nums
                        align-top
                        border-r
                        border-slate-100
                      "
                    >
                      {
                        responses.length -
                        idx
                      }
                    </td>

                    {/* DATA */}

                    {columns.map(
                      (col) => {

                        const value =
                          r.values?.[
                            col.key
                          ];

                        const field =
                          visibleFields.find(
                            (f) =>
                              f.id ===
                              col.key
                          );

                        const isImageField =
                          field?.type ===
                          "image";

                        const imageUrl =
                          typeof value ===
                          "string"
                            ? value
                            : value?.url ||
                              "";

                        return (
                          <td
                            key={
                              col.key
                            }
                            className="
                              px-4
                              py-3
                              text-slate-800
                              align-top
                              min-w-[180px]
                              max-w-[320px]
                              whitespace-normal
                              break-words
                            "
                            title={
                              typeof value ===
                              "object"
                                ? JSON.stringify(
                                    value
                                  )
                                : formatValue(
                                    value
                                  )
                            }
                          >

                            {/* IMAGE */}

                            {isImageField &&
                            value ? (

                              <div className="flex flex-col gap-2">

                                <img
                                  src={
                                    imageUrl
                                  }
                                  alt={
                                    typeof value ===
                                    "string"
                                      ? "Uploaded image"
                                      : value?.name ||
                                        "Uploaded image"
                                  }
                                  className="
                                    h-20
                                    w-20
                                    object-cover
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-slate-50
                                  "
                                />

                                <div className="flex items-center gap-3">

                                  <a
                                    href={
                                      imageUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                      inline-flex
                                      text-xs
                                      text-purple-600
                                      hover:text-purple-700
                                      underline
                                    "
                                  >
                                    View
                                  </a>

                                  <a
                                    href={
                                      imageUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                    className="
                                      inline-flex
                                      text-xs
                                      text-slate-600
                                      hover:text-slate-800
                                      underline
                                    "
                                  >
                                    Download
                                  </a>

                                </div>

                              </div>

                            ) : (

                              /* NORMAL VALUE */

                              <div
                                className="
                                  max-w-[320px]
                                  whitespace-normal
                                  break-words
                                  leading-5
                                "
                              >
                                {formatValue(
                                  value
                                )}
                              </div>

                            )}

                          </td>
                        );
                      }
                    )}

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

// ======================================================
// PREVIEW
// ======================================================

function FormPreview({
  schema,
  onBack,
}: {
  schema: FormSchema;
  onBack: () => void;
}) {
  const [values, setValues] =
    useState<Record<string, any>>(
      {}
    );

  const [submitted, setSubmitted] =
    useState(false);

  const [
    uploadingFieldId,
    setUploadingFieldId,
  ] = useState<string | null>(
    null
  );

  const [
    uploadError,
    setUploadError,
  ] = useState<string | null>(
    null
  );

  const visibleFields =
    (schema.fields || []).filter(
      (field: any) =>
        field.type !==
        "reference-image"
    );

  const uploadImageFile = async (
    fieldId: string,
    file: File
  ) => {
    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    try {
      setUploadingFieldId(
        fieldId
      );

      setUploadError(null);

      const res =
        await axios.post(
          `${API}/api/forms/upload-image`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const url =
        res.data?.url;

      if (!url) {
        throw new Error(
          "Image upload did not return a URL"
        );
      }

      setValues((prev) => ({
        ...prev,

        [fieldId]: {
          url,
          name: file.name,
          size: file.size,
        },
      }));
    } catch (err: any) {
      console.error(err);

      setUploadError(
        err?.response?.data?.message ||
          "Image upload failed"
      );
    } finally {
      setUploadingFieldId(
        null
      );
    }
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">

        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">

          <Check
            size={24}
            className="text-emerald-600"
          />

        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Thank you!
        </h2>

        <p className="text-slate-500 mt-1.5 text-sm">
          Your response has been
          recorded.
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
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden w-full max-w-full">

      {/* HEADER */}

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

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="p-5 sm:p-8 space-y-5 max-w-2xl mx-auto"
      >

        {uploadError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {uploadError}
          </div>
        )}

        {visibleFields.map(
          (field: any) => (

            <div key={field.id}>

              <label className="block text-sm font-semibold text-slate-800 mb-1.5">

                {field.label}

                {field.required && (
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                )}

              </label>

              {/* REFERENCE IMAGE */}

              {field.referenceUrl && (
                <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                  <img
                    src={
                      field.referenceUrl
                    }
                    alt={
                      field.label
                    }
                    className="max-h-64 w-full object-cover"
                  />

                </div>
              )}

              {/* IMAGE */}

              {field.type ===
              "image" ? (

                <div className="space-y-3">

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file =
                        e.target.files?.[0];

                      if (file) {
                        uploadImageFile(
                          field.id,
                          file
                        );
                      }
                    }}
                    className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-700"
                  />

                  {uploadingFieldId ===
                    field.id && (
                    <div className="inline-flex items-center gap-2 text-xs text-slate-500">

                      <Loader2
                        size={14}
                        className="animate-spin"
                      />

                      Uploading
                      image...

                    </div>
                  )}

                  {values[
                    field.id
                  ] && (
                    <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">

                      <img
                        src={
                          values[
                            field.id
                          ]?.url
                        }
                        alt={
                          values[
                            field.id
                          ]?.name ||
                          field.label
                        }
                        className="h-32 w-full rounded-md object-cover border border-slate-200"
                      />

                      <div className="flex items-center justify-between gap-3">

                        <span className="text-xs text-slate-600 truncate">
                          {
                            values[
                              field.id
                            ]?.name
                          }
                        </span>

                        <div className="flex items-center gap-3">

                          <a
                            href={
                              values[
                                field.id
                              ]?.url
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-purple-600 hover:text-purple-700 underline"
                          >
                            View
                          </a>

                          <a
                            href={
                              values[
                                field.id
                              ]?.url
                            }
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="text-xs text-slate-600 hover:text-slate-800 underline"
                          >
                            Download
                          </a>

                        </div>

                      </div>

                    </div>
                  )}

                </div>

              ) : field.type ===
                "textarea" ? (

                <textarea
                  required={
                    field.required
                  }
                  value={
                    values[
                      field.id
                    ] || ""
                  }
                  onChange={(e) =>
                    setValues(
                      (p) => ({
                        ...p,
                        [field.id]:
                          e.target
                            .value,
                      })
                    )
                  }
                  placeholder={
                    field.placeholder
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition resize-y"
                  rows={3}
                />

              ) : field.type ===
                "select" ? (

                <select
                  required={
                    field.required
                  }
                  value={
                    values[
                      field.id
                    ] || ""
                  }
                  onChange={(e) =>
                    setValues(
                      (p) => ({
                        ...p,
                        [field.id]:
                          e.target
                            .value,
                      })
                    )
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                >

                  <option value="">
                    -- Select --
                  </option>

                  {field.options?.map(
                    (opt: string) => (
                      <option
                        key={opt}
                        value={opt}
                      >
                        {opt}
                      </option>
                    )
                  )}

                </select>

              ) : field.type ===
                "radio" ? (

                <div className="space-y-2">

                  {field.options?.map(
                    (opt: string) => (

                      <label
                        key={opt}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
                      >

                        <input
                          type="radio"
                          name={
                            field.id
                          }
                          value={opt}
                          required={
                            field.required
                          }
                          checked={
                            values[
                              field.id
                            ] === opt
                          }
                          onChange={() =>
                            setValues(
                              (p) => ({
                                ...p,
                                [field.id]:
                                  opt,
                              })
                            )
                          }
                          className="accent-purple-600"
                        />

                        {opt}

                      </label>

                    )
                  )}

                </div>

              ) : field.type ===
                "checkbox-group" ? (

                <div className="space-y-2">

                  {field.options?.map(
                    (opt: string) => (

                      <label
                        key={opt}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700"
                      >

                        <input
                          type="checkbox"
                          value={opt}
                          checked={(
                            values[
                              field.id
                            ] || []
                          ).includes(
                            opt
                          )}
                          onChange={(e) => {

                            const current: string[] =
                              values[
                                field.id
                              ] || [];

                            const next =
                              e.target
                                .checked
                                ? [
                                    ...current,
                                    opt,
                                  ]
                                : current.filter(
                                    (
                                      v
                                    ) =>
                                      v !==
                                      opt
                                  );

                            setValues(
                              (p) => ({
                                ...p,
                                [field.id]:
                                  next,
                              })
                            );
                          }}
                          className="rounded accent-purple-600"
                        />

                        {opt}

                      </label>

                    )
                  )}

                </div>

              ) : field.type ===
                "checkbox" ? (

                <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">

                  <input
                    type="checkbox"
                    checked={Boolean(
                      values[
                        field.id
                      ]
                    )}
                    required={
                      field.required
                    }
                    onChange={(e) =>
                      setValues(
                        (p) => ({
                          ...p,
                          [field.id]:
                            e.target
                              .checked,
                        })
                      )
                    }
                    className="rounded accent-purple-600"
                  />

                  {field.placeholder ||
                    "Yes"}

                </label>

              ) : field.type ===
                "rating" ? (

                <div className="flex flex-wrap items-center gap-3">

                  <div className="flex items-center gap-1">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            setValues(
                              (p) => ({
                                ...p,
                                [field.id]:
                                  p[
                                    field
                                      .id
                                  ] ===
                                  star
                                    ? undefined
                                    : star,
                              })
                            );
                          }}
                          className={`text-2xl leading-none transition hover:scale-110 ${
                            (values[
                              field.id
                            ] || 0) >=
                            star
                              ? "text-amber-400"
                              : "text-slate-300 hover:text-amber-200"
                          }`}
                        >
                          ★
                        </button>

                      )
                    )}

                  </div>

                  {values[
                    field.id
                  ] ? (

                    <div className="flex items-center gap-2">

                      <span className="text-xs font-medium text-slate-600">
                        {
                          values[
                            field.id
                          ]
                        }{" "}
                        / 5
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setValues(
                            (p) => {
                              const next =
                                {
                                  ...p,
                                };

                              delete next[
                                field.id
                              ];

                              return next;
                            }
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        Clear
                      </button>

                    </div>

                  ) : (

                    <span className="text-xs text-slate-400">
                      Click a star
                      to rate
                    </span>

                  )}

                </div>

              ) : field.type ===
                "daterange" ? (

                <div className="grid gap-3 sm:grid-cols-2">

                  <div>

                    <label className="mb-1 block text-xs font-medium text-slate-500">
                      Start date
                    </label>

                    <input
                      type="date"
                      value={
                        values[
                          field.id
                        ]?.start ||
                        ""
                      }
                      onChange={(e) => {

                        const current =
                          values[
                            field.id
                          ] || {
                            start: "",
                            end: "",
                          };

                        setValues(
                          (p) => ({
                            ...p,
                            [field.id]:
                              {
                                ...current,
                                start:
                                  e
                                    .target
                                    .value,
                              },
                          })
                        );
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
                      value={
                        values[
                          field.id
                        ]?.end ||
                        ""
                      }
                      onChange={(e) => {

                        const current =
                          values[
                            field.id
                          ] || {
                            start: "",
                            end: "",
                          };

                        setValues(
                          (p) => ({
                            ...p,
                            [field.id]:
                              {
                                ...current,
                                end:
                                  e
                                    .target
                                    .value,
                              },
                          })
                        );
                      }}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                    />

                  </div>

                </div>

              ) : (

                <input
                  type={
                    field.type ===
                    "email"
                      ? "email"
                      : field.type ===
                        "tel"
                      ? "tel"
                      : field.type ===
                        "number"
                      ? "number"
                      : field.type ===
                        "date"
                      ? "date"
                      : "text"
                  }
                  inputMode={
                    field.type ===
                    "tel"
                      ? "numeric"
                      : undefined
                  }
                  pattern={
                    field.type ===
                    "tel"
                      ? "[0-9]{10,15}"
                      : undefined
                  }
                  maxLength={
                    field.type ===
                    "tel"
                      ? 15
                      : undefined
                  }
                  required={
                    field.required
                  }
                  value={
                    values[
                      field.id
                    ] || ""
                  }
                  onChange={(e) => {

                    let value =
                      e.target
                        .value;

                    if (
                      field.type ===
                      "tel"
                    ) {
                      value =
                        value
                          .replace(
                            /\D/g,
                            ""
                          )
                          .slice(
                            0,
                            15
                          );
                    }

                    setValues(
                      (p) => ({
                        ...p,
                        [field.id]:
                          value,
                      })
                    );
                  }}
                  onKeyDown={
                    field.type ===
                    "tel"
                      ? (e) => {

                          const allowed =
                            [
                              "Backspace",
                              "Delete",
                              "Tab",
                              "Escape",
                              "Enter",
                              "ArrowLeft",
                              "ArrowRight",
                              "ArrowUp",
                              "ArrowDown",
                              "Home",
                              "End",
                            ];

                          if (
                            allowed.includes(
                              e.key
                            )
                          ) {
                            return;
                          }

                          if (
                            e.ctrlKey ||
                            e.metaKey
                          ) {
                            return;
                          }

                          if (
                            !/^\d$/.test(
                              e.key
                            )
                          ) {
                            e.preventDefault();
                          }
                        }
                      : undefined
                  }
                  onPaste={
                    field.type ===
                    "tel"
                      ? (e) => {

                          e.preventDefault();

                          const pasted =
                            (
                              e
                                .clipboardData
                                ?.getData(
                                  "text"
                                ) ||
                              ""
                            )
                              .replace(
                                /\D/g,
                                ""
                              )
                              .slice(
                                0,
                                15
                              );

                          setValues(
                            (p) => ({
                              ...p,
                              [field.id]:
                                pasted,
                            })
                          );
                        }
                      : undefined
                  }
                  placeholder={
                    field.placeholder ||
                    (field.type ===
                    "tel"
                      ? "e.g. 9876543210"
                      : undefined)
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
                />

              )}

            </div>

          )
        )}

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