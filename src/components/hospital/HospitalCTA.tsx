import { ArrowRight, Hospital } from "lucide-react";

export default function HospitalCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#021428] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm">
          <Hospital size={18} />
          Hospital Security Platform
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-6 sm:mt-8 leading-tight">
          Secure Your Hospital with Smart Access Control
        </h2>

        {/* Description */}
        <p className="text-gray-300 mt-4 sm:mt-6 text-base sm:text-lg max-w-3xl mx-auto leading-7 sm:leading-8">
          Manage patient visitors, ICU restrictions, doctor authentication, and
          emergency access with a secure digital system.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
          <button className="bg-cyan-500 hover:bg-cyan-400 transition px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold w-full sm:w-auto">
            Request Hospital Demo
          </button>

          <button className="border border-white/30 hover:bg-white/10 transition px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto">
            Contact Admin
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mt-12 sm:mt-16">
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold">500+</h3>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Hospitals Connected
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold">99.9%</h3>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Security Accuracy
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold">24/7</h3>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Monitoring System
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
