// import { webcamManager } from "../camera/webcam";
// import { faceDetector } from "../detector/detector";
// import { faceQuality } from "../quality/quality";

// export interface PunchCaptureResult {
//   image: HTMLCanvasElement;
//   detection: Awaited<ReturnType<typeof faceDetector.detectLargest>>;
// }

// export class FacePunchCapture {
//   async capture(video: HTMLVideoElement): Promise<PunchCaptureResult> {
//     const canvas = webcamManager.capture(video);

//     const detection = await faceDetector.detectLargest(canvas);

//     if (!detection) {
//       throw new Error("No face detected. Please position your face inside the frame.");
//     }

//     const quality = faceQuality.evaluate(canvas, detection);

//     if (!quality.passed) {
//       // Log for debugging
//       console.log("Punch Face Quality:", quality);

//       // TODO: Customize based on your quality.ts structure
//       throw new Error(
//         "Face quality is too low. Please ensure good lighting, keep your face centered, and look directly at the camera."
//       );
//     }

//     return {
//       image: canvas,
//       detection,
//     };
//   }
// }

// export const facePunchCapture = new FacePunchCapture();
// export default facePunchCapture;



import { webcamManager } from "../camera/webcam";
import { faceDetector } from "../detector/detector";
import { faceQuality } from "../quality/quality";

export interface PunchCaptureResult {
  image: HTMLCanvasElement;
  detection: Awaited<ReturnType<typeof faceDetector.detectLargest>>;
}

export class FacePunchCapture {
  async capture(video: HTMLVideoElement): Promise<PunchCaptureResult> {
    // Ensure the video is ready before capturing
    if (
      !video ||
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      throw new Error(
        "Camera is not ready. Please wait a moment and try again."
      );
    }

    // Capture the current frame
    const canvas = webcamManager.capture(video);

    // Detect the largest face
    const detection = await faceDetector.detectLargest(canvas);

    if (!detection) {
      throw new Error(
        "No face detected. Please position your face inside the frame."
      );
    }

    // Evaluate face quality
    const quality = faceQuality.evaluate(canvas, detection);

    if (!quality.passed) {
      console.log("Punch Face Quality:", quality);

      throw new Error(
        "Face quality is too low. Please ensure good lighting, keep your face centered, remove any obstructions, and look directly at the camera."
      );
    }

    return {
      image: canvas,
      detection,
    };
  }
}

export const facePunchCapture = new FacePunchCapture();
export default facePunchCapture;