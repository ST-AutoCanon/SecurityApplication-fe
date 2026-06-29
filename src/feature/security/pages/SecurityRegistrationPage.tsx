// // import React from "react";

// // const AuthPage = () => {
// //   const handleClick = () => {
// //     alert("This feature is under process. Please check back later!");
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
// //         <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
// //           Welcome
// //         </h1>

// //         <p className="text-center text-gray-500 mb-8">
// //           Login & Registration are currently under process.
// //         </p>

// //         <div className="space-y-4">
// //           <button
// //             onClick={handleClick}
// //             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
// //           >
// //             Login
// //           </button>

// //           <button
// //             onClick={handleClick}
// //             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
// //           >
// //             Register
// //           </button>
// //         </div>

// //         <div className="mt-8 rounded-lg bg-yellow-100 border border-yellow-300 p-4">
// //           <p className="text-center text-yellow-800 font-medium">
// //             🚧 Login and Registration modules are under process.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AuthPage;

// ///////////////////////////

// import { useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "face-api.js";
// import axios from "axios";

// export default function FacePunch() {
//   const webcamRef = useRef<Webcam>(null);

//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string>("");

//   const organisationId = 32; // 🔥 change dynamically if needed

//   // -------------------------------
//   // Load Face API Models
//   // -------------------------------
//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         const MODEL_URL = "/models";

//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//         ]);

//         setModelsLoaded(true);
//       } catch (err) {
//         console.error("Model loading error:", err);
//         setMessage("Failed to load face models");
//       }
//     };

//     loadModels();
//   }, []);

//   // -------------------------------
//   // FACE PUNCH FUNCTION
//   // -------------------------------
//   const punchFace = async () => {
//     try {
//       setLoading(true);
//       setMessage("");

//       const imageSrc = webcamRef.current?.getScreenshot();

//       if (!imageSrc) {
//         setMessage("No image captured");
//         return;
//       }

//       const img = await faceapi.fetchImage(imageSrc);

//       const detection = await faceapi
//         .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceDescriptor();

//       if (!detection) {
//         setMessage("Face not detected");
//         return;
//       }

//       const descriptor = Array.from(detection.descriptor);

//       const res = await axios.post(
//         `http://localhost:5000/punch-data/${organisationId}/face-punch`,
//         {
//           descriptor,
//           photo: imageSrc,
//         },
//       );

//       if (res.data?.success) {
//         setMessage(`✅ Punch Successful: ${res.data.data.full_name}`);
//       } else {
//         setMessage(`❌ ${res.data?.message || "Punch Failed"}`);
//       }

//       setCameraOpen(false);
//     } catch (err: any) {
//       console.error(err);
//       setMessage(err?.response?.data?.message || "Server Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5">
//         <h1 className="text-2xl font-bold text-center">Face Punch System</h1>

//         {/* Status message */}
//         {message && (
//           <div className="text-center text-sm p-2 bg-gray-100 rounded">
//             {message}
//           </div>
//         )}

//         {/* Open camera */}
//         {!cameraOpen && (
//           <button
//             onClick={() => setCameraOpen(true)}
//             disabled={!modelsLoaded}
//             className="w-full bg-gray-800 text-white p-3 rounded-lg"
//           >
//             {modelsLoaded ? "Open Camera" : "Loading Models..."}
//           </button>
//         )}

//         {/* Camera UI */}
//         {cameraOpen && (
//           <>
//             <Webcam
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               mirrored
//               className="rounded-xl w-full"
//             />

//             <button
//               onClick={punchFace}
//               disabled={loading}
//               className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg mt-3"
//             >
//               {loading ? "Processing..." : "Punch In"}
//             </button>

//             <button
//               onClick={() => setCameraOpen(false)}
//               className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg mt-2"
//             >
//               Close Camera
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import axios from "axios";
import {
  Camera,
  ScanFace,
  CheckCircle2,
  XCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export default function FacePunch() {
  const webcamRef = useRef<Webcam>(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const organisationId = 32;

  // ---------------- Models ----------------
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);

        setModelsLoaded(true);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load face models");
      }
    };

    loadModels();
  }, []);

  // ---------------- Punch ----------------
  const punchFace = async () => {
    try {
      setLoading(true);
      setMessage("");

      const imageSrc = webcamRef.current?.getScreenshot();

      if (!imageSrc) {
        setMessage("No image captured");
        return;
      }

      const img = await faceapi.fetchImage(imageSrc);

      const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setMessage("No face detected");
        return;
      }

      const descriptor = Array.from(detection.descriptor);

      const res = await axios.post(
        "http://localhost:5000/punch-data/face-punch",
        {
          descriptor,
          photo: imageSrc,
        },
        {
          withCredentials: true,
        },
      );

      if (res.data?.success) {
        setMessage(`✅ Punch Successful : ${res.data.data.full_name}`);
      } else {
        setMessage(`❌ ${res.data?.message || "Punch Failed"}`);
      }

      setCameraOpen(false);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-5 py-10">
      {/* Background Blur */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[180px] rounded-full -top-32 -left-32"></div>

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[180px] rounded-full bottom-0 right-0"></div>

      <div className="relative w-full max-w-xl">
        {/* Main Card */}

        <div className="rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,.45)]">
          {/* Header */}

          <div className="px-8 py-7 border-b border-white/10">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/40">
                <ScanFace className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-center text-3xl font-bold text-white mt-5 tracking-wide">
              FACE PUNCH
            </h1>

            <p className="text-center text-slate-300 mt-2 text-sm">
              AI Powered Face Recognition Attendance
            </p>
          </div>

          {/* Body */}

          <div className="p-7 space-y-6">
            {/* Model Status */}

            <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/60 p-5 flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">
                  Face Recognition Engine
                </p>

                <p className="text-slate-400 text-sm">
                  TinyFaceDetector + Face Descriptor
                </p>
              </div>

              {modelsLoaded ? (
                <div className="flex items-center gap-2 text-green-400 font-semibold">
                  <CheckCircle2 size={20} />
                  Ready
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                  <Loader2 size={20} className="animate-spin" />
                  Loading
                </div>
              )}
            </div>

            {/* Message */}

            {message && (
              <div
                className={`rounded-2xl p-4 border ${
                  message.includes("✅")
                    ? "bg-green-500/10 border-green-500/30"
                    : message.includes("❌")
                      ? "bg-red-500/10 border-red-500/30"
                      : "bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <div className="flex gap-3 items-center">
                  {message.includes("✅") ? (
                    <CheckCircle2 className="text-green-400" />
                  ) : message.includes("❌") ? (
                    <XCircle className="text-red-400" />
                  ) : (
                    <Loader2 className="animate-spin text-blue-400" />
                  )}

                  <p className="text-white font-medium">{message}</p>
                </div>
              </div>
            )}
            {/* CAMERA CLOSED */}

            {!cameraOpen && (
              <button
                onClick={() => setCameraOpen(true)}
                disabled={!modelsLoaded}
                className="group w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_35px_rgba(6,182,212,.5)] disabled:opacity-40"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>

                <span className="relative flex items-center justify-center gap-3">
                  <Camera size={22} />
                  Open Camera
                </span>
              </button>
            )}

            {/* CAMERA */}

            {cameraOpen && (
              <div className="space-y-6">
                <div className="relative rounded-3xl overflow-hidden border-4 border-cyan-400 shadow-[0_0_60px_rgba(34,211,238,.45)] transition-all duration-300">
                  {/* Animated Scan Line */}

                  <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-300 animate-[scan_2.5s_linear_infinite] z-20"></div>

                  {/* Corner Borders */}

                  <div className="absolute top-3 left-3 w-12 h-12 border-l-4 border-t-4 border-cyan-400 rounded-tl-xl z-20"></div>

                  <div className="absolute top-3 right-3 w-12 h-12 border-r-4 border-t-4 border-cyan-400 rounded-tr-xl z-20"></div>

                  <div className="absolute bottom-3 left-3 w-12 h-12 border-l-4 border-b-4 border-cyan-400 rounded-bl-xl z-20"></div>

                  <div className="absolute bottom-3 right-3 w-12 h-12 border-r-4 border-b-4 border-cyan-400 rounded-br-xl z-20"></div>

                  {/* Webcam */}

                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    mirrored
                    className="w-full"
                    videoConstraints={{
                      facingMode: "user",
                    }}
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-64 h-80 rounded-[40px] border-[3px] border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,.6)]"></div>
                  </div>

                  {/* Footer */}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                    <div className="flex items-center justify-center gap-2 text-cyan-300">
                      <ShieldCheck size={18} />

                      <span className="text-sm font-medium">
                        Position your face inside the frame
                      </span>
                    </div>
                  </div>
                </div>

                {/* Punch Button */}

                <button
                  onClick={punchFace}
                  disabled={loading}
                  className="group w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-4 text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_35px_rgba(34,197,94,.5)] disabled:opacity-60"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="animate-spin" size={22} />
                      Processing Face...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <ScanFace size={22} />
                      Punch In
                    </div>
                  )}
                </button>

                {/* Close Camera */}

                <button
                  onClick={() => setCameraOpen(false)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-red-400/30 bg-red-500/10 py-4 font-semibold text-red-300 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-red-500 hover:text-white"
                >
                  Close Camera
                </button>
              </div>
            )}
            {/* Footer */}

            <div className="pt-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <ShieldCheck size={20} className="text-cyan-400" />
                    </div>

                    <div>
                      <p className="text-white font-medium">
                        Secure Face Authentication
                      </p>

                      <p className="text-slate-400 text-xs">
                        Powered by Face API & AI Recognition
                      </p>
                    </div>
                  </div>

                  <div
                    className={`h-3 w-3 rounded-full ${
                      modelsLoaded
                        ? "bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]"
                        : "bg-yellow-400 animate-pulse"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}