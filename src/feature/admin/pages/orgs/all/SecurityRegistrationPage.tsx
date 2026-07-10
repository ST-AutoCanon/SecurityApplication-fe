import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../context/AuthContext";


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.first_name.trim()) {
      return alert("First Name is required");
    }

    if (!form.email.trim()) {
      return alert("Email is required");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/security`, form, {
        withCredentials: true,
      });

      alert(res.data.message);

      resetForm();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8">
          {" "}
          Create {isEventOrg ? "Organiser" : "Security"} User
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div>
            <label className="block mb-2 font-medium">First Name *</label>

            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Last Name</label>

            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Doe"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email *</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone Number</label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="9876543210"
            />
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
            >
              {/* {loading ? "Creating..." : "Create Security User"} */}
              {loading
                ? "Creating..."
                : `Create ${isEventOrg ? "Organiser" : "Security"} User`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}