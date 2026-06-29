import {
  ShieldCheck,
  HeartPulse,
  Users,
  Lock,
  FileCheck2,
  Activity,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Maximum Hospital Security",
    desc: "Strict multi-layer security ensures only authorized access.",
  },
  {
    icon: HeartPulse,
    title: "Patient Safety First",
    desc: "ICU and sensitive zones are fully protected and monitored.",
  },
  {
    icon: Users,
    title: "Controlled Visitor Flow",
    desc: "Visitors are managed with approvals and time restrictions.",
  },
  {
    icon: Lock,
    title: "Restricted Zone Access",
    desc: "Each ward has role-based access control.",
  },
  {
    icon: FileCheck2,
    title: "Audit & Compliance Ready",
    desc: "Complete logs for medical compliance and reporting.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    desc: "Live tracking of visitors, staff, and emergency cases.",
  },
];

export default function HospitalBenefits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-cyan-600 font-semibold uppercase tracking-widest">
            Why Hospitals Choose Us
          </span>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            Built for Critical Healthcare Environments
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Designed to handle sensitive hospital operations with precision,
            safety, and full compliance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-slate-50 border hover:shadow-xl transition"
              >
                <Icon className="text-cyan-600" size={36} />

                <h3 className="text-xl font-bold mt-4 text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-3 leading-7">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="mt-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-3xl p-12 grid lg:grid-cols-3 gap-10">
          <div>
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="mt-2 text-cyan-100">Hospitals Secured</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">99.9%</h2>
            <p className="mt-2 text-cyan-100">Security Accuracy</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">24/7</h2>
            <p className="mt-2 text-cyan-100">Live Monitoring</p>
          </div>
        </div>
      </div>
    </section>
  );
}
