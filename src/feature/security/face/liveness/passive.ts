import type { FaceDetection } from "../types/detection";
export interface PassiveLivenessResult {
  isLive: boolean;
  score: number;
  checks: {
    brightness: boolean;
    contrast: boolean;
    faceSize: boolean;
    sharpness: boolean;
    edgeDensity: boolean;
  };
}

export class PassiveLiveness {
  check(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    detection: FaceDetection
  ): PassiveLivenessResult {
    const canvas = document.createElement("canvas");

    const width =
      image instanceof HTMLVideoElement
        ? image.videoWidth
        : image.width;

    const height =
      image instanceof HTMLVideoElement
        ? image.videoHeight
        : image.height;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.drawImage(image, 0, 0, width, height);

    const { data } = ctx.getImageData(0, 0, width, height);

    let brightness = 0;
    let contrast = 0;

    const gray = new Float32Array(width * height);

    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      gray[j] =
        0.299 * data[i] +
        0.587 * data[i + 1] +
        0.114 * data[i + 2];

      brightness += gray[j];
    }

    brightness /= gray.length;

    for (let i = 0; i < gray.length; i++) {
      const diff = gray[i] - brightness;
      contrast += diff * diff;
    }

    contrast = Math.sqrt(contrast / gray.length);

    let edges = 0;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const c = y * width + x;

        const gx = gray[c + 1] - gray[c - 1];
        const gy = gray[c + width] - gray[c - width];

        if (Math.sqrt(gx * gx + gy * gy) > 20) {
          edges++;
        }
      }
    }

    const edgeDensity = edges / gray.length;

    const brightnessOk =
      brightness >= 40 && brightness <= 220;

    const contrastOk = contrast > 30;

    const faceSizeOk =
      detection.bbox.width >= 100 &&
      detection.bbox.height >= 100;

    const sharpnessOk = edgeDensity > 0.05;

    const edgeDensityOk = edgeDensity < 0.35;

    const passedChecks = [
      brightnessOk,
      contrastOk,
      faceSizeOk,
      sharpnessOk,
      edgeDensityOk,
    ].filter(Boolean).length;

    const score = passedChecks / 5;

    return {
      isLive: score >= 0.8,
      score,
      checks: {
        brightness: brightnessOk,
        contrast: contrastOk,
        faceSize: faceSizeOk,
        sharpness: sharpnessOk,
        edgeDensity: edgeDensityOk,
      },
    };
  }
}

export const passiveLiveness = new PassiveLiveness();

export default passiveLiveness;