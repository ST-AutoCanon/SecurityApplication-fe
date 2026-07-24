// face/types/quality.ts

export interface BlurQuality {
  score: number;
  passed: boolean;
}


export interface BrightnessQuality {
  score: number;

  level:
    | "dark"
    | "good"
    | "bright";

  passed: boolean;
}


export interface PoseQuality {
  yaw: number;

  pitch: number;

  roll: number;

  passed: boolean;
}


export interface FaceSizeQuality {

  width: number;

  height: number;

  area?: number;

  coverage: number;

  passed: boolean;

}


export interface FaceQualityResult {

  /**
   * Overall quality status
   */
  passed: boolean;


  blur: BlurQuality;


  brightness: BrightnessQuality;


  pose: PoseQuality;


  size: FaceSizeQuality;

}



export interface QualityThresholds {

  minBlurScore?: number;

  minBrightness?: number;

  maxBrightness?: number;

  maxYaw?: number;

  maxPitch?: number;

  maxRoll?: number;

  minFaceWidth?: number;

  minFaceHeight?: number;

  minFaceCoverage?: number;

}