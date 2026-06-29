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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center">
          Event Management Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-8 bg-slate-50 rounded-3xl border">
                <Icon className="text-purple-600" size={36} />
                <h3 className="text-xl font-bold mt-4">{f.title}</h3>
                <p className="text-slate-600 mt-2">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
