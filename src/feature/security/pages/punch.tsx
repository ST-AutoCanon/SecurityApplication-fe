// import { useCallback, useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";
// import {
//   Camera,
//   ScanFace,
//   CheckCircle2,
//   XCircle,
//   Loader2,
//   ShieldCheck,
// } from "lucide-react";

// import { useFace } from "../../../context/FaceContext";
// import Alert from "../../../components/Aleartmessage";
// import { useNavigate } from "react-router-dom";

// // import { faceCapture } from "../face/enrollment/capture";
// import { faceCapture, FaceQualityError } from "../face/enrollment/capture";
// import { faceRecognizer } from "../face/recognition/recognizer";
// import { passiveLiveness } from "../face/liveness/passive";
// import { faceAligner } from "../face/alignment/align";

// const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// const MAX_RETRIES = 3;

// export default function FacePunch() {
//   const webcamRef = useRef<Webcam>(null);

//   const navigate = useNavigate();

//   const { isModelsLoaded, isLoadingModels, loadFaceModels } = useFace();

//   const punchedRef = useRef(false);
//   const retryCountRef = useRef(0);
//   const processingRef = useRef(false);

//   const [cameraOpen, setCameraOpen] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [message, setMessage] = useState("");

//   const [showAlert, setShowAlert] = useState(false);

//   const [alertType, setAlertType] = useState<"success" | "error">("error");

//   const [alertMessage, setAlertMessage] = useState("");

//   const [errorCode, setErrorCode] = useState("");

//   const [punchData, setPunchData] = useState<{
//     full_name: string;
//     module_name: string;
//     punch_type: string;
//   } | null>(null);

//   const [showConfirm, setShowConfirm] = useState(false);

//   const [verifiedUser, setVerifiedUser] = useState<any>(null);

//   const [capturedPhoto, setCapturedPhoto] = useState("");

//   const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);
  
//   const [lowConfidence, setLowConfidence] = useState(false);
//   const [matchPercentage, setMatchPercentage] = useState(0);
  

//   const processFrame = useCallback(async () => {
//     if (
//       !webcamRef.current ||
//       !webcamRef.current.video ||
//       processingRef.current ||
//       punchedRef.current
//     ) {
//       return;
//     }

//     processingRef.current = true;
//     setLoading(true);

//     try {
//       const video = webcamRef.current.video as HTMLVideoElement;

//       const capture = await faceCapture.capture(video, {
//         validateQuality: true,
//       });

//       console.log("========== FACE PUNCH ==========");

//       const det = capture.detection;

//       if (!det) {
//         console.log("No detection found.");
//         return;
//       }

//       console.log("Video Size:", {
//         width: video.videoWidth,
//         height: video.videoHeight,
//       });

//       console.log("Detection:", det);

//       console.log("BBox:", det.bbox);
//       console.log("BBox Type:", typeof det.bbox);
//       console.log("BBox Keys:", Object.keys(det.bbox || {}));
//       console.dir(det.bbox);

//       let faceWidth = 0;
//       let faceHeight = 0;

//       // Support x,y,width,height
//       if ("width" in det.bbox && "height" in det.bbox) {
//         faceWidth = det.bbox.width;
//         faceHeight = det.bbox.height;

//         console.log("BBox Format: x,y,width,height");
//         console.log({
//           x: det.bbox.x,
//           y: det.bbox.y,
//           width: det.bbox.width,
//           height: det.bbox.height,
//         });
//       }

//       // Support x1,y1,x2,y2
//       else if (
//         "x1" in det.bbox &&
//         "y1" in det.bbox &&
//         "x2" in det.bbox &&
//         "y2" in det.bbox
//       ) {
//         faceWidth = det.bbox.x2 - det.bbox.x1;
//         faceHeight = det.bbox.y2 - det.bbox.y1;

//         console.log("BBox Format: x1,y1,x2,y2");
//         console.log({
//           x1: det.bbox.x1,
//           y1: det.bbox.y1,
//           x2: det.bbox.x2,
//           y2: det.bbox.y2,
//         });
//       }

//       console.log("Face Size:", {
//         width: faceWidth,
//         height: faceHeight,
//       });

//       console.log(
//         "Face Coverage:",
//         (
//           ((faceWidth * faceHeight) / (video.videoWidth * video.videoHeight)) *
//           100
//         ).toFixed(2) + "%",
//       );

//       console.log("Landmarks:", det.landmarks);

//       console.log("===============================");

//       const liveness = passiveLiveness.check(capture.image, capture.detection);

//       if (!liveness.isLive) {
//         setMessage("❌ Liveness check failed.");

//         retryCountRef.current++;

//         return;
//       }

//       // const recognition = await faceRecognizer.recognize(capture.image);

//       // const descriptor = Array.from(recognition.embedding);

//       const aligned = faceAligner.align(
//         capture.image,
//         capture.detection.landmarks,
//       );

//       console.log("Aligned Face:", aligned);

//       console.log("Aligned Size:", {
//         width: aligned.width,
//         height: aligned.height,
//       });
//       // document.body.appendChild(aligned);

//       const embedding = await faceRecognizer.embeddingFromAligned(aligned);

//       const emb = Array.from(embedding);

//       const norm = Math.sqrt(emb.reduce((sum, v) => sum + v * v, 0));

//       console.log("Embedding Length:", emb.length);
//       console.log("Embedding Norm:", norm);
//       console.log("First 10 Values:", emb.slice(0, 10));
//       const descriptor = Array.from(embedding);

//       const photo = capture.image.toDataURL("image/jpeg", 0.9);

//       setCapturedPhoto(photo);

//       const res = await axios.post(
//         `${API_URL}/punch-data/verify-face`,
//         {
//           descriptor,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       console.log("res punch data:", res.data);


//       console.log("res punch data:", res.data);

// // ==========================================
// // LOW CONFIDENCE FACE MATCH
// // ==========================================
// if (res.data.code === "LOW_CONFIDENCE_MATCH") {
//   const distance = Number(res.data.distance ?? 0);

//   // Approximate percentage for UI display
//   const percentage = Math.max(
//     0,
//     Math.min(100, (1 - distance / 2) * 100)
//   );

//   console.log("Face Distance:", distance);
//   console.log("Approx Match Percentage:", percentage);

//   setMatchPercentage(percentage);
//   setLowConfidence(true);

//     // IMPORTANT: show the Alert
//   setShowAlert(true);

//   // Stop automatic scanning
//   punchedRef.current = true;
//   processingRef.current = false;

//   // Save photo
//   setCapturedPhoto(photo);

//   // Close camera
//   setCameraOpen(false);

//   return;
// }


//       if (res.data.success) {
//         // stop scanning
//         processingRef.current = true;
//         punchedRef.current = true;

//         setVerifiedUser(res.data.data);

//         // close webcam
//         setCameraOpen(false);

//         // show popup
//         setShowConfirm(true);

//         return;
//       }

//       retryCountRef.current++;

//       const backendMessage = res.data?.message || "Face verification failed.";

//       const backendCode = res.data?.code || res.data?.errorCode || "";

      
//       if (
//         backendCode === "FACE_NOT_FOUND" ||
//         backendMessage === "user record was not found."
//       ) {
//         console.log("User record not found.");

//         setCameraOpen(false);

//         punchedRef.current = true;
//         processingRef.current = false;

//         setShowRegisterConfirm(true);

//         return;
//       }
//       setErrorCode(res.data?.code || "");

//       if (retryCountRef.current >= MAX_RETRIES) {
//         setAlertType("error");

//         setAlertMessage(backendMessage);

//         setShowAlert(true);

//         setCameraOpen(false);

//         return;
//       }

//       setMessage(
//         `❌ ${backendMessage} Retrying (${retryCountRef.current}/${MAX_RETRIES})...`,
//       );
//     } catch (err: any) {
//       console.log("FACE PUNCH ERROR:", err);

//       console.log("ERROR RESPONSE:", err?.response?.data);

//      // ==========================================
//   // FACE QUALITY ERROR
//   // ==========================================
//   if (err instanceof FaceQualityError) {
//     console.log("FACE QUALITY ERROR:", err.message);

//     // Stop processing while popup is visible
//     processingRef.current = true;
//     punchedRef.current = true;

//     setAlertType("error");
//     setAlertMessage(err.message);
//     setShowAlert(true);

//     // Stop camera popup while showing the alert
//     setCameraOpen(false);

//     return;
//   }

//       const backendMessage =
//   err?.response?.data?.message ||
//   err?.message ||
//         "Face verification failed.";
      
//       const backendCode =
//         err?.response?.data?.code || err?.response?.data?.errorCode || "";

      
      
//      if (
//        backendCode === "FACE_NOT_FOUND" ||
//        backendMessage === "user record was not found."
//      ) {
//        console.log("User record not found.");

//        setCameraOpen(false);

//        punchedRef.current = true;
//        processingRef.current = false;

//        setShowRegisterConfirm(true);

//        return;
//      }
//       retryCountRef.current++;

//       if (retryCountRef.current >= MAX_RETRIES) {
//         setAlertType("error");

//         setErrorCode(err?.response?.data?.code || "");

//         setAlertMessage(
//           err?.response?.data?.message || "Face verification failed.",
//         );

//         setShowAlert(true);

//         setCameraOpen(false);
//       } else {
//         // setMessage(err?.response?.data?.message || "Retrying...");
//         setMessage(
//           `❌ ${
//             err?.response?.data?.message || "Face verification failed."
//           } Retrying (${retryCountRef.current}/${MAX_RETRIES})...`,
//         );
//       }
//     } finally {
//       processingRef.current = false;
//       setLoading(false);
//     }
//   }, []);

//   const confirmPunch = async () => {
//     if (!verifiedUser) return;

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${API_URL}/punch-data/confirm-punch`,
//         {
//           table_name: verifiedUser.module_name,
//           user_id: verifiedUser.id,
//           full_name: verifiedUser.full_name,
//           distance: verifiedUser.distance,
//           photo: capturedPhoto,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       console.log("res punch data:", res.data);




//       if (res.data.success) {
//         punchedRef.current = true;

//         retryCountRef.current = 0;

//         const punch = res.data.data;

//         setPunchData({
//           full_name: punch.full_name,
//           module_name: punch.module_name,
//           punch_type: punch.punch_type,
//         });

//         setMessage(`✅ Punch ${punch.punch_type} - Welcome ${punch.full_name}`);

//         setShowConfirm(false);

//         setVerifiedUser(null);

//         setCapturedPhoto("");

//         setCameraOpen(false);

//         setTimeout(() => {
//           setPunchData(null);
//           setMessage("");
//           setCapturedPhoto("");

//           punchedRef.current = false;
//           retryCountRef.current = 0;
//           processingRef.current = false;
//         }, 3000);
//       }
//     } catch (err: any) {
//       setAlertType("error");

//       setAlertMessage(err?.response?.data?.message || "Punch failed.");

//       setShowAlert(true);

//       setShowConfirm(false);

//       processingRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const rejectPunch = () => {
//     setShowConfirm(false);

//     setVerifiedUser(null);

//     setCapturedPhoto("");

//     punchedRef.current = false;
//     processingRef.current = false;

//     retryCountRef.current = 0;

//     setMessage("Please look at the camera again.");

//     setCameraOpen(true);
//   };

//   useEffect(() => {
//     if (!cameraOpen || !isModelsLoaded) {
//       return;
//     }

//     const timer = setInterval(() => {
//       if (processingRef.current || punchedRef.current) {
//         return;
//       }

//       processFrame();
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [cameraOpen, isModelsLoaded, processFrame]);

//   if (isLoadingModels) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="text-xl font-semibold">
//             Loading Face Recognition Models...
//           </div>

//           <div className="mt-2 text-gray-500">Please wait a few seconds.</div>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
//       {/* =========================================================
//         BACKGROUND
//     ========================================================= */}

//       <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-500/15 blur-[140px]" />

//       <div className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[140px]" />

//       {/* =========================================================
//         ALERT
//     ========================================================= */}

//       {/* {showAlert && (
//         <Alert
//           type={alertType}
//           confirm={lowConfidence}
//           message={
//             lowConfidence
//               ? `Face match is approximately ${matchPercentage.toFixed(
//                   0,
//                 )}%. This is a low-confidence match. Do you want to register this user?`
//               : alertMessage
//           }
//           confirmText="Yes"
//           cancelText="No"
//           onClose={() => {
//             setShowAlert(false);

//             if (lowConfidence) {
//               setLowConfidence(false);
//               setMatchPercentage(0);

//               punchedRef.current = false;
//               processingRef.current = false;
//               retryCountRef.current = 0;

//               setMessage("Please look at the camera again.");
//               setCameraOpen(true);
//             } else {
//               punchedRef.current = false;
//               retryCountRef.current = 0;
//               processingRef.current = false;
//             }
//           }}
//           onConfirm={
//             lowConfidence
//               ? () => {
//                   setShowAlert(false);
//                   setLowConfidence(false);
//                   setMatchPercentage(0);

//                   punchedRef.current = true;
//                   processingRef.current = false;

//                   navigate("/security/organisation/manage_registration");
//                 }
//               : undefined
//           }
//         />
//       )} */}

//       {showAlert && (
//         <Alert
//           type={alertType}
//           confirm={lowConfidence}
//           message={
//             lowConfidence
//               ? `Face match is approximately ${matchPercentage.toFixed(
//                   0,
//                 )}%. This is a low-confidence match. Do you want to register this user?`
//               : alertMessage
//           }
//           confirmText="Yes"
//           cancelText="No"
//           onClose={() => {
//             setShowAlert(false);

//             // LOW CONFIDENCE
//             if (lowConfidence) {
//               setLowConfidence(false);
//               setMatchPercentage(0);

//               punchedRef.current = false;
//               processingRef.current = false;
//               retryCountRef.current = 0;

//               setMessage("Please look at the camera again.");
//               setCameraOpen(true);

//               return;
//             }

//             // NORMAL ERROR / QUALITY ERROR
//             punchedRef.current = false;
//             processingRef.current = false;
//             retryCountRef.current = 0;

//             setAlertMessage("");
//             setErrorCode("");

//             setMessage("Please look at the camera again.");

//             // Resume camera automatically
//             setCameraOpen(true);
//           }}
//           onConfirm={
//             lowConfidence
//               ? () => {
//                   setShowAlert(false);
//                   setLowConfidence(false);
//                   setMatchPercentage(0);

//                   punchedRef.current = true;
//                   processingRef.current = false;

//                   navigate("/security/organisation/manage_registration");
//                 }
//               : undefined
//           }
//         />
//       )}

//       {showRegisterConfirm && (
//         <Alert
//           type="warning"
//           confirm={true}
//           message="user record was not found. Do you want to register this user?"
//           confirmText="Yes"
//           cancelText="No"
//           onClose={() => {
//             // NO
//             setShowRegisterConfirm(false);

//             punchedRef.current = false;
//             processingRef.current = false;
//             retryCountRef.current = 0;

//             setMessage("Please look at the camera again.");
//             setCameraOpen(true);
//           }}
//           onConfirm={() => {
//             // YES
//             setShowRegisterConfirm(false);

//             punchedRef.current = true;
//             processingRef.current = false;

//             navigate("/security/organisation/manage_registration");
//           }}
//         />
//       )}

//       {/* =========================================================
//         FACE VERIFIED CONFIRMATION
//     ========================================================= */}

//       {showConfirm && verifiedUser && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
//           <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900/95 p-6 shadow-[0_25px_100px_rgba(0,0,0,.6)] sm:p-8">
//             <div className="flex justify-center">
//               <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10">
//                 <ScanFace size={42} className="text-cyan-400" />
//               </div>
//             </div>

//             <h2 className="mt-6 text-center text-2xl font-bold text-white">
//               Face Verified
//             </h2>

//             <p className="mt-3 text-center text-sm text-slate-400">Are you</p>

//             <h3 className="mt-2 text-center text-2xl font-bold text-cyan-400 sm:text-3xl">
//               {verifiedUser.full_name}
//             </h3>

//             <p className="mt-2 text-center text-sm capitalize text-slate-500">
//               {verifiedUser.module_name}
//             </p>

//             <div className="mt-7 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={confirmPunch}
//                 disabled={loading}
//                 className="
//                 rounded-xl
//                 bg-green-500
//                 py-3
//                 font-semibold
//                 text-white
//                 transition
//                 hover:bg-green-600
//                 disabled:cursor-not-allowed
//                 disabled:opacity-50
//               "
//               >
//                 Yes
//               </button>

//               <button
//                 type="button"
//                 onClick={rejectPunch}
//                 disabled={loading}
//                 className="
//                 rounded-xl
//                 bg-red-500/10
//                 py-3
//                 font-semibold
//                 text-red-300
//                 border
//                 border-red-400/20
//                 transition
//                 hover:bg-red-500
//                 hover:text-white
//                 disabled:cursor-not-allowed
//                 disabled:opacity-50
//               "
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================================
//         MAIN CARD
//     ========================================================= */}

//       <div className="relative mx-auto w-full max-w-3xl">
//         <div
//           className="
//           overflow-hidden
//           rounded-[28px]
//           border
//           border-white/10
//           bg-white/[0.04]
//           shadow-[0_25px_80px_rgba(0,0,0,.45)]
//           backdrop-blur-2xl
//         "
//         >
//           {/* =====================================================
//             HEADER
//         ===================================================== */}

//           <div className="border-b border-white/10 px-5 py-6 sm:px-8 sm:py-7">
//             <div className="flex items-center gap-4">
//               <div
//                 className="
//                 flex
//                 h-14
//                 w-14
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-2xl
//                 bg-gradient-to-br
//                 from-cyan-400
//                 to-blue-600
//                 shadow-[0_0_35px_rgba(6,182,212,.35)]
//               "
//               >
//                 <ScanFace size={28} className="text-white" />
//               </div>

//               <div className="min-w-0">
//                 <h1 className="text-xl font-bold tracking-wide text-white sm:text-2xl">
//                   FACE PUNCH
//                 </h1>

//                 <p className="mt-1 text-xs text-slate-400 sm:text-sm">
//                   AI Powered Face Recognition
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* =====================================================
//             CONTENT
//         ===================================================== */}

//           <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
//             {/* Recognition Engine */}

//             <div className="flex items-center justify-between rounded-2xl border border-cyan-400/10 bg-slate-900/50 p-4 sm:p-5">
//               <div className="min-w-0">
//                 <p className="text-sm font-semibold text-white sm:text-base">
//                   Recognition Engine
//                 </p>

//                 <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
//                   SCRFD + MobileFaceNet + Liveness
//                 </p>
//               </div>

//               <div className="ml-3 shrink-0">
//                 {isModelsLoaded ? (
//                   <div className="flex items-center gap-1.5 text-xs font-semibold text-green-400 sm:text-sm">
//                     <CheckCircle2 size={18} />
//                     Ready
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400 sm:text-sm">
//                     <Loader2 size={18} className="animate-spin" />
//                     Loading
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Message */}

//             {message && (
//               <div
//                 className={`rounded-2xl border p-4 ${
//                   message.includes("✅")
//                     ? "border-green-500/20 bg-green-500/10"
//                     : message.includes("❌")
//                       ? "border-red-500/20 bg-red-500/10"
//                       : "border-blue-500/20 bg-blue-500/10"
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   {message.includes("✅") ? (
//                     <CheckCircle2
//                       className="mt-0.5 shrink-0 text-green-400"
//                       size={20}
//                     />
//                   ) : message.includes("❌") ? (
//                     <XCircle
//                       className="mt-0.5 shrink-0 text-red-400"
//                       size={20}
//                     />
//                   ) : (
//                     <Loader2
//                       className="mt-0.5 shrink-0 animate-spin text-blue-400"
//                       size={20}
//                     />
//                   )}

//                   <p className="text-sm font-medium text-white">{message}</p>
//                 </div>
//               </div>
//             )}

//             {/* Punch Data */}

//             {punchData && (
//               <div className="space-y-3 rounded-2xl border border-green-400/20 bg-green-500/10 p-4 sm:p-5">
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="text-sm text-slate-400">Name</span>

//                   <span className="text-right text-sm font-semibold text-white">
//                     {punchData.full_name}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between gap-4">
//                   <span className="text-sm text-slate-400">Module</span>

//                   <span className="text-right text-sm font-semibold capitalize text-cyan-300">
//                     {punchData.module_name}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between gap-4">
//                   <span className="text-sm text-slate-400">Punch Type</span>

//                   <span
//                     className={`text-sm font-bold ${
//                       punchData.punch_type === "IN"
//                         ? "text-green-400"
//                         : "text-orange-400"
//                     }`}
//                   >
//                     {punchData.punch_type}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* =====================================================
//               START CAMERA BUTTON
//           ===================================================== */}

//             {!cameraOpen && (
//               <button
//                 type="button"
//                 disabled={!isModelsLoaded}
//                 onClick={() => {
//                   setCameraOpen(true);
//                   setCapturedPhoto("");
//                   setShowConfirm(false);
//                   setVerifiedUser(null);
//                   setMessage("");
//                   setPunchData(null);

//                   punchedRef.current = false;
//                   retryCountRef.current = 0;
//                   processingRef.current = false;
//                 }}
//                 className="
//                 group
//                 relative
//                 w-full
//                 overflow-hidden
//                 rounded-2xl
//                 bg-gradient-to-r
//                 from-cyan-500
//                 to-blue-600
//                 py-4
//                 font-semibold
//                 text-white
//                 shadow-[0_10px_35px_rgba(6,182,212,.2)]
//                 transition
//                 hover:scale-[1.01]
//                 hover:shadow-[0_15px_45px_rgba(6,182,212,.3)]
//                 active:scale-[0.98]
//                 disabled:cursor-not-allowed
//                 disabled:opacity-40
//               "
//               >
//                 <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />

//                 <span className="relative flex items-center justify-center gap-2">
//                   <Camera size={20} />
//                   Start Face Scan
//                 </span>
//               </button>
//             )}

//             {/* =====================================================
//               SECURITY FOOTER
//           ===================================================== */}

//             <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
//               <div className="flex min-w-0 items-center gap-3">
//                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
//                   <ShieldCheck size={18} className="text-cyan-400" />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="truncate text-xs font-medium text-white sm:text-sm">
//                     Secure Face Authentication
//                   </p>

//                   <p className="hidden text-[10px] text-slate-500 sm:block">
//                     Liveness protected verification
//                   </p>
//                 </div>
//               </div>

//               <div
//                 className={`ml-3 h-2.5 w-2.5 shrink-0 rounded-full ${
//                   isModelsLoaded
//                     ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,.9)]"
//                     : "animate-pulse bg-yellow-400"
//                 }`}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//         CAMERA POPUP
//         ONLY CAMERA + STATUS + CLOSE
//     ========================================================= */}

//       {cameraOpen && (
//         <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md">
//           <div className="flex w-full max-w-sm flex-col items-center">
//             {/* Small popup heading */}

//             <div className="mb-5 text-center">
//               <h2 className="text-lg font-bold text-white sm:text-xl">
//                 Face Verification
//               </h2>

//               <p className="mt-1 text-xs text-slate-400">
//                 Position your face inside the scanner
//               </p>
//             </div>

//             {/* ===================================================
//               ROUND CAMERA
//           =================================================== */}

//             <div className="relative">
//               {/* Outer glow */}

//               <div
//                 className={`
//                 absolute
//                 -inset-5
//                 rounded-full
//                 blur-2xl
//                 transition-all
//                 duration-500
//                 ${loading ? "bg-blue-500/25" : "bg-cyan-400/20"}
//               `}
//               />

//               {/* Camera outer ring */}

//               <div
//                 className="
//                 relative
//                 flex
//                 h-[250px]
//                 w-[250px]
//                 items-center
//                 justify-center
//                 rounded-full
//                 border-[3px]
//                 border-cyan-400
//                 bg-slate-950
//                 shadow-[0_0_45px_rgba(6,182,212,.45)]
//                 sm:h-[290px]
//                 sm:w-[290px]
//                 md:h-[320px]
//                 md:w-[320px]
//               "
//               >
//                 {/* Camera */}

//                 <div
//                   className="
//                   relative
//                   h-[228px]
//                   w-[228px]
//                   overflow-hidden
//                   rounded-full
//                   bg-black
//                   sm:h-[268px]
//                   sm:w-[268px]
//                   md:h-[298px]
//                   md:w-[298px]
//                 "
//                 >
//                   <Webcam
//                     ref={webcamRef}
//                     mirrored
//                     audio={false}
//                     screenshotFormat="image/jpeg"
//                     videoConstraints={{
//                       width: 720,
//                       height: 720,
//                       facingMode: "user",
//                     }}
//                     className="absolute inset-0 h-full w-full object-cover"
//                   />

//                   {/* Camera darkness */}

//                   <div className="pointer-events-none absolute inset-0 bg-black/10" />

//                   {/* Face guide */}

//                   <div
//                     className="
//                     pointer-events-none
//                     absolute
//                     inset-[15%]
//                     rounded-[45%]
//                     border-2
//                     border-white/80
//                   "
//                   />

//                   {/* Face guide corners */}

//                   <div className="pointer-events-none absolute left-[15%] top-[15%] h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-cyan-300" />

//                   <div className="pointer-events-none absolute right-[15%] top-[15%] h-7 w-7 rounded-tr-lg border-r-2 border-t-2 border-cyan-300" />

//                   <div className="pointer-events-none absolute bottom-[15%] left-[15%] h-7 w-7 rounded-bl-lg border-b-2 border-l-2 border-cyan-300" />

//                   <div className="pointer-events-none absolute bottom-[15%] right-[15%] h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-cyan-300" />

//                   {/* Scanning line */}

//                   {!loading && (
//                     <div
//                       className="
//                       pointer-events-none
//                       absolute
//                       left-[18%]
//                       right-[18%]
//                       top-1/2
//                       h-[2px]
//                       bg-cyan-400
//                       shadow-[0_0_15px_rgba(34,211,238,1)]
//                       animate-[scan_2s_ease-in-out_infinite]
//                     "
//                     />
//                   )}

//                   {/* Loading */}

//                   {loading && (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-[2px]">
//                       <Loader2 size={38} className="animate-spin text-white" />

//                       <p className="mt-3 text-xs font-semibold text-white">
//                         Scanning Face...
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Scanner dots */}

//                 <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

//                 <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

//                 <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

//                 <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />
//               </div>

//               {/* Status pill */}

//               <div
//                 className="
//                 absolute
//                 -bottom-4
//                 left-1/2
//                 -translate-x-1/2
//                 whitespace-nowrap
//                 rounded-full
//                 border
//                 border-cyan-400/30
//                 bg-slate-950
//                 px-4
//                 py-1.5
//                 text-[11px]
//                 font-semibold
//                 text-cyan-300
//                 shadow-xl
//               "
//               >
//                 <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

//                 {loading ? "Scanning Face..." : "Position Face Inside Circle"}
//               </div>
//             </div>

//             {/* Instruction */}

//             <p className="mt-9 text-center text-xs text-slate-400">
//               Look directly at the camera and stay still
//             </p>

//             {/* Close */}

//             <button
//               type="button"
//               onClick={() => {
//                 setCameraOpen(false);
//                 setShowConfirm(false);
//                 setVerifiedUser(null);
//                 setCapturedPhoto("");
//                 setMessage("");
//                 setPunchData(null);

//                 retryCountRef.current = 0;
//                 punchedRef.current = false;
//                 processingRef.current = false;
//               }}
//               disabled={loading}
//               className="
//               mt-5
//               rounded-xl
//               border
//               border-white/10
//               bg-white/5
//               px-8
//               py-2.5
//               text-sm
//               font-semibold
//               text-slate-300
//               transition
//               hover:bg-white/10
//               hover:text-white
//               disabled:cursor-not-allowed
//               disabled:opacity-40
//             "
//             >
//               Close Camera
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );

// }


import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import {
  Camera,
  ScanFace,
  CheckCircle2,
  XCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { useFace } from "../../../context/FaceContext";
import Alert from "../../../components/Aleartmessage";
import { useNavigate } from "react-router-dom";

import { faceCapture, FaceQualityError } from "../face/enrollment/capture";
import { faceRecognizer } from "../face/recognition/recognizer";
import { passiveLiveness } from "../face/liveness/passive";
import { faceAligner } from "../face/alignment/align";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const MAX_RETRIES = 3;

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function FacePunch() {
  const webcamRef = useRef<Webcam>(null);

  const navigate = useNavigate();

  const { isModelsLoaded, isLoadingModels } = useFace();

  const punchedRef = useRef(false);
  const retryCountRef = useRef(0);
  const processingRef = useRef(false);

  const [cameraOpen, setCameraOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const [alertType, setAlertType] = useState<"success" | "error">("error");

  const [alertMessage, setAlertMessage] = useState("");

  const [errorCode, setErrorCode] = useState("");

  const [punchData, setPunchData] = useState<{
    full_name: string;
    module_name: string;
    punch_type: string;
  } | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);

  const [verifiedUser, setVerifiedUser] = useState<any>(null);

  const [capturedPhoto, setCapturedPhoto] = useState("");

  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);

  const [lowConfidence, setLowConfidence] = useState(false);

  const [matchPercentage, setMatchPercentage] = useState(0);

  // ============================================================
  // PUNCH DETAILS
  // ============================================================

  const [showPunchDetails, setShowPunchDetails] = useState(false);

  const [apartmentNumber, setApartmentNumber] = useState("");

  const [vehicleNumber, setVehicleNumber] = useState("");

  const [activePunchField, setActivePunchField] = useState<
    "apartment" | "vehicle" | null
  >(null);

  const [punchDetailStep, setPunchDetailStep] = useState<
    "apartment" | "vehicle"
  >("apartment");

  const [punchDetailsListening, setPunchDetailsListening] = useState(false);

  const punchRecognitionRef = useRef<any>(null);
  const activePunchFieldRef = useRef<"apartment" | "vehicle" | null>(null);

  // Speech recognition lifecycle refs
  const speechStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const speechPendingFieldRef = useRef<"apartment" | "vehicle" | null>(null);

  const speechRecognitionRunningRef = useRef(false);

  const speechRecognitionStoppingRef = useRef(false);

  // ============================================================
  // SPEECH
  // ============================================================

  const speak = (text: string) => {
    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = "en-IN";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = () => {
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  //   // ============================================================
  //   // PUNCH VOICE RECOGNITION
  //   // ============================================================

  //   useEffect(() => {
  //     const SpeechRecognition =
  //       window.SpeechRecognition || window.webkitSpeechRecognition;

  //     if (!SpeechRecognition) {
  //       console.warn("Speech Recognition is not supported in this browser.");
  //       return;
  //     }

  //     const recognition = new SpeechRecognition();

  //     recognition.lang = "en-IN";
  //     recognition.continuous = false;
  //     recognition.interimResults = false;
  //     recognition.maxAlternatives = 1;

  //     recognition.onstart = () => {
  //       console.log("Punch speech recognition started");
  //       setPunchDetailsListening(true);
  //     };

  //     recognition.onend = () => {
  //       console.log("Punch speech recognition ended");
  //       setPunchDetailsListening(false);
  //     };

  //     recognition.onerror = (event: any) => {
  //       console.error("Punch speech recognition error:", event.error);
  //       setPunchDetailsListening(false);
  //     };

  // recognition.onresult = async (event: any) => {
  //   const text = event.results[0][0].transcript.trim();

  //   console.log("Punch details voice:", text);

  //   const normalizedText = text.toLowerCase();

  //   // ========================================================
  //   // SKIP VOICE COMMAND
  //   // ========================================================

  //   const isSkip =
  //     normalizedText === "skip" ||
  //     normalizedText.includes("skip apartment") ||
  //     normalizedText.includes("skip vehicle");

  //   if (isSkip) {
  //     try {
  //       punchRecognitionRef.current?.stop();
  //     } catch {}

  //     setPunchDetailsListening(false);

  //     // ======================================================
  //     // SKIP APARTMENT
  //     // ======================================================

  //     if (activePunchField === "apartment") {
  //       setApartmentNumber("");
  //       setActivePunchField(null);

  //       setPunchDetailStep("vehicle");

  //       await speak(
  //         "Apartment skipped. Please provide your vehicle number, or say skip.",
  //       );

  //       setTimeout(() => {
  //         startPunchListening("vehicle");
  //       }, 500);

  //       return;
  //     }

  //     // ======================================================
  //     // SKIP VEHICLE
  //     // ======================================================

  //     if (activePunchField === "vehicle") {
  //       setVehicleNumber("");
  //       setActivePunchField(null);

  //       await speak(
  //         "Vehicle skipped. Please review the details and confirm the punch.",
  //       );

  //       return;
  //     }
  //   }

  //   // ========================================================
  //   // APARTMENT NUMBER
  //   // ========================================================

  //   if (activePunchField === "apartment") {
  //     setApartmentNumber(text);

  //     setPunchDetailsListening(false);
  //     setActivePunchField(null);

  //     await speak("Thank you. Now please provide your vehicle number.");

  //     // Automatically move UI to Vehicle
  //     setPunchDetailStep("vehicle");

  //     // Automatically start vehicle listening
  //     setTimeout(() => {
  //       startPunchListening("vehicle");
  //     }, 500);

  //     return;
  //   }

  //   // ========================================================
  //   // VEHICLE NUMBER
  //   // ========================================================

  //   if (activePunchField === "vehicle") {
  //     setVehicleNumber(text.toUpperCase());

  //     setPunchDetailsListening(false);
  //     setActivePunchField(null);

  //     await speak("Thank you. Please review the details and confirm the punch.");

  //     return;
  //   }
  // };

  //     punchRecognitionRef.current = recognition;

  //     return () => {
  //       try {
  //         recognition.stop();
  //       } catch {}

  //       punchRecognitionRef.current = null;
  //     };
  //   }, [activePunchField]);

  // ============================================================
  // PUNCH VOICE RECOGNITION
  // ============================================================

  // ============================================================
  // PUNCH VOICE RECOGNITION
  // ============================================================

useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("🎤 Speech Recognition is not supported in this browser.");
    return;
  }

  // ============================================================
  // RESET SPEECH LIFECYCLE
  // ============================================================

  speechRecognitionRunningRef.current = false;
  speechRecognitionStoppingRef.current = false;
  speechPendingFieldRef.current = null;

  if (speechStartTimeoutRef.current) {
    clearTimeout(speechStartTimeoutRef.current);
    speechStartTimeoutRef.current = null;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // ============================================================
  // START
  // ============================================================

  recognition.onstart = () => {
    console.log("🎤 Punch speech recognition started");

    speechRecognitionRunningRef.current = true;
    speechRecognitionStoppingRef.current = false;

    setPunchDetailsListening(true);
  };

  // ============================================================
  // END
  // ============================================================

  recognition.onend = () => {
    console.log("🎤 Punch speech recognition ended");

    speechRecognitionRunningRef.current = false;
    speechRecognitionStoppingRef.current = false;

    setPunchDetailsListening(false);

    const pendingField = speechPendingFieldRef.current;

    if (!pendingField) {
      return;
    }

    // Consume pending field
    speechPendingFieldRef.current = null;

    // Clear existing timer
    if (speechStartTimeoutRef.current) {
      clearTimeout(speechStartTimeoutRef.current);
      speechStartTimeoutRef.current = null;
    }

    console.log("🎤 Pending field after onend:", pendingField);

    // Give browser time to completely release recognition
    speechStartTimeoutRef.current = setTimeout(() => {
      speechStartTimeoutRef.current = null;

      const currentRecognition = punchRecognitionRef.current;

      if (!currentRecognition) {
        console.warn("🎤 Recognition instance no longer exists.");
        return;
      }

      // Field is no longer active
      if (activePunchFieldRef.current !== pendingField) {
        console.log("🎤 Pending field is no longer active:", pendingField);
        return;
      }

      // Something else already started recognition
      if (speechRecognitionRunningRef.current) {
        console.log("🎤 Recognition already running.");
        return;
      }

      // IMPORTANT:
      // onend means the previous recognition is completely finished.
      speechRecognitionStoppingRef.current = false;

      try {
        console.log("🎤 Starting pending recognition:", pendingField);

        speechRecognitionRunningRef.current = true;

        currentRecognition.start();
      } catch (err) {
        console.error("🎤 Unable to start pending recognition:", err);

        speechRecognitionRunningRef.current = false;
        speechRecognitionStoppingRef.current = false;

        setPunchDetailsListening(false);
      }
    }, 300);
  };

  // ============================================================
  // ERROR
  // ============================================================

  recognition.onerror = (event: any) => {
    console.error("🎤 Punch speech recognition error:", event.error);

    speechRecognitionRunningRef.current = false;
    speechRecognitionStoppingRef.current = false;

    setPunchDetailsListening(false);

    if (event.error === "aborted") {
      return;
    }

    if (event.error === "not-allowed") {
      console.warn("🎤 Microphone permission was denied.");
    }

    if (event.error === "no-speech") {
      console.warn("🎤 No speech detected.");
    }

    if (event.error === "audio-capture") {
      console.warn("🎤 No microphone/audio input available.");
    }
  };

  // ============================================================
  // RESULT
  // ============================================================

recognition.onresult = async (event: any) => {
  const text = event.results?.[0]?.[0]?.transcript?.trim() || "";

  // 🔍 RAW SPEECH
  console.log("🎤 RAW SPEECH:", JSON.stringify(text));

  const normalizedText = text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .trim();

  // 🔍 NORMALIZED SPEECH
  console.log("🎤 NORMALIZED SPEECH:", JSON.stringify(normalizedText));

  // IMPORTANT:
  // Always use the ref because React state can be stale
  // inside this event handler.
  const currentField = activePunchFieldRef.current;

  // 🔍 CURRENT FIELD
  console.log("🎤 CURRENT FIELD:", currentField);

  console.log("🎤 Punch voice:", text);


  if (!currentField) {
    console.warn("⚠️ No active punch field.");
    return;
  }

  // ==========================================================
  // RESULT RECEIVED
  // Stop automatic restart for this result
  // ==========================================================

  speechPendingFieldRef.current = null;

  if (speechStartTimeoutRef.current) {
    clearTimeout(speechStartTimeoutRef.current);

    speechStartTimeoutRef.current = null;
  }

  // ==========================================================
  // STOP CURRENT RECOGNITION
  // ==========================================================

  speechRecognitionStoppingRef.current = true;

  try {
    recognition.stop();
  } catch {}

  speechRecognitionRunningRef.current = false;

  setPunchDetailsListening(false);

  // ==========================================================
  // SKIP
  // ==========================================================

  const isSkipCommand =
    normalizedText === "skip" ||
    normalizedText === "skip it" ||
    normalizedText === "skip this" ||
    normalizedText.includes("skip apartment") ||
    normalizedText.includes("skip the apartment") ||
    normalizedText.includes("skip apartment number") ||
    normalizedText.includes("skip the apartment number") ||
    normalizedText.includes("skip vehicle") ||
    normalizedText.includes("skip the vehicle") ||
    normalizedText.includes("skip vehicle number") ||
    normalizedText.includes("skip the vehicle number");

  if (isSkipCommand) {
    console.log("✅ Voice skip detected:", normalizedText);

    // ========================================================
    // SKIP APARTMENT
    // ========================================================

    if (currentField === "apartment") {
      setApartmentNumber("");

      // IMPORTANT:
      // Keep vehicle active while speaking.
      activePunchFieldRef.current = "vehicle";
      setActivePunchField("vehicle");

      setPunchDetailStep("vehicle");

      await speak(
        "Apartment skipped. Please provide your vehicle number, or say skip.",
      );

      // onend() will start vehicle recognition
      speechPendingFieldRef.current = "vehicle";

      return;
    }

    // ========================================================
    // SKIP VEHICLE
    // ========================================================

    if (currentField === "vehicle") {
      setVehicleNumber("");

      activePunchFieldRef.current = null;
      setActivePunchField(null);

      await speak(
        "Vehicle skipped. Please review the details and confirm the punch.",
      );

      return;
    }
  }

  // ==========================================================
  // APARTMENT NUMBER
  // ==========================================================

  if (currentField === "apartment") {
    console.log("🏠 Apartment received:", text);

    setApartmentNumber(text);

    // IMPORTANT:
    // Keep the field active until onend has processed
    // the pending vehicle request.
    activePunchFieldRef.current = "vehicle";
    setActivePunchField("vehicle");

    setPunchDetailStep("vehicle");

    await speak(
      "Thank you. Now please provide your vehicle number, or say skip.",
    );

    // onend() starts vehicle recognition safely
    speechPendingFieldRef.current = "vehicle";

    return;
  }

  // ==========================================================
  // VEHICLE NUMBER
  // ==========================================================

  if (currentField === "vehicle") {
    console.log("🚗 Vehicle received:", text);

    setVehicleNumber(text.toUpperCase());

    activePunchFieldRef.current = null;
    setActivePunchField(null);

    await speak("Thank you. Please review the details and confirm the punch.");

    return;
  }
};

  // ============================================================
  // SAVE RECOGNITION INSTANCE
  // ============================================================

  punchRecognitionRef.current = recognition;

  console.log("🎤 Punch speech recognition initialized");

  // ============================================================
  // CLEANUP
  // ============================================================

  return () => {
    console.log("🧹 Cleaning up punch speech recognition");

    if (speechStartTimeoutRef.current) {
      clearTimeout(speechStartTimeoutRef.current);

      speechStartTimeoutRef.current = null;
    }

    speechPendingFieldRef.current = null;
    activePunchFieldRef.current = null;

    speechRecognitionStoppingRef.current = true;

    try {
      recognition.stop();
    } catch {}

    speechRecognitionRunningRef.current = false;

    setPunchDetailsListening(false);

    if (punchRecognitionRef.current === recognition) {
      punchRecognitionRef.current = null;
    }
  };
}, []);

  // ============================================================
  // START PUNCH LISTENING
  // ============================================================

const startPunchListening = (field: "apartment" | "vehicle") => {
  const recognition = punchRecognitionRef.current;

  if (!recognition) {
    console.warn("🎤 Speech recognition not available.");
    return;
  }

  console.log("🎤 Starting listening for:", field);

  activePunchFieldRef.current = field;
  setActivePunchField(field);

  // ------------------------------------------------------------
  // If recognition is already running, don't start again.
  // ------------------------------------------------------------

  if (speechRecognitionRunningRef.current) {
    console.log("🎤 Recognition already running. Ignoring start.");

    return;
  }

  // ------------------------------------------------------------
  // If browser is still stopping the previous session,
  // queue ONLY ONE request.
  // ------------------------------------------------------------

  if (speechRecognitionStoppingRef.current) {
    console.log("🎤 Recognition is stopping. Queuing field:", field);

    speechPendingFieldRef.current = field;

    return;
  }

  // ------------------------------------------------------------
  // Prevent duplicate timers
  // ------------------------------------------------------------

  if (speechStartTimeoutRef.current) {
    clearTimeout(speechStartTimeoutRef.current);
    speechStartTimeoutRef.current = null;
  }

  speechStartTimeoutRef.current = setTimeout(() => {
    speechStartTimeoutRef.current = null;

    // Field changed while waiting
    if (activePunchFieldRef.current !== field) {
      console.log("🎤 Speech start cancelled because field changed.");

      return;
    }

    // Something else started recognition
    if (speechRecognitionRunningRef.current) {
      console.log("🎤 Recognition already running.");
      return;
    }

    // Browser is still stopping
    if (speechRecognitionStoppingRef.current) {
      console.log("🎤 Recognition still stopping. Not starting.");

      speechPendingFieldRef.current = field;

      return;
    }

    try {
      console.log("🎤 Calling recognition.start() for:", field);

      speechRecognitionRunningRef.current = true;

      recognition.start();
    } catch (err: any) {
      console.error("🎤 Unable to start speech recognition:", err);

      speechRecognitionRunningRef.current = false;
      speechRecognitionStoppingRef.current = false;

      setPunchDetailsListening(false);
    }
  }, 150);
};

  // ============================================================
  // STOP / CLEANUP PUNCH SPEECH
  // ============================================================

  const stopPunchSpeech = () => {
    // Clear pending start timer
    if (speechStartTimeoutRef.current) {
      clearTimeout(speechStartTimeoutRef.current);
      speechStartTimeoutRef.current = null;
    }

    // Prevent onend from automatically starting another field
    speechPendingFieldRef.current = null;

    // Tell lifecycle that recognition is being intentionally stopped
    speechRecognitionStoppingRef.current = true;

    try {
      punchRecognitionRef.current?.stop();
    } catch {}

    speechRecognitionRunningRef.current = false;

    setPunchDetailsListening(false);

    activePunchFieldRef.current = null;
    setActivePunchField(null);
  };

  // ============================================================
  // STOP SPEECH BEFORE SWITCHING FIELD
  // ============================================================

  const stopPunchSpeechForSwitch = () => {
    if (speechStartTimeoutRef.current) {
      clearTimeout(speechStartTimeoutRef.current);
      speechStartTimeoutRef.current = null;
    }

    speechPendingFieldRef.current = null;

    speechRecognitionStoppingRef.current = true;

    try {
      punchRecognitionRef.current?.stop();
    } catch {}

    speechRecognitionRunningRef.current = false;

    setPunchDetailsListening(false);
  };

  // ============================================================
  // PROCESS FRAME
  // ============================================================

  const processFrame = useCallback(async () => {
    if (
      !webcamRef.current ||
      !webcamRef.current.video ||
      processingRef.current ||
      punchedRef.current
    ) {
      return;
    }

    processingRef.current = true;
    setLoading(true);

    try {
      const video = webcamRef.current.video as HTMLVideoElement;

      const capture = await faceCapture.capture(video, {
        validateQuality: true,
      });

      console.log("========== FACE PUNCH ==========");

      const det = capture.detection;

      if (!det) {
        console.log("No detection found.");
        return;
      }

      console.log("Video Size:", {
        width: video.videoWidth,
        height: video.videoHeight,
      });

      console.log("Detection:", det);

      console.log("BBox:", det.bbox);
      console.log("BBox Type:", typeof det.bbox);
      console.log("BBox Keys:", Object.keys(det.bbox || {}));
      console.dir(det.bbox);

      let faceWidth = 0;
      let faceHeight = 0;

      if ("width" in det.bbox && "height" in det.bbox) {
        faceWidth = det.bbox.width;
        faceHeight = det.bbox.height;

        console.log("BBox Format: x,y,width,height");

        console.log({
          x: det.bbox.x,
          y: det.bbox.y,
          width: det.bbox.width,
          height: det.bbox.height,
        });
      } else if (
        "x1" in det.bbox &&
        "y1" in det.bbox &&
        "x2" in det.bbox &&
        "y2" in det.bbox
      ) {
        faceWidth = det.bbox.x2 - det.bbox.x1;
        faceHeight = det.bbox.y2 - det.bbox.y1;

        console.log("BBox Format: x1,y1,x2,y2");

        console.log({
          x1: det.bbox.x1,
          y1: det.bbox.y1,
          x2: det.bbox.x2,
          y2: det.bbox.y2,
        });
      }

      console.log("Face Size:", {
        width: faceWidth,
        height: faceHeight,
      });

      console.log(
        "Face Coverage:",
        (
          ((faceWidth * faceHeight) / (video.videoWidth * video.videoHeight)) *
          100
        ).toFixed(2) + "%",
      );

      console.log("Landmarks:", det.landmarks);

      console.log("===============================");

      const liveness = passiveLiveness.check(capture.image, capture.detection);

      if (!liveness.isLive) {
        setMessage("❌ Liveness check failed.");

        retryCountRef.current++;

        return;
      }

      const aligned = faceAligner.align(
        capture.image,
        capture.detection.landmarks,
      );

      console.log("Aligned Face:", aligned);

      console.log("Aligned Size:", {
        width: aligned.width,
        height: aligned.height,
      });

      const embedding = await faceRecognizer.embeddingFromAligned(aligned);

      const emb = Array.from(embedding);

      const norm = Math.sqrt(emb.reduce((sum, v) => sum + v * v, 0));

      console.log("Embedding Length:", emb.length);
      console.log("Embedding Norm:", norm);
      console.log("First 10 Values:", emb.slice(0, 10));

      const descriptor = Array.from(embedding);

      const photo = capture.image.toDataURL("image/jpeg", 0.9);

      setCapturedPhoto(photo);

      const res = await axios.post(
        `${API_URL}/punch-data/verify-face`,
        {
          descriptor,
        },
        {
          withCredentials: true,
        },
      );

      console.log("res punch data:", res.data);

      // ==========================================================
      // LOW CONFIDENCE
      // ==========================================================

      if (res.data.code === "LOW_CONFIDENCE_MATCH") {
        const distance = Number(res.data.distance ?? 0);

        const percentage = Math.max(0, Math.min(100, (1 - distance / 2) * 100));

        console.log("Face Distance:", distance);
        console.log("Approx Match Percentage:", percentage);

        setMatchPercentage(percentage);
        setLowConfidence(true);

        setShowAlert(true);

        punchedRef.current = true;
        processingRef.current = false;

        setCapturedPhoto(photo);

        setCameraOpen(false);

        return;
      }

      // ==========================================================
      // FACE VERIFIED
      // ==========================================================

      if (res.data.success) {
        processingRef.current = true;
        punchedRef.current = true;

        setVerifiedUser(res.data.data);

        setCameraOpen(false);

        setShowConfirm(true);

        return;
      }

      retryCountRef.current++;

      const backendMessage = res.data?.message || "Face verification failed.";

      const backendCode = res.data?.code || res.data?.errorCode || "";

      if (
        backendCode === "FACE_NOT_FOUND" ||
        backendMessage === "user record was not found."
      ) {
        console.log("User record not found.");

        setCameraOpen(false);

        punchedRef.current = true;
        processingRef.current = false;

        setShowRegisterConfirm(true);

        return;
      }

      setErrorCode(res.data?.code || "");

      if (retryCountRef.current >= MAX_RETRIES) {
        setAlertType("error");

        setAlertMessage(backendMessage);

        setShowAlert(true);

        setCameraOpen(false);

        return;
      }

      setMessage(
        `❌ ${backendMessage} Retrying (${retryCountRef.current}/${MAX_RETRIES})...`,
      );
    } catch (err: any) {
      console.log("FACE PUNCH ERROR:", err);

      console.log("ERROR RESPONSE:", err?.response?.data);

      // ==========================================================
      // FACE QUALITY ERROR
      // ==========================================================

      if (err instanceof FaceQualityError) {
        console.log("FACE QUALITY ERROR:", err.message);

        processingRef.current = true;
        punchedRef.current = true;

        setAlertType("error");
        setAlertMessage(err.message);
        setShowAlert(true);

        setCameraOpen(false);

        return;
      }

      const backendMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Face verification failed.";

      const backendCode =
        err?.response?.data?.code || err?.response?.data?.errorCode || "";

      if (
        backendCode === "FACE_NOT_FOUND" ||
        backendMessage === "user record was not found."
      ) {
        console.log("User record not found.");

        setCameraOpen(false);

        punchedRef.current = true;
        processingRef.current = false;

        setShowRegisterConfirm(true);

        return;
      }

      retryCountRef.current++;

      if (retryCountRef.current >= MAX_RETRIES) {
        setAlertType("error");

        setErrorCode(err?.response?.data?.code || "");

        setAlertMessage(
          err?.response?.data?.message || "Face verification failed.",
        );

        setShowAlert(true);

        setCameraOpen(false);
      } else {
        setMessage(
          `❌ ${
            err?.response?.data?.message || "Face verification failed."
          } Retrying (${retryCountRef.current}/${MAX_RETRIES})...`,
        );
      }
    } finally {
      processingRef.current = false;
      setLoading(false);
    }
  }, []);

  // ============================================================
  // CONFIRM PUNCH
  // ============================================================

  const confirmPunch = async () => {
    if (!verifiedUser) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/punch-data/confirm-punch`,
        {
          table_name: verifiedUser.module_name,
          user_id: verifiedUser.id,
          full_name: verifiedUser.full_name,
          distance: verifiedUser.distance,
          photo: capturedPhoto,

          // Optional for IN, empty for OUT
          apartment_number: apartmentNumber.trim() || null,
          vehicle_number: vehicleNumber.trim().toUpperCase() || null,
        },
        {
          withCredentials: true,
        },
      );

      console.log("res punch data:", res.data);

      if (res.data.success) {
        punchedRef.current = true;

        retryCountRef.current = 0;

        const punch = res.data.data;

        setPunchData({
          full_name: punch.full_name,
          module_name: punch.module_name,
          punch_type: punch.punch_type,
        });

        setMessage(`✅ Punch ${punch.punch_type} - Welcome ${punch.full_name}`);

        setShowConfirm(false);
        setShowPunchDetails(false);

        setVerifiedUser(null);

        setCapturedPhoto("");

        setApartmentNumber("");
        setVehicleNumber("");

        setCameraOpen(false);

        setTimeout(() => {
          setPunchData(null);
          setMessage("");
          setCapturedPhoto("");

          punchedRef.current = false;
          retryCountRef.current = 0;
          processingRef.current = false;
        }, 3000);
      }
    } catch (err: any) {
      setAlertType("error");

      setAlertMessage(err?.response?.data?.message || "Punch failed.");

      setShowAlert(true);

      setShowConfirm(false);

      setShowPunchDetails(false);

      processingRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // OPEN PUNCH DETAILS
  // ============================================================

  // const openPunchDetails = async () => {
  //   setShowConfirm(false);

  //   setApartmentNumber("");
  //   setVehicleNumber("");

  //   setActivePunchField(null);

  //   setShowPunchDetails(true);

  //   await speak("Please provide the apartment number.");

  //   setTimeout(() => {
  //     startPunchListening("apartment");
  //   }, 300);
  // };

const openPunchDetails = async () => {
  // ==========================================================
  // PUNCH OUT
  // ==========================================================

  if (verifiedUser?.punch_type === "OUT") {
    setShowConfirm(false);

    setApartmentNumber("");
    setVehicleNumber("");

    activePunchFieldRef.current = null;
    setActivePunchField(null);

    speechPendingFieldRef.current = null;

    setPunchDetailsListening(false);

    await confirmPunch();

    return;
  }

  // ==========================================================
  // PUNCH IN
  // ==========================================================

  setShowConfirm(false);

  // Clear previous details
  setApartmentNumber("");
  setVehicleNumber("");

  // ==========================================================
  // IMPORTANT
  // Apartment must be active immediately
  // ==========================================================

  activePunchFieldRef.current = "apartment";
  setActivePunchField("apartment");

  setPunchDetailStep("apartment");

  // Show apartment screen
  setShowPunchDetails(true);

  // Clear old speech state
  speechPendingFieldRef.current = null;

  if (speechStartTimeoutRef.current) {
    clearTimeout(speechStartTimeoutRef.current);

    speechStartTimeoutRef.current = null;
  }

  speechRecognitionStoppingRef.current = false;

  setPunchDetailsListening(false);

  // ==========================================================
  // SPEAK
  // ==========================================================

  await speak("Please provide your apartment number, or say skip.");

  // ==========================================================
  // START APARTMENT RECOGNITION
  // ==========================================================

  startPunchListening("apartment");
};

  // ============================================================
  // REJECT PUNCH
  // ============================================================

  const rejectPunch = () => {
    setShowConfirm(false);

    setVerifiedUser(null);

    setCapturedPhoto("");

    punchedRef.current = false;
    processingRef.current = false;

    retryCountRef.current = 0;

    setMessage("Please look at the camera again.");

    setCameraOpen(true);
  };

  // ============================================================
  // CAMERA PROCESSING
  // ============================================================

  useEffect(() => {
    if (!cameraOpen || !isModelsLoaded) {
      return;
    }

    const timer = setInterval(() => {
      if (processingRef.current || punchedRef.current) {
        return;
      }

      processFrame();
    }, 1000);

    return () => clearInterval(timer);
  }, [cameraOpen, isModelsLoaded, processFrame]);

  // ============================================================
  // LOADING MODELS
  // ============================================================

  if (isLoadingModels) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">
            Loading Face Recognition Models...
          </div>

          <div className="mt-2 text-gray-500">Please wait a few seconds.</div>
        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      {/* =========================================================
        BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-500/15 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[140px]" />

      {/* =========================================================
        ALERT
      ========================================================= */}

      {showAlert && (
        <Alert
          type={alertType}
          confirm={lowConfidence}
          message={
            lowConfidence
              ? `Face match is approximately ${matchPercentage.toFixed(
                  0,
                )}%. This is a low-confidence match. Do you want to register this user?`
              : alertMessage
          }
          confirmText="Yes"
          cancelText="No"
          onClose={() => {
            setShowAlert(false);

            if (lowConfidence) {
              setLowConfidence(false);
              setMatchPercentage(0);

              punchedRef.current = false;
              processingRef.current = false;
              retryCountRef.current = 0;

              setMessage("Please look at the camera again.");

              setCameraOpen(true);

              return;
            }

            punchedRef.current = false;
            processingRef.current = false;
            retryCountRef.current = 0;

            setAlertMessage("");
            setErrorCode("");

            setMessage("Please look at the camera again.");

            setCameraOpen(true);
          }}
          onConfirm={
            lowConfidence
              ? () => {
                  setShowAlert(false);
                  setLowConfidence(false);
                  setMatchPercentage(0);

                  punchedRef.current = true;
                  processingRef.current = false;

                  navigate("/security/organisation/manage_registration");
                }
              : undefined
          }
        />
      )}

      {/* =========================================================
        REGISTER CONFIRM
      ========================================================= */}

      {showRegisterConfirm && (
        <Alert
          type="warning"
          confirm={true}
          message="user record was not found. Do you want to register this user?"
          confirmText="Yes"
          cancelText="No"
          onClose={() => {
            setShowRegisterConfirm(false);

            punchedRef.current = false;
            processingRef.current = false;
            retryCountRef.current = 0;

            setMessage("Please look at the camera again.");

            setCameraOpen(true);
          }}
          onConfirm={() => {
            setShowRegisterConfirm(false);

            punchedRef.current = true;
            processingRef.current = false;

            navigate("/security/organisation/manage_registration");
          }}
        />
      )}

      {/* =========================================================
        FACE VERIFIED CONFIRMATION
      ========================================================= */}

      {showConfirm && verifiedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900/95 p-6 shadow-[0_25px_100px_rgba(0,0,0,.6)] sm:p-8">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10">
                <ScanFace size={42} className="text-cyan-400" />
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-white">
              Face Verified
            </h2>

            <p className="mt-3 text-center text-sm text-slate-400">Are you</p>

            <h3 className="mt-2 text-center text-2xl font-bold text-cyan-400 sm:text-3xl">
              {verifiedUser.full_name}
            </h3>

            <p className="mt-2 text-center text-sm capitalize text-slate-500">
              {verifiedUser.module_name}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {/* YES */}
              <button
                type="button"
                onClick={openPunchDetails}
                disabled={loading}
                className="
            rounded-xl
            bg-green-500
            py-3
            font-semibold
            text-white
            transition
            hover:bg-green-600
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
              >
                Yes
              </button>

              {/* NO */}
              <button
                type="button"
                onClick={rejectPunch}
                disabled={loading}
                className="
            rounded-xl
            border
            border-red-400/20
            bg-red-500/10
            py-3
            font-semibold
            text-red-300
            transition
            hover:bg-red-500
            hover:bg-red-500
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showPunchDetails && verifiedUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl">
          <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
            {/* =====================================================
          APARTMENT SCREEN ONLY
      ===================================================== */}

            {activePunchField === "apartment" && (
              <div className="px-6 py-8 sm:px-8">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">
                    <span className="text-3xl">🏠</span>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-white">
                    Apartment Number
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Please provide your apartment number
                  </p>
                </div>

                {/* MICROPHONE */}

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => startPunchListening("apartment")}
                  className="
              mt-7
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-cyan-400/30
              bg-cyan-400/10
              py-5
              text-white
              transition
              hover:bg-cyan-400/20
              disabled:opacity-50
            "
                >
                  <span className="text-2xl">🎤</span>

                  <span className="font-semibold">
                    {punchDetailsListening
                      ? "Listening..."
                      : "Speak Apartment Number"}
                  </span>
                </button>

                {/* CAPTURED APARTMENT */}

                {apartmentNumber && (
                  <div className="mt-4 rounded-xl bg-green-500/10 p-4 text-center">
                    <p className="text-xs text-slate-500">Captured</p>

                    <p className="mt-1 text-lg font-bold text-green-400">
                      {apartmentNumber}
                    </p>
                  </div>
                )}

                {/* SKIP APARTMENT */}

                <button
                  type="button"
                  disabled={loading}
                  onClick={async () => {
                    stopPunchSpeechForSwitch();

                    setApartmentNumber("");

                    activePunchFieldRef.current = "vehicle";
                    setActivePunchField("vehicle");

                    setPunchDetailStep("vehicle");

                    await speak(
                      "Apartment skipped. Please provide your vehicle number, or say skip.",
                    );

                    startPunchListening("vehicle");
                  }}
                  className="
              mt-4
              w-full
              rounded-xl
              border
              border-yellow-400/20
              bg-yellow-400/10
              py-3
              text-sm
              font-semibold
              text-yellow-300
              hover:bg-yellow-400/20
            "
                >
                  Skip Apartment
                </button>
              </div>
            )}

            {/* =====================================================
          VEHICLE SCREEN ONLY
      ===================================================== */}

            {activePunchField === "vehicle" && (
              <div className="px-6 py-8 sm:px-8">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">
                    <span className="text-3xl">🚗</span>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-white">
                    Vehicle Number
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Please provide your vehicle number
                  </p>
                </div>

                {/* MICROPHONE */}

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => startPunchListening("vehicle")}
                  className="
              mt-7
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-cyan-400/30
              bg-cyan-400/10
              py-5
              text-white
              transition
              hover:bg-cyan-400/20
              disabled:opacity-50
            "
                >
                  <span className="text-2xl">🎤</span>

                  <span className="font-semibold">
                    {punchDetailsListening
                      ? "Listening..."
                      : "Speak Vehicle Number"}
                  </span>
                </button>

                {/* CAPTURED VEHICLE */}

                {vehicleNumber && (
                  <div className="mt-4 rounded-xl bg-green-500/10 p-4 text-center">
                    <p className="text-xs text-slate-500">Captured</p>

                    <p className="mt-1 text-lg font-bold uppercase text-green-400">
                      {vehicleNumber}
                    </p>
                  </div>
                )}

                {/* SKIP VEHICLE */}

                <button
                  type="button"
                  disabled={loading}
                  onClick={async () => {
                    stopPunchSpeech();

                    setVehicleNumber("");

                    await speak(
                      "Vehicle skipped. Please review the details and confirm the punch.",
                    );
                  }}
                  className="
              mt-4
              w-full
              rounded-xl
              border
              border-yellow-400/20
              bg-yellow-400/10
              py-3
              text-sm
              font-semibold
              text-yellow-300
              hover:bg-yellow-400/20
            "
                >
                  Skip Vehicle
                </button>
              </div>
            )}

            {/* =====================================================
          REVIEW SCREEN ONLY
      ===================================================== */}

            {activePunchField === null && (
              <div className="px-6 py-8 sm:px-8">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-400/10">
                    <CheckCircle2 size={34} className="text-green-400" />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-white">
                    Review Details
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Please confirm your punch
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-4">
                    <span className="text-sm text-slate-500">Apartment</span>

                    <span className="font-semibold text-white">
                      {apartmentNumber || "Not provided"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-4">
                    <span className="text-sm text-slate-500">Vehicle</span>

                    <span className="font-semibold uppercase text-white">
                      {vehicleNumber || "Not provided"}
                    </span>
                  </div>
                </div>

                {/* CONFIRM */}

                <button
                  type="button"
                  disabled={loading}
                  onClick={confirmPunch}
                  className="
              mt-6
              w-full
              rounded-xl
              bg-green-500
              py-4
              font-bold
              text-white
              transition
              hover:bg-green-600
              disabled:opacity-50
            "
                >
                  {loading ? "Saving..." : "Confirm Punch"}
                </button>

                {/* CANCEL */}

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    // ==========================================================
                    // STOP SPEECH COMPLETELY
                    // ==========================================================

                    if (speechStartTimeoutRef.current) {
                      clearTimeout(speechStartTimeoutRef.current);

                      speechStartTimeoutRef.current = null;
                    }

                    speechPendingFieldRef.current = null;

                    activePunchFieldRef.current = null;

                    speechRecognitionStoppingRef.current = true;

                    try {
                      punchRecognitionRef.current?.stop();
                    } catch {}

                    speechRecognitionRunningRef.current = false;

                    setPunchDetailsListening(false);

                    // ==========================================================
                    // CLOSE DETAILS
                    // ==========================================================

                    setShowPunchDetails(false);

                    setApartmentNumber("");
                    setVehicleNumber("");

                    setActivePunchField(null);

                    // ==========================================================
                    // RESET FACE PUNCH
                    // ==========================================================

                    punchedRef.current = false;
                    processingRef.current = false;

                    retryCountRef.current = 0;

                    setMessage("Please look at the camera again.");

                    setCameraOpen(true);
                  }}
                  className="
              mt-3
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              py-3
              font-semibold
              text-slate-400
              hover:bg-white/[0.08]
              hover:text-white
            "
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
        MAIN CARD
      ========================================================= */}

      <div className="relative mx-auto w-full max-w-3xl">
        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.04]
            shadow-[0_25px_80px_rgba(0,0,0,.45)]
            backdrop-blur-2xl
          "
        >
          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="border-b border-white/10 px-5 py-6 sm:px-8 sm:py-7">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-400
                  to-blue-600
                  shadow-[0_0_35px_rgba(6,182,212,.35)]
                "
              >
                <ScanFace size={28} className="text-white" />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-wide text-white sm:text-2xl">
                  FACE PUNCH
                </h1>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  AI Powered Face Recognition
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
            {/* Recognition Engine */}

            <div className="flex items-center justify-between rounded-2xl border border-cyan-400/10 bg-slate-900/50 p-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white sm:text-base">
                  Recognition Engine
                </p>

                <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                  SCRFD + MobileFaceNet + Liveness
                </p>
              </div>

              <div className="ml-3 shrink-0">
                {isModelsLoaded ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-green-400 sm:text-sm">
                    <CheckCircle2 size={18} />
                    Ready
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400 sm:text-sm">
                    <Loader2 size={18} className="animate-spin" />
                    Loading
                  </div>
                )}
              </div>
            </div>

            {/* Message */}

            {message && (
              <div
                className={`rounded-2xl border p-4 ${
                  message.includes("✅")
                    ? "border-green-500/20 bg-green-500/10"
                    : message.includes("❌")
                      ? "border-red-500/20 bg-red-500/10"
                      : "border-blue-500/20 bg-blue-500/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.includes("✅") ? (
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-green-400"
                      size={20}
                    />
                  ) : message.includes("❌") ? (
                    <XCircle
                      className="mt-0.5 shrink-0 text-red-400"
                      size={20}
                    />
                  ) : (
                    <Loader2
                      className="mt-0.5 shrink-0 animate-spin text-blue-400"
                      size={20}
                    />
                  )}

                  <p className="text-sm font-medium text-white">{message}</p>
                </div>
              </div>
            )}

            {/* Punch Data */}

            {punchData && (
              <div className="space-y-3 rounded-2xl border border-green-400/20 bg-green-500/10 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-400">Name</span>

                  <span className="text-right text-sm font-semibold text-white">
                    {punchData.full_name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-400">Module</span>

                  <span className="text-right text-sm font-semibold capitalize text-cyan-300">
                    {punchData.module_name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-400">Punch Type</span>

                  <span
                    className={`text-sm font-bold ${
                      punchData.punch_type === "IN"
                        ? "text-green-400"
                        : "text-orange-400"
                    }`}
                  >
                    {punchData.punch_type}
                  </span>
                </div>
              </div>
            )}

            {/* =====================================================
                START CAMERA
            ===================================================== */}

            {!cameraOpen && (
              <button
                type="button"
                disabled={!isModelsLoaded}
                onClick={() => {
                  setCameraOpen(true);
                  setCapturedPhoto("");
                  setShowConfirm(false);
                  setShowPunchDetails(false);
                  setVerifiedUser(null);
                  setMessage("");
                  setPunchData(null);

                  setApartmentNumber("");
                  setVehicleNumber("");
                  setActivePunchField(null);

                  punchedRef.current = false;
                  retryCountRef.current = 0;
                  processingRef.current = false;
                }}
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  py-4
                  font-semibold
                  text-white
                  shadow-[0_10px_35px_rgba(6,182,212,.2)]
                  transition
                  hover:scale-[1.01]
                  hover:shadow-[0_15px_45px_rgba(6,182,212,.3)]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />

                <span className="relative flex items-center justify-center gap-2">
                  <Camera size={20} />
                  Start Face Scan
                </span>
              </button>
            )}

            {/* =====================================================
                SECURITY FOOTER
            ===================================================== */}

            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                  <ShieldCheck size={18} className="text-cyan-400" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white sm:text-sm">
                    Secure Face Authentication
                  </p>

                  <p className="hidden text-[10px] text-slate-500 sm:block">
                    Liveness protected verification
                  </p>
                </div>
              </div>

              <div
                className={`ml-3 h-2.5 w-2.5 shrink-0 rounded-full ${
                  isModelsLoaded
                    ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,.9)]"
                    : "animate-pulse bg-yellow-400"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
        CAMERA POPUP
      ========================================================= */}

      {cameraOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md">
          <div className="flex w-full max-w-sm flex-col items-center">
            <div className="mb-5 text-center">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Face Verification
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Position your face inside the scanner
              </p>
            </div>

            <div className="relative">
              <div
                className={`
                  absolute
                  -inset-5
                  rounded-full
                  blur-2xl
                  transition-all
                  duration-500
                  ${loading ? "bg-blue-500/25" : "bg-cyan-400/20"}
                `}
              />

              <div
                className="
                  relative
                  flex
                  h-[250px]
                  w-[250px]
                  items-center
                  justify-center
                  rounded-full
                  border-[3px]
                  border-cyan-400
                  bg-slate-950
                  shadow-[0_0_45px_rgba(6,182,212,.45)]
                  sm:h-[290px]
                  sm:w-[290px]
                  md:h-[320px]
                  md:w-[320px]
                "
              >
                <div
                  className="
                    relative
                    h-[228px]
                    w-[228px]
                    overflow-hidden
                    rounded-full
                    bg-black
                    sm:h-[268px]
                    sm:w-[268px]
                    md:h-[298px]
                    md:w-[298px]
                  "
                >
                  <Webcam
                    ref={webcamRef}
                    mirrored
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                      width: 720,
                      height: 720,
                      facingMode: "user",
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-black/10" />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-[15%]
                      rounded-[45%]
                      border-2
                      border-white/80
                    "
                  />

                  <div className="pointer-events-none absolute left-[15%] top-[15%] h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-cyan-300" />

                  <div className="pointer-events-none absolute right-[15%] top-[15%] h-7 w-7 rounded-tr-lg border-r-2 border-t-2 border-cyan-300" />

                  <div className="pointer-events-none absolute bottom-[15%] left-[15%] h-7 w-7 rounded-bl-lg border-b-2 border-l-2 border-cyan-300" />

                  <div className="pointer-events-none absolute bottom-[15%] right-[15%] h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-cyan-300" />

                  {!loading && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        left-[18%]
                        right-[18%]
                        top-1/2
                        h-[2px]
                        bg-cyan-400
                        shadow-[0_0_15px_rgba(34,211,238,1)]
                        animate-[scan_2s_ease-in-out_infinite]
                      "
                    />
                  )}

                  {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-[2px]">
                      <Loader2 size={38} className="animate-spin text-white" />

                      <p className="mt-3 text-xs font-semibold text-white">
                        Scanning Face...
                      </p>
                    </div>
                  )}
                </div>

                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

                <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

                <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />
              </div>

              <div
                className="
                  absolute
                  -bottom-4
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  rounded-full
                  border
                  border-cyan-400/30
                  bg-slate-950
                  px-4
                  py-1.5
                  text-[11px]
                  font-semibold
                  text-cyan-300
                  shadow-xl
                "
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

                {loading ? "Scanning Face..." : "Position Face Inside Circle"}
              </div>
            </div>

            <p className="mt-9 text-center text-xs text-slate-400">
              Look directly at the camera and stay still
            </p>

            <button
              type="button"
              // onClick={() => {
              //   setCameraOpen(false);
              //   setShowConfirm(false);
              //   setShowPunchDetails(false);
              //   setVerifiedUser(null);
              //   setCapturedPhoto("");
              //   setMessage("");
              //   setPunchData(null);

              //   setApartmentNumber("");
              //   setVehicleNumber("");
              //   setActivePunchField(null);

              //   try {
              //     punchRecognitionRef.current?.stop();
              //   } catch {}

              //   retryCountRef.current = 0;
              //   punchedRef.current = false;
              //   processingRef.current = false;
              // }}
              onClick={() => {
                stopPunchSpeech();

                setCameraOpen(false);
                setShowConfirm(false);
                setShowPunchDetails(false);
                setVerifiedUser(null);
                setCapturedPhoto("");
                setMessage("");
                setPunchData(null);

                setApartmentNumber("");
                setVehicleNumber("");

                retryCountRef.current = 0;
                punchedRef.current = false;
                processingRef.current = false;
              }}
              disabled={loading}
              className="
                mt-5
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-8
                py-2.5
                text-sm
                font-semibold
                text-slate-300
                transition
                hover:bg-white/10
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Close Camera
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
