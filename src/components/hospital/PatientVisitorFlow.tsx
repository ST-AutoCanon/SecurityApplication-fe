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
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-cyan-600 font-semibold uppercase tracking-widest">
            Hospital Access Workflow
          </span>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            Patient Visitor Management Flow
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            A controlled, secure and compliant workflow ensuring only authorized
            visitors can access patients.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-7 gap-8 mt-20">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="text-center relative">
                {/* Icon */}
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
                  <Icon size={28} />
                </div>

                {/* Content */}
                <div className="mt-6 bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
                  <h3 className="font-bold text-lg text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 mt-3 text-sm leading-6">
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
