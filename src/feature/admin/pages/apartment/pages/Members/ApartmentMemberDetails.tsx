import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Building2,
  Car,
  Edit,
  Loader2,
  Phone,
  UserRound,
  Users,
} from "lucide-react";

import FamilyTable from "../../components/FamilyTable";
import VehicleTable from "../../components/VehicleTable";
import StatusBadge from "../../components/StatusBadge";
import Alert from "../../../../../../components/Aleartmessage";

const API = import.meta.env.VITE_BACKEND_URL;

/* ----------------------------------------
   Format Date
----------------------------------------- */
const formatDate = (date?: string | null) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/* ----------------------------------------
   Detail Item Component
----------------------------------------- */
interface DetailItemProps {
  label: string;
  value?: any;
}

const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="w-full min-h-11 rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 bg-gray-50 flex items-center">
        <span className="text-sm break-words">
          {value !== null && value !== undefined && value !== "" ? value : "-"}
        </span>
      </div>
    </div>
  );
};

/* ----------------------------------------
   Apartment Member Details
----------------------------------------- */
const ApartmentMemberDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const id = pathname.split("/").pop();

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
  } | null>(null);

  /* ----------------------------------------
     Fetch Member Details
  ----------------------------------------- */
  const fetchDetails = async () => {
    if (!id) {
      console.log("Member id missing");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API}/api/admin/apartment/members/${id}/details`,
        {
          withCredentials: true,
        },
      );

      setMember(data.data);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setMember(null);
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------
     Success Alert
  ----------------------------------------- */
  const showSuccessAlert = (message: string) => {
    setAlert({
      type: "success",
      message,
    });
  };

  /* ----------------------------------------
     Fetch On Page Load
  ----------------------------------------- */
  useEffect(() => {
    fetchDetails();
  }, [id]);

  /* ----------------------------------------
     Loading State
  ----------------------------------------- */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={32} className="text-blue-600 animate-spin mb-4" />

            <p className="text-sm text-gray-500">Loading member details...</p>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------------------
     Member Not Found
  ----------------------------------------- */
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 text-blue-600 mb-4">
              <UserRound size={28} />
            </div>

            <h2 className="text-lg font-semibold text-gray-900">
              Member Not Found
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              The apartment member details could not be loaded.
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* ----------------------------------------
          Alert
      ----------------------------------------- */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* ----------------------------------------
          Action Buttons
      ----------------------------------------- */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          title="Go Back"
          aria-label="Go Back"
          className="inline-flex items-center gap-2 h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <Link
          to={`/admin/organisation/apartment/members/edit/${member.id}`}
          className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Edit size={17} />
          <span>Edit Member</span>
        </Link>
      </div>

      {/* ----------------------------------------
          Member Information Card
      ----------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <UserRound size={24} />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Member Details
            </h1>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 md:p-8 space-y-8">
          {/* ----------------------------------------
              Basic Information
          ----------------------------------------- */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <UserRound size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Basic Information
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <DetailItem label="Member Code" value={member.member_code} />

              <DetailItem
                label="Name"
                value={`${member.first_name || ""} ${
                  member.last_name || ""
                }`.trim()}
              />

              <DetailItem label="Gender" value={member.gender} />

              <DetailItem
                label="Date of Birth"
                value={formatDate(member.date_of_birth)}
              />

              <DetailItem
                label="Aadhaar Number"
                value={member.aadhaar_number}
              />

              <div>
                <p className="block mb-2 text-sm font-medium text-gray-700">
                  Status
                </p>

                <div className="h-11 flex items-center">
                  <StatusBadge status={member.status} />
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------------------
              Contact Information
          ----------------------------------------- */}
          <section className="border-t border-gray-200 pt-8">
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Phone size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Contact Information
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <DetailItem label="Mobile Number" value={member.mobile_number} />

              <DetailItem
                label="Alternate Mobile Number"
                value={member.alternate_mobile_number}
              />

              <DetailItem label="Email" value={member.email} />

              <DetailItem label="Occupation" value={member.occupation} />
            </div>
          </section>

          {/* ----------------------------------------
              Apartment Information
          ----------------------------------------- */}
          <section className="border-t border-gray-200 pt-8">
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building2 size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Apartment Information
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <DetailItem
                label="Apartment Name"
                value={member.apartment_name}
              />

              <DetailItem label="Tower / Block" value={member.block_tower} />

              <DetailItem label="Floor Number" value={member.floor_number} />

              <DetailItem label="Flat Number" value={member.flat_number} />

              <DetailItem
                label="Ownership Type"
                value={member.ownership_type}
              />

              <DetailItem
                label="Move In Date"
                value={formatDate(member.move_in_date)}
              />

              <DetailItem
                label="Family Member Count"
                value={member.family_member_count}
              />

              <DetailItem label="Member Type" value={member.member_type} />
            </div>
          </section>

          {/* ----------------------------------------
              Emergency Contact
          ----------------------------------------- */}
          <section className="border-t border-gray-200 pt-8">
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Phone size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Emergency Contact
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <DetailItem
                label="Contact Name"
                value={member.emergency_contact_name}
              />

              <DetailItem
                label="Relationship"
                value={member.emergency_contact_relationship}
              />

              <DetailItem
                label="Contact Mobile"
                value={member.emergency_contact_mobile}
              />
            </div>
          </section>
        </div>
      </div>

      {/* ----------------------------------------
          Family Members
      ----------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <Users size={24} />
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Family Members
            </h2>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <FamilyTable
            memberId={member.id}
            family={member.family}
            reload={fetchDetails}
            onSuccess={showSuccessAlert}
          />
        </div>
      </div>

      {/* ----------------------------------------
          Vehicles
      ----------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-4 p-6 md:p-8 border-b border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <Car size={24} />
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Vehicles
            </h2>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <VehicleTable
            memberId={member.id}
            vehicles={member.vehicles}
            reload={fetchDetails}
            onSuccess={showSuccessAlert}
          />
        </div>
      </div>
    </div>
  );
};

export default ApartmentMemberDetails;
