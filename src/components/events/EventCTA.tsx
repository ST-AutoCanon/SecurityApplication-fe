import { ArrowRight, Ticket } from "lucide-react";

export default function EventCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0a0420] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Ready to Manage Your Event Securely?
        </h2>

        {/* Description */}
        <p className="text-gray-300 mt-5 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 max-w-3xl mx-auto">
          Create secure events with QR tickets, live monitoring, and real-time
          attendee tracking.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-10 sm:mt-12">
          <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 active:scale-95 transition px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
            <Ticket size={18} />
            Create Event
          </button>

          <button className="w-full sm:w-auto border border-white/30 hover:bg-white hover:text-[#0a0420] active:scale-95 transition px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2">
            Learn More
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
