import { faceCapture } from "../enrollment/capture";
import { faceRecognizer } from "../recognition/recognizer";
import { faceVerifier } from "./verify";
import { faceIdentifier } from "./identify";
// import type { FaceTemplate } from "../similarity/matcher";
import type { FaceTemplate } from "../types/face";

import type { VerifyResult } from "./verify";
import type { IdentifyResult } from "./identify";

export interface AttendanceResult {
  success: boolean;
  timestamp: Date;
  embedding: Float32Array;
  result: VerifyResult | IdentifyResult;
}

export class AccessPipeline {
  /**
   * Verify a user against a single enrolled template (1:1).
   */
  async verify(
    video: HTMLVideoElement,
    template: FaceTemplate
  ): Promise<AttendanceResult> {
    const capture = await faceCapture.capture(video);

    const recognition = await faceRecognizer.recognize(
      capture.image
    );

    const result = faceVerifier.verifyEmbedding(
      recognition.embedding,
      template
    );

    return {
      success: result.verified,
      timestamp: new Date(),
      embedding: recognition.embedding,
      result,
    };
  }

  /**
   * Identify a user from multiple enrolled templates (1:N).
   */
  async identify(
    video: HTMLVideoElement,
    templates: FaceTemplate[]
  ): Promise<AttendanceResult> {
    const capture = await faceCapture.capture(video);

    const recognition = await faceRecognizer.recognize(
      capture.image
    );

    const result = faceIdentifier.identifyEmbedding(
      recognition.embedding,
      templates
    );

    return {
      success: result.identified,
      timestamp: new Date(),
      embedding: recognition.embedding,
      result,
    };
  }
}

export const accessPipeline = new AccessPipeline();

export default accessPipeline;