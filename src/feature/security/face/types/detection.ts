import type { BoundingBox, FaceLandmarks } from "./face";

export interface FaceDetection {
  /**
   * Confidence score from detector.
   */
  score: number;

  /**
   * Face bounding box.
   */
  bbox: BoundingBox;

  /**
   * Five facial landmarks.
   */
  landmarks: FaceLandmarks;
}

export interface DetectionResult {
  faces: FaceDetection[];
  count: number;
  timestamp: number;
}

export interface DetectionOptions {
  /**
   * Minimum confidence score.
   */
  minScore?: number;

  /**
   * Maximum number of faces to detect.
   */
  maxFaces?: number;
}

export interface DetectionResponse {
  success: boolean;
  result: DetectionResult;
}