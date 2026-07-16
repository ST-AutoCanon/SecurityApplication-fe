import { useState } from "react";
import {
  Building2,
  Hospital,
  CalendarDays,
  Phone,
  Mail,
  User,
  Building,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RequestDemo() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
          <CheckCircle2 className="mx-auto text-green-500" size={70} />

          <h1 className="text-4xl font-bold mt-6 text-slate-900">
            Request Submitted
          </h1>

          <p className="text-slate-600 mt-4 leading-7">
            Thank you for requesting a demo.
            <br />
            Our team will contact you shortly.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 py-20 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
            Smart Entry Platform
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-6 text-slate-900 leading-tight">
            Request a Free Demo
          </h1>

          <p className="mt-6 text-slate-600 leading-8 text-lg">
            Discover how Smart Entry can secure Apartments, Hospitals and Events
            with QR verification, live monitoring and intelligent visitor
            management.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4">
              <Building2 className="text-blue-600" />
              <div>
                <h3 className="font-semibold">Apartment Security</h3>
                <p className="text-slate-600 text-sm">
                  Resident approval & visitor management.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Hospital className="text-cyan-600" />
              <div>
                <h3 className="font-semibold">Hospital Security</h3>
                <p className="text-slate-600 text-sm">
                  Patient-based visitor approvals.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <CalendarDays className="text-purple-600" />
              <div>
                <h3 className="font-semibold">Event Management</h3>
                <p className="text-slate-600 text-sm">
                  QR ticketing & live attendee tracking.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="text-blue-600" />
              <span>+91 9591104481</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <span>support@smartentry.com</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Book Your Demo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-medium">Full Name</label>

              <div className="relative mt-2">
                <User className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Company / Organization</label>

              <div className="relative mt-2">
                <Building className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  required
                  type="text"
                  placeholder="ABC Organization"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Email Address</label>

              <div className="relative mt-2">
                <Mail className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  required
                  type="email"
                  placeholder="example@email.com"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Phone Number</label>

              <div className="relative mt-2">
                <Phone className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  required
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Select Service</label>

              <select
                required
                className="w-full border rounded-xl px-4 py-3 mt-2 outline-none focus:border-blue-600"
              >
                <option value="">Choose Service</option>
                <option>Apartment Visitor Management</option>
                <option>Hospital Visitor Management</option>
                <option>Event Entry Management</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Message</label>

              <div className="relative mt-2">
                <MessageSquare className="absolute left-4 top-4 text-gray-400" />

                <textarea
                  rows={5}
                  placeholder="Tell us about your requirements..."
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-600 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Request Demo
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
