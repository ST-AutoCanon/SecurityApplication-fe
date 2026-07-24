export const FACE_SDK_NAME = "Face SDK";

export const FACE_SDK_VERSION = "1.0.0";

export const DETECTOR_INPUT_WIDTH = 640;
export const DETECTOR_INPUT_HEIGHT = 640;

export const RECOGNITION_INPUT_WIDTH = 112;
export const RECOGNITION_INPUT_HEIGHT = 112;

export const EMBEDDING_SIZE = 512;

export const LANDMARK_POINTS = 5;

export const CHANNELS = 3;

export const IMAGE_MEAN = 127.5;
export const IMAGE_STD = 128.0;

export const MAX_DETECTIONS = 1000;

export const DEFAULT_CONFIDENCE_THRESHOLD = 0.6;

export const DEFAULT_NMS_THRESHOLD = 0.45;

export const DEFAULT_SIMILARITY_THRESHOLD = 0.55;

export const MIN_FACE_SIZE = 80;

export const MAX_FACE_SIZE = 4096;

export const MIN_BRIGHTNESS = 40;

export const MAX_BRIGHTNESS = 220;

export const MIN_SHARPNESS = 80;

export const MAX_HEAD_YAW = 20;

export const MAX_HEAD_PITCH = 20;

export const MAX_HEAD_ROLL = 20;

export const CANVAS_CONTEXT_ATTRIBUTES: CanvasRenderingContext2DSettings = {
  alpha: false,
  willReadFrequently: true,
};

export const MODEL_FILENAMES = {
  SCRFD: "scrfd_500m.onnx",
  ARCFACE: "arcface_w600k_r50.onnx",
} as const;

export const SESSION_NAMES = {
  DETECTOR: "detector",
  RECOGNIZER: "recognizer",
} as const;

export const ERROR_MESSAGES = {
  MODEL_NOT_LOADED: "Model has not been loaded.",
  SESSION_NOT_FOUND: "Inference session not found.",
  INVALID_IMAGE: "Invalid image.",
  NO_FACE_FOUND: "No face detected.",
  MULTIPLE_FACES: "Multiple faces detected.",
  LOW_QUALITY: "Face quality is too low.",
  CAMERA_NOT_AVAILABLE: "Camera not available.",
  CAMERA_PERMISSION_DENIED: "Camera permission denied.",
} as const;

export const QUALITY_THRESHOLDS = {
  BLUR: 80,
  BRIGHTNESS_MIN: 40,
  BRIGHTNESS_MAX: 220,
  FACE_SIZE: 100,
  DETECTION_SCORE: 0.6,
} as const;

export const DEFAULT_CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: "user",
    width: {
      ideal: 1280,
    },
    height: {
      ideal: 720,
    },
    frameRate: {
      ideal: 30,
    },
  },
  audio: false,
};