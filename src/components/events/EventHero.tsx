import { Ticket, QrCode, Users } from "lucide-react";

export default function EventHero() {
  return (
    <section className="bg-[#0a0420] text-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-600/20 px-4 sm:px-5 py-2 rounded-full border border-purple-500">
            <Ticket size={18} />
            <span className="text-purple-300 font-semibold text-sm sm:text-base">
              Smart Event Entry System
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mt-6 leading-tight">
            Event Security & Entry Management
          </h1>

          {/* Description */}
          <p className="text-gray-300 mt-6 text-base sm:text-lg leading-7 sm:leading-8 max-w-xl">
            Manage attendees with QR tickets, secure entry validation, VIP
            lanes, and real-time monitoring for large events.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">
            <button className="bg-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-purple-700 transition">
              Create Event
            </button>

            <button className="border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-[#0a0420] transition">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-purple-400 transition">
            <QrCode size={36} className="text-purple-400" />
            <h3 className="text-lg sm:text-xl font-bold mt-4">
              QR Ticket System
            </h3>
            <p className="text-gray-300 mt-2 text-sm sm:text-base leading-6">
              Fast digital entry verification using QR codes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-purple-400 transition">
            <Users size={36} className="text-purple-400" />
            <h3 className="text-lg sm:text-xl font-bold mt-4">
              Live Attendance
            </h3>
            <p className="text-gray-300 mt-2 text-sm sm:text-base leading-6">
              Monitor all attendees in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
