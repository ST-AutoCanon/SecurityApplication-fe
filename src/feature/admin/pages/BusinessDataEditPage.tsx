// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import {
// // //   ArrowLeft,
// // //   Save,
// // //   Loader2,
// // //   User,
// // // } from "lucide-react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // const API = import.meta.env.VITE_BACKEND_URL;

// // // export default function BusinessDataEditPage() {
// // //   const navigate = useNavigate();

// // // const location = useLocation();

// // // const parts = location.pathname.split("/");

// // // console.log(parts);

// // // const table = parts[4];
// // //     const id = parts[5];
    
// // //   const [loading, setLoading] = useState(true);

// // //   const [saving, setSaving] = useState(false);

// // //   const [formData, setFormData] = useState<Record<string, any>>({});

// // //   const [error, setError] = useState("");

// // //   // ----------------------------
// // //   // Fetch Record
// // //   // ----------------------------

// // //   const loadRecord = async () => {
// // //     try {
// // //       setLoading(true);

// // //    console.log("URL:", location.pathname);
// // //    console.log("Parts:", parts);
// // //    console.log("Table:", table);
// // //    console.log("ID:", id);
// // //       const res = await axios.get(
// // //         `${API}/api/admin/business-data/${table}/${id}`,
// // //         {
// // //           withCredentials: true,
// // //         },
// // //       );

// // //       setFormData(res.data.data || {});
// // //     } catch (err: any) {
// // //       console.error(err);

// // //       setError(err.response?.data?.message || "Unable to load record.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadRecord();
// // //   }, []);

// // //   // ----------------------------
// // //   // Input Change
// // //   // ----------------------------

// // //   const handleChange = (key: string, value: any) => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [key]: value,
// // //     }));
// // //   };

// // //   // ----------------------------
// // //   // Save
// // //   // ----------------------------

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     try {
// // //       setSaving(true);

// // //       await axios.put(
// // //         `${API}/api/admin/business-data/${table}/${id}`,
// // //         formData,
// // //         {
// // //           withCredentials: true,
// // //         },
// // //       );

// // //       alert("Updated Successfully");

// // //       navigate(-1);
// // //     } catch (err: any) {
// // //       console.error(err);

// // //       alert(err.response?.data?.message || "Update Failed");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   // ----------------------------
// // //   // Helpers
// // //   // ----------------------------

// // //   const title = (text: string) =>
// // //     text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// // //   const ignoredFields = ["id", "created_at", "updated_at", "face_descriptor"];

// // //   if (loading) {
// // //     return (
// // //       <div className="h-screen flex items-center justify-center">
// // //         <Loader2 className="animate-spin" size={40} />
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="h-screen flex items-center justify-center text-red-600 text-lg">
// // //         {error}
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-slate-100 p-6">
// // //       {/* Header */}

// // //       <div className="flex items-center justify-between mb-8">
// // //         <div className="flex items-center gap-3">
// // //           <button
// // //             onClick={() => navigate(-1)}
// // //             className="p-2 rounded-lg bg-white shadow hover:bg-gray-100"
// // //           >
// // //             <ArrowLeft size={20} />
// // //           </button>

// // //           <div>
// // //             <h1 className="text-3xl font-bold text-slate-800">
// // //               Edit {title(table || "")}
// // //             </h1>

// // //             <p className="text-gray-500">Update record information</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Form */}

// // //       <form
// // //         onSubmit={handleSubmit}
// // //         className="bg-white rounded-2xl shadow-lg p-8"
// // //       >
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {Object.entries(formData)
// // //             .filter(([key]) => !ignoredFields.includes(key))
// // //             .map(([key, value]) => {
// // //               const label = title(key);

// // //               // -------------------------
// // //               // Profile Photo Preview
// // //               // -------------------------
// // //               // if (
// // //               //   key === "profile_photo" &&
// // //               //   typeof value === "string" &&
// // //               //   value.startsWith("http")
// // //               // ) {
// // //               //   return (
// // //               //     <div key={key} className="md:col-span-2">
// // //               //       <label className="block mb-2 font-semibold text-slate-700">
// // //               //         {label}
// // //               //       </label>

// // //               //       <div className="flex items-center gap-5">
// // //               //         <img
// // //               //           src={value}
// // //               //           alt="Profile"
// // //               //           className="w-28 h-28 rounded-xl object-cover border shadow"
// // //               //         />

// // //               //         <div className="text-gray-500 text-sm">
// // //               //           Image preview only
// // //               //         </div>
// // //               //       </div>
// // //               //     </div>
// // //               //   );
// // //               // }
// // // // -------------------------
// // // // Profile Photo Preview
// // // // -------------------------
// // // if (
// // //   key.toLowerCase().includes("photo") ||
// // //   key.toLowerCase().includes("image") ||
// // //   key.toLowerCase().includes("picture")
// // // ) {
// // //   const getPhotoUrl = (photoPath: unknown): string => {
// // //     if (typeof photoPath !== "string" || !photoPath.trim()) {
// // //       return "";
// // //     }

// // //     const path = photoPath.trim();

// // //     // Already a valid absolute URL
// // //     if (/^https?:\/\//i.test(path)) {
// // //       return path;
// // //     }

// // //     // Remove invalid prefixes such as undefined/undefined/
// // //     const cleanedPath = path
// // //       .replace(/^(undefined\/)+/i, "")
// // //       .replace(/^\/+/, "");

// // //     // Build URL using your backend base URL
// // //     return `${API.replace(/\/+$/, "")}/${cleanedPath}`;
// // //   };

// // //   const photoUrl = getPhotoUrl(value);

// // //   return (
// // //     <div key={key} className="md:col-span-2">
// // //       <label className="block mb-2 font-semibold text-slate-700">
// // //         {label}
// // //       </label>

// // //       {photoUrl ? (
// // //         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
// // //           <img
// // //             src={photoUrl}
// // //             alt="Profile"
// // //             className="w-28 h-28 rounded-xl object-cover border border-gray-200 shadow-sm bg-gray-50"
// // //             onError={(e) => {
// // //               e.currentTarget.style.display = "none";
// // //             }}
// // //           />

// // //           <div className="text-sm text-gray-500">
// // //             Profile photo preview
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <div className="w-28 h-28 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400">
// // //           <User size={28} />
// // //           <span className="text-xs mt-1">No photo</span>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // //               // -------------------------
// // //               // Status Dropdown
// // //               // -------------------------
// // //               if (key === "status") {
// // //                 return (
// // //                   <div key={key}>
// // //                     <label className="block mb-2 font-semibold text-slate-700">
// // //                       {label}
// // //                     </label>

// // //                     <select
// // //                       value={value ?? ""}
// // //                       onChange={(e) => handleChange(key, e.target.value)}
// // //                       // className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
// // //                       className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
// // //                     >
// // //                       <option value="Active">Active</option>
// // //                       <option value="Inactive">Inactive</option>
// // //                     </select>
// // //                   </div>
// // //                 );
// // //               }

// // //               // -------------------------
// // //               // Boolean
// // //               // -------------------------
// // //               if (typeof value === "boolean") {
// // //                 return (
// // //                   <div key={key} className="flex items-center gap-3 mt-8">
// // //                     <input
// // //                       type="checkbox"
// // //                       checked={value}
// // //                       onChange={(e) => handleChange(key, e.target.checked)}
// // //                       className="h-5 w-5"
// // //                     />

// // //                     <label className="font-medium text-slate-700">
// // //                       {label}
// // //                     </label>
// // //                   </div>
// // //                 );
// // //               }

// // //               // -------------------------
// // //               // Number
// // //               // -------------------------
// // //               if (typeof value === "number") {
// // //                 return (
// // //                   <div key={key}>
// // //                     <label className="block mb-2 font-semibold text-slate-700">
// // //                       {label}
// // //                     </label>

// // //                     <input
// // //                       type="number"
// // //                       value={value}
// // //                       onChange={(e) =>
// // //                         handleChange(key, Number(e.target.value))
// // //                       }
// // //                       className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
// // //                     />
// // //                   </div>
// // //                 );
// // //               }

// // //               // -------------------------
// // //               // Email
// // //               // -------------------------
// // //               if (key.toLowerCase().includes("email")) {
// // //                 return (
// // //                   <div key={key}>
// // //                     <label className="block mb-2 font-semibold text-slate-700">
// // //                       {label}
// // //                     </label>

// // //                     <input
// // //                       type="email"
// // //                       value={value ?? ""}
// // //                       onChange={(e) => handleChange(key, e.target.value)}
// // //                       className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
// // //                     />
// // //                   </div>
// // //                 );
// // //               }

// // //               // -------------------------
// // //               // Date
// // //               // -------------------------
// // //               if (key.includes("date") || key.includes("dob")) {
// // //                 return (
// // //                   <div key={key}>
// // //                     <label className="block mb-2 font-semibold text-slate-700">
// // //                       {label}
// // //                     </label>

// // //                     <input
// // //                       type="date"
// // //                       value={value ? String(value).substring(0, 10) : ""}
// // //                       onChange={(e) => handleChange(key, e.target.value)}
// // //                       className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
// // //                     />
// // //                   </div>
// // //                 );
// // //               }

// // //               // -------------------------
// // //               // Long Text
// // //               // -------------------------
// // //               if (typeof value === "string" && value.length > 120) {
// // //                 return (
// // //                   <div key={key} className="md:col-span-2">
// // //                     <label className="block mb-2 font-semibold text-slate-700">
// // //                       {label}
// // //                     </label>

// // //                     <textarea
// // //                       rows={5}
// // //                       value={value}
// // //                       onChange={(e) => handleChange(key, e.target.value)}
// // //                       className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
// // //                     />
// // //                   </div>
// // //                 );
// // //               }

// // //               // -------------------------
// // //               // Default Text Input
// // //               // -------------------------
// // //               return (
// // //                 <div key={key}>
// // //                   <label className="block mb-2 font-semibold text-slate-700">
// // //                     {label}
// // //                   </label>

// // //                   <input
// // //                     type="text"
// // //                     value={value ?? ""}
// // //                     onChange={(e) => handleChange(key, e.target.value)}
// // //                     // className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
// // //                     className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
// // //                   />
// // //                 </div>
// // //               );
// // //             })}
// // //         </div>

// // //         {/* Footer Buttons */}
// // //         <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4 border-t pt-6">
// // //           <button
// // //             type="button"
// // //             onClick={() => navigate(-1)}
// // //             disabled={saving}
// // //             className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
// // //           >
// // //             Cancel
// // //           </button>

// // //           <button
// // //             type="submit"
// // //             disabled={saving}
// // //             className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50"
// // //           >
// // //             {saving ? (
// // //               <>
// // //                 <Loader2 className="animate-spin" size={18} />
// // //                 Saving...
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <Save size={18} />
// // //                 Save Changes
// // //               </>
// // //             )}
// // //           </button>
// // //         </div>
// // //       </form>

// // //       {/* Record Info */}
// // //       <div className="mt-6 bg-white rounded-2xl shadow p-5">
// // //         <div className="flex items-center gap-2 mb-3">
// // //           <User className="text-blue-600" size={20} />
// // //           <h3 className="font-semibold text-lg">Record Information</h3>
// // //         </div>

// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
// // //           {formData.id && (
// // //             <div>
// // //               <p className="text-gray-500">ID</p>
// // //               <p className="font-semibold">{formData.id}</p>
// // //             </div>
// // //           )}

// // //           {formData.created_at && (
// // //             <div>
// // //               <p className="text-gray-500">Created At</p>
// // //               <p className="font-semibold">
// // //                 {new Date(formData.created_at).toLocaleString()}
// // //               </p>
// // //             </div>
// // //           )}

// // //           {formData.updated_at && (
// // //             <div>
// // //               <p className="text-gray-500">Updated At</p>
// // //               <p className="font-semibold">
// // //                 {new Date(formData.updated_at).toLocaleString()}
// // //               </p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useEffect, useMemo, useState } from "react";
// // import axios from "axios";
// // import {
// //   ArrowLeft,
// //   Save,
// //   Loader2,
// //   User,
// //   ImagePlus,
// //   X,
// // } from "lucide-react";
// // import { useLocation, useNavigate } from "react-router-dom";

// // const API = String(import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

// // const IGNORED_FIELDS = [
// //   "id",
// //   "created_at",
// //   "updated_at",
// //   "face_descriptor",
// // ];

// // export default function BusinessDataEditPage() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const parts = location.pathname.split("/").filter(Boolean);
// //   const table = parts[4] || "";
// //   const id = parts[5] || "";

// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [formData, setFormData] = useState<Record<string, any>>({});
// //   const [error, setError] = useState("");

// //   const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
// //   const [photoPreview, setPhotoPreview] = useState("");
// //   const [photoError, setPhotoError] = useState("");
// //   const [photoUrlIndex, setPhotoUrlIndex] = useState(0);

// //   const title = (text: string) =>
// //     text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// //   const isPhotoField = (key: string) =>
// //     /photo|image|picture|avatar/i.test(key);

// //   // Find the existing photo regardless of the exact field name.
// //   const existingPhoto = useMemo(() => {
// //     const entry = Object.entries(formData).find(
// //       ([key, value]) =>
// //         isPhotoField(key) &&
// //         typeof value === "string" &&
// //         value.trim() !== "",
// //     );

// //     return entry ? String(entry[1]) : "";
// //   }, [formData]);

// //   // Generate possible image URLs from the saved path.
// //   // The correct URL ultimately depends on the Express static upload route.
// //   const photoCandidates = useMemo(() => {
// //     if (!existingPhoto) return [];

// //     const raw = existingPhoto.trim();

// //     if (/^https?:\/\//i.test(raw)) {
// //       return [raw];
// //     }

// //     const normalized = raw.replace(/\\/g, "/");
// //     const filename = normalized.split("/").filter(Boolean).pop();

// //     if (!filename || filename === "undefined") return [];

// //     // const candidates = [
// //     //   `${API}/uploads/${encodeURIComponent(filename)}`,
// //     //   `${API}/public/uploads/${encodeURIComponent(filename)}`,
// //     // ];

// //     const candidates = [
// //   `${API}/api/uploads/${encodeURIComponent(filename)}`,
// // ];
// //     return [...new Set(candidates)];
// //   }, [existingPhoto]);

// //   const currentPhotoUrl = photoCandidates[photoUrlIndex] || "";

// //   useEffect(() => {
// //     if (!selectedPhoto) {
// //       setPhotoPreview("");
// //       return;
// //     }

// //     const url = URL.createObjectURL(selectedPhoto);
// //     setPhotoPreview(url);

// //     return () => URL.revokeObjectURL(url);
// //   }, [selectedPhoto]);

// //   useEffect(() => {
// //     let cancelled = false;

// //     const loadRecord = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         const response = await axios.get(
// //           `${API}/api/admin/business-data/${encodeURIComponent(table)}/${encodeURIComponent(id)}`,
// //           { withCredentials: true },
// //         );

// //         if (cancelled) return;

// //         const data = response.data?.data;

// //         if (!data || typeof data !== "object") {
// //           throw new Error("The API did not return a valid record.");
// //         }

// //         setFormData(data);
// //         setPhotoUrlIndex(0);
// //         setSelectedPhoto(null);
// //       } catch (err: any) {
// //         if (cancelled) return;

// //         console.error("Failed to load record:", err);
// //         setError(
// //           err.response?.data?.message ||
// //             err.message ||
// //             "Unable to load record.",
// //         );
// //       } finally {
// //         if (!cancelled) setLoading(false);
// //       }
// //     };

// //     if (table && id) {
// //       loadRecord();
// //     } else {
// //       setError("Table name or record ID is missing from the URL.");
// //       setLoading(false);
// //     }

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [table, id]);

// //   const handleChange = (key: string, value: any) => {
// //     setFormData((previous) => ({
// //       ...previous,
// //       [key]: value,
// //     }));
// //   };

// //   const handlePhotoChange = (
// //     event: React.ChangeEvent<HTMLInputElement>,
// //   ) => {
// //     const file = event.target.files?.[0];

// //     if (!file) return;

// //     setPhotoError("");

// //     if (!file.type.startsWith("image/")) {
// //       setPhotoError("Please choose a valid image file.");
// //       event.target.value = "";
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       setPhotoError("Image size must be 5 MB or less.");
// //       event.target.value = "";
// //       return;
// //     }

// //     setSelectedPhoto(file);
// //     event.target.value = "";
// //   };

// //   const handleSubmit = async (event: React.FormEvent) => {
// //     event.preventDefault();

// //     try {
// //       setSaving(true);

// //       if (selectedPhoto) {
// //         const payload = new FormData();

// //         Object.entries(formData).forEach(([key, value]) => {
// //           if (IGNORED_FIELDS.includes(key) || isPhotoField(key)) {
// //             return;
// //           }

// //           payload.append(
// //             key,
// //             value === null || value === undefined
// //               ? ""
// //               : typeof value === "object"
// //                 ? JSON.stringify(value)
// //                 : String(value),
// //           );
// //         });

// //         // Your Express PUT endpoint must handle this Multer field.
// //         payload.append("profile_photo_file", selectedPhoto);

// //         await axios.put(
// //           `${API}/api/admin/business-data/${encodeURIComponent(table)}/${encodeURIComponent(id)}`,
// //           payload,
// //           { withCredentials: true },
// //         );
// //       } else {
// //         const payload = { ...formData };
// //         delete payload.face_descriptor;

// //         await axios.put(
// //           `${API}/api/admin/business-data/${encodeURIComponent(table)}/${encodeURIComponent(id)}`,
// //           payload,
// //           { withCredentials: true },
// //         );
// //       }

// //       window.alert("Updated successfully.");
// //       navigate(-1);
// //     } catch (err: any) {
// //       console.error("Failed to update record:", err);

// //       window.alert(
// //         err.response?.data?.message || "Unable to update record.",
// //       );
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-50">
// //         <Loader2 size={36} className="animate-spin text-blue-600" />
// //         <span className="ml-3 text-slate-600">Loading record...</span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 p-6">
// //         <p className="text-center text-red-600">{error}</p>
// //         <button
// //           type="button"
// //           onClick={() => navigate(-1)}
// //           className="rounded-lg border bg-white px-5 py-2 hover:bg-slate-50"
// //         >
// //           Go Back
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
// //       <div className="mx-auto max-w-6xl">
// //         {/* Page header */}
// //         <div className="mb-6 flex items-center gap-3">
// //           <button
// //             type="button"
// //             onClick={() => navigate(-1)}
// //             disabled={saving}
// //             aria-label="Go back"
// //             className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-100 disabled:opacity-50"
// //           >
// //             <ArrowLeft size={20} />
// //           </button>

// //           <div>
// //             <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
// //               Edit {title(table)}
// //             </h1>
// //             <p className="mt-1 text-sm text-slate-500">
// //               Update record information and profile photo
// //             </p>
// //           </div>
// //         </div>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
// //         >
// //           {/* Profile photo - always visible */}
// //           <section className="border-b border-slate-200 p-5 sm:p-7">
// //             <div className="mb-5">
// //               <h2 className="text-lg font-semibold text-slate-800">
// //                 Profile Photo
// //               </h2>
// //               <p className="mt-1 text-sm text-slate-500">
// //                 View the current photo or choose a replacement.
// //               </p>
// //             </div>

// //             <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
// //               <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
// //                 {photoPreview || currentPhotoUrl ? (
// //                   <img
// //                     key={photoPreview || currentPhotoUrl}
// //                     src={photoPreview || currentPhotoUrl}
// //                     alt="Profile"
// //                     className="h-full w-full object-cover"
// //                     onError={() => {
// //                       if (!photoPreview && photoUrlIndex < photoCandidates.length - 1) {
// //                         setPhotoUrlIndex((previous) => previous + 1);
// //                       }
// //                     }}
// //                   />
// //                 ) : (
// //                   <div className="flex flex-col items-center gap-2 text-slate-400">
// //                     <User size={42} />
// //                     <span className="text-xs">No photo preview</span>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="min-w-0 flex-1">
// //                 <label
// //                   htmlFor="profile-photo-upload"
// //                   className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition ${
// //                     saving
// //                       ? "pointer-events-none bg-blue-300"
// //                       : "bg-blue-600 hover:bg-blue-700"
// //                   }`}
// //                 >
// //                   <ImagePlus size={19} />
// //                   {selectedPhoto ? "Choose Another Photo" : "Upload Profile Photo"}
// //                 </label>

// //                 <input
// //                   id="profile-photo-upload"
// //                   type="file"
// //                   accept="image/*"
// //                   disabled={saving}
// //                   onChange={handlePhotoChange}
// //                   className="sr-only"
// //                 />

// //                 <p className="mt-3 break-all text-sm text-slate-600">
// //                   {selectedPhoto
// //                     ? `Selected file: ${selectedPhoto.name}`
// //                     : existingPhoto
// //                       ? `Saved value: ${existingPhoto}`
// //                       : "No existing photo path was returned by the API."}
// //                 </p>

// //                 <p className="mt-1 text-xs text-slate-500">
// //                   Image files only · Maximum 5 MB
// //                 </p>

// //                 {selectedPhoto && (
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setSelectedPhoto(null);
// //                       setPhotoError("");
// //                     }}
// //                     disabled={saving}
// //                     className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
// //                   >
// //                     <X size={16} />
// //                     Remove selected photo
// //                   </button>
// //                 )}

// //                 {photoError && (
// //                   <p className="mt-3 text-sm text-red-600">
// //                     {photoError}
// //                   </p>
// //                 )}

// //                 {!photoPreview && existingPhoto && !currentPhotoUrl && (
// //                   <p className="mt-3 text-sm text-amber-700">
// //                     A saved photo path exists, but a displayable URL could not be constructed.
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           </section>

// //           {/* Record fields */}
// //           <section className="p-5 sm:p-7">
// //             <h2 className="mb-5 text-lg font-semibold text-slate-800">
// //               Record Details
// //             </h2>

// //             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
// //               {Object.entries(formData)
// //                 .filter(
// //                   ([key]) =>
// //                     !IGNORED_FIELDS.includes(key) &&
// //                     !isPhotoField(key),
// //                 )
// //                 .map(([key, value]) => {
// //                   const label = title(key);

// //                   if (typeof value === "boolean") {
// //                     return (
// //                       <div key={key} className="flex items-center gap-3 py-2">
// //                         <input
// //                           id={`field-${key}`}
// //                           type="checkbox"
// //                           checked={value}
// //                           onChange={(event) =>
// //                             handleChange(key, event.target.checked)
// //                           }
// //                           className="h-4 w-4 accent-blue-600"
// //                         />
// //                         <label
// //                           htmlFor={`field-${key}`}
// //                           className="font-medium text-slate-700"
// //                         >
// //                           {label}
// //                         </label>
// //                       </div>
// //                     );
// //                   }

// //                   if (key.toLowerCase() === "status") {
// //                     return (
// //                       <div key={key}>
// //                         <label className="mb-2 block text-sm font-medium text-slate-700">
// //                           {label}
// //                         </label>
// //                         <select
// //                           value={value ?? ""}
// //                           onChange={(event) =>
// //                             handleChange(key, event.target.value)
// //                           }
// //                           className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //                         >
// //                           <option value="">Select status</option>
// //                           <option value="Active">Active</option>
// //                           <option value="Inactive">Inactive</option>
// //                         </select>
// //                       </div>
// //                     );
// //                   }

// //                   if (
// //                     key.toLowerCase().includes("email")
// //                   ) {
// //                     return (
// //                       <div key={key}>
// //                         <label className="mb-2 block text-sm font-medium text-slate-700">
// //                           {label}
// //                         </label>
// //                         <input
// //                           type="email"
// //                           value={value ?? ""}
// //                           onChange={(event) =>
// //                             handleChange(key, event.target.value)
// //                           }
// //                           className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //                         />
// //                       </div>
// //                     );
// //                   }

// //                   if (
// //                     key.toLowerCase().includes("date") ||
// //                     key.toLowerCase().includes("dob")
// //                   ) {
// //                     return (
// //                       <div key={key}>
// //                         <label className="mb-2 block text-sm font-medium text-slate-700">
// //                           {label}
// //                         </label>
// //                         <input
// //                           type="date"
// //                           value={value ? String(value).slice(0, 10) : ""}
// //                           onChange={(event) =>
// //                             handleChange(key, event.target.value)
// //                           }
// //                           className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //                         />
// //                       </div>
// //                     );
// //                   }

// //                   if (
// //                     typeof value === "string" &&
// //                     value.length > 120
// //                   ) {
// //                     return (
// //                       <div key={key} className="md:col-span-2">
// //                         <label className="mb-2 block text-sm font-medium text-slate-700">
// //                           {label}
// //                         </label>
// //                         <textarea
// //                           rows={4}
// //                           value={value}
// //                           onChange={(event) =>
// //                             handleChange(key, event.target.value)
// //                           }
// //                           className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //                         />
// //                       </div>
// //                     );
// //                   }

// //                   return (
// //                     <div key={key}>
// //                       <label className="mb-2 block text-sm font-medium text-slate-700">
// //                         {label}
// //                       </label>
// //                       <input
// //                         type={typeof value === "number" ? "number" : "text"}
// //                         value={value ?? ""}
// //                         onChange={(event) =>
// //                           handleChange(
// //                             key,
// //                             typeof value === "number"
// //                               ? event.target.value === ""
// //                                 ? ""
// //                                 : Number(event.target.value)
// //                               : event.target.value,
// //                           )
// //                         }
// //                         className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //                       />
// //                     </div>
// //                   );
// //                 })}
// //             </div>
// //           </section>

// //           {/* Actions */}
// //           <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:px-7">
// //             <button
// //               type="button"
// //               onClick={() => navigate(-1)}
// //               disabled={saving}
// //               className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
// //             >
// //               Cancel
// //             </button>

// //             <button
// //               type="submit"
// //               disabled={saving}
// //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
// //             >
// //               {saving ? (
// //                 <>
// //                   <Loader2 size={18} className="animate-spin" />
// //                   Saving...
// //                 </>
// //               ) : (
// //                 <>
// //                   <Save size={18} />
// //                   Save Changes
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </form>

// //         {/* Record metadata */}
// //         <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
// //           <h2 className="mb-4 text-lg font-semibold text-slate-800">
// //             Record Information
// //           </h2>

// //           <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
// //             {formData.id !== undefined && (
// //               <div>
// //                 <p className="text-slate-500">ID</p>
// //                 <p className="mt-1 break-all font-medium text-slate-800">
// //                   {String(formData.id)}
// //                 </p>
// //               </div>
// //             )}

// //             {formData.created_at && (
// //               <div>
// //                 <p className="text-slate-500">Created At</p>
// //                 <p className="mt-1 font-medium text-slate-800">
// //                   {new Date(formData.created_at).toLocaleString()}
// //                 </p>
// //               </div>
// //             )}

// //             {formData.updated_at && (
// //               <div>
// //                 <p className="text-slate-500">Updated At</p>
// //                 <p className="mt-1 font-medium text-slate-800">
// //                   {new Date(formData.updated_at).toLocaleString()}
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useMemo, useRef, useState } from "react";
// import axios from "axios";
// import {
//   ArrowLeft,
//   Loader2,
//   Save,
//   User,
//   X,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";

// const API = String(import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

// const IGNORED_FIELDS = ["id", "created_at", "updated_at", "face_descriptor"];

// type FormDataRecord = Record<string, any>;

// export default function BusinessDataEditPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const photoInputRef = useRef<HTMLInputElement | null>(null);

//   const parts = location.pathname.split("/").filter(Boolean);
//   const table = parts[4] || "";
//   const id = parts[5] || "";

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [formData, setFormData] = useState<FormDataRecord>({});
//   const [error, setError] = useState("");

//   const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState("");
//   const [photoError, setPhotoError] = useState("");
//   const [photoUrlIndex, setPhotoUrlIndex] = useState(0);

//   const title = (text: string) =>
//     text.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());

//   const isPhotoField = (key: string) => /photo|image|picture|avatar/i.test(key);

//   const existingPhoto = useMemo(() => {
//     const entry = Object.entries(formData).find(
//       ([key, value]) =>
//         isPhotoField(key) && typeof value === "string" && value.trim() !== "",
//     );

//     return entry ? String(entry[1]) : "";
//   }, [formData]);

//   const photoCandidates = useMemo(() => {
//     if (!existingPhoto) return [];

//     const raw = existingPhoto.trim();
//     if (/^https?:\/\//i.test(raw)) return [raw];

//     const normalized = raw.replace(/\\/g, "/");
//     const filename = normalized.split("/").filter(Boolean).pop();

//     if (!filename || /^(undefined|null)$/i.test(filename)) return [];

//     // Business photos are served by the backend's /api/uploads route.
//     return [`${API}/api/uploads/${encodeURIComponent(filename)}`];
//   }, [existingPhoto]);

//   const currentPhotoUrl = photoCandidates[photoUrlIndex] || "";

//   useEffect(() => {
//     if (!selectedPhoto) {
//       setPhotoPreview("");
//       return;
//     }

//     const objectUrl = URL.createObjectURL(selectedPhoto);
//     setPhotoPreview(objectUrl);

//     return () => URL.revokeObjectURL(objectUrl);
//   }, [selectedPhoto]);

//   useEffect(() => {
//     let cancelled = false;

//     const loadRecord = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await axios.get(
//           `${API}/api/admin/business-data/${encodeURIComponent(table)}/${encodeURIComponent(id)}`,
//           { withCredentials: true },
//         );

//         if (cancelled) return;

//         const data = response.data?.data;
//         if (!data || typeof data !== "object") {
//           throw new Error("The API did not return a valid record.");
//         }

//         setFormData(data);
//         setPhotoUrlIndex(0);
//         setSelectedPhoto(null);
//         setPhotoError("");
//         if (photoInputRef.current) photoInputRef.current.value = "";
//       } catch (err: any) {
//         if (cancelled) return;

//         console.error("Failed to load record:", err);
//         setError(
//           err.response?.data?.message || err.message || "Unable to load record.",
//         );
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     if (table && id) {
//       loadRecord();
//     } else {
//       setError("Table name or record ID is missing from the URL.");
//       setLoading(false);
//     }

//     return () => {
//       cancelled = true;
//     };
//   }, [table, id]);

//   const handleChange = (key: string, value: any) => {
//     setFormData((previous) => ({ ...previous, [key]: value }));
//   };

//   const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     // Clear the input value so the same file can be selected again if needed.
//     event.target.value = "";

//     if (!file) return;

//     setPhotoError("");

//     if (!file.type.startsWith("image/")) {
//       setPhotoError("Please choose a valid image file.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setPhotoError("Image size must be 5 MB or less.");
//       return;
//     }

//     setSelectedPhoto(file);
//     setPhotoUrlIndex(0);
//   };

//   const removeSelectedPhoto = () => {
//     setSelectedPhoto(null);
//     setPhotoError("");
//     if (photoInputRef.current) photoInputRef.current.value = "";
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       setSaving(true);
//       setError("");

//       const url = `${API}/api/admin/business-data/${encodeURIComponent(table)}/${encodeURIComponent(id)}`;

//       if (selectedPhoto) {
//         const payload = new FormData();

//         Object.entries(formData).forEach(([key, value]) => {
//           if (IGNORED_FIELDS.includes(key) || isPhotoField(key)) return;

//           payload.append(
//             key,
//             value === null || value === undefined
//               ? ""
//               : typeof value === "object"
//                 ? JSON.stringify(value)
//                 : String(value),
//           );
//         });

//         // The backend PUT route must use businessDataUpload.single("profile_photo_file").
//         payload.append("profile_photo_file", selectedPhoto);

//         await axios.put(url, payload, { withCredentials: true });
//       } else {
//         const payload = { ...formData };
//         delete payload.face_descriptor;

//         await axios.put(url, payload, { withCredentials: true });
//       }

//       window.alert("Updated successfully.");
//       navigate(-1);
//     } catch (err: any) {
//       console.error("Failed to update record:", err);
//       window.alert(err.response?.data?.message || "Unable to update record.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-50">
//         <Loader2 size={36} className="animate-spin text-blue-600" />
//         <span className="ml-3 text-slate-600">Loading record...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6">
//         <p className="text-center text-red-600">{error}</p>
//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           className="rounded-lg border bg-white px-5 py-2 hover:bg-slate-50"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-6 flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             disabled={saving}
//             aria-label="Go back"
//             className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-100 disabled:opacity-50"
//           >
//             <ArrowLeft size={20} />
//           </button>

//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
//               Edit {title(table)}
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Update record information and profile photo
//             </p>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
//         >
//           {/* Profile photo */}
//           <section className="border-b border-slate-200 p-5 sm:p-7">
//             <div className="mb-5">
//               <h2 className="text-lg font-semibold text-slate-800">Profile Photo</h2>
//               <p className="mt-1 text-sm text-slate-500">
//                 View the current photo or choose a different photo for this profile.
//               </p>
//             </div>

//             <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
//               <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
//                 {photoPreview || currentPhotoUrl ? (
//                   <img
//                     key={photoPreview || currentPhotoUrl}
//                     src={photoPreview || currentPhotoUrl}
//                     alt="Profile"
//                     className="h-full w-full object-cover"
//                     onError={() => {
//                       if (!photoPreview && photoUrlIndex < photoCandidates.length - 1) {
//                         setPhotoUrlIndex((previous) => previous + 1);
//                       }
//                     }}
//                   />
//                 ) : (
//                   <div className="flex flex-col items-center gap-2 text-slate-400">
//                     <User size={42} />
//                     <span className="text-xs">No photo preview</span>
//                   </div>
//                 )}
//               </div>

//               <div className="min-w-0 flex-1">
//                 <label
//                   htmlFor="profile-photo-upload"
//                   className="mb-2 block text-sm font-semibold text-slate-700"
//                 >
//                   {selectedPhoto ? "Choose a Different Photo" : "Choose Profile Photo"}
//                 </label>

//                 {/* Visible native file input: no transparent overlay or hidden picker control. */}
//                 <input
//                   ref={photoInputRef}
//                   id="profile-photo-upload"
//                   name="profile-photo-upload"
//                   type="file"
//                   accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
//                   disabled={saving}
//                   onChange={handlePhotoChange}
//                   aria-label="Choose profile photo"
//                   className="block w-full max-w-xl cursor-pointer rounded-xl border border-slate-300 bg-white text-sm text-slate-700 shadow-sm file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-600 file:px-5 file:py-3 file:font-semibold file:text-white hover:file:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 />

//                 <p className="mt-3 break-all text-sm text-slate-600">
//                   {selectedPhoto
//                     ? `Selected file: ${selectedPhoto.name}`
//                     : existingPhoto
//                       ? `Saved file: ${existingPhoto.replace(/\\/g, "/").split("/").filter(Boolean).pop()}`
//                       : "No existing photo path was returned by the API."}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-500">
//                   JPG, PNG, WEBP or GIF · Maximum 5 MB
//                 </p>

//                 {selectedPhoto && (
//                   <button
//                     type="button"
//                     onClick={removeSelectedPhoto}
//                     disabled={saving}
//                     className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
//                   >
//                     <X size={16} />
//                     Discard new photo
//                   </button>
//                 )}

//                 {photoError && <p className="mt-3 text-sm text-red-600">{photoError}</p>}

//                 {!photoPreview && existingPhoto && !currentPhotoUrl && (
//                   <p className="mt-3 text-sm text-amber-700">
//                     A saved photo path exists, but a displayable URL could not be constructed.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* Record fields */}
//           <section className="p-5 sm:p-7">
//             <h2 className="mb-5 text-lg font-semibold text-slate-800">Record Details</h2>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               {Object.entries(formData)
//                 .filter(
//                   ([key]) =>
//                     !IGNORED_FIELDS.includes(key) && !isPhotoField(key),
//                 )
//                 .map(([key, value]) => {
//                   const label = title(key);

//                   if (typeof value === "boolean") {
//                     return (
//                       <div key={key} className="flex items-center gap-3 py-2">
//                         <input
//                           id={`field-${key}`}
//                           type="checkbox"
//                           checked={value}
//                           onChange={(event) => handleChange(key, event.target.checked)}
//                           className="h-4 w-4 accent-blue-600"
//                         />
//                         <label htmlFor={`field-${key}`} className="font-medium text-slate-700">
//                           {label}
//                         </label>
//                       </div>
//                     );
//                   }

//                   if (key.toLowerCase() === "status") {
//                     return (
//                       <div key={key}>
//                         <label className="mb-2 block text-sm font-medium text-slate-700">
//                           {label}
//                         </label>
//                         <select
//                           value={value ?? ""}
//                           onChange={(event) => handleChange(key, event.target.value)}
//                           className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                         >
//                           <option value="">Select status</option>
//                           <option value="Active">Active</option>
//                           <option value="Inactive">Inactive</option>
//                         </select>
//                       </div>
//                     );
//                   }

//                   if (key.toLowerCase().includes("email")) {
//                     return (
//                       <div key={key}>
//                         <label className="mb-2 block text-sm font-medium text-slate-700">
//                           {label}
//                         </label>
//                         <input
//                           type="email"
//                           value={value ?? ""}
//                           onChange={(event) => handleChange(key, event.target.value)}
//                           className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                         />
//                       </div>
//                     );
//                   }

//                   if (
//                     key.toLowerCase().includes("date") ||
//                     key.toLowerCase().includes("dob")
//                   ) {
//                     return (
//                       <div key={key}>
//                         <label className="mb-2 block text-sm font-medium text-slate-700">
//                           {label}
//                         </label>
//                         <input
//                           type="date"
//                           value={value ? String(value).slice(0, 10) : ""}
//                           onChange={(event) => handleChange(key, event.target.value)}
//                           className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                         />
//                       </div>
//                     );
//                   }

//                   if (typeof value === "string" && value.length > 120) {
//                     return (
//                       <div key={key} className="md:col-span-2">
//                         <label className="mb-2 block text-sm font-medium text-slate-700">
//                           {label}
//                         </label>
//                         <textarea
//                           rows={4}
//                           value={value}
//                           onChange={(event) => handleChange(key, event.target.value)}
//                           className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                         />
//                       </div>
//                     );
//                   }

//                   return (
//                     <div key={key}>
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         {label}
//                       </label>
//                       <input
//                         type={typeof value === "number" ? "number" : "text"}
//                         value={value ?? ""}
//                         onChange={(event) =>
//                           handleChange(
//                             key,
//                             typeof value === "number"
//                               ? event.target.value === ""
//                                 ? ""
//                                 : Number(event.target.value)
//                               : event.target.value,
//                           )
//                         }
//                         className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                       />
//                     </div>
//                   );
//                 })}
//             </div>
//           </section>

//           {/* Actions */}
//           <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:px-7">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               disabled={saving}
//               className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={saving}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {saving ? (
//                 <>
//                   <Loader2 size={18} className="animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save size={18} />
//                   Save Changes
//                 </>
//               )}
//             </button>
//           </div>
//         </form>

//         {/* Record metadata */}
//         <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
//           <h2 className="mb-4 text-lg font-semibold text-slate-800">Record Information</h2>
//           <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
//             {formData.id !== undefined && (
//               <div>
//                 <p className="text-slate-500">ID</p>
//                 <p className="mt-1 break-all font-medium text-slate-800">
//                   {String(formData.id)}
//                 </p>
//               </div>
//             )}
//             {formData.created_at && (
//               <div>
//                 <p className="text-slate-500">Created At</p>
//                 <p className="mt-1 font-medium text-slate-800">
//                   {new Date(formData.created_at).toLocaleString()}
//                 </p>
//               </div>
//             )}
//             {formData.updated_at && (
//               <div>
//                 <p className="text-slate-500">Updated At</p>
//                 <p className="mt-1 font-medium text-slate-800">
//                   {new Date(formData.updated_at).toLocaleString()}
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Save,
  Loader2,
  User,
  ImagePlus,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const API = String(import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

const IGNORED_FIELDS = [
  "id",
  "created_at",
  "updated_at",
  "face_descriptor",
];

export default function BusinessDataEditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const parts = location.pathname.split("/").filter(Boolean);
  const table = parts[4] || "";
  const id = parts[5] || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [error, setError] = useState("");

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [photoUrlIndex, setPhotoUrlIndex] = useState(0);

  const title = (text: string) =>
    text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const isPhotoField = (key: string) =>
    /photo|image|picture|avatar/i.test(key);

  // Find the existing photo regardless of the exact field name.
  const existingPhoto = useMemo(() => {
    const entry = Object.entries(formData).find(
      ([key, value]) =>
        isPhotoField(key) &&
        typeof value === "string" &&
        value.trim() !== "",
    );

    return entry ? String(entry[1]) : "";
  }, [formData]);

  // Generate possible image URLs from the saved path.
  const photoCandidates = useMemo(() => {
    if (!existingPhoto) return [];

    const raw = existingPhoto.trim();

    if (/^https?:\/\//i.test(raw)) {
      return [raw];
    }

    const normalized = raw.replace(/\\/g, "/");
    const filename = normalized.split("/").filter(Boolean).pop();

    if (!filename || filename === "undefined") return [];

    const candidates = [
      `${API}/api/uploads/${encodeURIComponent(filename)}`,
    ];
    return [...new Set(candidates)];
  }, [existingPhoto]);

  const currentPhotoUrl = photoCandidates[photoUrlIndex] || "";

  useEffect(() => {
    if (!selectedPhoto) {
      setPhotoPreview("");
      return;
    }

    const url = URL.createObjectURL(selectedPhoto);
    setPhotoPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedPhoto]);

  useEffect(() => {
    let cancelled = false;

    const loadRecord = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API}/api/admin/business-data/${encodeURIComponent(table)}/${encodeURIComponent(id)}`,
          { withCredentials: true },
        );

        if (cancelled) return;

        const data = response.data?.data;

        if (!data || typeof data !== "object") {
          throw new Error("The API did not return a valid record.");
        }

        setFormData(data);
        setPhotoUrlIndex(0);
        setSelectedPhoto(null);
      } catch (err: any) {
        if (cancelled) return;

        console.error("Failed to load record:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load record.",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (table && id) {
      loadRecord();
    } else {
      setError("Table name or record ID is missing from the URL.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [table, id]);

  const handleChange = (key: string, value: any) => {
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhotoError("");

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Image size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    setSelectedPhoto(file);
    event.target.value = "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);

      if (selectedPhoto) {
        const payload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          if (IGNORED_FIELDS.includes(key) || isPhotoField(key)) {
            return;
          }

          payload.append(
            key,
            value === null || value === undefined
              ? ""
              : typeof value === "object"
              ? JSON.stringify(value)
              : String(value),
          );
        });

        // Appending the photo file (matches typical backend multer configuration)
        payload.append("profile_photo_file", selectedPhoto);

        await axios.put(
          `${API}/api/admin/business-data/${encodeURIComponent(table)}/${encodeURIComponent(id)}`,
          payload,
          { withCredentials: true },
        );
      } else {
        const payload = { ...formData };
        delete payload.face_descriptor;

        await axios.put(
          `${API}/api/admin/business-data/${encodeURIComponent(table)}/${encodeURIComponent(id)}`,
          payload,
          { withCredentials: true },
        );
      }

      window.alert("Updated successfully.");
      navigate(-1);
    } catch (err: any) {
      console.error("Failed to update record:", err);

      window.alert(
        err.response?.data?.message || "Unable to update record.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 size={36} className="animate-spin text-blue-600" />
        <span className="ml-3 text-slate-600">Loading record...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 p-6">
        <p className="text-center text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border bg-white px-5 py-2 hover:bg-slate-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            aria-label="Go back"
            className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-100 disabled:opacity-50"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Edit {title(table)}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Update record information and profile photo
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Profile photo - interactive upload section */}
          <section className="border-b border-slate-200 p-5 sm:p-7">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800">
                Profile Photo
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View the current photo or choose a replacement.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {photoPreview || currentPhotoUrl ? (
                  <img
                    key={photoPreview || currentPhotoUrl}
                    src={photoPreview || currentPhotoUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={() => {
                      if (!photoPreview && photoUrlIndex < photoCandidates.length - 1) {
                        setPhotoUrlIndex((previous) => previous + 1);
                      }
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <User size={42} />
                    <span className="text-xs">No photo preview</span>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <label
                  htmlFor="profile-photo-upload"
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition ${
                    saving
                      ? "pointer-events-none bg-blue-300"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <ImagePlus size={19} />
                  {selectedPhoto ? "Choose Another Photo" : "Upload Profile Photo"}
                </label>

                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  disabled={saving}
                  onChange={handlePhotoChange}
                  className="sr-only"
                />

                <p className="mt-3 break-all text-sm text-slate-600">
                  {selectedPhoto
                    ? `Selected file: ${selectedPhoto.name}`
                    : existingPhoto
                    ? `Saved value: ${existingPhoto}`
                    : "No existing photo path was returned by the API."}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Image files only · Maximum 5 MB
                </p>

                {selectedPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPhoto(null);
                      setPhotoError("");
                    }}
                    disabled={saving}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    <X size={16} />
                    Remove selected photo
                  </button>
                )}

                {photoError && (
                  <p className="mt-3 text-sm text-red-600">
                    {photoError}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Record fields */}
          <section className="p-5 sm:p-7">
            <h2 className="mb-5 text-lg font-semibold text-slate-800">
              Record Details
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {Object.entries(formData)
                .filter(
                  ([key]) =>
                    !IGNORED_FIELDS.includes(key) &&
                    !isPhotoField(key),
                )
                .map(([key, value]) => {
                  const label = title(key);

                  if (typeof value === "boolean") {
                    return (
                      <div key={key} className="flex items-center gap-3 py-2">
                        <input
                          id={`field-${key}`}
                          type="checkbox"
                          checked={value}
                          onChange={(event) =>
                            handleChange(key, event.target.checked)
                          }
                          className="h-4 w-4 accent-blue-600"
                        />
                        <label
                          htmlFor={`field-${key}`}
                          className="font-medium text-slate-700"
                        >
                          {label}
                        </label>
                      </div>
                    );
                  }

                  if (key.toLowerCase() === "status") {
                    return (
                      <div key={key}>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          {label}
                        </label>
                        <select
                          value={value ?? ""}
                          onChange={(event) =>
                            handleChange(key, event.target.value)
                          }
                          className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="">Select status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    );
                  }

                  if (typeof value === "number") {
                    return (
                      <div key={key}>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          {label}
                        </label>
                        <input
                          type="number"
                          value={value ?? ""}
                          onChange={(event) =>
                            handleChange(key, Number(event.target.value))
                          }
                          className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    );
                  }

                  if (key.toLowerCase().includes("email")) {
                    return (
                      <div key={key}>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          {label}
                        </label>
                        <input
                          type="email"
                          value={value ?? ""}
                          onChange={(event) =>
                            handleChange(key, event.target.value)
                          }
                          className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    );
                  }

                  if (key.includes("date") || key.includes("dob")) {
                    return (
                      <div key={key}>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          {label}
                        </label>
                        <input
                          type="date"
                          value={value ? String(value).substring(0, 10) : ""}
                          onChange={(event) =>
                            handleChange(key, event.target.value)
                          }
                          className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    );
                  }

                  if (typeof value === "string" && value.length > 120) {
                    return (
                      <div key={key} className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          {label}
                        </label>
                        <textarea
                          rows={4}
                          value={value ?? ""}
                          onChange={(event) =>
                            handleChange(key, event.target.value)
                          }
                          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={key}>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={value ?? ""}
                        onChange={(event) =>
                          handleChange(key, event.target.value)
                        }
                        className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  );
                })}
            </div>

            {/* Form actions */}
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={saving}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </section>
        </form>

        {/* Record info section */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-blue-600">
            <User size={20} />
            <h3 className="font-semibold text-slate-800">Record Information</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            {formData.id && (
              <div>
                <p className="text-slate-500">Record ID</p>
                <p className="font-medium text-slate-800">{formData.id}</p>
              </div>
            )}
            {formData.created_at && (
              <div>
                <p className="text-slate-500">Created At</p>
                <p className="font-medium text-slate-800">
                  {new Date(formData.created_at).toLocaleString()}
                </p>
              </div>
            )}
            {formData.updated_at && (
              <div>
                <p className="text-slate-500">Updated At</p>
                <p className="font-medium text-slate-800">
                  {new Date(formData.updated_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}