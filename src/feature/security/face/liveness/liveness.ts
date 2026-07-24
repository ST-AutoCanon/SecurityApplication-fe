// import { passiveLiveness, PassiveLivenessResult } from "./passive";
import { passiveLiveness } from "./passive";
import type { PassiveLivenessResult } from "./passive";
import type { FaceDetection } from "../types/detection";
export interface LivenessOptions {
  minScore?: number;
}

export interface LivenessResult extends PassiveLivenessResult {
  method: "passive";
}

export class FaceLiveness {
  private readonly defaultMinScore = 0.8;

  /**
   * Perform passive liveness detection.
   */
  check(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    detection: FaceDetection,
    options: LivenessOptions = {}
  ): LivenessResult {
    const result = passiveLiveness.check(image, detection);

    const minScore = options.minScore ?? this.defaultMinScore;

    return {
      ...result,
      isLive: result.score >= minScore,
      method: "passive",
    };
  }

  /**
   * Returns true if the face passes liveness.
   */
  isLive(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    detection: FaceDetection,
    options?: LivenessOptions
  ): boolean {
    return this.check(image, detection, options).isLive;
  }

  /**
   * Get only the liveness score.
   */
  score(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    detection: FaceDetection
  ): number {
    return this.check(image, detection).score;
  }
}

export const faceLiveness = new FaceLiveness();

export default faceLiveness;