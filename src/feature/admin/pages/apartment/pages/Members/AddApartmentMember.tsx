import { useNavigate } from "react-router-dom";
import MemberForm from "../../components/MemberForm";

const AddApartmentMember = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Apartment Member</h1>
      </div>

      <MemberForm mode="add" onSuccess={() => navigate("/apartment/members")} />
    </div>
  );
};

export default AddApartmentMember;
