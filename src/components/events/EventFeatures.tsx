import { Ticket, QrCode, ShieldCheck, Users, Bell, MapPin } from "lucide-react";

const features = [
  { icon: QrCode, title: "QR Entry", desc: "Instant scan-based entry system." },
  {
    icon: Ticket,
    title: "Digital Tickets",
    desc: "Paperless ticket management.",
  },
  {
    icon: Users,
    title: "Crowd Control",
    desc: "Monitor live attendance flow.",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Protection",
    desc: "Prevent fake entries.",
  },
  { icon: Bell, title: "Live Alerts", desc: "Instant event notifications." },
  { icon: MapPin, title: "Gate Tracking", desc: "Track entry points." },
];

export default function EventFeatures() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Event Management Features
        </h2>

        <p className="text-center text-slate-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
          Everything you need to manage secure, fast, and scalable event entry.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                className="group bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition">
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold mt-5 text-slate-900">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 mt-2 text-sm sm:text-base leading-6 sm:leading-7">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
