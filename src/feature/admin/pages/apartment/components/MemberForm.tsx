// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Props {
//   mode: "add" | "edit";
//   member?: any;
//   onSuccess: () => void;
// }

// // const API = "/api/admin/apartment";
// const API = import.meta.env.VITE_BACKEND_URL;
// const initialState = {
//   security_user_id: "",
//   member_code: "",
//   first_name: "",
//   last_name: "",
//   gender: "MALE",
//   date_of_birth: "",
//   mobile_number: "",
//   alternate_mobile_number: "",
//   email: "",
//   profile_photo: "",
//   aadhaar_number: "",
//   occupation: "",
//   apartment_name: "",
//   block_tower: "",
//   floor_number: "",
//   flat_number: "",
//   ownership_type: "OWNER",
//   move_in_date: "",
//   family_member_count: 0,
//   emergency_contact_name: "",
//   emergency_contact_relationship: "",
//   emergency_contact_mobile: "",
//   member_type: "RESIDENT",
//   status: true,
// };

// const MemberForm = ({ mode, member, onSuccess }: Props) => {
//   const [form, setForm] = useState(initialState);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (member) {
//       setForm({
//         ...initialState,
//         ...member,
//         date_of_birth: member.date_of_birth?.split("T")[0] || "",
//         move_in_date: member.move_in_date?.split("T")[0] || "",
//       });
//     }
//   }, [member]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value, type } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
//     }));
//   };

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       if (mode === "add") {
//         // await axios.post(`${API}/api/admin/apartment/members`, form);
//         await axios.post(`${API}/api/admin/apartment/members`, form, {
//           withCredentials: true,
//         });
//       } else {
//         // await axios.put(
//         //   `${API}/api/admin/apartment/members/${member.id}`,
//         //   form,
//         // );
//         await axios.put(
//           `${API}/api/admin/apartment/members/${member.id}`,
//           form,
//           { withCredentials: true },
//         );
//       }

//       onSuccess();
//     } catch (err: any) {
//       alert(err?.response?.data?.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // return (
//   //   <form onSubmit={submit} className="bg-white rounded-xl shadow p-6">
//   //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//   //       <input
//   //         name="member_code"
//   //         value={form.member_code}
//   //         onChange={handleChange}
//   //         placeholder="Member Code"
//   //         className="border rounded-lg p-3"
//   //         required
//   //       />

//   //       <input
//   //         name="first_name"
//   //         value={form.first_name}
//   //         onChange={handleChange}
//   //         placeholder="First Name"
//   //         className="border rounded-lg p-3"
//   //         required
//   //       />

//   //       <input
//   //         name="last_name"
//   //         value={form.last_name}
//   //         onChange={handleChange}
//   //         placeholder="Last Name"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <select
//   //         name="gender"
//   //         value={form.gender}
//   //         onChange={handleChange}
//   //         className="border rounded-lg p-3"
//   //       >
//   //         <option>MALE</option>
//   //         <option>FEMALE</option>
//   //         <option>OTHER</option>
//   //       </select>

//   //       <input
//   //         type="date"
//   //         name="date_of_birth"
//   //         value={form.date_of_birth}
//   //         onChange={handleChange}
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="mobile_number"
//   //         value={form.mobile_number}
//   //         onChange={handleChange}
//   //         placeholder="Mobile Number"
//   //         className="border rounded-lg p-3"
//   //         required
//   //       />

//   //       <input
//   //         name="alternate_mobile_number"
//   //         value={form.alternate_mobile_number}
//   //         onChange={handleChange}
//   //         placeholder="Alternate Mobile"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="email"
//   //         value={form.email}
//   //         onChange={handleChange}
//   //         placeholder="Email"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="aadhaar_number"
//   //         value={form.aadhaar_number}
//   //         onChange={handleChange}
//   //         placeholder="Aadhaar"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="occupation"
//   //         value={form.occupation}
//   //         onChange={handleChange}
//   //         placeholder="Occupation"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="apartment_name"
//   //         value={form.apartment_name}
//   //         onChange={handleChange}
//   //         placeholder="Apartment Name"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="block_tower"
//   //         value={form.block_tower}
//   //         onChange={handleChange}
//   //         placeholder="Tower"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="floor_number"
//   //         value={form.floor_number}
//   //         onChange={handleChange}
//   //         placeholder="Floor"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="flat_number"
//   //         value={form.flat_number}
//   //         onChange={handleChange}
//   //         placeholder="Flat Number"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <select
//   //         name="ownership_type"
//   //         value={form.ownership_type}
//   //         onChange={handleChange}
//   //         className="border rounded-lg p-3"
//   //       >
//   //         <option>OWNER</option>
//   //         <option>TENANT</option>
//   //       </select>

//   //       <input
//   //         type="date"
//   //         name="move_in_date"
//   //         value={form.move_in_date}
//   //         onChange={handleChange}
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="emergency_contact_name"
//   //         value={form.emergency_contact_name}
//   //         onChange={handleChange}
//   //         placeholder="Emergency Contact"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="emergency_contact_relationship"
//   //         value={form.emergency_contact_relationship}
//   //         onChange={handleChange}
//   //         placeholder="Relationship"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <input
//   //         name="emergency_contact_mobile"
//   //         value={form.emergency_contact_mobile}
//   //         onChange={handleChange}
//   //         placeholder="Emergency Mobile"
//   //         className="border rounded-lg p-3"
//   //       />

//   //       <select
//   //         name="member_type"
//   //         value={form.member_type}
//   //         onChange={handleChange}
//   //         className="border rounded-lg p-3"
//   //       >
//   //         <option>RESIDENT</option>
//   //         <option>TENANT</option>
//   //       </select>

//   //       <select
//   //         name="status"
//   //         value={String(form.status)}
//   //         onChange={(e) =>
//   //           setForm({
//   //             ...form,
//   //             status: e.target.value === "true",
//   //           })
//   //         }
//   //         className="border rounded-lg p-3"
//   //       >
//   //         <option value="true">Active</option>
//   //         <option value="false">Inactive</option>
//   //       </select>
//   //     </div>

//   //     <div className="mt-8">
//   //       <button
//   //         disabled={loading}
//   //         className="bg-indigo-600 text-white px-8 py-3 rounded-lg"
//   //       >
//   //         {loading
//   //           ? "Saving..."
//   //           : mode === "add"
//   //             ? "Create Member"
//   //             : "Update Member"}
//   //       </button>
//   //     </div>
//   //   </form>
//   // );

//   return (
//     <form onSubmit={submit} className="bg-white rounded-xl shadow p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Member Code
//           </label>
//           <input
//             name="member_code"
//             value={form.member_code}
//             onChange={handleChange}
//             placeholder="Enter Member Code"
//             className="w-full border rounded-lg p-3"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             First Name
//           </label>
//           <input
//             name="first_name"
//             value={form.first_name}
//             onChange={handleChange}
//             placeholder="Enter First Name"
//             className="w-full border rounded-lg p-3"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Last Name
//           </label>
//           <input
//             name="last_name"
//             value={form.last_name}
//             onChange={handleChange}
//             placeholder="Enter Last Name"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Gender
//           </label>
//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//           >
//             <option>MALE</option>
//             <option>FEMALE</option>
//             <option>OTHER</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             name="date_of_birth"
//             value={form.date_of_birth}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Mobile Number
//           </label>
//           <input
//             name="mobile_number"
//             value={form.mobile_number}
//             onChange={handleChange}
//             placeholder="Enter Mobile Number"
//             className="w-full border rounded-lg p-3"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Alternate Mobile Number
//           </label>
//           <input
//             name="alternate_mobile_number"
//             value={form.alternate_mobile_number}
//             onChange={handleChange}
//             placeholder="Enter Alternate Mobile"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Enter Email"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Aadhaar Number
//           </label>
//           <input
//             name="aadhaar_number"
//             value={form.aadhaar_number}
//             onChange={handleChange}
//             placeholder="Enter Aadhaar Number"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Occupation
//           </label>
//           <input
//             name="occupation"
//             value={form.occupation}
//             onChange={handleChange}
//             placeholder="Enter Occupation"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Apartment Name
//           </label>
//           <input
//             name="apartment_name"
//             value={form.apartment_name}
//             onChange={handleChange}
//             placeholder="Enter Apartment Name"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Tower / Block
//           </label>
//           <input
//             name="block_tower"
//             value={form.block_tower}
//             onChange={handleChange}
//             placeholder="Enter Tower"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Floor Number
//           </label>
//           <input
//             name="floor_number"
//             value={form.floor_number}
//             onChange={handleChange}
//             placeholder="Enter Floor Number"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Flat Number
//           </label>
//           <input
//             name="flat_number"
//             value={form.flat_number}
//             onChange={handleChange}
//             placeholder="Enter Flat Number"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Ownership Type
//           </label>
//           <select
//             name="ownership_type"
//             value={form.ownership_type}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//           >
//             <option>OWNER</option>
//             <option>TENANT</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Move In Date
//           </label>
//           <input
//             type="date"
//             name="move_in_date"
//             value={form.move_in_date}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Emergency Contact Name
//           </label>
//           <input
//             name="emergency_contact_name"
//             value={form.emergency_contact_name}
//             onChange={handleChange}
//             placeholder="Enter Contact Name"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Relationship
//           </label>
//           <input
//             name="emergency_contact_relationship"
//             value={form.emergency_contact_relationship}
//             onChange={handleChange}
//             placeholder="Enter Relationship"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Emergency Contact Mobile
//           </label>
//           <input
//             name="emergency_contact_mobile"
//             value={form.emergency_contact_mobile}
//             onChange={handleChange}
//             placeholder="Enter Mobile Number"
//             className="w-full border rounded-lg p-3"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Member Type
//           </label>
//           <select
//             name="member_type"
//             value={form.member_type}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3"
//           >
//             <option>RESIDENT</option>
//             <option>TENANT</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Status
//           </label>
//           <select
//             name="status"
//             value={String(form.status)}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 status: e.target.value === "true",
//               })
//             }
//             className="w-full border rounded-lg p-3"
//           >
//             <option value="true">Active</option>
//             <option value="false">Inactive</option>
//           </select>
//         </div>
//       </div>

//       <div className="mt-8">
//         <button
//           disabled={loading}
//           className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {loading
//             ? "Saving..."
//             : mode === "add"
//               ? "Create Member"
//               : "Update Member"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MemberForm;

import { useEffect, useState } from "react";
import axios from "axios";

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
      });
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formElement = e.currentTarget as HTMLFormElement;

    // Browser validation
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    // Additional validation
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
          { withCredentials: true },
        );
      }

      onSuccess();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Member Code <span className="text-red-500">*</span>
          </label>
          <input
            name="member_code"
            value={form.member_code}
            onChange={handleChange}
            placeholder="Enter Member Code"
            className="w-full border rounded-lg p-3"
            required
            minLength={1}
            maxLength={50}
            pattern="^[A-Za-z0-9_-]+$"
            title="Member Code is required and can contain only letters, numbers, underscore and hyphen."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="Enter First Name"
            className="w-full border rounded-lg p-3"
            required
            minLength={2}
            maxLength={50}
            pattern="^[A-Za-z\s]+$"
            title="First Name should contain only letters and spaces."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Enter Last Name"
            className="w-full border rounded-lg p-3"
            required
            minLength={2}
            maxLength={50}
            pattern="^[A-Za-z\s]+$"
            title="Last Name should contain only letters and spaces."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile_number"
            value={form.mobile_number}
            onChange={handleChange}
            placeholder="Enter 10 Digit Mobile Number"
            className="w-full border rounded-lg p-3"
            required
            inputMode="numeric"
            maxLength={10}
            pattern="[0-9]{10}"
            title="Mobile Number must contain exactly 10 digits."
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/\D/g, "")
                .slice(0, 10);
            }}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Alternate Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="alternate_mobile_number"
            value={form.alternate_mobile_number}
            onChange={handleChange}
            placeholder="Enter 10 Digit Alternate Mobile"
            className="w-full border rounded-lg p-3"
            required
            inputMode="numeric"
            maxLength={10}
            pattern="[0-9]{10}"
            title="Alternate Mobile Number must contain exactly 10 digits."
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/\D/g, "")
                .slice(0, 10);
            }}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full border rounded-lg p-3"
            required
            maxLength={100}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Aadhaar Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="aadhaar_number"
            value={form.aadhaar_number}
            onChange={handleChange}
            placeholder="Enter 12 Digit Aadhaar Number"
            className="w-full border rounded-lg p-3"
            required
            inputMode="numeric"
            maxLength={12}
            pattern="[0-9]{12}"
            title="Aadhaar Number must contain exactly 12 digits."
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/\D/g, "")
                .slice(0, 12);
            }}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Occupation <span className="text-red-500">*</span>
          </label>
          <input
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            placeholder="Enter Occupation"
            className="w-full border rounded-lg p-3"
            required
            minLength={2}
            maxLength={100}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Apartment Name <span className="text-red-500">*</span>
          </label>
          <input
            name="apartment_name"
            value={form.apartment_name}
            onChange={handleChange}
            placeholder="Enter Apartment Name"
            className="w-full border rounded-lg p-3"
            required
            minLength={2}
            maxLength={100}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tower / Block <span className="text-red-500">*</span>
          </label>
          <input
            name="block_tower"
            value={form.block_tower}
            onChange={handleChange}
            placeholder="Enter Tower"
            className="w-full border rounded-lg p-3"
            required
            maxLength={50}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Floor Number <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="floor_number"
            value={form.floor_number}
            onChange={handleChange}
            placeholder="Enter Floor Number"
            className="w-full border rounded-lg p-3"
            required
            min={0}
            max={200}
            step={1}
            inputMode="numeric"
            title="Please enter a valid floor number."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Flat Number <span className="text-red-500">*</span>
          </label>
          <input
            name="flat_number"
            value={form.flat_number}
            onChange={handleChange}
            placeholder="Enter Flat Number"
            className="w-full border rounded-lg p-3"
            required
            maxLength={20}
            pattern="^[A-Za-z0-9/-]+$"
            title="Flat Number can contain letters, numbers, slash and hyphen."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Ownership Type <span className="text-red-500">*</span>
          </label>
          <select
            name="ownership_type"
            value={form.ownership_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="OWNER">OWNER</option>
            <option value="TENANT">TENANT</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Move In Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="move_in_date"
            value={form.move_in_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Family Member Count <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="family_member_count"
            value={
              form.family_member_count === 0 ? "" : form.family_member_count
            }
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setForm({
                ...form,
                family_member_count: value,
              });
            }}
            placeholder="Enter Family Member Count"
            className="w-full border rounded-lg p-3"
            required
            inputMode="numeric"
            pattern="[0-9]+"
            title="Please enter a valid family member count."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Emergency Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            name="emergency_contact_name"
            value={form.emergency_contact_name}
            onChange={handleChange}
            placeholder="Enter Contact Name"
            className="w-full border rounded-lg p-3"
            required
            minLength={2}
            maxLength={100}
            pattern="^[A-Za-z\s]+$"
            title="Emergency Contact Name should contain only letters and spaces."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Relationship <span className="text-red-500">*</span>
          </label>
          <input
            name="emergency_contact_relationship"
            value={form.emergency_contact_relationship}
            onChange={handleChange}
            placeholder="Enter Relationship"
            className="w-full border rounded-lg p-3"
            required
            minLength={2}
            maxLength={50}
            pattern="^[A-Za-z\s]+$"
            title="Relationship should contain only letters and spaces."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Emergency Contact Mobile <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="emergency_contact_mobile"
            value={form.emergency_contact_mobile}
            onChange={handleChange}
            placeholder="Enter 10 Digit Mobile Number"
            className="w-full border rounded-lg p-3"
            required
            inputMode="numeric"
            maxLength={10}
            pattern="[0-9]{10}"
            title="Emergency Contact Mobile must contain exactly 10 digits."
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/\D/g, "")
                .slice(0, 10);
            }}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Member Type <span className="text-red-500">*</span>
          </label>
          <select
            name="member_type"
            value={form.member_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="RESIDENT">RESIDENT</option>
            <option value="TENANT">TENANT</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={String(form.status)}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value === "true",
              })
            }
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <button
          disabled={loading}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : mode === "add"
              ? "Create Member"
              : "Update Member"}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;