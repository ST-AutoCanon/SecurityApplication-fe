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

export class FaceQualityError extends Error {
  code = "FACE_QUALITY_FAILED";

  constructor(message: string) {
    super(message);
    this.name = "FaceQualityError";

    Object.setPrototypeOf(this, FaceQualityError.prototype);
  }
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


//       if (!quality.passed) {
//     console.log("Blur:", quality.blur);
//     console.log("Brightness:", quality.brightness);
//     console.log("Pose:", quality.pose);
//     console.log("Size:", quality.size);

//     throw new Error("Face quality check failed.");
      // }
      
      if (!quality.passed) {
  console.log("Blur:", quality.blur);
  console.log("Brightness:", quality.brightness);
  console.log("Pose:", quality.pose);
  console.log("Size:", quality.size);

  const errors: string[] = [];

  // Blur
  if (!quality.blur.passed) {
    errors.push(
      "Face is too blurry. Please hold still and keep your face steady."
    );
  }

  // Brightness
  if (!quality.brightness.passed) {
    if (quality.brightness.level === "dark") {
      errors.push(
        "Lighting is too dark. Please move to a brighter area."
      );
    } else if (quality.brightness.level === "bright") {
      errors.push(
        "Lighting is too bright. Please move away from strong light."
      );
    } else {
      errors.push(
        "Lighting is not suitable. Please adjust the lighting."
      );
    }
  }

  // Pose
  if (!quality.pose.passed) {
    const { yaw, pitch, roll } = quality.pose;

    if (Math.abs(yaw) > 15) {
      errors.push(
        "Please look directly at the camera. Keep your head straight."
      );
    }

    if (Math.abs(pitch) > 15) {
      errors.push(
        "Please keep your head level and look straight at the camera."
      );
    }

    if (Math.abs(roll) > 15) {
      errors.push(
        "Please straighten your head. Avoid tilting your head."
      );
    }

    // Fallback in case pose failed but none of the individual
    // values crossed the limits above.
    if (
      Math.abs(yaw) <= 15 &&
      Math.abs(pitch) <= 15 &&
      Math.abs(roll) <= 15
    ) {
      errors.push(
        "Please look directly at the camera and keep your head straight."
      );
    }
  }

  // Face size / coverage
  if (!quality.size.passed) {
    if (quality.size.coverage < 15) {
      errors.push(
        "Your face is too far from the camera. Please move closer."
      );
    } else {
      errors.push(
        "Your face is too close to the camera. Please move slightly back."
      );
    }
  }

  const message =
    errors.length > 0
      ? `Face quality check failed:\n\n${errors
          .map((error) => `• ${error}`)
          .join("\n")}`
      : "Face quality check failed. Please adjust your position and try again.";

        // throw new Error(message);
        throw new FaceQualityError(message);
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