// // import { useEffect, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import axios from "axios";
// // import MemberForm from "../../components/MemberForm";
// // import Alert from "../../../../../../components/Aleartmessage";
// // import { ArrowLeft } from "lucide-react";

// // // const API = "/api/admin/apartment";
// // const API = import.meta.env.VITE_BACKEND_URL;
// // const EditApartmentMember = () => {
// //   const { pathname } = useLocation();

// //   const id = pathname.split("/").pop();

// //   console.log("Edit Member ID:", id);
// //   const navigate = useNavigate();

// //   const [member, setMember] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   const [showSuccessAlert, setShowSuccessAlert] = useState(false);

// //   const fetchMember = async () => {
// //     try {
// //       const { data } = await axios.get(
// //         `${API}/api/admin/apartment/members/${id}`,
// //         {
// //           withCredentials: true,
// //         },
// //       );
// //       setMember(data.data);
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMember();
// //   }, [id]);

// //   if (loading) {
// //     return <div className="p-6">Loading...</div>;
// //   }

// //   return (
// //     <div className="p-6">
// //       {showSuccessAlert && (
// //         <Alert
// //           type="success"
// //           message="Apartment member updated successfully!"
// //           onClose={() => {
// //             setShowSuccessAlert(false);
// //             navigate("/admin/organisation/apartment/members");
// //           }}
// //         />
// //       )}

// //       <div className="mb-6 flex items-center justify-between">
// //         <h1 className="text-2xl font-bold">Edit Apartment Member</h1>

// //         {/* <button
// //           onClick={() => navigate(-1)}
// //           className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
// //         >
// //           ← Back
// //         </button> */}
// //         <button
// //           onClick={() => navigate(-1)}
// //           title="Go Back"
// //           aria-label="Go Back"
// //           className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
// //         >
// //           <ArrowLeft size={18} />
// //           <span className="text-sm font-medium">Back</span>
// //         </button>
// //       </div>

// //       <MemberForm
// //         mode="edit"
// //         member={member}
// //         onSuccess={() => setShowSuccessAlert(true)}
// //       />
// //     </div>
// //   );
// // };

// // export default EditApartmentMember;

// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import MemberForm from "../../components/MemberForm";
// import Alert from "../../../../../../components/Aleartmessage";
// import { ArrowLeft, Loader2, UserRound } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// const EditApartmentMember = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const id = pathname.split("/").pop();

//   const [member, setMember] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const [alert, setAlert] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const fetchMember = async () => {
//     if (!id) {
//       setAlert({
//         type: "error",
//         message: "Member ID is missing.",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);

//       const { data } = await axios.get(
//         `${API}/api/admin/apartment/members/${id}`,
//         {
//           withCredentials: true,
//         },
//       );

//       setMember(data.data);
//     } catch (error: any) {
//       console.error("Error fetching member:", error);

//       setAlert({
//         type: "error",
//         message:
//           error?.response?.data?.message || "Failed to load apartment member.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMember();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 text-blue-600 mb-4">
//               <Loader2 size={28} className="animate-spin" />
//             </div>

//             <h2 className="text-lg font-semibold text-gray-900">
//               Loading Member
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Please wait while member details are being loaded.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!member) {
//     return (
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         {alert && (
//           <Alert
//             type={alert.type}
//             message={alert.message}
//             onClose={() => setAlert(null)}
//           />
//         )}

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
//             <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 text-gray-500 mb-4">
//               <UserRound size={28} />
//             </div>

//             <h2 className="text-lg font-semibold text-gray-900">
//               Member Not Found
//             </h2>

//             <p className="text-sm text-gray-500 mt-1 mb-6">
//               The apartment member could not be loaded.
//             </p>

//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
//             >
//               <ArrowLeft size={18} />
//               <span className="text-sm font-medium">Back</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6">
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => setAlert(null)}
//         />
//       )}

//       {/* Page Header */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 md:p-8">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
//               <UserRound size={24} />
//             </div>

//             <div>
//               <h1 className="text-xl md:text-2xl font-bold text-gray-900">
//                 Edit Apartment Member
//               </h1>

//               <p className="text-sm text-gray-500 mt-1">
//                 Update the member information and save your changes.
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             title="Go Back"
//             aria-label="Go Back"
//             className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
//           >
//             <ArrowLeft size={18} />
//             <span className="text-sm font-medium">Back</span>
//           </button>
//         </div>
//       </div>

//       {/* Member Form */}
//       <MemberForm
//         mode="edit"
//         member={member}
//         onSuccess={() => {
//           setAlert({
//             type: "success",
//             message: "Apartment member updated successfully!",
//           });

//           setTimeout(() => {
//             navigate("/admin/organisation/apartment/members");
//           }, 1200);
//         }}
//       />
//     </div>
//   );
// };

// export default EditApartmentMember;

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MemberForm from "../../components/MemberForm";
import Alert from "../../../../../../components/Aleartmessage";
import { ArrowLeft, Loader2, UserRound } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

const EditApartmentMember = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const id = pathname.split("/").pop();

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchMember = async () => {
    if (!id) {
      setAlert({
        type: "error",
        message: "Member ID is missing.",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API}/api/admin/apartment/members/${id}`,
        {
          withCredentials: true,
        },
      );

      setMember(data.data);
    } catch (error: any) {
      console.error("Error fetching member:", error);

      setAlert({
        type: "error",
        message:
          error?.response?.data?.message || "Failed to load apartment member.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={30} className="text-blue-600 animate-spin mb-4" />

            <p className="text-sm text-gray-500">Loading member details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 text-gray-500 mb-4">
              <UserRound size={28} />
            </div>

            <h2 className="text-lg font-semibold text-gray-900">
              Member Not Found
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              The apartment member could not be loaded.
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          title="Go Back"
          aria-label="Go Back"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <MemberForm
        mode="edit"
        member={member}
        onSuccess={() => {
          setAlert({
            type: "success",
            message: "Apartment member updated successfully!",
          });

          setTimeout(() => {
            navigate("/admin/organisation/apartment/members");
          }, 1200);
        }}
      />
    </div>
  );
};

export default EditApartmentMember;