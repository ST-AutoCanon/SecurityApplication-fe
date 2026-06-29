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
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-14">
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-widest">
              Dashboard
            </span>

            <h2 className="text-5xl font-bold text-slate-900 mt-3">
              Security Analytics Dashboard
            </h2>

            <p className="text-slate-600 mt-5 max-w-2xl text-lg leading-8">
              Monitor visitors, residents, approvals, deliveries, security
              alerts and entry logs from one centralized dashboard.
            </p>
          </div>

          <button className="mt-8 lg:mt-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
            View Live Dashboard
          </button>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex justify-between items-center">
                  <div
                    className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}
                  >
                    <Icon size={30} />
                  </div>

                  <span className="text-green-600 font-semibold">
                    {item.change}
                  </span>
                </div>

                <h2 className="text-5xl font-bold mt-8 text-slate-900">
                  {item.value}
                </h2>

                <p className="text-slate-500 mt-2">{item.title}</p>
              </div>
            );
          })}
        </div>

        {/* Analytics */}

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {/* Left */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Visitor Analytics
                </h3>

                <p className="text-slate-500 mt-2">Last 7 Days Overview</p>
              </div>

              <TrendingUp size={32} className="text-green-500" />
            </div>

            <div className="mt-12 h-72 flex items-end gap-5">
              {[55, 90, 70, 130, 105, 160, 190].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    style={{
                      height: `${height}px`,
                    }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 hover:opacity-80 transition"
                  />

                  <span className="text-sm text-slate-500 mt-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}

          <div className="bg-[#020b3d] rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Live Status</h3>

              <Activity className="text-green-400" />
            </div>

            <div className="space-y-6 mt-10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Bell className="text-cyan-400" />

                  <span>Security Alerts</span>
                </div>

                <span className="font-bold">2</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Car className="text-cyan-400" />

                  <span>Vehicles Inside</span>
                </div>

                <span className="font-bold">61</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Clock className="text-cyan-400" />

                  <span>Pending Approvals</span>
                </div>

                <span className="font-bold">11</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-cyan-400" />

                  <span>Security Score</span>
                </div>

                <span className="text-green-400 font-bold">99.8%</span>
              </div>
            </div>

            <div className="mt-12 rounded-2xl bg-white/10 p-6">
              <h4 className="text-xl font-semibold">Community Status</h4>

              <p className="text-gray-300 mt-4 leading-7">
                All entry gates are operating normally. Face authentication and
                QR verification services are active with no security issues
                detected.
              </p>
            </div>
          </div>
        </div>
        {/* Recent Activity */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          {/* Recent Visitors */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Recent Visitor Activity
                </h3>

                <p className="text-slate-500 mt-1">
                  Latest authenticated visitors
                </p>
              </div>

              <button className="text-blue-600 font-semibold">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 text-slate-500">Visitor</th>

                    <th className="text-left py-4 text-slate-500">Host</th>

                    <th className="text-left py-4 text-slate-500">Purpose</th>

                    <th className="text-left py-4 text-slate-500">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    {
                      name: "Rahul Sharma",
                      host: "Flat A-302",
                      purpose: "Guest Visit",
                      status: "Approved",
                    },
                    {
                      name: "Anjali Patel",
                      host: "Flat C-105",
                      purpose: "Delivery",
                      status: "Completed",
                    },
                    {
                      name: "Mohammed Ali",
                      host: "Flat B-220",
                      purpose: "Maintenance",
                      status: "Inside",
                    },
                    {
                      name: "Sneha Reddy",
                      host: "Flat D-118",
                      purpose: "Guest Visit",
                      status: "Approved",
                    },
                    {
                      name: "Vikram Singh",
                      host: "Flat A-501",
                      purpose: "Courier",
                      status: "Pending",
                    },
                  ].map((visitor, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                            {visitor.name.charAt(0)}
                          </div>

                          <span className="font-semibold text-slate-800">
                            {visitor.name}
                          </span>
                        </div>
                      </td>

                      <td>{visitor.host}</td>

                      <td>{visitor.purpose}</td>

                      <td>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold
                          ${
                            visitor.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : visitor.status === "Completed"
                                ? "bg-blue-100 text-blue-700"
                                : visitor.status === "Inside"
                                  ? "bg-cyan-100 text-cyan-700"
                                  : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {visitor.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Alerts */}

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900">
              Security Alerts
            </h3>

            <div className="space-y-5 mt-8">
              {[
                {
                  title: "Unknown Visitor",
                  color: "bg-red-500",
                },
                {
                  title: "Delivery Pending",
                  color: "bg-yellow-500",
                },
                {
                  title: "Gate 2 Active",
                  color: "bg-green-500",
                },
                {
                  title: "Visitor Exit Delayed",
                  color: "bg-orange-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border-b pb-5"
                >
                  <div className={`w-4 h-4 rounded-full mt-2 ${item.color}`} />

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {item.title}
                    </h4>

                    <p className="text-slate-500 text-sm mt-1">Just now</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8">
            <h3 className="text-2xl font-bold">Deliveries Today</h3>

            <h2 className="text-6xl font-black mt-8">46</h2>

            <p className="mt-4 text-blue-100">Food, Courier & Parcel Entries</p>
          </div>

          <div className="rounded-3xl bg-white shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900">
              Vehicles Inside
            </h3>

            <h2 className="text-6xl font-black text-blue-700 mt-8">61</h2>

            <p className="text-slate-500 mt-4">Residents + Visitors</p>
          </div>

          <div className="rounded-3xl bg-[#020b3d] text-white p-8">
            <h3 className="text-2xl font-bold">Guards On Duty</h3>

            <h2 className="text-6xl font-black text-cyan-400 mt-8">12</h2>

            <p className="text-gray-300 mt-4">Across 4 Security Gates</p>
          </div>
        </div>
        {/* Timeline & Quick Actions */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          {/* Activity Timeline */}

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Today's Activity Timeline
            </h3>

            <div className="space-y-8">
              {[
                {
                  time: "09:15 AM",
                  title: "Visitor Approved",
                  desc: "Rahul Sharma entered through Gate 1.",
                },
                {
                  time: "10:05 AM",
                  title: "Courier Delivered",
                  desc: "Amazon package delivered to Flat B-304.",
                },
                {
                  time: "11:40 AM",
                  title: "Maintenance Staff",
                  desc: "Electrician checked in for Block C.",
                },
                {
                  time: "01:15 PM",
                  title: "Guest Exit",
                  desc: "Visitor exited successfully.",
                },
                {
                  time: "03:20 PM",
                  title: "Security Alert",
                  desc: "Unknown visitor denied entry.",
                },
              ].map((activity, index) => (
                <div key={index} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                    {index !== 4 && (
                      <div className="w-1 h-20 bg-blue-100 mt-2"></div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">{activity.time}</p>

                    <h4 className="font-bold text-lg text-slate-900 mt-1">
                      {activity.title}
                    </h4>

                    <p className="text-slate-600 mt-2">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-5">
              {[
                "Add Visitor",
                "Approve Entry",
                "Delivery Pass",
                "Generate QR",
                "Emergency Lock",
                "Visitor Report",
                "Vehicle Log",
                "Guard Schedule",
              ].map((item, index) => (
                <button
                  key={index}
                  className="rounded-2xl border border-slate-200 p-6 text-left hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  <h4 className="font-semibold">{item}</h4>

                  <p className="text-sm mt-2 opacity-80">Open Module</p>
                </button>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">
              <h3 className="text-2xl font-bold">Weekly Security Report</h3>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <p className="text-blue-100">Visitors</p>

                  <h2 className="text-4xl font-bold">1,842</h2>
                </div>

                <div>
                  <p className="text-blue-100">Deliveries</p>

                  <h2 className="text-4xl font-bold">387</h2>
                </div>

                <div>
                  <p className="text-blue-100">Vehicles</p>

                  <h2 className="text-4xl font-bold">925</h2>
                </div>

                <div>
                  <p className="text-blue-100">Security Score</p>

                  <h2 className="text-4xl font-bold">99.8%</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}

        <div className="mt-16 rounded-[32px] bg-gradient-to-r from-[#020b3d] to-[#0b3ea8] p-16 text-center text-white">
          <h2 className="text-5xl font-bold">
            Manage Your Apartment Security From Anywhere
          </h2>

          <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-8">
            Monitor visitors, approve guests, track deliveries, receive alerts,
            and manage security operations in real time from a single
            cloud-based dashboard.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <button className="bg-white text-[#020b3d] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
              Request Demo
            </button>

            <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#020b3d] transition">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}