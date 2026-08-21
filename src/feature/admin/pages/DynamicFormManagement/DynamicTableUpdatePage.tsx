import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import Alert from "../../../../components/Aleartmessage";
const API = `${import.meta.env.VITE_BACKEND_URL}`;

type Template = {
  id: number;
  template_name: string;
};

type Field = {
  field_key: string;
  field_label: string;
};

export default function DynamicTableUpdatePage() {
  const { user } = useContext(AuthContext);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const [displayName, setDisplayName] = useState("");

  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const [tableExists, setTableExists] = useState(false);

  const [alertData, setAlertData] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* ---------------------------------------------
      Load Templates
  ---------------------------------------------- */

  useEffect(() => {
    axios
      .get(`${API}/dynamic-tables/templates`)
      .then((res) => {
        setTemplates(res.data.data);
      })
      .catch((err: any) => {
        console.error(err);

        setAlertData({
          type: "error",
          message: err?.response?.data?.message || "Failed to load templates.",
        });
      });
  }, []);

  /* ---------------------------------------------
      Load Template + Existing Configuration
  ---------------------------------------------- */

  useEffect(() => {
    if (!selectedTemplate) return;

    const load = async () => {
      try {
        setLoading(true);

        const fieldsRes = await axios.get(
          `${API}/dynamic-tables/templates/${selectedTemplate}`,
        );

        setFields(fieldsRes.data.data);

        const configRes = await axios.get(
          `${API}/dynamic-tables/configuration`,
          {
            params: {
              organisationId: user?.organisation_id,
              templateId: selectedTemplate,
            },
          },
        );

        if (!configRes.data.exists) {
          setAlertData({
            type: "error",
            message: "No Dynamic Form found.",
          });

          setTableExists(false);

          setDisplayName("");

          setSelectedFields([]);

          return;
        }

        setTableExists(true);

        setDisplayName(configRes.data.displayName);

        setSelectedFields(configRes.data.selectedFields);
      } catch (err: any) {
        console.error(err);

        setAlertData({
          type: "error",
          message:
            err?.response?.data?.message ||
            "Failed to load table configuration.",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedTemplate]);

  /* ---------------------------------------------
      Toggle Fields
  ---------------------------------------------- */

  const toggleField = (key: string) => {
    setSelectedFields((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key],
    );
  };

  /* ---------------------------------------------
      Update
  ---------------------------------------------- */

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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
    message: "Display Name is required.",
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

      const response = await axios.put(
        `${API}/dynamic-tables`,
        {
          organisationId: user?.organisation_id,
          templateId: selectedTemplate,
          displayName,
          tableName: displayName.toLowerCase().replace(/\s+/g, "_"),
          fields: selectedFields,
          updatedBy: user?.id,
        },
        {
          withCredentials: true,
        },
      );

    setAlertData({
      type: "success",
      message: response.data.message,
    });
    } catch (err: any) {
      console.error(err);

      setAlertData({
        type: "error",
        message: err?.response?.data?.message || "Update Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-8">Update Dynamic Form</h1>

          <form onSubmit={handleUpdate}>
            {/* Template */}

            <div className="mb-6">
              <label className="block font-medium mb-2">Select Template</label>

              <select
                className="w-full border rounded-lg p-3"
                value={selectedTemplate ?? ""}
                onChange={(e) => setSelectedTemplate(Number(e.target.value))}
              >
                <option value="">Select Template</option>

                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.template_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Display Name */}

            <div className="mb-6">
              <label className="block font-medium mb-2">Display Name</label>

              <input
                className="w-full border rounded-lg p-3"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            {/* Fields */}

            {fields.length > 0 && (
              <div className="mb-8">
                <label className="block font-medium mb-3">Fields</label>

                <div className="grid grid-cols-2 gap-3">
                  {fields.map((field) => (
                    <label
                      key={field.field_key}
                      className="border rounded-lg p-3 flex gap-3 items-center"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFields.includes(field.field_key)}
                        onChange={() => toggleField(field.field_key)}
                      />

                      {field.field_label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              disabled={!tableExists || loading}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg"
            >
              {loading ? "Updating..." : "Update Form"}
            </button>
          </form>
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
