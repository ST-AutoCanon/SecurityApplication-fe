import {
  Ticket,
  QrCode,
  ScanFace,
  ShieldCheck,
  DoorOpen,
  LogOut,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Ticket,
    title: "1. Event Ticket Booking",
    desc: "Users register for the event and receive a digital ticket instantly.",
  },
  {
    icon: QrCode,
    title: "2. QR Code Generation",
    desc: "Each ticket is converted into a secure, encrypted QR code.",
  },
  {
    icon: ScanFace,
    title: "3. Entry Verification",
    desc: "Security scans QR and optionally performs identity validation.",
  },
  {
    icon: ShieldCheck,
    title: "4. Security Approval",
    desc: "System checks ticket validity and prevents duplicate entries.",
  },
  {
    icon: DoorOpen,
    title: "5. Event Entry Allowed",
    desc: "Attendee is granted access into the event venue.",
  },
  {
    icon: LogOut,
    title: "6. Exit Tracking",
    desc: "Exit time is logged for full attendance analytics.",
  },
];

export default function EventFlow() {
  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-purple-600 font-semibold uppercase tracking-widest">
            Event Entry Workflow
          </span>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            How Event Security Works
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            A complete digital workflow ensures secure, fast, and fraud-free
            event entry management.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-6 gap-10 mt-20">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="text-center relative">
                {/* Icon */}
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg">
                  <Icon size={30} />
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

                {/* Arrow */}
                {index !== steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 right-[-40px] text-purple-400">
                    <ArrowRight />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
