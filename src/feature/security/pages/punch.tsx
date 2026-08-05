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

import { faceCapture } from "../face/enrollment/capture";
import { faceRecognizer } from "../face/recognition/recognizer";
import { passiveLiveness } from "../face/liveness/passive";
import { faceAligner } from "../face/alignment/align";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const MAX_RETRIES = 3;

export default function FacePunch() {
  const webcamRef = useRef<Webcam>(null);

  const navigate = useNavigate();

  const { isModelsLoaded, isLoadingModels, loadFaceModels } = useFace();

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

      // Support x,y,width,height
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
      }

      // Support x1,y1,x2,y2
      else if (
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

      // const recognition = await faceRecognizer.recognize(capture.image);

      // const descriptor = Array.from(recognition.embedding);

      const aligned = faceAligner.align(
        capture.image,
        capture.detection.landmarks,
      );

      console.log("Aligned Face:", aligned);

      console.log("Aligned Size:", {
        width: aligned.width,
        height: aligned.height,
      });
      // document.body.appendChild(aligned);


      const embedding = await faceRecognizer.embeddingFromAligned(aligned);

      const emb = Array.from(embedding);

      const norm = Math.sqrt(emb.reduce((sum, v) => sum + v * v, 0));

      console.log("Embedding Length:", emb.length);
      console.log("Embedding Norm:", norm);
      console.log("First 10 Values:", emb.slice(0, 10));
      const descriptor = Array.from(embedding);

      // const photo = capture.image.toDataURL("image/jpeg", 0.9);

      // const res = await axios.post(
      //   `${API_URL}/punch-data/face-punch`,
      //   {
      //     descriptor,
      //     photo,
      //   },
      //   {
      //     withCredentials: true,
      //   },
      // );
      // console.log("FACE PUNCH RESPONSE:", res.data);

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

      // if (res.data?.success) {
      //   punchedRef.current = true;

      //   retryCountRef.current = 0;

      //   const punch = res.data.data;

      //   setPunchData({
      //     full_name: punch.full_name,
      //     module_name: punch.module_name,
      //     punch_type: punch.punch_type,
      //   });

      //   // setAlertType("success");

      //   // setAlertMessage(`Punch ${punch.punch_type} Successful : ${punch.full_name}`);

      //   // setShowAlert(true);

      //   setMessage(`✅ Punch ${punch.punch_type} - Welcome ${punch.full_name}`);

      //   setCameraOpen(false);
      //   // Clear UI after 3 seconds
      //   setTimeout(() => {
      //     setPunchData(null);
      //     setMessage("");

      //     punchedRef.current = false;
      //     retryCountRef.current = 0;
      //     processingRef.current = false;
      //   }, 3000);

      //   return;
      // }

      if (res.data.success) {
        // stop scanning
        processingRef.current = true;
        punchedRef.current = true;

        setVerifiedUser(res.data.data);

        // close webcam
        setCameraOpen(false);

        // show popup
        setShowConfirm(true);

        return;
      }

      // retryCountRef.current++;

      // if (retryCountRef.current >= MAX_RETRIES) {
      //   setAlertType("error");

      //   setAlertMessage(
      //     "Face not recognized after 3 attempts. Please register your face.",
      //   );

      //   setShowAlert(true);

      //   setCameraOpen(false);

      //   return;
      // }

      // setMessage(
      //   `❌ Face not recognized. Retrying (${retryCountRef.current}/${MAX_RETRIES})...`,
      // );

      retryCountRef.current++;

      const backendMessage = res.data?.message || "Face verification failed.";

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
        // setMessage(err?.response?.data?.message || "Retrying...");
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
        },
        {
          withCredentials: true,
        },
      );

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

        setVerifiedUser(null);

        setCapturedPhoto("");

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

      processingRef.current = false;
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-5 py-10">
      {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => {
            setShowAlert(false);

            punchedRef.current = false;
            retryCountRef.current = 0;

            // Redirect only on error
            if (alertType === "error" && errorCode === "FACE_NOT_FOUND") {
              navigate("/security/organisation/manage_registration");
            }
          }}
        />
      )}

      {showConfirm && verifiedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[420px] rounded-3xl border border-cyan-500/30 bg-slate-900 p-8 shadow-2xl">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/20">
                <ScanFace className="h-10 w-10 text-cyan-400" />
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-white">
              Face Verified
            </h2>

            <p className="mt-3 text-center text-slate-300">Are you</p>

            <h3 className="mt-2 text-center text-3xl font-bold text-cyan-400">
              {verifiedUser.full_name}
            </h3>

            <p className="mt-2 text-center text-slate-400 capitalize">
              {verifiedUser.module_name}
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={confirmPunch}
                disabled={loading}
                className="flex-1 rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition hover:bg-green-700"
              >
                Yes
              </button>

              <button
                onClick={rejectPunch}
                disabled={loading}
                className="flex-1 rounded-xl bg-red-600 py-3 text-lg font-semibold text-white transition hover:bg-red-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[180px] rounded-full -top-32 -left-32" />

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[180px] rounded-full bottom-0 right-0" />

      <div className="relative w-full max-w-xl">
        <div className="rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,.45)]">
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
              AI Powered Face Recognition
            </p>
          </div>

          <div className="p-7 space-y-6">
            <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/60 p-5 flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Recognition Engine</p>

                <p className="text-slate-400 text-sm">
                  SCRFD + ArcFace + Liveness
                </p>
              </div>

              {isModelsLoaded ? (
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
                <div className="flex items-center gap-3">
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
            {punchData && (
              <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Name</span>

                  <span className="text-white font-semibold">
                    {punchData.full_name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Module</span>

                  <span className="text-cyan-300 font-semibold capitalize">
                    {punchData.module_name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Punch Type</span>

                  <span
                    className={`font-bold ${
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

            {!cameraOpen && (
              <button
                disabled={!isModelsLoaded}
                onClick={() => {
                  setCapturedPhoto("");
                  setShowConfirm(false);
                  setVerifiedUser(null);
                  punchedRef.current = false;
                  retryCountRef.current = 0;
                  processingRef.current = false;

                  setMessage("");
                  setPunchData(null);
                  setCameraOpen(true);
                }}
                className="group w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_35px_rgba(6,182,212,.5)] disabled:opacity-40"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

                <span className="relative flex items-center justify-center gap-3">
                  <Camera size={22} />
                  Open Camera
                </span>
              </button>
            )}

            {cameraOpen && (
              <div className="space-y-6">
                {/* <div className="relative rounded-3xl overflow-hidden border-4 border-cyan-400 shadow-[0_0_60px_rgba(34,211,238,.45)]">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-300 animate-[scan_2.5s_linear_infinite] z-20" />

                  <Webcam
                    ref={webcamRef}
                    mirrored
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full"
                    videoConstraints={{
                      facingMode: "user",
                      width: 1280,
                      height: 720,
                    }}
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-64 h-80 rounded-[40px] border-[3px] border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,.6)]" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                    <div className="flex items-center justify-center gap-2 text-cyan-300">
                      <ShieldCheck size={18} />

                      <span className="text-sm font-medium">
                        Keep your face inside the frame
                      </span>
                    </div>
                  </div>
                </div> */}

                {/* <div className="relative w-full overflow-hidden rounded-3xl border-4 border-cyan-400">
                  <Webcam
                    ref={webcamRef}
                    mirrored
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full h-auto object-cover"
                    videoConstraints={{
                      facingMode: "user",
                      width: 1280,
                      height: 720,
                    }}
                  /> */}

                {/* <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-3xl border-4 border-cyan-400">
                  <Webcam
                    ref={webcamRef}
                    mirrored
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full aspect-3/4 object-cover"
                    videoConstraints={{
                      facingMode: "user",
                      width: 720,
                      height: 960,
                    }}
                  />
                </div> */}

                <div className="w-full max-w-6xl mx-auto">
                  <div className="relative rounded-3xl overflow-hidden border-4 border-cyan-400 bg-black">
                    <Webcam
                      ref={webcamRef}
                      mirrored
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user",
                      }}
                      className="
        w-full
        aspect-3/4
        sm:aspect-video
        lg:aspect-auto
        lg:h-[550px]
        object-cover
      "
                    />

                    {/* Face Guide */}
                    {/* Face Guide */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <div
                        className="
      relative
      w-[55%]
      aspect-[3/4]

      min-w-[180px]
      min-h-[240px]

      max-w-[320px]
      max-h-[430px]

      rounded-[45%]
      border-[5px]
      border-cyan-400
      transition-all
      duration-300
    "
                      >
                        {/* Corners */}
                        <div className="absolute left-0 top-0 w-10 h-10 border-l-4 border-t-4 border-white rounded-tl-xl" />
                        <div className="absolute right-0 top-0 w-10 h-10 border-r-4 border-t-4 border-white rounded-tr-xl" />
                        <div className="absolute left-0 bottom-0 w-10 h-10 border-l-4 border-b-4 border-white rounded-bl-xl" />
                        <div className="absolute right-0 bottom-0 w-10 h-10 border-r-4 border-b-4 border-white rounded-br-xl" />
                      </div>
                    </div>

                    {loading && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                        <Loader2
                          size={60}
                          className="animate-spin text-white"
                        />
                        <p className="mt-4 text-white text-lg">
                          Detecting Face...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCameraOpen(false);
                    setShowConfirm(false);
                    setVerifiedUser(null);
                    setCapturedPhoto("");
                    setMessage("");
                    setPunchData(null);

                    retryCountRef.current = 0;
                    punchedRef.current = false;
                    processingRef.current = false;
                  }}
                  disabled={loading}
                  className="w-full rounded-2xl border border-red-400/30 bg-red-500/10 py-4 font-semibold text-red-300 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-red-500 hover:text-white"
                >
                  Close Camera
                </button>
              </div>
            )}

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
                      SCRFD • ArcFace • Passive Liveness
                    </p>
                  </div>
                </div>

                <div
                  className={`h-3 w-3 rounded-full ${
                    isModelsLoaded
                      ? "bg-green-400 shadow-[0_0_15px_rgba(74,222,128,.9)]"
                      : "bg-yellow-400 animate-pulse"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
