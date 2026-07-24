import { faceCapture } from "./capture";
// import {
//   faceEnrollment,
//   EnrollmentData,
//   EnrollmentOptions,
// } from "./enrollment";


import { faceEnrollment } from "./enrollment";

import type {
  EnrollmentData,
  EnrollmentOptions,
} from "./enrollment";

export interface EnrollmentPipelineOptions
  extends EnrollmentOptions {
  autoCapture?: boolean;
}

export class EnrollmentPipeline {
  /**
   * Complete enrollment flow:
   * Camera -> Capture -> Quality -> Liveness -> Embedding
   */
  async enrollFromCamera(
    id: string,
    video: HTMLVideoElement,
    options: EnrollmentPipelineOptions = {}
  ): Promise<EnrollmentData> {
    const capture = await faceCapture.capture(video, {
      validateQuality: options.checkQuality ?? true,
    });

    return faceEnrollment.enroll(id, capture.image, options);
  }

  /**
   * Enroll directly from an image.
   */
  async enrollFromImage(
    id: string,
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    options: EnrollmentPipelineOptions = {}
  ): Promise<EnrollmentData> {
    return faceEnrollment.enroll(id, image, options);
  }

  /**
   * Batch enrollment from images.
   */
  async enrollBatch(
    users: {
      id: string;
      image:
        | HTMLCanvasElement
        | HTMLImageElement
        | HTMLVideoElement
        | ImageBitmap;
      metadata?: Record<string, unknown>;
    }[]
  ): Promise<EnrollmentData[]> {
    return faceEnrollment.enrollBatch(users);
  }
}

export const enrollmentPipeline = new EnrollmentPipeline();

export default enrollmentPipeline;