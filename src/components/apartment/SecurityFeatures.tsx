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
    <section className="bg-[#020b3d] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-cyan-400 uppercase tracking-widest font-semibold text-sm sm:text-base">
            Enterprise Security
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
            Advanced Security Authentication
          </h2>

          <p className="text-gray-300 mt-5 sm:mt-6 text-sm sm:text-lg leading-7 sm:leading-8">
            Smart Entry protects residential communities with multiple layers of
            authentication, real-time monitoring, AI verification and digital
            audit trails.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
          {securityFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition">
                  <Icon size={26} className="sm:w-7 sm:h-7" />
                </div>

                <h3 className="text-xl sm:text-2xl text-white font-bold mt-5 sm:mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-300 mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7">
                  {item.description}
                </p>

                <button className="flex items-center gap-2 text-cyan-400 mt-6 sm:mt-8 group-hover:gap-4 transition-all text-sm sm:text-base">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-14 sm:mt-20 lg:mt-24">
          {/* LEFT DASHBOARD */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Live Security Dashboard
              </h3>

              <ShieldCheck className="text-green-500" size={30} />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
              {[
                {
                  label: "Visitors Today",
                  value: "248",
                  color: "text-blue-700",
                  bg: "bg-blue-50",
                },
                {
                  label: "Approved",
                  value: "231",
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
                {
                  label: "Pending",
                  value: "13",
                  color: "text-yellow-500",
                  bg: "bg-yellow-50",
                },
                {
                  label: "Blocked",
                  value: "4",
                  color: "text-red-500",
                  bg: "bg-red-50",
                },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} rounded-2xl p-4 sm:p-6`}>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {item.label}
                  </p>

                  <h2
                    className={`text-2xl sm:text-4xl font-bold mt-2 ${item.color}`}
                  >
                    {item.value}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Multi-Layer Security
            </h3>

            <p className="text-gray-300 mt-5 sm:mt-6 text-sm sm:text-lg leading-7 sm:leading-8">
              Every visitor goes through multiple security checkpoints before
              entering your apartment. Smart Entry combines AI, QR verification,
              OTP authentication, CCTV integration and digital approval
              workflows.
            </p>

            {/* Features list */}
            <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-10">
              {[
                "AI Face Recognition",
                "Encrypted QR Visitor Pass",
                "Resident Mobile Approval",
                "Real-time CCTV Monitoring",
                "Complete Audit Logs",
                "Emergency Lockdown",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} className="text-white" />
                  </div>

                  <span className="text-white text-sm sm:text-lg">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-8 sm:mt-10 flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition text-sm sm:text-base">
              <Smartphone size={18} />
              Request Live Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
