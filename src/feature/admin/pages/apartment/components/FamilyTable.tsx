import { useState } from "react";
import axios from "axios";

interface Props {
  memberId: number;
  family: any[];
  reload: () => void;
}

// const API = "/api/admin/apartment";
const API = import.meta.env.VITE_BACKEND_URL;

const FamilyTable = ({ memberId, family, reload }: Props) => {
  const [form, setForm] = useState({
    name: "",
    relationship: "",
    age: "",
    mobile_number: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const reset = () => {
    setForm({
      name: "",
      relationship: "",
      age: "",
      mobile_number: "",
    });

    setEditingId(null);
  };

  const save = async () => {
    try {
      if (editingId) {
        await axios.put(
          `${API}/api/admin/apartment/family/${editingId}`,
          form,
          {
            withCredentials: true,
          },
        );
      } else {
        await axios.post(
          `${API}/api/admin/apartment/family`,
          {
            member_id: memberId,
            ...form,
          },
          {
            withCredentials: true,
          },
        );
      }

      reset();
      reload();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed");
    }
  };

  const edit = (item: any) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      relationship: item.relationship,
      age: item.age,
      mobile_number: item.mobile_number,
    });
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete family member?")) return;

    await axios.delete(
      `${API}/api/admin/apartment/family/${id}/member/${memberId}`,
      {
        withCredentials: true,
      },
    );
    reload();
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-3 mb-5">
        <input
          className="border rounded-lg p-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border rounded-lg p-2"
          placeholder="Relationship"
          value={form.relationship}
          onChange={(e) =>
            setForm({
              ...form,
              relationship: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-2"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <input
          className="border rounded-lg p-2"
          placeholder="Mobile"
          value={form.mobile_number}
          onChange={(e) =>
            setForm({
              ...form,
              mobile_number: e.target.value,
            })
          }
        />
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={save}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            onClick={reset}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Relationship</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {family.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.relationship}</td>
              <td className="p-3">{item.age}</td>
              <td className="p-3">{item.mobile_number}</td>

              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => edit(item)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(item.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {family.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No family members
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FamilyTable;
