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
    <section className="py-24 bg-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-slate-900">
          Frequently Asked Questions
        </h2>

        <div className="mt-16 space-y-5">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div key={i} className="bg-white rounded-2xl shadow p-6">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center"
                >
                  <h3 className="font-semibold text-lg">{item.q}</h3>
                  <ChevronDown className={`${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <p className="mt-4 text-slate-600 leading-7">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
