import {
  Users,
  HeartPulse,
  Activity,
  AlertTriangle,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Visitors",
    value: "1,240",
    icon: Users,
    color: "text-cyan-500",
  },
  {
    title: "Approved Entries",
    value: "1,110",
    icon: UserCheck,
    color: "text-green-500",
  },
  {
    title: "Blocked Visitors",
    value: "38",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    title: "ICU Access Events",
    value: "72",
    icon: HeartPulse,
    color: "text-purple-500",
  },
];

export default function HospitalDashboard() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10 sm:mb-14">
          <div>
            <span className="text-cyan-600 font-semibold uppercase tracking-widest text-xs sm:text-sm">
              Hospital Analytics
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-2 sm:mt-3 leading-tight">
              Live Hospital Dashboard
            </h2>

            <p className="text-slate-600 mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8">
              Monitor patient visits, ICU access, emergency activity, and
              security performance in real time.
            </p>
          </div>

          <button className="w-full lg:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 transition">
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
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition"
              >
                <Icon className={`${item.color}`} size={30} />

                <h2 className="text-3xl sm:text-4xl font-bold mt-4 sm:mt-6 text-slate-900">
                  {item.value}
                </h2>

                <p className="text-slate-500 mt-2 text-sm sm:text-base">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Visitor Flow Analytics
              </h3>

              <TrendingUp className="text-green-500" />
            </div>

            {/* Responsive chart */}
            <div className="mt-8 sm:mt-10 flex items-end gap-2 sm:gap-4 h-48 sm:h-64 lg:h-72">
              {[60, 90, 70, 140, 110, 180, 150].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    style={{ height: `${h}px` }}
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-xl"
                  />
                  <span className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-3">
                    Day {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Status */}
          <div className="bg-[#021428] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold">Live Status</h3>
              <Activity className="text-cyan-400" />
            </div>

            <div className="space-y-5 sm:space-y-6 mt-8 sm:mt-10 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Active Wards</span>
                <span className="text-cyan-400 font-bold">9</span>
              </div>

              <div className="flex justify-between">
                <span>ICU Access</span>
                <span className="text-purple-400 font-bold">Restricted</span>
              </div>

              <div className="flex justify-between">
                <span>Emergency Cases</span>
                <span className="text-red-400 font-bold">5</span>
              </div>

              <div className="flex justify-between">
                <span>Security Score</span>
                <span className="text-green-400 font-bold">99.9%</span>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 bg-white/10 p-5 sm:p-6 rounded-2xl">
              <p className="text-gray-300 leading-6 sm:leading-7 text-sm sm:text-base">
                All hospital security systems are operating normally. ICU
                restrictions and emergency access controls are active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
