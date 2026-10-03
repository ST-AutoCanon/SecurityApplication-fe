// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../../../../context/AuthContext";
// import { RefreshCw, Power, Trash2, Edit } from "lucide-react";
// import Alert from "../../../../../components/Aleartmessage";

// const API = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

// interface SecurityUser {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   role: string;
//   is_active: boolean;
// }

// export default function SecurityUsers() {
//   const { user } = useContext(AuthContext);

//   const isEventOrg = user?.org_type?.toUpperCase() === "EVENT";

//   const [users, setUsers] = useState<SecurityUser[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [editingUser, setEditingUser] = useState<SecurityUser | null>(null);

//   const [editForm, setEditForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     is_active: true,
//   });

//   // Alert state
//   const [alert, setAlert] = useState<{
//     type: "success" | "warning" | "error";
//     message: string;
//     confirm?: boolean;
//     onConfirm?: () => void;
//     confirmText?: string;
//     cancelText?: string;
//   } | null>(null);

//   const showAlert = (
//     type: "success" | "warning" | "error",
//     message: string,
//   ) => {
//     setAlert({
//       type,
//       message,
//     });
//   };

//   const showConfirm = (
//     message: string,
//     onConfirm: () => void,
//     confirmText = "Yes",
//   ) => {
//     setAlert({
//       type: "warning",
//       message,
//       confirm: true,
//       onConfirm: () => {
//         setAlert(null);
//         onConfirm();
//       },
//       confirmText,
//       cancelText: "No",
//     });
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(`${API}/security`, {
//         withCredentials: true,
//       });

//       setUsers(res.data.data || []);
//     } catch (err: any) {
//       showAlert(
//         "error",
//         err?.response?.data?.message || "Failed to fetch users",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleEdit = (user: SecurityUser) => {
//     setEditingUser(user);

//     setEditForm({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       phone: user.phone,
//       is_active: user.is_active,
//     });
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!editingUser) return;

//     try {
//       const res = await axios.put(
//         `${API}/security/${editingUser.id}`,
//         editForm,
//         {
//           withCredentials: true,
//         },
//       );

//       setEditingUser(null);

//       showAlert("success", res.data.message);

//       fetchUsers();
//     } catch (err: any) {
//       showAlert(
//         "error",
//         err?.response?.data?.message || "Update failed",
//       );
//     }
//   };

//   const handleDeactivate = (id: string) => {
//     showConfirm(
//       "Are you sure you want to deactivate this user?",
//       () => confirmDeactivate(id),
//       "Deactivate",
//     );
//   };

//   const confirmDeactivate = async (id: string) => {
//     try {
//       const res = await axios.patch(
//         `${API}/security/${id}/deactivate`,
//         {},
//         {
//           withCredentials: true,
//         },
//       );

//       showAlert("success", res.data.message);

//       fetchUsers();
//     } catch (err: any) {
//       showAlert(
//         "error",
//         err?.response?.data?.message || "Deactivate failed",
//       );
//     }
//   };

//   const handleActivate = (id: string) => {
//     showConfirm(
//       "Are you sure you want to activate this user?",
//       () => confirmActivate(id),
//       "Activate",
//     );
//   };

//   const confirmActivate = async (id: string) => {
//     try {
//       const res = await axios.patch(
//         `${API}/security/${id}/activate`,
//         {},
//         {
//           withCredentials: true,
//         },
//       );

//       showAlert("success", res.data.message);

//       fetchUsers();
//     } catch (err: any) {
//       showAlert(
//         "error",
//         err?.response?.data?.message || "Activate failed",
//       );
//     }
//   };

//   const handleDelete = (id: string) => {
//     showConfirm(
//       "Are you sure you want to delete this user?",
//       () => confirmDelete(id),
//       "Delete",
//     );
//   };

//   const confirmDelete = async (id: string) => {
//     try {
//       const res = await axios.delete(`${API}/security/${id}`, {
//         withCredentials: true,
//       });

//       showAlert("success", res.data.message);

//       fetchUsers();
//     } catch (err: any) {
//       showAlert(
//         "error",
//         err?.response?.data?.message || "Delete failed",
//       );
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">
//             {isEventOrg ? "Organisers" : "Security Users"}
//           </h1>

//           <button
//             onClick={fetchUsers}
//             title="Refresh"
//             aria-label="Refresh users"
//             className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
//           >
//             <RefreshCw size={18} />
//             <span>Refresh</span>
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center py-10 text-lg">Loading...</div>
//         ) : users.length === 0 ? (
//           <div className="text-center py-10 text-gray-500">
//             No {isEventOrg ? "organisers" : "security users"} found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-4 py-3">First Name</th>
//                   <th className="border px-4 py-3">Last Name</th>
//                   <th className="border px-4 py-3">Email</th>
//                   <th className="border px-4 py-3">Phone</th>
//                   <th className="border px-4 py-3">Status</th>
//                   <th className="border px-4 py-3">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="border px-4 py-3">
//                       {item.first_name}
//                     </td>

//                     <td className="border px-4 py-3">
//                       {item.last_name || "-"}
//                     </td>

//                     <td className="border px-4 py-3">
//                       {item.email}
//                     </td>

//                     <td className="border px-4 py-3">
//                       {item.phone || "-"}
//                     </td>

//                     <td className="border px-4 py-3 text-center">
//                       {item.is_active ? (
//                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
//                           Active
//                         </span>
//                       ) : (
//                         <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
//                           Inactive
//                         </span>
//                       )}
//                     </td>

//                     <td className="border px-4 py-3">
//                       <div className="flex justify-center items-center gap-2">
//                         {/* Edit */}
//                         <button
//                           onClick={() => handleEdit(item)}
//                           title="Edit"
//                           aria-label="Edit"
//                           className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
//                         >
//                           <Edit size={17} />
//                         </button>

//                         {/* Activate / Deactivate */}
//                         {item.is_active ? (
//                           <button
//                             onClick={() =>
//                               handleDeactivate(item.id)
//                             }
//                             title="Deactivate"
//                             aria-label="Deactivate"
//                             className="p-2 rounded-lg text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
//                           >
//                             <Power size={17} />
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() =>
//                               handleActivate(item.id)
//                             }
//                             title="Activate"
//                             aria-label="Activate"
//                             className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
//                           >
//                             <Power size={17} />
//                           </button>
//                         )}

//                         {/* Delete */}
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           title="Delete"
//                           aria-label="Delete"
//                           className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
//                         >
//                           <Trash2 size={17} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {editingUser && (
//           <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//             <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
//               <h2 className="text-2xl font-bold mb-6">
//                 Update {isEventOrg ? "Organiser" : "Security"} User
//               </h2>

//               <form
//                 onSubmit={handleUpdate}
//                 className="space-y-4"
//               >
//                 <div>
//                   <label className="block mb-2 font-medium">
//                     First Name
//                   </label>

//                   <input
//                     type="text"
//                     value={editForm.first_name}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         first_name: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-lg p-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Last Name
//                   </label>

//                   <input
//                     type="text"
//                     value={editForm.last_name}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         last_name: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-lg p-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Email
//                   </label>

//                   <input
//                     type="email"
//                     value={editForm.email}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         email: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-lg p-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Phone
//                   </label>

//                   <input
//                     type="text"
//                     value={editForm.phone}
//                     onChange={(e) =>
//                       setEditForm({
//                         ...editForm,
//                         phone: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-lg p-3"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setEditingUser(null)}
//                     className="px-5 py-2 rounded-lg border"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
//                   >
//                     Update User
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Custom Alert / Confirmation Popup */}
//         {alert && (
//           <Alert
//             type={alert.type}
//             message={alert.message}
//             confirm={alert.confirm}
//             onClose={() => setAlert(null)}
//             onConfirm={alert.onConfirm}
//             confirmText={alert.confirmText}
//             cancelText={alert.cancelText}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../context/AuthContext";
import {
  RefreshCw,
  Power,
  Trash2,
  Edit,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import Alert from "../../../../../components/Aleartmessage";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

interface SecurityUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
}

export default function SecurityUsers() {
  const { user } = useContext(AuthContext);

  const isEventOrg = user?.org_type?.toUpperCase() === "EVENT";

  const [users, setUsers] = useState<SecurityUser[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingUser, setEditingUser] = useState<SecurityUser | null>(null);

  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    is_active: true,
  });

  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
    confirm?: boolean;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  } | null>(null);

  const showAlert = (
    type: "success" | "warning" | "error",
    message: string,
  ) => {
    setAlert({
      type,
      message,
    });
  };

  const showConfirm = (
    message: string,
    onConfirm: () => void,
    confirmText = "Yes",
  ) => {
    setAlert({
      type: "warning",
      message,
      confirm: true,
      onConfirm: () => {
        setAlert(null);
        onConfirm();
      },
      confirmText,
      cancelText: "No",
    });
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/security`, {
        withCredentials: true,
      });

      setUsers(res.data.data || []);
    } catch (err: any) {
      showAlert(
        "error",
        err?.response?.data?.message || "Failed to fetch users",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: SecurityUser) => {
    setEditingUser(user);

    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      is_active: user.is_active,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      const res = await axios.put(
        `${API}/security/${editingUser.id}`,
        editForm,
        {
          withCredentials: true,
        },
      );

      setEditingUser(null);

      showAlert("success", res.data.message);

      fetchUsers();
    } catch (err: any) {
      showAlert("error", err?.response?.data?.message || "Update failed");
    }
  };

  const handleDeactivate = (id: string) => {
    showConfirm(
      "Are you sure you want to deactivate this user?",
      () => confirmDeactivate(id),
      "Deactivate",
    );
  };

  const confirmDeactivate = async (id: string) => {
    try {
      const res = await axios.patch(
        `${API}/security/${id}/deactivate`,
        {},
        {
          withCredentials: true,
        },
      );

      showAlert("success", res.data.message);

      fetchUsers();
    } catch (err: any) {
      showAlert("error", err?.response?.data?.message || "Deactivate failed");
    }
  };

  const handleActivate = (id: string) => {
    showConfirm(
      "Are you sure you want to activate this user?",
      () => confirmActivate(id),
      "Activate",
    );
  };

  const confirmActivate = async (id: string) => {
    try {
      const res = await axios.patch(
        `${API}/security/${id}/activate`,
        {},
        {
          withCredentials: true,
        },
      );

      showAlert("success", res.data.message);

      fetchUsers();
    } catch (err: any) {
      showAlert("error", err?.response?.data?.message || "Activate failed");
    }
  };

  const handleDelete = (id: string) => {
    showConfirm(
      "Are you sure you want to delete this user?",
      () => confirmDelete(id),
      "Delete",
    );
  };

  const confirmDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${API}/security/${id}`, {
        withCredentials: true,
      });

      showAlert("success", res.data.message);

      fetchUsers();
    } catch (err: any) {
      showAlert("error", err?.response?.data?.message || "Delete failed");
    }
  };

  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 " +
    "placeholder-gray-400 focus:outline-none focus:border-blue-500 " +
    "focus:ring-0";

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isEventOrg ? "Organisers" : "Security Users"}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage {isEventOrg ? "organisers" : "security users"} and their
                account status.
              </p>
            </div>

            <button
              onClick={fetchUsers}
              title="Refresh"
              aria-label="Refresh users"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors font-medium"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <RefreshCw size={30} className="text-blue-600 animate-spin mb-3" />
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <UserRound size={26} className="text-gray-400" />
            </div>

            <p className="text-gray-600 font-medium">
              No {isEventOrg ? "organisers" : "security users"} found.
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Users will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <UserRound size={19} />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.first_name} {item.last_name}
                          </p>

                          {item.role && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail
                          size={16}
                          className="text-gray-400 flex-shrink-0"
                        />

                        <span className="text-sm">{item.email}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone
                          size={16}
                          className="text-gray-400 flex-shrink-0"
                        />

                        <span className="text-sm">{item.phone || "-"}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      {item.is_active ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(item)}
                          title="Edit"
                          aria-label="Edit"
                          className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                          <Edit size={17} />
                        </button>

                        {/* Activate / Deactivate */}
                        {item.is_active ? (
                          <button
                            onClick={() => handleDeactivate(item.id)}
                            title="Deactivate"
                            aria-label="Deactivate"
                            className="p-2 rounded-lg text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
                          >
                            <Power size={17} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(item.id)}
                            title="Activate"
                            aria-label="Activate"
                            className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                          >
                            <Power size={17} />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                          aria-label="Delete"
                          className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={17} />
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

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Update {isEventOrg ? "Organiser" : "Security"} User
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Update the user's account information.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name
                </label>

                <input
                  type="text"
                  value={editForm.first_name}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      first_name: e.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Last Name
                </label>

                <input
                  type="text"
                  value={editForm.last_name}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      last_name: e.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      email: e.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      phone: e.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Enter phone number"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  // className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  className="mt-4 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  // className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl text-white font-medium"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Alert / Confirmation Popup */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          confirm={alert.confirm}
          onClose={() => setAlert(null)}
          onConfirm={alert.onConfirm}
          confirmText={alert.confirmText}
          cancelText={alert.cancelText}
        />
      )}
    </div>
  );
}