// // import { useState } from "react";
// // import axios from "axios";
// // import { Download, Upload, FileSpreadsheet } from "lucide-react";

// // // const API = "/api/admin/apartment";
// // const API = import.meta.env.VITE_BACKEND_URL;

// // const ImportMembers = () => {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleImport = async () => {
// //     if (!file) return;

// //     try {
// //       setLoading(true);

// //       const formData = new FormData();
// //       formData.append("file", file);

// //       const { data } = await axios.post(
// //         `${API}/api/admin/apartment/members/import`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //           withCredentials: true,
// //         },
// //       );

// //       alert(data.message);
// //       setFile(null);
// //     } catch (error: any) {
// //       alert(error?.response?.data?.message || "Import failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const downloadTemplate = async () => {
// //     try {
// //       const response = await axios.get(
// //         `${API}/api/admin/apartment/members/import/template`,
// //         {
// //           responseType: "blob",
// //           withCredentials: true,
// //         },
// //       );

// //       const url = window.URL.createObjectURL(new Blob([response.data]));

// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.download = "Apartment_Import_Template.xlsx";
// //       link.click();

// //       window.URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to download template.");
// //     }
// //   };

// //   return (
// //     <div className="mx-auto max-w-2xl p-4 sm:p-6">
// //       <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
// //         <h1 className="text-2xl font-bold text-gray-800">
// //           Import Apartment Members
// //         </h1>

// //         <p className="mt-2 text-sm text-gray-500">
// //           Download the Excel template, fill in the member details, and upload
// //           the completed file to import members in bulk.
// //         </p>

// //         <div className="mt-8 space-y-6">
// //           {/* Download Button */}
// //           <button
// //             onClick={downloadTemplate}
// //             className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
// //           >
// //             <Download size={20} />
// //             Download Excel Template
// //           </button>

// //           {/* Upload Area */}
// //           <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-indigo-500 hover:bg-indigo-50">
// //             <FileSpreadsheet size={50} className="mb-4 text-green-600" />

// //             <span className="text-base font-medium text-gray-700">
// //               Click to choose an Excel file
// //             </span>

// //             <span className="mt-1 text-sm text-gray-500">
// //               Supported formats: .xlsx, .xls
// //             </span>

// //             {file && (
// //               <div className="mt-4 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
// //                 📄 {file.name}
// //               </div>
// //             )}

// //             <input
// //               type="file"
// //               accept=".xlsx,.xls"
// //               onChange={(e) => setFile(e.target.files?.[0] || null)}
// //               className="hidden"
// //             />
// //           </label>

// //           {/* Import Button */}
// //           <button
// //             onClick={handleImport}
// //             disabled={!file || loading}
// //             className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
// //           >
// //             <Upload size={20} />

// //             {loading ? "Importing..." : "Import Excel"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImportMembers;
// ///////////////////////////
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { ArrowLeft, Download, Upload, FileSpreadsheet } from "lucide-react";

// // // const API = "/api/admin/apartment";
// // const API = import.meta.env.VITE_BACKEND_URL;

// // const ImportMembers = () => {
// //   const navigate = useNavigate();

// //   const [file, setFile] = useState<File | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleImport = async () => {
// //     if (!file) return;

// //     try {
// //       setLoading(true);

// //       const formData = new FormData();
// //       formData.append("file", file);

// //       const { data } = await axios.post(
// //         `${API}/api/admin/apartment/members/import`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //           withCredentials: true,
// //         },
// //       );

// //       alert(data.message);
// //       setFile(null);
// //     } catch (error: any) {
// //       alert(error?.response?.data?.message || "Import failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const downloadTemplate = async () => {
// //     try {
// //       const response = await axios.get(
// //         `${API}/api/admin/apartment/members/import/template`,
// //         {
// //           responseType: "blob",
// //           withCredentials: true,
// //         },
// //       );

// //       const url = window.URL.createObjectURL(new Blob([response.data]));

// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.download = "Apartment_Import_Template.xlsx";
// //       link.click();

// //       window.URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to download template.");
// //     }
// //   };

// //   return (
// //     <div className="mx-auto max-w-3xl p-4 sm:p-6">
// //       <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
// //         {/* Header */}
// //         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-800">
// //               Import Apartment Members
// //             </h1>

// //             <p className="mt-2 text-sm text-gray-500">
// //               Download the Excel template, fill in the member details, and
// //               upload the completed file to import apartment members in bulk.
// //             </p>
// //           </div>

// //           <button
// //             onClick={() => navigate("/admin/organisation/apartment/members")}
// //             className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
// //           >
// //             <ArrowLeft size={18} />
// //             Back
// //           </button>
// //         </div>

// //         <div className="space-y-6">
// //           {/* Download Template */}
// //           <button
// //             onClick={downloadTemplate}
// //             className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
// //           >
// //             <Download size={20} />
// //             Download Excel Template
// //           </button>

// //           {/* Upload Area */}
// //           <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-50">
// //             <FileSpreadsheet size={52} className="mb-4 text-green-600" />

// //             <h3 className="text-lg font-semibold text-gray-700">
// //               Select Excel File
// //             </h3>

// //             <p className="mt-1 text-sm text-gray-500">
// //               Click anywhere in this box to browse your computer.
// //             </p>

// //             <p className="mt-1 text-xs text-gray-400">
// //               Supported formats: .xlsx, .xls
// //             </p>

// //             {file && (
// //               <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
// //                 📄 {file.name}
// //               </div>
// //             )}

// //             <input
// //               type="file"
// //               accept=".xlsx,.xls"
// //               onChange={(e) => setFile(e.target.files?.[0] || null)}
// //               className="hidden"
// //             />
// //           </label>

// //           {/* Import Button */}
// //           <button
// //             onClick={handleImport}
// //             disabled={!file || loading}
// //             className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
// //           >
// //             <Upload size={20} />
// //             {loading ? "Importing..." : "Import Excel"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImportMembers;

// ///////////

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ArrowLeft, Download, Upload, FileSpreadsheet } from "lucide-react";
// import Alert from "../../../../../../components/Aleartmessage";

// // const API = "/api/admin/apartment";
// const API = import.meta.env.VITE_BACKEND_URL;

// const ImportMembers = () => {
//   const navigate = useNavigate();

//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Popup alert state
//   const [alert, setAlert] = useState<{
//     type: "success" | "warning" | "error";
//     message: string;
//   } | null>(null);

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

//       setAlert({
//         type: "success",
//         message: data.message || "Members imported successfully!",
//       });

//       setFile(null);
//     } catch (error: any) {
//       setAlert({
//         type: "error",
//         message: error?.response?.data?.message || "Import failed",
//       });
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

//       setAlert({
//         type: "error",
//         message: "Failed to download template.",
//       });
//     }
//   };

//   return (
//     <div className="mx-auto max-w-3xl p-4 sm:p-6">
//       {/* Custom Popup */}
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => setAlert(null)}
//         />
//       )}

//       <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Import Apartment Members
//             </h1>

//             <p className="mt-2 text-sm text-gray-500">
//               Download the Excel template, fill in the member details, and
//               upload the completed file to import apartment members in bulk.
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/admin/organisation/apartment/members")}
//             className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>
//         </div>

//         <div className="space-y-6">
//           {/* Download Template */}
//           <button
//             onClick={downloadTemplate}
//             className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
//           >
//             <Download size={20} />
//             Download Excel Template
//           </button>

//           {/* Upload Area */}
//           <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-50">
//             <FileSpreadsheet size={52} className="mb-4 text-green-600" />

//             <h3 className="text-lg font-semibold text-gray-700">
//               Select Excel File
//             </h3>

//             <p className="mt-1 text-sm text-gray-500">
//               Click anywhere in this box to browse your computer.
//             </p>

//             <p className="mt-1 text-xs text-gray-400">
//               Supported formats: .xlsx, .xls
//             </p>

//             {file && (
//               <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
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

import Alert from "../../../../../../components/Aleartmessage";

const API = import.meta.env.VITE_BACKEND_URL;

const ImportMembers = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState<{
    type: "success" | "warning" | "error";
    message: string;
  } | null>(null);

  /* ----------------------------------------
     Import Members
  ----------------------------------------- */
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

      setAlert({
        type: "success",
        message: data.message || "Members imported successfully!",
      });

      setFile(null);
    } catch (error: any) {
      setAlert({
        type: "error",
        message: error?.response?.data?.message || "Import failed",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------
     Download Template
  ----------------------------------------- */
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

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      setAlert({
        type: "error",
        message: "Failed to download template.",
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-6 md:p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileSpreadsheet size={24} />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Import Apartment Members
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Import apartment members using an Excel file.
              </p>
            </div>
          </div>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/admin/organisation/apartment/members")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="space-y-6">
            {/* Download Template */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Excel Template
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Download the template and fill in the apartment member
                    details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={downloadTemplate}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <Download size={17} />
                  Download Template
                </button>
              </div>
            </div>

            {/* Upload Area */}
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/50">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileSpreadsheet size={28} />
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                Select Excel File
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Click anywhere in this area to browse your computer.
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Supported formats: .xlsx, .xls
              </p>

              {file && (
                <div className="mt-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  <FileSpreadsheet size={17} />
                  <span className="max-w-xs truncate">{file.name}</span>
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
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleImport}
                disabled={!file || loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
              >
                <Upload size={17} />

                {loading ? "Importing..." : "Import Excel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportMembers;