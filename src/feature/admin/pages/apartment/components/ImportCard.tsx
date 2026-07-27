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
    <div className="max-w-xl rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">Import Apartment Members</h2>

      <div className="space-y-5">
        <button
          type="button"
          onClick={onDownload}
          className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          Download Excel Template
        </button>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="block w-full rounded-lg border p-3"
        />

        <button
          type="button"
          onClick={onImport}
          disabled={loading}
          className="w-full rounded-lg bg-green-600 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Importing..." : "Import Excel"}
        </button>
      </div>
    </div>
  );
};

export default ImportCard;
