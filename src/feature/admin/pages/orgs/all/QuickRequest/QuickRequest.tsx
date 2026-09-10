

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import {
//   Plus,
//   Search,
//   MoreVertical,
//   Edit2,
//   Trash2,
//   Eye,
//   Copy,
//   CheckCircle2,
//   Clock3,
//   XCircle,
//   ChevronRight,
//   ChevronLeft,
//   FileText,
//   Users,
//   AlertCircle,
//   X,
//   ArrowLeft,
//   Loader2,
//   Wrench,
//   Zap,
//   Car,
//   Calendar,
//   Brush,
//   MoreHorizontal,
//   Droplets,
//   Lightbulb,
//   Fan,
//   Shield,
//   Key,
//   Wifi,
//   Trash2 as TrashIcon,
//   TreePine,
//   Building2,
//   DoorOpen,
//   Hammer,
//   Paintbrush,
//   Package,
//   Phone,
//   Bell,
//   HeartPulse,
//   Dog,
//   Bike,
//   Flame,
//   Snowflake,
//   ArrowUpDown,
//   Camera,
//   Volume2,
//   Settings,
// } from "lucide-react";

// import Alert from "../../../../../../components/Aleartmessage"; // adjust path if needed

// // ===================== API =====================
// const API = `${import.meta.env.VITE_BACKEND_URL}/api/quick-requests`;

// // ===================== ICON OPTIONS =====================
// const ICON_OPTIONS = [
//   { value: "plumbing", label: "Plumbing", Icon: Wrench, color: "text-blue-500", bg: "bg-blue-50" },
//   { value: "water", label: "Water", Icon: Droplets, color: "text-sky-500", bg: "bg-sky-50" },
//   { value: "electrical", label: "Electrical", Icon: Zap, color: "text-emerald-500", bg: "bg-emerald-50" },
//   { value: "lighting", label: "Lighting", Icon: Lightbulb, color: "text-yellow-500", bg: "bg-yellow-50" },
//   { value: "parking", label: "Parking", Icon: Car, color: "text-purple-500", bg: "bg-purple-50" },
//   { value: "community", label: "Community", Icon: Calendar, color: "text-amber-500", bg: "bg-amber-50" },
//   { value: "housekeeping", label: "Housekeeping", Icon: Brush, color: "text-teal-500", bg: "bg-teal-50" },
//   { value: "hvac", label: "AC / HVAC", Icon: Fan, color: "text-cyan-500", bg: "bg-cyan-50" },
//   { value: "security", label: "Security", Icon: Shield, color: "text-red-500", bg: "bg-red-50" },
//   { value: "keys", label: "Keys / Access", Icon: Key, color: "text-orange-500", bg: "bg-orange-50" },
//   { value: "internet", label: "Internet", Icon: Wifi, color: "text-indigo-500", bg: "bg-indigo-50" },
//   { value: "waste", label: "Waste", Icon: TrashIcon, color: "text-stone-500", bg: "bg-stone-50" },
//   { value: "garden", label: "Garden", Icon: TreePine, color: "text-green-600", bg: "bg-green-50" },
//   { value: "building", label: "Building", Icon: Building2, color: "text-slate-600", bg: "bg-slate-100" },
//   { value: "doors", label: "Doors", Icon: DoorOpen, color: "text-amber-700", bg: "bg-amber-50" },
//   { value: "carpentry", label: "Carpentry", Icon: Hammer, color: "text-yellow-700", bg: "bg-yellow-50" },
//   { value: "painting", label: "Painting", Icon: Paintbrush, color: "text-pink-500", bg: "bg-pink-50" },
//   { value: "delivery", label: "Delivery", Icon: Package, color: "text-violet-500", bg: "bg-violet-50" },
//   { value: "intercom", label: "Intercom", Icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
//   { value: "announcement", label: "Notice", Icon: Bell, color: "text-rose-500", bg: "bg-rose-50" },
//   { value: "medical", label: "Medical", Icon: HeartPulse, color: "text-red-600", bg: "bg-red-50" },
//   { value: "pets", label: "Pets", Icon: Dog, color: "text-amber-600", bg: "bg-amber-50" },
//   { value: "bike", label: "Two Wheeler", Icon: Bike, color: "text-lime-600", bg: "bg-lime-50" },
//   { value: "fire", label: "Fire Safety", Icon: Flame, color: "text-orange-600", bg: "bg-orange-50" },
//   { value: "cold", label: "Cold Storage", Icon: Snowflake, color: "text-sky-600", bg: "bg-sky-50" },
//   { value: "elevator", label: "Elevator", Icon: ArrowUpDown, color: "text-gray-600", bg: "bg-gray-100" },
//   { value: "cctv", label: "CCTV", Icon: Camera, color: "text-slate-700", bg: "bg-slate-100" },
//   { value: "noise", label: "Noise", Icon: Volume2, color: "text-fuchsia-500", bg: "bg-fuchsia-50" },
//   { value: "maintenance", label: "Maintenance", Icon: Settings, color: "text-slate-500", bg: "bg-slate-50" },
//   { value: "other", label: "Other", Icon: MoreHorizontal, color: "text-slate-500", bg: "bg-slate-50" },
// ] as const;

// function getIconByKey(key?: string, size = 18) {
//   const opt = ICON_OPTIONS.find((o) => o.value === key) || ICON_OPTIONS[ICON_OPTIONS.length - 1];
//   const Icon = opt.Icon;
//   return <Icon size={size} className={opt.color} />;
// }

// function getIconBg(key?: string) {
//   const opt = ICON_OPTIONS.find((o) => o.value === key) || ICON_OPTIONS[ICON_OPTIONS.length - 1];
//   return opt.bg;
// }

// function resolveIcon(icon?: string, name?: string) {
//   const normalizedIcon = icon?.trim().toLowerCase();
//   if (normalizedIcon && ICON_OPTIONS.some((option) => option.value === normalizedIcon)) {
//     return normalizedIcon;
//   }

//   const normalizedName = (name || "").toLowerCase();
//   if (normalizedName.includes("plumb")) return "plumbing";
//   if (normalizedName.includes("water") || normalizedName.includes("leak")) return "water";
//   if (normalizedName.includes("electric") || normalizedName.includes("socket")) return "electrical";
//   if (normalizedName.includes("light")) return "lighting";
//   if (normalizedName.includes("park")) return "parking";
//   if (normalizedName.includes("community") || normalizedName.includes("hall")) return "community";
//   if (normalizedName.includes("clean") || normalizedName.includes("house")) return "housekeeping";
//   if (normalizedName.includes("security") || normalizedName.includes("guard")) return "security";
//   if (normalizedName.includes("key") || normalizedName.includes("access")) return "keys";
//   if (normalizedName.includes("internet") || normalizedName.includes("wifi")) return "internet";
//   if (normalizedName.includes("garden") || normalizedName.includes("plant")) return "garden";
//   if (normalizedName.includes("door") || normalizedName.includes("gate")) return "doors";
//   if (normalizedName.includes("paint")) return "painting";
//   if (normalizedName.includes("delivery") || normalizedName.includes("parcel")) return "delivery";
//   if (normalizedName.includes("medical") || normalizedName.includes("health")) return "medical";
//   if (normalizedName.includes("pet")) return "pets";
//   if (normalizedName.includes("bike") || normalizedName.includes("scooter")) return "bike";
//   if (normalizedName.includes("fire")) return "fire";
//   if (normalizedName.includes("elevator") || normalizedName.includes("lift")) return "elevator";
//   if (normalizedName.includes("camera") || normalizedName.includes("cctv")) return "cctv";
//   if (normalizedName.includes("noise")) return "noise";
//   if (normalizedName.includes("maintain")) return "maintenance";
//   return "other";
// }

// // ===================== TYPES =====================
// type RequestStatus = "Active" | "Inactive";
// type ResponseStatus = "Pending" | "Approved" | "Rejected";

// type QuestionType =
//   | "text"
//   | "textarea"
//   | "number"
//   | "date"
//   | "dropdown"
//   | "yesno"
//   | "attachment";

// interface Question {
//   id: number | string;
//   question: string;
//   type: QuestionType;
//   required: boolean;
//   options?: string[];
// }

// interface QuickRequestItem {
//   id: number | string;
//   name: string;
//   description: string;
//   status: RequestStatus;
//   icon?: string;
//   questions: Question[];
//   createdDate: string;
// }

// interface RequestResponse {
//   id: number | string;
//   requestTypeId?: number | string;
//   requestName: string;
//   requestedBy: string | number;
//   date: string;
//   status: ResponseStatus;
//   answers?: Record<string, any>;
//   questions?: Array<{ id: number | string; question: string }>;
//   reviewedBy?: string | number | null;
//   reviewedAt?: string | null;
//   rejectionReason?: string | null;
//   icon?: string;
// }

// const questionTypeLabels: Record<QuestionType, string> = {
//   text: "Text",
//   textarea: "Text Area",
//   number: "Number",
//   date: "Date",
//   dropdown: "Dropdown",
//   yesno: "Yes / No",
//   attachment: "Attachment",
// };

// const formatDate = (value?: string | null) => {
//   if (!value) return "—";
//   try {
//     return new Date(value).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   } catch {
//     return String(value);
//   }
// };

// // ===================== MAIN =====================
// export default function QuickRequest() {
//   const [activeSection, setActiveSection] = useState<"requests" | "create" | "responses">("requests");
//   const [requests, setRequests] = useState<QuickRequestItem[]>([]);
//   const [responses, setResponses] = useState<RequestResponse[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [responsesLoading, setResponsesLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // Alert (same pattern as Formify)
//   const [alert, setAlert] = useState<{
//     type: "success" | "warning" | "error";
//     message: string;
//   } | null>(null);
//   const [pendingDeleteId, setPendingDeleteId] = useState<number | string | null>(null);

//   const [requestFilter, setRequestFilter] = useState<"All" | "Active" | "Inactive">("All");
//   const [responseFilter, setResponseFilter] = useState<"All" | ResponseStatus>("All");
//   const [search, setSearch] = useState("");

//   const [selectedRequest, setSelectedRequest] = useState<QuickRequestItem | null>(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [showMenu, setShowMenu] = useState<number | string | null>(null);
//   const [showResponseDetails, setShowResponseDetails] = useState<RequestResponse | null>(null);
//   const [rejectionReason, setRejectionReason] = useState("");

//   // Creator
//   const [step, setStep] = useState(1);
//   const [requestName, setRequestName] = useState("");
//   const [description, setDescription] = useState("");
//   const [icon, setIcon] = useState<string>("other");
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [editingQuestionId, setEditingQuestionId] = useState<number | string | null>(null);
//   const [questionText, setQuestionText] = useState("");
//   const [questionType, setQuestionType] = useState<QuestionType>("text");
//   const [questionRequired, setQuestionRequired] = useState(true);
//   const [questionOptions, setQuestionOptions] = useState("");
//   const [showAllIcons, setShowAllIcons] = useState(false);

//   // ---------- LOAD ----------
//   const loadRequests = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API, { withCredentials: true });

//       if (!res.data?.success) {
//         setAlert({ type: "error", message: res.data?.message || "Failed to load request types" });
//         setRequests([]);
//         return;
//       }

//       const data = res.data.data || [];
//       setRequests(
//         data.map((item: any) => ({
//           id: item.id,
//           name: item.name,
//           description: item.description || "",
//           status: (item.status as RequestStatus) || "Active",
//           icon: resolveIcon(item.icon, item.name),
//           questions: (item.questions || []).map((q: any) => ({
//             id: q.id,
//             question: q.question,
//             type: (q.type as QuestionType) || "text",
//             required: Boolean(q.required),
//             options: Array.isArray(q.options) ? q.options : [],
//           })),
//           createdDate: formatDate(item.createdDate),
//         }))
//       );
//     } catch (err: any) {
//       console.error("loadRequests", err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || err.message || "Failed to load request types",
//       });
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const loadResponses = useCallback(async () => {
//     try {
//       setResponsesLoading(true);
//       const res = await axios.get(`${API}/responses`, { withCredentials: true });

//       if (!res.data?.success) {
//         setAlert({ type: "error", message: res.data?.message || "Failed to load responses" });
//         setResponses([]);
//         return;
//       }

//       const data = res.data.data || [];
//       setResponses(
//         data.map((item: any) => ({
//           id: item.id,
//           requestTypeId: item.requestTypeId,
//           requestName: item.requestName || "Unknown Request",
//           icon: item.icon || undefined,
//           requestedBy: item.requestedBy,
//           date: formatDate(item.date || item.submittedAt),
//           status: (item.status as ResponseStatus) || "Pending",
//           answers: item.answers || {},
//           questions: Array.isArray(item.questions) ? item.questions : [],
//           reviewedBy: item.reviewedBy,
//           reviewedAt: item.reviewedAt,
//           rejectionReason: item.rejectionReason,
//         }))
//       );
//     } catch (err: any) {
//       console.error("loadResponses", err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || err.message || "Failed to load responses",
//       });
//       setResponses([]);
//     } finally {
//       setResponsesLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadRequests();
//   }, [loadRequests]);

//   useEffect(() => {
//     if (activeSection === "responses") loadResponses();
//   }, [activeSection, loadResponses]);

//   // ---------- CREATOR HELPERS ----------
//   const resetCreator = () => {
//     setRequestName("");
//     setDescription("");
//     setIcon("other");
//     setShowAllIcons(false);
//     setQuestions([]);
//     setEditingQuestionId(null);
//     setQuestionText("");
//     setQuestionType("text");
//     setQuestionRequired(true);
//     setQuestionOptions("");
//     setStep(1);
//     setSelectedRequest(null);
//   };

//   const startCreate = () => {
//     resetCreator();
//     setActiveSection("create");
//   };

//   const editRequest = (request: QuickRequestItem) => {
//     setSelectedRequest(request);
//     setRequestName(request.name);
//     setDescription(request.description);
//     setIcon(request.icon || "other");
//     setQuestions(request.questions);
//     setStep(1);
//     setActiveSection("create");
//     setShowMenu(null);
//   };

//   const duplicateRequest = async (request: QuickRequestItem) => {
//     try {
//       setSaving(true);
//       await axios.post(
//         API,
//         {
//           name: `${request.name} Copy`,
//           description: request.description,
//           status: "Active",
//           icon: request.icon || "other",
//           questions: request.questions.map((q) => ({
//             question: q.question,
//             type: q.type,
//             required: q.required,
//             options: q.options || [],
//           })),
//         },
//         { withCredentials: true }
//       );
//       await loadRequests();
//       setShowMenu(null);
//       setAlert({ type: "success", message: "Request type duplicated successfully" });
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to duplicate",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ---------- DELETE ----------
//   const confirmDelete = (request: QuickRequestItem) => {
//     setPendingDeleteId(request.id);
//     setAlert({
//       type: "warning",
//       message: `Are you sure you want to delete "${request.name}"? This cannot be undone.`,
//     });
//     setShowMenu(null);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!pendingDeleteId) return;
//     try {
//       setSaving(true);
//       await axios.delete(`${API}/${pendingDeleteId}`, { withCredentials: true });
//       setPendingDeleteId(null);
//       setAlert(null);
//       await loadRequests();
//       setAlert({ type: "success", message: "Request type deleted successfully" });
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to delete",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const toggleStatus = async (request: QuickRequestItem) => {
//     const next: RequestStatus = request.status === "Active" ? "Inactive" : "Active";
//     try {
//       await axios.patch(
//         `${API}/${request.id}/status`,
//         { status: next },
//         { withCredentials: true }
//       );
//       setShowMenu(null);
//       await loadRequests();
//       setAlert({ type: "success", message: `Request type marked as ${next}` });
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to update status",
//       });
//     }
//   };

//   // ---------- QUESTIONS ----------
//   const resetQuestionForm = () => {
//     setQuestionText("");
//     setQuestionType("text");
//     setQuestionRequired(true);
//     setQuestionOptions("");
//     setEditingQuestionId(null);
//   };

//   const addQuestion = () => {
//     if (!questionText.trim()) return;
//     const newQ: Question = {
//       id: Date.now(),
//       question: questionText.trim(),
//       type: questionType,
//       required: questionRequired,
//       ...(questionType === "dropdown"
//         ? {
//             options: questionOptions
//               .split(",")
//               .map((s) => s.trim())
//               .filter(Boolean),
//           }
//         : {}),
//     };
//     setQuestions((prev) => [...prev, newQ]);
//     resetQuestionForm();
//   };

//   const updateQuestion = () => {
//     if (!editingQuestionId || !questionText.trim()) return;
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === editingQuestionId
//           ? {
//               ...q,
//               question: questionText.trim(),
//               type: questionType,
//               required: questionRequired,
//               options:
//                 questionType === "dropdown"
//                   ? questionOptions
//                       .split(",")
//                       .map((s) => s.trim())
//                       .filter(Boolean)
//                   : undefined,
//             }
//           : q
//       )
//     );
//     resetQuestionForm();
//   };

//   const startEditQuestion = (q: Question) => {
//     setEditingQuestionId(q.id);
//     setQuestionText(q.question);
//     setQuestionType(q.type);
//     setQuestionRequired(q.required);
//     setQuestionOptions(q.options?.join(", ") || "");
//   };

//   const deleteQuestion = (id: number | string) => {
//     setQuestions((prev) => prev.filter((q) => q.id !== id));
//   };

//   // ---------- SAVE ----------
//   const saveRequest = async () => {
//     if (!requestName.trim()) {
//       setAlert({ type: "warning", message: "Request name is required" });
//       return;
//     }
//     if (questions.length === 0) {
//       setAlert({ type: "warning", message: "At least one question is required" });
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         name: requestName.trim(),
//         description,
//         status: selectedRequest?.status || "Active",
//         icon: icon || "other",
//         questions: questions.map((q) => ({
//           question: q.question,
//           type: q.type,
//           required: q.required,
//           options: q.options || [],
//         })),
//       };

//       if (selectedRequest) {
//         await axios.put(`${API}/${selectedRequest.id}`, payload, {
//           withCredentials: true,
//         });
//       } else {
//         await axios.post(API, payload, { withCredentials: true });
//       }

//       await loadRequests();
//       resetCreator();
//       setActiveSection("requests");
//       setAlert({
//         type: "success",
//         message: selectedRequest
//           ? "Request type updated successfully"
//           : "Request type created successfully",
//       });
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to save",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ---------- RESPONSE STATUS ----------
//   const updateResponseStatus = async (
//     id: number | string,
//     status: ResponseStatus,
//     reason?: string
//   ) => {
//     try {
//       await axios.patch(
//         `${API}/responses/${id}/status`,
//         {
//           status,
//           rejectionReason: status === "Rejected" ? reason || null : null,
//         },
//         { withCredentials: true }
//       );

//       await loadResponses();

//       setShowResponseDetails((prev) =>
//         prev && prev.id === id
//           ? {
//               ...prev,
//               status,
//               rejectionReason: status === "Rejected" ? reason || null : null,
//             }
//           : prev
//       );

//       setRejectionReason("");

//       if (status === "Approved") {
//         setAlert({ type: "success", message: "Request approved successfully" });
//       } else if (status === "Rejected") {
//         setAlert({ type: "success", message: "Request rejected successfully" });
//       }
//     } catch (err: any) {
//       console.error(err);
//       setAlert({
//         type: "error",
//         message: err?.response?.data?.message || "Failed to update response status",
//       });
//     }
//   };

//   // ---------- FILTERS ----------
//   const filteredRequests = requests.filter((r) => {
//     const okStatus = requestFilter === "All" || r.status === requestFilter;
//     const okSearch = r.name.toLowerCase().includes(search.toLowerCase());
//     return okStatus && okSearch;
//   });

//   const filteredResponses = responses.filter(
//     (r) => responseFilter === "All" || r.status === responseFilter
//   );

//   const getResponseStatusClass = (status: ResponseStatus) => {
//     if (status === "Approved") return "bg-emerald-50 text-emerald-700 border-emerald-200";
//     if (status === "Rejected") return "bg-rose-50 text-rose-700 border-rose-200";
//     return "bg-amber-50 text-amber-700 border-amber-200";
//   };

//   // ---------- LOADING ----------
//   if (loading && activeSection === "requests") {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
//         <Loader2 size={22} className="animate-spin mr-2" />
//         Loading request types...
//       </div>
//     );
//   }

//   return (
//     <div className="min-w-0 space-y-6 p-4 pb-8 sm:p-5 lg:p-6">
//       {/* ===== Alert (same as Formify) ===== */}
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => {
//             setAlert(null);
//             setPendingDeleteId(null);
//           }}
//           confirm={!!pendingDeleteId}
//           onConfirm={handleDeleteConfirm}
//           confirmText="Yes, Delete"
//           cancelText="Cancel"
//         />
//       )}

//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-xl font-semibold text-slate-900">Quick Requests</h1>
//           <p className="mt-0.5 text-sm text-slate-500">
//             Create request types and manage user submissions
//           </p>
//         </div>

//         {activeSection !== "create" && (
//           <button
//             onClick={startCreate}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
//           >
//             <Plus size={18} />
//             New Request Type
//           </button>
//         )}
//       </div>

//       {/* Tabs */}
//       {activeSection !== "create" && (
//         <div className="flex gap-2">
//           <button
//             onClick={() => {
//               setActiveSection("requests");
//               setSearch("");
//             }}
//             className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
//               activeSection === "requests"
//                 ? "bg-blue-600 text-white shadow-sm"
//                 : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
//             }`}
//           >
//             Request Types
//           </button>
//           <button
//             onClick={() => setActiveSection("responses")}
//             className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
//               activeSection === "responses"
//                 ? "bg-blue-600 text-white shadow-sm"
//                 : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
//             }`}
//           >
//             Responses
//           </button>
//         </div>
//       )}

//       {/* ===================== REQUEST TYPES ===================== */}
//       {activeSection === "requests" && (
//         <div className="space-y-5">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="relative max-w-md flex-1">
//               <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by name..."
//                 className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//               />
//             </div>
//             <div className="flex gap-1.5">
//               {(["All", "Active", "Inactive"] as const).map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => setRequestFilter(f)}
//                   className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
//                     requestFilter === f
//                       ? "bg-blue-600 text-white"
//                       : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
//                   }`}
//                 >
//                   {f}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {filteredRequests.length === 0 ? (
//             <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center shadow-sm">
//               <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
//                 <FileText size={22} className="text-slate-400" />
//               </div>
//               <h3 className="font-medium text-slate-700">No request types found</h3>
//               <p className="mt-1 text-sm text-slate-500">Create your first request type</p>
//               <button
//                 onClick={startCreate}
//                 className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 <Plus size={16} /> Create Request Type
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//               {filteredRequests.map((request) => {
//                 const iconKey = resolveIcon(request.icon, request.name);
//                 return (
//                   <div
//                     key={request.id}
//                     className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-3 transition hover:border-slate-300 hover:shadow-md"
//                   >
//                   <div className="absolute right-2 top-2">
//   <button
//     onClick={() => setShowMenu(showMenu === request.id ? null : request.id)}
//     className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
//   >
//     <MoreVertical size={15} />
//   </button>
//   {showMenu === request.id && (
//     <div className="absolute right-0 top-8 z-20 w-40 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
//       <button
//         onClick={() => {
//           setSelectedRequest(request);
//           setShowPreview(true);
//           setShowMenu(null);
//         }}
//         className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
//       >
//         <Eye size={14} /> View
//       </button>
//       <button
//         onClick={() => editRequest(request)}
//         className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
//       >
//         <Edit2 size={14} /> Edit
//       </button>
//       <button
//         onClick={() => duplicateRequest(request)}
//         className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
//       >
//         <Copy size={14} /> Duplicate
//       </button>
//       <button
//         onClick={() => toggleStatus(request)}
//         className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
//       >
//         {request.status === "Active" ? (
//           <>
//             <XCircle size={14} /> Mark Inactive
//           </>
//         ) : (
//           <>
//             <CheckCircle2 size={14} /> Mark Active
//           </>
//         )}
//       </button>
//       <button
//         onClick={() => confirmDelete(request)}
//         className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50"
//       >
//         <Trash2 size={14} /> Delete
//       </button>
//     </div>
//   )}
// </div>

//                     <div className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg ${getIconBg(iconKey)}`}>
//                       {getIconByKey(iconKey, 17)}
//                     </div>

//                     <h3 className="pr-5 text-[13px] font-semibold leading-tight text-slate-900 line-clamp-1">
//                       {request.name}
//                     </h3>

//                     <p className="mt-1 line-clamp-2 min-h-[32px] text-[11px] text-slate-500 flex-1">
//                       {request.description || "No description"}
//                     </p>

//                     <div className="mt-2">
//                       <span
//                         className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
//                           request.status === "Active"
//                             ? "bg-emerald-50 text-emerald-700"
//                             : "bg-slate-100 text-slate-500"
//                         }`}
//                       >
//                         {request.status}
//                       </span>
//                     </div>

//                     <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-500">
//                       <span className="flex items-center gap-1">
//                         <FileText size={12} /> {request.questions.length}
//                       </span>
//                       <span>{request.createdDate}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ===================== CREATE / EDIT ===================== */}
//       {activeSection === "create" && (
//         <div className="mx-auto max-w-2xl">
//           <button
//             onClick={() => {
//               resetCreator();
//               setActiveSection("requests");
//             }}
//             className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
//           >
//             <ArrowLeft size={16} /> Back to request types
//           </button>

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-slate-900">
//               {selectedRequest ? "Edit Request Type" : "Create Request Type"}
//             </h2>
//             <p className="mt-1 text-sm text-slate-500">
//               Users will see this form when they submit a request
//             </p>
//           </div>

//           {/* Progress */}
//           <div className="mb-8 flex items-center gap-2">
//             {[1, 2, 3].map((s) => (
//               <React.Fragment key={s}>
//                 <button
//                   onClick={() => {
//                     if (s === 1 || (s === 2 && requestName) || (s === 3 && requestName && questions.length > 0)) {
//                       setStep(s);
//                     }
//                   }}
//                   className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${
//                     step === s
//                       ? "bg-blue-600 text-white"
//                       : step > s
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-slate-100 text-slate-400"
//                   }`}
//                 >
//                   {step > s ? <CheckCircle2 size={16} /> : s}
//                 </button>
//                 {s < 3 && (
//                   <div className={`h-0.5 flex-1 rounded ${step > s ? "bg-blue-200" : "bg-slate-100"}`} />
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Step 1 */}
//           {step === 1 && (
//             <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//               <div className="space-y-5">
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                     Request Name <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     value={requestName}
//                     onChange={(e) => setRequestName(e.target.value)}
//                     placeholder="e.g. Maintenance Request"
//                     className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     rows={3}
//                     placeholder="Briefly describe what this request is for..."
//                     className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-slate-700">Icon</label>
//                   <div className="mb-3 flex items-center gap-3">
//                     <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 ${getIconBg(icon)}`}>
//                       {getIconByKey(icon, 22)}
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <p className="text-sm font-medium text-slate-800">
//                         {ICON_OPTIONS.find((o) => o.value === icon)?.label || "Other"}
//                       </p>
//                       <p className="text-xs text-slate-500">Selected icon for this request type</p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => setShowAllIcons((v) => !v)}
//                       className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition"
//                     >
//                       {showAllIcons ? "Hide icons" : "Change icon"}
//                       <ChevronRight size={14} className={`transition-transform ${showAllIcons ? "rotate-90" : ""}`} />
//                     </button>
//                   </div>

//                   {showAllIcons && (
//                     <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
//                       <div className="grid max-h-56 grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-5 md:grid-cols-6">
//                         {ICON_OPTIONS.map((opt) => {
//                           const Icon = opt.Icon;
//                           const selected = icon === opt.value;
//                           return (
//                             <button
//                               key={opt.value}
//                               type="button"
//                               onClick={() => {
//                                 setIcon(opt.value);
//                                 setShowAllIcons(false);
//                               }}
//                               title={opt.label}
//                               className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 transition ${
//                                 selected
//                                   ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
//                                   : "border-slate-200 bg-white hover:border-slate-300"
//                               }`}
//                             >
//                               <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${opt.bg}`}>
//                                 <Icon size={16} className={opt.color} />
//                               </div>
//                               <span className="w-full text-center text-[10px] font-medium leading-tight text-slate-600 line-clamp-1">
//                                 {opt.label}
//                               </span>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-8 flex justify-end">
//                 <button
//                   disabled={!requestName.trim()}
//                   onClick={() => setStep(2)}
//                   className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
//                 >
//                   Continue <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 2 */}
//           {step === 2 && (
//             <div className="space-y-5">
//               <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//                 <div className="mb-5 flex items-center justify-between">
//                   <div>
//                     <h3 className="font-medium text-slate-900">Questions</h3>
//                     <p className="text-sm text-slate-500">What information do you need from users?</p>
//                   </div>
//                   <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
//                     {questions.length} added
//                   </span>
//                 </div>

//                 {questions.length > 0 && (
//                   <div className="mb-6 space-y-3">
//                     {questions.map((q, index) => (
//                       <div key={q.id} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
//                         <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-slate-500 shadow-sm">
//                           {index + 1}
//                         </span>
//                         <div className="min-w-0 flex-1">
//                           <p className="font-medium text-slate-800">{q.question}</p>
//                           <div className="mt-1 flex gap-2 text-xs text-slate-500">
//                             <span>{questionTypeLabels[q.type]}</span>
//                             {q.required && <span className="text-rose-500">Required</span>}
//                           </div>
//                         </div>
//                         <div className="flex gap-1">
//                           <button onClick={() => startEditQuestion(q)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-blue-600">
//                             <Edit2 size={14} />
//                           </button>
//                           <button onClick={() => deleteQuestion(q.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-rose-600">
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
//                   <p className="mb-3 text-sm font-medium text-slate-700">
//                     {editingQuestionId ? "Edit question" : "Add a question"}
//                   </p>
//                   <div className="space-y-3">
//                     <input
//                       value={questionText}
//                       onChange={(e) => setQuestionText(e.target.value)}
//                       placeholder="e.g. What is the issue?"
//                       className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       <select
//                         value={questionType}
//                         onChange={(e) => setQuestionType(e.target.value as QuestionType)}
//                         className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
//                       >
//                         <option value="text">Text</option>
//                         <option value="textarea">Text Area</option>
//                         <option value="number">Number</option>
//                         <option value="date">Date</option>
//                         <option value="dropdown">Dropdown</option>
//                         <option value="yesno">Yes / No</option>
//                         <option value="attachment">Attachment</option>
//                       </select>
//                       <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600">
//                         <input
//                           type="checkbox"
//                           checked={questionRequired}
//                           onChange={(e) => setQuestionRequired(e.target.checked)}
//                           className="h-4 w-4 rounded"
//                         />
//                         Required
//                       </label>
//                     </div>
//                     {questionType === "dropdown" && (
//                       <input
//                         value={questionOptions}
//                         onChange={(e) => setQuestionOptions(e.target.value)}
//                         placeholder="Options (comma separated)"
//                         className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
//                       />
//                     )}
//                     <div className="flex gap-2">
//                       <button
//                         onClick={editingQuestionId ? updateQuestion : addQuestion}
//                         disabled={!questionText.trim()}
//                         className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
//                       >
//                         {editingQuestionId ? (
//                           <><CheckCircle2 size={15} /> Update</>
//                         ) : (
//                           <><Plus size={15} /> Add</>
//                         )}
//                       </button>
//                       {editingQuestionId && (
//                         <button onClick={resetQuestionForm} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
//                           Cancel
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-between">
//                 <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
//                   <ChevronLeft size={16} /> Back
//                 </button>
//                 <button
//                   disabled={questions.length === 0}
//                   onClick={() => setStep(3)}
//                   className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
//                 >
//                   Preview <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 3 */}
//           {step === 3 && (
//             <div className="space-y-5">
//               <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//                 <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${getIconBg(icon)}`}>
//                     {getIconByKey(icon, 20)}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-slate-900">{requestName}</h3>
//                     <p className="text-sm text-slate-500">{description || "Users will fill out this form"}</p>
//                   </div>
//                 </div>

//                 <div className="space-y-5">
//                   {questions.map((q) => (
//                     <div key={q.id}>
//                       <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                         {q.question}
//                         {q.required && <span className="ml-1 text-rose-500">*</span>}
//                       </label>
//                       {q.type === "textarea" && <textarea rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" disabled />}
//                       {q.type === "text" && <input type="text" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" disabled />}
//                       {q.type === "number" && <input type="number" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" disabled />}
//                       {q.type === "date" && <input type="date" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" disabled />}
//                       {q.type === "dropdown" && (
//                         <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm" disabled>
//                           <option>Select an option</option>
//                           {q.options?.map((o) => <option key={o}>{o}</option>)}
//                         </select>
//                       )}
//                       {q.type === "yesno" && (
//                         <div className="flex gap-4 text-sm text-slate-600">
//                           <label className="flex items-center gap-2"><input type="radio" disabled /> Yes</label>
//                           <label className="flex items-center gap-2"><input type="radio" disabled /> No</label>
//                         </div>
//                       )}
//                       {q.type === "attachment" && (
//                         <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
//                           Upload file
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex justify-between">
//                 <button onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
//                   <ChevronLeft size={16} /> Back
//                 </button>
//                 <button
//                   onClick={saveRequest}
//                   disabled={saving}
//                   className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
//                 >
//                   {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
//                   {selectedRequest ? "Save Changes" : "Create Request Type"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ===================== RESPONSES ===================== */}
//       {activeSection === "responses" && (
//         <div className="space-y-5">
//           {responsesLoading ? (
//             <div className="flex items-center justify-center py-16 text-slate-500">
//               <Loader2 size={20} className="mr-2 animate-spin" /> Loading responses...
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                 <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-amber-50/80 to-white p-4 shadow-sm">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
//                       <Clock3 size={20} />
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-slate-900">
//                         {responses.filter((r) => r.status === "Pending").length}
//                       </p>
//                       <p className="text-sm font-medium text-slate-700">Pending</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-emerald-50/80 to-white p-4 shadow-sm">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
//                       <CheckCircle2 size={20} />
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-slate-900">
//                         {responses.filter((r) => r.status === "Approved").length}
//                       </p>
//                       <p className="text-sm font-medium text-slate-700">Approved</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-rose-50/80 to-white p-4 shadow-sm">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
//                       <XCircle size={20} />
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-slate-900">
//                         {responses.filter((r) => r.status === "Rejected").length}
//                       </p>
//                       <p className="text-sm font-medium text-slate-700">Rejected</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h3 className="font-medium text-slate-900">All Responses</h3>
//                     <p className="text-sm text-slate-500">Review and manage submitted requests</p>
//                   </div>
//                   <div className="flex flex-wrap gap-1.5">
//                     {(["All", "Pending", "Approved", "Rejected"] as const).map((f) => (
//                       <button
//                         key={f}
//                         onClick={() => setResponseFilter(f)}
//                         className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
//                           responseFilter === f ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                         }`}
//                       >
//                         {f}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="divide-y divide-slate-100">
//                   {filteredResponses.length === 0 ? (
//                     <div className="py-14 text-center">
//                       <FileText size={28} className="mx-auto mb-3 text-slate-300" />
//                       <p className="font-medium text-slate-600">No responses found</p>
//                     </div>
//                   ) : (
//                     filteredResponses.map((response) => {
//                       const iconKey = resolveIcon(response.icon, response.requestName);
//                       return (
//                         <div key={response.id} className="flex items-center justify-between gap-4 px-4 py-3.5 transition hover:bg-slate-50/60">
//                           <div className="flex min-w-0 items-center gap-3">
//                             <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${getIconBg(iconKey)}`}>
//                               {getIconByKey(iconKey, 16)}
//                             </div>
//                             <div className="min-w-0">
//                               <p className="truncate text-sm font-medium text-slate-900">{response.requestName}</p>
//                               <p className="flex items-center gap-1.5 text-xs text-slate-500">
//                                 <Users size={12} /> {response.requestedBy} · {response.date}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-2">
//                             <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getResponseStatusClass(response.status)}`}>
//                               {response.status}
//                             </span>

//                             {response.status === "Pending" && (
//                               <>
//                                 <button
//                                   onClick={() => updateResponseStatus(response.id, "Approved")}
//                                   className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
//                                 >
//                                   <CheckCircle2 size={13} /> Approve
//                                 </button>
//                                 <button
//                                   onClick={() => {
//                                     setShowResponseDetails(response);
//                                     setRejectionReason("");
//                                   }}
//                                   className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-rose-700"
//                                 >
//                                   <XCircle size={13} /> Reject
//                                 </button>
//                               </>
//                             )}

//                             <button
//                               onClick={() => {
//                                 setShowResponseDetails(response);
//                                 setRejectionReason(response.rejectionReason || "");
//                               }}
//                               className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
//                             >
//                               View
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* Preview Modal */}
//       {showPreview && selectedRequest && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
//           <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
//               <div className="flex items-center gap-3">
//                 <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${getIconBg(selectedRequest.icon)}`}>
//                   {getIconByKey(selectedRequest.icon, 18)}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-slate-900">{selectedRequest.name}</h3>
//                   <p className="text-xs text-slate-500">How users will see this form</p>
//                 </div>
//               </div>
//               <button onClick={() => setShowPreview(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
//                 <X size={18} />
//               </button>
//             </div>
//             <div className="p-5">
//               <p className="mb-5 text-sm text-slate-600">{selectedRequest.description}</p>
//               <div className="space-y-4">
//                 {selectedRequest.questions.map((q) => (
//                   <div key={q.id}>
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       {q.question}
//                       {q.required && <span className="ml-1 text-rose-500">*</span>}
//                     </label>
//                     {q.type === "textarea" ? (
//                       <textarea rows={2} className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm" disabled />
//                     ) : q.type === "dropdown" ? (
//                       <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm" disabled>
//                         <option>Select...</option>
//                         {q.options?.map((o) => <option key={o}>{o}</option>)}
//                       </select>
//                     ) : q.type === "yesno" ? (
//                       <div className="flex gap-4 text-sm text-slate-600">
//                         <label className="flex items-center gap-1.5"><input type="radio" disabled /> Yes</label>
//                         <label className="flex items-center gap-1.5"><input type="radio" disabled /> No</label>
//                       </div>
//                     ) : q.type === "attachment" ? (
//                       <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-4 text-center text-sm text-slate-400">Upload file</div>
//                     ) : (
//                       <input
//                         type={q.type === "number" ? "number" : q.type === "date" ? "date" : "text"}
//                         className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
//                         disabled
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <button onClick={() => setShowPreview(false)} className="mt-6 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Response Details Modal */}
//       {showResponseDetails && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
//               <div>
//                 <h3 className="font-semibold text-slate-900">Response Details</h3>
//                 <p className="mt-0.5 text-xs text-slate-500">{showResponseDetails.requestName}</p>
//               </div>
//               <button
//                 onClick={() => {
//                   setShowResponseDetails(null);
//                   setRejectionReason("");
//                 }}
//                 className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="max-h-[60vh] space-y-5 overflow-y-auto p-5">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Requested By</p>
//                   <p className="mt-1 text-sm text-slate-700">{showResponseDetails.requestedBy}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Date</p>
//                   <p className="mt-1 text-sm text-slate-700">{showResponseDetails.date}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Status</p>
//                   <span className={`mt-1.5 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${getResponseStatusClass(showResponseDetails.status)}`}>
//                     {showResponseDetails.status}
//                   </span>
//                 </div>
//               </div>

//               {showResponseDetails.answers && Object.keys(showResponseDetails.answers).length > 0 && (
//                 <div>
//                   <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Submitted Answers</p>
//                   <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
//                     <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
//                       <span>Question</span>
//                       <span>Submitted</span>
//                     </div>
//                     <div className="divide-y divide-slate-100">
//                       {Object.entries(showResponseDetails.answers).map(([key, value]) => {
//                         const question = showResponseDetails.questions?.find((item) => String(item.id) === key);
//                         return (
//                           <div key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 py-2.5">
//                             <span className="break-words text-sm font-medium text-slate-600">
//                               {question?.question || key}
//                             </span>
//                             <span className="break-words text-sm text-slate-800">
//                               {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value ?? "—")}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {showResponseDetails.status === "Rejected" && showResponseDetails.rejectionReason && (
//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Rejection Reason</p>
//                   <p className="mt-1 text-sm text-rose-700">{showResponseDetails.rejectionReason}</p>
//                 </div>
//               )}

//               {showResponseDetails.status === "Pending" && (
//                 <div>
//                   <label className="mb-1.5 block text-xs font-medium text-slate-500">
//                     Rejection reason (required when rejecting)
//                   </label>
//                   <textarea
//                     value={rejectionReason}
//                     onChange={(e) => setRejectionReason(e.target.value)}
//                     rows={2}
//                     placeholder="Required for reject..."
//                     className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="border-t border-slate-100 p-4">
//               {showResponseDetails.status === "Pending" ? (
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => updateResponseStatus(showResponseDetails.id, "Approved")}
//                     className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
//                   >
//                     <CheckCircle2 size={16} /> Approve
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (!rejectionReason.trim()) {
//                         setAlert({
//                           type: "warning",
//                           message: "Please enter a rejection reason before rejecting",
//                         });
//                         return;
//                       }
//                       updateResponseStatus(showResponseDetails.id, "Rejected", rejectionReason.trim());
//                     }}
//                     className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
//                   >
//                     <XCircle size={16} /> Reject
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setShowResponseDetails(null);
//                     setRejectionReason("");
//                   }}
//                   className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
//                 >
//                   Close
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Copy,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronRight,
  ChevronLeft,
  FileText,
  Users,
  AlertCircle,
  X,
  ArrowLeft,
  Loader2,
  Wrench,
  Zap,
  Car,
  Calendar,
  Brush,
  MoreHorizontal,
  Droplets,
  Lightbulb,
  Fan,
  Shield,
  Key,
  Wifi,
  Trash2 as TrashIcon,
  TreePine,
  Building2,
  DoorOpen,
  Hammer,
  Paintbrush,
  Package,
  Phone,
  Bell,
  HeartPulse,
  Dog,
  Bike,
  Flame,
  Snowflake,
  ArrowUpDown,
  Camera,
  Volume2,
  Settings,
} from "lucide-react";

import Alert from "../../../../../../components/Aleartmessage"; // adjust path if needed

// ===================== API =====================
const API = `${import.meta.env.VITE_BACKEND_URL}/api/quick-requests`;

// ===================== ICON OPTIONS =====================
const ICON_OPTIONS = [
  { value: "plumbing", label: "Plumbing", Icon: Wrench, color: "text-blue-500", bg: "bg-blue-50" },
  { value: "water", label: "Water", Icon: Droplets, color: "text-sky-500", bg: "bg-sky-50" },
  { value: "electrical", label: "Electrical", Icon: Zap, color: "text-emerald-500", bg: "bg-emerald-50" },
  { value: "lighting", label: "Lighting", Icon: Lightbulb, color: "text-yellow-500", bg: "bg-yellow-50" },
  { value: "parking", label: "Parking", Icon: Car, color: "text-purple-500", bg: "bg-purple-50" },
  { value: "community", label: "Community", Icon: Calendar, color: "text-amber-500", bg: "bg-amber-50" },
  { value: "housekeeping", label: "Housekeeping", Icon: Brush, color: "text-teal-500", bg: "bg-teal-50" },
  { value: "hvac", label: "AC / HVAC", Icon: Fan, color: "text-cyan-500", bg: "bg-cyan-50" },
  { value: "security", label: "Security", Icon: Shield, color: "text-red-500", bg: "bg-red-50" },
  { value: "keys", label: "Keys / Access", Icon: Key, color: "text-orange-500", bg: "bg-orange-50" },
  { value: "internet", label: "Internet", Icon: Wifi, color: "text-indigo-500", bg: "bg-indigo-50" },
  { value: "waste", label: "Waste", Icon: TrashIcon, color: "text-stone-500", bg: "bg-stone-50" },
  { value: "garden", label: "Garden", Icon: TreePine, color: "text-green-600", bg: "bg-green-50" },
  { value: "building", label: "Building", Icon: Building2, color: "text-slate-600", bg: "bg-slate-100" },
  { value: "doors", label: "Doors", Icon: DoorOpen, color: "text-amber-700", bg: "bg-amber-50" },
  { value: "carpentry", label: "Carpentry", Icon: Hammer, color: "text-yellow-700", bg: "bg-yellow-50" },
  { value: "painting", label: "Painting", Icon: Paintbrush, color: "text-pink-500", bg: "bg-pink-50" },
  { value: "delivery", label: "Delivery", Icon: Package, color: "text-violet-500", bg: "bg-violet-50" },
  { value: "intercom", label: "Intercom", Icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
  { value: "announcement", label: "Notice", Icon: Bell, color: "text-rose-500", bg: "bg-rose-50" },
  { value: "medical", label: "Medical", Icon: HeartPulse, color: "text-red-600", bg: "bg-red-50" },
  { value: "pets", label: "Pets", Icon: Dog, color: "text-amber-600", bg: "bg-amber-50" },
  { value: "bike", label: "Two Wheeler", Icon: Bike, color: "text-lime-600", bg: "bg-lime-50" },
  { value: "fire", label: "Fire Safety", Icon: Flame, color: "text-orange-600", bg: "bg-orange-50" },
  { value: "cold", label: "Cold Storage", Icon: Snowflake, color: "text-sky-600", bg: "bg-sky-50" },
  { value: "elevator", label: "Elevator", Icon: ArrowUpDown, color: "text-gray-600", bg: "bg-gray-100" },
  { value: "cctv", label: "CCTV", Icon: Camera, color: "text-slate-700", bg: "bg-slate-100" },
  { value: "noise", label: "Noise", Icon: Volume2, color: "text-fuchsia-500", bg: "bg-fuchsia-50" },
  { value: "maintenance", label: "Maintenance", Icon: Settings, color: "text-slate-500", bg: "bg-slate-50" },
  { value: "other", label: "Other", Icon: MoreHorizontal, color: "text-slate-500", bg: "bg-slate-50" },
] as const;

function getIconByKey(key?: string, size = 18) {
  const opt = ICON_OPTIONS.find((o) => o.value === key) || ICON_OPTIONS[ICON_OPTIONS.length - 1];
  const Icon = opt.Icon;
  return <Icon size={size} className={opt.color} />;
}

function getIconBg(key?: string) {
  const opt = ICON_OPTIONS.find((o) => o.value === key) || ICON_OPTIONS[ICON_OPTIONS.length - 1];
  return opt.bg;
}

function resolveIcon(icon?: string, name?: string) {
  const normalizedIcon = icon?.trim().toLowerCase();
  if (normalizedIcon && ICON_OPTIONS.some((option) => option.value === normalizedIcon)) {
    return normalizedIcon;
  }

  const normalizedName = (name || "").toLowerCase();
  if (normalizedName.includes("plumb")) return "plumbing";
  if (normalizedName.includes("water") || normalizedName.includes("leak")) return "water";
  if (normalizedName.includes("electric") || normalizedName.includes("socket")) return "electrical";
  if (normalizedName.includes("light")) return "lighting";
  if (normalizedName.includes("park")) return "parking";
  if (normalizedName.includes("community") || normalizedName.includes("hall")) return "community";
  if (normalizedName.includes("clean") || normalizedName.includes("house")) return "housekeeping";
  if (normalizedName.includes("security") || normalizedName.includes("guard")) return "security";
  if (normalizedName.includes("key") || normalizedName.includes("access")) return "keys";
  if (normalizedName.includes("internet") || normalizedName.includes("wifi")) return "internet";
  if (normalizedName.includes("garden") || normalizedName.includes("plant")) return "garden";
  if (normalizedName.includes("door") || normalizedName.includes("gate")) return "doors";
  if (normalizedName.includes("paint")) return "painting";
  if (normalizedName.includes("delivery") || normalizedName.includes("parcel")) return "delivery";
  if (normalizedName.includes("medical") || normalizedName.includes("health")) return "medical";
  if (normalizedName.includes("pet")) return "pets";
  if (normalizedName.includes("bike") || normalizedName.includes("scooter")) return "bike";
  if (normalizedName.includes("fire")) return "fire";
  if (normalizedName.includes("elevator") || normalizedName.includes("lift")) return "elevator";
  if (normalizedName.includes("camera") || normalizedName.includes("cctv")) return "cctv";
  if (normalizedName.includes("noise")) return "noise";
  if (normalizedName.includes("maintain")) return "maintenance";
  return "other";
}

// ===================== TYPES =====================
type RequestStatus = "Active" | "Inactive";
type ResponseStatus = "Pending" | "Approved" | "Rejected";

type QuestionType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "dropdown"
  | "yesno";

interface Question {
  id: number | string;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

interface QuickRequestItem {
  id: number | string;
  name: string;
  description: string;
  status: RequestStatus;
  icon?: string;
  questions: Question[];
  createdDate: string;
}

interface RequestResponse {
  id: number | string;
  requestTypeId?: number | string;
  requestName: string;
  requestedBy: string | number;
  date: string;
  status: ResponseStatus;
  answers?: Record<string, any>;
  questions?: Array<{ id: number | string; question: string }>;
  reviewedBy?: string | number | null;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  approvalComment?: string | null;
  icon?: string;
}

const questionTypeLabels: Record<QuestionType, string> = {
  text: "Text",
  textarea: "Text Area",
  number: "Number",
  date: "Date",
  dropdown: "Dropdown",
  yesno: "Yes / No",
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(value);
  }
};

// ===================== MAIN =====================
export default function QuickRequest() {
  const [activeSection, setActiveSection] = useState<"requests" | "create" | "responses">("requests");
  const [requests, setRequests] = useState<QuickRequestItem[]>([]);
  const [responses, setResponses] = useState<RequestResponse[]>([]);

  const [loading, setLoading] = useState(true);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Alert (same pattern as Formify)
  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
  } | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | string | null>(null);

  const [requestFilter, setRequestFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [responseFilter, setResponseFilter] = useState<"All" | ResponseStatus>("All");
  const [search, setSearch] = useState("");

  const [selectedRequest, setSelectedRequest] = useState<QuickRequestItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showMenu, setShowMenu] = useState<number | string | null>(null);
  const [showResponseDetails, setShowResponseDetails] = useState<RequestResponse | null>(null);
  const [reviewComment, setReviewComment] = useState("");

  // Creator
  const [step, setStep] = useState(1);
  const [requestName, setRequestName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<string>("other");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<number | string | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("text");
  const [questionRequired, setQuestionRequired] = useState(true);
  const [questionOptions, setQuestionOptions] = useState("");
  const [showAllIcons, setShowAllIcons] = useState(false);

  // ---------- LOAD ----------
  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, { withCredentials: true });

      if (!res.data?.success) {
        setAlert({ type: "error", message: res.data?.message || "Failed to load request types" });
        setRequests([]);
        return;
      }

      const data = res.data.data || [];
      setRequests(
        data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          status: (item.status as RequestStatus) || "Active",
          icon: resolveIcon(item.icon, item.name),
          questions: (item.questions || []).map((q: any) => ({
            id: q.id,
            question: q.question,
            type: (q.type as QuestionType) || "text",
            required: Boolean(q.required),
            options: Array.isArray(q.options) ? q.options : [],
          })),
          createdDate: formatDate(item.createdDate),
        }))
      );
    } catch (err: any) {
      console.error("loadRequests", err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || err.message || "Failed to load request types",
      });
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadResponses = useCallback(async () => {
    try {
      setResponsesLoading(true);
      const res = await axios.get(`${API}/responses`, { withCredentials: true });

      if (!res.data?.success) {
        setAlert({ type: "error", message: res.data?.message || "Failed to load responses" });
        setResponses([]);
        return;
      }

      const data = res.data.data || [];
      setResponses(
        data.map((item: any) => ({
          id: item.id,
          requestTypeId: item.requestTypeId,
          requestName: item.requestName || "Unknown Request",
          icon: item.icon || undefined,
          requestedBy: item.requestedBy,
          date: formatDate(item.date || item.submittedAt),
          status: (item.status as ResponseStatus) || "Pending",
          answers: item.answers || {},
          questions: Array.isArray(item.questions) ? item.questions : [],
          reviewedBy: item.reviewedBy,
          reviewedAt: item.reviewedAt,
          rejectionReason: item.rejectionReason,
          approvalComment: item.approvalComment,
        }))
      );
    } catch (err: any) {
      console.error("loadResponses", err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || err.message || "Failed to load responses",
      });
      setResponses([]);
    } finally {
      setResponsesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    if (activeSection === "responses") loadResponses();
  }, [activeSection, loadResponses]);

  // ---------- CREATOR HELPERS ----------
  const resetCreator = () => {
    setRequestName("");
    setDescription("");
    setIcon("other");
    setShowAllIcons(false);
    setQuestions([]);
    setEditingQuestionId(null);
    setQuestionText("");
    setQuestionType("text");
    setQuestionRequired(true);
    setQuestionOptions("");
    setStep(1);
    setSelectedRequest(null);
  };

  const startCreate = () => {
    resetCreator();
    setActiveSection("create");
  };

  const editRequest = (request: QuickRequestItem) => {
    setSelectedRequest(request);
    setRequestName(request.name);
    setDescription(request.description);
    setIcon(request.icon || "other");
    setQuestions(request.questions);
    setStep(1);
    setActiveSection("create");
    setShowMenu(null);
  };

  const duplicateRequest = async (request: QuickRequestItem) => {
    try {
      setSaving(true);
      await axios.post(
        API,
        {
          name: `${request.name} Copy`,
          description: request.description,
          status: "Active",
          icon: request.icon || "other",
          questions: request.questions.map((q) => ({
            question: q.question,
            type: q.type,
            required: q.required,
            options: q.options || [],
          })),
        },
        { withCredentials: true }
      );
      await loadRequests();
      setShowMenu(null);
      setAlert({ type: "success", message: "Request type duplicated successfully" });
    } catch (err: any) {
      console.error(err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Failed to duplicate",
      });
    } finally {
      setSaving(false);
    }
  };

  // ---------- DELETE ----------
  const confirmDelete = (request: QuickRequestItem) => {
    setPendingDeleteId(request.id);
    setAlert({
      type: "warning",
      message: `Are you sure you want to delete "${request.name}"? This cannot be undone.`,
    });
    setShowMenu(null);
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDeleteId) return;
    try {
      setSaving(true);
      await axios.delete(`${API}/${pendingDeleteId}`, { withCredentials: true });
      setPendingDeleteId(null);
      setAlert(null);
      await loadRequests();
      setAlert({ type: "success", message: "Request type deleted successfully" });
    } catch (err: any) {
      console.error(err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Failed to delete",
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (request: QuickRequestItem) => {
    const next: RequestStatus = request.status === "Active" ? "Inactive" : "Active";
    try {
      await axios.patch(
        `${API}/${request.id}/status`,
        { status: next },
        { withCredentials: true }
      );
      setShowMenu(null);
      await loadRequests();
      setAlert({ type: "success", message: `Request type marked as ${next}` });
    } catch (err: any) {
      console.error(err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Failed to update status",
      });
    }
  };

  // ---------- QUESTIONS ----------
  const resetQuestionForm = () => {
    setQuestionText("");
    setQuestionType("text");
    setQuestionRequired(true);
    setQuestionOptions("");
    setEditingQuestionId(null);
  };

  const addQuestion = () => {
    if (!questionText.trim()) return;
    const newQ: Question = {
      id: Date.now(),
      question: questionText.trim(),
      type: questionType,
      required: questionRequired,
      ...(questionType === "dropdown"
        ? {
            options: questionOptions
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }
        : {}),
    };
    setQuestions((prev) => [...prev, newQ]);
    resetQuestionForm();
  };

  const updateQuestion = () => {
    if (!editingQuestionId || !questionText.trim()) return;
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === editingQuestionId
          ? {
              ...q,
              question: questionText.trim(),
              type: questionType,
              required: questionRequired,
              options:
                questionType === "dropdown"
                  ? questionOptions
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : undefined,
            }
          : q
      )
    );
    resetQuestionForm();
  };

  const startEditQuestion = (q: Question) => {
    setEditingQuestionId(q.id);
    setQuestionText(q.question);
    setQuestionType(q.type);
    setQuestionRequired(q.required);
    setQuestionOptions(q.options?.join(", ") || "");
  };

  const deleteQuestion = (id: number | string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // ---------- SAVE ----------
  const saveRequest = async () => {
    if (!requestName.trim()) {
      setAlert({ type: "warning", message: "Request name is required" });
      return;
    }
    if (questions.length === 0) {
      setAlert({ type: "warning", message: "At least one question is required" });
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: requestName.trim(),
        description,
        status: selectedRequest?.status || "Active",
        icon: icon || "other",
        questions: questions.map((q) => ({
          question: q.question,
          type: q.type,
          required: q.required,
          options: q.options || [],
        })),
      };

      if (selectedRequest) {
        await axios.put(`${API}/${selectedRequest.id}`, payload, {
          withCredentials: true,
        });
      } else {
        await axios.post(API, payload, { withCredentials: true });
      }

      await loadRequests();
      resetCreator();
      setActiveSection("requests");
      setAlert({
        type: "success",
        message: selectedRequest
          ? "Request type updated successfully"
          : "Request type created successfully",
      });
    } catch (err: any) {
      console.error(err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Failed to save",
      });
    } finally {
      setSaving(false);
    }
  };

  // ---------- RESPONSE STATUS ----------
  const updateResponseStatus = async (
    id: number | string,
    status: ResponseStatus,
    comment?: string
  ) => {
    try {
      await axios.patch(
        `${API}/responses/${id}/status`,
        {
          status,
          rejectionReason: status === "Rejected" ? comment || null : null,
          approvalComment: status === "Approved" ? comment || null : null,
        },
        { withCredentials: true }
      );

      await loadResponses();

      setShowResponseDetails((prev) =>
        prev && prev.id === id
          ? {
              ...prev,
              status,
              rejectionReason: status === "Rejected" ? comment || null : null,
              approvalComment: status === "Approved" ? comment || null : null,
            }
          : prev
      );

      setReviewComment("");

      if (status === "Approved") {
        setAlert({ type: "success", message: "Request approved successfully" });
      } else if (status === "Rejected") {
        setAlert({ type: "success", message: "Request rejected successfully" });
      }
    } catch (err: any) {
      console.error(err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Failed to update response status",
      });
    }
  };

  // ---------- FILTERS ----------
  const filteredRequests = requests.filter((r) => {
    const okStatus = requestFilter === "All" || r.status === requestFilter;
    const okSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return okStatus && okSearch;
  });

  const filteredResponses = responses.filter(
    (r) => responseFilter === "All" || r.status === responseFilter
  );

  const getResponseStatusClass = (status: ResponseStatus) => {
    if (status === "Approved") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (status === "Rejected") return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  // ---------- LOADING ----------
  if (loading && activeSection === "requests") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        <Loader2 size={22} className="animate-spin mr-2" />
        Loading request types...
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-6 p-4 pb-8 sm:p-5 lg:p-6">
      {/* ===== Alert (same as Formify) ===== */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => {
            setAlert(null);
            setPendingDeleteId(null);
          }}
          confirm={!!pendingDeleteId}
          onConfirm={handleDeleteConfirm}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Quick Requests</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Create request types and manage user submissions
          </p>
        </div>

        {activeSection !== "create" && (
          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            New Request Type
          </button>
        )}
      </div>

      {/* Tabs */}
      {activeSection !== "create" && (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveSection("requests");
              setSearch("");
            }}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeSection === "requests"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Request Types
          </button>
          <button
            onClick={() => setActiveSection("responses")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeSection === "responses"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Responses
          </button>
        </div>
      )}

      {/* ===================== REQUEST TYPES ===================== */}
      {activeSection === "requests" && (
        <div className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex gap-1.5">
              {(["All", "Active", "Inactive"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setRequestFilter(f)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    requestFilter === f
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <FileText size={22} className="text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-700">No request types found</h3>
              <p className="mt-1 text-sm text-slate-500">Create your first request type</p>
              <button
                onClick={startCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Plus size={16} /> Create Request Type
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredRequests.map((request) => {
                const iconKey = resolveIcon(request.icon, request.name);
                return (
                  <div
                    key={request.id}
                    className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-3 transition hover:border-slate-300 hover:shadow-md"
                  >
                  <div className="absolute right-2 top-2">
  <button
    onClick={() => setShowMenu(showMenu === request.id ? null : request.id)}
    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
  >
    <MoreVertical size={15} />
  </button>
  {showMenu === request.id && (
    <div className="absolute right-0 top-8 z-20 w-40 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
      <button
        onClick={() => {
          setSelectedRequest(request);
          setShowPreview(true);
          setShowMenu(null);
        }}
        className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        <Eye size={14} /> View
      </button>
      <button
        onClick={() => editRequest(request)}
        className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        <Edit2 size={14} /> Edit
      </button>
      <button
        onClick={() => duplicateRequest(request)}
        className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        <Copy size={14} /> Duplicate
      </button>
      <button
        onClick={() => toggleStatus(request)}
        className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        {request.status === "Active" ? (
          <>
            <XCircle size={14} /> Mark Inactive
          </>
        ) : (
          <>
            <CheckCircle2 size={14} /> Mark Active
          </>
        )}
      </button>
      <button
        onClick={() => confirmDelete(request)}
        className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-50"
      >
        <Trash2 size={14} /> Delete
      </button>
    </div>
  )}
</div>

                    <div className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg ${getIconBg(iconKey)}`}>
                      {getIconByKey(iconKey, 17)}
                    </div>

                    <h3 className="pr-5 text-[13px] font-semibold leading-tight text-slate-900 line-clamp-1">
                      {request.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 min-h-[32px] text-[11px] text-slate-500 flex-1">
                      {request.description || "No description"}
                    </p>

                    <div className="mt-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          request.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <FileText size={12} /> {request.questions.length}
                      </span>
                      <span>{request.createdDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================== CREATE / EDIT ===================== */}
      {activeSection === "create" && (
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => {
              resetCreator();
              setActiveSection("requests");
            }}
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft size={16} /> Back to request types
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              {selectedRequest ? "Edit Request Type" : "Create Request Type"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Users will see this form when they submit a request
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => {
                    if (s === 1 || (s === 2 && requestName) || (s === 3 && requestName && questions.length > 0)) {
                      setStep(s);
                    }
                  }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${
                    step === s
                      ? "bg-blue-600 text-white"
                      : step > s
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {step > s ? <CheckCircle2 size={16} /> : s}
                </button>
                {s < 3 && (
                  <div className={`h-0.5 flex-1 rounded ${step > s ? "bg-blue-200" : "bg-slate-100"}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Request Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="e.g. Maintenance Request"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Briefly describe what this request is for..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Icon</label>
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 ${getIconBg(icon)}`}>
                      {getIconByKey(icon, 22)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800">
                        {ICON_OPTIONS.find((o) => o.value === icon)?.label || "Other"}
                      </p>
                      <p className="text-xs text-slate-500">Selected icon for this request type</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAllIcons((v) => !v)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition"
                    >
                      {showAllIcons ? "Hide icons" : "Change icon"}
                      <ChevronRight size={14} className={`transition-transform ${showAllIcons ? "rotate-90" : ""}`} />
                    </button>
                  </div>

                  {showAllIcons && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                      <div className="grid max-h-56 grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-5 md:grid-cols-6">
                        {ICON_OPTIONS.map((opt) => {
                          const Icon = opt.Icon;
                          const selected = icon === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setIcon(opt.value);
                                setShowAllIcons(false);
                              }}
                              title={opt.label}
                              className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 transition ${
                                selected
                                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                  : "border-slate-200 bg-white hover:border-slate-300"
                              }`}
                            >
                              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${opt.bg}`}>
                                <Icon size={16} className={opt.color} />
                              </div>
                              <span className="w-full text-center text-[10px] font-medium leading-tight text-slate-600 line-clamp-1">
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  disabled={!requestName.trim()}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900">Questions</h3>
                    <p className="text-sm text-slate-500">What information do you need from users?</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {questions.length} added
                  </span>
                </div>

                {questions.length > 0 && (
                  <div className="mb-6 space-y-3">
                    {questions.map((q, index) => (
                      <div key={q.id} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-slate-500 shadow-sm">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-800">{q.question}</p>
                          <div className="mt-1 flex gap-2 text-xs text-slate-500">
                            <span>{questionTypeLabels[q.type]}</span>
                            {q.required && <span className="text-rose-500">Required</span>}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => startEditQuestion(q)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-blue-600">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => deleteQuestion(q.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-rose-600">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    {editingQuestionId ? "Edit question" : "Add a question"}
                  </p>
                  <div className="space-y-3">
                    <input
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="e.g. What is the issue?"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                        className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
                      >
                        <option value="text">Text</option>
                        <option value="textarea">Text Area</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="yesno">Yes / No</option>
                      </select>
                      <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={questionRequired}
                          onChange={(e) => setQuestionRequired(e.target.checked)}
                          className="h-4 w-4 rounded"
                        />
                        Required
                      </label>
                    </div>
                    {questionType === "dropdown" && (
                      <input
                        value={questionOptions}
                        onChange={(e) => setQuestionOptions(e.target.value)}
                        placeholder="Options (comma separated)"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
                      />
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={editingQuestionId ? updateQuestion : addQuestion}
                        disabled={!questionText.trim()}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
                      >
                        {editingQuestionId ? (
                          <><CheckCircle2 size={15} /> Update</>
                        ) : (
                          <><Plus size={15} /> Add</>
                        )}
                      </button>
                      {editingQuestionId && (
                        <button onClick={resetQuestionForm} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  disabled={questions.length === 0}
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
                >
                  Preview <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${getIconBg(icon)}`}>
                    {getIconByKey(icon, 20)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{requestName}</h3>
                    <p className="text-sm text-slate-500">{description || "Users will fill out this form"}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {questions.map((q) => (
                    <div key={q.id}>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        {q.question}
                        {q.required && <span className="ml-1 text-rose-500">*</span>}
                      </label>
                      {q.type === "textarea" && <textarea rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" disabled />}
                      {q.type === "text" && <input type="text" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" disabled />}
                      {q.type === "number" && <input type="number" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" disabled />}
                      {q.type === "date" && <input type="date" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" disabled />}
                      {q.type === "dropdown" && (
                        <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm" disabled>
                          <option>Select an option</option>
                          {q.options?.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      )}
                      {q.type === "yesno" && (
                        <div className="flex gap-4 text-sm text-slate-600">
                          <label className="flex items-center gap-2"><input type="radio" disabled /> Yes</label>
                          <label className="flex items-center gap-2"><input type="radio" disabled /> No</label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  onClick={saveRequest}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                  {selectedRequest ? "Save Changes" : "Create Request Type"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== RESPONSES ===================== */}
      {activeSection === "responses" && (
        <div className="space-y-5">
          {responsesLoading ? (
            <div className="flex items-center justify-center py-16 text-slate-500">
              <Loader2 size={20} className="mr-2 animate-spin" /> Loading responses...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-amber-50/80 to-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Clock3 size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {responses.filter((r) => r.status === "Pending").length}
                      </p>
                      <p className="text-sm font-medium text-slate-700">Pending</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-emerald-50/80 to-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {responses.filter((r) => r.status === "Approved").length}
                      </p>
                      <p className="text-sm font-medium text-slate-700">Approved</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-rose-50/80 to-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      <XCircle size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {responses.filter((r) => r.status === "Rejected").length}
                      </p>
                      <p className="text-sm font-medium text-slate-700">Rejected</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900">All Responses</h3>
                    <p className="text-sm text-slate-500">Review and manage submitted requests</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(["All", "Pending", "Approved", "Rejected"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setResponseFilter(f)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          responseFilter === f ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {filteredResponses.length === 0 ? (
                    <div className="py-14 text-center">
                      <FileText size={28} className="mx-auto mb-3 text-slate-300" />
                      <p className="font-medium text-slate-600">No responses found</p>
                    </div>
                  ) : (
                    filteredResponses.map((response) => {
                      const iconKey = resolveIcon(response.icon, response.requestName);
                      return (
                        <div key={response.id} className="flex items-center justify-between gap-4 px-4 py-3.5 transition hover:bg-slate-50/60">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${getIconBg(iconKey)}`}>
                              {getIconByKey(iconKey, 16)}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-slate-900">{response.requestName}</p>
                              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Users size={12} /> {response.requestedBy} · {response.date}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getResponseStatusClass(response.status)}`}>
                              {response.status}
                            </span>

                            {response.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => {
                                    setShowResponseDetails(response);
                                    setReviewComment("");
                                  }}
                                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                >
                                  <CheckCircle2 size={13} /> Approve
                                </button>
                                <button
                                  onClick={() => {
                                    setShowResponseDetails(response);
                                    setReviewComment("");
                                  }}
                                  className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-rose-700"
                                >
                                  <XCircle size={13} /> Reject
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => {
                                setShowResponseDetails(response);
                                setReviewComment(
                                  response.rejectionReason ||
                                    response.approvalComment ||
                                    ""
                                );
                              }}
                              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${getIconBg(selectedRequest.icon)}`}>
                  {getIconByKey(selectedRequest.icon, 18)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedRequest.name}</h3>
                  <p className="text-xs text-slate-500">How users will see this form</p>
                </div>
              </div>
              <button onClick={() => setShowPreview(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <div className="p-5">
              <p className="mb-5 text-sm text-slate-600">{selectedRequest.description}</p>
              <div className="space-y-4">
                {selectedRequest.questions.map((q) => (
                  <div key={q.id}>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      {q.question}
                      {q.required && <span className="ml-1 text-rose-500">*</span>}
                    </label>
                    {q.type === "textarea" ? (
                      <textarea rows={2} className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm" disabled />
                    ) : q.type === "dropdown" ? (
                      <select className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm" disabled>
                        <option>Select...</option>
                        {q.options?.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : q.type === "yesno" ? (
                      <div className="flex gap-4 text-sm text-slate-600">
                        <label className="flex items-center gap-1.5"><input type="radio" disabled /> Yes</label>
                        <label className="flex items-center gap-1.5"><input type="radio" disabled /> No</label>
                      </div>
                    ) : (
                      <input
                        type={q.type === "number" ? "number" : q.type === "date" ? "date" : "text"}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm"
                        disabled
                      />
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => setShowPreview(false)} className="mt-6 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Details Modal */}
      {showResponseDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">Response Details</h3>
                <p className="mt-0.5 text-xs text-slate-500">{showResponseDetails.requestName}</p>
              </div>
              <button
                onClick={() => {
                  setShowResponseDetails(null);
                  setReviewComment("");
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] space-y-5 overflow-y-auto p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Requested By</p>
                  <p className="mt-1 text-sm text-slate-700">{showResponseDetails.requestedBy}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Date</p>
                  <p className="mt-1 text-sm text-slate-700">{showResponseDetails.date}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Status</p>
                  <span className={`mt-1.5 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${getResponseStatusClass(showResponseDetails.status)}`}>
                    {showResponseDetails.status}
                  </span>
                </div>
              </div>

              {showResponseDetails.answers && Object.keys(showResponseDetails.answers).length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Submitted Answers</p>
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      <span>Question</span>
                      <span>Submitted</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {Object.entries(showResponseDetails.answers).map(([key, value]) => {
                        const question = showResponseDetails.questions?.find((item) => String(item.id) === key);
                        return (
                          <div key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 py-2.5">
                            <span className="break-words text-sm font-medium text-slate-600">
                              {question?.question || key}
                            </span>
                            <span className="break-words text-sm text-slate-800">
                              {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value ?? "—")}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {showResponseDetails.status === "Rejected" && showResponseDetails.rejectionReason && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Rejection Reason</p>
                  <p className="mt-1 text-sm text-rose-700">{showResponseDetails.rejectionReason}</p>
                </div>
              )}

              {showResponseDetails.status === "Approved" && showResponseDetails.approvalComment && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Approval Comment</p>
                  <p className="mt-1 text-sm text-emerald-700">{showResponseDetails.approvalComment}</p>
                </div>
              )}

              {showResponseDetails.status === "Pending" && (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    Comment
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={2}
                    placeholder="Add a comment for approve or reject..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 p-4">
              {showResponseDetails.status === "Pending" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      updateResponseStatus(
                        showResponseDetails.id,
                        "Approved",
                        reviewComment.trim() || undefined
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    <CheckCircle2 size={16} /> Approve
                  </button>
                  <button
                    onClick={() => {
                      if (!reviewComment.trim()) {
                        setAlert({
                          type: "warning",
                          message: "Please enter a comment before rejecting",
                        });
                        return;
                      }
                      updateResponseStatus(
                        showResponseDetails.id,
                        "Rejected",
                        reviewComment.trim()
                      );
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowResponseDetails(null);
                    setReviewComment("");
                  }}
                  className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}