export default function UserData() {
  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Kumar",
      email: "priya@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      name: "Arjun Patel",
      email: "arjun@example.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sneha Rao",
      email: "sneha@example.com",
      role: "User",
      status: "Active",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            User Data
          </h1>
          <p className="text-gray-500 mt-1">
            View registered users and their information.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border shadow-sm p-5">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">24</p>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-5">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-3xl font-bold text-green-600 mt-1">20</p>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-5">
            <p className="text-sm text-gray-500">Inactive Users</p>
            <p className="text-3xl font-bold text-red-500 mt-1">4</p>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Registered Users
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    #
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.id}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.role}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
