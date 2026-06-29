import { LayoutDashboard, Users } from "lucide-react";

export const adminLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={22} />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <Users size={22} />,
  },
];
