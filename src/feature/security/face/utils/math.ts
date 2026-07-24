export class MathUtils {
  /**
   * Clamp a value between min and max.
   */
  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Linear interpolation.
   */
  lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  /**
   * Degrees → Radians.
   */
  toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Radians → Degrees.
   */
  toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Euclidean distance between two points.
   */
  distance(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  /**
   * Average of numbers.
   */
  average(values: number[]): number {
    if (values.length === 0) return 0;

    return (
      values.reduce((sum, value) => sum + value, 0) /
      values.length
    );
  }

  /**
   * Median.
   */
  median(values: number[]): number {
    if (values.length === 0) return 0;

    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    return sorted.length % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle];
  }

  /**
   * Standard deviation.
   */
  standardDeviation(values: number[]): number {
    if (values.length === 0) return 0;

    const avg = this.average(values);

    const variance =
      values.reduce((sum, value) => {
        const diff = value - avg;
        return sum + diff * diff;
      }, 0) / values.length;

    return Math.sqrt(variance);
  }

  /**
   * Normalize value to range 0-1.
   */
  normalize(
    value: number,
    min: number,
    max: number
  ): number {
    if (max === min) return 0;

    return (value - min) / (max - min);
  }

  /**
   * Round with precision.
   */
  round(value: number, decimals = 2): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  /**
   * Check whether value lies within range.
   */
  inRange(
    value: number,
    min: number,
    max: number
  ): boolean {
    return value >= min && value <= max;
  }
}

export const mathUtils = new MathUtils();

export default mathUtils;