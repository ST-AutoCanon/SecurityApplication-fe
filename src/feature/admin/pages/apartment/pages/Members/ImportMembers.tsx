import { useState } from "react";
import axios from "axios";

// const API = "/api/admin/apartment";
const API = import.meta.env.VITE_BACKEND_URL;
const ImportMembers = () => {
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
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Import Apartment Members</h1>

        <div className="space-y-5">
          <button
            onClick={downloadTemplate}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white"
          >
            Download Excel Template
          </button>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full border rounded-lg p-3"
          />

          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="w-full py-3 rounded-lg bg-green-600 text-white disabled:opacity-50"
          >
            {loading ? "Importing..." : "Import Excel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportMembers;
