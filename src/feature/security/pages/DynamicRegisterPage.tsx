import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { AuthContext } from "../../../context/AuthContext";

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

type RecordData = {
  id: number;
  [key: string]: any;
};

export default function DynamicRegisterPage() {
  const { user, isInitializing } = useContext(AuthContext);

  const organisationId = user?.organisation_id;

  const webcamRef = useRef<Webcam>(null);

  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const [fields, setFields] = useState<Field[]>([]);
  const [records, setRecords] = useState<RecordData[]>([]);

  const [form, setForm] = useState<Record<string, any>>({});

  const [loading, setLoading] = useState(false);

  // Face states
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturingField, setCapturingField] = useState("");

  // -----------------------------
  // Load Face Models
  // -----------------------------
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
        console.error("Model loading error:", err);
      }
    };

    loadModels();
  }, []);

  // -----------------------------
  // Load Modules
  // -----------------------------
  useEffect(() => {
    if (!isInitializing && organisationId) {
      loadModules();
    }
  }, [isInitializing, organisationId]);

  const loadModules = async () => {
    if (!organisationId) return;

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

  // -----------------------------
  // Load Template
  // -----------------------------
  const loadTemplate = async (module: Module) => {
    try {
      const res = await axios.get(
        `${API}/dynamic-data/${organisationId}/template/${module.template_id}`,
        {
          withCredentials: true,
        },
      );

      setSelectedModule(module);
      setFields(res.data.data.fields || []);
      setForm({});

      loadRecords(module.table_name);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // Load Records
  // -----------------------------
  const loadRecords = async (table: string) => {
    try {
      const res = await axios.get(
        `${API}/dynamic-data/${organisationId}/${table}`,
        {
          withCredentials: true,
        },
      );

      setRecords(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // Form Change
  // -----------------------------
  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // -----------------------------
  // Capture Face
  // -----------------------------
  const captureFace = async (fieldKey: string) => {
    try {
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

     const descriptor = Array.from(detection.descriptor);
      const photo = webcamRef.current?.getScreenshot();

 handleChange("face_descriptor", descriptor);
      handleChange("profile_photo", photo);

      alert("Face Registered Successfully");

      setCameraOpen(false);
      setCapturingField("");
    } catch (err) {
      console.error(err);
      alert("Failed to capture face");
    }
  };

  // -----------------------------
  // Submit
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedModule) {
      alert("Please select a module");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API}/dynamic-data/${organisationId}/${selectedModule.template_id}/${selectedModule.table_name}`,
        form,
        {
          withCredentials: true,
        },
      );

      alert("Record created successfully");

      setForm({});

      setCameraOpen(false);

      loadRecords(selectedModule.table_name);
    } catch (err: any) {
      console.error(err);

      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getInputType = (field: Field) => {
    const name = field.field_key.toLowerCase();

    if (name.includes("date")) return "date";
    if (name.includes("datetime")) return "datetime-local";
    if (name.includes("email")) return "email";
    if (name.includes("mobile") || name.includes("phone")) return "tel";

    return "text";
  };

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Dynamic Registration</h2>

        {/* Module Selection */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Select Module</label>

          <select
            className="w-full border rounded-lg p-3"
            value={selectedModule?.table_name || ""}
            onChange={(e) => {
              const module = modules.find(
                (m) => m.table_name === e.target.value,
              );

              if (module) {
                loadTemplate(module);
              }
            }}
          >
            <option value="">Select Module</option>

            {modules.map((module) => (
              <option key={module.template_id} value={module.table_name}>
                {module.template_name}
              </option>
            ))}
          </select>
        </div>

        {selectedModule && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold">
              Register {selectedModule.template_name}
            </h3>
            {fields
              .filter((field) => {
                const key = field.field_key.toLowerCase();

                return key !== "created_at" && key !== "updated_at";
              })
              .map((field) => {
                const name = field.field_key.toLowerCase();

                // =====================================
                // PROFILE PHOTO
                // =====================================
                if (
                  name.includes("profile photo") ||
                  name.includes("profile_photo")
                ) {
                  return (
                    <div key={field.field_key}>
                      <label className="block mb-1 font-medium">
                        {field.field_label}
                        {field.is_required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleChange(
                            field.field_key,
                            e.target.files?.[0] || null,
                          )
                        }
                        className="w-full border rounded-lg p-3"
                      />
                    </div>
                  );
                }

                // =====================================
                // FACE DESCRIPTOR
                // =====================================
                if (
                  name.includes("face descriptor") ||
                  name.includes("face_descriptor")
                ) {
                  return (
                    <div
                      key={field.field_key}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <label className="block mb-3 font-medium">
                        {field.field_label}
                        {field.is_required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>

                      {!cameraOpen || capturingField !== field.field_key ? (
                        <button
                          type="button"
                          onClick={() => {
                            setCapturingField(field.field_key);
                            setCameraOpen(true);
                          }}
                          className="bg-gray-700 text-white px-4 py-2 rounded"
                        >
                          Open Camera
                        </button>
                      ) : (
                        <>
                          <Webcam
                            ref={webcamRef}
                            audio={false}
                            mirrored
                            screenshotFormat="image/jpeg"
                            className="rounded-lg w-full"
                          />

                          <button
                            type="button"
                            disabled={!modelsLoaded}
                            onClick={() => captureFace(field.field_key)}
                            className="w-full mt-3 bg-blue-600 text-white p-3 rounded-lg"
                          >
                            {modelsLoaded
                              ? "Capture & Register Face"
                              : "Loading Face Models..."}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setCameraOpen(false);
                              setCapturingField("");
                            }}
                            className="w-full mt-2 bg-red-500 text-white p-3 rounded-lg"
                          >
                            Close Camera
                          </button>
                        </>
                      )}

                      {form[field.field_key] && (
                        <div className="mt-3 text-green-600 font-medium">
                          ✅ Face Registered Successfully
                        </div>
                      )}
                    </div>
                  );
                }

                // =====================================
                // STATUS
                // =====================================
                if (name.includes("status")) {
                  return (
                    <div key={field.field_key}>
                      <label className="block mb-1 font-medium">
                        {field.field_label}
                      </label>

                      <select
                        value={form[field.field_key] || ""}
                        onChange={(e) =>
                          handleChange(field.field_key, e.target.value)
                        }
                        className="w-full border rounded-lg p-3"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  );
                }

                // =====================================
                // DEFAULT INPUT
                // =====================================
                return (
                  <div key={field.field_key}>
                    <label className="block mb-1 font-medium">
                      {field.field_label}

                      {field.is_required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    <input
                      type={getInputType(field)}
                      required={field.is_required}
                      value={form[field.field_key] || ""}
                      placeholder={field.field_label}
                      onChange={(e) =>
                        handleChange(field.field_key, e.target.value)
                      }
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                );
              })}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Register"}
              </button>
            </div>
          </form>
        )}

        {/* Optional Records Table */}
        {selectedModule && records.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Existing Records</h3>

            <div className="overflow-auto border rounded-lg">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    {Object.keys(records[0]).map((key) => (
                      <th key={key} className="border px-4 py-2 text-left">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      {Object.keys(records[0]).map((key) => (
                        <td key={key} className="border px-4 py-2">
                          {Array.isArray(record[key])
                            ? JSON.stringify(record[key])
                            : typeof record[key] === "object" &&
                                record[key] !== null
                              ? JSON.stringify(record[key])
                              : String(record[key] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



////////////////////


// import React, { useContext, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Webcam from "react-webcam";
// import * as faceapi from "face-api.js";
// import { AuthContext } from "../../../context/AuthContext";

// const API = import.meta.env.VITE_BACKEND_URL;

// type Module = {
//   template_id: number;
//   template_name: string;
//   table_name: string;
// };

// type Field = {
//   field_key: string;
//   field_label: string;
//   is_required: boolean;
// };

// type RecordData = {
//   id: number;
//   [key: string]: any;
// };

// const SpeechRecognition =
//   (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

// export default function DynamicRegisterPage() {
//   const { user, isInitializing } = useContext(AuthContext);
//   const organisationId = user?.organisation_id;

//   const webcamRef = useRef<Webcam>(null);

//   const [modules, setModules] = useState<Module[]>([]);
//   const [selectedModule, setSelectedModule] = useState<Module | null>(null);

//   const [fields, setFields] = useState<Field[]>([]);
//   const [records, setRecords] = useState<RecordData[]>([]);
//   const [form, setForm] = useState<Record<string, any>>({});

//   const [loading, setLoading] = useState(false);

//   // Face
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [capturingField, setCapturingField] = useState("");
// const [heardText, setHeardText] = useState("");
//   // Voice
//   const [voiceMode, setVoiceMode] = useState(false);

//   // -----------------------------
//   // FACE MODELS
//   // -----------------------------
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = "/models";

//       await Promise.all([
//         faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
//         faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//         faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//       ]);

//       setModelsLoaded(true);
//     };

//     loadModels();
//   }, []);

//   // -----------------------------
//   // LOAD MODULES
//   // -----------------------------
//   useEffect(() => {
//     if (!isInitializing && organisationId) loadModules();
//   }, [isInitializing, organisationId]);

//   const loadModules = async () => {
//     const res = await axios.get(
//       `${API}/dynamic-data/${organisationId}/modules`,
//       { withCredentials: true },
//     );

//     setModules(res.data.data || []);
//   };

//   const loadTemplate = async (module: Module) => {
//     const res = await axios.get(
//       `${API}/dynamic-data/${organisationId}/template/${module.template_id}`,
//       { withCredentials: true },
//     );

//     setSelectedModule(module);
//     setFields(res.data.data.fields || []);
//     setForm({});
//     loadRecords(module.table_name);
//   };

//   const loadRecords = async (table: string) => {
//     const res = await axios.get(
//       `${API}/dynamic-data/${organisationId}/${table}`,
//       { withCredentials: true },
//     );

//     setRecords(res.data.data || []);
//   };

//   // -----------------------------
//   // FORM UPDATE
//   // -----------------------------
//   const handleChange = (key: string, value: any) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   // -----------------------------
//   // SPEECH HELPERS
//   // -----------------------------
//   const SpeechRecognitionClass =
//     (window as any).SpeechRecognition ||
//     (window as any).webkitSpeechRecognition;

//   const speak = (text: string) => {
//     window.speechSynthesis.cancel();
//     const utter = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utter);
//   };

// const listenOnce = (): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const SpeechRecognitionClass =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;

//     const recognition = new SpeechRecognitionClass();

//     recognition.lang = "en-US";
//     recognition.interimResults = true; // IMPORTANT FIX
//     recognition.continuous = false;

//     let finalText = "";

//     recognition.onresult = (event: any) => {
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         finalText += transcript;
//       }
//     };

//     recognition.onend = () => {
//       if (finalText.trim()) {
//         resolve(finalText.trim());
//       } else {
//         reject("No speech detected");
//       }
//     };

//     recognition.onerror = (err: any) => {
//       reject(err);
//     };

//     recognition.start();
//   });
// };

//   const normalize = (key: string, value: string) => {
//     const k = key.toLowerCase();

//     if (k.includes("email")) return value.replace(/\s/g, "").toLowerCase();
//     if (k.includes("phone")) return value.replace(/\D/g, "");
//     return value;
//   };

//   // -----------------------------
//   // 🚀 MAIN VOICE FLOW (FIXED)
//   // -----------------------------
//   const runVoiceFlow = async () => {
//     if (!fields.length) return;

//     setVoiceMode(true);

//     for (let i = 0; i < fields.length; i++) {
//       const field = fields[i];
//       const key = field.field_key.toLowerCase();

//       if (key === "created_at" || key === "updated_at") continue;

//       speak(`Please tell me your ${field.field_label}`);

//       try {
//         const answer = await listenOnce();
//   setHeardText(answer); 
//         handleChange(field.field_key, normalize(field.field_key, answer));
//       } catch (err) {
//         speak("I didn't catch that. Let's try again.");
//         i--; // retry same field
//       }
//     }

//     speak("All details completed");
//     setVoiceMode(false);
//   };

//   const startVoice = () => {
//     runVoiceFlow();
//   };

//   const stopVoice = () => {
//     window.speechSynthesis.cancel();
//     setVoiceMode(false);
//   };

//   // -----------------------------
//   // FACE CAPTURE
//   // -----------------------------
//   const captureFace = async (fieldKey: string) => {
//     const video = webcamRef.current?.video;
//     if (!video) return;

//     const detection = await faceapi
//       .detectSingleFace(video)
//       .withFaceLandmarks()
//       .withFaceDescriptor();

//     if (!detection) {
//       alert("Face not detected");
//       return;
//     }

//     const descriptor = Array.from(detection.descriptor);
//     const photo = webcamRef.current?.getScreenshot();

//     handleChange("face_descriptor", descriptor);
//     handleChange("profile_photo", photo);

//     setCameraOpen(false);
//     setCapturingField("");
//   };

//   // -----------------------------
//   // SUBMIT
//   // -----------------------------
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedModule) return;

//     setLoading(true);

//     try {
//       await axios.post(
//         `${API}/dynamic-data/${organisationId}/${selectedModule.template_id}/${selectedModule.table_name}`,
//         form,
//         { withCredentials: true },
//       );

//       alert("Record created successfully");
//       setForm({});
//       loadRecords(selectedModule.table_name);
//     } catch (err: any) {
//       alert(err?.response?.data?.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -----------------------------
//   // UI
//   // -----------------------------
//   if (isInitializing) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* MODE */}
//       <div className="flex gap-3 mb-4">
//         <button onClick={stopVoice} className="px-4 py-2 bg-gray-200 rounded">
//           Manual Mode
//         </button>

//         <button
//           onClick={startVoice}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Start Voice Mode
//         </button>

//         {voiceMode && (
//           <button
//             onClick={stopVoice}
//             className="px-4 py-2 bg-red-500 text-white rounded"
//           >
//             Stop Voice
//           </button>
//         )}
        
//       </div>

//       {/* MODULE */}
//       <select
//         className="border p-2 w-full mb-4"
//         onChange={(e) => {
//           const m = modules.find((x) => x.table_name === e.target.value);
//           if (m) loadTemplate(m);
//         }}
//       >
//         <option>Select Module</option>
//         {modules.map((m) => (
//           <option key={m.template_id} value={m.table_name}>
//             {m.template_name}
//           </option>
//         ))}
//       </select>

//       {/* FORM */}
//       {selectedModule && (
//         <form onSubmit={handleSubmit} className="space-y-3">
//           {fields.map((f) => (
//             <div key={f.field_key}>
//               <label className="block font-medium">{f.field_label}</label>

//               <input
//                 className="border p-2 w-full"
//                 value={form[f.field_key] || ""}
//                 onChange={(e) => handleChange(f.field_key, e.target.value)}
//               />
//             </div>
//           ))}

//           <button className="bg-blue-600 text-white px-4 py-2 rounded">
//             Submit
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }