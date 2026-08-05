import * as ort from "onnxruntime-web";

export interface FaceConfig {
  modelsPath: string;

  detectorModel: string;

  recognitionModel: string;

  landmarkModel: string;

  executionProviders: ort.InferenceSession.SessionOptions["executionProviders"];

  numThreads: number;

  enableSIMD: boolean;

  enableThreads: boolean;

  detectorInputSize: number;

  recognitionInputSize: number;

  confidenceThreshold: number;

  nmsThreshold: number;

  similarityThreshold: number;

  maxFaces: number;

  debug: boolean;
}


export const defaultFaceConfig: FaceConfig = {

  modelsPath: "/models",


  // SCRFD Face Detector
  detectorModel: "scrfd_10g.onnx",


  // ArcFace Recognition Model
  // recognitionModel: "arcface.onnx",
recognitionModel: "mobilefacenet.onnx",

  // InsightFace 106 Landmark Model
  landmarkModel: "2d106det.onnx",


  executionProviders: [
    "wasm",
  ],


  // numThreads:
  //   typeof navigator !== "undefined" &&
  //   navigator.hardwareConcurrency
  //     ? Math.max(
  //         1,
  //         navigator.hardwareConcurrency - 1
  //       )
  //     : 4,

  numThreads: 1,

  enableSIMD: true,


  // enableThreads: true,

  enableThreads: false,

  // SCRFD input
  detectorInputSize: 640,


  // ArcFace input
  recognitionInputSize: 112,


  confidenceThreshold: 0.6,


  nmsThreshold: 0.45,


  // Cosine similarity threshold
  similarityThreshold: 0.55,


  maxFaces: 10,


  debug: false,
};


let config: FaceConfig = {
  ...defaultFaceConfig,
};


export function getConfig(): FaceConfig {
  return config;
}


export function updateConfig(
  partial: Partial<FaceConfig>
): FaceConfig {

  config = {
    ...config,
    ...partial,
  };

  return config;
}


export function resetConfig(): FaceConfig {

  config = {
    ...defaultFaceConfig,
  };

  return config;
}


export function getDetectorModelPath(): string {

  return `${config.modelsPath}/${config.detectorModel}`;

}


export function getRecognitionModelPath(): string {

  return `${config.modelsPath}/${config.recognitionModel}`;

}


export function getLandmarkModelPath(): string {

  return `${config.modelsPath}/${config.landmarkModel}`;

}