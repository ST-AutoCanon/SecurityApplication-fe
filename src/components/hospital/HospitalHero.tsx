import { Hospital, ShieldCheck, UserRoundCheck, Ambulance } from "lucide-react";

export default function HospitalHero() {
  return (
    <section className="bg-gradient-to-br from-[#021d3d] via-[#043b73] to-[#0b74d1] text-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400 px-5 py-2 rounded-full">
            <Hospital size={18} />
            Hospital Security Platform
          </div>

          <h1 className="text-6xl font-black mt-8 leading-tight">
            Smart Hospital
            <br />
            Visitor Management
          </h1>

          <p className="mt-8 text-lg text-gray-200 leading-8">
            Secure patient visits, doctor authentication, emergency access, ICU
            restrictions and staff verification using one intelligent platform.
          </p>

          <div className="flex gap-5 mt-10">
            <button className="bg-cyan-500 px-8 py-4 rounded-xl font-semibold">
              Request Demo
            </button>

            <button className="border border-white/30 px-8 py-4 rounded-xl">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8">
            <ShieldCheck size={42} className="text-cyan-400" />
            <h3 className="text-2xl font-bold mt-4">Hospital Security</h3>

            <p className="text-gray-300 mt-3">
              Real-time visitor verification with digital approvals.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-3xl p-6">
              <UserRoundCheck className="text-cyan-400" />
              <p className="mt-4 font-semibold">Patient Approval</p>
            </div>

            <div className="bg-white/10 rounded-3xl p-6">
              <Ambulance className="text-cyan-400" />
              <p className="mt-4 font-semibold">Emergency Access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
