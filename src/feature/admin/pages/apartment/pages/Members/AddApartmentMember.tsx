// import { useNavigate } from "react-router-dom";
// import MemberForm from "../../components/MemberForm";

// const AddApartmentMember = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">Add Apartment Member</h1>
//       </div>

//       <MemberForm mode="add" onSuccess={() => navigate("/apartment/members")} />
//     </div>
//   );
// };

// export default AddApartmentMember;

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MemberForm from "../../components/MemberForm";

const AddApartmentMember = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Add Apartment Member</h1>

        <button
          onClick={() => navigate("/admin/organisation/apartment/members")}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <MemberForm
        mode="add"
        onSuccess={() => navigate("/admin/organisation/apartment/members")}
      />
    </div>
  );
};

export default AddApartmentMember;