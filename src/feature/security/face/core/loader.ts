// import * as ort from "onnxruntime-web";

// import {
//   getConfig,
//   getDetectorModelPath,
//   getRecognitionModelPath,
//   getLandmarkModelPath,
// } from "./config";

// import { sessionManager } from "./session";
// import { logger } from "./logger";


// /**
//  * Configure ONNX Runtime Web
//  */
// function configureRuntime(): void {
//   const config = getConfig();

//   ort.env.wasm.simd =
//     config.enableSIMD;

//   ort.env.wasm.numThreads =
//     config.numThreads;


//   try {
//     ort.env.wasm.proxy =
//       config.enableThreads;
//   } catch {
//     ort.env.wasm.proxy = false;
//   }
// }


// /**
//  * Create ONNX session
//  */
// async function createSession(
//   modelPath: string
// ): Promise<ort.InferenceSession> {

//   const config = getConfig();

//   logger.info(
//     `Loading model: ${modelPath}`
//   );


//   const session =
//     await ort.InferenceSession.create(
//       modelPath,
//       {
//         executionProviders:
//           config.executionProviders,

//         graphOptimizationLevel:
//           "all",
//       }
//     );


//   logger.info(
//     `Loaded model: ${modelPath}`
//   );


//   return session;
// }


// /**
//  * Load SCRFD detector
//  */
// export async function loadDetector():
// Promise<ort.InferenceSession> {

//   if (
//     sessionManager.has("detector")
//   ) {
//     return sessionManager.detector;
//   }


//   configureRuntime();


//   const session =
//     await createSession(
//       getDetectorModelPath()
//     );


//   sessionManager.set(
//     "detector",
//     session
//   );


//   return session;
// }


// /**
//  * Load ArcFace recognizer
//  */
// export async function loadRecognizer():
// Promise<ort.InferenceSession> {

//   if (
//     sessionManager.has("recognizer")
//   ) {
//     return sessionManager.recognizer;
//   }


//   configureRuntime();


//   const session =
//     await createSession(
//       getRecognitionModelPath()
//     );


//   sessionManager.set(
//     "recognizer",
//     session
//   );


//   return session;
// }


// /**
//  * Load 106 landmark model
//  */
// // export async function loadLandmarkModel():
// // Promise<ort.InferenceSession> {

// //   if (
// //     sessionManager.has("landmark")
// //   ) {
// //     return sessionManager.landmark;
// //   }


// //   configureRuntime();

// //   console.time("106 Landmark");
// //   const session =
// //     await createSession(
// //       getLandmarkModelPath()
// //     );

// //   console.timeEnd("106 Landmark");
// //   sessionManager.set(
// //     "landmark",
// //     session
// //   );


// //   return session;
// // }


// export async function loadLandmarkModel() {
//   if (sessionManager.has("landmark")) {
//     return sessionManager.landmark;
//   }

//   console.time("106 Landmark");

//   try {
//     configureRuntime();

//     const session = await createSession(
//       getLandmarkModelPath()
//     );

//     sessionManager.set("landmark", session);

//     return session;
//   } finally {
//     console.timeEnd("106 Landmark");
//   }
// }


// /**
//  * Load all models
//  */
// export async function loadModels():
// Promise<void> {


//   console.time("Total Model Loading");
//   await Promise.all([
//     loadDetector(),
//     loadRecognizer(),
//     loadLandmarkModel(),
//   ]);

//     console.timeEnd("Total Model Loading");



//   logger.info(
//     "All models loaded successfully."
//   );
// }


// /**
//  * Check models availability
//  */
// export function modelsLoaded(): boolean {

//   return (
//     sessionManager.has("detector") &&
//     sessionManager.has("recognizer") &&
//     sessionManager.has("landmark")
//   );
// }


// /**
//  * Dispose all models
//  */
// export function disposeModels(): void {

//   sessionManager.clear();

//   logger.info(
//     "All models disposed."
//   );
// }

import * as ort from "onnxruntime-web";

import {
  getConfig,
  getDetectorModelPath,
  getRecognitionModelPath,
  getLandmarkModelPath,
} from "./config";

import { sessionManager } from "./session";
import { logger } from "./logger";



const activeTimers = new Set<string>();

function startTimer(name: string) {
  if (!activeTimers.has(name)) {
    console.time(name);
    activeTimers.add(name);
  }
}

function endTimer(name: string) {
  if (activeTimers.has(name)) {
    console.timeEnd(name);
    activeTimers.delete(name);
  }
}

// ===============================
// Singleton loading promises
// ===============================

let detectorPromise:
  Promise<ort.InferenceSession> | null = null;

let recognizerPromise:
  Promise<ort.InferenceSession> | null = null;

let landmarkPromise:
  Promise<ort.InferenceSession> | null = null;

let modelsPromise:
  Promise<void> | null = null;



/**
 * Configure ONNX Runtime Web
 */
// function configureRuntime(): void {

//   const config = getConfig();

//   ort.env.wasm.simd =
//     config.enableSIMD;

//   ort.env.wasm.numThreads =
//     config.numThreads;


//   try {
//     ort.env.wasm.proxy =
//       config.enableThreads;
//   } catch {
//     ort.env.wasm.proxy = false;
//   }
// }


function configureRuntime(): void {

  ort.env.wasm.simd = true;

  // IMPORTANT
  // Prevent threaded wasm loading
  ort.env.wasm.numThreads = 1;

  ort.env.wasm.proxy = false;

}



/**
 * Create ONNX session
 */
async function createSession(
  modelPath: string
): Promise<ort.InferenceSession> {

  logger.info(
    `Loading model: ${modelPath}`
  );


  const config = getConfig();


  const session =
    await ort.InferenceSession.create(
      modelPath,
      {
        executionProviders:
          config.executionProviders,

        graphOptimizationLevel:
          "basic",
      }
    );


  logger.info(
    `Loaded model: ${modelPath}`
  );


  return session;
}



/**
 * Load SCRFD Detector
 */
export function loadDetector():
Promise<ort.InferenceSession> {


  if (sessionManager.has("detector")) {
    return Promise.resolve(
      sessionManager.detector
    );
  }


  if (detectorPromise) {
    return detectorPromise;
  }


  detectorPromise =
    (async () => {

      configureRuntime();


      const session =
        await createSession(
          getDetectorModelPath()
        );


      sessionManager.set(
        "detector",
        session
      );


      detectorPromise = null;


      return session;

    })();


  return detectorPromise;
}




/**
 * Load ArcFace Recognizer
 */
export function loadRecognizer():
Promise<ort.InferenceSession> {


  if (sessionManager.has("recognizer")) {
    return Promise.resolve(
      sessionManager.recognizer
    );
  }


  if (recognizerPromise) {
    return recognizerPromise;
  }


  recognizerPromise =
    (async () => {

      configureRuntime();


      const session =
        await createSession(
          getRecognitionModelPath()
        );


      sessionManager.set(
        "recognizer",
        session
      );


      recognizerPromise = null;


      return session;

    })();


  return recognizerPromise;
}




/**
 * Load 106 Landmark Model
 */
export function loadLandmarkModel():
Promise<ort.InferenceSession> {


  if (sessionManager.has("landmark")) {
    return Promise.resolve(
      sessionManager.landmark
    );
  }


  if (landmarkPromise) {
    return landmarkPromise;
  }



  landmarkPromise =
    (async () => {


startTimer("106 Landmark");


      try {

        configureRuntime();


        const session =
          await createSession(
            getLandmarkModelPath()
          );


        sessionManager.set(
          "landmark",
          session
        );


        return session;


      }
      finally {

endTimer("106 Landmark");


        landmarkPromise = null;
      }


    })();



  return landmarkPromise;
}





/**
 * Load all models
 */
export function loadModels():
Promise<void> {


  if (modelsLoaded()) {
    return Promise.resolve();
  }


  if (modelsPromise) {
    return modelsPromise;
  }



  modelsPromise =
    (async () => {


startTimer("Total Model Loading");


      try {


        // await Promise.all([

        //   loadDetector(),

        //   loadRecognizer(),

        //   loadLandmarkModel(),

        // ]);


        console.time("SCRFD");
await loadDetector();
console.timeEnd("SCRFD");

console.time("ArcFace");
await loadRecognizer();
console.timeEnd("ArcFace");

console.time("106 Landmark");
await loadLandmarkModel();
console.timeEnd("106 Landmark");


        logger.info(
          "All models loaded successfully."
        );


      }
      finally {

endTimer("Total Model Loading");


        modelsPromise = null;

      }


    })();



  return modelsPromise;
}




/**
 * Check models availability
 */
export function modelsLoaded(): boolean {

  return (

    sessionManager.has(
      "detector"
    )

    &&

    sessionManager.has(
      "recognizer"
    )

    &&

    sessionManager.has(
      "landmark"
    )

  );
}





/**
 * Dispose all models
 */
export function disposeModels(): void {


  sessionManager.clear();


  detectorPromise = null;
  recognizerPromise = null;
  landmarkPromise = null;
  modelsPromise = null;


  logger.info(
    "All models disposed."
  );
}