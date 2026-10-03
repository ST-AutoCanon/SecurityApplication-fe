// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import MemberTable from "../../components/MemberTable";
// import SearchBar from "../../components/SearchBar";
// import Pagination from "../../components/Pagination";
// import Alert from "../../../../../../components/Aleartmessage";
// import { Plus, Upload } from "lucide-react";

// // const API = "/api/admin/apartment";
// const API = import.meta.env.VITE_BACKEND_URL;

// const ApartmentMembers = () => {
//   const [members, setMembers] = useState<any[]>([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const limit = 10;

//   // Popup alert state
//   const [alert, setAlert] = useState<{
//     type: "success" | "warning" | "error";
//     message: string;
//   } | null>(null);

//   const fetchMembers = async () => {
//     try {
//       const offset = (page - 1) * limit;

//       const { data } = await axios.get(
//         `${API}/api/admin/apartment/members/pagination?limit=${limit}&offset=${offset}`,
//         {
//           withCredentials: true,
//         },
//       );

//       setMembers(data.data);
//       setTotal(data.total);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const searchMembers = async () => {
//     try {
//       if (!search.trim()) {
//         fetchMembers();
//         return;
//       }

//       const { data } = await axios.get(
//         `${API}/api/admin/apartment/members/search?search=${search}`,
//         {
//           withCredentials: true,
//         },
//       );

//       setMembers(data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Popup success handler
//   const showSuccessAlert = (message: string) => {
//     setAlert({
//       type: "success",
//       message,
//     });
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, [page]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       searchMembers();
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [search]);

//   return (
//     <div className="p-6">
//       {/* Success Popup */}
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => setAlert(null)}
//         />
//       )}

//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Apartment Members</h1>

//         <div className="flex items-center gap-2">
//           <Link
//             to="/admin/organisation/apartment/members/import"
//             title="Import Members"
//             aria-label="Import Members"
//             className="flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
//           >
//             <Upload size={18} />
//             <span className="text-sm font-medium">Import</span>
//           </Link>

//           <Link
//             to="/admin/organisation/apartment/members/add"
//             title="Add Member"
//             aria-label="Add Member"
//             className="flex items-center gap-2 px-3 py-2 rounded-lg text-green-600 bg-green-50 hover:bg-green-100 transition-colors"
//           >
//             <Plus size={18} />
//             <span className="text-sm font-medium">Add Member</span>
//           </Link>
//         </div>
//       </div>

//       <SearchBar value={search} onChange={setSearch} />

//       <div className="mt-5">
//         <MemberTable
//           members={members}
//           reload={fetchMembers}
//           onSuccess={showSuccessAlert}
//         />
//       </div>

//       <div className="mt-6">
//         <Pagination
//           currentPage={page}
//           totalItems={total}
//           pageSize={limit}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default ApartmentMembers;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Building2, Plus, RefreshCw, Upload, Users } from "lucide-react";

import MemberTable from "../../components/MemberTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Alert from "../../../../../../components/Aleartmessage";

const API = import.meta.env.VITE_BACKEND_URL;

const ApartmentMembers = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
  } | null>(null);

  // ---------------------------------
  // Fetch Members
  // ---------------------------------
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const offset = (page - 1) * limit;

      const { data } = await axios.get(
        `${API}/api/admin/apartment/members/pagination?limit=${limit}&offset=${offset}`,
        {
          withCredentials: true,
        },
      );

      setMembers(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);

      setAlert({
        type: "error",
        message: "Failed to load apartment members.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // Search Members
  // ---------------------------------
  const searchMembers = async () => {
    try {
      if (!search.trim()) {
        fetchMembers();
        return;
      }

      setLoading(true);

      const { data } = await axios.get(
        `${API}/api/admin/apartment/members/search?search=${encodeURIComponent(
          search.trim(),
        )}`,
        {
          withCredentials: true,
        },
      );

      setMembers(data.data || []);
      setTotal(data.total || data.data?.length || 0);
    } catch (err) {
      console.error(err);

      setAlert({
        type: "error",
        message: "Failed to search members.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // Success Alert
  // ---------------------------------
  const showSuccessAlert = (message: string) => {
    setAlert({
      type: "success",
      message,
    });
  };

  // ---------------------------------
  // Initial / Pagination Fetch
  // ---------------------------------
  useEffect(() => {
    if (!search.trim()) {
      fetchMembers();
    }
  }, [page]);

  // ---------------------------------
  // Search
  // ---------------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      searchMembers();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <Building2 size={24} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Apartment Members
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                View and manage apartment members for your organisation.
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={fetchMembers}
              disabled={loading}
              title="Refresh members"
              aria-label="Refresh members"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />

              <span className="text-sm font-medium">Refresh</span>
            </button>

            <Link
              to="/admin/organisation/apartment/members/import"
              title="Import Members"
              aria-label="Import Members"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              <Upload size={18} />

              <span className="text-sm font-medium">Import</span>
            </Link>

            <Link
              to="/admin/organisation/apartment/members/add"
              title="Add Member"
              aria-label="Add Member"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-green-600 bg-green-50 hover:bg-green-100 transition-colors"
            >
              <Plus size={18} />

              <span className="text-sm font-medium">Add Member</span>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Search Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-blue-600" />

                <h2 className="text-lg font-semibold text-gray-900">
                  Member List
                </h2>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {search.trim()
                  ? `Search results for "${search}"`
                  : `${total} ${total === 1 ? "member" : "members"} found`}
              </p>
            </div>

            <div className="w-full sm:w-80">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>

          {/* Table */}
          <div className="relative">
            {loading && members.length > 0 && (
              <div className="absolute inset-0 z-10 flex items-start justify-center pt-8 bg-white/60 backdrop-blur-[1px] rounded-xl">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <RefreshCw size={17} className="text-blue-600 animate-spin" />

                  <span className="text-sm font-medium text-gray-600">
                    Loading...
                  </span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <MemberTable
                members={members}
                reload={fetchMembers}
                onSuccess={showSuccessAlert}
              />
            </div>
          </div>

          {/* Empty State */}
          {!loading && members.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-50 text-gray-400 mb-4">
                <Users size={26} />
              </div>

              <h3 className="text-base font-semibold text-gray-900">
                No members found
              </h3>

              <p className="text-sm text-gray-500 mt-1 max-w-md">
                {search.trim()
                  ? "No members match your search criteria."
                  : "There are currently no apartment members available."}
              </p>

              {search.trim() && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {total > 0 && !search.trim() && (
            <div className="mt-6 pt-5 border-t border-gray-200">
              <Pagination
                currentPage={page}
                totalItems={total}
                pageSize={limit}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApartmentMembers;