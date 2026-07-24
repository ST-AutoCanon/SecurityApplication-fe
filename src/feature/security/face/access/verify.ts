import { faceRecognizer } from "../recognition/recognizer";
// import {
//   faceMatcher,
//   FaceTemplate,
//   MatchResult,
// } from "../similarity/matcher";


import { faceMatcher } from "../similarity/matcher";

import type { MatchResult } from "../similarity/matcher";
import type { FaceTemplate } from "../types/face";


import { getConfig } from "../core/config";

export interface VerifyOptions {
  threshold?: number;
}

export interface VerifyResult extends MatchResult {
  verified: boolean;
}

export class FaceVerifier {
  /**
   * Verify a face against a single enrolled template (1:1).
   */
  async verify(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    template: FaceTemplate,
    options: VerifyOptions = {}
  ): Promise<VerifyResult> {
    const embedding = await faceRecognizer.embedding(image);

    const result = faceMatcher.compare(
      embedding,
      template.embedding
    );

const threshold =
  options.threshold ?? getConfig().similarityThreshold;

    return {
      ...result,
      template,
      verified: result.cosine >= threshold,
    };
  }

  /**
   * Verify using an existing embedding.
   */
  verifyEmbedding(
    embedding: Float32Array,
    template: FaceTemplate,
    options: VerifyOptions = {}
  ): VerifyResult {
    const result = faceMatcher.compare(
      embedding,
      template.embedding
    );

    const threshold =
      options.threshold ?? result.confidence;

    return {
      ...result,
      template,
      verified: result.cosine >= threshold,
    };
  }
}

export const faceVerifier = new FaceVerifier();

export default faceVerifier;