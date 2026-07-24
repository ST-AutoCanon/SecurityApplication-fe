import { blurDetector } from "./blur";
import { brightnessAnalyzer } from "./brightness";
import { poseEstimator } from "./pose";
import { faceSizeChecker } from "./size";

import type { FaceDetection } from "../types/detection";
import type { FaceLandmarks } from "../types/face";
import type { FaceQualityResult } from "../types/quality";

export class FaceQuality {
  evaluate(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    detection: FaceDetection
  ): FaceQualityResult {
    const width =
      image instanceof HTMLVideoElement
        ? image.videoWidth
        : image.width;

    const height =
      image instanceof HTMLVideoElement
        ? image.videoHeight
        : image.height;

    // const blur =
    //   blurDetector.check(image);

    const blur =
  blurDetector.check(
    image,
    detection
  );
    const brightness =
      brightnessAnalyzer.check(image);

    const pose =
      poseEstimator.estimate(
        detection.landmarks as FaceLandmarks
      );

    const size =
      faceSizeChecker.check(
        detection.bbox,
        width,
        height
      );

    const passed =
      blur.isSharp &&
      brightness.isValid &&
      pose.isFrontal &&
      size.isValid;

    return {
      passed,

      blur: {
        score: blur.score,
        passed: blur.isSharp,
      },

      brightness: {
        score: brightness.score,
        level: brightness.level,
        passed: brightness.isValid,
      },

      pose: {
        yaw: pose.yaw,
        pitch: pose.pitch,
        roll: pose.roll,
        passed: pose.isFrontal,
      },

      size: {
        width: size.width,
        height: size.height,
        coverage: size.imageCoverage,
        passed: size.isValid,
      },
    };
  }
}

export const faceQuality =
  new FaceQuality();

export default faceQuality;