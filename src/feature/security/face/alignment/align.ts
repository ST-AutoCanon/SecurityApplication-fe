import {
  ARC_FACE_TEMPLATE,
  estimateSimilarityTransform,
} from "./transform";

import type { FaceLandmarks } from "../types/face";

import { getConfig } from "../core/config";

export class FaceAligner {
  /**
   * Align face to ArcFace template (112x112)
   */
  align(
    source:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap,
    landmarks: FaceLandmarks
  ): HTMLCanvasElement {
    const inputSize = getConfig().recognitionInputSize;

    const transform = estimateSimilarityTransform(
      landmarks,
      ARC_FACE_TEMPLATE
    );

    const canvas = document.createElement("canvas");
    canvas.width = inputSize;
    canvas.height = inputSize;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.save();

    ctx.setTransform(
      transform.scale * Math.cos(transform.rotation),
      transform.scale * Math.sin(transform.rotation),
      -transform.scale * Math.sin(transform.rotation),
      transform.scale * Math.cos(transform.rotation),
      transform.translationX,
      transform.translationY
    );

    ctx.drawImage(source, 0, 0);

    ctx.restore();

    return canvas;
  }

  /**
   * Crop face from bounding box.
   */
  crop(
    source:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap,
    bbox: {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  ): HTMLCanvasElement {
    const size = getConfig().recognitionInputSize;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.drawImage(
      source,
      bbox.x,
      bbox.y,
      bbox.width,
      bbox.height,
      0,
      0,
      size,
      size
    );

    return canvas;
  }

  /**
   * Return aligned face as ImageData.
   */
  toImageData(
    canvas: HTMLCanvasElement
  ): ImageData {
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    return ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  /**
   * Return aligned face as ImageBitmap.
   */
  async toBitmap(
    canvas: HTMLCanvasElement
  ): Promise<ImageBitmap> {
    return createImageBitmap(canvas);
  }
}

export const faceAligner = new FaceAligner();

export default faceAligner;