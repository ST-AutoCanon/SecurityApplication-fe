import {
  Users,
  Ticket,
  ShieldCheck,
  TrendingUp,
  Activity,
  AlertTriangle,
  QrCode,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    title: "Total Attendees",
    value: "3,240",
    icon: Users,
    color: "text-purple-500",
  },
  {
    title: "Tickets Scanned",
    value: "2,980",
    icon: QrCode,
    color: "text-cyan-500",
  },
  {
    title: "Approved Entries",
    value: "2,910",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Blocked Attempts",
    value: "45",
    icon: AlertTriangle,
    color: "text-red-500",
  },
];

export default function EventDashboard() {
  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-14">
          <div>
            <span className="text-purple-600 font-semibold uppercase tracking-widest">
              Event Analytics
            </span>

            <h2 className="text-5xl font-bold text-slate-900 mt-3">
              Live Event Dashboard
            </h2>

            <p className="text-slate-600 mt-5 max-w-2xl text-lg leading-8">
              Monitor real-time event performance, ticket validation, security
              checks, and attendee movement.
            </p>
          </div>

          <button className="mt-6 lg:mt-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
              >
                <Icon className={`${item.color}`} size={32} />

                <h2 className="text-4xl font-bold mt-6 text-slate-900">
                  {item.value}
                </h2>

                <p className="text-slate-500 mt-2">{item.title}</p>
              </div>
            );
          })}
        </div>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900">
                Entry Flow Analytics
              </h3>
              <TrendingUp className="text-green-500" />
            </div>

            {/* Fake Chart */}
            <div className="mt-10 flex items-end gap-4 h-72">
              {[80, 120, 90, 160, 140, 200, 180].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    style={{ height: `${h}px` }}
                    className="w-full bg-gradient-to-t from-purple-600 to-pink-400 rounded-t-xl"
                  />
                  <span className="text-sm text-slate-500 mt-3">
                    Day {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Status */}
          <div className="bg-[#0a0420] text-white rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Live Status</h3>
              <Activity className="text-green-400" />
            </div>

            <div className="space-y-6 mt-10">
              <div className="flex justify-between">
                <span>Active Gates</span>
                <span className="text-cyan-400 font-bold">6</span>
              </div>

              <div className="flex justify-between">
                <span>VIP Entries</span>
                <span className="text-yellow-400 font-bold">78</span>
              </div>

              <div className="flex justify-between">
                <span>Pending Scans</span>
                <span className="text-orange-400 font-bold">23</span>
              </div>

              <div className="flex justify-between">
                <span>Security Score</span>
                <span className="text-green-400 font-bold">99.6%</span>
              </div>
            </div>

            <div className="mt-10 bg-white/10 p-6 rounded-2xl">
              <p className="text-gray-300 leading-7">
                All systems are running normally. No suspicious activity
                detected in the last 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
