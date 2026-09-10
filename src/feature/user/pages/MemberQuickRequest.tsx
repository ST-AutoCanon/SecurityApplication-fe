

"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Eye,
  CheckCircle2,
  Clock3,
  XCircle,
  FileText,
  ClipboardList,
  X,
  Loader2,
  Wrench,
  Zap,
  Car,
  Calendar,
  Brush,
  MoreHorizontal,
  ChevronDown,
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

import Alert from "../../../components/Aleartmessage"; // adjust path if needed

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

function getIconByKey(key?: string, size = 28) {
  const opt = ICON_OPTIONS.find((o) => o.value === key) || ICON_OPTIONS[ICON_OPTIONS.length - 1];
  const Icon = opt.Icon;
  return <Icon size={size} className={opt.color} />;
}

function getIconBg(key?: string) {
  const opt = ICON_OPTIONS.find((o) => o.value === key) || ICON_OPTIONS[ICON_OPTIONS.length - 1];
  return opt.bg;
}

function getButtonColorByIcon(key?: string) {
  switch (key) {
    case "plumbing":
    case "water":
    case "intercom":
      return "bg-blue-600 hover:bg-blue-700";
    case "electrical":
      return "bg-emerald-600 hover:bg-emerald-700";
    case "lighting":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "parking":
    case "bike":
      return "bg-purple-600 hover:bg-purple-700";
    case "community":
    case "doors":
    case "pets":
      return "bg-amber-500 hover:bg-amber-600";
    case "housekeeping":
      return "bg-teal-600 hover:bg-teal-700";
    case "hvac":
    case "cold":
      return "bg-cyan-600 hover:bg-cyan-700";
    case "security":
    case "medical":
    case "fire":
      return "bg-red-600 hover:bg-red-700";
    case "keys":
      return "bg-orange-500 hover:bg-orange-600";
    case "internet":
    case "delivery":
      return "bg-indigo-600 hover:bg-indigo-700";
    case "garden":
      return "bg-green-600 hover:bg-green-700";
    case "painting":
    case "noise":
      return "bg-pink-600 hover:bg-pink-700";
    case "announcement":
      return "bg-rose-600 hover:bg-rose-700";
    default:
      return "bg-slate-700 hover:bg-slate-800";
  }
}

function resolveIcon(icon?: string, name?: string) {
  if (icon && icon !== "other") return icon;
  const n = (name || "").toLowerCase();
  if (n.includes("plumb")) return "plumbing";
  if (n.includes("water") || n.includes("leak")) return "water";
  if (n.includes("electric") || n.includes("ground") || n.includes("socket")) return "electrical";
  if (n.includes("light") || n.includes("bulb")) return "lighting";
  if (n.includes("park")) return "parking";
  if (n.includes("community") || n.includes("hall") || n.includes("book")) return "community";
  if (n.includes("house") || n.includes("clean") || n.includes("pest")) return "housekeeping";
  if (n.includes("ac") || n.includes("hvac") || n.includes("fan") || n.includes("cool")) return "hvac";
  if (n.includes("secur") || n.includes("guard")) return "security";
  if (n.includes("key") || n.includes("access") || n.includes("lock")) return "keys";
  if (n.includes("wifi") || n.includes("internet") || n.includes("network")) return "internet";
  if (n.includes("waste") || n.includes("garbage") || n.includes("trash")) return "waste";
  if (n.includes("garden") || n.includes("plant") || n.includes("tree")) return "garden";
  if (n.includes("build") || n.includes("structure")) return "building";
  if (n.includes("door") || n.includes("gate")) return "doors";
  if (n.includes("carpenter") || n.includes("wood") || n.includes("furniture")) return "carpentry";
  if (n.includes("paint")) return "painting";
  if (n.includes("deliver") || n.includes("parcel") || n.includes("package")) return "delivery";
  if (n.includes("intercom") || n.includes("phone")) return "intercom";
  if (n.includes("notice") || n.includes("announce") || n.includes("bell")) return "announcement";
  if (n.includes("medical") || n.includes("health") || n.includes("ambulance")) return "medical";
  if (n.includes("pet") || n.includes("dog") || n.includes("cat")) return "pets";
  if (n.includes("bike") || n.includes("two wheel") || n.includes("scooter")) return "bike";
  if (n.includes("fire")) return "fire";
  if (n.includes("elevator") || n.includes("lift")) return "elevator";
  if (n.includes("cctv") || n.includes("camera") || n.includes("surveillance")) return "cctv";
  if (n.includes("noise") || n.includes("sound")) return "noise";
  if (n.includes("maintain")) return "maintenance";
  return "other";
}

type QuestionType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "dropdown"
  | "yesno"
  | "attachment";

interface Question {
  id: number | string;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}
interface RequestResponse {
  id: number | string;
  requestTypeId?: number | string;
  requestName: string;
  requestedBy: string | number;
  date: string;
  status: "Pending" | "Approved" | "Rejected" | "In Progress" | "Completed" | "Cancelled";
  answers?: Record<string, any>;
  questions?: Array<{ id: number | string; question: string }>;
  reviewedBy?: string | number | null;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  approvalComment?: string | null;   // ← add this
  description?: string;
  expectedResolution?: string;
  requestId?: string;
  icon?: string;
}
interface QuickRequestItem {
  id: number | string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
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
  status: "Pending" | "Approved" | "Rejected" | "In Progress" | "Completed" | "Cancelled";
  answers?: Record<string, any>;
  questions?: Array<{ id: number | string; question: string }>;
  reviewedBy?: string | number | null;
  reviewedAt?: string | null;
  rejectionReason?: string | null;
  description?: string;
  expectedResolution?: string;
  requestId?: string;
  icon?: string;
}

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(value);
  }
};

const getDisplayStatus = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "pending" || s === "in progress") return "In Progress";
  if (s === "approved" || s === "completed") return "Completed";
  if (s === "rejected" || s === "cancelled") return "Cancelled";
  return status;
};

const getStatusBadgeClass = (status: string) => {
  const display = getDisplayStatus(status);
  if (display === "Completed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (display === "Cancelled") return "bg-rose-50 text-rose-700 border-rose-200";
  if (display === "Confirmed") return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
};

export default function MemberQuickRequest() {
  const [requestTypes, setRequestTypes] = useState<QuickRequestItem[]>([]);
  const [myResponses, setMyResponses] = useState<RequestResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Alert state (same as Formify / Admin)
  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
  } | null>(null);

  const [selectedType, setSelectedType] = useState<QuickRequestItem | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showForm, setShowForm] = useState(false);
  const [viewResponse, setViewResponse] = useState<RequestResponse | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All Requests");
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllRequests, setShowAllRequests] = useState(false);

  const loadRequestTypes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, { withCredentials: true });

      if (!res.data?.success) {
        setAlert({ type: "error", message: res.data?.message || "Failed to load services" });
        setRequestTypes([]);
        return;
      }

      const raw = res.data.data || [];
      const data: QuickRequestItem[] = raw
        .filter((item: any) => {
          const status = String(item.status || "").toLowerCase();
          return status === "active" || status === "true" || status === "1";
        })
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          status: item.status,
          icon: item.icon || "other",
          questions: (item.questions || []).map((q: any) => ({
            id: q.id,
            question: q.question,
            type: (q.type as QuestionType) || "text",
            required: Boolean(q.required),
            options: Array.isArray(q.options) ? q.options : [],
          })),
          createdDate: formatDate(item.createdDate),
        }));

      setRequestTypes(data);
    } catch (err: any) {
      console.error("loadRequestTypes error:", err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || err.message || "Failed to load services",
      });
      setRequestTypes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMyResponses = useCallback(async () => {
    try {
      setResponsesLoading(true);
      const res = await axios.get(`${API}/my-responses`, { withCredentials: true });

      if (!res.data?.success) {
        setMyResponses([]);
        return;
      }

     const data: RequestResponse[] = (res.data.data || []).map((item: any) => ({
  id: item.id,
  requestTypeId: item.requestTypeId,
  requestName: item.requestName || "Unknown",
  requestedBy: item.requestedBy,
  date: formatDate(item.date || item.submittedAt),
  status: item.status || "Pending",
  answers: item.answers || {},
  reviewedBy: item.reviewedBy,
  reviewedAt: item.reviewedAt,
  rejectionReason: item.rejectionReason,
  approvalComment: item.approvalComment,   // ← add this
  description: item.description || item.answers?.description || "",
  requestId: item.requestId || `REQ-${item.id}`,
  icon: item.icon || undefined,
  questions: Array.isArray(item.questions) ? item.questions : [],
}));

      setMyResponses(data);
    } catch (err) {
      console.error(err);
      setMyResponses([]);
    } finally {
      setResponsesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequestTypes();
    loadMyResponses();
  }, [loadRequestTypes, loadMyResponses]);

  const openForm = (type: QuickRequestItem) => {
    setSelectedType(type);
    const initial: Record<string, any> = {};
    type.questions.forEach((q) => {
      initial[String(q.id)] = "";
    });
    setAnswers(initial);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedType(null);
    setAnswers({});
  };

  const handleAnswerChange = (questionId: string | number, value: any) => {
    setAnswers((prev) => ({ ...prev, [String(questionId)]: value }));
  };

  const submitRequest = async () => {
    if (!selectedType) return;

    for (const q of selectedType.questions) {
      if (q.required) {
        const val = answers[String(q.id)];
        if (val === undefined || val === null || String(val).trim() === "") {
          setAlert({ type: "warning", message: `"${q.question}" is required` });
          return;
        }
      }
    }

    try {
      setSubmitting(true);

      await axios.post(
        `${API}/${selectedType.id}/submit`,
        { answers },
        { withCredentials: true }
      );

      closeForm();
      await loadMyResponses();
      setAlert({ type: "success", message: "Request submitted successfully" });
    } catch (err: any) {
      console.error(err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Failed to submit request",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const totalCount = myResponses.length;
  const inProgressCount = myResponses.filter((r) => {
    const d = getDisplayStatus(r.status);
    return d === "In Progress" || d === "Confirmed";
  }).length;
  const completedCount = myResponses.filter(
    (r) => getDisplayStatus(r.status) === "Completed"
  ).length;
  const cancelledCount = myResponses.filter(
    (r) => getDisplayStatus(r.status) === "Cancelled"
  ).length;

  const filteredResponses =
    statusFilter === "All Requests"
      ? myResponses
      : myResponses.filter((r) => getDisplayStatus(r.status) === statusFilter);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        <Loader2 size={22} className="animate-spin mr-2" />
        Loading services...
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
          onClose={() => setAlert(null)}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Request Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Raise, track and manage all your requests in one place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-blue-50/80 to-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{totalCount}</p>
              <p className="text-sm font-medium text-slate-700">Total Requests</p>
              <p className="text-xs text-slate-400">All time requests</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-amber-50/80 to-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Clock3 size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{inProgressCount}</p>
              <p className="text-sm font-medium text-slate-700">In Progress</p>
              <p className="text-xs text-slate-400">Currently in progress</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-emerald-50/80 to-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{completedCount}</p>
              <p className="text-sm font-medium text-slate-700">Completed</p>
              <p className="text-xs text-slate-400">Successfully resolved</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-rose-50/80 to-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <XCircle size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{cancelledCount}</p>
              <p className="text-sm font-medium text-slate-700">Cancelled</p>
              <p className="text-xs text-slate-400">Cancelled requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Raise New Request */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Raise New Request</h2>
            <p className="mt-0.5 text-sm text-slate-500">Select a service to raise a new request</p>
          </div>

          {requestTypes.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAllServices((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
            >
              {showAllServices ? "Collapse" : "View All"}
              <ChevronDown
                size={17}
                className={`transition-transform duration-200 ${showAllServices ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>

        {requestTypes.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-14 text-center">
            <ClipboardList size={28} className="mx-auto mb-3 text-slate-300" />
            <p className="font-medium text-slate-600">No services available</p>
            <p className="mt-1 text-sm text-slate-400">Please check back later</p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {(showAllServices ? requestTypes : requestTypes.slice(0, 6)).map((type) => {
              const iconKey = resolveIcon(type.icon, type.name);
              return (
                <div
                  key={type.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${getIconBg(iconKey)}`}>
                    {getIconByKey(iconKey)}
                  </div>
                  <h3 className="text-sm font-semibold leading-tight text-slate-900">{type.name}</h3>
                  <p className="mt-1.5 min-h-[32px] flex-1 line-clamp-2 text-xs text-slate-500">
                    {type.description || "No description"}
                  </p>
                  <button
                    type="button"
                    onClick={() => openForm(type)}
                    className={`mt-4 w-full rounded-lg py-2 text-xs font-semibold text-white transition ${getButtonColorByIcon(iconKey)}`}
                  >
                    Raise Request
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* My Requests */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 pt-5 pb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">My Requests</h2>
            <p className="text-sm text-slate-500 mt-0.5">Track all your submitted requests</p>
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              <option>All Requests</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {responsesLoading ? (
          <div className="flex items-center justify-center py-16 text-slate-500">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading...
          </div>
        ) : filteredResponses.length === 0 ? (
          <div className="px-5 pb-10">
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-14 text-center">
              <FileText size={28} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-600 font-medium">No requests yet</p>
              <p className="text-sm text-slate-400 mt-1">Raise your first request above</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/80 text-left text-xs font-medium text-slate-500">
                  <th className="px-5 py-3 whitespace-nowrap">Request ID</th>
                  <th className="px-4 py-3 whitespace-nowrap">Service</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Raised On</th>
                  <th className="px-5 py-3 text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(showAllRequests ? filteredResponses : filteredResponses.slice(0, 5)).map((r) => {
                  const displayStatus = getDisplayStatus(r.status);
                  const iconKey = resolveIcon(r.icon, r.requestName);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-5 py-3.5 font-medium text-slate-800 whitespace-nowrap">
                        {r.requestId || `REQ-${r.id}`}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${getIconBg(iconKey)}`}>
                            {getIconByKey(iconKey, 14)}
                          </span>
                          <span className="text-slate-800 whitespace-nowrap">{r.requestName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 max-w-[200px] truncate">
                        {r.description ||
                          (r.answers && Object.values(r.answers)[0] && String(Object.values(r.answers)[0])) ||
                          "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(r.status)}`}>
                          {displayStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{r.date}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => setViewResponse(r)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition"
                        >
                          <Eye size={13} />
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filteredResponses.length > 5 && (
          <div className="border-t border-slate-100 px-5 py-3 text-center">
            <button
              type="button"
              onClick={() => setShowAllRequests((prev) => !prev)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {showAllRequests ? "Show Less" : "View All Requests"}
            </button>
          </div>
        )}
      </div>

      {/* Raise Form Modal */}
      {showForm && selectedType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getIconBg(resolveIcon(selectedType.icon, selectedType.name))}`}>
                  {getIconByKey(resolveIcon(selectedType.icon, selectedType.name), 20)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedType.name}</h3>
                  <p className="text-xs text-slate-500">Fill the form below</p>
                </div>
              </div>
              <button onClick={closeForm} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {selectedType.description && (
                <p className="text-sm text-slate-600">{selectedType.description}</p>
              )}

              {selectedType.questions.map((q) => (
                <div key={q.id}>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {q.question}
                    {q.required && <span className="ml-1 text-rose-500">*</span>}
                  </label>

                  {q.type === "textarea" && (
                    <textarea
                      rows={3}
                      value={answers[String(q.id)] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  )}
                  {q.type === "text" && (
                    <input
                      type="text"
                      value={answers[String(q.id)] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  )}
                  {q.type === "number" && (
                    <input
                      type="number"
                      value={answers[String(q.id)] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  )}
                  {q.type === "date" && (
                    <input
                      type="date"
                      value={answers[String(q.id)] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  )}
                  {q.type === "dropdown" && (
                    <select
                      value={answers[String(q.id)] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select an option</option>
                      {q.options?.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  )}
                  {q.type === "yesno" && (
                    <div className="flex gap-6 text-sm text-slate-700">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={answers[String(q.id)] === "Yes"}
                          onChange={() => handleAnswerChange(q.id, "Yes")}
                          className="h-4 w-4"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={answers[String(q.id)] === "No"}
                          onChange={() => handleAnswerChange(q.id, "No")}
                          className="h-4 w-4"
                        />
                        No
                      </label>
                    </div>
                  )}
                  {q.type === "attachment" && (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
                      File upload support coming soon
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 flex gap-3 border-t border-slate-100 bg-white p-4">
              <button
                onClick={closeForm}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={submitRequest}
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal - Clean organized answers */}
      {viewResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">Request Details</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {viewResponse.requestId || `REQ-${viewResponse.id}`}
                </p>
              </div>
              <button
                onClick={() => setViewResponse(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] space-y-5 overflow-y-auto p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Submitted On</p>
                  <p className="mt-1 text-sm text-slate-700">{viewResponse.date}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Status</p>
                  <span className={`mt-1.5 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(viewResponse.status)}`}>
                    {getDisplayStatus(viewResponse.status)}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Service</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${getIconBg(resolveIcon(viewResponse.icon, viewResponse.requestName))}`}>
                    {getIconByKey(resolveIcon(viewResponse.icon, viewResponse.requestName), 14)}
                  </span>
                  <p className="font-medium text-slate-900">{viewResponse.requestName}</p>
                </div>
              </div>

              {/* Clean organized answers */}
              {viewResponse.answers && Object.keys(viewResponse.answers).length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Your Answers
                  </p>
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      <span>Question</span>
                      <span>Answer</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {Object.entries(viewResponse.answers).map(([key, value]) => {
                        let questionText = key;

                        // Try to resolve question text from response.questions
                        if (viewResponse.questions) {
                          const q = viewResponse.questions.find((item) => String(item.id) === key);
                          if (q) questionText = q.question;
                        } else {
                          // Fallback: look in loaded requestTypes
                          const type = requestTypes.find(
                            (t) => t.id === viewResponse.requestTypeId || t.name === viewResponse.requestName
                          );
                          const q = type?.questions?.find((item) => String(item.id) === key);
                          if (q) questionText = q.question;
                        }

                        return (
                          <div key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 py-2.5">
                            <span className="break-words text-sm font-medium text-slate-600">
                              {questionText}
                            </span>
                            <span className="break-words text-sm text-slate-800">
                              {typeof value === "object"
                                ? JSON.stringify(value, null, 2)
                                : String(value ?? "—")}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

             {/* Admin comments */}
{(String(viewResponse.status || "").toLowerCase() === "rejected" || String(viewResponse.status || "").toLowerCase() === "cancelled") && viewResponse.rejectionReason && (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
      Cancellation Reason
    </p>
    <p className="mt-1 text-sm text-rose-700">{viewResponse.rejectionReason}</p>
  </div>
)}

{(String(viewResponse.status || "").toLowerCase() === "approved" || String(viewResponse.status || "").toLowerCase() === "completed") && viewResponse.approvalComment && (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
      Approval Comment
    </p>
    <p className="mt-1 text-sm text-emerald-700">{viewResponse.approvalComment}</p>
  </div>
)}
            </div>

            <div className="border-t border-slate-100 p-4">
              <button
                onClick={() => setViewResponse(null)}
                className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}