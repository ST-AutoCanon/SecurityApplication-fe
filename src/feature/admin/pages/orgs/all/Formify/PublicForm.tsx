
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
  const [uploadingFieldId, setUploadingFieldId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadImageFile = async (fieldId: string, file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploadingFieldId(fieldId);
      setUploadError(null);

      const res = await axios.post(
        `${API}/api/forms/public/${orgId}/${formId}/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const url = res.data?.url;
      if (!url) {
        throw new Error("Image upload did not return a URL");
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
        err?.response?.data?.message || err?.message || "Image upload failed"
      );
    } finally {
      setUploadingFieldId(null);
    }
  };

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
          {uploadError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {uploadError}
            </div>
          )}

          {(form.fields || []).map((field: any) => (
            <div key={field.id}>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "image" ? (
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    required={field.required}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        uploadImageFile(field.id, file);
                      }
                    }}
                    className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-purple-700"
                  />

                  {uploadingFieldId === field.id && (
                    <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                      <Loader2 size={14} className="animate-spin" />
                      Uploading image...
                    </div>
                  )}

                  {values[field.id] && (
                    <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <img
                        src={values[field.id]?.url}
                        alt={values[field.id]?.name || field.label}
                        className="h-32 w-full rounded-md object-cover border border-slate-200"
                      />
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-600 truncate">
                          {values[field.id]?.name || "Uploaded image"}
                        </span>
                        <a
                          href={values[field.id]?.url}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="text-xs text-purple-600 hover:text-purple-700 underline"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : field.type === "textarea" ? (
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