// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   AlertCircle,
//   Edit,
//   Eye,
//   EyeOff,
//   Plus,
//   Trash2,
//   X,
// } from "lucide-react";

// type Information = {
//   id: number;
//   title: string;
//   description: string;
//   status: "published" | "draft";
//   created_at: string;
//   updated_at: string;
// };

// const API = import.meta.env.VITE_BACKEND_URL;

// const ImportantInformation = () => {
//   const [information, setInformation] = useState<
//     Information[]
//   >([]);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [showModal, setShowModal] = useState(false);

//   const [editingId, setEditingId] =
//     useState<number | null>(null);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] =
//     useState("");

//   const [status, setStatus] = useState<
//     "published" | "draft"
//   >("published");

//   /*
//   |--------------------------------------------------------------------------
//   | FETCH
//   |--------------------------------------------------------------------------
//   */

//   const fetchInformation = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `${API}/api/admin/important-information`,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data?.success) {
//         setInformation(response.data.data || []);
//       }
//     } catch (error) {
//       console.error(
//         "Failed to fetch important information:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInformation();
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | RESET
//   |--------------------------------------------------------------------------
//   */

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setStatus("published");
//     setEditingId(null);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | OPEN CREATE
//   |--------------------------------------------------------------------------
//   */

//   const openCreate = () => {
//     resetForm();
//     setShowModal(true);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | OPEN EDIT
//   |--------------------------------------------------------------------------
//   */

//   const openEdit = (item: Information) => {
//     setEditingId(item.id);
//     setTitle(item.title);
//     setDescription(item.description);
//     setStatus(item.status);
//     setShowModal(true);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | CLOSE
//   |--------------------------------------------------------------------------
//   */

//   const closeModal = () => {
//     if (saving) return;

//     setShowModal(false);
//     resetForm();
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | SAVE
//   |--------------------------------------------------------------------------
//   */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert("Please enter title");
//       return;
//     }

//     if (!description.trim()) {
//       alert("Please enter description");
//       return;
//     }

//     try {
//       setSaving(true);

//       if (editingId) {
//         await axios.put(
//           `${API}/api/admin/important-information/${editingId}`,
//           {
//             title,
//             description,
//             status,
//           },
//           {
//             withCredentials: true,
//           }
//         );
//       } else {
//         await axios.post(
//           `${API}/api/admin/important-information`,
//           {
//             title,
//             description,
//             status,
//           },
//           {
//             withCredentials: true,
//           }
//         );
//       }

//       setShowModal(false);
//       resetForm();

//       await fetchInformation();
//     } catch (error: any) {
//       console.error(
//         "Failed to save important information:",
//         error
//       );

//       alert(
//         error?.response?.data?.message ||
//           "Failed to save important information"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | TOGGLE
//   |--------------------------------------------------------------------------
//   */

//   const toggleStatus = async (
//     item: Information
//   ) => {
//     try {
//       await axios.patch(
//         `${API}/api/admin/important-information/${item.id}/toggle-status`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );

//       await fetchInformation();
//     } catch (error: any) {
//       console.error(
//         "Failed to change status:",
//         error
//       );

//       alert(
//         error?.response?.data?.message ||
//           "Failed to change status"
//       );
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | DELETE
//   |--------------------------------------------------------------------------
//   */

//   const handleDelete = async (
//     id: number
//   ) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this information?"
//     );

//     if (!confirmed) return;

//     try {
//       await axios.delete(
//         `${API}/api/admin/important-information/${id}`,
//         {
//           withCredentials: true,
//         }
//       );

//       await fetchInformation();
//     } catch (error: any) {
//       console.error(
//         "Failed to delete information:",
//         error
//       );

//       alert(
//         error?.response?.data?.message ||
//           "Failed to delete information"
//       );
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | DATE
//   |--------------------------------------------------------------------------
//   */

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
//       <div className="mx-auto max-w-[1500px]">
//         {/* HEADER */}

//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800">
//               Important Information
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Manage important information visible to
//               apartment members.
//             </p>
//           </div>

//           <button
//             onClick={openCreate}
//             className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
//           >
//             <Plus size={18} />
//             Add Information
//           </button>
//         </div>

//         {/* LIST */}

//         <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
//           {loading ? (
//             <div className="p-10 text-center text-slate-500">
//               Loading important information...
//             </div>
//           ) : information.length === 0 ? (
//             <div className="flex flex-col items-center justify-center p-16 text-center">
//               <AlertCircle
//                 size={42}
//                 className="mb-4 text-slate-300"
//               />

//               <h3 className="text-lg font-semibold text-slate-700">
//                 No important information
//               </h3>

//               <p className="mt-1 text-sm text-slate-500">
//                 Add information that should be visible
//                 to apartment members.
//               </p>

//               <button
//                 onClick={openCreate}
//                 className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
//               >
//                 <Plus size={16} />
//                 Add Information
//               </button>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-100">
//               {information.map((item) => (
//                 <div
//                   key={item.id}
//                   className="p-6 transition hover:bg-slate-50"
//                 >
//                   <div className="flex items-start justify-between gap-6">
//                     <div className="min-w-0 flex-1">
//                       <div className="mb-2 flex items-center gap-3">
//                         <h2 className="text-lg font-semibold text-slate-800">
//                           {item.title}
//                         </h2>

//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                             item.status ===
//                             "published"
//                               ? "bg-emerald-100 text-emerald-700"
//                               : "bg-amber-100 text-amber-700"
//                           }`}
//                         >
//                           {item.status ===
//                           "published"
//                             ? "Published"
//                             : "Draft"}
//                         </span>
//                       </div>

//                       <p className="max-w-4xl whitespace-pre-line text-sm leading-6 text-slate-600">
//                         {item.description}
//                       </p>

//                       <p className="mt-3 text-xs text-slate-400">
//                         Created{" "}
//                         {formatDate(
//                           item.created_at
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex shrink-0 items-center gap-2">
//                       <button
//                         onClick={() =>
//                           toggleStatus(item)
//                         }
//                         title={
//                           item.status ===
//                           "published"
//                             ? "Unpublish"
//                             : "Publish"
//                         }
//                         className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
//                       >
//                         {item.status ===
//                         "published" ? (
//                           <EyeOff size={17} />
//                         ) : (
//                           <Eye size={17} />
//                         )}
//                       </button>

//                       <button
//                         onClick={() =>
//                           openEdit(item)
//                         }
//                         title="Edit"
//                         className="rounded-lg border border-slate-200 p-2 text-blue-600 hover:bg-blue-50"
//                       >
//                         <Edit size={17} />
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleDelete(item.id)
//                         }
//                         title="Delete"
//                         className="rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50"
//                       >
//                         <Trash2 size={17} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* MODAL */}

//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
//             {/* MODAL HEADER */}

//             <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
//               <div>
//                 <h2 className="text-xl font-bold text-slate-800">
//                   {editingId
//                     ? "Edit Important Information"
//                     : "Add Important Information"}
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   This information will be visible to
//                   members of your organisation.
//                 </p>
//               </div>

//               <button
//                 onClick={closeModal}
//                 className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* FORM */}

//             <form
//               onSubmit={handleSubmit}
//               className="space-y-5 p-6"
//             >
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Title
//                 </label>

//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) =>
//                     setTitle(e.target.value)
//                   }
//                   placeholder="Enter information title"
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Description
//                 </label>

//                 <textarea
//                   value={description}
//                   onChange={(e) =>
//                     setDescription(
//                       e.target.value
//                     )
//                   }
//                   rows={5}
//                   placeholder="Enter important information..."
//                   className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-slate-700">
//                   Status
//                 </label>

//                 <select
//                   value={status}
//                   onChange={(e) =>
//                     setStatus(
//                       e.target.value as
//                         | "published"
//                         | "draft"
//                     )
//                   }
//                   className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
//                 >
//                   <option value="published">
//                     Published
//                   </option>

//                   <option value="draft">
//                     Draft
//                   </option>
//                 </select>
//               </div>

//               {/* BUTTONS */}

//               <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   disabled={saving}
//                   className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {saving
//                     ? "Saving..."
//                     : editingId
//                     ? "Update Information"
//                     : "Add Information"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImportantInformation;
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   AlertCircle,
// //   Edit,
// //   Eye,
// //   EyeOff,
// //   Plus,
// //   Trash2,
// //   X,
// // } from "lucide-react";

// // type Information = {
// //   id: number;
// //   title: string;
// //   description: string;
// //   status: "published" | "draft";
// //   created_at: string;
// //   updated_at: string;
// // };

// // const API = import.meta.env.VITE_BACKEND_URL;

// // const ImportantInformation = () => {
// //   const [information, setInformation] = useState<
// //     Information[]
// //   >([]);

// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   const [showModal, setShowModal] = useState(false);

// //   const [editingId, setEditingId] =
// //     useState<number | null>(null);

// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] =
// //     useState("");

// //   const [status, setStatus] = useState<
// //     "published" | "draft"
// //   >("published");

// //   /*
// //   |--------------------------------------------------------------------------
// //   | FETCH
// //   |--------------------------------------------------------------------------
// //   */

// //   const fetchInformation = async () => {
// //     try {
// //       setLoading(true);

// //       const response = await axios.get(
// //         `${API}/api/admin/important-information`,
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       if (response.data?.success) {
// //         setInformation(response.data.data || []);
// //       }
// //     } catch (error) {
// //       console.error(
// //         "Failed to fetch important information:",
// //         error
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchInformation();
// //   }, []);

// //   /*
// //   |--------------------------------------------------------------------------
// //   | RESET
// //   |--------------------------------------------------------------------------
// //   */

// //   const resetForm = () => {
// //     setTitle("");
// //     setDescription("");
// //     setStatus("published");
// //     setEditingId(null);
// //   };

// //   /*
// //   |--------------------------------------------------------------------------
// //   | OPEN CREATE
// //   |--------------------------------------------------------------------------
// //   */

// //   const openCreate = () => {
// //     resetForm();
// //     setShowModal(true);
// //   };

// //   /*
// //   |--------------------------------------------------------------------------
// //   | OPEN EDIT
// //   |--------------------------------------------------------------------------
// //   */

// //   const openEdit = (item: Information) => {
// //     setEditingId(item.id);
// //     setTitle(item.title);
// //     setDescription(item.description);
// //     setStatus(item.status);
// //     setShowModal(true);
// //   };

// //   /*
// //   |--------------------------------------------------------------------------
// //   | CLOSE
// //   |--------------------------------------------------------------------------
// //   */

// //   const closeModal = () => {
// //     if (saving) return;

// //     setShowModal(false);
// //     resetForm();
// //   };

// //   /*
// //   |--------------------------------------------------------------------------
// //   | SAVE
// //   |--------------------------------------------------------------------------
// //   */

// //   const handleSubmit = async (
// //     e: React.FormEvent
// //   ) => {
// //     e.preventDefault();

// //     if (!title.trim()) {
// //       alert("Please enter title");
// //       return;
// //     }

// //     if (!description.trim()) {
// //       alert("Please enter description");
// //       return;
// //     }

// //     try {
// //       setSaving(true);

// //       if (editingId) {
// //         await axios.put(
// //           `${API}/api/admin/important-information/${editingId}`,
// //           {
// //             title,
// //             description,
// //             status,
// //           },
// //           {
// //             withCredentials: true,
// //           }
// //         );
// //       } else {
// //         await axios.post(
// //           `${API}/api/admin/important-information`,
// //           {
// //             title,
// //             description,
// //             status,
// //           },
// //           {
// //             withCredentials: true,
// //           }
// //         );
// //       }

// //       setShowModal(false);
// //       resetForm();

// //       await fetchInformation();
// //     } catch (error: any) {
// //       console.error(
// //         "Failed to save important information:",
// //         error
// //       );

// //       alert(
// //         error?.response?.data?.message ||
// //           "Failed to save important information"
// //       );
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /*
// //   |--------------------------------------------------------------------------
// //   | TOGGLE
// //   |--------------------------------------------------------------------------
// //   */

// //   const toggleStatus = async (
// //     item: Information
// //   ) => {
// //     try {
// //       await axios.patch(
// //         `${API}/api/admin/important-information/${item.id}/toggle-status`,
// //         {},
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       await fetchInformation();
// //     } catch (error: any) {
// //       console.error(
// //         "Failed to change status:",
// //         error
// //       );

// //       alert(
// //         error?.response?.data?.message ||
// //           "Failed to change status"
// //       );
// //     }
// //   };

// //   /*
// //   |--------------------------------------------------------------------------
// //   | DELETE
// //   |--------------------------------------------------------------------------
// //   */

// //   const handleDelete = async (
// //     id: number
// //   ) => {
// //     const confirmed = window.confirm(
// //       "Are you sure you want to delete this information?"
// //     );

// //     if (!confirmed) return;

// //     try {
// //       await axios.delete(
// //         `${API}/api/admin/important-information/${id}`,
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       await fetchInformation();
// //     } catch (error: any) {
// //       console.error(
// //         "Failed to delete information:",
// //         error
// //       );

// //       alert(
// //         error?.response?.data?.message ||
// //           "Failed to delete information"
// //       );
// //     }
// //   };

// //   /*
// //   |--------------------------------------------------------------------------
// //   | DATE
// //   |--------------------------------------------------------------------------
// //   */

// //   const formatDate = (date: string) => {
// //     return new Date(date).toLocaleDateString(
// //       "en-IN",
// //       {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //       }
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
// //       <div className="mx-auto max-w-[1500px]">
// //         {/* HEADER */}

// //         <div className="mb-8 flex items-center justify-between">
// //           <div>
// //             <h1 className="text-2xl font-bold text-slate-800">
// //               Important Information
// //             </h1>

// //             <p className="mt-1 text-sm text-slate-500">
// //               Manage important information visible to
// //               apartment members.
// //             </p>
// //           </div>

// //           <button
// //             onClick={openCreate}
// //             className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
// //           >
// //             <Plus size={18} />
// //             Add Information
// //           </button>
// //         </div>

// //         {/* LIST */}

// //         <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
// //           {loading ? (
// //             <div className="p-10 text-center text-slate-500">
// //               Loading important information...
// //             </div>
// //           ) : information.length === 0 ? (
// //             <div className="flex flex-col items-center justify-center p-16 text-center">
// //               <AlertCircle
// //                 size={42}
// //                 className="mb-4 text-slate-300"
// //               />

// //               <h3 className="text-lg font-semibold text-slate-700">
// //                 No important information
// //               </h3>

// //               <p className="mt-1 text-sm text-slate-500">
// //                 Add information that should be visible
// //                 to apartment members.
// //               </p>

// //               <button
// //                 onClick={openCreate}
// //                 className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
// //               >
// //                 <Plus size={16} />
// //                 Add Information
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="divide-y divide-slate-100">
// //               {information.map((item) => (
// //                 <div
// //                   key={item.id}
// //                   className="p-6 transition hover:bg-slate-50"
// //                 >
// //                   <div className="flex items-start justify-between gap-6">
// //                     <div className="min-w-0 flex-1">
// //                       <div className="mb-2 flex items-center gap-3">
// //                         <h2 className="text-lg font-semibold text-slate-800">
// //                           {item.title}
// //                         </h2>

// //                         <span
// //                           className={`rounded-full px-3 py-1 text-xs font-semibold ${
// //                             item.status ===
// //                             "published"
// //                               ? "bg-emerald-100 text-emerald-700"
// //                               : "bg-amber-100 text-amber-700"
// //                           }`}
// //                         >
// //                           {item.status ===
// //                           "published"
// //                             ? "Published"
// //                             : "Draft"}
// //                         </span>
// //                       </div>

// //                       <p className="max-w-4xl whitespace-pre-line text-sm leading-6 text-slate-600">
// //                         {item.description}
// //                       </p>

// //                       <p className="mt-3 text-xs text-slate-400">
// //                         Created{" "}
// //                         {formatDate(
// //                           item.created_at
// //                         )}
// //                       </p>
// //                     </div>

// //                     <div className="flex shrink-0 items-center gap-2">
// //                       <button
// //                         onClick={() =>
// //                           toggleStatus(item)
// //                         }
// //                         title={
// //                           item.status ===
// //                           "published"
// //                             ? "Unpublish"
// //                             : "Publish"
// //                         }
// //                         className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
// //                       >
// //                         {item.status ===
// //                         "published" ? (
// //                           <EyeOff size={17} />
// //                         ) : (
// //                           <Eye size={17} />
// //                         )}
// //                       </button>

// //                       <button
// //                         onClick={() =>
// //                           openEdit(item)
// //                         }
// //                         title="Edit"
// //                         className="rounded-lg border border-slate-200 p-2 text-blue-600 hover:bg-blue-50"
// //                       >
// //                         <Edit size={17} />
// //                       </button>

// //                       <button
// //                         onClick={() =>
// //                           handleDelete(item.id)
// //                         }
// //                         title="Delete"
// //                         className="rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50"
// //                       >
// //                         <Trash2 size={17} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* MODAL */}

// //       {showModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
// //           <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
// //             {/* MODAL HEADER */}

// //             <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
// //               <div>
// //                 <h2 className="text-xl font-bold text-slate-800">
// //                   {editingId
// //                     ? "Edit Important Information"
// //                     : "Add Important Information"}
// //                 </h2>

// //                 <p className="mt-1 text-sm text-slate-500">
// //                   This information will be visible to
// //                   members of your organisation.
// //                 </p>
// //               </div>

// //               <button
// //                 onClick={closeModal}
// //                 className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
// //               >
// //                 <X size={20} />
// //               </button>
// //             </div>

// //             {/* FORM */}

// //             <form
// //               onSubmit={handleSubmit}
// //               className="space-y-5 p-6"
// //             >
// //               <div>
// //                 <label className="mb-2 block text-sm font-semibold text-slate-700">
// //                   Title
// //                 </label>

// //                 <input
// //                   type="text"
// //                   value={title}
// //                   onChange={(e) =>
// //                     setTitle(e.target.value)
// //                   }
// //                   placeholder="Enter information title"
// //                   className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="mb-2 block text-sm font-semibold text-slate-700">
// //                   Description
// //                 </label>

// //                 <textarea
// //                   value={description}
// //                   onChange={(e) =>
// //                     setDescription(
// //                       e.target.value
// //                     )
// //                   }
// //                   rows={5}
// //                   placeholder="Enter important information..."
// //                   className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="mb-2 block text-sm font-semibold text-slate-700">
// //                   Status
// //                 </label>

// //                 <select
// //                   value={status}
// //                   onChange={(e) =>
// //                     setStatus(
// //                       e.target.value as
// //                         | "published"
// //                         | "draft"
// //                     )
// //                   }
// //                   className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
// //                 >
// //                   <option value="published">
// //                     Published
// //                   </option>

// //                   <option value="draft">
// //                     Draft
// //                   </option>
// //                 </select>
// //               </div>

// //               {/* BUTTONS */}

// //               <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
// //                 <button
// //                   type="button"
// //                   onClick={closeModal}
// //                   disabled={saving}
// //                   className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
// //                 >
// //                   Cancel
// //                 </button>

// //                 <button
// //                   type="submit"
// //                   disabled={saving}
// //                   className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
// //                 >
// //                   {saving
// //                     ? "Saving..."
// //                     : editingId
// //                     ? "Update Information"
// //                     : "Add Information"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ImportantInformation;
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import {
//   AlertCircle,
//   AlignCenter,
//   AlignJustify,
//   AlignLeft,
//   AlignRight,
//   Bold,
//   CheckCircle2,
//   Edit,
//   ImagePlus,
//   Italic,
//   Link,
//   List,
//   ListOrdered,
//   Plus,
//   Redo2,
//   Trash2,
//   Underline,
//   Undo2,
//   X,
// } from "lucide-react";

// type Information = {
//   id: number;
//   title: string;
//   description: string;
//   created_at: string;
//   updated_at: string;
//   status?: "published" | "draft";
// };

// type PopupType = "success" | "error" | "warning" | "confirm";

// type PopupState = {
//   show: boolean;
//   type: PopupType;
//   title: string;
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
//   onConfirm?: () => void;
// };

// const API = import.meta.env.VITE_BACKEND_URL;

// const ImportantInformation = () => {
//   const [information, setInformation] = useState<Information[]>(
//     []
//   );

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   const [showModal, setShowModal] = useState(false);

//   const [editingId, setEditingId] = useState<number | null>(
//     null
//   );

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [titleError, setTitleError] = useState("");
//   const [descriptionError, setDescriptionError] = useState("");

//   const [fontFamily, setFontFamily] = useState("Arial");
//   const [fontSize, setFontSize] = useState("16px");
//   const [fontColor, setFontColor] = useState("#1e293b");

//   const editorRef = useRef<HTMLDivElement | null>(null);
//   const imageInputRef = useRef<HTMLInputElement | null>(null);

//   /*
//   |--------------------------------------------------------------------------
//   | COMMON POPUP
//   |--------------------------------------------------------------------------
//   */

//   const [popup, setPopup] = useState<PopupState>({
//     show: false,
//     type: "success",
//     title: "",
//     message: "",
//   });

//   const showPopup = (
//     type: PopupType,
//     title: string,
//     message: string,
//     options?: {
//       confirmText?: string;
//       cancelText?: string;
//       onConfirm?: () => void;
//     }
//   ) => {
//     setPopup({
//       show: true,
//       type,
//       title,
//       message,
//       confirmText: options?.confirmText,
//       cancelText: options?.cancelText,
//       onConfirm: options?.onConfirm,
//     });
//   };

//   const closePopup = () => {
//     setPopup((prev) => ({
//       ...prev,
//       show: false,
//     }));
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | FONT SIZE OPTIONS
//   |--------------------------------------------------------------------------
//   */

//   const fontSizes = [
//     "8px",
//     "10px",
//     "12px",
//     "14px",
//     "16px",
//     "18px",
//     "20px",
//     "22px",
//     "24px",
//     "26px",
//     "28px",
//     "30px",
//     "32px",
//     "36px",
//     "40px",
//     "44px",
//     "48px",
//   ];

//   /*
//   |--------------------------------------------------------------------------
//   | FETCH
//   |--------------------------------------------------------------------------
//   */

//   const fetchInformation = async (
//     showErrorPopup = true
//   ) => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `${API}/api/admin/important-information`,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data?.success) {
//         setInformation(response.data.data || []);
//       } else if (showErrorPopup) {
//         showPopup(
//           "error",
//           "Unable to Load",
//           response.data?.message ||
//             "Unable to load important information."
//         );
//       }
//     } catch (error: any) {
//       console.error(
//         "Failed to fetch important information:",
//         error
//       );

//       if (showErrorPopup) {
//         showPopup(
//           "error",
//           "Unable to Load",
//           error?.response?.data?.message ||
//             error?.response?.data?.error ||
//             "Failed to fetch important information."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInformation();
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | RESET FORM
//   |--------------------------------------------------------------------------
//   */

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");

//     setTitleError("");
//     setDescriptionError("");

//     setEditingId(null);

//     setFontFamily("Arial");
//     setFontSize("16px");
//     setFontColor("#1e293b");

//     if (editorRef.current) {
//       editorRef.current.innerHTML = "";
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | CREATE
//   |--------------------------------------------------------------------------
//   */

//   const openCreate = () => {
//     resetForm();
//     setShowModal(true);

//     setTimeout(() => {
//       if (editorRef.current) {
//         editorRef.current.innerHTML = "";
//         editorRef.current.focus();
//       }
//     }, 0);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | EDIT
//   |--------------------------------------------------------------------------
//   */

//   const openEdit = (item: Information) => {
//     setEditingId(item.id);

//     setTitle(item.title);
//     setDescription(item.description || "");

//     setTitleError("");
//     setDescriptionError("");

//     setShowModal(true);

//     setTimeout(() => {
//       if (editorRef.current) {
//         editorRef.current.innerHTML =
//           item.description || "";
//       }
//     }, 0);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | CLOSE MODAL
//   |--------------------------------------------------------------------------
//   */

//   const closeModal = () => {
//     if (saving || uploadingImage) return;

//     setShowModal(false);
//     resetForm();
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | SYNC EDITOR
//   |--------------------------------------------------------------------------
//   */

//   const syncDescription = () => {
//     if (!editorRef.current) return;

//     setDescription(editorRef.current.innerHTML);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | EXECUTE BASIC EDITOR COMMAND
//   |--------------------------------------------------------------------------
//   */

//   const execEditorCommand = (
//     command: string,
//     value?: string
//   ) => {
//     if (!editorRef.current) return;

//     editorRef.current.focus();

//     document.execCommand(
//       command,
//       false,
//       value
//     );

//     syncDescription();
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | FONT FAMILY
//   |--------------------------------------------------------------------------
//   */

//   const handleFontFamily = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const value = e.target.value;

//     setFontFamily(value);

//     execEditorCommand(
//       "fontName",
//       value
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | FONT SIZE - ACTUAL PX
//   |--------------------------------------------------------------------------
//   */

//   const applyFontSize = (size: string) => {
//     if (!editorRef.current) return;

//     editorRef.current.focus();

//     const selection =
//       window.getSelection();

//     if (
//       !selection ||
//       selection.rangeCount === 0
//     ) {
//       return;
//     }

//     const range =
//       selection.getRangeAt(0);

//     if (range.collapsed) {
//       return;
//     }

//     const span =
//       document.createElement("span");

//     span.style.fontSize = size;

//     try {
//       range.surroundContents(span);
//     } catch {
//       const fragment =
//         range.extractContents();

//       span.appendChild(fragment);

//       range.insertNode(span);
//     }

//     selection.removeAllRanges();

//     const newRange =
//       document.createRange();

//     newRange.selectNodeContents(span);

//     selection.addRange(newRange);

//     syncDescription();
//   };

//   const handleFontSize = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const value = e.target.value;

//     setFontSize(value);

//     applyFontSize(value);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | FONT COLOR
//   |--------------------------------------------------------------------------
//   */

//   const handleFontColor = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const value = e.target.value;

//     setFontColor(value);

//     execEditorCommand(
//       "foreColor",
//       value
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | IMAGE UPLOAD
//   |--------------------------------------------------------------------------
//   */

//   const handleImageButton = () => {
//     imageInputRef.current?.click();
//   };

//   const handleImageUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file =
//       e.target.files?.[0];

//     if (!file) return;

//     const allowedTypes = [
//       "image/png",
//       "image/jpeg",
//       "image/jpg",
//       "image/gif",
//       "image/webp",
//     ];

//     if (
//       !allowedTypes.includes(
//         file.type
//       )
//     ) {
//       showPopup(
//         "error",
//         "Invalid Image",
//         "Please upload a PNG, JPG, GIF or WebP image."
//       );

//       e.target.value = "";
//       return;
//     }

//     const maxSize =
//       8 * 1024 * 1024;

//     if (file.size > maxSize) {
//       showPopup(
//         "error",
//         "Image Too Large",
//         "Image size must be less than 8 MB."
//       );

//       e.target.value = "";
//       return;
//     }

//     try {
//       setUploadingImage(true);

//       const formData =
//         new FormData();

//       formData.append(
//         "image",
//         file
//       );

//       const response =
//         await axios.post(
//           `${API}/api/upload/image`,
//           formData,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type":
//                 "multipart/form-data",
//             },
//           }
//         );

//       const imageUrl =
//         response.data?.url ||
//         response.data?.imageUrl ||
//         response.data?.image_url ||
//         response.data?.data?.url ||
//         response.data?.data?.imageUrl ||
//         response.data?.data?.image_url;

//       if (!imageUrl) {
//         throw new Error(
//           response.data?.message ||
//             "Image URL was not returned by the server."
//         );
//       }

//       if (!editorRef.current) {
//         return;
//       }

//       editorRef.current.focus();

//       document.execCommand(
//         "insertImage",
//         false,
//         imageUrl
//       );

//       syncDescription();

//       showPopup(
//         "success",
//         "Image Added",
//         response.data?.message ||
//           "Image/banner has been added successfully."
//       );
//     } catch (error: any) {
//       console.error(
//         "Image upload failed:",
//         error
//       );

//       showPopup(
//         "error",
//         "Image Upload Failed",
//         error?.response?.data?.message ||
//           error?.response?.data?.error ||
//           error?.message ||
//           "Failed to upload image."
//       );
//     } finally {
//       setUploadingImage(false);

//       e.target.value = "";
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | PLAIN TEXT FROM HTML
//   |--------------------------------------------------------------------------
//   */

//   const getPlainText = (
//     html: string
//   ) => {
//     const temp =
//       document.createElement(
//         "div"
//       );

//     temp.innerHTML = html;

//     return (
//       temp.textContent ||
//       temp.innerText ||
//       ""
//     )
//       .replace(
//         /\u00a0/g,
//         " "
//       )
//       .trim();
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | VALIDATION
//   |--------------------------------------------------------------------------
//   */

//   const validateForm = () => {
//     let valid = true;

//     setTitleError("");
//     setDescriptionError("");

//     const trimmedTitle =
//       title.trim();

//     const currentDescription =
//       editorRef.current?.innerHTML ||
//       description ||
//       "";

//     const plainDescription =
//       getPlainText(
//         currentDescription
//       );

//     const hasImage =
//       currentDescription.includes(
//         "<img"
//       );

//     /*
//     | TITLE
//     */

//     if (!trimmedTitle) {
//       setTitleError(
//         "Title is required."
//       );

//       valid = false;
//     } else if (
//       trimmedTitle.length < 3
//     ) {
//       setTitleError(
//         "Title must contain at least 3 characters."
//       );

//       valid = false;
//     }

//     /*
//     | DESCRIPTION
//     */

//     if (
//       !plainDescription &&
//       !hasImage
//     ) {
//       setDescriptionError(
//         "Description is required."
//       );

//       valid = false;
//     } else if (
//       plainDescription.length > 0 &&
//       plainDescription.length < 3 &&
//       !hasImage
//     ) {
//       setDescriptionError(
//         "Description must contain at least 3 characters."
//       );

//       valid = false;
//     }

//     return valid;
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | SUBMIT
//   |--------------------------------------------------------------------------
//   */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     syncDescription();

//     if (!validateForm()) {
//       showPopup(
//         "warning",
//         "Validation Error",
//         "Please fill in all required fields correctly."
//       );

//       return;
//     }

//     const finalDescription =
//       editorRef.current?.innerHTML ||
//       description;

//     const currentEditingId =
//       editingId;

//     try {
//       setSaving(true);

//       let response;

//       /*
//       | UPDATE
//       */

//       if (currentEditingId) {
//         response =
//           await axios.put(
//             `${API}/api/admin/important-information/${currentEditingId}`,
//             {
//               title: title.trim(),
//               description:
//                 finalDescription,
//             },
//             {
//               withCredentials: true,
//             }
//           );
//       }

//       /*
//       | CREATE
//       */

//       else {
//         response =
//           await axios.post(
//             `${API}/api/admin/important-information`,
//             {
//               title: title.trim(),
//               description:
//                 finalDescription,
//             },
//             {
//               withCredentials: true,
//             }
//           );
//       }

//       /*
//       | CLOSE FORM
//       */

//       setShowModal(false);
//       resetForm();

//       /*
//       | REFRESH WITHOUT ANOTHER POPUP
//       */

//       await fetchInformation(
//         false
//       );

//       /*
//       | SHOW ACTUAL API MESSAGE
//       */

//       showPopup(
//         "success",
//         currentEditingId
//           ? "Information Updated"
//           : "Information Added",
//         response.data?.message ||
//           (currentEditingId
//             ? "Important information updated successfully."
//             : "Important information added successfully.")
//       );
//     } catch (error: any) {
//       console.error(
//         "Failed to save important information:",
//         error
//       );

//       showPopup(
//         "error",
//         "Save Failed",
//         error?.response?.data?.message ||
//           error?.response?.data?.error ||
//           "Failed to save important information."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | DELETE
//   |--------------------------------------------------------------------------
//   */

//   const performDelete = async (
//     id: number
//   ) => {
//     try {
//       const response =
//         await axios.delete(
//           `${API}/api/admin/important-information/${id}`,
//           {
//             withCredentials: true,
//           }
//         );

//       /*
//       | REFRESH WITHOUT SHOWING FETCH POPUP
//       */

//       await fetchInformation(
//         false
//       );

//       /*
//       | ACTUAL API MESSAGE
//       */

//       showPopup(
//         "success",
//         "Information Deleted",
//         response.data?.message ||
//           "Important information deleted successfully."
//       );
//     } catch (error: any) {
//       console.error(
//         "Failed to delete information:",
//         error
//       );

//       showPopup(
//         "error",
//         "Delete Failed",
//         error?.response?.data?.message ||
//           error?.response?.data?.error ||
//           "Failed to delete important information."
//       );
//     }
//   };

//   const handleDelete = (
//     id: number
//   ) => {
//     showPopup(
//       "confirm",
//       "Delete Information?",
//       "Are you sure you want to delete this important information? This action cannot be undone.",
//       {
//         confirmText: "Delete",
//         cancelText: "Cancel",

//         onConfirm: () => {
//           closePopup();
//           performDelete(id);
//         },
//       }
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | DATE
//   |--------------------------------------------------------------------------
//   */

//   const formatDate = (
//     date: string
//   ) => {
//     if (!date) return "-";

//     return new Date(
//       date
//     ).toLocaleDateString(
//       "en-IN",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | POPUP THEME
//   |--------------------------------------------------------------------------
//   */

//   const popupConfig = {
//     success: {
//       icon: (
//         <CheckCircle2
//           size={27}
//           className="text-emerald-600"
//         />
//       ),
//       iconBg:
//         "bg-emerald-100",
//       button:
//         "bg-emerald-600 hover:bg-emerald-700",
//     },

//     error: {
//       icon: (
//         <AlertCircle
//           size={27}
//           className="text-red-600"
//         />
//       ),
//       iconBg:
//         "bg-red-100",
//       button:
//         "bg-red-600 hover:bg-red-700",
//     },

//     warning: {
//       icon: (
//         <AlertCircle
//           size={27}
//           className="text-amber-600"
//         />
//       ),
//       iconBg:
//         "bg-amber-100",
//       button:
//         "bg-amber-600 hover:bg-amber-700",
//     },

//     confirm: {
//       icon: (
//         <Trash2
//           size={27}
//           className="text-red-600"
//         />
//       ),
//       iconBg:
//         "bg-red-100",
//       button:
//         "bg-red-600 hover:bg-red-700",
//     },
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | RENDER
//   |--------------------------------------------------------------------------
//   */

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
//       <div className="mx-auto max-w-[1500px]">

//         {/* ================================================================ */}
//         {/* HEADER */}
//         {/* ================================================================ */}

//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800">
//               Important Information
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Manage important information visible to
//               apartment members.
//             </p>
//           </div>

//           <button
//             onClick={openCreate}
//             className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
//           >
//             <Plus size={18} />
//             Add Information
//           </button>
//         </div>

//         {/* ================================================================ */}
//         {/* LIST */}
//         {/* ================================================================ */}

//         <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
//           {loading ? (
//             <div className="p-10 text-center text-slate-500">
//               Loading important information...
//             </div>
//           ) : information.length === 0 ? (
//             <div className="flex flex-col items-center justify-center p-16 text-center">
//               <AlertCircle
//                 size={42}
//                 className="mb-4 text-slate-300"
//               />

//               <h3 className="text-lg font-semibold text-slate-700">
//                 No important information
//               </h3>

//               <p className="mt-1 text-sm text-slate-500">
//                 Add information that should be visible
//                 to apartment members.
//               </p>

//               <button
//                 onClick={openCreate}
//                 className="mt-5 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
//               >
//                 <Plus size={16} />
//                 Add Information
//               </button>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-100">
//               {information.map(
//                 (item) => (
//                   <div
//                     key={item.id}
//                     className="p-6 transition hover:bg-slate-50"
//                   >
//                     <div className="flex items-start justify-between gap-6">
//                       <div className="min-w-0 flex-1">
//                         <h2 className="mb-2 text-lg font-semibold text-slate-800">
//                           {item.title}
//                         </h2>

//                         <div
//                           className="max-w-5xl text-sm leading-6 text-slate-600"
//                           dangerouslySetInnerHTML={{
//                             __html:
//                               item.description ||
//                               "",
//                           }}
//                         />

//                         <p className="mt-3 text-xs text-slate-400">
//                           Created{" "}
//                           {formatDate(
//                             item.created_at
//                           )}
//                         </p>
//                       </div>

//                       <div className="flex shrink-0 items-center gap-2">
//                         <button
//                           onClick={() =>
//                             openEdit(
//                               item
//                             )
//                           }
//                           title="Edit"
//                           className="rounded-lg border border-slate-200 p-2 text-blue-600 transition hover:bg-blue-50"
//                         >
//                           <Edit
//                             size={17}
//                           />
//                         </button>

//                         <button
//                           onClick={() =>
//                             handleDelete(
//                               item.id
//                             )
//                           }
//                           title="Delete"
//                           className="rounded-lg border border-slate-200 p-2 text-red-600 transition hover:bg-red-50"
//                         >
//                           <Trash2
//                             size={17}
//                           />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================================================================== */}
//       {/* ADD / EDIT MODAL */}
//       {/* ================================================================== */}

//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
//           <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">

//             {/* MODAL HEADER */}

//             <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
//               <div>
//                 <h2 className="text-xl font-bold text-slate-800">
//                   {editingId
//                     ? "Edit Important Information"
//                     : "Add Important Information"}
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Format the information with custom
//                   fonts, colors and images.
//                 </p>
//               </div>

//               <button
//                 onClick={closeModal}
//                 disabled={
//                   saving ||
//                   uploadingImage
//                 }
//                 className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* FORM */}

//             <form
//               onSubmit={
//                 handleSubmit
//               }
//               className="max-h-[calc(92vh-100px)] overflow-y-auto"
//             >
//               <div className="space-y-6 p-6">

//                 {/* ======================================================== */}
//                 {/* TITLE */}
//                 {/* ======================================================== */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Title
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(
//                       e
//                     ) => {
//                       const value =
//                         e.target
//                           .value;

//                       setTitle(
//                         value
//                       );

//                       if (
//                         titleError &&
//                         value.trim()
//                       ) {
//                         setTitleError(
//                           ""
//                         );
//                       }
//                     }}
//                     placeholder="Enter information title"
//                     className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
//                       titleError
//                         ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
//                         : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                     }`}
//                   />

//                   {titleError && (
//                     <p className="mt-1.5 text-xs font-medium text-red-600">
//                       {
//                         titleError
//                       }
//                     </p>
//                   )}
//                 </div>

//                 {/* ======================================================== */}
//                 {/* DESCRIPTION */}
//                 {/* ======================================================== */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Description
//                     <span className="ml-1 text-red-500">
//                       *
//                     </span>
//                   </label>

//                   {/* ====================================================== */}
//                   {/* TOOLBAR */}
//                   {/* ====================================================== */}

//                   <div
//                     className={`rounded-t-xl border border-b-0 bg-slate-50 ${
//                       descriptionError
//                         ? "border-red-400"
//                         : "border-slate-200"
//                     }`}
//                   >
//                     <div className="flex flex-wrap items-center gap-1 p-2">

//                       {/* FONT FAMILY */}

//                       <select
//                         value={
//                           fontFamily
//                         }
//                         onChange={
//                           handleFontFamily
//                         }
//                         title="Font Family"
//                         className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 outline-none transition hover:bg-slate-50 focus:border-indigo-500"
//                       >
//                         <option value="Arial">
//                           Arial
//                         </option>

//                         <option value="Verdana">
//                           Verdana
//                         </option>

//                         <option value="Tahoma">
//                           Tahoma
//                         </option>

//                         <option value="Trebuchet MS">
//                           Trebuchet MS
//                         </option>

//                         <option value="Times New Roman">
//                           Times New Roman
//                         </option>

//                         <option value="Georgia">
//                           Georgia
//                         </option>

//                         <option value="Courier New">
//                           Courier New
//                         </option>

//                         <option value="Impact">
//                           Impact
//                         </option>

//                         <option value="Comic Sans MS">
//                           Comic Sans MS
//                         </option>
//                       </select>

//                       {/* FONT SIZE */}

//                       <select
//                         value={
//                           fontSize
//                         }
//                         onChange={
//                           handleFontSize
//                         }
//                         title="Font Size"
//                         className="h-9 w-[90px] rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 outline-none transition hover:bg-slate-50 focus:border-indigo-500"
//                       >
//                         {fontSizes.map(
//                           (
//                             size
//                           ) => (
//                             <option
//                               key={
//                                 size
//                               }
//                               value={
//                                 size
//                               }
//                             >
//                               {
//                                 size
//                               }
//                             </option>
//                           )
//                         )}
//                       </select>

//                       {/* FONT COLOR */}

//                       <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2">
//                         <span className="text-xs font-medium text-slate-500">
//                           Color
//                         </span>

//                         <input
//                           type="color"
//                           value={
//                             fontColor
//                           }
//                           onChange={
//                             handleFontColor
//                           }
//                           title="Font Color"
//                           className="h-6 w-7 cursor-pointer border-0 bg-transparent p-0"
//                         />
//                       </div>

//                       <div className="mx-1 h-6 w-px bg-slate-200" />

//                       {/* BOLD */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "bold"
//                           )
//                         }
//                         title="Bold"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <Bold
//                           size={17}
//                         />
//                       </button>

//                       {/* ITALIC */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "italic"
//                           )
//                         }
//                         title="Italic"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <Italic
//                           size={17}
//                         />
//                       </button>

//                       {/* UNDERLINE */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "underline"
//                           )
//                         }
//                         title="Underline"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <Underline
//                           size={17}
//                         />
//                       </button>

//                       <div className="mx-1 h-6 w-px bg-slate-200" />

//                       {/* ALIGN LEFT */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "justifyLeft"
//                           )
//                         }
//                         title="Align Left"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <AlignLeft
//                           size={17}
//                         />
//                       </button>

//                       {/* ALIGN CENTER */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "justifyCenter"
//                           )
//                         }
//                         title="Align Center"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <AlignCenter
//                           size={17}
//                         />
//                       </button>

//                       {/* ALIGN RIGHT */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "justifyRight"
//                           )
//                         }
//                         title="Align Right"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <AlignRight
//                           size={17}
//                         />
//                       </button>

//                       {/* JUSTIFY */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "justifyFull"
//                           )
//                         }
//                         title="Justify"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <AlignJustify
//                           size={17}
//                         />
//                       </button>

//                       <div className="mx-1 h-6 w-px bg-slate-200" />

//                       {/* BULLET LIST */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "insertUnorderedList"
//                           )
//                         }
//                         title="Bullet List"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <List
//                           size={17}
//                         />
//                       </button>

//                       {/* NUMBER LIST */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "insertOrderedList"
//                           )
//                         }
//                         title="Numbered List"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <ListOrdered
//                           size={17}
//                         />
//                       </button>

//                       {/* LINK */}

//                       <button
//                         type="button"
//                         onClick={() => {
//                           const url =
//                             window.prompt(
//                               "Enter URL"
//                             );

//                           if (
//                             url &&
//                             url.trim()
//                           ) {
//                             execEditorCommand(
//                               "createLink",
//                               url.trim()
//                             );
//                           }
//                         }}
//                         title="Add Link"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <Link
//                           size={17}
//                         />
//                       </button>

//                       {/* IMAGE */}

//                       <button
//                         type="button"
//                         onClick={
//                           handleImageButton
//                         }
//                         disabled={
//                           uploadingImage
//                         }
//                         title="Add Image / Banner"
//                         className="flex items-center gap-1 rounded-lg p-2 text-indigo-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
//                       >
//                         <ImagePlus
//                           size={17}
//                         />

//                         <span className="text-xs font-semibold">
//                           {uploadingImage
//                             ? "Uploading..."
//                             : "Image"}
//                         </span>
//                       </button>

//                       <input
//                         ref={
//                           imageInputRef
//                         }
//                         type="file"
//                         accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
//                         onChange={
//                           handleImageUpload
//                         }
//                         className="hidden"
//                       />

//                       <div className="mx-1 h-6 w-px bg-slate-200" />

//                       {/* UNDO */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "undo"
//                           )
//                         }
//                         title="Undo"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <Undo2
//                           size={17}
//                         />
//                       </button>

//                       {/* REDO */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           execEditorCommand(
//                             "redo"
//                           )
//                         }
//                         title="Redo"
//                         className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
//                       >
//                         <Redo2
//                           size={17}
//                         />
//                       </button>
//                     </div>
//                   </div>

//                   {/* ====================================================== */}
//                   {/* CONTENT EDITOR */}
//                   {/* ====================================================== */}

//                   <div
//                     ref={
//                       editorRef
//                     }
//                     contentEditable={
//                       !saving
//                     }
//                     suppressContentEditableWarning
//                     onInput={() => {
//                       syncDescription();

//                       if (
//                         descriptionError
//                       ) {
//                         const html =
//                           editorRef.current
//                             ?.innerHTML ||
//                           "";

//                         const plain =
//                           getPlainText(
//                             html
//                           );

//                         if (
//                           plain ||
//                           html.includes(
//                             "<img"
//                           )
//                         ) {
//                           setDescriptionError(
//                             ""
//                           );
//                         }
//                       }
//                     }}
//                     onBlur={
//                       syncDescription
//                     }
//                     data-placeholder="Enter important information..."
//                     className={`min-h-[250px] w-full overflow-y-auto rounded-b-xl border bg-white px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:ring-2 ${
//                       descriptionError
//                         ? "border-red-400 focus:border-red-500 focus:ring-red-100"
//                         : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
//                     }`}
//                     style={{
//                       fontFamily:
//                         "Arial",
//                       fontSize:
//                         "16px",
//                       color:
//                         "#1e293b",
//                     }}
//                   />

//                   <style>
//                     {`
//                       [contenteditable][data-placeholder]:empty:before {
//                         content: attr(data-placeholder);
//                         color: #94a3b8;
//                         pointer-events: none;
//                       }

//                       [contenteditable] img {
//                         max-width: 100%;
//                         height: auto;
//                         display: block;
//                         margin: 12px 0;
//                         border-radius: 10px;
//                       }

//                       [contenteditable] a {
//                         color: #4f46e5;
//                         text-decoration: underline;
//                       }

//                       [contenteditable] ul {
//                         list-style-type: disc;
//                         padding-left: 24px;
//                       }

//                       [contenteditable] ol {
//                         list-style-type: decimal;
//                         padding-left: 24px;
//                       }

//                       [contenteditable] p {
//                         margin: 0 0 8px 0;
//                       }
//                     `}
//                   </style>

//                   {descriptionError && (
//                     <p className="mt-1.5 text-xs font-medium text-red-600">
//                       {
//                         descriptionError
//                       }
//                     </p>
//                   )}

//                   <p className="mt-2 text-xs text-slate-400">
//                     Select text before changing its
//                     font size, font family or color.
//                     Images and banners can also be added.
//                   </p>
//                 </div>
//               </div>

//               {/* ========================================================== */}
//               {/* FORM BUTTONS */}
//               {/* ========================================================== */}

//               <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
//                 <button
//                   type="button"
//                   onClick={
//                     closeModal
//                   }
//                   disabled={
//                     saving ||
//                     uploadingImage
//                   }
//                   className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={
//                     saving ||
//                     uploadingImage
//                   }
//                   className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {saving
//                     ? "Saving..."
//                     : editingId
//                     ? "Update Information"
//                     : "Add Information"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ================================================================== */}
//       {/* COMMON POPUP */}
//       {/* ================================================================== */}

//       {popup.show && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

//             {/* POPUP CONTENT */}

//             <div className="flex items-start gap-4 px-6 pb-5 pt-6">
//               <div
//                 className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
//                   popupConfig[
//                     popup.type
//                   ].iconBg
//                 }`}
//               >
//                 {
//                   popupConfig[
//                     popup.type
//                   ].icon
//                 }
//               </div>

//               <div className="min-w-0 flex-1">
//                 <h3 className="text-lg font-bold text-slate-800">
//                   {
//                     popup.title
//                   }
//                 </h3>

//                 <p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-slate-500">
//                   {
//                     popup.message
//                   }
//                 </p>
//               </div>

//               <button
//                 onClick={
//                   closePopup
//                 }
//                 className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* POPUP FOOTER */}

//             <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">

//               {/* CANCEL FOR CONFIRM */}

//               {popup.type ===
//                 "confirm" && (
//                 <button
//                   onClick={
//                     closePopup
//                   }
//                   className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
//                 >
//                   {
//                     popup.cancelText ||
//                     "Cancel"
//                   }
//                 </button>
//               )}

//               {/* MAIN BUTTON */}

//               <button
//                 onClick={() => {
//                   if (
//                     popup.type ===
//                       "confirm" &&
//                     popup.onConfirm
//                   ) {
//                     popup.onConfirm();
//                   } else {
//                     closePopup();
//                   }
//                 }}
//                 className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
//                   popupConfig[
//                     popup.type
//                   ].button
//                 }`}
//               >
//                 {popup.type ===
//                 "confirm"
//                   ? popup.confirmText ||
//                     "Confirm"
//                   : "OK"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImportantInformation;
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckCircle2,
  Edit,
  ImagePlus,
  Italic,
  Link,
  List,
  ListOrdered,
  Plus,
  Redo2,
  Trash2,
  Underline,
  Undo2,
  X,
} from "lucide-react";

type Information = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  status?: "published" | "draft";
  priority?: string;
  expires_at?: string | null;
  is_active?: boolean;
};

type PopupType =
  | "success"
  | "error"
  | "warning"
  | "confirm";

type PopupState = {
  show: boolean;
  type: PopupType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

const API = import.meta.env.VITE_BACKEND_URL;

const ImportantInformation = () => {
  const [information, setInformation] = useState<
    Information[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [titleError, setTitleError] =
    useState("");
  const [descriptionError, setDescriptionError] =
    useState("");

  const [fontFamily, setFontFamily] =
    useState("Arial");
  const [fontSize, setFontSize] =
    useState("16px");
  const [fontColor, setFontColor] =
    useState("#1e293b");

  const editorRef =
    useRef<HTMLDivElement | null>(null);

  const imageInputRef =
    useRef<HTMLInputElement | null>(null);

  /*
  |---------------------------------------------------------------------------
  | COMMON POPUP
  |---------------------------------------------------------------------------
  */

  const [popup, setPopup] =
    useState<PopupState>({
      show: false,
      type: "success",
      title: "",
      message: "",
    });

  const showPopup = (
    type: PopupType,
    title: string,
    message: string,
    options?: {
      confirmText?: string;
      cancelText?: string;
      onConfirm?: () => void;
    }
  ) => {
    setPopup({
      show: true,
      type,
      title,
      message,
      confirmText:
        options?.confirmText,
      cancelText:
        options?.cancelText,
      onConfirm:
        options?.onConfirm,
    });
  };

  const closePopup = () => {
    setPopup((prev) => ({
      ...prev,
      show: false,
    }));
  };

  /*
  |---------------------------------------------------------------------------
  | FONT SIZE OPTIONS
  |---------------------------------------------------------------------------
  */

  const fontSizes = [
    "8px",
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "30px",
    "32px",
    "36px",
    "40px",
    "44px",
    "48px",
  ];

  /*
  |---------------------------------------------------------------------------
  | FETCH
  |---------------------------------------------------------------------------
  */

  const fetchInformation = async (
    showErrorPopup = true
  ) => {
    try {
      setLoading(true);

      const response =
        await axios.get(
          `${API}/api/admin/important-information`,
          {
            withCredentials: true,
          }
        );

      if (response.data?.success) {
        setInformation(
          response.data.data || []
        );
      } else if (showErrorPopup) {
        showPopup(
          "error",
          "Unable to Load",
          response.data?.message ||
            "Unable to load important information."
        );
      }
    } catch (error: any) {
      console.error(
        "Failed to fetch important information:",
        error
      );

      if (showErrorPopup) {
        showPopup(
          "error",
          "Unable to Load",
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Failed to fetch important information."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  /*
  |---------------------------------------------------------------------------
  | RESET FORM
  |---------------------------------------------------------------------------
  */

  const resetForm = () => {
    setTitle("");
    setDescription("");

    setTitleError("");
    setDescriptionError("");

    setEditingId(null);

    setFontFamily("Arial");
    setFontSize("16px");
    setFontColor("#1e293b");

    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  /*
  |---------------------------------------------------------------------------
  | CREATE
  |---------------------------------------------------------------------------
  */

  const openCreate = () => {
    resetForm();
    setShowModal(true);

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
        editorRef.current.focus();
      }
    }, 0);
  };

  /*
  |---------------------------------------------------------------------------
  | EDIT
  |---------------------------------------------------------------------------
  */

  const openEdit = (
    item: Information
  ) => {
    setEditingId(item.id);

    setTitle(item.title);
    setDescription(
      item.description || ""
    );

    setTitleError("");
    setDescriptionError("");

    setShowModal(true);

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML =
          item.description || "";
      }
    }, 0);
  };

  /*
  |---------------------------------------------------------------------------
  | CLOSE MODAL
  |---------------------------------------------------------------------------
  */

  const closeModal = () => {
    if (
      saving ||
      uploadingImage
    ) {
      return;
    }

    setShowModal(false);
    resetForm();
  };

  /*
  |---------------------------------------------------------------------------
  | SYNC EDITOR
  |---------------------------------------------------------------------------
  */

  const syncDescription = () => {
    if (!editorRef.current) {
      return;
    }

    setDescription(
      editorRef.current.innerHTML
    );
  };

  /*
  |---------------------------------------------------------------------------
  | EXECUTE EDITOR COMMAND
  |---------------------------------------------------------------------------
  */

  const execEditorCommand = (
    command: string,
    value?: string
  ) => {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.focus();

    document.execCommand(
      command,
      false,
      value
    );

    syncDescription();
  };

  /*
  |---------------------------------------------------------------------------
  | FONT FAMILY
  |---------------------------------------------------------------------------
  */

  const handleFontFamily = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setFontFamily(value);

    execEditorCommand(
      "fontName",
      value
    );
  };

  /*
  |---------------------------------------------------------------------------
  | FONT SIZE
  |---------------------------------------------------------------------------
  */

  const applyFontSize = (
    size: string
  ) => {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.focus();

    const selection =
      window.getSelection();

    if (
      !selection ||
      selection.rangeCount === 0
    ) {
      return;
    }

    const range =
      selection.getRangeAt(0);

    if (range.collapsed) {
      return;
    }

    const span =
      document.createElement(
        "span"
      );

    span.style.fontSize = size;

    try {
      range.surroundContents(span);
    } catch {
      const fragment =
        range.extractContents();

      span.appendChild(fragment);

      range.insertNode(span);
    }

    selection.removeAllRanges();

    const newRange =
      document.createRange();

    newRange.selectNodeContents(span);

    selection.addRange(
      newRange
    );

    syncDescription();
  };

  const handleFontSize = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setFontSize(value);

    applyFontSize(value);
  };

  /*
  |---------------------------------------------------------------------------
  | FONT COLOR
  |---------------------------------------------------------------------------
  */

  const handleFontColor = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setFontColor(value);

    execEditorCommand(
      "foreColor",
      value
    );
  };

  /*
  |---------------------------------------------------------------------------
  | IMAGE UPLOAD
  |---------------------------------------------------------------------------
  */

  const handleImageButton = () => {
    imageInputRef.current?.click();
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      showPopup(
        "error",
        "Invalid Image",
        "Please upload a PNG, JPG, GIF or WebP image."
      );

      e.target.value = "";
      return;
    }

    const maxSize =
      8 * 1024 * 1024;

    if (file.size > maxSize) {
      showPopup(
        "error",
        "Image Too Large",
        "Image size must be less than 8 MB."
      );

      e.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      const response =
        await axios.post(
          `${API}/api/upload/image`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const imageUrl =
        response.data?.url ||
        response.data?.imageUrl ||
        response.data?.image_url ||
        response.data?.data?.url ||
        response.data?.data?.imageUrl ||
        response.data?.data?.image_url;

      if (!imageUrl) {
        throw new Error(
          response.data?.message ||
            "Image URL was not returned by the server."
        );
      }

      if (!editorRef.current) {
        return;
      }

      editorRef.current.focus();

      document.execCommand(
        "insertImage",
        false,
        imageUrl
      );

      syncDescription();

      showPopup(
        "success",
        "Image Added",
        response.data?.message ||
          "Image/banner has been added successfully."
      );
    } catch (error: any) {
      console.error(
        "Image upload failed:",
        error
      );

      showPopup(
        "error",
        "Image Upload Failed",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to upload image."
      );
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  /*
  |---------------------------------------------------------------------------
  | PLAIN TEXT
  |---------------------------------------------------------------------------
  */

  const getPlainText = (
    html: string
  ) => {
    const temp =
      document.createElement(
        "div"
      );

    temp.innerHTML = html;

    return (
      temp.textContent ||
      temp.innerText ||
      ""
    )
      .replace(
        /\u00a0/g,
        " "
      )
      .trim();
  };

  /*
  |---------------------------------------------------------------------------
  | VALIDATION
  |---------------------------------------------------------------------------
  */

  const validateForm = () => {
    let valid = true;

    setTitleError("");
    setDescriptionError("");

    const trimmedTitle =
      title.trim();

    const currentDescription =
      editorRef.current?.innerHTML ||
      description ||
      "";

    const plainDescription =
      getPlainText(
        currentDescription
      );

    const hasImage =
      currentDescription.includes(
        "<img"
      );

    if (!trimmedTitle) {
      setTitleError(
        "Title is required."
      );

      valid = false;
    } else if (
      trimmedTitle.length < 3
    ) {
      setTitleError(
        "Title must contain at least 3 characters."
      );

      valid = false;
    }

    if (
      !plainDescription &&
      !hasImage
    ) {
      setDescriptionError(
        "Description is required."
      );

      valid = false;
    } else if (
      plainDescription.length > 0 &&
      plainDescription.length < 3 &&
      !hasImage
    ) {
      setDescriptionError(
        "Description must contain at least 3 characters."
      );

      valid = false;
    }

    return valid;
  };

  /*
  |---------------------------------------------------------------------------
  | SUBMIT
  |---------------------------------------------------------------------------
  */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    syncDescription();

    if (!validateForm()) {
      showPopup(
        "warning",
        "Validation Error",
        "Please fill in all required fields correctly."
      );

      return;
    }

    const finalDescription =
      editorRef.current?.innerHTML ||
      description;

    const currentEditingId =
      editingId;

    try {
      setSaving(true);

      let response;

      if (currentEditingId) {
        response =
          await axios.put(
            `${API}/api/admin/important-information/${currentEditingId}`,
            {
              title: title.trim(),
              description:
                finalDescription,
            },
            {
              withCredentials: true,
            }
          );
      } else {
        response =
          await axios.post(
            `${API}/api/admin/important-information`,
            {
              title: title.trim(),
              description:
                finalDescription,
            },
            {
              withCredentials: true,
            }
          );
      }

      setShowModal(false);
      resetForm();

      await fetchInformation(
        false
      );

      showPopup(
        "success",
        currentEditingId
          ? "Information Updated"
          : "Information Added",
        response.data?.message ||
          (currentEditingId
            ? "Important information updated successfully."
            : "Important information added successfully.")
      );
    } catch (error: any) {
      console.error(
        "Failed to save important information:",
        error
      );

      showPopup(
        "error",
        "Save Failed",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to save important information."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
  |---------------------------------------------------------------------------
  | DELETE
  |---------------------------------------------------------------------------
  */

  const performDelete = async (
    id: number
  ) => {
    try {
      const response =
        await axios.delete(
          `${API}/api/admin/important-information/${id}`,
          {
            withCredentials: true,
          }
        );

      /*
      |-----------------------------------------------------------------------
      | REMOVE CARD IMMEDIATELY
      |-----------------------------------------------------------------------
      */

      setInformation(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
      );

      showPopup(
        "success",
        "Information Deleted",
        response.data?.message ||
          "Important information deleted successfully."
      );
    } catch (error: any) {
      console.error(
        "Failed to delete information:",
        error
      );

      showPopup(
        "error",
        "Delete Failed",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to delete important information."
      );
    }
  };

  const handleDelete = (
    id: number
  ) => {
    showPopup(
      "confirm",
      "Delete Information?",
      "Are you sure you want to delete this important information? This action cannot be undone.",
      {
        confirmText:
          "Delete",
        cancelText:
          "Cancel",
        onConfirm: () => {
          closePopup();
          performDelete(id);
        },
      }
    );
  };

  /*
  |---------------------------------------------------------------------------
  | DATE
  |---------------------------------------------------------------------------
  */

  const formatDate = (
    date: string
  ) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /*
  |---------------------------------------------------------------------------
  | STRIP HTML FOR CARD PREVIEW
  |---------------------------------------------------------------------------
  */

  const getPreviewText = (
    html: string
  ) => {
    return getPlainText(
      html || ""
    );
  };

  /*
  |---------------------------------------------------------------------------
  | POPUP THEME
  |---------------------------------------------------------------------------
  */

  const popupConfig = {
    success: {
      icon: (
        <CheckCircle2
          size={27}
          className="text-emerald-600"
        />
      ),
      iconBg:
        "bg-emerald-100",
      button:
        "bg-emerald-600 hover:bg-emerald-700",
    },

    error: {
      icon: (
        <AlertCircle
          size={27}
          className="text-red-600"
        />
      ),
      iconBg:
        "bg-red-100",
      button:
        "bg-red-600 hover:bg-red-700",
    },

    warning: {
      icon: (
        <AlertCircle
          size={27}
          className="text-amber-600"
        />
      ),
      iconBg:
        "bg-amber-100",
      button:
        "bg-amber-600 hover:bg-amber-700",
    },

    confirm: {
      icon: (
        <Trash2
          size={27}
          className="text-red-600"
        />
      ),
      iconBg:
        "bg-red-100",
      button:
        "bg-red-600 hover:bg-red-700",
    },
  };

  /*
  |---------------------------------------------------------------------------
  | RENDER
  |---------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="mx-auto max-w-[1500px]">

        {/* ================================================================ */}
        {/* HEADER */}
        {/* ================================================================ */}

        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Important Information
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage important information visible
              to apartment members.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Information
          </button>
        </div>

        {/* ================================================================ */}
        {/* CONTENT */}
        {/* ================================================================ */}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            Loading important information...
          </div>
        ) : information.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center justify-center p-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <AlertCircle
                  size={30}
                  className="text-slate-400"
                />
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                No important information
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Add information that should be
                visible to apartment members.
              </p>

              <button
                onClick={openCreate}
                className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus size={16} />
                Add Information
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
            {/* ============================================================ */}
            {/* CARD GRID */}
            {/* ============================================================ */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {information.map(
                (item) => {
                  const preview =
                    getPreviewText(
                      item.description
                    );

                  const hasImage =
                    item.description?.includes(
                      "<img"
                    );

                  return (
                    <div
                      key={item.id}
                      className="group flex aspect-square min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                    >
                      {/* ================================================== */}
                      {/* CARD HEADER */}
                      {/* ================================================== */}

                      <div className="flex items-start justify-between gap-2 border-b border-slate-100 px-4 pb-3 pt-4">
                        <div className="min-w-0 flex-1">
                          <h2
                            className="line-clamp-2 text-[15px] font-bold leading-5 text-slate-800"
                            title={
                              item.title
                            }
                          >
                            {
                              item.title
                            }
                          </h2>

                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="inline-flex rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                              Important
                            </span>
                          </div>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex shrink-0 items-center gap-1">
                          <button
                            onClick={() =>
                              openEdit(
                                item
                              )
                            }
                            title="Edit"
                            className="rounded-lg p-1.5 text-blue-600 transition hover:bg-blue-50"
                          >
                            <Edit
                              size={15}
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                            title="Delete"
                            className="rounded-lg p-1.5 text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2
                              size={15}
                            />
                          </button>
                        </div>
                      </div>

                      {/* ================================================== */}
                      {/* CARD CONTENT */}
                      {/* ================================================== */}

                      <div className="min-h-0 flex-1 overflow-hidden px-4 py-3">
                        {hasImage ? (
                          <div
                            className="line-clamp-5 text-[12px] leading-[18px] text-slate-600"
                            dangerouslySetInnerHTML={{
                              __html:
                                item.description ||
                                "",
                            }}
                          />
                        ) : (
                          <p
                            className="line-clamp-6 text-[12px] leading-[18px] text-slate-600"
                            title={
                              preview
                            }
                          >
                            {
                              preview
                            }
                          </p>
                        )}
                      </div>

                      {/* ================================================== */}
                      {/* CARD FOOTER */}
                      {/* ================================================== */}

                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-4 py-2.5">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                            Created
                          </p>

                          <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                            {formatDate(
                              item.created_at
                            )}
                          </p>
                        </div>

                        {/* {hasImage && (
                          <div className="flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">
                            <ImagePlus
                              size={12}
                            />
                            Image
                          </div>
                        )} */}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================================================================== */}
      {/* ADD / EDIT MODAL */}
      {/* ================================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId
                    ? "Edit Important Information"
                    : "Add Important Information"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Format the information with custom
                  fonts, colors and images.
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={
                  saving ||
                  uploadingImage
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }
              className="max-h-[calc(92vh-100px)] overflow-y-auto"
            >
              <div className="space-y-6 p-6">

                {/* TITLE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Title
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(
                      e
                    ) => {
                      const value =
                        e.target
                          .value;

                      setTitle(
                        value
                      );

                      if (
                        titleError &&
                        value.trim()
                      ) {
                        setTitleError(
                          ""
                        );
                      }
                    }}
                    placeholder="Enter information title"
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      titleError
                        ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />

                  {titleError && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {
                        titleError
                      }
                    </p>
                  )}
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  {/* TOOLBAR */}

                  <div
                    className={`rounded-t-xl border border-b-0 bg-slate-50 ${
                      descriptionError
                        ? "border-red-400"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-1 p-2">

                      {/* FONT FAMILY */}

                      <select
                        value={
                          fontFamily
                        }
                        onChange={
                          handleFontFamily
                        }
                        title="Font Family"
                        className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 outline-none transition hover:bg-slate-50 focus:border-indigo-500"
                      >
                        <option value="Arial">
                          Arial
                        </option>

                        <option value="Verdana">
                          Verdana
                        </option>

                        <option value="Tahoma">
                          Tahoma
                        </option>

                        <option value="Trebuchet MS">
                          Trebuchet MS
                        </option>

                        <option value="Times New Roman">
                          Times New Roman
                        </option>

                        <option value="Georgia">
                          Georgia
                        </option>

                        <option value="Courier New">
                          Courier New
                        </option>

                        <option value="Impact">
                          Impact
                        </option>

                        <option value="Comic Sans MS">
                          Comic Sans MS
                        </option>
                      </select>

                      {/* FONT SIZE */}

                      <select
                        value={
                          fontSize
                        }
                        onChange={
                          handleFontSize
                        }
                        title="Font Size"
                        className="h-9 w-[90px] rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-700 outline-none transition hover:bg-slate-50 focus:border-indigo-500"
                      >
                        {fontSizes.map(
                          (
                            size
                          ) => (
                            <option
                              key={
                                size
                              }
                              value={
                                size
                              }
                            >
                              {
                                size
                              }
                            </option>
                          )
                        )}
                      </select>

                      {/* FONT COLOR */}

                      <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2">
                        <span className="text-xs font-medium text-slate-500">
                          Color
                        </span>

                        <input
                          type="color"
                          value={
                            fontColor
                          }
                          onChange={
                            handleFontColor
                          }
                          title="Font Color"
                          className="h-6 w-7 cursor-pointer border-0 bg-transparent p-0"
                        />
                      </div>

                      <div className="mx-1 h-6 w-px bg-slate-200" />

                      {/* BOLD */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "bold"
                          )
                        }
                        title="Bold"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <Bold
                          size={17}
                        />
                      </button>

                      {/* ITALIC */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "italic"
                          )
                        }
                        title="Italic"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <Italic
                          size={17}
                        />
                      </button>

                      {/* UNDERLINE */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "underline"
                          )
                        }
                        title="Underline"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <Underline
                          size={17}
                        />
                      </button>

                      <div className="mx-1 h-6 w-px bg-slate-200" />

                      {/* ALIGN LEFT */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "justifyLeft"
                          )
                        }
                        title="Align Left"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <AlignLeft
                          size={17}
                        />
                      </button>

                      {/* ALIGN CENTER */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "justifyCenter"
                          )
                        }
                        title="Align Center"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <AlignCenter
                          size={17}
                        />
                      </button>

                      {/* ALIGN RIGHT */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "justifyRight"
                          )
                        }
                        title="Align Right"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <AlignRight
                          size={17}
                        />
                      </button>

                      {/* JUSTIFY */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "justifyFull"
                          )
                        }
                        title="Justify"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <AlignJustify
                          size={17}
                        />
                      </button>

                      <div className="mx-1 h-6 w-px bg-slate-200" />

                      {/* BULLET LIST */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "insertUnorderedList"
                          )
                        }
                        title="Bullet List"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <List
                          size={17}
                        />
                      </button>

                      {/* NUMBER LIST */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "insertOrderedList"
                          )
                        }
                        title="Numbered List"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <ListOrdered
                          size={17}
                        />
                      </button>

                      {/* LINK */}

                      <button
                        type="button"
                        onClick={() => {
                          const url =
                            window.prompt(
                              "Enter URL"
                            );

                          if (
                            url &&
                            url.trim()
                          ) {
                            execEditorCommand(
                              "createLink",
                              url.trim()
                            );
                          }
                        }}
                        title="Add Link"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <Link
                          size={17}
                        />
                      </button>

                      {/* IMAGE */}

                      <button
                        type="button"
                        onClick={
                          handleImageButton
                        }
                        disabled={
                          uploadingImage
                        }
                        title="Add Image / Banner"
                        className="flex items-center gap-1 rounded-lg p-2 text-indigo-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ImagePlus
                          size={17}
                        />

                        <span className="text-xs font-semibold">
                          {uploadingImage
                            ? "Uploading..."
                            : "Image"}
                        </span>
                      </button>

                      <input
                        ref={
                          imageInputRef
                        }
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                        onChange={
                          handleImageUpload
                        }
                        className="hidden"
                      />

                      <div className="mx-1 h-6 w-px bg-slate-200" />

                      {/* UNDO */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "undo"
                          )
                        }
                        title="Undo"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <Undo2
                          size={17}
                        />
                      </button>

                      {/* REDO */}

                      <button
                        type="button"
                        onClick={() =>
                          execEditorCommand(
                            "redo"
                          )
                        }
                        title="Redo"
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-indigo-600"
                      >
                        <Redo2
                          size={17}
                        />
                      </button>
                    </div>
                  </div>

                  {/* CONTENT EDITOR */}

                  <div
                    ref={
                      editorRef
                    }
                    contentEditable={
                      !saving
                    }
                    suppressContentEditableWarning
                    onInput={() => {
                      syncDescription();

                      if (
                        descriptionError
                      ) {
                        const html =
                          editorRef.current
                            ?.innerHTML ||
                          "";

                        const plain =
                          getPlainText(
                            html
                          );

                        if (
                          plain ||
                          html.includes(
                            "<img"
                          )
                        ) {
                          setDescriptionError(
                            ""
                          );
                        }
                      }
                    }}
                    onBlur={
                      syncDescription
                    }
                    data-placeholder="Enter important information..."
                    className={`min-h-[250px] w-full overflow-y-auto rounded-b-xl border bg-white px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition focus:ring-2 ${
                      descriptionError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                    style={{
                      fontFamily:
                        "Arial",
                      fontSize:
                        "16px",
                      color:
                        "#1e293b",
                    }}
                  />

                  <style>
                    {`
                      [contenteditable][data-placeholder]:empty:before {
                        content: attr(data-placeholder);
                        color: #94a3b8;
                        pointer-events: none;
                      }

                      [contenteditable] img {
                        max-width: 100%;
                        height: auto;
                        display: block;
                        margin: 12px 0;
                        border-radius: 10px;
                      }

                      [contenteditable] a {
                        color: #4f46e5;
                        text-decoration: underline;
                      }

                      [contenteditable] ul {
                        list-style-type: disc;
                        padding-left: 24px;
                      }

                      [contenteditable] ol {
                        list-style-type: decimal;
                        padding-left: 24px;
                      }

                      [contenteditable] p {
                        margin: 0 0 8px 0;
                      }
                    `}
                  </style>

                  {descriptionError && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {
                        descriptionError
                      }
                    </p>
                  )}

                  <p className="mt-2 text-xs text-slate-400">
                    Select text before changing its
                    font size, font family or color.
                    Images and banners can also be added.
                  </p>
                </div>
              </div>

              {/* FORM BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    saving ||
                    uploadingImage
                  }
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    uploadingImage
                  }
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Information"
                    : "Add Information"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* COMMON POPUP */}
      {/* ================================================================== */}

      {popup.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* POPUP CONTENT */}

            <div className="flex items-start gap-4 px-6 pb-5 pt-6">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  popupConfig[
                    popup.type
                  ].iconBg
                }`}
              >
                {
                  popupConfig[
                    popup.type
                  ].icon
                }
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-800">
                  {
                    popup.title
                  }
                </h3>

                <p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-slate-500">
                  {
                    popup.message
                  }
                </p>
              </div>

              <button
                onClick={
                  closePopup
                }
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* POPUP FOOTER */}

            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">

              {popup.type ===
                "confirm" && (
                <button
                  onClick={
                    closePopup
                  }
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  {
                    popup.cancelText ||
                    "Cancel"
                  }
                </button>
              )}

              <button
                onClick={() => {
                  if (
                    popup.type ===
                      "confirm" &&
                    popup.onConfirm
                  ) {
                    popup.onConfirm();
                  } else {
                    closePopup();
                  }
                }}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
                  popupConfig[
                    popup.type
                  ].button
                }`}
              >
                {popup.type ===
                "confirm"
                  ? popup.confirmText ||
                    "Confirm"
                  : "OK"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantInformation;
