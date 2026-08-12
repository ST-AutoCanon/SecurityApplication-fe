import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";

import Fuse from "fuse.js";

// import { FaceContext } from "../../../context/FaceContext";
import { useFace } from "../../../context/FaceContext";
import { faceDetector } from "../face/detector/detector";
import { faceAligner } from "../face/alignment/align";
import { faceRecognizer } from "../face/recognition/recognizer";
import { faceQuality } from "../face/quality/quality";
// import { enrollmentPipeline } from "../face/enrollment/pipeline";

import { AuthContext } from "../../../context/AuthContext";

import VoiceHeader from "../components/voice/VoiceHeader";
// import ModuleSelector from "../components/voice/ModuleSelector";
import VoiceQuestion from "../components/voice/VoiceQuestion";
import VoiceCamera from "../components/voice/VoiceCamera";
import VoiceSummary from "../components/voice/VoiceSummary";
import SuccessScreen from "../components/voice/SuccessScreen";
import Alert from "../../../components/Aleartmessage"; // adjust the path
const API = import.meta.env.VITE_BACKEND_URL;

type Module = {
  template_id: number;
  template_name: string;
  table_name: string;
};

type Field = {
  field_key: string;
  field_label: string;
  is_required: boolean;

  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    format?: string;
    message?: string;
  };

  options?: string[];
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceRegisterPage() {
  const { user, isInitializing } = useContext(AuthContext);

  const { isModelsLoaded, isLoadingModels, loadFaceModels } = useFace();

  console.log("Loaded:", isModelsLoaded);
  console.log("Loading:", isLoadingModels);

  const organisationId = user?.organisation_id;

  const webcamRef = useRef<Webcam>(null);

  const recognitionRef = useRef<any>(null);

  const fieldsRef = useRef<Field[]>([]);

  const formRef = useRef<Record<string, any>>({});

  const currentStepRef = useRef(0);

  const synth = window.speechSynthesis;

  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const [fields, setFields] = useState<Field[]>([]);

  const [currentStep, setCurrentStep] = useState(0);

  const [form, setForm] = useState<Record<string, any>>({});

  const [loading, setLoading] = useState(false);

  const [listening, setListening] = useState(false);

  const [speaking, setSpeaking] = useState(false);

  const [processing, setProcessing] = useState(false);

  const [transcript, setTranscript] = useState("");

  const [cameraOpen, setCameraOpen] = useState(false);

  const [captured, setCaptured] = useState(false);

  const [faceDetected, setFaceDetected] = useState(false);

  const [summaryPage, setSummaryPage] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [registrationId, setRegistrationId] = useState<number | string>();

  const currentField = fields[currentStep];

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false);

  const [profilePhotoCapturing, setProfilePhotoCapturing] = useState(false);
  const [captureType, setCaptureType] = useState<
    "profile_photo" | "face_descriptor"
  >("face_descriptor");

  const isReviewModeRef = useRef(false);
  const waitingForConfirmationRef = useRef(false);
  const reviewFieldRef = useRef<Field | null>(null);
  const replacingReviewValueRef = useRef(false);
  const modulesRef = useRef<Module[]>([]);

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);


  const [captureStep, setCaptureStep] = useState(0);

const [captureInstruction, setCaptureInstruction] = useState(
  "Look straight at the camera",
  );
  
  const waitingForModuleSelectionRef = useRef(true);
  const capturedEmbeddingsRef = useRef<any[]>([]);

  const autoCaptureTimerRef = useRef<number | null>(null);
  const isCapturingRef = useRef(false);
  const [alertData, setAlertData] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const captureInstructions = [
  "Look straight at the camera",
  "Turn your face slightly to the left",
  "Turn your face slightly to the right",
  "Move slightly farther from the camera",
  "Look straight at the camera again",
  ];
  

  useEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);

  useEffect(() => {
    modulesRef.current = modules;
  }, [modules]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    if (!currentField) return;

    if (isReviewModeRef.current) return;

    const hasProfilePhoto = fieldsRef.current.some(
      (f) => f.field_key.toLowerCase() === "profile_photo",
    );

    const hasFaceDescriptor = fieldsRef.current.some(
      (f) => f.field_key.toLowerCase() === "face_descriptor",
    );

    const key = currentField.field_key.toLowerCase();

    const isCurrentFaceField =
      key === "profile_photo" || key === "face_descriptor";

    if (isCurrentFaceField && (hasProfilePhoto || hasFaceDescriptor)) {
      setCameraOpen(true);
    }
  }, [currentStep, currentField]);

  useEffect(() => {
    isReviewModeRef.current = isReviewMode;
  }, [isReviewMode]);

  useEffect(() => {
    waitingForConfirmationRef.current = waitingForConfirmation;
  }, [waitingForConfirmation]);

  // =====================================
  // Load Modules
  // =====================================

  useEffect(() => {
    if (!isInitializing && organisationId) {
      loadModules();
    }
  }, [organisationId, isInitializing]);

  // useEffect(() => {
  //   if (!cameraOpen || !isModelsLoaded) return;

  //   let cancelled = false;

  //   const detectFace = async () => {
  //     const video = webcamRef.current?.video;

  //     if (
  //       !video ||
  //       video.readyState !== 4 ||
  //       video.videoWidth === 0 ||
  //       video.videoHeight === 0
  //     ) {
  //       return;
  //     }

  //     try {
  //       const faces = await faceDetector.detect(video);

  //       if (!cancelled) {
  //         setFaceDetected(faces.length > 0);
  //       }
  //     } catch (err) {
  //       console.error("Live detection error:", err);

  //       if (!cancelled) {
  //         setFaceDetected(false);
  //       }
  //     }
  //   };

  //   // Detect immediately
  //   detectFace();

  //   // Then every 300ms
  //   const interval = setInterval(detectFace, 300);

  //   return () => {
  //     cancelled = true;
  //     clearInterval(interval);
  //     setFaceDetected(false);
  //   };
  // }, [cameraOpen, isModelsLoaded]);

  useEffect(() => {
    if (!cameraOpen || !isModelsLoaded) return;

    let cancelled = false;

    const detectFace = async () => {
      const video = webcamRef.current?.video;

      if (
        !video ||
        video.readyState !== 4 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        return;
      }

      try {
        const faces = await faceDetector.detect(video);

        const detected = faces.length > 0;

        if (!cancelled) {
          setFaceDetected(detected);
        }

        // -----------------------------
        // AUTO CAPTURE
        // -----------------------------
        if (detected) {
          // Already waiting? do nothing
          if (!autoCaptureTimerRef.current && !isCapturingRef.current) {
            autoCaptureTimerRef.current = window.setTimeout(async () => {
              autoCaptureTimerRef.current = null;

              if (
                !isCapturingRef.current &&
                webcamRef.current?.video &&
                cameraOpen
              ) {
                isCapturingRef.current = true;

                try {
                  await captureFace();
                } finally {
                  isCapturingRef.current = false;
                }
              }
            }, 1500); // Hold still for 1.5 seconds
          }
        } else {
          // Face moved away → cancel timer
          if (autoCaptureTimerRef.current) {
            clearTimeout(autoCaptureTimerRef.current);
            autoCaptureTimerRef.current = null;
          }
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setFaceDetected(false);
        }

        if (autoCaptureTimerRef.current) {
          clearTimeout(autoCaptureTimerRef.current);
          autoCaptureTimerRef.current = null;
        }
      }
    };

    detectFace();

    const interval = setInterval(detectFace, 300);

    return () => {
      cancelled = true;

      clearInterval(interval);

      if (autoCaptureTimerRef.current) {
        clearTimeout(autoCaptureTimerRef.current);
        autoCaptureTimerRef.current = null;
      }

      isCapturingRef.current = false;
      setFaceDetected(false);
    };
  }, [cameraOpen, isModelsLoaded]);

  const loadModules = async () => {
    try {
      const res = await axios.get(
        `${API}/dynamic-data/${organisationId}/modules`,
        {
          withCredentials: true,
        },
      );

      const data = res.data.data || [];

      setModules(data);
      modulesRef.current = data;

      setAvailableCategories(data.map((m: Module) => m.template_name));

      waitingForModuleSelectionRef.current = true;

      const moduleNames = data.map((m: Module) => m.template_name).join(", ");

      await speak(
        `Welcome.
  Please say the registration category.
  Available categories are ${moduleNames}.`,
      );

      startListening();
      console.table(res.data.data);

      const ids = res.data.data.map((m: any) => m.template_id);
      console.log(ids);
    } catch (err) {
      console.error(err);
    }
  };

  // =====================================
  // Load Template
  // =====================================

  const loadTemplate = async (module: Module) => {
    try {
      const res = await axios.get(
        `${API}/dynamic-data/${organisationId}/template/${module.template_id}`,
        {
          withCredentials: true,
        },
      );

      const allFields: Field[] = (res.data.data.fields || []).filter(
        (field: Field) => {
          const key = field.field_key.toLowerCase();

          return key !== "created_at" && key !== "updated_at";
        },
      );

      setSelectedModule(module);

      fieldsRef.current = allFields;
      currentStepRef.current = 0;
      formRef.current = {};

      setFields(allFields);

      console.log("Loaded Fields:", allFields);

      setCurrentStep(0);

      setForm({});

      setSummaryPage(false);

      setCompleted(false);

      setTranscript("");
    } catch (err) {
      console.error(err);
    }
  };

  // =====================================
  // Update Form
  // =====================================

  const updateForm = (key: string, value: any) => {
    setForm((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };

      formRef.current = updated;

      // console.log("Updated Form:", updated);

      // console.log(
      //   "Registration Embedding:",
      //   updated.face_descriptor.slice(0, 10),
      // );
      return updated;
    });
  };

  const validateField = (field: Field, value: string): string | null => {
    const validation = field.validation;

    console.log("Field:", field);
    console.log("Validation:", field.validation);
    console.log("Value:", value);

    if (!validation) return null;

    // Required
    if (field.is_required && !value.trim()) {
      return `${field.field_label} is required.`;
    }

    // Min Length
    if (validation.minLength && value.length < validation.minLength) {
      return `${field.field_label} must contain at least ${validation.minLength} characters.`;
    }

    // Max Length
    if (validation.maxLength && value.length > validation.maxLength) {
      return `${field.field_label} cannot exceed ${validation.maxLength} characters.`;
    }

    // Pattern
    if (validation.pattern) {
      const regex = new RegExp(validation.pattern);

      if (!regex.test(value)) {
        return validation.message || `${field.field_label} is invalid.`;
      }
    }

    // Email
    if (
      validation.format === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      return "Please enter a valid email address.";
    }

    return null;
  };

  // =====================================
  // Speak Text
  // =====================================

  const speak = (text: string) => {
    return new Promise<void>((resolve) => {
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.rate = 1;

      utterance.pitch = 1;

      utterance.volume = 1;

      utterance.lang = "en-IN";

      utterance.onstart = () => {
        setSpeaking(true);
      };

      utterance.onend = () => {
        setSpeaking(false);
        resolve();
      };

      synth.speak(utterance);
    });
  };

  //=====================================
  // Review Mode
  //=====================================

  const handleReviewAgain = async () => {
    isReviewModeRef.current = true;
    setIsReviewMode(true);

    setSummaryPage(false);
    // Close camera
    setCameraOpen(false);
    setCaptured(false);
    setFaceDetected(false);

    let firstStep = 0;

    while (firstStep < fieldsRef.current.length) {
      const key = fieldsRef.current[firstStep].field_key.toLowerCase();

      if (
        key.includes("profile_photo") ||
        key.includes("profile photo") ||
        key.includes("face_descriptor") ||
        key.includes("face descriptor")
      ) {
        firstStep++;
      } else {
        break;
      }
    }

    currentStepRef.current = firstStep;
    setCurrentStep(firstStep);

    await reviewCurrentField();
  };

  const reviewCurrentField = async () => {
    const field = fieldsRef.current[currentStepRef.current];

    if (!field) {
      return;
    }

    reviewFieldRef.current = field;

    if (!field) {
      isReviewModeRef.current = false;
      setIsReviewMode(false);
      setWaitingForConfirmation(false);

      await speak("Review completed. Please click Submit to save the record.");

      setSummaryPage(true);
      return;
    }

    const value = formRef.current[field.field_key];

    // 👇 Show previous value in UI
    if (value !== undefined && value !== null && value !== "") {
      if (field.field_key === "profile_photo") {
        setTranscript("Photo already captured");
      } else if (field.field_key === "face_descriptor") {
        setTranscript("Face already registered");
      } else {
        setTranscript(`Current Value: ${value}`);
      }
    } else {
      setTranscript("Current Value: Empty");
    }

    let message = `${field.field_label}. `;

    if (value !== undefined && value !== null && value !== "") {
      if (field.field_key === "profile_photo") {
        message +=
          "A photo has already been captured. Say Capture to take a new photo or say Next to keep it.";
      } else if (field.field_key === "face_descriptor") {
        message +=
          "Face has already been registered. Say Capture to register again or say Next to keep it.";
      } else {
        message += `Current value is ${value}. Say the new value to change it, or say Next to keep the current value.`;
      }
    } else {
      message += "This field is empty. Please provide a value.";
    }

    await speak(message);

    setTimeout(() => {
      startListening();
    }, 300);

    setWaitingForConfirmation(true);
  };

  const askCurrentQuestion = async () => {
    const field = fieldsRef.current[currentStepRef.current];

    if (!field) return;

    const currentValue = formRef.current[field.field_key];

    if (isReviewMode) {
      let reviewMessage = `${field.field_label}.`;

      if (
        currentValue !== undefined &&
        currentValue !== null &&
        currentValue !== ""
      ) {
        if (field.field_key === "profile_photo") {
          reviewMessage += " A photo has already been captured.";
        } else if (field.field_key === "face_descriptor") {
          reviewMessage += " Face has already been registered.";
        } else {
          reviewMessage += ` Current value is ${currentValue}.`;
        }

        reviewMessage +=
          " Say the new value to change it, or say Next to keep the current value.";
      } else {
        reviewMessage += " This field is empty. Please provide a value.";
      }

      await speak(reviewMessage);
      return;
    }

    // ---------- Normal Registration ----------
    let message = field.field_label;

    const key = field.field_key.toLowerCase();
    const label = field.field_label.toLowerCase();

    // Email
    if (key.includes("email") || label.includes("email")) {
      message +=
        ". Please say your email address clearly. For example, vinay at gmail dot com.";
    }

    // Date
    if (
      key.includes("date") ||
      key.includes("dob") ||
      label.includes("date") ||
      label.includes("birth")
    ) {
      message +=
        ". Please say the date in Day Month Year format. For example, 10 July 1998.";
    }

    // Mobile
    if (
      key.includes("mobile") ||
      key.includes("phone") ||
      label.includes("mobile") ||
      label.includes("phone")
    ) {
      message +=
        ". Please say each digit one by one. For example, nine eight seven six five four three two one zero.";
    }

    if (!field.is_required) {
      message += ". This field is optional. You may say Skip.";
    }

    await speak(message);

    setTimeout(() => {
      startListening();
    }, 300);
  };

  //================================
  // process Model
  //======================
  const processModuleVoice = async (answer: string) => {
    console.log("===== Module Selection =====");

    console.log("PROCESS MODULE VOICE CALLED");
    console.log("Answer:", answer);
    console.log("Modules:", modulesRef.current);

    // Normalize speech
    let spoken = answer.toLowerCase().trim();

    // Common speech-recognition aliases
    const aliases: Record<string, string> = {
      made: "maid",
      maide: "maid",
      meid: "maid",
      mate: "maid",
      mad: "maid",
      maid: "maid",

      organizer: "organiser",
      organiser: "organiser",

      vender: "vendor",
      vendor: "vendor",

      security: "security",
    };

    spoken = aliases[spoken] || spoken;

    console.log("Normalized:", spoken);

    const fuse = new Fuse(modulesRef.current, {
      keys: ["template_name", "table_name", "display_name"],
      threshold: 0.45,
      ignoreLocation: true,
      includeScore: true,
      minMatchCharLength: 2,
    });

    // const results = fuse.search(spoken);

    let results = fuse.search(spoken);

    // Exact match first
    const exactMatch = modulesRef.current.find(
      (m) => m.template_name.toLowerCase().trim() === spoken,
    );

    if (exactMatch) {
      results = [
        {
          item: exactMatch,
          score: 0,
        },
      ] as any;
    }
    console.table(
      results.map((r) => ({
        name: r.item.template_name,
        score: r.score,
      })),
    );
    console.log("Fuse Results:", results);

    if (results.length === 0) {
      await speak("Module not found. Please say the module name again.");

      startListening();
      return;
    }

    const module = results[0].item;

    console.log("Selected Module:", module);

    waitingForModuleSelectionRef.current = false;

    setTranscript(`Selected Module: ${module.template_name}`);

    await speak(`${module.template_name} selected.`);

    await loadTemplate(module);

    setTimeout(() => {
      askCurrentQuestion();
    }, 300);
  };
  // =====================================
  // Process Voice Answer
  // =====================================

  // const processVoiceAnswer = async (answer: string) => {
  const processVoiceAnswer = async (answer: string, field?: Field) => {
    console.log("========== processVoiceAnswer ==========");
    console.log("Answer:", answer);
    console.log("Current Step:", currentStep);
    console.log("Current Field:", currentField);
    console.log("Fields Length:", fields.length);
    console.log("Current Form:", form);

    console.log(
      "VOICE FIELD:",
      field?.field_key,
      "STEP:",
      currentStepRef.current,
      "REVIEW:",
      isReviewModeRef.current,
    );
    // if (!currentField) return;
    if (!field) {
      console.log("No field found");
      return;
    }

    let value = answer.trim();

    // Mobile / Phone field
    if (
      field.field_key.toLowerCase().includes("mobile") ||
      field.field_key.toLowerCase().includes("phone") ||
      field.field_label.toLowerCase().includes("mobile") ||
      field.field_label.toLowerCase().includes("phone")
    ) {
      // Keep only digits
      value = value.replace(/\D/g, "");
    }

    if (
      field.field_key.toLowerCase().includes("email") ||
      field.field_label.toLowerCase().includes("email")
    ) {
      value = value
        .toLowerCase()
        .trim()

        // convert spoken words
        .replace(/\bat\b/g, "@")
        .replace(/\bdot\b/g, ".")
        .replace(/\bunderscore\b/g, "_")
        .replace(/\bhyphen\b|\bdash\b/g, "-")
        .replace(/\bplus\b/g, "+")

        // remove every remaining space
        .replace(/\s+/g, "");
    }
    setTranscript(`You said: ${value}`);

    const lower = value.toLowerCase();

    // Repeat command
    if (lower === "repeat") {
      askCurrentQuestion();
      return;
    }

    // Skip command
    if (lower === "skip") {
      if (field.is_required) {
        await speak("This field is mandatory.");
        askCurrentQuestion();
        return;
      }

      nextQuestion();
      return;
    }

    console.log("Saving value");
    console.log("Field Key:", field.field_key);
    console.log("Value:", answer);

    // const lower = value.toLowerCase();

    // REVIEW MODE
    // if (isReviewMode) {
    if (isReviewModeRef.current) {
      // if (lower === "no") {
      //   setWaitingForConfirmation(false);
      //   nextQuestion();
      //   return;
      // }

      if (lower === "no" || lower === "next") {
        setWaitingForConfirmation(false);
        await nextQuestion();
        return;
      }

      if (lower === "yes") {
        setWaitingForConfirmation(false);

        replacingReviewValueRef.current = true;

        await speak(`Please say the new ${field.field_label}.`);

        startListening();

        return;
      }

      await speak("Please say Yes or No.");

      return;
    }

    if (isReviewModeRef.current && replacingReviewValueRef.current) {
      replacingReviewValueRef.current = false;

      updateForm(field.field_key, value);

      await speak(`${field.field_label} updated`);

      await nextQuestion();

      return;
    }
    const error = validateField(field, value);

    if (error) {
      // alert(error);
      setAlertData({
        open: true,
        type: "error",
        message: error,
      });
      await speak(error);

      await askCurrentQuestion();

      return;
    }

    // updateForm(field.field_key, value);
    updateForm(field.field_key, value);

    console.log("isReviewMode:", isReviewMode);
    console.log("waitingForConfirmation:", waitingForConfirmation);
    console.log("Voice:", lower);

    console.log("isReviewModeRef:", isReviewModeRef.current);
    console.log(
      "waitingForConfirmationRef:",
      waitingForConfirmationRef.current,
    );
    console.log("Voice:", lower);

    // if (isReviewMode) {
    if (isReviewModeRef.current) {
      nextQuestion();
      return;
    }
    nextQuestion();
  };

  // =====================================
  // Next Question
  // =====================================


  const nextQuestion = async () => {
    const step = currentStepRef.current;
    const allFields = fieldsRef.current;

    // -------------------------
    // Last Field
    // -------------------------
    if (step >= allFields.length - 1) {
      if (isReviewModeRef.current) {
        isReviewModeRef.current = false;
        setIsReviewMode(false);

        waitingForConfirmationRef.current = false;
        setWaitingForConfirmation(false);

        await speak(
          "Review completed. Please click Submit to save the record.",
        );

        setSummaryPage(true);
        return;
      }

      setSummaryPage(true);
      return;
    }

    // -------------------------
    // Next Step
    // -------------------------
    const nextStep = step + 1;

    currentStepRef.current = nextStep;

    const next = allFields[nextStep];

    if (!next) {
      setSummaryPage(true);
      return;
    }

    // -------------------------
    // REVIEW MODE
    // -------------------------
    if (isReviewModeRef.current) {
      let reviewStep = nextStep;

      while (reviewStep < allFields.length) {
        const key = allFields[reviewStep].field_key.toLowerCase();

        if (
          key.includes("profile_photo") ||
          key.includes("profile photo") ||
          key.includes("face_descriptor") ||
          key.includes("face descriptor")
        ) {
          reviewStep++;
        } else {
          break;
        }
      }

      if (reviewStep >= allFields.length) {
        isReviewModeRef.current = false;
        setIsReviewMode(false);

        waitingForConfirmationRef.current = false;
        setWaitingForConfirmation(false);

        await speak(
          "Review completed. Please click Submit to save the record.",
        );

        setSummaryPage(true);
        return;
      }

      currentStepRef.current = reviewStep;
      setCurrentStep(reviewStep);

      setTimeout(() => {
        reviewCurrentField();
      }, 200);

      return;
    }


    // -------------------------
    // NORMAL FLOW
    // -------------------------
    const key = next.field_key.toLowerCase();

    // ------------------------------------
    // FACE / PROFILE PHOTO
    // ------------------------------------
    if (isFaceFieldKey(key)) {
      const hasProfilePhoto = allFields.some(
        (field) => field.field_key.toLowerCase() === "profile_photo",
      );

      const hasFaceDescriptor = allFields.some(
        (field) => field.field_key.toLowerCase() === "face_descriptor",
      );

      const profilePhotoCaptured = !!formRef.current.profile_photo;

      const faceDescriptorCaptured = !!formRef.current.face_descriptor;

      console.log("========== FACE FIELD CHECK ==========");
      console.log("Current field:", key);
      console.log("Has profile_photo:", hasProfilePhoto);
      console.log("Has face_descriptor:", hasFaceDescriptor);
      console.log("Profile photo captured:", profilePhotoCaptured);
      console.log("Face descriptor captured:", faceDescriptorCaptured);

      // ------------------------------------
      // CASE 1:
      // BOTH FIELDS EXIST
      // ------------------------------------
      if (hasProfilePhoto && hasFaceDescriptor) {
        // Both already captured.
        // Do NOT open camera again.
        if (profilePhotoCaptured && faceDescriptorCaptured) {
          console.log("Both face fields already captured. Skipping camera.");

          currentStepRef.current = nextStep;
          setCurrentStep(nextStep);

          setTimeout(async () => {
            await askCurrentQuestion();
          }, 300);

          return;
        }

        // One or both are missing.
        // Open camera ONCE.
        console.log(
          "Face fields exist and capture is incomplete. Opening camera.",
        );

        setFaceDetected(false);
        setCaptured(false);

        currentStepRef.current = nextStep;
        setCurrentStep(nextStep);

        setCameraOpen(true);

        return;
      }

      // ------------------------------------
      // CASE 2:
      // ONLY PROFILE PHOTO EXISTS
      // ------------------------------------
      if (hasProfilePhoto && !hasFaceDescriptor) {
        if (profilePhotoCaptured) {
          console.log("Profile photo already captured. Skipping camera.");

          currentStepRef.current = nextStep;
          setCurrentStep(nextStep);

          setTimeout(async () => {
            await askCurrentQuestion();
          }, 300);

          return;
        }

        console.log("Only profile photo exists. Opening camera.");

        setFaceDetected(false);
        setCaptured(false);

        currentStepRef.current = nextStep;
        setCurrentStep(nextStep);

        setCameraOpen(true);

        return;
      }

      // ------------------------------------
      // CASE 3:
      // ONLY FACE DESCRIPTOR EXISTS
      // ------------------------------------
      if (!hasProfilePhoto && hasFaceDescriptor) {
        if (faceDescriptorCaptured) {
          console.log("Face descriptor already captured. Skipping camera.");

          currentStepRef.current = nextStep;
          setCurrentStep(nextStep);

          setTimeout(async () => {
            await askCurrentQuestion();
          }, 300);

          return;
        }

        console.log("Only face descriptor exists. Opening camera.");

        setFaceDetected(false);
        setCaptured(false);

        currentStepRef.current = nextStep;
        setCurrentStep(nextStep);

        setCameraOpen(true);

        return;
      }
    }

  
    // Normal Voice Question
    currentStepRef.current = nextStep;
    setCurrentStep(nextStep);

    // Wait until React updates currentStep
    setTimeout(async () => {
      await askCurrentQuestion();
    }, 300);
  };;

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition STARTED");
      setListening(true);
    };

    recognition.onaudiostart = () => {
      console.log("Audio capture started");
    };

    recognition.onsoundstart = () => {
      console.log("Sound detected");
    };

    recognition.onspeechstart = () => {
      console.log("Speech detected");
    };

    recognition.onspeechend = () => {
      console.log("Speech ended");
    };

    recognition.onresult = (event: any) => {
      console.log("RESULT EVENT:", event);

      const text = event.results[0][0].transcript;

      console.log("Speech Received:", text);

      if (waitingForModuleSelectionRef.current) {
        processModuleVoice(text);
        return;
      }

      const field = isReviewModeRef.current
        ? reviewFieldRef.current
        : fieldsRef.current[currentStepRef.current];

      processVoiceAnswer(text, field);
    };

    recognition.onnomatch = () => {
      console.log("NO MATCH FROM SPEECH ENGINE");
    };

    recognition.onend = () => {
      console.log("Speech recognition ENDED");
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition ERROR:", event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // =====================================
  // Start Listening
  // =====================================

  const startListening = () => {
    if (!recognitionRef.current) return;

    setTranscript("");

    recognitionRef.current.start();
  };

  const repeatQuestion = () => {
    askCurrentQuestion();
  };

  // =====================================
  // Skip
  // =====================================

  const skipQuestion = () => {
    if (!currentField) return;

    if (currentField.is_required) {
      // alert("Required field cannot be skipped.");
      setAlertData({
        open: true,
        type: "error",
        message: "Required field cannot be skipped.",
      });
      return;
    }

    nextQuestion();
  };



// const captureMultipleFaceVectors = async () => {
//   const vectors: number[][] = [];
//   const scores: number[] = [];

//   for (let i = 0; i < 5; i++) {
//     try {
//       console.log(`========== Capture ${i + 1}/5 ==========`);

//       const video = webcamRef.current?.video;

//       if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
//         console.log("Video not ready");
//         continue;
//       }

//       // -------------------------
//       // Detect Face
//       // -------------------------

//       const result = await faceDetector.detect(video);

//       if (!result || result.length === 0) {
//         console.log("No face detected");

//         continue;
//       }

//       const face = result[0];

//       console.log("Face Detection:", {
//         score: face.score,
//         bbox: face.bbox,
//       });

//       // -------------------------
//       // Face Quality
//       // -------------------------

//       const quality = faceQuality.evaluate(video, face);

//       console.log("Face Quality:", quality);

//       if (!quality.passed) {
//         console.log("Skipped - Low quality");

//         await new Promise((r) => setTimeout(r, 500));

//         continue;
//       }

//       if (!face.landmarks) {
//         console.log("No landmarks");

//         continue;
//       }

//       // -------------------------
//       // Calculate Quality Score
//       // -------------------------

//       const faceArea = face.bbox.width * face.bbox.height;

//       const frameArea = video.videoWidth * video.videoHeight;

//       const coverage = faceArea / frameArea;

//       // Bigger face = better
//       const sizeScore = Math.min(coverage * 5, 1);

//       // SCRFD confidence
//       const confidenceScore = face.score || 0;

//       // If your quality module gives score use it
//       let qualityScore = 0.5;

//       if (typeof quality.score === "number") {
//         qualityScore = quality.score;
//       }

//       const finalScore =
//         confidenceScore * 0.4 + sizeScore * 0.4 + qualityScore * 0.2;

//       console.log("Frame Score:", {
//         confidenceScore,
//         coverage,
//         sizeScore,
//         qualityScore,
//         finalScore,
//       });

//       // -------------------------
//       // Generate Embedding
//       // -------------------------

//       const aligned = faceAligner.align(video, face.landmarks);

//       const embedding = await faceRecognizer.embeddingFromAligned(aligned);

//       const embeddingArray = Array.from(embedding);

//       console.log("Embedding Length:", embeddingArray.length);

//       vectors.push(embeddingArray);

//       scores.push(finalScore);

//       console.log(`Vector ${i + 1} stored`, {
//         score: finalScore,
//       });

//       await new Promise((r) => setTimeout(r, 500));
//     } catch (err) {
//       console.error(`Capture ${i + 1} failed`, err);
//     }
//   }

//   if (vectors.length === 0) {
//     throw new Error("Could not capture good face samples");
//   }

//   console.log("==============================");

//   console.log("Captured vectors:", vectors.length);

//   console.log("All Scores:", JSON.stringify(scores, null, 2));

//   console.log("==============================");

//   // --------------------------------
//   // Pick Top 3 Quality Embeddings
//   // --------------------------------

//   const ranked = vectors
//     .map((vector, index) => ({
//       vector,
//       score: scores[index],
//     }))
//     .sort((a, b) => b.score - a.score);

//   const bestVectors = ranked
//     .slice(0, Math.min(3, ranked.length))
//     .map((item) => item.vector);

//   console.log("Top vectors used:", bestVectors.length);

//   // --------------------------------
//   // Average Embeddings
//   // --------------------------------

//   const length = bestVectors[0].length;

//   const averaged = new Array(length).fill(0);

//   bestVectors.forEach((vector) => {
//     vector.forEach((value, index) => {
//       averaged[index] += value;
//     });
//   });

//   const averageEmbedding = averaged.map((value) => value / bestVectors.length);

//   // --------------------------------
//   // Normalize ArcFace Vector
//   // --------------------------------

//   const norm = Math.sqrt(
//     averageEmbedding.reduce((sum, value) => sum + value * value, 0),
//   );

//   const finalEmbedding = averageEmbedding.map((value) => value / norm);

//   console.log("Final Embedding Length:", finalEmbedding.length);

//   console.log(
//     "Final Embedding Norm:",
//     Math.sqrt(finalEmbedding.reduce((s, v) => s + v * v, 0)),
//   );

//   console.log("Final Embedding Sample:", finalEmbedding.slice(0, 10));

//   return finalEmbedding;
// };
  
  // =====================================
  // Capture Face
  // =====================================


const captureMultipleFaceVectors = async () => {
  const vectors: number[][] = [];
  const scores: number[] = [];

  const wait = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  for (let i = 0; i < 5; i++) {
    try {
      const step = i + 1;

      console.log(`========== FACE CAPTURE ${step}/5 ==========`);

      // ------------------------------------
      // Update UI
      // ------------------------------------

      setCaptureStep(step);

      setCaptureInstruction(captureInstructions[i]);

      // Give user time to read/move
      await wait(300);

      // ------------------------------------
      // Get video
      // ------------------------------------

      const video = webcamRef.current?.video;

      if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
        console.log("Video not ready");

        i--;

        await wait(500);

        continue;
      }

      // ------------------------------------
      // Detect face
      // ------------------------------------

      const result = await faceDetector.detect(video);

      if (!result || result.length === 0) {
        console.log(`No face detected for sample ${step}`);

        i--;

        await wait(500);

        continue;
      }

      const face = result[0];

      console.log("Face Detection:", {
        score: face.score,
        bbox: face.bbox,
      });

      // ------------------------------------
      // Face Quality
      // ------------------------------------

      const quality = faceQuality.evaluate(video, face);

      console.log(`Face Quality ${step}:`, quality);

      if (!quality.passed) {
        console.log(`Sample ${step} rejected - low quality`);

        i--;

        await wait(500);

        continue;
      }

      // ------------------------------------
      // Landmarks
      // ------------------------------------

      if (!face.landmarks) {
        console.log(`No landmarks for sample ${step}`);

        i--;

        await wait(500);

        continue;
      }

      // ------------------------------------
      // Quality Score
      // ------------------------------------

      const faceArea = face.bbox.width * face.bbox.height;

      const frameArea = video.videoWidth * video.videoHeight;

      const coverage = faceArea / frameArea;

      const sizeScore = Math.min(coverage * 5, 1);

      const confidenceScore = face.score || 0;

      let qualityScore = 0.5;

      if (typeof quality.score === "number") {
        qualityScore = quality.score;
      }

      const finalScore =
        confidenceScore * 0.4 + sizeScore * 0.4 + qualityScore * 0.2;

      console.log(`Sample ${step} Score:`, {
        confidenceScore,
        coverage,
        sizeScore,
        qualityScore,
        finalScore,
      });

      // ------------------------------------
      // Align
      // ------------------------------------

      const aligned = faceAligner.align(video, face.landmarks);

      // ------------------------------------
      // Generate Embedding
      // ------------------------------------

      const embedding = await faceRecognizer.embeddingFromAligned(aligned);

      const embeddingArray = Array.from(embedding);

      console.log(`Embedding ${step} length:`, embeddingArray.length);

      // ------------------------------------
      // Store independently
      // ------------------------------------

      vectors.push(embeddingArray);

      scores.push(finalScore);

      console.log(`VECTOR ${step}/5 STORED`);

      // ------------------------------------
      // Small delay
      // ------------------------------------

      await wait(100);
    } catch (err) {
      console.error(`Capture ${i + 1} failed`, err);

      // Retry same step
      i--;

      await wait(500);
    }
  }

  // ------------------------------------
  // Validate
  // ------------------------------------

  if (vectors.length !== 5) {
    throw new Error(`Could only capture ${vectors.length}/5 face samples`);
  }

  console.log("================================");

  console.log("ALL 5 FACE VECTORS CAPTURED");

  console.log("================================");

  // ------------------------------------
  // Rank by quality
  // ------------------------------------

  const ranked = vectors
    .map((vector, index) => ({
      vector,
      score: scores[index],
      originalIndex: index,
    }))
    .sort((a, b) => b.score - a.score);

  console.log(
    "Vector ranking:",
    ranked.map((item) => ({
      originalCapture: item.originalIndex + 1,
      score: item.score,
    })),
  );

  // ------------------------------------
  // IMPORTANT
  //
  // DO NOT AVERAGE
  // KEEP ALL 5
  // ------------------------------------

  const finalVectors = ranked.map((item) => item.vector);

  console.log("Final vector count:", finalVectors.length);

  finalVectors.forEach((vector, index) => {
    console.log(`Vector ${index + 1}:`, {
      length: vector.length,
      sample: vector.slice(0, 5),
    });
  });

  return finalVectors;
};





const captureFace = async () => {
  try {
    if (!isModelsLoaded) {
      alert("Face models are loading. Please wait.");
      return;
    }

    setLoading(true);

    const video = webcamRef.current?.video;

    if (!video) {
      throw new Error("Camera not ready");
    }

    // ============================================================
    // CURRENT FIELD
    // ============================================================

    const currentField = fieldsRef.current[currentStepRef.current];

    if (!currentField) {
      throw new Error("Current field not found");
    }

    const currentKey = currentField.field_key
      ?.trim()
      .toLowerCase();

    const isProfilePhoto = currentKey === "profile_photo";
    const isFaceDescriptor = currentKey === "face_descriptor";

    console.log("====================================");
    console.log("CAPTURE START");
    console.log("Current Step:", currentStepRef.current);
    console.log("Current Field:", currentField.field_key);
    console.log("Current Key:", currentKey);
    console.log("Is Profile Photo:", isProfilePhoto);
    console.log("Is Face Descriptor:", isFaceDescriptor);
    console.log("====================================");

    // ============================================================
    // IMPORTANT
    // Set UI type immediately based on the ACTUAL field.
    // ============================================================

    if (isProfilePhoto) {
      setCaptureType("profile_photo");
    } else if (isFaceDescriptor) {
      setCaptureType("face_descriptor");
    } else {
      console.warn(
        "captureFace called for unexpected field:",
        currentField.field_key,
      );

      setCameraOpen(false);
      return;
    }

    // ============================================================
    // RESET CAPTURE STATE
    // ============================================================

    setCaptureStep(0);
    setCaptureInstruction("Look straight at the camera");

    setFaceDetected(false);
    setCaptured(false);

    capturedEmbeddingsRef.current = [];
    isCapturingRef.current = false;

    // ============================================================
    // FACE DETECTION
    // ============================================================

    const result = await faceDetector.detect(video);

    if (!result || result.length === 0) {
      setAlertData({
        open: true,
        type: "warning",
        message: "Face not detected. Please look at the camera.",
      });

      setTimeout(() => {
        setAlertData((prev) => ({
          ...prev,
          open: false,
        }));
      }, 1500);

      return;
    }

    const face = result[0];

    // ============================================================
    // QUALITY CHECK
    // ============================================================

    const quality = faceQuality.evaluate(video, face);

    if (!quality.passed) {
      setAlertData({
        open: true,
        type: "warning",
        message: "Please adjust your face position",
      });

      setTimeout(() => {
        setAlertData((prev) => ({
          ...prev,
          open: false,
        }));
      }, 1500);

      return;
    }

    // ============================================================
    // PROFILE PHOTO
    // ============================================================

    if (isProfilePhoto) {
      console.log("====================================");
      console.log("PROFILE PHOTO CAPTURE");
      console.log("====================================");

      const photo = webcamRef.current?.getScreenshot();

      if (!photo) {
        throw new Error("Could not capture profile photo");
      }

      // Save profile photo
      updateForm("profile_photo", photo);

      console.log("Profile photo captured successfully");

      // ============================================================
      // PROFILE PHOTO COMPLETE
      // ============================================================

      setCaptureStep(1);
      setCaptureInstruction(
        "Profile photo captured successfully",
      );

      setFaceDetected(true);
      setCaptured(true);

      await new Promise<void>((resolve) =>
        setTimeout(resolve, 500),
      );

      setCameraOpen(false);

      // Move to next field
      await nextQuestion();

      return;
    }

    // ============================================================
    // FACE DESCRIPTOR
    // ============================================================

    if (isFaceDescriptor) {
      console.log("====================================");
      console.log("STARTING 5 FACE VECTOR CAPTURE");
      console.log("====================================");

      // Make sure descriptor capture starts from zero
      setCaptureStep(0);
      setCaptureInstruction(captureInstructions[0]);

      // ============================================================
      // CAPTURE 5 FACE VECTORS
      // ============================================================

      const faceEmbeddings =
        await captureMultipleFaceVectors();

      console.log(
        "5 vectors captured:",
        faceEmbeddings?.length,
      );

      if (
        !faceEmbeddings ||
        faceEmbeddings.length === 0
      ) {
        throw new Error(
          "No face vectors were captured",
        );
      }

      // ============================================================
      // SAVE FACE DESCRIPTOR
      // ============================================================

      updateForm(
        "face_descriptor",
        faceEmbeddings,
      );

      console.log(
        "5 face vectors stored in form",
      );

      // ============================================================
      // DESCRIPTOR CAPTURE COMPLETE
      // ============================================================

      setCaptureStep(5);

      setCaptureInstruction(
        "Face data captured successfully",
      );

      setFaceDetected(true);
      setCaptured(true);

      await new Promise<void>((resolve) =>
        setTimeout(resolve, 500),
      );

      setCameraOpen(false);

      // Move to next field
      await nextQuestion();

      return;
    }

  } catch (err) {
    console.error("================================");
    console.error("FACE CAPTURE ERROR");
    console.error(err);
    console.error("================================");

    setAlertData({
      open: true,
      type: "error",
      message:
        "Face registration failed. Please try again.",
    });
  } finally {
    setLoading(false);
    isCapturingRef.current = false;
  }
};


  const submitRegistration = async () => {
    if (!selectedModule) return;

    try {
      setLoading(true);

      const formData = new FormData();

      // Append all fields
      Object.entries(formRef.current).forEach(([key, value]) => {
        if (key === "face_descriptor") {
          // PostgreSQL double precision[] -> send as JSON string
          formData.append(key, JSON.stringify(value));
        } else if (key !== "profile_photo") {
          formData.append(key, value as any);
        }
      });

      // Convert Base64 image to File
      if (formRef.current.profile_photo) {
        const response = await fetch(formRef.current.profile_photo);
        const blob = await response.blob();

        const file = new File([blob], "profile_photo.jpg", {
          type: "image/jpeg",
        });

        formData.append("profile_photo", file);
      }

      const res = await axios.post(
        `${API}/dynamic-data/${organisationId}/${selectedModule.template_id}/${selectedModule.table_name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      console.log("Registration Response:", res.data);

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }
      setRegistrationId(res.data.data?.id);
      setAlertData({
        open: true,
        type: "success",
        message: "Registration Successful",
      });
      setCompleted(true);
    } catch (err: any) {
      console.error(err);

      // alert(err?.response?.data?.message || "Registration Failed");
      setAlertData({
        open: true,
        type: "error",
        message: err?.response?.data?.message || "Registration Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Restart
  // =====================================

  const resetRegistration = () => {
    waitingForModuleSelectionRef.current = true;
    setSelectedModule(null);

    setFields([]);

    setForm({});

    setCurrentStep(0);

    setSummaryPage(false);

    setCompleted(false);

    setCaptured(false);

    setCameraOpen(false);

    setTranscript("");
    setTimeout(() => {
      loadModules();
    }, 300);
  };
  // =====================================
  // UI
  // =====================================

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

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

  const isFaceField = (field?: Field) => {
    if (!field) return false;

    const key = field.field_key.toLowerCase();

    return (
      key.includes("profile_photo") ||
      key.includes("profile photo") ||
      key.includes("face_descriptor") ||
      key.includes("face descriptor")
    );
  };

  const isFaceFieldKey = (key: string) => {
    const normalizedKey = key.toLowerCase();

    return (
      normalizedKey === "profile_photo" || normalizedKey === "face_descriptor"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100">
      <div
        className="w-full max-w-7xl mx-auto
px-4
sm:px-6
md:px-8
lg:px-10
py-4
space-y-6"
      >
        <VoiceHeader
          organisationName={user?.organisation_name}
          moduleName={selectedModule?.template_name}
          listening={listening}
        />

        {/* ------------------------------
          MODULE SELECTION
      ------------------------------ */}
        {!selectedModule && (
          <VoiceQuestion
            field={{
              field_key: "module",
              field_label: "Please say the registration category.",
              is_required: true,
            }}
            currentStep={0}
            totalSteps={1}
            transcript={transcript}
            listening={listening}
            speaking={speaking}
            processing={processing}
            categories={availableCategories}
            onStartListening={startListening}
            onRepeat={() => {
              speak(
                `Available categories are ${availableCategories.join(", ")}`,
              );
            }}
            onSkip={() => {}}
            onNext={() => {}}
          />
        )}

        {/* ------------------------------
          QUESTION SCREEN
      ------------------------------ */}

        {selectedModule &&
          !cameraOpen &&
          !summaryPage &&
          !completed &&
          // !(
          //   currentField.field_key.toLowerCase().includes("profile_photo") ||
          //   currentField.field_key.toLowerCase().includes("profile photo") ||
          //   currentField.field_key.toLowerCase().includes("face_descriptor") ||
          //   currentField.field_key.toLowerCase().includes("face descriptor")
          // ) &&
          !isFaceField(currentField) && (
            // currentField && (
            <VoiceQuestion
              field={currentField}
              currentStep={currentStep}
              totalSteps={fields.length}
              transcript={transcript}
              listening={listening}
              speaking={speaking}
              processing={processing}
              onStartListening={startListening}
              onRepeat={repeatQuestion}
              onSkip={skipQuestion}
              onNext={nextQuestion}
            />
          )}

        {/* ------------------------------
          CAMERA
      ------------------------------ */}

        {/* {cameraOpen && ( */}
        {cameraOpen && !isReviewMode && (
          <VoiceCamera
            webcamRef={webcamRef}
            loading={loading}
            modelsLoaded={isModelsLoaded}
            detected={faceDetected}
            captured={captured}
            captureStep={captureStep}
            captureInstruction={captureInstruction}
            captureType={captureType}
            onCapture={captureFace}
            onCancel={() => {
              setCameraOpen(false);
              setFaceDetected(false);
              setCaptured(false);
              setCurrentStep((prev) => prev + 1);
            }}
          />
        )}

        {/* ------------------------------
          SUMMARY
      ------------------------------ */}

        {summaryPage && !completed && (
          <VoiceSummary
            moduleName={selectedModule?.template_name}
            // form={form}
            form={formRef.current}
            loading={loading}
            onSubmit={submitRegistration}
            // onBack={() => {
            //   setSummaryPage(false);

            //   setCurrentStep(fields.length - 1);
            // }}
            onBack={handleReviewAgain}
          />
        )}

        {/* ------------------------------
          SUCCESS
      ------------------------------ */}

        {completed && (
          <SuccessScreen
            moduleName={selectedModule?.template_name}
            registrationId={registrationId}
            personName={form.name || form.full_name}
            onNewRegistration={resetRegistration}
          />
        )}
      </div>
      {alertData.open && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          onClose={() =>
            setAlertData((prev) => ({
              ...prev,
              open: false,
            }))
          }
        />
      )}
    </div>
  );
}
