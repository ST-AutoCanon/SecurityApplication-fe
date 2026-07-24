export class CosineSimilarity {
  /**
   * Calculate cosine similarity between two embeddings.
   * Returns a value between -1 and 1.
   */
  calculate(
    embedding1: Float32Array,
    embedding2: Float32Array
  ): number {
    if (embedding1.length !== embedding2.length) {
      throw new Error("Embedding dimensions do not match.");
    }

    let dot = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < embedding1.length; i++) {
      dot += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }

    norm1 = Math.sqrt(norm1);
    norm2 = Math.sqrt(norm2);

    if (norm1 === 0 || norm2 === 0) {
      return 0;
    }

    return dot / (norm1 * norm2);
  }

  /**
   * Check whether two embeddings match.
   */
  isMatch(
    embedding1: Float32Array,
    embedding2: Float32Array,
    threshold = 0.55
  ): boolean {
    return this.calculate(embedding1, embedding2) >= threshold;
  }

  /**
   * Convert cosine similarity to a percentage.
   */
  percentage(
    embedding1: Float32Array,
    embedding2: Float32Array
  ): number {
    return Number(
      (this.calculate(embedding1, embedding2) * 100).toFixed(2)
    );
  }
}

export const cosineSimilarity = new CosineSimilarity();

export default cosineSimilarity;