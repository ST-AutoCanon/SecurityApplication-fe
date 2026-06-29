import {
  ShieldCheck,
  ScanFace,
  QrCode,
  Bell,
  Camera,
  Lock,
  Smartphone,
  Fingerprint,
  ArrowRight,
} from "lucide-react";

const securityFeatures = [
  {
    icon: ScanFace,
    title: "Face Recognition",
    description:
      "Authenticate visitors using AI-powered facial recognition for secure and contactless access.",
  },
  {
    icon: QrCode,
    title: "QR Verification",
    description:
      "Generate encrypted QR visitor passes that are scanned at the gate before entry.",
  },
  {
    icon: Fingerprint,
    title: "OTP Authentication",
    description:
      "Verify every visitor through OTP-based authentication before approval.",
  },
  {
    icon: Camera,
    title: "CCTV Integration",
    description:
      "Integrate with existing surveillance cameras for complete visitor monitoring.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description:
      "Residents receive immediate notifications whenever visitors arrive at the gate.",
  },
  {
    icon: Lock,
    title: "Emergency Lockdown",
    description:
      "Lock all entry points instantly during emergencies with one click.",
  },
];

export default function SecurityFeatures() {
  return (
    <section className="bg-[#020b3d] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="text-cyan-400 uppercase tracking-widest font-semibold">
            Enterprise Security
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            Advanced Security Authentication
          </h2>

          <p className="text-gray-300 mt-6 text-lg leading-8">
            Smart Entry protects residential communities with multiple layers of
            authentication, real-time monitoring, AI verification and digital
            audit trails.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {securityFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400 p-8 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl text-white font-bold mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-300 mt-4 leading-7">
                  {item.description}
                </p>

                <button className="flex items-center gap-2 text-cyan-400 mt-8 group-hover:gap-4 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-24">
          {/* Left Dashboard */}

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900">
                Live Security Dashboard
              </h3>

              <ShieldCheck className="text-green-500" size={34} />
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-blue-50 rounded-2xl p-6">
                <p className="text-gray-500">Visitors Today</p>
                <h2 className="text-4xl font-bold text-blue-700 mt-2">248</h2>
              </div>

              <div className="bg-green-50 rounded-2xl p-6">
                <p className="text-gray-500">Approved</p>
                <h2 className="text-4xl font-bold text-green-600 mt-2">231</h2>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6">
                <p className="text-gray-500">Pending</p>
                <h2 className="text-4xl font-bold text-yellow-500 mt-2">13</h2>
              </div>

              <div className="bg-red-50 rounded-2xl p-6">
                <p className="text-gray-500">Blocked</p>
                <h2 className="text-4xl font-bold text-red-500 mt-2">4</h2>
              </div>
            </div>
          </div>

          {/* Right */}

          <div>
            <h3 className="text-4xl font-bold text-white">
              Multi-Layer Security
            </h3>

            <p className="text-gray-300 mt-6 text-lg leading-8">
              Every visitor goes through multiple security checkpoints before
              entering your apartment. Smart Entry combines AI, QR verification,
              OTP authentication, CCTV integration and digital approval
              workflows to provide enterprise-grade protection.
            </p>

            <div className="space-y-6 mt-10">
              {[
                "AI Face Recognition",
                "Encrypted QR Visitor Pass",
                "Resident Mobile Approval",
                "Real-time CCTV Monitoring",
                "Complete Audit Logs",
                "Emergency Lockdown",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
                    <ShieldCheck size={20} className="text-white" />
                  </div>

                  <span className="text-white text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <button className="mt-10 flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
              <Smartphone size={20} />
              Request Live Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
