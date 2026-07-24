import { canvasUtils } from "./canvas";

export type ImageSource =
  | HTMLImageElement
  | HTMLCanvasElement
  | HTMLVideoElement
  | ImageBitmap;

export class ImageUtils {
  getWidth(source: ImageSource): number {
    if (source instanceof HTMLVideoElement) {
      return source.videoWidth;
    }

    return source.width;
  }

  getHeight(source: ImageSource): number {
    if (source instanceof HTMLVideoElement) {
      return source.videoHeight;
    }

    return source.height;
  }

  getSize(source: ImageSource) {
    return {
      width: this.getWidth(source),
      height: this.getHeight(source),
    };
  }

  async load(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.crossOrigin = "anonymous";

      image.onload = () => resolve(image);

      image.onerror = () =>
        reject(new Error(`Failed to load image: ${url}`));

      image.src = url;
    });
  }

  fromImageData(imageData: ImageData): HTMLCanvasElement {
    const canvas = canvasUtils.create(
      imageData.width,
      imageData.height
    );

    canvasUtils.putImageData(canvas, imageData);

    return canvas;
  }

  toImageData(source: ImageSource): ImageData {
    const canvas = canvasUtils.resize(
      source,
      this.getWidth(source),
      this.getHeight(source)
    );

    return canvasUtils.toImageData(canvas);
  }

  crop(
    source: ImageSource,
    bbox: {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  ): HTMLCanvasElement {
    return canvasUtils.crop(
      source,
      bbox.x,
      bbox.y,
      bbox.width,
      bbox.height
    );
  }

  resize(
    source: ImageSource,
    width: number,
    height: number
  ): HTMLCanvasElement {
    return canvasUtils.resize(source, width, height);
  }

  async toBlob(
    source: ImageSource,
    type = "image/jpeg",
    quality = 0.95
  ): Promise<Blob> {
    const canvas = canvasUtils.resize(
      source,
      this.getWidth(source),
      this.getHeight(source)
    );

    return canvasUtils.toBlob(canvas, type, quality);
  }

  toDataURL(
    source: ImageSource,
    type = "image/png",
    quality = 1
  ): string {
    const canvas = canvasUtils.resize(
      source,
      this.getWidth(source),
      this.getHeight(source)
    );

    return canvasUtils.toDataURL(canvas, type, quality);
  }

  async toBitmap(source: ImageSource): Promise<ImageBitmap> {
    const canvas = canvasUtils.resize(
      source,
      this.getWidth(source),
      this.getHeight(source)
    );

    return canvasUtils.toImageBitmap(canvas);
  }
}

export const imageUtils = new ImageUtils();

export default imageUtils;