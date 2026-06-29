import { ArrowRight, Ticket } from "lucide-react";

export default function EventCTA() {
  return (
    <section className="py-24 bg-[#0a0420] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold">
          Ready to Manage Your Event Securely?
        </h2>

        <p className="text-gray-300 mt-6 text-lg max-w-3xl mx-auto">
          Create secure events with QR tickets, live monitoring, and real-time
          attendee tracking.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <button className="bg-purple-600 px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
            <Ticket size={18} />
            Create Event
          </button>

          <button className="border border-white/30 px-8 py-4 rounded-xl flex items-center gap-2">
            Learn More
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
