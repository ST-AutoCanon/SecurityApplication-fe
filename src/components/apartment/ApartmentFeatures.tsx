import {
  QrCode,
  ShieldCheck,
  Truck,
  Car,
  ScanFace,
  Users,
  Bell,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Visitor Pass",
    description:
      "Generate secure QR-based visitor passes for quick and contactless entry.",
  },
  {
    icon: ShieldCheck,
    title: "Resident Approval",
    description:
      "Visitors enter only after digital approval from residents through the mobile app.",
  },
  {
    icon: Truck,
    title: "Delivery Management",
    description:
      "Track food delivery, courier, and parcel agents with complete entry and exit logs.",
  },
  {
    icon: Car,
    title: "Vehicle Tracking",
    description:
      "Capture vehicle numbers automatically and maintain parking and entry history.",
  },
  {
    icon: ScanFace,
    title: "Face Authentication",
    description:
      "Optional facial recognition provides an additional layer of visitor verification.",
  },
  {
    icon: Users,
    title: "Staff Management",
    description:
      "Manage housekeepers, electricians, plumbers, and maintenance staff with scheduled access.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description:
      "Residents receive instant notifications whenever a visitor arrives at the gate.",
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description:
      "Approve visitors, view logs, and monitor security directly from your smartphone.",
  },
];

export default function ApartmentFeatures() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm sm:text-base">
            Features
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Complete Apartment Security Platform
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
            Smart Entry combines visitor authentication, resident approvals,
            digital gate management, delivery tracking, and real-time monitoring
            into one secure platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200 hover:border-blue-500"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition">
                  <Icon size={28} className="sm:w-8 sm:h-8" />
                </div>

                <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
                  {feature.description}
                </p>

                <button className="mt-5 sm:mt-6 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all active:scale-95">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-16 sm:mt-20 lg:mt-24 rounded-3xl bg-gradient-to-r from-[#020b3d] to-[#0a2b92] p-6 sm:p-10 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Everything Your Apartment Needs
              </h3>

              <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-300 leading-7 sm:leading-8">
                Replace paper registers with a secure digital visitor management
                system. Monitor guests, staff, deliveries, and vehicles in
                real-time while keeping residents informed through instant
                notifications.
              </p>

              <button className="mt-6 sm:mt-8 bg-white text-[#020b3d] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition">
                Schedule Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-5 sm:p-6 border border-white/20">
                <h4 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  99.9%
                </h4>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Secure Visitor Authentication
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-5 sm:p-6 border border-white/20">
                <h4 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  24/7
                </h4>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Live Security Monitoring
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-5 sm:p-6 border border-white/20">
                <h4 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  500+
                </h4>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Residential Communities
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-5 sm:p-6 border border-white/20">
                <h4 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  1M+
                </h4>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Verified Visitors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
