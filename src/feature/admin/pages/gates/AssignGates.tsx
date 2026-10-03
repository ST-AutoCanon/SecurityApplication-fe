// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Alert from "../../../../components/Aleartmessage";
// import { Pencil, Power, Trash2, RefreshCw, Edit } from "lucide-react";

// const API = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

// interface AssignGate {
//   id: number;
//   name: string;
//   status: boolean;
//   created_at: string;
//   updated_at: string | null;
// }

// type AlertType = "success" | "warning" | "error";

// type ConfirmAction = "activate" | "deactivate" | "delete" | null;

// export default function AssignGates() {
//   const [gates, setGates] = useState<AssignGate[]>([]);
//   const [loading, setLoading] = useState(false);

//   // =========================
//   // Edit State
//   // =========================

//   const [editingGate, setEditingGate] = useState<AssignGate | null>(null);

//   const [editForm, setEditForm] = useState({
//     name: "",
//   });

//   // =========================
//   // Alert State
//   // =========================

//   const [alertOpen, setAlertOpen] = useState(false);

//   const [alertType, setAlertType] = useState<AlertType>("success");

//   const [alertMessage, setAlertMessage] = useState("");

//   // =========================
//   // Confirmation State
//   // =========================

//   const [confirmOpen, setConfirmOpen] = useState(false);

//   const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

//   const [confirmGateId, setConfirmGateId] = useState<number | null>(null);

//   // =========================
//   // Show Normal Alert
//   // =========================

//   const showAlert = (type: AlertType, message: string) => {
//     setAlertType(type);
//     setAlertMessage(message);
//     setAlertOpen(true);
//   };

//   // =========================
//   // Close Normal Alert
//   // =========================

//   const closeAlert = () => {
//     setAlertOpen(false);
//   };

//   // =========================
//   // Fetch Gates
//   // =========================

//   const fetchGates = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(`${API}/assign-gates`, {
//         withCredentials: true,
//       });

//       setGates(res.data.data || []);
//     } catch (err: any) {
//       showAlert(
//         "error",
//         err?.response?.data?.message || "Failed to fetch gates",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGates();
//   }, []);

//   // =========================
//   // Edit Gate
//   // =========================

//   const handleEdit = (gate: AssignGate) => {
//     setEditingGate(gate);

//     setEditForm({
//       name: gate.name,
//     });
//   };

//   // =========================
//   // Update Gate
//   // =========================

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!editingGate) return;

//     if (!editForm.name.trim()) {
//       showAlert("error", "Gate name is required");
//       return;
//     }

//     try {
//       const res = await axios.put(
//         `${API}/assign-gates/${editingGate.id}`,
//         {
//           name: editForm.name.trim(),
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       setEditingGate(null);

//       showAlert("success", res.data.message || "Gate updated successfully");

//       await fetchGates();
//     } catch (err: any) {
//       showAlert("error", err?.response?.data?.message || "Update failed");
//     }
//   };

//   // =========================
//   // Open Confirmation
//   // =========================

//   const openConfirmation = (action: ConfirmAction, id: number) => {
//     setConfirmAction(action);
//     setConfirmGateId(id);
//     setConfirmOpen(true);
//   };

//   // =========================
//   // Close Confirmation
//   // =========================

//   const closeConfirmation = () => {
//     setConfirmOpen(false);
//     setConfirmAction(null);
//     setConfirmGateId(null);
//   };

//   // =========================
//   // Confirmation Message
//   // =========================

//   const getConfirmationMessage = () => {
//     switch (confirmAction) {
//       case "deactivate":
//         return "Are you sure you want to deactivate this gate?";

//       case "activate":
//         return "Are you sure you want to activate this gate?";

//       case "delete":
//         return "Are you sure you want to permanently delete this gate?";

//       default:
//         return "Are you sure you want to continue?";
//     }
//   };

//   // =========================
//   // Confirm Action
//   // =========================

//   const handleConfirmAction = async () => {
//     if (!confirmGateId || !confirmAction) {
//       closeConfirmation();
//       return;
//     }

//     const id = confirmGateId;
//     const action = confirmAction;

//     closeConfirmation();

//     try {
//       let res;

//       // =========================
//       // Deactivate
//       // =========================

//       if (action === "deactivate") {
//         res = await axios.patch(
//           `${API}/assign-gates/${id}/deactivate`,
//           {},
//           {
//             withCredentials: true,
//           },
//         );
//       }

//       // =========================
//       // Activate
//       // =========================

//       if (action === "activate") {
//         res = await axios.patch(
//           `${API}/assign-gates/${id}/activate`,
//           {},
//           {
//             withCredentials: true,
//           },
//         );
//       }

//       // =========================
//       // Delete
//       // =========================

//       if (action === "delete") {
//         res = await axios.delete(`${API}/assign-gates/${id}`, {
//           withCredentials: true,
//         });
//       }

//       if (res) {
//         showAlert(
//           "success",
//           res.data.message ||
//             (action === "delete"
//               ? "Gate deleted successfully"
//               : action === "activate"
//                 ? "Gate activated successfully"
//                 : "Gate deactivated successfully"),
//         );

//         await fetchGates();
//       }
//     } catch (err: any) {
//       showAlert(
//         "error",
//         err?.response?.data?.message ||
//           (action === "delete"
//             ? "Delete failed"
//             : action === "activate"
//               ? "Activate failed"
//               : "Deactivate failed"),
//       );
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* =====================================================
//           NORMAL ALERT
//       ====================================================== */}

//       {alertOpen && (
//         <Alert type={alertType} message={alertMessage} onClose={closeAlert} />
//       )}

//       {/* =====================================================
//           CONFIRMATION ALERT
//       ====================================================== */}

//       {confirmOpen && (
//         <Alert
//           type="warning"
//           message={getConfirmationMessage()}
//           confirm={true}
//           confirmText="Yes"
//           cancelText="No"
//           onClose={closeConfirmation}
//           onConfirm={handleConfirmAction}
//         />
//       )}

//       <div className="bg-white rounded-xl shadow p-6">
//         {/* =====================================================
//             HEADER
//         ====================================================== */}

//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Gates</h1>

//           <button
//             onClick={fetchGates}
//             disabled={loading}
//             title="Refresh"
//             aria-label="Refresh gates"
//             className="
//               bg-gradient-to-r
//               from-blue-600
//               to-blue-500
//               hover:opacity-90
//               text-white
//               px-3
//               py-2
//               rounded-lg
//               disabled:opacity-50
//               flex
//               items-center
//               gap-2
//               transition
//             "
//           >
//             <RefreshCw size={18} className={loading ? "animate-spin" : ""} />

//             <span>{loading ? "Loading..." : "Refresh"}</span>
//           </button>
//         </div>

//         {/* =====================================================
//             LOADING / EMPTY / TABLE
//         ====================================================== */}

//         {loading ? (
//           <div className="text-center py-10 text-lg">Loading...</div>
//         ) : gates.length === 0 ? (
//           <div className="text-center py-10 text-gray-500">No gates found.</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200">
//               {/* =================================================
//                   TABLE HEADER
//               ================================================== */}

//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-4 py-3">ID</th>

//                   <th className="border px-4 py-3">Gate Name</th>

//                   <th className="border px-4 py-3">Status</th>

//                   <th className="border px-4 py-3">Actions</th>
//                 </tr>
//               </thead>

//               {/* =================================================
//                   TABLE BODY
//               ================================================== */}

//               <tbody>
//                 {gates.map((gate) => (
//                   <tr key={gate.id} className="hover:bg-gray-50">
//                     {/* ID */}

//                     <td className="border px-4 py-3">{gate.id}</td>

//                     {/* NAME */}

//                     <td className="border px-4 py-3">{gate.name}</td>

//                     {/* STATUS */}

//                     <td className="border px-4 py-3 text-center">
//                       {gate.status ? (
//                         <span
//                           className="
//                             bg-green-100
//                             text-green-700
//                             px-3
//                             py-1
//                             rounded-full
//                           "
//                         >
//                           Active
//                         </span>
//                       ) : (
//                         <span
//                           className="
//                             bg-red-100
//                             text-red-700
//                             px-3
//                             py-1
//                             rounded-full
//                           "
//                         >
//                           Inactive
//                         </span>
//                       )}
//                     </td>

//                     {/* ACTIONS */}

//                     <td className="border px-4 py-3">
//                       <div className="flex justify-center items-center gap-2">
//                         {/* ================================
//                             EDIT
//                         ================================= */}

//                         <button
//                           type="button"
//                           onClick={() => handleEdit(gate)}
//                           title="Edit"
//                           aria-label="Edit gate"
//                           className="
//                             p-2
//                             rounded-lg
//                             text-blue-600
//                             bg-blue-50
//                             hover:bg-blue-100
//                             transition-colors
//                           "
//                         >
//                           <Edit size={17} />
//                         </button>

//                         {/* ================================
//                             ACTIVATE / DEACTIVATE
//                         ================================= */}

//                         {gate.status ? (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               openConfirmation("deactivate", gate.id)
//                             }
//                             title="Deactivate"
//                             aria-label="Deactivate gate"
//                             className="
//                               p-2
//                               rounded-lg
//                               text-orange-600
//                               bg-orange-50
//                               hover:bg-orange-100
//                               transition-colors
//                             "
//                           >
//                             <Power size={17} />
//                           </button>
//                         ) : (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               openConfirmation("activate", gate.id)
//                             }
//                             title="Activate"
//                             aria-label="Activate gate"
//                             className="
//                               p-2
//                               rounded-lg
//                               text-blue-600
//                               bg-blue-50
//                               hover:bg-blue-100
//                               transition-colors
//                             "
//                           >
//                             <Power size={17} />
//                           </button>
//                         )}

//                         {/* ================================
//                             DELETE
//                         ================================= */}

//                         <button
//                           type="button"
//                           onClick={() => openConfirmation("delete", gate.id)}
//                           title="Delete"
//                           aria-label="Delete gate"
//                           className="
//                             p-2
//                             rounded-lg
//                             text-red-600
//                             bg-red-50
//                             hover:bg-red-100
//                             transition-colors
//                           "
//                         >
//                           <Trash2 size={17} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* =====================================================
//             EDIT MODAL
//         ====================================================== */}

//         {editingGate && (
//           <div
//             className="
//               fixed
//               inset-0
//               bg-black/50
//               flex
//               justify-center
//               items-center
//               z-40
//               p-4
//             "
//           >
//             <div
//               className="
//                 bg-white
//                 rounded-xl
//                 shadow-xl
//                 w-full
//                 max-w-lg
//                 p-6
//               "
//             >
//               <h2 className="text-2xl font-bold mb-6">Update Gate</h2>

//               <form onSubmit={handleUpdate} className="space-y-4">
//                 {/* Gate Name */}

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Gate Name
//                     <span className="text-red-500">*</span>
//                   </label>

//                   <input
//                     type="text"
//                     value={editForm.name}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         name: e.target.value,
//                       })
//                     }
//                     className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
//                     placeholder="Gate 1"
//                   />
//                 </div>

//                 {/* Buttons */}

//                 <div className="flex justify-end gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setEditingGate(null)}
//                     className="
//                       px-5
//                       py-2
//                       rounded-lg
//                       border
//                       border-gray-300
//                       hover:bg-gray-100
//                     "
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="
//                       bg-blue-600
//                       hover:bg-blue-700
//                       text-white
//                       px-5
//                       py-2
//                       rounded-lg
//                     "
//                   >
//                     Update Gate
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../../../components/Aleartmessage";
import { Power, Trash2, RefreshCw, Edit, DoorOpen } from "lucide-react";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

interface AssignGate {
  id: number;
  name: string;
  status: boolean;
  created_at: string;
  updated_at: string | null;
}

type AlertType = "success" | "warning" | "error";

type ConfirmAction = "activate" | "deactivate" | "delete" | null;

export default function AssignGates() {
  const [gates, setGates] = useState<AssignGate[]>([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // Edit State
  // =========================

  const [editingGate, setEditingGate] = useState<AssignGate | null>(null);

  const [editForm, setEditForm] = useState({
    name: "",
  });

  // =========================
  // Alert State
  // =========================

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertType, setAlertType] = useState<AlertType>("success");

  const [alertMessage, setAlertMessage] = useState("");

  // =========================
  // Confirmation State
  // =========================

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const [confirmGateId, setConfirmGateId] = useState<number | null>(null);

  // =========================
  // Show Alert
  // =========================

  const showAlert = (type: AlertType, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  // =========================
  // Close Alert
  // =========================

  const closeAlert = () => {
    setAlertOpen(false);
  };

  // =========================
  // Fetch Gates
  // =========================

  const fetchGates = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/assign-gates`, {
        withCredentials: true,
      });

      setGates(res.data.data || []);
    } catch (err: any) {
      showAlert(
        "error",
        err?.response?.data?.message || "Failed to fetch gates",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGates();
  }, []);

  // =========================
  // Edit Gate
  // =========================

  const handleEdit = (gate: AssignGate) => {
    setEditingGate(gate);

    setEditForm({
      name: gate.name,
    });
  };

  // =========================
  // Update Gate
  // =========================

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingGate) return;

    if (!editForm.name.trim()) {
      showAlert("error", "Gate name is required");
      return;
    }

    try {
      const res = await axios.put(
        `${API}/assign-gates/${editingGate.id}`,
        {
          name: editForm.name.trim(),
        },
        {
          withCredentials: true,
        },
      );

      setEditingGate(null);

      showAlert("success", res.data.message || "Gate updated successfully");

      await fetchGates();
    } catch (err: any) {
      showAlert("error", err?.response?.data?.message || "Update failed");
    }
  };

  // =========================
  // Open Confirmation
  // =========================

  const openConfirmation = (action: ConfirmAction, id: number) => {
    setConfirmAction(action);
    setConfirmGateId(id);
    setConfirmOpen(true);
  };

  // =========================
  // Close Confirmation
  // =========================

  const closeConfirmation = () => {
    setConfirmOpen(false);
    setConfirmAction(null);
    setConfirmGateId(null);
  };

  // =========================
  // Confirmation Message
  // =========================

  const getConfirmationMessage = () => {
    switch (confirmAction) {
      case "deactivate":
        return "Are you sure you want to deactivate this gate?";

      case "activate":
        return "Are you sure you want to activate this gate?";

      case "delete":
        return "Are you sure you want to permanently delete this gate?";

      default:
        return "Are you sure you want to continue?";
    }
  };

  // =========================
  // Confirm Action
  // =========================

  const handleConfirmAction = async () => {
    if (!confirmGateId || !confirmAction) {
      closeConfirmation();
      return;
    }

    const id = confirmGateId;
    const action = confirmAction;

    closeConfirmation();

    try {
      let res;

      if (action === "deactivate") {
        res = await axios.patch(
          `${API}/assign-gates/${id}/deactivate`,
          {},
          {
            withCredentials: true,
          },
        );
      }

      if (action === "activate") {
        res = await axios.patch(
          `${API}/assign-gates/${id}/activate`,
          {},
          {
            withCredentials: true,
          },
        );
      }

      if (action === "delete") {
        res = await axios.delete(`${API}/assign-gates/${id}`, {
          withCredentials: true,
        });
      }

      if (res) {
        showAlert(
          "success",
          res.data.message ||
            (action === "delete"
              ? "Gate deleted successfully"
              : action === "activate"
                ? "Gate activated successfully"
                : "Gate deactivated successfully"),
        );

        await fetchGates();
      }
    } catch (err: any) {
      showAlert(
        "error",
        err?.response?.data?.message ||
          (action === "delete"
            ? "Delete failed"
            : action === "activate"
              ? "Activate failed"
              : "Deactivate failed"),
      );
    }
  };

  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 " +
    "placeholder-gray-400 focus:outline-none " +
    "focus:border-blue-500 focus:ring-0 transition-colors";

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Normal Alert */}
      {alertOpen && (
        <Alert type={alertType} message={alertMessage} onClose={closeAlert} />
      )}

      {/* Confirmation Alert */}
      {confirmOpen && (
        <Alert
          type="warning"
          message={getConfirmationMessage()}
          confirm={true}
          confirmText="Yes"
          cancelText="No"
          onClose={closeConfirmation}
          onConfirm={handleConfirmAction}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* =========================
            HEADER
        ========================= */}

        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <DoorOpen size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-800">Gates</h1>

                <p className="text-sm text-gray-500 mt-1">
                  Manage apartment gates and their status.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={fetchGates}
              disabled={loading}
              title="Refresh Gates"
              aria-label="Refresh gates"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />

              <span>{loading ? "Loading..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <RefreshCw size={30} className="text-blue-600 animate-spin mb-3" />

            <p className="text-gray-500">Loading gates...</p>
          </div>
        ) : gates.length === 0 ? (
          /* =========================
             EMPTY STATE
          ========================= */

          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <DoorOpen size={27} className="text-gray-400" />
            </div>

            <p className="text-gray-600 font-medium">No gates found.</p>

            <p className="text-sm text-gray-400 mt-1">
              Gates will appear here once they are added.
            </p>
          </div>
        ) : (
          /* =========================
             TABLE
          ========================= */

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Gate
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {gates.map((gate) => (
                  <tr
                    key={gate.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    {/* ID */}

                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-500">
                        #{gate.id}
                      </span>
                    </td>

                    {/* Gate */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <DoorOpen size={19} />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {gate.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            Gate #{gate.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4 text-center">
                      {gate.status ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        {/* Edit */}

                        <button
                          type="button"
                          onClick={() => handleEdit(gate)}
                          title="Edit"
                          aria-label="Edit gate"
                          className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                          <Edit size={17} />
                        </button>

                        {/* Activate / Deactivate */}

                        {gate.status ? (
                          <button
                            type="button"
                            onClick={() =>
                              openConfirmation("deactivate", gate.id)
                            }
                            title="Deactivate"
                            aria-label="Deactivate gate"
                            className="p-2 rounded-lg text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
                          >
                            <Power size={17} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              openConfirmation("activate", gate.id)
                            }
                            title="Activate"
                            aria-label="Activate gate"
                            className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                          >
                            <Power size={17} />
                          </button>
                        )}

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() => openConfirmation("delete", gate.id)}
                          title="Delete"
                          aria-label="Delete gate"
                          className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* =========================
            EDIT MODAL
        ========================= */}

        {editingGate && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              {/* Modal Header */}

              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Edit size={19} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Update Gate
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Update the gate information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}

              <form onSubmit={handleUpdate} className="p-6 space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Gate Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        name: e.target.value,
                      })
                    }
                    className={inputClass}
                    placeholder="Enter gate name"
                  />
                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingGate(null)}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  >
                    Update Gate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}