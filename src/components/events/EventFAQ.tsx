import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does QR ticket entry work?",
    a: "Each attendee receives a unique encrypted QR code which is scanned at the gate for instant verification.",
  },
  {
    q: "Can the system handle large events?",
    a: "Yes, it is built for thousands of concurrent attendees with real-time validation.",
  },
  {
    q: "Is offline entry possible?",
    a: "Yes, cached validation allows entry even with temporary network issues.",
  },
  {
    q: "Can VIP access be separated?",
    a: "Yes, VIP lanes and priority scanning are fully supported.",
  },
];

export default function EventFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="mt-10 sm:mt-14 lg:mt-16 space-y-4 sm:space-y-5">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition border border-slate-200"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center text-left gap-4 px-5 sm:px-6 lg:px-8 py-5 sm:py-6"
                >
                  <h3 className="font-semibold text-base sm:text-lg lg:text-xl text-slate-900">
                    {item.q}
                  </h3>

                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Smooth content animation */}
                <div
                  className={`grid transition-all duration-300 ease-in-out px-5 sm:px-6 lg:px-8 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5 sm:pb-6"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-7">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
