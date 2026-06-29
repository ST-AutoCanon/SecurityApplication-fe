import { ArrowRight, Hospital } from "lucide-react";

export default function HospitalCTA() {
  return (
    <section className="py-24 bg-[#021428] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400 px-5 py-2 rounded-full">
          <Hospital size={18} />
          Hospital Security Platform
        </div>

        {/* Heading */}
        <h2 className="text-5xl font-bold mt-8">
          Secure Your Hospital with Smart Access Control
        </h2>

        <p className="text-gray-300 mt-6 text-lg max-w-3xl mx-auto leading-8">
          Manage patient visitors, ICU restrictions, doctor authentication, and
          emergency access with a secure digital system.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <button className="bg-cyan-500 px-8 py-4 rounded-xl font-semibold">
            Request Hospital Demo
          </button>

          <button className="border border-white/30 px-8 py-4 rounded-xl flex items-center gap-2">
            Contact Admin
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-10 mt-16">
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="text-gray-300 mt-2">Hospitals Connected</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">99.9%</h3>
            <p className="text-gray-300 mt-2">Security Accuracy</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="text-gray-300 mt-2">Monitoring System</p>
          </div>
        </div>
      </div>
    </section>
  );
}
