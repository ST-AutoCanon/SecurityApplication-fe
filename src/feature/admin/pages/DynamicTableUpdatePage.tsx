import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

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

  /* ---------------------------------------------
      Load Templates
  ---------------------------------------------- */

  useEffect(() => {
    axios
      .get(`${API}/dynamic-tables/templates`)
      .then((res) => {
        setTemplates(res.data.data);
      })
      .catch(console.error);
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
          alert("No Dynamic Table found.");

          setTableExists(false);

          setDisplayName("");

          setSelectedFields([]);

          return;
        }

        setTableExists(true);

        setDisplayName(configRes.data.displayName);

        setSelectedFields(configRes.data.selectedFields);
      } catch (err) {
        console.error(err);
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
      return alert("Select Template");
    }

    if (!displayName.trim()) {
      return alert("Display Name required");
    }

    if (selectedFields.length === 0) {
      return alert("Select at least one field");
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

      alert(response.data.message);
    } catch (err: any) {
      console.error(err);

      alert(err?.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8">Update Dynamic Table</h1>

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
            {loading ? "Updating..." : "Update Table"}
          </button>
        </form>
      </div>
    </div>
  );
}
