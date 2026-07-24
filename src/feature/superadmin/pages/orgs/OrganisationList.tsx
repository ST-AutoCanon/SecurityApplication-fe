import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Eye,
  Building2,
  Phone,
  Mail,
  Calendar,
  Loader2,
  Search,
} from "lucide-react";

import Alert from "../../../../components/Aleartmessage"; // change path accordingly

const API = `${import.meta.env.VITE_BACKEND_URL}/api/org-super-admin`;

interface Organisation {
  id: number;
  org_name: string;
  schema_name: string;
  email: string;
  phone: string;
  status: string;
  org_type: string;
  created_at: string;
  is_active: boolean;
}

interface Props {
  onView: (id: number) => void;
}

export default function OrganisationList({ onView }: Props) {
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    type: "success" as "success" | "error",
    message: "",
  });

  // Search & Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("LATEST");

  const loadOrganisations = async () => {
    try {
      const res = await axios.get(API, {
        withCredentials: true,
      });

      setOrganisations(res.data.data || []);
    } catch (err) {
      console.error(err);
      setAlert({
        show: true,
        type: "error",
        message:
          err?.response?.data?.message || "Failed to load organisations.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganisations();
  }, []);

  const filteredOrganisations = useMemo(() => {
    let data = [...organisations];

    // Search
    data = data.filter((org) => {
      const keyword = search.toLowerCase();

      return (
        org.org_name.toLowerCase().includes(keyword) ||
        org.email.toLowerCase().includes(keyword) ||
        org.phone.toLowerCase().includes(keyword) ||
        org.schema_name.toLowerCase().includes(keyword)
      );
    });

    // Status
    if (statusFilter !== "ALL") {
      data = data.filter((org) => org.status === statusFilter);
    }

    // Type
    if (typeFilter !== "ALL") {
      data = data.filter((org) => org.org_type === typeFilter);
    }

    // Sort
    data.sort((a, b) => {
      if (sortOrder === "LATEST") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });

    return data;
  }, [organisations, search, statusFilter, typeFilter, sortOrder]);

  if (loading) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <>
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() =>
            setAlert((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
      )}
      <div className="max-w-7xl mx-auto p-6 text-gray-700">
        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Organisations</h1>

            <p className="text-gray-200 mt-1">
              Total Organisations :{" "}
              <span className="font-bold">{filteredOrganisations.length}</span>
            </p>
          </div>
        </div>

        {/* Toolbar */}

        <div className="bg-white rounded-xl shadow p-4 mb-5">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search organisation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2"
              />
            </div>

            {/* Status */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="PENDING">PENDING</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>

            {/* Type */}

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="ALL">All Types</option>
              <option value="APARTMENT">Apartment</option>
              <option value="HOSPITAL">Hospital</option>
              <option value="EVENT">Event</option>
            </select>

            {/* Sort */}

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="LATEST">Latest First</option>
              <option value="OLDEST">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Organisation</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrganisations.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-8">
                    No Organisations Found
                  </td>
                </tr>
              )}

              {filteredOrganisations.map((org) => (
                <tr
                  key={org.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-semibold">#{org.id}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="text-blue-600" size={20} />

                      <div>
                        <div className="font-semibold">{org.org_name}</div>

                        <div className="text-sm text-gray-500">
                          {org.schema_name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{org.org_type}</td>

                  <td className="p-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail size={15} />
                        {org.email}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={15} />
                        {org.phone}
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      org.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : org.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                    >
                      {org.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} />
                      {new Date(org.created_at).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => onView(org.id)}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <Eye size={18} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
