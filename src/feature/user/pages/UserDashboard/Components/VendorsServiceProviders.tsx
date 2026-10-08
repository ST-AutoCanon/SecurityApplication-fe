// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Home,
//   Wrench,
//   ShieldCheck,
//   Wifi,
//   Star,
//   Phone,
//   ChevronRight,
//   ChevronLeft,
//   Store,
//   X,
//   CalendarDays,
//   Sparkles,
//   Car,
//   Truck,
//   Scissors,
//   Stethoscope,
//   ShoppingBag,
//   Utensils,
//   Droplets,
//   Zap,
//   Hammer,
//   Dumbbell,
//   GraduationCap,
//   BriefcaseBusiness,
//   HeartPulse,
//   Paintbrush,
//   Flower2,
//   Bug,
//   KeyRound,
//   Camera,
//   Music,
//   Bike,
//   Settings,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// type Vendor = {
//   id: number;
//   category: string;
//   name: string;
//   description: string | null;
//   services: string | null;

//   // New admin recommendation field
//   recommendation?: string | null;
//   recommendation_by_admin?: string | null;

//   phone: string | null;
//   created_at: string;

//   // Icon selected from admin side
//   icon?: string | null;

//   // Kept optional for compatibility with older API data
//   rating?: number;
//   review_count?: number;
// };

// /* ============================================================
//    ICON OPTIONS

//    IMPORTANT:
//    These keys must match the icon values saved by the admin.
// ============================================================ */

// const ICON_OPTIONS = {
//   wrench: Wrench,
//   sparkles: Sparkles,
//   shield: ShieldCheck,
//   wifi: Wifi,
//   car: Car,
//   truck: Truck,
//   scissors: Scissors,
//   doctor: Stethoscope,
//   shopping: ShoppingBag,
//   food: Utensils,
//   water: Droplets,
//   electric: Zap,
//   hammer: Hammer,
//   home: Home,
//   fitness: Dumbbell,
//   education: GraduationCap,
//   business: BriefcaseBusiness,
//   health: HeartPulse,
//   painting: Paintbrush,
//   gardening: Flower2,
//   pest: Bug,
//   lock: KeyRound,
//   camera: Camera,
//   music: Music,
//   bike: Bike,
//   settings: Settings,
// } as const;

// type IconKey = keyof typeof ICON_OPTIONS;

// /* ============================================================
//    GET ICON COMPONENT
// ============================================================ */

// const getProviderIcon = (
//   iconName?: string | null,
//   size = 21
// ) => {
//   const normalized =
//     iconName?.toLowerCase().trim() || "settings";

//   const IconComponent =
//     ICON_OPTIONS[normalized as IconKey] || Settings;

//   return <IconComponent size={size} />;
// };

// /* ============================================================
//    COMPONENT
// ============================================================ */

// const VendorsServiceProviders = () => {
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Selected provider for popup
//   const [selectedVendor, setSelectedVendor] =
//     useState<Vendor | null>(null);

//   // ============================================================
//   // PAGINATION
//   // ============================================================

//   const [currentPage, setCurrentPage] = useState(1);

//   const ITEMS_PER_PAGE = 4;

//   const totalPages = Math.ceil(
//     vendors.length / ITEMS_PER_PAGE
//   );

//   const startIndex =
//     (currentPage - 1) * ITEMS_PER_PAGE;

//   const currentVendors = vendors.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   // ============================================================
//   // FETCH VENDORS
//   // ============================================================

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `${API}/api/user-dashboard/vendors-service-providers`,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data?.success) {
//         setVendors(response.data.data || []);
//         setCurrentPage(1);
//       }
//     } catch (error) {
//       console.error(
//         "Failed to fetch vendors:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // PAGINATION HANDLERS
//   // ============================================================

//   const goToPreviousPage = () => {
//     setCurrentPage((page) =>
//       Math.max(page - 1, 1)
//     );
//   };

//   const goToNextPage = () => {
//     setCurrentPage((page) =>
//       Math.min(page + 1, totalPages)
//     );
//   };

//   // ============================================================
//   // CLOSE POPUP
//   // ============================================================

//   const closePopup = () => {
//     setSelectedVendor(null);
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//         <div className="flex items-center justify-between mb-5">
//           <div className="h-5 w-56 bg-slate-100 rounded animate-pulse" />

//           <div className="h-4 w-12 bg-slate-100 rounded animate-pulse" />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
//           {[1, 2, 3, 4].map((item) => (
//             <div
//               key={item}
//               className="h-40 bg-slate-100 rounded-xl animate-pulse"
//             />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       {/* ========================================================
//           VENDORS & SERVICE PROVIDERS
//       ======================================================== */}

//       <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-5">
//           <div className="flex items-center gap-2">
//             <Store
//               size={22}
//               className="text-blue-600"
//             />

//             <h2 className="text-lg font-semibold text-slate-900">
//               Vendors & Service Providers
//             </h2>
//           </div>

//           {vendors.length > 0 && (
//             <span className="text-xs font-medium text-slate-400">
//               {vendors.length} providers
//             </span>
//           )}
//         </div>

//         {/* EMPTY */}
//         {vendors.length === 0 && (
//           <div className="py-10 text-center">
//             <Store
//               size={30}
//               className="mx-auto text-slate-300 mb-3"
//             />

//             <p className="text-sm font-medium text-slate-600">
//               No vendors or service providers available
//             </p>

//             <p className="text-xs text-slate-400 mt-1">
//               Your apartment has not added any providers yet.
//             </p>
//           </div>
//         )}

//         {/* ======================================================
//             CARDS
//         ====================================================== */}

//         {vendors.length > 0 && (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
//               {currentVendors.map((vendor) => (
//                 <div
//                   key={vendor.id}
//                   className="rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-blue-200 transition"
//                 >
//                   {/* TOP */}
//                   <div className="flex items-start justify-between">
//                     <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
//                       {getProviderIcon(
//                         vendor.icon,
//                         51
//                       )}
//                     </div>
//                   </div>

//                   {/* CATEGORY */}
//                   <div className="mt-3">
//                     <span className="inline-flex px-2 py-1 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600">
//                       {vendor.category}
//                     </span>
//                   </div>

//                   {/* NAME */}
//                   <h3 className="text-sm font-semibold text-slate-900 mt-2">
//                     {vendor.name}
//                   </h3>

//                   {/* SERVICES */}
//                   {vendor.services && (
//                     <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
//                       {vendor.services}
//                     </p>
//                   )}

//                   {/* ADMIN RECOMMENDATION */}
//                   {(vendor.recommendation ||
//                     vendor.recommendation_by_admin) && (
//                     <div className="flex items-start gap-1.5 mt-2">
//                       <Star
//                         size={13}
//                         className="fill-amber-400 text-amber-400 mt-0.5 flex-shrink-0"
//                       />

//                       <p className="text-[10px] text-slate-500 line-clamp-2">
//                         {vendor.recommendation ||
//                           vendor.recommendation_by_admin}
//                       </p>
//                     </div>
//                   )}

//                   {/* CONTACT BUTTON */}
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setSelectedVendor(vendor)
//                     }
//                     className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition"
//                   >
//                     <Phone size={14} />
//                     Contact
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* ==================================================
//                 PAGINATION
//             ================================================== */}

//             {totalPages > 1 && (
//               <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
//                 {/* PREVIOUS */}
//                 <button
//                   type="button"
//                   onClick={goToPreviousPage}
//                   disabled={currentPage === 1}
//                   className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
//                     currentPage === 1
//                       ? "text-slate-300 cursor-not-allowed"
//                       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//                   }`}
//                 >
//                   <ChevronLeft size={15} />
//                   Previous
//                 </button>

//                 {/* PAGE NUMBERS */}
//                 <div className="flex items-center gap-1.5">
//                   {Array.from(
//                     { length: totalPages },
//                     (_, index) => index + 1
//                   ).map((page) => (
//                     <button
//                       key={page}
//                       type="button"
//                       onClick={() =>
//                         setCurrentPage(page)
//                       }
//                       className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
//                         currentPage === page
//                           ? "bg-blue-600 text-white shadow-sm"
//                           : "text-slate-500 hover:bg-slate-100"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                 </div>

//                 {/* NEXT */}
//                 <button
//                   type="button"
//                   onClick={goToNextPage}
//                   disabled={
//                     currentPage === totalPages
//                   }
//                   className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
//                     currentPage === totalPages
//                       ? "text-slate-300 cursor-not-allowed"
//                       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//                   }`}
//                 >
//                   Next
//                   <ChevronRight size={15} />
//                 </button>
//               </div>
//             )}

//             {/* PAGE INFORMATION */}
//             {totalPages > 1 && (
//               <div className="text-center mt-2">
//                 <span className="text-[10px] text-slate-400">
//                   Showing{" "}
//                   {startIndex + 1}–
//                   {Math.min(
//                     startIndex + ITEMS_PER_PAGE,
//                     vendors.length
//                   )}{" "}
//                   of {vendors.length} providers
//                 </span>
//               </div>
//             )}
//           </>
//         )}
//       </section>

//       {/* ========================================================
//           PROVIDER DETAILS POPUP
//       ======================================================== */}

//       {selectedVendor && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
//           onClick={closePopup}
//         >
//           <div
//             className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >
//             {/* ==================================================
//                 POPUP HEADER
//             ================================================== */}

//             <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
//               <div className="flex items-start gap-3">
//                 <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
//                   {getProviderIcon(
//                     selectedVendor.icon,
//                     23
//                   )}
//                 </div>

//                 <div>
//                   <h2 className="text-lg font-semibold text-slate-900">
//                     {selectedVendor.name}
//                   </h2>

//                   <div className="flex items-center gap-2 mt-1">
//                     <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-600">
//                       {selectedVendor.category}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* CLOSE */}
//               <button
//                 type="button"
//                 onClick={closePopup}
//                 className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* ==================================================
//                 POPUP BODY
//             ================================================== */}

//             <div className="px-6 py-6 space-y-5">
//               {/* DESCRIPTION */}

//               <div>
//                 <h3 className="text-sm font-semibold text-slate-900 mb-2">
//                   About
//                 </h3>

//                 <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
//                   <p className="text-sm text-slate-600 leading-6 whitespace-pre-wrap">
//                     {selectedVendor.description ||
//                       "No description available."}
//                   </p>
//                 </div>
//               </div>

//               {/* SERVICES */}

//               {selectedVendor.services && (
//                 <div>
//                   <h3 className="text-sm font-semibold text-slate-900 mb-2">
//                     Services
//                   </h3>

//                   <div className="rounded-xl border border-slate-200 p-4">
//                     <p className="text-sm text-slate-600 leading-6">
//                       {selectedVendor.services}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* ADMIN RECOMMENDATION */}

//               {(selectedVendor.recommendation ||
//                 selectedVendor.recommendation_by_admin) && (
//                 <div>
//                   <h3 className="text-sm font-semibold text-slate-900 mb-2">
//                     Recommendation by Admin
//                   </h3>

//                   <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-4">
//                     <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center flex-shrink-0">
//                       <Star
//                         size={17}
//                         className="fill-amber-400 text-amber-400"
//                       />
//                     </div>

//                     <p className="text-sm text-slate-600 leading-6">
//                       {selectedVendor.recommendation ||
//                         selectedVendor.recommendation_by_admin}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* ==================================================
//                   CONTACT NUMBER
//               ================================================== */}

//               <div>
//                 <h3 className="text-sm font-semibold text-slate-900 mb-2">
//                   Contact
//                 </h3>

//                 {selectedVendor.phone ? (
//                   <a
//                     href={`tel:${selectedVendor.phone}`}
//                     className="flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 hover:bg-blue-100 transition"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
//                         <Phone size={18} />
//                       </div>

//                       <div>
//                         <p className="text-xs text-slate-500">
//                           Contact Number
//                         </p>

//                         <p className="text-sm font-semibold text-blue-700 mt-0.5">
//                           {selectedVendor.phone}
//                         </p>
//                       </div>
//                     </div>

//                     <Phone
//                       size={18}
//                       className="text-blue-600"
//                     />
//                   </a>
//                 ) : (
//                   <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
//                     <p className="text-sm text-slate-500">
//                       Contact number not available.
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* CREATED DATE */}

//               <div className="flex items-center gap-2 text-xs text-slate-400">
//                 <CalendarDays size={14} />

//                 <span>
//                   Provider information added on{" "}
//                   {new Date(
//                     selectedVendor.created_at
//                   ).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </span>
//               </div>
//             </div>

//             {/* ==================================================
//                 POPUP FOOTER
//             ================================================== */}

//             <div className="flex justify-end px-6 py-4 border-t border-slate-200 bg-slate-50">
//               <button
//                 type="button"
//                 onClick={closePopup}
//                 className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default VendorsServiceProviders;
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Home,
  Wrench,
  ShieldCheck,
  Wifi,
  Star,
  Phone,
  ChevronRight,
  ChevronLeft,
  Store,
  X,
  CalendarDays,
  Sparkles,
  Car,
  Truck,
  Scissors,
  Stethoscope,
  ShoppingBag,
  Utensils,
  Droplets,
  Zap,
  Hammer,
  Dumbbell,
  GraduationCap,
  BriefcaseBusiness,
  HeartPulse,
  Paintbrush,
  Flower2,
  Bug,
  KeyRound,
  Camera,
  Music,
  Bike,
  Settings,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type Vendor = {
  id: number;
  category: string;
  name: string;
  description: string | null;
  services: string | null;

  recommendation?: string | null;
  recommendation_by_admin?: string | null;

  phone: string | null;
  created_at: string;

  icon?: string | null;

  rating?: number;
  review_count?: number;
};

/* ============================================================
   ICON OPTIONS
============================================================ */

const ICON_OPTIONS = {
  wrench: Wrench,
  sparkles: Sparkles,
  shield: ShieldCheck,
  wifi: Wifi,
  car: Car,
  truck: Truck,
  scissors: Scissors,
  doctor: Stethoscope,
  shopping: ShoppingBag,
  food: Utensils,
  water: Droplets,
  electric: Zap,
  hammer: Hammer,
  home: Home,
  fitness: Dumbbell,
  education: GraduationCap,
  business: BriefcaseBusiness,
  health: HeartPulse,
  painting: Paintbrush,
  gardening: Flower2,
  pest: Bug,
  lock: KeyRound,
  camera: Camera,
  music: Music,
  bike: Bike,
  settings: Settings,
} as const;

type IconKey = keyof typeof ICON_OPTIONS;

/* ============================================================
   GET ICON COMPONENT
============================================================ */

const getProviderIcon = (
  iconName?: string | null,
  size = 21
) => {
  const normalized =
    iconName?.toLowerCase().trim() || "settings";

  const IconComponent =
    ICON_OPTIONS[normalized as IconKey] || Settings;

  return <IconComponent size={size} />;
};

/* ============================================================
   COMPONENT
============================================================ */

const VendorsServiceProviders = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedVendor, setSelectedVendor] =
    useState<Vendor | null>(null);

  /* ============================================================
     PAGINATION
  ============================================================ */

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  const totalPages = Math.ceil(
    vendors.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentVendors = vendors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ============================================================
     FETCH VENDORS
  ============================================================ */

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/user-dashboard/vendors-service-providers`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setVendors(response.data.data || []);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error(
        "Failed to fetch vendors:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     PAGINATION HANDLERS
  ============================================================ */

  const goToPreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  /* ============================================================
     CLOSE POPUP
  ============================================================ */

  const closePopup = () => {
    setSelectedVendor(null);
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="h-5 w-56 bg-slate-100 rounded animate-pulse" />

          <div className="h-4 w-12 bg-slate-100 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-40 bg-slate-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ========================================================
          VENDORS & SERVICE PROVIDERS
      ======================================================== */}

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Store
              size={22}
              className="text-blue-600"
            />

            <h2 className="text-lg font-semibold text-slate-900">
              Vendors & Service Providers
            </h2>
          </div>

          {vendors.length > 0 && (
            <span className="text-xs font-medium text-slate-400">
              {vendors.length} providers
            </span>
          )}
        </div>

        {/* EMPTY */}

        {vendors.length === 0 && (
          <div className="py-10 text-center">
            <Store
              size={30}
              className="mx-auto text-slate-300 mb-3"
            />

            <p className="text-sm font-medium text-slate-600">
              No vendors or service providers available
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Your apartment has not added any providers yet.
            </p>
          </div>
        )}

        {/* ======================================================
            CARDS
        ====================================================== */}

        {vendors.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 items-stretch">
              {currentVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="h-full rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-blue-200 transition flex flex-col"
                >
                  {/* ==================================================
                      CARD CONTENT
                  ================================================== */}

                  <div className="flex flex-col flex-1">
                    {/* TOP */}

                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        {getProviderIcon(
                          vendor.icon,
                          21
                        )}
                      </div>
                    </div>

                    {/* CATEGORY */}

                    <div className="mt-3">
                      <span className="inline-flex px-2 py-1 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600">
                        {vendor.category}
                      </span>
                    </div>

                    {/* NAME */}

                    <h3 className="text-sm font-semibold text-slate-900 mt-2 line-clamp-1">
                      {vendor.name}
                    </h3>

                    {/* SERVICES */}

                    <div className="min-h-[32px] mt-1">
                      {vendor.services && (
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {vendor.services}
                        </p>
                      )}
                    </div>

                    {/* ADMIN RECOMMENDATION */}

                    <div className="min-h-[32px] mt-2">
                      {(vendor.recommendation ||
                        vendor.recommendation_by_admin) && (
                        <div className="flex items-start gap-1.5">
                          <Star
                            size={13}
                            className="fill-amber-400 text-amber-400 mt-0.5 flex-shrink-0"
                          />

                          <p className="text-[10px] text-slate-500 line-clamp-2">
                            {vendor.recommendation ||
                              vendor.recommendation_by_admin}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ==================================================
                      CONTACT BUTTON
                      Always aligned at bottom
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedVendor(vendor)
                    }
                    className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition shrink-0"
                  >
                    <Phone size={14} />
                    Contact
                  </button>
                </div>
              ))}
            </div>

            {/* ==================================================
                PAGINATION
            ================================================== */}

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    currentPage === 1
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <ChevronLeft size={15} />
                  Previous
                </button>

                {/* PAGE NUMBERS */}

                <div className="flex items-center gap-1.5">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        setCurrentPage(page)
                      }
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={
                    currentPage === totalPages
                  }
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    currentPage === totalPages
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            )}

            {/* PAGE INFORMATION */}

            {totalPages > 1 && (
              <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400">
                  Showing{" "}
                  {startIndex + 1}–
                  {Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    vendors.length
                  )}{" "}
                  of {vendors.length} providers
                </span>
              </div>
            )}
          </>
        )}
      </section>

      {/* ========================================================
          PROVIDER DETAILS POPUP
      ======================================================== */}

      {selectedVendor && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={closePopup}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* ==================================================
                POPUP HEADER
            ================================================== */}

            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  {getProviderIcon(
                    selectedVendor.icon,
                    23
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {selectedVendor.name}
                  </h2>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                      {selectedVendor.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={closePopup}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* ==================================================
                POPUP BODY
            ================================================== */}

            <div className="px-6 py-6 space-y-5">
              {/* DESCRIPTION */}

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  About
                </h3>

                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-sm text-slate-600 leading-6 whitespace-pre-wrap">
                    {selectedVendor.description ||
                      "No description available."}
                  </p>
                </div>
              </div>

              {/* SERVICES */}

              {selectedVendor.services && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Services
                  </h3>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-sm text-slate-600 leading-6">
                      {selectedVendor.services}
                    </p>
                  </div>
                </div>
              )}

              {/* ADMIN RECOMMENDATION */}

              {(selectedVendor.recommendation ||
                selectedVendor.recommendation_by_admin) && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Recommendation by Admin
                  </h3>

                  <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-4">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center flex-shrink-0">
                      <Star
                        size={17}
                        className="fill-amber-400 text-amber-400"
                      />
                    </div>

                    <p className="text-sm text-slate-600 leading-6">
                      {selectedVendor.recommendation ||
                        selectedVendor.recommendation_by_admin}
                    </p>
                  </div>
                </div>
              )}

              {/* CONTACT NUMBER */}

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Contact
                </h3>

                {selectedVendor.phone ? (
                  <a
                    href={`tel:${selectedVendor.phone}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 hover:bg-blue-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Phone size={18} />
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Contact Number
                        </p>

                        <p className="text-sm font-semibold text-blue-700 mt-0.5">
                          {selectedVendor.phone}
                        </p>
                      </div>
                    </div>

                    <Phone
                      size={18}
                      className="text-blue-600"
                    />
                  </a>
                ) : (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">
                      Contact number not available.
                    </p>
                  </div>
                )}
              </div>

              {/* CREATED DATE */}

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CalendarDays size={14} />

                <span>
                  Provider information added on{" "}
                  {new Date(
                    selectedVendor.created_at
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* ==================================================
                POPUP FOOTER
            ================================================== */}

            <div className="flex justify-end px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={closePopup}
                className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorsServiceProviders;
