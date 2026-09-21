// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Home,
//   Wrench,
//   ShieldCheck,
//   Wifi,
//   ShoppingBag,
//   Star,
//   Phone,
//   ChevronRight,
//   Store,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// type Vendor = {
//   id: number;
//   category: string;
//   name: string;
//   description: string | null;
//   services: string | null;
//   rating: number;
//   review_count: number;
//   phone: string | null;
//   created_at: string;
// };

// const VendorsServiceProviders = () => {
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [loading, setLoading] = useState(true);

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

//   const getCategoryIcon = (category: string) => {
//     const value =
//       category?.toLowerCase() || "";

//     if (
//       value.includes("house") ||
//       value.includes("clean")
//     ) {
//       return <Home size={21} />;
//     }

//     if (
//       value.includes("maintenance") ||
//       value.includes("repair")
//     ) {
//       return <Wrench size={21} />;
//     }

//     if (
//       value.includes("security")
//     ) {
//       return <ShieldCheck size={21} />;
//     }

//     if (
//       value.includes("internet") ||
//       value.includes("tv")
//     ) {
//       return <Wifi size={21} />;
//     }

//     return <Store size={21} />;
//   };

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
//     <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-5">
//         <div className="flex items-center gap-2">
//           <Store
//             size={22}
//             className="text-blue-600"
//           />

//           <h2 className="text-lg font-semibold text-slate-900">
//             Vendors & Service Providers
//           </h2>
//         </div>

//         {vendors.length > 0 && (
//           <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
//             View All
//           </button>
//         )}
//       </div>

//       {/* EMPTY */}
//       {vendors.length === 0 && (
//         <div className="py-10 text-center">
//           <Store
//             size={30}
//             className="mx-auto text-slate-300 mb-3"
//           />

//           <p className="text-sm font-medium text-slate-600">
//             No vendors or service providers available
//           </p>

//           <p className="text-xs text-slate-400 mt-1">
//             Your apartment has not added any providers yet.
//           </p>
//         </div>
//       )}

//       {/* CARDS */}
//       {vendors.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
//           {vendors.map((vendor) => (
//             <div
//               key={vendor.id}
//               className="rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-blue-200 transition"
//             >
//               {/* TOP */}
//               <div className="flex items-start justify-between">
//                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
//                   {getCategoryIcon(
//                     vendor.category
//                   )}
//                 </div>

//                 <ChevronRight
//                   size={17}
//                   className="text-slate-300"
//                 />
//               </div>

//               {/* CATEGORY */}
//               <div className="mt-3">
//                 <span className="inline-flex px-2 py-1 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600">
//                   {vendor.category}
//                 </span>
//               </div>

//               {/* NAME */}
//               <h3 className="text-sm font-semibold text-slate-900 mt-2">
//                 {vendor.name}
//               </h3>

//               {/* SERVICES */}
//               {vendor.services && (
//                 <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
//                   {vendor.services}
//                 </p>
//               )}

//               {/* RATING */}
//               <div className="flex items-center gap-1 mt-2">
//                 <Star
//                   size={13}
//                   className="fill-amber-400 text-amber-400"
//                 />

//                 <span className="text-xs font-semibold text-slate-700">
//                   {Number(vendor.rating).toFixed(1)}
//                 </span>

//                 <span className="text-[10px] text-slate-400">
//                   ({vendor.review_count} reviews)
//                 </span>
//               </div>

//               {/* DESCRIPTION */}
//               {vendor.description && (
//                 <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
//                   {vendor.description}
//                 </p>
//               )}

//               {/* CONTACT */}
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (vendor.phone) {
//                     window.location.href =
//                       `tel:${vendor.phone}`;
//                   }
//                 }}
//                 disabled={!vendor.phone}
//                 className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
//               >
//                 <Phone size={14} />
//                 Contact
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
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
  Store,
  X,
  CalendarDays,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type Vendor = {
  id: number;
  category: string;
  name: string;
  description: string | null;
  services: string | null;
  rating: number;
  review_count: number;
  phone: string | null;
  created_at: string;
};

const VendorsServiceProviders = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected provider for popup
  const [selectedVendor, setSelectedVendor] =
    useState<Vendor | null>(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  // ============================================================
  // FETCH VENDORS
  // ============================================================

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

  // ============================================================
  // CATEGORY ICON
  // ============================================================

  const getCategoryIcon = (category: string) => {
    const value =
      category?.toLowerCase() || "";

    if (
      value.includes("house") ||
      value.includes("clean")
    ) {
      return <Home size={21} />;
    }

    if (
      value.includes("maintenance") ||
      value.includes("repair")
    ) {
      return <Wrench size={21} />;
    }

    if (value.includes("security")) {
      return <ShieldCheck size={21} />;
    }

    if (
      value.includes("internet") ||
      value.includes("tv")
    ) {
      return <Wifi size={21} />;
    }

    return <Store size={21} />;
  };

  // ============================================================
  // CLOSE POPUP
  // ============================================================

  const closePopup = () => {
    setSelectedVendor(null);
  };

  // ============================================================
  // LOADING
  // ============================================================

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
            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              View All
            </button>
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

        {/* CARDS */}
        {vendors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-blue-200 transition"
              >
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {getCategoryIcon(
                      vendor.category
                    )}
                  </div>

                  <ChevronRight
                    size={17}
                    className="text-slate-300"
                  />
                </div>

                {/* CATEGORY */}
                <div className="mt-3">
                  <span className="inline-flex px-2 py-1 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600">
                    {vendor.category}
                  </span>
                </div>

                {/* NAME */}
                <h3 className="text-sm font-semibold text-slate-900 mt-2">
                  {vendor.name}
                </h3>

                {/* SERVICES */}
                {vendor.services && (
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {vendor.services}
                  </p>
                )}

                {/* RATING */}
                <div className="flex items-center gap-1 mt-2">
                  <Star
                    size={13}
                    className="fill-amber-400 text-amber-400"
                  />

                  <span className="text-xs font-semibold text-slate-700">
                    {Number(vendor.rating).toFixed(1)}
                  </span>

                  <span className="text-[10px] text-slate-400">
                    ({vendor.review_count} reviews)
                  </span>
                </div>

                {/* CONTACT BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedVendor(vendor)
                  }
                  className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition"
                >
                  <Phone size={14} />
                  Contact
                </button>
              </div>
            ))}
          </div>
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
                  {getCategoryIcon(
                    selectedVendor.category
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

                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />

                      <span className="text-xs font-medium text-slate-600">
                        {Number(
                          selectedVendor.rating
                        ).toFixed(1)}
                      </span>
                    </div>
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

              {/* RATING */}

              <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-100 p-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Rating
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <Star
                      size={17}
                      className="fill-amber-400 text-amber-400"
                    />

                    <span className="text-base font-semibold text-slate-800">
                      {Number(
                        selectedVendor.rating
                      ).toFixed(1)}
                    </span>

                    <span className="text-xs text-slate-500">
                      ({selectedVendor.review_count} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  CONTACT NUMBER
              ================================================== */}

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