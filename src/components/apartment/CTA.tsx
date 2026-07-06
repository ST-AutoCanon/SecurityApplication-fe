import {
  ArrowRight,
  CalendarDays,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#020b3d] via-[#051c72] to-[#0b3ea8] py-16 sm:py-20 lg:py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT SIDE */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-5 py-2">
              <ShieldCheck className="text-cyan-400" size={18} />
              <span className="text-cyan-300 text-xs sm:text-sm font-medium">
                Smart Apartment Security Platform
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mt-6 sm:mt-8 leading-tight">
              Ready to Secure
              <br />
              Your Apartment?
            </h2>

            {/* Description */}
            <p className="mt-5 sm:mt-8 text-sm sm:text-lg text-gray-300 leading-7 sm:leading-8">
              Join hundreds of apartment communities using Smart Entry to
              simplify visitor management, strengthen security, automate
              approvals, and provide residents with a seamless digital
              experience.
            </p>

            {/* Feature List */}
            <div className="space-y-4 sm:space-y-5 mt-8 sm:mt-10">
              {[
                "QR Visitor Passes",
                "Resident Mobile Approval",
                "Delivery & Staff Management",
                "Vehicle Entry Tracking",
                "Real-time Notifications",
                "Cloud Security Dashboard",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle2 className="text-cyan-400 mt-0.5" size={20} />

                  <span className="text-white text-sm sm:text-lg leading-6">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white rounded-2xl sm:rounded-[32px] shadow-2xl p-6 sm:p-8 lg:p-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Book a Free Demo
            </h3>

            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-6 sm:leading-7">
              Speak with our experts to discover how Smart Entry can transform
              security and visitor management in your apartment community.
            </p>

            {/* Inputs */}
            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-300 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-blue-600"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-300 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-blue-600"
              />

              <input
                type="text"
                placeholder="Apartment / Society Name"
                className="w-full rounded-xl border border-slate-300 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-blue-600"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-xl border border-slate-300 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none focus:border-blue-600"
              />
            </div>

            {/* Primary Button */}
            <button className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl py-3 sm:py-4 font-semibold flex justify-center items-center gap-2 sm:gap-3 hover:scale-[1.02] active:scale-95 transition">
              Schedule Demo
              <ArrowRight size={18} />
            </button>

            {/* Secondary Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button className="border border-slate-300 rounded-xl py-3 sm:py-4 flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition text-sm sm:text-base">
                <CalendarDays size={18} />
                Book Meeting
              </button>

              <button className="border border-slate-300 rounded-xl py-3 sm:py-4 flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition text-sm sm:text-base">
                <PhoneCall size={18} />
                Contact Sales
              </button>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs sm:text-sm text-slate-500 mt-6 sm:mt-8">
              No credit card required. Free consultation and personalized
              product demonstration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
