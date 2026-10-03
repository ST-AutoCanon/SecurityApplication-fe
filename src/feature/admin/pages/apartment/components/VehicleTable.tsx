// import { useState } from "react";
// import axios from "axios";
// import Alert from "../../../../../components/Aleartmessage";

// interface Props {
//   memberId: number;
//   vehicles: any[];
//   reload: () => void;
// }

// const API = import.meta.env.VITE_BACKEND_URL;

// const VehicleTable = ({ memberId, vehicles, reload }: Props) => {
//   const [form, setForm] = useState({
//     vehicle_type: "",
//     vehicle_number: "",
//     vehicle_brand: "",
//     parking_slot: "",
//   });

//   const [editingId, setEditingId] = useState<number | null>(null);

//   // Popup states
//   const [deleteId, setDeleteId] = useState<number | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const reset = () => {
//     setForm({
//       vehicle_type: "",
//       vehicle_number: "",
//       vehicle_brand: "",
//       parking_slot: "",
//     });

//     setEditingId(null);
//   };

//   const save = async () => {
//     // Validate required fields
//     if (
//       !form.vehicle_type.trim() ||
//       !form.vehicle_number.trim() ||
//       !form.vehicle_brand.trim() ||
//       !form.parking_slot.trim()
//     ) {
//       setErrorMessage("Please fill in all vehicle details");
//       return;
//     }

//     try {
//       if (editingId) {
//         // Update vehicle
//         await axios.put(
//           `${API}/api/admin/apartment/vehicles/${editingId}`,
//           form,
//           {
//             withCredentials: true,
//           },
//         );
//       } else {
//         // Add vehicle
//         await axios.post(
//           `${API}/api/admin/apartment/vehicles`,
//           {
//             member_id: memberId,
//             ...form,
//           },
//           {
//             withCredentials: true,
//           },
//         );
//       }

//       reset();
//       reload();
//     } catch (err: any) {
//       setErrorMessage(err?.response?.data?.message || "Failed to save vehicle");
//     }
//   };

//   const edit = (item: any) => {
//     setEditingId(item.id);

//     setForm({
//       vehicle_type: item.vehicle_type,
//       vehicle_number: item.vehicle_number,
//       vehicle_brand: item.vehicle_brand,
//       parking_slot: item.parking_slot,
//     });
//   };

//   const remove = async () => {
//     if (!deleteId) return;

//     try {
//       await axios.delete(`${API}/api/admin/apartment/vehicles/${deleteId}`, {
//         withCredentials: true,
//       });

//       setDeleteId(null);
//       reload();
//     } catch (err: any) {
//       setDeleteId(null);

//       setErrorMessage(
//         err?.response?.data?.message || "Failed to delete vehicle",
//       );
//     }
//   };

//   // Common input/select class
//   const inputClass = `w-full h-11 rounded-lg border px-3 focus:outline-none focus:border-blue-500 ${
//     editingId ? "border-blue-500" : "border-gray-300"
//   }`;

//   return (
//     <div>
//       {/* Delete Confirmation Popup */}
//       {deleteId && (
//         <Alert
//           type="warning"
//           message="Are you sure you want to delete this vehicle?"
//           confirm={true}
//           confirmText="Yes"
//           cancelText="No"
//           onConfirm={remove}
//           onClose={() => setDeleteId(null)}
//         />
//       )}

//       {/* Error Popup */}
//       {errorMessage && (
//         <Alert
//           type="error"
//           message={errorMessage}
//           onClose={() => setErrorMessage(null)}
//         />
//       )}

//       {/* Vehicle Form */}
//       <div className="grid md:grid-cols-4 gap-3 mb-5">
//         <select
//           className={inputClass}
//           value={form.vehicle_type}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               vehicle_type: e.target.value,
//             })
//           }
//         >
//           <option value="">Vehicle Type</option>
//           <option value="CAR">Car</option>
//           <option value="BIKE">Bike</option>
//           <option value="SCOOTER">Scooter</option>
//           <option value="CYCLE">Cycle</option>
//         </select>

//         <input
//           type="text"
//           className={inputClass}
//           placeholder="Vehicle Number"
//           value={form.vehicle_number}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               vehicle_number: e.target.value,
//             })
//           }
//         />

//         <input
//           type="text"
//           className={inputClass}
//           placeholder="Brand"
//           value={form.vehicle_brand}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               vehicle_brand: e.target.value,
//             })
//           }
//         />

//         <input
//           type="text"
//           className={inputClass}
//           placeholder="Parking Slot"
//           value={form.parking_slot}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               parking_slot: e.target.value,
//             })
//           }
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-3 mb-6">
//         <button
//           onClick={save}
//           className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 hover:from-blue-700 hover:to-blue-600 transition"
//         >
//           {editingId ? (
//             "Update"
//           ) : (
//             <>
//               <span className="text-xl leading-none">+</span>
//               Add
//             </>
//           )}
//         </button>

//         {editingId && (
//           <button
//             onClick={reset}
//             className="mt-4 bg-gray-500 px-6 py-3 rounded-xl text-white font-medium hover:bg-gray-600 transition"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       {/* Vehicles Table */}
//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Type</th>
//             <th className="p-3 text-left">Number</th>
//             <th className="p-3 text-left">Brand</th>
//             <th className="p-3 text-left">Parking</th>
//             <th className="p-3 text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {vehicles.map((item) => (
//             <tr key={item.id} className="border-t">
//               <td className="p-3">{item.vehicle_type}</td>
//               <td className="p-3">{item.vehicle_number}</td>
//               <td className="p-3">{item.vehicle_brand}</td>
//               <td className="p-3">{item.parking_slot}</td>

//               <td className="p-3 text-center space-x-2">
//                 <button
//                   onClick={() => edit(item)}
//                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => setDeleteId(item.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}

//           {vehicles.length === 0 && (
//             <tr>
//               <td colSpan={5} className="text-center py-6 text-gray-500">
//                 No vehicles found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VehicleTable;

import { useState } from "react";
import axios from "axios";
import { Car, Edit, Plus, Trash2, X } from "lucide-react";

import Alert from "../../../../../components/Aleartmessage";

interface Props {
  memberId: number;
  vehicles: any[];
  reload: () => void;
}

const API = import.meta.env.VITE_BACKEND_URL;

const VehicleTable = ({ memberId, vehicles, reload }: Props) => {
  const [form, setForm] = useState({
    vehicle_type: "",
    vehicle_number: "",
    vehicle_brand: "",
    parking_slot: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ----------------------------------------
     Reset Form
  ----------------------------------------- */
  const reset = () => {
    setForm({
      vehicle_type: "",
      vehicle_number: "",
      vehicle_brand: "",
      parking_slot: "",
    });

    setEditingId(null);
  };

  /* ----------------------------------------
     Save / Update Vehicle
  ----------------------------------------- */
  const save = async () => {
    if (
      !form.vehicle_type.trim() ||
      !form.vehicle_number.trim() ||
      !form.vehicle_brand.trim() ||
      !form.parking_slot.trim()
    ) {
      setErrorMessage("Please fill in all vehicle details");
      return;
    }

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
      await reload();
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || "Failed to save vehicle");
    }
  };

  /* ----------------------------------------
     Edit Vehicle
  ----------------------------------------- */
  const edit = (item: any) => {
    setEditingId(item.id);

    setForm({
      vehicle_type: item.vehicle_type || "",
      vehicle_number: item.vehicle_number || "",
      vehicle_brand: item.vehicle_brand || "",
      parking_slot: item.parking_slot || "",
    });
  };

  /* ----------------------------------------
     Delete Vehicle
  ----------------------------------------- */
  const remove = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`${API}/api/admin/apartment/vehicles/${deleteId}`, {
        withCredentials: true,
      });

      setDeleteId(null);

      await reload();
    } catch (err: any) {
      setDeleteId(null);

      setErrorMessage(
        err?.response?.data?.message || "Failed to delete vehicle",
      );
    }
  };

  /* ----------------------------------------
     Input Style
  ----------------------------------------- */
  const inputClass =
    "w-full h-11 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed";

  return (
    <div>
      {/* ----------------------------------------
          Delete Confirmation
      ----------------------------------------- */}
      {deleteId && (
        <Alert
          type="warning"
          message="Are you sure you want to delete this vehicle?"
          confirm={true}
          confirmText="Yes"
          cancelText="No"
          onConfirm={remove}
          onClose={() => setDeleteId(null)}
        />
      )}

      {/* ----------------------------------------
          Error Alert
      ----------------------------------------- */}
      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      {/* ----------------------------------------
          Section Header
      ----------------------------------------- */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Car size={17} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {editingId ? "Edit Vehicle" : "Add Vehicle"}
          </h3>

          <p className="text-xs text-gray-500 mt-0.5">
            {editingId
              ? "Update the vehicle information below."
              : "Add a vehicle registered under this apartment member."}
          </p>
        </div>
      </div>

      {/* ----------------------------------------
          Vehicle Form
      ----------------------------------------- */}
      <div
        className={`rounded-xl border p-5 md:p-6 transition-colors ${
          editingId
            ? "border-blue-200 bg-blue-50/30"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Vehicle Type */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Vehicle Type
            </label>

            <select
              className={inputClass}
              value={form.vehicle_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_type: e.target.value,
                })
              }
            >
              <option value="">Select vehicle type</option>
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
              <option value="SCOOTER">Scooter</option>
              <option value="CYCLE">Cycle</option>
            </select>
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Vehicle Number
            </label>

            <input
              type="text"
              className={inputClass}
              placeholder="Enter vehicle number"
              value={form.vehicle_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_number: e.target.value,
                })
              }
            />
          </div>

          {/* Vehicle Brand */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Vehicle Brand
            </label>

            <input
              type="text"
              className={inputClass}
              placeholder="Enter vehicle brand"
              value={form.vehicle_brand}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_brand: e.target.value,
                })
              }
            />
          </div>

          {/* Parking Slot */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Parking Slot
            </label>

            <input
              type="text"
              className={inputClass}
              placeholder="Enter parking slot"
              value={form.parking_slot}
              onChange={(e) =>
                setForm({
                  ...form,
                  parking_slot: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {editingId ? (
              <>
                <Edit size={17} />
                Update Vehicle
              </>
            ) : (
              <>
                <Plus size={18} />
                Add Vehicle
              </>
            )}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <X size={17} />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ----------------------------------------
          Vehicles List
      ----------------------------------------- */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Vehicles List
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"}{" "}
              registered
            </p>
          </div>
        </div>

        {/* Empty State */}
        {vehicles.length === 0 ? (
          <div className="border border-gray-200 rounded-xl bg-gray-50/50">
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Car size={22} />
              </div>

              <h4 className="text-sm font-semibold text-gray-900">
                No Vehicles
              </h4>

              <p className="text-xs text-gray-500 mt-1">
                No vehicles have been registered yet.
              </p>
            </div>
          </div>
        ) : (
          /* Vehicles Table */
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Type
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Vehicle Number
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Brand
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Parking Slot
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {vehicles.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                        {item.vehicle_type || "-"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {item.vehicle_number || "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {item.vehicle_brand || "-"}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {item.parking_slot || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => edit(item)}
                          title="Edit vehicle"
                          className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          <Edit size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteId(item.id)}
                          title="Delete vehicle"
                          className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleTable;