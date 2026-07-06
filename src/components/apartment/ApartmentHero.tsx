import {
  ShieldCheck,
  ArrowRight,
  PlayCircle,
  Building2,
  Users,
  Camera,
  Smartphone,
} from "lucide-react";

export default function ApartmentHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#020b3d] via-[#051c72] to-[#0a2b92]">
      {/* Background Glow */}
      <div className="absolute top-20 left-10 h-40 w-40 sm:h-72 sm:w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT SECTION */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-4 sm:px-5 py-2 mb-6">
              <ShieldCheck className="text-cyan-400" size={18} />
              <span className="text-cyan-300 text-xs sm:text-sm font-medium">
                Smart Apartment Security Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              Secure Every
              <span className="block text-cyan-400">Apartment Entry</span>
            </h1>

            {/* Description */}
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-300 leading-7 sm:leading-8 max-w-xl">
              Smart Entry provides next-generation visitor authentication,
              resident approvals, QR-based visitor passes, delivery management,
              staff verification, and real-time security monitoring for modern
              residential communities.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 active:scale-95 transition px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold shadow-xl">
                Book Free Demo
                <ArrowRight size={18} />
              </button>

              <button className="flex items-center justify-center gap-2 border border-white/30 hover:bg-white hover:text-[#020b3d] active:scale-95 transition px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold">
                <PlayCircle size={20} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mt-10 sm:mt-14">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10">
                <Building2 className="text-cyan-400 mb-3" />
                <h2 className="text-white text-xl sm:text-2xl font-bold">
                  500+
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">Apartments</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10">
                <Users className="text-cyan-400 mb-3" />
                <h2 className="text-white text-xl sm:text-2xl font-bold">
                  1M+
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">Visitors</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10">
                <Camera className="text-cyan-400 mb-3" />
                <h2 className="text-white text-xl sm:text-2xl font-bold">
                  24/7
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">Monitoring</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10">
                <Smartphone className="text-cyan-400 mb-3" />
                <h2 className="text-white text-xl sm:text-2xl font-bold">
                  Mobile
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">Access</p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="relative mt-10 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400"
              alt="Apartment"
              className="rounded-3xl shadow-2xl object-cover w-full h-[300px] sm:h-[450px] lg:h-[650px]"
            />

            {/* Floating Card (Responsive) */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-56 sm:w-72">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Today's Visitors
                  </p>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#020b3d] mt-1 sm:mt-2">
                    124
                  </h2>
                </div>

                <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="text-blue-600" />
                </div>
              </div>

              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Approved</span>
                  <span className="font-semibold text-green-600">109</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Pending</span>
                  <span className="font-semibold text-orange-500">11</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Blocked</span>
                  <span className="font-semibold text-red-500">4</span>
                </div>
              </div>
            </div>

            {/* Floating Badge (Responsive) */}
            <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 bg-cyan-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-xl">
              <p className="text-xs sm:text-sm">Security Status</p>
              <h3 className="font-bold text-base sm:text-xl">
                All Gates Secure
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
