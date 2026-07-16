import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="bg-slate-100 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Contact Us
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            We’re here to support Smart Entry system setup, integration, and
            queries.
          </p>
        </div>

        {/* CONTACT INFO + FORM */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT - INFO */}
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600" />
                <h3 className="text-lg font-semibold">Location</h3>
              </div>
              <p className="mt-3 text-slate-600">Bangalore, Karnataka, India</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow">
              <div className="flex items-center gap-3">
                <Phone className="text-green-600" />
                <h3 className="text-lg font-semibold">Phone</h3>
              </div>
              <p className="mt-3 text-slate-600">+91 9591104481</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow">
              <div className="flex items-center gap-3">
                <Mail className="text-purple-600" />
                <h3 className="text-lg font-semibold">Email</h3>
              </div>
              <p className="mt-3 text-slate-600">support@smartentry.com</p>
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-slate-900">Send Message</h2>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* MAP SECTION (BOTTOM - MODERN STYLE) */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Our Location</h3>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border">
            <iframe
              title="Bangalore Location"
              src="https://www.google.com/maps?q=Bangalore&output=embed"
              className="w-full h-[300px] sm:h-[400px] lg:h-[450px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
