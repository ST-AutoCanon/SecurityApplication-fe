import { LayoutDashboard, Building2 } from "lucide-react";

export const superAdminLinks = [
  {
    name: "Dashboard",
    path: "/super_admin/organisation/dashboard",
    icon: <LayoutDashboard size={22} />,
  },
  {
    name: "Organisation",
    path: "/super_admin/organisation/create_organisation",
    icon: <Building2 size={22} />,
  },
];
