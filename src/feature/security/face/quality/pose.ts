import type { FaceLandmarks } from "../types/face";

export interface PoseResult {
  yaw: number;
  pitch: number;
  roll: number;
  isFrontal: boolean;
}

export interface PoseThresholds {
  maxYaw?: number;
  maxPitch?: number;
  maxRoll?: number;
}

export class PoseEstimator {
  private readonly defaults: Required<PoseThresholds> = {
    maxYaw: 20,
    maxPitch: 20,
    maxRoll: 20,
  };

  estimate(
    landmarks: FaceLandmarks,
    thresholds: PoseThresholds = {}
  ): PoseResult {
    const config = {
      ...this.defaults,
      ...thresholds,
    };

    const [
      leftEye,
      rightEye,
      nose,
      leftMouth,
      rightMouth,
    ] = landmarks;

    // Roll (head tilt)
    const roll =
      (Math.atan2(
        rightEye.y - leftEye.y,
        rightEye.x - leftEye.x
      ) *
        180) /
      Math.PI;

    // Yaw (left/right rotation)
    const eyeCenterX =
      (leftEye.x + rightEye.x) / 2;

    const yaw =
      ((nose.x - eyeCenterX) /
        (rightEye.x - leftEye.x)) *
      100;

    // Pitch (up/down rotation)
    const eyeCenterY =
      (leftEye.y + rightEye.y) / 2;

    const mouthCenterY =
      (leftMouth.y + rightMouth.y) / 2;

    const eyeToNose =
      nose.y - eyeCenterY;

    const noseToMouth =
      mouthCenterY - nose.y;

    const pitch =
      ((eyeToNose - noseToMouth) /
        (eyeToNose + noseToMouth)) *
      100;

    const isFrontal =
      Math.abs(yaw) <= config.maxYaw &&
      Math.abs(pitch) <= config.maxPitch &&
      Math.abs(roll) <= config.maxRoll;

    return {
      yaw,
      pitch,
      roll,
      isFrontal,
    };
  }
}

export const poseEstimator =
  new PoseEstimator();

export default poseEstimator;