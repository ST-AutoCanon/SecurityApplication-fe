import { Hospital, ShieldCheck, UserRoundCheck, Ambulance } from "lucide-react";

export default function HospitalHero() {
  return (
    <section className="bg-gradient-to-br from-[#021d3d] via-[#043b73] to-[#0b74d1] text-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400 px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base">
            <Hospital size={18} />
            Hospital Security Platform
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mt-6 sm:mt-8 leading-tight">
            Smart Hospital
            <br />
            Visitor Management
          </h1>

          {/* Paragraph */}
          <p className="mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg text-gray-200 leading-7 sm:leading-8">
            Secure patient visits, doctor authentication, emergency access, ICU
            restrictions and staff verification using one intelligent platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10">
            <button className="bg-cyan-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:scale-105 transition">
              Request Demo
            </button>

            <button className="border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="grid gap-6">
          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <ShieldCheck size={32} className="sm:size-[42px] text-cyan-400" />

            <h3 className="text-xl sm:text-2xl font-bold mt-4">
              Hospital Security
            </h3>

            <p className="text-sm sm:text-base text-gray-300 mt-3 leading-6 sm:leading-7">
              Real-time visitor verification with digital approvals.
            </p>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:scale-[1.02] transition">
              <UserRoundCheck className="text-cyan-400" size={28} />
              <p className="mt-4 font-semibold text-sm sm:text-base">
                Patient Approval
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:scale-[1.02] transition">
              <Ambulance className="text-cyan-400" size={28} />
              <p className="mt-4 font-semibold text-sm sm:text-base">
                Emergency Access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
