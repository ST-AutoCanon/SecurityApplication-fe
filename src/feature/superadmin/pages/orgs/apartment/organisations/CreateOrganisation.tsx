  import { useEffect, useState } from "react";
  import { Upload } from "lucide-react";
  import axios from "axios";

  // const API = "http://localhost:5000/api/org-super-admin";
  const API = `${import.meta.env.VITE_BACKEND_URL}/api/org-super-admin`;

  const config = {
    withCredentials: true,
  };

  export default function OrganisationPage() {
    const [organisations, setOrganisations] = useState<any[]>([]);

    const [orgname, setOrgName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [orgType, setOrgType] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [registrationStartDate, setRegistrationStartDate] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
    const [status, setStatus] = useState("");
    
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const loadOrganisations = async () => {
      try {
        const res = await axios.get(API, config);

        setOrganisations(res.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      loadOrganisations();
    }, []);

    const handleSubmit = async () => {
      try {
        if (!orgname.trim()) {
          alert("Organisation Name Required");
          return;
        }

        if (!editingId) {


    

          if (!adminEmail.trim()) {
            alert("Admin Email Required");
            return;
          }


          const formData = new FormData();

          formData.append("org_name", orgname);
          formData.append("org_type", orgType);
          formData.append("phone", phone);
          formData.append("email", email);
          formData.append("address", address);
          formData.append("aadhaar_number", aadhaarNumber);
          formData.append("pan_number", panNumber);
          formData.append("passport_number", passportNumber);
          formData.append("registration_start_date", registrationStartDate);
          formData.append("registration_end_date", registrationEndDate);
          formData.append("status", status);

          formData.append(
            "admin",
            JSON.stringify({
              first_name: adminFirstName,
              last_name: adminLastName,
              email: adminEmail,
              phone: adminPhone,
            }),
          );
          
          if (photo) {
            formData.append("photo", photo);
          }

          await axios.post(`${API}/register`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          alert("Organisation Created");
        } else {
          await axios.put(
            `${API}/${editingId}`,
            {
              org_name: orgname,
              admin: {
                first_name: adminFirstName,
                last_name: adminLastName,
                email: adminEmail,
                phone: adminPhone,
              },
            },
            config,
          );

          alert("Organisation Updated");
        }

        resetForm();
        loadOrganisations();
      } catch (error: any) {
          console.log("FULL ERROR:", error);
        console.log("RESPONSE:", error?.response?.data);
        
        alert(error?.response?.data?.message || "Something went wrong");
      }
    };





    const resetForm = () => {
      setEditingId(null);

      setOrgName("");
      setOrgType("");
      setEmail("");
  setAddress("");
      // setAdminName("");
      setAdminFirstName("");
      setAdminLastName("");
    setAdminEmail("");
      setAdminPhone("");
      setPhone("");
      setAadhaarNumber("");
      setPanNumber("");
      setPassportNumber("");
      setPhoto("");
      setRegistrationStartDate("");
      setRegistrationEndDate("");
      setStatus("");
    };

    return (
      <div className="max-w-7xl mx-auto p-6 text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Organisation Management</h1>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Organisation Name */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Organisation Name
              </label>

              <input
                value={orgname}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter organisation name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Organisation Type
              </label>

              <select
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select Type</option>
                <option value="HOSPITAL">Hospital</option>
                <option value="APARTMENT">Apartment</option>
                <option value="EVENT">Event</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email-Id</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Aadhaar Number
              </label>
              <input
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter Aadhaar number"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                PAN Number
              </label>
              <input
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter PAN number"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Passport Number
              </label>
              <input
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Enter Passport number"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Registration Start Date
              </label>
              <input
                type="date"
                value={registrationStartDate}
                onChange={(e) => setRegistrationStartDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Registration End Date
              </label>
              <input
                type="date"
                value={registrationEndDate}
                onChange={(e) => setRegistrationEndDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>

            {/* <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="w-full border rounded-lg p-3"
              />
            </div> */}

            <div className="md:col-span-2">
  <label className="block mb-2 text-sm font-medium">
    Photo
  </label>

  {/* <label
    htmlFor="photo-upload"
    className="flex items-center justify-between w-full border rounded-lg p-3 cursor-pointer hover:border-blue-500 transition"
  >
    <div className="flex items-center gap-2">
      <Upload size={20} className="text-blue-600" />
      <span className="font-medium">Choose File</span>
    </div>

<span className="text-gray-900 text-sm ml-2 truncate">
  {photo ? photo.name : "No file chosen"}
</span>
  </label> */}
  <label
  htmlFor="photo-upload"
  className="flex items-center gap-3 w-full border rounded-lg p-3 cursor-pointer hover:border-blue-500 transition"
>
  <div className="flex items-center gap-2">
    <Upload size={18} className="text-blue-600" />
    <span className="font-medium text-sm">Choose File</span>
  </div>

  <span className="text-xs text-gray-900 truncate">
    {photo ? photo.name : "No file chosen"}
  </span>
</label>

  <input
    id="photo-upload"
    type="file"
    accept="image/*"
    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
    className="hidden"
  />
</div>

            {/* Admin Name */}
            {/* <div>
              <label className="block mb-2 text-sm font-medium">Admin Name</label>

              <input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="John Doe"
              />
            </div> */}

            <div>
              <label className="block mb-2 text-sm font-medium">
                Admin First Name
              </label>

              <input
                value={adminFirstName}
                onChange={(e) => setAdminFirstName(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Admin Last Name
              </label>

              <input
                value={adminLastName}
                onChange={(e) => setAdminLastName(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Last Name"
              />
            </div>
            {/* Admin Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Admin Phone number
              </label>

              <input
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="9876543210"
              />
            </div>

            {/* Admin Email */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">
                Admin Email-Id
              </label>

              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Name</th>               
                <th className="text-left p-4">Schema</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {organisations.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-6">
                    No Organisations Found
                  </td>
                </tr>
              )}

              {organisations.map((org) => (
                <tr key={org.id} className="border-t">
                  <td className="p-4">{org.id}</td>

                  <td className="p-4">{org.org_name}</td>



                  <td className="p-4">{org.schema_name}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button className="px-4 py-2 rounded">-</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }