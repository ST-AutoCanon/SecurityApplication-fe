import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../../../components/Aleartmessage";

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
  // Show Normal Alert
  // =========================

  const showAlert = (type: AlertType, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  // =========================
  // Close Normal Alert
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

      // =========================
      // Deactivate
      // =========================

      if (action === "deactivate") {
        res = await axios.patch(
          `${API}/assign-gates/${id}/deactivate`,
          {},
          {
            withCredentials: true,
          },
        );
      }

      // =========================
      // Activate
      // =========================

      if (action === "activate") {
        res = await axios.patch(
          `${API}/assign-gates/${id}/activate`,
          {},
          {
            withCredentials: true,
          },
        );
      }

      // =========================
      // Delete
      // =========================

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

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* =====================================================
          NORMAL ALERT
      ====================================================== */}

      {alertOpen && (
        <Alert type={alertType} message={alertMessage} onClose={closeAlert} />
      )}

      {/* =====================================================
          CONFIRMATION ALERT
      ====================================================== */}

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

      <div className="bg-white rounded-xl shadow p-6">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gates</h1>

          <button
            onClick={fetchGates}
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-lg
              disabled:opacity-50
            "
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {/* =====================================================
            LOADING / EMPTY / TABLE
        ====================================================== */}

        {loading ? (
          <div className="text-center py-10 text-lg">Loading...</div>
        ) : gates.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No gates found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              {/* =================================================
                  TABLE HEADER
              ================================================== */}

              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-3">ID</th>

                  <th className="border px-4 py-3">Gate Name</th>

                  <th className="border px-4 py-3">Status</th>

                  <th className="border px-4 py-3">Actions</th>
                </tr>
              </thead>

              {/* =================================================
                  TABLE BODY
              ================================================== */}

              <tbody>
                {gates.map((gate) => (
                  <tr key={gate.id} className="hover:bg-gray-50">
                    {/* ID */}

                    <td className="border px-4 py-3">{gate.id}</td>

                    {/* NAME */}

                    <td className="border px-4 py-3">{gate.name}</td>

                    {/* STATUS */}

                    <td className="border px-4 py-3 text-center">
                      {gate.status ? (
                        <span
                          className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-full
                          "
                        >
                          Active
                        </span>
                      ) : (
                        <span
                          className="
                            bg-red-100
                            text-red-700
                            px-3
                            py-1
                            rounded-full
                          "
                        >
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}

                    <td className="border px-4 py-3">
                      <div className="flex justify-center gap-2 flex-wrap">
                        {/* ================================
                            EDIT
                        ================================= */}

                        <button
                          type="button"
                          onClick={() => handleEdit(gate)}
                          className="
                            bg-yellow-500
                            hover:bg-yellow-600
                            text-white
                            px-3
                            py-1
                            rounded
                          "
                        >
                          Edit
                        </button>

                        {/* ================================
                            ACTIVATE / DEACTIVATE
                        ================================= */}

                        {gate.status ? (
                          <button
                            type="button"
                            onClick={() =>
                              openConfirmation("deactivate", gate.id)
                            }
                            className="
                              bg-orange-500
                              hover:bg-orange-600
                              text-white
                              px-3
                              py-1
                              rounded
                            "
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              openConfirmation("activate", gate.id)
                            }
                            className="
                              bg-green-600
                              hover:bg-green-700
                              text-white
                              px-3
                              py-1
                              rounded
                            "
                          >
                            Activate
                          </button>
                        )}

                        {/* ================================
                            DELETE
                        ================================= */}

                        <button
                          type="button"
                          onClick={() => openConfirmation("delete", gate.id)}
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-3
                            py-1
                            rounded
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* =====================================================
            EDIT MODAL
        ====================================================== */}

        {editingGate && (
          <div
            className="
              fixed
              inset-0
              bg-black/50
              flex
              justify-center
              items-center
              z-40
              p-4
            "
          >
            <div
              className="
                bg-white
                rounded-xl
                shadow-xl
                w-full
                max-w-lg
                p-6
              "
            >
              <h2 className="text-2xl font-bold mb-6">Update Gate</h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Gate Name */}

                <div>
                  <label className="block mb-2 font-medium">
                    Gate Name
                    <span className="text-red-500">*</span>
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
                    className="
                      w-full
                      border
                      rounded-lg
                      p-3
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                    placeholder="Gate 1"
                  />
                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingGate(null)}
                    className="
                      px-5
                      py-2
                      rounded-lg
                      border
                      border-gray-300
                      hover:bg-gray-100
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-5
                      py-2
                      rounded-lg
                    "
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