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
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm sm:text-base">
            Visitor Journey
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            How Smart Entry Works
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
            Every visitor follows a secure digital workflow that ensures only
            authorized individuals gain access to your apartment community.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* Center line (desktop only) */}
          <div className="hidden lg:block absolute left-0 right-0 top-10 h-1 bg-blue-100 rounded-full"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={index} className="relative text-center group">
                  {/* Icon */}
                  <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg sm:shadow-xl group-hover:scale-105 transition">
                    <Icon size={26} className="sm:w-[34px] sm:h-[34px]" />
                  </div>

                  {/* Step Card */}
                  <div className="mt-6 sm:mt-8 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-lg transition">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Summary */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200"
              alt="Visitor Management"
              className="rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl w-full h-[260px] sm:h-[350px] lg:h-[450px] object-cover"
            />
          </div>

          {/* Right Content */}
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm sm:text-base">
              End-to-End Security
            </span>

            <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Every Entry is Verified
            </h3>

            <p className="mt-5 sm:mt-6 text-sm sm:text-lg text-slate-600 leading-7 sm:leading-8">
              Smart Entry ensures that every visitor is authenticated before
              entering the premises. From digital approvals to QR verification
              and exit tracking, every action is securely recorded.
            </p>

            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
              {[
                "Resident approval before entry",
                "QR-based visitor authentication",
                "Automatic entry and exit logs",
                "Real-time notifications",
                "Visitor history with timestamps",
                "Complete audit trail for security teams",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="text-blue-600" size={18} />
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-8 sm:mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition text-sm sm:text-base">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
