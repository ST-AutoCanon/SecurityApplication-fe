// utils/requestIcons.tsx  (or put at top of both components)

import {
  Wrench,
  Zap,
  Car,
  Calendar,
  Brush,
  MoreHorizontal,
  Droplets,
  Lightbulb,
  ParkingCircle,
  Home,
  Settings,
} from "lucide-react";

export const ICON_OPTIONS = [
  { value: "plumbing",   label: "Plumbing",   Icon: Wrench,        color: "text-blue-500",   bg: "bg-blue-50" },
  { value: "electrical", label: "Electrical", Icon: Zap,           color: "text-emerald-500", bg: "bg-emerald-50" },
  { value: "parking",    label: "Parking",    Icon: Car,           color: "text-purple-500",  bg: "bg-purple-50" },
  { value: "community",  label: "Community",  Icon: Calendar,      color: "text-amber-500",   bg: "bg-amber-50" },
  { value: "housekeeping", label: "Housekeeping", Icon: Brush,     color: "text-teal-500",    bg: "bg-teal-50" },
  { value: "other",      label: "Other",      Icon: MoreHorizontal, color: "text-slate-500", bg: "bg-slate-50" },
] as const;

export type IconValue = (typeof ICON_OPTIONS)[number]["value"];

export function getIconByKey(key?: string, size = 28) {
  const opt = ICON_OPTIONS.find((o) => o.value === key) || ICON_OPTIONS[ICON_OPTIONS.length - 1];
  const Icon = opt.Icon;
  return <Icon size={size} className={opt.color} />;
}

export function getIconBg(key?: string) {
  const opt = ICON_OPTIONS.find((o) => o.value === key) || ICON_OPTIONS[ICON_OPTIONS.length - 1];
  return opt.bg;
}

export function getButtonColorByIcon(key?: string) {
  switch (key) {
    case "plumbing":     return "bg-blue-600 hover:bg-blue-700";
    case "electrical":   return "bg-emerald-600 hover:bg-emerald-700";
    case "parking":      return "bg-purple-600 hover:bg-purple-700";
    case "community":    return "bg-amber-500 hover:bg-amber-600";
    case "housekeeping": return "bg-teal-600 hover:bg-teal-700";
    default:             return "bg-slate-700 hover:bg-slate-800";
  }
}