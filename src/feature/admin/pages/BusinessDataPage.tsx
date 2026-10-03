// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   RefreshCw,
//   Database,
//   Table2,
//   Edit,
//   Trash2,
//   ChevronRight,
//   FileX2,
// } from "lucide-react";

// import Alert from "../../../components/Aleartmessage";

// const API = import.meta.env.VITE_BACKEND_URL;

// type TableData = {
//   columns: string[];
//   rows: any[];
// };

// type AlertState = {
//   type: "success" | "warning" | "error";
//   message: string;
//   confirm?: boolean;
//   onConfirm?: () => void;
// };

// export default function BusinessDataPage() {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   const [tables, setTables] = useState<Record<string, TableData>>({});
//   const [selectedTable, setSelectedTable] = useState("");
//   const [search, setSearch] = useState("");

//   const [alert, setAlert] = useState<AlertState | null>(null);

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

//       const tableNames = Object.keys(data);

//       if (!selectedTable && tableNames.length > 0) {
//         setSelectedTable(tableNames[0]);
//       }

//       if (
//         selectedTable &&
//         tableNames.length > 0 &&
//         !tableNames.includes(selectedTable)
//       ) {
//         setSelectedTable(tableNames[0]);
//       }
//     } catch (err) {
//       console.error(err);

//       setAlert({
//         type: "error",
//         message: "Failed to load business data.",
//       });
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

//   // -----------------------------
//   // Filter Rows
//   // -----------------------------
//   const filteredRows = useMemo(() => {
//     if (!table) return [];

//     const searchValue = search.trim().toLowerCase();

//     if (!searchValue) {
//       return table.rows;
//     }

//     return table.rows.filter((row) =>
//       JSON.stringify(row).toLowerCase().includes(searchValue),
//     );
//   }, [table, search]);

//   // -----------------------------
//   // Helpers
//   // -----------------------------
//   const header = (text: string) =>
//     text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

//   const renderCell = (column: string, value: any) => {
//     if (value == null || value === "") {
//       return <span className="text-gray-400">-</span>;
//     }

//     // Image / URL
//     if (
//       typeof value === "string" &&
//       (value.startsWith("http://") || value.startsWith("https://"))
//     ) {
//       return (
//         <img
//           src={value}
//           alt=""
//           className="w-10 h-10 rounded-lg object-cover border border-gray-200"
//         />
//       );
//     }

//     // Date / Time
//     if (
//       column.includes("date") ||
//       column.includes("created") ||
//       column.includes("updated")
//     ) {
//       const d = new Date(value);

//       if (!isNaN(d.getTime())) {
//         return <span className="text-gray-600">{d.toLocaleString()}</span>;
//       }
//     }

//     // Status
//     if (column === "status" && typeof value === "string") {
//       const isActive = value.toLowerCase() === "active";

//       return (
//         <span
//           className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${
//             isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
//           }`}
//         >
//           <span
//             className={`w-1.5 h-1.5 rounded-full ${
//               isActive ? "bg-green-500" : "bg-red-500"
//             }`}
//           />

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
//   const handleDelete = (id: number) => {
//     setAlert({
//       type: "warning",
//       message: "Are you sure you want to delete this record?",
//       confirm: true,
//       onConfirm: async () => {
//         setAlert(null);

//         try {
//           setActionLoading(`delete-${id}`);

//           await axios.delete(
//             `${API}/api/admin/business-data/${selectedTable}/${id}`,
//             {
//               withCredentials: true,
//             },
//           );

//           await loadData();

//           setAlert({
//             type: "success",
//             message: "Record deleted successfully.",
//           });
//         } catch (err) {
//           console.error(err);

//           setAlert({
//             type: "error",
//             message: "Delete failed.",
//           });
//         } finally {
//           setActionLoading(null);
//         }
//       },
//     });
//   };

//   // -----------------------------
//   // Loading
//   // -----------------------------
//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center px-4">
//         <div className="flex flex-col items-center gap-3">
//           <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
//             <RefreshCw size={24} className="animate-spin" />
//           </div>

//           <p className="text-sm font-medium text-gray-500">
//             Loading business data...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const tableNames = Object.keys(tables);

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6">
//       {/* Main Card */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 md:p-8 border-b border-gray-200">
//           <div className="flex items-center gap-4 min-w-0">
//             <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 shrink-0">
//               <Database size={24} />
//             </div>

//             <div className="min-w-0">
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Business Data
//               </h1>

//               <p className="text-sm text-gray-500 mt-1">
//                 View and manage organisation business data.
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={loadData}
//             disabled={loading}
//             title="Refresh business data"
//             aria-label="Refresh business data"
//             className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw size={18} className={loading ? "animate-spin" : ""} />

//             <span>{loading ? "Loading..." : "Refresh"}</span>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-4 md:p-6">
//           {/* Table Selection */}
//           {tableNames.length > 0 && (
//             <div className="mb-6">
//               <div className="flex items-center justify-between gap-3 mb-3">
//                 <div>
//                   <h2 className="text-sm font-semibold text-gray-900">
//                     Available Tables
//                   </h2>

//                   <p className="text-xs text-gray-500 mt-1">
//                     Select a table to view its records.
//                   </p>
//                 </div>

//                 <span className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
//                   {tableNames.length}{" "}
//                   {tableNames.length === 1 ? "table" : "tables"}
//                 </span>
//               </div>

//               <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
//                 {Object.entries(tables).map(([name, tableData]) => {
//                   const isSelected = selectedTable === name;

//                   return (
//                     <button
//                       key={name}
//                       type="button"
//                       onClick={() => {
//                         setSelectedTable(name);
//                         setSearch("");
//                       }}
//                       className={`group text-left min-w-0 rounded-xl border p-4 transition-all ${
//                         isSelected
//                           ? "border-blue-600 bg-blue-600 shadow-sm"
//                           : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${
//                             isSelected
//                               ? "bg-white/20 text-white"
//                               : "bg-blue-50 text-blue-600"
//                           }`}
//                         >
//                           <Table2 size={20} />
//                         </div>

//                         <div className="min-w-0 flex-1">
//                           <h3
//                             className={`text-sm font-semibold truncate ${
//                               isSelected ? "text-white" : "text-gray-800"
//                             }`}
//                             title={header(name)}
//                           >
//                             {header(name)}
//                           </h3>

//                           <p
//                             className={`text-xs mt-1 ${
//                               isSelected ? "text-blue-100" : "text-gray-500"
//                             }`}
//                           >
//                             {tableData.rows.length}{" "}
//                             {tableData.rows.length === 1 ? "record" : "records"}
//                           </p>
//                         </div>

//                         <div
//                           className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-transform group-hover:translate-x-1 ${
//                             isSelected
//                               ? "bg-white/15 text-white"
//                               : "bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600"
//                           }`}
//                         >
//                           <ChevronRight size={17} />
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* No Tables */}
//           {tableNames.length === 0 && (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-50 text-gray-400 mb-4">
//                 <FileX2 size={26} />
//               </div>

//               <h3 className="text-lg font-semibold text-gray-900">
//                 No business data found
//               </h3>

//               <p className="text-sm text-gray-500 mt-1 max-w-md">
//                 There are currently no business data tables available for this
//                 organisation.
//               </p>
//             </div>
//           )}

//           {/* Search */}
//           {table && (
//             <>
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">
//                     {header(selectedTable)}
//                   </h2>

//                   <p className="text-sm text-gray-500 mt-1">
//                     {filteredRows.length} of {table.rows.length}{" "}
//                     {table.rows.length === 1 ? "record" : "records"}
//                   </p>
//                 </div>

//                 <div className="relative w-full sm:w-80">
//                   <Search
//                     size={18}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//                   />

//                   <input
//                     type="text"
//                     placeholder="Search records..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-full h-11 rounded-lg border border-gray-300 pl-10 pr-3 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors"
//                   />
//                 </div>
//               </div>

//               {/* Table */}
//               <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
//                 {/* Table Header */}
//                 <div className="flex items-center gap-3 px-4 md:px-6 py-4 border-b border-gray-200">
//                   <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 shrink-0">
//                     <Table2 size={19} />
//                   </div>

//                   <div className="min-w-0">
//                     <h3 className="text-base font-semibold text-gray-900 truncate">
//                       {header(selectedTable)}
//                     </h3>

//                     <p className="text-xs text-gray-500 mt-0.5">
//                       Business records
//                     </p>
//                   </div>
//                 </div>

//                 {/* Table Scroll */}
//                 <div className="w-full overflow-x-auto overflow-y-auto max-h-[70vh]">
//                   <table className="min-w-[1100px] w-full border-collapse">
//                     <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
//                       <tr>
//                         <th className="px-4 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                           #
//                         </th>

//                         {table.columns.map((column) => (
//                           <th
//                             key={column}
//                             className="px-4 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider"
//                           >
//                             {header(column)}
//                           </th>
//                         ))}

//                         {selectedTable !== "punch_logs" && (
//                           <th className="px-4 py-3 text-center whitespace-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                             Actions
//                           </th>
//                         )}
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-gray-100">
//                       {filteredRows.length > 0 &&
//                         filteredRows.map((row, index) => (
//                           <tr
//                             key={row.id ?? index}
//                             className="hover:bg-gray-50 transition-colors"
//                           >
//                             <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
//                               {index + 1}
//                             </td>

//                             {table.columns.map((column) => (
//                               <td
//                                 key={column}
//                                 className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
//                               >
//                                 {renderCell(column, row[column])}
//                               </td>
//                             ))}

//                             {selectedTable !== "punch_logs" && (
//                               <td className="px-4 py-3">
//                                 <div className="flex items-center justify-center gap-2">
//                                   {/* Edit */}
//                                   <button
//                                     type="button"
//                                     onClick={() => handleEdit(row.id)}
//                                     title="Edit record"
//                                     aria-label="Edit record"
//                                     className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors disabled:opacity-50"
//                                   >
//                                     <Edit size={17} />
//                                   </button>

//                                   {/* Delete */}
//                                   <button
//                                     type="button"
//                                     onClick={() => handleDelete(row.id)}
//                                     disabled={
//                                       actionLoading === `delete-${row.id}`
//                                     }
//                                     title="Delete record"
//                                     aria-label="Delete record"
//                                     className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                   >
//                                     {actionLoading === `delete-${row.id}` ? (
//                                       <RefreshCw
//                                         size={17}
//                                         className="animate-spin"
//                                       />
//                                     ) : (
//                                       <Trash2 size={17} />
//                                     )}
//                                   </button>
//                                 </div>
//                               </td>
//                             )}
//                           </tr>
//                         ))}

//                       {filteredRows.length === 0 && (
//                         <tr>
//                           <td
//                             colSpan={
//                               table.columns.length +
//                               (selectedTable !== "punch_logs" ? 2 : 1)
//                             }
//                             className="py-14 text-center"
//                           >
//                             <div className="flex flex-col items-center justify-center">
//                               <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 text-gray-400 mb-3">
//                                 <Search size={22} />
//                               </div>

//                               <p className="text-sm font-medium text-gray-700">
//                                 No records found
//                               </p>

//                               <p className="text-xs text-gray-500 mt-1">
//                                 Try changing your search criteria.
//                               </p>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Alert */}
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           confirm={alert.confirm}
//           onConfirm={alert.onConfirm}
//           onClose={() => setAlert(null)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  RefreshCw,
  Database,
  Table2,
  Edit,
  Trash2,
  ChevronRight,
  FileX2,
  X,
  Save,
  Loader2,
  User,
} from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [tables, setTables] = useState<Record<string, TableData>>({});
  const [selectedTable, setSelectedTable] = useState("");
  const [search, setSearch] = useState("");

  const [alert, setAlert] = useState<AlertState | null>(null);

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editTable, setEditTable] = useState("");
  const [editId, setEditId] = useState<number | string>("");
  const [formData, setFormData] = useState<Record<string, any>>({});

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

      const tableNames = Object.keys(data);

      if (!selectedTable && tableNames.length > 0) {
        setSelectedTable(tableNames[0]);
      }

      if (
        selectedTable &&
        tableNames.length > 0 &&
        !tableNames.includes(selectedTable)
      ) {
        setSelectedTable(tableNames[0]);
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

  // -----------------------------
  // Filter Rows
  // -----------------------------
  const filteredRows = useMemo(() => {
    if (!table) return [];

    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return table.rows;
    }

    return table.rows.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(searchValue),
    );
  }, [table, search]);

  // -----------------------------
  // Helpers
  // -----------------------------
  const header = (text: string) =>
    text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const ignoredFields = ["id", "created_at", "updated_at", "face_descriptor"];

  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 " +
    "placeholder-gray-400 focus:outline-none focus:border-blue-500 " +
    "focus:ring-0 transition-colors";

  const textareaClass =
    "w-full rounded-lg border border-gray-300 px-3 py-3 " +
    "placeholder-gray-400 focus:outline-none focus:border-blue-500 " +
    "focus:ring-0 transition-colors resize-none";

  // -----------------------------
  // Render Cell
  // -----------------------------
  const renderCell = (column: string, value: any) => {
    if (value == null || value === "") {
      return <span className="text-gray-400">-</span>;
    }

    // Image / URL
    if (
      typeof value === "string" &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      return (
        <img
          src={value}
          alt=""
          className="w-10 h-10 rounded-lg object-cover border border-gray-200"
        />
      );
    }

    // Date / Time
    if (
      column.includes("date") ||
      column.includes("created") ||
      column.includes("updated")
    ) {
      const d = new Date(value);

      if (!isNaN(d.getTime())) {
        return <span className="text-gray-600">{d.toLocaleString()}</span>;
      }
    }

    // Status
    if (column === "status" && typeof value === "string") {
      const isActive = value.toLowerCase() === "active";

      return (
        <span
          className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${
            isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          />

          {value}
        </span>
      );
    }

    return String(value);
  };

  // -----------------------------
  // Open Edit Modal
  // -----------------------------
  const handleEdit = async (tableName: string, id: number | string) => {
    try {
      setEditTable(tableName);
      setEditId(id);
      setEditModalOpen(true);
      setEditLoading(true);
      setFormData({});

      const res = await axios.get(
        `${API}/api/admin/business-data/${encodeURIComponent(
          tableName,
        )}/${encodeURIComponent(String(id))}`,
        {
          withCredentials: true,
        },
      );

      setFormData(res.data.data || {});
    } catch (err: any) {
      console.error(err);

      setEditModalOpen(false);

      setAlert({
        type: "error",
        message: err.response?.data?.message || "Unable to load record.",
      });
    } finally {
      setEditLoading(false);
    }
  };

  // -----------------------------
  // Close Edit Modal
  // -----------------------------
  const closeEditModal = () => {
    if (saving) return;

    setEditModalOpen(false);
    setEditTable("");
    setEditId("");
    setFormData({});
  };

  // -----------------------------
  // Input Change
  // -----------------------------
  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // -----------------------------
  // Save Edit
  // -----------------------------
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const updateData = Object.fromEntries(
        Object.entries(formData).filter(
          ([key]) => !ignoredFields.includes(key),
        ),
      );

      await axios.put(
        `${API}/api/admin/business-data/${encodeURIComponent(
          editTable,
        )}/${encodeURIComponent(String(editId))}`,
        updateData,
        {
          withCredentials: true,
        },
      );

      setEditModalOpen(false);

      setAlert({
        type: "success",
        message: "Record updated successfully.",
      });

      await loadData();
    } catch (err: any) {
      console.error(err);

      setAlert({
        type: "error",
        message: err.response?.data?.message || "Update failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------
  // Delete
  // -----------------------------
  const handleDelete = (id: number | string) => {
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
            message: "Record deleted successfully.",
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
  // Format Label
  // -----------------------------
  const formatLabel = (text: string) =>
    text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // -----------------------------
  // Long Text Detection
  // -----------------------------
  const isLongTextField = (key: string, value: any) => {
    if (typeof value !== "string") {
      return false;
    }

    return (
      value.length > 120 ||
      key.toLowerCase().includes("description") ||
      key.toLowerCase().includes("address") ||
      key.toLowerCase().includes("remarks") ||
      key.toLowerCase().includes("comment") ||
      key.toLowerCase().includes("note")
    );
  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <RefreshCw size={24} className="animate-spin" />
          </div>

          <p className="text-sm font-medium text-gray-500">
            Loading business data...
          </p>
        </div>
      </div>
    );
  }

  const tableNames = Object.keys(tables);

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 md:p-8 border-b border-gray-200">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <Database size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  Business Data
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  View and manage organisation business data.
                </p>
              </div>
            </div>

            {/* <button
              type="button"
              onClick={loadData}
              disabled={loading}
              title="Refresh business data"
              aria-label="Refresh business data"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />

              <span>{loading ? "Loading..." : "Refresh"}</span>
            </button> */}

            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              title="Refresh business data"
              aria-label="Refresh business data"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} />

              <span>{loading ? "Loading..." : "Refresh"}</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            {/* Table Selection */}
            {tableNames.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      Available Tables
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                      Select a table to view its records.
                    </p>
                  </div>

                  <span className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                    {tableNames.length}{" "}
                    {tableNames.length === 1 ? "table" : "tables"}
                  </span>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
                  {Object.entries(tables).map(([name, tableData]) => {
                    const isSelected = selectedTable === name;

                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          setSelectedTable(name);
                          setSearch("");
                        }}
                        className={`group text-left min-w-0 rounded-xl border p-4 transition-all ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 shadow-sm"
                            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            <Table2 size={20} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3
                              className={`text-sm font-semibold truncate ${
                                isSelected ? "text-white" : "text-gray-800"
                              }`}
                              title={header(name)}
                            >
                              {header(name)}
                            </h3>

                            <p
                              className={`text-xs mt-1 ${
                                isSelected ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {tableData.rows.length}{" "}
                              {tableData.rows.length === 1
                                ? "record"
                                : "records"}
                            </p>
                          </div>

                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-transform group-hover:translate-x-1 ${
                              isSelected
                                ? "bg-white/15 text-white"
                                : "bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                            }`}
                          >
                            <ChevronRight size={17} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Tables */}
            {tableNames.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-50 text-gray-400 mb-4">
                  <FileX2 size={26} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  No business data found
                </h3>

                <p className="text-sm text-gray-500 mt-1 max-w-md">
                  There are currently no business data tables available for this
                  organisation.
                </p>
              </div>
            )}

            {/* Search */}
            {table && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {header(selectedTable)}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {filteredRows.length} of {table.rows.length}{" "}
                      {table.rows.length === 1 ? "record" : "records"}
                    </p>
                  </div>

                  <div className="relative w-full sm:w-80">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                    <input
                      type="text"
                      placeholder="Search records..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full h-11 rounded-lg border border-gray-300 pl-10 pr-3 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  {/* Table Header */}
                  <div className="flex items-center gap-3 px-4 md:px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                      <Table2 size={19} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {header(selectedTable)}
                      </h3>

                      <p className="text-xs text-gray-500 mt-0.5">
                        Business records
                      </p>
                    </div>
                  </div>

                  {/* Table Scroll */}
                  <div className="w-full overflow-x-auto overflow-y-auto max-h-[70vh]">
                    <table className="min-w-[1100px] w-full border-collapse">
                      <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            #
                          </th>

                          {table.columns.map((column) => (
                            <th
                              key={column}
                              className="px-4 py-3 text-left whitespace-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider"
                            >
                              {header(column)}
                            </th>
                          ))}

                          {selectedTable !== "punch_logs" && (
                            <th className="px-4 py-3 text-center whitespace-nowrap text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          )}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {filteredRows.length > 0 &&
                          filteredRows.map((row, index) => (
                            <tr
                              key={row.id ?? index}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
                                {index + 1}
                              </td>

                              {table.columns.map((column) => (
                                <td
                                  key={column}
                                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                                >
                                  {renderCell(column, row[column])}
                                </td>
                              ))}

                              {selectedTable !== "punch_logs" && (
                                <td className="px-4 py-3">
                                  <div className="flex items-center justify-center gap-2">
                                    {/* Edit */}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleEdit(selectedTable, row.id)
                                      }
                                      title="Edit record"
                                      aria-label="Edit record"
                                      className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors disabled:opacity-50"
                                    >
                                      <Edit size={17} />
                                    </button>

                                    {/* Delete */}
                                    <button
                                      type="button"
                                      onClick={() => handleDelete(row.id)}
                                      disabled={
                                        actionLoading === `delete-${row.id}`
                                      }
                                      title="Delete record"
                                      aria-label="Delete record"
                                      className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {actionLoading === `delete-${row.id}` ? (
                                        <RefreshCw
                                          size={17}
                                          className="animate-spin"
                                        />
                                      ) : (
                                        <Trash2 size={17} />
                                      )}
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))}

                        {filteredRows.length === 0 && (
                          <tr>
                            <td
                              colSpan={
                                table.columns.length +
                                (selectedTable !== "punch_logs" ? 2 : 1)
                              }
                              className="py-14 text-center"
                            >
                              <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 text-gray-400 mb-3">
                                  <Search size={22} />
                                </div>

                                <p className="text-sm font-medium text-gray-700">
                                  No records found
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                  Try changing your search criteria.
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Edit size={21} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
                    Edit {formatLabel(editTable)}
                  </h2>

                  <p className="text-sm text-gray-500 mt-0.5">
                    Update record information
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={saving}
                title="Close"
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            {editLoading ? (
              <div className="flex-1 min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
                    <Loader2 size={24} className="animate-spin" />
                  </div>

                  <p className="text-sm font-medium text-gray-500">
                    Loading record...
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-8">
                  {/* Record Information */}
                  <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User size={18} className="text-blue-600" />

                      <h3 className="text-sm font-semibold text-gray-900">
                        Record Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Record ID</p>

                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {formData.id ?? editId}
                        </p>
                      </div>

                      {formData.created_at && (
                        <div>
                          <p className="text-xs text-gray-500">Created At</p>

                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {new Date(formData.created_at).toLocaleString()}
                          </p>
                        </div>
                      )}

                      {formData.updated_at && (
                        <div>
                          <p className="text-xs text-gray-500">Updated At</p>

                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {new Date(formData.updated_at).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Object.entries(formData)
                      .filter(([key]) => !ignoredFields.includes(key))
                      .map(([key, value]) => {
                        const label = formatLabel(key);

                        // ---------------------------------
                        // Profile Photo
                        // ---------------------------------
                        if (
                          key === "profile_photo" &&
                          typeof value === "string" &&
                          value.startsWith("http")
                        ) {
                          return (
                            <div key={key} className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {label}
                              </label>

                              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
                                <img
                                  src={value}
                                  alt="Profile"
                                  className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                                />

                                <div>
                                  <p className="text-sm font-medium text-gray-700">
                                    Profile Photo
                                  </p>

                                  <p className="text-xs text-gray-500 mt-1">
                                    Image preview only
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // ---------------------------------
                        // Status
                        // ---------------------------------
                        if (key === "status") {
                          return (
                            <div key={key}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {label}
                              </label>

                              <select
                                value={value ?? ""}
                                onChange={(e) =>
                                  handleChange(key, e.target.value)
                                }
                                className={inputClass}
                              >
                                <option value="">Select status</option>

                                <option value="Active">Active</option>

                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                          );
                        }

                        // ---------------------------------
                        // Boolean
                        // ---------------------------------
                        if (typeof value === "boolean") {
                          return (
                            <div key={key} className="flex items-center">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={(e) =>
                                    handleChange(key, e.target.checked)
                                  }
                                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />

                                <span className="text-sm font-medium text-gray-700">
                                  {label}
                                </span>
                              </label>
                            </div>
                          );
                        }

                        // ---------------------------------
                        // Number
                        // ---------------------------------
                        if (typeof value === "number") {
                          return (
                            <div key={key}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {label}
                              </label>

                              <input
                                type="number"
                                value={value}
                                onChange={(e) =>
                                  handleChange(
                                    key,
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value),
                                  )
                                }
                                className={inputClass}
                              />
                            </div>
                          );
                        }

                        // ---------------------------------
                        // Email
                        // ---------------------------------
                        if (key.toLowerCase().includes("email")) {
                          return (
                            <div key={key}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {label}
                              </label>

                              <input
                                type="email"
                                value={value ?? ""}
                                onChange={(e) =>
                                  handleChange(key, e.target.value)
                                }
                                className={inputClass}
                                placeholder={`Enter ${label.toLowerCase()}`}
                              />
                            </div>
                          );
                        }

                        // ---------------------------------
                        // Date
                        // ---------------------------------
                        if (
                          key.toLowerCase().includes("date") ||
                          key.toLowerCase().includes("dob")
                        ) {
                          return (
                            <div key={key}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {label}
                              </label>

                              <input
                                type="date"
                                value={
                                  value ? String(value).substring(0, 10) : ""
                                }
                                onChange={(e) =>
                                  handleChange(key, e.target.value)
                                }
                                className={inputClass}
                              />
                            </div>
                          );
                        }

                        // ---------------------------------
                        // Long Text
                        // ---------------------------------
                        if (isLongTextField(key, value)) {
                          return (
                            <div key={key} className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {label}
                              </label>

                              <textarea
                                rows={5}
                                value={value ?? ""}
                                onChange={(e) =>
                                  handleChange(key, e.target.value)
                                }
                                className={textareaClass}
                                placeholder={`Enter ${label.toLowerCase()}`}
                              />
                            </div>
                          );
                        }

                        // ---------------------------------
                        // Default Text
                        // ---------------------------------
                        return (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {label}
                            </label>

                            <input
                              type="text"
                              value={value ?? ""}
                              onChange={(e) =>
                                handleChange(key, e.target.value)
                              }
                              className={inputClass}
                              placeholder={`Enter ${label.toLowerCase()}`}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 md:px-8 py-4">
                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      disabled={saving}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X size={18} />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          confirm={alert.confirm}
          onConfirm={alert.onConfirm}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
}