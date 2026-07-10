import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import { AuthContext } from "../../../context/AuthContext";

import VoiceHeader from "../components/voice/VoiceHeader";
import ModuleSelector from "../components/voice/ModuleSelector";
import VoiceQuestion from "../components/voice/VoiceQuestion";
import VoiceCamera from "../components/voice/VoiceCamera";
import VoiceSummary from "../components/voice/VoiceSummary";
import SuccessScreen from "../components/voice/SuccessScreen";

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
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceRegisterPage() {
  const { user, isInitializing } = useContext(AuthContext);

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

  const [modelsLoaded, setModelsLoaded] = useState(false);

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




  useEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    if (!currentField) return;

   const key = currentField.field_key.toLowerCase();

  if (
    key.includes("profile_photo") ||
    key.includes("profile photo") ||
    key.includes("face_descriptor") ||
    key.includes("face descriptor")
  ) {
    setCameraOpen(true);
  }
  }, [currentStep, currentField]);

  // =====================================
  // Load Face Models
  // =====================================

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";

        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);

        setModelsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    loadModels();
  }, []);

  // =====================================
  // Load Modules
  // =====================================

  useEffect(() => {
    if (!isInitializing && organisationId) {
      loadModules();
    }
  }, [organisationId, isInitializing]);

  const loadModules = async () => {
    try {
      const res = await axios.get(
        `${API}/dynamic-data/${organisationId}/modules`,
        {
          withCredentials: true,
        },
      );

      setModules(res.data.data || []);
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

    console.log("Updated Form:", updated);

    return updated;
  });
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

  // =====================================
  // Ask Current Question
  // =====================================

// const askCurrentQuestion = async () => {
//   const field = fieldsRef.current[currentStepRef.current];

//   if (!field) return;

//   let message = field.field_label;

//   if (!field.is_required) {
//     message += ". This field is optional. You may say Skip.";
//   }

//   await speak(message);
// };

  const askCurrentQuestion = async () => {
    const field = fieldsRef.current[currentStepRef.current];

    if (!field) return;

    let message = field.field_label;

    const key = field.field_key.toLowerCase();
    const label = field.field_label.toLowerCase();

    // Email field
    if (key.includes("email") || label.includes("email")) {
      message +=
        ". Please say your email address clearly. For example, vinay at gmail dot com.";
    }

    // Date field
    if (
      key.includes("date") ||
      key.includes("dob") ||
      label.includes("date") ||
      label.includes("birth")
    ) {
      message +=
        ". Please say the date in Day Month Year format. For example, 10 July 1998.";
    }

    // Phone field
    if (
      key.includes("phone") ||
      key.includes("mobile") ||
      label.includes("phone") ||
      label.includes("mobile")
    ) {
      message +=
        ". Please say each digit one by one. For example, nine eight seven six five four three two one zero.";
    }

    if (!field.is_required) {
      message += ". This field is optional. You may say Skip.";
    }

    await speak(message);
  };

useEffect(() => {
  if (
    selectedModule &&
    fieldsRef.current.length > 0 &&
    !cameraOpen &&
    !summaryPage
  ) {
    askCurrentQuestion();
  }
}, [currentStep, cameraOpen, summaryPage, selectedModule]);

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

    // if (!currentField) return;
if (!field) {
  console.log("No field found");
  return;
    }
    
    let value = answer.trim();

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
    // updateForm(field.field_key, value);
    updateForm(field.field_key, value);

    nextQuestion();
  };

  // =====================================
  // Next Question
  // =====================================

const nextQuestion = () => {
  const step = currentStepRef.current;
  const allFields = fieldsRef.current;

  if (step >= allFields.length - 1) {
    setSummaryPage(true);
    return;
  }

  const nextStep = step + 1;

  currentStepRef.current = nextStep; // <-- ADD THIS

  const next = allFields[nextStep];

  if (!next) {
    setSummaryPage(true);
    return;
  }

  const key = next.field_key.toLowerCase();

if (
  key.includes("profile_photo") ||
  key.includes("profile photo") ||
  key.includes("face_descriptor") ||
  key.includes("face descriptor")
) {
    setFaceDetected(false);
    setCaptured(false);
    setCurrentStep(nextStep);
    setCameraOpen(true);
    return;
  }

  setCurrentStep(nextStep);
};

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
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error(event);
      setListening(false);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;

      console.log("================================");
      console.log("Speech Received:", text);
      console.log("Current Step:", currentStep);
      console.log("Current Field:", currentField);
      console.log("Fields:", fields);
      console.log("================================");

      setTranscript(text);

      // processVoiceAnswer(text);
      const field = fieldsRef.current[currentStepRef.current];

      processVoiceAnswer(text, field);
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

    if (currentField.is_required){
      alert("Required field cannot be skipped.");
      return;
    }

    nextQuestion();
  };

  // =====================================
  // Capture Face
  // =====================================

  const captureFace = async () => {
    try {
      setLoading(true);

      const video = webcamRef.current?.video;

      if (!video) {
        alert("Camera not ready");
        return;
      }

      const detection = await faceapi
        .detectSingleFace(
          video,
          new faceapi.SsdMobilenetv1Options({
            minConfidence: 0.5,
          }),
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        alert("Face not detected");
        return;
      }

      setFaceDetected(true);

      const descriptor = Array.from(detection.descriptor);

      const photo = webcamRef.current?.getScreenshot();

      if (photo) {
        updateForm("profile_photo", photo);
      }

      updateForm("face_descriptor", descriptor);

      // updateForm("profile_photo", photo);

      setCaptured(true);

      setCameraOpen(false);

      const step = currentStepRef.current;
      const allFields = fieldsRef.current;

      if (step >= allFields.length - 1){
        setSummaryPage(true);
      } else {
         const nextStep = step + 1;

         currentStepRef.current = nextStep; // <-- IMPORTANT

         setCurrentStep(nextStep);
      }
    } catch (err) {
      console.error(err);
      alert("Face capture failed.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Submit
  // =====================================



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

      setRegistrationId(res.data.data?.id);

      setCompleted(true);
    } catch (err: any) {
      console.error(err);

      alert(err?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Restart
  // =====================================

  const resetRegistration = () => {
    setSelectedModule(null);

    setFields([]);

    setForm({});

    setCurrentStep(0);

    setSummaryPage(false);

    setCompleted(false);

    setCaptured(false);

    setCameraOpen(false);

    setTranscript("");
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
          <ModuleSelector
            modules={modules}
            selectedModule={selectedModule}
            loading={loading}
            // onSelect={setSelectedModule}
            onSelect={(module) => {
              loadTemplate(module);
            }}
            onStart={() => {
              if (selectedModule) {
                loadTemplate(selectedModule);
              }
            }}
          />
        )}

        {/* ------------------------------
          QUESTION SCREEN
      ------------------------------ */}

        {selectedModule &&
          !cameraOpen &&
          !summaryPage &&
          !completed &&
          !(
            currentField.field_key.toLowerCase().includes("profile_photo") ||
            currentField.field_key.toLowerCase().includes("profile photo") ||
            currentField.field_key.toLowerCase().includes("face_descriptor") ||
            currentField.field_key.toLowerCase().includes("face descriptor")
          ) &&
          currentField && (
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

        {cameraOpen && (
          <VoiceCamera
            webcamRef={webcamRef}
            loading={loading}
            modelsLoaded={modelsLoaded}
            detected={faceDetected}
            captured={captured}
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
            form={form}
            loading={loading}
            onSubmit={submitRegistration}
            onBack={() => {
              setSummaryPage(false);

              setCurrentStep(fields.length - 1);
            }}
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
    </div>
  );
}