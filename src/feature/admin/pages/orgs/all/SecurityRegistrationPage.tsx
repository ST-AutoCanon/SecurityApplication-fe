import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../context/AuthContext";
import { UserPlus } from "lucide-react";
import Alert from "../../../../../components/Aleartmessage";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

export default function SecurityRegistrationPage() {
  const { user } = useContext(AuthContext);

  const isEventOrg = user?.org_type?.toUpperCase() === "EVENT";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    });
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.first_name.trim()) {
      showAlert("error", "First Name is required");
      return;
    }

    if (!/^[A-Za-z]{2,50}$/.test(form.first_name.trim())) {
      showAlert(
        "error",
        "First Name must contain only letters (2-50 characters)",
      );
      return;
    }

    if (
      form.last_name.trim() &&
      !/^[A-Za-z]{2,50}$/.test(form.last_name.trim())
    ) {
      showAlert(
        "error",
        "Last Name must contain only letters (2-50 characters)",
      );
      return;
    }

    if (!form.email.trim()) {
      showAlert("error", "Email-Id is required");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())) {
      showAlert("error", "Please enter a valid Email-Id");
      return;
    }

    if (!form.phone.trim()) {
      showAlert("error", "Phone number is required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      showAlert("error", "Please enter a valid 10-digit Phone Number");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/security`, form, {
        withCredentials: true,
      });

      showAlert(
        "success",
        res.data.message ||
          `${isEventOrg ? "Organiser" : "Security"} user created successfully`,
      );

      resetForm();
    } catch (error: any) {
      console.log(error);

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
    "placeholder-gray-400 focus:outline-none focus:border-blue-500 " +
    "focus:ring-0 transition-colors";

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
        <div className="px-6 md:px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div
              // className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"
              className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl text-white font-medium"
            >
              <UserPlus size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Create {isEventOrg ? "Organiser" : "Security"} User
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Add a new {isEventOrg ? "organiser" : "security"} user to your
                account.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                First Name
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter email address"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                inputMode="numeric"
                className={inputClass}
                placeholder="Enter 10-digit phone number"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-6 mt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus size={18} />

              <span>
                {loading
                  ? "Creating..."
                  : `Create ${isEventOrg ? "Organiser" : "Security"} User`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}