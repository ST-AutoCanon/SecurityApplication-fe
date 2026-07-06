import {
  Users,
  ShieldCheck,
  Building2,
  Car,
  Bell,
  UserCheck,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Today's Visitors",
    value: "248",
    change: "+18%",
    color: "bg-blue-500",
    icon: Users,
  },
  {
    title: "Approved",
    value: "231",
    change: "+9%",
    color: "bg-green-500",
    icon: UserCheck,
  },
  {
    title: "Blocked",
    value: "17",
    change: "-4%",
    color: "bg-red-500",
    icon: ShieldCheck,
  },
  {
    title: "Residents",
    value: "1280",
    change: "+3%",
    color: "bg-cyan-500",
    icon: Building2,
  },
];

export default function Dashboard() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10 sm:mb-14">
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm sm:text-base">
              Dashboard
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 leading-tight">
              Security Analytics Dashboard
            </h2>

            <p className="text-slate-600 mt-4 sm:mt-5 max-w-2xl text-sm sm:text-lg leading-7 sm:leading-8">
              Monitor visitors, residents, approvals, deliveries, security
              alerts and entry logs from one centralized dashboard.
            </p>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition w-full sm:w-auto">
            View Live Dashboard
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex justify-between items-center">
                  <div
                    className={`${item.color} w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white`}
                  >
                    <Icon size={26} className="sm:w-7 sm:h-7" />
                  </div>

                  <span className="text-green-600 font-semibold text-sm sm:text-base">
                    {item.change}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-bold mt-6 sm:mt-8 text-slate-900">
                  {item.value}
                </h2>

                <p className="text-slate-500 mt-2 text-sm sm:text-base">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 sm:mt-16">
          {/* LEFT CHART */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="flex justify-between items-center gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Visitor Analytics
                </h3>
                <p className="text-slate-500 mt-2 text-sm sm:text-base">
                  Last 7 Days Overview
                </p>
              </div>

              <TrendingUp size={28} className="text-green-500" />
            </div>

            <div className="mt-10 sm:mt-12 h-56 sm:h-72 flex items-end gap-3 sm:gap-5">
              {[55, 90, 70, 130, 105, 160, 190].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    style={{ height: `${height}px` }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400"
                  />

                  <span className="text-xs sm:text-sm text-slate-500 mt-3 sm:mt-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT STATUS */}
          <div className="bg-[#020b3d] rounded-3xl p-6 sm:p-8 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold">Live Status</h3>
              <Activity className="text-green-400" />
            </div>

            <div className="space-y-5 sm:space-y-6 mt-8 sm:mt-10 text-sm sm:text-base">
              {[
                { icon: Bell, label: "Security Alerts", value: 2 },
                { icon: Car, label: "Vehicles Inside", value: 61 },
                { icon: Clock, label: "Pending Approvals", value: 11 },
                { icon: ShieldCheck, label: "Security Score", value: "99.8%" },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Icon className="text-cyan-400" size={18} />
                      <span>{item.label}</span>
                    </div>

                    <span className="font-bold">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* TABLE */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6 sm:p-8 overflow-x-auto">
            <div className="flex justify-between items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Recent Visitor Activity
                </h3>
                <p className="text-slate-500 text-sm sm:text-base">
                  Latest authenticated visitors
                </p>
              </div>

              <button className="text-blue-600 font-semibold text-sm sm:text-base">
                View All
              </button>
            </div>

            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b text-left text-sm sm:text-base">
                  <th className="py-3 text-slate-500">Visitor</th>
                  <th className="py-3 text-slate-500">Host</th>
                  <th className="py-3 text-slate-500">Purpose</th>
                  <th className="py-3 text-slate-500">Status</th>
                </tr>
              </thead>

              <tbody className="text-sm sm:text-base">
                {[
                  {
                    name: "Rahul Sharma",
                    host: "A-302",
                    purpose: "Guest",
                    status: "Approved",
                  },
                  {
                    name: "Anjali Patel",
                    host: "C-105",
                    purpose: "Delivery",
                    status: "Completed",
                  },
                  {
                    name: "Mohammed Ali",
                    host: "B-220",
                    purpose: "Maintenance",
                    status: "Inside",
                  },
                ].map((v, i) => (
                  <tr key={i} className="border-b hover:bg-slate-50">
                    <td className="py-4 font-semibold">{v.name}</td>
                    <td>{v.host}</td>
                    <td>{v.purpose}</td>

                    <td>
                      <span className="px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-700">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ALERTS */}
          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Security Alerts
            </h3>

            <div className="space-y-5 mt-6 sm:mt-8">
              {[
                "Unknown Visitor",
                "Delivery Pending",
                "Gate 2 Active",
                "Visitor Exit Delayed",
              ].map((t, i) => (
                <div key={i} className="flex gap-3 border-b pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-2" />

                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">{t}</h4>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Just now
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 sm:mt-16 rounded-3xl bg-gradient-to-r from-[#020b3d] to-[#0b3ea8] p-8 sm:p-12 lg:p-16 text-center text-white">
          <h2 className="text-3xl sm:text-5xl font-bold">
            Manage Your Apartment Security From Anywhere
          </h2>

          <p className="text-base sm:text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-7 sm:leading-8">
            Monitor visitors, approve guests, track deliveries, receive alerts,
            and manage security operations in real time from a single platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            <button className="bg-white text-[#020b3d] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition">
              Request Demo
            </button>

            <button className="border border-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-[#020b3d] transition">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
