// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import { useNavigate } from "react-router-dom";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { Building2, CalendarDays, Hospital, ArrowRight } from "lucide-react";

// const slides = [
//   {
//     title: "Apartment Visitor Management",
//     subtitle:
//       "Secure digital visitor management for apartments with QR verification and resident approval.",
//     button: "Explore Apartments",
//     icon: <Building2 size={42} />,
//     image:
//       "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400",
//   },

//   {
//     title: "Smart Event Entry",
//     subtitle:
//       "Manage attendees with QR tickets, instant check-in and real-time visitor analytics.",
//     button: "Explore Events",
//     icon: <CalendarDays size={42} />,
//     image:
//       "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400",
//   },

//   {
//     title: "Hospital Visitor System",
//     subtitle:
//       "Safe visitor verification for hospitals with patient-based approvals and emergency access.",
//     button: "Explore Hospitals",
//     icon: <Hospital size={42} />,
//     image:
//       "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400",
//   },
// ];

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-[#020b3d] min-h-screen">
//       {/* HERO */}

//       <Swiper
//         modules={[Pagination, Navigation, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         loop
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <section className="min-h-[88vh] flex items-center">
//               <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
//                 {/* LEFT */}

//                 <div>
//                   <div className="inline-flex items-center gap-3 bg-blue-600/20 border border-blue-500 px-5 py-3 rounded-full text-cyan-300 mb-6">
//                     {slide.icon}

//                     <span className="font-semibold">Smart Entry Platform</span>
//                   </div>

//                   <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
//                     {slide.title}
//                   </h1>

//                   <p className="mt-6 text-lg text-gray-300 leading-8">
//                     {slide.subtitle}
//                   </p>

//                   <div className="mt-10 flex gap-5">
//                     <button
//                       onClick={() => {
//                         if (index === 0) navigate("/apartment");
//                         if (index === 1) navigate("/event");
//                         if (index === 2) navigate("/hospital");
//                       }}
//                       className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-xl"
//                     >
//                       {slide.button}
//                     </button>

//                     <button className="border border-white/30 px-8 py-4 rounded-xl text-white hover:bg-white hover:text-[#020b3d] transition">
//                       Learn More
//                     </button>
//                   </div>
//                 </div>

//                 {/* RIGHT */}

//                 <div>
//                   <img
//                     src={slide.image}
//                     alt=""
//                     className="rounded-3xl shadow-2xl h-[520px] w-full object-cover"
//                   />
//                 </div>
//               </div>
//             </section>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

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
    icon: <Building2 size={42} />,
    route: "/apartment",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400",
  },

  {
    title: "Smart Event Entry",
    subtitle:
      "Manage attendees with QR tickets, instant check-in and real-time visitor analytics.",
    button: "Explore Events",
    icon: <CalendarDays size={42} />,
    route: "/event",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400",
  },

  {
    title: "Hospital Visitor System",
    subtitle:
      "Safe visitor verification for hospitals with patient-based approvals and emergency access.",
    button: "Explore Hospitals",
    icon: <Hospital size={42} />,
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
      {/* ================= HERO CAROUSEL ================= */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section className="min-h-[88vh] flex items-center">
              <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
                {/* LEFT */}
                <div>
                  <div className="inline-flex items-center gap-3 bg-blue-600/20 border border-blue-500 px-5 py-3 rounded-full text-cyan-300 mb-6">
                    {slide.icon}
                    <span className="font-semibold">Smart Entry Platform</span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-lg text-gray-300 leading-8">
                    {slide.subtitle}
                  </p>

                  <div className="mt-10 flex gap-5">
                    <button
                      onClick={() => navigate(slide.route)}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-xl"
                    >
                      {slide.button}
                    </button>

                    <button className="border border-white/30 px-8 py-4 rounded-xl">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                <div>
                  <img
                    src={slide.image}
                    className="rounded-3xl shadow-2xl h-[520px] w-full object-cover"
                  />
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= SYSTEM OVERVIEW ================= */}
      <section className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            One Platform — Three Powerful Systems
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Manage apartments, events, and hospitals using a unified smart
            security and authentication system.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-8 bg-slate-50 rounded-3xl">
              <Building2 className="text-blue-600 mx-auto" size={40} />
              <h3 className="text-xl font-bold mt-4">Apartment Security</h3>
              <p className="text-gray-600 mt-2">
                Resident-controlled visitor access system.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl">
              <CalendarDays className="text-purple-600 mx-auto" size={40} />
              <h3 className="text-xl font-bold mt-4">Event Management</h3>
              <p className="text-gray-600 mt-2">
                QR ticketing with fraud detection and analytics.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl">
              <Hospital className="text-cyan-600 mx-auto" size={40} />
              <h3 className="text-xl font-bold mt-4">Hospital Security</h3>
              <p className="text-gray-600 mt-2">
                Patient-based visitor approval system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-slate-100 text-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">
            Core Platform Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {features.map((f, i) => {
              const Icon = f.icon;

              return (
                <div key={i} className="bg-white p-6 rounded-2xl shadow">
                  <Icon className="text-blue-600" />
                  <h3 className="font-bold mt-4">{f.title}</h3>
                  <p className="text-gray-600 mt-2">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-[#020b3d] text-white text-center">
        <h2 className="text-4xl font-bold">Ready to Secure Your World?</h2>

        <p className="text-gray-300 mt-4">
          Start managing access with intelligent security today.
        </p>

        <button className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold">
          Get Started
        </button>
      </section>
    </div>
  );
}