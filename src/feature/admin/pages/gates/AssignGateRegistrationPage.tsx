// import React, { useState } from "react";
// import axios from "axios";
// import Alert from "../../../../components/Aleartmessage";

// const API = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

// export default function AssignGateRegistrationPage() {
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//   });

//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertType, setAlertType] = useState<"success" | "error">("success");
//   const [alertMessage, setAlertMessage] = useState("");

//   // =========================
//   // Alert
//   // =========================

//   const showAlert = (type: "success" | "error", message: string) => {
//     setAlertType(type);
//     setAlertMessage(message);
//     setAlertOpen(true);
//   };

//   // =========================
//   // Input Change
//   // =========================

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // =========================
//   // Reset
//   // =========================

//   const resetForm = () => {
//     setForm({
//       name: "",
//     });
//   };

//   // =========================
//   // Submit
//   // =========================

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const gateName = form.name.trim();

//     if (!gateName) {
//       showAlert("error", "Gate name is required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${API}/assign-gates`,
//         {
//           name: gateName,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       showAlert("success", res.data.message || "Gate created successfully");

//       resetForm();
//     } catch (error: any) {
//       console.error(error);

//       showAlert(
//         "error",
//         error?.response?.data?.message || "Something went wrong",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* Alert */}

//       {alertOpen && (
//         <Alert
//           type={alertType}
//           message={alertMessage}
//           onClose={() => setAlertOpen(false)}
//         />
//       )}

//       <div className="bg-white shadow rounded-xl p-8">
//         <h1 className="text-3xl font-bold mb-8">Create Gate</h1>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Gate Name */}

//           <div>
//             <label className="block mb-2 font-medium">
//               Gate Name
//               <span className="text-red-500">*</span>
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               // className="w-full border rounded-lg p-3"
//               className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
//               placeholder="Gate 1"
//               disabled={loading}
//             />
//           </div>

//           {/* Submit */}

//           <div className="mt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
//             >
//               {loading ? "Creating..." : "Create Gate"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { DoorOpen, Plus } from "lucide-react";
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

  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 " +
    "placeholder-gray-400 focus:outline-none " +
    "focus:border-blue-500 focus:ring-0 transition-colors " +
    "disabled:bg-gray-50 disabled:cursor-not-allowed";

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* Alert */}
      {alertOpen && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setAlertOpen(false)}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <DoorOpen size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Gate</h1>

            <p className="text-sm text-gray-500 mt-1">
              Add a new gate for your organization.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Gate Name */}
          <div>
            <label
              htmlFor="gate-name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Gate Name
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              id="gate-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter gate name"
              disabled={loading}
            />

            <p className="text-xs text-gray-500 mt-2">
              Enter a unique name such as Gate 1, Main Gate, or North Gate.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={18} />

              <span>{loading ? "Creating..." : "Create Gate"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}