import {
  UserPlus,
  ClipboardCheck,
  QrCode,
  DoorOpen,
  HeartPulse,
  Clock,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Visitor Request",
    desc: "Visitor sends request to meet patient with purpose details.",
  },
  {
    icon: ClipboardCheck,
    title: "Patient Approval",
    desc: "Patient or guardian approves or rejects visitor request.",
  },
  {
    icon: ShieldCheck,
    title: "Security Verification",
    desc: "Hospital security validates identity before entry.",
  },
  {
    icon: QrCode,
    title: "QR Pass Generation",
    desc: "Secure QR code generated for approved visitors.",
  },
  {
    icon: DoorOpen,
    title: "Ward Entry Allowed",
    desc: "Visitor scans QR and enters assigned ward only.",
  },
  {
    icon: Clock,
    title: "Time-Controlled Visit",
    desc: "Visit duration is monitored and automatically expires.",
  },
  {
    icon: HeartPulse,
    title: "Exit & Logging",
    desc: "Exit time is recorded for audit and compliance.",
  },
];

export default function PatientVisitorFlow() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-cyan-600 font-semibold uppercase tracking-widest text-xs sm:text-sm">
            Hospital Access Workflow
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 sm:mt-4">
            Patient Visitor Management Flow
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-600 leading-6 sm:leading-8">
            A controlled, secure and compliant workflow ensuring only authorized
            visitors can access patients.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-5 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="text-center bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-5 sm:p-6"
              >
                {/* Icon */}
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md">
                  <Icon size={24} className="sm:hidden" />
                  <Icon size={28} className="hidden sm:block lg:hidden" />
                  <Icon size={30} className="hidden lg:block" />
                </div>

                {/* Content */}
                <div className="mt-4 sm:mt-6">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 mt-2 text-xs sm:text-sm leading-5 sm:leading-6">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
