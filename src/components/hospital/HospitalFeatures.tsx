import {
  UserCheck,
  ShieldCheck,
  HeartPulse,
  UserRoundPlus,
  Lock,
  FileCheck2,
} from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Patient-Based Visitor Approval",
    desc: "Visitors can only enter after approval from patient or guardian.",
  },
  {
    icon: ShieldCheck,
    title: "Hospital-Level Security Control",
    desc: "Strict access rules for wards, ICUs, and restricted zones.",
  },
  {
    icon: HeartPulse,
    title: "ICU Restricted Access",
    desc: "Only authorized doctors and emergency personnel allowed.",
  },
  {
    icon: UserRoundPlus,
    title: "Staff & Doctor Authentication",
    desc: "Verify doctors, nurses, and staff with secure credentials.",
  },
  {
    icon: Lock,
    title: "Emergency Override System",
    desc: "Instant access in critical emergency situations.",
  },
  {
    icon: FileCheck2,
    title: "Audit & Compliance Logs",
    desc: "Complete visitor history for legal and compliance tracking.",
  },
];

export default function HospitalFeatures() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-900">
            Hospital Security Features
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Designed for healthcare environments with strict security,
            compliance, and patient safety requirements.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
          {features.map((item, index) => {
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
      </div>
    </section>
  );
}
