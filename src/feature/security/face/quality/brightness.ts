export interface BrightnessResult {
  score: number;
  isValid: boolean;
  level: "dark" | "good" | "bright";
}

export interface BrightnessOptions {
  min?: number;
  max?: number;
}

export class BrightnessAnalyzer {
  private readonly defaultMin = 40;
  private readonly defaultMax = 220;

  check(
    source:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    options: BrightnessOptions = {}
  ): BrightnessResult {
    const canvas = document.createElement("canvas");

    const width =
      source instanceof HTMLVideoElement
        ? source.videoWidth
        : source.width;

    const height =
      source instanceof HTMLVideoElement
        ? source.videoHeight
        : source.height;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.drawImage(source, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    let total = 0;
    const count = width * height;

    for (let i = 0; i < pixels.length; i += 4) {
      const brightness =
        0.299 * pixels[i] +
        0.587 * pixels[i + 1] +
        0.114 * pixels[i + 2];

      total += brightness;
    }

    const average = total / count;

    const min = options.min ?? this.defaultMin;
    const max = options.max ?? this.defaultMax;

    let level: BrightnessResult["level"] = "good";

    if (average < min) {
      level = "dark";
    } else if (average > max) {
      level = "bright";
    }

    return {
      score: average,
      isValid: average >= min && average <= max,
      level,
    };
  }
}

export const brightnessAnalyzer = new BrightnessAnalyzer();

export default brightnessAnalyzer;