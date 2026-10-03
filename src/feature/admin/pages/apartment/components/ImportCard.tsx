// interface ImportCardProps {
//   onDownload: () => void;
//   onFileChange: (file: File | null) => void;
//   onImport: () => void;
//   loading?: boolean;
// }

// const ImportCard = ({
//   onDownload,
//   onFileChange,
//   onImport,
//   loading = false,
// }: ImportCardProps) => {
//   return (
//     <div className="max-w-xl rounded-xl bg-white p-6 shadow">
//       <h2 className="mb-6 text-2xl font-bold">Import Apartment Members</h2>

//       <div className="space-y-5">
//         <button
//           type="button"
//           onClick={onDownload}
//           className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
//         >
//           Download Excel Template
//         </button>

//         <input
//           type="file"
//           accept=".xlsx,.xls"
//           onChange={(e) => onFileChange(e.target.files?.[0] || null)}
//           className="block w-full rounded-lg border p-3"
//         />

//         <button
//           type="button"
//           onClick={onImport}
//           disabled={loading}
//           className="w-full rounded-lg bg-green-600 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {loading ? "Importing..." : "Import Excel"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImportCard;

interface ImportCardProps {
  onDownload: () => void;
  onFileChange: (file: File | null) => void;
  onImport: () => void;
  loading?: boolean;
}

const ImportCard = ({
  onDownload,
  onFileChange,
  onImport,
  loading = false,
}: ImportCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FileSpreadsheet size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Import Apartment Members
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Download the Excel template and import apartment members.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Download Template */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Excel Template
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Download the template before importing members.
                </p>
              </div>

              <button
                type="button"
                onClick={onDownload}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Download size={17} />
                Download Template
              </button>
            </div>
          </div>

          {/* File Upload */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileSpreadsheet size={28} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-900">
              Select Excel File
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Click anywhere here to browse your computer.
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Supported formats: .xlsx, .xls
            </p>

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => onFileChange(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>

          {/* Import Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onImport}
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
            >
              <Upload size={17} />
              {loading ? "Importing..." : "Import Excel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportCard;