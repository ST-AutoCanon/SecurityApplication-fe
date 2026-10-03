// import { useEffect, useState } from "react";
// import axios from "axios";
// import Alert from "../../../../components/Aleartmessage";
// import { X } from "lucide-react";

// type Organisation = {
//   id: number;
//   org_name: string;
// };

// type ApiResponse<T = any> = {
//   success: boolean;
//   message?: string;
//   data?: T;
// };

// const DeleteOrganisation = () => {
//   const ADMIN_API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;

//   const [organisations, setOrganisations] = useState<Organisation[]>([]);
//   const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [alert, setAlert] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const fetchOrganisations = async () => {
//     try {
//       const res = await axios.get<ApiResponse<Organisation[]>>(
//         `${ADMIN_API_BASE}/org-super-admin`,
//         { withCredentials: true },
//       );

//       if (res.data.success) {
//         setOrganisations(res.data.data || []);
//       }
//     } catch (error) {
//       console.error("Failed to fetch organisations", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrganisations();
//   }, []);

//   const handleDelete = async () => {
//     if (!selectedOrgId) {
//       setAlert({
//         type: "error",
//         message: "Please select an organisation",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.delete<ApiResponse>(
//         `${ADMIN_API_BASE}/org-super-admin/${selectedOrgId}`,
//         {
//           withCredentials: true,
//         },
//       );

//       if (res.data.success) {
//         setAlert({
//           type: "success",
//           message: res.data.message || "Organisation deleted successfully",
//         });

//         setSelectedOrgId(null);

//         setOrganisations((prev) =>
//           prev.filter((org) => org.id !== selectedOrgId),
//         );
//       } else {
//         setAlert({
//           type: "error",
//           message: res.data.message || "Delete failed",
//         });
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
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => setAlert(null)}
//         />
//       )}

//       {showConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="mx-4 w-full max-w-sm rounded-lg bg-white shadow-lg">
//             <div className="flex items-center justify-between bg-red-600 px-4 py-3 text-white">
//               <h3 className="font-semibold">Confirm Delete</h3>

//               <button onClick={() => setShowConfirm(false)}>
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="p-5 text-gray-700">
//               <p>Are you sure you want to delete this organisation?</p>
//             </div>

//             <div className="flex justify-end gap-2 px-4 pb-4">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="rounded bg-gray-200 px-4 py-2 text-gray-700"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => {
//                   setShowConfirm(false);
//                   handleDelete();
//                 }}
//                 className="rounded bg-red-600 px-4 py-2 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="min-h-screen px-4 py-6 sm:px-6 text-gray-800">
//         <div className="max-w-5xl mx-auto p-6 text-gray-800">
//           <div className="rounded-2xl bg-white p-5 md:p-8 shadow-lg">
//             {/* <h2 className="mb-6 text-2xl md:text-3xl font-bold">
//               Delete Organisation
//             </h2> */}

//             <div className="space-y-6">
//               <div>
//                 <label className="mb-2 block font-semibold">
//                   Select Organisation
//                 </label>

//                 <select
//                   value={selectedOrgId ?? ""}
//                   onChange={(e) =>
//                     setSelectedOrgId(
//                       e.target.value ? Number(e.target.value) : null,
//                     )
//                   }
//                   className="w-full rounded-xl border px-4 py-3"
//                 >
//                   <option value="">-- Select Organisation --</option>

//                   {organisations.map((org) => (
//                     <option key={org.id} value={org.id}>
//                       {org.org_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="button"
//                 disabled={!selectedOrgId || loading}
//                 onClick={() => setShowConfirm(true)}
//                 className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white disabled:opacity-50"
//               >
//                 {loading ? "Deleting..." : "Delete Organisation"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DeleteOrganisation;




import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../../../components/Aleartmessage";

type Organisation = {
  id: number;
  org_name: string;
};

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

const DeleteOrganisation = () => {
  const ADMIN_API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;

  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
    confirm?: boolean;
  } | null>(null);

  const fetchOrganisations = async () => {
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
    } catch (error) {
      console.error("Failed to fetch organisations", error);

      setAlert({
        type: "error",
        message: "Failed to load organisations.",
      });
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const handleDelete = async () => {
    if (!selectedOrgId) {
      setAlert({
        type: "error",
        message: "Please select an organisation",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.delete<ApiResponse>(
        `${ADMIN_API_BASE}/org-super-admin/${selectedOrgId}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setAlert({
          type: "success",
          message:
            res.data.message || "Organisation deleted successfully",
        });

        setOrganisations((prev) =>
          prev.filter((org) => org.id !== selectedOrgId),
        );

        setSelectedOrgId(null);
      } else {
        setAlert({
          type: "error",
          message: res.data.message || "Delete failed",
        });
      }
    } catch (err: any) {
      setAlert({
        type: "error",
        message:
          err.response?.data?.message ||
          "Server error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    if (!selectedOrgId) {
      setAlert({
        type: "error",
        message: "Please select an organisation",
      });
      return;
    }

    const selectedOrg = organisations.find(
      (org) => org.id === selectedOrgId,
    );

    setAlert({
      type: "warning",
      confirm: true,
      message: `Are you sure you want to delete "${
        selectedOrg?.org_name || "this organisation"
      }"? This action cannot be undone.`,
    });
  };

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          confirm={alert.confirm}
          confirmText="Delete"
          cancelText="Cancel"
          onClose={() => setAlert(null)}
          onConfirm={() => {
            setAlert(null);
            handleDelete();
          }}
        />
      )}

      {/* Main Page */}
      <div className="mx-auto max-w-5xl p-6 text-gray-800">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
            Delete Organisation
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Select Organisation */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Select Organisation
              </label>

              <select
                value={selectedOrgId ?? ""}
                onChange={(e) =>
                  setSelectedOrgId(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="">-- Select Organisation --</option>

                {organisations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.org_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Delete Button */}
            <div className="mt-2 flex flex-col gap-3 sm:flex-row md:col-span-2">
              <button
                type="button"
                disabled={!selectedOrgId || loading}
                onClick={handleDeleteClick}
                className="w-full rounded-lg bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
              >
                {loading ? "Deleting..." : "Delete Organisation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteOrganisation;
