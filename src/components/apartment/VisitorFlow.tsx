import {
  UserPlus,
  Smartphone,
  ShieldCheck,
  QrCode,
  DoorOpen,
  LogOut,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Visitor Registration",
    description:
      "Visitors are pre-registered by residents or registered at the security gate with basic details.",
  },
  {
    icon: Smartphone,
    title: "2. Resident Approval",
    description:
      "Residents instantly receive a mobile notification to approve or reject the visitor.",
  },
  {
    icon: ShieldCheck,
    title: "3. Identity Verification",
    description:
      "Security personnel verify the visitor using OTP, ID proof, or facial authentication.",
  },
  {
    icon: QrCode,
    title: "4. QR Pass Generated",
    description:
      "A secure QR pass is issued that can be scanned at every authorized entry point.",
  },
  {
    icon: DoorOpen,
    title: "5. Secure Entry",
    description:
      "The visitor is granted access only after successful authentication and approval.",
  },
  {
    icon: LogOut,
    title: "6. Exit Recorded",
    description:
      "Exit time is automatically logged, ensuring complete visitor history and audit trails.",
  },
];

export default function VisitorFlow() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Visitor Journey
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-slate-900">
            How Smart Entry Works
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Every visitor follows a secure digital workflow that ensures only
            authorized individuals gain access to your apartment community.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Center line (desktop) */}
          <div className="hidden lg:block absolute left-0 right-0 top-10 h-1 bg-blue-100 rounded-full"></div>

          <div className="grid lg:grid-cols-6 gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={index} className="relative text-center group">
                  {/* Icon */}
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition">
                    <Icon size={34} />
                  </div>

                  {/* Step Card */}
                  <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow hover:shadow-xl transition">
                    <h3 className="text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-slate-600 leading-7">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Summary */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200"
              alt="Visitor Management"
              className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>

          {/* Right */}
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-widest">
              End-to-End Security
            </span>

            <h3 className="mt-4 text-4xl font-bold text-slate-900">
              Every Entry is Verified
            </h3>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Smart Entry ensures that every visitor is authenticated before
              entering the premises. From digital approvals to QR verification
              and exit tracking, every action is securely recorded.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Resident approval before entry",
                "QR-based visitor authentication",
                "Automatic entry and exit logs",
                "Real-time notifications",
                "Visitor history with timestamps",
                "Complete audit trail for security teams",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShieldCheck className="text-blue-600" size={20} />
                  </div>

                  <p className="text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>

            <button className="mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
