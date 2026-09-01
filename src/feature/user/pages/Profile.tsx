export default function Profile() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-purple-700">U</span>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-800">User Name</h1>
              <p className="text-gray-500">user@example.com</p>
              <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800 mt-1">User Name</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800 mt-1">user@example.com</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-800 mt-1">+91 98765 43210</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-800 mt-1">User</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-gray-800 mt-1">Administration</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Joined Date</p>
              <p className="font-medium text-gray-800 mt-1">January 15, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
