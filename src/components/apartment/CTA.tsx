import {
  ArrowRight,
  CalendarDays,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#020b3d] via-[#051c72] to-[#0b3ea8] py-24">
      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}

          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2">
              <ShieldCheck className="text-cyan-400" size={18} />

              <span className="text-cyan-300 font-medium">
                Smart Apartment Security Platform
              </span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold text-white mt-8 leading-tight">
              Ready to Secure
              <br />
              Your Apartment?
            </h2>

            <p className="mt-8 text-lg text-gray-300 leading-8">
              Join hundreds of apartment communities using Smart Entry to
              simplify visitor management, strengthen security, automate
              approvals, and provide residents with a seamless digital
              experience.
            </p>

            <div className="space-y-5 mt-10">
              {[
                "QR Visitor Passes",
                "Resident Mobile Approval",
                "Delivery & Staff Management",
                "Vehicle Entry Tracking",
                "Real-time Notifications",
                "Cloud Security Dashboard",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <CheckCircle2 className="text-cyan-400" size={22} />

                  <span className="text-white text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}

          <div className="bg-white rounded-[32px] shadow-2xl p-10">
            <h3 className="text-3xl font-bold text-slate-900">
              Book a Free Demo
            </h3>

            <p className="text-slate-600 mt-4 leading-7">
              Speak with our experts to discover how Smart Entry can transform
              security and visitor management in your apartment community.
            </p>

            <div className="mt-10 space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
              />

              <input
                type="text"
                placeholder="Apartment / Society Name"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
              />
            </div>

            <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3 hover:scale-[1.02] transition">
              Schedule Demo
              <ArrowRight size={20} />
            </button>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="border border-slate-300 rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-slate-50 transition">
                <CalendarDays size={20} />
                Book Meeting
              </button>

              <button className="border border-slate-300 rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-slate-50 transition">
                <PhoneCall size={20} />
                Contact Sales
              </button>
            </div>

            <p className="text-center text-sm text-slate-500 mt-8">
              No credit card required. Free consultation and personalized
              product demonstration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
