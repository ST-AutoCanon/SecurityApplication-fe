// import React from "react";
// import Webcam from "react-webcam";
// import {
//   Camera,
//   CheckCircle2,
//   Loader2,
//   XCircle,
//   ShieldCheck,
// } from "lucide-react";

// interface VoiceCameraProps {
//   webcamRef: React.RefObject<any>;
//   loading: boolean;
//   modelsLoaded: boolean;
//   detected: boolean;
//   captured: boolean;

//   // NEW
//   captureStep: number;
//   captureInstruction: string;

//   onCapture: () => void;
//   onCancel: () => void;
// }

// const videoConstraints = {
//   width: 720,
//   height: 720,
//   facingMode: "user",
// };

// const VoiceCamera: React.FC<VoiceCameraProps> = ({
//   webcamRef,
//   loading,
//   modelsLoaded,
//   detected,
//   captured,

//   // NEW
//   captureStep,
//   captureInstruction,

//   onCapture,
//   onCancel,
// }) => {
//   return (
//     <>
//       {/* CAMERA POPUP */}
//       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-3 py-3 backdrop-blur-md sm:px-4">
//         {/* Popup */}
//         <div
//           className="
//           relative
//           w-full
//           max-w-[420px]
//           overflow-hidden
//           rounded-3xl
//           border
//           border-cyan-400/20
//           bg-slate-950
//           shadow-[0_25px_100px_rgba(0,0,0,0.7)]
//         "
//         >
//           {/* Background glow */}
//           <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

//           <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

//           {/* Header */}
//           <div className="relative z-10 px-4 pt-4 text-center sm:px-6 sm:pt-5">
//             <h2 className="text-lg font-bold tracking-wide text-white sm:text-xl">
//               Face Registration
//             </h2>

//             <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
//               Capture 5 face samples for better recognition
//             </p>
//           </div>

//           {/* STEP INDICATOR */}
//           {!captured && (
//             <div className="relative z-10 flex justify-center px-4 pt-3">
//               <div className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5">
//                 <p className="text-[10px] font-semibold text-cyan-300 sm:text-xs">
//                   {captureStep > 0
//                     ? `Face Sample ${captureStep} of 5`
//                     : "Ready to capture"}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Camera */}
//           <div className="relative z-10 flex justify-center px-3 pt-4 sm:pt-5">
//             <div className="relative">
//               {/* Camera glow */}
//               <div
//                 className={`absolute -inset-4 rounded-full blur-2xl transition-all duration-500 ${
//                   detected ? "bg-green-400/25" : "bg-cyan-400/20"
//                 }`}
//               />

//               {/* Outer scanner */}
//               <div
//                 className={`relative flex h-[190px] w-[190px] items-center justify-center rounded-full border-[3px] transition-all duration-500 sm:h-[220px] sm:w-[220px] ${
//                   detected
//                     ? "border-green-400 shadow-[0_0_45px_rgba(34,197,94,.45)]"
//                     : "border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,.35)]"
//                 }`}
//               >
//                 {/* Camera */}
//                 <div className="relative h-[172px] w-[172px] overflow-hidden rounded-full bg-black sm:h-[202px] sm:w-[202px]">
//                   <Webcam
//                     ref={webcamRef}
//                     mirrored
//                     audio={false}
//                     screenshotFormat="image/jpeg"
//                     videoConstraints={videoConstraints}
//                     className="absolute inset-0 h-full w-full object-cover"
//                   />

//                   {/* Overlay */}
//                   <div className="pointer-events-none absolute inset-0 bg-black/10" />

//                   {/* Face guide */}
//                   <div
//                     className={`pointer-events-none absolute inset-[20px] rounded-[45%] border-2 transition-all duration-500 sm:inset-[24px] ${
//                       detected ? "border-green-400" : "border-white/80"
//                     }`}
//                   />

//                   {/* Scanning line */}
//                   {!captured && (
//                     <div
//                       className={`pointer-events-none absolute left-5 right-5 h-[2px] shadow-[0_0_12px_currentColor] sm:left-6 sm:right-6 ${
//                         detected
//                           ? "bg-green-400 text-green-400"
//                           : "bg-cyan-400 text-cyan-400"
//                       } animate-[scan_2s_ease-in-out_infinite]`}
//                     />
//                   )}

//                   {/* Loading */}
//                   {/* {loading && (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-[2px]">
//                       <Loader2 size={30} className="animate-spin text-white" />

//                       <p className="mt-2 text-[10px] font-medium text-white sm:text-xs">
//                         Capturing sample...
//                       </p>

//                       {captureStep > 0 && (
//                         <p className="mt-1 text-[9px] text-cyan-300 sm:text-[10px]">
//                           {captureStep} / 5
//                         </p>
//                       )}
//                     </div>
//                   )} */}

//                   {loading && (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
//                       <Loader2 size={30} className="animate-spin text-white" />

//                       <p className="mt-2 text-[10px] font-medium text-white sm:text-xs">
//                         Capturing sample...
//                       </p>

//                       {captureStep > 0 && (
//                         <p className="mt-1 text-[9px] text-cyan-300 sm:text-[10px]">
//                           {captureStep} / 5
//                         </p>
//                       )}
//                     </div>
//                   )}

//                   {/* Captured */}
//                   {captured && (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-950/75 backdrop-blur-sm">
//                       <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-400/20">
//                         <CheckCircle2 size={26} className="text-green-400" />
//                       </div>

//                       <p className="mt-2 text-[10px] font-semibold text-green-300 sm:text-xs">
//                         Face Data Captured
//                       </p>

//                       <p className="mt-0.5 text-[8px] text-green-400/70 sm:text-[9px]">
//                         5 samples completed
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Scanner dots */}
//                 <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />

//                 <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />

//                 <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />

//                 <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />
//               </div>

//               {/* Status */}
//               <div
//                 className={`absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[9px] font-semibold shadow-xl sm:px-4 sm:py-1.5 sm:text-[11px] ${
//                   detected
//                     ? "border-green-400/30 bg-green-950 text-green-300"
//                     : "border-cyan-400/30 bg-slate-900 text-cyan-300"
//                 }`}
//               >
//                 <span
//                   className={`h-1.5 w-1.5 rounded-full ${
//                     detected
//                       ? "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,1)]"
//                       : "animate-pulse bg-cyan-400"
//                   }`}
//                 />

//                 {captured
//                   ? "Registration Complete"
//                   : detected
//                     ? "Face Detected"
//                     : "Scanning..."}
//               </div>
//             </div>
//           </div>

//           {/* INSTRUCTION */}
//           <div className="relative z-10 px-4 pt-8 text-center sm:px-6">
//             <p className="text-sm font-semibold text-white sm:text-base">
//               {captured
//                 ? "Face data captured successfully"
//                 : loading
//                   ? captureInstruction
//                   : captureInstruction}
//             </p>

//             <p className="mt-1 text-[9px] text-slate-500 sm:text-[11px]">
//               {captured
//                 ? "Your profile photo will be captured next"
//                 : loading
//                   ? "Please follow the instruction above"
//                   : detected
//                     ? "Press Capture when you are ready"
//                     : "Make sure your face is clearly visible"}
//             </p>
//           </div>

//           {/* POSE PROGRESS */}
//           {!captured && (
//             <div className="relative z-10 flex justify-center gap-1.5 px-4 pt-3">
//               {[1, 2, 3, 4, 5].map((step) => (
//                 <div
//                   key={step}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     step < captureStep
//                       ? "w-7 bg-green-400"
//                       : step === captureStep
//                         ? "w-9 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,.6)]"
//                         : "w-5 bg-white/10"
//                   }`}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Status cards */}
//           <div className="relative z-10 grid grid-cols-3 gap-1.5 px-3 pt-4 sm:gap-2 sm:px-5">
//             {/* Model */}
//             <div
//               className={`rounded-xl border px-1.5 py-2 text-center ${
//                 modelsLoaded
//                   ? "border-green-400/20 bg-green-400/5"
//                   : "border-yellow-400/20 bg-yellow-400/5"
//               }`}
//             >
//               <div className="flex justify-center">
//                 {modelsLoaded ? (
//                   <CheckCircle2 size={16} className="text-green-400" />
//                 ) : (
//                   <Loader2 size={16} className="animate-spin text-yellow-400" />
//                 )}
//               </div>

//               <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
//                 Model
//               </p>

//               <p
//                 className={`text-[9px] font-semibold sm:text-[11px] ${
//                   modelsLoaded ? "text-green-400" : "text-yellow-400"
//                 }`}
//               >
//                 {modelsLoaded ? "Ready" : "Loading"}
//               </p>
//             </div>

//             {/* Face */}
//             <div
//               className={`rounded-xl border px-1.5 py-2 text-center ${
//                 detected
//                   ? "border-green-400/20 bg-green-400/5"
//                   : "border-white/5 bg-white/[0.02]"
//               }`}
//             >
//               <div className="flex justify-center">
//                 {detected ? (
//                   <CheckCircle2 size={16} className="text-green-400" />
//                 ) : (
//                   <XCircle size={16} className="text-slate-600" />
//                 )}
//               </div>

//               <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
//                 Face
//               </p>

//               <p
//                 className={`text-[9px] font-semibold sm:text-[11px] ${
//                   detected ? "text-green-400" : "text-slate-500"
//                 }`}
//               >
//                 {detected ? "Found" : "Waiting"}
//               </p>
//             </div>

//             {/* Capture */}
//             <div
//               className={`rounded-xl border px-1.5 py-2 text-center ${
//                 captured
//                   ? "border-green-400/20 bg-green-400/5"
//                   : "border-white/5 bg-white/[0.02]"
//               }`}
//             >
//               <div className="flex justify-center">
//                 {captured ? (
//                   <CheckCircle2 size={16} className="text-green-400" />
//                 ) : (
//                   <Camera size={16} className="text-slate-600" />
//                 )}
//               </div>

//               <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
//                 Capture
//               </p>

//               <p
//                 className={`text-[9px] font-semibold sm:text-[11px] ${
//                   captured ? "text-green-400" : "text-slate-500"
//                 }`}
//               >
//                 {captured ? "5/5 Done" : `${captureStep}/5`}
//               </p>
//             </div>
//           </div>

//           {/* Tips */}
//           {!captured && (
//             <div className="relative z-10 mx-3 mt-2.5 flex items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-2.5 py-2 sm:mx-5">
//               <ShieldCheck size={15} className="shrink-0 text-cyan-400" />

//               <p className="text-[9px] leading-3.5 text-slate-400 sm:text-[10px] sm:leading-4">
//                 Good lighting • Follow the pose instruction • Keep your face
//                 visible
//               </p>
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="relative z-10 grid grid-cols-2 gap-2 px-3 py-3 sm:px-5 sm:py-4">
//             <button
//               type="button"
//               onClick={onCancel}
//               disabled={loading}
//               className="
//                 rounded-xl
//                 border border-white/10
//                 bg-white/5
//                 py-2.5
//                 text-xs
//                 font-semibold
//                 text-slate-300
//                 transition
//                 hover:bg-white/10
//                 hover:text-white
//                 active:scale-[0.98]
//                 disabled:cursor-not-allowed
//                 disabled:opacity-40
//                 sm:py-3
//                 sm:text-sm
//               "
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               disabled={!modelsLoaded || !detected || loading || captured}
//               onClick={onCapture}
//               className="
//                 rounded-xl
//                 bg-gradient-to-r
//                 from-cyan-500
//                 to-blue-600
//                 py-2.5
//                 text-xs
//                 font-semibold
//                 text-white
//                 shadow-lg
//                 shadow-cyan-500/20
//                 transition
//                 hover:scale-[1.01]
//                 active:scale-[0.98]
//                 disabled:cursor-not-allowed
//                 disabled:opacity-40
//                 sm:py-3
//                 sm:text-sm
//               "
//             >
//               <span className="flex items-center justify-center gap-1.5 sm:gap-2">
//                 {loading ? (
//                   <>
//                     <Loader2
//                       size={15}
//                       className="animate-spin sm:h-[17px] sm:w-[17px]"
//                     />
//                     Capturing
//                   </>
//                 ) : captured ? (
//                   <>
//                     <CheckCircle2
//                       size={15}
//                       className="sm:h-[17px] sm:w-[17px]"
//                     />
//                     Captured
//                   </>
//                 ) : (
//                   <>
//                     <Camera size={15} className="sm:h-[17px] sm:w-[17px]" />
//                     {captureStep > 0
//                       ? `Capture ${captureStep}/5`
//                       : "Start Capture"}
//                   </>
//                 )}
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default VoiceCamera;





/////////


import React from "react";
import Webcam from "react-webcam";
import {
  Camera,
  CheckCircle2,
  Loader2,
  XCircle,
  ShieldCheck,
  UserRound,
  Image,
} from "lucide-react";

interface VoiceCameraProps {
  webcamRef: React.RefObject<any>;

  loading: boolean;
  modelsLoaded: boolean;
  detected: boolean;
  captured: boolean;

  captureStep: number;
  captureInstruction: string;

  // IMPORTANT:
  // This tells the camera which field is currently being captured.
  captureType: "profile_photo" | "face_descriptor";

  onCapture: () => void;
  onCancel: () => void;
}

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

const VoiceCamera: React.FC<VoiceCameraProps> = ({
  webcamRef,
  loading,
  modelsLoaded,
  detected,
  captured,
  captureStep,
  captureInstruction,
  captureType,
  onCapture,
  onCancel,
}) => {
  // ============================================================
  // CURRENT CAPTURE TYPE
  // ============================================================

  const isProfilePhoto = captureType === "profile_photo";
  const isFaceDescriptor = captureType === "face_descriptor";

  // ============================================================
  // PROFILE PHOTO UI
  // ============================================================

  if (isProfilePhoto) {
    return (
      <>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-3 py-3 backdrop-blur-md sm:px-4">
          <div
            className="
              relative
              w-full
              max-w-[420px]
              overflow-hidden
              rounded-3xl
              border
              border-violet-400/20
              bg-slate-950
              shadow-[0_25px_100px_rgba(0,0,0,0.7)]
            "
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

            {/* ======================================================
                HEADER
            ====================================================== */}

            <div className="relative z-10 px-4 pt-4 text-center sm:px-6 sm:pt-5">
              <div className="mb-2 flex justify-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    captured
                      ? "border-green-400/30 bg-green-400/10"
                      : "border-violet-400/30 bg-violet-400/10"
                  }`}
                >
                  {captured ? (
                    <CheckCircle2 size={21} className="text-green-400" />
                  ) : (
                    <Image size={21} className="text-violet-400" />
                  )}
                </div>
              </div>

              <h2 className="text-lg font-bold tracking-wide text-white sm:text-xl">
                {captured ? "Profile Photo Captured" : "Profile Photo"}
              </h2>

              <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                {captured
                  ? "Your profile photo has been saved successfully"
                  : "Capture a clear profile photo"}
              </p>
            </div>

            {/* ======================================================
                STAGE INDICATOR
            ====================================================== */}

            {!captured && (
              <div className="relative z-10 flex justify-center px-4 pt-3">
                <div className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5">
                  <p className="text-[10px] font-semibold text-violet-300 sm:text-xs">
                    Profile Photo
                  </p>
                </div>
              </div>
            )}

            {/* ======================================================
                CAMERA
            ====================================================== */}

            <div className="relative z-10 flex justify-center px-3 pt-4 sm:pt-5">
              <div className="relative">
                {/* Camera glow */}
                <div
                  className={`absolute -inset-4 rounded-full blur-2xl transition-all duration-500 ${
                    captured
                      ? "bg-green-400/20"
                      : detected
                        ? "bg-violet-400/25"
                        : "bg-violet-400/20"
                  }`}
                />

                {/* Camera outer ring */}
                <div
                  className={`relative flex h-[190px] w-[190px] items-center justify-center rounded-full border-[3px] transition-all duration-500 sm:h-[220px] sm:w-[220px] ${
                    captured
                      ? "border-green-400 shadow-[0_0_45px_rgba(34,197,94,.45)]"
                      : detected
                        ? "border-violet-400 shadow-[0_0_45px_rgba(139,92,246,.45)]"
                        : "border-violet-400 shadow-[0_0_40px_rgba(139,92,246,.35)]"
                  }`}
                >
                  {/* Camera */}
                  <div className="relative h-[172px] w-[172px] overflow-hidden rounded-full bg-black sm:h-[202px] sm:w-[202px]">
                    <Webcam
                      ref={webcamRef}
                      mirrored
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-black/10" />

                    {/* Profile photo frame */}
                    {!captured && (
                      <>
                        <div
                          className={`pointer-events-none absolute inset-[14px] rounded-[42%] border-2 transition-all duration-500 sm:inset-[18px] ${
                            detected
                              ? "border-violet-300 shadow-[0_0_25px_rgba(139,92,246,.35)]"
                              : "border-white/70"
                          }`}
                        />

                        {/* Corner markers */}
                        <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-violet-300 sm:left-6 sm:top-6" />

                        <div className="pointer-events-none absolute right-5 top-5 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-violet-300 sm:right-6 sm:top-6" />

                        <div className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-violet-300 sm:bottom-6 sm:left-6" />

                        <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-violet-300 sm:bottom-6 sm:right-6" />
                      </>
                    )}

                    {/* Loading */}
                    {loading && !captured && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-violet-950/60 backdrop-blur-[2px]">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/30 bg-violet-400/10">
                          <Loader2
                            size={25}
                            className="animate-spin text-violet-300"
                          />
                        </div>

                        <p className="mt-2 text-[10px] font-semibold text-violet-200 sm:text-xs">
                          Capturing profile photo...
                        </p>

                        <p className="mt-1 text-[8px] text-violet-300/80 sm:text-[9px]">
                          Please stay still
                        </p>
                      </div>
                    )}

                    {/* Captured */}
                    {captured && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-950/75 backdrop-blur-sm">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400/20">
                          <CheckCircle2
                            size={28}
                            className="text-green-400"
                          />
                        </div>

                        <p className="mt-2 text-[10px] font-semibold text-green-300 sm:text-xs">
                          Profile Photo Saved
                        </p>

                        <p className="mt-0.5 text-[8px] text-green-400/70 sm:text-[9px]">
                          Capture completed
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Camera markers */}
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-400 text-violet-400 shadow-[0_0_10px_currentColor]" />

                  <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-400 text-violet-400 shadow-[0_0_10px_currentColor]" />

                  <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-400 text-violet-400 shadow-[0_0_10px_currentColor]" />

                  <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-400 text-violet-400 shadow-[0_0_10px_currentColor]" />
                </div>

                {/* Status */}
                <div
                  className={`absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[9px] font-semibold shadow-xl sm:px-4 sm:py-1.5 sm:text-[11px] ${
                    captured
                      ? "border-green-400/30 bg-green-950 text-green-300"
                      : detected
                        ? "border-violet-400/30 bg-violet-950 text-violet-300"
                        : "border-violet-400/30 bg-slate-900 text-violet-300"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      captured
                        ? "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,1)]"
                        : detected
                          ? "bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,1)]"
                          : "animate-pulse bg-violet-400"
                    }`}
                  />

                  {captured
                    ? "Photo Captured"
                    : detected
                      ? "Face Ready"
                      : "Scanning..."}
                </div>
              </div>
            </div>

            {/* ======================================================
                INSTRUCTION
            ====================================================== */}

            <div className="relative z-10 px-4 pt-8 text-center sm:px-6">
              <div
                className={`mx-auto flex max-w-[340px] items-center justify-center gap-2 rounded-xl border px-3 py-2.5 ${
                  captured
                    ? "border-green-400/20 bg-green-400/5"
                    : "border-violet-400/20 bg-violet-400/5"
                }`}
              >
                {captured ? (
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-green-400"
                  />
                ) : (
                  <Image
                    size={17}
                    className="shrink-0 text-violet-400"
                  />
                )}

                <p
                  className={`text-sm font-semibold sm:text-base ${
                    captured ? "text-green-300" : "text-violet-300"
                  }`}
                >
                  {captured
                    ? "Profile photo captured successfully"
                    : captureInstruction || "Look straight at the camera"}
                </p>
              </div>

              <p className="mt-1.5 text-[9px] text-slate-500 sm:text-[11px]">
                {captured
                  ? "Your profile photo has been saved"
                  : detected
                    ? "Press Capture when you are ready"
                    : "Make sure your face is clearly visible"}
              </p>
            </div>

            {/* ======================================================
                PROFILE PHOTO PROGRESS
            ====================================================== */}

            {!captured && (
              <div className="relative z-10 px-4 pt-4">
                <div className="mx-auto max-w-[280px]">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[8px] font-semibold uppercase tracking-wider text-violet-400">
                      Profile Photo
                    </span>

                    <span className="text-[8px] font-semibold text-violet-300">
                      1 PHOTO
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        loading
                          ? "w-3/4 animate-pulse bg-violet-400"
                          : "w-1/2 bg-violet-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================
                STATUS CARDS
            ====================================================== */}

            <div className="relative z-10 grid grid-cols-2 gap-2 px-3 pt-4 sm:px-5">
              {/* MODEL */}
              <div
                className={`rounded-xl border px-1.5 py-2 text-center ${
                  modelsLoaded
                    ? "border-green-400/20 bg-green-400/5"
                    : "border-yellow-400/20 bg-yellow-400/5"
                }`}
              >
                <div className="flex justify-center">
                  {modelsLoaded ? (
                    <CheckCircle2
                      size={16}
                      className="text-green-400"
                    />
                  ) : (
                    <Loader2
                      size={16}
                      className="animate-spin text-yellow-400"
                    />
                  )}
                </div>

                <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
                  Model
                </p>

                <p
                  className={`text-[9px] font-semibold sm:text-[11px] ${
                    modelsLoaded
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {modelsLoaded ? "Ready" : "Loading"}
                </p>
              </div>

              {/* PHOTO */}
              <div
                className={`rounded-xl border px-1.5 py-2 text-center ${
                  captured
                    ? "border-green-400/20 bg-green-400/5"
                    : detected
                      ? "border-violet-400/20 bg-violet-400/5"
                      : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex justify-center">
                  {captured ? (
                    <CheckCircle2
                      size={16}
                      className="text-green-400"
                    />
                  ) : detected ? (
                    <Image
                      size={16}
                      className="text-violet-400"
                    />
                  ) : (
                    <XCircle
                      size={16}
                      className="text-slate-600"
                    />
                  )}
                </div>

                <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
                  Photo
                </p>

                <p
                  className={`text-[9px] font-semibold sm:text-[11px] ${
                    captured
                      ? "text-green-400"
                      : detected
                        ? "text-violet-400"
                        : "text-slate-500"
                  }`}
                >
                  {captured
                    ? "Saved"
                    : detected
                      ? "Ready"
                      : "Waiting"}
                </p>
              </div>
            </div>

            {/* ======================================================
                TIPS
            ====================================================== */}

            {!captured && (
              <div className="relative z-10 mx-3 mt-2.5 flex items-center gap-2 rounded-xl border border-violet-400/10 bg-violet-400/5 px-2.5 py-2 sm:mx-5">
                <Image
                  size={15}
                  className="shrink-0 text-violet-400"
                />

                <p className="text-[9px] leading-3.5 text-slate-400 sm:text-[10px] sm:leading-4">
                  Good lighting • Look straight • Natural expression •
                  Keep your face centered
                </p>
              </div>
            )}

            {/* ======================================================
                BUTTONS
            ====================================================== */}

            <div className="relative z-10 grid grid-cols-2 gap-2 px-3 py-3 sm:px-5 sm:py-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-white/10
                  hover:text-white
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:py-3
                  sm:text-sm
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={
                  !modelsLoaded ||
                  !detected ||
                  loading ||
                  captured
                }
                onClick={onCapture}
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-500
                  to-purple-600
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-violet-500/20
                  transition
                  hover:scale-[1.01]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:py-3
                  sm:text-sm
                "
              >
                <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin sm:h-[17px] sm:w-[17px]"
                      />
                      Capturing
                    </>
                  ) : captured ? (
                    <>
                      <CheckCircle2
                        size={15}
                        className="sm:h-[17px] sm:w-[17px]"
                      />
                      Captured
                    </>
                  ) : (
                    <>
                      <Image
                        size={15}
                        className="sm:h-[17px] sm:w-[17px]"
                      />
                      Capture Photo
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ============================================================
  // FACE DESCRIPTOR UI
  // ============================================================

  if (isFaceDescriptor) {
    return (
      <>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-3 py-3 backdrop-blur-md sm:px-4">
          <div
            className="
              relative
              w-full
              max-w-[420px]
              overflow-hidden
              rounded-3xl
              border
              border-cyan-400/20
              bg-slate-950
              shadow-[0_25px_100px_rgba(0,0,0,0.7)]
            "
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            {/* ======================================================
                HEADER
            ====================================================== */}

            <div className="relative z-10 px-4 pt-4 text-center sm:px-6 sm:pt-5">
              <div className="mb-2 flex justify-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                    captured
                      ? "border-green-400/30 bg-green-400/10"
                      : "border-cyan-400/30 bg-cyan-400/10"
                  }`}
                >
                  {captured ? (
                    <CheckCircle2 size={21} className="text-green-400" />
                  ) : (
                    <UserRound size={21} className="text-cyan-400" />
                  )}
                </div>
              </div>

              <h2 className="text-lg font-bold tracking-wide text-white sm:text-xl">
                {captured
                  ? "Face Data Captured"
                  : "Face Registration"}
              </h2>

              <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                {captured
                  ? "5 face samples saved successfully"
                  : "Capture 5 face samples for better recognition"}
              </p>
            </div>

            {/* ======================================================
                FACE SAMPLE INDICATOR
            ====================================================== */}

            {!captured && (
              <div className="relative z-10 flex justify-center px-4 pt-3">
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5">
                  <p className="text-[10px] font-semibold text-cyan-300 sm:text-xs">
                    {captureStep > 0
                      ? `Face Sample ${captureStep} of 5`
                      : "Ready to capture"}
                  </p>
                </div>
              </div>
            )}

            {/* ======================================================
                CAMERA
            ====================================================== */}

            <div className="relative z-10 flex justify-center px-3 pt-4 sm:pt-5">
              <div className="relative">
                <div
                  className={`absolute -inset-4 rounded-full blur-2xl transition-all duration-500 ${
                    captured
                      ? "bg-green-400/20"
                      : detected
                        ? "bg-green-400/25"
                        : "bg-cyan-400/20"
                  }`}
                />

                <div
                  className={`relative flex h-[190px] w-[190px] items-center justify-center rounded-full border-[3px] transition-all duration-500 sm:h-[220px] sm:w-[220px] ${
                    captured
                      ? "border-green-400 shadow-[0_0_45px_rgba(34,197,94,.45)]"
                      : detected
                        ? "border-green-400 shadow-[0_0_45px_rgba(34,197,94,.45)]"
                        : "border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,.35)]"
                  }`}
                >
                  <div className="relative h-[172px] w-[172px] overflow-hidden rounded-full bg-black sm:h-[202px] sm:w-[202px]">
                    <Webcam
                      ref={webcamRef}
                      mirrored
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-black/10" />

                    {/* Face guide */}
                    {!captured && (
                      <div
                        className={`pointer-events-none absolute inset-[20px] rounded-[45%] border-2 transition-all duration-500 sm:inset-[24px] ${
                          detected
                            ? "border-green-400"
                            : "border-white/80"
                        }`}
                      />
                    )}

                    {/* Scanning line */}
                    {!captured && (
                      <div
                        className={`pointer-events-none absolute left-5 right-5 h-[2px] shadow-[0_0_12px_currentColor] sm:left-6 sm:right-6 ${
                          detected
                            ? "bg-green-400 text-green-400"
                            : "bg-cyan-400 text-cyan-400"
                        } animate-[scan_2s_ease-in-out_infinite]`}
                      />
                    )}

                    {/* Loading */}
                    {loading && !captured && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]">
                        <Loader2
                          size={30}
                          className="animate-spin text-white"
                        />

                        <p className="mt-2 text-[10px] font-medium text-white sm:text-xs">
                          Capturing face sample...
                        </p>

                        {captureStep > 0 && (
                          <p className="mt-1 text-[9px] text-cyan-300 sm:text-[10px]">
                            {captureStep} / 5
                          </p>
                        )}
                      </div>
                    )}

                    {/* Captured */}
                    {captured && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-950/75 backdrop-blur-sm">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400/20">
                          <CheckCircle2
                            size={28}
                            className="text-green-400"
                          />
                        </div>

                        <p className="mt-2 text-[10px] font-semibold text-green-300 sm:text-xs">
                          Face Data Captured
                        </p>

                        <p className="mt-0.5 text-[8px] text-green-400/70 sm:text-[9px]">
                          5 samples completed
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Scanner dots */}
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />

                  <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />

                  <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />

                  <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />
                </div>

                {/* Status */}
                <div
                  className={`absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[9px] font-semibold shadow-xl sm:px-4 sm:py-1.5 sm:text-[11px] ${
                    captured
                      ? "border-green-400/30 bg-green-950 text-green-300"
                      : detected
                        ? "border-green-400/30 bg-green-950 text-green-300"
                        : "border-cyan-400/30 bg-slate-900 text-cyan-300"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      captured
                        ? "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,1)]"
                        : detected
                          ? "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,1)]"
                          : "animate-pulse bg-cyan-400"
                    }`}
                  />

                  {captured
                    ? "Registration Complete"
                    : detected
                      ? "Face Detected"
                      : "Scanning..."}
                </div>
              </div>
            </div>

            {/* ======================================================
                INSTRUCTION
            ====================================================== */}

            <div className="relative z-10 px-4 pt-8 text-center sm:px-6">
              <div
                className={`mx-auto flex max-w-[340px] items-center justify-center gap-2 rounded-xl border px-3 py-2.5 ${
                  captured
                    ? "border-green-400/20 bg-green-400/5"
                    : "border-cyan-400/10 bg-cyan-400/5"
                }`}
              >
                {captured ? (
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-green-400"
                  />
                ) : (
                  <UserRound
                    size={17}
                    className="shrink-0 text-cyan-400"
                  />
                )}

                <p
                  className={`text-sm font-semibold sm:text-base ${
                    captured ? "text-green-300" : "text-white"
                  }`}
                >
                  {captured
                    ? "Face data captured successfully"
                    : captureInstruction}
                </p>
              </div>

              <p className="mt-1.5 text-[9px] text-slate-500 sm:text-[11px]">
                {captured
                  ? "5 face vectors have been saved"
                  : loading
                    ? "Please follow the instruction above"
                    : detected
                      ? "Press Capture when you are ready"
                      : "Make sure your face is clearly visible"}
              </p>
            </div>

            {/* ======================================================
                FACE SAMPLE PROGRESS
            ====================================================== */}

            {!captured && (
              <div className="relative z-10 pt-3">
                <div className="mb-1 text-center">
                  <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-500">
                    Face Samples
                  </span>
                </div>

                <div className="flex justify-center gap-1.5 px-4">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        step < captureStep
                          ? "w-7 bg-green-400"
                          : step === captureStep
                            ? "w-9 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,.6)]"
                            : "w-5 bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================
                STATUS CARDS
            ====================================================== */}

            <div className="relative z-10 grid grid-cols-3 gap-1.5 px-3 pt-4 sm:gap-2 sm:px-5">
              {/* MODEL */}
              <div
                className={`rounded-xl border px-1.5 py-2 text-center ${
                  modelsLoaded
                    ? "border-green-400/20 bg-green-400/5"
                    : "border-yellow-400/20 bg-yellow-400/5"
                }`}
              >
                <div className="flex justify-center">
                  {modelsLoaded ? (
                    <CheckCircle2
                      size={16}
                      className="text-green-400"
                    />
                  ) : (
                    <Loader2
                      size={16}
                      className="animate-spin text-yellow-400"
                    />
                  )}
                </div>

                <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
                  Model
                </p>

                <p
                  className={`text-[9px] font-semibold sm:text-[11px] ${
                    modelsLoaded
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {modelsLoaded ? "Ready" : "Loading"}
                </p>
              </div>

              {/* FACE */}
              <div
                className={`rounded-xl border px-1.5 py-2 text-center ${
                  detected
                    ? "border-green-400/20 bg-green-400/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex justify-center">
                  {detected ? (
                    <CheckCircle2
                      size={16}
                      className="text-green-400"
                    />
                  ) : (
                    <XCircle
                      size={16}
                      className="text-slate-600"
                    />
                  )}
                </div>

                <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
                  Face
                </p>

                <p
                  className={`text-[9px] font-semibold sm:text-[11px] ${
                    detected ? "text-green-400" : "text-slate-500"
                  }`}
                >
                  {detected ? "Found" : "Waiting"}
                </p>
              </div>

              {/* CAPTURE */}
              <div
                className={`rounded-xl border px-1.5 py-2 text-center ${
                  captured
                    ? "border-green-400/20 bg-green-400/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex justify-center">
                  {captured ? (
                    <CheckCircle2
                      size={16}
                      className="text-green-400"
                    />
                  ) : (
                    <Camera
                      size={16}
                      className="text-slate-600"
                    />
                  )}
                </div>

                <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
                  Capture
                </p>

                <p
                  className={`text-[9px] font-semibold sm:text-[11px] ${
                    captured
                      ? "text-green-400"
                      : "text-slate-500"
                  }`}
                >
                  {captured
                    ? "5/5 Done"
                    : `${captureStep}/5`}
                </p>
              </div>
            </div>

            {/* ======================================================
                TIPS
            ====================================================== */}

            {!captured && (
              <div className="relative z-10 mx-3 mt-2.5 flex items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-2.5 py-2 sm:mx-5">
                <ShieldCheck
                  size={15}
                  className="shrink-0 text-cyan-400"
                />

                <p className="text-[9px] leading-3.5 text-slate-400 sm:text-[10px] sm:leading-4">
                  Good lighting • Follow the pose instruction • Keep
                  your face visible
                </p>
              </div>
            )}

            {/* ======================================================
                BUTTONS
            ====================================================== */}

            <div className="relative z-10 grid grid-cols-2 gap-2 px-3 py-3 sm:px-5 sm:py-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-white/10
                  hover:text-white
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:py-3
                  sm:text-sm
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={
                  !modelsLoaded ||
                  !detected ||
                  loading ||
                  captured
                }
                onClick={onCapture}
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-cyan-500/20
                  transition
                  hover:scale-[1.01]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:py-3
                  sm:text-sm
                "
              >
                <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin sm:h-[17px] sm:w-[17px]"
                      />
                      Capturing
                    </>
                  ) : captured ? (
                    <>
                      <CheckCircle2
                        size={15}
                        className="sm:h-[17px] sm:w-[17px]"
                      />
                      Captured
                    </>
                  ) : (
                    <>
                      <Camera
                        size={15}
                        className="sm:h-[17px] sm:w-[17px]"
                      />

                      {captureStep > 0
                        ? `Capture ${captureStep}/5`
                        : "Start Capture"}
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ============================================================
  // SAFETY FALLBACK
  // ============================================================

  return null;
};

export default VoiceCamera;

