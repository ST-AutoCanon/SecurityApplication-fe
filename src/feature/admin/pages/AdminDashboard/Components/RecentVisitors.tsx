// // // // // // import { Eye } from "lucide-react";

// // // // // // const visitors = [
// // // // // //   {
// // // // // //     id: 1,
// // // // // //     name: "Rahul Sharma",
// // // // // //     resident: "A-302",
// // // // // //     purpose: "Guest",
// // // // // //     time: "09:10 AM",
// // // // // //     status: "Inside",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 2,
// // // // // //     name: "Amit Kumar",
// // // // // //     resident: "B-204",
// // // // // //     purpose: "Delivery",
// // // // // //     time: "09:45 AM",
// // // // // //     status: "Waiting",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 3,
// // // // // //     name: "Priya Singh",
// // // // // //     resident: "C-102",
// // // // // //     purpose: "Guest",
// // // // // //     time: "10:15 AM",
// // // // // //     status: "Exited",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 4,
// // // // // //     name: "Kiran Patel",
// // // // // //     resident: "D-401",
// // // // // //     purpose: "Maintenance",
// // // // // //     time: "11:00 AM",
// // // // // //     status: "Inside",
// // // // // //   },
// // // // // // ];

// // // // // // const getStatusColor = (status: string) => {
// // // // // //   switch (status) {
// // // // // //     case "Inside":
// // // // // //       return "bg-green-100 text-green-700";

// // // // // //     case "Waiting":
// // // // // //       return "bg-yellow-100 text-yellow-700";

// // // // // //     case "Exited":
// // // // // //       return "bg-red-100 text-red-700";

// // // // // //     default:
// // // // // //       return "bg-gray-100 text-gray-700";
// // // // // //   }
// // // // // // };

// // // // // // export default function RecentVisitors() {
// // // // // //   return (
// // // // // //     <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

// // // // // //       <div className="flex justify-between items-center mb-6">

// // // // // //         <h2 className="text-xl font-bold">
// // // // // //           Recent Visitors
// // // // // //         </h2>

// // // // // //         <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
// // // // // //           View All
// // // // // //         </button>

// // // // // //       </div>

// // // // // //       <div className="overflow-x-auto">

// // // // // //         <table className="w-full">

// // // // // //           <thead>

// // // // // //             <tr className="border-b border-slate-700 text-gray-400">

// // // // // //               <th className="text-left py-3">Visitor</th>

// // // // // //               <th className="text-left py-3">Resident</th>

// // // // // //               <th className="text-left py-3">Purpose</th>

// // // // // //               <th className="text-left py-3">Entry Time</th>

// // // // // //               <th className="text-left py-3">Status</th>

// // // // // //               <th className="text-center py-3">Action</th>

// // // // // //             </tr>

// // // // // //           </thead>

// // // // // //           <tbody>

// // // // // //             {visitors.map((visitor) => (

// // // // // //               <tr
// // // // // //                 key={visitor.id}
// // // // // //                 className="border-b border-slate-800 hover:bg-slate-800 transition"
// // // // // //               >

// // // // // //                 <td className="py-4">

// // // // // //                   <div className="flex items-center gap-3">

// // // // // //                     <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">

// // // // // //                       {visitor.name.charAt(0)}

// // // // // //                     </div>

// // // // // //                     <span>{visitor.name}</span>

// // // // // //                   </div>

// // // // // //                 </td>

// // // // // //                 <td>{visitor.resident}</td>

// // // // // //                 <td>{visitor.purpose}</td>

// // // // // //                 <td>{visitor.time}</td>

// // // // // //                 <td>

// // // // // //                   <span
// // // // // //                     className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
// // // // // //                       visitor.status
// // // // // //                     )}`}
// // // // // //                   >
// // // // // //                     {visitor.status}
// // // // // //                   </span>

// // // // // //                 </td>

// // // // // //                 <td className="text-center">

// // // // // //                   <button className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg">

// // // // // //                     <Eye size={18} />

// // // // // //                   </button>

// // // // // //                 </td>

// // // // // //               </tr>

// // // // // //             ))}

// // // // // //           </tbody>

// // // // // //         </table>

// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import { useEffect, useState } from "react";
// // // // // import axios from "axios";
// // // // // import { Eye } from "lucide-react";

// // // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // // type Visitor = {
// // // // //   id: number;
// // // // //   full_name: string;
// // // // //   punch_type: string;
// // // // //   punch_time: string;
// // // // // };

// // // // // const getStatusColor = (status: string) => {
// // // // //   switch (status) {
// // // // //     case "IN":
// // // // //       return "bg-green-100 text-green-700";

// // // // //     case "OUT":
// // // // //       return "bg-red-100 text-red-700";

// // // // //     default:
// // // // //       return "bg-gray-100 text-gray-700";
// // // // //   }
// // // // // };

// // // // // export default function RecentVisitors() {
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [visitors, setVisitors] = useState<Visitor[]>([]);

// // // // //   const loadVisitors = async () => {
// // // // //     try {
// // // // //       setLoading(true);

// // // // //       const res = await axios.get(
// // // // //         `${API}/api/dashboard/recent-visitors`,
// // // // //         {
// // // // //           withCredentials: true,
// // // // //         }
// // // // //       );

// // // // //       setVisitors(res.data.data || []);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       alert("Failed to load recent visitors");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     loadVisitors();
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

// // // // //       <div className="flex justify-between items-center mb-6">
// // // // //         <h2 className="text-xl font-bold">
// // // // //           Recent Visitors
// // // // //         </h2>

// // // // //         <button
// // // // //           onClick={loadVisitors}
// // // // //           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
// // // // //         >
// // // // //           Refresh
// // // // //         </button>
// // // // //       </div>

// // // // //       <div className="overflow-x-auto">

// // // // //         <table className="w-full">

// // // // //           <thead>

// // // // //             <tr className="border-b border-slate-700 text-gray-400">

// // // // //               <th className="text-left py-3">Visitor</th>

// // // // //               <th className="text-left py-3">Resident</th>

// // // // //               <th className="text-left py-3">Purpose</th>

// // // // //               <th className="text-left py-3">Entry Time</th>

// // // // //               <th className="text-left py-3">Status</th>

// // // // //               <th className="text-center py-3">Action</th>

// // // // //             </tr>

// // // // //           </thead>

// // // // //           <tbody>

// // // // //             {loading ? (

// // // // //               <tr>
// // // // //                 <td colSpan={6} className="text-center py-6">
// // // // //                   Loading...
// // // // //                 </td>
// // // // //               </tr>

// // // // //             ) : visitors.length === 0 ? (

// // // // //               <tr>
// // // // //                 <td colSpan={6} className="text-center py-6">
// // // // //                   No Visitors Found
// // // // //                 </td>
// // // // //               </tr>

// // // // //             ) : (

// // // // //               visitors.map((visitor) => (

// // // // //                 <tr
// // // // //                   key={visitor.id}
// // // // //                   className="border-b border-slate-800 hover:bg-slate-800 transition"
// // // // //                 >

// // // // //                   <td className="py-4">

// // // // //                     <div className="flex items-center gap-3">

// // // // //                       <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
// // // // //                         {visitor.full_name.charAt(0)}
// // // // //                       </div>

// // // // //                       <span>{visitor.full_name}</span>

// // // // //                     </div>

// // // // //                   </td>

// // // // //                   {/* Your current API doesn't return these fields */}
// // // // //                   <td>-</td>

// // // // //                   <td>-</td>

// // // // //                   <td>
// // // // //                     {new Date(visitor.punch_time).toLocaleTimeString("en-IN", {
// // // // //                       hour: "2-digit",
// // // // //                       minute: "2-digit",
// // // // //                       hour12: true,
// // // // //                     })}
// // // // //                   </td>

// // // // //                   <td>

// // // // //                     <span
// // // // //                       className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
// // // // //                         visitor.punch_type
// // // // //                       )}`}
// // // // //                     >
// // // // //                       {visitor.punch_type}
// // // // //                     </span>

// // // // //                   </td>

// // // // //                   <td className="text-center">

// // // // //                     <button className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg">
// // // // //                       <Eye size={18} />
// // // // //                     </button>

// // // // //                   </td>

// // // // //                 </tr>

// // // // //               ))

// // // // //             )}

// // // // //           </tbody>

// // // // //         </table>

// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import { Eye } from "lucide-react";

// // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // type Visitor = {
// // // //   id: number;
// // // //   full_name: string;
// // // //   table_name: string;
// // // //   user_id: number;
// // // //   distance: number;
// // // //   punch_type: string;
// // // //   punch_time: string;
// // // // };

// // // // const getStatusColor = (status: string) => {
// // // //   switch (status) {
// // // //     case "IN":
// // // //       return "bg-green-100 text-green-700";

// // // //     case "OUT":
// // // //       return "bg-red-100 text-red-700";

// // // //     default:
// // // //       return "bg-gray-100 text-gray-700";
// // // //   }
// // // // };

// // // // export default function RecentVisitors() {
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [visitors, setVisitors] = useState<Visitor[]>([]);

// // // //   const loadVisitors = async () => {
// // // //     try {
// // // //       setLoading(true);

// // // //       const res = await axios.get(
// // // //         `${API}/api/dashboard/recent-visitors`,
// // // //         {
// // // //           withCredentials: true,
// // // //         }
// // // //       );


      

// // // //       setVisitors(res.data.data || []);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       alert("Failed to load recent visitors");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     loadVisitors();
// // // //   }, []);

// // // //   return (
// // // //     <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

// // // //       {/* Header */}
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <h2 className="text-xl font-bold">
// // // //           Recent Visitors
// // // //         </h2>

// // // //         <button
// // // //           onClick={loadVisitors}
// // // //           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
// // // //         >
// // // //           Refresh
// // // //         </button>
// // // //       </div>

// // // //       {/* Table */}
// // // //       <div className="overflow-x-auto">

// // // //         <table className="w-full">

// // // //           <thead>
// // // //             <tr className="border-b border-slate-700 text-black-400">

// // // //               <th className="text-left py-3">Visitor</th>

// // // //               <th className="text-left py-3">Date</th>

// // // //               <th className="text-left py-3">Purpose</th>

// // // //               <th className="text-left py-3">Time</th>

// // // //               <th className="text-left py-3">Status</th>

// // // //               {/* <th className="text-center py-3">Action</th> */}

// // // //             </tr>
// // // //           </thead>

// // // //           <tbody>

// // // //             {loading ? (
// // // //               <tr>
// // // //                 <td
// // // //                   colSpan={6}
// // // //                   className="text-center py-8 text-gray-400"
// // // //                 >
// // // //                   Loading...
// // // //                 </td>
// // // //               </tr>
// // // //             ) : visitors.length === 0 ? (
// // // //               <tr>
// // // //                 <td
// // // //                   colSpan={6}
// // // //                   className="text-center py-8 text-gray-400"
// // // //                 >
// // // //                   No Visitors Found
// // // //                 </td>
// // // //               </tr>
// // // //             ) : (
// // // //               visitors.map((visitor) => (
// // // //                 <tr
// // // //                   key={visitor.id}
// // // //                   className="border-b border-slate-800 hover:bg-slate-800 transition"
// // // //                 >
// // // //                   {/* Visitor Name */}
// // // //                   <td className="py-4">
// // // //                     <div className="flex items-center gap-3">

// // // //                       <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold uppercase">
// // // //                         {visitor.full_name.charAt(0)}
// // // //                       </div>

// // // //                       <span>{visitor.full_name}</span>

// // // //                     </div>
// // // //                   </td>

// // // //                   {/* Resident -> Punch Date */}
// // // //                   <td>
// // // //                     {new Date(visitor.punch_time).toLocaleDateString("en-IN", {
// // // //                       day: "2-digit",
// // // //                       month: "short",
// // // //                       year: "numeric",
// // // //                     })}
// // // //                   </td>

// // // //                   {/* Purpose -> Table Name */}
// // // //                   <td className="capitalize">
// // // //                     {visitor.table_name.replace(/_/g, " ")}
// // // //                   </td>

// // // //                   {/* Entry Time */}
// // // //                   <td>
// // // //                     {new Date(visitor.punch_time).toLocaleTimeString("en-IN", {
// // // //                       hour: "2-digit",
// // // //                       minute: "2-digit",
// // // //                       second: "2-digit",
// // // //                       hour12: true,
// // // //                     })}
// // // //                   </td>

// // // //                   {/* Status */}
// // // //                   <td>
// // // //                     <span
// // // //                       className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
// // // //                         visitor.punch_type
// // // //                       )}`}
// // // //                     >
// // // //                       {visitor.punch_type}
// // // //                     </span>
// // // //                   </td>

// // // //                   {/* Action */}
// // // //                   {/* <td className="text-center">
// // // //                     <button className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition">
// // // //                       <Eye size={18} />
// // // //                     </button>
// // // //                   </td> */}

// // // //                 </tr>
// // // //               ))
// // // //             )}

// // // //           </tbody>

// // // //         </table>

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const API = import.meta.env.VITE_BACKEND_URL;

// // // type Visitor = {
// // //   user_id: number;
// // //   full_name: string;
// // //   table_name: string;
// // //   visit_date: string;
// // //   time_in: string | null;
// // //   time_out: string | null;
// // // };


// // // export default function RecentVisitors() {
// // //   const [exporting, setExporting] = useState(false);

// // // const downloadExcel = async () => {
// // //   try {
// // //     setExporting(true);

// // //     const response = await axios.get(
// // //       `${API}/api/dashboard/recent-visitors/export`,
// // //       {
// // //         params: {
// // //   search: search,
// // //   from: fromDate || undefined,
// // //   to: toDate || undefined,
// // //   purpose: purpose || undefined,
// // // },
// // //         responseType: "blob",
// // //         withCredentials: true,
// // //       }
// // //     );

// // //     const blob = new Blob([response.data], {
// // //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// // //     });

// // //     const url = window.URL.createObjectURL(blob);

// // //     const link = document.createElement("a");

// // //     link.href = url;
// // //     link.download = `Visitor_History_${new Date()
// // //       .toISOString()
// // //       .slice(0, 10)}.xlsx`;

// // //     document.body.appendChild(link);

// // //     link.click();

// // //     link.remove();

// // //     window.URL.revokeObjectURL(url);
// // //   } catch (error) {
// // //     console.error("Excel download failed:", error);
// // //     alert("Failed to download visitor records.");
// // //   } finally {
// // //     setExporting(false);
// // //   }
// // // };


// // // const [exportingPDF, setExportingPDF] = useState(false);

// // // const downloadPDF = async () => {
// // //   try {
// // //     setExportingPDF(true);

// // //     const response = await axios.get(
// // //       `${API}/api/dashboard/recent-visitors/export/pdf`,
// // //       {
// // //         params: {
// // //           search: search,
// // //           from: fromDate || undefined,
// // //           to: toDate || undefined,
// // //           purpose: purpose || undefined,
// // //         },
// // //         responseType: "blob",
// // //         withCredentials: true,
// // //       }
// // //     );

// // //     const blob = new Blob(
// // //       [response.data],
// // //       {
// // //         type: "application/pdf",
// // //       }
// // //     );

// // //     const url =
// // //       window.URL.createObjectURL(blob);

// // //     const link =
// // //       document.createElement("a");

// // //     link.href = url;

// // //     link.download = `Visitor_History_${new Date()
// // //       .toISOString()
// // //       .slice(0, 10)}.pdf`;

// // //     document.body.appendChild(link);

// // //     link.click();

// // //     link.remove();

// // //     window.URL.revokeObjectURL(url);

// // //   } catch (error) {
// // //     console.error(
// // //       "PDF download failed:",
// // //       error
// // //     );

// // //     alert(
// // //       "Failed to download PDF."
// // //     );
// // //   } finally {
// // //     setExportingPDF(false);
// // //   }
// // // };
// // //   const [loading, setLoading] = useState(true);
// // //   const [visitors, setVisitors] = useState<Visitor[]>([]);

// // //   const [search, setSearch] = useState("");
// // //   const [fromDate, setFromDate] = useState("");
// // //   const [toDate, setToDate] = useState("");
// // //   const [purpose, setPurpose] = useState("");

// // //   const loadVisitors = async () => {
// // //     try {
// // //       setLoading(true);

// // //       const res = await axios.get(
// // //         `${API}/api/dashboard/recent-visitors`,
// // //         {
// // //           params: {
// // //             search,
// // //             from: fromDate || undefined,
// // //             to: toDate || undefined,
// // //             purpose,
// // //           },
// // //           withCredentials: true,
// // //         }
// // //       );

// // //       setVisitors(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to load visitors");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadVisitors();
// // //   }, [search, fromDate, toDate, purpose]);

// // //   return (
// // //     <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

// // //       {/* Header */}
// // //       {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

// // //         <h2 className="text-xl font-bold text-white">
// // //           Visitor History
// // //         </h2>

// // //         <button
// // //           onClick={loadVisitors}
// // //           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
// // //         >
// // //           Refresh
// // //         </button>

// // //       </div> */}
// // // <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
// // //   <h2 className="text-xl font-bold text-white">
// // //     Visitor History
// // //   </h2>

// // //   <div className="flex gap-3">
// // //     <button
// // //       onClick={loadVisitors}
// // //       className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
// // //     >
// // //       Refresh
// // //     </button>

// // //     <button
// // //       onClick={downloadExcel}
// // //       disabled={exporting}
// // //       className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded-lg text-white"
// // //     >
// // //       {exporting ? "Exporting..." : "Export Excel"}
// // //     </button>


// // //       <button
// // //     onClick={downloadPDF}
// // //     disabled={exportingPDF}
// // //     className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-lg text-white"
// // //   >
// // //     {exportingPDF
// // //       ? "Generating..."
// // //       : "Export PDF"}
// // //   </button>

// // //   </div>
// // // </div>
// // //       {/* Filters */}

// // //       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

// // //         {/* Search */}

// // //         <div>

// // //           <label className="block text-sm mb-2 text-gray-300">
// // //             Search Visitor
// // //           </label>

// // //           <input
// // //             type="text"
// // //             value={search}
// // //             placeholder="Enter visitor name"
// // //             onChange={(e) => setSearch(e.target.value)}
// // //             className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-blue-500 outline-none"
          
// // //           />

// // //         </div>

// // //         {/* From Date */}

// // //         <div>

// // //           <label className="block text-sm mb-2 text-gray-300">
// // //             From Date
// // //           </label>

// // //           <input
// // //             type="date"
// // //             value={fromDate}
// // //             onChange={(e) => setFromDate(e.target.value)}
// // //             className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-blue-500 outline-none"
// // //           />

// // //         </div>

// // //         {/* To Date */}

// // //         <div>

// // //           <label className="block text-sm mb-2 text-gray-300">
// // //             To Date
// // //           </label>

// // //           <input
// // //             type="date"
// // //             value={toDate}
// // //             onChange={(e) => setToDate(e.target.value)}
// // //             className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-blue-500 outline-none"
// // //           />

// // //         </div>

// // //         {/* Purpose */}

// // //         <div>

// // //           <label className="block text-sm mb-2 text-gray-300">
// // //             Purpose
// // //           </label>

// // //           <select
// // //             value={purpose}
// // //             onChange={(e) => setPurpose(e.target.value)}
// // //             className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
// // //           >
// // //             <option value="">All</option>
// // //             <option value="guest">Guest</option>
// // //             <option value="maid">Maid</option>
// // //             <option value="vendor">Vendor</option>
// // //             <option value="worker">Worker</option>
// // //             <option value="delivery">Delivery</option>
// // //             <option value="service_provider">
// // //               Service Provider
// // //             </option>
// // //           </select>

// // //         </div>

// // //         {/* Reset */}

// // //         <div className="flex items-end">

// // //           <button
// // //             onClick={() => {
// // //               setSearch("");
// // //               setFromDate("");
// // //               setToDate("");
// // //               setPurpose("");
// // //             }}
// // //             className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
// // //           >
// // //             Reset
// // //           </button>

// // //         </div>

// // //       </div>

// // //       {/* Table */}

// // //       <div className="overflow-x-auto">

// // //         <table className="w-full">

// // //           <thead>

// // //             <tr className="border-b border-slate-700 text-gray-300">

// // //               <th className="text-left py-3">Visitor</th>

// // //               <th className="text-left py-3">Date</th>

// // //               <th className="text-left py-3">Purpose</th>

// // //               <th className="text-left py-3">Time In</th>

// // //               <th className="text-left py-3">Time Out</th>

// // //             </tr>

// // //           </thead>

// // //           <tbody>
// // //             {loading ? (
// // //   <tr>
// // //     <td
// // //       colSpan={5}
// // //       className="text-center py-8 text-gray-400"
// // //     >
// // //       Loading visitors...
// // //     </td>
// // //   </tr>
// // // ) : visitors.length === 0 ? (
// // //   <tr>
// // //     <td
// // //       colSpan={5}
// // //       className="text-center py-8 text-gray-400"
// // //     >
// // //       No visitors found
// // //     </td>
// // //   </tr>
// // // ) : (
// // //   visitors.map((visitor) => (
// // //     <tr
// // //       key={`${visitor.user_id}-${visitor.visit_date}-${visitor.time_in}`}
// // //       className="border-b border-slate-800 hover:bg-slate-800 transition"
// // //     >
// // //       {/* Visitor */}

// // //       <td className="py-4">

// // //         <div className="flex items-center gap-3">

// // //           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold uppercase">

// // //             {visitor.full_name.charAt(0)}

// // //           </div>

// // //           <span className="text-white">
// // //             {visitor.full_name}
// // //           </span>

// // //         </div>

// // //       </td>

// // //       {/* Date */}

// // //       <td className="text-gray-300">

// // //         {new Date(visitor.visit_date).toLocaleDateString(
// // //           "en-IN",
// // //           {
// // //             day: "2-digit",
// // //             month: "short",
// // //             year: "numeric",
// // //           }
// // //         )}

// // //       </td>

// // //       {/* Purpose */}

// // //       <td className="capitalize text-gray-300">

// // //         {visitor.table_name.replace(/_/g, " ")}

// // //       </td>

// // //       {/* Time In */}

// // //       <td className="text-green-400 font-medium">

// // //         {visitor.time_in
// // //           ? new Date(visitor.time_in).toLocaleTimeString(
// // //               "en-IN",
// // //               {
// // //                 hour: "2-digit",
// // //                 minute: "2-digit",
// // //                 second: "2-digit",
// // //                 hour12: true,
// // //               }
// // //             )
// // //           : "--"}

// // //       </td>

// // //       {/* Time Out */}

// // //       <td>

// // //         {visitor.time_out ? (

// // //           <span className="text-red-400 font-medium">

// // //             {new Date(visitor.time_out).toLocaleTimeString(
// // //               "en-IN",
// // //               {
// // //                 hour: "2-digit",
// // //                 minute: "2-digit",
// // //                 second: "2-digit",
// // //                 hour12: true,
// // //               }
// // //             )}

// // //           </span>

// // //         ) : (

// // //           <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">

// // //             Inside

// // //           </span>

// // //         )}

// // //       </td>

// // //     </tr>
// // //   ))
// // // )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const API = import.meta.env.VITE_BACKEND_URL;

// // type Visitor = {
// //   user_id: number;
// //   full_name: string;
// //   table_name: string;
// //   visit_date: string;
// //   time_in: string | null;
// //   time_out: string | null;
// // };

// // export default function RecentVisitors() {
// //   const [loading, setLoading] = useState(true);
// //   const [visitors, setVisitors] = useState<Visitor[]>([]);

// //   const [search, setSearch] = useState("");
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [purpose, setPurpose] = useState("");

// //   const [exporting, setExporting] = useState(false);
// //   const [exportingPDF, setExportingPDF] = useState(false);

// //   // ============================================================
// //   // LOAD VISITORS
// //   // ============================================================

// //   const loadVisitors = async () => {
// //     try {
// //       setLoading(true);

// //       const res = await axios.get(
// //         `${API}/api/dashboard/recent-visitors`,
// //         {
// //           params: {
// //             search,
// //             from: fromDate || undefined,
// //             to: toDate || undefined,
// //             purpose: purpose || undefined,
// //           },
// //           withCredentials: true,
// //         }
// //       );

// //       setVisitors(res.data.data || []);
// //     } catch (err) {
// //       console.error("Failed to load visitors:", err);
// //       alert("Failed to load visitors");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ============================================================
// //   // LOAD ON FILTER CHANGE
// //   // ============================================================

// //   useEffect(() => {
// //     loadVisitors();
// //   }, [search, fromDate, toDate, purpose]);

// //   // ============================================================
// //   // EXPORT EXCEL
// //   // ============================================================

// //   const downloadExcel = async () => {
// //     try {
// //       setExporting(true);

// //       const response = await axios.get(
// //         `${API}/api/dashboard/recent-visitors/export`,
// //         {
// //           params: {
// //             search,
// //             from: fromDate || undefined,
// //             to: toDate || undefined,
// //             purpose: purpose || undefined,
// //           },
// //           responseType: "blob",
// //           withCredentials: true,
// //         }
// //       );

// //       const blob = new Blob([response.data], {
// //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //       });

// //       const url = window.URL.createObjectURL(blob);

// //       const link = document.createElement("a");

// //       link.href = url;

// //       link.download = `Visitor_History_${new Date()
// //         .toISOString()
// //         .slice(0, 10)}.xlsx`;

// //       document.body.appendChild(link);

// //       link.click();

// //       link.remove();

// //       window.URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error("Excel download failed:", error);
// //       alert("Failed to download visitor records.");
// //     } finally {
// //       setExporting(false);
// //     }
// //   };

// //   // ============================================================
// //   // EXPORT PDF
// //   // ============================================================

// //   const downloadPDF = async () => {
// //     try {
// //       setExportingPDF(true);

// //       const response = await axios.get(
// //         `${API}/api/dashboard/recent-visitors/export/pdf`,
// //         {
// //           params: {
// //             search,
// //             from: fromDate || undefined,
// //             to: toDate || undefined,
// //             purpose: purpose || undefined,
// //           },
// //           responseType: "blob",
// //           withCredentials: true,
// //         }
// //       );

// //       const blob = new Blob([response.data], {
// //         type: "application/pdf",
// //       });

// //       const url = window.URL.createObjectURL(blob);

// //       const link = document.createElement("a");

// //       link.href = url;

// //       link.download = `Visitor_History_${new Date()
// //         .toISOString()
// //         .slice(0, 10)}.pdf`;

// //       document.body.appendChild(link);

// //       link.click();

// //       link.remove();

// //       window.URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error("PDF download failed:", error);

// //       alert("Failed to download PDF.");
// //     } finally {
// //       setExportingPDF(false);
// //     }
// //   };

// //   // ============================================================
// //   // RESET FILTERS
// //   // ============================================================

// //   const resetFilters = () => {
// //     setSearch("");
// //     setFromDate("");
// //     setToDate("");
// //     setPurpose("");
// //   };

// //   // ============================================================
// //   // UI
// //   // ============================================================

// //   return (
// //     <div
// //       className="
// //         bg-white
// //         rounded-xl
// //         border border-slate-200
// //         shadow-sm
// //         p-5
// //         h-full
// //       "
// //     >
// //       {/* ======================================================
// //           HEADER
// //       ======================================================= */}

// //       <div
// //         className="
// //           flex
// //           flex-col
// //           md:flex-row
// //           md:items-center
// //           md:justify-between
// //           gap-4
// //           mb-6
// //         "
// //       >
// //         <div>
// //           <h2 className="text-lg font-semibold text-slate-800">
// //             Visitor History
// //           </h2>

// //           <p className="text-xs text-slate-500 mt-1">
// //             View and manage recent visitor records
// //           </p>
// //         </div>

// //         {/* ACTION BUTTONS */}

// //         <div className="flex flex-wrap gap-2">
// //           {/* Refresh */}

// //           <button
// //             onClick={loadVisitors}
// //             className="
// //               bg-blue-600
// //               hover:bg-blue-700
// //               text-white
// //               px-4
// //               py-2
// //               rounded-lg
// //               text-sm
// //               font-medium
// //               transition
// //             "
// //           >
// //             Refresh
// //           </button>

// //           {/* Excel */}

// //           <button
// //             onClick={downloadExcel}
// //             disabled={exporting}
// //             className="
// //               bg-green-600
// //               hover:bg-green-700
// //               disabled:opacity-50
// //               disabled:cursor-not-allowed
// //               text-white
// //               px-4
// //               py-2
// //               rounded-lg
// //               text-sm
// //               font-medium
// //               transition
// //             "
// //           >
// //             {exporting ? "Exporting..." : "Export Excel"}
// //           </button>

// //           {/* PDF */}

// //           <button
// //             onClick={downloadPDF}
// //             disabled={exportingPDF}
// //             className="
// //               bg-red-600
// //               hover:bg-red-700
// //               disabled:opacity-50
// //               disabled:cursor-not-allowed
// //               text-white
// //               px-4
// //               py-2
// //               rounded-lg
// //               text-sm
// //               font-medium
// //               transition
// //             "
// //           >
// //             {exportingPDF ? "Generating..." : "Export PDF"}
// //           </button>
// //         </div>
// //       </div>

// //       {/* ======================================================
// //           FILTERS
// //       ======================================================= */}

// //       <div
// //         className="
// //           grid
// //           grid-cols-1
// //           md:grid-cols-2
// //           lg:grid-cols-5
// //           gap-4
// //           mb-6
// //         "
// //       >
// //         {/* SEARCH */}

// //         <div>
// //           <label
// //             className="
// //               block
// //               text-sm
// //               font-medium
// //               mb-2
// //               text-slate-700
// //             "
// //           >
// //             Search Visitor
// //           </label>

// //           <input
// //             type="text"
// //             value={search}
// //             placeholder="Enter visitor name"
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="
// //               w-full
// //               rounded-lg
// //               border
// //               border-slate-300
// //               bg-white
// //               px-3
// //               py-2
// //               text-sm
// //               text-slate-800
// //               placeholder:text-slate-400
// //               focus:border-blue-500
// //               focus:ring-2
// //               focus:ring-blue-100
// //               outline-none
// //               transition
// //             "
// //           />
// //         </div>

// //         {/* FROM DATE */}

// //         <div>
// //           <label
// //             className="
// //               block
// //               text-sm
// //               font-medium
// //               mb-2
// //               text-slate-700
// //             "
// //           >
// //             From Date
// //           </label>

// //           <input
// //             type="date"
// //             value={fromDate}
// //             onChange={(e) => setFromDate(e.target.value)}
// //             className="
// //               w-full
// //               rounded-lg
// //               border
// //               border-slate-300
// //               bg-white
// //               px-3
// //               py-2
// //               text-sm
// //               text-slate-800
// //               focus:border-blue-500
// //               focus:ring-2
// //               focus:ring-blue-100
// //               outline-none
// //               transition
// //             "
// //           />
// //         </div>

// //         {/* TO DATE */}

// //         <div>
// //           <label
// //             className="
// //               block
// //               text-sm
// //               font-medium
// //               mb-2
// //               text-slate-700
// //             "
// //           >
// //             To Date
// //           </label>

// //           <input
// //             type="date"
// //             value={toDate}
// //             onChange={(e) => setToDate(e.target.value)}
// //             className="
// //               w-full
// //               rounded-lg
// //               border
// //               border-slate-300
// //               bg-white
// //               px-3
// //               py-2
// //               text-sm
// //               text-slate-800
// //               focus:border-blue-500
// //               focus:ring-2
// //               focus:ring-blue-100
// //               outline-none
// //               transition
// //             "
// //           />
// //         </div>

// //         {/* PURPOSE */}

// //         <div>
// //           <label
// //             className="
// //               block
// //               text-sm
// //               font-medium
// //               mb-2
// //               text-slate-700
// //             "
// //           >
// //             Purpose
// //           </label>

// //           <select
// //             value={purpose}
// //             onChange={(e) => setPurpose(e.target.value)}
// //             className="
// //               w-full
// //               rounded-lg
// //               border
// //               border-slate-300
// //               bg-white
// //               px-3
// //               py-2
// //               text-sm
// //               text-slate-800
// //               focus:border-blue-500
// //               focus:ring-2
// //               focus:ring-blue-100
// //               outline-none
// //               transition
// //             "
// //           >
// //             <option value="">All</option>
// //             <option value="guest">Guest</option>
// //             <option value="maid">Maid</option>
// //             <option value="vendor">Vendor</option>
// //             <option value="worker">Worker</option>
// //             <option value="delivery">Delivery</option>
// //             <option value="service_provider">
// //               Service Provider
// //             </option>
// //           </select>
// //         </div>

// //         {/* RESET */}

// //         <div className="flex items-end">
// //           <button
// //             onClick={resetFilters}
// //             className="
// //               w-full
// //               bg-slate-100
// //               hover:bg-slate-200
// //               border
// //               border-slate-300
// //               text-slate-700
// //               px-4
// //               py-2
// //               rounded-lg
// //               text-sm
// //               font-medium
// //               transition
// //             "
// //           >
// //             Reset
// //           </button>
// //         </div>
// //       </div>

// //       {/* ======================================================
// //           TABLE
// //       ======================================================= */}

// //       <div
// //         className="
// //           overflow-x-auto
// //           border
// //           border-slate-200
// //           rounded-lg
// //         "
// //       >
// //         <table className="w-full">
// //           {/* TABLE HEADER */}

// //           <thead>
// //             <tr
// //               className="
// //                 border-b
// //                 border-slate-200
// //                 bg-slate-50
// //               "
// //             >
// //               <th
// //                 className="
// //                   text-left
// //                   px-4
// //                   py-3
// //                   text-xs
// //                   font-semibold
// //                   text-slate-600
// //                 "
// //               >
// //                 Visitor
// //               </th>

// //               <th
// //                 className="
// //                   text-left
// //                   px-4
// //                   py-3
// //                   text-xs
// //                   font-semibold
// //                   text-slate-600
// //                 "
// //               >
// //                 Date
// //               </th>

// //               <th
// //                 className="
// //                   text-left
// //                   px-4
// //                   py-3
// //                   text-xs
// //                   font-semibold
// //                   text-slate-600
// //                 "
// //               >
// //                 Purpose
// //               </th>

// //               <th
// //                 className="
// //                   text-left
// //                   px-4
// //                   py-3
// //                   text-xs
// //                   font-semibold
// //                   text-slate-600
// //                 "
// //               >
// //                 Time In
// //               </th>

// //               <th
// //                 className="
// //                   text-left
// //                   px-4
// //                   py-3
// //                   text-xs
// //                   font-semibold
// //                   text-slate-600
// //                 "
// //               >
// //                 Time Out
// //               </th>
// //             </tr>
// //           </thead>

// //           {/* TABLE BODY */}

// //           <tbody>
// //             {/* LOADING */}

// //             {loading ? (
// //               <tr>
// //                 <td
// //                   colSpan={5}
// //                   className="
// //                     text-center
// //                     py-10
// //                     text-slate-500
// //                     text-sm
// //                   "
// //                 >
// //                   Loading visitors...
// //                 </td>
// //               </tr>
// //             ) : visitors.length === 0 ? (
// //               /* EMPTY */

// //               <tr>
// //                 <td
// //                   colSpan={5}
// //                   className="
// //                     text-center
// //                     py-10
// //                     text-slate-500
// //                     text-sm
// //                   "
// //                 >
// //                   No visitors found
// //                 </td>
// //               </tr>
// //             ) : (
// //               /* DATA */

// //               visitors.map((visitor) => (
// //                 <tr
// //                   key={`${visitor.user_id}-${visitor.visit_date}-${visitor.time_in}`}
// //                   className="
// //                     border-b
// //                     border-slate-100
// //                     hover:bg-slate-50
// //                     transition
// //                   "
// //                 >
// //                   {/* VISITOR */}

// //                   <td className="px-4 py-4">
// //                     <div className="flex items-center gap-3">
// //                       <div
// //                         className="
// //                           w-9
// //                           h-9
// //                           rounded-full
// //                           bg-blue-100
// //                           text-blue-700
// //                           flex
// //                           items-center
// //                           justify-center
// //                           font-semibold
// //                           text-sm
// //                           uppercase
// //                         "
// //                       >
// //                         {visitor.full_name.charAt(0)}
// //                       </div>

// //                       <span
// //                         className="
// //                           text-slate-800
// //                           font-medium
// //                           text-sm
// //                         "
// //                       >
// //                         {visitor.full_name}
// //                       </span>
// //                     </div>
// //                   </td>

// //                   {/* DATE */}

// //                   <td
// //                     className="
// //                       px-4
// //                       py-4
// //                       text-slate-600
// //                       text-sm
// //                     "
// //                   >
// //                     {new Date(
// //                       visitor.visit_date
// //                     ).toLocaleDateString("en-IN", {
// //                       day: "2-digit",
// //                       month: "short",
// //                       year: "numeric",
// //                     })}
// //                   </td>

// //                   {/* PURPOSE */}

// //                   <td
// //                     className="
// //                       px-4
// //                       py-4
// //                       text-slate-600
// //                       text-sm
// //                       capitalize
// //                     "
// //                   >
// //                     {visitor.table_name
// //                       ? visitor.table_name.replace(
// //                           /_/g,
// //                           " "
// //                         )
// //                       : "-"}
// //                   </td>

// //                   {/* TIME IN */}

// //                   <td
// //                     className="
// //                       px-4
// //                       py-4
// //                       text-green-600
// //                       font-medium
// //                       text-sm
// //                     "
// //                   >
// //                     {visitor.time_in
// //                       ? new Date(
// //                           visitor.time_in
// //                         ).toLocaleTimeString(
// //                           "en-IN",
// //                           {
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                             second: "2-digit",
// //                             hour12: true,
// //                           }
// //                         )
// //                       : "--"}
// //                   </td>

// //                   {/* TIME OUT */}

// //                   <td className="px-4 py-4">
// //                     {visitor.time_out ? (
// //                       <span
// //                         className="
// //                           text-red-600
// //                           font-medium
// //                           text-sm
// //                         "
// //                       >
// //                         {new Date(
// //                           visitor.time_out
// //                         ).toLocaleTimeString(
// //                           "en-IN",
// //                           {
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                             second: "2-digit",
// //                             hour12: true,
// //                           }
// //                         )}
// //                       </span>
// //                     ) : (
// //                       <span
// //                         className="
// //                           inline-flex
// //                           items-center
// //                           px-3
// //                           py-1
// //                           rounded-full
// //                           bg-green-100
// //                           text-green-700
// //                           text-xs
// //                           font-semibold
// //                         "
// //                       >
// //                         Inside
// //                       </span>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* ======================================================
// //           FOOTER / RECORD COUNT
// //       ======================================================= */}

// //       {!loading && visitors.length > 0 && (
// //         <div
// //           className="
// //             flex
// //             justify-end
// //             mt-3
// //             text-xs
// //             text-slate-500
// //           "
// //         >
// //           Showing {visitors.length} visitor
// //           {visitors.length !== 1 ? "s" : ""}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_BACKEND_URL;

// type Period = "daily" | "weekly" | "monthly";

// type Visitor = {
//   user_id: number;
//   full_name: string;
//   table_name: string;
//   visit_date: string;
//   time_in: string | null;
//   time_out: string | null;
// };

// export default function RecentVisitors({
//   period = "daily",
// }: {
//   period?: Period;
// }) {
//   const [loading, setLoading] = useState(true);
//   const [visitors, setVisitors] = useState<Visitor[]>([]);
//   const [search, setSearch] = useState("");
// const [purpose, setPurpose] = useState("");
//   const [exporting, setExporting] = useState(false);
//   const [exportingPDF, setExportingPDF] = useState(false);

//   // ============================================================
//   // LOAD VISITORS
//   // ============================================================

//   const loadVisitors = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `${API}/api/dashboard/recent-visitors`,
//         {
//           params: {
//             period,
//             search: search || undefined,
//               purpose: purpose || undefined,

//           },
//           withCredentials: true,
//         }
//       );

//       setVisitors(res.data.data || []);
//     } catch (error) {
//       console.error("Failed to load visitors:", error);
//       alert("Failed to load visitors");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // LOAD WHEN PERIOD OR SEARCH CHANGES
//   // ============================================================

//   // useEffect(() => {
//   //   loadVisitors();
//   // }, [period, search]);
// useEffect(() => {
//   loadVisitors();
// }, [search, purpose, period]);
//   // ============================================================
//   // EXPORT EXCEL
//   // ============================================================

//   const downloadExcel = async () => {
//     try {
//       setExporting(true);

//       const response = await axios.get(
//         `${API}/api/dashboard/recent-visitors/export`,
//         {
//           params: {
//             purpose,
//             period,
//             search: search || undefined,
//           },
//           responseType: "blob",
//           withCredentials: true,
//         }
//       );

//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");

//       link.href = url;

//       link.download = `Visitor_History_${period}_${new Date()
//         .toISOString()
//         .slice(0, 10)}.xlsx`;

//       document.body.appendChild(link);

//       link.click();

//       link.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Excel download failed:", error);
//       alert("Failed to download visitor records.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   // ============================================================
//   // EXPORT PDF
//   // ============================================================

//   const downloadPDF = async () => {
//     try {
//       setExportingPDF(true);

//       const response = await axios.get(
//         `${API}/api/dashboard/recent-visitors/export/pdf`,
//         {
//           params: {
//             purpose,
//             period,
//             search: search || undefined,
//           },
//           responseType: "blob",
//           withCredentials: true,
//         }
//       );

//       const blob = new Blob([response.data], {
//         type: "application/pdf",
//       });

//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");

//       link.href = url;

//       link.download = `Visitor_History_${period}_${new Date()
//         .toISOString()
//         .slice(0, 10)}.pdf`;

//       document.body.appendChild(link);

//       link.click();

//       link.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("PDF download failed:", error);
//       alert("Failed to download PDF.");
//     } finally {
//       setExportingPDF(false);
//     }
//   };

//   // ============================================================
//   // RESET SEARCH
//   // ============================================================

//   const resetSearch = () => {
//     setSearch("");
//   };

//   // ============================================================
//   // PERIOD LABEL
//   // ============================================================

//   const getPeriodLabel = () => {
//     switch (period) {
//       case "weekly":
//         return "This Week";

//       case "monthly":
//         return "This Month";

//       default:
//         return "Today";
//     }
//   };

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div
//       className="
//         bg-white
//         rounded-xl
//         border border-slate-200
//         shadow-sm
//         p-5
//         h-full
//       "
//     >
//       {/* ======================================================
//           HEADER
//       ======================================================= */}

//       <div
//         className="
//           flex
//           flex-col
//           lg:flex-row
//           lg:items-center
//           lg:justify-between
//           gap-4
//           mb-5
//         "
//       >
//         {/* TITLE */}

//         <div>
//           <h2 className="text-lg font-semibold text-slate-800">
//             All Visitors
//           </h2>

//           <p className="text-xs text-slate-500 mt-1">
//             Visitor records for {getPeriodLabel().toLowerCase()}
//           </p>
//         </div>

//         {/* ACTION BUTTONS */}

//         <div className="flex flex-wrap gap-2">
//           <button
//             onClick={loadVisitors}
//             className="
//               bg-blue-600
//               hover:bg-blue-700
//               text-white
//               px-4
//               py-2
//               rounded-lg
//               text-sm
//               font-medium
//               transition
//             "
//           >
//             Refresh
//           </button>

//           <button
//             onClick={downloadExcel}
//             disabled={exporting}
//             className="
//               bg-green-600
//               hover:bg-green-700
//               disabled:opacity-50
//               disabled:cursor-not-allowed
//               text-white
//               px-4
//               py-2
//               rounded-lg
//               text-sm
//               font-medium
//               transition
//             "
//           >
//             {exporting ? "Exporting..." : "Export Excel"}
//           </button>

//           <button
//             onClick={downloadPDF}
//             disabled={exportingPDF}
//             className="
//               bg-red-600
//               hover:bg-red-700
//               disabled:opacity-50
//               disabled:cursor-not-allowed
//               text-white
//               px-4
//               py-2
//               rounded-lg
//               text-sm
//               font-medium
//               transition
//             "
//           >
//             {exportingPDF ? "Generating..." : "Export PDF"}
//           </button>
//         </div>
//       </div>

//       {/* ======================================================
//           SEARCH
//       ======================================================= */}

//       <div className="flex flex-col sm:flex-row gap-3 mb-5">
//         <div className="flex-1">
//           <input
//             type="text"
//             value={search}
//             placeholder={`Search visitors ${getPeriodLabel().toLowerCase()}...`}
//             onChange={(e) => setSearch(e.target.value)}
//             className="
//               w-full
//               rounded-lg
//               border
//               border-slate-300
//               bg-white
//               px-4
//               py-2.5
//               text-sm
//               text-slate-800
//               placeholder:text-slate-400
//               focus:border-blue-500
//               focus:ring-2
//               focus:ring-blue-100
//               outline-none
//               transition
//             "
//           />
//         </div>

//         {search && (
//           <button
//             onClick={resetSearch}
//             className="
//               px-4
//               py-2
//               rounded-lg
//               bg-slate-100
//               hover:bg-slate-200
//               border
//               border-slate-300
//               text-slate-700
//               text-sm
//               font-medium
//             "
//           >
//             Clear
//           </button>
//         )}
//       </div>

//       {/* ======================================================
//           TABLE
//       ======================================================= */}

//       <div
//         className="
//           overflow-x-auto
//           border
//           border-slate-200
//           rounded-lg
//         "
//       >
//         <table className="w-full">
//           <thead>
//             <tr
//               className="
//                 border-b
//                 border-slate-200
//                 bg-slate-50
//               "
//             >
//               <th
//                 className="
//                   text-left
//                   px-4
//                   py-3
//                   text-xs
//                   font-semibold
//                   text-slate-600
//                 "
//               >
//                 Visitor
//               </th>

//               <th
//                 className="
//                   text-left
//                   px-4
//                   py-3
//                   text-xs
//                   font-semibold
//                   text-slate-600
//                 "
//               >
//                 Date
//               </th>

//               <th
//                 className="
//                   text-left
//                   px-4
//                   py-3
//                   text-xs
//                   font-semibold
//                   text-slate-600
//                 "
//               >
//                 Purpose
//               </th>

//               <th
//                 className="
//                   text-left
//                   px-4
//                   py-3
//                   text-xs
//                   font-semibold
//                   text-slate-600
//                 "
//               >
//                 Time In
//               </th>

//               <th
//                 className="
//                   text-left
//                   px-4
//                   py-3
//                   text-xs
//                   font-semibold
//                   text-slate-600
//                 "
//               >
//                 Time Out
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {/* LOADING */}

//             {loading ? (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="
//                     text-center
//                     py-10
//                     text-slate-500
//                     text-sm
//                   "
//                 >
//                   Loading visitors...
//                 </td>
//               </tr>
//             ) : visitors.length === 0 ? (
//               /* EMPTY */

//               <tr>
//                 <td
//                   colSpan={5}
//                   className="
//                     text-center
//                     py-10
//                     text-slate-500
//                     text-sm
//                   "
//                 >
//                   No visitors found for {getPeriodLabel().toLowerCase()}
//                 </td>
//               </tr>
//             ) : (
//               visitors.map((visitor) => (
//                 <tr
//                   key={`${visitor.user_id}-${visitor.visit_date}-${visitor.time_in}`}
//                   className="
//                     border-b
//                     border-slate-100
//                     hover:bg-slate-50
//                     transition
//                   "
//                 >
//                   {/* VISITOR */}

//                   <td className="px-4 py-4">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className="
//                           w-9
//                           h-9
//                           rounded-full
//                           bg-blue-100
//                           text-blue-700
//                           flex
//                           items-center
//                           justify-center
//                           font-semibold
//                           text-sm
//                           uppercase
//                         "
//                       >
//                         {visitor.full_name?.charAt(0) || "?"}
//                       </div>

//                       <span
//                         className="
//                           text-slate-800
//                           font-medium
//                           text-sm
//                         "
//                       >
//                         {visitor.full_name}
//                       </span>
//                     </div>
//                   </td>

//                   {/* DATE */}

//                   <td
//                     className="
//                       px-4
//                       py-4
//                       text-slate-600
//                       text-sm
//                     "
//                   >
//                     {new Date(
//                       visitor.visit_date
//                     ).toLocaleDateString("en-IN", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </td>

//                   {/* PURPOSE */}

//                   <td
//                     className="
//                       px-4
//                       py-4
//                       text-slate-600
//                       text-sm
//                       capitalize
//                     "
//                   >
//                     {visitor.table_name
//                       ? visitor.table_name.replace(/_/g, " ")
//                       : "-"}
//                   </td>

//                   {/* TIME IN */}

//                   <td
//                     className="
//                       px-4
//                       py-4
//                       text-green-600
//                       font-medium
//                       text-sm
//                     "
//                   >
//                     {visitor.time_in
//                       ? new Date(
//                           visitor.time_in
//                         ).toLocaleTimeString("en-IN", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                           second: "2-digit",
//                           hour12: true,
//                         })
//                       : "--"}
//                   </td>

//                   {/* TIME OUT */}

//                   <td className="px-4 py-4">
//                     {visitor.time_out ? (
//                       <span
//                         className="
//                           text-red-600
//                           font-medium
//                           text-sm
//                         "
//                       >
//                         {new Date(
//                           visitor.time_out
//                         ).toLocaleTimeString("en-IN", {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                           second: "2-digit",
//                           hour12: true,
//                         })}
//                       </span>
//                     ) : (
//                       <span
//                         className="
//                           inline-flex
//                           items-center
//                           px-3
//                           py-1
//                           rounded-full
//                           bg-green-100
//                           text-green-700
//                           text-xs
//                           font-semibold
//                         "
//                       >
//                         Inside
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ======================================================
//           FOOTER
//       ======================================================= */}

//       {!loading && (
//         <div
//           className="
//             flex
//             justify-between
//             items-center
//             mt-3
//             text-xs
//             text-slate-500
//           "
//         >
//           <span>{getPeriodLabel()}</span>

//           <span>
//             Showing {visitors.length} visitor
//             {visitors.length !== 1 ? "s" : ""}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

type Period = "daily" | "weekly" | "monthly";

type Visitor = {
  user_id: number;
  full_name: string;
  table_name: string;
  visit_date: string;
  time_in: string | null;
  time_out: string | null;
};

const RECORDS_PER_PAGE = 5;

export default function RecentVisitors({
  period = "daily",
}: {
  period?: Period;
}) {
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  const [search, setSearch] = useState("");
  const [purpose, setPurpose] = useState("");

  const [exporting, setExporting] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // ============================================================
  // LOAD VISITORS
  // ============================================================

  const loadVisitors = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/admin/dashboard/recent-visitors`,
        {
          params: {
            period,
            search: search || undefined,
            purpose: purpose || undefined,
          },
          withCredentials: true,
        }
      );

      setVisitors(res.data.data || []);

      // Reset pagination whenever fresh data is loaded
      setCurrentPage(1);
    } catch (error) {
      console.error(
        "Failed to load visitors:",
        error
      );

      setVisitors([]);
      setCurrentPage(1);

      alert("Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOAD WHEN FILTERS / PERIOD CHANGE
  // ============================================================

  useEffect(() => {
    loadVisitors();
  }, [search, purpose, period]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalRecords = visitors.length;

  const totalPages = Math.ceil(
    totalRecords / RECORDS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * RECORDS_PER_PAGE;

  const endIndex =
    startIndex + RECORDS_PER_PAGE;

  const currentVisitors = visitors.slice(
    startIndex,
    endIndex
  );

  // ============================================================
  // PAGE HANDLERS
  // ============================================================

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ============================================================
  // EXPORT EXCEL
  // ============================================================

  const downloadExcel = async () => {
    try {
      setExporting(true);

      const response = await axios.get(
        `${API}/api/admin/dashboard/recent-visitors/export`,
        {
          params: {
            purpose,
            period,
            search: search || undefined,
          },
          responseType: "blob",
          withCredentials: true,
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `Visitor_History_${period}_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Excel download failed:",
        error
      );

      alert(
        "Failed to download visitor records."
      );
    } finally {
      setExporting(false);
    }
  };

  // ============================================================
  // EXPORT PDF
  // ============================================================

  const downloadPDF = async () => {
    try {
      setExportingPDF(true);

      const response = await axios.get(
        `${API}/api/admin/dashboard/recent-visitors/export/pdf`,
        {
          params: {
            purpose,
            period,
            search: search || undefined,
          },
          responseType: "blob",
          withCredentials: true,
        }
      );

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `Visitor_History_${period}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "PDF download failed:",
        error
      );

      alert("Failed to download PDF.");
    } finally {
      setExportingPDF(false);
    }
  };

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const resetFilters = () => {
    setSearch("");
    setPurpose("");
    setCurrentPage(1);
  };

  // ============================================================
  // PERIOD LABEL
  // ============================================================

  const getPeriodLabel = () => {
    switch (period) {
      case "weekly":
        return "This Week";

      case "monthly":
        return "This Month";

      default:
        return "Today";
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div
      className="
        bg-white
        rounded-xl
        border border-slate-200
        shadow-sm
        p-5
        h-full
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
          mb-5
        "
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            All Visitors
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Visitor records for{" "}
            {getPeriodLabel().toLowerCase()}
          </p>
        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-wrap gap-2">

          <button
            onClick={loadVisitors}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-lg
              text-sm
              font-medium
              transition
            "
          >
            Refresh
          </button>

          <button
            onClick={downloadExcel}
            disabled={exporting}
            className="
              bg-green-600
              hover:bg-green-700
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              px-4
              py-2
              rounded-lg
              text-sm
              font-medium
              transition
            "
          >
            {exporting
              ? "Exporting..."
              : "Export Excel"}
          </button>

          <button
            onClick={downloadPDF}
            disabled={exportingPDF}
            className="
              bg-red-600
              hover:bg-red-700
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              px-4
              py-2
              rounded-lg
              text-sm
              font-medium
              transition
            "
          >
            {exportingPDF
              ? "Generating..."
              : "Export PDF"}
          </button>

        </div>
      </div>

      {/* SEARCH */}

      <div className="flex flex-col sm:flex-row gap-3 mb-5">

        <div className="flex-1">
          <input
            type="text"
            value={search}
            placeholder={`Search visitors ${getPeriodLabel().toLowerCase()}...`}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              bg-white
              px-4
              py-2.5
              text-sm
              text-slate-800
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              outline-none
              transition
            "
          />
        </div>

        {/* PURPOSE */}

        <div>
          <select
            value={purpose}
            onChange={(e) =>
              setPurpose(e.target.value)
            }
            className="
              rounded-lg
              border
              border-slate-300
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              outline-none
            "
          >
            <option value="">
              All Purposes
            </option>

            <option value="guest">
              Guest
            </option>

            <option value="maid">
              Maid
            </option>

            <option value="vendor">
              Vendor
            </option>

            <option value="worker">
              Worker
            </option>

            <option value="delivery">
              Delivery
            </option>

            <option value="service_provider">
              Service Provider
            </option>
          </select>
        </div>

        {(search || purpose) && (
          <button
            onClick={resetFilters}
            className="
              px-4
              py-2
              rounded-lg
              bg-slate-100
              hover:bg-slate-200
              border
              border-slate-300
              text-slate-700
              text-sm
              font-medium
            "
          >
            Clear
          </button>
        )}

      </div>

      {/* TABLE */}

      <div
        className="
          overflow-x-auto
          border
          border-slate-200
          rounded-lg
        "
      >
        <table className="w-full">

          <thead>
            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50
              "
            >
              <th
                className="
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                Visitor
              </th>

              <th
                className="
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                Date
              </th>

              <th
                className="
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                Purpose
              </th>

              <th
                className="
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                Time In
              </th>

              <th
                className="
                  text-left
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                Time Out
              </th>
            </tr>
          </thead>

          <tbody>

            {/* LOADING */}

            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="
                    text-center
                    py-10
                    text-slate-500
                    text-sm
                  "
                >
                  Loading visitors...
                </td>
              </tr>
            ) : visitors.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="
                    text-center
                    py-10
                    text-slate-500
                    text-sm
                  "
                >
                  No visitors found for{" "}
                  {getPeriodLabel().toLowerCase()}
                </td>
              </tr>
            ) : (
              currentVisitors.map(
                (visitor) => (
                  <tr
                    key={`${visitor.user_id}-${visitor.visit_date}-${visitor.time_in}`}
                    className="
                      border-b
                      border-slate-100
                      hover:bg-slate-50
                      transition
                    "
                  >

                    {/* VISITOR */}

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            flex
                            items-center
                            justify-center
                            font-semibold
                            text-sm
                            uppercase
                          "
                        >
                          {visitor.full_name?.charAt(0) ||
                            "?"}
                        </div>

                        <span
                          className="
                            text-slate-800
                            font-medium
                            text-sm
                          "
                        >
                          {visitor.full_name}
                        </span>

                      </div>
                    </td>

                    {/* DATE */}

                    <td
                      className="
                        px-4
                        py-4
                        text-slate-600
                        text-sm
                      "
                    >
                      {new Date(
                        visitor.visit_date
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                    {/* PURPOSE */}

                    <td
                      className="
                        px-4
                        py-4
                        text-slate-600
                        text-sm
                        capitalize
                      "
                    >
                      {visitor.table_name
                        ? visitor.table_name.replace(
                            /_/g,
                            " "
                          )
                        : "-"}
                    </td>

                    {/* TIME IN */}

                    <td
                      className="
                        px-4
                        py-4
                        text-green-600
                        font-medium
                        text-sm
                      "
                    >
                      {visitor.time_in
                        ? new Date(
                            visitor.time_in
                          ).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            }
                          )
                        : "--"}
                    </td>

                    {/* TIME OUT */}

                    <td className="px-4 py-4">
                      {visitor.time_out ? (
                        <span
                          className="
                            text-red-600
                            font-medium
                            text-sm
                          "
                        >
                          {new Date(
                            visitor.time_out
                          ).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex
                            items-center
                            px-3
                            py-1
                            rounded-full
                            bg-green-100
                            text-green-700
                            text-xs
                            font-semibold
                          "
                        >
                          Inside
                        </span>
                      )}
                    </td>

                  </tr>
                )
              )
            )}

          </tbody>
        </table>
      </div>

      {/* FOOTER */}

      {!loading && visitors.length > 0 && (
        <div
          className="
            flex
            flex-col
            sm:flex-row
            justify-between
            items-center
            gap-3
            mt-3
            text-xs
            text-slate-500
          "
        >

          {/* RECORD COUNT */}

          <span>
            Showing {startIndex + 1} to{" "}
            {Math.min(
              endIndex,
              totalRecords
            )}{" "}
            of {totalRecords} visitor
            {totalRecords !== 1
              ? "s"
              : ""}
          </span>

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="
                  px-3
                  py-1.5
                  rounded-md
                  border
                  border-slate-200
                  text-[10px]
                  font-medium
                  text-slate-600
                  hover:bg-slate-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                Previous
              </button>

              <span
                className="
                  px-2
                  text-[10px]
                  font-medium
                  text-slate-600
                "
              >
                Page {currentPage} of{" "}
                {totalPages}
              </span>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={
                  currentPage === totalPages
                }
                className="
                  px-3
                  py-1.5
                  rounded-md
                  border
                  border-slate-200
                  text-[10px]
                  font-medium
                  text-slate-600
                  hover:bg-slate-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                Next
              </button>

            </div>
          )}

        </div>
      )}
    </div>
  );
}