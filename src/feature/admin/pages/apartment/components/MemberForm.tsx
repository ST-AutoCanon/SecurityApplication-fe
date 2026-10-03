import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  CheckCircle2,
  Loader2,
  Save,
  UserPlus,
} from "lucide-react";

interface Props {
  mode: "add" | "edit";
  member?: any;
  onSuccess: () => void;
}

const API = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  security_user_id: "",
  member_code: "",
  first_name: "",
  last_name: "",
  gender: "MALE",
  date_of_birth: "",
  mobile_number: "",
  alternate_mobile_number: "",
  email: "",
  profile_photo: "",
  aadhaar_number: "",
  occupation: "",
  apartment_name: "",
  block_tower: "",
  floor_number: "",
  flat_number: "",
  ownership_type: "OWNER",
  move_in_date: "",
  family_member_count: "",
  emergency_contact_name: "",
  emergency_contact_relationship: "",
  emergency_contact_mobile: "",
  member_type: "RESIDENT",
  status: true,
};

const MemberForm = ({ mode, member, onSuccess }: Props) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setForm({
        ...initialState,
        ...member,
        date_of_birth: member.date_of_birth?.split("T")[0] || "",
        move_in_date: member.move_in_date?.split("T")[0] || "",
        status:
          typeof member.status === "boolean"
            ? member.status
            : Boolean(member.status),
      });
    } else {
      setForm(initialState);
    }
  }, [member]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleNumericChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxLength: number,
  ) => {
    const { name, value } = e.target;

    const cleanedValue = value.replace(/\D/g, "").slice(0, maxLength);

    setForm((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formElement = e.currentTarget as HTMLFormElement;

    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const aadhaarRegex = /^\d{12}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nameRegex.test(form.first_name.trim())) {
      alert("First Name should contain only letters and spaces.");
      return;
    }

    if (!nameRegex.test(form.last_name.trim())) {
      alert("Last Name should contain only letters and spaces.");
      return;
    }

    if (!phoneRegex.test(form.mobile_number)) {
      alert("Mobile Number must contain exactly 10 digits.");
      return;
    }

    if (!phoneRegex.test(form.alternate_mobile_number)) {
      alert("Alternate Mobile Number must contain exactly 10 digits.");
      return;
    }

    if (!emailRegex.test(form.email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!aadhaarRegex.test(form.aadhaar_number)) {
      alert("Aadhaar Number must contain exactly 12 digits.");
      return;
    }

    if (!nameRegex.test(form.emergency_contact_name.trim())) {
      alert("Emergency Contact Name should contain only letters and spaces.");
      return;
    }

    if (!nameRegex.test(form.emergency_contact_relationship.trim())) {
      alert("Relationship should contain only letters and spaces.");
      return;
    }

    if (!phoneRegex.test(form.emergency_contact_mobile)) {
      alert("Emergency Contact Mobile must contain exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "add") {
        await axios.post(`${API}/api/admin/apartment/members`, form, {
          withCredentials: true,
        });
      } else {
        await axios.put(
          `${API}/api/admin/apartment/members/${member.id}`,
          form,
          {
            withCredentials: true,
          },
        );
      }

      onSuccess();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error saving member.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 " +
    "placeholder-gray-400 text-gray-900 bg-white " +
    "focus:outline-none focus:border-blue-500 focus:ring-0 " +
    "transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed";

  const sectionTitleClass =
    "text-sm font-semibold text-gray-900 flex items-center gap-2";

  return (
    <form onSubmit={submit}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <UserPlus size={24} />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {mode === "add"
                ? "Add Apartment Member"
                : "Edit Apartment Member"}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {mode === "add"
                ? "Enter the member details to create a new apartment member."
                : "Update the apartment member information below."}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Basic Information */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <UserPlus size={17} />
              </div>

              <div>
                <h2 className={sectionTitleClass}>Basic Information</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Personal and identification details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Member Code */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Member Code <span className="text-red-500">*</span>
                </label>

                <input
                  name="member_code"
                  value={form.member_code}
                  onChange={handleChange}
                  placeholder="Enter member code"
                  className={inputClass}
                  required
                  minLength={1}
                  maxLength={50}
                  pattern="^[A-Za-z0-9_-]+$"
                  title="Member Code is required and can contain only letters, numbers, underscore and hyphen."
                />
              </div>

              {/* First Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>

                <input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className={inputClass}
                  required
                  minLength={2}
                  maxLength={50}
                  pattern="^[A-Za-z\s]+$"
                  title="First Name should contain only letters and spaces."
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>

                <input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className={inputClass}
                  required
                  minLength={2}
                  maxLength={50}
                  pattern="^[A-Za-z\s]+$"
                  title="Last Name should contain only letters and spaces."
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type="date"
                    name="date_of_birth"
                    value={form.date_of_birth}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Aadhaar */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="aadhaar_number"
                  value={form.aadhaar_number}
                  onChange={(e) => handleNumericChange(e, 12)}
                  placeholder="Enter 12 digit Aadhaar"
                  className={inputClass}
                  required
                  inputMode="numeric"
                  maxLength={12}
                  pattern="[0-9]{12}"
                  title="Aadhaar Number must contain exactly 12 digits."
                />
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-t border-gray-200 pt-8">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-900">
                Contact Information
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Primary contact details for the apartment member
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Mobile */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  name="mobile_number"
                  value={form.mobile_number}
                  onChange={(e) => handleNumericChange(e, 10)}
                  placeholder="Enter 10 digit mobile number"
                  className={inputClass}
                  required
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Mobile Number must contain exactly 10 digits."
                />
              </div>

              {/* Alternate Mobile */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Alternate Mobile Number{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  name="alternate_mobile_number"
                  value={form.alternate_mobile_number}
                  onChange={(e) => handleNumericChange(e, 10)}
                  placeholder="Enter alternate mobile number"
                  className={inputClass}
                  required
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Alternate Mobile Number must contain exactly 10 digits."
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={inputClass}
                  required
                  maxLength={100}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address."
                />
              </div>

              {/* Occupation */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Occupation <span className="text-red-500">*</span>
                </label>

                <input
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                  className={inputClass}
                  required
                  minLength={2}
                  maxLength={100}
                />
              </div>
            </div>
          </section>

          {/* Apartment Information */}
          <section className="border-t border-gray-200 pt-8">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-900">
                Apartment Information
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Property and residency details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Apartment Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Apartment Name <span className="text-red-500">*</span>
                </label>

                <input
                  name="apartment_name"
                  value={form.apartment_name}
                  onChange={handleChange}
                  placeholder="Enter apartment name"
                  className={inputClass}
                  required
                  minLength={2}
                  maxLength={100}
                />
              </div>

              {/* Block */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tower / Block <span className="text-red-500">*</span>
                </label>

                <input
                  name="block_tower"
                  value={form.block_tower}
                  onChange={handleChange}
                  placeholder="Enter tower / block"
                  className={inputClass}
                  required
                  maxLength={50}
                />
              </div>

              {/* Floor */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Floor Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="floor_number"
                  value={form.floor_number}
                  onChange={handleChange}
                  placeholder="Enter floor number"
                  className={inputClass}
                  required
                  min={0}
                  max={200}
                  step={1}
                  inputMode="numeric"
                />
              </div>

              {/* Flat */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Flat Number <span className="text-red-500">*</span>
                </label>

                <input
                  name="flat_number"
                  value={form.flat_number}
                  onChange={handleChange}
                  placeholder="Enter flat number"
                  className={inputClass}
                  required
                  maxLength={20}
                  pattern="^[A-Za-z0-9/-]+$"
                  title="Flat Number can contain letters, numbers, slash and hyphen."
                />
              </div>

              {/* Ownership */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Ownership Type <span className="text-red-500">*</span>
                </label>

                <select
                  name="ownership_type"
                  value={form.ownership_type}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="OWNER">OWNER</option>
                  <option value="TENANT">TENANT</option>
                </select>
              </div>

              {/* Move In Date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Move In Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="move_in_date"
                  value={form.move_in_date}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              {/* Family Count */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Family Member Count <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="family_member_count"
                  value={
                    form.family_member_count === 0
                      ? ""
                      : form.family_member_count
                  }
                  onChange={(e) => handleNumericChange(e, 3)}
                  placeholder="Enter family member count"
                  className={inputClass}
                  required
                  inputMode="numeric"
                  pattern="[0-9]+"
                  title="Please enter a valid family member count."
                />
              </div>

              {/* Member Type */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Member Type <span className="text-red-500">*</span>
                </label>

                <select
                  name="member_type"
                  value={form.member_type}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="RESIDENT">RESIDENT</option>
                  <option value="TENANT">TENANT</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status <span className="text-red-500">*</span>
                </label>

                <select
                  name="status"
                  value={String(form.status)}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      status: e.target.value === "true",
                    }))
                  }
                  className={inputClass}
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="border-t border-gray-200 pt-8">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-900">
                Emergency Contact
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Contact information to use during emergencies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Contact Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Emergency Contact Name <span className="text-red-500">*</span>
                </label>

                <input
                  name="emergency_contact_name"
                  value={form.emergency_contact_name}
                  onChange={handleChange}
                  placeholder="Enter contact name"
                  className={inputClass}
                  required
                  minLength={2}
                  maxLength={100}
                  pattern="^[A-Za-z\s]+$"
                  title="Emergency Contact Name should contain only letters and spaces."
                />
              </div>

              {/* Relationship */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Relationship <span className="text-red-500">*</span>
                </label>

                <input
                  name="emergency_contact_relationship"
                  value={form.emergency_contact_relationship}
                  onChange={handleChange}
                  placeholder="Enter relationship"
                  className={inputClass}
                  required
                  minLength={2}
                  maxLength={50}
                  pattern="^[A-Za-z\s]+$"
                  title="Relationship should contain only letters and spaces."
                />
              </div>

              {/* Contact Mobile */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Emergency Contact Mobile{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  name="emergency_contact_mobile"
                  value={form.emergency_contact_mobile}
                  onChange={(e) => handleNumericChange(e, 10)}
                  placeholder="Enter 10 digit mobile number"
                  className={inputClass}
                  required
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Emergency Contact Mobile must contain exactly 10 digits."
                />
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>Fields marked with * are required.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>
                    {mode === "add" ? "Create Member" : "Update Member"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MemberForm;