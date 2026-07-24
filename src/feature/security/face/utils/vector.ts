export class VectorUtils {
  /**
   * Clone a vector.
   */
  clone(vector: Float32Array): Float32Array {
    return new Float32Array(vector);
  }

  /**
   * L2 norm (magnitude).
   */
  norm(vector: Float32Array): number {
    let sum = 0;

    for (let i = 0; i < vector.length; i++) {
      sum += vector[i] * vector[i];
    }

    return Math.sqrt(sum);
  }

  /**
   * Normalize vector.
   */
  normalize(vector: Float32Array): Float32Array {
    const magnitude = this.norm(vector);

    if (magnitude === 0) {
      return this.clone(vector);
    }

    const normalized = new Float32Array(vector.length);

    for (let i = 0; i < vector.length; i++) {
      normalized[i] = vector[i] / magnitude;
    }

    return normalized;
  }

  /**
   * Dot product.
   */
  dot(a: Float32Array, b: Float32Array): number {
    if (a.length !== b.length) {
      throw new Error("Vector dimensions do not match.");
    }

    let result = 0;

    for (let i = 0; i < a.length; i++) {
      result += a[i] * b[i];
    }

    return result;
  }

  /**
   * Euclidean distance.
   */
  distance(a: Float32Array, b: Float32Array): number {
    if (a.length !== b.length) {
      throw new Error("Vector dimensions do not match.");
    }

    let sum = 0;

    for (let i = 0; i < a.length; i++) {
      const diff = a[i] - b[i];
      sum += diff * diff;
    }

    return Math.sqrt(sum);
  }

  /**
   * Cosine similarity.
   */
  cosine(a: Float32Array, b: Float32Array): number {
    const denominator = this.norm(a) * this.norm(b);

    if (denominator === 0) {
      return 0;
    }

    return this.dot(a, b) / denominator;
  }

  /**
   * Add two vectors.
   */
  add(a: Float32Array, b: Float32Array): Float32Array {
    if (a.length !== b.length) {
      throw new Error("Vector dimensions do not match.");
    }

    const result = new Float32Array(a.length);

    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] + b[i];
    }

    return result;
  }

  /**
   * Subtract two vectors.
   */
  subtract(a: Float32Array, b: Float32Array): Float32Array {
    if (a.length !== b.length) {
      throw new Error("Vector dimensions do not match.");
    }

    const result = new Float32Array(a.length);

    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] - b[i];
    }

    return result;
  }

  /**
   * Scale vector.
   */
  scale(
    vector: Float32Array,
    scalar: number
  ): Float32Array {
    const result = new Float32Array(vector.length);

    for (let i = 0; i < vector.length; i++) {
      result[i] = vector[i] * scalar;
    }

    return result;
  }

  /**
   * Mean vector.
   */
  mean(vectors: Float32Array[]): Float32Array {
    if (vectors.length === 0) {
      throw new Error("No vectors provided.");
    }

    const dimension = vectors[0].length;
    const result = new Float32Array(dimension);

    for (const vector of vectors) {
      if (vector.length !== dimension) {
        throw new Error("Vector dimensions do not match.");
      }

      for (let i = 0; i < dimension; i++) {
        result[i] += vector[i];
      }
    }

    for (let i = 0; i < dimension; i++) {
      result[i] /= vectors.length;
    }

    return result;
  }
}

export const vectorUtils = new VectorUtils();

export default vectorUtils;