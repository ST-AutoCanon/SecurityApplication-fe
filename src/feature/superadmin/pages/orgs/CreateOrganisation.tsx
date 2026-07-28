  import { useState } from "react";
  import { Upload } from "lucide-react";
  import axios from "axios";
import Alert from "../../../../components/Aleartmessage"; // Change the path if needed
  // const API = "http://localhost:5000/api/org-super-admin";
  const API = `${import.meta.env.VITE_BACKEND_URL}/api/org-super-admin`;

  // const config = {
  //   withCredentials: true,
  // };


  export default function OrganisationPage() {

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
  const [alertOpen, setAlertOpen] = useState(false);
const [alertType, setAlertType] = useState<"success" | "error">("success");
const [alertMessage, setAlertMessage] = useState("");

// const handleSubmit = async () => {
//   try {
//     if (!orgname.trim()) {
//       alert("Organisation Name Required");
//       return;
//     }

//     if (!adminEmail.trim()) {
//       alert("Admin Email Required");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("org_name", orgname);
//     formData.append("org_type", orgType);
//     formData.append("phone", phone);
//     formData.append("email", email);
//     formData.append("address", address);
//     formData.append("aadhaar_number", aadhaarNumber);
//     formData.append("pan_number", panNumber);
//     formData.append("passport_number", passportNumber);
//     formData.append("registration_start_date", registrationStartDate);
//     formData.append("registration_end_date", registrationEndDate);
//     formData.append("status", status);

//     formData.append(
//       "admin",
//       JSON.stringify({
//         first_name: adminFirstName,
//         last_name: adminLastName,
//         email: adminEmail,
//         phone: adminPhone,
//       }),
//     );

//     if (photo) {
//       formData.append("photo", photo);
//     }

//     await axios.post(`${API}/register`, formData, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     alert("Organisation Created");
//     resetForm();
//   } catch (error: any) {
//     console.log(error);
//     alert(error?.response?.data?.message || "Something went wrong");
//   }
// };

const showAlert = (
  type: "success" | "error",
  message: string
) => {
  setAlertType(type);
  setAlertMessage(message);
  setAlertOpen(true);
};
const handleSubmit = async () => {
  try {
    // Organisation Name
    if (!orgname.trim()) {
      showAlert("error", "Organisation Name is required");
      return;
    }

    // Organisation Type
    if (!orgType) {
      showAlert("error", "Please select Organisation Type");
      return;
    }

    // Phone
    if (!phone.trim()) {
      showAlert("error", "Phone Number is required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showAlert("error", "Please enter a valid 10-digit Phone Number");
      return;
    }

    // Email
    if (!email.trim()) {
      showAlert("error", "Organisation Email is required");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      showAlert("error", "Please enter a valid Organisation Email");
      return;
    }

    // Address
    if (!address.trim()) {
      showAlert("error", "Address is required");
      return;
    }

    // Aadhaar (Optional)
    if (aadhaarNumber && !/^\d{12}$/.test(aadhaarNumber)) {
      showAlert("error", "Aadhaar Number must be exactly 12 digits");
      return;
    }

    // PAN (Optional)
    if (
      panNumber &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber.toUpperCase())
    ) {
      showAlert("error", "Please enter a valid PAN Number");
      return;
    }

    // Passport (Optional)
    if (
      passportNumber &&
      !/^[A-Z][0-9]{7}$/.test(passportNumber.toUpperCase())
    ) {
      showAlert("error", "Please enter a valid Passport Number");
      return;
    }

    // Registration Dates
    if (!registrationStartDate) {
      showAlert("error", "Registration Start Date is required");
      return;
    }

    if (!registrationEndDate) {
      showAlert("error", "Registration End Date is required");
      return;
    }

    if (
      new Date(registrationEndDate) <
      new Date(registrationStartDate)
    ) {
      showAlert(
        "error",
        "Registration End Date cannot be earlier than Start Date"
      );
      return;
    }

    // Status
    if (!status) {
      showAlert("error", "Please select Status");
      return;
    }

    // Photo Validation (Optional)
    if (photo) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      if (!allowedTypes.includes(photo.type)) {
        showAlert("error", "Only JPG, JPEG and PNG images are allowed");
        return;
      }

      if (photo.size > 2 * 1024 * 1024) {
        showAlert("error", "Photo size should be less than 2MB");
        return;
      }
    }

    // Admin First Name
    if (!adminFirstName.trim()) {
      showAlert("error", "Admin First Name is required");
      return;
    }

    // Admin Last Name
    if (!adminLastName.trim()) {
      showAlert("error", "Admin Last Name is required");
      return;
    }

    // Admin Phone
    if (!adminPhone.trim()) {
      showAlert("error", "Admin Phone Number is required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(adminPhone)) {
      showAlert("error", "Please enter a valid Admin Phone Number");
      return;
    }

    // Admin Email
    if (!adminEmail.trim()) {
      showAlert("error", "Admin Email is required");
      return;
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(adminEmail)
    ) {
      showAlert("error", "Please enter a valid Admin Email");
      return;
    }

    // Create FormData
    const formData = new FormData();

    formData.append("org_name", orgname);
    formData.append("org_type", orgType);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("aadhaar_number", aadhaarNumber);
    formData.append("pan_number", panNumber.toUpperCase());
    formData.append("passport_number", passportNumber.toUpperCase());
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
      })
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

    showAlert("success", "Organisation Created Successfully");
    resetForm();

  } catch (error: any) {
    console.log(error);

    showAlert(
      "error",
      error?.response?.data?.message || "Something went wrong"
    );
  }
};


    const resetForm = () => {
     

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
    setPhoto(null);
      setRegistrationStartDate("");
      setRegistrationEndDate("");
      setStatus("");
    };

    return (
      <div className="max-w-7xl mx-auto p-6 text-gray-800">
        {alertOpen && (
  <Alert
    type={alertType}
    message={alertMessage}
    onClose={() => setAlertOpen(false)}
  />
)}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          Organisation Management
        </h1>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Organisation Name */}
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Organisation Name<span className="text-red-500">*</span>

            </label>

              <input
                value={orgname}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter organisation name"
              />
            </div>

            {/* <div>
              <label className="block mb-2 text-sm font-medium">
                Organisation Type
              </label> */}
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Organisation Type<span className="text-red-500">*</span>
            </label>

              <select
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="HOSPITAL">Hospital</option>
                <option value="APARTMENT">Apartment</option>
                <option value="EVENT">Event</option>
              </select>
            </div>
<div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Phone Number<span className="text-red-500">*</span>
            </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>
                      <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">Email-Id<span className="text-red-500">*</span></label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
              />
            </div>
          <div className="md:col-span-2 flex flex-col">
            <label className="mb-2 text-sm font-medium">Address<span className="text-red-500">*</span></label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter address"
              />
            </div>

            <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Aadhaar Number
            </label>

              <input
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Aadhaar number (12 digits)"
              />
            </div>

                      <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              PAN Number
            </label>

              <input
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter PAN number(For example : ABCDE1234F)"
              />
            </div>

           <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Passport Number
            </label>
              <input
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Passport number (For example : A1234567)"
              />
            </div>

            <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Registration Start Date<span className="text-red-500">*</span>
            </label>

              <input
                type="date"
                value={registrationStartDate}
                onChange={(e) => setRegistrationStartDate(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

             <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Registration End Date<span className="text-red-500">*</span>
            </label>

              <input
                type="date"
                value={registrationEndDate}
                onChange={(e) => setRegistrationEndDate(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">Status<span className="text-red-500">*</span></label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

            <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Admin First Name<span className="text-red-500">*</span>
            </label>

              <input
                value={adminFirstName}
                onChange={(e) => setAdminFirstName(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="First Name"
              />
            </div>

            <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Admin Last Name<span className="text-red-500">*</span>
            </label>

              <input
                value={adminLastName}
                onChange={(e) => setAdminLastName(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Last Name"
              />
            </div>
            {/* Admin Phone */}
           <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">
              Admin Phone number<span className="text-red-500">*</span>
            </label>

              <input
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="9876543210"
              />
            </div>

            {/* Admin Email */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">
                Admin Email-Id<span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded"
            >
              Create Organisation
            </button>
          </div>
        </div>
      </div>
    );
  }