// export default function Profile() {
//   return (
//     <div className="p-4 sm:p-6 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Profile Header */}
//         <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
//           <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
//             <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
//               <span className="text-3xl font-bold text-purple-700">U</span>
//             </div>

//             <div className="text-center sm:text-left">
//               <h1 className="text-2xl font-bold text-gray-800">User Name</h1>
//               <p className="text-gray-500">user@example.com</p>
//               <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
//                 Active
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div className="bg-white rounded-2xl shadow-sm border p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">
//             Personal Information
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <p className="text-sm text-gray-500">Full Name</p>
//               <p className="font-medium text-gray-800 mt-1">User Name</p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Email</p>
//               <p className="font-medium text-gray-800 mt-1">user@example.com</p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Phone</p>
//               <p className="font-medium text-gray-800 mt-1">+91 98765 43210</p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Role</p>
//               <p className="font-medium text-gray-800 mt-1">User</p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Department</p>
//               <p className="font-medium text-gray-800 mt-1">Administration</p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Joined Date</p>
//               <p className="font-medium text-gray-800 mt-1">January 15, 2026</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

type ApartmentMember = {
  id: number | null;
  security_user_id: number | null;
  member_code: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  date_of_birth: string | null;
  mobile_number: string | null;
  alternate_mobile_number: string | null;
  email: string | null;
  profile_photo: string | null;
  aadhaar_number: string | null;
  occupation: string | null;
  apartment_name: string | null;
  block_tower: string | null;
  floor_number: number | string | null;
  flat_number: string | null;
  ownership_type: string | null;
  move_in_date: string | null;
  family_member_count: number | null;
  emergency_contact_name: string | null;
  emergency_contact_relationship: string | null;
  emergency_contact_mobile: string | null;
  member_type: string | null;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: ApartmentMember;
};

const formatValue = (
  value: string | number | null | undefined
): string => {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value);
};

const formatDate = (value: string | null): string => {
  if (!value) return "Not provided";

  // Avoid timezone shifting for PostgreSQL DATE values.
  const datePart = value.substring(0, 10);
  const parts = datePart.split("-");

  if (
    parts.length !== 3 ||
    !parts.every((part) => /^\d+$/.test(part))
  ) {
    return value;
  }

  const [year, month, day] = parts.map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const displayName = (profile: ApartmentMember): string => {
  return [profile.first_name, profile.last_name]
    .filter((part) => part?.trim())
    .join(" ")
    .trim() || "Apartment Member";
};

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {formatValue(value)}
      </p>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

export default function Profile() {
  const [profile, setProfile] = useState<ApartmentMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get<ApiResponse>(
          `${API}/api/user-dashboard/profile`,
          {
            withCredentials: true,
          }
        );

        if (!response.data.success || !response.data.data) {
          throw new Error(
            response.data.message || "Unable to load profile."
          );
        }

        if (isMounted) {
          setProfile(response.data.data);
        }
      } catch (err: unknown) {
        if (!isMounted) return;

        if (axios.isAxiosError<ApiResponse>(err)) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load your profile. Please try again."
          );
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unable to load your profile. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-slate-50 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-40 rounded-2xl bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-200" />
          <div className="h-48 rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[50vh] bg-slate-50 p-4 sm:p-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Unable to load profile
          </h2>

          <p className="mt-2 break-words text-sm text-red-600">
            {error || "Profile information is not available."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const fullName = displayName(profile);

  const initials = [profile.first_name, profile.last_name]
    .filter((part) => part?.trim())
    .map((part) => part!.trim()[0])
    .join("")
    .toUpperCase() || "AM";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Profile Header */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center self-center overflow-hidden rounded-full border-4 border-indigo-50 bg-indigo-100 text-3xl font-bold text-indigo-700 sm:self-auto">
              {profile.profile_photo ? (
                <img
                  src={profile.profile_photo}
                  alt={`${fullName}'s profile`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                initials
              )}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Apartment Member Profile
              </p>

              <h1 className="mt-2 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
                {fullName}
              </h1>

              <p className="mt-1 break-words text-sm text-slate-500">
                {formatValue(profile.email)}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                  Member Code: {formatValue(profile.member_code)}
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  {formatValue(profile.member_type)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <Section
          title="Personal Information"
          description="Your personal and contact details."
        >
          <InfoItem label="Member Record ID" value={profile.id} />
          <InfoItem
            label="Security User ID"
            value={profile.security_user_id}
          />
          <InfoItem label="Member Code" value={profile.member_code} />
          <InfoItem label="First Name" value={profile.first_name} />
          <InfoItem label="Last Name" value={profile.last_name} />
          <InfoItem label="Gender" value={profile.gender} />
          <InfoItem
            label="Date of Birth"
            value={formatDate(profile.date_of_birth)}
          />
          <InfoItem label="Mobile Number" value={profile.mobile_number} />
          <InfoItem
            label="Alternate Mobile Number"
            value={profile.alternate_mobile_number}
          />
          <InfoItem label="Email Address" value={profile.email} />
          <InfoItem label="Aadhaar Number" value={profile.aadhaar_number} />
          <InfoItem label="Occupation" value={profile.occupation} />
        </Section>

        {/* Apartment Information */}
        <Section
          title="Apartment Information"
          description="Your residence and ownership details."
        >
          <InfoItem label="Apartment Name" value={profile.apartment_name} />
          <InfoItem label="Block / Tower" value={profile.block_tower} />
          <InfoItem label="Floor Number" value={profile.floor_number} />
          <InfoItem label="Flat Number" value={profile.flat_number} />
          <InfoItem label="Ownership Type" value={profile.ownership_type} />
          <InfoItem
            label="Move-in Date"
            value={formatDate(profile.move_in_date)}
          />
          <InfoItem
            label="Family Member Count"
            value={profile.family_member_count}
          />
        </Section>

        {/* Emergency Contact */}
        <Section
          title="Emergency Contact"
          description="Contact details to use in an emergency."
        >
          <InfoItem
            label="Contact Name"
            value={profile.emergency_contact_name}
          />
          <InfoItem
            label="Relationship"
            value={profile.emergency_contact_relationship}
          />
          <InfoItem
            label="Emergency Contact Mobile"
            value={profile.emergency_contact_mobile}
          />
        </Section>

        {/* Membership Information */}
        <Section
          title="Membership Information"
          description="Your apartment membership details."
        >
          <InfoItem label="Member Type" value={profile.member_type} />
        </Section>
      </div>
    </div>
  );
}

