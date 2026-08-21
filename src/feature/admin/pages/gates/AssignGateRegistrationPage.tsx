import React, { useState } from "react";
import axios from "axios";
import Alert from "../../../../components/Aleartmessage";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

export default function AssignGateRegistrationPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  // =========================
  // Alert
  // =========================

  const showAlert = (type: "success" | "error", message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  // =========================
  // Input Change
  // =========================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Reset
  // =========================

  const resetForm = () => {
    setForm({
      name: "",
    });
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const gateName = form.name.trim();

    if (!gateName) {
      showAlert("error", "Gate name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/assign-gates`,
        {
          name: gateName,
        },
        {
          withCredentials: true,
        },
      );

      showAlert("success", res.data.message || "Gate created successfully");

      resetForm();
    } catch (error: any) {
      console.error(error);

      showAlert(
        "error",
        error?.response?.data?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Alert */}

      {alertOpen && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setAlertOpen(false)}
        />
      )}

      <div className="bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8">Create Gate</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Gate Name */}

          <div>
            <label className="block mb-2 font-medium">
              Gate Name
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Gate 1"
              disabled={loading}
            />
          </div>

          {/* Submit */}

          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Gate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
