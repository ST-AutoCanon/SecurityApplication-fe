import {
  ShieldCheck,
  Ticket,
  Users,
  Smartphone,
  Clock,
  BarChart3,
} from "lucide-react";

const benefits = [
  {
    icon: Ticket,
    title: "Zero Fake Tickets",
    desc: "QR-based encrypted tickets prevent duplication and fraud.",
  },
  {
    icon: Users,
    title: "Smooth Crowd Control",
    desc: "Manage thousands of attendees without chaos or delays.",
  },
  {
    icon: ShieldCheck,
    title: "High Security Entry",
    desc: "Multi-layer verification ensures only valid users enter.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ticketing",
    desc: "Digital tickets delivered instantly to user devices.",
  },
  {
    icon: Clock,
    title: "Fast Check-in",
    desc: "Reduce entry time from minutes to seconds.",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    desc: "Monitor attendance, flow, and performance in real time.",
  },
];

export default function EventBenefits() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-purple-600 font-semibold uppercase tracking-widest text-sm sm:text-base">
            Why Choose Our Event System
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 leading-tight">
            Built for Large Scale Events
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
            From concerts to conferences, our system handles secure entry,
            ticket validation, and live monitoring effortlessly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border bg-slate-50 hover:shadow-xl transition"
              >
                <Icon className="text-purple-600" size={30} />

                <h3 className="text-lg sm:text-xl font-bold mt-4 text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-6 sm:leading-7">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom highlight */}
        <div className="mt-14 sm:mt-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">1M+</h2>
              <p className="mt-2 text-purple-100 text-sm sm:text-base">
                Tickets Processed
              </p>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">99.9%</h2>
              <p className="mt-2 text-purple-100 text-sm sm:text-base">
                System Accuracy
              </p>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">24/7</h2>
              <p className="mt-2 text-purple-100 text-sm sm:text-base">
                Live Monitoring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
