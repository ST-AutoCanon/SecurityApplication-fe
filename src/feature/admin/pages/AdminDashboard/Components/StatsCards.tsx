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
//   UserCog,
//   ContactRound,
//   CircleUserRound,
//   BadgeCheck,
//   RefreshCw,
// } from "lucide-react";

// const API = import.meta.env.VITE_BACKEND_URL;

// /* =========================================================
//    TYPES
// ========================================================= */

// type Period =
//   | "daily"
//   | "weekly"
//   | "monthly";

// type StatsCardsProps = {
//   period: Period;
// };

// type Category = {
//   key: string;
//   label: string;
//   count: number;
// };

// type CategoryCardsResponse = {
//   period?: Period;
//   total: number;
//   categories: Category[];
// };

// type CardTheme = {
//   card: string;
//   icon: string;
//   number: string;
// };

// /* =========================================================
//    CARD THEMES

//    Categories remain completely dynamic.
//    These themes are only used for visual styling.
// ========================================================= */

// const CARD_THEMES: CardTheme[] = [
//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-purple-100 text-purple-600",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-orange-100 text-orange-600",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-cyan-100 text-cyan-600",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-green-100 text-green-600",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-pink-100 text-pink-600",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-blue-100 text-blue-600",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-yellow-100 text-yellow-700",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-red-100 text-red-600",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-violet-100 text-violet-600",
//     number: "text-gray-900",
//   },

//   {
//     card: "bg-white border-gray-200",
//     icon: "bg-teal-100 text-teal-600",
//     number: "text-gray-900",
//   },
// ];

// /* =========================================================
//    FALLBACK ICONS

//    Known categories receive meaningful icons.
//    New categories automatically receive an icon.
// ========================================================= */

// const CATEGORY_ICONS: React.ElementType[] = [
//   UserRound,
//   Building2,
//   Sparkles,
//   Package,
//   UserCheck,
//   HardHat,
//   ShieldCheck,
//   BriefcaseBusiness,
//   UsersRound,
//   UserCog,
//   ContactRound,
//   CircleUserRound,
//   BadgeCheck,
// ];

// /* =========================================================
//    NORMALIZE CATEGORY KEY
// ========================================================= */

// const normalizeKey = (
//   value: string
// ): string => {
//   return value
//     .toLowerCase()
//     .trim()
//     .replace(/[\s-]+/g, "_");
// };

// /* =========================================================
//    CATEGORY ICON

//    This function does NOT decide which categories exist.
//    It only decides which icon should be displayed.
// ========================================================= */

// const getCategoryIcon = (
//   key: string,
//   index: number
// ): React.ElementType => {
//   const normalizedKey =
//     normalizeKey(key);

//   const knownIcons: Record<
//     string,
//     React.ElementType
//   > = {
//     guest: UserRound,
//     guests: UserRound,

//     vendor: Building2,

//     maid: Sparkles,

//     delivery: Package,
//     delivery_person: Package,

//     visitor: UserCheck,
//     visitors: UserCheck,

//     worker: HardHat,

//     security: ShieldCheck,

//     organiser: UsersRound,
//     organizer: UsersRound,

//     service_provider:
//       BriefcaseBusiness,

//     serviceprovider:
//       BriefcaseBusiness,
//   };

//   if (
//     knownIcons[normalizedKey]
//   ) {
//     return knownIcons[
//       normalizedKey
//     ];
//   }

//   return CATEGORY_ICONS[
//     index % CATEGORY_ICONS.length
//   ];
// };

// /* =========================================================
//    PERIOD TEXT
// ========================================================= */

// const getPeriodText = (
//   period: Period
// ): string => {
//   switch (period) {
//     case "daily":
//       return "Today";

//     case "weekly":
//       return "This Week";

//     case "monthly":
//       return "This Month";

//     default:
//       return "Today";
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
//     useState<boolean>(true);

//   const [error, setError] =
//     useState<string>("");

//   /* =======================================================
//      FETCH CATEGORY CARDS
//   ======================================================= */

//   const fetchCategoryCards =
//     async () => {
//       try {
//         setLoading(true);
//         setError("");

//         console.log(
//           "================================="
//         );

//         console.log(
//           "Fetching Category Cards"
//         );

//         console.log(
//           "Period:",
//           period
//         );

//         console.log(
//           "================================="
//         );

//         const response =
//           await axios.get(
//             `${API}/api/admin/dashboard/category-cards`,
//             {
//               params: {
//                 period,
//               },

//               withCredentials: true,
//             }
//           );

//         console.log(
//           "Category Cards API Response:",
//           response.data
//         );

//         if (
//           response.data?.success
//         ) {
//           const apiData =
//             response.data.data;

//           console.log(
//             "Categories received:",
//             apiData?.categories
//           );

//           console.log(
//             "Total received:",
//             apiData?.total
//           );

//           setData({
//             total: Number(
//               apiData?.total || 0
//             ),

//             categories:
//               Array.isArray(
//                 apiData?.categories
//               )
//                 ? apiData.categories
//                 : [],
//           });
//         } else {
//           setError(
//             response.data?.message ||
//               "Unable to load dashboard statistics."
//           );
//         }
//       } catch (err) {
//         console.error(
//           "Failed to fetch category cards:",
//           err
//         );

//         if (
//           axios.isAxiosError(err)
//         ) {
//           console.error(
//             "API error response:",
//             err.response?.data
//           );

//           setError(
//             err.response?.data?.message ||
//               "Unable to load dashboard statistics."
//           );
//         } else {
//           setError(
//             "Unable to load dashboard statistics."
//           );
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//   /* =======================================================
//      LOAD DATA

//      Runs:
//        - First time
//        - Whenever Daily/Weekly/Monthly changes
//   ======================================================= */

//   useEffect(() => {
//     fetchCategoryCards();
//   }, [period]);

//   /* =======================================================
//      NORMALIZE API DATA
//   ======================================================= */

//   const categories =
//     useMemo(() => {
//       return (
//         data.categories || []
//       )
//         .filter(
//           (category) =>
//             category &&
//             category.key
//         )
//         .map(
//           (category) => ({
//             ...category,

//             key: normalizeKey(
//               category.key
//             ),

//             label:
//               category.label?.trim() ||
//               category.key,

//             count: Number(
//               category.count || 0
//             ),
//           })
//         );
//     }, [data.categories]);

//   /* =======================================================
//      TOTAL
//   ======================================================= */

//   const total =
//     Number(data.total || 0);

//   /* =======================================================
//      CREATE DYNAMIC CARDS

//      Every category returned by the API
//      becomes one card.

//      Total Entries is added at the end.
//   ======================================================= */

//   const cards = useMemo(() => {
//     const categoryCards =
//       categories.map(
//         (category, index) => {
//           const theme =
//             CARD_THEMES[
//               index %
//                 CARD_THEMES.length
//             ];

//           const Icon =
//             getCategoryIcon(
//               category.key,
//               index
//             );

//           return {
//             key: category.key,

//             label: category.label,

//             count: Number(
//               category.count || 0
//             ),

//             icon: Icon,

//             theme,

//             subtitle:
//               getPeriodText(period),
//           };
//         }
//       );

//     return [
//       ...categoryCards,

//       {
//         key: "__total__",

//         label: "Total Entries",

//         count: total,

//         icon: Users,

//         theme: {
//           card:
//             "bg-white border-gray-200",

//           icon:
//             "bg-pink-100 text-pink-600",

//           number:
//             "text-gray-900",
//         },

//         subtitle:
//           getPeriodText(period),
//       },
//     ];
//   }, [
//     categories,
//     total,
//     period,
//   ]);

//   /* =======================================================
//      ERROR STATE
//   ======================================================= */

//   if (
//     error &&
//     !loading
//   ) {
//     return (
//       <div className="w-full">
//         <div
//           className="
//             rounded-xl
//             border
//             border-red-200
//             bg-red-50
//             px-5
//             py-4
//           "
//         >
//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               gap-4
//             "
//           >
//             <div>
//               <p
//                 className="
//                   text-sm
//                   font-semibold
//                   text-red-700
//                 "
//               >
//                 Dashboard statistics unavailable
//               </p>

//               <p
//                 className="
//                   mt-1
//                   text-xs
//                   text-red-500
//                 "
//               >
//                 {error}
//               </p>
//             </div>

//             <button
//               onClick={
//                 fetchCategoryCards
//               }
//               className="
//                 flex
//                 items-center
//                 gap-2
//                 rounded-lg
//                 border
//                 border-red-200
//                 bg-white
//                 px-3
//                 py-2
//                 text-xs
//                 font-medium
//                 text-red-600
//                 transition
//                 hover:bg-red-50
//               "
//             >
//               <RefreshCw
//                 size={14}
//               />

//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* =======================================================
//      RENDER
     
//      IMPORTANT CHANGE:
     
//      Removed:
//        overflow-x-auto
//        flex
//        min-w-max
//        fixed card width
//        shrink-0
     
//      Added:
//        CSS GRID
     
//      Desktop:
//        6 cards per row
     
//      Smaller screens:
//        1 / 2 / 3 / 4 / 6
//        cards depending on screen width.
     
//      Therefore:
//        6 cards → one row
//        7 cards → 6 + 1
//        12 cards → 6 + 6
//        13 cards → 6 + 6 + 1
//   ======================================================= */

//   return (
//     <div className="w-full">
//       <div
//         className="
//           grid
//           grid-cols-1
//           sm:grid-cols-2
//           md:grid-cols-3
//           lg:grid-cols-4
//           xl:grid-cols-6
//           gap-4
//           w-full
//         "
//       >
//         {cards.map((card) => {
//           const Icon =
//             card.icon;

//           return (
//             <div
//               key={card.key}
//               className={`
//                 flex
//                 min-h-[100px]
//                 w-full
//                 items-center
//                 gap-3
//                 rounded-xl
//                 border
//                 px-3
//                 py-3
//                 shadow-sm
//                 transition-all
//                 duration-200
//                 hover:-translate-y-0.5
//                 hover:shadow-md
//                 ${card.theme.card}
//               `}
//             >
//               {/* ====================================
//                   ICON
//               ==================================== */}

//               <div
//                 className={`
//                   flex
//                   h-12
//                   w-12
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-xl
//                   ${card.theme.icon}
//                 `}
//               >
//                 <Icon
//                   size={24}
//                   strokeWidth={2}
//                 />
//               </div>

//               {/* ====================================
//                   CONTENT
//               ==================================== */}

//               <div
//                 className="
//                   min-w-0
//                   flex-1
//                 "
//               >
//                 <p
//                   className="
//                     truncate
//                     text-sm
//                     font-medium
//                     text-gray-600
//                   "
//                   title={card.label}
//                 >
//                   {card.label}
//                 </p>

//                 <p
//                   className={`
//                     mt-1
//                     text-2xl
//                     font-semibold
//                     tracking-tight
//                     ${card.theme.number}
//                   `}
//                 >
//                   {loading
//                     ? "..."
//                     : card.count.toLocaleString()}
//                 </p>

//                 <p
//                   className="
//                     mt-1
//                     text-[11px]
//                     text-gray-400
//                   "
//                 >
//                   {card.subtitle}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
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

// type Period =
//   | "daily"
//   | "weekly"
//   | "monthly";
type Period =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

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

   Categories remain completely dynamic.
   These themes are only used for visual styling.
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

   Known categories receive meaningful icons.
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

   This function does NOT decide which categories exist.
   It only decides which icon should be displayed.
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

      case "yearly":
      return "This Year";

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
            total: Number(
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
       - First time
       - Whenever Daily/Weekly/Monthly changes
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

            count: Number(
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

     Every category returned by the API
     becomes one card.

     Total Entries is added at the end.
  ======================================================= */

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

            count: Number(
              category.count || 0
            ),

            icon: Icon,

            theme,

            subtitle:
              getPeriodText(period),
          };
        }
      );

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
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold text-slate-900">
            Entry Statistics Overview
          </h2>
        </div>

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

     IMPORTANT CHANGE:

     Removed:
       overflow-x-auto
       flex
       min-w-max
       fixed card width
       shrink-0

     Added:
       CSS GRID

     Desktop:
       6 cards per row

     Smaller screens:
       1 / 2 / 3 / 4 / 6
       cards depending on screen width.

     Therefore:
       6 cards → one row
       7 cards → 6 + 1
       12 cards → 6 + 6
       13 cards → 6 + 6 + 1
  ======================================================= */

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-slate-900">
          Entry Statistics Overview
        </h2>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-6
          gap-4
          w-full
        "
      >
        {cards.map((card) => {
          const Icon =
            card.icon;

          return (
            <div
              key={card.key}
              className={`
                flex
                min-h-[100px]
                w-full
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
                  flex-1
                "
              >
                <p
                  className="
                    truncate
                    text-sm
                    font-medium
                    text-gray-600
                  "
                  title={card.label}
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
        })}
      </div>
    </div>
  );
}