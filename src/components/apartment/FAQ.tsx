import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

const faqs = [
  {
    question: "How does Smart Entry improve apartment security?",
    answer:
      "Smart Entry replaces manual visitor registers with a digital platform that uses resident approvals, QR codes, OTP verification, visitor photos, and complete audit logs to ensure only authorized visitors can enter the community.",
  },
  {
    question: "Can residents approve visitors remotely?",
    answer:
      "Yes. Residents receive instant notifications on their mobile devices and can approve or reject visitors from anywhere. Security guards receive the decision immediately.",
  },
  {
    question: "Does Smart Entry support delivery management?",
    answer:
      "Absolutely. Food delivery agents, courier personnel, and parcel services can be registered separately with dedicated workflows, ensuring quick entry while maintaining complete security records.",
  },
  {
    question: "Can domestic staff and maintenance workers be managed?",
    answer:
      "Yes. Housekeepers, drivers, electricians, plumbers, and contractors can have scheduled access, recurring permissions, attendance records, and identity verification.",
  },
  {
    question: "Can multiple security gates use the system?",
    answer:
      "Yes. Smart Entry supports multiple gates with centralized monitoring. Every gate shares real-time visitor information and synchronized approval status.",
  },
  {
    question: "Is visitor history stored securely?",
    answer:
      "Every visitor entry, exit, approval, QR scan, photograph, and timestamp is securely stored in the cloud with role-based access and audit logging.",
  },
  {
    question: "Does the platform integrate with CCTV?",
    answer:
      "Yes. Smart Entry can integrate with CCTV systems, allowing security personnel to associate visitor records with camera footage for enhanced monitoring.",
  },
  {
    question: "Can the software be customized for our apartment community?",
    answer:
      "Yes. We provide customizable workflows, branding, user roles, visitor policies, reports, and integrations based on your apartment's specific requirements.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 sm:px-5 py-2">
            <ShieldCheck className="text-blue-600" size={18} />
            <span className="text-blue-700 font-semibold text-sm sm:text-base">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="mt-5 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Everything You Need to Know
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
            Find answers to the most common questions about Smart Entry's
            apartment visitor management and security platform.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-10 sm:mt-12 lg:mt-16 space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg overflow-hidden border border-slate-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-start gap-4 text-left px-5 sm:px-8 py-5 sm:py-6"
                >
                  <h3 className="text-base sm:text-xl font-semibold text-slate-900 pr-4 leading-6 sm:leading-7">
                    {faq.question}
                  </h3>

                  <ChevronDown
                    className={`transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-5 sm:px-8 pb-5 sm:pb-8">
                    <div className="h-px bg-slate-200 mb-4 sm:mb-6" />

                    <p className="text-sm sm:text-lg text-slate-600 leading-6 sm:leading-8">
                      {faq.answer}
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
