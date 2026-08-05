import { webcamManager } from "../camera/webcam";
import { faceDetector } from "../detector/detector";
import { faceQuality } from "../quality/quality";

export interface CaptureResult {
  image: HTMLCanvasElement;
  detection: Awaited<
    ReturnType<typeof faceDetector.detectLargest>
  >;
}

export interface CaptureOptions {
  validateQuality?: boolean;
}

export class FaceCapture {
  /**
   * Capture a frame from webcam and validate it.
   */
  async capture(
    video: HTMLVideoElement,
    options: CaptureOptions = {}
  ): Promise<CaptureResult> {
    const canvas = webcamManager.capture(video);

    const detection = await faceDetector.detectLargest(canvas);

    if (!detection) {
      throw new Error("No face detected.");
    }

    if (options.validateQuality ?? true) {
      const quality = faceQuality.evaluate(canvas, detection);

      // if (!quality.passed) {
      //   throw new Error("Face quality check failed.");
      // }
      if (!quality.passed) {
    console.log("Blur:", quality.blur);
    console.log("Brightness:", quality.brightness);
    console.log("Pose:", quality.pose);
    console.log("Size:", quality.size);

    throw new Error("Face quality check failed.");
}
    }

    return {
      image: canvas,
      detection,
    };
  }

  /**
   * Capture without quality validation.
   */
  async quickCapture(
    video: HTMLVideoElement
  ): Promise<CaptureResult> {
    return this.capture(video, {
      validateQuality: false,
    });
  }

  /**
   * Wait until a valid face is available.
   */
  async waitForValidFace(
    video: HTMLVideoElement,
    interval = 200
  ): Promise<CaptureResult> {
    while (true) {
      try {
        return await this.capture(video, {
          validateQuality: true,
        });
      } catch {
        await new Promise((resolve) =>
          setTimeout(resolve, interval)
        );
      }
    }
  }
}

export const faceCapture = new FaceCapture();

export default faceCapture;