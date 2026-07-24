export interface WebcamOptions {
  width?: number;
  height?: number;
  frameRate?: number;
  facingMode?: "user" | "environment";
}

export class WebcamManager {
  private stream: MediaStream | null = null;

  private readonly defaultOptions: Required<WebcamOptions> = {
    width: 1280,
    height: 720,
    frameRate: 30,
    facingMode: "user",
  };

  /**
   * Start webcam
   */
  async start(
    video: HTMLVideoElement,
    options: WebcamOptions = {}
  ): Promise<MediaStream> {
    if (this.stream) {
      return this.stream;
    }

    const config = {
      ...this.defaultOptions,
      ...options,
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: {
          ideal: config.width,
        },
        height: {
          ideal: config.height,
        },
        frameRate: {
          ideal: config.frameRate,
        },
        facingMode: config.facingMode,
      },
      audio: false,
    });

    video.srcObject = stream;

    await video.play();

    this.stream = stream;

    return stream;
  }

  /**
   * Stop webcam
   */
  stop(): void {
    if (!this.stream) return;

    this.stream.getTracks().forEach((track) => track.stop());

    this.stream = null;
  }

  /**
   * Restart webcam
   */
  async restart(
    video: HTMLVideoElement,
    options?: WebcamOptions
  ): Promise<MediaStream> {
    this.stop();
    return this.start(video, options);
  }

  /**
   * Get current stream
   */
  getStream(): MediaStream | null {
    return this.stream;
  }

  /**
   * Is webcam running
   */
  isRunning(): boolean {
    return this.stream !== null;
  }

  /**
   * Capture current frame
   */
  capture(video: HTMLVideoElement): HTMLCanvasElement {
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.drawImage(video, 0, 0);

    return canvas;
  }

  /**
   * Capture ImageData
   */
  captureImageData(video: HTMLVideoElement): ImageData {
    const canvas = this.capture(video);

    const ctx = canvas.getContext("2d");

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
   * Capture ImageBitmap
   */
  async captureBitmap(
    video: HTMLVideoElement
  ): Promise<ImageBitmap> {
    const canvas = this.capture(video);

    return await createImageBitmap(canvas);
  }
}

export const webcamManager = new WebcamManager();

export default webcamManager;