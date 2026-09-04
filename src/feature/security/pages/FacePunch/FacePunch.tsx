import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Camera,
  ScanFace,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { useFace } from "../../../../context/FaceContext";
import Alert from "../../../../components/Aleartmessage";
import { useNavigate } from "react-router-dom";

import { faceCapture, FaceQualityError } from "../../face/enrollment/capture";

import { faceRecognizer } from "../../face/recognition/recognizer";

import { passiveLiveness } from "../../face/liveness/passive";

import { faceAligner } from "../../face/alignment/align";

import FaceCamera from "./FaceCamera";
import FaceVerifiedModal from "./FaceVerifiedModal";
import PunchDetailsModal from "./PunchDetailsModal";
import FacePunchStatus from "./FacePunchStatus";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const MAX_RETRIES = 3;

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function FacePunch() {
  const webcamRef = useRef<any>(null);

  const navigate = useNavigate();

  const { isModelsLoaded, isLoadingModels } = useFace();

  // ============================================================
  // SELECTED GATE
  // ============================================================

  const selectedGate = sessionStorage.getItem("selectedGate");

  let gateName = "";

  if (selectedGate) {
    try {
      const gate = JSON.parse(selectedGate);
      gateName = gate?.name || "";
    } catch (error) {
      console.error("Failed to parse selectedGate:", error);
    }
  }

  // ============================================================
  // FACE PUNCH REFS
  // ============================================================

  const punchedRef = useRef(false);

  const retryCountRef = useRef(0);

  const processingRef = useRef(false);

  // ============================================================
  // FACE PUNCH STATE
  // ============================================================

  const [cameraOpen, setCameraOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const [alertType, setAlertType] = useState<"success" | "error">("error");

  const [alertMessage, setAlertMessage] = useState("");

  const [errorCode, setErrorCode] = useState("");

  const [punchData, setPunchData] = useState<any>(null);

  const [showConfirm, setShowConfirm] = useState(false);

  const [verifiedUser, setVerifiedUser] = useState<any>(null);

  const [capturedPhoto, setCapturedPhoto] = useState("");

  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);

  const [lowConfidence, setLowConfidence] = useState(false);

  const [matchPercentage, setMatchPercentage] = useState(0);

  // ============================================================
  // PUNCH DETAILS STATE
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

  // ============================================================
  // SPEECH REFS
  // ============================================================

  const punchRecognitionRef = useRef<any>(null);

  const activePunchFieldRef = useRef<"apartment" | "vehicle" | null>(null);

  const speechStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const speechPendingFieldRef = useRef<"apartment" | "vehicle" | null>(null);

  const speechRecognitionRunningRef = useRef(false);

  const speechRecognitionStoppingRef = useRef(false);

  // ============================================================
  // SPEAK
  // ============================================================

  const speak = (text: string) => {
    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = "en-IN";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => resolve();

      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  };

  // ============================================================
  // SPEECH RECOGNITION
  // ============================================================

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition is not supported in this browser.");

      return;
    }

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

    // ==========================================================
    // START
    // ==========================================================

    recognition.onstart = () => {
      console.log("🎤 Punch speech recognition started");

      speechRecognitionRunningRef.current = true;

      speechRecognitionStoppingRef.current = false;

      setPunchDetailsListening(true);
    };

    // ==========================================================
    // END
    // ==========================================================

    recognition.onend = () => {
      console.log("🎤 Punch speech recognition ended");

      speechRecognitionRunningRef.current = false;

      speechRecognitionStoppingRef.current = false;

      setPunchDetailsListening(false);

      const pendingField = speechPendingFieldRef.current;

      if (!pendingField) {
        return;
      }

      speechPendingFieldRef.current = null;

      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);

        speechStartTimeoutRef.current = null;
      }

      speechStartTimeoutRef.current = setTimeout(() => {
        speechStartTimeoutRef.current = null;

        const currentRecognition = punchRecognitionRef.current;

        if (!currentRecognition) {
          return;
        }

        if (activePunchFieldRef.current !== pendingField) {
          return;
        }

        if (speechRecognitionRunningRef.current) {
          return;
        }

        speechRecognitionStoppingRef.current = false;

        try {
          speechRecognitionRunningRef.current = true;

          currentRecognition.start();
        } catch (err) {
          console.error("Unable to start pending recognition:", err);

          speechRecognitionRunningRef.current = false;

          speechRecognitionStoppingRef.current = false;

          setPunchDetailsListening(false);
        }
      }, 300);
    };

    // ==========================================================
    // ERROR
    // ==========================================================

    recognition.onerror = (event: any) => {
      console.error("🎤 Punch speech recognition error:", event.error);

      speechRecognitionRunningRef.current = false;

      speechRecognitionStoppingRef.current = false;

      setPunchDetailsListening(false);

      if (event.error === "aborted") {
        return;
      }

      if (event.error === "not-allowed") {
        console.warn("Microphone permission denied.");
      }

      if (event.error === "no-speech") {
        console.warn("No speech detected.");
      }

      if (event.error === "audio-capture") {
        console.warn("No microphone/audio input.");
      }
    };

    // ==========================================================
    // RESULT
    // ==========================================================

    recognition.onresult = async (event: any) => {
      const text = event.results?.[0]?.[0]?.transcript?.trim() || "";

      const normalizedText = text
        .toLowerCase()
        .replace(/[.,!?]/g, "")
        .trim();

      const currentField = activePunchFieldRef.current;

      if (!currentField) {
        return;
      }

      speechPendingFieldRef.current = null;

      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);

        speechStartTimeoutRef.current = null;
      }

      speechRecognitionStoppingRef.current = true;

      try {
        recognition.stop();
      } catch {}

      speechRecognitionRunningRef.current = false;

      setPunchDetailsListening(false);

      // ========================================================
      // SKIP
      // ========================================================

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
        if (currentField === "apartment") {
          setApartmentNumber("");

          activePunchFieldRef.current = "vehicle";

          setActivePunchField("vehicle");

          setPunchDetailStep("vehicle");

          await speak(
            "Apartment skipped. Please provide your vehicle number, or say skip.",
          );

          speechPendingFieldRef.current = "vehicle";

          return;
        }

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

      // ========================================================
      // APARTMENT
      // ========================================================

      if (currentField === "apartment") {
        setApartmentNumber(text);

        activePunchFieldRef.current = "vehicle";

        setActivePunchField("vehicle");

        setPunchDetailStep("vehicle");

        await speak(
          "Thank you. Now please provide your vehicle number, or say skip.",
        );

        speechPendingFieldRef.current = "vehicle";

        return;
      }

      // ========================================================
      // VEHICLE
      // ========================================================

      if (currentField === "vehicle") {
        setVehicleNumber(text.toUpperCase());

        activePunchFieldRef.current = null;

        setActivePunchField(null);

        await speak(
          "Thank you. Please review the details and confirm the punch.",
        );
      }
    };

    punchRecognitionRef.current = recognition;

    return () => {
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
      console.warn("Speech recognition not available.");

      return;
    }

    activePunchFieldRef.current = field;

    setActivePunchField(field);

    if (speechRecognitionRunningRef.current) {
      return;
    }

    if (speechRecognitionStoppingRef.current) {
      speechPendingFieldRef.current = field;

      return;
    }

    if (speechStartTimeoutRef.current) {
      clearTimeout(speechStartTimeoutRef.current);

      speechStartTimeoutRef.current = null;
    }

    speechStartTimeoutRef.current = setTimeout(() => {
      speechStartTimeoutRef.current = null;

      if (activePunchFieldRef.current !== field) {
        return;
      }

      if (speechRecognitionRunningRef.current) {
        return;
      }

      if (speechRecognitionStoppingRef.current) {
        speechPendingFieldRef.current = field;

        return;
      }

      try {
        speechRecognitionRunningRef.current = true;

        recognition.start();
      } catch (err) {
        console.error("Unable to start speech recognition:", err);

        speechRecognitionRunningRef.current = false;

        speechRecognitionStoppingRef.current = false;

        setPunchDetailsListening(false);
      }
    }, 150);
  };

  // ============================================================
  // STOP PUNCH SPEECH
  // ============================================================

  const stopPunchSpeech = () => {
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

    activePunchFieldRef.current = null;

    setActivePunchField(null);
  };

  // ============================================================
  // STOP SPEECH FOR FIELD SWITCH
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
  // PROCESS FACE FRAME
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

      const det = capture.detection;

      if (!det) {
        return;
      }

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

      const embedding = await faceRecognizer.embeddingFromAligned(aligned);

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

      // ========================================================
      // LOW CONFIDENCE
      // ========================================================

      if (res.data.code === "LOW_CONFIDENCE_MATCH") {
        const distance = Number(res.data.distance ?? 0);

        const percentage = Math.max(0, Math.min(100, (1 - distance / 2) * 100));

        setMatchPercentage(percentage);

        setLowConfidence(true);

        setShowAlert(true);

        punchedRef.current = true;

        processingRef.current = false;

        setCapturedPhoto(photo);

        setCameraOpen(false);

        return;
      }

      // ========================================================
      // VERIFIED
      // ========================================================

      if (res.data.success) {
        processingRef.current = true;

        punchedRef.current = true;

        setVerifiedUser(res.data.data);

        setCameraOpen(false);

        setShowConfirm(true);

        return;
      }

      // ========================================================
      // FAILED
      // ========================================================

      retryCountRef.current++;

      const backendMessage = res.data?.message || "Face verification failed.";

      const backendCode = res.data?.code || res.data?.errorCode || "";

      if (
        backendCode === "FACE_NOT_FOUND" ||
        backendMessage === "user record was not found."
      ) {
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

      if (err instanceof FaceQualityError) {
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
    if (!verifiedUser) {
      return;
    }

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

          apartment_number: apartmentNumber.trim() || null,

          vehicle_number: vehicleNumber.trim().toUpperCase() || null,

          gate_name: gateName,
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

    setApartmentNumber("");

    setVehicleNumber("");

    activePunchFieldRef.current = "apartment";

    setActivePunchField("apartment");

    setPunchDetailStep("apartment");

    setShowPunchDetails(true);

    speechPendingFieldRef.current = null;

    if (speechStartTimeoutRef.current) {
      clearTimeout(speechStartTimeoutRef.current);

      speechStartTimeoutRef.current = null;
    }

    speechRecognitionStoppingRef.current = false;

    setPunchDetailsListening(false);

    await speak("Please provide your apartment number, or say skip.");

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
  // CAMERA PROCESSING INTERVAL
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
  // CLOSE CAMERA
  // ============================================================

  const closeCamera = () => {
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
  };

  // ============================================================
  // START CAMERA
  // ============================================================

  const startCamera = () => {
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
  };

  // ============================================================
  // CANCEL PUNCH DETAILS
  // ============================================================

  const cancelPunchDetails = () => {
    stopPunchSpeech();

    setShowPunchDetails(false);

    setApartmentNumber("");

    setVehicleNumber("");

    setActivePunchField(null);

    punchedRef.current = false;

    processingRef.current = false;

    retryCountRef.current = 0;

    setMessage("Please look at the camera again.");

    setCameraOpen(true);
  };

  // ============================================================
  // SKIP APARTMENT
  // ============================================================

  const skipApartment = async () => {
    stopPunchSpeechForSwitch();

    setApartmentNumber("");

    activePunchFieldRef.current = "vehicle";

    setActivePunchField("vehicle");

    setPunchDetailStep("vehicle");

    await speak(
      "Apartment skipped. Please provide your vehicle number, or say skip.",
    );

    startPunchListening("vehicle");
  };

  // ============================================================
  // SKIP VEHICLE
  // ============================================================

  const skipVehicle = async () => {
    stopPunchSpeech();

    setVehicleNumber("");

    await speak(
      "Vehicle skipped. Please review the details and confirm the punch.",
    );
  };

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
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-500/15 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[140px]" />

      {/* =====================================================
          ALERT
      ===================================================== */}

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

      {/* =====================================================
          REGISTER CONFIRM
      ===================================================== */}

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

      {/* =====================================================
          FACE VERIFIED
      ===================================================== */}

      {showConfirm && verifiedUser && (
        <FaceVerifiedModal
          verifiedUser={verifiedUser}
          loading={loading}
          onConfirm={openPunchDetails}
          onReject={rejectPunch}
        />
      )}

      {/* =====================================================
          PUNCH DETAILS
      ===================================================== */}

      {showPunchDetails && verifiedUser && (
        <PunchDetailsModal
          verifiedUser={verifiedUser}
          activePunchField={activePunchField}
          apartmentNumber={apartmentNumber}
          vehicleNumber={vehicleNumber}
          punchDetailsListening={punchDetailsListening}
          loading={loading}
          onStartListening={startPunchListening}
          onSkipApartment={skipApartment}
          onSkipVehicle={skipVehicle}
          onConfirm={confirmPunch}
          onCancel={cancelPunchDetails}
        />
      )}

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

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
          {/* =================================================
              HEADER
          ================================================= */}

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

          {/* =================================================
              CONTENT
          ================================================= */}

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

            {/* Status */}

            <FacePunchStatus message={message} punchData={punchData} />

            {/* =================================================
                START CAMERA
            ================================================= */}

            {!cameraOpen && (
              <button
                type="button"
                disabled={!isModelsLoaded}
                onClick={startCamera}
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

            {/* =================================================
                SECURITY FOOTER
            ================================================= */}

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

      {/* =====================================================
          CAMERA
      ===================================================== */}

      {cameraOpen && (
        <FaceCamera
          webcamRef={webcamRef}
          loading={loading}
          onClose={closeCamera}
        />
      )}
    </div>
  );
}
