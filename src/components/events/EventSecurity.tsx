import {
  ShieldCheck,
  UserX,
  Crown,
  ScanFace,
  Lock,
  AlertTriangle,
  Eye,
  BadgeCheck,
} from "lucide-react";

const securityFeatures = [
  {
    icon: ScanFace,
    title: "QR Ticket Validation",
    desc: "Every ticket is verified in real-time before entry.",
  },
  {
    icon: UserX,
    title: "Blacklist Detection",
    desc: "Blocked users are automatically denied access.",
  },
  {
    icon: Crown,
    title: "VIP Entry Lane",
    desc: "Separate fast-track entry for VIP guests.",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Prevention",
    desc: "Duplicate or fake tickets are instantly rejected.",
  },
  {
    icon: Lock,
    title: "Gate Access Control",
    desc: "Only authorized gates allow entry scanning.",
  },
  {
    icon: Eye,
    title: "Live Monitoring",
    desc: "Security team tracks all entries in real time.",
  },
];

export default function EventSecurity() {
  return (
    <section className="py-24 bg-[#0a0420] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 px-5 py-2 rounded-full border border-purple-500">
            <AlertTriangle size={18} className="text-purple-400" />
            <span className="text-purple-300 font-semibold">
              Advanced Event Security Layer
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-bold">Secure Every Entry Point</h2>

          <p className="mt-6 text-gray-300 text-lg leading-8">
            Multi-layer security ensures only valid attendees enter your event
            with zero fraud, controlled access, and real-time monitoring.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {securityFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white/10 border border-white/10 rounded-3xl p-8 hover:scale-[1.02] transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold mt-6">{item.title}</h3>

                <p className="text-gray-300 mt-4 leading-7">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="bg-white/10 border border-white/10 p-10 rounded-3xl">
            <h3 className="text-3xl font-bold">Real-Time Security Dashboard</h3>

            <p className="text-gray-300 mt-6 leading-8">
              Monitor entry points, detect fraud attempts, track VIP access, and
              manage crowd flow from a centralized live dashboard.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div>
                <p className="text-gray-400">Blocked Entries</p>
                <h2 className="text-4xl font-bold text-red-400 mt-2">14</h2>
              </div>

              <div>
                <p className="text-gray-400">VIP Entries</p>
                <h2 className="text-4xl font-bold text-yellow-400 mt-2">78</h2>
              </div>

              <div>
                <p className="text-gray-400">Active Gates</p>
                <h2 className="text-4xl font-bold text-cyan-400 mt-2">6</h2>
              </div>

              <div>
                <p className="text-gray-400">Security Score</p>
                <h2 className="text-4xl font-bold text-green-400 mt-2">
                  99.7%
                </h2>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="space-y-6">
              {[
                "Real-time ticket validation",
                "Fraud detection system",
                "VIP lane management",
                "Blacklist enforcement",
                "Multi-gate control system",
                "Live security monitoring",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <BadgeCheck className="text-purple-400" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
