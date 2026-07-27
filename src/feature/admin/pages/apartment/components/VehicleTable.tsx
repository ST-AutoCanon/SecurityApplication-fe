import { useState } from "react";
import axios from "axios";

interface Props {
  memberId: number;
  vehicles: any[];
  reload: () => void;
}

// const API = "/api/admin/apartment";
const API = import.meta.env.VITE_BACKEND_URL;
const VehicleTable = ({ memberId, vehicles, reload }: Props) => {
  const [form, setForm] = useState({
    vehicle_type: "",
    vehicle_number: "",
    vehicle_brand: "",
    parking_slot: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const reset = () => {
    setForm({
      vehicle_type: "",
      vehicle_number: "",
      vehicle_brand: "",
      parking_slot: "",
    });

    setEditingId(null);
  };

  const save = async () => {
    try {
      if (editingId) {
        await axios.put(
          `${API}/api/admin/apartment/vehicles/${editingId}`,
          form,
          {
            withCredentials: true,
          },
        );
      } else {
        await axios.post(
          `${API}/api/admin/apartment/vehicles`,
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
      vehicle_type: item.vehicle_type,
      vehicle_number: item.vehicle_number,
      vehicle_brand: item.vehicle_brand,
      parking_slot: item.parking_slot,
    });
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete vehicle?")) return;

    await axios.delete(`${API}/api/admin/apartment/vehicles/${id}`, {
      withCredentials: true,
    });
    reload();
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-3 mb-5">
        <select
          className="border rounded-lg p-2"
          value={form.vehicle_type}
          onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
        >
          <option value="">Vehicle Type</option>
          <option value="CAR">Car</option>
          <option value="BIKE">Bike</option>
          <option value="SCOOTER">Scooter</option>
          <option value="CYCLE">Cycle</option>
        </select>

        <input
          className="border rounded-lg p-2"
          placeholder="Vehicle Number"
          value={form.vehicle_number}
          onChange={(e) =>
            setForm({
              ...form,
              vehicle_number: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-2"
          placeholder="Brand"
          value={form.vehicle_brand}
          onChange={(e) =>
            setForm({
              ...form,
              vehicle_brand: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-2"
          placeholder="Parking Slot"
          value={form.parking_slot}
          onChange={(e) =>
            setForm({
              ...form,
              parking_slot: e.target.value,
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
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Number</th>
            <th className="p-3 text-left">Brand</th>
            <th className="p-3 text-left">Parking</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.vehicle_type}</td>
              <td className="p-3">{item.vehicle_number}</td>
              <td className="p-3">{item.vehicle_brand}</td>
              <td className="p-3">{item.parking_slot}</td>

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

          {vehicles.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No vehicles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
