export class EuclideanDistance {
  /**
   * Calculate Euclidean distance between two embeddings.
   * Lower distance = more similar.
   */
  calculate(
    embedding1: Float32Array,
    embedding2: Float32Array
  ): number {
    if (embedding1.length !== embedding2.length) {
      throw new Error("Embedding dimensions do not match.");
    }

    let sum = 0;

    for (let i = 0; i < embedding1.length; i++) {
      const diff = embedding1[i] - embedding2[i];
      sum += diff * diff;
    }

    return Math.sqrt(sum);
  }

  /**
   * Check whether two embeddings match.
   */
  isMatch(
    embedding1: Float32Array,
    embedding2: Float32Array,
    threshold = 1.0
  ): boolean {
    return this.calculate(embedding1, embedding2) <= threshold;
  }

  /**
   * Convert distance to a similarity score (0–1).
   */
  similarity(
    embedding1: Float32Array,
    embedding2: Float32Array
  ): number {
    const distance = this.calculate(embedding1, embedding2);

    return 1 / (1 + distance);
  }

  /**
   * Convert similarity score to percentage.
   */
  percentage(
    embedding1: Float32Array,
    embedding2: Float32Array
  ): number {
    return Number(
      (
        this.similarity(embedding1, embedding2) * 100
      ).toFixed(2)
    );
  }
}

export const euclideanDistance = new EuclideanDistance();

export default euclideanDistance;