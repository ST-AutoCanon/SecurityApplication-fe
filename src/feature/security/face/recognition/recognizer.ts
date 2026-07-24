import { faceDetector } from "../detector/detector";
import { faceAligner } from "../alignment/align";
import { arcFaceRecognizer } from "./arcface";

import type { FaceDetection } from "../types/detection";
import type { FaceLandmarks } from "../types/face";

export interface RecognitionResult {
  embedding: Float32Array;
  detection: FaceDetection;
  alignedFace: HTMLCanvasElement;
}

export class FaceRecognizer {
  /**
   * Detect -> Align -> Generate Embedding
   */
  async recognize(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): Promise<RecognitionResult> {
    const detection =
      await faceDetector.detectLargest(image);

    if (!detection) {
      throw new Error("No face detected.");
    }

    const alignedFace =
      faceAligner.align(
        image,
        detection.landmarks as FaceLandmarks
      );

    const embedding =
      await arcFaceRecognizer.getEmbedding(
        alignedFace
      );

    return {
      embedding,
      detection,
      alignedFace,
    };
  }

  /**
   * Generate embedding from aligned face.
   */
  async embeddingFromAligned(
    alignedFace:
      | HTMLCanvasElement
      | HTMLImageElement
      | ImageBitmap
  ): Promise<Float32Array> {
    return arcFaceRecognizer.getEmbedding(
      alignedFace
    );
  }

  /**
   * Generate embeddings for all detected faces.
   */
  async recognizeAll(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): Promise<RecognitionResult[]> {
    const detections =
      await faceDetector.detect(image);

    const results: RecognitionResult[] = [];

    for (const detection of detections) {
      const alignedFace =
        faceAligner.align(
          image,
          detection.landmarks as FaceLandmarks
        );

      const embedding =
        await arcFaceRecognizer.getEmbedding(
          alignedFace
        );

      results.push({
        embedding,
        detection,
        alignedFace,
      });
    }

    return results;
  }

  /**
   * Generate only embedding.
   */
  async embedding(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): Promise<Float32Array> {
    const result =
      await this.recognize(image);

    return result.embedding;
  }
}

export const faceRecognizer =
  new FaceRecognizer();

export default faceRecognizer;