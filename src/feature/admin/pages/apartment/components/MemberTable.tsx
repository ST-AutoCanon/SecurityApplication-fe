// import { Link } from "react-router-dom";
// import axios from "axios";
// import StatusBadge from "./StatusBadge";

// interface Props {
//   members: any[];
//   reload: () => void;
// }

// // const API = "/api/admin/apartment";
// const API = import.meta.env.VITE_BACKEND_URL;
// const MemberTable = ({ members = [], reload }: Props) => {
//   const deleteMember = async (id: number) => {
//     if (!window.confirm("Delete this member?")) return;

//     try {
//       await axios.delete(`${API}/api/admin/apartment/members/${id}`, {
//         withCredentials: true,
//       });
//       reload();
//     } catch (err: any) {
//       alert(err?.response?.data?.message || "Delete failed");
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

//       reload();
//     } catch (err: any) {
//       alert(err?.response?.data?.message || "Status update failed");
//     }
//   };

//   return (
//     <div className="overflow-x-auto bg-white rounded-xl shadow">
//       <table className="min-w-full">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Code</th>
//             <th className="p-3 text-left">Name</th>
//             <th className="p-3 text-left">Mobile</th>
//             <th className="p-3 text-left">Tower</th>
//             <th className="p-3 text-left">Flat</th>
//             <th className="p-3 text-left">Member Type</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {members.length === 0 && (
//             <tr>
//               <td colSpan={8} className="text-center py-10 text-gray-500">
//                 No members found.
//               </td>
//             </tr>
//           )}

//           {(members || []).map((member) => (
//             <tr key={member.id} className="border-t hover:bg-gray-50">
//               <td className="p-3">{member.member_code}</td>

//               <td className="p-3">
//                 {member.first_name} {member.last_name}
//               </td>

//               <td className="p-3">{member.mobile_number}</td>

//               <td className="p-3">{member.block_tower}</td>

//               <td className="p-3">{member.flat_number}</td>

//               <td className="p-3">{member.member_type}</td>

//               <td className="p-3">
//                 <StatusBadge status={member.status} />
//               </td>

//               <td className="p-3">
//                 <div className="flex justify-center gap-2">
//                   <Link
//                     to={`/admin/organisation/apartment/members/${member.id}`}
//                     className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
//                   >
//                     View
//                   </Link>

//                   <Link
//                     to={`/admin/organisation/apartment/members/edit/${member.id}`}
//                     className="px-3 py-1 rounded bg-yellow-500 text-white text-sm"
//                   >
//                     Edit
//                   </Link>

//                   <button
//                     onClick={() => changeStatus(member.id, member.status)}
//                     className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
//                   >
//                     {member.status ? "Disable" : "Enable"}
//                   </button>

//                   <button
//                     onClick={() => deleteMember(member.id)}
//                     className="px-3 py-1 rounded bg-red-600 text-white text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MemberTable;

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StatusBadge from "./StatusBadge";
import Alert from "../../../../../components/Aleartmessage";

interface Props {
  members: any[];
  reload: () => void;
  onSuccess: (message: string) => void;
}

// const API = "/api/admin/apartment";
const API = import.meta.env.VITE_BACKEND_URL;

const MemberTable = ({ members = [], reload, onSuccess }: Props) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      {/* Delete Confirmation Popup */}
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

      {/* Error Popup */}
      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Tower</th>
              <th className="p-3 text-left">Flat</th>
              <th className="p-3 text-left">Member Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-500">
                  No members found.
                </td>
              </tr>
            )}

            {(members || []).map((member) => (
              <tr key={member.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{member.member_code}</td>

                <td className="p-3">
                  {member.first_name} {member.last_name}
                </td>

                <td className="p-3">{member.mobile_number}</td>

                <td className="p-3">{member.block_tower}</td>

                <td className="p-3">{member.flat_number}</td>

                <td className="p-3">{member.member_type}</td>

                <td className="p-3">
                  <StatusBadge status={member.status} />
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/admin/organisation/apartment/members/${member.id}`}
                      className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                    >
                      View
                    </Link>

                    <Link
                      to={`/admin/organisation/apartment/members/edit/${member.id}`}
                      className="px-3 py-1 rounded bg-yellow-500 text-white text-sm"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => changeStatus(member.id, member.status)}
                      className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                    >
                      {member.status ? "Disable" : "Enable"}
                    </button>

                    <button
                      onClick={() => setDeleteId(member.id)}
                      className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                    >
                      Delete
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
