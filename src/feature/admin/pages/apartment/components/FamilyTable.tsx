// import { useState } from "react";
// import axios from "axios";
// import Alert from "../../../../../components/Aleartmessage";

// interface Props {
//   memberId: number;
//   family: any[];
//   reload: () => void;
//   onSuccess: (message: string) => void;
// }

// const API = import.meta.env.VITE_BACKEND_URL;

// const FamilyTable = ({ memberId, family, reload, onSuccess }: Props) => {
//   const [form, setForm] = useState({
//     name: "",
//     relationship: "",
//     age: "",
//     mobile_number: "",
//   });

//   const [editingId, setEditingId] = useState<number | null>(null);

//   // Delete confirmation
//   const [deleteId, setDeleteId] = useState<number | null>(null);

//   // Error alert
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const reset = () => {
//     setForm({
//       name: "",
//       relationship: "",
//       age: "",
//       mobile_number: "",
//     });

//     setEditingId(null);
//   };

//   const save = async () => {
//     // Validate required fields
//     if (
//       !form.name.trim() ||
//       !form.relationship.trim() ||
//       !form.age.trim() ||
//       !form.mobile_number.trim()
//     ) {
//       setErrorMessage("Please fill in all family member details");
//       return;
//     }

//     try {
//       if (editingId) {
//         // Update family member
//         await axios.put(
//           `${API}/api/admin/apartment/family/${editingId}`,
//           form,
//           {
//             withCredentials: true,
//           },
//         );

//         reset();
//         await reload();

//         onSuccess("Family member updated successfully!");
//       } else {
//         // Add family member
//         await axios.post(
//           `${API}/api/admin/apartment/family`,
//           {
//             member_id: memberId,
//             ...form,
//           },
//           {
//             withCredentials: true,
//           },
//         );

//         reset();
//         await reload();

//         onSuccess("Family member added successfully!");
//       }
//     } catch (err: any) {
//       setErrorMessage(
//         err?.response?.data?.message || "Failed to save family member",
//       );
//     }
//   };

//   const edit = (item: any) => {
//     setEditingId(item.id);

//     setForm({
//       name: item.name,
//       relationship: item.relationship,
//       age: item.age,
//       mobile_number: item.mobile_number,
//     });
//   };

//   const remove = async () => {
//     if (!deleteId) return;

//     try {
//       await axios.delete(
//         `${API}/api/admin/apartment/family/${deleteId}/member/${memberId}`,
//         {
//           withCredentials: true,
//         },
//       );

//       setDeleteId(null);

//       await reload();

//       onSuccess("Family member deleted successfully!");
//     } catch (err: any) {
//       setDeleteId(null);

//       setErrorMessage(
//         err?.response?.data?.message || "Failed to delete family member",
//       );
//     }
//   };

//   // Common input class
//   const inputClass = `w-full h-11 rounded-lg border px-3 focus:outline-none focus:border-blue-500 ${
//     editingId ? "border-blue-500" : "border-gray-300"
//   }`;

//   return (
//     <div>
//       {/* Delete Confirmation Popup */}
//       {deleteId && (
//         <Alert
//           type="warning"
//           message="Are you sure you want to delete this family member?"
//           confirm={true}
//           confirmText="Yes"
//           cancelText="No"
//           onConfirm={remove}
//           onClose={() => setDeleteId(null)}
//         />
//       )}

//       {/* Error Popup */}
//       {errorMessage && (
//         <Alert
//           type="error"
//           message={errorMessage}
//           onClose={() => setErrorMessage(null)}
//         />
//       )}

//       {/* Family Member Form */}
//       <div className="grid md:grid-cols-4 gap-3 mb-5">
//         <input
//           type="text"
//           className={inputClass}
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               name: e.target.value,
//             })
//           }
//         />

//         <input
//           type="text"
//           className={inputClass}
//           placeholder="Relationship"
//           value={form.relationship}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               relationship: e.target.value,
//             })
//           }
//         />

//         <input
//           type="number"
//           className={inputClass}
//           placeholder="Age"
//           value={form.age}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               age: e.target.value,
//             })
//           }
//         />

//         <input
//           type="text"
//           className={inputClass}
//           placeholder="Mobile"
//           value={form.mobile_number}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               mobile_number: e.target.value,
//             })
//           }
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-3 mb-6">
//         <button
//           onClick={save}
//           className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 hover:from-blue-700 hover:to-blue-600 transition"
//         >
//           {editingId ? (
//             "Update"
//           ) : (
//             <>
//               <span className="text-xl leading-none">+</span>
//               Add
//             </>
//           )}
//         </button>

//         {editingId && (
//           <button
//             onClick={reset}
//             className="mt-4 bg-gray-500 px-6 py-3 rounded-xl text-white font-medium hover:bg-gray-600 transition"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       {/* Family Members Table */}
//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Relationship</th>
//             <th className="p-3 text-left">Age</th>
//             <th className="p-3 text-left">Mobile</th>
//             <th className="p-3 text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {family.map((item) => (
//             <tr key={item.id} className="border-t">
//               <td className="p-3">{item.name}</td>
//               <td className="p-3">{item.relationship}</td>
//               <td className="p-3">{item.age}</td>
//               <td className="p-3">{item.mobile_number}</td>

//               <td className="p-3 text-center space-x-2">
//                 <button
//                   onClick={() => edit(item)}
//                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => setDeleteId(item.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}

//           {family.length === 0 && (
//             <tr>
//               <td colSpan={5} className="text-center py-6 text-gray-500">
//                 No family members
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FamilyTable;

import { useState } from "react";
import axios from "axios";
import { Edit, Plus, Trash2, Users, X } from "lucide-react";

import Alert from "../../../../../components/Aleartmessage";

interface Props {
  memberId: number;
  family: any[];
  reload: () => void;
  onSuccess: (message: string) => void;
}

const API = import.meta.env.VITE_BACKEND_URL;

const FamilyTable = ({ memberId, family, reload, onSuccess }: Props) => {
  const [form, setForm] = useState({
    name: "",
    relationship: "",
    age: "",
    mobile_number: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ----------------------------------------
     Reset Form
  ----------------------------------------- */
  const reset = () => {
    setForm({
      name: "",
      relationship: "",
      age: "",
      mobile_number: "",
    });

    setEditingId(null);
  };

  /* ----------------------------------------
     Save / Update Family Member
  ----------------------------------------- */
  const save = async () => {
    if (
      !form.name.trim() ||
      !form.relationship.trim() ||
      !form.age.trim() ||
      !form.mobile_number.trim()
    ) {
      setErrorMessage("Please fill in all family member details");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API}/api/admin/apartment/family/${editingId}`,
          form,
          {
            withCredentials: true,
          },
        );

        reset();
        await reload();

        onSuccess("Family member updated successfully!");
      } else {
        await axios.post(
          `${API}/api/admin/apartment/family`,
          {
            member_id: memberId,
            ...form,
          },
          {
            withCredentials: true,
          },
        );

        reset();
        await reload();

        onSuccess("Family member added successfully!");
      }
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message || "Failed to save family member",
      );
    }
  };

  /* ----------------------------------------
     Edit Family Member
  ----------------------------------------- */
  const edit = (item: any) => {
    setEditingId(item.id);

    setForm({
      name: item.name || "",
      relationship: item.relationship || "",
      age: item.age?.toString() || "",
      mobile_number: item.mobile_number || "",
    });
  };

  /* ----------------------------------------
     Delete Family Member
  ----------------------------------------- */
  const remove = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(
        `${API}/api/admin/apartment/family/${deleteId}/member/${memberId}`,
        {
          withCredentials: true,
        },
      );

      setDeleteId(null);

      await reload();

      onSuccess("Family member deleted successfully!");
    } catch (err: any) {
      setDeleteId(null);

      setErrorMessage(
        err?.response?.data?.message || "Failed to delete family member",
      );
    }
  };

  /* ----------------------------------------
     Input Style
  ----------------------------------------- */
  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed";

  return (
    <div>
      {/* ----------------------------------------
          Delete Confirmation
      ----------------------------------------- */}
      {deleteId && (
        <Alert
          type="warning"
          message="Are you sure you want to delete this family member?"
          confirm={true}
          confirmText="Yes"
          cancelText="No"
          onConfirm={remove}
          onClose={() => setDeleteId(null)}
        />
      )}

      {/* ----------------------------------------
          Error Alert
      ----------------------------------------- */}
      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      {/* ----------------------------------------
          Section Header
      ----------------------------------------- */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Users size={17} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {editingId ? "Edit Family Member" : "Add Family Member"}
          </h3>

          <p className="text-xs text-gray-500 mt-0.5">
            {editingId
              ? "Update the family member information below."
              : "Add a family member associated with this apartment."}
          </p>
        </div>
      </div>

      {/* ----------------------------------------
          Family Member Form
      ----------------------------------------- */}
      <div
        className={`rounded-xl border p-5 md:p-6 transition-colors ${
          editingId
            ? "border-blue-200 bg-blue-50/30"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              className={inputClass}
              placeholder="Enter name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Relationship
            </label>

            <input
              type="text"
              className={inputClass}
              placeholder="Enter relationship"
              value={form.relationship}
              onChange={(e) =>
                setForm({
                  ...form,
                  relationship: e.target.value,
                })
              }
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Age
            </label>

            <input
              type="number"
              min="0"
              className={inputClass}
              placeholder="Enter age"
              value={form.age}
              onChange={(e) =>
                setForm({
                  ...form,
                  age: e.target.value,
                })
              }
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Mobile Number
            </label>

            <input
              type="text"
              className={inputClass}
              placeholder="Enter mobile number"
              value={form.mobile_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile_number: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {editingId ? (
              <>
                <Edit size={17} />
                Update Family Member
              </>
            ) : (
              <>
                <Plus size={18} />
                Add Family Member
              </>
            )}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <X size={17} />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ----------------------------------------
          Family Members Table
      ----------------------------------------- */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Family Members List
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              {family.length}{" "}
              {family.length === 1 ? "family member" : "family members"}{" "}
              registered
            </p>
          </div>
        </div>

        {family.length === 0 ? (
          <div className="border border-gray-200 rounded-xl bg-gray-50/50">
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Users size={22} />
              </div>

              <h4 className="text-sm font-semibold text-gray-900">
                No Family Members
              </h4>

              <p className="text-xs text-gray-500 mt-1">
                No family members have been added yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Name
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Relationship
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Age
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Mobile
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {family.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {item.name || "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {item.relationship || "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {item.age ?? "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {item.mobile_number || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => edit(item)}
                          title="Edit family member"
                          className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          <Edit size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteId(item.id)}
                          title="Delete family member"
                          className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={15} />
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
      </div>
    </div>
  );
};

export default FamilyTable;