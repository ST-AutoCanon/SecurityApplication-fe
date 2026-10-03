// import { Edit, Eye, Pencil, Power, Trash2 } from "lucide-react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
// import StatusBadge from "./StatusBadge";
// import Alert from "../../../../../components/Aleartmessage";

// interface Props {
//   members: any[];
//   reload: () => void;
//   onSuccess: (message: string) => void;
// }

// const API = import.meta.env.VITE_BACKEND_URL;

// const MemberTable = ({ members = [], reload, onSuccess }: Props) => {
//   const [deleteId, setDeleteId] = useState<number | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const deleteMember = async () => {
//     if (!deleteId) return;

//     try {
//       await axios.delete(`${API}/api/admin/apartment/members/${deleteId}`, {
//         withCredentials: true,
//       });

//       setDeleteId(null);
//       await reload();

//       onSuccess("Apartment member deleted successfully!");
//     } catch (err: any) {
//       setDeleteId(null);

//       setErrorMessage(err?.response?.data?.message || "Delete failed");
//     }
//   };

//   const changeStatus = async (id: number, status: boolean) => {
//     try {
//       await axios.patch(
//         `${API}/api/admin/apartment/members/${id}/status`,
//         {
//           status: !status,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       await reload();

//       onSuccess(
//         status
//           ? "Apartment member disabled successfully!"
//           : "Apartment member enabled successfully!",
//       );
//     } catch (err: any) {
//       setErrorMessage(err?.response?.data?.message || "Status update failed");
//     }
//   };

//   return (
//     <div>
//       {/* Delete Confirmation Popup */}
//       {deleteId && (
//         <Alert
//           type="warning"
//           message="Are you sure you want to delete this apartment member?"
//           confirm={true}
//           confirmText="Yes"
//           cancelText="No"
//           onConfirm={deleteMember}
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

//       <div className="overflow-x-auto bg-white rounded-xl shadow">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Code</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Mobile</th>
//               <th className="p-3 text-left">Tower</th>
//               <th className="p-3 text-left">Flat</th>
//               <th className="p-3 text-left">Member Type</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {members.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="text-center py-10 text-gray-500">
//                   No members found.
//                 </td>
//               </tr>
//             )}

//             {members.map((member) => (
//               <tr key={member.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">{member.member_code}</td>

//                 <td className="p-3">
//                   {member.first_name} {member.last_name}
//                 </td>

//                 <td className="p-3">{member.mobile_number}</td>

//                 <td className="p-3">{member.block_tower}</td>

//                 <td className="p-3">{member.flat_number}</td>

//                 <td className="p-3">{member.member_type}</td>

//                 <td className="p-3">
//                   <StatusBadge status={member.status} />
//                 </td>

//                 <td className="p-3">
//                   <div className="flex justify-center items-center gap-2">
//                     {/* View */}
//                     {/* <Link
//                       to={`/admin/organisation/apartment/members/${member.id}`}
//                       className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
//                     >
//                       View
//                     </Link> */}
//                     <Link
//                       to={`/admin/organisation/apartment/members/${member.id}`}
//                       title="View Member"
//                       aria-label="View Member"
//                       className="flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
//                     >
//                       <Eye size={17} />
//                       <span className="text-sm font-medium">View</span>
//                     </Link>

//                     {/* Edit */}
//                     <Link
//                       to={`/admin/organisation/apartment/members/edit/${member.id}`}
//                       title="Edit"
//                       aria-label="Edit"
//                       className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
//                     >
//                       <Edit size={17} />
//                     </Link>

//                     {/* Activate / Deactivate */}
//                     {member.status ? (
//                       <button
//                         onClick={() => changeStatus(member.id, member.status)}
//                         title="Deactivate"
//                         aria-label="Deactivate"
//                         className="p-2 rounded-lg text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
//                       >
//                         <Power size={17} />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => changeStatus(member.id, member.status)}
//                         title="Activate"
//                         aria-label="Activate"
//                         className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
//                       >
//                         <Power size={17} />
//                       </button>
//                     )}

//                     {/* Delete */}
//                     <button
//                       onClick={() => setDeleteId(member.id)}
//                       title="Delete"
//                       aria-label="Delete"
//                       className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
//                     >
//                       <Trash2 size={17} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MemberTable;

import { Edit, Eye, Power, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import StatusBadge from "./StatusBadge";
import Alert from "../../../../../components/Aleartmessage";

interface Props {
  members: any[];
  reload: () => void;
  onSuccess: (message: string) => void;
}

const API = import.meta.env.VITE_BACKEND_URL;

const MemberTable = ({ members = [], reload, onSuccess }: Props) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ----------------------------------------
     Delete Member
  ----------------------------------------- */
  const deleteMember = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`${API}/api/admin/apartment/members/${deleteId}`, {
        withCredentials: true,
      });

      setDeleteId(null);

      await reload();

      onSuccess("Apartment member deleted successfully!");
    } catch (err: any) {
      setDeleteId(null);

      setErrorMessage(err?.response?.data?.message || "Delete failed");
    }
  };

  /* ----------------------------------------
     Change Status
  ----------------------------------------- */
  const changeStatus = async (id: number, status: boolean) => {
    try {
      await axios.patch(
        `${API}/api/admin/apartment/members/${id}/status`,
        {
          status: !status,
        },
        {
          withCredentials: true,
        },
      );

      await reload();

      onSuccess(
        status
          ? "Apartment member disabled successfully!"
          : "Apartment member enabled successfully!",
      );
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div>
      {/* ----------------------------------------
          Delete Confirmation
      ----------------------------------------- */}
      {deleteId && (
        <Alert
          type="warning"
          message="Are you sure you want to delete this apartment member?"
          confirm={true}
          confirmText="Yes"
          cancelText="No"
          onConfirm={deleteMember}
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
          Table
      ----------------------------------------- */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                Code
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                Name
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                Mobile
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                Tower
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                Flat
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                Member Type
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                Status
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {members.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <div className="text-sm text-gray-500">No members found.</div>
                </td>
              </tr>
            )}

            {members.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Code */}
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {member.member_code || "-"}
                </td>

                {/* Name */}
                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {member.first_name || ""} {member.last_name || ""}
                </td>

                {/* Mobile */}
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {member.mobile_number || "-"}
                </td>

                {/* Tower */}
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {member.block_tower || "-"}
                </td>

                {/* Flat */}
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {member.flat_number || "-"}
                </td>

                {/* Member Type */}
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {member.member_type || "-"}
                </td>

                {/* Status */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <StatusBadge status={member.status} />
                </td>

                {/* Actions */}
                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    {/* View */}
                    <Link
                      to={`/admin/organisation/apartment/members/${member.id}`}
                      title="View"
                      aria-label="View member"
                      className="inline-flex items-center gap-2 h-9 px-3 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <Eye size={17} />
                      <span className="text-sm font-medium">View</span>
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/admin/organisation/apartment/members/edit/${member.id}`}
                      title="Edit"
                      aria-label="Edit member"
                      className="p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={17} />
                    </Link>

                    {/* Activate / Deactivate */}
                    <button
                      type="button"
                      onClick={() => changeStatus(member.id, member.status)}
                      title={member.status ? "Deactivate" : "Activate"}
                      aria-label={
                        member.status ? "Deactivate member" : "Activate member"
                      }
                      className={
                        member.status
                          ? "p-2 rounded-lg text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
                          : "p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                      }
                    >
                      <Power size={17} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setDeleteId(member.id)}
                      title="Delete"
                      aria-label="Delete member"
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
    </div>
  );
};

export default MemberTable;