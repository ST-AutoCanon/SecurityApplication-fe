import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../context/AuthContext";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

interface SecurityUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
}

export default function SecurityUsers() {
  const { user } = useContext(AuthContext);

  const isEventOrg = user?.org_type?.toUpperCase() === "EVENT";

  const [users, setUsers] = useState<SecurityUser[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingUser, setEditingUser] = useState<SecurityUser | null>(null);

  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    is_active: true,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/security`, {
        withCredentials: true,
      });

      setUsers(res.data.data || []);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: SecurityUser) => {
    setEditingUser(user);

    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      is_active: user.is_active,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      const res = await axios.put(
        `${API}/security/${editingUser.id}`,
        editForm,
        {
          withCredentials: true,
        },
      );

      alert(res.data.message);

      setEditingUser(null);

      fetchUsers();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  const handleDeactivate = async (id: string) => {
    const ok = window.confirm("Are you sure you want to deactivate this user?");

    if (!ok) return;

    try {
      const res = await axios.patch(
        `${API}/security/${id}/deactivate`,
        {},
        {
          withCredentials: true,
        },
      );

      alert(res.data.message);

      fetchUsers();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Deactivate failed");
    }
  };
  const handleActivate = async (id: string) => {
    const ok = window.confirm("Are you sure you want to activate this user?");

    if (!ok) return;

    try {
      const res = await axios.patch(
        `${API}/security/${id}/activate`,
        {},
        {
          withCredentials: true,
        },
      );

      alert(res.data.message);

      fetchUsers();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Activate failed");
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this user?");

    if (!ok) return;

    try {
      const res = await axios.delete(`${API}/security/${id}`, {
        withCredentials: true,
      });

      alert(res.data.message);

      fetchUsers();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {isEventOrg ? "Organisers" : "Security Users"}
          </h1>

          <button
            onClick={fetchUsers}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-lg">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No {isEventOrg ? "organisers" : "security users"} found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-3">First Name</th>
                  <th className="border px-4 py-3">Last Name</th>
                  <th className="border px-4 py-3">Email</th>
                  <th className="border px-4 py-3">Phone</th>
                  <th className="border px-4 py-3">Status</th>
                  <th className="border px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-3">{item.first_name}</td>

                    <td className="border px-4 py-3">
                      {item.last_name || "-"}
                    </td>

                    <td className="border px-4 py-3">{item.email}</td>

                    <td className="border px-4 py-3">{item.phone || "-"}</td>

                    <td className="border px-4 py-3 text-center">
                      {item.is_active ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="border px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        {/* <button
                          onClick={() => handleDeactivate(item.id)}
                          disabled={!item.is_active}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded disabled:opacity-50"
                        >
                          Deactivate
                        </button> */}

                        {item.is_active ? (
                          <button
                            onClick={() => handleDeactivate(item.id)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(item.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
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

        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold mb-6">
                Update {isEventOrg ? "Organiser" : "Security"} User
              </h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">First Name</label>

                  <input
                    type="text"
                    value={editForm.first_name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        first_name: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Last Name</label>

                  <input
                    type="text"
                    value={editForm.last_name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        last_name: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Email</label>

                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Phone</label>

                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        phone: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-5 py-2 rounded-lg border"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}