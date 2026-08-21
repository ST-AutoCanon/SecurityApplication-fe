import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import Alert from "../../../../components/Aleartmessage"; // adjust the path
const API = `${import.meta.env.VITE_BACKEND_URL}`;

type Template = {
  id: number;
  template_name: string;
};

type Field = {
  field_key: string;
  field_label: string;
};

export default function DynamicTableCreatePage() {
  const { user } = useContext(AuthContext);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [tableExists, setTableExists] = useState(false);
  
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
const [alertData, setAlertData] = useState<{
  type: "success" | "error";
  message: string;
} | null>(null);
  /* ---------------- GET TEMPLATES ---------------- */
  useEffect(() => {
    axios
      .get(`${API}/dynamic-tables/templates`)
      .then((res) => setTemplates(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  /* ---------------- GET FIELDS ---------------- */
  // useEffect(() => {
  //   if (!selectedTemplate) return;

  //   axios
  //     .get(`${API}/dynamic-tables/templates/${selectedTemplate}`)
  //     .then((res) => setFields(res.data.data))
  //     .catch((err) => console.error(err));
  // }, [selectedTemplate]);

  /* ---------------- GET FIELDS + EXISTING CONFIG ---------------- */
  useEffect(() => {
    if (!selectedTemplate) return;

    const loadData = async () => {
      try {
        // Load template fields
        const fieldsRes = await axios.get(
          `${API}/dynamic-tables/templates/${selectedTemplate}`,
        );

        setFields(fieldsRes.data.data);

        // Load existing configuration
        const configRes = await axios.get(
          `${API}/dynamic-tables/configuration`,
          {
            params: {
              organisationId: user?.organisation_id,
              templateId: selectedTemplate,
            },
          },
        );

    if (configRes.data.exists) {
      setTableExists(true);
      setDisplayName(configRes.data.displayName);
      setSelectedFields(configRes.data.selectedFields);
    } else {
      setTableExists(false);
      setDisplayName("");
      setSelectedFields([]);
    }
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [selectedTemplate, user?.organisation_id]);

  
  /* ---------------- TOGGLE FIELD ---------------- */
  const toggleField = (key: string) => {
    setSelectedFields((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
    );
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

if (!selectedTemplate) {
  return setAlertData({
    type: "error",
    message: "Please select a template.",
  });
}

if (!displayName.trim()) {
  return setAlertData({
    type: "error",
    message: "Display name is required.",
  });
}

if (selectedFields.length === 0) {
  return setAlertData({
    type: "error",
    message: "Please select at least one field.",
  });
}

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/dynamic-tables`,
        {
          organisationId: user?.organisation_id,
          templateId: selectedTemplate,
          displayName,
          tableName: displayName.toLowerCase().replace(/\s+/g, "_"),
          createdBy: user?.id,
          fields: selectedFields,
        },
        { withCredentials: true },
      );

    setAlertData({
      type: "success",
      message: res.data.message,
    });

      // reset
      setSelectedTemplate(null);
      setSelectedFields([]);
      setDisplayName("");
      setFields([]);
    } catch (err: any) {
      setAlertData({
        type: "error",
        message: err?.response?.data?.message || "Error creating Form",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Create Dynamic Form</h1>

          {/* ---------------- TEMPLATE SELECT ---------------- */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select Template</label>

            <select
              className="w-full border rounded-lg p-3"
              value={selectedTemplate || ""}
              onChange={(e) => setSelectedTemplate(Number(e.target.value))}
            >
              <option value="">Select</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.template_name}
                </option>
              ))}
            </select>
          </div>

          {/* ---------------- DISPLAY NAME ---------------- */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Display Name</label>

            <input
              className="w-full border rounded-lg p-3"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Maids / Visitors"
            />
          </div>

          {/* ---------------- FIELD SELECT ---------------- */}
          {fields.length > 0 && (
            <div className="mb-6">
              <label className="block mb-3 font-medium">Select Fields</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fields.map((f) => (
                  <label
                    key={f.field_key}
                    className="flex items-center gap-2 border p-3 rounded-lg"
                  >
                    {/* <input
                    type="checkbox"
                    onChange={() => toggleField(f.field_key)}
                  /> */}
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(f.field_key)}
                      onChange={() => toggleField(f.field_key)}
                    />
                    {f.field_label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- SUBMIT ---------------- */}
          <button
            onClick={handleSubmit}
            disabled={loading || tableExists}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
          >
            {tableExists
              ? "Table Already Exists"
              : loading
                ? "Creating..."
                : "Create Table"}
          </button>
        </div>
      </div>
      {alertData && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData(null)}
        />
      )}
    </>
  );
}
