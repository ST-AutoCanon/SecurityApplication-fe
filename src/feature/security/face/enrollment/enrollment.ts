import { faceRecognizer } from "../recognition/recognizer";
import { faceQuality } from "../quality/quality";
import { faceLiveness } from "../liveness/liveness";

export interface EnrollmentData {
  id: string;
  name?: string;
  embedding: Float32Array;
  enrolledAt: Date;
  metadata?: Record<string, unknown>;
}

export interface EnrollmentOptions {
  checkQuality?: boolean;
  checkLiveness?: boolean;
  metadata?: Record<string, unknown>;
}

export class FaceEnrollment {
  /**
   * Enroll a face from an image.
   */
  async enroll(
    id: string,
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    options: EnrollmentOptions = {}
  ): Promise<EnrollmentData> {
    const result = await faceRecognizer.recognize(image);

    if (options.checkQuality ?? true) {
      const quality = faceQuality.evaluate(
        image,
        result.detection
      );

      if (!quality.passed) {
        throw new Error("Face quality validation failed.");
      }
    }

    if (options.checkLiveness ?? true) {
      const liveness = faceLiveness.check(
        image,
        result.detection
      );

      if (!liveness.isLive) {
        throw new Error("Liveness validation failed.");
      }
    }

    return {
      id,
      embedding: result.embedding,
      enrolledAt: new Date(),
      metadata: options.metadata,
    };
  }

  /**
   * Enroll multiple users.
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
    const results: EnrollmentData[] = [];

    for (const user of users) {
      results.push(
        await this.enroll(user.id, user.image, {
          metadata: user.metadata,
        })
      );
    }

    return results;
  }
}

export const faceEnrollment = new FaceEnrollment();

export default faceEnrollment;