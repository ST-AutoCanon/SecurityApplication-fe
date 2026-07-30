// import { useState } from "react";
// import axios from "axios";
// import { Download, Upload, FileSpreadsheet } from "lucide-react";

// // const API = "/api/admin/apartment";
// const API = import.meta.env.VITE_BACKEND_URL;

// const ImportMembers = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleImport = async () => {
//     if (!file) return;

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("file", file);

//       const { data } = await axios.post(
//         `${API}/api/admin/apartment/members/import`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         },
//       );

//       alert(data.message);
//       setFile(null);
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Import failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadTemplate = async () => {
//     try {
//       const response = await axios.get(
//         `${API}/api/admin/apartment/members/import/template`,
//         {
//           responseType: "blob",
//           withCredentials: true,
//         },
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "Apartment_Import_Template.xlsx";
//       link.click();

//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to download template.");
//     }
//   };

//   return (
//     <div className="mx-auto max-w-2xl p-4 sm:p-6">
//       <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Import Apartment Members
//         </h1>

//         <p className="mt-2 text-sm text-gray-500">
//           Download the Excel template, fill in the member details, and upload
//           the completed file to import members in bulk.
//         </p>

//         <div className="mt-8 space-y-6">
//           {/* Download Button */}
//           <button
//             onClick={downloadTemplate}
//             className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
//           >
//             <Download size={20} />
//             Download Excel Template
//           </button>

//           {/* Upload Area */}
//           <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-indigo-500 hover:bg-indigo-50">
//             <FileSpreadsheet size={50} className="mb-4 text-green-600" />

//             <span className="text-base font-medium text-gray-700">
//               Click to choose an Excel file
//             </span>

//             <span className="mt-1 text-sm text-gray-500">
//               Supported formats: .xlsx, .xls
//             </span>

//             {file && (
//               <div className="mt-4 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
//                 📄 {file.name}
//               </div>
//             )}

//             <input
//               type="file"
//               accept=".xlsx,.xls"
//               onChange={(e) => setFile(e.target.files?.[0] || null)}
//               className="hidden"
//             />
//           </label>

//           {/* Import Button */}
//           <button
//             onClick={handleImport}
//             disabled={!file || loading}
//             className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//           >
//             <Upload size={20} />

//             {loading ? "Importing..." : "Import Excel"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImportMembers;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Download, Upload, FileSpreadsheet } from "lucide-react";

// const API = "/api/admin/apartment";
const API = import.meta.env.VITE_BACKEND_URL;

const ImportMembers = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        `${API}/api/admin/apartment/members/import`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      alert(data.message);
      setFile(null);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Import failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get(
        `${API}/api/admin/apartment/members/import/template`,
        {
          responseType: "blob",
          withCredentials: true,
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = "Apartment_Import_Template.xlsx";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download template.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Import Apartment Members
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Download the Excel template, fill in the member details, and
              upload the completed file to import apartment members in bulk.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/organisation/apartment/members")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        <div className="space-y-6">
          {/* Download Template */}
          <button
            onClick={downloadTemplate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            <Download size={20} />
            Download Excel Template
          </button>

          {/* Upload Area */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-50">
            <FileSpreadsheet size={52} className="mb-4 text-green-600" />

            <h3 className="text-lg font-semibold text-gray-700">
              Select Excel File
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Click anywhere in this box to browse your computer.
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Supported formats: .xlsx, .xls
            </p>

            {file && (
              <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                📄 {file.name}
              </div>
            )}

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>

          {/* Import Button */}
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <Upload size={20} />
            {loading ? "Importing..." : "Import Excel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportMembers;