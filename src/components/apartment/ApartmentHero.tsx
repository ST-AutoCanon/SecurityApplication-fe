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
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-5 py-2 mb-6">
              <ShieldCheck className="text-cyan-400" size={18} />
              <span className="text-cyan-300 text-sm font-medium">
                Smart Apartment Security Platform
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              Secure Every
              <span className="block text-cyan-400">Apartment Entry</span>
            </h1>

            <p className="mt-8 text-lg text-gray-300 leading-8 max-w-xl">
              Smart Entry provides next-generation visitor authentication,
              resident approvals, QR-based visitor passes, delivery management,
              staff verification, and real-time security monitoring for modern
              residential communities.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl text-white font-semibold shadow-xl">
                Book Free Demo
                <ArrowRight size={18} />
              </button>

              <button className="flex items-center gap-2 border border-white/30 hover:bg-white hover:text-[#020b3d] transition-all duration-300 px-8 py-4 rounded-xl text-white font-semibold">
                <PlayCircle size={20} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <Building2 className="text-cyan-400 mb-3" />
                <h2 className="text-white text-2xl font-bold">500+</h2>
                <p className="text-gray-400 text-sm">Apartments</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <Users className="text-cyan-400 mb-3" />
                <h2 className="text-white text-2xl font-bold">1M+</h2>
                <p className="text-gray-400 text-sm">Visitors</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <Camera className="text-cyan-400 mb-3" />
                <h2 className="text-white text-2xl font-bold">24/7</h2>
                <p className="text-gray-400 text-sm">Monitoring</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <Smartphone className="text-cyan-400 mb-3" />
                <h2 className="text-white text-2xl font-bold">Mobile</h2>
                <p className="text-gray-400 text-sm">Access</p>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400"
              alt="Apartment"
              className="rounded-3xl shadow-2xl object-cover h-[650px] w-full"
            />

            {/* Floating Card */}

            <div className="absolute top-8 left-8 bg-white rounded-2xl shadow-2xl p-6 w-72">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Today's Visitors</p>

                  <h2 className="text-4xl font-bold text-[#020b3d] mt-2">
                    124
                  </h2>
                </div>

                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="text-blue-600" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
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

            {/* Floating Badge */}

            <div className="absolute bottom-8 right-8 bg-cyan-500 text-white px-6 py-4 rounded-2xl shadow-xl">
              <p className="text-sm">Security Status</p>
              <h3 className="font-bold text-xl">All Gates Secure</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
