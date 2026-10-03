// import { useEffect, useState } from "react";
// import axios from "axios";
// import Alert from "../../../../components/Aleartmessage";

// type Organisation = {
//   id: number;
//   org_name: string;
// };

// type OrganisationDetails = {
//   id: number;
//   org_name: string;
//   org_type: string;
//   phone?: string;
//   email?: string;
//   address?: string;
//   aadhaar_number?: string;
//   pan_number?: string;
//   passport_number?: string;
//   registration_start_date?: string;
//   registration_end_date?: string;
//   status?: string;
//   is_active?: boolean;
//   photo_path?: string;
//   admin?: {
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//   };
// };

// type ApiResponse<T = any> = {
//   success: boolean;
//   message: string;
//   data?: T;
// };

// const UpdateOrganisation = () => {
//   const ADMIN_API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;

//   const [organisations, setOrganisations] = useState<Organisation[]>([]);
//   const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

//   const [orgname, setOrgName] = useState("");
//   const [orgType, setOrgType] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [aadhaarNumber, setAadhaarNumber] = useState("");
//   const [panNumber, setPanNumber] = useState("");
//   const [passportNumber, setPassportNumber] = useState("");
//   const [registrationStartDate, setRegistrationStartDate] = useState("");
//   const [registrationEndDate, setRegistrationEndDate] = useState("");
//   const [status, setStatus] = useState("active");
//   const [isActive, setIsActive] = useState(true);

//   const [photo, setPhoto] = useState<File | null>(null);
//   const [existingPhoto, setExistingPhoto] = useState("");
//   const [adminFirstName, setAdminFirstName] = useState("");
//   const [adminLastName, setAdminLastName] = useState("");
//   const [adminEmail, setAdminEmail] = useState("");
//   const [adminPhone, setAdminPhone] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [fetchingDetails, setFetchingDetails] = useState(false);

//   const [alert, setAlert] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const getFileName = (path: string) => {
//     return path.split(/[\\/]/).pop() || "";
//   };
//   // Fetch Organisations
//   useEffect(() => {
//     const fetchOrgs = async () => {
//       try {
//         const res = await axios.get<ApiResponse<Organisation[]>>(
//           `${ADMIN_API_BASE}/org-super-admin`,
//           { withCredentials: true },
//         );
//         if (res.data.success) setOrganisations(res.data.data || []);
//         console.log("ORG DETAILS:", res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch organisations");
//       }
//     };
//     fetchOrgs();
//   }, []);

//   // Fetch Organisation Details
//   const fetchOrganisationDetails = async (orgId: number) => {
//     try {
//       setFetchingDetails(true);
//       const res = await axios.get<ApiResponse<OrganisationDetails>>(
//         `${ADMIN_API_BASE}/org-super-admin/${orgId}`,
//         { withCredentials: true },
//       );

//       if (res.data.success && res.data.data)
//         if (res.data.success && res.data.data) {
//           console.log("ORG DETAILS:", res.data.data);
//           const org = res.data.data;
//           setExistingPhoto(getFileName(org.photo_path || ""));
//           setOrgName(org.org_name || "");
//           setOrgType(org.org_type || "");
//           setPhone(org.phone || "");
//           setEmail(org.email || "");
//           setAddress(org.address || "");
//           setAadhaarNumber(org.aadhaar_number || "");
//           setPanNumber(org.pan_number || "");
//           setPassportNumber(org.passport_number || "");

//           setRegistrationStartDate(
//             org.registration_start_date?.split("T")[0] || "",
//           );

//           setRegistrationEndDate(
//             org.registration_end_date?.split("T")[0] || "",
//           );

//           setStatus(org.status || "active");
//           setIsActive(org.is_active ?? true);

//           setAdminFirstName(org.admin?.first_name || "");
//           setAdminLastName(org.admin?.last_name || "");
//           setAdminEmail(org.admin?.email || "");
//           setAdminPhone(org.admin?.phone || "");
//         }
//     } catch (error) {
//       setAlert({
//         type: "error",
//         message: "Failed to load organisation details",
//       });
//     } finally {
//       setFetchingDetails(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!selectedOrgId) {
//       setAlert({
//         type: "error",
//         message: "Please select organisation",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       // const payload = {
//       //   org_name: orgname,
//       //   phone: phone,
//       //   email,
//       //   address,
//       //   aadhaar_number: aadhaarNumber,
//       //   pan_number: panNumber,
//       //   passport_number: passportNumber,
//       //   registration_start_date: registrationStartDate,
//       //   registration_end_date: registrationEndDate,
//       //   status,
//       //   is_active: isActive,

//       //   admin: {
//       //     first_name: adminFirstName,
//       //     last_name: adminLastName,
//       //     email: adminEmail,
//       //     phone: adminPhone,
//       //   },
//       // };

//       const formData = new FormData();

//       formData.append("org_name", orgname);
//       formData.append("org_type", orgType);
//       formData.append("phone", phone);
//       formData.append("email", email);
//       formData.append("address", address);
//       formData.append("aadhaar_number", aadhaarNumber);
//       formData.append("pan_number", panNumber);
//       formData.append("passport_number", passportNumber);
//       formData.append("registration_start_date", registrationStartDate);
//       formData.append("registration_end_date", registrationEndDate);
//       formData.append("status", status);
//       formData.append("is_active", String(isActive));

//       formData.append(
//         "admin",
//         JSON.stringify({
//           first_name: adminFirstName,
//           last_name: adminLastName,
//           email: adminEmail,
//           phone: adminPhone,
//         }),
//       );

//       if (photo) {
//         formData.append("photo", photo);
//       }

//       const res = await axios.put(
//         `${ADMIN_API_BASE}/org-super-admin/${selectedOrgId}`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       // const res = await axios.put<ApiResponse>(
//       //   `${ADMIN_API_BASE}/org-super-admin/${selectedOrgId}`,
//       //   payload,
//       //   {
//       //     withCredentials: true,
//       //   },
//       // );

//       setAlert({
//         type: res.data.success ? "success" : "error",
//         message:
//           res.data.message ||
//           (res.data.success
//             ? "Organisation updated successfully 🎉"
//             : "Update failed"),
//       });

//       if (res.data.success) {
//         setSelectedOrgId(null);

//         setOrgName("");
//         setPhone("");
//         setEmail("");
//         setAddress("");
//         setAadhaarNumber("");
//         setPanNumber("");
//         setPassportNumber("");
//         setRegistrationStartDate("");
//         setRegistrationEndDate("");
//         setStatus("active");
//         setIsActive(true);

//         setAdminFirstName("");
//         setAdminLastName("");
//         setAdminEmail("");
//         setAdminPhone("");

//         setTimeout(() => setAlert(null), 4000);
//       }
//     } catch (err: any) {
//       setAlert({
//         type: "error",
//         message:
//           err.response?.data?.message || "Server error. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <div className="max-w-5xl mx-auto p-6 text-gray-800">
//         {alert && (
//           <Alert
//             type={alert.type}
//             message={alert.message}
//             onClose={() => setAlert(null)}
//           />
//         )}


//           <div className="flex-1 w-full mx-auto">
//             <div className="w-full mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//                 Update Organisation
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-6 pb-8">
//                 {/* Select Organisation */}
//                 <div>
//                   <label className="block text-gray-700 font-semibold mb-2">
//                     Select Organisation
//                   </label>
//                   <select
//                     className="w-full border rounded-xl px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
//                     value={selectedOrgId ?? ""}
//                     onChange={(e) => {
//                       const orgId = Number(e.target.value);
//                       setSelectedOrgId(orgId);
//                       if (orgId) fetchOrganisationDetails(orgId);
//                     }}
//                   >
//                     <option value="">-- Select --</option>
//                     {organisations.map((org) => (
//                       <option key={org.id} value={org.id}>
//                         {org.org_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Form always visible, disable fields if no org selected */}
//                 {fetchingDetails && selectedOrgId && (
//                   <p>Loading organisation details...</p>
//                 )}

//                 <div
//                   className={`${!selectedOrgId ? "opacity-50 pointer-events-none" : ""} space-y-6`}
//                 >
//                   {/* Organisation Info */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Organisation Name"
//                       value={orgname}
//                       onChange={(e) => setOrgName(e.target.value)}
//                       className="rounded-xl border px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
//                     />
//                   </div>
//                   <div className="bg-gray-50 p-5 sm:p-6 rounded-xl border text-gray-700">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-5">
//                       Organisation Details
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Organisation Type
//                         </label>

//                         <select
//                           value={orgType}
//                           onChange={(e) => setOrgType(e.target.value)}
//                           className="w-full border rounded-xl px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
//                         >
//                           <option value="">
//                             -- Select Organisation Type --
//                           </option>
//                           <option value="HOSPITAL">HOSPITAL</option>
//                           <option value="EVENT">EVENT</option>
//                           <option value="APARTMENT">APARTMENT</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Phone Number
//                         </label>

//                         <input
//                           type="text"
//                           placeholder="Phone Number"
//                           value={phone}
//                           onChange={(e) => setPhone(e.target.value)}
//                           className="w-full rounded-xl border border-black-300 px-4 py-3
// focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Email-Id
//                         </label>

//                         <input
//                           type="email"
//                           placeholder="Organisation Email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           className="w-full rounded-xl border border-black-300 px-4 py-3
// focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <div>
//                           <label className="block text-gray-700 font-semibold mb-2">
//                             Organisation Photo
//                           </label>

//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => {
//                               if (e.target.files?.length) {
//                                 setPhoto(e.target.files[0]);
//                               }
//                             }}
//                           />

//                           {/* New selected image */}
//                           {photo ? (
//                             <div className="mt-3">
//                               <img
//                                 src={URL.createObjectURL(photo)}
//                                 alt="New Organisation"
//                                 className="w-32 h-32 object-cover rounded-xl border"
//                               />

//                               <p className="text-sm text-gray-500 mt-2">
//                                 {photo.name}
//                               </p>
//                             </div>
//                           ) : existingPhoto ? (
//                             /* Existing image */
//                             <div className="mt-3">
//                               <img
//                                 src={`${import.meta.env.VITE_BACKEND_URL}/auth-uploads/${existingPhoto}`}
//                                 alt="Organisation"
//                                 className="w-32 h-32 object-cover rounded-xl border"
//                               />

//                               {/* <p className="text-sm text-gray-500 mt-2">
//                               {existingPhoto}
//                             </p> */}
//                             </div>
//                           ) : (
//                             <p className="text-sm text-gray-500 mt-2">
//                               No organisation photo
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Address
//                         </label>

//                         <input
//                           type="text"
//                           placeholder="Address"
//                           value={address}
//                           onChange={(e) => setAddress(e.target.value)}
//                           className="w-full rounded-xl border border-black-300 px-4 py-3
// focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Aadhar Number
//                         </label>

//                         <input
//                           type="text"
//                           placeholder="Aadhaar Number"
//                           value={aadhaarNumber}
//                           onChange={(e) => setAadhaarNumber(e.target.value)}
//                           className="w-full rounded-xl border border-black-300 px-4 py-3
// focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           PAN number
//                         </label>

//                         <input
//                           type="text"
//                           placeholder="PAN Number"
//                           value={panNumber}
//                           onChange={(e) => setPanNumber(e.target.value)}
//                           className="w-full rounded-xl border border-black-300 px-4 py-3
// focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Passport number
//                         </label>

//                         <input
//                           type="text"
//                           placeholder="Passport Number"
//                           value={passportNumber}
//                           onChange={(e) => setPassportNumber(e.target.value)}
//                           className="w-full rounded-xl border border-black-300 px-4 py-3
// focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Registration Start Date
//                         </label>

//                         <input
//                           type="date"
//                           value={registrationStartDate}
//                           onChange={(e) =>
//                             setRegistrationStartDate(e.target.value)
//                           }
//                           className="w-full rounded-xl border border-black-300 px-4 py-3
// focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Registration End Date
//                         </label>

//                         <input
//                           type="date"
//                           value={registrationEndDate}
//                           onChange={(e) =>
//                             setRegistrationEndDate(e.target.value)
//                           }
//                           className="w-full rounded-xl border border-black-300 px-4 py-3
// focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Status
//                         </label>

//                         <select
//                           value={status}
//                           onChange={(e) => setStatus(e.target.value)}
//                           className="rounded-xl border px-4 py-3"
//                         >
//                           <option value="ACTIVE">Active</option>
//                           <option value="INACTIVE">Inactive</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Admin Info */}
//                   <div className="bg-gray-50 p-5 sm:p-6 rounded-xl border">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-5">
//                       Organisation Admin
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       {/* <input
//                       type="text"
//                       placeholder="Admin Name"
//                       value={adminName}
//                       onChange={(e) => setAdminName(e.target.value)}
//                       className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                     /> */}
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Admin First name
//                         </label>

//                         <input
//                           type="text"
//                           placeholder="First Name"
//                           value={adminFirstName}
//                           onChange={(e) => setAdminFirstName(e.target.value)}
//                           className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Admin Last name
//                         </label>

//                         <input
//                           type="text"
//                           placeholder="Last Name"
//                           value={adminLastName}
//                           onChange={(e) => setAdminLastName(e.target.value)}
//                           className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Admin Email-Id
//                         </label>

//                         <input
//                           type="email"
//                           placeholder="admin@acme.com"
//                           value={adminEmail}
//                           onChange={(e) => setAdminEmail(e.target.value)}
//                           className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 font-semibold mb-2">
//                           Admin Phone number
//                         </label>

//                         <input
//                           type="text"
//                           placeholder="Phone Number"
//                           value={adminPhone}
//                           onChange={(e) => setAdminPhone(e.target.value)}
//                           className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     disabled={loading || !selectedOrgId}
//                     className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
//                   >
//                     {loading ? "Updating..." : "Update Organisation"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
     
//     </>
//   );
// };

// export default UpdateOrganisation;



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
  photo_path?: string;
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

  const [status, setStatus] = useState("ACTIVE");
  const [isActive, setIsActive] = useState(true);

  const [photo, setPhoto] = useState<File | null>(null);
  const [existingPhoto, setExistingPhoto] = useState("");

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

  const getFileName = (path: string) => {
    return path.split(/[\\/]/).pop() || "";
  };

  // ================= FETCH ORGANISATIONS =================

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await axios.get<ApiResponse<Organisation[]>>(
          `${ADMIN_API_BASE}/org-super-admin`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          setOrganisations(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch organisations", err);

        setAlert({
          type: "error",
          message: "Failed to load organisations",
        });
      }
    };

    fetchOrgs();
  }, []);

  // ================= FETCH ORGANISATION DETAILS =================

  const fetchOrganisationDetails = async (orgId: number) => {
    try {
      setFetchingDetails(true);

      const res = await axios.get<ApiResponse<OrganisationDetails>>(
        `${ADMIN_API_BASE}/org-super-admin/${orgId}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success && res.data.data) {
        const org = res.data.data;

        console.log("ORG DETAILS:", org);

        setExistingPhoto(getFileName(org.photo_path || ""));

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

        setStatus(org.status || "ACTIVE");
        setIsActive(org.is_active ?? true);

        setAdminFirstName(org.admin?.first_name || "");
        setAdminLastName(org.admin?.last_name || "");
        setAdminEmail(org.admin?.email || "");
        setAdminPhone(org.admin?.phone || "");

        // Reset newly selected photo
        setPhoto(null);
      }
    } catch (error) {
      console.error(error);

      setAlert({
        type: "error",
        message: "Failed to load organisation details",
      });
    } finally {
      setFetchingDetails(false);
    }
  };

  // ================= SUBMIT =================

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

      const formData = new FormData();

      formData.append("org_name", orgname);
      formData.append("org_type", orgType);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("address", address);

      formData.append("aadhaar_number", aadhaarNumber);
      formData.append("pan_number", panNumber);
      formData.append("passport_number", passportNumber);

      formData.append(
        "registration_start_date",
        registrationStartDate,
      );

      formData.append(
        "registration_end_date",
        registrationEndDate,
      );

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

      setAlert({
        type: res.data.success ? "success" : "error",
        message:
          res.data.message ||
          (res.data.success
            ? "Organisation updated successfully"
            : "Update failed"),
      });

      if (res.data.success) {
        resetForm();

        setTimeout(() => {
          setAlert(null);
        }, 4000);
      }
    } catch (err: any) {
      console.error(err);

      setAlert({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Server error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================

  const resetForm = () => {
    setSelectedOrgId(null);

    setOrgName("");
    setOrgType("");
    setPhone("");
    setEmail("");
    setAddress("");

    setAadhaarNumber("");
    setPanNumber("");
    setPassportNumber("");

    setRegistrationStartDate("");
    setRegistrationEndDate("");

    setStatus("ACTIVE");
    setIsActive(true);

    setPhoto(null);
    setExistingPhoto("");

    setAdminFirstName("");
    setAdminLastName("");
    setAdminEmail("");
    setAdminPhone("");
  };

  // ================= UI =================

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 text-gray-800">
        {/* ALERT */}

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* MAIN CARD */}

        <div className="bg-white shadow rounded-2xl p-6 mb-8">
          {/* SELECT ORGANISATION */}

          <div className="flex flex-col mb-6">
            <label className="block mb-2 text-sm font-medium">
              Select Organisation
              <span className="text-red-500">*</span>
            </label>

            <select
              value={selectedOrgId ?? ""}
              onChange={(e) => {
                const orgId = Number(e.target.value);

                setSelectedOrgId(orgId || null);

                if (orgId) {
                  fetchOrganisationDetails(orgId);
                } else {
                  resetForm();
                }
              }}
              className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Organisation</option>

              {organisations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.org_name}
                </option>
              ))}
            </select>
          </div>

          {/* LOADING */}

          {fetchingDetails && (
            <div className="mb-5 text-sm text-blue-600">
              Loading organisation details...
            </div>
          )}

          {/* FORM */}

          <form onSubmit={handleSubmit}>
            <div
              className={!selectedOrgId ? "opacity-50 pointer-events-none" : ""}
            >
              {/* ================= ORGANISATION DETAILS ================= */}

              <div className="grid md:grid-cols-2 gap-4">
                {/* Organisation Name */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Organisation Name
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={orgname}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                    placeholder="Enter organisation name"
                  />
                </div>

                {/* Organisation Type */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Organisation Type
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="HOSPITAL">Hospital</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="EVENT">Event</option>
                  </select>
                </div>

                {/* Phone */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Phone Number
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      setPhone(value);
                    }}
                    maxLength={10}
                    inputMode="numeric"
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                    placeholder="9876543210"
                  />
                </div>

                {/* Email */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Email-Id
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                    placeholder="Enter email"
                  />
                </div>

                {/* Address */}

                <div className="md:col-span-2 flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Address
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                    placeholder="Enter address"
                  />
                </div>

                {/* Aadhaar */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Aadhaar Number
                  </label>

                  <input
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                    placeholder="Enter Aadhaar number (12 digits)"
                  />
                </div>

                {/* PAN */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    PAN Number
                  </label>

                  <input
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                    placeholder="ABCDE1234F"
                  />
                </div>

                {/* Passport */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Passport Number
                  </label>

                  <input
                    value={passportNumber}
                    onChange={(e) =>
                      setPassportNumber(e.target.value.toUpperCase())
                    }
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                    placeholder="A1234567"
                  />
                </div>

                {/* Registration Start */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Registration Start Date
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    value={registrationStartDate}
                    onChange={(e) => setRegistrationStartDate(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Registration End */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Registration End Date
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    value={registrationEndDate}
                    onChange={(e) => setRegistrationEndDate(e.target.value)}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Status */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
                    Status
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    value={status}
                    onChange={(e) => {
                      const value = e.target.value;

                      setStatus(value);
                      setIsActive(value === "ACTIVE");
                    }}
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>

                {/* Photo */}

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium">
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
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />

                  {/* New Photo */}

                  {photo ? (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="New Organisation"
                        className="w-32 h-32 object-cover rounded-xl border"
                      />

                      <p className="text-sm text-gray-500 mt-2">{photo.name}</p>
                    </div>
                  ) : existingPhoto ? (
                    <div className="mt-3">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/auth-uploads/${existingPhoto}`}
                        alt="Organisation"
                        className="w-32 h-32 object-cover rounded-xl border"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      No organisation photo
                    </p>
                  )}
                </div>
              </div>

              {/* ================= ADMIN ================= */}

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Organisation Admin
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* First Name */}

                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium">
                      Admin First Name
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={adminFirstName}
                      onChange={(e) => setAdminFirstName(e.target.value)}
                      className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                      placeholder="First Name"
                    />
                  </div>

                  {/* Last Name */}

                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium">
                      Admin Last Name
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={adminLastName}
                      onChange={(e) => setAdminLastName(e.target.value)}
                      className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                      placeholder="Last Name"
                    />
                  </div>

                  {/* Admin Phone */}

                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium">
                      Admin Phone Number
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="tel"
                      value={adminPhone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);

                        setAdminPhone(value);
                      }}
                      maxLength={10}
                      inputMode="numeric"
                      className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                      placeholder="9876543210"
                    />
                  </div>

                  {/* Admin Email */}

                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium">
                      Admin Email-Id
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* ================= SUBMIT ================= */}

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading || !selectedOrgId}
                  className={`w-full sm:w-auto px-6 py-2 rounded ${
                    loading || !selectedOrgId
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                  } transition`}
                >
                  {loading ? "Updating..." : "Update Organisation"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateOrganisation;

