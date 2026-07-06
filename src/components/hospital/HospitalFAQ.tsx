import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does hospital visitor approval work?",
    a: "Visitors must be approved by the patient, guardian, or hospital staff before entry is allowed.",
  },
  {
    q: "Can ICU patients receive visitors?",
    a: "ICU access is highly restricted and only allowed for authorized doctors and emergency cases.",
  },
  {
    q: "What happens in emergency situations?",
    a: "Emergency override allows instant access for critical medical conditions with full logging.",
  },
  {
    q: "Is visitor tracking available?",
    a: "Yes, every entry and exit is logged for compliance, safety, and audit purposes.",
  },
  {
    q: "Can hospital staff access control be customized?",
    a: "Yes, role-based access allows custom permissions for doctors, nurses, and staff.",
  },
];

export default function HospitalFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Hospital FAQs
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 mt-3 sm:mt-4 leading-6 sm:leading-7">
            Everything about hospital visitor management and security
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 lg:p-7 transition"
              >
                {/* Question Button */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center gap-4 text-left"
                >
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-slate-900 leading-6">
                    {item.q}
                  </h3>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="mt-3 sm:mt-4">
                    <p className="text-slate-600 text-sm sm:text-base leading-6 sm:leading-7">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
