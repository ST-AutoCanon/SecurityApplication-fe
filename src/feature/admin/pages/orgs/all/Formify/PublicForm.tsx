// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Check, Loader2 } from "lucide-react";

// const API = `${import.meta.env.VITE_BACKEND_URL}`;

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
// }

// export default function PublicForm() {
//   const { id } = useParams<{ id: string }>();
//   const [form, setForm] = useState<FormSchema | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [values, setValues] = useState<Record<string, any>>({});
//   const [submitted, setSubmitted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const load = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Public endpoint (no auth)
//         const res = await axios.get(`${API}/api/forms/public/${id}`);

//         if (!res.data.success) {
//           throw new Error(res.data.message || "Form not found");
//         }

//         setForm(res.data.data);
//       } catch (err: any) {
//         setError(
//           err?.response?.data?.message || err.message || "Failed to load form"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form) return;

//     try {
//       setSubmitting(true);

//       await axios.post(`${API}/api/forms/public/${form.id}/submit`, {
//         values,
//       });

//       setSubmitted(true);
//     } catch (err: any) {
//       alert(err?.response?.data?.message || "Failed to submit");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="flex items-center gap-2 text-slate-500">
//           <Loader2 size={20} className="animate-spin" />
//           Loading form...
//         </div>
//       </div>
//     );
//   }

//   if (error || !form) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-md w-full text-center">
//           <h1 className="text-xl font-bold text-slate-900 mb-2">
//             Form not found
//           </h1>
//           <p className="text-sm text-slate-500">
//             {error || "This form does not exist or is no longer available."}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-xl border border-slate-200 p-10 max-w-md w-full text-center">
//           <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
//             <Check size={24} className="text-emerald-600" />
//           </div>
//           <h2 className="text-xl font-bold text-slate-900">Thank you!</h2>
//           <p className="text-slate-500 mt-1.5 text-sm">
//             Your response has been recorded.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 py-10 px-4">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden">
//         <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-slate-100 text-center">
//           <h1 className="text-2xl font-bold text-slate-900">{form.title}</h1>
//           {form.description && (
//             <p className="text-slate-500 text-sm mt-2">{form.description}</p>
//           )}
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
//           {(form.fields || []).map((field) => (
//             <div key={field.id}>
//               <label className="block text-sm font-semibold text-slate-800 mb-1.5">
//                 {field.label}
//                 {field.required && <span className="text-red-500 ml-1">*</span>}
//               </label>

//               {field.type === "textarea" ? (
//                 <textarea
//                   required={field.required}
//                   value={values[field.id] || ""}
//                   onChange={(e) =>
//                     setValues((p) => ({ ...p, [field.id]: e.target.value }))
//                   }
//                   placeholder={field.placeholder}
//                   className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
//                   rows={3}
//                 />
//               ) : field.type === "select" ? (
//                 <select
//                   required={field.required}
//                   value={values[field.id] || ""}
//                   onChange={(e) =>
//                     setValues((p) => ({ ...p, [field.id]: e.target.value }))
//                   }
//                   className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500"
//                 >
//                   <option value="">-- Select --</option>
//                   {field.options?.map((opt) => (
//                     <option key={opt} value={opt}>
//                       {opt}
//                     </option>
//                   ))}
//                 </select>
//               ) : field.type === "radio" ? (
//                 <div className="space-y-2">
//                   {field.options?.map((opt) => (
//                     <label
//                       key={opt}
//                       className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 text-sm"
//                     >
//                       <input
//                         type="radio"
//                         name={field.id}
//                         value={opt}
//                         required={field.required}
//                         checked={values[field.id] === opt}
//                         onChange={() =>
//                           setValues((p) => ({ ...p, [field.id]: opt }))
//                         }
//                         className="accent-purple-600"
//                       />
//                       {opt}
//                     </label>
//                   ))}
//                 </div>
//               ) : field.type === "checkbox" ? (
//                 <div className="space-y-2">
//                   {field.options?.map((opt) => (
//                     <label
//                       key={opt}
//                       className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 text-sm"
//                     >
//                       <input
//                         type="checkbox"
//                         value={opt}
//                         checked={(values[field.id] || []).includes(opt)}
//                         onChange={(e) => {
//                           const current: string[] = values[field.id] || [];
//                           const next = e.target.checked
//                             ? [...current, opt]
//                             : current.filter((v) => v !== opt);
//                           setValues((p) => ({ ...p, [field.id]: next }));
//                         }}
//                         className="rounded accent-purple-600"
//                       />
//                       {opt}
//                     </label>
//                   ))}
//                 </div>
//               ) : (
//                 <input
//                   type={field.type}
//                   required={field.required}
//                   value={values[field.id] || ""}
//                   onChange={(e) =>
//                     setValues((p) => ({ ...p, [field.id]: e.target.value }))
//                   }
//                   placeholder={field.placeholder}
//                   className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500"
//                 />
//               )}
//             </div>
//           ))}

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 disabled:opacity-60"
//           >
//             {submitting ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";

const API = `${import.meta.env.VITE_BACKEND_URL}`;

export default function PublicForm() {
  const params = useParams();
  const orgId = params.orgId;
  const formId = params.formId;

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log("PublicForm params:", { orgId, formId, API });

    if (!orgId || !formId) {
      setError(`Invalid link. Need /form/ORG_ID/FORM_ID — got orgId=${orgId}, formId=${formId}`);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${API}/api/forms/public/${orgId}/${formId}`;
        console.log("Fetching:", url);

        const res = await axios.get(url);
        console.log("Response:", res.data);

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Form not found");
        }

        setForm(res.data.data);
      } catch (err: any) {
        console.error(err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load form"
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [orgId, formId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(`${API}/api/forms/public/${orgId}/${formId}/submit`, {
        values,
      });
      setSubmitted(true);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-slate-50">
        <Loader2 className="animate-spin text-slate-400" size={28} />
        <p className="text-sm text-slate-500">Loading form...</p>
        <p className="text-xs text-slate-400">
          org={String(orgId)} form={String(formId)}
        </p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-xl border p-8 max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Form not found</h1>
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <p className="text-xs text-slate-400">
            URL must be /form/ORG_ID/FORM_ID
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-xl border p-10 max-w-md w-full text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold">Thank you!</h2>
          <p className="text-sm text-slate-500 mt-1">Response recorded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-slate-100 text-center">
          <h1 className="text-2xl font-bold text-slate-900">{form.title}</h1>
          {form.description && (
            <p className="text-slate-500 text-sm mt-2">{form.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {(form.fields || []).map((field: any) => (
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
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition"
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
                  {field.options?.map((opt: string) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "radio" ? (
                <div className="space-y-2">
                  {field.options?.map((opt: string) => (
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
                  {field.options?.map((opt: string) => (
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
            disabled={submitting}
            className="w-full py-3 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}