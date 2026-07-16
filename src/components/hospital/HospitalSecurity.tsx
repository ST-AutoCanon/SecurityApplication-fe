import {
  ShieldAlert,
  UserX,
  HeartPulse,
  Stethoscope,
  Lock,
  Eye,
  BadgeCheck,
} from "lucide-react";

const securityLayers = [
  {
    icon: HeartPulse,
    title: "ICU Restricted Access",
    desc: "Only authorized doctors and critical staff can enter ICU zones.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Authentication",
    desc: "Verify medical staff using secure hospital credentials.",
  },
  {
    icon: UserX,
    title: "Unauthorized Blocking",
    desc: "Instant denial for invalid or unapproved visitors.",
  },
  {
    icon: Lock,
    title: "Ward-Level Permissions",
    desc: "Each ward has independent access control rules.",
  },
  {
    icon: ShieldAlert,
    title: "Emergency Override System",
    desc: "Instant emergency access for critical medical situations.",
  },
  {
    icon: Eye,
    title: "Live Monitoring",
    desc: "Security team monitors all entry points in real time.",
  },
];

export default function HospitalSecurity() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#021428] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400 px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base">
            <ShieldAlert className="text-cyan-400" size={18} />
            Advanced Hospital Security Layer
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-6">
            Multi-Layer Hospital Protection
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-300 leading-7 sm:leading-8">
            Strict access control ensures patient safety, data security, and
            controlled movement across all hospital zones.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
          {securityLayers.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white/10 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-[1.02] transition"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Icon size={24} className="sm:size-[28px]" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold mt-5">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 mt-3 leading-6 sm:leading-7">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* LEFT PANEL */}
          <div className="bg-white/10 border border-white/10 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold">
              Live Hospital Security Status
            </h3>

            <p className="text-sm sm:text-base text-gray-300 mt-5 leading-7">
              Real-time monitoring of ICU access, emergency overrides, and
              visitor activity across hospital zones.
            </p>

            <div className="grid grid-cols-2 gap-5 sm:gap-6 mt-8 sm:mt-10">
              <div>
                <p className="text-gray-400 text-sm sm:text-base">
                  Blocked Visitors
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400 mt-2">
                  18
                </h2>
              </div>

              <div>
                <p className="text-gray-400 text-sm sm:text-base">
                  Emergency Access
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mt-2">
                  12
                </h2>
              </div>

              <div>
                <p className="text-gray-400 text-sm sm:text-base">
                  Active Wards
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mt-2">
                  9
                </h2>
              </div>

              <div>
                <p className="text-gray-400 text-sm sm:text-base">
                  Security Score
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mt-2">
                  99.8%
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT LIST */}
          <div className="space-y-4 sm:space-y-5">
            {[
              "ICU access control active",
              "Doctor verification system running",
              "Emergency override enabled",
              "Ward restrictions enforced",
              "Visitor blacklist active",
              "Live monitoring operational",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4">
                <BadgeCheck className="text-cyan-400 shrink-0" size={20} />

                <span className="text-sm sm:text-base lg:text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
