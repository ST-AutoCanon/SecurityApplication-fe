import { getConfig } from "../core/config";
import { faceRecognizer } from "../recognition/recognizer";
// import {
//   faceMatcher,
//   FaceTemplate,
//   MatchResult,
// } from "../similarity/matcher";

import { faceMatcher } from "../similarity/matcher";

import type { MatchResult } from "../similarity/matcher";
import type { FaceTemplate } from "../types/face";

export interface IdentifyOptions {
  threshold?: number;
}

export interface IdentifyResult extends MatchResult {
  identified: boolean;
}

export class FaceIdentifier {
  /**
   * Identify a face against multiple enrolled templates (1:N).
   */
  async identify(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    templates: FaceTemplate[],
    options: IdentifyOptions = {}
  ): Promise<IdentifyResult> {
    const embedding = await faceRecognizer.embedding(image);

    return this.identifyEmbedding(
      embedding,
      templates,
      options
    );
  }

  /**
   * Identify using an existing embedding.
   */
  identifyEmbedding(
    embedding: Float32Array,
    templates: FaceTemplate[],
    options: IdentifyOptions = {}
  ): IdentifyResult {
    const threshold =
      options.threshold ?? getConfig().similarityThreshold;

    const result = faceMatcher.findBestMatch(
      embedding,
      templates
    );

    return {
      ...result,
      identified:
        result.template !== null &&
        result.cosine >= threshold,
    };
  }

  /**
   * Return all matching identities above the threshold.
   */
  identifyAll(
    embedding: Float32Array,
    templates: FaceTemplate[],
    threshold = getConfig().similarityThreshold
  ): MatchResult[] {
    return faceMatcher.findMatches(
      embedding,
      templates,
      threshold
    );
  }
}

export const faceIdentifier = new FaceIdentifier();

export default faceIdentifier;