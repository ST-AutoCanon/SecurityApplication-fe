import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Building2,
  CalendarDays,
  Hospital,
  ShieldCheck,
  Users,
  Activity,
  Lock,
} from "lucide-react";

const slides = [
  {
    title: "Apartment Visitor Management",
    subtitle:
      "Secure digital visitor management for apartments with QR verification and resident approval.",
    button: "Explore Apartments",
    icon: <Building2 size={38} />,
    route: "/apartment",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400",
  },
  {
    title: "Smart Event Entry",
    subtitle:
      "Manage attendees with QR tickets, instant check-in and real-time visitor analytics.",
    button: "Explore Events",
    icon: <CalendarDays size={38} />,
    route: "/event",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400",
  },
  {
    title: "Hospital Visitor System",
    subtitle:
      "Safe visitor verification for hospitals with patient-based approvals and emergency access.",
    button: "Explore Hospitals",
    icon: <Hospital size={38} />,
    route: "/hospital",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Authentication",
      desc: "QR-based secure entry system with validation.",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      desc: "Admin, Security, Resident, Doctor, Organizer roles.",
    },
    {
      icon: Lock,
      title: "Access Control",
      desc: "Control who enters where and when.",
    },
    {
      icon: Activity,
      title: "Live Monitoring",
      desc: "Real-time tracking of all entries and exits.",
    },
  ];

  return (
    <div className="bg-[#020b3d] text-white min-h-screen">
      {/* ================= HERO ================= */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section className="min-h-[80vh] sm:min-h-[85vh] lg:min-h-[88vh] flex items-center py-10 sm:py-16 lg:py-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                {/* LEFT */}
                <div>
                  <div className="inline-flex items-center gap-3 bg-blue-600/20 border border-blue-500 px-4 py-2 sm:px-5 sm:py-3 rounded-full text-cyan-300 mb-5 sm:mb-6 text-sm sm:text-base">
                    {slide.icon}
                    <span className="font-semibold">Smart Entry Platform</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-300 leading-6 sm:leading-8">
                    {slide.subtitle}
                  </p>

                  <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
                    <button
                      onClick={() => navigate(slide.route)}
                      className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-xl w-full sm:w-auto"
                    >
                      {slide.button}
                    </button>

                    <button className="border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl w-full sm:w-auto">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                {/* <div> */}
                <div className="relative">

                  <img
                    src={slide.image}
                    className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-[200px] sm:h-[300px] lg:h-[480px] object-cover"
                    alt="slide"
                  />
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= OVERVIEW ================= */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            One Platform — Three Powerful Systems
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Manage apartments, events, and hospitals using a unified smart
            system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16">
            <div className="p-6 sm:p-8 bg-slate-50 rounded-2xl sm:rounded-3xl">
              <Building2 className="text-blue-600 mx-auto" size={40} />
              <h3 className="text-lg sm:text-xl font-bold mt-4">
                Apartment Security
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Resident-controlled visitor access system.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-slate-50 rounded-2xl sm:rounded-3xl">
              <CalendarDays className="text-purple-600 mx-auto" size={40} />
              <h3 className="text-lg sm:text-xl font-bold mt-4">
                Event Management
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                QR ticketing with fraud detection and analytics.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-slate-50 rounded-2xl sm:rounded-3xl">
              <Hospital className="text-cyan-600 mx-auto" size={40} />
              <h3 className="text-lg sm:text-xl font-bold mt-4">
                Hospital Security
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Patient-based visitor approval system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-14 sm:py-20 lg:py-24 bg-slate-100 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
            Core Platform Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-16">
            {features.map((f, i) => {
              const Icon = f.icon;

              return (
                <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl shadow">
                  <Icon className="text-blue-600" />
                  <h3 className="font-bold mt-4">{f.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#020b3d] text-white text-center px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Ready to Secure Your World?
        </h2>

        <p className="text-gray-300 mt-4 text-sm sm:text-base">
          Start managing access with intelligent security today.
        </p>

        <button className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold w-full sm:w-auto">
          Get Started
        </button>
      </section>
    </div>
  );
}
