// // import React, { useEffect, useMemo, useState } from "react";
// // import axios from "axios";
// // import { Search, RefreshCw, Database, Table2 } from "lucide-react";

// // const API = import.meta.env.VITE_BACKEND_URL;

// // type TableData = {
// //   columns: string[];
// //   rows: any[];
// // };

// // export default function BusinessDataPage() {
// //   const [loading, setLoading] = useState(true);

// //   const [tables, setTables] = useState<Record<string, TableData>>({});

// //   const [selectedTable, setSelectedTable] = useState("");

// //   const [search, setSearch] = useState("");

// //   const loadData = async () => {
// //     try {
// //       setLoading(true);

// //       const res = await axios.get(`${API}/api/admin/business-data`, {
// //         withCredentials: true,
// //       });

// //       const data = res.data.data || {};

// //       setTables(data);

// //       if (!selectedTable && Object.keys(data).length) {
// //         setSelectedTable(Object.keys(data)[0]);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to load");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const table = tables[selectedTable];

// //   const filteredRows = useMemo(() => {
// //     if (!table) return [];

// //     return table.rows.filter((row) =>
// //       JSON.stringify(row).toLowerCase().includes(search.toLowerCase()),
// //     );
// //   }, [table, search]);

// //   const header = (text: string) =>
// //     text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// //   const renderCell = (column: string, value: any) => {
// //     if (value == null || value === "") return "-";

// //     if (typeof value === "string" && value.startsWith("http")) {
// //       return (
// //         <img
// //           src={value}
// //           alt=""
// //           className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border"
// //         />
// //       );
// //     }

// //     if (
// //       column.includes("date") ||
// //       column.includes("created") ||
// //       column.includes("updated")
// //     ) {
// //       const d = new Date(value);

// //       if (!isNaN(d.getTime())) {
// //         return d.toLocaleString();
// //       }
// //     }

// //     if (column === "status" && typeof value === "string") {
// //       const color =
// //         value.toLowerCase() === "active"
// //           ? "bg-green-100 text-green-700"
// //           : "bg-red-100 text-red-700";

// //       return (
// //         <span
// //           className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${color}`}
// //         >
// //           {value}
// //         </span>
// //       );
// //     }

// //     return String(value);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="h-screen flex items-center justify-center text-lg sm:text-xl font-medium">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-100 p-3 sm:p-5 lg:p-8">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
// //         <div>
// //           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
// //             Business Data
// //           </h1>

// //           <p className="text-slate-500 mt-1 text-sm sm:text-base">
// //             View data from every organisation
// //           </p>
// //         </div>

// //         <button
// //           onClick={loadData}
// //           className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#020b3d] hover:bg-cyan-700 text-white px-5 py-3 rounded-xl transition"
// //         >
// //           <RefreshCw size={18} />
// //           Refresh
// //         </button>
// //       </div>

// //       {/* Summary Cards */}

// //       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-8">
// //         {Object.entries(tables).map(([name, table]) => (
// //           <div
// //             key={name}
// //             onClick={() => setSelectedTable(name)}
// //             className={`cursor-pointer rounded-2xl p-6 transition shadow-md

// //             ${
// //               selectedTable === name
// //                 ? "bg-blue-600 text-white"
// //                 : "bg-white hover:shadow-xl"
// //             }`}
// //           >
// //             <Table2 className="mb-4" />

// //             <h3 className="font-semibold text-lg">{header(name)}</h3>

// //             <p className="text-4xl font-bold mt-3">{table.rows.length}</p>

// //             <p className="text-sm opacity-80">Records</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Search */}

// //       <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-6 flex items-center gap-3">
// //         <Search size={20} />

// //         <input
// //           className="w-full outline-none"
// //           placeholder="Search records..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //       </div>

// //       {/* Table */}

// //       {table && (
// //         <div className="bg-white rounded-2xl shadow-md overflow-hidden">
// //           <div className="px-4 sm:px-6 py-4 border-b flex items-center gap-3">
// //             <Database />

// //             <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
// //               {header(selectedTable)}
// //             </h2>
// //           </div>

// //           <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
// //             <table className="min-w-[900px] lg:min-w-full w-full">
// //               <thead className="sticky top-0 bg-slate-100 z-10">
// //                 <tr>
// //                   {table.columns.map((column) => (
// //                     <th
// //                       key={column}
// //                       className="text-left px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-semibold whitespace-nowrap"
// //                     >
// //                       {header(column)}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {filteredRows.map((row, i) => (
// //                   <tr key={i} className="border-t hover:bg-slate-50">
// //                     {table.columns.map((column) => (
// //                       <td
// //                         key={column}
// //                         className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
// //                       >
// //                         {renderCell(column, row[column])}
// //                       </td>
// //                     ))}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //               {filteredRows.length === 0 && (
// //                 <tr>
// //                   <td
// //                     colSpan={table.columns.length}
// //                     className="text-center py-10 text-gray-500"
// //                   >
// //                     No records found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </table>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   RefreshCw,
//   Database,
//   Table2,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// type TableData = {
//   columns: string[];
//   rows: any[];
// };

// export default function BusinessDataPage() {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   const [tables, setTables] = useState<Record<string, TableData>>({});

//   const [selectedTable, setSelectedTable] = useState("");

//   const [search, setSearch] = useState("");

//   // -----------------------------
//   // Load Business Data
//   // -----------------------------
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(`${API}/api/admin/business-data`, {
//         withCredentials: true,
//       });

//       const data = res.data.data || {};

//       setTables(data);

//       if (!selectedTable && Object.keys(data).length) {
//         setSelectedTable(Object.keys(data)[0]);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load business data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // -----------------------------
//   // Selected Table
//   // -----------------------------
//   const table = tables[selectedTable];

//   const filteredRows = useMemo(() => {
//     if (!table) return [];

//     return table.rows.filter((row) =>
//       JSON.stringify(row).toLowerCase().includes(search.toLowerCase()),
//     );
//   }, [table, search]);

//   // -----------------------------
//   // Helpers
//   // -----------------------------
//   const header = (text: string) =>
//     text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

//   const renderCell = (column: string, value: any) => {
//     if (value == null || value === "") return "-";

//     if (typeof value === "string" && value.startsWith("http")) {
//       return (
//         <img
//           src={value}
//           alt=""
//           className="w-10 h-10 rounded-full object-cover border"
//         />
//       );
//     }

//     if (
//       column.includes("date") ||
//       column.includes("created") ||
//       column.includes("updated")
//     ) {
//       const d = new Date(value);

//       if (!isNaN(d.getTime())) {
//         return d.toLocaleString();
//       }
//     }

//     if (column === "status" && typeof value === "string") {
//       const color =
//         value.toLowerCase() === "active"
//           ? "bg-green-100 text-green-700"
//           : "bg-red-100 text-red-700";

//       return (
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
//         >
//           {value}
//         </span>
//       );
//     }

//     return String(value);
//   };

//   // -----------------------------
//   // Edit
//   // -----------------------------
//   const handleEdit = (id: number) => {
//     navigate(`/admin/organisation/business-data/${selectedTable}/${id}/edit`);
//   };

//   // -----------------------------
//   // Delete
//   // -----------------------------
//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Delete this record?")) return;

//     try {
//       setActionLoading(`delete-${id}`);

//       await axios.delete(
//         `${API}/api/admin/business-data/${selectedTable}/${id}`,
//         {
//           withCredentials: true,
//         },
//       );

//       await loadData();

//       alert("Deleted successfully.");
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed.");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // -----------------------------
//   // Activate
//   // -----------------------------
//   const handleActivate = async (id: number) => {
//     try {
//       setActionLoading(`activate-${id}`);

//       await axios.patch(
//         `${API}/api/admin/business-data/${selectedTable}/${id}/activate`,
//         {},
//         {
//           withCredentials: true,
//         },
//       );

//       await loadData();
//     } catch (err) {
//       console.error(err);
//       alert("Activation failed.");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // -----------------------------
//   // Deactivate
//   // -----------------------------
//   const handleDeactivate = async (id: number) => {
//     try {
//       setActionLoading(`deactivate-${id}`);

//       await axios.patch(
//         `${API}/api/admin/business-data/${selectedTable}/${id}/deactivate`,
//         {},
//         {
//           withCredentials: true,
//         },
//       );

//       await loadData();
//     } catch (err) {
//       console.error(err);
//       alert("Deactivation failed.");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-xl font-semibold">
//         Loading...
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen bg-slate-100 p-3 sm:p-5 lg:p-8">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
//             Business Data
//           </h1>

//           <p className="text-slate-500 mt-1">
//             View and manage organisation business data
//           </p>
//         </div>

//         <button
//           onClick={loadData}
//           className="flex items-center justify-center gap-2 bg-[#020b3d] hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
//         >
//           <RefreshCw size={18} />
//           Refresh
//         </button>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
//         {Object.entries(tables).map(([name, table]) => (
//           <div
//             key={name}
//             onClick={() => setSelectedTable(name)}
//             className={`cursor-pointer rounded-2xl p-6 shadow transition-all duration-300
//             ${
//               selectedTable === name
//                 ? "bg-blue-600 text-white shadow-xl scale-[1.02]"
//                 : "bg-white hover:shadow-lg"
//             }`}
//           >
//             <Table2 className="mb-4" size={28} />

//             <h3 className="text-lg font-semibold">{header(name)}</h3>

//             <p className="text-4xl font-bold mt-3">{table.rows.length}</p>

//             <p className="opacity-80 mt-1">Records</p>
//           </div>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-xl shadow p-4 mb-6 flex items-center gap-3">
//         <Search size={20} />

//         <input
//           type="text"
//           placeholder="Search records..."
//           className="w-full outline-none"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       {table && (
//         <div className="bg-white rounded-2xl shadow overflow-hidden">
//           {/* Title */}
//           <div className="px-6 py-4 border-b flex items-center gap-3">
//             <Database size={22} />

//             <h2 className="text-2xl font-semibold">{header(selectedTable)}</h2>
//           </div>

//           <div className="overflow-auto max-h-[70vh]">
//             <table className="min-w-[1200px] w-full">
//               <thead className="sticky top-0 bg-slate-100 z-10">
//                 <tr>
//                   <th className="px-4 py-3 text-left">#</th>

//                   {table.columns.map((column) => (
//                     <th
//                       key={column}
//                       className="px-4 py-3 text-left whitespace-nowrap text-sm font-semibold"
//                     >
//                       {header(column)}
//                     </th>
//                   ))}

//                   <th className="px-4 py-3 text-center whitespace-nowrap">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredRows.length > 0 &&
//                   filteredRows.map((row, index) => (
//                     <tr
//                       key={row.id ?? index}
//                       className="border-t hover:bg-slate-50 transition"
//                     >
//                       <td className="px-4 py-3 font-medium">{index + 1}</td>

//                       {table.columns.map((column) => (
//                         <td
//                           key={column}
//                           className="px-4 py-3 whitespace-nowrap text-sm"
//                         >
//                           {renderCell(column, row[column])}
//                         </td>
//                       ))}

//                       {/* Actions */}
//                       <td className="px-4 py-3">
//                         <div className="flex items-center justify-center gap-2">
//                           {/* Edit */}
//                           <button
//                             onClick={() => handleEdit(row.id)}
//                             className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
//                             title="Edit"
//                           >
//                             <Edit size={18} />
//                           </button>

//                           {/* Activate */}
//                           {String(row.status).toLowerCase() !== "active" && (
//                             <button
//                               onClick={() => handleActivate(row.id)}
//                               disabled={actionLoading === `activate-${row.id}`}
//                               className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition disabled:opacity-50"
//                               title="Activate"
//                             >
//                               <CheckCircle size={18} />
//                             </button>
//                           )}

//                           {/* Deactivate */}
//                           {String(row.status).toLowerCase() === "active" && (
//                             <button
//                               onClick={() => handleDeactivate(row.id)}
//                               disabled={
//                                 actionLoading === `deactivate-${row.id}`
//                               }
//                               className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white transition disabled:opacity-50"
//                               title="Deactivate"
//                             >
//                               <XCircle size={18} />
//                             </button>
//                           )}

//                           {/* Delete */}
//                           <button
//                             onClick={() => handleDelete(row.id)}
//                             disabled={actionLoading === `delete-${row.id}`}
//                             className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
//                             title="Delete"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}

//                 {filteredRows.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={table.columns.length + 2}
//                       className="text-center py-10 text-gray-500"
//                     >
//                       No records found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RefreshCw,
  Database,
  Table2,
  Edit,
  Trash2,
} from "lucide-react";

// Change this path if your Alert component is located somewhere else
import Alert from "../../../components/Aleartmessage";

const API = import.meta.env.VITE_BACKEND_URL;

type TableData = {
  columns: string[];
  rows: any[];
};

type AlertState = {
  type: "success" | "warning" | "error";
  message: string;
  confirm?: boolean;
  onConfirm?: () => void;
};

export default function BusinessDataPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [tables, setTables] = useState<Record<string, TableData>>({});

  const [selectedTable, setSelectedTable] = useState("");

  const [search, setSearch] = useState("");

  // Alert popup state
  const [alert, setAlert] = useState<AlertState | null>(null);

  // -----------------------------
  // Load Business Data
  // -----------------------------
  const loadData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/api/admin/business-data`, {
        withCredentials: true,
      });

      const data = res.data.data || {};

      setTables(data);

      if (!selectedTable && Object.keys(data).length) {
        setSelectedTable(Object.keys(data)[0]);
      }
    } catch (err) {
      console.error(err);

      setAlert({
        type: "error",
        message: "Failed to load business data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // -----------------------------
  // Selected Table
  // -----------------------------
  const table = tables[selectedTable];

  const filteredRows = useMemo(() => {
    if (!table) return [];

    return table.rows.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(search.toLowerCase()),
    );
  }, [table, search]);

  // -----------------------------
  // Helpers
  // -----------------------------
  const header = (text: string) =>
    text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const renderCell = (column: string, value: any) => {
    if (value == null || value === "") return "-";

    if (typeof value === "string" && value.startsWith("http")) {
      return (
        <img
          src={value}
          alt=""
          className="w-10 h-10 rounded-full object-cover border"
        />
      );
    }

    if (
      column.includes("date") ||
      column.includes("created") ||
      column.includes("updated")
    ) {
      const d = new Date(value);

      if (!isNaN(d.getTime())) {
        return d.toLocaleString();
      }
    }

    if (column === "status" && typeof value === "string") {
      const color =
        value.toLowerCase() === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
        >
          {value}
        </span>
      );
    }

    return String(value);
  };

  // -----------------------------
  // Edit
  // -----------------------------
  const handleEdit = (id: number) => {
    navigate(`/admin/organisation/business-data/${selectedTable}/${id}/edit`);
  };

  // -----------------------------
  // Delete
  // -----------------------------
  const handleDelete = (id: number) => {
    setAlert({
      type: "warning",
      message: "Are you sure you want to delete this record?",
      confirm: true,
      onConfirm: async () => {
        setAlert(null);

        try {
          setActionLoading(`delete-${id}`);

          await axios.delete(
            `${API}/api/admin/business-data/${selectedTable}/${id}`,
            {
              withCredentials: true,
            },
          );

          await loadData();

          setAlert({
            type: "success",
            message: "Deleted successfully.",
          });
        } catch (err) {
          console.error(err);

          setAlert({
            type: "error",
            message: "Delete failed.",
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-xl font-semibold px-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full min-w-0 overflow-x-hidden bg-slate-100 p-3 sm:p-5 lg:p-8">
      {/* Header */}
      <div className="w-full min-w-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 lg:mb-8">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 break-words">
            Business Data
          </h1>

          <p className="text-slate-500 mt-1 text-sm sm:text-base break-words">
            View and manage organisation business data
          </p>
        </div>

        <button
          onClick={loadData}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#020b3d] hover:bg-blue-700 text-white px-5 sm:px-6 py-3 rounded-xl transition shrink-0"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 lg:mb-8">
        {Object.entries(tables).map(([name, table]) => (
          <div
            key={name}
            onClick={() => setSelectedTable(name)}
            className={`min-w-0 cursor-pointer rounded-2xl p-5 sm:p-6 shadow transition-all duration-300 overflow-hidden
              ${
                selectedTable === name
                  ? "bg-blue-600 text-white shadow-xl scale-[1.02]"
                  : "bg-white hover:shadow-lg"
              }`}
          >
            <Table2 className="mb-4" size={28} />

            <h3 className="text-base sm:text-lg font-semibold break-words">
              {header(name)}
            </h3>

            <p className="text-3xl sm:text-4xl font-bold mt-3">
              {table.rows.length}
            </p>

            <p className="opacity-80 mt-1">Records</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="w-full min-w-0 bg-white rounded-xl shadow p-3 sm:p-4 mb-5 sm:mb-6 flex items-center gap-3">
        <Search size={20} className="shrink-0" />

        <input
          type="text"
          placeholder="Search records..."
          className="w-full min-w-0 outline-none text-sm sm:text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {table && (
        <div className="w-full max-w-full min-w-0 bg-white rounded-2xl shadow overflow-hidden">
          {/* Title */}
          <div className="w-full min-w-0 px-4 sm:px-6 py-4 border-b flex items-center gap-3">
            <Database size={22} className="shrink-0" />

            <h2 className="text-xl sm:text-2xl font-semibold truncate">
              {header(selectedTable)}
            </h2>
          </div>

          {/* ONLY THIS AREA SCROLLS HORIZONTALLY */}
          <div className="w-full max-w-full min-w-0 overflow-x-auto overflow-y-auto max-h-[70vh]">
            <table className="min-w-[1100px] w-full border-collapse">
              <thead className="sticky top-0 bg-slate-100 z-10">
                <tr>
                  <th className="px-4 py-3 text-left whitespace-nowrap">#</th>

                  {table.columns.map((column) => (
                    <th
                      key={column}
                      className="px-4 py-3 text-left whitespace-nowrap text-sm font-semibold"
                    >
                      {header(column)}
                    </th>
                  ))}

                  {selectedTable !== "punch_logs" && (
                    <th className="px-4 py-3 text-center whitespace-nowrap">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredRows.length > 0 &&
                  filteredRows.map((row, index) => (
                    <tr
                      key={row.id ?? index}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="px-4 py-3 font-medium whitespace-nowrap">
                        {index + 1}
                      </td>

                      {table.columns.map((column) => (
                        <td
                          key={column}
                          className="px-4 py-3 whitespace-nowrap text-sm"
                        >
                          {renderCell(column, row[column])}
                        </td>
                      ))}

                      {selectedTable !== "punch_logs" && (
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            {/* Edit */}
                            <button
                              onClick={() => handleEdit(row.id)}
                              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition shrink-0"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(row.id)}
                              disabled={actionLoading === `delete-${row.id}`}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition disabled:opacity-50 shrink-0"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}

                {filteredRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={table.columns.length + 2}
                      className="text-center py-10 text-gray-500"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Custom Alert Popup */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          confirm={alert.confirm}
          onConfirm={alert.onConfirm}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}