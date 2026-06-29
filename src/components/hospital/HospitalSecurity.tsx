import {
  ShieldAlert,
  UserX,
  HeartPulse,
  Stethoscope,
  Lock,
  Eye,
  Activity,
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
    <section className="py-24 bg-[#021428] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400 px-5 py-2 rounded-full">
            <ShieldAlert className="text-cyan-400" size={18} />
            Advanced Hospital Security Layer
          </div>

          <h2 className="text-5xl font-bold mt-6">
            Multi-Layer Hospital Protection
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-8">
            Strict access control ensures patient safety, data security, and
            controlled movement across all hospital zones.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {securityLayers.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white/10 border border-white/10 rounded-3xl p-8 hover:scale-[1.02] transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold mt-6">{item.title}</h3>

                <p className="text-gray-300 mt-4 leading-7">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Live Panel */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12">
          <div className="bg-white/10 border border-white/10 p-10 rounded-3xl">
            <h3 className="text-3xl font-bold">
              Live Hospital Security Status
            </h3>

            <p className="text-gray-300 mt-6 leading-7">
              Real-time monitoring of ICU access, emergency overrides, and
              visitor activity across hospital zones.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div>
                <p className="text-gray-400">Blocked Visitors</p>
                <h2 className="text-4xl font-bold text-red-400 mt-2">18</h2>
              </div>

              <div>
                <p className="text-gray-400">Emergency Access</p>
                <h2 className="text-4xl font-bold text-yellow-400 mt-2">12</h2>
              </div>

              <div>
                <p className="text-gray-400">Active Wards</p>
                <h2 className="text-4xl font-bold text-cyan-400 mt-2">9</h2>
              </div>

              <div>
                <p className="text-gray-400">Security Score</p>
                <h2 className="text-4xl font-bold text-green-400 mt-2">
                  99.8%
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              "ICU access control active",
              "Doctor verification system running",
              "Emergency override enabled",
              "Ward restrictions enforced",
              "Visitor blacklist active",
              "Live monitoring operational",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <BadgeCheck className="text-cyan-400" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
