export interface CanvasSize {
  width: number;
  height: number;
}

export class CanvasUtils {
  create(
    width: number,
    height: number
  ): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  getContext(
    canvas: HTMLCanvasElement
  ): CanvasRenderingContext2D {
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    return ctx;
  }

  clone(
    source: HTMLCanvasElement
  ): HTMLCanvasElement {
    const canvas = this.create(
      source.width,
      source.height
    );

    this.getContext(canvas).drawImage(source, 0, 0);

    return canvas;
  }

  clear(canvas: HTMLCanvasElement): void {
    this.getContext(canvas).clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  resize(
    source:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    width: number,
    height: number
  ): HTMLCanvasElement {
    const canvas = this.create(width, height);

    this.getContext(canvas).drawImage(
      source,
      0,
      0,
      width,
      height
    );

    return canvas;
  }

  crop(
    source:
      | HTMLCanvasElement
      | HTMLImageElement
      | HTMLVideoElement
      | ImageBitmap,
    x: number,
    y: number,
    width: number,
    height: number
  ): HTMLCanvasElement {
    const canvas = this.create(width, height);

    this.getContext(canvas).drawImage(
      source,
      x,
      y,
      width,
      height,
      0,
      0,
      width,
      height
    );

    return canvas;
  }

  toImageData(canvas: HTMLCanvasElement): ImageData {
    return this.getContext(canvas).getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  putImageData(
    canvas: HTMLCanvasElement,
    imageData: ImageData
  ): void {
    this.getContext(canvas).putImageData(imageData, 0, 0);
  }

  async toBlob(
    canvas: HTMLCanvasElement,
    type = "image/jpeg",
    quality = 0.95
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob."));
            return;
          }

          resolve(blob);
        },
        type,
        quality
      );
    });
  }

  toDataURL(
    canvas: HTMLCanvasElement,
    type = "image/png",
    quality = 1
  ): string {
    return canvas.toDataURL(type, quality);
  }

  async toImageBitmap(
    canvas: HTMLCanvasElement
  ): Promise<ImageBitmap> {
    return createImageBitmap(canvas);
  }
}

export const canvasUtils = new CanvasUtils();

export default canvasUtils;