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
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Hospital Security Features
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-600 leading-6 sm:leading-7 lg:leading-8">
            Designed for healthcare environments with strict security,
            compliance, and patient safety requirements.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-14 lg:mt-16">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              // <div
              //   key={index}
              //   className="group p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-all duration-300"
              // >
              //   {/* Icon */}
              //   <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-cyan-50 flex items-center justify-center group-hover:scale-110 transition">
              //     <Icon className="text-cyan-600" size={22} />
              //   </div>

              //  <div
              //   key={index}
              //   className="group bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200 hover:border-blue-500"
              // >
              //   <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition">
              //     <Icon size={28} className="sm:w-8 sm:h-8" />
              //   </div>
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200 hover:border-blue-500"
                // className="group bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200 hover:border-blue-500"
              // className="group bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-200 hover:border-blue-500"
              >
                {/* <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition">
                  <Icon size={28} className="sm:w-8 sm:h-8" />
                </div> */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition">
                  <Icon size={28} className="sm:w-8 sm:h-8" />
                </div>

                {/* Title */}
                <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">

                  {/* <p className="text-sm sm:text-base text-slate-600 mt-3 leading-6 sm:leading-7"> */}
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
