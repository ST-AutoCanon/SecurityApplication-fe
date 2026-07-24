import { getConfig } from "../core/config";
import { scrfd } from "./scrfd";

import type { FaceDetection } from "../types/detection";
export interface DetectOptions {
  maxFaces?: number;
  minScore?: number;
}

export class FaceDetector {
  /**
   * Detect faces from an image source.
   */
  async detect(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap,
    options: DetectOptions = {}
  ): Promise<FaceDetection[]> {
    const config = getConfig();

    const maxFaces = options.maxFaces ?? config.maxFaces;
    const minScore =
      options.minScore ?? config.confidenceThreshold;

    const detections = await scrfd.detect(image);

    return detections
      .filter((face) => face.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxFaces);
  }

  /**
   * Detect the highest-confidence face.
   */
  async detectOne(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap,
    minScore?: number
  ): Promise<FaceDetection | null> {
    const faces = await this.detect(image, {
      maxFaces: 1,
      minScore,
    });

    return faces.length > 0 ? faces[0] : null;
  }

  /**
   * Check if any face exists.
   */
  async hasFace(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): Promise<boolean> {
    const face = await this.detectOne(image);
    return face !== null;
  }

  /**
   * Count detected faces.
   */
  async count(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): Promise<number> {
    const faces = await this.detect(image);
    return faces.length;
  }

  /**
   * Get the largest detected face.
   */
  async detectLargest(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): Promise<FaceDetection | null> {
    const faces = await this.detect(image);

    if (!faces.length) {
      return null;
    }

    return faces.reduce((largest, current) => {
      const largestArea =
        largest.bbox.width * largest.bbox.height;

      const currentArea =
        current.bbox.width * current.bbox.height;

      return currentArea > largestArea ? current : largest;
    });
  }
}

export const faceDetector = new FaceDetector();

export default faceDetector;