import type { FaceDetection } from "./detection";
import type { FaceEmbedding } from "./embedding";
import type { FaceQualityResult } from "./quality";
import type { FaceTemplate } from "./face";

export interface BaseResponse {
  success: boolean;
  message?: string;
  timestamp: number;
}

export interface DetectResponse extends BaseResponse {
  detection: FaceDetection | null;
  detections: FaceDetection[];
}

export interface RecognizeResponse extends BaseResponse {
  detection: FaceDetection;
  embedding: FaceEmbedding;
}

export interface EnrollResponse extends BaseResponse {
  template: FaceTemplate;
}

export interface VerifyResponse extends BaseResponse {
  matched: boolean;
  confidence: number;
  template?: FaceTemplate;
}

export interface IdentifyResponse extends BaseResponse {
  matched: boolean;
  confidence: number;
  template?: FaceTemplate;
}

export interface QualityResponse extends BaseResponse {
  quality: FaceQualityResult;
}

export interface LivenessResponse extends BaseResponse {
  isLive: boolean;
  score: number;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
  error: string;
  code?: string;
}