import {
  Ticket,
  QrCode,
  ScanFace,
  ShieldCheck,
  DoorOpen,
  LogOut,
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
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-purple-600 font-semibold uppercase tracking-widest">
            Event Entry Workflow
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            How Event Security Works
          </h2>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-slate-600 leading-7 sm:leading-8">
            A complete digital workflow ensures secure, fast, and fraud-free
            event entry management.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                  <Icon size={28} />
                </div>

                {/* Content */}
                <div className="mt-5 sm:mt-6 bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition w-full">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 mt-3 text-sm leading-6">
                    {step.desc}
                  </p>
                </div>

                {/* Connector line (desktop only, cleaner than arrows) */}
                {index !== steps.length - 1 && (
                  <div className="hidden xl:block absolute top-10 right-[-20px] w-10 h-1 bg-purple-300 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
