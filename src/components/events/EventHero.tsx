import { Ticket, QrCode, Users } from "lucide-react";

export default function EventHero() {
  return (
    <section className="bg-[#0a0420] text-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-purple-600/20 px-5 py-2 rounded-full border border-purple-500">
            <Ticket size={18} />
            <span className="text-purple-300 font-semibold">
              Smart Event Entry System
            </span>
          </div>

          <h1 className="text-5xl font-black mt-6 leading-tight">
            Event Security & Entry Management
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-8">
            Manage attendees with QR tickets, secure entry validation, VIP
            lanes, and real-time monitoring for large events.
          </p>

          <div className="flex gap-4 mt-10">
            <button className="bg-purple-600 px-8 py-4 rounded-xl font-semibold">
              Create Event
            </button>

            <button className="border border-white/30 px-8 py-4 rounded-xl">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white/10 p-8 rounded-2xl border border-white/10">
            <QrCode size={40} className="text-purple-400" />
            <h3 className="text-xl font-bold mt-4">QR Ticket System</h3>
            <p className="text-gray-300 mt-2">
              Fast digital entry verification using QR codes.
            </p>
          </div>

          <div className="bg-white/10 p-8 rounded-2xl border border-white/10">
            <Users size={40} className="text-purple-400" />
            <h3 className="text-xl font-bold mt-4">Live Attendance</h3>
            <p className="text-gray-300 mt-2">
              Monitor all attendees in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
