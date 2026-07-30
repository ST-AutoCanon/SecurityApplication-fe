import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MemberForm from "../../components/MemberForm";

// const API = "/api/admin/apartment";
const API = import.meta.env.VITE_BACKEND_URL;
const EditApartmentMember = () => {
const { pathname } = useLocation();

const id = pathname.split("/").pop();

console.log("Edit Member ID:", id);
  const navigate = useNavigate();

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchMember = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/admin/apartment/members/${id}`,
        {
          withCredentials: true,
        },
      );
      setMember(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Apartment Member</h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          ← Back
        </button>
      </div>

      <MemberForm
        mode="edit"
        member={member}
        onSuccess={() => navigate("/admin/organisation/apartment/members")}
      />
    </div>
  );
};

export default EditApartmentMember;
