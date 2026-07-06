import {
  ShieldCheck,
  Clock3,
  Smartphone,
  Cloud,
  Users,
  Bell,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Multi-layer authentication with QR verification, OTP, face recognition and approval workflows.",
  },
  {
    icon: Clock3,
    title: "24/7 Monitoring",
    description:
      "Track visitors, deliveries and security activities in real time from anywhere.",
  },
  {
    icon: Smartphone,
    title: "Resident Mobile App",
    description:
      "Residents can approve visitors, receive instant alerts and view complete visitor history.",
  },
  {
    icon: Cloud,
    title: "Cloud Based",
    description:
      "Access your apartment security dashboard securely from any device without local servers.",
  },
  {
    icon: Users,
    title: "Visitor Management",
    description:
      "Manage guests, delivery agents, domestic staff and contractors from one platform.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Receive real-time alerts for arrivals, approvals, emergencies and suspicious activities.",
  },
];

export default function Benefits() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm sm:text-base">
            Why Choose Smart Entry
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 leading-tight">
            Built for Modern Residential Communities
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
            Smart Entry helps apartment associations improve security, automate
            visitor approvals, reduce manual work and deliver a seamless
            experience for residents and guests.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 sm:mt-16 lg:mt-20">
          {/* LEFT GRID */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 hover:shadow-xl hover:border-blue-500 transition"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                    <Icon size={26} className="sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mt-5 sm:mt-6 text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-3xl bg-gradient-to-br from-[#020b3d] to-[#0a2b92] p-6 sm:p-10 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
              Trusted by Residential Communities
            </h3>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-300 leading-7 sm:leading-8">
              Thousands of residents rely on Smart Entry every day to keep their
              homes secure and simplify visitor management.
            </p>

            {/* Features list */}
            <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-10">
              {[
                "End-to-End Visitor Authentication",
                "Resident Approval Workflow",
                "Digital QR Visitor Passes",
                "Delivery & Staff Management",
                "Vehicle Entry Tracking",
                "Emergency Alerts",
                "Complete Audit Trail",
                "Cloud-Based Security Dashboard",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle2 className="text-cyan-400 mt-1" size={20} />
                  <span className="text-gray-200 text-sm sm:text-base leading-6">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  500+
                </h2>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Apartment Communities
                </p>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  1M+
                </h2>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Visitors Verified
                </p>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  99.9%
                </h2>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Security Accuracy
                </p>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  24/7
                </h2>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  Monitoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
