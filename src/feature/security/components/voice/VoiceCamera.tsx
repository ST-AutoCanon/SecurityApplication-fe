// import React from "react";
// import Webcam from "react-webcam";
// import { Camera, CheckCircle2, Loader2, ScanFace, XCircle } from "lucide-react";

// interface VoiceCameraProps {
//   webcamRef: React.RefObject<Webcam>;
//   loading: boolean;
//   modelsLoaded: boolean;
//   detected: boolean;
//   captured: boolean;
//   onCapture: () => void;
//   onCancel: () => void;
// }

// const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: "user",
// };

// const VoiceCamera: React.FC<VoiceCameraProps> = ({
//   webcamRef,
//   loading,
//   modelsLoaded,
//   detected,
//   captured,
//   onCapture,
//   onCancel,
// }) => {
//   return (
//     <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
//       {/* Header */}

//       <div
//         className="
// bg-linear-to-r
// from-blue-700
// to-cyan-600
// text-white
// px-4
// py-5
// sm:px-6
// sm:py-6
// md:px-8
// md:py-7
// "
//       >
//         <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
//           <ScanFace aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10" />

//           <div>
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
//               Face Verification
//             </h2>

//             <p className="opacity-90 mt-1">
//               Please look directly at the camera
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Camera */}

//       <div className="p-4 sm:p-6 md:p-8">
//         <div className="relative rounded-3xl overflow-hidden border-4 border-blue-500 bg-black z-0">
//           <Webcam
//             ref={webcamRef}
//             mirrored
//             audio={false}
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//             className="
// w-full
// aspect-3/4
// sm:aspect-video
// lg:aspect-auto
// lg:h-137.5
// object-cover
// "
//           />

//           {/* Face Guide */}
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
//             <div
//               className="
//       relative
//       w-40 h-56
//       sm:w-52 sm:h-72
//       md:w-64 md:h-80
//       lg:w-72 lg:h-96
//       rounded-[80px]
//       sm:rounded-[100px]
//       lg:rounded-[120px]
//       border-[5px]
//       border-cyan-400
//     "
//             >
//               <div className="absolute left-0 top-0 w-10 h-10 border-l-4 border-t-4 border-white rounded-tl-xl" />
//               <div className="absolute right-0 top-0 w-10 h-10 border-r-4 border-t-4 border-white rounded-tr-xl" />
//               <div className="absolute left-0 bottom-0 w-10 h-10 border-l-4 border-b-4 border-white rounded-bl-xl" />
//               <div className="absolute right-0 bottom-0 w-10 h-10 border-r-4 border-b-4 border-white rounded-br-xl" />
//             </div>
//           </div>

//           {/* Loading */}

//           {loading && (
//             <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
//               <Loader2 size={60} className="animate-spin text-white" />

//               <p className="text-white mt-4 text-base sm:text-lg md:text-xl">
//                 Detecting Face...
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Status */}

//         <div
//           className="
// grid
// grid-cols-1
// sm:grid-cols-2
// lg:grid-cols-3
// gap-4
// sm:gap-5
// mt-8
// "
//         >
//           {/* Model */}

//           <div className="rounded-2xl border p-4 sm:p-5 md:p-6">
//             <div className="text-gray-500 text-sm">Face Model</div>

//             <div className="mt-3 flex items-center gap-2">
//               {modelsLoaded ? (
//                 <>
//                   <CheckCircle2 className="text-green-600" size={24} />

//                   <span className="font-semibold text-green-700">Loaded</span>
//                 </>
//               ) : (
//                 <>
//                   <Loader2 className="animate-spin text-orange-500" size={22} />

//                   <span className="font-semibold text-orange-600">
//                     Loading...
//                   </span>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Face */}

//           <div className="rounded-2xl border p-4 sm:p-5 md:p-6">
//             <div className="text-gray-500 text-sm">Face Detection</div>

//             <div className="mt-3 flex items-center gap-2">
//               {detected ? (
//                 <>
//                   <CheckCircle2 className="text-green-600" size={24} />

//                   <span className="font-semibold text-green-700">
//                     🟢 Face Detected
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <XCircle className="text-red-500" size={24} />

//                   <span className="font-semibold text-red-600">
//                     🔴 No Face Detected
//                   </span>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Capture */}

//           <div className="rounded-2xl border p-4 sm:p-5 md:p-6">
//             <div className="text-gray-500 text-sm">Capture Status</div>

//             <div className="mt-3 flex items-center gap-2">
//               {captured ? (
//                 <>
//                   <CheckCircle2 className="text-green-600" size={24} />

//                   <span className="font-semibold text-green-700">
//                     Completed
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <Camera className="text-blue-600" size={24} />

//                   <span className="font-semibold text-blue-700">Waiting</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Tips */}

//         <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-200 p-6">
//           <h3 className="font-bold text-blue-800 mb-3">
//             Tips for Best Face Detection
//           </h3>

//           <ul className="space-y-2 text-blue-700">
//             <li>• Face should be inside the guide.</li>

//             <li>• Remove sunglasses or face masks.</li>

//             <li>• Keep good lighting.</li>

//             <li>• Look directly at the camera.</li>

//             <li>• Stay still during capture.</li>
//           </ul>
//         </div>

//         {/* Buttons */}

//         <div
//           className="grid
// grid-cols-1
// sm:grid-cols-2
// gap-4
// mt-8"
//         >
//           {/* <button
//             onClick={onCancel}
//             className="rounded-xl border border-red-400 py-4 font-semibold text-red-600 hover:bg-red-50 transition"
//           >
//             Cancel
//           </button> */}

//           {/* <button
//             disabled={!modelsLoaded || loading}
//             onClick={onCapture}
//             className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold hover:scale-[1.02] transition disabled:opacity-50"
//           >
//             {loading ? "Capturing..." : "Capture Face"}
//           </button> */}

//           <div className="rounded-xl bg-green-50 border border-green-200 py-4 text-center">
//             <p className="font-semibold text-green-700">
//               Face detected. Hold still for a moment...
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoiceCamera;



import React from "react";
import Webcam from "react-webcam";
import {
  Camera,
  CheckCircle2,
  Loader2,
  XCircle,
  ShieldCheck,
} from "lucide-react";

interface VoiceCameraProps {
  webcamRef: React.RefObject<any>;
  loading: boolean;
  modelsLoaded: boolean;
  detected: boolean;
  captured: boolean;
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
  onCapture,
  onCancel,
}) => {


  return (
    <>
      {/* CAMERA POPUP */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-3 py-3 backdrop-blur-md sm:px-4">
        {/* Popup */}
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

          {/* Header */}
          <div className="relative z-10 px-4 pt-4 text-center sm:px-6 sm:pt-5">
            <h2 className="text-lg font-bold tracking-wide text-white sm:text-xl">
              Face Registration
            </h2>

            <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
              Position your face inside the scanner
            </p>
          </div>

          {/* Camera */}
          <div className="relative z-10 flex justify-center px-3 pt-4 sm:pt-5">
            <div className="relative">
              {/* Camera glow */}
              <div
                className={`absolute -inset-4 rounded-full blur-2xl transition-all duration-500 ${
                  detected ? "bg-green-400/25" : "bg-cyan-400/20"
                }`}
              />

              {/* Outer scanner */}
              <div
                className={`relative flex h-[190px] w-[190px] items-center justify-center rounded-full border-[3px] transition-all duration-500 sm:h-[220px] sm:w-[220px] ${
                  detected
                    ? "border-green-400 shadow-[0_0_45px_rgba(34,197,94,.45)]"
                    : "border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,.35)]"
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

                  {/* Face guide */}
                  <div
                    className={`pointer-events-none absolute inset-[20px] rounded-[45%] border-2 transition-all duration-500 sm:inset-[24px] ${
                      detected ? "border-green-400" : "border-white/80"
                    }`}
                  />

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
                  {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-[2px]">
                      <Loader2 size={30} className="animate-spin text-white" />

                      <p className="mt-2 text-[10px] font-medium text-white sm:text-xs">
                        Capturing...
                      </p>
                    </div>
                  )}

                  {/* Captured */}
                  {captured && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-950/75 backdrop-blur-sm">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-400/20">
                        <CheckCircle2 size={26} className="text-green-400" />
                      </div>

                      <p className="mt-2 text-[10px] font-semibold text-green-300 sm:text-xs">
                        Captured
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
                  detected
                    ? "border-green-400/30 bg-green-950 text-green-300"
                    : "border-cyan-400/30 bg-slate-900 text-cyan-300"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    detected
                      ? "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,1)]"
                      : "animate-pulse bg-cyan-400"
                  }`}
                />

                {detected ? "Face Detected" : "Scanning..."}
              </div>
            </div>
          </div>

          {/* Instruction */}
          <div className="relative z-10 px-4 pt-8 text-center sm:px-6">
            <p className="text-xs font-medium text-white sm:text-sm">
              {captured
                ? "Face captured successfully"
                : detected
                  ? "Hold still"
                  : "Look directly at the camera"}
            </p>

            <p className="mt-0.5 text-[9px] text-slate-500 sm:text-[11px]">
              {captured
                ? "Ready for registration"
                : detected
                  ? "Keep your face centered for a moment"
                  : "Make sure your face is clearly visible"}
            </p>
          </div>

          {/* Status cards */}
          <div className="relative z-10 grid grid-cols-3 gap-1.5 px-3 pt-4 sm:gap-2 sm:px-5">
            {/* Model */}
            <div
              className={`rounded-xl border px-1.5 py-2 text-center ${
                modelsLoaded
                  ? "border-green-400/20 bg-green-400/5"
                  : "border-yellow-400/20 bg-yellow-400/5"
              }`}
            >
              <div className="flex justify-center">
                {modelsLoaded ? (
                  <CheckCircle2 size={16} className="text-green-400" />
                ) : (
                  <Loader2 size={16} className="animate-spin text-yellow-400" />
                )}
              </div>

              <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
                Model
              </p>

              <p
                className={`text-[9px] font-semibold sm:text-[11px] ${
                  modelsLoaded ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {modelsLoaded ? "Ready" : "Loading"}
              </p>
            </div>

            {/* Face */}
            <div
              className={`rounded-xl border px-1.5 py-2 text-center ${
                detected
                  ? "border-green-400/20 bg-green-400/5"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="flex justify-center">
                {detected ? (
                  <CheckCircle2 size={16} className="text-green-400" />
                ) : (
                  <XCircle size={16} className="text-slate-600" />
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

            {/* Capture */}
            <div
              className={`rounded-xl border px-1.5 py-2 text-center ${
                captured
                  ? "border-green-400/20 bg-green-400/5"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="flex justify-center">
                {captured ? (
                  <CheckCircle2 size={16} className="text-green-400" />
                ) : (
                  <Camera size={16} className="text-slate-600" />
                )}
              </div>

              <p className="mt-1 text-[7px] uppercase tracking-wider text-slate-500 sm:text-[9px]">
                Capture
              </p>

              <p
                className={`text-[9px] font-semibold sm:text-[11px] ${
                  captured ? "text-green-400" : "text-slate-500"
                }`}
              >
                {captured ? "Done" : "Waiting"}
              </p>
            </div>
          </div>

          {/* Tips */}
          {!captured && (
            <div className="relative z-10 mx-3 mt-2.5 flex items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-2.5 py-2 sm:mx-5">
              <ShieldCheck size={15} className="shrink-0 text-cyan-400" />

              <p className="text-[9px] leading-3.5 text-slate-400 sm:text-[10px] sm:leading-4">
                Good lighting • Face centered • Look at camera • Stay still
              </p>
            </div>
          )}

          {/* Buttons */}
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
              disabled={!modelsLoaded || !detected || loading || captured}
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
                    <Camera size={15} className="sm:h-[17px] sm:w-[17px]" />
                    Capture Face
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceCamera;

