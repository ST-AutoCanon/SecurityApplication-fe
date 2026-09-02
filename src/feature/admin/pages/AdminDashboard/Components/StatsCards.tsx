// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import { Users, UserCheck, Package } from "lucide-react";
// // // // // // // import StatCard from "./StatCard";

// // // // // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // // // // export default function StatsCards() {
// // // // // // //   const [stats, setStats] = useState({
// // // // // // //     total_visitors: 0,
// // // // // // //     inside_visitors: 0,
// // // // // // //     deliveries: 0,
// // // // // // //   });

// // // // // // //   useEffect(() => {
// // // // // // //     loadDashboard();
// // // // // // //   }, []);

// // // // // // //   const loadDashboard = async () => {
// // // // // // //     try {
// // // // // // //       const res = await axios.get(`${API}/api/dashboard`, {
// // // // // // //         withCredentials: true,
// // // // // // //       });

// // // // // // //       const dashboardStats = res.data.data.stats;

// // // // // // //       setStats({
// // // // // // //         total_visitors: Number(dashboardStats.total_visitors),
// // // // // // //         inside_visitors: Number(dashboardStats.inside_visitors),
// // // // // // //         deliveries: Number(dashboardStats.deliveries),
// // // // // // //       });
// // // // // // //     } catch (err) {
// // // // // // //       console.error(err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const cards = [
// // // // // // //     {
// // // // // // //       title: "Visitors Today",
// // // // // // //       value: stats.total_visitors,
// // // // // // //       icon: Users,
// // // // // // //       color: "from-blue-600 to-blue-500",
// // // // // // //       change: "Total Visitors",
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: "Inside Visitors",
// // // // // // //       value: stats.inside_visitors,
// // // // // // //       icon: UserCheck,
// // // // // // //       color: "from-green-600 to-green-500",
// // // // // // //       change: "Currently Inside",
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: "Deliveries",
// // // // // // //       value: stats.deliveries,
// // // // // // //       icon: Package,
// // // // // // //       color: "from-orange-500 to-yellow-500",
// // // // // // //       change: "Delivery Persons",
// // // // // // //     },
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
// // // // // // //       {cards.map((card) => (
// // // // // // //         <StatCard
// // // // // // //           key={card.title}
// // // // // // //           title={card.title}
// // // // // // //           value={card.value}
// // // // // // //           icon={card.icon}
// // // // // // //           color={card.color}
// // // // // // //           change={card.change}
// // // // // // //         />
// // // // // // //       ))}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // import React, { useEffect, useMemo, useState } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import {
// // // // // // //   Users,
// // // // // // //   UserRound,
// // // // // // //   Building2,
// // // // // // //   Sparkles,
// // // // // // //   Package,
// // // // // // //   UserCheck,
// // // // // // //   HardHat,
// // // // // // //   ShieldCheck,
// // // // // // //   BriefcaseBusiness,
// // // // // // //   UsersRound,
// // // // // // // } from "lucide-react";

// // // // // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // // // // type Category = {
// // // // // // //   key: string;
// // // // // // //   label: string;
// // // // // // //   count: number;
// // // // // // // };

// // // // // // // type CategoryCardsResponse = {
// // // // // // //   total: number;
// // // // // // //   categories: Category[];
// // // // // // // };

// // // // // // // type IconComponent = React.ElementType;

// // // // // // // const getCategoryIcon = (key: string): IconComponent => {
// // // // // // //   const normalizedKey = key.toLowerCase();

// // // // // // //   if (normalizedKey === "guest") {
// // // // // // //     return UserRound;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "vendor") {
// // // // // // //     return Building2;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "maid") {
// // // // // // //     return Sparkles;
// // // // // // //   }

// // // // // // //   if (
// // // // // // //     normalizedKey === "delivery_person" ||
// // // // // // //     normalizedKey === "delivery"
// // // // // // //   ) {
// // // // // // //     return Package;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "visitor") {
// // // // // // //     return UserCheck;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "worker") {
// // // // // // //     return HardHat;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "security") {
// // // // // // //     return ShieldCheck;
// // // // // // //   }

// // // // // // //   if (
// // // // // // //     normalizedKey === "organiser" ||
// // // // // // //     normalizedKey === "organizer"
// // // // // // //   ) {
// // // // // // //     return UsersRound;
// // // // // // //   }

// // // // // // //   if (
// // // // // // //     normalizedKey === "service_provider" ||
// // // // // // //     normalizedKey === "service provider"
// // // // // // //   ) {
// // // // // // //     return BriefcaseBusiness;
// // // // // // //   }

// // // // // // //   // Default icon for any NEW category
// // // // // // //   return Users;
// // // // // // // };

// // // // // // // const getCategoryColor = (key: string) => {
// // // // // // //   const normalizedKey = key.toLowerCase();

// // // // // // //   if (normalizedKey === "guest") {
// // // // // // //     return {
// // // // // // //       icon: "bg-blue-100 text-blue-600",
// // // // // // //       number: "text-blue-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "vendor") {
// // // // // // //     return {
// // // // // // //       icon: "bg-purple-100 text-purple-600",
// // // // // // //       number: "text-purple-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "maid") {
// // // // // // //     return {
// // // // // // //       icon: "bg-pink-100 text-pink-600",
// // // // // // //       number: "text-pink-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (
// // // // // // //     normalizedKey === "delivery_person" ||
// // // // // // //     normalizedKey === "delivery"
// // // // // // //   ) {
// // // // // // //     return {
// // // // // // //       icon: "bg-orange-100 text-orange-600",
// // // // // // //       number: "text-orange-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "visitor") {
// // // // // // //     return {
// // // // // // //       icon: "bg-green-100 text-green-600",
// // // // // // //       number: "text-green-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "worker") {
// // // // // // //     return {
// // // // // // //       icon: "bg-yellow-100 text-yellow-700",
// // // // // // //       number: "text-yellow-700",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "security") {
// // // // // // //     return {
// // // // // // //       icon: "bg-red-100 text-red-600",
// // // // // // //       number: "text-red-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   return {
// // // // // // //     icon: "bg-gray-100 text-gray-600",
// // // // // // //     number: "text-gray-700",
// // // // // // //   };
// // // // // // // };

// // // // // // // export default function StatsCards() {
// // // // // // //   const [data, setData] = useState<CategoryCardsResponse>({
// // // // // // //     total: 0,
// // // // // // //     categories: [],
// // // // // // //   });

// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   const fetchCategoryCards = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);

// // // // // // //       const response = await axios.get(
// // // // // // //         `${API}/api/dashboard/category-cards`,
// // // // // // //         {
// // // // // // //           withCredentials: true,
// // // // // // //         }
// // // // // // //       );

// // // // // // //       console.log(
// // // // // // //         "Category Cards API:",
// // // // // // //         response.data
// // // // // // //       );

// // // // // // //       if (response.data?.success) {
// // // // // // //         setData(response.data.data);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error(
// // // // // // //         "Failed to fetch category cards:",
// // // // // // //         error
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchCategoryCards();
// // // // // // //   }, []);

// // // // // // //   /*
// // // // // // //    * Total + dynamically returned categories
// // // // // // //    */
// // // // // // //   const cards = useMemo(() => {
// // // // // // //     return [
// // // // // // //       {
// // // // // // //         key: "total",
// // // // // // //         label: "Total",
// // // // // // //         count: data.total,
// // // // // // //         subtitle: "All Categories",
// // // // // // //         icon: Users,
// // // // // // //         colors: {
// // // // // // //           icon: "bg-indigo-100 text-indigo-600",
// // // // // // //           number: "text-indigo-600",
// // // // // // //         },
// // // // // // //         isTotal: true,
// // // // // // //       },

// // // // // // //       ...data.categories.map((category) => ({
// // // // // // //         key: category.key,
// // // // // // //         label: category.label,
// // // // // // //         count: category.count,
// // // // // // //         subtitle: "Until Date",
// // // // // // //         icon: getCategoryIcon(category.key),
// // // // // // //         colors: getCategoryColor(category.key),
// // // // // // //         isTotal: false,
// // // // // // //       })),
// // // // // // //     ];
// // // // // // //   }, [data]);

// // // // // // //   return (
// // // // // // //     <div className="w-full">
// // // // // // //       <div
// // // // // // //         className="
// // // // // // //           grid
// // // // // // //           grid-cols-1
// // // // // // //           sm:grid-cols-2
// // // // // // //           lg:grid-cols-3
// // // // // // //           xl:grid-cols-4
// // // // // // //           2xl:grid-cols-5
// // // // // // //           gap-5
// // // // // // //         "
// // // // // // //       >
// // // // // // //         {cards.map((card) => {
// // // // // // //           const Icon = card.icon;

// // // // // // //           return (
// // // // // // //             <div
// // // // // // //               key={card.key}
// // // // // // //               className="
// // // // // // //                 bg-white
// // // // // // //                 rounded-2xl
// // // // // // //                 border
// // // // // // //                 border-gray-100
// // // // // // //                 shadow-sm
// // // // // // //                 hover:shadow-md
// // // // // // //                 transition-all
// // // // // // //                 duration-200
// // // // // // //                 p-5
// // // // // // //               "
// // // // // // //             >
// // // // // // //               <div className="flex items-start justify-between">
// // // // // // //                 {/* Text */}
// // // // // // //                 <div>
// // // // // // //                   <p className="text-sm font-medium text-gray-500">
// // // // // // //                     {card.label}
// // // // // // //                   </p>

// // // // // // //                   <h2
// // // // // // //                     className={`
// // // // // // //                       mt-2
// // // // // // //                       text-3xl
// // // // // // //                       font-bold
// // // // // // //                       ${card.colors.number}
// // // // // // //                     `}
// // // // // // //                   >
// // // // // // //                     {loading ? "..." : card.count}
// // // // // // //                   </h2>

// // // // // // //                   <p className="mt-1 text-xs text-gray-400">
// // // // // // //                     {card.subtitle}
// // // // // // //                   </p>
// // // // // // //                 </div>

// // // // // // //                 {/* Icon */}
// // // // // // //                 <div
// // // // // // //                   className={`
// // // // // // //                     w-11
// // // // // // //                     h-11
// // // // // // //                     rounded-xl
// // // // // // //                     flex
// // // // // // //                     items-center
// // // // // // //                     justify-center
// // // // // // //                     ${card.colors.icon}
// // // // // // //                   `}
// // // // // // //                 >
// // // // // // //                   <Icon size={22} strokeWidth={2} />
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           );
// // // // // // //         })}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // import React, { useEffect, useMemo, useState } from "react";
// // // // // // import axios from "axios";

// // // // // // import {
// // // // // //   Users,
// // // // // //   UserRound,
// // // // // //   Building2,
// // // // // //   Sparkles,
// // // // // //   Package,
// // // // // //   UserCheck,
// // // // // //   HardHat,
// // // // // //   ShieldCheck,
// // // // // //   BriefcaseBusiness,
// // // // // //   UsersRound,
// // // // // //   UserCog,
// // // // // //   ContactRound,
// // // // // //   CircleUserRound,
// // // // // //   BadgeCheck,
// // // // // // } from "lucide-react";

// // // // // // const API = import.meta.env.VITE_BACKEND_URL;

   

// // // // // // type Category = {
// // // // // //   key: string;
// // // // // //   label: string;
// // // // // //   count: number;
// // // // // // };

// // // // // // type CategoryCardsResponse = {
// // // // // //   total: number;
// // // // // //   categories: Category[];
// // // // // // };

// // // // // // type CardColor = {
// // // // // //   card: string;
// // // // // //   icon: string;
// // // // // //   number: string;
// // // // // //   label: string;
// // // // // // };

// // // // // // /* =========================================================
// // // // // //    DYNAMIC COLOR PALETTE
// // // // // //    ---------------------------------------------------------
// // // // // //    Colors are assigned according to the category index.
// // // // // //    No category name is hard-coded here.

// // // // // //    If there are more categories than colors,
// // // // // //    the colors automatically repeat.
// // // // // // ========================================================= */

// // // // // // const CARD_COLORS: CardColor[] = [
// // // // // //   {
// // // // // //     card: "bg-blue-50 border-blue-200",
// // // // // //     icon: "bg-blue-100 text-blue-600",
// // // // // //     number: "text-blue-700",
// // // // // //     label: "text-blue-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-purple-50 border-purple-200",
// // // // // //     icon: "bg-purple-100 text-purple-600",
// // // // // //     number: "text-purple-700",
// // // // // //     label: "text-purple-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-pink-50 border-pink-200",
// // // // // //     icon: "bg-pink-100 text-pink-600",
// // // // // //     number: "text-pink-700",
// // // // // //     label: "text-pink-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-orange-50 border-orange-200",
// // // // // //     icon: "bg-orange-100 text-orange-600",
// // // // // //     number: "text-orange-700",
// // // // // //     label: "text-orange-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-green-50 border-green-200",
// // // // // //     icon: "bg-green-100 text-green-600",
// // // // // //     number: "text-green-700",
// // // // // //     label: "text-green-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-yellow-50 border-yellow-200",
// // // // // //     icon: "bg-yellow-100 text-yellow-700",
// // // // // //     number: "text-yellow-700",
// // // // // //     label: "text-yellow-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-red-50 border-red-200",
// // // // // //     icon: "bg-red-100 text-red-600",
// // // // // //     number: "text-red-700",
// // // // // //     label: "text-red-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-cyan-50 border-cyan-200",
// // // // // //     icon: "bg-cyan-100 text-cyan-600",
// // // // // //     number: "text-cyan-700",
// // // // // //     label: "text-cyan-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-teal-50 border-teal-200",
// // // // // //     icon: "bg-teal-100 text-teal-600",
// // // // // //     number: "text-teal-700",
// // // // // //     label: "text-teal-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-violet-50 border-violet-200",
// // // // // //     icon: "bg-violet-100 text-violet-600",
// // // // // //     number: "text-violet-700",
// // // // // //     label: "text-violet-900",
// // // // // //   },
// // // // // // ];

// // // // // // /* =========================================================
// // // // // //    GET COLOR DYNAMICALLY
// // // // // // ========================================================= */

// // // // // // const getDynamicColor = (index: number): CardColor => {
// // // // // //   return CARD_COLORS[index % CARD_COLORS.length];
// // // // // // };

// // // // // // /* =========================================================
// // // // // //    DYNAMIC ICONS
// // // // // //    ---------------------------------------------------------
// // // // // //    Icons are also selected dynamically using the category
// // // // // //    index. Known categories get meaningful icons.
// // // // // //    Unknown/new categories automatically get an icon.
// // // // // // ========================================================= */

// // // // // // const CATEGORY_ICONS = [
// // // // // //   UserRound,
// // // // // //   Building2,
// // // // // //   Sparkles,
// // // // // //   Package,
// // // // // //   UserCheck,
// // // // // //   HardHat,
// // // // // //   ShieldCheck,
// // // // // //   BriefcaseBusiness,
// // // // // //   UsersRound,
// // // // // //   UserCog,
// // // // // //   ContactRound,
// // // // // //   CircleUserRound,
// // // // // //   BadgeCheck,
// // // // // // ];

// // // // // // const getCategoryIcon = (
// // // // // //   key: string,
// // // // // //   index: number
// // // // // // ) => {
// // // // // //   const normalizedKey = key
// // // // // //     .toLowerCase()
// // // // // //     .replace(/[\s-]/g, "_");

// // // // // //   /*
// // // // // //    * Known category icons
// // // // // //    */
// // // // // //   const knownIcons: Record<string, React.ElementType> = {
// // // // // //     guest: UserRound,
// // // // // //     vendor: Building2,
// // // // // //     maid: Sparkles,
// // // // // //     delivery_person: Package,
// // // // // //     delivery: Package,
// // // // // //     visitor: UserCheck,
// // // // // //     worker: HardHat,
// // // // // //     security: ShieldCheck,
// // // // // //     organiser: UsersRound,
// // // // // //     organizer: UsersRound,
// // // // // //     service_provider: BriefcaseBusiness,
// // // // // //   };

// // // // // //   /*
// // // // // //    * If category is known, use its meaningful icon.
// // // // // //    */
// // // // // //   if (knownIcons[normalizedKey]) {
// // // // // //     return knownIcons[normalizedKey];
// // // // // //   }

// // // // // //   /*
// // // // // //    * If a completely new category is added,
// // // // // //    * automatically assign an icon.
// // // // // //    */
// // // // // //   return CATEGORY_ICONS[index % CATEGORY_ICONS.length];
// // // // // // };

// // // // // // /* =========================================================
// // // // // //    COMPONENT
// // // // // // ========================================================= */

// // // // // // export default function StatsCards() {
// // // // // //   const [data, setData] =
// // // // // //     useState<CategoryCardsResponse>({
// // // // // //       total: 0,
// // // // // //       categories: [],
// // // // // //     });

// // // // // //   const [loading, setLoading] =
// // // // // //     useState<boolean>(true);

// // // // // //   const [error, setError] =
// // // // // //     useState<string>("");

// // // // // //   /* =======================================================
// // // // // //      FETCH CATEGORY CARDS
// // // // // //   ======================================================= */

// // // // // //   const fetchCategoryCards = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       setError("");

// // // // // //       const response = await axios.get(
// // // // // //         `${API}/api/dashboard/category-cards`,
// // // // // //         {
// // // // // //           withCredentials: true,
// // // // // //         }
// // // // // //       );

// // // // // //       console.log(
// // // // // //         "Category Cards API Response:",
// // // // // //         response.data
// // // // // //       );

// // // // // //       if (response.data?.success) {
// // // // // //         setData(response.data.data);
// // // // // //       } else {
// // // // // //         setError(
// // // // // //           response.data?.message ||
// // // // // //             "Unable to load dashboard statistics."
// // // // // //         );
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error(
// // // // // //         "Failed to fetch category cards:",
// // // // // //         err
// // // // // //       );

// // // // // //       setError(
// // // // // //         "Unable to load dashboard statistics."
// // // // // //       );
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   /* =======================================================
// // // // // //      LOAD DATA
// // // // // //   ======================================================= */

// // // // // //   useEffect(() => {
// // // // // //     fetchCategoryCards();
// // // // // //   }, []);

// // // // // //   /* =======================================================
// // // // // //      CREATE DYNAMIC CARDS
// // // // // //   ======================================================= */

// // // // // //   const cards = useMemo(() => {
// // // // // //     /*
// // // // // //      * Total card always appears first.
// // // // // //      */
// // // // // //     const totalCard = {
// // // // // //       key: "total",
// // // // // //       label: "Total",
// // // // // //       count: data.total,
// // // // // //       subtitle: "All Categories",
// // // // // //       icon: Users,

// // // // // //       colors: {
// // // // // //         card: "bg-indigo-50 border-indigo-200",
// // // // // //         icon: "bg-indigo-100 text-indigo-600",
// // // // // //         number: "text-indigo-700",
// // // // // //         label: "text-indigo-900",
// // // // // //       },

// // // // // //       isTotal: true,
// // // // // //     };

// // // // // //     /*
// // // // // //      * Create a card for every category returned
// // // // // //      * by the backend.
// // // // // //      */
// // // // // //     const categoryCards =
// // // // // //       data.categories.map(
// // // // // //         (category, index) => ({
// // // // // //           key: category.key,

// // // // // //           label: category.label,

// // // // // //           count: category.count,

// // // // // //           subtitle: "Until Date",

// // // // // //           icon: getCategoryIcon(
// // // // // //             category.key,
// // // // // //             index
// // // // // //           ),

// // // // // //           colors:
// // // // // //             getDynamicColor(index),

// // // // // //           isTotal: false,
// // // // // //         })
// // // // // //       );

// // // // // //     return [
// // // // // //       totalCard,
// // // // // //       ...categoryCards,
// // // // // //     ];
// // // // // //   }, [data]);

// // // // // //   /* =======================================================
// // // // // //      ERROR STATE
// // // // // //   ======================================================= */

// // // // // //   if (error && !loading) {
// // // // // //     return (
// // // // // //       <div className="w-full">
// // // // // //         <div
// // // // // //           className="
// // // // // //             rounded-2xl
// // // // // //             border
// // // // // //             border-red-200
// // // // // //             bg-red-50
// // // // // //             p-5
// // // // // //             text-red-700
// // // // // //           "
// // // // // //         >
// // // // // //           <p className="font-semibold">
// // // // // //             Dashboard statistics unavailable
// // // // // //           </p>

// // // // // //           <p className="mt-1 text-sm">
// // // // // //             {error}
// // // // // //           </p>

// // // // // //           <button
// // // // // //             onClick={fetchCategoryCards}
// // // // // //             className="
// // // // // //               mt-3
// // // // // //               rounded-lg
// // // // // //               bg-red-600
// // // // // //               px-4
// // // // // //               py-2
// // // // // //               text-sm
// // // // // //               font-medium
// // // // // //               text-white
// // // // // //               hover:bg-red-700
// // // // // //               transition
// // // // // //             "
// // // // // //           >
// // // // // //             Retry
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   /* =======================================================
// // // // // //      RENDER
// // // // // //   ======================================================= */

// // // // // //   return (
// // // // // //     <div className="w-full">

// // // // // //       <div
// // // // // //         className="
// // // // // //           grid
// // // // // //           grid-cols-1
// // // // // //           sm:grid-cols-2
// // // // // //           lg:grid-cols-3
// // // // // //           xl:grid-cols-4
// // // // // //           2xl:grid-cols-5
// // // // // //           gap-5
// // // // // //         "
// // // // // //       >

// // // // // //         {cards.map((card) => {
// // // // // //           const Icon = card.icon;

// // // // // //           return (
// // // // // //             <div
// // // // // //               key={card.key}
// // // // // //               className={`
// // // // // //                 rounded-2xl
// // // // // //                 border
// // // // // //                 shadow-sm
// // // // // //                 hover:shadow-lg
// // // // // //                 hover:-translate-y-1
// // // // // //                 transition-all
// // // // // //                 duration-200
// // // // // //                 p-5
// // // // // //                 ${card.colors.card}
// // // // // //               `}
// // // // // //             >

// // // // // //               <div
// // // // // //                 className="
// // // // // //                   flex
// // // // // //                   items-start
// // // // // //                   justify-between
// // // // // //                   gap-4
// // // // // //                 "
// // // // // //               >

// // // // // //                 {/* =========================================
// // // // // //                     LEFT SIDE
// // // // // //                 ========================================== */}

// // // // // //                 <div className="min-w-0">

// // // // // //                   <p
// // // // // //                     className={`
// // // // // //                       text-sm
// // // // // //                       font-semibold
// // // // // //                       truncate
// // // // // //                       ${card.colors.label}
// // // // // //                     `}
// // // // // //                     title={card.label}
// // // // // //                   >
// // // // // //                     {card.label}
// // // // // //                   </p>

// // // // // //                   <h2
// // // // // //                     className={`
// // // // // //                       mt-2
// // // // // //                       text-3xl
// // // // // //                       font-bold
// // // // // //                       tracking-tight
// // // // // //                       ${card.colors.number}
// // // // // //                     `}
// // // // // //                   >
// // // // // //                     {loading
// // // // // //                       ? "..."
// // // // // //                       : card.count.toLocaleString()}
// // // // // //                   </h2>

// // // // // //                   <p
// // // // // //                     className="
// // // // // //                       mt-1
// // // // // //                       text-xs
// // // // // //                       font-medium
// // // // // //                       text-gray-500
// // // // // //                     "
// // // // // //                   >
// // // // // //                     {card.subtitle}
// // // // // //                   </p>

// // // // // //                 </div>

// // // // // //                 {/* =========================================
// // // // // //                     ICON
// // // // // //                 ========================================== */}

// // // // // //                 <div
// // // // // //                   className={`
// // // // // //                     flex
// // // // // //                     h-11
// // // // // //                     w-11
// // // // // //                     shrink-0
// // // // // //                     items-center
// // // // // //                     justify-center
// // // // // //                     rounded-xl
// // // // // //                     ${card.colors.icon}
// // // // // //                   `}
// // // // // //                 >
// // // // // //                   <Icon
// // // // // //                     size={22}
// // // // // //                     strokeWidth={2}
// // // // // //                   />
// // // // // //                 </div>

// // // // // //               </div>

// // // // // //               {/* ===========================================
// // // // // //                   BOTTOM ACCENT
// // // // // //               =========================================== */}

// // // // // //               <div
// // // // // //                 className="
// // // // // //                   mt-4
// // // // // //                   h-1
// // // // // //                   w-full
// // // // // //                   overflow-hidden
// // // // // //                   rounded-full
// // // // // //                   bg-white/70
// // // // // //                 "
// // // // // //               >
// // // // // //                 <div
// // // // // //                   className={`
// // // // // //                     h-full
// // // // // //                     w-1/2
// // // // // //                     rounded-full
// // // // // //                     ${card.colors.icon.split(" ")[0]}
// // // // // //                   `}
// // // // // //                 />
// // // // // //               </div>

// // // // // //             </div>
// // // // // //           );
// // // // // //         })}

// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import React, {
// // // // //   useEffect,
// // // // //   useMemo,
// // // // //   useState,
// // // // // } from "react";

// // // // // import axios from "axios";

// // // // // import {
// // // // //   Users,
// // // // //   UserRound,
// // // // //   Building2,
// // // // //   Sparkles,
// // // // //   Package,
// // // // //   UserCheck,
// // // // //   HardHat,
// // // // //   ShieldCheck,
// // // // //   BriefcaseBusiness,
// // // // //   UsersRound,
// // // // //   UserCog,
// // // // //   ContactRound,
// // // // //   CircleUserRound,
// // // // //   BadgeCheck,
// // // // //   RefreshCw,
// // // // //   Activity,
// // // // // } from "lucide-react";

// // // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // // /* =========================================================
// // // // //    TYPES
// // // // // ========================================================= */

// // // // // type Category = {
// // // // //   key: string;
// // // // //   label: string;
// // // // //   count: number;
// // // // // };

// // // // // type CategoryCardsResponse = {
// // // // //   total: number;
// // // // //   categories: Category[];
// // // // // };

// // // // // type CardTheme = {
// // // // //   border: string;
// // // // //   background: string;
// // // // //   iconBackground: string;
// // // // //   iconColor: string;
// // // // //   numberColor: string;
// // // // //   progress: string;
// // // // // };

// // // // // /* =========================================================
// // // // //    CARD THEMES
// // // // // ========================================================= */

// // // // // const CARD_THEMES: CardTheme[] = [
// // // // //   {
// // // // //     border: "border-blue-500/20",
// // // // //     background: "bg-blue-500/[0.06]",
// // // // //     iconBackground: "bg-blue-500/10",
// // // // //     iconColor: "text-blue-400",
// // // // //     numberColor: "text-blue-400",
// // // // //     progress: "bg-blue-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-purple-500/20",
// // // // //     background: "bg-purple-500/[0.06]",
// // // // //     iconBackground: "bg-purple-500/10",
// // // // //     iconColor: "text-purple-400",
// // // // //     numberColor: "text-purple-400",
// // // // //     progress: "bg-purple-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-pink-500/20",
// // // // //     background: "bg-pink-500/[0.06]",
// // // // //     iconBackground: "bg-pink-500/10",
// // // // //     iconColor: "text-pink-400",
// // // // //     numberColor: "text-pink-400",
// // // // //     progress: "bg-pink-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-orange-500/20",
// // // // //     background: "bg-orange-500/[0.06]",
// // // // //     iconBackground: "bg-orange-500/10",
// // // // //     iconColor: "text-orange-400",
// // // // //     numberColor: "text-orange-400",
// // // // //     progress: "bg-orange-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-green-500/20",
// // // // //     background: "bg-green-500/[0.06]",
// // // // //     iconBackground: "bg-green-500/10",
// // // // //     iconColor: "text-green-400",
// // // // //     numberColor: "text-green-400",
// // // // //     progress: "bg-green-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-yellow-500/20",
// // // // //     background: "bg-yellow-500/[0.06]",
// // // // //     iconBackground: "bg-yellow-500/10",
// // // // //     iconColor: "text-yellow-400",
// // // // //     numberColor: "text-yellow-400",
// // // // //     progress: "bg-yellow-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-red-500/20",
// // // // //     background: "bg-red-500/[0.06]",
// // // // //     iconBackground: "bg-red-500/10",
// // // // //     iconColor: "text-red-400",
// // // // //     numberColor: "text-red-400",
// // // // //     progress: "bg-red-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-cyan-500/20",
// // // // //     background: "bg-cyan-500/[0.06]",
// // // // //     iconBackground: "bg-cyan-500/10",
// // // // //     iconColor: "text-cyan-400",
// // // // //     numberColor: "text-cyan-400",
// // // // //     progress: "bg-cyan-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-teal-500/20",
// // // // //     background: "bg-teal-500/[0.06]",
// // // // //     iconBackground: "bg-teal-500/10",
// // // // //     iconColor: "text-teal-400",
// // // // //     numberColor: "text-teal-400",
// // // // //     progress: "bg-teal-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-violet-500/20",
// // // // //     background: "bg-violet-500/[0.06]",
// // // // //     iconBackground: "bg-violet-500/10",
// // // // //     iconColor: "text-violet-400",
// // // // //     numberColor: "text-violet-400",
// // // // //     progress: "bg-violet-500",
// // // // //   },
// // // // // ];

// // // // // /* =========================================================
// // // // //    ICONS
// // // // // ========================================================= */

// // // // // const CATEGORY_ICONS = [
// // // // //   UserRound,
// // // // //   Building2,
// // // // //   Sparkles,
// // // // //   Package,
// // // // //   UserCheck,
// // // // //   HardHat,
// // // // //   ShieldCheck,
// // // // //   BriefcaseBusiness,
// // // // //   UsersRound,
// // // // //   UserCog,
// // // // //   ContactRound,
// // // // //   CircleUserRound,
// // // // //   BadgeCheck,
// // // // // ];

// // // // // /* =========================================================
// // // // //    GET CATEGORY ICON
// // // // // ========================================================= */

// // // // // const getCategoryIcon = (
// // // // //   key: string,
// // // // //   index: number
// // // // // ) => {
// // // // //   const normalizedKey = key
// // // // //     .toLowerCase()
// // // // //     .replace(/[\s-]/g, "_");

// // // // //   const knownIcons: Record<
// // // // //     string,
// // // // //     React.ElementType
// // // // //   > = {
// // // // //     guest: UserRound,
// // // // //     vendor: Building2,
// // // // //     maid: Sparkles,

// // // // //     delivery_person: Package,
// // // // //     delivery: Package,

// // // // //     visitor: UserCheck,

// // // // //     worker: HardHat,

// // // // //     security: ShieldCheck,

// // // // //     organiser: UsersRound,
// // // // //     organizer: UsersRound,

// // // // //     service_provider:
// // // // //       BriefcaseBusiness,

// // // // //     service_provider_person:
// // // // //       BriefcaseBusiness,
// // // // //   };

// // // // //   if (knownIcons[normalizedKey]) {
// // // // //     return knownIcons[normalizedKey];
// // // // //   }

// // // // //   return CATEGORY_ICONS[
// // // // //     index % CATEGORY_ICONS.length
// // // // //   ];
// // // // // };

// // // // // /* =========================================================
// // // // //    COMPONENT
// // // // // ========================================================= */

// // // // // export default function StatsCards() {
// // // // //   const [data, setData] =
// // // // //     useState<CategoryCardsResponse>({
// // // // //       total: 0,
// // // // //       categories: [],
// // // // //     });

// // // // //   const [loading, setLoading] =
// // // // //     useState(true);

// // // // //   const [error, setError] =
// // // // //     useState("");

// // // // //   /* =======================================================
// // // // //      FETCH DATA
// // // // //   ======================================================= */

// // // // //   const fetchCategoryCards =
// // // // //     async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         setError("");

// // // // //         const response =
// // // // //           await axios.get(
// // // // //             `${API}/api/dashboard/category-cards`,
// // // // //             {
// // // // //               withCredentials: true,
// // // // //             }
// // // // //           );

// // // // //         console.log(
// // // // //           "Category Cards API Response:",
// // // // //           response.data
// // // // //         );

// // // // //         if (response.data?.success) {
// // // // //           setData(
// // // // //             response.data.data
// // // // //           );
// // // // //         } else {
// // // // //           setError(
// // // // //             response.data?.message ||
// // // // //               "Unable to load dashboard statistics."
// // // // //           );
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error(
// // // // //           "Failed to fetch category cards:",
// // // // //           err
// // // // //         );

// // // // //         setError(
// // // // //           "Unable to load dashboard statistics."
// // // // //         );
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //   /* =======================================================
// // // // //      INITIAL LOAD
// // // // //   ======================================================= */

// // // // //   useEffect(() => {
// // // // //     fetchCategoryCards();
// // // // //   }, []);

// // // // //   /* =======================================================
// // // // //      NORMALIZED DATA
// // // // //   ======================================================= */

// // // // //   const categories = useMemo(() => {
// // // // //     return (data.categories || []).map(
// // // // //       (category) => ({
// // // // //         ...category,
// // // // //         count: Number(
// // // // //           category.count || 0
// // // // //         ),
// // // // //       })
// // // // //     );
// // // // //   }, [data.categories]);

// // // // //   const total = Number(
// // // // //     data.total || 0
// // // // //   );

// // // // //   /* =======================================================
// // // // //      ERROR
// // // // //   ======================================================= */

// // // // //   if (error && !loading) {
// // // // //     return (
// // // // //       <div className="w-full">
// // // // //         <div
// // // // //           className="
// // // // //             rounded-xl
// // // // //             border
// // // // //             border-red-500/20
// // // // //             bg-red-500/5
// // // // //             px-5
// // // // //             py-4
// // // // //           "
// // // // //         >
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div>
// // // // //               <p className="text-sm font-semibold text-red-400">
// // // // //                 Dashboard statistics unavailable
// // // // //               </p>

// // // // //               <p className="mt-1 text-xs text-slate-400">
// // // // //                 {error}
// // // // //               </p>
// // // // //             </div>

// // // // //             <button
// // // // //               onClick={fetchCategoryCards}
// // // // //               className="
// // // // //                 flex
// // // // //                 items-center
// // // // //                 gap-2
// // // // //                 rounded-lg
// // // // //                 border
// // // // //                 border-slate-700
// // // // //                 bg-slate-800
// // // // //                 px-3
// // // // //                 py-2
// // // // //                 text-xs
// // // // //                 text-slate-300
// // // // //                 transition
// // // // //                 hover:bg-slate-700
// // // // //               "
// // // // //             >
// // // // //               <RefreshCw size={14} />

// // // // //               Retry
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   /* =======================================================
// // // // //      LOADING SKELETON
// // // // //   ======================================================= */

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="w-full">

// // // // //         <div className="mb-4 flex items-center justify-between">

// // // // //           <div>
// // // // //             <div className="h-5 w-40 rounded bg-slate-800 animate-pulse" />

// // // // //             <div className="mt-2 h-3 w-56 rounded bg-slate-800 animate-pulse" />
// // // // //           </div>

// // // // //         </div>

// // // // //         <div
// // // // //           className="
// // // // //             grid
// // // // //             grid-cols-1
// // // // //             sm:grid-cols-2
// // // // //             lg:grid-cols-3
// // // // //             xl:grid-cols-4
// // // // //             gap-4
// // // // //           "
// // // // //         >
// // // // //           {[1, 2, 3, 4].map(
// // // // //             (item) => (
// // // // //               <div
// // // // //                 key={item}
// // // // //                 className="
// // // // //                   h-[135px]
// // // // //                   rounded-xl
// // // // //                   border
// // // // //                   border-slate-800
// // // // //                   bg-slate-900
// // // // //                   animate-pulse
// // // // //                 "
// // // // //               />
// // // // //             )
// // // // //           )}
// // // // //         </div>

// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   /* =======================================================
// // // // //      RENDER
// // // // //   ======================================================= */

// // // // //   return (
// // // // //     <div className="w-full">

// // // // //       {/* =================================================
// // // // //           SECTION HEADER
// // // // //       ================================================= */}

// // // // //       <div
// // // // //         className="
// // // // //           flex
// // // // //           items-center
// // // // //           justify-between
// // // // //           mb-4
// // // // //         "
// // // // //       >

// // // // //         <div>

// // // // //           <div className="flex items-center gap-2">

// // // // //             <Activity
// // // // //               size={17}
// // // // //               className="text-blue-400"
// // // // //             />

// // // // //             <h2
// // // // //               className="
// // // // //                 text-sm
// // // // //                 font-semibold
// // // // //                 text-white
// // // // //               "
// // // // //             >
// // // // //               Visitor Overview
// // // // //             </h2>

// // // // //           </div>

// // // // //           <p
// // // // //             className="
// // // // //               mt-1
// // // // //               text-xs
// // // // //               text-slate-500
// // // // //             "
// // // // //           >
// // // // //             Current visitor distribution
// // // // //           </p>

// // // // //         </div>

// // // // //         <button
// // // // //           onClick={fetchCategoryCards}
// // // // //           className="
// // // // //             flex
// // // // //             items-center
// // // // //             gap-2
// // // // //             rounded-lg
// // // // //             border
// // // // //             border-slate-800
// // // // //             bg-slate-900
// // // // //             px-3
// // // // //             py-1.5
// // // // //             text-[11px]
// // // // //             text-slate-400
// // // // //             transition
// // // // //             hover:border-slate-700
// // // // //             hover:bg-slate-800
// // // // //             hover:text-white
// // // // //           "
// // // // //           title="Refresh statistics"
// // // // //         >
// // // // //           <RefreshCw size={13} />

// // // // //           Refresh
// // // // //         </button>

// // // // //       </div>

// // // // //       {/* =================================================
// // // // //           CARDS
// // // // //       ================================================= */}

// // // // //       <div
// // // // //         className="
// // // // //           grid
// // // // //           grid-cols-1
// // // // //           sm:grid-cols-2
// // // // //           lg:grid-cols-3
// // // // //           xl:grid-cols-4
// // // // //           gap-4
// // // // //         "
// // // // //       >

// // // // //         {/* =================================================
// // // // //             TOTAL CARD
// // // // //         ================================================= */}

// // // // //         <div
// // // // //           className="
// // // // //             relative
// // // // //             overflow-hidden
// // // // //             rounded-xl
// // // // //             border
// // // // //             border-blue-500/25
// // // // //             bg-gradient-to-br
// // // // //             from-blue-500/[0.10]
// // // // //             to-slate-900
// // // // //             p-4
// // // // //             shadow-lg
// // // // //             shadow-black/10
// // // // //             transition-all
// // // // //             duration-200
// // // // //             hover:-translate-y-0.5
// // // // //             hover:border-blue-400/40
// // // // //           "
// // // // //         >

// // // // //           {/* Decorative glow */}

// // // // //           <div
// // // // //             className="
// // // // //               pointer-events-none
// // // // //               absolute
// // // // //               -right-8
// // // // //               -top-8
// // // // //               h-24
// // // // //               w-24
// // // // //               rounded-full
// // // // //               bg-blue-500/10
// // // // //               blur-2xl
// // // // //             "
// // // // //           />

// // // // //           <div
// // // // //             className="
// // // // //               relative
// // // // //               flex
// // // // //               items-start
// // // // //               justify-between
// // // // //             "
// // // // //           >

// // // // //             <div>

// // // // //               <p
// // // // //                 className="
// // // // //                   text-[11px]
// // // // //                   font-medium
// // // // //                   uppercase
// // // // //                   tracking-wider
// // // // //                   text-slate-400
// // // // //                 "
// // // // //               >
// // // // //                 Total
// // // // //               </p>

// // // // //               <h3
// // // // //                 className="
// // // // //                   mt-2
// // // // //                   text-3xl
// // // // //                   font-bold
// // // // //                   tracking-tight
// // // // //                   text-white
// // // // //                 "
// // // // //               >
// // // // //                 {total.toLocaleString()}
// // // // //               </h3>

// // // // //               <p
// // // // //                 className="
// // // // //                   mt-1
// // // // //                   text-[11px]
// // // // //                   text-slate-500
// // // // //                 "
// // // // //               >
// // // // //                 All Categories
// // // // //               </p>

// // // // //             </div>

// // // // //             <div
// // // // //               className="
// // // // //                 flex
// // // // //                 h-9
// // // // //                 w-9
// // // // //                 items-center
// // // // //                 justify-center
// // // // //                 rounded-lg
// // // // //                 bg-blue-500/10
// // // // //                 text-blue-400
// // // // //               "
// // // // //             >
// // // // //               <Users
// // // // //                 size={18}
// // // // //                 strokeWidth={2}
// // // // //               />
// // // // //             </div>

// // // // //           </div>

// // // // //           {/* Bottom indicator */}

// // // // //           <div
// // // // //             className="
// // // // //               mt-4
// // // // //               h-1
// // // // //               overflow-hidden
// // // // //               rounded-full
// // // // //               bg-slate-800
// // // // //             "
// // // // //           >
// // // // //             <div
// // // // //               className="
// // // // //                 h-full
// // // // //                 w-full
// // // // //                 rounded-full
// // // // //                 bg-blue-500
// // // // //               "
// // // // //             />
// // // // //           </div>

// // // // //         </div>

// // // // //         {/* =================================================
// // // // //             CATEGORY CARDS
// // // // //         ================================================= */}

// // // // //         {categories.map(
// // // // //           (category, index) => {

// // // // //             const Icon =
// // // // //               getCategoryIcon(
// // // // //                 category.key,
// // // // //                 index
// // // // //               );

// // // // //             const theme =
// // // // //               CARD_THEMES[
// // // // //                 index %
// // // // //                   CARD_THEMES.length
// // // // //               ];

// // // // //             const percentage =
// // // // //               total > 0
// // // // //                 ? Math.round(
// // // // //                     (category.count /
// // // // //                       total) *
// // // // //                       100
// // // // //                   )
// // // // //                 : 0;

// // // // //             return (
// // // // //               <div
// // // // //                 key={category.key}
// // // // //                 className={`
// // // // //                   relative
// // // // //                   overflow-hidden
// // // // //                   rounded-xl
// // // // //                   border
// // // // //                   ${theme.border}
// // // // //                   ${theme.background}
// // // // //                   p-4
// // // // //                   shadow-lg
// // // // //                   shadow-black/10
// // // // //                   transition-all
// // // // //                   duration-200
// // // // //                   hover:-translate-y-0.5
// // // // //                   hover:bg-opacity-100
// // // // //                 `}
// // // // //               >

// // // // //                 {/* TOP */}

// // // // //                 <div
// // // // //                   className="
// // // // //                     flex
// // // // //                     items-start
// // // // //                     justify-between
// // // // //                   "
// // // // //                 >

// // // // //                   <div className="min-w-0">

// // // // //                     <p
// // // // //                       className="
// // // // //                         truncate
// // // // //                         text-[11px]
// // // // //                         font-medium
// // // // //                         uppercase
// // // // //                         tracking-wider
// // // // //                         text-slate-400
// // // // //                       "
// // // // //                       title={category.label}
// // // // //                     >
// // // // //                       {category.label}
// // // // //                     </p>

// // // // //                     <h3
// // // // //                       className={`
// // // // //                         mt-2
// // // // //                         text-3xl
// // // // //                         font-bold
// // // // //                         tracking-tight
// // // // //                         ${theme.numberColor}
// // // // //                       `}
// // // // //                     >
// // // // //                       {category.count.toLocaleString()}
// // // // //                     </h3>

// // // // //                   </div>

// // // // //                   <div
// // // // //                     className={`
// // // // //                       flex
// // // // //                       h-9
// // // // //                       w-9
// // // // //                       shrink-0
// // // // //                       items-center
// // // // //                       justify-center
// // // // //                       rounded-lg
// // // // //                       ${theme.iconBackground}
// // // // //                       ${theme.iconColor}
// // // // //                     `}
// // // // //                   >
// // // // //                     <Icon
// // // // //                       size={18}
// // // // //                       strokeWidth={2}
// // // // //                     />
// // // // //                   </div>

// // // // //                 </div>

// // // // //                 {/* BOTTOM TEXT */}

// // // // //                 <div
// // // // //                   className="
// // // // //                     mt-3
// // // // //                     flex
// // // // //                     items-center
// // // // //                     justify-between
// // // // //                   "
// // // // //                 >

// // // // //                   <span
// // // // //                     className="
// // // // //                       text-[10px]
// // // // //                       text-slate-500
// // // // //                     "
// // // // //                   >
// // // // //                     Share of visitors
// // // // //                   </span>

// // // // //                   <span
// // // // //                     className="
// // // // //                       text-[10px]
// // // // //                       font-semibold
// // // // //                       text-slate-400
// // // // //                     "
// // // // //                   >
// // // // //                     {percentage}%
// // // // //                   </span>

// // // // //                 </div>

// // // // //                 {/* PROGRESS */}

// // // // //                 <div
// // // // //                   className="
// // // // //                     mt-2
// // // // //                     h-1
// // // // //                     overflow-hidden
// // // // //                     rounded-full
// // // // //                     bg-slate-800
// // // // //                   "
// // // // //                 >

// // // // //                   <div
// // // // //                     className={`
// // // // //                       h-full
// // // // //                       rounded-full
// // // // //                       transition-all
// // // // //                       duration-500
// // // // //                       ${theme.progress}
// // // // //                     `}
// // // // //                     style={{
// // // // //                       width: `${percentage}%`,
// // // // //                     }}
// // // // //                   />

// // // // //                 </div>

// // // // //               </div>
// // // // //             );
// // // // //           }
// // // // //         )}

// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }.
// // // // import React, {
// // // //   useEffect,
// // // //   useMemo,
// // // //   useState,
// // // // } from "react";

// // // // import axios from "axios";

// // // // import {
// // // //   Users,
// // // //   UserRound,
// // // //   Building2,
// // // //   Sparkles,
// // // //   Package,
// // // //   UserCheck,
// // // //   HardHat,
// // // //   ShieldCheck,
// // // //   BriefcaseBusiness,
// // // //   UsersRound,
// // // //   UserCog,
// // // //   ContactRound,
// // // //   CircleUserRound,
// // // //   BadgeCheck,
// // // //   RefreshCw,
// // // //   Activity,
// // // // } from "lucide-react";

// // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // /* =========================================================
// // // //    TYPES
// // // // ========================================================= */

// // // // type Category = {
// // // //   key: string;
// // // //   label: string;
// // // //   count: number;
// // // // };

// // // // type CategoryCardsResponse = {
// // // //   total: number;
// // // //   categories: Category[];
// // // // };

// // // // type CardTheme = {
// // // //   border: string;
// // // //   background: string;
// // // //   iconBackground: string;
// // // //   iconColor: string;
// // // //   numberColor: string;
// // // //   labelColor: string;
// // // //   progress: string;
// // // // };

// // // // /* =========================================================
// // // //    LIGHT DASHBOARD CARD THEMES
// // // // ========================================================= */

// // // // const CARD_THEMES: CardTheme[] = [

// // // //   /* BLUE */
// // // //   {
// // // //     border: "border-blue-200",
// // // //     background: "bg-blue-50",
// // // //     iconBackground: "bg-blue-100",
// // // //     iconColor: "text-blue-600",
// // // //     numberColor: "text-blue-600",
// // // //     labelColor: "text-blue-900",
// // // //     progress: "bg-blue-500",
// // // //   },

// // // //   /* PURPLE */
// // // //   {
// // // //     border: "border-purple-200",
// // // //     background: "bg-purple-50",
// // // //     iconBackground: "bg-purple-100",
// // // //     iconColor: "text-purple-600",
// // // //     numberColor: "text-purple-600",
// // // //     labelColor: "text-purple-900",
// // // //     progress: "bg-purple-500",
// // // //   },

// // // //   /* PINK */
// // // //   {
// // // //     border: "border-pink-200",
// // // //     background: "bg-pink-50",
// // // //     iconBackground: "bg-pink-100",
// // // //     iconColor: "text-pink-600",
// // // //     numberColor: "text-pink-600",
// // // //     labelColor: "text-pink-900",
// // // //     progress: "bg-pink-500",
// // // //   },

// // // //   /* ORANGE */
// // // //   {
// // // //     border: "border-orange-200",
// // // //     background: "bg-orange-50",
// // // //     iconBackground: "bg-orange-100",
// // // //     iconColor: "text-orange-600",
// // // //     numberColor: "text-orange-600",
// // // //     labelColor: "text-orange-900",
// // // //     progress: "bg-orange-500",
// // // //   },

// // // //   /* GREEN */
// // // //   {
// // // //     border: "border-green-200",
// // // //     background: "bg-green-50",
// // // //     iconBackground: "bg-green-100",
// // // //     iconColor: "text-green-600",
// // // //     numberColor: "text-green-600",
// // // //     labelColor: "text-green-900",
// // // //     progress: "bg-green-500",
// // // //   },

// // // //   /* YELLOW */
// // // //   {
// // // //     border: "border-yellow-200",
// // // //     background: "bg-yellow-50",
// // // //     iconBackground: "bg-yellow-100",
// // // //     iconColor: "text-yellow-700",
// // // //     numberColor: "text-yellow-700",
// // // //     labelColor: "text-yellow-900",
// // // //     progress: "bg-yellow-500",
// // // //   },

// // // //   /* RED */
// // // //   {
// // // //     border: "border-red-200",
// // // //     background: "bg-red-50",
// // // //     iconBackground: "bg-red-100",
// // // //     iconColor: "text-red-600",
// // // //     numberColor: "text-red-600",
// // // //     labelColor: "text-red-900",
// // // //     progress: "bg-red-500",
// // // //   },

// // // //   /* CYAN */
// // // //   {
// // // //     border: "border-cyan-200",
// // // //     background: "bg-cyan-50",
// // // //     iconBackground: "bg-cyan-100",
// // // //     iconColor: "text-cyan-600",
// // // //     numberColor: "text-cyan-600",
// // // //     labelColor: "text-cyan-900",
// // // //     progress: "bg-cyan-500",
// // // //   },

// // // //   /* TEAL */
// // // //   {
// // // //     border: "border-teal-200",
// // // //     background: "bg-teal-50",
// // // //     iconBackground: "bg-teal-100",
// // // //     iconColor: "text-teal-600",
// // // //     numberColor: "text-teal-600",
// // // //     labelColor: "text-teal-900",
// // // //     progress: "bg-teal-500",
// // // //   },

// // // //   /* VIOLET */
// // // //   {
// // // //     border: "border-violet-200",
// // // //     background: "bg-violet-50",
// // // //     iconBackground: "bg-violet-100",
// // // //     iconColor: "text-violet-600",
// // // //     numberColor: "text-violet-600",
// // // //     labelColor: "text-violet-900",
// // // //     progress: "bg-violet-500",
// // // //   },
// // // // ];

// // // // /* =========================================================
// // // //    CATEGORY ICONS
// // // // ========================================================= */

// // // // const CATEGORY_ICONS = [
// // // //   UserRound,
// // // //   Building2,
// // // //   Sparkles,
// // // //   Package,
// // // //   UserCheck,
// // // //   HardHat,
// // // //   ShieldCheck,
// // // //   BriefcaseBusiness,
// // // //   UsersRound,
// // // //   UserCog,
// // // //   ContactRound,
// // // //   CircleUserRound,
// // // //   BadgeCheck,
// // // // ];

// // // // /* =========================================================
// // // //    GET CATEGORY ICON
// // // // ========================================================= */

// // // // const getCategoryIcon = (
// // // //   key: string,
// // // //   index: number
// // // // ) => {

// // // //   const normalizedKey = key
// // // //     .toLowerCase()
// // // //     .replace(/[\s-]/g, "_");

// // // //   const knownIcons: Record<
// // // //     string,
// // // //     React.ElementType
// // // //   > = {

// // // //     guest: UserRound,

// // // //     vendor: Building2,

// // // //     maid: Sparkles,

// // // //     delivery_person: Package,
// // // //     delivery: Package,

// // // //     visitor: UserCheck,

// // // //     worker: HardHat,

// // // //     security: ShieldCheck,

// // // //     organiser: UsersRound,
// // // //     organizer: UsersRound,

// // // //     service_provider:
// // // //       BriefcaseBusiness,

// // // //     service_provider_person:
// // // //       BriefcaseBusiness,
// // // //   };

// // // //   if (knownIcons[normalizedKey]) {
// // // //     return knownIcons[normalizedKey];
// // // //   }

// // // //   return CATEGORY_ICONS[
// // // //     index % CATEGORY_ICONS.length
// // // //   ];
// // // // };

// // // // /* =========================================================
// // // //    COMPONENT
// // // // ========================================================= */

// // // // export default function StatsCards() {

// // // //   const [data, setData] =
// // // //     useState<CategoryCardsResponse>({
// // // //       total: 0,
// // // //       categories: [],
// // // //     });

// // // //   const [loading, setLoading] =
// // // //     useState(true);

// // // //   const [error, setError] =
// // // //     useState("");

// // // //   /* =======================================================
// // // //      FETCH DATA
// // // //   ======================================================= */

// // // //   const fetchCategoryCards =
// // // //     async () => {

// // // //       try {

// // // //         setLoading(true);
// // // //         setError("");

// // // //         const response =
// // // //           await axios.get(
// // // //             `${API}/api/dashboard/category-cards`,
// // // //             {
// // // //               withCredentials: true,
// // // //             }
// // // //           );

// // // //         console.log(
// // // //           "Category Cards API Response:",
// // // //           response.data
// // // //         );

// // // //         if (response.data?.success) {

// // // //           setData(
// // // //             response.data.data
// // // //           );

// // // //         } else {

// // // //           setError(
// // // //             response.data?.message ||
// // // //               "Unable to load dashboard statistics."
// // // //           );
// // // //         }

// // // //       } catch (err) {

// // // //         console.error(
// // // //           "Failed to fetch category cards:",
// // // //           err
// // // //         );

// // // //         setError(
// // // //           "Unable to load dashboard statistics."
// // // //         );

// // // //       } finally {

// // // //         setLoading(false);

// // // //       }
// // // //     };

// // // //   /* =======================================================
// // // //      INITIAL LOAD
// // // //   ======================================================= */

// // // //   useEffect(() => {

// // // //     fetchCategoryCards();

// // // //   }, []);

// // // //   /* =======================================================
// // // //      NORMALIZE DATA
// // // //   ======================================================= */

// // // //   const categories = useMemo(() => {

// // // //     return (data.categories || []).map(
// // // //       (category) => ({
// // // //         ...category,

// // // //         count: Number(
// // // //           category.count || 0
// // // //         ),
// // // //       })
// // // //     );

// // // //   }, [data.categories]);

// // // //   const total = Number(
// // // //     data.total || 0
// // // //   );

// // // //   /* =======================================================
// // // //      ERROR
// // // //   ======================================================= */

// // // //   if (error && !loading) {

// // // //     return (

// // // //       <div className="w-full">

// // // //         <div
// // // //           className="
// // // //             rounded-xl
// // // //             border
// // // //             border-red-200
// // // //             bg-red-50
// // // //             px-5
// // // //             py-4
// // // //           "
// // // //         >

// // // //           <div
// // // //             className="
// // // //               flex
// // // //               items-center
// // // //               justify-between
// // // //               gap-4
// // // //             "
// // // //           >

// // // //             <div>

// // // //               <p
// // // //                 className="
// // // //                   text-sm
// // // //                   font-semibold
// // // //                   text-red-700
// // // //                 "
// // // //               >
// // // //                 Dashboard statistics unavailable
// // // //               </p>

// // // //               <p
// // // //                 className="
// // // //                   mt-1
// // // //                   text-xs
// // // //                   text-red-500
// // // //                 "
// // // //               >
// // // //                 {error}
// // // //               </p>

// // // //             </div>

// // // //             <button
// // // //               onClick={fetchCategoryCards}
// // // //               className="
// // // //                 flex
// // // //                 items-center
// // // //                 gap-2
// // // //                 rounded-lg
// // // //                 border
// // // //                 border-red-200
// // // //                 bg-white
// // // //                 px-3
// // // //                 py-2
// // // //                 text-xs
// // // //                 font-medium
// // // //                 text-red-600
// // // //                 transition
// // // //                 hover:bg-red-50
// // // //               "
// // // //             >

// // // //               <RefreshCw size={14} />

// // // //               Retry

// // // //             </button>

// // // //           </div>

// // // //         </div>

// // // //       </div>
// // // //     );
// // // //   }

// // // //   /* =======================================================
// // // //      LOADING
// // // //   ======================================================= */

// // // //   if (loading) {

// // // //     return (

// // // //       <div className="w-full">

// // // //         <div
// // // //           className="
// // // //             mb-4
// // // //             flex
// // // //             items-center
// // // //             justify-between
// // // //           "
// // // //         >

// // // //           <div>

// // // //             <div
// // // //               className="
// // // //                 h-5
// // // //                 w-40
// // // //                 rounded
// // // //                 bg-gray-200
// // // //                 animate-pulse
// // // //               "
// // // //             />

// // // //             <div
// // // //               className="
// // // //                 mt-2
// // // //                 h-3
// // // //                 w-56
// // // //                 rounded
// // // //                 bg-gray-200
// // // //                 animate-pulse
// // // //               "
// // // //             />

// // // //           </div>

// // // //         </div>

// // // //         <div
// // // //           className="
// // // //             grid
// // // //             grid-cols-1
// // // //             sm:grid-cols-2
// // // //             lg:grid-cols-3
// // // //             xl:grid-cols-4
// // // //             gap-4
// // // //           "
// // // //         >

// // // //           {[1, 2, 3, 4].map(
// // // //             (item) => (

// // // //               <div
// // // //                 key={item}
// // // //                 className="
// // // //                   h-[150px]
// // // //                   rounded-2xl
// // // //                   border
// // // //                   border-gray-200
// // // //                   bg-white
// // // //                   animate-pulse
// // // //                 "
// // // //               />

// // // //             )
// // // //           )}

// // // //         </div>

// // // //       </div>
// // // //     );
// // // //   }

// // // //   /* =======================================================
// // // //      RENDER
// // // //   ======================================================= */

// // // //   return (

// // // //     <div className="w-full">

// // // //       {/* =================================================
// // // //           SECTION HEADER
// // // //       ================================================= */}

// // // //       <div
// // // //         className="
// // // //           mb-5
// // // //           flex
// // // //           items-center
// // // //           justify-between
// // // //         "
// // // //       >

// // // //         <div>

// // // //           <div
// // // //             className="
// // // //               flex
// // // //               items-center
// // // //               gap-2
// // // //             "
// // // //           >

// // // //             <Activity
// // // //               size={18}
// // // //               className="text-blue-500"
// // // //             />

// // // //             <h2
// // // //               className="
// // // //                 text-base
// // // //                 font-semibold
// // // //                 text-gray-800
// // // //               "
// // // //             >
// // // //               Visitor Overview
// // // //             </h2>

// // // //           </div>

// // // //           <p
// // // //             className="
// // // //               mt-1
// // // //               text-xs
// // // //               text-gray-500
// // // //             "
// // // //           >
// // // //             Current visitor distribution
// // // //           </p>

// // // //         </div>

// // // //         <button
// // // //           onClick={fetchCategoryCards}
// // // //           className="
// // // //             flex
// // // //             items-center
// // // //             gap-2
// // // //             rounded-lg
// // // //             border
// // // //             border-gray-200
// // // //             bg-white
// // // //             px-3
// // // //             py-2
// // // //             text-xs
// // // //             font-medium
// // // //             text-gray-600
// // // //             shadow-sm
// // // //             transition
// // // //             hover:bg-gray-50
// // // //             hover:text-gray-900
// // // //           "
// // // //           title="Refresh statistics"
// // // //         >

// // // //           <RefreshCw size={13} />

// // // //           Refresh

// // // //         </button>

// // // //       </div>

// // // //       {/* =================================================
// // // //           CARDS
// // // //       ================================================= */}

// // // //       <div
// // // //         className="
// // // //           grid
// // // //           grid-cols-1
// // // //           sm:grid-cols-2
// // // //           lg:grid-cols-3
// // // //           xl:grid-cols-4
// // // //           gap-5
// // // //         "
// // // //       >

// // // //         {/* =================================================
// // // //             TOTAL CARD
// // // //         ================================================= */}

// // // //         <div
// // // //           className="
// // // //             relative
// // // //             overflow-hidden
// // // //             rounded-2xl
// // // //             border
// // // //             border-blue-200
// // // //             bg-gradient-to-br
// // // //             from-blue-50
// // // //             via-white
// // // //             to-indigo-50
// // // //             p-5
// // // //             shadow-sm
// // // //             transition-all
// // // //             duration-200
// // // //             hover:-translate-y-1
// // // //             hover:shadow-md
// // // //           "
// // // //         >

// // // //           <div
// // // //             className="
// // // //               flex
// // // //               items-start
// // // //               justify-between
// // // //             "
// // // //           >

// // // //             <div>

// // // //               <p
// // // //                 className="
// // // //                   text-xs
// // // //                   font-semibold
// // // //                   uppercase
// // // //                   tracking-wide
// // // //                   text-gray-500
// // // //                 "
// // // //               >
// // // //                 Total
// // // //               </p>

// // // //               <h3
// // // //                 className="
// // // //                   mt-2
// // // //                   text-3xl
// // // //                   font-bold
// // // //                   tracking-tight
// // // //                   text-blue-700
// // // //                 "
// // // //               >
// // // //                 {total.toLocaleString()}
// // // //               </h3>

// // // //               <p
// // // //                 className="
// // // //                   mt-1
// // // //                   text-xs
// // // //                   font-medium
// // // //                   text-gray-500
// // // //                 "
// // // //               >
// // // //                 All Categories
// // // //               </p>

// // // //             </div>

// // // //             <div
// // // //               className="
// // // //                 flex
// // // //                 h-11
// // // //                 w-11
// // // //                 items-center
// // // //                 justify-center
// // // //                 rounded-xl
// // // //                 bg-blue-100
// // // //                 text-blue-600
// // // //               "
// // // //             >

// // // //               <Users
// // // //                 size={21}
// // // //                 strokeWidth={2}
// // // //               />

// // // //             </div>

// // // //           </div>

// // // //           {/* Progress */}

// // // //           <div
// // // //             className="
// // // //               mt-5
// // // //               h-1.5
// // // //               overflow-hidden
// // // //               rounded-full
// // // //               bg-blue-100
// // // //             "
// // // //           >

// // // //             <div
// // // //               className="
// // // //                 h-full
// // // //                 w-full
// // // //                 rounded-full
// // // //                 bg-blue-500
// // // //               "
// // // //             />

// // // //           </div>

// // // //         </div>

// // // //         {/* =================================================
// // // //             CATEGORY CARDS
// // // //         ================================================= */}

// // // //         {categories.map(
// // // //           (category, index) => {

// // // //             const Icon =
// // // //               getCategoryIcon(
// // // //                 category.key,
// // // //                 index
// // // //               );

// // // //             const theme =
// // // //               CARD_THEMES[
// // // //                 index %
// // // //                   CARD_THEMES.length
// // // //               ];

// // // //             const percentage =
// // // //               total > 0
// // // //                 ? Math.round(
// // // //                     (category.count /
// // // //                       total) *
// // // //                       100
// // // //                   )
// // // //                 : 0;

// // // //             return (

// // // //               <div
// // // //                 key={category.key}
// // // //                 className={`
// // // //                   relative
// // // //                   overflow-hidden
// // // //                   rounded-2xl
// // // //                   border
// // // //                   ${theme.border}
// // // //                   ${theme.background}
// // // //                   p-5
// // // //                   shadow-sm
// // // //                   transition-all
// // // //                   duration-200
// // // //                   hover:-translate-y-1
// // // //                   hover:shadow-md
// // // //                 `}
// // // //               >

// // // //                 {/* TOP */}

// // // //                 <div
// // // //                   className="
// // // //                     flex
// // // //                     items-start
// // // //                     justify-between
// // // //                     gap-4
// // // //                   "
// // // //                 >

// // // //                   <div className="min-w-0">

// // // //                     <p
// // // //                       className={`
// // // //                         truncate
// // // //                         text-xs
// // // //                         font-semibold
// // // //                         uppercase
// // // //                         tracking-wide
// // // //                         ${theme.labelColor}
// // // //                       `}
// // // //                       title={category.label}
// // // //                     >
// // // //                       {category.label}
// // // //                     </p>

// // // //                     <h3
// // // //                       className={`
// // // //                         mt-2
// // // //                         text-3xl
// // // //                         font-bold
// // // //                         tracking-tight
// // // //                         ${theme.numberColor}
// // // //                       `}
// // // //                     >
// // // //                       {category.count.toLocaleString()}
// // // //                     </h3>

// // // //                   </div>

// // // //                   {/* ICON */}

// // // //                   <div
// // // //                     className={`
// // // //                       flex
// // // //                       h-11
// // // //                       w-11
// // // //                       shrink-0
// // // //                       items-center
// // // //                       justify-center
// // // //                       rounded-xl
// // // //                       ${theme.iconBackground}
// // // //                       ${theme.iconColor}
// // // //                     `}
// // // //                   >

// // // //                     <Icon
// // // //                       size={21}
// // // //                       strokeWidth={2}
// // // //                     />

// // // //                   </div>

// // // //                 </div>

// // // //                 {/* SHARE */}

// // // //                 <div
// // // //                   className="
// // // //                     mt-4
// // // //                     flex
// // // //                     items-center
// // // //                     justify-between
// // // //                   "
// // // //                 >

// // // //                   <span
// // // //                     className="
// // // //                       text-[11px]
// // // //                       font-medium
// // // //                       text-gray-500
// // // //                     "
// // // //                   >
// // // //                     Share of visitors
// // // //                   </span>

// // // //                   <span
// // // //                     className="
// // // //                       text-[11px]
// // // //                       font-semibold
// // // //                       text-gray-600
// // // //                     "
// // // //                   >
// // // //                     {percentage}%
// // // //                   </span>

// // // //                 </div>

// // // //                 {/* PROGRESS */}

// // // //                 <div
// // // //                   className="
// // // //                     mt-2
// // // //                     h-1.5
// // // //                     overflow-hidden
// // // //                     rounded-full
// // // //                     bg-white/80
// // // //                   "
// // // //                 >

// // // //                   <div
// // // //                     className={`
// // // //                       h-full
// // // //                       rounded-full
// // // //                       transition-all
// // // //                       duration-500
// // // //                       ${theme.progress}
// // // //                     `}
// // // //                     style={{
// // // //                       width: `${percentage}%`,
// // // //                     }}
// // // //                   />

// // // //                 </div>

// // // //               </div>

// // // //             );
// // // //           }
// // // //         )}

// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }
// // // import React, {
// // //   useEffect,
// // //   useMemo,
// // //   useState,
// // // } from "react";

// // // import axios from "axios";

// // // import {
// // //   Users,
// // //   UserRound,
// // //   Building2,
// // //   Sparkles,
// // //   Package,
// // //   UserCheck,
// // //   HardHat,
// // //   ShieldCheck,
// // //   BriefcaseBusiness,
// // //   UsersRound,
// // //   UserCog,
// // //   ContactRound,
// // //   CircleUserRound,
// // //   BadgeCheck,
// // //   RefreshCw,
// // //   Activity,
// // // } from "lucide-react";

// // // const API = import.meta.env.VITE_BACKEND_URL;

// // // /* =========================================================
// // //    TYPES
// // // ========================================================= */

// // // type Period = "daily" | "weekly" | "monthly";

// // // type StatsCardsProps = {
// // //   period: Period;
// // // };

// // // type Category = {
// // //   key: string;
// // //   label: string;
// // //   count: number;
// // // };

// // // type CategoryCardsResponse = {
// // //   total: number;
// // //   categories: Category[];
// // // };

// // // type CardTheme = {
// // //   border: string;
// // //   background: string;
// // //   iconBackground: string;
// // //   iconColor: string;
// // //   numberColor: string;
// // //   labelColor: string;
// // //   progress: string;
// // // };

// // // /* =========================================================
// // //    CARD THEMES
// // // ========================================================= */

// // // const CARD_THEMES: CardTheme[] = [
// // //   {
// // //     border: "border-blue-200",
// // //     background: "bg-blue-50",
// // //     iconBackground: "bg-blue-100",
// // //     iconColor: "text-blue-600",
// // //     numberColor: "text-blue-600",
// // //     labelColor: "text-blue-900",
// // //     progress: "bg-blue-500",
// // //   },

// // //   {
// // //     border: "border-purple-200",
// // //     background: "bg-purple-50",
// // //     iconBackground: "bg-purple-100",
// // //     iconColor: "text-purple-600",
// // //     numberColor: "text-purple-600",
// // //     labelColor: "text-purple-900",
// // //     progress: "bg-purple-500",
// // //   },

// // //   {
// // //     border: "border-pink-200",
// // //     background: "bg-pink-50",
// // //     iconBackground: "bg-pink-100",
// // //     iconColor: "text-pink-600",
// // //     numberColor: "text-pink-600",
// // //     labelColor: "text-pink-900",
// // //     progress: "bg-pink-500",
// // //   },

// // //   {
// // //     border: "border-orange-200",
// // //     background: "bg-orange-50",
// // //     iconBackground: "bg-orange-100",
// // //     iconColor: "text-orange-600",
// // //     numberColor: "text-orange-600",
// // //     labelColor: "text-orange-900",
// // //     progress: "bg-orange-500",
// // //   },

// // //   {
// // //     border: "border-green-200",
// // //     background: "bg-green-50",
// // //     iconBackground: "bg-green-100",
// // //     iconColor: "text-green-600",
// // //     numberColor: "text-green-600",
// // //     labelColor: "text-green-900",
// // //     progress: "bg-green-500",
// // //   },

// // //   {
// // //     border: "border-yellow-200",
// // //     background: "bg-yellow-50",
// // //     iconBackground: "bg-yellow-100",
// // //     iconColor: "text-yellow-700",
// // //     numberColor: "text-yellow-700",
// // //     labelColor: "text-yellow-900",
// // //     progress: "bg-yellow-500",
// // //   },

// // //   {
// // //     border: "border-red-200",
// // //     background: "bg-red-50",
// // //     iconBackground: "bg-red-100",
// // //     iconColor: "text-red-600",
// // //     numberColor: "text-red-600",
// // //     labelColor: "text-red-900",
// // //     progress: "bg-red-500",
// // //   },

// // //   {
// // //     border: "border-cyan-200",
// // //     background: "bg-cyan-50",
// // //     iconBackground: "bg-cyan-100",
// // //     iconColor: "text-cyan-600",
// // //     numberColor: "text-cyan-600",
// // //     labelColor: "text-cyan-900",
// // //     progress: "bg-cyan-500",
// // //   },

// // //   {
// // //     border: "border-teal-200",
// // //     background: "bg-teal-50",
// // //     iconBackground: "bg-teal-100",
// // //     iconColor: "text-teal-600",
// // //     numberColor: "text-teal-600",
// // //     labelColor: "text-teal-900",
// // //     progress: "bg-teal-500",
// // //   },

// // //   {
// // //     border: "border-violet-200",
// // //     background: "bg-violet-50",
// // //     iconBackground: "bg-violet-100",
// // //     iconColor: "text-violet-600",
// // //     numberColor: "text-violet-600",
// // //     labelColor: "text-violet-900",
// // //     progress: "bg-violet-500",
// // //   },
// // // ];

// // // /* =========================================================
// // //    CATEGORY ICONS
// // // ========================================================= */

// // // const CATEGORY_ICONS = [
// // //   UserRound,
// // //   Building2,
// // //   Sparkles,
// // //   Package,
// // //   UserCheck,
// // //   HardHat,
// // //   ShieldCheck,
// // //   BriefcaseBusiness,
// // //   UsersRound,
// // //   UserCog,
// // //   ContactRound,
// // //   CircleUserRound,
// // //   BadgeCheck,
// // // ];

// // // /* =========================================================
// // //    GET CATEGORY ICON
// // // ========================================================= */

// // // const getCategoryIcon = (
// // //   key: string,
// // //   index: number
// // // ) => {
// // //   const normalizedKey = key
// // //     .toLowerCase()
// // //     .replace(/[\s-]/g, "_");

// // //   const knownIcons: Record<
// // //     string,
// // //     React.ElementType
// // //   > = {
// // //     guest: UserRound,

// // //     vendor: Building2,

// // //     maid: Sparkles,

// // //     delivery_person: Package,
// // //     delivery: Package,

// // //     visitor: UserCheck,

// // //     worker: HardHat,

// // //     security: ShieldCheck,

// // //     organiser: UsersRound,
// // //     organizer: UsersRound,

// // //     service_provider: BriefcaseBusiness,
// // //     service_provider_person: BriefcaseBusiness,
// // //   };

// // //   if (knownIcons[normalizedKey]) {
// // //     return knownIcons[normalizedKey];
// // //   }

// // //   return CATEGORY_ICONS[
// // //     index % CATEGORY_ICONS.length
// // //   ];
// // // };

// // // /* =========================================================
// // //    PERIOD LABEL
// // // ========================================================= */

// // // const getPeriodLabel = (period: Period) => {
// // //   switch (period) {
// // //     case "daily":
// // //       return "Today";

// // //     case "weekly":
// // //       return "This Week";

// // //     case "monthly":
// // //       return "This Month";

// // //     default:
// // //       return "Today";
// // //   }
// // // };

// // // /* =========================================================
// // //    COMPONENT
// // // ========================================================= */

// // // export default function StatsCards({
// // //   period,
// // // }: StatsCardsProps) {
// // //   const [data, setData] =
// // //     useState<CategoryCardsResponse>({
// // //       total: 0,
// // //       categories: [],
// // //     });

// // //   const [loading, setLoading] =
// // //     useState(true);

// // //   const [error, setError] =
// // //     useState("");

// // //   /* =======================================================
// // //      PERIOD LABEL
// // //   ======================================================= */

// // //   const periodLabel =
// // //     getPeriodLabel(period);

// // //   /* =======================================================
// // //      FETCH DATA
// // //   ======================================================= */

// // //   const fetchCategoryCards = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError("");

// // //       console.log(
// // //         "Fetching category cards for:",
// // //         period
// // //       );

// // //       const response = await axios.get(
// // //         `${API}/api/dashboard/category-cards`,
// // //         {
// // //           params: {
// // //             period: period,
// // //           },

// // //           withCredentials: true,
// // //         }
// // //       );

// // //       console.log(
// // //         "Category Cards API Response:",
// // //         response.data
// // //       );

// // //       if (response.data?.success) {
// // //         setData(
// // //           response.data.data
// // //         );
// // //       } else {
// // //         setError(
// // //           response.data?.message ||
// // //             "Unable to load dashboard statistics."
// // //         );
// // //       }
// // //     } catch (err) {
// // //       console.error(
// // //         "Failed to fetch category cards:",
// // //         err
// // //       );

// // //       setError(
// // //         "Unable to load dashboard statistics."
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   /* =======================================================
// // //      LOAD DATA

// // //      IMPORTANT:
// // //      Runs again whenever Daily / Weekly / Monthly changes.
// // //   ======================================================= */

// // //   useEffect(() => {
// // //     fetchCategoryCards();
// // //   }, [period]);

// // //   /* =======================================================
// // //      NORMALIZE DATA
// // //   ======================================================= */

// // //   const categories = useMemo(() => {
// // //     return (data.categories || []).map(
// // //       (category) => ({
// // //         ...category,

// // //         count: Number(
// // //           category.count || 0
// // //         ),
// // //       })
// // //     );
// // //   }, [data.categories]);

// // //   const total = Number(
// // //     data.total || 0
// // //   );

// // //   /* =======================================================
// // //      ERROR STATE
// // //   ======================================================= */

// // //   if (error && !loading) {
// // //     return (
// // //       <div className="w-full">
// // //         <div
// // //           className="
// // //             rounded-xl
// // //             border
// // //             border-red-200
// // //             bg-red-50
// // //             px-5
// // //             py-4
// // //           "
// // //         >
// // //           <div
// // //             className="
// // //               flex
// // //               items-center
// // //               justify-between
// // //               gap-4
// // //             "
// // //           >
// // //             <div>
// // //               <p
// // //                 className="
// // //                   text-sm
// // //                   font-semibold
// // //                   text-red-700
// // //                 "
// // //               >
// // //                 Dashboard statistics unavailable
// // //               </p>

// // //               <p
// // //                 className="
// // //                   mt-1
// // //                   text-xs
// // //                   text-red-500
// // //                 "
// // //               >
// // //                 {error}
// // //               </p>
// // //             </div>

// // //             <button
// // //               onClick={fetchCategoryCards}
// // //               className="
// // //                 flex
// // //                 items-center
// // //                 gap-2
// // //                 rounded-lg
// // //                 border
// // //                 border-red-200
// // //                 bg-white
// // //                 px-3
// // //                 py-2
// // //                 text-xs
// // //                 font-medium
// // //                 text-red-600
// // //                 transition
// // //                 hover:bg-red-50
// // //               "
// // //             >
// // //               <RefreshCw size={14} />

// // //               Retry
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   /* =======================================================
// // //      LOADING
// // //   ======================================================= */

// // //   if (loading) {
// // //     return (
// // //       <div className="w-full">
// // //         <div
// // //           className="
// // //             mb-5
// // //             flex
// // //             items-center
// // //             justify-between
// // //           "
// // //         >
// // //           <div>
// // //             <div
// // //               className="
// // //                 h-5
// // //                 w-40
// // //                 rounded
// // //                 bg-gray-200
// // //                 animate-pulse
// // //               "
// // //             />

// // //             <div
// // //               className="
// // //                 mt-2
// // //                 h-3
// // //                 w-56
// // //                 rounded
// // //                 bg-gray-200
// // //                 animate-pulse
// // //               "
// // //             />
// // //           </div>
// // //         </div>

// // //         <div
// // //           className="
// // //             grid
// // //             grid-cols-1
// // //             sm:grid-cols-2
// // //             lg:grid-cols-3
// // //             xl:grid-cols-4
// // //             2xl:grid-cols-5
// // //             gap-5
// // //           "
// // //         >
// // //           {[1, 2, 3, 4, 5].map(
// // //             (item) => (
// // //               <div
// // //                 key={item}
// // //                 className="
// // //                   h-[155px]
// // //                   rounded-2xl
// // //                   border
// // //                   border-gray-200
// // //                   bg-white
// // //                   animate-pulse
// // //                 "
// // //               />
// // //             )
// // //           )}
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   /* =======================================================
// // //      RENDER
// // //   ======================================================= */

// // //   return (
// // //     <div className="w-full">

// // //       {/* =================================================
// // //           SECTION HEADER
// // //       ================================================= */}

// // //       <div
// // //         className="
// // //           mb-5
// // //           flex
// // //           items-center
// // //           justify-between
// // //         "
// // //       >
// // //         <div>
// // //           <div
// // //             className="
// // //               flex
// // //               items-center
// // //               gap-2
// // //             "
// // //           >
// // //             <Activity
// // //               size={18}
// // //               className="text-blue-500"
// // //             />

// // //             <h2
// // //               className="
// // //                 text-base
// // //                 font-semibold
// // //                 text-gray-800
// // //               "
// // //             >
// // //               Visitor Overview
// // //             </h2>
// // //           </div>

// // //           <p
// // //             className="
// // //               mt-1
// // //               text-xs
// // //               text-gray-500
// // //             "
// // //           >
// // //             Visitor statistics for{" "}
// // //             {periodLabel.toLowerCase()}
// // //           </p>
// // //         </div>

// // //         {/* REFRESH */}

// // //         <button
// // //           onClick={fetchCategoryCards}
// // //           className="
// // //             flex
// // //             items-center
// // //             gap-2
// // //             rounded-lg
// // //             border
// // //             border-gray-200
// // //             bg-white
// // //             px-3
// // //             py-2
// // //             text-xs
// // //             font-medium
// // //             text-gray-600
// // //             shadow-sm
// // //             transition
// // //             hover:bg-gray-50
// // //             hover:text-gray-900
// // //           "
// // //           title="Refresh statistics"
// // //         >
// // //           <RefreshCw size={13} />

// // //           Refresh
// // //         </button>
// // //       </div>

// // //       {/* =================================================
// // //           CARDS
// // //       ================================================= */}

// // //       <div
// // //         className="
// // //           grid
// // //           grid-cols-1
// // //           sm:grid-cols-2
// // //           lg:grid-cols-3
// // //           xl:grid-cols-4
// // //           2xl:grid-cols-5
// // //           gap-5
// // //         "
// // //       >

// // //         {/* =================================================
// // //             TOTAL CARD
// // //         ================================================= */}

// // //         <div
// // //           className="
// // //             relative
// // //             overflow-hidden
// // //             rounded-2xl
// // //             border
// // //             border-blue-200
// // //             bg-gradient-to-br
// // //             from-blue-50
// // //             via-white
// // //             to-indigo-50
// // //             p-5
// // //             shadow-sm
// // //             transition-all
// // //             duration-200
// // //             hover:-translate-y-1
// // //             hover:shadow-md
// // //           "
// // //         >
// // //           <div
// // //             className="
// // //               flex
// // //               items-start
// // //               justify-between
// // //             "
// // //           >
// // //             <div>
// // //               <p
// // //                 className="
// // //                   text-xs
// // //                   font-semibold
// // //                   uppercase
// // //                   tracking-wide
// // //                   text-gray-500
// // //                 "
// // //               >
// // //                 Total
// // //               </p>

// // //               <h3
// // //                 className="
// // //                   mt-2
// // //                   text-3xl
// // //                   font-bold
// // //                   tracking-tight
// // //                   text-blue-700
// // //                 "
// // //               >
// // //                 {total.toLocaleString()}
// // //               </h3>

// // //               <p
// // //                 className="
// // //                   mt-1
// // //                   text-xs
// // //                   font-medium
// // //                   text-gray-500
// // //                 "
// // //               >
// // //                 All Categories · {periodLabel}
// // //               </p>
// // //             </div>

// // //             <div
// // //               className="
// // //                 flex
// // //                 h-11
// // //                 w-11
// // //                 items-center
// // //                 justify-center
// // //                 rounded-xl
// // //                 bg-blue-100
// // //                 text-blue-600
// // //               "
// // //             >
// // //               <Users
// // //                 size={21}
// // //                 strokeWidth={2}
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* PROGRESS */}

// // //           <div
// // //             className="
// // //               mt-5
// // //               h-1.5
// // //               overflow-hidden
// // //               rounded-full
// // //               bg-blue-100
// // //             "
// // //           >
// // //             <div
// // //               className="
// // //                 h-full
// // //                 w-full
// // //                 rounded-full
// // //                 bg-blue-500
// // //               "
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* =================================================
// // //             CATEGORY CARDS
// // //         ================================================= */}

// // //         {categories.map(
// // //           (category, index) => {
// // //             const Icon =
// // //               getCategoryIcon(
// // //                 category.key,
// // //                 index
// // //               );

// // //             const theme =
// // //               CARD_THEMES[
// // //                 index %
// // //                   CARD_THEMES.length
// // //               ];

// // //             const percentage =
// // //               total > 0
// // //                 ? Math.round(
// // //                     (category.count /
// // //                       total) *
// // //                       100
// // //                   )
// // //                 : 0;

// // //             return (
// // //               <div
// // //                 key={category.key}
// // //                 className={`
// // //                   relative
// // //                   overflow-hidden
// // //                   rounded-2xl
// // //                   border
// // //                   ${theme.border}
// // //                   ${theme.background}
// // //                   p-5
// // //                   shadow-sm
// // //                   transition-all
// // //                   duration-200
// // //                   hover:-translate-y-1
// // //                   hover:shadow-md
// // //                 `}
// // //               >

// // //                 {/* TOP */}

// // //                 <div
// // //                   className="
// // //                     flex
// // //                     items-start
// // //                     justify-between
// // //                     gap-4
// // //                   "
// // //                 >

// // //                   {/* TEXT */}

// // //                   <div className="min-w-0">

// // //                     <p
// // //                       className={`
// // //                         truncate
// // //                         text-xs
// // //                         font-semibold
// // //                         uppercase
// // //                         tracking-wide
// // //                         ${theme.labelColor}
// // //                       `}
// // //                       title={category.label}
// // //                     >
// // //                       {category.label}
// // //                     </p>

// // //                     <h3
// // //                       className={`
// // //                         mt-2
// // //                         text-3xl
// // //                         font-bold
// // //                         tracking-tight
// // //                         ${theme.numberColor}
// // //                       `}
// // //                     >
// // //                       {category.count.toLocaleString()}
// // //                     </h3>

// // //                     <p
// // //                       className="
// // //                         mt-1
// // //                         text-[11px]
// // //                         font-medium
// // //                         text-gray-500
// // //                       "
// // //                     >
// // //                       {periodLabel}
// // //                     </p>
// // //                   </div>

// // //                   {/* ICON */}

// // //                   <div
// // //                     className={`
// // //                       flex
// // //                       h-11
// // //                       w-11
// // //                       shrink-0
// // //                       items-center
// // //                       justify-center
// // //                       rounded-xl
// // //                       ${theme.iconBackground}
// // //                       ${theme.iconColor}
// // //                     `}
// // //                   >
// // //                     <Icon
// // //                       size={21}
// // //                       strokeWidth={2}
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 {/* SHARE */}

// // //                 <div
// // //                   className="
// // //                     mt-4
// // //                     flex
// // //                     items-center
// // //                     justify-between
// // //                   "
// // //                 >
// // //                   <span
// // //                     className="
// // //                       text-[11px]
// // //                       font-medium
// // //                       text-gray-500
// // //                     "
// // //                   >
// // //                     Share of visitors
// // //                   </span>

// // //                   <span
// // //                     className="
// // //                       text-[11px]
// // //                       font-semibold
// // //                       text-gray-600
// // //                     "
// // //                   >
// // //                     {percentage}%
// // //                   </span>
// // //                 </div>

// // //                 {/* PROGRESS */}

// // //                 <div
// // //                   className="
// // //                     mt-2
// // //                     h-1.5
// // //                     overflow-hidden
// // //                     rounded-full
// // //                     bg-white/80
// // //                   "
// // //                 >
// // //                   <div
// // //                     className={`
// // //                       h-full
// // //                       rounded-full
// // //                       transition-all
// // //                       duration-500
// // //                       ${theme.progress}
// // //                     `}
// // //                     style={{
// // //                       width: `${percentage}%`,
// // //                     }}
// // //                   />
// // //                 </div>

// // //               </div>
// // //             );
// // //           }
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, {
// //   useEffect,
// //   useMemo,
// //   useState,
// // } from "react";

// // import axios from "axios";

// // import {
// //   Users,
// //   UserRound,
// //   Building2,
// //   Sparkles,
// //   Package,
// //   UserCheck,
// //   HardHat,
// //   ShieldCheck,
// //   BriefcaseBusiness,
// //   UsersRound,
// //   RefreshCw,
// // } from "lucide-react";

// // const API = import.meta.env.VITE_BACKEND_URL;

// // type Period = "daily" | "weekly" | "monthly";

// // type StatsCardsProps = {
// //   period: Period;
// // };

// // type Category = {
// //   key: string;
// //   label: string;
// //   count: number;
// // };

// // type CategoryCardsResponse = {
// //   total: number;
// //   categories: Category[];
// // };

// // type StatCard = {
// //   key: string;
// //   label: string;
// //   value: number;
// //   icon: React.ElementType;
// //   iconBg: string;
// //   iconColor: string;
// // };

// // const getCategoryIcon = (
// //   key: string
// // ): React.ElementType => {
// //   const normalizedKey = key
// //     .toLowerCase()
// //     .replace(/[\s-]/g, "_");

// //   const icons: Record<string, React.ElementType> = {
// //     guest: UserRound,
// //     vendor: Building2,
// //     maid: Sparkles,
// //     delivery: Package,
// //     delivery_person: Package,
// //     visitor: UserCheck,
// //     worker: HardHat,
// //     security: ShieldCheck,
// //     organiser: UsersRound,
// //     organizer: UsersRound,
// //     service_provider: BriefcaseBusiness,
// //   };

// //   return icons[normalizedKey] || Users;
// // };

// // const getPeriodText = (period: Period) => {
// //   switch (period) {
// //     case "weekly":
// //       return "vs Last Week";

// //     case "monthly":
// //       return "vs Last Month";

// //     default:
// //       return "vs Yesterday";
// //   }
// // };

// // export default function StatsCards({
// //   period,
// // }: StatsCardsProps) {
// //   const [data, setData] =
// //     useState<CategoryCardsResponse>({
// //       total: 0,
// //       categories: [],
// //     });

// //   const [loading, setLoading] =
// //     useState(true);

// //   const [error, setError] =
// //     useState("");

// //   const fetchCategoryCards = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const response = await axios.get(
// //         `${API}/api/dashboard/category-cards`,
// //         {
// //           params: {
// //             period,
// //           },
// //           withCredentials: true,
// //         }
// //       );

// //       if (response.data?.success) {
// //         setData(response.data.data);
// //       } else {
// //         setError(
// //           response.data?.message ||
// //             "Unable to load dashboard statistics."
// //         );
// //       }
// //     } catch (err) {
// //       console.error(
// //         "Failed to fetch category cards:",
// //         err
// //       );

// //       setError(
// //         "Unable to load dashboard statistics."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategoryCards();
// //   }, [period]);

// //   const categories = useMemo(() => {
// //     return (data.categories || []).map(
// //       (category) => ({
// //         ...category,
// //         count: Number(category.count || 0),
// //       })
// //     );
// //   }, [data.categories]);

// //   /*
// //    * We display the most important categories
// //    * in the same compact style as the reference.
// //    *
// //    * All values still come from your real API.
// //    */

// //   const getCount = (...keys: string[]) => {
// //     const category = categories.find((item) =>
// //       keys.includes(
// //         item.key.toLowerCase().replace(/[\s-]/g, "_")
// //       )
// //     );

// //     return category?.count || 0;
// //   };

// //   const vendorMaid =
// //     getCount("vendor") +
// //     getCount("maid");

// //   const cards: StatCard[] = [
// //     {
// //       key: "guests",
// //       label: "Guests",
// //       value: getCount("guest"),
// //       icon: UserRound,
// //       iconBg: "bg-purple-100",
// //       iconColor: "text-purple-600",
// //     },

// //     {
// //       key: "visitors",
// //       label: "Visitors",
// //       value: getCount("visitor"),
// //       icon: UserCheck,
// //       iconBg: "bg-orange-100",
// //       iconColor: "text-orange-600",
// //     },

// //     {
// //       key: "vendors-maid",
// //       label: "Vendors / Maid",
// //       value: vendorMaid,
// //       icon: Building2,
// //       iconBg: "bg-cyan-100",
// //       iconColor: "text-cyan-600",
// //     },

// //     {
// //       key: "delivery",
// //       label: "Delivery",
// //       value: getCount(
// //         "delivery",
// //         "delivery_person"
// //       ),
// //       icon: Package,
// //       iconBg: "bg-green-100",
// //       iconColor: "text-green-600",
// //     },

// //     {
// //       key: "total",
// //       label: "Total Entries",
// //       value: Number(data.total || 0),
// //       icon: Users,
// //       iconBg: "bg-pink-100",
// //       iconColor: "text-pink-600",
// //     },
// //   ];

// //   if (error && !loading) {
// //     return (
// //       <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
// //         <div className="flex items-center justify-between gap-4">
// //           <div>
// //             <p className="text-sm font-semibold text-red-700">
// //               Dashboard statistics unavailable
// //             </p>

// //             <p className="mt-1 text-xs text-red-500">
// //               {error}
// //             </p>
// //           </div>

// //           <button
// //             onClick={fetchCategoryCards}
// //             className="
// //               flex items-center gap-2
// //               rounded-lg
// //               border border-red-200
// //               bg-white
// //               px-3 py-2
// //               text-xs font-medium
// //               text-red-600
// //               hover:bg-red-50
// //             "
// //           >
// //             <RefreshCw size={14} />
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-full">

// //       {/* Cards */}

// //       <div
// //         className="
// //           grid
// //           grid-cols-1
// //           sm:grid-cols-2
// //           lg:grid-cols-3
// //           xl:grid-cols-5
// //           gap-4
// //         "
// //       >
// //         {cards.map((card) => {
// //           const Icon = card.icon;

// //           return (
// //             <div
// //               key={card.key}
// //               className="
// //                 flex
// //                 min-h-[100px]
// //                 items-center
// //                 gap-3
// //                 rounded-xl
// //                 border
// //                 border-gray-200
// //                 bg-white
// //                 px-3
// //                 py-3
// //                 shadow-sm
// //                 transition-all
// //                 duration-200
// //                 hover:-translate-y-0.5
// //                 hover:shadow-md
// //               "
// //             >
// //               {/* Icon */}

// //               <div
// //                 className={`
// //                   flex
// //                   h-12
// //                   w-12
// //                   shrink-0
// //                   items-center
// //                   justify-center
// //                   rounded-xl
// //                   ${card.iconBg}
// //                   ${card.iconColor}
// //                 `}
// //               >
// //                 <Icon
// //                   size={24}
// //                   strokeWidth={2}
// //                 />
// //               </div>

// //               {/* Content */}

// //               <div className="min-w-0">

// //                 <p
// //                   className="
// //                     truncate
// //                     text-sm
// //                     font-medium
// //                     text-gray-600
// //                   "
// //                   title={card.label}
// //                 >
// //                   {card.label}
// //                 </p>

// //                 <p
// //                   className="
// //                     mt-1
// //                     text-2xl
// //                     font-semibold
// //                     tracking-tight
// //                     text-gray-900
// //                   "
// //                 >
// //                   {loading
// //                     ? "..."
// //                     : card.value.toLocaleString()}
// //                 </p>

// //                 {/* Change */}

// //                 <div className="mt-1 flex items-center gap-1">
// //                   <span className="text-xs font-medium text-green-600">
// //                     ↑
// //                   </span>

// //                   <span className="text-xs font-medium text-green-600">
// //                     Current
// //                   </span>
// //                 </div>

// //                 <p className="text-[11px] text-gray-400">
// //                   {getPeriodText(period)}
// //                 </p>

// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
    
// //   );
// // }
// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import axios from "axios";

// import {
//   Users,
//   UserRound,
//   Building2,
//   Sparkles,
//   Package,
//   UserCheck,
//   HardHat,
//   ShieldCheck,
//   BriefcaseBusiness,
//   UsersRound,
//   RefreshCw,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// type Period = "daily" | "weekly" | "monthly";

// type StatsCardsProps = {
//   period: Period;
// };

// type Category = {
//   key: string;
//   label: string;
//   count: number;
// };

// type CategoryCardsResponse = {
//   total: number;
//   categories: Category[];
// };

// type StatCard = {
//   key: string;
//   label: string;
//   value: number;
//   icon: React.ElementType;
//   iconBg: string;
//   iconColor: string;
// };

// /* =========================================================
//    CATEGORY ICON
// ========================================================= */

// const getCategoryIcon = (
//   key: string
// ): React.ElementType => {
//   const normalizedKey = key
//     .toLowerCase()
//     .replace(/[\s-]/g, "_");

//   const icons: Record<string, React.ElementType> = {
//     guest: UserRound,
//     vendor: Building2,
//     maid: Sparkles,
//     delivery: Package,
//     delivery_person: Package,
//     visitor: UserCheck,
//     worker: HardHat,
//     security: ShieldCheck,
//     organiser: UsersRound,
//     organizer: UsersRound,
//     service_provider: BriefcaseBusiness,
//   };

//   return icons[normalizedKey] || Users;
// };


// const getPeriodText = (period: Period) => {
//   switch (period) {
//     case "weekly":
//       return "vs Last Week";

//     case "monthly":
//       return "vs Last Month";

//     default:
//       return "vs Yesterday";
//   }
// };

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function StatsCards({
//   period,
// }: StatsCardsProps) {
//   const [data, setData] =
//     useState<CategoryCardsResponse>({
//       total: 0,
//       categories: [],
//     });

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

 
//   const fetchCategoryCards = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.get(
//         `${API}/api/admin/dashboard/category-cards`,
//         {
//           params: {
//             period,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.data?.success) {
//         setData(response.data.data);
//       } else {
//         setError(
//           response.data?.message ||
//             "Unable to load dashboard statistics."
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Failed to fetch category cards:",
//         err
//       );

//       setError(
//         "Unable to load dashboard statistics."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      LOAD DATA

//      Runs whenever Daily / Weekly / Monthly changes.
//   ======================================================= */

//   useEffect(() => {
//     fetchCategoryCards();
//   }, [period]);

//   /* =======================================================
//      NORMALIZE DATA
//   ======================================================= */

//   const categories = useMemo(() => {
//     return (data.categories || []).map(
//       (category) => ({
//         ...category,
//         count: Number(
//           category.count || 0
//         ),
//       })
//     );
//   }, [data.categories]);

//   const total = Number(
//     data.total || 0
//   );

//   /* =======================================================
//      GET CATEGORY COUNT
//   ======================================================= */

//   const getCount = (...keys: string[]) => {
//     const category = categories.find(
//       (item) =>
//         keys.includes(
//           item.key
//             .toLowerCase()
//             .replace(/[\s-]/g, "_")
//         )
//     );

//     return category?.count || 0;
//   };

//   /* =======================================================
//      VENDOR + MAID
//   ======================================================= */

//   const vendorMaid =
//     getCount("vendor") +
//     getCount("maid");

//   /* =======================================================
//      CARDS

//      These remain based on the real API data.
//   ======================================================= */

//   const cards: StatCard[] = [
//     {
//       key: "guests",
//       label: "Guests",
//       value: getCount("guest"),
//       icon: UserRound,
//       iconBg: "bg-purple-100",
//       iconColor: "text-purple-600",
//     },

//     {
//       key: "visitors",
//       label: "Visitors",
//       value: getCount("visitor"),
//       icon: UserCheck,
//       iconBg: "bg-orange-100",
//       iconColor: "text-orange-600",
//     },

//     {
//       key: "vendors-maid",
//       label: "Vendors / Maid",
//       value: vendorMaid,
//       icon: Building2,
//       iconBg: "bg-cyan-100",
//       iconColor: "text-cyan-600",
//     },

//     {
//       key: "delivery",
//       label: "Delivery",
//       value: getCount(
//         "delivery",
//         "delivery_person"
//       ),
//       icon: Package,
//       iconBg: "bg-green-100",
//       iconColor: "text-green-600",
//     },

//     {
//       key: "total",
//       label: "Total Entries",
//       value: total,
//       icon: Users,
//       iconBg: "bg-pink-100",
//       iconColor: "text-pink-600",
//     },
//   ];

//   /* =======================================================
//      ERROR STATE
//   ======================================================= */

//   if (error && !loading) {
//     return (
//       <div className="w-full rounded-xl border border-red-200 bg-red-50 px-5 py-4">
//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <p className="text-sm font-semibold text-red-700">
//               Dashboard statistics unavailable
//             </p>

//             <p className="mt-1 text-xs text-red-500">
//               {error}
//             </p>
//           </div>

//           <button
//             onClick={fetchCategoryCards}
//             className="
//               flex
//               items-center
//               gap-2
//               rounded-lg
//               border
//               border-red-200
//               bg-white
//               px-3
//               py-2
//               text-xs
//               font-medium
//               text-red-600
//               transition
//               hover:bg-red-50
//             "
//           >
//             <RefreshCw size={14} />

//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <div className="w-full">

//       {/* =================================================
//           CARDS - HORIZONTAL SCROLL
//       ================================================= */}

//       <div className="w-full overflow-x-auto pb-3">
//         <div className="flex min-w-max gap-4">

//           {cards.map((card) => {
//             const Icon = card.icon;

//             return (
//               <div
//                 key={card.key}
//                 className="
//                   flex
//                   min-h-[100px]
//                   w-[220px]
//                   shrink-0
//                   items-center
//                   gap-3
//                   rounded-xl
//                   border
//                   border-gray-200
//                   bg-white
//                   px-3
//                   py-3
//                   shadow-sm
//                   transition-all
//                   duration-200
//                   hover:-translate-y-0.5
//                   hover:shadow-md
//                 "
//               >

//                 {/* =========================================
//                     ICON
//                 ========================================== */}

//                 <div
//                   className={`
//                     flex
//                     h-12
//                     w-12
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-xl
//                     ${card.iconBg}
//                     ${card.iconColor}
//                   `}
//                 >
//                   <Icon
//                     size={24}
//                     strokeWidth={2}
//                   />
//                 </div>

//                 {/* =========================================
//                     CONTENT
//                 ========================================== */}

//                 <div className="min-w-0">

//                   <p
//                     className="
//                       truncate
//                       text-sm
//                       font-medium
//                       text-gray-600
//                     "
//                     title={card.label}
//                   >
//                     {card.label}
//                   </p>

//                   <p
//                     className="
//                       mt-1
//                       text-2xl
//                       font-semibold
//                       tracking-tight
//                       text-gray-900
//                     "
//                   >
//                     {loading
//                       ? "..."
//                       : card.value.toLocaleString()}
//                   </p>

//                   {/* Change */}

//                   <div className="mt-1 flex items-center gap-1">
//                     <span className="text-xs font-medium text-green-600">
//                       ↑
//                     </span>

//                     <span className="text-xs font-medium text-green-600">
//                       Current
//                     </span>
//                   </div>

//                   <p className="text-[11px] text-gray-400">
//                     {getPeriodText(period)}
//                   </p>

//                 </div>

//               </div>
//             );
//           })}

//         </div>
//       </div>

//     </div>
//   );
// }
// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import { Users, UserCheck, Package } from "lucide-react";
// // // // // // // import StatCard from "./StatCard";

// // // // // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // // // // export default function StatsCards() {
// // // // // // //   const [stats, setStats] = useState({
// // // // // // //     total_visitors: 0,
// // // // // // //     inside_visitors: 0,
// // // // // // //     deliveries: 0,
// // // // // // //   });

// // // // // // //   useEffect(() => {
// // // // // // //     loadDashboard();
// // // // // // //   }, []);

// // // // // // //   const loadDashboard = async () => {
// // // // // // //     try {
// // // // // // //       const res = await axios.get(`${API}/api/dashboard`, {
// // // // // // //         withCredentials: true,
// // // // // // //       });

// // // // // // //       const dashboardStats = res.data.data.stats;

// // // // // // //       setStats({
// // // // // // //         total_visitors: Number(dashboardStats.total_visitors),
// // // // // // //         inside_visitors: Number(dashboardStats.inside_visitors),
// // // // // // //         deliveries: Number(dashboardStats.deliveries),
// // // // // // //       });
// // // // // // //     } catch (err) {
// // // // // // //       console.error(err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const cards = [
// // // // // // //     {
// // // // // // //       title: "Visitors Today",
// // // // // // //       value: stats.total_visitors,
// // // // // // //       icon: Users,
// // // // // // //       color: "from-blue-600 to-blue-500",
// // // // // // //       change: "Total Visitors",
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: "Inside Visitors",
// // // // // // //       value: stats.inside_visitors,
// // // // // // //       icon: UserCheck,
// // // // // // //       color: "from-green-600 to-green-500",
// // // // // // //       change: "Currently Inside",
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: "Deliveries",
// // // // // // //       value: stats.deliveries,
// // // // // // //       icon: Package,
// // // // // // //       color: "from-orange-500 to-yellow-500",
// // // // // // //       change: "Delivery Persons",
// // // // // // //     },
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
// // // // // // //       {cards.map((card) => (
// // // // // // //         <StatCard
// // // // // // //           key={card.title}
// // // // // // //           title={card.title}
// // // // // // //           value={card.value}
// // // // // // //           icon={card.icon}
// // // // // // //           color={card.color}
// // // // // // //           change={card.change}
// // // // // // //         />
// // // // // // //       ))}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // import React, { useEffect, useMemo, useState } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import {
// // // // // // //   Users,
// // // // // // //   UserRound,
// // // // // // //   Building2,
// // // // // // //   Sparkles,
// // // // // // //   Package,
// // // // // // //   UserCheck,
// // // // // // //   HardHat,
// // // // // // //   ShieldCheck,
// // // // // // //   BriefcaseBusiness,
// // // // // // //   UsersRound,
// // // // // // // } from "lucide-react";

// // // // // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // // // // type Category = {
// // // // // // //   key: string;
// // // // // // //   label: string;
// // // // // // //   count: number;
// // // // // // // };

// // // // // // // type CategoryCardsResponse = {
// // // // // // //   total: number;
// // // // // // //   categories: Category[];
// // // // // // // };

// // // // // // // type IconComponent = React.ElementType;

// // // // // // // const getCategoryIcon = (key: string): IconComponent => {
// // // // // // //   const normalizedKey = key.toLowerCase();

// // // // // // //   if (normalizedKey === "guest") {
// // // // // // //     return UserRound;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "vendor") {
// // // // // // //     return Building2;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "maid") {
// // // // // // //     return Sparkles;
// // // // // // //   }

// // // // // // //   if (
// // // // // // //     normalizedKey === "delivery_person" ||
// // // // // // //     normalizedKey === "delivery"
// // // // // // //   ) {
// // // // // // //     return Package;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "visitor") {
// // // // // // //     return UserCheck;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "worker") {
// // // // // // //     return HardHat;
// // // // // // //   }

// // // // // // //   if (normalizedKey === "security") {
// // // // // // //     return ShieldCheck;
// // // // // // //   }

// // // // // // //   if (
// // // // // // //     normalizedKey === "organiser" ||
// // // // // // //     normalizedKey === "organizer"
// // // // // // //   ) {
// // // // // // //     return UsersRound;
// // // // // // //   }

// // // // // // //   if (
// // // // // // //     normalizedKey === "service_provider" ||
// // // // // // //     normalizedKey === "service provider"
// // // // // // //   ) {
// // // // // // //     return BriefcaseBusiness;
// // // // // // //   }

// // // // // // //   // Default icon for any NEW category
// // // // // // //   return Users;
// // // // // // // };

// // // // // // // const getCategoryColor = (key: string) => {
// // // // // // //   const normalizedKey = key.toLowerCase();

// // // // // // //   if (normalizedKey === "guest") {
// // // // // // //     return {
// // // // // // //       icon: "bg-blue-100 text-blue-600",
// // // // // // //       number: "text-blue-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "vendor") {
// // // // // // //     return {
// // // // // // //       icon: "bg-purple-100 text-purple-600",
// // // // // // //       number: "text-purple-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "maid") {
// // // // // // //     return {
// // // // // // //       icon: "bg-pink-100 text-pink-600",
// // // // // // //       number: "text-pink-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (
// // // // // // //     normalizedKey === "delivery_person" ||
// // // // // // //     normalizedKey === "delivery"
// // // // // // //   ) {
// // // // // // //     return {
// // // // // // //       icon: "bg-orange-100 text-orange-600",
// // // // // // //       number: "text-orange-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "visitor") {
// // // // // // //     return {
// // // // // // //       icon: "bg-green-100 text-green-600",
// // // // // // //       number: "text-green-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "worker") {
// // // // // // //     return {
// // // // // // //       icon: "bg-yellow-100 text-yellow-700",
// // // // // // //       number: "text-yellow-700",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   if (normalizedKey === "security") {
// // // // // // //     return {
// // // // // // //       icon: "bg-red-100 text-red-600",
// // // // // // //       number: "text-red-600",
// // // // // // //     };
// // // // // // //   }

// // // // // // //   return {
// // // // // // //     icon: "bg-gray-100 text-gray-600",
// // // // // // //     number: "text-gray-700",
// // // // // // //   };
// // // // // // // };

// // // // // // // export default function StatsCards() {
// // // // // // //   const [data, setData] = useState<CategoryCardsResponse>({
// // // // // // //     total: 0,
// // // // // // //     categories: [],
// // // // // // //   });

// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   const fetchCategoryCards = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);

// // // // // // //       const response = await axios.get(
// // // // // // //         `${API}/api/dashboard/category-cards`,
// // // // // // //         {
// // // // // // //           withCredentials: true,
// // // // // // //         }
// // // // // // //       );

// // // // // // //       console.log(
// // // // // // //         "Category Cards API:",
// // // // // // //         response.data
// // // // // // //       );

// // // // // // //       if (response.data?.success) {
// // // // // // //         setData(response.data.data);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error(
// // // // // // //         "Failed to fetch category cards:",
// // // // // // //         error
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchCategoryCards();
// // // // // // //   }, []);

// // // // // // //   /*
// // // // // // //    * Total + dynamically returned categories
// // // // // // //    */
// // // // // // //   const cards = useMemo(() => {
// // // // // // //     return [
// // // // // // //       {
// // // // // // //         key: "total",
// // // // // // //         label: "Total",
// // // // // // //         count: data.total,
// // // // // // //         subtitle: "All Categories",
// // // // // // //         icon: Users,
// // // // // // //         colors: {
// // // // // // //           icon: "bg-indigo-100 text-indigo-600",
// // // // // // //           number: "text-indigo-600",
// // // // // // //         },
// // // // // // //         isTotal: true,
// // // // // // //       },

// // // // // // //       ...data.categories.map((category) => ({
// // // // // // //         key: category.key,
// // // // // // //         label: category.label,
// // // // // // //         count: category.count,
// // // // // // //         subtitle: "Until Date",
// // // // // // //         icon: getCategoryIcon(category.key),
// // // // // // //         colors: getCategoryColor(category.key),
// // // // // // //         isTotal: false,
// // // // // // //       })),
// // // // // // //     ];
// // // // // // //   }, [data]);

// // // // // // //   return (
// // // // // // //     <div className="w-full">
// // // // // // //       <div
// // // // // // //         className="
// // // // // // //           grid
// // // // // // //           grid-cols-1
// // // // // // //           sm:grid-cols-2
// // // // // // //           lg:grid-cols-3
// // // // // // //           xl:grid-cols-4
// // // // // // //           2xl:grid-cols-5
// // // // // // //           gap-5
// // // // // // //         "
// // // // // // //       >
// // // // // // //         {cards.map((card) => {
// // // // // // //           const Icon = card.icon;

// // // // // // //           return (
// // // // // // //             <div
// // // // // // //               key={card.key}
// // // // // // //               className="
// // // // // // //                 bg-white
// // // // // // //                 rounded-2xl
// // // // // // //                 border
// // // // // // //                 border-gray-100
// // // // // // //                 shadow-sm
// // // // // // //                 hover:shadow-md
// // // // // // //                 transition-all
// // // // // // //                 duration-200
// // // // // // //                 p-5
// // // // // // //               "
// // // // // // //             >
// // // // // // //               <div className="flex items-start justify-between">
// // // // // // //                 {/* Text */}
// // // // // // //                 <div>
// // // // // // //                   <p className="text-sm font-medium text-gray-500">
// // // // // // //                     {card.label}
// // // // // // //                   </p>

// // // // // // //                   <h2
// // // // // // //                     className={`
// // // // // // //                       mt-2
// // // // // // //                       text-3xl
// // // // // // //                       font-bold
// // // // // // //                       ${card.colors.number}
// // // // // // //                     `}
// // // // // // //                   >
// // // // // // //                     {loading ? "..." : card.count}
// // // // // // //                   </h2>

// // // // // // //                   <p className="mt-1 text-xs text-gray-400">
// // // // // // //                     {card.subtitle}
// // // // // // //                   </p>
// // // // // // //                 </div>

// // // // // // //                 {/* Icon */}
// // // // // // //                 <div
// // // // // // //                   className={`
// // // // // // //                     w-11
// // // // // // //                     h-11
// // // // // // //                     rounded-xl
// // // // // // //                     flex
// // // // // // //                     items-center
// // // // // // //                     justify-center
// // // // // // //                     ${card.colors.icon}
// // // // // // //                   `}
// // // // // // //                 >
// // // // // // //                   <Icon size={22} strokeWidth={2} />
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           );
// // // // // // //         })}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // import React, { useEffect, useMemo, useState } from "react";
// // // // // // import axios from "axios";

// // // // // // import {
// // // // // //   Users,
// // // // // //   UserRound,
// // // // // //   Building2,
// // // // // //   Sparkles,
// // // // // //   Package,
// // // // // //   UserCheck,
// // // // // //   HardHat,
// // // // // //   ShieldCheck,
// // // // // //   BriefcaseBusiness,
// // // // // //   UsersRound,
// // // // // //   UserCog,
// // // // // //   ContactRound,
// // // // // //   CircleUserRound,
// // // // // //   BadgeCheck,
// // // // // // } from "lucide-react";

// // // // // // const API = import.meta.env.VITE_BACKEND_URL;

   

// // // // // // type Category = {
// // // // // //   key: string;
// // // // // //   label: string;
// // // // // //   count: number;
// // // // // // };

// // // // // // type CategoryCardsResponse = {
// // // // // //   total: number;
// // // // // //   categories: Category[];
// // // // // // };

// // // // // // type CardColor = {
// // // // // //   card: string;
// // // // // //   icon: string;
// // // // // //   number: string;
// // // // // //   label: string;
// // // // // // };

// // // // // // /* =========================================================
// // // // // //    DYNAMIC COLOR PALETTE
// // // // // //    ---------------------------------------------------------
// // // // // //    Colors are assigned according to the category index.
// // // // // //    No category name is hard-coded here.

// // // // // //    If there are more categories than colors,
// // // // // //    the colors automatically repeat.
// // // // // // ========================================================= */

// // // // // // const CARD_COLORS: CardColor[] = [
// // // // // //   {
// // // // // //     card: "bg-blue-50 border-blue-200",
// // // // // //     icon: "bg-blue-100 text-blue-600",
// // // // // //     number: "text-blue-700",
// // // // // //     label: "text-blue-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-purple-50 border-purple-200",
// // // // // //     icon: "bg-purple-100 text-purple-600",
// // // // // //     number: "text-purple-700",
// // // // // //     label: "text-purple-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-pink-50 border-pink-200",
// // // // // //     icon: "bg-pink-100 text-pink-600",
// // // // // //     number: "text-pink-700",
// // // // // //     label: "text-pink-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-orange-50 border-orange-200",
// // // // // //     icon: "bg-orange-100 text-orange-600",
// // // // // //     number: "text-orange-700",
// // // // // //     label: "text-orange-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-green-50 border-green-200",
// // // // // //     icon: "bg-green-100 text-green-600",
// // // // // //     number: "text-green-700",
// // // // // //     label: "text-green-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-yellow-50 border-yellow-200",
// // // // // //     icon: "bg-yellow-100 text-yellow-700",
// // // // // //     number: "text-yellow-700",
// // // // // //     label: "text-yellow-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-red-50 border-red-200",
// // // // // //     icon: "bg-red-100 text-red-600",
// // // // // //     number: "text-red-700",
// // // // // //     label: "text-red-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-cyan-50 border-cyan-200",
// // // // // //     icon: "bg-cyan-100 text-cyan-600",
// // // // // //     number: "text-cyan-700",
// // // // // //     label: "text-cyan-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-teal-50 border-teal-200",
// // // // // //     icon: "bg-teal-100 text-teal-600",
// // // // // //     number: "text-teal-700",
// // // // // //     label: "text-teal-900",
// // // // // //   },

// // // // // //   {
// // // // // //     card: "bg-violet-50 border-violet-200",
// // // // // //     icon: "bg-violet-100 text-violet-600",
// // // // // //     number: "text-violet-700",
// // // // // //     label: "text-violet-900",
// // // // // //   },
// // // // // // ];

// // // // // // /* =========================================================
// // // // // //    GET COLOR DYNAMICALLY
// // // // // // ========================================================= */

// // // // // // const getDynamicColor = (index: number): CardColor => {
// // // // // //   return CARD_COLORS[index % CARD_COLORS.length];
// // // // // // };

// // // // // // /* =========================================================
// // // // // //    DYNAMIC ICONS
// // // // // //    ---------------------------------------------------------
// // // // // //    Icons are also selected dynamically using the category
// // // // // //    index. Known categories get meaningful icons.
// // // // // //    Unknown/new categories automatically get an icon.
// // // // // // ========================================================= */

// // // // // // const CATEGORY_ICONS = [
// // // // // //   UserRound,
// // // // // //   Building2,
// // // // // //   Sparkles,
// // // // // //   Package,
// // // // // //   UserCheck,
// // // // // //   HardHat,
// // // // // //   ShieldCheck,
// // // // // //   BriefcaseBusiness,
// // // // // //   UsersRound,
// // // // // //   UserCog,
// // // // // //   ContactRound,
// // // // // //   CircleUserRound,
// // // // // //   BadgeCheck,
// // // // // // ];

// // // // // // const getCategoryIcon = (
// // // // // //   key: string,
// // // // // //   index: number
// // // // // // ) => {
// // // // // //   const normalizedKey = key
// // // // // //     .toLowerCase()
// // // // // //     .replace(/[\s-]/g, "_");

// // // // // //   /*
// // // // // //    * Known category icons
// // // // // //    */
// // // // // //   const knownIcons: Record<string, React.ElementType> = {
// // // // // //     guest: UserRound,
// // // // // //     vendor: Building2,
// // // // // //     maid: Sparkles,
// // // // // //     delivery_person: Package,
// // // // // //     delivery: Package,
// // // // // //     visitor: UserCheck,
// // // // // //     worker: HardHat,
// // // // // //     security: ShieldCheck,
// // // // // //     organiser: UsersRound,
// // // // // //     organizer: UsersRound,
// // // // // //     service_provider: BriefcaseBusiness,
// // // // // //   };

// // // // // //   /*
// // // // // //    * If category is known, use its meaningful icon.
// // // // // //    */
// // // // // //   if (knownIcons[normalizedKey]) {
// // // // // //     return knownIcons[normalizedKey];
// // // // // //   }

// // // // // //   /*
// // // // // //    * If a completely new category is added,
// // // // // //    * automatically assign an icon.
// // // // // //    */
// // // // // //   return CATEGORY_ICONS[index % CATEGORY_ICONS.length];
// // // // // // };

// // // // // // /* =========================================================
// // // // // //    COMPONENT
// // // // // // ========================================================= */

// // // // // // export default function StatsCards() {
// // // // // //   const [data, setData] =
// // // // // //     useState<CategoryCardsResponse>({
// // // // // //       total: 0,
// // // // // //       categories: [],
// // // // // //     });

// // // // // //   const [loading, setLoading] =
// // // // // //     useState<boolean>(true);

// // // // // //   const [error, setError] =
// // // // // //     useState<string>("");

// // // // // //   /* =======================================================
// // // // // //      FETCH CATEGORY CARDS
// // // // // //   ======================================================= */

// // // // // //   const fetchCategoryCards = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       setError("");

// // // // // //       const response = await axios.get(
// // // // // //         `${API}/api/dashboard/category-cards`,
// // // // // //         {
// // // // // //           withCredentials: true,
// // // // // //         }
// // // // // //       );

// // // // // //       console.log(
// // // // // //         "Category Cards API Response:",
// // // // // //         response.data
// // // // // //       );

// // // // // //       if (response.data?.success) {
// // // // // //         setData(response.data.data);
// // // // // //       } else {
// // // // // //         setError(
// // // // // //           response.data?.message ||
// // // // // //             "Unable to load dashboard statistics."
// // // // // //         );
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error(
// // // // // //         "Failed to fetch category cards:",
// // // // // //         err
// // // // // //       );

// // // // // //       setError(
// // // // // //         "Unable to load dashboard statistics."
// // // // // //       );
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   /* =======================================================
// // // // // //      LOAD DATA
// // // // // //   ======================================================= */

// // // // // //   useEffect(() => {
// // // // // //     fetchCategoryCards();
// // // // // //   }, []);

// // // // // //   /* =======================================================
// // // // // //      CREATE DYNAMIC CARDS
// // // // // //   ======================================================= */

// // // // // //   const cards = useMemo(() => {
// // // // // //     /*
// // // // // //      * Total card always appears first.
// // // // // //      */
// // // // // //     const totalCard = {
// // // // // //       key: "total",
// // // // // //       label: "Total",
// // // // // //       count: data.total,
// // // // // //       subtitle: "All Categories",
// // // // // //       icon: Users,

// // // // // //       colors: {
// // // // // //         card: "bg-indigo-50 border-indigo-200",
// // // // // //         icon: "bg-indigo-100 text-indigo-600",
// // // // // //         number: "text-indigo-700",
// // // // // //         label: "text-indigo-900",
// // // // // //       },

// // // // // //       isTotal: true,
// // // // // //     };

// // // // // //     /*
// // // // // //      * Create a card for every category returned
// // // // // //      * by the backend.
// // // // // //      */
// // // // // //     const categoryCards =
// // // // // //       data.categories.map(
// // // // // //         (category, index) => ({
// // // // // //           key: category.key,

// // // // // //           label: category.label,

// // // // // //           count: category.count,

// // // // // //           subtitle: "Until Date",

// // // // // //           icon: getCategoryIcon(
// // // // // //             category.key,
// // // // // //             index
// // // // // //           ),

// // // // // //           colors:
// // // // // //             getDynamicColor(index),

// // // // // //           isTotal: false,
// // // // // //         })
// // // // // //       );

// // // // // //     return [
// // // // // //       totalCard,
// // // // // //       ...categoryCards,
// // // // // //     ];
// // // // // //   }, [data]);

// // // // // //   /* =======================================================
// // // // // //      ERROR STATE
// // // // // //   ======================================================= */

// // // // // //   if (error && !loading) {
// // // // // //     return (
// // // // // //       <div className="w-full">
// // // // // //         <div
// // // // // //           className="
// // // // // //             rounded-2xl
// // // // // //             border
// // // // // //             border-red-200
// // // // // //             bg-red-50
// // // // // //             p-5
// // // // // //             text-red-700
// // // // // //           "
// // // // // //         >
// // // // // //           <p className="font-semibold">
// // // // // //             Dashboard statistics unavailable
// // // // // //           </p>

// // // // // //           <p className="mt-1 text-sm">
// // // // // //             {error}
// // // // // //           </p>

// // // // // //           <button
// // // // // //             onClick={fetchCategoryCards}
// // // // // //             className="
// // // // // //               mt-3
// // // // // //               rounded-lg
// // // // // //               bg-red-600
// // // // // //               px-4
// // // // // //               py-2
// // // // // //               text-sm
// // // // // //               font-medium
// // // // // //               text-white
// // // // // //               hover:bg-red-700
// // // // // //               transition
// // // // // //             "
// // // // // //           >
// // // // // //             Retry
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   /* =======================================================
// // // // // //      RENDER
// // // // // //   ======================================================= */

// // // // // //   return (
// // // // // //     <div className="w-full">

// // // // // //       <div
// // // // // //         className="
// // // // // //           grid
// // // // // //           grid-cols-1
// // // // // //           sm:grid-cols-2
// // // // // //           lg:grid-cols-3
// // // // // //           xl:grid-cols-4
// // // // // //           2xl:grid-cols-5
// // // // // //           gap-5
// // // // // //         "
// // // // // //       >

// // // // // //         {cards.map((card) => {
// // // // // //           const Icon = card.icon;

// // // // // //           return (
// // // // // //             <div
// // // // // //               key={card.key}
// // // // // //               className={`
// // // // // //                 rounded-2xl
// // // // // //                 border
// // // // // //                 shadow-sm
// // // // // //                 hover:shadow-lg
// // // // // //                 hover:-translate-y-1
// // // // // //                 transition-all
// // // // // //                 duration-200
// // // // // //                 p-5
// // // // // //                 ${card.colors.card}
// // // // // //               `}
// // // // // //             >

// // // // // //               <div
// // // // // //                 className="
// // // // // //                   flex
// // // // // //                   items-start
// // // // // //                   justify-between
// // // // // //                   gap-4
// // // // // //                 "
// // // // // //               >

// // // // // //                 {/* =========================================
// // // // // //                     LEFT SIDE
// // // // // //                 ========================================== */}

// // // // // //                 <div className="min-w-0">

// // // // // //                   <p
// // // // // //                     className={`
// // // // // //                       text-sm
// // // // // //                       font-semibold
// // // // // //                       truncate
// // // // // //                       ${card.colors.label}
// // // // // //                     `}
// // // // // //                     title={card.label}
// // // // // //                   >
// // // // // //                     {card.label}
// // // // // //                   </p>

// // // // // //                   <h2
// // // // // //                     className={`
// // // // // //                       mt-2
// // // // // //                       text-3xl
// // // // // //                       font-bold
// // // // // //                       tracking-tight
// // // // // //                       ${card.colors.number}
// // // // // //                     `}
// // // // // //                   >
// // // // // //                     {loading
// // // // // //                       ? "..."
// // // // // //                       : card.count.toLocaleString()}
// // // // // //                   </h2>

// // // // // //                   <p
// // // // // //                     className="
// // // // // //                       mt-1
// // // // // //                       text-xs
// // // // // //                       font-medium
// // // // // //                       text-gray-500
// // // // // //                     "
// // // // // //                   >
// // // // // //                     {card.subtitle}
// // // // // //                   </p>

// // // // // //                 </div>

// // // // // //                 {/* =========================================
// // // // // //                     ICON
// // // // // //                 ========================================== */}

// // // // // //                 <div
// // // // // //                   className={`
// // // // // //                     flex
// // // // // //                     h-11
// // // // // //                     w-11
// // // // // //                     shrink-0
// // // // // //                     items-center
// // // // // //                     justify-center
// // // // // //                     rounded-xl
// // // // // //                     ${card.colors.icon}
// // // // // //                   `}
// // // // // //                 >
// // // // // //                   <Icon
// // // // // //                     size={22}
// // // // // //                     strokeWidth={2}
// // // // // //                   />
// // // // // //                 </div>

// // // // // //               </div>

// // // // // //               {/* ===========================================
// // // // // //                   BOTTOM ACCENT
// // // // // //               =========================================== */}

// // // // // //               <div
// // // // // //                 className="
// // // // // //                   mt-4
// // // // // //                   h-1
// // // // // //                   w-full
// // // // // //                   overflow-hidden
// // // // // //                   rounded-full
// // // // // //                   bg-white/70
// // // // // //                 "
// // // // // //               >
// // // // // //                 <div
// // // // // //                   className={`
// // // // // //                     h-full
// // // // // //                     w-1/2
// // // // // //                     rounded-full
// // // // // //                     ${card.colors.icon.split(" ")[0]}
// // // // // //                   `}
// // // // // //                 />
// // // // // //               </div>

// // // // // //             </div>
// // // // // //           );
// // // // // //         })}

// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import React, {
// // // // //   useEffect,
// // // // //   useMemo,
// // // // //   useState,
// // // // // } from "react";

// // // // // import axios from "axios";

// // // // // import {
// // // // //   Users,
// // // // //   UserRound,
// // // // //   Building2,
// // // // //   Sparkles,
// // // // //   Package,
// // // // //   UserCheck,
// // // // //   HardHat,
// // // // //   ShieldCheck,
// // // // //   BriefcaseBusiness,
// // // // //   UsersRound,
// // // // //   UserCog,
// // // // //   ContactRound,
// // // // //   CircleUserRound,
// // // // //   BadgeCheck,
// // // // //   RefreshCw,
// // // // //   Activity,
// // // // // } from "lucide-react";

// // // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // // /* =========================================================
// // // // //    TYPES
// // // // // ========================================================= */

// // // // // type Category = {
// // // // //   key: string;
// // // // //   label: string;
// // // // //   count: number;
// // // // // };

// // // // // type CategoryCardsResponse = {
// // // // //   total: number;
// // // // //   categories: Category[];
// // // // // };

// // // // // type CardTheme = {
// // // // //   border: string;
// // // // //   background: string;
// // // // //   iconBackground: string;
// // // // //   iconColor: string;
// // // // //   numberColor: string;
// // // // //   progress: string;
// // // // // };

// // // // // /* =========================================================
// // // // //    CARD THEMES
// // // // // ========================================================= */

// // // // // const CARD_THEMES: CardTheme[] = [
// // // // //   {
// // // // //     border: "border-blue-500/20",
// // // // //     background: "bg-blue-500/[0.06]",
// // // // //     iconBackground: "bg-blue-500/10",
// // // // //     iconColor: "text-blue-400",
// // // // //     numberColor: "text-blue-400",
// // // // //     progress: "bg-blue-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-purple-500/20",
// // // // //     background: "bg-purple-500/[0.06]",
// // // // //     iconBackground: "bg-purple-500/10",
// // // // //     iconColor: "text-purple-400",
// // // // //     numberColor: "text-purple-400",
// // // // //     progress: "bg-purple-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-pink-500/20",
// // // // //     background: "bg-pink-500/[0.06]",
// // // // //     iconBackground: "bg-pink-500/10",
// // // // //     iconColor: "text-pink-400",
// // // // //     numberColor: "text-pink-400",
// // // // //     progress: "bg-pink-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-orange-500/20",
// // // // //     background: "bg-orange-500/[0.06]",
// // // // //     iconBackground: "bg-orange-500/10",
// // // // //     iconColor: "text-orange-400",
// // // // //     numberColor: "text-orange-400",
// // // // //     progress: "bg-orange-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-green-500/20",
// // // // //     background: "bg-green-500/[0.06]",
// // // // //     iconBackground: "bg-green-500/10",
// // // // //     iconColor: "text-green-400",
// // // // //     numberColor: "text-green-400",
// // // // //     progress: "bg-green-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-yellow-500/20",
// // // // //     background: "bg-yellow-500/[0.06]",
// // // // //     iconBackground: "bg-yellow-500/10",
// // // // //     iconColor: "text-yellow-400",
// // // // //     numberColor: "text-yellow-400",
// // // // //     progress: "bg-yellow-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-red-500/20",
// // // // //     background: "bg-red-500/[0.06]",
// // // // //     iconBackground: "bg-red-500/10",
// // // // //     iconColor: "text-red-400",
// // // // //     numberColor: "text-red-400",
// // // // //     progress: "bg-red-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-cyan-500/20",
// // // // //     background: "bg-cyan-500/[0.06]",
// // // // //     iconBackground: "bg-cyan-500/10",
// // // // //     iconColor: "text-cyan-400",
// // // // //     numberColor: "text-cyan-400",
// // // // //     progress: "bg-cyan-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-teal-500/20",
// // // // //     background: "bg-teal-500/[0.06]",
// // // // //     iconBackground: "bg-teal-500/10",
// // // // //     iconColor: "text-teal-400",
// // // // //     numberColor: "text-teal-400",
// // // // //     progress: "bg-teal-500",
// // // // //   },

// // // // //   {
// // // // //     border: "border-violet-500/20",
// // // // //     background: "bg-violet-500/[0.06]",
// // // // //     iconBackground: "bg-violet-500/10",
// // // // //     iconColor: "text-violet-400",
// // // // //     numberColor: "text-violet-400",
// // // // //     progress: "bg-violet-500",
// // // // //   },
// // // // // ];

// // // // // /* =========================================================
// // // // //    ICONS
// // // // // ========================================================= */

// // // // // const CATEGORY_ICONS = [
// // // // //   UserRound,
// // // // //   Building2,
// // // // //   Sparkles,
// // // // //   Package,
// // // // //   UserCheck,
// // // // //   HardHat,
// // // // //   ShieldCheck,
// // // // //   BriefcaseBusiness,
// // // // //   UsersRound,
// // // // //   UserCog,
// // // // //   ContactRound,
// // // // //   CircleUserRound,
// // // // //   BadgeCheck,
// // // // // ];

// // // // // /* =========================================================
// // // // //    GET CATEGORY ICON
// // // // // ========================================================= */

// // // // // const getCategoryIcon = (
// // // // //   key: string,
// // // // //   index: number
// // // // // ) => {
// // // // //   const normalizedKey = key
// // // // //     .toLowerCase()
// // // // //     .replace(/[\s-]/g, "_");

// // // // //   const knownIcons: Record<
// // // // //     string,
// // // // //     React.ElementType
// // // // //   > = {
// // // // //     guest: UserRound,
// // // // //     vendor: Building2,
// // // // //     maid: Sparkles,

// // // // //     delivery_person: Package,
// // // // //     delivery: Package,

// // // // //     visitor: UserCheck,

// // // // //     worker: HardHat,

// // // // //     security: ShieldCheck,

// // // // //     organiser: UsersRound,
// // // // //     organizer: UsersRound,

// // // // //     service_provider:
// // // // //       BriefcaseBusiness,

// // // // //     service_provider_person:
// // // // //       BriefcaseBusiness,
// // // // //   };

// // // // //   if (knownIcons[normalizedKey]) {
// // // // //     return knownIcons[normalizedKey];
// // // // //   }

// // // // //   return CATEGORY_ICONS[
// // // // //     index % CATEGORY_ICONS.length
// // // // //   ];
// // // // // };

// // // // // /* =========================================================
// // // // //    COMPONENT
// // // // // ========================================================= */

// // // // // export default function StatsCards() {
// // // // //   const [data, setData] =
// // // // //     useState<CategoryCardsResponse>({
// // // // //       total: 0,
// // // // //       categories: [],
// // // // //     });

// // // // //   const [loading, setLoading] =
// // // // //     useState(true);

// // // // //   const [error, setError] =
// // // // //     useState("");

// // // // //   /* =======================================================
// // // // //      FETCH DATA
// // // // //   ======================================================= */

// // // // //   const fetchCategoryCards =
// // // // //     async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         setError("");

// // // // //         const response =
// // // // //           await axios.get(
// // // // //             `${API}/api/dashboard/category-cards`,
// // // // //             {
// // // // //               withCredentials: true,
// // // // //             }
// // // // //           );

// // // // //         console.log(
// // // // //           "Category Cards API Response:",
// // // // //           response.data
// // // // //         );

// // // // //         if (response.data?.success) {
// // // // //           setData(
// // // // //             response.data.data
// // // // //           );
// // // // //         } else {
// // // // //           setError(
// // // // //             response.data?.message ||
// // // // //               "Unable to load dashboard statistics."
// // // // //           );
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error(
// // // // //           "Failed to fetch category cards:",
// // // // //           err
// // // // //         );

// // // // //         setError(
// // // // //           "Unable to load dashboard statistics."
// // // // //         );
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //   /* =======================================================
// // // // //      INITIAL LOAD
// // // // //   ======================================================= */

// // // // //   useEffect(() => {
// // // // //     fetchCategoryCards();
// // // // //   }, []);

// // // // //   /* =======================================================
// // // // //      NORMALIZED DATA
// // // // //   ======================================================= */

// // // // //   const categories = useMemo(() => {
// // // // //     return (data.categories || []).map(
// // // // //       (category) => ({
// // // // //         ...category,
// // // // //         count: Number(
// // // // //           category.count || 0
// // // // //         ),
// // // // //       })
// // // // //     );
// // // // //   }, [data.categories]);

// // // // //   const total = Number(
// // // // //     data.total || 0
// // // // //   );

// // // // //   /* =======================================================
// // // // //      ERROR
// // // // //   ======================================================= */

// // // // //   if (error && !loading) {
// // // // //     return (
// // // // //       <div className="w-full">
// // // // //         <div
// // // // //           className="
// // // // //             rounded-xl
// // // // //             border
// // // // //             border-red-500/20
// // // // //             bg-red-500/5
// // // // //             px-5
// // // // //             py-4
// // // // //           "
// // // // //         >
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div>
// // // // //               <p className="text-sm font-semibold text-red-400">
// // // // //                 Dashboard statistics unavailable
// // // // //               </p>

// // // // //               <p className="mt-1 text-xs text-slate-400">
// // // // //                 {error}
// // // // //               </p>
// // // // //             </div>

// // // // //             <button
// // // // //               onClick={fetchCategoryCards}
// // // // //               className="
// // // // //                 flex
// // // // //                 items-center
// // // // //                 gap-2
// // // // //                 rounded-lg
// // // // //                 border
// // // // //                 border-slate-700
// // // // //                 bg-slate-800
// // // // //                 px-3
// // // // //                 py-2
// // // // //                 text-xs
// // // // //                 text-slate-300
// // // // //                 transition
// // // // //                 hover:bg-slate-700
// // // // //               "
// // // // //             >
// // // // //               <RefreshCw size={14} />

// // // // //               Retry
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   /* =======================================================
// // // // //      LOADING SKELETON
// // // // //   ======================================================= */

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="w-full">

// // // // //         <div className="mb-4 flex items-center justify-between">

// // // // //           <div>
// // // // //             <div className="h-5 w-40 rounded bg-slate-800 animate-pulse" />

// // // // //             <div className="mt-2 h-3 w-56 rounded bg-slate-800 animate-pulse" />
// // // // //           </div>

// // // // //         </div>

// // // // //         <div
// // // // //           className="
// // // // //             grid
// // // // //             grid-cols-1
// // // // //             sm:grid-cols-2
// // // // //             lg:grid-cols-3
// // // // //             xl:grid-cols-4
// // // // //             gap-4
// // // // //           "
// // // // //         >
// // // // //           {[1, 2, 3, 4].map(
// // // // //             (item) => (
// // // // //               <div
// // // // //                 key={item}
// // // // //                 className="
// // // // //                   h-[135px]
// // // // //                   rounded-xl
// // // // //                   border
// // // // //                   border-slate-800
// // // // //                   bg-slate-900
// // // // //                   animate-pulse
// // // // //                 "
// // // // //               />
// // // // //             )
// // // // //           )}
// // // // //         </div>

// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   /* =======================================================
// // // // //      RENDER
// // // // //   ======================================================= */

// // // // //   return (
// // // // //     <div className="w-full">

// // // // //       {/* =================================================
// // // // //           SECTION HEADER
// // // // //       ================================================= */}

// // // // //       <div
// // // // //         className="
// // // // //           flex
// // // // //           items-center
// // // // //           justify-between
// // // // //           mb-4
// // // // //         "
// // // // //       >

// // // // //         <div>

// // // // //           <div className="flex items-center gap-2">

// // // // //             <Activity
// // // // //               size={17}
// // // // //               className="text-blue-400"
// // // // //             />

// // // // //             <h2
// // // // //               className="
// // // // //                 text-sm
// // // // //                 font-semibold
// // // // //                 text-white
// // // // //               "
// // // // //             >
// // // // //               Visitor Overview
// // // // //             </h2>

// // // // //           </div>

// // // // //           <p
// // // // //             className="
// // // // //               mt-1
// // // // //               text-xs
// // // // //               text-slate-500
// // // // //             "
// // // // //           >
// // // // //             Current visitor distribution
// // // // //           </p>

// // // // //         </div>

// // // // //         <button
// // // // //           onClick={fetchCategoryCards}
// // // // //           className="
// // // // //             flex
// // // // //             items-center
// // // // //             gap-2
// // // // //             rounded-lg
// // // // //             border
// // // // //             border-slate-800
// // // // //             bg-slate-900
// // // // //             px-3
// // // // //             py-1.5
// // // // //             text-[11px]
// // // // //             text-slate-400
// // // // //             transition
// // // // //             hover:border-slate-700
// // // // //             hover:bg-slate-800
// // // // //             hover:text-white
// // // // //           "
// // // // //           title="Refresh statistics"
// // // // //         >
// // // // //           <RefreshCw size={13} />

// // // // //           Refresh
// // // // //         </button>

// // // // //       </div>

// // // // //       {/* =================================================
// // // // //           CARDS
// // // // //       ================================================= */}

// // // // //       <div
// // // // //         className="
// // // // //           grid
// // // // //           grid-cols-1
// // // // //           sm:grid-cols-2
// // // // //           lg:grid-cols-3
// // // // //           xl:grid-cols-4
// // // // //           gap-4
// // // // //         "
// // // // //       >

// // // // //         {/* =================================================
// // // // //             TOTAL CARD
// // // // //         ================================================= */}

// // // // //         <div
// // // // //           className="
// // // // //             relative
// // // // //             overflow-hidden
// // // // //             rounded-xl
// // // // //             border
// // // // //             border-blue-500/25
// // // // //             bg-gradient-to-br
// // // // //             from-blue-500/[0.10]
// // // // //             to-slate-900
// // // // //             p-4
// // // // //             shadow-lg
// // // // //             shadow-black/10
// // // // //             transition-all
// // // // //             duration-200
// // // // //             hover:-translate-y-0.5
// // // // //             hover:border-blue-400/40
// // // // //           "
// // // // //         >

// // // // //           {/* Decorative glow */}

// // // // //           <div
// // // // //             className="
// // // // //               pointer-events-none
// // // // //               absolute
// // // // //               -right-8
// // // // //               -top-8
// // // // //               h-24
// // // // //               w-24
// // // // //               rounded-full
// // // // //               bg-blue-500/10
// // // // //               blur-2xl
// // // // //             "
// // // // //           />

// // // // //           <div
// // // // //             className="
// // // // //               relative
// // // // //               flex
// // // // //               items-start
// // // // //               justify-between
// // // // //             "
// // // // //           >

// // // // //             <div>

// // // // //               <p
// // // // //                 className="
// // // // //                   text-[11px]
// // // // //                   font-medium
// // // // //                   uppercase
// // // // //                   tracking-wider
// // // // //                   text-slate-400
// // // // //                 "
// // // // //               >
// // // // //                 Total
// // // // //               </p>

// // // // //               <h3
// // // // //                 className="
// // // // //                   mt-2
// // // // //                   text-3xl
// // // // //                   font-bold
// // // // //                   tracking-tight
// // // // //                   text-white
// // // // //                 "
// // // // //               >
// // // // //                 {total.toLocaleString()}
// // // // //               </h3>

// // // // //               <p
// // // // //                 className="
// // // // //                   mt-1
// // // // //                   text-[11px]
// // // // //                   text-slate-500
// // // // //                 "
// // // // //               >
// // // // //                 All Categories
// // // // //               </p>

// // // // //             </div>

// // // // //             <div
// // // // //               className="
// // // // //                 flex
// // // // //                 h-9
// // // // //                 w-9
// // // // //                 items-center
// // // // //                 justify-center
// // // // //                 rounded-lg
// // // // //                 bg-blue-500/10
// // // // //                 text-blue-400
// // // // //               "
// // // // //             >
// // // // //               <Users
// // // // //                 size={18}
// // // // //                 strokeWidth={2}
// // // // //               />
// // // // //             </div>

// // // // //           </div>

// // // // //           {/* Bottom indicator */}

// // // // //           <div
// // // // //             className="
// // // // //               mt-4
// // // // //               h-1
// // // // //               overflow-hidden
// // // // //               rounded-full
// // // // //               bg-slate-800
// // // // //             "
// // // // //           >
// // // // //             <div
// // // // //               className="
// // // // //                 h-full
// // // // //                 w-full
// // // // //                 rounded-full
// // // // //                 bg-blue-500
// // // // //               "
// // // // //             />
// // // // //           </div>

// // // // //         </div>

// // // // //         {/* =================================================
// // // // //             CATEGORY CARDS
// // // // //         ================================================= */}

// // // // //         {categories.map(
// // // // //           (category, index) => {

// // // // //             const Icon =
// // // // //               getCategoryIcon(
// // // // //                 category.key,
// // // // //                 index
// // // // //               );

// // // // //             const theme =
// // // // //               CARD_THEMES[
// // // // //                 index %
// // // // //                   CARD_THEMES.length
// // // // //               ];

// // // // //             const percentage =
// // // // //               total > 0
// // // // //                 ? Math.round(
// // // // //                     (category.count /
// // // // //                       total) *
// // // // //                       100
// // // // //                   )
// // // // //                 : 0;

// // // // //             return (
// // // // //               <div
// // // // //                 key={category.key}
// // // // //                 className={`
// // // // //                   relative
// // // // //                   overflow-hidden
// // // // //                   rounded-xl
// // // // //                   border
// // // // //                   ${theme.border}
// // // // //                   ${theme.background}
// // // // //                   p-4
// // // // //                   shadow-lg
// // // // //                   shadow-black/10
// // // // //                   transition-all
// // // // //                   duration-200
// // // // //                   hover:-translate-y-0.5
// // // // //                   hover:bg-opacity-100
// // // // //                 `}
// // // // //               >

// // // // //                 {/* TOP */}

// // // // //                 <div
// // // // //                   className="
// // // // //                     flex
// // // // //                     items-start
// // // // //                     justify-between
// // // // //                   "
// // // // //                 >

// // // // //                   <div className="min-w-0">

// // // // //                     <p
// // // // //                       className="
// // // // //                         truncate
// // // // //                         text-[11px]
// // // // //                         font-medium
// // // // //                         uppercase
// // // // //                         tracking-wider
// // // // //                         text-slate-400
// // // // //                       "
// // // // //                       title={category.label}
// // // // //                     >
// // // // //                       {category.label}
// // // // //                     </p>

// // // // //                     <h3
// // // // //                       className={`
// // // // //                         mt-2
// // // // //                         text-3xl
// // // // //                         font-bold
// // // // //                         tracking-tight
// // // // //                         ${theme.numberColor}
// // // // //                       `}
// // // // //                     >
// // // // //                       {category.count.toLocaleString()}
// // // // //                     </h3>

// // // // //                   </div>

// // // // //                   <div
// // // // //                     className={`
// // // // //                       flex
// // // // //                       h-9
// // // // //                       w-9
// // // // //                       shrink-0
// // // // //                       items-center
// // // // //                       justify-center
// // // // //                       rounded-lg
// // // // //                       ${theme.iconBackground}
// // // // //                       ${theme.iconColor}
// // // // //                     `}
// // // // //                   >
// // // // //                     <Icon
// // // // //                       size={18}
// // // // //                       strokeWidth={2}
// // // // //                     />
// // // // //                   </div>

// // // // //                 </div>

// // // // //                 {/* BOTTOM TEXT */}

// // // // //                 <div
// // // // //                   className="
// // // // //                     mt-3
// // // // //                     flex
// // // // //                     items-center
// // // // //                     justify-between
// // // // //                   "
// // // // //                 >

// // // // //                   <span
// // // // //                     className="
// // // // //                       text-[10px]
// // // // //                       text-slate-500
// // // // //                     "
// // // // //                   >
// // // // //                     Share of visitors
// // // // //                   </span>

// // // // //                   <span
// // // // //                     className="
// // // // //                       text-[10px]
// // // // //                       font-semibold
// // // // //                       text-slate-400
// // // // //                     "
// // // // //                   >
// // // // //                     {percentage}%
// // // // //                   </span>

// // // // //                 </div>

// // // // //                 {/* PROGRESS */}

// // // // //                 <div
// // // // //                   className="
// // // // //                     mt-2
// // // // //                     h-1
// // // // //                     overflow-hidden
// // // // //                     rounded-full
// // // // //                     bg-slate-800
// // // // //                   "
// // // // //                 >

// // // // //                   <div
// // // // //                     className={`
// // // // //                       h-full
// // // // //                       rounded-full
// // // // //                       transition-all
// // // // //                       duration-500
// // // // //                       ${theme.progress}
// // // // //                     `}
// // // // //                     style={{
// // // // //                       width: `${percentage}%`,
// // // // //                     }}
// // // // //                   />

// // // // //                 </div>

// // // // //               </div>
// // // // //             );
// // // // //           }
// // // // //         )}

// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }.
// // // // import React, {
// // // //   useEffect,
// // // //   useMemo,
// // // //   useState,
// // // // } from "react";

// // // // import axios from "axios";

// // // // import {
// // // //   Users,
// // // //   UserRound,
// // // //   Building2,
// // // //   Sparkles,
// // // //   Package,
// // // //   UserCheck,
// // // //   HardHat,
// // // //   ShieldCheck,
// // // //   BriefcaseBusiness,
// // // //   UsersRound,
// // // //   UserCog,
// // // //   ContactRound,
// // // //   CircleUserRound,
// // // //   BadgeCheck,
// // // //   RefreshCw,
// // // //   Activity,
// // // // } from "lucide-react";

// // // // const API = import.meta.env.VITE_BACKEND_URL;

// // // // /* =========================================================
// // // //    TYPES
// // // // ========================================================= */

// // // // type Category = {
// // // //   key: string;
// // // //   label: string;
// // // //   count: number;
// // // // };

// // // // type CategoryCardsResponse = {
// // // //   total: number;
// // // //   categories: Category[];
// // // // };

// // // // type CardTheme = {
// // // //   border: string;
// // // //   background: string;
// // // //   iconBackground: string;
// // // //   iconColor: string;
// // // //   numberColor: string;
// // // //   labelColor: string;
// // // //   progress: string;
// // // // };

// // // // /* =========================================================
// // // //    LIGHT DASHBOARD CARD THEMES
// // // // ========================================================= */

// // // // const CARD_THEMES: CardTheme[] = [

// // // //   /* BLUE */
// // // //   {
// // // //     border: "border-blue-200",
// // // //     background: "bg-blue-50",
// // // //     iconBackground: "bg-blue-100",
// // // //     iconColor: "text-blue-600",
// // // //     numberColor: "text-blue-600",
// // // //     labelColor: "text-blue-900",
// // // //     progress: "bg-blue-500",
// // // //   },

// // // //   /* PURPLE */
// // // //   {
// // // //     border: "border-purple-200",
// // // //     background: "bg-purple-50",
// // // //     iconBackground: "bg-purple-100",
// // // //     iconColor: "text-purple-600",
// // // //     numberColor: "text-purple-600",
// // // //     labelColor: "text-purple-900",
// // // //     progress: "bg-purple-500",
// // // //   },

// // // //   /* PINK */
// // // //   {
// // // //     border: "border-pink-200",
// // // //     background: "bg-pink-50",
// // // //     iconBackground: "bg-pink-100",
// // // //     iconColor: "text-pink-600",
// // // //     numberColor: "text-pink-600",
// // // //     labelColor: "text-pink-900",
// // // //     progress: "bg-pink-500",
// // // //   },

// // // //   /* ORANGE */
// // // //   {
// // // //     border: "border-orange-200",
// // // //     background: "bg-orange-50",
// // // //     iconBackground: "bg-orange-100",
// // // //     iconColor: "text-orange-600",
// // // //     numberColor: "text-orange-600",
// // // //     labelColor: "text-orange-900",
// // // //     progress: "bg-orange-500",
// // // //   },

// // // //   /* GREEN */
// // // //   {
// // // //     border: "border-green-200",
// // // //     background: "bg-green-50",
// // // //     iconBackground: "bg-green-100",
// // // //     iconColor: "text-green-600",
// // // //     numberColor: "text-green-600",
// // // //     labelColor: "text-green-900",
// // // //     progress: "bg-green-500",
// // // //   },

// // // //   /* YELLOW */
// // // //   {
// // // //     border: "border-yellow-200",
// // // //     background: "bg-yellow-50",
// // // //     iconBackground: "bg-yellow-100",
// // // //     iconColor: "text-yellow-700",
// // // //     numberColor: "text-yellow-700",
// // // //     labelColor: "text-yellow-900",
// // // //     progress: "bg-yellow-500",
// // // //   },

// // // //   /* RED */
// // // //   {
// // // //     border: "border-red-200",
// // // //     background: "bg-red-50",
// // // //     iconBackground: "bg-red-100",
// // // //     iconColor: "text-red-600",
// // // //     numberColor: "text-red-600",
// // // //     labelColor: "text-red-900",
// // // //     progress: "bg-red-500",
// // // //   },

// // // //   /* CYAN */
// // // //   {
// // // //     border: "border-cyan-200",
// // // //     background: "bg-cyan-50",
// // // //     iconBackground: "bg-cyan-100",
// // // //     iconColor: "text-cyan-600",
// // // //     numberColor: "text-cyan-600",
// // // //     labelColor: "text-cyan-900",
// // // //     progress: "bg-cyan-500",
// // // //   },

// // // //   /* TEAL */
// // // //   {
// // // //     border: "border-teal-200",
// // // //     background: "bg-teal-50",
// // // //     iconBackground: "bg-teal-100",
// // // //     iconColor: "text-teal-600",
// // // //     numberColor: "text-teal-600",
// // // //     labelColor: "text-teal-900",
// // // //     progress: "bg-teal-500",
// // // //   },

// // // //   /* VIOLET */
// // // //   {
// // // //     border: "border-violet-200",
// // // //     background: "bg-violet-50",
// // // //     iconBackground: "bg-violet-100",
// // // //     iconColor: "text-violet-600",
// // // //     numberColor: "text-violet-600",
// // // //     labelColor: "text-violet-900",
// // // //     progress: "bg-violet-500",
// // // //   },
// // // // ];

// // // // /* =========================================================
// // // //    CATEGORY ICONS
// // // // ========================================================= */

// // // // const CATEGORY_ICONS = [
// // // //   UserRound,
// // // //   Building2,
// // // //   Sparkles,
// // // //   Package,
// // // //   UserCheck,
// // // //   HardHat,
// // // //   ShieldCheck,
// // // //   BriefcaseBusiness,
// // // //   UsersRound,
// // // //   UserCog,
// // // //   ContactRound,
// // // //   CircleUserRound,
// // // //   BadgeCheck,
// // // // ];

// // // // /* =========================================================
// // // //    GET CATEGORY ICON
// // // // ========================================================= */

// // // // const getCategoryIcon = (
// // // //   key: string,
// // // //   index: number
// // // // ) => {

// // // //   const normalizedKey = key
// // // //     .toLowerCase()
// // // //     .replace(/[\s-]/g, "_");

// // // //   const knownIcons: Record<
// // // //     string,
// // // //     React.ElementType
// // // //   > = {

// // // //     guest: UserRound,

// // // //     vendor: Building2,

// // // //     maid: Sparkles,

// // // //     delivery_person: Package,
// // // //     delivery: Package,

// // // //     visitor: UserCheck,

// // // //     worker: HardHat,

// // // //     security: ShieldCheck,

// // // //     organiser: UsersRound,
// // // //     organizer: UsersRound,

// // // //     service_provider:
// // // //       BriefcaseBusiness,

// // // //     service_provider_person:
// // // //       BriefcaseBusiness,
// // // //   };

// // // //   if (knownIcons[normalizedKey]) {
// // // //     return knownIcons[normalizedKey];
// // // //   }

// // // //   return CATEGORY_ICONS[
// // // //     index % CATEGORY_ICONS.length
// // // //   ];
// // // // };

// // // // /* =========================================================
// // // //    COMPONENT
// // // // ========================================================= */

// // // // export default function StatsCards() {

// // // //   const [data, setData] =
// // // //     useState<CategoryCardsResponse>({
// // // //       total: 0,
// // // //       categories: [],
// // // //     });

// // // //   const [loading, setLoading] =
// // // //     useState(true);

// // // //   const [error, setError] =
// // // //     useState("");

// // // //   /* =======================================================
// // // //      FETCH DATA
// // // //   ======================================================= */

// // // //   const fetchCategoryCards =
// // // //     async () => {

// // // //       try {

// // // //         setLoading(true);
// // // //         setError("");

// // // //         const response =
// // // //           await axios.get(
// // // //             `${API}/api/dashboard/category-cards`,
// // // //             {
// // // //               withCredentials: true,
// // // //             }
// // // //           );

// // // //         console.log(
// // // //           "Category Cards API Response:",
// // // //           response.data
// // // //         );

// // // //         if (response.data?.success) {

// // // //           setData(
// // // //             response.data.data
// // // //           );

// // // //         } else {

// // // //           setError(
// // // //             response.data?.message ||
// // // //               "Unable to load dashboard statistics."
// // // //           );
// // // //         }

// // // //       } catch (err) {

// // // //         console.error(
// // // //           "Failed to fetch category cards:",
// // // //           err
// // // //         );

// // // //         setError(
// // // //           "Unable to load dashboard statistics."
// // // //         );

// // // //       } finally {

// // // //         setLoading(false);

// // // //       }
// // // //     };

// // // //   /* =======================================================
// // // //      INITIAL LOAD
// // // //   ======================================================= */

// // // //   useEffect(() => {

// // // //     fetchCategoryCards();

// // // //   }, []);

// // // //   /* =======================================================
// // // //      NORMALIZE DATA
// // // //   ======================================================= */

// // // //   const categories = useMemo(() => {

// // // //     return (data.categories || []).map(
// // // //       (category) => ({
// // // //         ...category,

// // // //         count: Number(
// // // //           category.count || 0
// // // //         ),
// // // //       })
// // // //     );

// // // //   }, [data.categories]);

// // // //   const total = Number(
// // // //     data.total || 0
// // // //   );

// // // //   /* =======================================================
// // // //      ERROR
// // // //   ======================================================= */

// // // //   if (error && !loading) {

// // // //     return (

// // // //       <div className="w-full">

// // // //         <div
// // // //           className="
// // // //             rounded-xl
// // // //             border
// // // //             border-red-200
// // // //             bg-red-50
// // // //             px-5
// // // //             py-4
// // // //           "
// // // //         >

// // // //           <div
// // // //             className="
// // // //               flex
// // // //               items-center
// // // //               justify-between
// // // //               gap-4
// // // //             "
// // // //           >

// // // //             <div>

// // // //               <p
// // // //                 className="
// // // //                   text-sm
// // // //                   font-semibold
// // // //                   text-red-700
// // // //                 "
// // // //               >
// // // //                 Dashboard statistics unavailable
// // // //               </p>

// // // //               <p
// // // //                 className="
// // // //                   mt-1
// // // //                   text-xs
// // // //                   text-red-500
// // // //                 "
// // // //               >
// // // //                 {error}
// // // //               </p>

// // // //             </div>

// // // //             <button
// // // //               onClick={fetchCategoryCards}
// // // //               className="
// // // //                 flex
// // // //                 items-center
// // // //                 gap-2
// // // //                 rounded-lg
// // // //                 border
// // // //                 border-red-200
// // // //                 bg-white
// // // //                 px-3
// // // //                 py-2
// // // //                 text-xs
// // // //                 font-medium
// // // //                 text-red-600
// // // //                 transition
// // // //                 hover:bg-red-50
// // // //               "
// // // //             >

// // // //               <RefreshCw size={14} />

// // // //               Retry

// // // //             </button>

// // // //           </div>

// // // //         </div>

// // // //       </div>
// // // //     );
// // // //   }

// // // //   /* =======================================================
// // // //      LOADING
// // // //   ======================================================= */

// // // //   if (loading) {

// // // //     return (

// // // //       <div className="w-full">

// // // //         <div
// // // //           className="
// // // //             mb-4
// // // //             flex
// // // //             items-center
// // // //             justify-between
// // // //           "
// // // //         >

// // // //           <div>

// // // //             <div
// // // //               className="
// // // //                 h-5
// // // //                 w-40
// // // //                 rounded
// // // //                 bg-gray-200
// // // //                 animate-pulse
// // // //               "
// // // //             />

// // // //             <div
// // // //               className="
// // // //                 mt-2
// // // //                 h-3
// // // //                 w-56
// // // //                 rounded
// // // //                 bg-gray-200
// // // //                 animate-pulse
// // // //               "
// // // //             />

// // // //           </div>

// // // //         </div>

// // // //         <div
// // // //           className="
// // // //             grid
// // // //             grid-cols-1
// // // //             sm:grid-cols-2
// // // //             lg:grid-cols-3
// // // //             xl:grid-cols-4
// // // //             gap-4
// // // //           "
// // // //         >

// // // //           {[1, 2, 3, 4].map(
// // // //             (item) => (

// // // //               <div
// // // //                 key={item}
// // // //                 className="
// // // //                   h-[150px]
// // // //                   rounded-2xl
// // // //                   border
// // // //                   border-gray-200
// // // //                   bg-white
// // // //                   animate-pulse
// // // //                 "
// // // //               />

// // // //             )
// // // //           )}

// // // //         </div>

// // // //       </div>
// // // //     );
// // // //   }

// // // //   /* =======================================================
// // // //      RENDER
// // // //   ======================================================= */

// // // //   return (

// // // //     <div className="w-full">

// // // //       {/* =================================================
// // // //           SECTION HEADER
// // // //       ================================================= */}

// // // //       <div
// // // //         className="
// // // //           mb-5
// // // //           flex
// // // //           items-center
// // // //           justify-between
// // // //         "
// // // //       >

// // // //         <div>

// // // //           <div
// // // //             className="
// // // //               flex
// // // //               items-center
// // // //               gap-2
// // // //             "
// // // //           >

// // // //             <Activity
// // // //               size={18}
// // // //               className="text-blue-500"
// // // //             />

// // // //             <h2
// // // //               className="
// // // //                 text-base
// // // //                 font-semibold
// // // //                 text-gray-800
// // // //               "
// // // //             >
// // // //               Visitor Overview
// // // //             </h2>

// // // //           </div>

// // // //           <p
// // // //             className="
// // // //               mt-1
// // // //               text-xs
// // // //               text-gray-500
// // // //             "
// // // //           >
// // // //             Current visitor distribution
// // // //           </p>

// // // //         </div>

// // // //         <button
// // // //           onClick={fetchCategoryCards}
// // // //           className="
// // // //             flex
// // // //             items-center
// // // //             gap-2
// // // //             rounded-lg
// // // //             border
// // // //             border-gray-200
// // // //             bg-white
// // // //             px-3
// // // //             py-2
// // // //             text-xs
// // // //             font-medium
// // // //             text-gray-600
// // // //             shadow-sm
// // // //             transition
// // // //             hover:bg-gray-50
// // // //             hover:text-gray-900
// // // //           "
// // // //           title="Refresh statistics"
// // // //         >

// // // //           <RefreshCw size={13} />

// // // //           Refresh

// // // //         </button>

// // // //       </div>

// // // //       {/* =================================================
// // // //           CARDS
// // // //       ================================================= */}

// // // //       <div
// // // //         className="
// // // //           grid
// // // //           grid-cols-1
// // // //           sm:grid-cols-2
// // // //           lg:grid-cols-3
// // // //           xl:grid-cols-4
// // // //           gap-5
// // // //         "
// // // //       >

// // // //         {/* =================================================
// // // //             TOTAL CARD
// // // //         ================================================= */}

// // // //         <div
// // // //           className="
// // // //             relative
// // // //             overflow-hidden
// // // //             rounded-2xl
// // // //             border
// // // //             border-blue-200
// // // //             bg-gradient-to-br
// // // //             from-blue-50
// // // //             via-white
// // // //             to-indigo-50
// // // //             p-5
// // // //             shadow-sm
// // // //             transition-all
// // // //             duration-200
// // // //             hover:-translate-y-1
// // // //             hover:shadow-md
// // // //           "
// // // //         >

// // // //           <div
// // // //             className="
// // // //               flex
// // // //               items-start
// // // //               justify-between
// // // //             "
// // // //           >

// // // //             <div>

// // // //               <p
// // // //                 className="
// // // //                   text-xs
// // // //                   font-semibold
// // // //                   uppercase
// // // //                   tracking-wide
// // // //                   text-gray-500
// // // //                 "
// // // //               >
// // // //                 Total
// // // //               </p>

// // // //               <h3
// // // //                 className="
// // // //                   mt-2
// // // //                   text-3xl
// // // //                   font-bold
// // // //                   tracking-tight
// // // //                   text-blue-700
// // // //                 "
// // // //               >
// // // //                 {total.toLocaleString()}
// // // //               </h3>

// // // //               <p
// // // //                 className="
// // // //                   mt-1
// // // //                   text-xs
// // // //                   font-medium
// // // //                   text-gray-500
// // // //                 "
// // // //               >
// // // //                 All Categories
// // // //               </p>

// // // //             </div>

// // // //             <div
// // // //               className="
// // // //                 flex
// // // //                 h-11
// // // //                 w-11
// // // //                 items-center
// // // //                 justify-center
// // // //                 rounded-xl
// // // //                 bg-blue-100
// // // //                 text-blue-600
// // // //               "
// // // //             >

// // // //               <Users
// // // //                 size={21}
// // // //                 strokeWidth={2}
// // // //               />

// // // //             </div>

// // // //           </div>

// // // //           {/* Progress */}

// // // //           <div
// // // //             className="
// // // //               mt-5
// // // //               h-1.5
// // // //               overflow-hidden
// // // //               rounded-full
// // // //               bg-blue-100
// // // //             "
// // // //           >

// // // //             <div
// // // //               className="
// // // //                 h-full
// // // //                 w-full
// // // //                 rounded-full
// // // //                 bg-blue-500
// // // //               "
// // // //             />

// // // //           </div>

// // // //         </div>

// // // //         {/* =================================================
// // // //             CATEGORY CARDS
// // // //         ================================================= */}

// // // //         {categories.map(
// // // //           (category, index) => {

// // // //             const Icon =
// // // //               getCategoryIcon(
// // // //                 category.key,
// // // //                 index
// // // //               );

// // // //             const theme =
// // // //               CARD_THEMES[
// // // //                 index %
// // // //                   CARD_THEMES.length
// // // //               ];

// // // //             const percentage =
// // // //               total > 0
// // // //                 ? Math.round(
// // // //                     (category.count /
// // // //                       total) *
// // // //                       100
// // // //                   )
// // // //                 : 0;

// // // //             return (

// // // //               <div
// // // //                 key={category.key}
// // // //                 className={`
// // // //                   relative
// // // //                   overflow-hidden
// // // //                   rounded-2xl
// // // //                   border
// // // //                   ${theme.border}
// // // //                   ${theme.background}
// // // //                   p-5
// // // //                   shadow-sm
// // // //                   transition-all
// // // //                   duration-200
// // // //                   hover:-translate-y-1
// // // //                   hover:shadow-md
// // // //                 `}
// // // //               >

// // // //                 {/* TOP */}

// // // //                 <div
// // // //                   className="
// // // //                     flex
// // // //                     items-start
// // // //                     justify-between
// // // //                     gap-4
// // // //                   "
// // // //                 >

// // // //                   <div className="min-w-0">

// // // //                     <p
// // // //                       className={`
// // // //                         truncate
// // // //                         text-xs
// // // //                         font-semibold
// // // //                         uppercase
// // // //                         tracking-wide
// // // //                         ${theme.labelColor}
// // // //                       `}
// // // //                       title={category.label}
// // // //                     >
// // // //                       {category.label}
// // // //                     </p>

// // // //                     <h3
// // // //                       className={`
// // // //                         mt-2
// // // //                         text-3xl
// // // //                         font-bold
// // // //                         tracking-tight
// // // //                         ${theme.numberColor}
// // // //                       `}
// // // //                     >
// // // //                       {category.count.toLocaleString()}
// // // //                     </h3>

// // // //                   </div>

// // // //                   {/* ICON */}

// // // //                   <div
// // // //                     className={`
// // // //                       flex
// // // //                       h-11
// // // //                       w-11
// // // //                       shrink-0
// // // //                       items-center
// // // //                       justify-center
// // // //                       rounded-xl
// // // //                       ${theme.iconBackground}
// // // //                       ${theme.iconColor}
// // // //                     `}
// // // //                   >

// // // //                     <Icon
// // // //                       size={21}
// // // //                       strokeWidth={2}
// // // //                     />

// // // //                   </div>

// // // //                 </div>

// // // //                 {/* SHARE */}

// // // //                 <div
// // // //                   className="
// // // //                     mt-4
// // // //                     flex
// // // //                     items-center
// // // //                     justify-between
// // // //                   "
// // // //                 >

// // // //                   <span
// // // //                     className="
// // // //                       text-[11px]
// // // //                       font-medium
// // // //                       text-gray-500
// // // //                     "
// // // //                   >
// // // //                     Share of visitors
// // // //                   </span>

// // // //                   <span
// // // //                     className="
// // // //                       text-[11px]
// // // //                       font-semibold
// // // //                       text-gray-600
// // // //                     "
// // // //                   >
// // // //                     {percentage}%
// // // //                   </span>

// // // //                 </div>

// // // //                 {/* PROGRESS */}

// // // //                 <div
// // // //                   className="
// // // //                     mt-2
// // // //                     h-1.5
// // // //                     overflow-hidden
// // // //                     rounded-full
// // // //                     bg-white/80
// // // //                   "
// // // //                 >

// // // //                   <div
// // // //                     className={`
// // // //                       h-full
// // // //                       rounded-full
// // // //                       transition-all
// // // //                       duration-500
// // // //                       ${theme.progress}
// // // //                     `}
// // // //                     style={{
// // // //                       width: `${percentage}%`,
// // // //                     }}
// // // //                   />

// // // //                 </div>

// // // //               </div>

// // // //             );
// // // //           }
// // // //         )}

// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }
// // // import React, {
// // //   useEffect,
// // //   useMemo,
// // //   useState,
// // // } from "react";

// // // import axios from "axios";

// // // import {
// // //   Users,
// // //   UserRound,
// // //   Building2,
// // //   Sparkles,
// // //   Package,
// // //   UserCheck,
// // //   HardHat,
// // //   ShieldCheck,
// // //   BriefcaseBusiness,
// // //   UsersRound,
// // //   UserCog,
// // //   ContactRound,
// // //   CircleUserRound,
// // //   BadgeCheck,
// // //   RefreshCw,
// // //   Activity,
// // // } from "lucide-react";

// // // const API = import.meta.env.VITE_BACKEND_URL;

// // // /* =========================================================
// // //    TYPES
// // // ========================================================= */

// // // type Period = "daily" | "weekly" | "monthly";

// // // type StatsCardsProps = {
// // //   period: Period;
// // // };

// // // type Category = {
// // //   key: string;
// // //   label: string;
// // //   count: number;
// // // };

// // // type CategoryCardsResponse = {
// // //   total: number;
// // //   categories: Category[];
// // // };

// // // type CardTheme = {
// // //   border: string;
// // //   background: string;
// // //   iconBackground: string;
// // //   iconColor: string;
// // //   numberColor: string;
// // //   labelColor: string;
// // //   progress: string;
// // // };

// // // /* =========================================================
// // //    CARD THEMES
// // // ========================================================= */

// // // const CARD_THEMES: CardTheme[] = [
// // //   {
// // //     border: "border-blue-200",
// // //     background: "bg-blue-50",
// // //     iconBackground: "bg-blue-100",
// // //     iconColor: "text-blue-600",
// // //     numberColor: "text-blue-600",
// // //     labelColor: "text-blue-900",
// // //     progress: "bg-blue-500",
// // //   },

// // //   {
// // //     border: "border-purple-200",
// // //     background: "bg-purple-50",
// // //     iconBackground: "bg-purple-100",
// // //     iconColor: "text-purple-600",
// // //     numberColor: "text-purple-600",
// // //     labelColor: "text-purple-900",
// // //     progress: "bg-purple-500",
// // //   },

// // //   {
// // //     border: "border-pink-200",
// // //     background: "bg-pink-50",
// // //     iconBackground: "bg-pink-100",
// // //     iconColor: "text-pink-600",
// // //     numberColor: "text-pink-600",
// // //     labelColor: "text-pink-900",
// // //     progress: "bg-pink-500",
// // //   },

// // //   {
// // //     border: "border-orange-200",
// // //     background: "bg-orange-50",
// // //     iconBackground: "bg-orange-100",
// // //     iconColor: "text-orange-600",
// // //     numberColor: "text-orange-600",
// // //     labelColor: "text-orange-900",
// // //     progress: "bg-orange-500",
// // //   },

// // //   {
// // //     border: "border-green-200",
// // //     background: "bg-green-50",
// // //     iconBackground: "bg-green-100",
// // //     iconColor: "text-green-600",
// // //     numberColor: "text-green-600",
// // //     labelColor: "text-green-900",
// // //     progress: "bg-green-500",
// // //   },

// // //   {
// // //     border: "border-yellow-200",
// // //     background: "bg-yellow-50",
// // //     iconBackground: "bg-yellow-100",
// // //     iconColor: "text-yellow-700",
// // //     numberColor: "text-yellow-700",
// // //     labelColor: "text-yellow-900",
// // //     progress: "bg-yellow-500",
// // //   },

// // //   {
// // //     border: "border-red-200",
// // //     background: "bg-red-50",
// // //     iconBackground: "bg-red-100",
// // //     iconColor: "text-red-600",
// // //     numberColor: "text-red-600",
// // //     labelColor: "text-red-900",
// // //     progress: "bg-red-500",
// // //   },

// // //   {
// // //     border: "border-cyan-200",
// // //     background: "bg-cyan-50",
// // //     iconBackground: "bg-cyan-100",
// // //     iconColor: "text-cyan-600",
// // //     numberColor: "text-cyan-600",
// // //     labelColor: "text-cyan-900",
// // //     progress: "bg-cyan-500",
// // //   },

// // //   {
// // //     border: "border-teal-200",
// // //     background: "bg-teal-50",
// // //     iconBackground: "bg-teal-100",
// // //     iconColor: "text-teal-600",
// // //     numberColor: "text-teal-600",
// // //     labelColor: "text-teal-900",
// // //     progress: "bg-teal-500",
// // //   },

// // //   {
// // //     border: "border-violet-200",
// // //     background: "bg-violet-50",
// // //     iconBackground: "bg-violet-100",
// // //     iconColor: "text-violet-600",
// // //     numberColor: "text-violet-600",
// // //     labelColor: "text-violet-900",
// // //     progress: "bg-violet-500",
// // //   },
// // // ];

// // // /* =========================================================
// // //    CATEGORY ICONS
// // // ========================================================= */

// // // const CATEGORY_ICONS = [
// // //   UserRound,
// // //   Building2,
// // //   Sparkles,
// // //   Package,
// // //   UserCheck,
// // //   HardHat,
// // //   ShieldCheck,
// // //   BriefcaseBusiness,
// // //   UsersRound,
// // //   UserCog,
// // //   ContactRound,
// // //   CircleUserRound,
// // //   BadgeCheck,
// // // ];

// // // /* =========================================================
// // //    GET CATEGORY ICON
// // // ========================================================= */

// // // const getCategoryIcon = (
// // //   key: string,
// // //   index: number
// // // ) => {
// // //   const normalizedKey = key
// // //     .toLowerCase()
// // //     .replace(/[\s-]/g, "_");

// // //   const knownIcons: Record<
// // //     string,
// // //     React.ElementType
// // //   > = {
// // //     guest: UserRound,

// // //     vendor: Building2,

// // //     maid: Sparkles,

// // //     delivery_person: Package,
// // //     delivery: Package,

// // //     visitor: UserCheck,

// // //     worker: HardHat,

// // //     security: ShieldCheck,

// // //     organiser: UsersRound,
// // //     organizer: UsersRound,

// // //     service_provider: BriefcaseBusiness,
// // //     service_provider_person: BriefcaseBusiness,
// // //   };

// // //   if (knownIcons[normalizedKey]) {
// // //     return knownIcons[normalizedKey];
// // //   }

// // //   return CATEGORY_ICONS[
// // //     index % CATEGORY_ICONS.length
// // //   ];
// // // };

// // // /* =========================================================
// // //    PERIOD LABEL
// // // ========================================================= */

// // // const getPeriodLabel = (period: Period) => {
// // //   switch (period) {
// // //     case "daily":
// // //       return "Today";

// // //     case "weekly":
// // //       return "This Week";

// // //     case "monthly":
// // //       return "This Month";

// // //     default:
// // //       return "Today";
// // //   }
// // // };

// // // /* =========================================================
// // //    COMPONENT
// // // ========================================================= */

// // // export default function StatsCards({
// // //   period,
// // // }: StatsCardsProps) {
// // //   const [data, setData] =
// // //     useState<CategoryCardsResponse>({
// // //       total: 0,
// // //       categories: [],
// // //     });

// // //   const [loading, setLoading] =
// // //     useState(true);

// // //   const [error, setError] =
// // //     useState("");

// // //   /* =======================================================
// // //      PERIOD LABEL
// // //   ======================================================= */

// // //   const periodLabel =
// // //     getPeriodLabel(period);

// // //   /* =======================================================
// // //      FETCH DATA
// // //   ======================================================= */

// // //   const fetchCategoryCards = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError("");

// // //       console.log(
// // //         "Fetching category cards for:",
// // //         period
// // //       );

// // //       const response = await axios.get(
// // //         `${API}/api/dashboard/category-cards`,
// // //         {
// // //           params: {
// // //             period: period,
// // //           },

// // //           withCredentials: true,
// // //         }
// // //       );

// // //       console.log(
// // //         "Category Cards API Response:",
// // //         response.data
// // //       );

// // //       if (response.data?.success) {
// // //         setData(
// // //           response.data.data
// // //         );
// // //       } else {
// // //         setError(
// // //           response.data?.message ||
// // //             "Unable to load dashboard statistics."
// // //         );
// // //       }
// // //     } catch (err) {
// // //       console.error(
// // //         "Failed to fetch category cards:",
// // //         err
// // //       );

// // //       setError(
// // //         "Unable to load dashboard statistics."
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   /* =======================================================
// // //      LOAD DATA

// // //      IMPORTANT:
// // //      Runs again whenever Daily / Weekly / Monthly changes.
// // //   ======================================================= */

// // //   useEffect(() => {
// // //     fetchCategoryCards();
// // //   }, [period]);

// // //   /* =======================================================
// // //      NORMALIZE DATA
// // //   ======================================================= */

// // //   const categories = useMemo(() => {
// // //     return (data.categories || []).map(
// // //       (category) => ({
// // //         ...category,

// // //         count: Number(
// // //           category.count || 0
// // //         ),
// // //       })
// // //     );
// // //   }, [data.categories]);

// // //   const total = Number(
// // //     data.total || 0
// // //   );

// // //   /* =======================================================
// // //      ERROR STATE
// // //   ======================================================= */

// // //   if (error && !loading) {
// // //     return (
// // //       <div className="w-full">
// // //         <div
// // //           className="
// // //             rounded-xl
// // //             border
// // //             border-red-200
// // //             bg-red-50
// // //             px-5
// // //             py-4
// // //           "
// // //         >
// // //           <div
// // //             className="
// // //               flex
// // //               items-center
// // //               justify-between
// // //               gap-4
// // //             "
// // //           >
// // //             <div>
// // //               <p
// // //                 className="
// // //                   text-sm
// // //                   font-semibold
// // //                   text-red-700
// // //                 "
// // //               >
// // //                 Dashboard statistics unavailable
// // //               </p>

// // //               <p
// // //                 className="
// // //                   mt-1
// // //                   text-xs
// // //                   text-red-500
// // //                 "
// // //               >
// // //                 {error}
// // //               </p>
// // //             </div>

// // //             <button
// // //               onClick={fetchCategoryCards}
// // //               className="
// // //                 flex
// // //                 items-center
// // //                 gap-2
// // //                 rounded-lg
// // //                 border
// // //                 border-red-200
// // //                 bg-white
// // //                 px-3
// // //                 py-2
// // //                 text-xs
// // //                 font-medium
// // //                 text-red-600
// // //                 transition
// // //                 hover:bg-red-50
// // //               "
// // //             >
// // //               <RefreshCw size={14} />

// // //               Retry
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   /* =======================================================
// // //      LOADING
// // //   ======================================================= */

// // //   if (loading) {
// // //     return (
// // //       <div className="w-full">
// // //         <div
// // //           className="
// // //             mb-5
// // //             flex
// // //             items-center
// // //             justify-between
// // //           "
// // //         >
// // //           <div>
// // //             <div
// // //               className="
// // //                 h-5
// // //                 w-40
// // //                 rounded
// // //                 bg-gray-200
// // //                 animate-pulse
// // //               "
// // //             />

// // //             <div
// // //               className="
// // //                 mt-2
// // //                 h-3
// // //                 w-56
// // //                 rounded
// // //                 bg-gray-200
// // //                 animate-pulse
// // //               "
// // //             />
// // //           </div>
// // //         </div>

// // //         <div
// // //           className="
// // //             grid
// // //             grid-cols-1
// // //             sm:grid-cols-2
// // //             lg:grid-cols-3
// // //             xl:grid-cols-4
// // //             2xl:grid-cols-5
// // //             gap-5
// // //           "
// // //         >
// // //           {[1, 2, 3, 4, 5].map(
// // //             (item) => (
// // //               <div
// // //                 key={item}
// // //                 className="
// // //                   h-[155px]
// // //                   rounded-2xl
// // //                   border
// // //                   border-gray-200
// // //                   bg-white
// // //                   animate-pulse
// // //                 "
// // //               />
// // //             )
// // //           )}
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   /* =======================================================
// // //      RENDER
// // //   ======================================================= */

// // //   return (
// // //     <div className="w-full">

// // //       {/* =================================================
// // //           SECTION HEADER
// // //       ================================================= */}

// // //       <div
// // //         className="
// // //           mb-5
// // //           flex
// // //           items-center
// // //           justify-between
// // //         "
// // //       >
// // //         <div>
// // //           <div
// // //             className="
// // //               flex
// // //               items-center
// // //               gap-2
// // //             "
// // //           >
// // //             <Activity
// // //               size={18}
// // //               className="text-blue-500"
// // //             />

// // //             <h2
// // //               className="
// // //                 text-base
// // //                 font-semibold
// // //                 text-gray-800
// // //               "
// // //             >
// // //               Visitor Overview
// // //             </h2>
// // //           </div>

// // //           <p
// // //             className="
// // //               mt-1
// // //               text-xs
// // //               text-gray-500
// // //             "
// // //           >
// // //             Visitor statistics for{" "}
// // //             {periodLabel.toLowerCase()}
// // //           </p>
// // //         </div>

// // //         {/* REFRESH */}

// // //         <button
// // //           onClick={fetchCategoryCards}
// // //           className="
// // //             flex
// // //             items-center
// // //             gap-2
// // //             rounded-lg
// // //             border
// // //             border-gray-200
// // //             bg-white
// // //             px-3
// // //             py-2
// // //             text-xs
// // //             font-medium
// // //             text-gray-600
// // //             shadow-sm
// // //             transition
// // //             hover:bg-gray-50
// // //             hover:text-gray-900
// // //           "
// // //           title="Refresh statistics"
// // //         >
// // //           <RefreshCw size={13} />

// // //           Refresh
// // //         </button>
// // //       </div>

// // //       {/* =================================================
// // //           CARDS
// // //       ================================================= */}

// // //       <div
// // //         className="
// // //           grid
// // //           grid-cols-1
// // //           sm:grid-cols-2
// // //           lg:grid-cols-3
// // //           xl:grid-cols-4
// // //           2xl:grid-cols-5
// // //           gap-5
// // //         "
// // //       >

// // //         {/* =================================================
// // //             TOTAL CARD
// // //         ================================================= */}

// // //         <div
// // //           className="
// // //             relative
// // //             overflow-hidden
// // //             rounded-2xl
// // //             border
// // //             border-blue-200
// // //             bg-gradient-to-br
// // //             from-blue-50
// // //             via-white
// // //             to-indigo-50
// // //             p-5
// // //             shadow-sm
// // //             transition-all
// // //             duration-200
// // //             hover:-translate-y-1
// // //             hover:shadow-md
// // //           "
// // //         >
// // //           <div
// // //             className="
// // //               flex
// // //               items-start
// // //               justify-between
// // //             "
// // //           >
// // //             <div>
// // //               <p
// // //                 className="
// // //                   text-xs
// // //                   font-semibold
// // //                   uppercase
// // //                   tracking-wide
// // //                   text-gray-500
// // //                 "
// // //               >
// // //                 Total
// // //               </p>

// // //               <h3
// // //                 className="
// // //                   mt-2
// // //                   text-3xl
// // //                   font-bold
// // //                   tracking-tight
// // //                   text-blue-700
// // //                 "
// // //               >
// // //                 {total.toLocaleString()}
// // //               </h3>

// // //               <p
// // //                 className="
// // //                   mt-1
// // //                   text-xs
// // //                   font-medium
// // //                   text-gray-500
// // //                 "
// // //               >
// // //                 All Categories · {periodLabel}
// // //               </p>
// // //             </div>

// // //             <div
// // //               className="
// // //                 flex
// // //                 h-11
// // //                 w-11
// // //                 items-center
// // //                 justify-center
// // //                 rounded-xl
// // //                 bg-blue-100
// // //                 text-blue-600
// // //               "
// // //             >
// // //               <Users
// // //                 size={21}
// // //                 strokeWidth={2}
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* PROGRESS */}

// // //           <div
// // //             className="
// // //               mt-5
// // //               h-1.5
// // //               overflow-hidden
// // //               rounded-full
// // //               bg-blue-100
// // //             "
// // //           >
// // //             <div
// // //               className="
// // //                 h-full
// // //                 w-full
// // //                 rounded-full
// // //                 bg-blue-500
// // //               "
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* =================================================
// // //             CATEGORY CARDS
// // //         ================================================= */}

// // //         {categories.map(
// // //           (category, index) => {
// // //             const Icon =
// // //               getCategoryIcon(
// // //                 category.key,
// // //                 index
// // //               );

// // //             const theme =
// // //               CARD_THEMES[
// // //                 index %
// // //                   CARD_THEMES.length
// // //               ];

// // //             const percentage =
// // //               total > 0
// // //                 ? Math.round(
// // //                     (category.count /
// // //                       total) *
// // //                       100
// // //                   )
// // //                 : 0;

// // //             return (
// // //               <div
// // //                 key={category.key}
// // //                 className={`
// // //                   relative
// // //                   overflow-hidden
// // //                   rounded-2xl
// // //                   border
// // //                   ${theme.border}
// // //                   ${theme.background}
// // //                   p-5
// // //                   shadow-sm
// // //                   transition-all
// // //                   duration-200
// // //                   hover:-translate-y-1
// // //                   hover:shadow-md
// // //                 `}
// // //               >

// // //                 {/* TOP */}

// // //                 <div
// // //                   className="
// // //                     flex
// // //                     items-start
// // //                     justify-between
// // //                     gap-4
// // //                   "
// // //                 >

// // //                   {/* TEXT */}

// // //                   <div className="min-w-0">

// // //                     <p
// // //                       className={`
// // //                         truncate
// // //                         text-xs
// // //                         font-semibold
// // //                         uppercase
// // //                         tracking-wide
// // //                         ${theme.labelColor}
// // //                       `}
// // //                       title={category.label}
// // //                     >
// // //                       {category.label}
// // //                     </p>

// // //                     <h3
// // //                       className={`
// // //                         mt-2
// // //                         text-3xl
// // //                         font-bold
// // //                         tracking-tight
// // //                         ${theme.numberColor}
// // //                       `}
// // //                     >
// // //                       {category.count.toLocaleString()}
// // //                     </h3>

// // //                     <p
// // //                       className="
// // //                         mt-1
// // //                         text-[11px]
// // //                         font-medium
// // //                         text-gray-500
// // //                       "
// // //                     >
// // //                       {periodLabel}
// // //                     </p>
// // //                   </div>

// // //                   {/* ICON */}

// // //                   <div
// // //                     className={`
// // //                       flex
// // //                       h-11
// // //                       w-11
// // //                       shrink-0
// // //                       items-center
// // //                       justify-center
// // //                       rounded-xl
// // //                       ${theme.iconBackground}
// // //                       ${theme.iconColor}
// // //                     `}
// // //                   >
// // //                     <Icon
// // //                       size={21}
// // //                       strokeWidth={2}
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 {/* SHARE */}

// // //                 <div
// // //                   className="
// // //                     mt-4
// // //                     flex
// // //                     items-center
// // //                     justify-between
// // //                   "
// // //                 >
// // //                   <span
// // //                     className="
// // //                       text-[11px]
// // //                       font-medium
// // //                       text-gray-500
// // //                     "
// // //                   >
// // //                     Share of visitors
// // //                   </span>

// // //                   <span
// // //                     className="
// // //                       text-[11px]
// // //                       font-semibold
// // //                       text-gray-600
// // //                     "
// // //                   >
// // //                     {percentage}%
// // //                   </span>
// // //                 </div>

// // //                 {/* PROGRESS */}

// // //                 <div
// // //                   className="
// // //                     mt-2
// // //                     h-1.5
// // //                     overflow-hidden
// // //                     rounded-full
// // //                     bg-white/80
// // //                   "
// // //                 >
// // //                   <div
// // //                     className={`
// // //                       h-full
// // //                       rounded-full
// // //                       transition-all
// // //                       duration-500
// // //                       ${theme.progress}
// // //                     `}
// // //                     style={{
// // //                       width: `${percentage}%`,
// // //                     }}
// // //                   />
// // //                 </div>

// // //               </div>
// // //             );
// // //           }
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, {
// //   useEffect,
// //   useMemo,
// //   useState,
// // } from "react";

// // import axios from "axios";

// // import {
// //   Users,
// //   UserRound,
// //   Building2,
// //   Sparkles,
// //   Package,
// //   UserCheck,
// //   HardHat,
// //   ShieldCheck,
// //   BriefcaseBusiness,
// //   UsersRound,
// //   RefreshCw,
// // } from "lucide-react";

// // const API = import.meta.env.VITE_BACKEND_URL;

// // type Period = "daily" | "weekly" | "monthly";

// // type StatsCardsProps = {
// //   period: Period;
// // };

// // type Category = {
// //   key: string;
// //   label: string;
// //   count: number;
// // };

// // type CategoryCardsResponse = {
// //   total: number;
// //   categories: Category[];
// // };

// // type StatCard = {
// //   key: string;
// //   label: string;
// //   value: number;
// //   icon: React.ElementType;
// //   iconBg: string;
// //   iconColor: string;
// // };

// // const getCategoryIcon = (
// //   key: string
// // ): React.ElementType => {
// //   const normalizedKey = key
// //     .toLowerCase()
// //     .replace(/[\s-]/g, "_");

// //   const icons: Record<string, React.ElementType> = {
// //     guest: UserRound,
// //     vendor: Building2,
// //     maid: Sparkles,
// //     delivery: Package,
// //     delivery_person: Package,
// //     visitor: UserCheck,
// //     worker: HardHat,
// //     security: ShieldCheck,
// //     organiser: UsersRound,
// //     organizer: UsersRound,
// //     service_provider: BriefcaseBusiness,
// //   };

// //   return icons[normalizedKey] || Users;
// // };

// // const getPeriodText = (period: Period) => {
// //   switch (period) {
// //     case "weekly":
// //       return "vs Last Week";

// //     case "monthly":
// //       return "vs Last Month";

// //     default:
// //       return "vs Yesterday";
// //   }
// // };

// // export default function StatsCards({
// //   period,
// // }: StatsCardsProps) {
// //   const [data, setData] =
// //     useState<CategoryCardsResponse>({
// //       total: 0,
// //       categories: [],
// //     });

// //   const [loading, setLoading] =
// //     useState(true);

// //   const [error, setError] =
// //     useState("");

// //   const fetchCategoryCards = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const response = await axios.get(
// //         `${API}/api/dashboard/category-cards`,
// //         {
// //           params: {
// //             period,
// //           },
// //           withCredentials: true,
// //         }
// //       );

// //       if (response.data?.success) {
// //         setData(response.data.data);
// //       } else {
// //         setError(
// //           response.data?.message ||
// //             "Unable to load dashboard statistics."
// //         );
// //       }
// //     } catch (err) {
// //       console.error(
// //         "Failed to fetch category cards:",
// //         err
// //       );

// //       setError(
// //         "Unable to load dashboard statistics."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategoryCards();
// //   }, [period]);

// //   const categories = useMemo(() => {
// //     return (data.categories || []).map(
// //       (category) => ({
// //         ...category,
// //         count: Number(category.count || 0),
// //       })
// //     );
// //   }, [data.categories]);

// //   /*
// //    * We display the most important categories
// //    * in the same compact style as the reference.
// //    *
// //    * All values still come from your real API.
// //    */

// //   const getCount = (...keys: string[]) => {
// //     const category = categories.find((item) =>
// //       keys.includes(
// //         item.key.toLowerCase().replace(/[\s-]/g, "_")
// //       )
// //     );

// //     return category?.count || 0;
// //   };

// //   const vendorMaid =
// //     getCount("vendor") +
// //     getCount("maid");

// //   const cards: StatCard[] = [
// //     {
// //       key: "guests",
// //       label: "Guests",
// //       value: getCount("guest"),
// //       icon: UserRound,
// //       iconBg: "bg-purple-100",
// //       iconColor: "text-purple-600",
// //     },

// //     {
// //       key: "visitors",
// //       label: "Visitors",
// //       value: getCount("visitor"),
// //       icon: UserCheck,
// //       iconBg: "bg-orange-100",
// //       iconColor: "text-orange-600",
// //     },

// //     {
// //       key: "vendors-maid",
// //       label: "Vendors / Maid",
// //       value: vendorMaid,
// //       icon: Building2,
// //       iconBg: "bg-cyan-100",
// //       iconColor: "text-cyan-600",
// //     },

// //     {
// //       key: "delivery",
// //       label: "Delivery",
// //       value: getCount(
// //         "delivery",
// //         "delivery_person"
// //       ),
// //       icon: Package,
// //       iconBg: "bg-green-100",
// //       iconColor: "text-green-600",
// //     },

// //     {
// //       key: "total",
// //       label: "Total Entries",
// //       value: Number(data.total || 0),
// //       icon: Users,
// //       iconBg: "bg-pink-100",
// //       iconColor: "text-pink-600",
// //     },
// //   ];

// //   if (error && !loading) {
// //     return (
// //       <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
// //         <div className="flex items-center justify-between gap-4">
// //           <div>
// //             <p className="text-sm font-semibold text-red-700">
// //               Dashboard statistics unavailable
// //             </p>

// //             <p className="mt-1 text-xs text-red-500">
// //               {error}
// //             </p>
// //           </div>

// //           <button
// //             onClick={fetchCategoryCards}
// //             className="
// //               flex items-center gap-2
// //               rounded-lg
// //               border border-red-200
// //               bg-white
// //               px-3 py-2
// //               text-xs font-medium
// //               text-red-600
// //               hover:bg-red-50
// //             "
// //           >
// //             <RefreshCw size={14} />
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-full">

// //       {/* Cards */}

// //       <div
// //         className="
// //           grid
// //           grid-cols-1
// //           sm:grid-cols-2
// //           lg:grid-cols-3
// //           xl:grid-cols-5
// //           gap-4
// //         "
// //       >
// //         {cards.map((card) => {
// //           const Icon = card.icon;

// //           return (
// //             <div
// //               key={card.key}
// //               className="
// //                 flex
// //                 min-h-[100px]
// //                 items-center
// //                 gap-3
// //                 rounded-xl
// //                 border
// //                 border-gray-200
// //                 bg-white
// //                 px-3
// //                 py-3
// //                 shadow-sm
// //                 transition-all
// //                 duration-200
// //                 hover:-translate-y-0.5
// //                 hover:shadow-md
// //               "
// //             >
// //               {/* Icon */}

// //               <div
// //                 className={`
// //                   flex
// //                   h-12
// //                   w-12
// //                   shrink-0
// //                   items-center
// //                   justify-center
// //                   rounded-xl
// //                   ${card.iconBg}
// //                   ${card.iconColor}
// //                 `}
// //               >
// //                 <Icon
// //                   size={24}
// //                   strokeWidth={2}
// //                 />
// //               </div>

// //               {/* Content */}

// //               <div className="min-w-0">

// //                 <p
// //                   className="
// //                     truncate
// //                     text-sm
// //                     font-medium
// //                     text-gray-600
// //                   "
// //                   title={card.label}
// //                 >
// //                   {card.label}
// //                 </p>

// //                 <p
// //                   className="
// //                     mt-1
// //                     text-2xl
// //                     font-semibold
// //                     tracking-tight
// //                     text-gray-900
// //                   "
// //                 >
// //                   {loading
// //                     ? "..."
// //                     : card.value.toLocaleString()}
// //                 </p>

// //                 {/* Change */}

// //                 <div className="mt-1 flex items-center gap-1">
// //                   <span className="text-xs font-medium text-green-600">
// //                     ↑
// //                   </span>

// //                   <span className="text-xs font-medium text-green-600">
// //                     Current
// //                   </span>
// //                 </div>

// //                 <p className="text-[11px] text-gray-400">
// //                   {getPeriodText(period)}
// //                 </p>

// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
    
// //   );
// // }
// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import axios from "axios";

// import {
//   Users,
//   UserRound,
//   Building2,
//   Sparkles,
//   Package,
//   UserCheck,
//   HardHat,
//   ShieldCheck,
//   BriefcaseBusiness,
//   UsersRound,
//   RefreshCw,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// type Period = "daily" | "weekly" | "monthly";

// type StatsCardsProps = {
//   period: Period;
// };

// type Category = {
//   key: string;
//   label: string;
//   count: number;
// };

// type CategoryCardsResponse = {
//   total: number;
//   categories: Category[];
// };

// type StatCard = {
//   key: string;
//   label: string;
//   value: number;
//   icon: React.ElementType;
//   iconBg: string;
//   iconColor: string;
// };

// /* =========================================================
//    CATEGORY ICON
// ========================================================= */

// const getCategoryIcon = (
//   key: string
// ): React.ElementType => {
//   const normalizedKey = key
//     .toLowerCase()
//     .replace(/[\s-]/g, "_");

//   const icons: Record<string, React.ElementType> = {
//     guest: UserRound,
//     vendor: Building2,
//     maid: Sparkles,
//     delivery: Package,
//     delivery_person: Package,
//     visitor: UserCheck,
//     worker: HardHat,
//     security: ShieldCheck,
//     organiser: UsersRound,
//     organizer: UsersRound,
//     service_provider: BriefcaseBusiness,
//   };

//   return icons[normalizedKey] || Users;
// };


// const getPeriodText = (period: Period) => {
//   switch (period) {
//     case "weekly":
//       return "vs Last Week";

//     case "monthly":
//       return "vs Last Month";

//     default:
//       return "vs Yesterday";
//   }
// };

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function StatsCards({
//   period,
// }: StatsCardsProps) {
//   const [data, setData] =
//     useState<CategoryCardsResponse>({
//       total: 0,
//       categories: [],
//     });

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

 
//   const fetchCategoryCards = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.get(
//         `${API}/api/admin/dashboard/category-cards`,
//         {
//           params: {
//             period,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.data?.success) {
//         setData(response.data.data);
//       } else {
//         setError(
//           response.data?.message ||
//             "Unable to load dashboard statistics."
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Failed to fetch category cards:",
//         err
//       );

//       setError(
//         "Unable to load dashboard statistics."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      LOAD DATA

//      Runs whenever Daily / Weekly / Monthly changes.
//   ======================================================= */

//   useEffect(() => {
//     fetchCategoryCards();
//   }, [period]);

//   /* =======================================================
//      NORMALIZE DATA
//   ======================================================= */

//   const categories = useMemo(() => {
//     return (data.categories || []).map(
//       (category) => ({
//         ...category,
//         count: Number(
//           category.count || 0
//         ),
//       })
//     );
//   }, [data.categories]);

//   const total = Number(
//     data.total || 0
//   );

//   /* =======================================================
//      GET CATEGORY COUNT
//   ======================================================= */

//   const getCount = (...keys: string[]) => {
//     const category = categories.find(
//       (item) =>
//         keys.includes(
//           item.key
//             .toLowerCase()
//             .replace(/[\s-]/g, "_")
//         )
//     );

//     return category?.count || 0;
//   };

//   /* =======================================================
//      VENDOR + MAID
//   ======================================================= */

//   const vendorMaid =
//     getCount("vendor") +
//     getCount("maid");

//   /* =======================================================
//      CARDS

//      These remain based on the real API data.
//   ======================================================= */

//   const cards: StatCard[] = [
//     {
//       key: "guests",
//       label: "Guests",
//       value: getCount("guest"),
//       icon: UserRound,
//       iconBg: "bg-purple-100",
//       iconColor: "text-purple-600",
//     },

//     {
//       key: "visitors",
//       label: "Visitors",
//       value: getCount("visitor"),
//       icon: UserCheck,
//       iconBg: "bg-orange-100",
//       iconColor: "text-orange-600",
//     },

//     {
//       key: "vendors-maid",
//       label: "Vendors / Maid",
//       value: vendorMaid,
//       icon: Building2,
//       iconBg: "bg-cyan-100",
//       iconColor: "text-cyan-600",
//     },

//     {
//       key: "delivery",
//       label: "Delivery",
//       value: getCount(
//         "delivery",
//         "delivery_person"
//       ),
//       icon: Package,
//       iconBg: "bg-green-100",
//       iconColor: "text-green-600",
//     },

//     {
//       key: "total",
//       label: "Total Entries",
//       value: total,
//       icon: Users,
//       iconBg: "bg-pink-100",
//       iconColor: "text-pink-600",
//     },
//   ];

//   /* =======================================================
//      ERROR STATE
//   ======================================================= */

//   if (error && !loading) {
//     return (
//       <div className="w-full rounded-xl border border-red-200 bg-red-50 px-5 py-4">
//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <p className="text-sm font-semibold text-red-700">
//               Dashboard statistics unavailable
//             </p>

//             <p className="mt-1 text-xs text-red-500">
//               {error}
//             </p>
//           </div>

//           <button
//             onClick={fetchCategoryCards}
//             className="
//               flex
//               items-center
//               gap-2
//               rounded-lg
//               border
//               border-red-200
//               bg-white
//               px-3
//               py-2
//               text-xs
//               font-medium
//               text-red-600
//               transition
//               hover:bg-red-50
//             "
//           >
//             <RefreshCw size={14} />

//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <div className="w-full">

//       {/* =================================================
//           CARDS - HORIZONTAL SCROLL
//       ================================================= */}

//       <div className="w-full overflow-x-auto pb-3">
//         <div className="flex min-w-max gap-4">

//           {cards.map((card) => {
//             const Icon = card.icon;

//             return (
//               <div
//                 key={card.key}
//                 className="
//                   flex
//                   min-h-[100px]
//                   w-[220px]
//                   shrink-0
//                   items-center
//                   gap-3
//                   rounded-xl
//                   border
//                   border-gray-200
//                   bg-white
//                   px-3
//                   py-3
//                   shadow-sm
//                   transition-all
//                   duration-200
//                   hover:-translate-y-0.5
//                   hover:shadow-md
//                 "
//               >

//                 {/* =========================================
//                     ICON
//                 ========================================== */}

//                 <div
//                   className={`
//                     flex
//                     h-12
//                     w-12
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-xl
//                     ${card.iconBg}
//                     ${card.iconColor}
//                   `}
//                 >
//                   <Icon
//                     size={24}
//                     strokeWidth={2}
//                   />
//                 </div>

//                 {/* =========================================
//                     CONTENT
//                 ========================================== */}

//                 <div className="min-w-0">

//                   <p
//                     className="
//                       truncate
//                       text-sm
//                       font-medium
//                       text-gray-600
//                     "
//                     title={card.label}
//                   >
//                     {card.label}
//                   </p>

//                   <p
//                     className="
//                       mt-1
//                       text-2xl
//                       font-semibold
//                       tracking-tight
//                       text-gray-900
//                     "
//                   >
//                     {loading
//                       ? "..."
//                       : card.value.toLocaleString()}
//                   </p>

//                   {/* Change */}

//                   <div className="mt-1 flex items-center gap-1">
//                     <span className="text-xs font-medium text-green-600">
//                       ↑
//                     </span>

//                     <span className="text-xs font-medium text-green-600">
//                       Current
//                     </span>
//                   </div>

//                   <p className="text-[11px] text-gray-400">
//                     {getPeriodText(period)}
//                   </p>

//                 </div>

//               </div>
//             );
//           })}

//         </div>
//       </div>

//     </div>
//   );
// }
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Users,
  UserRound,
  Building2,
  Sparkles,
  Package,
  UserCheck,
  HardHat,
  ShieldCheck,
  BriefcaseBusiness,
  UsersRound,
  UserCog,
  ContactRound,
  CircleUserRound,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

/* =========================================================
   TYPES
========================================================= */

type Period =
  | "daily"
  | "weekly"
  | "monthly";

type StatsCardsProps = {
  period: Period;
};

type Category = {
  key: string;
  label: string;
  count: number;
};

type CategoryCardsResponse = {
  period?: Period;
  total: number;
  categories: Category[];
};

type CardTheme = {
  card: string;
  icon: string;
  number: string;
};

/* =========================================================
   CARD THEMES

   These are only visual styles.
   Categories themselves remain completely dynamic.
========================================================= */

const CARD_THEMES: CardTheme[] = [
  {
    card: "bg-white border-gray-200",
    icon: "bg-purple-100 text-purple-600",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-orange-100 text-orange-600",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-cyan-100 text-cyan-600",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-green-100 text-green-600",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-pink-100 text-pink-600",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-blue-100 text-blue-600",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-yellow-100 text-yellow-700",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-red-100 text-red-600",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-violet-100 text-violet-600",
    number: "text-gray-900",
  },

  {
    card: "bg-white border-gray-200",
    icon: "bg-teal-100 text-teal-600",
    number: "text-gray-900",
  },
];

/* =========================================================
   FALLBACK ICONS

   Known categories get meaningful icons.
   New categories automatically receive an icon.
========================================================= */

const CATEGORY_ICONS: React.ElementType[] = [
  UserRound,
  Building2,
  Sparkles,
  Package,
  UserCheck,
  HardHat,
  ShieldCheck,
  BriefcaseBusiness,
  UsersRound,
  UserCog,
  ContactRound,
  CircleUserRound,
  BadgeCheck,
];

/* =========================================================
   NORMALIZE CATEGORY KEY
========================================================= */

const normalizeKey = (
  value: string
): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, "_");
};

/* =========================================================
   CATEGORY ICON

   Important:
   This does NOT decide which categories exist.
   It only decides which icon to use.
========================================================= */

const getCategoryIcon = (
  key: string,
  index: number
): React.ElementType => {
  const normalizedKey =
    normalizeKey(key);

  const knownIcons: Record<
    string,
    React.ElementType
  > = {
    guest: UserRound,

    guests: UserRound,

    vendor: Building2,

    maid: Sparkles,

    delivery: Package,

    delivery_person: Package,

    visitor: UserCheck,

    visitors: UserCheck,

    worker: HardHat,

    security: ShieldCheck,

    organiser: UsersRound,

    organizer: UsersRound,

    service_provider:
      BriefcaseBusiness,

    serviceprovider:
      BriefcaseBusiness,
  };

  if (
    knownIcons[normalizedKey]
  ) {
    return knownIcons[
      normalizedKey
    ];
  }

  /*
   * Completely new category.
   * Automatically assign an icon.
   */
  return CATEGORY_ICONS[
    index % CATEGORY_ICONS.length
  ];
};

/* =========================================================
   PERIOD TEXT
========================================================= */

const getPeriodText = (
  period: Period
): string => {
  switch (period) {
    case "daily":
      return "Today";

    case "weekly":
      return "This Week";

    case "monthly":
      return "This Month";

    default:
      return "Today";
  }
};

/* =========================================================
   COMPONENT
========================================================= */

export default function StatsCards({
  period,
}: StatsCardsProps) {

  const [data, setData] =
    useState<CategoryCardsResponse>({
      total: 0,
      categories: [],
    });

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string>("");

  /* =======================================================
     FETCH CATEGORY CARDS
  ======================================================= */

  const fetchCategoryCards =
    async () => {

      try {

        setLoading(true);
        setError("");

        console.log(
          "================================="
        );

        console.log(
          "Fetching Category Cards"
        );

        console.log(
          "Period:",
          period
        );

        console.log(
          "================================="
        );

        /*
         * IMPORTANT:
         *
         * Your backend receives:
         *
         * ?period=daily
         * ?period=weekly
         * ?period=monthly
         */

        const response =
          await axios.get(
            `${API}/api/admin/dashboard/category-cards`,
            {
              params: {
                period,
              },

              withCredentials: true,
            }
          );

        console.log(
          "Category Cards API Response:",
          response.data
        );

        if (
          response.data?.success
        ) {

          const apiData =
            response.data.data;

          console.log(
            "Categories received:",
            apiData?.categories
          );

          console.log(
            "Total received:",
            apiData?.total
          );

          setData({
            total:
              Number(
                apiData?.total || 0
              ),

            categories:
              Array.isArray(
                apiData?.categories
              )
                ? apiData.categories
                : [],
          });

        } else {

          setError(
            response.data?.message ||
              "Unable to load dashboard statistics."
          );
        }

      } catch (err) {

        console.error(
          "Failed to fetch category cards:",
          err
        );

        if (
          axios.isAxiosError(err)
        ) {

          console.error(
            "API error response:",
            err.response?.data
          );

          setError(
            err.response?.data?.message ||
              "Unable to load dashboard statistics."
          );

        } else {

          setError(
            "Unable to load dashboard statistics."
          );
        }

      } finally {

        setLoading(false);
      }
    };

  /* =======================================================
     LOAD DATA

     Runs:
       - first time
       - whenever Daily/Weekly/Monthly changes
  ======================================================= */

  useEffect(() => {

    fetchCategoryCards();

  }, [period]);

  /* =======================================================
     NORMALIZE API DATA
  ======================================================= */

  const categories =
    useMemo(() => {

      return (
        data.categories || []
      )
        .filter(
          (category) =>
            category &&
            category.key
        )
        .map(
          (category) => ({
            ...category,

            key: normalizeKey(
              category.key
            ),

            label:
              category.label?.trim() ||
              category.key,

            count:
              Number(
                category.count || 0
              ),
          })
        );

    }, [data.categories]);

  /* =======================================================
     TOTAL
  ======================================================= */

  const total =
    Number(data.total || 0);

  /* =======================================================
     CREATE DYNAMIC CARDS

     THIS IS THE IMPORTANT FIX.

     We are NOT creating:
       Guest
       Visitor
       Vendor
       Maid
       Delivery

     manually anymore.

     Instead:

       API categories
              ↓
       map()
              ↓
       one card per category
========================================================= */

  const cards = useMemo(() => {

    const categoryCards =
      categories.map(
        (category, index) => {

          const theme =
            CARD_THEMES[
              index %
                CARD_THEMES.length
            ];

          const Icon =
            getCategoryIcon(
              category.key,
              index
            );

          return {
            key: category.key,

            label: category.label,

            count:
              Number(
                category.count || 0
              ),

            icon: Icon,

            theme,

            subtitle:
              getPeriodText(period),
          };
        }
      );

    /*
     * Total Entries is kept at the end.
     */

    return [
      ...categoryCards,

      {
        key: "__total__",

        label: "Total Entries",

        count: total,

        icon: Users,

        theme: {
          card:
            "bg-white border-gray-200",

          icon:
            "bg-pink-100 text-pink-600",

          number:
            "text-gray-900",
        },

        subtitle:
          getPeriodText(period),
      },
    ];

  }, [
    categories,
    total,
    period,
  ]);

  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (
    error &&
    !loading
  ) {

    return (
      <div className="w-full">

        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-red-700
                "
              >
                Dashboard statistics unavailable
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-red-500
                "
              >
                {error}
              </p>

            </div>

            <button
              onClick={
                fetchCategoryCards
              }
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-red-200
                bg-white
                px-3
                py-2
                text-xs
                font-medium
                text-red-600
                transition
                hover:bg-red-50
              "
            >

              <RefreshCw
                size={14}
              />

              Retry

            </button>

          </div>

        </div>

      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="w-full">

      {/* =================================================
          CARDS - HORIZONTAL SCROLL

          This is useful because the number of categories
          can change dynamically.
      ================================================= */}

      <div
        className="
          w-full
          overflow-x-auto
          pb-3
        "
      >

        <div
          className="
            flex
            min-w-max
            gap-4
          "
        >

          {cards.map(
            (card) => {

              const Icon =
                card.icon;

              return (
                <div
                  key={card.key}
                  className={`
                    flex
                    min-h-[100px]
                    w-[220px]
                    shrink-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-3
                    py-3
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-md
                    ${card.theme.card}
                  `}
                >

                  {/* ====================================
                      ICON
                  ==================================== */}

                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${card.theme.icon}
                    `}
                  >

                    <Icon
                      size={24}
                      strokeWidth={2}
                    />

                  </div>

                  {/* ====================================
                      CONTENT
                  ==================================== */}

                  <div
                    className="
                      min-w-0
                    "
                  >

                    <p
                      className="
                        truncate
                        text-sm
                        font-medium
                        text-gray-600
                      "
                      title={
                        card.label
                      }
                    >
                      {card.label}
                    </p>

                    <p
                      className={`
                        mt-1
                        text-2xl
                        font-semibold
                        tracking-tight
                        ${card.theme.number}
                      `}
                    >

                      {loading
                        ? "..."
                        : card.count.toLocaleString()}

                    </p>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-gray-400
                      "
                    >
                      {card.subtitle}
                    </p>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}