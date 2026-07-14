import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/org-super-admin`;

interface Props {
  organisationId: number | null;
  onBack: () => void;
}

interface OrganisationDetails {
  id: number;
  org_name: string;
  schema_name: string;
  email: string;
  phone: string;
  address: string;
  org_type: string;
  status: string;
  created_at: string;
  registration_start_date: string;
  registration_end_date: string;
  aadhaar_number: string;
  pan_number: string;
  passport_number: string;
  photo_path: string | null;

  admin: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export default function OrganisationDetails({
  organisationId,
  onBack,
}: Props) {
  const [organisation, setOrganisation] =
    useState<OrganisationDetails | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (organisationId) {
      loadOrganisation();
    }
  }, [organisationId]);

  const loadOrganisation = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/${organisationId}`, {
        withCredentials: true,
      });

      setOrganisation(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch organisation details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!organisation) {
    return (
      <div className="text-center py-20 text-lg">
        Organisation not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-800">

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold text-white">
          Organisation Details
        </h1>

        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      <div className="bg-white shadow rounded-xl p-6">

        <div className="grid md:grid-cols-2 gap-4">

          {/* Organisation Name */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Organisation Name
            </label>

            <input
              value={organisation.org_name}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Organisation Type */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Organisation Type
            </label>

            <input
              value={organisation.org_type}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone Number
            </label>

            <input
              value={organisation.phone}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              value={organisation.email}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Address */}

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">
              Address
            </label>

            <textarea
              value={organisation.address}
              readOnly
              rows={3}
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
                  </div>
                {/* Aadhaar */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Aadhaar Number
            </label>

            <input
              value={organisation.aadhaar_number || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* PAN */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              PAN Number
            </label>

            <input
              value={organisation.pan_number || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Passport */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Passport Number
            </label>

            <input
              value={organisation.passport_number || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Status */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Status
            </label>

            <input
              value={organisation.status}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Registration Start */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Registration Start Date
            </label>

            <input
              type="date"
              value={organisation.registration_start_date}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Registration End */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Registration End Date
            </label>

            <input
              type="date"
              value={organisation.registration_end_date}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Photo */}

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">
              Organisation Photo
            </label>

            {organisation.photo_path ? (
              <div className="border rounded-lg p-3 bg-gray-100 break-all">
                {organisation.photo_path}
              </div>
            ) : (
              <div className="border rounded-lg p-3 bg-gray-100 text-gray-500">
                No Photo Available
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= ADMIN DETAILS ================= */}

      <div className="bg-white shadow rounded-xl p-6 mt-8">

        <h2 className="text-xl font-semibold mb-5">
          Admin Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Admin First Name
            </label>

            <input
              value={organisation.admin?.first_name || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Admin Last Name
            </label>

            <input
              value={organisation.admin?.last_name || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Admin Phone
            </label>

            <input
              value={organisation.admin?.phone || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Admin Email
            </label>

            <input
              value={organisation.admin?.email || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

        </div>
          </div>
            {/* Footer */}

      <div className="flex justify-end mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          <ArrowLeft size={18} />
          Back to Organisations
        </button>
      </div>

    </div>
  );
}
