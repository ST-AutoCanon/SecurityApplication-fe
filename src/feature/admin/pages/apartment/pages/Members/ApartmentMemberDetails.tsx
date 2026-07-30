import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FamilyTable from "../../components/FamilyTable";
import VehicleTable from "../../components/VehicleTable";
import StatusBadge from "../../components/StatusBadge";

// const API = "/api/admin/apartment";
const API = import.meta.env.VITE_BACKEND_URL;
const ApartmentMemberDetails = () => {

  
  // const { id } = useParams();
const { pathname } = useLocation();
const navigate = useNavigate();
  const id = pathname.split("/").pop();
  
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
      if (!id) {
        console.log("Member id missing");
        return;
      }
    try {
      const { data } = await axios.get(
        `${API}/api/admin/apartment/members/${id}/details`,
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
    fetchDetails();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!member) {
    return <div className="p-6">Member not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Member Details</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            ← Back
          </button>
          <Link
            to={`/admin/organisation/apartment/members/edit/${member.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <p className="text-gray-500 text-sm">Member Code</p>
          <p className="font-semibold">{member.member_code}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Name</p>
          <p className="font-semibold">
            {member.first_name} {member.last_name}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <StatusBadge status={member.status} />
        </div>

        <div>
          <p className="text-gray-500 text-sm">Mobile</p>
          <p>{member.mobile_number}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p>{member.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Gender</p>
          <p>{member.gender}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Apartment</p>
          <p>{member.apartment_name}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Tower</p>
          <p>{member.block_tower}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Flat</p>
          <p>{member.flat_number}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Floor</p>
          <p>{member.floor_number}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Ownership</p>
          <p>{member.ownership_type}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Member Type</p>
          <p>{member.member_type}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Occupation</p>
          <p>{member.occupation}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Move In Date</p>
          <p>{member.move_in_date}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Emergency Contact</p>
          <p>{member.emergency_contact_name}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Emergency Mobile</p>
          <p>{member.emergency_contact_mobile}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">Family Members</h2>

        <FamilyTable
          memberId={member.id}
          family={member.family}
          reload={fetchDetails}
        />
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">Vehicles</h2>

        <VehicleTable
          memberId={member.id}
          vehicles={member.vehicles}
          reload={fetchDetails}
        />
      </div>
    </div>
  );
};

export default ApartmentMemberDetails;
