import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../../../components/Aleartmessage";

type Organisation = {
  id: number;
  org_name: string;
};

type OrganisationDetails = {
  id: number;
  org_name: string;
  org_type: string;
  phone?: string;
  email?: string;
  address?: string;
  aadhaar_number?: string;
  pan_number?: string;
  passport_number?: string;
  registration_start_date?: string;
  registration_end_date?: string;
  status?: string;
  is_active?: boolean;

  admin?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
};

type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

const UpdateOrganisation = () => {
  const ADMIN_API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;

  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  const [orgname, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [status, setStatus] = useState("active");
  const [isActive, setIsActive] = useState(true);

  const [photo, setPhoto] = useState<File | null>(null);

  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch Departments

  // Fetch Organisations
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await axios.get<ApiResponse<Organisation[]>>(
          `${ADMIN_API_BASE}/org-super-admin`,
          { withCredentials: true },
        );
        if (res.data.success) setOrganisations(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch organisations");
      }
    };
    fetchOrgs();
  }, []);

  // Fetch Organisation Details
  const fetchOrganisationDetails = async (orgId: number) => {
    try {
      setFetchingDetails(true);
      const res = await axios.get<ApiResponse<OrganisationDetails>>(
        `${ADMIN_API_BASE}/org-super-admin/${orgId}`,
        { withCredentials: true },
      );

      if (res.data.success && res.data.data)
        if (res.data.success && res.data.data) {
          console.log("ORG DETAILS:", res.data.data);
          const org = res.data.data;

          setOrgName(org.org_name || "");
          setOrgType(org.org_type || "");
          setPhone(org.phone || "");
          setEmail(org.email || "");
          setAddress(org.address || "");
          setAadhaarNumber(org.aadhaar_number || "");
          setPanNumber(org.pan_number || "");
          setPassportNumber(org.passport_number || "");

          setRegistrationStartDate(
            org.registration_start_date?.split("T")[0] || "",
          );

          setRegistrationEndDate(
            org.registration_end_date?.split("T")[0] || "",
          );

          setStatus(org.status || "active");
          setIsActive(org.is_active ?? true);

          setAdminFirstName(org.admin?.first_name || "");
          setAdminLastName(org.admin?.last_name || "");
          setAdminEmail(org.admin?.email || "");
          setAdminPhone(org.admin?.phone || "");
        }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to load organisation details",
      });
    } finally {
      setFetchingDetails(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedOrgId) {
      setAlert({
        type: "error",
        message: "Please select organisation",
      });
      return;
    }

    try {
      setLoading(true);

      // const payload = {
      //   org_name: orgname,
      //   phone: phone,
      //   email,
      //   address,
      //   aadhaar_number: aadhaarNumber,
      //   pan_number: panNumber,
      //   passport_number: passportNumber,
      //   registration_start_date: registrationStartDate,
      //   registration_end_date: registrationEndDate,
      //   status,
      //   is_active: isActive,

      //   admin: {
      //     first_name: adminFirstName,
      //     last_name: adminLastName,
      //     email: adminEmail,
      //     phone: adminPhone,
      //   },
      // };

      const formData = new FormData();

      formData.append("org_name", orgname);
      formData.append("org_type", orgType);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("aadhaar_number", aadhaarNumber);
      formData.append("pan_number", panNumber);
      formData.append("passport_number", passportNumber);
      formData.append("registration_start_date", registrationStartDate);
      formData.append("registration_end_date", registrationEndDate);
      formData.append("status", status);
      formData.append("is_active", String(isActive));

      formData.append(
        "admin",
        JSON.stringify({
          first_name: adminFirstName,
          last_name: adminLastName,
          email: adminEmail,
          phone: adminPhone,
        }),
      );

      if (photo) {
        formData.append("photo", photo);
      }

      const res = await axios.put(
        `${ADMIN_API_BASE}/org-super-admin/${selectedOrgId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // const res = await axios.put<ApiResponse>(
      //   `${ADMIN_API_BASE}/org-super-admin/${selectedOrgId}`,
      //   payload,
      //   {
      //     withCredentials: true,
      //   },
      // );

      setAlert({
        type: res.data.success ? "success" : "error",
        message:
          res.data.message ||
          (res.data.success
            ? "Organisation updated successfully 🎉"
            : "Update failed"),
      });

      if (res.data.success) {
        setSelectedOrgId(null);

        setOrgName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setAadhaarNumber("");
        setPanNumber("");
        setPassportNumber("");
        setRegistrationStartDate("");
        setRegistrationEndDate("");
        setStatus("active");
        setIsActive(true);

        setAdminFirstName("");
        setAdminLastName("");
        setAdminEmail("");
        setAdminPhone("");

        setTimeout(() => setAlert(null), 4000);
      }
    } catch (err: any) {
      setAlert({
        type: "error",
        message:
          err.response?.data?.message || "Server error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#4b1b7a] to-[#2d2a8c] p-4 sm:p-6 lg:p-8">
        <div className="flex-1 w-full max-w-4xl mx-auto">
          <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Update Organisation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 pb-8">
              {/* Select Organisation */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Organisation
                </label>
                <select
                  className="w-full border rounded-xl px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                  value={selectedOrgId ?? ""}
                  onChange={(e) => {
                    const orgId = Number(e.target.value);
                    setSelectedOrgId(orgId);
                    if (orgId) fetchOrganisationDetails(orgId);
                  }}
                >
                  <option value="">-- Select --</option>
                  {organisations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.org_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form always visible, disable fields if no org selected */}
              {fetchingDetails && selectedOrgId && (
                <p>Loading organisation details...</p>
              )}

              <div
                className={`${!selectedOrgId ? "opacity-50 pointer-events-none" : ""} space-y-6`}
              >
                {/* Organisation Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Organisation Name"
                    value={orgname}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="rounded-xl border px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div className="bg-gray-50 p-5 sm:p-6 rounded-xl border text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 mb-5">
                    Organisation Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Organisation Type
                      </label>

                      <select
                        value={orgType}
                        onChange={(e) => setOrgType(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                      >
                        <option value="">-- Select Organisation Type --</option>
                        <option value="HOSPITAL">HOSPITAL</option>
                        <option value="EVENT">EVENT</option>
                        <option value="APARTMENT">APARTMENT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-black-300 px-4 py-3
focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email-Id
                      </label>

                      <input
                        type="email"
                        placeholder="Organisation Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-black-300 px-4 py-3
focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Organisation Photo
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            setPhoto(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Address
                      </label>

                      <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-xl border border-black-300 px-4 py-3
focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Aadhar Number
                      </label>

                      <input
                        type="text"
                        placeholder="Aadhaar Number"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        className="w-full rounded-xl border border-black-300 px-4 py-3
focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        PAN number
                      </label>

                      <input
                        type="text"
                        placeholder="PAN Number"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                        className="w-full rounded-xl border border-black-300 px-4 py-3
focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Passport number
                      </label>

                      <input
                        type="text"
                        placeholder="Passport Number"
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        className="w-full rounded-xl border border-black-300 px-4 py-3
focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Registration Start Date
                      </label>

                      <input
                        type="date"
                        value={registrationStartDate}
                        onChange={(e) =>
                          setRegistrationStartDate(e.target.value)
                        }
                        className="w-full rounded-xl border border-black-300 px-4 py-3
focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Registration End Date
                      </label>

                      <input
                        type="date"
                        value={registrationEndDate}
                        onChange={(e) => setRegistrationEndDate(e.target.value)}
                        className="w-full rounded-xl border border-black-300 px-4 py-3
focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Status
                      </label>

                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-xl border px-4 py-3"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Admin Info */}
                <div className="bg-gray-50 p-5 sm:p-6 rounded-xl border">
                  <h3 className="text-lg font-semibold text-gray-800 mb-5">
                    Organisation Admin
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* <input
                      type="text"
                      placeholder="Admin Name"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                    /> */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Admin First name
                      </label>

                      <input
                        type="text"
                        placeholder="First Name"
                        value={adminFirstName}
                        onChange={(e) => setAdminFirstName(e.target.value)}
                        className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Admin Last name
                      </label>

                      <input
                        type="text"
                        placeholder="Last Name"
                        value={adminLastName}
                        onChange={(e) => setAdminLastName(e.target.value)}
                        className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Admin Email-Id
                      </label>

                      <input
                        type="email"
                        placeholder="admin@acme.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Admin Phone number
                      </label>

                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !selectedOrgId}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Organisation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateOrganisation;
