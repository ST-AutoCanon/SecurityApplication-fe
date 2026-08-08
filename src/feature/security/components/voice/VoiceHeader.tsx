// import React from "react";
// import { Mic, Sparkles } from "lucide-react";

// interface VoiceHeaderProps {
//   organisationName?: string;
//   moduleName?: string;
//   listening: boolean;
// }

// const VoiceHeader: React.FC<VoiceHeaderProps> = ({
//   organisationName,
//   moduleName,
//   listening,
// }) => {
//   return (
//     <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 md:p-8 text-white shadow-2xl">
//       {/* Background Glow */}
//       <div className="absolute inset-0 opacity-10 pointer-events-none">
//         <div className="absolute -left-16 -top-16 h-48 w-48 sm:h-56 sm:w-56 rounded-full bg-cyan-400 blur-3xl" />
//         <div className="absolute bottom-0 right-0 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-blue-500 blur-3xl" />
//       </div>

//       <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//         {/* LEFT */}
//         <div className="min-w-0 flex-1">
//           <div className="flex items-start sm:items-center gap-3 sm:gap-4">
//             <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-cyan-500 shadow-lg shrink-0">
//               <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
//             </div>

//             <div className="min-w-0">
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide break-words">
//                 AI Voice Registration
//               </h1>

//               <p className="mt-1 text-xs sm:text-sm md:text-base text-blue-100 break-words">
//                 Speak naturally • Dynamic Registration • Face Verification
//               </p>
//             </div>
//           </div>

//           {/* BADGES */}
//           <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
//             {organisationName && (
//               <div className="max-w-full rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur">
//                 <span className="text-[10px] sm:text-xs text-blue-100">
//                   Organization
//                 </span>
//                 <div className="font-semibold text-sm sm:text-base break-words">
//                   {organisationName}
//                 </div>
//               </div>
//             )}

//             {moduleName && (
//               <div className="max-w-full rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur">
//                 <span className="text-[10px] sm:text-xs text-blue-100">
//                   Module
//                 </span>
//                 <div className="font-semibold text-sm sm:text-base break-words">
//                   {moduleName}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT - MIC */}
//         <div className="flex flex-col items-center md:items-end">
//           <div
//             className={`relative flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 items-center justify-center rounded-full transition-all duration-300 ${
//               listening
//                 ? "bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.8)] animate-pulse"
//                 : "bg-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.6)]"
//             }`}
//           >
//             <Mic className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />

//             {listening && (
//               <>
//                 <span className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
//                 <span className="absolute inset-2 rounded-full border-2 border-red-200 animate-ping delay-200" />
//               </>
//             )}
//           </div>

//           <div className="mt-3 sm:mt-4 text-center md:text-right">
//             <div className="font-semibold text-base sm:text-lg">
//               {listening ? "Listening..." : "Ready"}
//             </div>

//             <div className="text-xs sm:text-sm text-blue-100">
//               {listening
//                 ? "Please answer the current question"
//                 : "Waiting to start"}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoiceHeader;

import React from "react";
import { Mic, Sparkles } from "lucide-react";

interface VoiceHeaderProps {
  organisationName?: string;
  moduleName?: string;
  listening: boolean;
}

const VoiceHeader: React.FC<VoiceHeaderProps> = ({
  organisationName,
  moduleName,
  listening,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-cyan-600 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
      {/* Background Glow */}

      <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-blue-900/20 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3 sm:gap-5">
        {/* ================================================= */}
        {/* LEFT */}
        {/* ================================================= */}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Icon */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white/15
                shadow-lg
                backdrop-blur-sm
                sm:h-12
                sm:w-12
              "
            >
              <Sparkles className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>

            {/* Title */}

            <div className="min-w-0">
              <h1
                className="
                  truncate
                  text-base
                  font-bold
                  tracking-wide
                  text-white
                  sm:text-xl
                  md:text-2xl
                "
              >
                AI Voice Registration
              </h1>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[9px]
                  text-blue-100
                  sm:text-xs
                  md:text-sm
                "
              >
                Speak naturally • Dynamic Registration • Face Verification
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* BADGES */}
          {/* ================================================= */}

          {(organisationName || moduleName) && (
            <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
              {organisationName && (
                <div
                  className="
                    max-w-[48%]
                    rounded-full
                    bg-white/10
                    px-2
                    py-1
                    backdrop-blur-sm
                    sm:px-3
                  "
                >
                  <div className="flex min-w-0 items-center gap-1">
                    <span className="shrink-0 text-[8px] text-blue-100 sm:text-[10px]">
                      Organization:
                    </span>

                    <span
                      className="
                        truncate
                        text-[9px]
                        font-semibold
                        text-white
                        sm:text-xs
                      "
                    >
                      {organisationName}
                    </span>
                  </div>
                </div>
              )}

              {moduleName && (
                <div
                  className="
                    max-w-[48%]
                    rounded-full
                    bg-white/10
                    px-2
                    py-1
                    backdrop-blur-sm
                    sm:px-3
                  "
                >
                  <div className="flex min-w-0 items-center gap-1">
                    <span className="shrink-0 text-[8px] text-blue-100 sm:text-[10px]">
                      Module:
                    </span>

                    <span
                      className="
                        truncate
                        text-[9px]
                        font-semibold
                        text-white
                        sm:text-xs
                      "
                    >
                      {moduleName}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* RIGHT — MICROPHONE */}
        {/* ================================================= */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Desktop status */}
          <div className="hidden text-right sm:block">
            <div className="text-xs font-semibold text-white sm:text-sm md:text-base">
              {listening ? "Listening..." : "Ready"}
            </div>

            <div className="text-[9px] text-blue-100 sm:text-xs">
              {listening ? "Answer current question" : "Waiting to start"}
            </div>
          </div>

          {/* Microphone */}
          <div
            className={`
      relative
      flex
      h-11
      w-11
      shrink-0
      items-center
      justify-center
      rounded-full
      transition-all
      duration-300
      sm:h-14
      sm:w-14
      md:h-16
      md:w-16
      ${
        listening
          ? "bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.8)]"
          : "bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
      }
    `}
          >
            {/* IMPORTANT: text-white */}
            <Mic
              className="
        h-5
        w-5
        text-white
        sm:h-6
        sm:w-6
        md:h-7
        md:w-7
      "
            />

            {listening && (
              <>
                <span
                  className="
            absolute
            inset-0
            animate-ping
            rounded-full
            border-2
            border-red-300
          "
                />

                <span
                  className="
            absolute
            inset-1.5
            animate-pulse
            rounded-full
            border
            border-red-200
          "
                />
              </>
            )}
          </div>

          {/* Mobile status */}
          <div className="min-w-0 sm:hidden">
            <div className="truncate text-xs font-semibold text-white">
              {listening ? "Listening..." : "Ready"}
            </div>

            <div className="truncate text-[9px] text-blue-100">
              {listening ? "Answer" : "Waiting"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceHeader;