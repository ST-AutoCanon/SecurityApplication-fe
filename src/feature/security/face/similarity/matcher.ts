import { getConfig } from "../core/config";
import { cosineSimilarity } from "./cosine";
import { euclideanDistance } from "./euclidean";

import type { FaceTemplate } from "../types/face";

export interface MatchResult {
  matched: boolean;
  template: FaceTemplate | null;
  cosine: number;
  euclidean: number;
  confidence: number;
}

export class FaceMatcher {
  /**
   * Compare two embeddings.
   */
  compare(
    source: Float32Array,
    target: Float32Array
  ): MatchResult {
    const threshold =
      getConfig().similarityThreshold;

    const cosine =
      cosineSimilarity.calculate(
        source,
        target
      );

    const euclidean =
      euclideanDistance.calculate(
        source,
        target
      );

    return {
      matched: cosine >= threshold,
      template: null,
      cosine,
      euclidean,
      confidence: cosine,
    };
  }

  /**
   * Find best matching template.
   */
  findBestMatch(
    embedding: Float32Array,
    templates: FaceTemplate[]
  ): MatchResult {
    const threshold =
      getConfig().similarityThreshold;

    let bestTemplate: FaceTemplate | null = null;

    let bestCosine = -1;

    let bestEuclidean =
      Number.POSITIVE_INFINITY;

    for (const template of templates) {
      const cosine =
        cosineSimilarity.calculate(
          embedding,
          template.embedding
        );

      if (cosine > bestCosine) {
        bestCosine = cosine;

        bestEuclidean =
          euclideanDistance.calculate(
            embedding,
            template.embedding
          );

        bestTemplate = template;
      }
    }

    const matched =
      bestTemplate !== null &&
      bestCosine >= threshold;

    return {
      matched,

      template: matched
        ? bestTemplate
        : null,

      cosine: bestCosine,

      euclidean: bestEuclidean,

      confidence: bestCosine,
    };
  }

  /**
   * Return all matching templates.
   */
  findMatches(
    embedding: Float32Array,
    templates: FaceTemplate[],
    threshold =
      getConfig().similarityThreshold
  ): MatchResult[] {
    return templates
      .map((template) => {
        const cosine =
          cosineSimilarity.calculate(
            embedding,
            template.embedding
          );

        return {
          matched:
            cosine >= threshold,

          template,

          cosine,

          euclidean:
            euclideanDistance.calculate(
              embedding,
              template.embedding
            ),

          confidence: cosine,
        };
      })
      .filter(
        (match) => match.matched
      )
      .sort(
        (a, b) =>
          b.confidence -
          a.confidence
      );
  }
}

export const faceMatcher =
  new FaceMatcher();

export default faceMatcher;