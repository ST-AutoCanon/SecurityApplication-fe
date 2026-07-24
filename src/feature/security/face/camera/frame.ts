export interface FrameOptions {
  width?: number;
  height?: number;
  mirror?: boolean;
  imageSmoothing?: boolean;
}

export class FrameProcessor {
  /**
   * Capture a frame from a video element.
   */
  capture(
    video: HTMLVideoElement,
    options: FrameOptions = {}
  ): HTMLCanvasElement {
    const canvas = document.createElement("canvas");

    canvas.width = options.width ?? video.videoWidth;
    canvas.height = options.height ?? video.videoHeight;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.imageSmoothingEnabled = options.imageSmoothing ?? true;

    if (options.mirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas;
  }

  /**
   * Resize an existing canvas.
   */
  resize(
    source: HTMLCanvasElement,
    width: number,
    height: number
  ): HTMLCanvasElement {
    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.drawImage(source, 0, 0, width, height);

    return canvas;
  }

  /**
   * Convert canvas to ImageData.
   */
  toImageData(canvas: HTMLCanvasElement): ImageData {
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  /**
   * Convert ImageData to canvas.
   */
  fromImageData(imageData: ImageData): HTMLCanvasElement {
    const canvas = document.createElement("canvas");

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.putImageData(imageData, 0, 0);

    return canvas;
  }

  /**
   * Convert canvas to ImageBitmap.
   */
  async toImageBitmap(
    canvas: HTMLCanvasElement
  ): Promise<ImageBitmap> {
    return await createImageBitmap(canvas);
  }

  /**
   * Clone canvas.
   */
  clone(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const cloned = document.createElement("canvas");

    cloned.width = canvas.width;
    cloned.height = canvas.height;

    const ctx = cloned.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.drawImage(canvas, 0, 0);

    return cloned;
  }

  /**
   * Clear canvas.
   */
  clear(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export const frameProcessor = new FrameProcessor();

export default frameProcessor;