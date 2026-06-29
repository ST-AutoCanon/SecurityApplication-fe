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
    <section className="py-24 bg-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-slate-900">Hospital FAQs</h2>
          <p className="text-slate-600 mt-4">
            Everything about hospital visitor management and security
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div key={i} className="bg-white rounded-2xl shadow p-6">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center"
                >
                  <h3 className="font-semibold text-lg">{item.q}</h3>
                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
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
