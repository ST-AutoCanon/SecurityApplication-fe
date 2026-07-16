import {
  Users,
  QrCode,
  ShieldCheck,
  TrendingUp,
  Activity,
  AlertTriangle,
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
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 lg:gap-0 mb-10 sm:mb-14">
          <div>
            <span className="text-purple-600 font-semibold uppercase tracking-widest text-sm sm:text-base">
              Event Analytics
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 leading-tight">
              Live Event Dashboard
            </h2>

            <p className="text-slate-600 mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8">
              Monitor real-time event performance, ticket validation, security
              checks, and attendee movement.
            </p>
          </div>

          <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition text-sm sm:text-base">
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg p-6 sm:p-8 hover:shadow-xl transition"
              >
                <Icon className={item.color} size={28} />

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-5 text-slate-900">
                  {item.value}
                </h2>

                <p className="text-sm sm:text-base text-slate-500 mt-2">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 sm:mt-16">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Entry Flow Analytics
              </h3>
              <TrendingUp className="text-green-500" />
            </div>

            {/* Chart */}
            <div className="mt-8 sm:mt-10 flex items-end gap-2 sm:gap-4 h-56 sm:h-72 overflow-x-auto">
              {[80, 120, 90, 160, 140, 200, 180].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[40px] flex flex-col items-center"
                >
                  <div
                    style={{ height: `${h}px` }}
                    className="w-full bg-gradient-to-t from-purple-600 to-pink-400 rounded-t-xl"
                  />

                  <span className="text-xs sm:text-sm text-slate-500 mt-3 whitespace-nowrap">
                    Day {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Status */}
          <div className="bg-[#0a0420] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold">Live Status</h3>
              <Activity className="text-green-400" />
            </div>

            <div className="space-y-5 sm:space-y-6 mt-8 sm:mt-10">
              {[
                ["Active Gates", "6", "text-cyan-400"],
                ["VIP Entries", "78", "text-yellow-400"],
                ["Pending Scans", "23", "text-orange-400"],
                ["Security Score", "99.6%", "text-green-400"],
              ].map(([label, value, color], i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-sm sm:text-base">{label}</span>

                  <span className={`${color} font-bold text-sm sm:text-base`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 bg-white/10 p-5 sm:p-6 rounded-2xl">
              <p className="text-gray-300 text-sm sm:text-base leading-6 sm:leading-7">
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
